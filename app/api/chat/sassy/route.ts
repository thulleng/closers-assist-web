import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

const DEEPSEEK = "https://api.deepseek.com/v1/chat/completions";

// ─── 4-tier model chain ─────────────────────────────────────────────────────
async function tryTier(messages: Array<{ role: string; content: string }>, tierIdx: number):
  Promise<string | null> {

  const tiers = [
    { url: "https://api.deepseek.com/v1/chat/completions",  model: "deepseek-chat",   key: "DEEPSEEK_API_KEY",   timeout: 20000 },
    { url: "https://api.deepseek.com/v1/chat/completions",  model: "deepseek-v4-pro",  key: "DEEPSEEK_API_KEY",   timeout: 40000 },
    { url: "https://api.anthropic.com/v1/messages",         model: "claude-opus-4-8",  key: "ANTHROPIC_API_KEY",  timeout: 50000 },
    { url: "https://api.openai.com/v1/chat/completions",    model: "gpt-5.5",          key: "OPENAI_API_KEY",     timeout: 60000 },
  ];

  const tier = tiers[tierIdx];
  if (!tier) return null;

  const apiKey = process.env[tier.key];
  if (!apiKey) return null;

  const { url, model, timeout } = tier;

  // Anthropic has different API format
  if (url.includes("anthropic")) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": apiKey,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model,
          max_tokens: 600,
          system: messages[0]?.content || "",
          messages: messages.slice(1),
        }),
        signal: AbortSignal.timeout(timeout),
      });
      if (!res.ok) return null;
      const data = await res.json();
      return data.content?.[0]?.text || null;
    } catch { return null; }
  }

  // DeepSeek / OpenAI standard API
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages,
        max_tokens: 400,
        temperature: 0.7,
      }),
      signal: AbortSignal.timeout(timeout),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.choices?.[0]?.message?.content || null;
  } catch { return null; }
}

async function tryChain(messages: Array<{ role: string; content: string }>): Promise<string> {
  for (let i = 0; i < 4; i++) {
    const reply = await tryTier(messages, i);
    if (reply) return reply;
  }
  return "I'm catching my breath — try me again! ⚡";
}

// ─── Context builder ─────────────────────────────────────────────────────────
function monthWindow() {
  const now = new Date();
  const y = now.getUTCFullYear(); const m = now.getUTCMonth();
  return {
    start: new Date(Date.UTC(y, m, 1)).toISOString().slice(0, 10),
    end: new Date(Date.UTC(y, m + 1, 1)).toISOString().slice(0, 10),
    label: now.toLocaleString("en-US", { month: "long", year: "numeric" }),
  };
}

async function buildContext(supabase: any, userId: string): Promise<string> {
  const { start, label } = monthWindow();
  const [profile, dealsRes] = await Promise.all([
    supabase.from("agent_profiles").select("first_name, last_name, company, draw, industry").eq("user_id", userId).maybeSingle(),
    supabase.from("deals").select("units, commission").eq("user_id", userId).gte("sold_date", start).order("sold_date", { ascending: false }),
  ]);

  const p = profile.data; const deals = dealsRes.data ?? [];
  const name = p ? [p.first_name, p.last_name].filter(Boolean).join(" ") : "User";
  const draw = p?.draw || 2600;
  const totalUnits = (deals as any[]).reduce((s: number, d: any) => s + (d.units || 0), 0);
  const totalComm = (deals as any[]).reduce((s: number, d: any) => s + (d.commission || 0), 0);

  return `\n[REFERENCE ONLY — do not mention unless asked]\nUser: ${name}${p?.company ? ` @ ${p.company}` : ""}. ${p?.industry || "auto"} industry. $${draw} draw.\nMonth: ${label}. ${deals.length} deals, ${totalUnits}u, $${totalComm.toLocaleString()} commission. Use Supabase for details.\n[/REFERENCE]`;
}

const SYSTEM = `You are Sassy — a sharp, fast AI closer built into Deal Clozr. Short punchy sentences. Lead with numbers. Never mention infrastructure, models, or internal details.`;

// ─── POST handler ───────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    if (!message?.trim()) return new Response("Say something!", { status: 200 });

    let enriched = message.trim();

    try {
      const supabase = await createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const ctx = await buildContext(supabase, user.id);
        enriched = `${ctx}\n\nUser says: ${message.trim()}`;
      }
    } catch { /* unauthenticated */ }

    // Build messages array for the model chain
    const messages = [
      { role: "system", content: SYSTEM },
      { role: "user", content: enriched },
    ];

    const reply = await tryChain(messages);

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: { "Content-Type": "application/json; charset=utf-8" },
    });
  } catch (err: any) {
    console.error("Sassy error:", err.message);
    return new Response(JSON.stringify({ reply: "Try me again in a moment! ⚡" }), {
      status: 200,
      headers: { "Content-Type": "application/json; charset=utf-8" },
    });
  }
}
