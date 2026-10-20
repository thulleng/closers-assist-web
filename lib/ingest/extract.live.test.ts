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
});
