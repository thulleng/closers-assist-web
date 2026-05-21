import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

const BRIDGE = "http://178.105.161.224:8910";

// ─── 4-tier model chain ─────────────────────────────────────────────────────
interface Tier {
  url: string;
  model: string;
  key: string | undefined;
  timeout: number;
}

function pickTier(n: number): Tier | null {
  const tiers: Tier[] = [
    { url: "https://api.deepseek.com/v1/chat/completions",    model: "deepseek-chat",   key: process.env.DEEPSEEK_API_KEY,  timeout: 20000 },
    { url: "https://api.deepseek.com/v1/chat/completions",    model: "deepseek-v4-pro",  key: process.env.DEEPSEEK_API_KEY,  timeout: 40000 },
    { url: "https://api.anthropic.com/v1/messages",           model: "claude-opus-4-7",  key: process.env.ANTHROPIC_API_KEY, timeout: 50000 },
    { url: "https://api.openai.com/v1/chat/completions",      model: "gpt-5.5",          key: process.env.OPENAI_API_KEY,    timeout: 60000 },
  ];
  return tiers[n] ?? null;
}

async function tryTier(system: string, message: string, tierIdx: number): Promise<string | null> {
  const tier = pickTier(tierIdx);
  if (!tier || !tier.key) return null;

  const { url, model, key, timeout } = tier;

  // Anthropic uses a different API format
  if (url.includes("anthropic")) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": key,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model,
          max_tokens: 600,
          system,
          messages: [{ role: "user", content: message }],
        }),
        signal: AbortSignal.timeout(timeout),
      });
      if (!res.ok) return null;
      const data = await res.json();
      return data.content?.[0]?.text || null;
    } catch { return null; }
  }

  // OpenAI / DeepSeek compatible format
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${key}` },
      body: JSON.stringify({
        model,
        messages: [{ role: "system", content: system }, { role: "user", content: message }],
        max_tokens: 600,
        temperature: 0.7,
      }),
      signal: AbortSignal.timeout(timeout),
    });
    if (!res.ok) return null;
    const data = await res.json();
    return data.choices?.[0]?.message?.content || null;
  } catch { return null; }
}

async function askChain(system: string, message: string): Promise<string> {
  for (let i = 0; i < 4; i++) {
    const reply = await tryTier(system, message, i);
    if (reply) return reply;
  }
  return "I'm catching my breath \u2014 try me again! \u26a1";
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

// ─── Bridge proxy ────────────────────────────────────────────────────────────
async function askBridge(message: string, userId?: string, profile?: any): Promise<string | null> {
  try {
    const body: any = { message };
    if (userId) {
      body.session = userId;
      if (profile) body.profile = profile;
    }
    const res = await fetch(`${BRIDGE}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(120000),
    });
    if (!res.ok) return null;
    const data = await res.json();
    const reply = data.reply || "";
    if (!reply || reply.includes("Got tangled")) return null;
    return reply;
  } catch { return null; }
}

const SYSTEM = `You are Sassy \u2014 a sharp, fast AI closer built into ClosersAssist. Short punchy sentences. Lead with numbers. Never mention infrastructure, models, or internal details.`;

// ─── POST handler ───────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    if (!message?.trim()) return new Response("Say something!", { status: 200 });

    let enriched = message.trim();
    let userId: string | null = null;
    let profile: any = null;

    try {
      const supabase = await createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        userId = user.id;
        const { data: p } = await supabase
          .from("agent_profiles")
          .select("first_name, last_name, company, draw, industry, agent_name, commission_pct")
          .eq("user_id", user.id)
          .maybeSingle();
        profile = p;
        const ctx = await buildContext(supabase, user.id);
        enriched = `${ctx}\n\nUser says: ${message.trim()}`;
      }
    } catch { /* unauthenticated */ }

    // Bridge first (has tools + memory), then chain through all 4 tiers
    const reply = await askBridge(enriched, userId || undefined, profile || undefined)
      || await askChain(SYSTEM, enriched);

    return new Response(reply, {
      status: 200,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (err: any) {
    console.error("Sassy error:", err.message);
    return new Response("Try me again in a moment! \u26a1", {
      status: 200,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}
