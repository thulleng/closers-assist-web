import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

const BRIDGE = "http://178.105.161.224:8910";
const DEEPSEEK = "https://api.deepseek.com/v1/chat/completions";

type DealType = "half_mini" | "full_mini" | "full_deal" | "street_purchase";
const DEAL_TYPES: DealType[] = ["half_mini", "full_mini", "full_deal", "street_purchase"];

const DEFAULT_PLAN = {
  commission_rate: 0.20, monthly_draw: 2600,
  half_mini_amount: 200, full_mini_amount: 400, street_purchase_amount: 500,
  volume_bonuses: [{ units: 8, bonus: 500 }, { units: 12, bonus: 1000 }, { units: 16, bonus: 2000 }],
};

function calcDeal(plan: any, type: DealType, gross: number | null) {
  switch (type) {
    case "half_mini": return { commission: Number(plan.half_mini_amount ?? 200), units: 0.5 };
    case "full_mini": return { commission: Number(plan.full_mini_amount ?? 400), units: 1.0 };
    case "full_deal": return { commission: Number(gross ?? 0) * Number(plan.commission_rate ?? 0.20), units: 1.0 };
    case "street_purchase": return { commission: Number(plan.street_purchase_amount ?? 500), units: 0 };
  }
}

function monthWindow() {
  const now = new Date();
  const y = now.getUTCFullYear(); const m = now.getUTCMonth();
  return {
    start: new Date(Date.UTC(y, m, 1)).toISOString().slice(0, 10),
    end: new Date(Date.UTC(y, m + 1, 1)).toISOString().slice(0, 10),
    label: now.toLocaleString("en-US", { month: "long", year: "numeric" }),
  };
}

async function ensurePlan(supabase: any, userId: string) {
  const { data } = await supabase.from("pay_plans").select("*").eq("user_id", userId).maybeSingle();
  if (data) return data;
  const { data: created } = await supabase.from("pay_plans").insert({ user_id: userId, ...DEFAULT_PLAN }).select().single();
  return created;
}

// ─── Tools that modify dashboard data ────────────────────────────────────────
async function addDeal(supabase: any, userId: string, args: any): Promise<string> {
  const type = args.deal_type as DealType;
  if (!DEAL_TYPES.includes(type)) return `Invalid deal type. Use: ${DEAL_TYPES.join(", ")}`;
  if (type === "full_deal" && !args.front_gross) return "full_deal needs front_gross amount.";

  const plan = await ensurePlan(supabase, userId);
  const { commission, units } = calcDeal(plan, type, args.front_gross ? Number(args.front_gross) : null);

  const { data, error } = await supabase.from("deals").insert({
    user_id: userId,
    customer_name: args.customer_name,
    vehicle: args.vehicle || null,
    deal_type: type,
    front_gross: args.front_gross ? Number(args.front_gross) : null,
    commission: Math.round(commission * 100) / 100,
    units,
    sold_date: args.sold_date || new Date().toISOString().slice(0, 10),
    notes: args.notes || null,
  }).select().single();

  if (error) return `❌ Failed: ${error.message}`;
  return `✅ LOGGED: ${data.customer_name} — ${data.deal_type} | $${data.commission} (${data.units}u) | ID: ${data.id.slice(0, 8)}`;
}

async function deleteDeal(supabase: any, userId: string, id: string): Promise<string> {
  const { data: existing } = await supabase.from("deals").select("customer_name").eq("id", id).eq("user_id", userId).single();
  const { error } = await supabase.from("deals").delete().eq("id", id).eq("user_id", userId);
  if (error) return `❌ Failed: ${error.message}`;
  return `🗑️ Deleted: ${existing?.customer_name || id.slice(0, 8)}`;
}

