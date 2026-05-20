import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

const BRIDGE = "http://178.105.161.224:8910";
const DEEPSEEK = "https://api.deepseek.com/v1/chat/completions";

// ─── Supabase context builder ────────────────────────────────────────────────
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
    supabase.from("agent_profiles").select("first_name, last_name, company, draw").eq("user_id", userId).maybeSingle(),
    supabase.from("deals").select("customer_name, deal_type, commission, units, sold_date, id").eq("user_id", userId).gte("sold_date", start).lt("sold_date", end).order("sold_date", { ascending: false }),
  ]);

  const p = profile.data;
  const deals = dealsRes.data ?? [];
  const name = p ? [p.first_name, p.last_name].filter(Boolean).join(" ") : "User";
  const draw = p?.draw || 2600;

  const lines: string[] = [];
  lines.push(`User: ${name}${p?.company ? ` at ${p.company}` : ""}. $${draw} monthly draw.`);
  lines.push(`Month: ${label}`);

  if (deals.length) {
    const u = deals.reduce((s: number, d: any) => s + (d.units || 0), 0);
    const c = deals.reduce((s: number, d: any) => s + (d.commission || 0), 0);
    const bal = c - draw;
    lines.push(`Deals: ${deals.length} | Units: ${u} | Commission: $${c.toLocaleString()} | ${bal >= 0 ? "Above" : "Below"} draw by $${Math.abs(bal).toLocaleString()}`);
    const recent = deals.slice(0, 10).map((d: any) => `${d.sold_date}: ${d.customer_name} — ${d.deal_type} $${d.commission} (${d.units}u) [${d.id.slice(0, 8)}]`).join("\n");
    lines.push(`\nRecent deals:\n${recent}`);
  } else {
    lines.push("No deals logged this month yet.");
  }

  return `\n[DASHBOARD CONTEXT — use this data to answer questions about deals, units, commission, bonuses]\n${lines.join("\n")}\n[END CONTEXT]`;
}

// ─── Bridge to real Sassy ───────────────────────────────────────────────────
async function askBridge(message: string): Promise<string | null> {
  try {
    const res = await fetch(`${BRIDGE}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
      signal: AbortSignal.timeout(25000),
    });
    if (!res.ok) return null;
    const data = await res.json();
    const reply = data.reply || data.text || data.response;
    if (!reply || reply.includes("Got tangled")) return null;
    return reply;
  } catch {
    return null;
  }
}

// ─── DeepSeek fallback ──────────────────────────────────────────────────────
async function askDeepSeek(system: string, message: string): Promise<string> {
  const key = process.env.DEEPSEEK_API_KEY;
  if (!key) return "I'm catching my breath — try me again! ⚡";

  const res = await fetch(DEEPSEEK, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${key}` },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: system },
        { role: "user", content: message },
      ],
      max_tokens: 600,
      temperature: 0.7,
    }),
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) throw new Error(`DeepSeek ${res.status}`);
  const data = await res.json();
  return data.choices?.[0]?.message?.content || "I'm here! 👋";
}

// ─── System prompt ──────────────────────────────────────────────────────────
const SYSTEM = `You are Sassy — the AI agent built into ClosersAssist. Sharp, fast, warm. Short punchy sentences. You know the user personally — use their name, reference their deals.

You have full access to their dashboard data (injected as context). Answer questions about their deals, units, commission, bonus progress, draw balance. When they tell you about a deal, acknowledge it — the system handles logging.

Built by Thul Leng, a working Toyota closer at Sun Toyota in Holiday, FL. Pricing: Starter $29.99/mo, Pro $624.75/mo. 14-day free trial.`;

// ─── POST handler ───────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    if (!message?.trim()) return new Response("Say something!", { status: 200 });

    // Build enriched message with Supabase context
    let enrichedMessage = message.trim();
    let systemPrompt = SYSTEM;

    try {
      const supabase = await createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const ctx = await buildContext(supabase, user.id);
        enrichedMessage = `${ctx}\n\nUser says: ${message.trim()}`;
      } else {
        systemPrompt += "\n\nYou're talking to a visitor. Be helpful but general — no personal data.";
      }
    } catch {
      systemPrompt += "\n\nYou're talking to a visitor. Be helpful but general.";
    }

    // 1. Try real Sassy on VM with enriched context
    const bridgeReply = await askBridge(enrichedMessage);
    if (bridgeReply) {
      return new Response(bridgeReply, {
        status: 200,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }

    // 2. Fallback to DeepSeek
    const fallbackReply = await askDeepSeek(systemPrompt, enrichedMessage);
    return new Response(fallbackReply, {
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
