import { NextRequest, NextResponse } from "next/server";
import { processUserMessage, lookupProfileByPlatform, sendSMS } from "@/lib/handleUserMessage";
import { createAdminClient } from "@/lib/supabase-admin";
import { ingestImage, IngestError } from "@/lib/ingest/store";

// Twilio SMS webhook
// Twilio sends form-encoded POST with From + Body (+ NumMedia/MediaUrl for MMS)

async function fetchTwilioMedia(url: string): Promise<Buffer> {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  const auth = Buffer.from(`${sid}:${token}`).toString("base64");
  const res = await fetch(url, { headers: { Authorization: `Basic ${auth}` } });
  if (!res.ok) throw new Error(`Twilio media fetch ${res.status}`);
  return Buffer.from(await res.arrayBuffer());
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const from = formData.get("From") as string | null; // +155****4567
    const body = formData.get("Body") as string | null;
    const numMedia = parseInt((formData.get("NumMedia") as string) || "0", 10);
    const mediaUrl = (formData.get("MediaUrl0") as string) || null;
    const mediaType = (formData.get("MediaContentType0") as string) || "image/jpeg";

    if (!from || (!body && numMedia === 0)) {
      return new Response("<?xml version=\"1.0\" encoding=\"UTF-8\"?><Response></Response>", {
        headers: { "Content-Type": "text/xml" },
      });
    }

    // Normalize phone number: strip 'whatsapp:' prefix if present
    const phone = from.replace(/^whatsapp:/, "");

    // Look up user by SMS phone
    const { userId, profile } = await lookupProfileByPlatform("sms_phone", phone);

    if (!userId || !profile) {
      await sendSMS(
        phone,
        `👋 Welcome to Deal Clozr!\n\nYour AI closer isn't linked to this number yet.\n\nTo connect:\n1. Visit https://dealclozr.com/sms\n2. Sign in\n3. Enter this number: ${phone}\n\nOnce linked, I'll be your AI closer — log deals, handle objections, write follow-ups, all from SMS.`
      );
      return new Response("<?xml version=\"1.0\" encoding=\"UTF-8\"?><Response></Response>", {
        headers: { "Content-Type": "text/xml" },
      });
    }

    // ── MMS: an attached photo runs the same ingest pipeline as the PWA ──────
    if (numMedia > 0 && mediaUrl) {
      try {
        const bytes = await fetchTwilioMedia(mediaUrl);
        const admin = createAdminClient();
        const outcome = await ingestImage(admin, {
          userId,
          bytes,
          mediaType,
          source: "sms",
          caption: body || null,
        });
        // Rep confirms by replying; for now send the one-line confirm prompt.
        const lines = [outcome.message];
        if (outcome.drafts.some((d) => d.question)) {
          const q = outcome.drafts.find((d) => d.question)?.question;
          if (q) lines.push(q);
        }
        await sendSMS(phone, lines.join("\n"));
        return new Response("<?xml version=\"1.0\" encoding=\"UTF-8\"?><Response></Response>", {
          headers: { "Content-Type": "text/xml" },
        });
      } catch (err) {
        const msg = err instanceof IngestError ? err.message : "Couldn't read that photo — try again in better light.";
        await sendSMS(phone, msg);
        return new Response("<?xml version=\"1.0\" encoding=\"UTF-8\"?><Response></Response>", {
          headers: { "Content-Type": "text/xml" },
        });
      }
    }

    // Process message through shared engine
    const result = await processUserMessage(userId, body || "");
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
