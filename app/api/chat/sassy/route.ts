import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

// ─── Types ──────────────────────────────────────────────────────────────────
type DealType = "half_mini" | "full_mini" | "full_deal" | "street_purchase";
const DEAL_TYPES: DealType[] = ["half_mini", "full_mini", "full_deal", "street_purchase"];

const DEFAULT_PAY_PLAN = {
  industry: "auto", commission_rate: 0.20, monthly_draw: 2600,
  half_mini_amount: 200, full_mini_amount: 400, street_purchase_amount: 500,
  volume_bonuses: [{ units: 8, bonus: 500 }, { units: 12, bonus: 1000 }, { units: 16, bonus: 2000 }],
  cxi_threshold: 4.8, cxi_bonus: 250, review_bonus: 20,
};

// ─── Supabase helpers ───────────────────────────────────────────────────────
async function ensurePayPlan(supabase: any, userId: string) {
  const { data } = await supabase.from("pay_plans").select("*").eq("user_id", userId).maybeSingle();
  if (data) return data;
  const { data: created, error } = await supabase
    .from("pay_plans").insert({ user_id: userId, ...DEFAULT_PAY_PLAN }).select().single();
  if (error) throw new Error(`pay_plan failed: ${error.message}`);
  return created;
}

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
  const y = now.getUTCFullYear();
  const m = now.getUTCMonth();
  return {
    start: new Date(Date.UTC(y, m, 1)).toISOString().slice(0, 10),
    end: new Date(Date.UTC(y, m + 1, 1)).toISOString().slice(0, 10),
    label: now.toLocaleString("en-US", { month: "long", year: "numeric" }),
  };
}

// ─── Bridge to real Sassy on VM ─────────────────────────────────────────────
const BRIDGE = "http://178.105.161.224:8910";

async function askSassy(message: string): Promise<string | null> {
  try {
    const res = await fetch(`${BRIDGE}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message }),
      signal: AbortSignal.timeout(12000),
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

// ─── Direct DeepSeek fallback ───────────────────────────────────────────────
async function askDeepSeek(systemPrompt: string, userMessage: string): Promise<string> {
  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) return "I'm catching my breath — try me again! ⚡";

  const res = await fetch("https://api.deepseek.com/v1/chat/completions", {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${apiKey}` },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userMessage },
      ],
      max_tokens: 500,
      temperature: 0.7,
    }),
    signal: AbortSignal.timeout(15000),
  });

  if (!res.ok) throw new Error(`DeepSeek ${res.status}`);
  const data = await res.json();
  return data.choices?.[0]?.message?.content || "I'm here! 👋";
}

// ─── Build user context from Supabase ───────────────────────────────────────
async function buildContext(supabase: any, userId: string): Promise<string> {
  const { start, end, label } = monthWindow();
  const [profile, dealsRes] = await Promise.all([
    supabase.from("agent_profiles").select("first_name, last_name, company, draw, commission_pct").eq("user_id", userId).maybeSingle(),
    supabase.from("deals").select("customer_name, deal_type, commission, units, sold_date").eq("user_id", userId).gte("sold_date", start).lt("sold_date", end).order("sold_date", { ascending: false }),
  ]);

  const p = profile.data;
  const deals = dealsRes.data ?? [];
  const name = p ? [p.first_name, p.last_name].filter(Boolean).join(" ") : "Closer";

  const lines: string[] = [];
  if (p) {
    lines.push(`User: ${name}${p.company ? ` at ${p.company}` : ""}. ${p.draw ? `$${p.draw} draw.` : ""}`);
  }
  lines.push(`Month: ${label}`);

  if (deals.length) {
    const u = deals.reduce((s: number, d: any) => s + (d.units || 0), 0);
    const c = deals.reduce((s: number, d: any) => s + (d.commission || 0), 0);
    const draw = p?.draw || 2600;
    const bal = c - draw;
    lines.push(`${deals.length} deals, ${u}u, $${c.toLocaleString()} commission (${bal >= 0 ? "+" : ""}$${bal.toLocaleString()} vs $${draw} draw)`);
    const recent = deals.slice(0, 8).map((d: any) => `${d.sold_date}: ${d.customer_name} — ${d.deal_type} $${d.commission} (${d.units}u)`).join(" | ");
    lines.push(`Recent: ${recent}`);
  } else {
    lines.push("No deals this month.");
  }

  return `\n\n=== DASHBOARD CONTEXT ===\n${lines.join("\n")}`;
}

