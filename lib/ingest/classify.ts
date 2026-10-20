/**
 * Which fields a given document must contain before a rep is asked to confirm,
 * and how we ask for what's missing. Exactly one question. Never a blank form.
 */
import type { PayPlanConfig } from "@/lib/pay-engine";
import type { ClassifiedDeal, ConfidenceMap, DocKind, DraftFields, ExtractedDeal, Extraction, Need } from "./types";
import { DEAL_DOC_KINDS } from "./types";

/** Below this, a field is "read it back to me" territory, not "trust me". */
export const CONFIDENCE_FLOOR = 0.75;

const REQUIRED: Record<DocKind, (keyof DraftFields)[]> = {
  desk_sheet: ["customer_name", "vehicle", "deal_type", "sold_date"],
  buyers_order: ["customer_name", "vehicle", "sold_date", "front_gross"],
  crm_screenshot: ["customer_name", "vehicle", "sold_date", "deal_type"],
  pay_sheet: ["customer_name", "sold_date"],
  pay_stub: [],
  other: [],
};

const QUESTIONS: Record<string, string> = {
  customer_name: "What's the customer's name?",
  vehicle: "Which vehicle was it?",
  deal_type: "Mini or full?",
  front_gross: "What was the front gross?",
  sold_date: "What date did it sell?",
};

/** The order we ask in when several things are missing. First one wins. */
const QUESTION_PRIORITY: (keyof DraftFields)[] = [
  "deal_type",
  "front_gross",
  "customer_name",
  "sold_date",
  "vehicle",
];

export function isDealDoc(kind: DocKind): boolean {
  return DEAL_DOC_KINDS.includes(kind);
}

function needsFrontGross(deal: ExtractedDeal): boolean {
  return deal.deal_type.value === "full_deal";
}

export function classifyDeal(deal: ExtractedDeal, docKind: DocKind, plan: PayPlanConfig): ClassifiedDeal {
  const fields: DraftFields = {
    customer_name: deal.customer_name.value,
    vehicle: deal.vehicle.value,
    stock_number: deal.stock_number.value,
    deal_type: (deal.deal_type.value as DraftFields["deal_type"]) ?? null,
    front_gross: deal.front_gross.value,
    back_gross: deal.back_gross.value,
    pack: deal.pack.value,
    sold_date: deal.sold_date.value,
    salesperson: deal.salesperson.value,
  };

  const confidence: ConfidenceMap = {
    customer_name: deal.customer_name.confidence,
    vehicle: deal.vehicle.confidence,
    stock_number: deal.stock_number.confidence,
    deal_type: deal.deal_type.confidence,
    front_gross: deal.front_gross.confidence,
    back_gross: deal.back_gross.confidence,
    pack: deal.pack.confidence,
    sold_date: deal.sold_date.confidence,
    salesperson: deal.salesperson.confidence,
  };

  const needs: Need[] = [];
  const required = new Set<keyof DraftFields>(REQUIRED[docKind] ?? []);
  if (needsFrontGross(deal)) required.add("front_gross");

  for (const field of required) {
    const value = fields[field];
    const conf = confidence[field] ?? 0;
    const empty = value == null || value === "";
    if (empty) {
      needs.push({ field, reason: "missing", message: QUESTIONS[field] ?? `What's the ${String(field).replace(/_/g, " ")}?` });
    } else if (conf < CONFIDENCE_FLOOR) {
      needs.push({
        field,
        reason: "low_confidence",
        message: `I read ${String(field).replace(/_/g, " ")} as “${String(value)}” — is that right?`,
      });
    }
  }

  // Mini/full ambiguity: no explicit language, or full-deal gross sitting at mini
  // level. Both always require a human tap. Never guess the rep's money.
  const gross = fields.front_gross;
  if (fields.deal_type === "full_deal" && gross != null && gross <= plan.minis.full) {
    needs.push({
      field: "deal_type",
      reason: "ambiguous",
      message: "Mini or full?",
    });
  }
  if (!fields.deal_type) {
    needs.push({ field: "deal_type", reason: "missing", message: "Mini or full?" });
  }

  // One question, highest-priority field with a real human prompt.
  const ambiguous = needs.find((n) => n.reason === "ambiguous");
  const ordered = QUESTION_PRIORITY.map((f) =>
    needs.find((n) => n.field === f && n.reason !== "ambiguous")
  ).find(Boolean);
  const question = ambiguous?.message ?? ordered?.message ?? null;

  const isDeal = isDealDoc(docKind);
  return {
    fields,
    confidence,
    needs: dedupeNeeds(needs),
    question: isDeal ? question : null,
    autoConfirmable: isDeal && needs.length === 0,
  };
}

function dedupeNeeds(needs: Need[]): Need[] {
  const seen = new Set<string>();
  return needs.filter((n) => {
    const key = `${n.field}:${n.reason}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function classifyExtraction(ext: Extraction, plan: PayPlanConfig): ClassifiedDeal[] {
  return ext.deals.map((d) => classifyDeal(d, ext.doc_kind, plan));
}

/** Human doc-kind label for replies. Never send a snake_case string to a rep. */
export const DOC_KIND_LABEL: Record<DocKind, string> = {
  desk_sheet: "desk sheet",
  buyers_order: "buyer's order",
  pay_sheet: "pay sheet",
  crm_screenshot: "CRM screenshot",
  pay_stub: "pay stub",
  other: "photo",
};
