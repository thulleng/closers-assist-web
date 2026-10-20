import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";
import { createClient } from "@/lib/supabase/server";
import { ingestImage, IngestError } from "@/lib/ingest/store";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BYTES = 12 * 1024 * 1024; // 12 MB — a phone photo, not a video

/**
 * POST multipart(file, source, caption?) → run the ingest pipeline.
 * Returns drafts the rep confirms, or an IngestError message.
 */
export async function POST(req: NextRequest) {
  try {
    // ── Auth: session user (PWA / web) ──────────────────────────────────────
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    const form = await req.formData();
    const file = form.get("file");
    const source = (form.get("source") as string) || "pwa";
    const caption = (form.get("caption") as string) || null;

    if (!(file instanceof File)) {
      return NextResponse.json({ error: "file is required (multipart)" }, { status: 400 });
    }
    if (!["pwa", "telegram", "sms", "whatsapp"].includes(source)) {
      return NextResponse.json({ error: "source must be pwa|telegram|sms|whatsapp" }, { status: 400 });
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json({ error: "Image too large — 12 MB max." }, { status: 413 });
    }

    const bytes = Buffer.from(await file.arrayBuffer());
    const mediaType = file.type || "image/jpeg";

    const admin = createAdminClient();
    const outcome = await ingestImage(admin, {
      userId: user.id,
      bytes,
      mediaType,
      source: source as "pwa" | "telegram" | "sms" | "whatsapp",
      caption,
    });

    return NextResponse.json({ ok: true, ...outcome });
  } catch (err) {
    if (err instanceof IngestError) {
      return NextResponse.json({ error: err.message, code: err.code }, { status: 422 });
    }
    console.error("[ingest/image] error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal error" },
      { status: 500 }
    );
  }
}
