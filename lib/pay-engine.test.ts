/**
 * Pay engine contract tests — §6.2 of docs/specs/pwa-screenshot-ingest.md
 *
 * These are the contract. If a test fails, the engine is wrong — not the test.
 */
import { describe, test, expect } from "@jest/globals";
import { calculatePay, computeCarry, planFromRow, DEFAULT_AUTO_PLAN, type PayDeal, type PayPlanConfig } from "./pay-engine";

const fullDeals = (n: number, gross: number): PayDeal[] =>
  Array.from({ length: n }, (_, i) => ({
    customer_name: `Customer ${i + 1}`,
    deal_type: "full_deal" as const,
    front_gross: gross,
  }));

const halfMinis = (n: number): PayDeal[] =>
  Array.from({ length: n }, (_, i) => ({ customer_name: `Half ${i + 1}`, deal_type: "half_mini" as const }));

const fullMinis = (n: number, gross = 0): PayDeal[] =>
  Array.from({ length: n }, (_, i) => ({
    customer_name: `Mini ${i + 1}`,
    deal_type: "full_mini" as const,
    front_gross: gross,
  }));

describe("pay engine — §6.2 fixtures", () => {
  test("4 full + 3 half minis → 5.5 units (not 7)", () => {
    const r = calculatePay(DEFAULT_AUTO_PLAN, [...fullDeals(4, 2000), ...halfMinis(3)]);
    expect(r.units).toBe(5.5);
    expect(r.commission).toBe(4 * 500 + 3 * 200); // 2000 @ 25% + 3 × $200 half mini
  });

  test("15 units → $1,000 bonus and 30% retro on all front gross", () => {
    const deals = fullDeals(15, 2000); // 15 units exactly
    const r = calculatePay(DEFAULT_AUTO_PLAN, deals);
    expect(r.units).toBe(15);
    expect(r.tierBonus).toBe(1000);
    expect(r.effective_rate_pct).toBe(30);
    // 15 × $2,000 × 30% — retro applies to all commission, not just the marginal deal
    expect(r.commission).toBe(9000);
    expect(r.tierProgress.current_tier?.units).toBe(15);
  });

  test("11 units then 13 → retro recomputes, never double-pays", () => {
    const at11 = calculatePay(DEFAULT_AUTO_PLAN, fullDeals(11, 2000));
    expect(at11.tierBonus).toBe(500);
    expect(at11.effective_rate_pct).toBe(25);

    const at13 = calculatePay(DEFAULT_AUTO_PLAN, fullDeals(13, 2000));
    // 750 — the 13-unit bonus REPLACES the 11-unit bonus, it is not 500 + 750
    expect(at13.tierBonus).toBe(750);
    expect(at13.effective_rate_pct).toBe(25);
    expect(at13.commission).toBe(13 * 2000 * 0.25);
    expect(at13.tierProgress.tiers_hit.map((t) => t.units)).toEqual([11, 13]);
  });

  test("zero-gross mini → flat $400, 1 unit, never rejected", () => {
    const r = calculatePay(DEFAULT_AUTO_PLAN, fullMinis(1, 0));
    expect(r.commission).toBe(400);
    expect(r.units).toBe(1);
    expect(r.lines[0].commission).toBe(400);
  });

  test("street purchase → 0 units, $500 paid separately as an extra", () => {
    const r = calculatePay(DEFAULT_AUTO_PLAN, [
      { customer_name: "Street", deal_type: "street_purchase", front_gross: 1200 },
    ]);
    expect(r.units).toBe(0);
    expect(r.commission).toBe(0);
    expect(r.extras).toBe(500);
    expect(r.grossPay).toBe(500);
  });

  test("half mini + $1,000 spiff → $200 + $500 = $700", () => {
    const plan: PayPlanConfig = {
      ...DEFAULT_AUTO_PLAN,
      tiers: [],
      spiffs: [{ label: "Unit spiff", amount: 1000 }],
    };
    const r = calculatePay(plan, halfMinis(1));
    expect(r.commission).toBe(200);
    expect(r.spiffs).toBe(500);
    expect(r.grossPay).toBe(700);
  });

  test("commission > draw → net is commission minus the draw", () => {
    const r = calculatePay(DEFAULT_AUTO_PLAN, fullDeals(12, 2500)); // 12u → $750 tier
    expect(r.commission).toBe(7500);
    expect(r.drawApplied).toBe(2600);
    expect(r.carryOut).toBe(0);
    expect(r.netToRep).toBe(7500 + 500 - 2600);
    expect(r.netToRep - r.tierBonus).toBe(r.commission - 2600);
  });

  test("commission < draw → net 0, shortfall carries into next month", () => {
    const poorMonth = fullDeals(4, 1000); // $1,000 commission, 4 units, no tier
    const r = calculatePay(DEFAULT_AUTO_PLAN, poorMonth);
    expect(r.commission).toBe(1000);
    expect(r.netToRep).toBe(0);
    expect(r.drawApplied).toBe(1000);
    expect(r.carryOut).toBe(1600);

    // Next month starts $1,600 in the hole and must be paid back before the rep nets anything.
    const [m1, m2] = computeCarry(DEFAULT_AUTO_PLAN, [poorMonth, fullDeals(12, 2500)]);
    expect(m1.carryOut).toBe(1600);
    expect(m2.carryIn).toBe(1600);
    expect(m2.drawApplied).toBe(2600 + 1600);
    expect(m2.carryOut).toBe(0);
    expect(m2.netToRep).toBe(7500 + 500 - 4200);
  });
});

