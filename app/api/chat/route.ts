import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

const client = new Anthropic();

const SYSTEM_PROMPTS: Record<string, string> = {
  automotive: `You are Closers Assist — an AI sales agent built specifically for automotive closers. You were built by Thul Leng, a working Toyota salesperson at Sun Toyota in New Port Richey, Florida. You were built on the floor, between real customers, to solve real problems.

You speak the language of the lot:
- You know what a mini is (a deal at or below invoice, usually netting the salesperson the minimum flat commission)
- You know what a street deal is (a customer who walked in off the street, no prior contact, often harder to gross)
- You know CXI scores and why they matter for bonuses
- You understand T.O. (turn-over to a manager to help close a deal)
- You know the difference between front-end and back-end gross
- You understand countable units vs raw units sold

Your job is to help closers:
1. Handle objections in real-time with word-for-word scripts
2. Calculate commissions, pay plans, and unit counts on the fly
3. Navigate difficult customers and sensitive situations
4. Prep for desk negotiations
5. Write follow-up texts and emails that don't sound robotic
6. Understand their numbers and how to move them

Be direct. Be practical. No fluff. You're talking to someone on the lot who has 5 minutes between customers. Give them the answer they need right now.`,

  "real-estate": `You are Closers Assist — an AI sales agent built for real estate agents and closers. You understand the full transaction lifecycle: lead generation, buyer consultations, listing appointments, offers, negotiations, inspections, and closing.

You know the language of real estate:
- Days on market, list-to-sale ratio, absorption rate
- Buyer agency agreements and listing agreements
- Earnest money, contingencies, clear-to-close
- Commission splits, dual agency, referral fees
- MLS, Zillow, buyer funnels

Help agents handle objections, draft follow-ups, calculate numbers, and close more deals. Be direct, practical, zero fluff.`,

  insurance: `You are Closers Assist — an AI sales agent built for insurance sales professionals. You know life, health, P&C, and commercial lines.

You speak insurance:
- Premiums, deductibles, coverage limits, exclusions
- Term vs whole vs universal life
- AOR letters, policy replacements, retention strategies
- Medicare supplements, ACA marketplace, group health
- Cross-sell and upsell tactics

Help agents overcome objections, explain coverage clearly, and close more policies. Direct and practical.`,

  rental: `You are a Closers Assist agent for Rental sales — Turo hosts, Airbnb/vacation rentals, RV, boat, truck/moving rental. Handle objections: pricing disputes, damage deposit concerns, cancellation pushback, cheaper elsewhere. Cover upsells (insurance, add-ons), damage dispute scripts, pricing negotiation, 5-star review asks. Give 2-3 plays with word-for-word scripts and confidence %.`,

  project_manager: `You are a Closers Assist agent for Project Managers who sell — pitching clients, upselling scope, defending budgets, closing change orders. Handle: over budget objections, SOW defense, timeline pushback, closing verbal yes into signed contract. Give 2-3 plays with word-for-word scripts and confidence %.`,

  other_sales: `You are a Closers Assist agent for general sales — universal objections: price, timing, need to think about it, decision-maker stalls, ghosting. Rooted in closing fundamentals. Give 2-3 plays with word-for-word scripts and confidence %.`,

  default: `You are Closers Assist — an AI sales agent built for commission-based closers across industries. You help salespeople handle objections, calculate their numbers, write follow-ups, and close more deals.

Be direct, practical, and zero fluff. The person talking to you is between customers. Give them what they need right now.`,
};