// ─── Context builder ─────────────────────────────────────────────────────────
async function buildContext(supabase: any, userId: string): Promise<string> {
  const { start, end, label } = monthWindow();
  const [profile, dealsRes] = await Promise.all([
    supabase.from("agent_profiles").select("first_name, last_name, company, draw").eq("user_id", userId).maybeSingle(),
    supabase.from("deals").select("customer_name, deal_type, commission, units, sold_date, id").eq("user_id", userId).gte("sold_date", start).lt("sold_date", end).order("sold_date", { ascending: false }),
  ]);

  const p = profile.data; const deals = dealsRes.data ?? [];
  const name = p ? [p.first_name, p.last_name].filter(Boolean).join(" ") : "User";
  const draw = p?.draw || 2600;

  const lines: string[] = [];
  lines.push(`User: ${name}${p?.company ? ` at ${p.company}` : ""}. $${draw} draw.`);
  lines.push(`Month: ${label}`);

  if (deals.length) {
    const u = deals.reduce((s: number, d: any) => s + (d.units || 0), 0);
    const c = deals.reduce((s: number, d: any) => s + (d.commission || 0), 0);
    const bal = c - draw;
    lines.push(`${deals.length} deals | ${u}u | $${c.toLocaleString()} commission | ${bal >= 0 ? "+" : ""}$${bal.toLocaleString()} vs draw`);
    lines.push(`Deal IDs: ${deals.map((d: any) => `${d.customer_name}=${d.id.slice(0, 8)}`).join(", ")}`);
    const recent = deals.slice(0, 10).map((d: any) => `${d.sold_date}: ${d.customer_name} — ${d.deal_type} $${d.commission} (${d.units}u)`).join("\n");
    lines.push(`\n${recent}`);
  } else {
    lines.push("No deals this month.");
  }

  return `\n[DASHBOARD DATA — use for all questions about deals, units, commission, bonuses]\n${lines.join("\n")}\n[END DATA]`;
}

