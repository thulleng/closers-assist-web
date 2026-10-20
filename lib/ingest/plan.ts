/**
 * Plan lookup + month state. The one place that turns a rep's deals into money,
 * via the pure pay engine. Never in a prompt, never in a component.
 */
import type { SupabaseClient } from "@supabase/supabase-js";
import {
  DEFAULT_AUTO_PLAN,
  calculatePay,
  computeCarry,
  planFromRow,
  type PayDeal,
  type PayPlanConfig,
  type PayResult,
} from "@/lib/pay-engine";

export interface ResolvedPlan {
  plan: PayPlanConfig;
  planId: string | null;
}

/** Flat columns the existing dashboard/chat code still reads. Keep both shapes in sync. */
export function flatFromConfig(cfg: PayPlanConfig) {
  return {
    commission_rate: cfg.commission.rate,
    monthly_draw: cfg.draw,
    half_mini_amount: cfg.minis.half,
    full_mini_amount: cfg.minis.full,
    street_purchase_amount: cfg.extras.street_buy,
    volume_bonuses: cfg.tiers.map((t) => ({ units: t.units, bonus: t.bonus })),
    cxi_threshold: 4.8,
    cxi_bonus: cfg.extras.cxi_4_8,
    review_bonus: cfg.extras.review,
  };
}

export async function getPlanForUser(admin: SupabaseClient, userId: string): Promise<ResolvedPlan> {
  const { data, error } = await admin
    .from("pay_plans")
    .select("*")
    .eq("user_id", userId)
    .order("effective_from", { ascending: false })
    .limit(1)
    .maybeSingle();

  if (error) throw new Error(`pay_plans read failed: ${error.message}`);
  if (data) {
    const plan = planFromRow(data) ?? DEFAULT_AUTO_PLAN;
    return { plan, planId: (data.id as string) ?? null };
  }

  // First deal ever: materialize Thul's plan shape so the rep sees real numbers,
  // not a blank dashboard.
  const { data: created, error: createErr } = await admin
    .from("pay_plans")
    .insert({
      user_id: userId,
      industry: "auto",
      name: "My plan",
      config: DEFAULT_AUTO_PLAN,
      effective_from: new Date().toISOString().slice(0, 10),
      ...flatFromConfig(DEFAULT_AUTO_PLAN),
    })
    .select("id")
    .single();

  if (createErr) {
    // Plan creation failing must never block logging a deal.
    console.error("[ingest] pay_plan create failed:", createErr.message);
    return { plan: DEFAULT_AUTO_PLAN, planId: null };
  }
  return { plan: DEFAULT_AUTO_PLAN, planId: (created?.id as string) ?? null };
}

export function monthBounds(soldDate: string | null): { start: string; end: string; month: string } {
  const base = soldDate && /^\d{4}-\d{2}-\d{2}$/.test(soldDate) ? new Date(`${soldDate}T00:00:00Z`) : new Date();
  const y = base.getUTCFullYear();
  const m = base.getUTCMonth();
  return {
    start: new Date(Date.UTC(y, m, 1)).toISOString().slice(0, 10),
    end: new Date(Date.UTC(y, m + 1, 1)).toISOString().slice(0, 10),
    month: `${y}-${String(m + 1).padStart(2, "0")}`,
  };
}

type DealRow = {
  id?: string;
  customer_name: string | null;
  vehicle: string | null;
  deal_type: PayDeal["deal_type"];
  front_gross: number | null;
  sold_date: string | null;
};

function toPayDeal(row: DealRow): PayDeal {
  return {
    id: row.id,
    customer_name: row.customer_name,
    vehicle: row.vehicle,
    deal_type: row.deal_type,
    front_gross: row.front_gross,
    sold_date: row.sold_date,
  };
}

export interface MonthState {
  month: string;
  units: number;
  commission: number;
  tier_bonus: number;
  spiffs: number;
  extras: number;
  gross_pay: number;
  draw_applied: number;
  net_to_rep: number;
  carry_in: number;
  carry_out: number;
  effective_rate_pct: number;
  tier: {
    current: { units: number; bonus: number } | null;
    next: { units: number; bonus: number } | null;
    units_to_next: number | null;
    bonus_at_next: number | null;
  };
  deal_count: number;
  /** Plain-English line for a rep's phone screen. */
  headline: string;
}