function buildPersonalizedPrompt(
  profile: Record<string, unknown>,
  industryBasePrompt: string
): string {
  const agentName     = (profile.agent_name    as string) || "Closer";
  const firstName     = (profile.first_name    as string) || "";
  const lastName      = (profile.last_name     as string) || "";
  const fullName      = [firstName, lastName].filter(Boolean).join(" ");
  const title         = (profile.title         as string) || "";
  const company       = (profile.company       as string) || "";
  const industry      = (profile.industry      as string) || "";
  const yearsInSales  = (profile.years_in_sales as string) || "";
  const coachingStyle = (profile.coaching_style as string) || "direct";
  const agentFocus    = (profile.agent_focus   as string) || "closing rate";
  const customGoals   = (profile.custom_goals  as string) || "";

  const intro: string[] = [];

  // Identity
  intro.push(`You are ${agentName}, an AI sales coach.`);

  // Who you're working with
  const who = [
    fullName,
    title   ? `a ${title}`             : "",
    company ? `at ${company}`          : "",
    industry ? `in the ${industry} industry` : "",
    yearsInSales ? `with ${yearsInSales} years of experience` : "",
  ].filter(Boolean).join(" ");
  if (who) intro.push(`You are working with ${who}.`);

  // Style + focus
  intro.push(`Your coaching style is ${coachingStyle}. Your primary focus is ${agentFocus}.`);

  // Goal
  if (customGoals) intro.push(`Their goal this month: ${customGoals}.`);

  // Pay plan
  const payParts: string[] = [];
  if (profile.draw)           payParts.push(`$${profile.draw} draw`);
  if (profile.commission_pct) payParts.push(`${profile.commission_pct}% commission`);
  if (profile.mini_flat)      payParts.push(`$${profile.mini_flat} mini/flat`);
  if (profile.volume_bonus)   payParts.push(`$${profile.volume_bonus} volume bonus`);
  if (profile.cxi_bonus)      payParts.push(`$${profile.cxi_bonus} CXI bonus`);
  if (payParts.length) intro.push(`Pay plan: ${payParts.join(", ")}.`);

  return `${intro.join("\n")}\n\n---\n\n${industryBasePrompt}`;
}

const MEMORY_INSTRUCTIONS = `MEMORY — READ CAREFULLY:

You HAVE persistent memory of this user's past conversations spanning weeks. The messages you see in the conversation history above are loaded from a database (agent_memory) where every prior turn has been saved. That history IS your memory. It is real, it is yours, and it is the same user across every session.

When you respond:
- Reference past customers, deals, objections, follow-ups, and discussions when they're relevant. Use specifics from the history (names, dollar amounts, dealership context, dates) — that's what makes you valuable.
- Treat the user as someone you've been working with over time, not a stranger.
- If something the user mentions IS in the history, recall it precisely.

NEVER say any of the following — they are factually wrong and erode user trust:
- "I have no memory of past conversations"
- "Each session starts fresh"
- "I don't remember anything between chats"
- "I'm a new instance" / "I don't retain context"

If the user asks about something specific you genuinely cannot find in the loaded history, say:
"I don't recall that specific detail — can you remind me?"
NOT "I have no memory." There is a difference between not finding a specific fact and having no memory at all. You have memory; you just may not have that one detail.`;

const TOOLS_INSTRUCTIONS = `INCOME TRACKER TOOLS:

You can now manage the user's deal log directly. Whenever the user mentions selling a deal, getting a mini, taking in a street purchase, wanting to update or remove a logged deal, or asking how the month is shaping up — USE THE TOOLS, don't just chat.

Tools available:
- add_deal — log a new sale. Use when the user says things like "I just sold a Camry to the Johnsons", "got a half mini today", "logged a street purchase for $4k". deal_type is one of: half_mini, full_mini, full_deal, street_purchase. For full_deal, you need front_gross. Other fields (vehicle, sold_date, notes) are optional — if sold_date isn't given, leave it blank and the tool defaults to today.
- update_deal — fix or amend an existing deal by id. Use when the user corrects something ("actually that was a full mini, not a half").
- delete_deal — remove a logged deal by id. Confirm with the user before deleting.
- list_deals — return deals for a given month/year (defaults to current month). Use when the user asks "what did I sell this month" or "show me last month".
- get_monthly_summary — return units, gross, commission, draw balance, and units-to-next-bonus for a month. Use when the user asks "where am I at", "how's the month looking", "what's my paycheck".

Rules:
- Don't ask the user for their commission rate or pay-plan numbers — the tools read pay_plans automatically. If they don't have a plan saved, the system creates a default automotive one on first deal log; you can mention this casually.
- After a tool returns, narrate the result naturally to the user (e.g. "Logged the Johnson Camry — $${"{commission}"} on the books, you're at X units this month"). Don't dump raw JSON.
- If the user mentions a deal in passing without explicitly asking to log it, OFFER to log it: "Want me to add that to your tracker?" Don't auto-log without consent.`;

type TextBlock  = { type: "text"; text: string };
type ImageBlock = { type: "image"; source: { type: "base64"; media_type: string; data: string } };
type ContentBlock = TextBlock | ImageBlock;
type MessageContent = string | ContentBlock[];

type ChatMessage = { role: string; content: MessageContent };

