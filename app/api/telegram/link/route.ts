import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

// POST /api/telegram/link
// Links a logged-in user's profile to their Telegram chat ID
// Body: { chat_id: number, code: string }
// Code is base64url(chat_id) — simple verification that they own this chat

export async function POST(req: NextRequest) {
  try {
    const { chat_id, code } = await req.json();

    if (!chat_id || !code) {
      return NextResponse.json({ error: "chat_id and code required" }, { status: 400 });
    }

    // Verify code matches chat_id
    const expectedCode = Buffer.from(String(chat_id)).toString("base64").replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
    if (code !== expectedCode) {
      return NextResponse.json({ error: "Invalid link code" }, { status: 403 });
    }

    // Auth check
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
    }

    // Link the profile
    const { error } = await supabase
      .from("agent_profiles")
      .update({ telegram_chat_id: chat_id })
      .eq("user_id", user.id);

    if (error) {
      // If chat_id already taken by another user
      if (error.code === "23505") {
        return NextResponse.json(
          { error: "This Telegram account is already linked to another user." },
          { status: 409 }
        );
      }
      throw error;
    }

    // Send welcome message via Telegram
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    if (botToken) {
      const { data: profile } = await supabase
        .from("agent_profiles")
        .select("agent_name, first_name")
        .eq("user_id", user.id)
        .single();

      const name = profile?.first_name || profile?.agent_name || "Closer";

      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id,
          text: `✅ *You're connected, ${name}!*\n\nI'm your Deal Clozr agent. I know your pay plan, your deals, and your goals. I'm with you on the lot — right here in Telegram.\n\nTry me: "I just sold a Camry to Jane Foster — full deal, $3,200 front gross"\n\nOr ask: "Where am I at this month?"`,
          parse_mode: "Markdown",
        }),
      });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Telegram link error:", error);
    return NextResponse.json(
      { error: "Failed to link Telegram" },
      { status: 500 }
    );
  }
}
