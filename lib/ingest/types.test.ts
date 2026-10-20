/**
 * Extraction coercion — the model's promise is not the contract.
 *
 * The prompt says "doc_kind other ⇒ deals []", but models violate it. These
 * tests lock the parser-side enforcement so a hallucinated deal on a non-paper
 * photo is dropped in code, not trusted to the model to follow a rule.
 */
import { describe, expect, it } from "@jest/globals";
import { coerceExtraction } from "./types";

describe("coerceExtraction — doc_kind other ⇒ deals []", () => {
  it("drops deals the model emitted alongside doc_kind 'other'", () => {
    const result = coerceExtraction({
      doc_kind: "other",
      deals: [{ customer_name: { value: "SMITH", confidence: 0.9 } }],
      raw_text: "a random photo",
    });
    expect(result.doc_kind).toBe("other");
    expect(result.deals).toHaveLength(0);
  });

  it("keeps deals for a real desk sheet", () => {
    const result = coerceExtraction({
      doc_kind: "desk_sheet",
      deals: [{ customer_name: { value: "SMITH", confidence: 0.9 } }],
      raw_text: "SMITH 2140",
    });
    expect(result.doc_kind).toBe("desk_sheet");
    expect(result.deals).toHaveLength(1);
  });

  it("treats an unknown doc_kind as 'other' and drops deals too", () => {
    const result = coerceExtraction({
      doc_kind: "mystery_document",
      deals: [{ customer_name: { value: "SMITH", confidence: 0.9 } }],
      raw_text: "",
    });
    expect(result.doc_kind).toBe("other");
    expect(result.deals).toHaveLength(0);
  });
});