/** Extract plain text from a message for memory persistence */
function textOf(content: MessageContent): string {
  if (typeof content === "string") return content;
  return content
    .filter((b): b is TextBlock => b.type === "text")
    .map((b) => b.text)
    .join(" ");
}

/** Dedup key — images are just counted, not hashed (they're large) */
function dedupKey(msg: ChatMessage): string {
  if (typeof msg.content === "string") return `${msg.role}:${msg.content}`;
  const text = textOf(msg.content);
  const imgCount = msg.content.filter((b) => b.type === "image").length;
  return `${msg.role}:${text}:img${imgCount}`;
}

function mergeMessages(memory: ChatMessage[], current: ChatMessage[]): ChatMessage[] {
  // Combine memory (persistent history) with current session messages.
  // Deduplicate on role+text+image-count so overlapping turns aren't sent twice.
  const seen = new Set<string>();
  const deduped: ChatMessage[] = [];

  for (const msg of [...memory, ...current]) {
    const key = dedupKey(msg);
    if (!seen.has(key)) {
      seen.add(key);
      deduped.push(msg);
    }
  }

  // Keep the last 60 messages — roughly 1-2 weeks of history, well within
  // the 200k token context window
  return deduped.slice(-60);
}

// ─── Income tracker: tool defs, defaults, dispatcher ─────────────────────────

type DealType = "half_mini" | "full_mini" | "full_deal" | "street_purchase";
const DEAL_TYPES: DealType[] = ["half_mini", "full_mini", "full_deal", "street_purchase"];

const DEFAULT_PAY_PLAN = {
  industry: "automotive",
  commission_rate: 0.25,
  monthly_draw: 2600,
  half_mini_amount: 200,
  full_mini_amount: 400,
  street_purchase_amount: 500,
  volume_bonuses: [
    { units: 11, bonus: 500 },
    { units: 13, bonus: 750 },
    { units: 15, bonus: 1000 },
  ],
  cxi_threshold: 4.8,
  cxi_bonus: 250,
  review_bonus: 20,
};

type PayPlan = typeof DEFAULT_PAY_PLAN & { id?: string; user_id?: string };

type SupabaseRouteClient = Awaited<ReturnType<typeof createClient>>;

async function ensurePayPlan(supabase: SupabaseRouteClient, userId: string): Promise<PayPlan> {
  const { data } = await supabase
    .from("pay_plans")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();
  if (data) return data as PayPlan;

  const { data: created, error } = await supabase
    .from("pay_plans")
    .insert({ user_id: userId, ...DEFAULT_PAY_PLAN })
    .select()
    .single();
  if (error) throw new Error(`pay_plan create failed: ${error.message}`);
  return created as PayPlan;
}

function calcDealCommission(plan: PayPlan, dealType: DealType, frontGross: number | null) {
  switch (dealType) {
    case "half_mini":       return { commission: Number(plan.half_mini_amount       ?? 0), units: 0.5 };
    case "full_mini":       return { commission: Number(plan.full_mini_amount       ?? 0), units: 1.0 };
    case "full_deal":       return { commission: Number(frontGross ?? 0) * Number(plan.commission_rate ?? 0), units: 1.0 };
    case "street_purchase": return { commission: Number(plan.street_purchase_amount ?? 0), units: 0   };
  }
}

function monthWindow(month?: number, year?: number): { start: string; end: string; label: string } {
  const now = new Date();
  const y = year  ?? now.getUTCFullYear();
  const m = month ?? now.getUTCMonth() + 1; // 1-indexed
  const start = new Date(Date.UTC(y, m - 1, 1)).toISOString().slice(0, 10);
  const end   = new Date(Date.UTC(y, m, 1)).toISOString().slice(0, 10); // exclusive
  const label = `${y}-${String(m).padStart(2, "0")}`;
  return { start, end, label };
}

