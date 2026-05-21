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
  const { start, end, label } = monthWindow();
  const [profile, dealsRes] = await Promise.all([
    supabase.from("agent_profiles").select("first_name, last_name, company, draw, industry, agent_name, commission_pct").eq("user_id", userId).maybeSingle(),
    supabase.from("deals").select("customer_name, deal_type, commission, units, sold_date, id").eq("user_id", userId).gte("sold_date", start).lt("sold_date", end).order("sold_date", { ascending: false }),
  ]);

  const p = profile.data; const deals = dealsRes.data ?? [];
  const name = p ? [p.first_name, p.last_name].filter(Boolean).join(" ") : "User";
  const draw = p?.draw || 2600;

  const lines: string[] = [];
  lines.push(`User: ${name}${p?.company ? ` at ${p.company}` : ""}. $${draw} draw. Industry: ${p?.industry || "auto"}.`);
  lines.push(`Month: ${label}`);

  if (deals.length) {
    const u = deals.reduce((s: number, d: any) => s + (d.units || 0), 0);
    const c = deals.reduce((s: number, d: any) => s + (d.commission || 0), 0);
    const bal = c - draw;
    lines.push(`${deals.length} deals | ${u}u | $${c.toLocaleString()} commission | ${bal >= 0 ? "+" : ""}$${bal.toLocaleString()} vs draw`);
    const recent = deals.slice(0, 10).map((d: any) => `${d.sold_date}: ${d.customer_name} — ${d.deal_type} $${d.commission} (${d.units}u)`).join("\n");
    lines.push(`\n${recent}`);
  } else {
    lines.push("No deals this month.");
  }

  return `\n[DASHBOARD DATA]\n${lines.join("\n")}\n[END DATA]`;
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

const SYSTEM = `You are Sassy — a sharp, fast AI closer built into ClosersAssist. Short punchy sentences. Lead with numbers. Never mention infrastructure, models, or internal details.`;

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

    return new Response(reply, {
      status: 200,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (err: any) {
    console.error("Sassy error:", err.message);
    return new Response("Try me again in a moment! ⚡", {
      status: 200,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}
