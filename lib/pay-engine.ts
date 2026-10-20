/**
 * Deterministic pay engine.
 *
 * THE RULE: the LLM never computes money. It extracts. This file computes,
 * in pure TypeScript, from a versioned plan config. Nothing here is async,
 * nothing here touches the network, nothing here reads process.env.
 *
 * If a test in pay-engine.test.ts fails, this file is wrong — not the test.
 */

export type DealType = "half_mini" | "full_mini" | "full_deal" | "street_purchase";

export const DEAL_TYPES: DealType[] = ["half_mini", "full_mini", "full_deal", "street_purchase"];

export interface PayDeal {
  id?: string;
  customer_name?: string | null;
  vehicle?: string | null;
  deal_type: DealType;
  front_gross?: number | null;
  sold_date?: string | null;
}

export interface PayTier {
  units: number;
  bonus: number;
  /** Commission rate applied retroactively to all front gross for the month once hit. */
  retro_pct?: number;
}

export interface SpiffRule {
  label?: string;
  /** Dollars per deal the spiff applies to. */
  amount: number;
  /** If omitted, applies to every deal type. */
  deal_types?: DealType[];
}

export interface PayPlanConfig {
  industry: string;
  minis: { full: number; half: number };
  draw: number;
  commission: { type: "percent_front_gross" | "flat"; rate: number; cap: number | null };
  pack_on_full_deals: number;
  unit_rules: Record<DealType, number>;
  tiers: PayTier[];
  extras: { street_buy: number; cxi_4_8: number; survey_5_0: number; review: number };
  spiffs: SpiffRule[];
}

/** Optional non-deal inputs: CSI/survey/review extras for the month. */
export interface PayExtras {
  cxi_4_8?: boolean;
  survey_5_0?: boolean;
  reviews?: number;
}

export interface PayLine {
  customer_name: string | null;
  deal_type: DealType;
  units: number;
  gross: number;
  /** Base money for this deal at the month's effective rate. */
  base_commission: number;
  spiff: number;
  commission: number;
}

export interface TierProgress {
  units: number;
  current_tier: PayTier | null;
  next_tier: PayTier | null;
  units_to_next: number | null;
  /** Sum of bonuses already earned (highest achieved tier only). */
  bonus_earned: number;
  bonus_at_next: number | null;
  /** Effective commission rate for the month, as a percentage. */
  effective_rate_pct: number;
  tiers_hit: PayTier[];
}

export interface PayResult {
  commission: number;
  units: number;
  tierBonus: number;
  spiffs: number;
  extras: number;
  grossPay: number;
  drawApplied: number;
  netToRep: number;
  carryIn: number;
  carryOut: number;
  effective_rate_pct: number;
  tierProgress: TierProgress;
  lines: PayLine[];
  /** Extra line items, for the "where did this number come from" view. */
  extraLines: { label: string; amount: number }[];
}

const DEFAULT_UNIT_RULES: Record<DealType, number> = {
  full_deal: 1,
  full_mini: 1,
  half_mini: 0.5,
  street_purchase: 0,
};

function round2(n: number): number {
  return Math.round((n + Number.EPSILON) * 100) / 100;
}

function num(v: unknown): number {
  const n = typeof v === "number" ? v : Number(v);
  return Number.isFinite(n) ? n : 0;
}

/** Normalize a plan config so partial/legacy configs can't produce NaN money. */
export function normalizePlan(plan: PayPlanConfig): PayPlanConfig {
  return {
    industry: plan.industry || "auto",
    minis: {
      full: num(plan.minis?.full ?? 400),
      half: num(plan.minis?.half ?? 200),
    },
    draw: num(plan.draw),
    commission: {
      type: plan.commission?.type ?? "percent_front_gross",
      rate: num(plan.commission?.rate),
      cap: plan.commission?.cap ?? null,
    },
    pack_on_full_deals: num(plan.pack_on_full_deals),
    unit_rules: { ...DEFAULT_UNIT_RULES, ...(plan.unit_rules ?? {}) },
    tiers: (plan.tiers ?? [])
      .map((t) => ({ units: num(t.units), bonus: num(t.bonus), retro_pct: t.retro_pct }))
      .filter((t) => t.units > 0)
      .sort((a, b) => a.units - b.units),
    extras: {
      street_buy: num(plan.extras?.street_buy),
      cxi_4_8: num(plan.extras?.cxi_4_8),
      survey_5_0: num(plan.extras?.survey_5_0),
      review: num(plan.extras?.review),
    },
    spiffs: (plan.spiffs ?? []).map((s) => ({ label: s.label, amount: num(s.amount), deal_types: s.deal_types })),
  };
}

/** Units this deal type is worth. Street purchase is always 0 units. */
export function unitsFor(type: DealType, plan: PayPlanConfig): number {
  const rules = plan.unit_rules ?? DEFAULT_UNIT_RULES;
  const units = rules[type];
  return Number.isFinite(units) ? units : DEFAULT_UNIT_RULES[type] ?? 0;
}

