import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase-admin";

// POST /api/telegram/register-bot
// Authenticated user submits their own bot token
// We verify it, store it, and set the Telegram webhook
//
// Body: { bot_token: string }
//
// Returns: { ok: true, bot_username: string, bot_name: string }

export async function POST(req: NextRequest) {
  try {
    const { bot_token } = await req.json();

    if (!bot_token || typeof bot_token !== "string") {
      return NextResponse.json(
        { error: "bot_token is required" },
        { status: 400 }
      );
    }

    // ── Verify the token with Telegram's getMe ──
    const meRes = await fetch(
      `https://api.telegram.org/bot${bot_token}/getMe`,
      { method: "POST" }
    );
    const meData = await meRes.json();

    if (!meData.ok) {
      return NextResponse.json(
        { error: "Invalid bot token. Check your BotFather message and try again." },
        { status: 400 }
      );
    }

    const botUsername = meData.result?.username as string;
    const botName = meData.result?.first_name as string;

    if (!botUsername) {
      return NextResponse.json(
        { error: "Could not read bot username from Telegram. Try creating the bot again." },
        { status: 400 }
      );
    }

    // ── Auth check ──
    const supabase = createAdminClient();
    const { data: { user } } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json(
        { error: "Not authenticated. Please sign in first." },
        { status: 401 }
      );
    }

    // ── Check if this token is already registered ──
    const { data: existingToken } = await supabase
      .from("bot_tokens")
      .select("id, user_id")
      .eq("bot_token", bot_token)
      .maybeSingle();

    if (existingToken) {
      if (existingToken.user_id === user.id) {
        return NextResponse.json({
          ok: true,
          already_setup: true,
          bot_username: botUsername,
          bot_name: botName,
        });
      }
      return NextResponse.json(
        { error: "This bot token is already registered to another account." },
        { status: 409 }
      );
    }

    // ── Generate a token_id and build the webhook URL ──
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://dealclozr.com";

    const { data: insertData, error: insertError } = await supabase
      .from("bot_tokens")
      .insert({
        user_id: user.id,
        bot_token,
        bot_username: `@${botUsername}`,
        bot_name: botName,
        webhook_url: "",
      })
      .select("id")
      .single();

    if (insertError || !insertData) {
      console.error("bot_tokens insert error:", insertError);
      return NextResponse.json(
        { error: "Failed to save your bot. Please try again." },
        { status: 500 }
      );
    }

    const tokenId = insertData.id;
    const webhookUrl = `${baseUrl}/api/telegram/webhook?token_id=${tokenId}`;

    // ── Set the Telegram webhook ──
    const whRes = await fetch(
      `https://api.telegram.org/bot${bot_token}/setWebhook`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: webhookUrl,
          allowed_updates: ["message"],
          secret_token: tokenId, // Optional security — Telegram sends this in X-Telegram-Bot-Api-Secret-Token header
        }),
      }
    );
    const whData = await whRes.json();

    if (!whData.ok) {
      // Rollback: delete the stale record
      await supabase.from("bot_tokens").delete().eq("id", tokenId);
      return NextResponse.json(
        { error: `Telegram rejected the webhook setup: ${whData.description || "unknown error"}` },
        { status: 500 }
      );
    }

    // ── Update the webhook_url in our DB ──
    await supabase
      .from("bot_tokens")
      .update({ webhook_url: webhookUrl })
      .eq("id", tokenId);

    // ── Send welcome message via the user's own bot ──
    // We need their chat ID — but they haven't messaged the bot yet.
    // Instead, the bot will auto-welcome them on first message via the webhook.
    // For now, send a confirmation ping.
    try {
      // Get updates to find their chat_id (they must have /start the bot first)
      // This is handled on the webhook side — they message the bot, we welcome them
    } catch {}

    return NextResponse.json({
      ok: true,
      already_setup: false,
      bot_username: `@${botUsername}`,
      bot_name: botName,
    });
  } catch (error) {
    console.error("register-bot error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Try again." },
      { status: 500 }
    );
  }
}
