import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";
import { createClient } from "@/lib/supabase/server";
import { confirmDraft, DuplicateError, IngestError } from "@/lib/ingest/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

interface ConfirmBody {
  draft_id: string;
  patches?: Record<string, unknown>;
  force?: boolean;
}

/**
 * POST { draft_id, patches?, force? } → confirm a draft into a real deal.
 * All money is computed by the pay engine here, never by a model.
 */
export async function POST(req: NextRequest) {
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const body = (await req.json()) as ConfirmBody;
    if (!body.draft_id) {
      return NextResponse.json({ error: "draft_id is required" }, { status: 400 });
    }

    const admin = createAdminClient();
    const result = await confirmDraft(admin, {
      draftId: body.draft_id,
      userId: user.id,
      patches: body.patches,
      force: body.force === true,
    });

    return NextResponse.json({ ok: true, deal: result.deal, month_state: result.month, duplicate: result.duplicate });
  } catch (err) {
    if (err instanceof DuplicateError) {
      return NextResponse.json(
        { error: err.message, code: "duplicate", duplicate: true, existing_id: err.existingId },
        { status: 409 }
      );
    }
    if (err instanceof IngestError) {
      return NextResponse.json({ error: err.message, code: err.code }, { status: 422 });
    }
    console.error("[ingest/confirm] error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal error" },
      { status: 500 }
    );
  }
}
