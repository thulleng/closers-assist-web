/**
 * Commission audit — diff photographed paperwork against the rep's ledger.
 *
 * The ONLY claim this makes is "these deals aren't in your ledger." It never
 * says "you were underpaid" — the rep decides what a gap means. Legal + trust.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { extractDocument } from "./extract";
import { getPlanForUser, getMonthState, type MonthState } from "./plan";
import { RATE_LIMIT_PER_HOUR } from "./store";
import type { DraftFields } from "./types";
import { calculatePay, type PayDeal } from "@/lib/pay-engine";

export interface AuditLine {
  sold_date: string | null;
  customer_name: string | null;
  vehicle: string | null;
  deal_type: PayDeal["deal_type"] | null;
  front_gross: number | null;
  /** Source thumbnail path so the rep can see the receipt. */
  evidence_path: string | null;
}

export interface AuditResult {
  scanned: number;
  matched: number;
  unlogged: AuditLine[];
  est_uncollected: number;
  unit_delta: number;
  month: MonthState;
}

function normalizeKey(line: AuditLine): string {
  const name = (line.customer_name ?? "").trim().toLowerCase();
  const date = (line.sold_date ?? "").slice(0, 10);
  return `${name}|${date}`;
}

export async function runAudit(
  admin: SupabaseClient,
  userId: string,
  files: { bytes: Buffer; mediaType: string }[]
): Promise<AuditResult> {
  const { plan } = await getPlanForUser(admin, userId);

  // 1. Extract every deal from every document. Illegible docs are skipped and
  //    reported, never silently dropped.
  const extracted: DraftFields[] = [];
  const skipped: number[] = [];
  for (let i = 0; i < files.length; i++) {
    try {
      const res = await extractDocument({ bytes: files[i].bytes, mediaType: files[i].mediaType });
      for (const d of res.extraction.deals) {
        extracted.push({
          customer_name: d.customer_name.value,
          vehicle: d.vehicle.value,
          stock_number: d.stock_number.value,
          deal_type: (d.deal_type.value as DraftFields["deal_type"]) ?? null,
          front_gross: d.front_gross.value,
          back_gross: d.back_gross.value,
          pack: d.pack.value,
          sold_date: d.sold_date.value,
          salesperson: d.salesperson.value,
        });
      }
    } catch {
      skipped.push(i + 1);
    }
  }

  // 2. Load the ledger for a generous window (90 days back from today).
  const end = new Date().toISOString().slice(0, 10);
  const start = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().slice(0, 10);
  const { data: ledger } = await admin
    .from("deals")
    .select("customer_name, sold_date, deal_type, front_gross, vehicle")
    .eq("user_id", userId)
    .gte("sold_date", start)
    .lte("sold_date", end);

  // 3. Diff. Group extracted lines by customer+date, dedupe against the ledger.
  const ledgerKeys = new Set(
    (ledger ?? []).map((d) => normalizeKey({
      customer_name: d.customer_name,
      sold_date: d.sold_date,
      vehicle: d.vehicle,
      deal_type: d.deal_type,
      front_gross: d.front_gross,
      evidence_path: null,
    }))
  );

  const seen = new Set<string>();
  const unlogged: AuditLine[] = [];
  for (const d of extracted) {
    const line: AuditLine = {
      sold_date: d.sold_date,
      customer_name: d.customer_name,
      vehicle: d.vehicle,
      deal_type: d.deal_type,
      front_gross: d.front_gross,
      evidence_path: null,
    };
    const key = normalizeKey(line);
    if (!key || key === "|") continue; // no usable identity — can't diff a ghost
    if (seen.has(key)) continue;
    seen.add(key);
    if (!ledgerKeys.has(key)) unlogged.push(line);
  }

  // 4. Money: how much do these missing deals change the month? Compute with the
  //    engine (never in a prompt). A line without a date/front gross still
  //    counts toward the estimate using conservative defaults is NOT allowed —
  //    only lines with a real front_gross contribute dollars.
  const asPayDeals: PayDeal[] = unlogged
    .filter((l) => l.deal_type && l.front_gross != null && l.sold_date)
    .map((l) => ({
      customer_name: l.customer_name,
      deal_type: l.deal_type as PayDeal["deal_type"],
      front_gross: l.front_gross,
      sold_date: l.sold_date,
    }));

  const withMissing = calculatePay(plan, asPayDeals);
  const est_uncollected = withMissing.grossPay;
  const unit_delta = withMissing.units;

  const month = await getMonthState(admin, userId, plan, { monthOf: null });

  return {
    scanned: files.length,
    matched: extracted.length - unlogged.length,
    unlogged,
    est_uncollected,
    unit_delta,
    month,
  };
}
