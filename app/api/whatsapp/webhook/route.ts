import { NextRequest, NextResponse } from "next/server";
import { processUserMessage, lookupProfileByPlatform, sendWhatsApp } from "@/lib/handleUserMessage";

// WhatsApp Cloud API webhook
// GET = Meta verification. POST = incoming messages.

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");

  const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN || "deal_clozr_wa_2026";

  if (mode === "subscribe" && token === verifyToken) {
    return new Response(challenge || "", { status: 200 });
  }

  return new Response("Forbidden", { status: 403 });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const entries = body?.entry || [];

    for (const entry of entries) {
      const changes = entry?.changes || [];
      for (const change of changes) {
        const messages = change?.value?.messages || [];
        const metadata = change?.value?.metadata || {};

        for (const msg of messages) {
          // Only handle text messages
          if (msg.type !== "text" && msg.type !== "interactive") continue;

          const from = msg.from as string; // phone number
          let text = "";

          if (msg.type === "text") {
            text = msg.text?.body || "";
          } else if (msg.type === "interactive") {
            // Button reply
            text = msg.interactive?.button_reply?.title || msg.interactive?.list_reply?.title || "";
          }

          if (!from || !text) continue;

          // Look up user by WhatsApp phone
          const { userId, profile } = await lookupProfileByPlatform("whatsapp_phone", from);

          if (!userId || !profile) {
            // Not linked — send onboarding with linking link
            await sendWhatsApp(
              from,
              `👋 Welcome to Deal Clozr!\n\nYour AI closer isn't linked to this number yet.\n\nTo connect:\n1. Visit https://dealclozr.com/whatsapp\n2. Sign in\n3. Enter this number: ${from}\n\nOnce linked, I'll be your AI closer — log deals, handle objections, write follow-ups, all from WhatsApp.`
            );
            continue;
          }

          // Process message through shared engine
          const result = await processUserMessage(userId, text);
          await sendWhatsApp(from, result.reply);
        }
      }
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error("WA CRASH:", e.message);
    // Must return 200 to Meta even on error
    return NextResponse.json({ ok: true });
  }
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