// ─── System prompt ──────────────────────────────────────────────────────────
const SYSTEM = `You are Sassy — Thul Leng's personal AI agent. Sharp, fast, warm. Short punchy sentences. You're built into the ClosersAssist dashboard.

You help Thul manage his sales: add deals, delete deals, list deals, check monthly summary, calculate commission, track bonus progress.

When Thul tells you about a deal, LOG IT immediately — customer name, deal type (half_mini/full_mini/full_deal/street_purchase), front gross if full deal. Confirm what you logged.

Dashboard context below shows Thul's current month. Use it. Reference his numbers.`;

// ─── Tool execution ─────────────────────────────────────────────────────────
async function runTool(name: string, args: any, supabase: any, userId: string) {
  if (name === "add_deal") {
    const type = args.deal_type as DealType;
    if (!DEAL_TYPES.includes(type)) return `Invalid deal type. Use: ${DEAL_TYPES.join(", ")}`;
    if (type === "full_deal" && !args.front_gross) return "full_deal requires front_gross amount.";

    const plan = await ensurePayPlan(supabase, userId);
    const gross = args.front_gross ? Number(args.front_gross) : null;
    const { commission, units } = calcDeal(plan, type, gross);

    const { data, error } = await supabase.from("deals").insert({
      user_id: userId,
      customer_name: args.customer_name,
      vehicle: args.vehicle || null,
      deal_type: type,
      front_gross: gross,
      commission: Math.round(commission * 100) / 100,
      units,
      sold_date: args.sold_date || new Date().toISOString().slice(0, 10),
      notes: args.notes || null,
    }).select().single();

    if (error) return `Failed: ${error.message}`;
    return `✅ Logged: ${data.customer_name} — ${data.deal_type} | $${data.commission} (${data.units}u) | ID: ${data.id.slice(0, 8)}`;
  }

  if (name === "delete_deal") {
    const { data: existing } = await supabase.from("deals").select("customer_name").eq("id", args.id).eq("user_id", userId).single();
    const { error } = await supabase.from("deals").delete().eq("id", args.id).eq("user_id", userId);
    if (error) return `Failed: ${error.message}`;
    return `🗑️ Deleted: ${existing?.customer_name || args.id.slice(0, 8)}`;
  }

  if (name === "list_deals") {
    const { start, end } = monthWindow();
    const { data, error } = await supabase.from("deals").select("*").eq("user_id", userId).gte("sold_date", start).lt("sold_date", end).order("sold_date", { ascending: false });
    if (error) return `Error: ${error.message}`;
    if (!data?.length) return "No deals logged this month.";
    return data.map((d: any) => `${d.sold_date}: ${d.customer_name} — ${d.deal_type} $${d.commission} (${d.units}u) [${d.id.slice(0, 8)}]`).join("\n");
  }

  if (name === "get_monthly_summary") {
    const { start, end, label } = monthWindow();
    const [plan, dealsRes] = await Promise.all([
      ensurePayPlan(supabase, userId),
      supabase.from("deals").select("units, commission").eq("user_id", userId).gte("sold_date", start).lt("sold_date", end),
    ]);
    const rows = dealsRes.data ?? [];
    const totalUnits = rows.reduce((s: number, r: any) => s + Number(r.units ?? 0), 0);
    const totalCommission = rows.reduce((s: number, r: any) => s + Number(r.commission ?? 0), 0);
    const draw = Number(plan.monthly_draw ?? 2600);
    const balance = totalCommission - draw;
    const bonuses = [...(plan.volume_bonuses || [])].sort((a: any, b: any) => a.units - b.units);
    const next = bonuses.find((b: any) => b.units > totalUnits);

    let out = `${label}: ${rows.length} deals | ${totalUnits}u | $${totalCommission.toLocaleString()} commission`;
    out += `\nDraw: $${draw.toLocaleString()} | ${balance >= 0 ? "Above" : "Below"} draw by $${Math.abs(balance).toLocaleString()}`;
    if (next) out += `\n${next.units - totalUnits}u to $${next.bonus} bonus at ${next.units}u`;
    return out;
  }

  return `Unknown action: ${name}`;
}