export function toMonthState(result: PayResult, month: string, dealCount: number): MonthState {
  const tier = result.tierProgress;
  const unitsStr = Number.isInteger(result.units) ? String(result.units) : result.units.toFixed(1);
  const headline =
    tier.next_tier && tier.units_to_next != null
      ? `${unitsStr} units · $${Math.round(result.grossPay).toLocaleString("en-US")} gross · ${tier.units_to_next} to the $${tier.next_tier.bonus.toLocaleString("en-US")} tier`
      : `${unitsStr} units · $${Math.round(result.grossPay).toLocaleString("en-US")} gross · all tiers hit`;

  return {
    month,
    units: result.units,
    commission: result.commission,
    tier_bonus: result.tierBonus,
    spiffs: result.spiffs,
    extras: result.extras,
    gross_pay: result.grossPay,
    draw_applied: result.drawApplied,
    net_to_rep: result.netToRep,
    carry_in: result.carryIn,
    carry_out: result.carryOut,
    effective_rate_pct: result.effective_rate_pct,
    tier: {
      current: tier.current_tier ? { units: tier.current_tier.units, bonus: tier.current_tier.bonus } : null,
      next: tier.next_tier ? { units: tier.next_tier.units, bonus: tier.next_tier.bonus } : null,
      units_to_next: tier.units_to_next,
      bonus_at_next: tier.bonus_at_next,
    },
    deal_count: dealCount,
    headline,
  };
}

/**
 * Recompute a month from scratch, walking prior months for draw carry.
 * `extraDeal` lets the confirm screen show the number BEFORE the insert lands.
 */
export async function getMonthState(
  admin: SupabaseClient,
  userId: string,
  plan: PayPlanConfig,
  opts: { monthOf: string | null; extraDeal?: PayDeal; dealIdToReplace?: string }
): Promise<MonthState> {
  const { start, end, month } = monthBounds(opts.monthOf);

  const { data, error } = await admin
    .from("deals")
    .select("id, customer_name, vehicle, deal_type, front_gross, sold_date")
    .eq("user_id", userId)
    .gte("sold_date", start)
    .lt("sold_date", end)
    .order("sold_date", { ascending: true });

  if (error) throw new Error(`deals read failed: ${error.message}`);

  const rows = ((data ?? []) as DealRow[]).filter((r) => r.id !== opts.dealIdToReplace);
  const payDeals = rows.map(toPayDeal);
  if (opts.extraDeal) payDeals.push(opts.extraDeal);

  const result = calculatePay(plan, payDeals);
  return toMonthState(result, month, payDeals.length);
}

/** Carries are only meaningful when the plan has a draw and prior months exist. */
export async function getCarryIntoMonth(
  admin: SupabaseClient,
  userId: string,
  plan: PayPlanConfig,
  monthOf: string | null
): Promise<number> {
  if (!plan.draw) return 0;
  const { start: monthStart } = monthBounds(monthOf);
  const yearStart = `${new Date(`${monthStart}T00:00:00Z`).getUTCFullYear()}-01-01`;

  const { data } = await admin
    .from("deals")
    .select("id, customer_name, vehicle, deal_type, front_gross, sold_date")
    .eq("user_id", userId)
    .gte("sold_date", yearStart)
    .lt("sold_date", monthStart)
    .order("sold_date", { ascending: true });

  const rows = (data ?? []) as DealRow[];
  if (!rows.length) return 0;

  // Bucket by month, keep the buckets between Jan and the requested month —
  // empty months still consume draw, so they must be represented.
  const byMonth = new Map<string, DealRow[]>();
  for (const r of rows) {
    const key = (r.sold_date ?? "").slice(0, 7);
    if (!key) continue;
    byMonth.set(key, [...(byMonth.get(key) ?? []), r]);
  }

  const cursor = new Date(`${yearStart}T00:00:00Z`);
  const stop = new Date(`${monthStart}T00:00:00Z`);
  const months: PayDeal[][] = [];
  while (cursor < stop) {
    const key = cursor.toISOString().slice(0, 7);
    months.push((byMonth.get(key) ?? []).map(toPayDeal));
    cursor.setUTCMonth(cursor.getUTCMonth() + 1);
  }

  const chain = computeCarry(plan, months);
  return chain.length ? chain[chain.length - 1].carryOut : 0;
}
