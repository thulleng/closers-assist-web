import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

const BRIDGE = "http://178.105.161.224:8910";
const DEEPSEEK = "https://api.deepseek.com/v1/chat/completions";

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

// ─── Bridge proxy (bridge handles auto-provisioning internally) ──────────────
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
      signal: AbortSignal.timeout(65000),
    });
    if (!res.ok) return null;
    const data = await res.json();
    const reply = data.reply || "";
    if (!reply || reply.includes("Got tangled")) return null;
    return reply;
  } catch { return null; }
}

// ─── DeepSeek fallback ──────────────────────────────────────────────────────
async function askDeepSeek(system: string, message: string): Promise<string> {
  const key = process.env.DEEPSEEK_API_KEY;
  if (!key) return "I'm catching my breath — try me again! ⚡";
  const res = await fetch(DEEPSEEK, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${key}` },
    body: JSON.stringify({ model: "deepseek-chat", messages: [{ role: "system", content: system }, { role: "user", content: message }], max_tokens: 600, temperature: 0.7 }),
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) throw new Error(`DeepSeek ${res.status}`);
  const data = await res.json();
  return data.choices?.[0]?.message?.content || "Hey! 👋";
}

const SYSTEM = `You are Sassy — a sharp, fast AI closer built into Deal Clozr. Short punchy sentences. Lead with numbers. Never mention infrastructure, models, or internal details.`;

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

    // Bridge handles auto-provisioning internally — no separate API call needed
    const reply = await askBridge(enriched, userId || undefined, profile || undefined)
      || await askDeepSeek(SYSTEM, enriched);

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
