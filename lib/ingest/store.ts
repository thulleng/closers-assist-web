/**
 * The one pipeline. Every door (PWA, Telegram, MMS) lands here so there is
 * exactly one definition of "a photo became a deal".
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import { classifyExtraction, DOC_KIND_LABEL, isDealDoc } from "./classify";
import { extractDocument, IngestError } from "./extract";
import { getMonthState, getPlanForUser, type MonthState } from "./plan";
import type { ClassifiedDeal, DocKind, DraftFields } from "./types";
import type { PayDeal } from "@/lib/pay-engine";

export { IngestError } from "./extract";

export const RATE_LIMIT_PER_HOUR = 20;
export const EVIDENCE_BUCKET = "deal-evidence";

export type IngestSource = "pwa" | "telegram" | "sms" | "whatsapp";

export interface IngestDraft {
  draft_id: string;
  fields: DraftFields;
  confidence: ClassifiedDeal["confidence"];
  needs: ClassifiedDeal["needs"];
  question: string | null;
  auto_confirmable: boolean;
  /** Money preview for this deal at the month's effective rate. */
  pay_preview: {
    gross_pay: number;
    units: number;
    month_units: number;
    month_gross_pay: number;
    units_to_next: number | null;
    next_bonus: number | null;
    headline: string;
  } | null;
}

export interface IngestOutcome {
  doc_kind: DocKind;
  doc_label: string;
  drafts: IngestDraft[];
  /** Human message for chat surfaces (Telegram/SMS). Empty for the PWA screen. */
  message: string;
  model: string;
  rate_remaining: number;
}

export interface IngestInput {
  userId: string;
  bytes: Buffer;
  mediaType: string;
  source: IngestSource;
  caption?: string | null;
}

async function assertUnderRateLimit(admin: SupabaseClient, userId: string): Promise<number> {
  const since = new Date(Date.now() - 60 * 60 * 1000).toISOString();
  const { count, error } = await admin
    .from("deal_drafts")
    .select("id", { count: "exact", head: true })
    .eq("user_id", userId)
    .gte("created_at", since);

  if (error) {
    console.error("[ingest] rate limit check failed, allowing:", error.message);
    return RATE_LIMIT_PER_HOUR;
  }
  const used = count ?? 0;
  if (used >= RATE_LIMIT_PER_HOUR) {
    throw new IngestError("rate_limited", `That's ${RATE_LIMIT_PER_HOUR} photos in an hour — give it a minute.`);
  }
  return RATE_LIMIT_PER_HOUR - used;
}

async function uploadEvidence(
  admin: SupabaseClient,
  userId: string,
  draftId: string,
  jpeg: Buffer
): Promise<string | null> {
  const path = `${userId}/${draftId}.jpg`;
  const { error } = await admin.storage.from(EVIDENCE_BUCKET).upload(path, jpeg, {
    contentType: "image/jpeg",
    upsert: false,
  });
  if (error) {
    // Storage misconfiguration must not lose the rep's deal.
    console.error("[ingest] evidence upload failed:", error.message);
    return null;
  }
  return path;
}

function previewFrom(state: MonthState, fields: DraftFields) {
  return {
    gross_pay: state.gross_pay,
    units: state.units,
    month_units: state.units,
    month_gross_pay: state.gross_pay,
    units_to_next: state.tier.units_to_next,
    next_bonus: state.tier.bonus_at_next,
    headline: state.headline,
  };
}

/** The confirm line for chat surfaces. One line + what to tap. Never a form. */
export function draftMessage(fields: DraftFields, preview: IngestDraft["pay_preview"]): string {
  const bits = [
    fields.customer_name ?? "Unknown customer",
    fields.vehicle ?? null,
    fields.deal_type ? fields.deal_type.replace(/_/g, " ") : null,
    fields.front_gross != null ? `$${fields.front_gross.toLocaleString("en-US")} front` : null,
    fields.sold_date,
  ].filter(Boolean);
  const head = bits.join(" · ");
  if (!preview) return head;
  const monthUnits = Number.isInteger(preview.month_units) ? String(preview.month_units) : preview.month_units.toFixed(1);
  const tail =
    preview.units_to_next != null && preview.next_bonus != null
      ? `${preview.units_to_next} more units to the $${preview.next_bonus.toLocaleString("en-US")} tier`
      : "all tiers hit";
  return `${head}\n$${Math.round(preview.gross_pay).toLocaleString("en-US")} gross · ${monthUnits} units · ${tail}`;
}

