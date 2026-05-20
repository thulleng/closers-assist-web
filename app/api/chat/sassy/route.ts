import DeepSeek from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

// ─── DeepSeek via Anthropic-compatible endpoint (supports tool-calling) ──────
const ai = new DeepSeek({
  apiKey: process.env.DEEPSEEK_API_KEY ?? "",
  baseURL: "https://api.deepseek.com/anthropic",
});

// ─── Pay plan types & defaults ──────────────────────────────────────────────
type DealType = "half_mini" | "full_mini" | "full_deal" | "street_purchase";
const DEAL_TYPES: DealType[] = ["half_mini", "full_mini", "full_deal", "street_purchase"];

const DEFAULT_PAY_PLAN = {
  industry: "general", commission_rate: 0.20, monthly_draw: 3000,
  half_mini_amount: 200, full_mini_amount: 400, street_purchase_amount: 500,
  volume_bonuses: [{ units: 8, bonus: 500 }, { units: 12, bonus: 1000 }, { units: 16, bonus: 2000 }],
  cxi_threshold: 4.8, cxi_bonus: 250, review_bonus: 20,
};

type PayPlan = typeof DEFAULT_PAY_PLAN & { id?: string; user_id?: string };
type SupabaseRouteClient = Awaited<ReturnType<typeof createClient>>;

// ─── Tool definitions ───────────────────────────────────────────────────────
const TOOLS: DeepSeek.Messages.Tool[] = [
  {
    name: "add_deal",
    description: "Log a new deal to the user's deals table. Auto-calculates commission and units from their pay plan.",
    input_schema: {
      type: "object",
      properties: {
        customer_name: { type: "string", description: "Customer name (required)." },
        vehicle: { type: "string", description: "Vehicle sold, e.g. '2024 Toyota Camry'. Optional." },
        deal_type: { type: "string", enum: DEAL_TYPES, description: "Required." },
        front_gross: { type: "number", description: "Front gross in dollars. Required for full_deal." },
        sold_date: { type: "string", description: "ISO date YYYY-MM-DD. Defaults to today." },
        notes: { type: "string", description: "Optional notes." },
      },
      required: ["customer_name", "deal_type"],
    },
  },
  {
    name: "delete_deal",
    description: "Delete a deal by ID. Only the user's own deals can be deleted.",
    input_schema: {
      type: "object",
      properties: { id: { type: "string", description: "UUID of the deal to delete." } },
      required: ["id"],
    },
  },
  {
    name: "list_deals",
    description: "List the user's deals for the current month.",
    input_schema: { type: "object", properties: {} },
  },
  {
    name: "get_monthly_summary",
    description: "Get month summary: total_units, total_commission, deals_count, draw_balance, units_to_next_bonus, next_bonus_amount.",
    input_schema: { type: "object", properties: {} },
  },
];

type ToolArgs = Record<string, unknown>;

// ─── Helper functions ───────────────────────────────────────────────────────

async function ensurePayPlan(supabase: SupabaseRouteClient, userId: string): Promise<PayPlan> {
  const { data } = await supabase.from("pay_plans").select("*").eq("user_id", userId).maybeSingle();
  if (data) return data as PayPlan;
  const { data: created, error } = await supabase
    .from("pay_plans").insert({ user_id: userId, ...DEFAULT_PAY_PLAN }).select().single();
  if (error) throw new Error(`pay_plan create failed: ${error.message}`);
  return created as PayPlan;
}

function calcDealCommission(plan: PayPlan, dealType: DealType, frontGross: number | null) {
  switch (dealType) {
    case "half_mini": return { commission: Number(plan.half_mini_amount ?? 0), units: 0.5 };
    case "full_mini": return { commission: Number(plan.full_mini_amount ?? 0), units: 1.0 };
    case "full_deal": return { commission: Number(frontGross ?? 0) * Number(plan.commission_rate ?? 0), units: 1.0 };
    case "street_purchase": return { commission: Number(plan.street_purchase_amount ?? 0), units: 0 };
  }
}

