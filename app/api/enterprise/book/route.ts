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
      console.warn("Failed to insert enterprise lead:", error.message);
    }

    // ── Notify Thul via Telegram ──────────────────────────────────────
    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    const thulChatId = process.env.THUL_TELEGRAM_CHAT_ID; // Set in Vercel env

    if (botToken && thulChatId) {
      const alert = [
        `🔔 *New Enterprise Lead*`,
        ``,
        `*Name:* ${name}`,
        `*Email:* ${email}`,
        `*Company:* ${company}`,
        teamSize ? `*Team size:* ${teamSize}` : null,
        message ? `*Message:* ${message.slice(0, 200)}` : null,
        ``,
        `_Reply to this lead at ${email}_`,
      ]
        .filter(Boolean)
        .join("\n");

      await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: thulChatId,
          text: alert,
          parse_mode: "Markdown",
        }),
      }).catch((e) => console.warn("Telegram notify failed:", e));
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