export async function ingestImage(admin: SupabaseClient, input: IngestInput): Promise<IngestOutcome> {
  const rateRemaining = await assertUnderRateLimit(admin, input.userId);

  const { plan, planId } = await getPlanForUser(admin, input.userId);

  const extracted = await extractDocument({
    bytes: input.bytes,
    mediaType: input.mediaType,
    caption: input.caption,
  });

  const ext = extracted.extraction;
  if (!ext.deals.length) {
    throw new IngestError(
      "no_deal",
      ext.doc_kind === "other"
        ? "That doesn't look like deal paperwork. Point the camera at the desk sheet or buyer's order."
        : "I can see paperwork but no deal on it. Want to type this one?"
    );
  }
  if (!isDealDoc(ext.doc_kind)) {
    throw new IngestError(
      "no_deal",
      `That reads like a ${DOC_KIND_LABEL[ext.doc_kind]}, not a deal sheet. Deal sheets and buyer's orders are what I can log.`
    );
  }

  const classified = classifyExtraction(ext, plan);
  const drafts: IngestDraft[] = [];

  for (const item of classified.slice(0, 5)) {
    // Insert first so the storage path can key off a real draft id.
    const { data: inserted, error } = await admin
      .from("deal_drafts")
      .insert({
        user_id: input.userId,
        source: input.source,
        doc_kind: ext.doc_kind,
        fields: item.fields,
        confidence: item.confidence,
        raw_text: ext.raw_text.slice(0, 8000),
        model: extracted.model,
        status: "pending",
      })
      .select("id, expires_at")
      .single();

    if (error) throw new Error(`draft insert failed: ${error.message}`);

    const draftId = inserted.id as string;
    const storagePath = await uploadEvidence(admin, input.userId, draftId, extracted.normalized);
    if (storagePath) {
      await admin.from("deal_drafts").update({ storage_path: storagePath }).eq("id", draftId);
    }

    // Money preview at the month's effective rate, including this deal.
    let preview: IngestDraft["pay_preview"] = null;
    if (item.fields.deal_type && item.fields.sold_date) {
      try {
        const extraDeal: PayDeal = {
          customer_name: item.fields.customer_name,
          deal_type: item.fields.deal_type,
          front_gross: item.fields.front_gross,
          sold_date: item.fields.sold_date,
        };
        const state = await getMonthState(admin, input.userId, plan, {
          monthOf: item.fields.sold_date,
          extraDeal,
        });
        preview = previewFrom(state, item.fields);
      } catch (err) {
        console.error("[ingest] preview failed:", err instanceof Error ? err.message : err);
      }
    }

    drafts.push({
      draft_id: draftId,
      fields: item.fields,
      confidence: item.confidence,
      needs: item.needs,
      question: item.question,
      auto_confirmable: item.autoConfirmable,
      pay_preview: preview,
    });
  }

  const first = drafts[0];
  const message =
    drafts.length === 1
      ? draftMessage(first.fields, first.pay_preview)
      : `Found ${drafts.length} deals on that sheet:\n` +
        drafts.map((d, i) => `${i + 1}. ${draftMessage(d.fields, d.pay_preview).split("\n")[0]}`).join("\n");

  console.log(
    `[ingest] ${input.source} user=${input.userId} doc=${ext.doc_kind} deals=${drafts.length} model=${extracted.model} tokens=${extracted.usage?.input_tokens ?? "?"}/${extracted.usage?.output_tokens ?? "?"} plan=${planId ?? "none"}`
  );

  return {
    doc_kind: ext.doc_kind,
    doc_label: DOC_KIND_LABEL[ext.doc_kind],
    drafts,
    message,
    model: extracted.model,
    rate_remaining: rateRemaining - drafts.length,
  };
}

/** Build a deal row from a confirmed draft + any edits the rep made. */
export interface ConfirmInput {
  draftId: string;
  userId: string;
  patches?: Partial<DraftFields>;
  force?: boolean;
}

export function mergeFields(base: DraftFields, patches?: Partial<DraftFields>): DraftFields {
  const out: DraftFields = { ...base };
  for (const [k, v] of Object.entries(patches ?? {}) as [keyof DraftFields, unknown][]) {
    if (v === undefined) continue;
    (out as unknown as Record<string, unknown>)[k as string] = v;
  }
  return out;
}