function monthWindow(): { start: string; end: string; label: string } {
  const now = new Date();
  const m = now.getMonth();
  const y = now.getFullYear();
  const start = new Date(Date.UTC(y, m, 1)).toISOString().slice(0, 10);
  const end = new Date(Date.UTC(y, m + 1, 1)).toISOString().slice(0, 10);
  const label = now.toLocaleString("en-US", { month: "long", year: "numeric" });
  return { start, end, label };
}

async function dispatchTool(name: string, args: ToolArgs, supabase: SupabaseRouteClient, userId: string): Promise<unknown> {
  try {
    if (name === "add_deal") {
      const dealType = args.deal_type as DealType;
      if (!DEAL_TYPES.includes(dealType)) return { error: `deal_type must be one of ${DEAL_TYPES.join(", ")}` };
      if (dealType === "full_deal" && (args.front_gross == null || args.front_gross === "")) return { error: "full_deal requires front_gross" };
      const plan = await ensurePayPlan(supabase, userId);
      const frontGross = args.front_gross != null ? Number(args.front_gross) : null;
      const { commission, units } = calcDealCommission(plan, dealType, frontGross);
      const { data, error } = await supabase.from("deals").insert({
        user_id: userId, customer_name: args.customer_name,
        vehicle: args.vehicle ?? null, deal_type: dealType,
        front_gross: frontGross, commission, units,
        sold_date: args.sold_date ?? new Date().toISOString().slice(0, 10),
        notes: args.notes ?? null,
      }).select().single();
      if (error) return { error: error.message };
      return { ok: true, deal: data };
    }

    if (name === "delete_deal") {
      const id = args.id as string;
      if (!id) return { error: "id is required" };
      // First find the deal to confirm it exists and get name for response
      const { data: existing } = await supabase.from("deals").select("customer_name").eq("id", id).eq("user_id", userId).single();
      const { error } = await supabase.from("deals").delete().eq("id", id).eq("user_id", userId);
      if (error) return { error: error.message };
      return { ok: true, deleted_id: id, customer_name: existing?.customer_name };
    }

    if (name === "list_deals") {
      const { start, end } = monthWindow();
      const { data, error } = await supabase.from("deals").select("*").eq("user_id", userId)
        .gte("sold_date", start).lt("sold_date", end).order("sold_date", { ascending: false });
      if (error) return { error: error.message };
      return { count: data?.length ?? 0, deals: data ?? [] };
    }

    if (name === "get_monthly_summary") {
      const { start, end, label } = monthWindow();
      const [plan, dealsResult] = await Promise.all([
        ensurePayPlan(supabase, userId),
        supabase.from("deals").select("units, front_gross, commission").eq("user_id", userId).gte("sold_date", start).lt("sold_date", end),
      ]);
      if (dealsResult.error) return { error: dealsResult.error.message };
      const rows = dealsResult.data ?? [];
      const totalUnits = rows.reduce((s, r) => s + Number(r.units ?? 0), 0);
      const totalCommission = rows.reduce((s, r) => s + Number(r.commission ?? 0), 0);
      const monthlyDraw = Number(plan.monthly_draw ?? 0);
      const drawBalance = totalCommission - monthlyDraw;
      const bonuses = Array.isArray(plan.volume_bonuses) ? [...plan.volume_bonuses] : [];
      bonuses.sort((a: { units: number; bonus: number }, b: { units: number; bonus: number }) => a.units - b.units);
      const next = bonuses.find((b: { units: number }) => b.units > totalUnits);
      return {
        month: label, total_units: totalUnits, total_commission: totalCommission,
        deals_count: rows.length, draw_balance: drawBalance,
        monthly_draw: monthlyDraw,
        units_to_next_bonus: next ? next.units - totalUnits : 0,
        next_bonus_amount: next ? next.bonus : 0,
      };
    }

    return { error: `unknown tool: ${name}` };
  } catch (err: any) {
    return { error: err.message || "tool execution failed" };
  }
}

