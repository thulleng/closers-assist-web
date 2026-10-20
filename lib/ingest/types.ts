/**
 * The extraction contract. One place that defines what a vision model is allowed
 * to hand us, and what we do with it when it hands us something malformed.
 *
 * Rule: extraction only. No commission, no units, no money math in this file.
 */
import { z } from "zod";
import type { DealType } from "@/lib/pay-engine";

export const DOC_KINDS = [
  "desk_sheet",
  "buyers_order",
  "pay_sheet",
  "crm_screenshot",
  "pay_stub",
  "other",
] as const;
export type DocKind = (typeof DOC_KINDS)[number];

/** Doc kinds that describe an actual deal we can log. */
export const DEAL_DOC_KINDS: DocKind[] = ["desk_sheet", "buyers_order", "crm_screenshot"];

export const fieldString = z.object({
  value: z.string().nullable().default(null),
  confidence: z.number().min(0).max(1).default(0),
});

export const fieldNumber = z.object({
  value: z.number().nullable().default(null),
  confidence: z.number().min(0).max(1).default(0),
});

export const extractedDealSchema = z.object({
  customer_name: fieldString,
  vehicle: fieldString,
  stock_number: fieldString,
  deal_type: fieldString,
  front_gross: fieldNumber,
  back_gross: fieldNumber,
  pack: fieldNumber,
  sold_date: fieldString,
  salesperson: fieldString,
});

export type ExtractedDeal = z.infer<typeof extractedDealSchema>;
export type Field<K> = { value: K | null; confidence: number };

export const extractionSchema = z.object({
  doc_kind: z.enum(DOC_KINDS).default("other"),
  deals: z.array(extractedDealSchema).default([]),
  raw_text: z.string().default(""),
});

export type Extraction = z.infer<typeof extractionSchema>;

/** Fields a rep can edit, and the shape stored in deal_drafts.fields. */
export interface DraftFields {
  customer_name: string | null;
  vehicle: string | null;
  stock_number: string | null;
  deal_type: DealType | null;
  front_gross: number | null;
  back_gross: number | null;
  pack: number | null;
  sold_date: string | null;
  salesperson: string | null;
}

export type ConfidenceMap = Partial<Record<keyof DraftFields, number>>;

export interface Need {
  field: keyof DraftFields | "doc_kind";
  reason: "missing" | "low_confidence" | "ambiguous" | "money_check";
  message: string;
}

export interface ClassifiedDeal {
  fields: DraftFields;
  confidence: ConfidenceMap;
  needs: Need[];
  /** Exactly zero or one question. Never a form. */
  question: string | null;
  /** Ready to confirm with no further input? */
  autoConfirmable: boolean;
}

// ── Lenient coercion ────────────────────────────────────────────────────────
// A good extraction should not die because the model wrote "$2,140" instead of
// 2140, or "8/14/26" instead of 2026-08-14. Clean the shape, then validate.

const MONEY = /-?\$?\s*([\d,]+(?:\.\d+)?)/;
const NUM = /-?\d+(?:\.\d+)?/;

export function coerceMoney(v: unknown): number | null {
  if (typeof v === "number") return Number.isFinite(v) ? v : null;
  if (typeof v !== "string") return null;
  const m = v.replace(/[()]/g, (c) => (c === "(" ? "-" : "")).match(MONEY);
  if (!m) return null;
  const n = Number(m[1].replace(/,/g, ""));
  return Number.isFinite(n) ? n : null;
}

export function coerceNumber(v: unknown): number | null {
  if (typeof v === "number") return Number.isFinite(v) ? v : null;
  if (typeof v !== "string") return null;
  const m = v.match(NUM);
  if (!m) return null;
  const n = Number(m[0]);
  return Number.isFinite(n) ? n : null;
}

/** MM/DD/YY, MM-DD-YYYY, "Aug 14 2026", ISO → YYYY-MM-DD. Null if unparseable. */
export function coerceDate(v: unknown): string | null {
  if (typeof v !== "string" && typeof v !== "number") return null;
  const s = String(v).trim();
  if (!s) return null;

  const iso = s.match(/^(\d{4})-(\d{2})-(\d{2})/);
  if (iso) return `${iso[1]}-${iso[2]}-${iso[3]}`;

  const us = s.match(/^(\d{1,2})[/-](\d{1,2})[/-](\d{2,4})$/);
  if (us) {
    const year = us[3].length === 2 ? `20${us[3]}` : us[3];
    return `${year}-${us[1].padStart(2, "0")}-${us[2].padStart(2, "0")}`;
  }

  const parsed = new Date(s);
  if (!Number.isNaN(parsed.getTime())) return parsed.toISOString().slice(0, 10);
  return null;
}

const DEAL_TYPE_PATTERNS: [RegExp, DealType][] = [
  [/\bhalf[\s-]*mini\b/i, "half_mini"],
  [/\bfull[\s-]*mini\b/i, "full_mini"],
  [/\bstreet\s*(buy|purchase)\b/i, "street_purchase"],
  [/\bhalf\s*(deal|unit)\b/i, "half_mini"],
];