export function validateForWrite(fields: DraftFields): string[] {
  const problems: string[] = [];
  if (!fields.customer_name) problems.push("customer_name is required");
  if (!fields.deal_type) problems.push("deal_type is required");
  if (!fields.sold_date) problems.push("sold_date is required");
  if (fields.deal_type === "full_deal" && (fields.front_gross == null || fields.front_gross <= 0)) {
    problems.push("front_gross is required for a full deal");
  }
  if (fields.front_gross != null && fields.front_gross < 0) problems.push("front_gross cannot be negative");
  return problems;
}

/**
 * Confirm a draft into a real deal. Money is computed here — in the engine,
 * never in a prompt. The route calls this, not the reverse.
 */
export async function confirmDraft(
  admin: SupabaseClient,
  input: ConfirmInput
): Promise<{ deal: Record<string, unknown>; month: MonthState; duplicate: boolean }> {
  const { data: draft, error } = await admin
    .from("deal_drafts")
    .select("*")
    .eq("id", input.draftId)
    .eq("user_id", input.userId)
    .maybeSingle();

  if (error) throw new Error(`draft read failed: ${error.message}`);
  if (!draft) throw new IngestError("unreadable", "That draft has expired or isn't yours.");
  if (draft.status !== "pending") throw new IngestError("unreadable", "That draft was already handled.");

  const base = draft.fields as DraftFields;
  const fields = mergeFields(base, input.patches);

  const problems = validateForWrite(fields);
  if (problems.length && !input.force) {
    throw new IngestError("unreadable", problems[0]);
  }

  // ── Dedupe: same customer + same sold_date already logged? ────────────────
  let duplicate = false;
  if (fields.customer_name && fields.sold_date) {
    const { data: existing } = await admin
      .from("deals")
      .select("id")
      .eq("user_id", input.userId)
      .eq("customer_name", fields.customer_name)
      .eq("sold_date", fields.sold_date)
      .limit(1);
    duplicate = (existing?.length ?? 0) > 0;
    if (duplicate && !input.force) {
      throw new IngestError("unreadable", `Already logged ${fields.sold_date} — add anyway?`);
    }
  }

  // ── Resolve plan + compute the whole month with this deal included ────────
  const { plan, planId } = await getPlanForUser(admin, input.userId);
  const thisDeal: PayDeal = {
    customer_name: fields.customer_name,
    deal_type: fields.deal_type as PayDeal["deal_type"],
    front_gross: fields.front_gross,
    sold_date: fields.sold_date,
  };
  const month = await getMonthState(admin, input.userId, plan, {
    monthOf: fields.sold_date,
    extraDeal: thisDeal,
  });

  // Per-deal money from the same engine, so the logged commission matches the
  // month view exactly. Recompute a one-deal result to grab the line value.
  const { calculatePay } = await import("@/lib/pay-engine");
  const single = calculatePay(plan, [thisDeal]);
  const line = single.lines[0];

  const { data: deal, error: insErr } = await admin
    .from("deals")
    .insert({
      user_id: input.userId,
      customer_name: fields.customer_name,
      deal_type: fields.deal_type,
      vehicle: fields.vehicle,
      front_gross: fields.front_gross,
      commission: line ? line.commission : null,
      units: line ? line.units : null,
      sold_date: fields.sold_date,
      stock_number: fields.stock_number,
      source: draft.source ?? "pwa",
      pay_plan_id: planId,
      evidence_id: null,
    })
    .select()
    .single();

  if (insErr) throw new Error(`deal insert failed: ${insErr.message}`);

  // ── Promote the draft's evidence into a deal_evidence row ─────────────────
  if (draft.storage_path) {
    const { data: ev } = await admin
      .from("deal_evidence")
      .insert({
        user_id: input.userId,
        deal_id: deal.id,
        doc_kind: draft.doc_kind,
        storage_path: draft.storage_path,
        extracted: { fields, raw_text: draft.raw_text, model: draft.model },
      })
      .select("id")
      .single();
    if (!ev?.id) {
      console.error("[ingest] evidence promote failed — deal kept, evidence unlinked");
    } else {
      await admin.from("deals").update({ evidence_id: ev.id }).eq("id", deal.id);
    }
  }

  await admin.from("deal_drafts").update({ status: "confirmed" }).eq("id", input.draftId);

  return { deal, month, duplicate };
}