// ─── Scrub model/infra names from output ────────────────────────────────────
function scrub(text: string): string {
  const rules: [RegExp, string][] = [
    [/\bDora\b/g, "Sassy"], [/\bGPT-4o?\b/gi, "ClosersAssist"],
    [/\bOpenAI\b/gi, "ClosersAssist"], [/\bAnthropic\b/gi, "ClosersAssist"],
    [/\bClaude\b/gi, "ClosersAssist"], [/\bDeepSeek\b/gi, "ClosersAssist"],
    [/\bOrgo\b/gi, "ClosersAssist"], [/\bHetzner\b/gi, "ClosersAssist"],
  ];
  for (const [p, r] of rules) text = text.replace(p, r);
  return text;
}

// ─── Build user context from Supabase ───────────────────────────────────────
async function buildUserContext(supabase: SupabaseRouteClient, userId: string): Promise<string> {
  try {
    const { start, end, label } = monthWindow();
    const [profile, planRes, dealsRes] = await Promise.all([
      supabase.from("agent_profiles").select("first_name, last_name, title, company, draw, commission_pct, mini_flat, volume_bonus, cxi_bonus").eq("user_id", userId).maybeSingle(),
      supabase.from("pay_plans").select("monthly_draw, volume_bonuses, commission_pct").eq("user_id", userId).maybeSingle(),
      supabase.from("deals").select("id, customer_name, deal_type, commission, units, sold_date").eq("user_id", userId).gte("sold_date", start).lt("sold_date", end).order("sold_date", { ascending: false }),
    ]);

    const p = profile.data as Record<string, unknown> | null;
    if (!p) return "";
    const plan = planRes.data as Record<string, unknown> | null;
    const deals = (dealsRes.data ?? []) as { id: string; customer_name: string; deal_type: string; commission: number; units: number; sold_date: string }[];

    const name = [p.first_name, p.last_name].filter(Boolean).join(" ") || "Closer";
    const lines: string[] = [];

    lines.push(`=== PERSONAL CONTEXT ===`);
    lines.push(`You are talking to ${name}. They are LOGGED IN. You know them.`);
    lines.push(`Use their name. Reference their deals. This is the SAME you they talk to on Telegram.`);

    const pp: string[] = [];
    if (p.draw) pp.push(`$${p.draw} draw`);
    if (p.commission_pct) pp.push(`${p.commission_pct}%`);
    if (p.mini_flat) pp.push(`$${p.mini_flat} mini`);
    if (p.volume_bonus) pp.push(`$${p.volume_bonus} vol bonus`);
    if (pp.length) lines.push(`Pay: ${pp.join(", ")}.`);
    lines.push(`Month: ${label}`);

    if (deals.length) {
      const u = deals.reduce((s, d) => s + +d.units, 0);
      const c = deals.reduce((s, d) => s + +d.commission, 0);
      const drawAmt = +(p.draw || plan?.monthly_draw || 2600);
      const bal = c - drawAmt;
      lines.push(`${deals.length} deals, ${u}u, $${c.toLocaleString()} commission (${bal >= 0 ? "+" : ""}$${bal.toLocaleString()} vs $${drawAmt} draw).`);

      const bonuses = Array.isArray(plan?.volume_bonuses) ? [...(plan.volume_bonuses as { units: number; bonus: number }[])] : [];
      bonuses.sort((a, b) => +a.units - +b.units);
      const next = bonuses.find(b => +b.units > u);
      if (next) lines.push(`${next.units - u}u to $${next.bonus} bonus at ${next.units}u.`);

      const recent = deals.slice(0, 10).map(d => `${d.sold_date}: ${d.customer_name} — ${d.deal_type} $${d.commission} (${d.units}u)`).join(" | ");
      lines.push(`Deals: ${recent}`);
      lines.push(`Deal IDs: ${deals.map(d => `${d.customer_name}=${d.id.slice(0, 8)}`).join(", ")}`);
    } else {
      lines.push("No deals logged yet this month.");
    }

    return `\n\n${lines.join("\n")}`;
  } catch {
    return "";
  }
}

