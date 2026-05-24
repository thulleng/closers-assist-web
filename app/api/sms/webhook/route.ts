import { NextRequest, NextResponse } from "next/server";
import { processUserMessage, lookupProfileByPlatform, sendSMS } from "@/lib/handleUserMessage";

// Twilio SMS webhook
// Twilio sends form-encoded POST with From + Body

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const from = formData.get("From") as string | null; // +15551234567
    const body = formData.get("Body") as string | null;

    if (!from || !body) {
      return new Response("<?xml version=\"1.0\" encoding=\"UTF-8\"?><Response></Response>", {
        headers: { "Content-Type": "text/xml" },
      });
    }

    // Normalize phone number: strip 'whatsapp:' prefix if present
    const phone = from.replace(/^whatsapp:/, "");

    // Look up user by SMS phone
    const { userId, profile } = await lookupProfileByPlatform("sms_phone", phone);

    if (!userId || !profile) {
      // Not linked — send linking instructions
      await sendSMS(
        phone,
        `👋 Welcome to Deal Clozr!\n\nYour AI closer isn't linked to this number yet.\n\nTo connect:\n1. Visit https://dealclozr.com/sms\n2. Sign in\n3. Enter this number: ${phone}\n\nOnce linked, I'll be your AI closer — log deals, handle objections, write follow-ups, all from SMS.`
      );
      return new Response("<?xml version=\"1.0\" encoding=\"UTF-8\"?><Response></Response>", {
        headers: { "Content-Type": "text/xml" },
      });
    }

    // Process message through shared engine
    const result = await processUserMessage(userId, body);
    await sendSMS(phone, result.reply);

    return new Response("<?xml version=\"1.0\" encoding=\"UTF-8\"?><Response></Response>", {
      headers: { "Content-Type": "text/xml" },
    });
  } catch (e: any) {
    console.error("SMS CRASH:", e.message);
    return new Response("<?xml version=\"1.0\" encoding=\"UTF-8\"?><Response></Response>", {
      headers: { "Content-Type": "text/xml" },
    });
  }
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
