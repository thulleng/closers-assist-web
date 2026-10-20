/**
 * Live vision extraction — real Anthropic call against a generated fixture.
 *
 * Skipped by default so CI never spends tokens:
 *   set -a; . ./.env.sync; set +a
 *   RUN_LIVE_EXTRACT=1 npx jest lib/ingest/extract.live.test.ts
 */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it, jest } from "@jest/globals";
import { extractDocument } from "./extract";
import { classifyDeal } from "./classify";
import { DEFAULT_AUTO_PLAN } from "@/lib/pay-engine";

const LIVE = process.env.RUN_LIVE_EXTRACT === "1";
const maybe = LIVE ? describe : describe.skip;

maybe("live vision extraction", () => {
  jest.setTimeout(150_000);

  it("reads the clean desk sheet without inventing numbers", async () => {
    const path = join(process.cwd(), "scripts/acceptance/fixtures/desk_sheet_clean.png");
    const result = await extractDocument({
      bytes: readFileSync(path),
      mediaType: "image/png",
    });

    const deal = result.extraction.deals[0];
    expect(result.extraction.doc_kind).toBe("desk_sheet");
    expect(deal).toBeDefined();
    expect(deal.customer_name.value?.toUpperCase()).toContain("SMITH");
    expect(deal.vehicle.value?.toUpperCase()).toContain("CAMRY");
    expect(deal.front_gross.value).toBe(2140);
    expect(deal.deal_type.value).toBe("full_deal");

    // Evidence image is normalized JPEG, EXIF stripped.
    expect(result.normalized.length).toBeGreaterThan(1000);

    console.log(
      JSON.stringify(
        { model: result.model, attempts: result.attempts, usage: result.usage, deal },
        null,
        2
      )
    );
  });

  it("reads a zero-gross mini without inventing money", async () => {
    const path = join(process.cwd(), "scripts/acceptance/fixtures/desk_sheet_mini.png");
    const result = await extractDocument({
      bytes: readFileSync(path),
      mediaType: "image/png",
    });

    const deal = result.extraction.deals[0];
    expect(deal).toBeDefined();
    expect(deal.customer_name.value?.toUpperCase()).toContain("ORTIZ");
    expect(deal.deal_type.value).toBe("full_mini");
    // Either it reads $0 or it declines to guess. A wrong number fails the test.
    expect([0, null]).toContain(deal.front_gross.value);
  });

  it("refuses to invent numbers from a degraded photo", async () => {
    const path = join(process.cwd(), "scripts/acceptance/fixtures/desk_sheet_blurry.jpg");
    const result = await extractDocument({
      bytes: readFileSync(path),
      mediaType: "image/jpeg",
    });

    const ext = result.extraction;
    const deal = ext.deals[0];

    // The guarantee is not accuracy — it is that nothing is written without a
    // human tap. Even a misread gross (we have seen 2148 for a printed 2140)
    // must come back as "confirm this number", never as a silent ledger write.
    if (deal) {
      const classified = classifyDeal(deal, "desk_sheet", DEFAULT_AUTO_PLAN);
      expect(classified.autoConfirmable).toBe(false);
      expect(classified.question).toMatch(/\$/);
    }

    console.log(
      JSON.stringify(
        {
          model: result.model,
          blurry: {
            doc_kind: ext.doc_kind,
            deals: ext.deals.length,
            customer: deal?.customer_name ?? null,
            front_gross: deal?.front_gross ?? null,
            deal_type: deal?.deal_type ?? null,
          },
        },
        null,
        2
      )
    );
  });
});
