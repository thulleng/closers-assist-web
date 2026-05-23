import { NextRequest, NextResponse } from "next/server";

// WhatsApp Cloud API webhook
// Handles both GET (verification) and POST (incoming messages)

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");

  const verifyToken = process.env.WHATSAPP_VERIFY_TOKEN || "closers_assist_2026";

  if (mode === "subscribe" && token === verifyToken) {
    return new Response(challenge || "", { status: 200 });
  }

  return new Response("Forbidden", { status: 403 });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // WhatsApp may send multiple entries
    const entries = body?.entry || [];
    for (const entry of entries) {
      const changes = entry?.changes || [];
      for (const change of changes) {
        const messages = change?.value?.messages || [];
        for (const msg of messages) {
          if (msg.type !== "text") continue;

          const from = msg.from; // phone number
          const text = msg.text?.body || "";

          if (!from || !text) continue;

          // ── Look up user by whatsapp_phone in agent_profiles ──
          const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
          const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
          if (!supabaseUrl || !supabaseKey) continue;

          const { createClient } = await import("@supabase/supabase-js");
          const supabase = createClient(supabaseUrl, supabaseKey, {
            auth: { autoRefreshToken: false, persistSession: false },
          });

          const { data: profile } = await supabase
            .from("agent_profiles")
            .select("*")
            .eq("whatsapp_phone", from)
            .maybeSingle();

          if (!profile) {
            // Unlinked — send onboarding
            await sendWhatsApp(from, "👋 Welcome to Deal Clozr!\n\nTo connect your account, visit:\nhttps://dealclozr.com/whatsapp?phone=" + from);
            continue;
          }

          // Linked — call AI
          const { default: DeepSeek } = await import("@anthropic-ai/sdk");
          const deepseek = new DeepSeek({
            apiKey: process.env.DEEPSEEK_API_KEY || "",
            baseURL: "https://api.deepseek.com/anthropic",
          });

          const response = await deepseek.messages.create({
            model: "deepseek-chat",
            max_tokens: 800,
            system: buildPrompt(profile),
            messages: [{ role: "user", content: text }],
          });

          const reply =
            response.content[0]?.type === "text"
              ? response.content[0].text
              : "Got it. What else?";

          await sendWhatsApp(from, reply);
        }
      }
    }

    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error("WA CRASH:", e.message);
    return NextResponse.json({ ok: true });
  }
}

async function sendWhatsApp(to: string, text: string) {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_ID;
  if (!token || !phoneId) return;

  await fetch(`https://graph.facebook.com/v21.0/${phoneId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: { body: text.slice(0, 4096) },
    }),
  });
}

function buildPrompt(profile: Record<string, unknown>): string {
  const agentName = (profile.agent_name as string) || "Closer";
  const firstName = (profile.first_name as string) || "";
  const lastName = (profile.last_name as string) || "";
  const fullName = [firstName, lastName].filter(Boolean).join(" ");
  const industry = (profile.industry as string) || "automotive";

  return `You are ${agentName}, an AI sales coach for ${fullName || "a closer"} in the ${industry} industry. Be direct, confident, zero fluff. Reference their deals, pay plan, and goals. Keep responses tight — they're between customers.`;
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