const TOOL_DEFINITIONS: Anthropic.Messages.Tool[] = [
  {
    name: "add_deal",
    description: "Log a new deal to the user's deals table. Auto-calculates commission and units from their pay plan. Returns the saved row.",
    input_schema: {
      type: "object",
      properties: {
        customer_name: { type: "string", description: "Customer name (required)." },
        vehicle:       { type: "string", description: "Vehicle sold, e.g. '2024 Toyota Camry'. Optional." },
        deal_type:     { type: "string", enum: DEAL_TYPES, description: "Required. One of half_mini, full_mini, full_deal, street_purchase." },
        front_gross:   { type: "number", description: "Front gross in dollars. Required for full_deal, ignored otherwise." },
        sold_date:     { type: "string", description: "ISO date YYYY-MM-DD. Defaults to today if omitted." },
        notes:         { type: "string", description: "Optional notes." },
      },
      required: ["customer_name", "deal_type"],
    },
  },
  {
    name: "update_deal",
    description: "Update fields on an existing deal by id. If front_gross or deal_type changes, commission and units are recalculated from the pay plan.",
    input_schema: {
      type: "object",
      properties: {
        id:            { type: "string", description: "UUID of the deal to update." },
        customer_name: { type: "string" },
        vehicle:       { type: "string" },
        deal_type:     { type: "string", enum: DEAL_TYPES },
        front_gross:   { type: "number" },
        sold_date:     { type: "string", description: "ISO date YYYY-MM-DD." },
        notes:         { type: "string" },
      },
      required: ["id"],
    },
  },
  {
    name: "delete_deal",
    description: "Delete a deal by id. RLS guarantees only the user's own deals can be deleted.",
    input_schema: {
      type: "object",
      properties: { id: { type: "string", description: "UUID of the deal to delete." } },
      required: ["id"],
    },
  },
  {
    name: "list_deals",
    description: "List the user's deals for a given month. Defaults to the current month if month/year omitted.",
    input_schema: {
      type: "object",
      properties: {
        month: { type: "integer", minimum: 1, maximum: 12, description: "1-12. Optional — defaults to current month." },
        year:  { type: "integer", description: "4-digit year. Optional — defaults to current year." },
      },
    },
  },
  {
    name: "get_monthly_summary",
    description: "Return a summary for a month: total_units, total_front_gross, total_commission, deals_count, draw_balance, units_to_next_bonus, next_bonus_amount.",
    input_schema: {
      type: "object",
      properties: {
        month: { type: "integer", minimum: 1, maximum: 12 },
        year:  { type: "integer" },
      },
    },
  },
];

type ToolArgs = Record<string, unknown>;