// ─── Bridge proxy ────────────────────────────────────────────────────────────
async function askBridge(message: string, sessionToken?: string): Promise<string | null> {
  try {
    const body: any = { message };
    if (sessionToken) body.session = sessionToken;
    const res = await fetch(`${BRIDGE}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(25000),
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
  return data.choices?.[0]?.message?.content || "I'm here! 👋";
}

// ─── Tool intent detection ───────────────────────────────────────────────────
function detectTool(msg: string): { action: string; args: any } | null {
  const m = msg.toLowerCase();

  // Delete: "delete [id]" or "delete [name]" or "remove [name]"
  const delMatch = msg.match(/\b(?:delete|remove)\s+(?:deal\s+)?(?:for\s+)?((?:[a-f0-9]{8,})|(?:[A-Z][a-z]+(?:\s+[A-Z][a-z]+)?(?:\s+[A-Z]\.?)?))/i);
  if (delMatch) {
    const target = delMatch[1].trim();
    // If it's a hex ID
    if (/^[a-f0-9]{8,}$/i.test(target)) return { action: "delete_deal", args: { id: target } };
    // Otherwise treat as customer name
    return { action: "delete_deal_by_name", args: { name: target } };
  }

  // List: "list deals" / "show my deals" / "what deals"
  if (/list\s+deals|show\s+(my\s+)?deals|what\s+deals/i.test(m)) {
    return { action: "list_deals", args: {} };
  }

  // Summary: "summary" / "where am i" / "how am i doing" / "bonus progress" / "month"
  if (/\b(summary|where\s+am\s+i|how\s+(am|are)\s+(i|we)\s+doing|bonus\s+progress|month\s+so\s+far)\b/i.test(m) && !/add|log|sold|new\s+deal/i.test(m)) {
    return { action: "summary", args: {} };
  }

  // Add deal keywords
  if (/\b(add|log|new)\s+deal\b|just\s+sold|sold\s+a\b|closed\s+a\b|deal\s+done/i.test(m)) {
    // Extract customer name: "John Smith" pattern
    const nameMatch = msg.match(/(?:for|from|customer|called|named?)\s+([A-Z][a-z]+(?:\s+[A-Z][a-z]+)?)/);
    const customer_name = nameMatch ? nameMatch[1] : "Customer";

    // Detect deal type
    let deal_type: DealType = "full_deal";
    if (/\bhalf.mini\b/i.test(m)) deal_type = "half_mini";
    else if (/\bfull.mini\b/i.test(m)) deal_type = "full_mini";
    else if (/\bstreet\s*purchase\b/i.test(m)) deal_type = "street_purchase";

    // Extract amount
    const amountMatch = msg.match(/\$(\d[\d,]*)/);
    const front_gross = amountMatch ? parseInt(amountMatch[1].replace(/,/g, "")) : null;

    return { action: "add_deal", args: { customer_name, deal_type, front_gross } };
  }

  return null;
}

// ─── System prompt ──────────────────────────────────────────────────────────
const SYSTEM = `You are Sassy — the AI agent built into ClosersAssist. Sharp, fast, warm. Short punchy sentences. 

You know the user personally. Use their name. Reference their deals from the dashboard data provided.

When the user asks about deals/units/commission/bonuses — answer directly from the data. When they tell you about a deal they just closed — celebrate it. The system handles logging.

Built by Thul Leng, a working Toyota closer at Sun Toyota in Holiday, FL. Pricing: Starter $29.99/mo, Pro $624.75/mo.`;

// ─── POST handler ───────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    if (!message?.trim()) return new Response("Say something!", { status: 200 });

    let supabase: any = null;
    let userId: string | null = null;

    try {
      const client = await createClient();
      supabase = client;
      const { data } = await client.auth.getUser();
      if (data.user) userId = data.user.id;
    } catch { /* unauthenticated */ }

    // Check for tool commands first
    if (userId && supabase) {
      const tool = detectTool(message);
      if (tool) {
        let toolResult = "";
        if (tool.action === "add_deal") {
          toolResult = await addDeal(supabase, userId, tool.args);
        } else if (tool.action === "delete_deal") {
          toolResult = await deleteDeal(supabase, userId, tool.args.id);
        } else if (tool.action === "delete_deal_by_name") {
          const name = tool.args.name;
          const { data: match } = await supabase.from("deals").select("id, customer_name").eq("user_id", userId).ilike("customer_name", `%${name}%`).order("sold_date", { ascending: false }).limit(1).single();
          if (match) {
            toolResult = await deleteDeal(supabase, userId, match.id);
          } else {
            toolResult = `❌ No deal found matching "${name}"`;
          }
        } else if (tool.action === "list_deals") {
          const { start, end } = monthWindow();
          const { data } = await supabase.from("deals").select("*").eq("user_id", userId).gte("sold_date", start).lt("sold_date", end).order("sold_date", { ascending: false });
          toolResult = data?.length ? data.map((d: any) => `${d.sold_date}: ${d.customer_name} — ${d.deal_type} $${d.commission} (${d.units}u) [${d.id.slice(0, 8)}]`).join("\n") : "No deals this month.";
        } else if (tool.action === "summary") {
          const { start, end, label } = monthWindow();
          const [plan, dealsRes] = await Promise.all([
            ensurePlan(supabase, userId),
            supabase.from("deals").select("units, commission").eq("user_id", userId).gte("sold_date", start).lt("sold_date", end),
          ]);
          const rows = dealsRes.data ?? [];
          const u = rows.reduce((s: number, r: any) => s + (r.units || 0), 0);
          const c = rows.reduce((s: number, r: any) => s + (r.commission || 0), 0);
          const draw = plan.monthly_draw || 2600;
          const bal = c - draw;
          toolResult = `${label}: ${rows.length} deals | ${u}u | $${c.toLocaleString()} | ${bal >= 0 ? "+" : ""}$${bal.toLocaleString()} vs $${draw} draw`;
        }

        // Now get updated context and ask Sassy to respond naturally
        const ctx = await buildContext(supabase, userId);
        const enrichedMsg = `You just performed this action: ${toolResult}\n\n${ctx}\n\nRespond to the user naturally about what just happened. Keep it short and punchy.`;
        const reply = await askBridge(enrichedMsg, userId) || await askDeepSeek(SYSTEM, enrichedMsg);

        return new Response(reply, { status: 200, headers: { "Content-Type": "text/plain; charset=utf-8" } });
      }
    }

    // Regular chat — inject context, proxy to bridge
    let enriched = message.trim();
    let systemPrompt = SYSTEM;

    if (userId && supabase) {
      const ctx = await buildContext(supabase, userId);
      enriched = `${ctx}\n\nUser says: ${message.trim()}`;
    } else {
      systemPrompt += "\n\nVisitor on website. Be helpful but general.";
    }

    const reply = await askBridge(enriched, userId || undefined) || await askDeepSeek(systemPrompt, enriched);
    return new Response(reply, { status: 200, headers: { "Content-Type": "text/plain; charset=utf-8" } });
  } catch (err: any) {
    console.error("Sassy error:", err.message);
    return new Response("Try me again in a moment! ⚡", { status: 200, headers: { "Content-Type": "text/plain; charset=utf-8" } });
  }
}