/**
 * Compute a month of pay.
 *
 * Money rules, in plain English:
 *  - full mini  → flat plan.minis.full, 1 unit. Zero front gross is fine.
 *  - half mini  → flat plan.minis.half, 0.5 unit.
 *  - full deal  → (front_gross − pack) × rate, 1 unit.
 *  - street     → 0 units; its money is an extra, not commission.
 *  - tiers      → the HIGHEST tier reached pays its bonus ONCE (not cumulative)
 *                 and its retro_pct replaces the base rate for the whole month.
 *  - spiffs     → per deal; a half mini takes half the spiff.
 *  - draw       → applied against commission only. Under-draw months carry the
 *                 shortfall into next month instead of going negative.
 */
export function calculatePay(
  rawPlan: PayPlanConfig,
  deals: PayDeal[],
  opts: { carryIn?: number; extras?: PayExtras } = {}
): PayResult {
  const plan = normalizePlan(rawPlan);
  const carryIn = Math.max(0, num(opts.carryIn));

  // ── Units first: the whole month's rate depends on the unit count ──────────
  const units = round2(deals.reduce((sum, d) => sum + unitsFor(d.deal_type, plan), 0));

  const tiersHit = plan.tiers.filter((t) => units >= t.units);
  const bestTier = tiersHit.length ? tiersHit[tiersHit.length - 1] : null;
  const nextTier = plan.tiers.find((t) => t.units > units) ?? null;

  const baseRatePct = plan.commission.type === "percent_front_gross" ? plan.commission.rate * 100 : 0;
  const retroPct = tiersHit.reduce((max, t) => Math.max(max, num(t.retro_pct)), 0);
  const effectiveRatePct = round2(Math.max(baseRatePct, retroPct));
  const effectiveRate = effectiveRatePct / 100;

  // ── Per-dela money at the month's effective rate ───────────────────────────
  const lines: PayLine[] = deals.map((d) => {
    const frontGross = num(d.front_gross);
    const dealUnits = unitsFor(d.deal_type, plan);
    let base = 0;

    switch (d.deal_type) {
      case "half_mini":
        base = plan.minis.half;
        break;
      case "full_mini":
        base = plan.minis.full;
        break;
      case "full_deal": {
        const taxableGross = Math.max(0, frontGross - plan.pack_on_full_deals);
        base = plan.commission.type === "flat" ? plan.commission.rate : taxableGross * effectiveRate;
        if (plan.commission.cap != null && plan.commission.cap > 0) {
          base = Math.min(base, plan.commission.cap);
        }
        break;
      }
      case "street_purchase":
        base = 0; // paid as an extra below
        break;
    }

    const spiff = plan.spiffs.reduce((sum, s) => {
      const applies = !s.deal_types || s.deal_types.includes(d.deal_type);
      if (!applies) return sum;
      // Half mini takes half the spiff. Flat mini money, flat spiff.
      return sum + (d.deal_type === "half_mini" ? s.amount * 0.5 : s.amount);
    }, 0);

    return {
      customer_name: d.customer_name ?? null,
      deal_type: d.deal_type,
      units: dealUnits,
      gross: frontGross,
      base_commission: round2(base),
      spiff: round2(spiff),
      commission: round2(base + spiff),
    };
  });

  const commission = round2(lines.reduce((s, l) => s + l.base_commission, 0));
  const spiffs = round2(lines.reduce((s, l) => s + l.spiff, 0));
  // POLICY: the HIGHEST tier reached pays its bonus ONCE, never cumulative
  // (11u = $500, 15u = $1000 → $1000 total, not $1500). Do not "fix" this.
  const tierBonus = bestTier ? bestTier.bonus : 0;

  // ── Extras (not commission — never touched by the draw) ───────────────────
  const extraLines: { label: string; amount: number }[] = [];
  const streetCount = deals.filter((d) => d.deal_type === "street_purchase").length;
  if (streetCount > 0) {
    extraLines.push({
      label: `${streetCount} street purchase${streetCount === 1 ? "" : "s"}`,
      amount: plan.extras.street_buy * streetCount,
    });
  }
  if (opts.extras?.cxi_4_8 && plan.extras.cxi_4_8 > 0) {
    extraLines.push({ label: "CXI 4.8+", amount: plan.extras.cxi_4_8 });
  }
  if (opts.extras?.survey_5_0 && plan.extras.survey_5_0 > 0) {
    extraLines.push({ label: "Survey 5.0", amount: plan.extras.survey_5_0 });
  }
  const reviews = Math.max(0, Math.trunc(num(opts.extras?.reviews)));
  if (reviews > 0 && plan.extras.review > 0) {
    extraLines.push({ label: `${reviews} review${reviews === 1 ? "" : "s"}`, amount: plan.extras.review * reviews });
  }
  const extras = round2(extraLines.reduce((s, e) => s + e.amount, 0));

  // ── Draw and carry ────────────────────────────────────────────────────────
  // POLICY: the draw is recovered from base commission ONLY — tier bonus, spiffs
  // and extras are paid on top and are never clawed back by the draw.
  const drawOwed = round2(plan.draw + carryIn);
  const drawApplied = round2(Math.min(commission, drawOwed));
  const carryOut = round2(Math.max(0, drawOwed - commission));

  const grossPay = round2(commission + tierBonus + spiffs + extras);
  const netToRep = round2(grossPay - drawApplied);

  return {
    commission,
    units,
    tierBonus: round2(tierBonus),
    spiffs,
    extras,
    grossPay,
    drawApplied,
    netToRep,
    carryIn,
    carryOut,
    effective_rate_pct: effectiveRatePct,
    tierProgress: {
      units,
      current_tier: bestTier,
      next_tier: nextTier,
      units_to_next: nextTier ? round2(nextTier.units - units) : null,
      bonus_earned: tierBonus,
      bonus_at_next: nextTier ? nextTier.bonus : null,
      effective_rate_pct: effectiveRatePct,
      tiers_hit: tiersHit,
    },
    lines,
    extraLines,
  };
}