describe("pay engine — invariants", () => {
  test("money is never negative and never NaN for junk input", () => {
    const junk: PayDeal[] = [
      { deal_type: "full_deal", front_gross: null },
      { deal_type: "full_mini", front_gross: -500 },
      { deal_type: "half_mini", front_gross: Number.NaN },
    ];
    const r = calculatePay(DEFAULT_AUTO_PLAN, junk);
    for (const v of [r.commission, r.units, r.grossPay, r.netToRep, r.carryOut]) {
      expect(Number.isFinite(v)).toBe(true);
      expect(v).toBeGreaterThanOrEqual(0);
    }
  });

  test("pack comes off front gross before the rate — full deals only", () => {
    const plan: PayPlanConfig = { ...DEFAULT_AUTO_PLAN, tiers: [], pack_on_full_deals: 400, draw: 0 };
    const r = calculatePay(plan, [{ deal_type: "full_deal", front_gross: 2400 }]);
    expect(r.commission).toBe(500); // (2400 − 400) × 25%
  });

  test("commission cap is honoured", () => {
    const plan: PayPlanConfig = { ...DEFAULT_AUTO_PLAN, tiers: [], draw: 0, commission: { type: "percent_front_gross", rate: 0.25, cap: 1000 } };
    const r = calculatePay(plan, [{ deal_type: "full_deal", front_gross: 20000 }]);
    expect(r.commission).toBe(1000);
  });

  test("legacy $0 mini stays $0 — nullish defaults never overwrite a real zero", () => {
    const cfg = planFromRow({ commission_rate: 0.25, monthly_draw: 0, full_mini_amount: 0, half_mini_amount: 0 })!;
    expect(cfg.minis.full).toBe(0);
    expect(cfg.minis.half).toBe(0);
    const r = calculatePay(cfg, [{ deal_type: "full_mini", front_gross: 0 }]);
    expect(r.commission).toBe(0);
    expect(r.units).toBe(1);
  });

  test("legacy pay_plans row maps to a usable config", () => {
    const cfg = planFromRow({
      commission_rate: 0.25,
      monthly_draw: 2600,
      half_mini_amount: 200,
      full_mini_amount: 400,
      street_purchase_amount: 500,
      volume_bonuses: [{ units: 11, bonus: 500 }, { units: 15, bonus: 1000 }],
      cxi_bonus: 250,
      review_bonus: 20,
    })!;
    expect(cfg.draw).toBe(2600);
    expect(cfg.tiers.map((t) => t.units)).toEqual([11, 15]);
    const r = calculatePay(cfg, [...fullDeals(4, 2000), ...halfMinis(3)]);
    expect(r.units).toBe(5.5);
  });

  test("config jsonb wins over legacy columns when both exist", () => {
    const cfg = planFromRow({ commission_rate: 0.1, config: DEFAULT_AUTO_PLAN })!;
    expect(cfg.commission.rate).toBe(0.25);
  });
});
