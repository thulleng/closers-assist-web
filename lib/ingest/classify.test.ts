/**
 * Classification rules — the money-safety contract.
 *
 * These are deterministic and cost nothing to run. They encode the rule that
 * a dollar amount read from a photo is never written without a human tap.
 */
import { describe, expect, it } from "@jest/globals";
import { classifyDeal, CONFIDENCE_FLOOR } from "./classify";
import { DEFAULT_AUTO_PLAN } from "@/lib/pay-engine";
import type { ExtractedDeal } from "./types";

const field = <T>(value: T, confidence = 1) => ({ value, confidence });

const fullDeal = (overrides: Partial<ExtractedDeal> = {}): ExtractedDeal => ({
  customer_name: field("SMITH, JOHN"),
  vehicle: field("2026 CAMRY SE"),
  stock_number: field("T44821"),
  deal_type: field<"full_deal">("full_deal", 0.95),
  front_gross: field(2140),
  back_gross: field(1485),
  pack: field(0),
  sold_date: field("2026-08-14"),
  salesperson: field("T. LENG"),
  ...overrides,
});

describe("classifyDeal — money safety", () => {
  it("never auto-confirms a full deal: the gross always needs one tap", () => {
    const result = classifyDeal(fullDeal(), "desk_sheet", DEFAULT_AUTO_PLAN);
    expect(result.autoConfirmable).toBe(false);
    expect(result.needs.map((n) => n.reason)).toContain("money_check");
    expect(result.question).toContain("2,140");
  });

  it("flags a misread-looking gross rather than accepting it silently", () => {
    // A degraded photo has produced 2148 for what is printed 2140.
    const result = classifyDeal(
      fullDeal({ front_gross: field(2148) }),
      "desk_sheet",
      DEFAULT_AUTO_PLAN
    );
    expect(result.autoConfirmable).toBe(false);
    expect(result.question).toContain("2,148");
  });

  it("asks a missing blocking field before the money question", () => {
    const result = classifyDeal(
      fullDeal({ customer_name: field<string | null>(null, 0) }),
      "desk_sheet",
      DEFAULT_AUTO_PLAN
    );
    expect(result.question).toMatch(/customer's name/i);
  });

  it("does not double-ask when the gross confidence is already low", () => {
    const result = classifyDeal(
      fullDeal({ front_gross: field(2140, CONFIDENCE_FLOOR - 0.1) }),
      "desk_sheet",
      DEFAULT_AUTO_PLAN
    );
    const grossNeeds = result.needs.filter((n) => n.field === "front_gross");
    expect(grossNeeds).toHaveLength(1);
  });

  it("a mini never asks for money it does not earn", () => {
    const result = classifyDeal(
      fullDeal({
        deal_type: field<"full_mini">("full_mini", 0.95),
        front_gross: field(0),
      }),
      "desk_sheet",
      DEFAULT_AUTO_PLAN
    );
    expect(result.needs.filter((n) => n.reason === "money_check")).toHaveLength(0);
  });

  it("always asks mini-or-full when the doc never says", () => {
    const result = classifyDeal(
      fullDeal({ deal_type: field<string | null>(null, 0) }),
      "desk_sheet",
      DEFAULT_AUTO_PLAN
    );
    expect(result.question).toBe("Mini or full?");
  });

  it("treats a non-deal document as unloggable", () => {
    const result = classifyDeal(fullDeal(), "pay_stub", DEFAULT_AUTO_PLAN);
    expect(result.autoConfirmable).toBe(false);
    expect(result.question).toBeNull();
  });
});
