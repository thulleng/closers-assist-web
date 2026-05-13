import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, email, company, teamSize, message } = body;

    if (!name || !email || !company) {
      return NextResponse.json(
        { error: "name, email, and company are required" },
        { status: 400 }
      );
    }

    const supabase = createAdminClient();

    const { error } = await supabase.from("enterprise_leads").insert({
      name,
      email,
      company,
      team_size: teamSize || null,
      message: message || null,
    });

    if (error) {
      // Table might not exist — try to log anyway
      console.warn("Failed to insert enterprise lead:", error.message);
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
