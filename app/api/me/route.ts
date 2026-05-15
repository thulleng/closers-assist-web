import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// CORS headers for mobile
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, OPTIONS",
  "Access-Control-Allow-Headers": "Authorization, Content-Type",
};

export async function OPTIONS() {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(req: NextRequest) {
  try {
    const supabase = await createClient();

    // Support both Bearer token (mobile) and cookie (web) auth
    const authHeader = req.headers.get("authorization");
    let user = null;

    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.slice(7);
      const { data } = await supabase.auth.getUser(token);
      user = data.user ?? null;
    } else {
      const { data } = await supabase.auth.getUser();
      user = data.user ?? null;
    }

    if (!user) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401, headers: corsHeaders }
      );
    }

    // ── Profile ────────────────────────────────────────────────────────────
    const { data: profile } = await supabase
      .from("agent_profiles")
      .select("*")
      .eq("user_id", user.id)
      .single();

    // ── Current month deals ────────────────────────────────────────────────
    const now = new Date();
    const startDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`;

    const { data: deals } = await supabase
      .from("deals")
      .select("*")
      .eq("user_id", user.id)
      .gte("sold_date", startDate)
      .order("sold_date", { ascending: false });

    let units = 0;
    let commission = 0;
    let frontGross = 0;

    for (const d of deals ?? []) {
      units += d.units ?? 0;
      commission += d.commission ?? 0;
      frontGross += d.front_gross ?? 0;
    }

    // ── Recent session summaries ───────────────────────────────────────────
    const { data: summaries } = await supabase
      .from("agent_memory")
      .select("content, created_at")
      .eq("user_id", user.id)
      .eq("role", "summary")
      .order("created_at", { ascending: false })
      .limit(3);

    return NextResponse.json(
      {
        ok: true,
        user: {
          id: user.id,
          email: user.email,
        },
        profile: profile ?? null,
        month: {
          period: `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`,
          deals: deals ?? [],
          summary: {
            units,
            commission,
            front_gross: frontGross,
            deal_count: (deals ?? []).length,
          },
        },
        memory: (summaries ?? []).map((s) => ({
          date: s.created_at,
          summary: s.content,
        })),
      },
      { headers: corsHeaders }
    );
  } catch (err) {
    console.error("/api/me error:", err);
    return NextResponse.json(
      { error: err instanceof Error ? err.message : "Internal error" },
      { status: 500, headers: corsHeaders }
    );
  }
}
