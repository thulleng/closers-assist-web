import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";
import { createClient } from "@/lib/supabase/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST { draft_id } → mark a draft discarded. Owner-only via the user_id guard.
 */
export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const body = (await req.json()) as { draft_id?: string };
    if (!body.draft_id) {
      return NextResponse.json({ error: "draft_id is required" }, { status: 400 });
    }

    const admin = createAdminClient();
    const { error } = await admin
      .from("deal_drafts")
      .update({ status: "discarded" })
      .eq("id", body.draft_id)
      .eq("user_id", user.id)
      .eq("status", "pending");

    if (error) {
      console.error("[ingest/discard] error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("[ingest/discard] error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal error" },
      { status: 500 }
    );
  }
}