export function coerceDealType(v: unknown, haystack = ""): { value: DealType | null; explicit: boolean } {
  const raw = typeof v === "string" ? v.trim().toLowerCase() : "";
  const normalized = raw.replace(/[\s-]+/g, "_");
  const direct: Record<string, DealType> = {
    half_mini: "half_mini",
    full_mini: "full_mini",
    mini: "full_mini",
    full_deal: "full_deal",
    full: "full_deal",
    street_purchase: "street_purchase",
    street: "street_purchase",
  };
  if (direct[normalized]) {
    // "mini" / "full" alone are not explicit enough to skip confirmation.
    const explicit = !["mini", "full", "street"].includes(normalized);
    return { value: direct[normalized], explicit };
  }
  for (const [pattern, type] of DEAL_TYPE_PATTERNS) {
    if (pattern.test(raw) || pattern.test(haystack)) return { value: type, explicit: true };
  }
  return { value: null, explicit: false };
}

function fieldOf(input: unknown): { value: unknown; confidence: number } {
  if (input && typeof input === "object" && "value" in (input as Record<string, unknown>)) {
    const obj = input as Record<string, unknown>;
    const conf = coerceNumber(obj.confidence);
    return { value: obj.value, confidence: conf == null ? 0 : Math.max(0, Math.min(1, conf)) };
  }
  // Model returned a bare value — usable, but never trusted at high confidence.
  return { value: input, confidence: input == null || input === "" ? 0 : 0.5 };
}

/**
 * Turn whatever the model actually returned into a validated Extraction.
 * Accepts: { deals: [...] }, a single deal object, or a JSON string.
 * Throws on shapes we genuinely cannot use (caller retries once).
 */
export function coerceExtraction(input: unknown): Extraction {
  let raw: unknown = input;

  if (typeof raw === "string") {
    raw = parseJsonLoose(raw);
  }
  if (!raw || typeof raw !== "object") throw new Error("extraction: not an object");

  const obj = raw as Record<string, unknown>;
  const rawText = typeof obj.raw_text === "string" ? obj.raw_text : "";

  let dealArrays: unknown[] = [];
  if (Array.isArray(obj.deals)) dealArrays = obj.deals;
  else if (obj.customer_name || obj.front_gross || obj.vehicle) dealArrays = [obj]; // top-level single deal

  const deals: ExtractedDeal[] = dealArrays.slice(0, 10).map((d) => {
    const o = (d ?? {}) as Record<string, unknown>;
    const str = (k: string) => {
      const f = fieldOf(o[k]);
      const v = f.value == null ? null : String(f.value).trim() || null;
      return { value: v, confidence: f.confidence };
    };
    const money = (k: string) => {
      const f = fieldOf(o[k]);
      return { value: coerceMoney(f.value), confidence: f.value == null ? 0 : f.confidence };
    };

    const dealTypeRaw = fieldOf(o.deal_type);
    const dt = coerceDealType(dealTypeRaw.value, rawText);

    return {
      customer_name: str("customer_name"),
      vehicle: str("vehicle"),
      stock_number: str("stock_number"),
      deal_type: { value: dt.value, confidence: dt.value ? (dt.explicit ? dealTypeRaw.confidence : Math.min(dealTypeRaw.confidence, 0.5)) : 0 },
      front_gross: money("front_gross"),
      back_gross: money("back_gross"),
      pack: money("pack"),
      sold_date: (() => {
        const f = fieldOf(o.sold_date);
        return { value: coerceDate(f.value), confidence: f.value == null ? 0 : f.confidence };
      })(),
      salesperson: str("salesperson"),
    };
  });

  const kindRaw = typeof obj.doc_kind === "string" ? obj.doc_kind.trim().toLowerCase() : "other";
  const doc_kind = (DOC_KINDS as readonly string[]).includes(kindRaw) ? (kindRaw as DocKind) : "other";

  // The prompt says "doc_kind other ⇒ deals []" but models violate it (emitting
  // "other" AND a deal). Enforce it here in code — if it's not paperwork, drop
  // whatever deals it hallucinated. The model's promise is not the contract.
  const finalDeals = doc_kind === "other" ? [] : deals;

  return extractionSchema.parse({ doc_kind, deals: finalDeals, raw_text: rawText });
}

/** Models love fences and prose. Strip them before parsing. */
export function parseJsonLoose(text: string): unknown {
  const trimmed = text.trim().replace(/^```(?:json)?/i, "").replace(/```$/, "").trim();
  try {
    return JSON.parse(trimmed);
  } catch {
    const start = trimmed.indexOf("{");
    const end = trimmed.lastIndexOf("}");
    if (start >= 0 && end > start) {
      return JSON.parse(trimmed.slice(start, end + 1));
    }
    throw new Error("extraction: unparseable JSON");
  }
}