/**
 * Month-to-month carry: walk the months the plan has been in effect, feeding each
 * month's shortfall into the next. Pure and deterministic — same input, same number.
 */
export function computeCarry(
  rawPlan: PayPlanConfig,
  dealsByMonth: PayDeal[][],
  opts: { extrasByMonth?: PayExtras[] } = {}
): PayResult[] {
  const results: PayResult[] = [];
  let carry = 0;
  for (let i = 0; i < dealsByMonth.length; i++) {
    const r = calculatePay(rawPlan, dealsByMonth[i], {
      carryIn: carry,
      extras: opts.extrasByMonth?.[i],
    });
    results.push(r);
    carry = r.carryOut;
  }
  return results;
}

/**
 * Adapter: the live `pay_plans` table predates this engine and stores a flat
 * shape (commission_rate / volume_bonuses / …). Read that into a config instead
 * of migrating anyone's data behind their back.
 */
export interface LegacyPlanRow {
  commission_rate?: number | null;
  monthly_draw?: number | null;
  half_mini_amount?: number | null;
  full_mini_amount?: number | null;
  street_purchase_amount?: number | null;
  volume_bonuses?: { units: number; bonus: number }[] | null;
  cxi_threshold?: number | null;
  cxi_bonus?: number | null;
  review_bonus?: number | null;
  config?: PayPlanConfig | null;
}

export function planFromRow(row: LegacyPlanRow | null | undefined): PayPlanConfig | null {
  if (!row) return null;
  if (row.config && typeof row.config === "object") {
    return normalizePlan(row.config as PayPlanConfig);
  }
  const rate = num(row.commission_rate) || 0.25;
  const bonuses = (row.volume_bonuses ?? []).map((b) => ({
    units: num(b.units),
    bonus: num(b.bonus),
    // Legacy plans had no retro step — the tier pays its bonus only.
    retro_pct: rate * 100,
  }));
  return normalizePlan({
    industry: "auto",
    minis: { full: num(row.full_mini_amount) || 400, half: num(row.half_mini_amount) || 200 },
    draw: num(row.monthly_draw),
    commission: { type: "percent_front_gross", rate, cap: null },
    pack_on_full_deals: 0,
    unit_rules: DEFAULT_UNIT_RULES,
    tiers: bonuses,
    extras: {
      street_buy: num(row.street_purchase_amount) || 0,
      cxi_4_8: num(row.cxi_bonus) || 0,
      survey_5_0: 0,
      review: num(row.review_bonus) || 0,
    },
    spiffs: [],
  });
}

/** Thul's real Sun Toyota plan — the seed fixture and default for new auto users. */
export const DEFAULT_AUTO_PLAN: PayPlanConfig = {
  industry: "auto",
  minis: { full: 400, half: 200 },
  draw: 2600,
  commission: { type: "percent_front_gross", rate: 0.25, cap: null },
  pack_on_full_deals: 0,
  unit_rules: { full_deal: 1, full_mini: 1, half_mini: 0.5, street_purchase: 0 },
  tiers: [
    { units: 11, bonus: 500, retro_pct: 25 },
    { units: 13, bonus: 750, retro_pct: 25 },
    { units: 15, bonus: 1000, retro_pct: 30 },
    { units: 17, bonus: 1500, retro_pct: 30 },
    { units: 20, bonus: 2000, retro_pct: 35 },
  ],
  extras: { street_buy: 500, cxi_4_8: 250, survey_5_0: 50, review: 20 },
  spiffs: [],
};

/** One-line money summary used by the confirm screen and the chat reply. */
export function formatPayLine(result: PayResult): string {
  const money = (n: number) => `$${Math.round(n).toLocaleString("en-US")}`;
  const unitStr = Number.isInteger(result.units) ? String(result.units) : result.units.toFixed(1);
  const parts = [`Gross pay ${money(result.grossPay)}`, `${unitStr} units`];
  if (result.tierProgress.next_tier) {
    parts.push(`${result.tierProgress.units_to_next} to next tier`);
  } else if (result.tierBonus > 0) {
    parts.push(`${money(result.tierBonus)} bonus locked`);
  }
  return parts.join(" · ");
}