async function dispatchTool(
  name: string,
  args: ToolArgs,
  supabase: SupabaseRouteClient,
  userId: string
): Promise<unknown> {
  try {
    if (name === "add_deal") {
      const dealType = args.deal_type as DealType;
      if (!DEAL_TYPES.includes(dealType)) {
        return { error: `deal_type must be one of ${DEAL_TYPES.join(", ")}` };
      }
      if (dealType === "full_deal" && (args.front_gross == null || args.front_gross === "")) {
        return { error: "full_deal requires front_gross" };
      }
      const plan = await ensurePayPlan(supabase, userId);
      const frontGross = args.front_gross != null ? Number(args.front_gross) : null;
      const { commission, units } = calcDealCommission(plan, dealType, frontGross);
      const { data, error } = await supabase
        .from("deals")
        .insert({
          user_id:       userId,
          customer_name: args.customer_name,
          vehicle:       args.vehicle ?? null,
          deal_type:     dealType,
          front_gross:   frontGross,
          commission,
          units,
          sold_date:     args.sold_date ?? new Date().toISOString().slice(0, 10),
          notes:         args.notes ?? null,
        })
        .select()
        .single();
      if (error) return { error: error.message };
      return { ok: true, deal: data };
    }

    if (name === "update_deal") {
      const id = args.id as string;
      if (!id) return { error: "id is required" };

      const { data: existing, error: fetchErr } = await supabase
        .from("deals").select("*").eq("id", id).eq("user_id", userId).single();
      if (fetchErr || !existing) return { error: "deal not found" };

      const updates: Record<string, unknown> = {};
      if (args.customer_name !== undefined) updates.customer_name = args.customer_name;
      if (args.vehicle       !== undefined) updates.vehicle       = args.vehicle;
      if (args.sold_date     !== undefined) updates.sold_date     = args.sold_date;
      if (args.notes         !== undefined) updates.notes         = args.notes;

      const dealTypeChanged = args.deal_type   !== undefined && args.deal_type   !== existing.deal_type;
      const frontChanged    = args.front_gross !== undefined && Number(args.front_gross) !== Number(existing.front_gross);

      if (dealTypeChanged || frontChanged) {
        const newDealType = (args.deal_type ?? existing.deal_type) as DealType;
        if (!DEAL_TYPES.includes(newDealType)) {
          return { error: `deal_type must be one of ${DEAL_TYPES.join(", ")}` };
        }
        const newFront = args.front_gross !== undefined
          ? Number(args.front_gross)
          : (existing.front_gross != null ? Number(existing.front_gross) : null);
        const plan = await ensurePayPlan(supabase, userId);
        const { commission, units } = calcDealCommission(plan, newDealType, newFront);
        updates.deal_type   = newDealType;
        updates.front_gross = newFront;
        updates.commission  = commission;
        updates.units       = units;
      }

      updates.updated_at = new Date().toISOString();

      const { data, error } = await supabase
        .from("deals").update(updates).eq("id", id).eq("user_id", userId)
        .select().single();
      if (error) return { error: error.message };
      return { ok: true, deal: data };
    }

    if (name === "delete_deal") {
      const id = args.id as string;
      if (!id) return { error: "id is required" };
      const { error } = await supabase
        .from("deals").delete().eq("id", id).eq("user_id", userId);
      if (error) return { error: error.message };
      return { ok: true, deleted_id: id };
    }

    if (name === "list_deals") {
      const { start, end, label } = monthWindow(args.month as number | undefined, args.year as number | undefined);
      const { data, error } = await supabase
        .from("deals").select("*").eq("user_id", userId)
        .gte("sold_date", start).lt("sold_date", end)
        .order("sold_date", { ascending: false });
      if (error) return { error: error.message };
      return { month: label, count: data?.length ?? 0, deals: data ?? [] };
    }

    if (name === "get_monthly_summary") {
      const { start, end, label } = monthWindow(args.month as number | undefined, args.year as number | undefined);
      const [plan, dealsResult] = await Promise.all([
        ensurePayPlan(supabase, userId),
        supabase.from("deals")
          .select("units, front_gross, commission")
          .eq("user_id", userId)
          .gte("sold_date", start).lt("sold_date", end),
      ]);
      if (dealsResult.error) return { error: dealsResult.error.message };
      const rows = dealsResult.data ?? [];
      const totalUnits      = rows.reduce((s, r) => s + Number(r.units       ?? 0), 0);
      const totalFrontGross = rows.reduce((s, r) => s + Number(r.front_gross ?? 0), 0);
      const totalCommission = rows.reduce((s, r) => s + Number(r.commission  ?? 0), 0);
      const monthlyDraw     = Number(plan.monthly_draw ?? 0);
      const drawBalance     = totalCommission - monthlyDraw;

      const bonuses = Array.isArray(plan.volume_bonuses) ? [...plan.volume_bonuses] : [];
      bonuses.sort((a, b) => Number(a.units) - Number(b.units));
      const next = bonuses.find((b) => Number(b.units) > totalUnits);

      return {
        month:                 label,
        deals_count:           rows.length,
        total_units:           totalUnits,
        total_front_gross:     totalFrontGross,
        total_commission:      totalCommission,
        monthly_draw:          monthlyDraw,
        draw_balance:          drawBalance,
        units_to_next_bonus:   next ? Number(next.units) - totalUnits : null,
        next_bonus_units:      next ? Number(next.units) : null,
        next_bonus_amount:     next ? Number(next.bonus) : null,
      };
    }

    return { error: `unknown tool: ${name}` };
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function POST(req: NextRequest) {
  try {
    const { messages, industry = "automotive" } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Invalid messages" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // ── 1. Auth + data fetch ──────────────────────────────────────────────────

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();

    let profileData: Record<string, unknown> | null = null;
    let memoryMessages: ChatMessage[] = [];

    if (user) {
      const [profileResult, memoryResult] = await Promise.all([
        supabase
          .from("agent_profiles")
          .select("first_name, last_name, company, title, years_in_sales, industry, draw, commission_pct, mini_flat, volume_bonus, cxi_bonus, agent_name, coaching_style, agent_focus, custom_goals")
          .eq("user_id", user.id)
          .single(),
        supabase
          .from("agent_memory")
          .select("role, content, created_at")
          .eq("user_id", user.id)
          .order("created_at", { ascending: false })
          .limit(100),
      ]);

      if (profileResult.data) {
        profileData = profileResult.data as Record<string, unknown>;
      }

      if (memoryResult.data) {
        // DB returns newest-first; sort chronologically (oldest first) for the model
        const rows = memoryResult.data as (ChatMessage & { created_at?: string })[];
        memoryMessages = [...rows]
          .sort((a, b) => {
            const ta = a.created_at ? new Date(a.created_at).getTime() : 0;
            const tb = b.created_at ? new Date(b.created_at).getTime() : 0;
            return ta - tb;
          })
          .map(({ role, content }) => ({ role, content }));
      }
    }

    // ── 2. Build system prompt + context messages ─────────────────────────────

    const SLUG_MAP: Record<string, string> = {
      auto: "automotive",
      "project-manager": "project_manager",
      "other-sales": "other_sales",
    };
    const normalizedIndustry = SLUG_MAP[industry] ?? industry;
    const basePrompt = SYSTEM_PROMPTS[normalizedIndustry] ?? SYSTEM_PROMPTS["default"];
    const personalizedPrompt = profileData
      ? buildPersonalizedPrompt(profileData, basePrompt)
      : basePrompt;

    const now = new Date();
    const dateLine = `Today's date is ${now.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "America/New_York",
    })} (${now.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      timeZoneName: "short",
      timeZone: "America/New_York",
    })}). Use this when the user asks about dates, deadlines, follow-up timing, or anything time-sensitive.`;
    const systemPrompt = `${dateLine}\n\n${personalizedPrompt}\n\n---\n\n${MEMORY_INSTRUCTIONS}\n\n---\n\n${TOOLS_INSTRUCTIONS}`;

    const contextMessages = mergeMessages(memoryMessages, messages);

    // The last user message is what we'll persist after the response
    const lastUserMessage = [...messages].reverse().find((m: ChatMessage) => m.role === "user");

    // ── 3. Stream response ────────────────────────────────────────────────────

    const encoder = new TextEncoder();
    let assistantResponse = "";

    type StreamMsgs = Parameters<typeof client.messages.stream>[0]["messages"];

    const conversation: StreamMsgs = contextMessages.map((m: ChatMessage) => ({
      role: m.role as "user" | "assistant",
      content: m.content as StreamMsgs[number]["content"],
    }));

    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Tool loop — run streams until stop_reason is no longer "tool_use".
          // Cap at 5 hops to prevent runaway loops.
          for (let hop = 0; hop < 5; hop++) {
            const anthropicStream = client.messages.stream({
              model: "claude-sonnet-4-6",
              max_tokens: 1024,
              system: systemPrompt,
              tools: TOOL_DEFINITIONS,
              messages: conversation,
            });

            for await (const chunk of anthropicStream) {
              if (
                chunk.type === "content_block_delta" &&
                chunk.delta.type === "text_delta"
              ) {
                assistantResponse += chunk.delta.text;
                controller.enqueue(encoder.encode(chunk.delta.text));
              }
            }

            const final = await anthropicStream.finalMessage();
            if (final.stop_reason !== "tool_use") break;

            // Append assistant turn (text + tool_use blocks) and run tools.
            conversation.push({ role: "assistant", content: final.content });

            const toolUseBlocks = final.content.filter(
              (b): b is Extract<typeof b, { type: "tool_use" }> => b.type === "tool_use"
            );
            const toolResults = await Promise.all(
              toolUseBlocks.map(async (tu) => ({
                type: "tool_result" as const,
                tool_use_id: tu.id,
                content: JSON.stringify(
                  user ? await dispatchTool(tu.name, tu.input as ToolArgs, supabase, user.id)
                       : { error: "not authenticated" }
                ),
              }))
            );
            conversation.push({ role: "user", content: toolResults });
          }
        } catch (err) {
          console.error("Stream/tool loop error:", err);
          controller.enqueue(encoder.encode("\n\n[error: response interrupted]"));
        }

        // ── 4. Save turn to agent_memory ──────────────────────────────────────
        if (user && lastUserMessage && assistantResponse) {
          await supabase.from("agent_memory").insert([
            {
              user_id:  user.id,
              role:     "user",
              content:  textOf(lastUserMessage.content),
              industry: normalizedIndustry,
            },
            {
              user_id:  user.id,
              role:     "assistant",
              content:  assistantResponse,
              industry: normalizedIndustry,
            },
          ]);
        }

        controller.close();
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Transfer-Encoding": "chunked",
        "Cache-Control": "no-cache",
      },
    });
  } catch (err) {
    console.error("Chat API error:", err);
    return new Response(JSON.stringify({ error: "Internal server error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