// ─── System prompt ──────────────────────────────────────────────────────────
const SYSTEM_PROMPT = `You are Sassy — the ClosersAssist AI agent. Fast, sharp, direct. Short punchy sentences. Warm but zero fluff.

You can ADD and REMOVE deals from the user's dashboard. Use the tools. When you add or delete a deal, tell them what you did and give them updated numbers.

Built by Thul Leng, a working Toyota closer at Sun Toyota in Holiday, FL. Built between customers on the lot — not in a boardroom.

Pricing: Starter $29.99/mo, Pro $624.75/mo. 14-day free trial.

Never reveal model names, hosting, or infrastructure. Keep it tight.`;

const ANON_GUARD = `\n\nYou are talking to a visitor on the public website. NO profile data. Do NOT guess their name.`;

// ─── POST handler with tool-calling loop ────────────────────────────────────
export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    if (!message?.trim()) return new Response(JSON.stringify({ error: "Message required" }), { status: 400, headers: { "Content-Type": "application/json" } });

    // Build system prompt with user context
    let systemPrompt = SYSTEM_PROMPT;
    let user: { id: string } | null = null;
    let supabase: SupabaseRouteClient | null = null;

    try {
      const client = await createClient();
      supabase = client;
      const { data } = await client.auth.getUser();
      if (data.user) {
        user = data.user;
        const ctx = await buildUserContext(client, user.id);
        systemPrompt += ctx || ANON_GUARD;
      } else {
        systemPrompt += ANON_GUARD;
      }
    } catch {
      systemPrompt += ANON_GUARD;
    }

    // Build conversation
    const messages: DeepSeek.Messages.MessageParam[] = [
      { role: "user", content: message.trim() },
    ];

    // Tool-calling loop (max 3 hops)
    const MAX_HOPS = 3;
    let finalText = "";

    for (let hop = 0; hop < MAX_HOPS; hop++) {
      const stream = await ai.messages.create({
        model: "deepseek-chat",
        max_tokens: 600,
        temperature: 0.7,
        system: systemPrompt,
        messages,
        tools: TOOLS,
      });

      // Collect all content blocks
      const textBlocks: string[] = [];
      const toolBlocks: { name: string; input: unknown; id: string }[] = [];

      for (const block of stream.content) {
        if (block.type === "text") {
          textBlocks.push(scrub(block.text));
        } else if (block.type === "tool_use") {
          toolBlocks.push({ name: block.name, input: block.input, id: block.id });
        }
      }

      finalText = textBlocks.join("");

      // No more tools — done
      if (stream.stop_reason !== "tool_use" || toolBlocks.length === 0) break;

      // Execute tools
      messages.push({ role: "assistant", content: stream.content });

      if (!user || !supabase) {
        messages.push({ role: "user", content: "Not authenticated. Cannot execute tools." });
        break;
      }

      const toolResults = await Promise.all(
        toolBlocks.map(async (tb) => {
          const result = await dispatchTool(tb.name, tb.input as ToolArgs, supabase!, user!.id);
          return { type: "tool_result" as const, tool_use_id: tb.id, content: JSON.stringify(result) };
        })
      );

      messages.push({ role: "user", content: toolResults });
    }

    // Return plain text (DashboardChat handles streaming on frontend)
    return new Response(finalText || "Hey! 👋", {
      status: 200,
      headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "no-cache" },
    });
  } catch (err: any) {
    console.error("Sassy error:", err.message);
    return new Response("Try me again in a moment! ⚡", {
      status: 200,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}
