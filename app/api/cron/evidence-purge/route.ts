// Evidence retention cron — daily.
//
// The receipt image lives 30 days, then the object is deleted and the row's
// storage_path is nulled. The deal, the extracted JSON, and the audit trail
// stay forever. Expired drafts are swept in the same pass.
//
// Auth: Bearer CRON_SECRET (same contract as the other crons in this repo).

import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";
import { EVIDENCE_BUCKET } from "@/lib/ingest/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const BATCH = 200;
const MAX_BATCHES = 5; // hard cap per run so a backlog can never time out the cron

export async function GET(req: NextRequest) {
  if (req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const admin = createAdminClient();
  let purged = 0;
  let failed = 0;
  let batches = 0;

  while (batches < MAX_BATCHES) {
    batches++;

    const { data: due, error } = await admin.rpc("evidence_due_for_purge", {
      batch_size: BATCH,
    });

    if (error) {
      console.error("[evidence-purge] query failed:", error.message);
      return NextResponse.json(
        { ok: false, error: error.message, purged, failed },
        { status: 500 }
      );
    }

    const rows = (due ?? []) as { id: string; storage_path: string }[];
    if (rows.length === 0) break;

    const paths = rows.map((r) => r.storage_path);

    const { error: removeError } = await admin.storage
      .from(EVIDENCE_BUCKET)
      .remove(paths);

    if (removeError) {
      // Storage failure: keep storage_path so the next run retries.
      console.error("[evidence-purge] storage remove failed:", removeError.message);
      failed += rows.length;
      break;
    }

    const { error: updateError } = await admin
      .from("deal_evidence")
      .update({ storage_path: null })
      .in("id", rows.map((r) => r.id));

    if (updateError) {
      console.error("[evidence-purge] row update failed:", updateError.message);
      failed += rows.length;
      break;
    }

    purged += rows.length;
    if (rows.length < BATCH) break;
  }

  const { data: expiredDrafts, error: draftError } = await admin.rpc(
    "purge_expired_drafts"
  );

  if (draftError) {
    console.error("[evidence-purge] draft sweep failed:", draftError.message);
  }

  return NextResponse.json({
    ok: true,
    evidence_purged: purged,
    evidence_failed: failed,
    drafts_expired: expiredDrafts ?? 0,
    batches,
  });
}
