import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";

/**
 * Dora visitor memory — stores conversation history in Supabase
 * GET  /api/dora/memory?visitor_id=xxx → load messages
 * POST /api/dora/memory                 → save messages
 */

export async function GET(req: NextRequest) {
  const visitorId = req.nextUrl.searchParams.get("visitor_id");
  if (!visitorId) {
    return NextResponse.json({ error: "visitor_id required" }, { status: 400 });
  }

  try {
    const supabase = createAdminClient();

    const { data, error } = await supabase
      .from("visitor_memory")
      .select("messages, last_seen")
      .eq("visitor_id", visitorId)
      .maybeSingle();

    // Table doesn't exist yet — return empty
    if (error?.code === "42P01") {
      return NextResponse.json({ messages: [], last_seen: null });
    }

    if (error) {
      console.error("Dora memory load error:", error.message);
      return NextResponse.json({ messages: [], last_seen: null });
    }

    return NextResponse.json({
      messages: data?.messages || [],
      last_seen: data?.last_seen || null,
    });
  } catch (err: any) {
    console.error("Dora memory GET error:", err.message);
    return NextResponse.json({ messages: [], last_seen: null });
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { visitor_id, messages } = body;

    if (!visitor_id || !Array.isArray(messages)) {
      return NextResponse.json({ error: "visitor_id and messages required" }, { status: 400 });
    }

    // Keep last 40 messages max to avoid bloat
    const trimmed = messages.slice(-40);

    const supabase = createAdminClient();

    const { error } = await supabase.from("visitor_memory").upsert(
      {
        visitor_id,
        messages: trimmed,
        last_seen: new Date().toISOString(),
      },
      { onConflict: "visitor_id" }
    );

    if (error) {
      console.error("Dora memory save error:", error.message);
      return NextResponse.json({ saved: false, error: error.message });
    }

    return NextResponse.json({ saved: true });
  } catch (err: any) {
    console.error("Dora memory POST error:", err.message);
    return NextResponse.json({ saved: false });
  }
}
