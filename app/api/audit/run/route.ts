import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";
import { createClient } from "@/lib/supabase/server";
import { runAudit } from "@/lib/ingest/audit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_FILES = 10;
const MAX_BYTES = 12 * 1024 * 1024;

/**
 * POST multipart(files[], from?, to?) → diff photographed docs against the ledger.
 * Returns matches, unlogged deals, estimated uncollected, and unit delta.
 */
export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const form = await req.formData();
    const entries = form.getAll("files").filter((f): f is File => f instanceof File);

    if (!entries.length) {
      return NextResponse.json({ error: "files[] is required (multipart, up to 10)" }, { status: 400 });
    }
    if (entries.length > MAX_FILES) {
      return NextResponse.json({ error: `Up to ${MAX_FILES} files at once.` }, { status: 400 });
    }

    const files = [];
    for (const f of entries) {
      if (f.size > MAX_BYTES) {
        return NextResponse.json({ error: "One or more images exceed 12 MB." }, { status: 413 });
      }
      files.push({ bytes: Buffer.from(await f.arrayBuffer()), mediaType: f.type || "image/jpeg" });
    }

    const admin = createAdminClient();
    const result = await runAudit(admin, user.id, files);

    return NextResponse.json({ ok: true, ...result });
  } catch (err) {
    console.error("[audit/run] error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal error" },
      { status: 500 }
    );
  }
}