// ─── POST handler ───────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    if (!message?.trim()) return new Response("Say something!", { status: 200 });

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    // Build context
    let systemPrompt = SYSTEM;
    if (user) {
      systemPrompt += await buildContext(supabase, user.id);
    } else {
      systemPrompt += "\n\nYou're talking to a visitor. No profile. Be helpful but general.";
    }

    // Try real Sassy on VM first
    const sassyReply = await askSassy(message.trim());
    if (sassyReply) {
      return new Response(sassyReply, {
        status: 200,
        headers: { "Content-Type": "text/plain; charset=utf-8" },
      });
    }

    // Fallback: direct DeepSeek with tool detection
    const msg = message.toLowerCase().trim();

    // Detect tool intent
    if (user && (msg.includes("add deal") || msg.includes("log a deal") || msg.includes("new deal") || msg.includes("just sold") || msg.includes("sold a"))) {
      // Extract deal info with DeepSeek
      const toolPrompt = `${systemPrompt}\n\nThul says: "${message.trim()}". If this is a deal, respond with ONLY a JSON object: {"action":"add_deal","customer_name":"...","deal_type":"half_mini|full_mini|full_deal|street_purchase","front_gross":number_or_null,"vehicle":"..."}. If not a deal, respond: {"action":"chat","reply":"..."}`;

      try {
        const raw = await askDeepSeek(toolPrompt, "Parse this into a deal or chat response.");
        // Try to extract JSON
        const jsonMatch = raw.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          if (parsed.action === "add_deal" && parsed.customer_name) {
            const result = await runTool("add_deal", parsed, supabase, user.id);
            return new Response(result, { status: 200, headers: { "Content-Type": "text/plain; charset=utf-8" } });
          }
          if (parsed.action === "chat" && parsed.reply) {
            return new Response(parsed.reply, { status: 200, headers: { "Content-Type": "text/plain; charset=utf-8" } });
          }
        }
      } catch { /* fall through to chat */ }
    }

    if (user && (msg.includes("delete") && (msg.includes("deal") || msg.includes("remove")))) {
      const { data: deals } = await supabase.from("deals").select("id, customer_name").eq("user_id", user.id).order("sold_date", { ascending: false }).limit(20);
      if (deals?.length) {
        const match = message.match(/([a-f0-9]{8})/i);
        if (match) {
          const result = await runTool("delete_deal", { id: match[0] }, supabase, user.id);
          return new Response(result, { status: 200, headers: { "Content-Type": "text/plain; charset=utf-8" } });
        }
      }
    }

    if (user && (msg.includes("list deals") || msg.includes("show deals") || msg.includes("my deals") || msg.includes("what deals"))) {
      const result = await runTool("list_deals", {}, supabase, user.id);
      return new Response(result, { status: 200, headers: { "Content-Type": "text/plain; charset=utf-8" } });
    }

    if (user && (msg.includes("summary") || msg.includes("where am i at") || msg.includes("how am i doing") || msg.includes("month") || msg.includes("bonus") || msg.includes("progress"))) {
      const result = await runTool("get_monthly_summary", {}, supabase, user.id);
      return new Response(result, { status: 200, headers: { "Content-Type": "text/plain; charset=utf-8" } });
    }

    // Plain chat
    const reply = await askDeepSeek(systemPrompt, message.trim());
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
