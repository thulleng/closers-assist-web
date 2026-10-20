/**
 * Vision → strict JSON. Extraction only — this file must never compute money.
 *
 * Everything a rep photographs goes through here: PWA camera, Telegram photo,
 * Twilio MMS. One pipeline, three doors.
 */
import Anthropic from "@anthropic-ai/sdk";
import sharp from "sharp";
import { coerceExtraction, type Extraction } from "./types";

export class IngestError extends Error {
  code: "no_key" | "bad_image" | "unreadable" | "rate_limited" | "no_deal";
  constructor(code: IngestError["code"], message: string) {
    super(message);
    this.code = code;
    this.name = "IngestError";
  }
}

/** Vision model chain. First one that the key accepts wins, then it sticks. */
const DEFAULT_MODELS = [
  "claude-sonnet-4-5-20250929",
  "claude-3-7-sonnet-latest",
  "claude-3-5-sonnet-latest",
];

let stickyModel: string | null = null;

function models(): string[] {
  const configured = (process.env.INGEST_VISION_MODEL ?? "")
    .split(",")
    .map((m) => m.trim())
    .filter(Boolean);
  const chain = configured.length ? configured : DEFAULT_MODELS;
  return stickyModel ? [stickyModel, ...chain.filter((m) => m !== stickyModel)] : chain;
}

const PROMPT = `You read photographed car-dealership paperwork for a sales rep's private ledger.

Return STRICT JSON only. No prose, no markdown fences, no explanation.

{
  "doc_kind": "desk_sheet" | "buyers_order" | "pay_sheet" | "crm_screenshot" | "pay_stub" | "other",
  "deals": [
    {
      "customer_name": {"value": "J. Smith" | null, "confidence": 0.0-1.0},
      "vehicle": {"value": "2026 Camry SE" | null, "confidence": 0.0-1.0},
      "stock_number": {"value": "T44821" | null, "confidence": 0.0-1.0},
      "deal_type": {"value": "half_mini" | "full_mini" | "full_deal" | "street_purchase" | null, "confidence": 0.0-1.0},
      "front_gross": {"value": number | null, "confidence": 0.0-1.0},
      "back_gross": {"value": number | null, "confidence": 0.0-1.0},
      "pack": {"value": number | null, "confidence": 0.0-1.0},
      "sold_date": {"value": "YYYY-MM-DD" | null, "confidence": 0.0-1.0},
      "salesperson": {"value": "T. Leng" | null, "confidence": 0.0-1.0}
    }
  ],
  "raw_text": "the lines you actually read, transcribed, one per line"
}

RULES — follow exactly:
1. NEVER guess a number. If you cannot read it, value is null and confidence is 0. A null is always better than a wrong dollar amount.
2. NEVER compute commission, pay, unit counts, or totals. Extract only what is printed.
3. Multiple deals on one sheet → put each one in the "deals" array. One deal → an array with one item.
4. deal_type: only set it when the document says so ("mini", "half mini", "full deal", "street purchase"). Gross amount alone is NOT evidence of deal type. If unclear, null with low confidence.
5. front_gross is the front-end gross profit in dollars. It is not the selling price, not the MSRP, not the total.
6. Confidence is your honest read probability, not politeness. Blurry field = 0.4, not 0.9.
7. If the image is not paperwork at all, doc_kind "other" and deals [].
8. If the photo is rotated or handwritten, still do your best; transcribe handwriting into value and put your reading in raw_text.`;

export interface ExtractInput {
  bytes: Buffer | Uint8Array;
  mediaType: string;
  caption?: string | null;
}

export interface ExtractResult {
  extraction: Extraction;
  model: string;
  attempts: number;
  usage: { input_tokens: number; output_tokens: number } | null;
  /** Normalized JPEG bytes — this is what gets stored as evidence, EXIF stripped. */
  normalized: Buffer;
}

const MAX_EDGE = 1800;

/**
 * Normalize a phone photo: EXIF-rotate, downscale, strip metadata (a desk sheet
 * photo carries GPS and timestamps — neither belongs in evidence storage).
 */
export async function normalizeImage(bytes: Buffer, mediaType: string): Promise<Buffer> {
  const okTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp", "image/heic", "image/heif"];
  if (!okTypes.includes(mediaType.toLowerCase())) {
    throw new IngestError("bad_image", `That file type (${mediaType}) isn't an image I can read.`);
  }

  try {
    return await sharp(bytes, { failOn: "none" })
      .rotate()
      .resize({ width: MAX_EDGE, height: MAX_EDGE, fit: "inside", withoutEnlargement: true })
      .jpeg({ quality: 82, mozjpeg: true })
      .toBuffer();
  } catch {
    throw new IngestError("bad_image", "I couldn't open that image. Try a screenshot of it instead of the raw file.");
  }
}

export async function extractDocument(input: ExtractInput): Promise<ExtractResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    throw new IngestError("no_key", "Vision is not configured (ANTHROPIC_API_KEY missing).");
  }

  const source = Buffer.isBuffer(input.bytes) ? input.bytes : Buffer.from(input.bytes);
  const normalized = await normalizeImage(source, input.mediaType);
  if (normalized.byteLength < 3_000) {
    throw new IngestError("unreadable", "That image is basically empty. Retake it?");
  }

  const client = new Anthropic({ apiKey });
  const b64 = normalized.toString("base64");
  const caption = (input.caption ?? "").trim();

  let lastError: unknown = null;

  for (const model of models()) {
    for (let attempt = 1; attempt <= 2; attempt++) {
      try {
        const res = await client.messages.create({
          model,
          max_tokens: 2000,
          temperature: 0,
          messages: [
            {
              role: "user",
              content: [
                { type: "image", source: { type: "base64", media_type: "image/jpeg", data: b64 } },
                {
                  type: "text",
                  text:
                    PROMPT +
                    (caption ? `\n\nRep's caption with this photo: "${caption}"` : "") +
                    (attempt > 1 ? `\n\nYour previous reply could not be parsed as JSON (${String(lastError)}). Reply with the JSON object only.` : ""),
                },
              ],
            },
          ],
        });

        stickyModel = model;
        const text = res.content
          .filter((block): block is Anthropic.TextBlock => block.type === "text")
          .map((block) => block.text)
          .join("\n");

        const extraction = coerceExtraction(text);
        if (extraction.deals.length === 0 && ["desk_sheet", "buyers_order", "crm_screenshot"].includes(extraction.doc_kind)) {
          throw new IngestError("unreadable", "I can see paperwork but couldn't read a deal on it. Retake it in better light?");
        }

        return {
          extraction,
          model,
          attempts: attempt,
          usage: res.usage
            ? { input_tokens: res.usage.input_tokens, output_tokens: res.usage.output_tokens }
            : null,
          normalized,
        };
      } catch (err) {
        if (err instanceof IngestError) throw err;
        lastError = err;

        const message = err instanceof Error ? err.message : String(err);
        // Unknown model for this key → try the next one instead of failing the rep.
        if (/model|not[_ ]found|404/i.test(message)) break;
        // Auth / billing problems are not fixed by retrying.
        if (/401|403|api key|authentication|credit/i.test(message)) {
          throw new IngestError("no_key", "Vision credentials are rejected. Check ANTHROPIC_API_KEY.");
        }
        // Otherwise: one retry, then give the rep a real message.
        if (attempt === 2) {
          throw new IngestError("unreadable", "I couldn't read that photo. Try again with more light, or type the deal.");
        }
      }
    }
  }

  throw new IngestError(
    "unreadable",
    `Vision failed on every configured model. Last error: ${lastError instanceof Error ? lastError.message : String(lastError)}`
  );
}
