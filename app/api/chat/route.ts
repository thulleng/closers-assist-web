import Anthropic from "@anthropic-ai/sdk";
import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { preprocessMedia } from "./media";

// DeepSeek V4 — handles text, images, audio, and video via Anthropic-compatible endpoint
const ai = new Anthropic({
  apiKey: process.env.DEEPSEEK_API_KEY ?? "",
  baseURL: "https://api.deepseek.com/anthropic",
});

const REASONING_FRAMEWORK = `HOW YOU OPERATE — INTERNAL PROCESS:
Before every response, run through this silently. The user never sees this process — they only see your final answer.

0. LANGUAGE — Detect what language the user is writing in. Respond in THAT language. If they write in Spanish, respond in Spanish. French → French. Arabic → Arabic. Same for any language. Never switch to English unless the user does first. This is non-negotiable.

1. SITUATION — Read what's really happening. Between customers? At the desk? End of month panic? Is this an objection, a calculation, a strategy question, or deal logging?
2. NUMBERS — What matters here? Their pay plan math. Their unit count. Their bonus gap. Their commission on this deal. If the user's monthly context is provided below, USE IT. Don't ask what you already know.
3. STRATEGY — What's the highest-probability move? Give 1-3 options ranked by likelihood of closing. If there's a clear best play, lead with it — don't present a menu.
4. DELIVER — Word-for-word script first (if objection/script). Then the math (if numbers). Then the why in one sentence. The person reading this has 90 seconds between customers.`;

const AUTOMOTIVE_PROMPT = `You are Closers Assist — an elite AI sales partner built on the floor at Sun Toyota in New Port Richey, Florida by Thul Leng, a working Toyota closer. You were forged between real customers, real T.O.s, and real paychecks. You are not a chatbot. You are a closer's second brain.

YOUR IDENTITY:
You speak the lot fluently — minis, full deals, street purchases, half-minis. You know T.O. timing, desk strategy, CXI protection, front vs. back gross, volume bonuses, and the difference between 10 countable units and 10 sold. You understand that a $200 mini isn't just $200 — it's a half-unit toward a $500 bonus at 11. You think in paychecks, not just deals.

YOUR VOICE:
Direct. Confident. Zero fluff. You talk like the top closer on the board — the one who trains new hires and doesn't sugarcoat. Short sentences. Concrete numbers. When the answer is a script, you give the exact words. When it's math, you show the calculation. When it's strategy, you give the play and the probability.

KNOWLEDGE DOMAINS:
- Objection handling: Payment, price, trade value, "think about it," spouse card, "just looking," internet price match, "another dealer offered," credit concerns, monthly budget
- Deal math: Commission splits, front/back calculations, unit counting, volume bonus tracking, draw vs. commission, pack, holdback
- Desk strategy: When to T.O., how to structure a pencil, what to bring to the tower, reading the desk manager
- Follow-ups: Be-back texts, dead deal revival, sold customer maintenance, orphan owner outreach — all sounding human, never CRM-robot
- CXI/Survey: Delivery prep, expectation setting, the 5-star ask, damage control when you know it's coming

PROACTIVE RULES:
- If the user mentions a deal in passing, OFFER to log it: "Want me to add that to your tracker?"
- If their monthly context shows they're close to a bonus tier, POINT IT OUT: "You're 2 units from $500 — that RAV4 deal puts you one away."
- If you notice a pattern (3 minis in a row, low gross, slow week), SAY SOMETHING: "Three minis this week. Want to talk about how to turn the next one into a full deal?"
- Never wait to be asked what you already know from their context.`;

const REAL_ESTATE_PROMPT = `You are Closers Assist — an elite AI sales partner for real estate agents. You understand the full transaction lifecycle: buyer consults, listing appointments, offers, negotiations, inspections, appraisals, and closings.

${REASONING_FRAMEWORK}

YOUR IDENTITY:
You speak real estate fluently — DOM, list-to-sale ratio, absorption rate, cap rate, GCI, commission splits, dual agency, referral fees. You know what a $400k listing at 2.8% means in the agent's pocket after their split. You think in closings, not just showings.

YOUR VOICE:
Direct, strategic, zero fluff. Like the top producer in the office who mentors new agents between their own closings.

PROACTIVE RULES:
- Reference their monthly context (deals, GCI, cap progress) without being asked
- Flag when they're close to a cap or tier break
- For every objection, give the script first, then the rationale`;

const INSURANCE_PROMPT = `You are Closers Assist — an elite AI sales partner for insurance professionals. You know life, health, P&C, commercial lines, and Medicare.

${REASONING_FRAMEWORK}

YOUR IDENTITY:
Premiums, deductibles, coverage limits, exclusions. Term vs. whole vs. universal life. AOR letters, policy replacements, cross-sell triggers. You think in annualized premium and retention rates.

YOUR VOICE:
Clear, consultative, zero jargon. Like the agency owner who still writes policies.

PROACTIVE RULES:
- Reference monthly context (policies written, premium, retention) without being asked
- Flag cross-sell opportunities based on their book
- Scripts first, rationale second`;

const SOLAR_PROMPT = `You are Closers Assist — an elite AI sales partner for solar closers. You know residential solar: quotes, utility bill analysis, ROI math, financing, PPAs vs. purchases, and clawback risk.

${REASONING_FRAMEWORK}

YOUR VOICE: Direct, numbers-driven. Like the rep who's been burned by clawbacks and learned to redline every deal.

PROACTIVE RULES: Reference monthly context. Flag clawback exposure. Scripts first, math second.`;

const SAAS_PROMPT = `You are Closers Assist — an elite AI sales partner for SaaS closers. ARR, quota attainment, MEDDIC, procurement maze, champions vs. decision makers.

${REASONING_FRAMEWORK}

YOUR VOICE: Strategic, process-oriented. Like the enterprise AE who's been through procurement 100 times.

PROACTIVE RULES: Reference monthly context. Flag pipeline gaps. Scripts first, strategy second.`;

const MEDICAL_PROMPT = `You are Closers Assist — an elite AI sales partner for medical device reps. You know the OR, the surgeon relationship, territory planning, VAC schedules, and hospital procurement.

${REASONING_FRAMEWORK}

YOUR VOICE: Clinical, precise. Like the senior rep who knows every surgeon's preferences.

PROACTIVE RULES: Reference monthly context. Scripts first, clinical rationale second.`;

const RETAIL_PROMPT = `You are Closers Assist — an elite AI sales partner for big-ticket retail closers. Furniture, appliances, electronics, mattresses. Financing math, attachment selling, floor-up techniques.

${REASONING_FRAMEWORK}

YOUR VOICE: Energetic, practical. Like the floor manager who still takes ups.

PROACTIVE RULES: Reference monthly context. Flag attachment opportunities. Scripts first.`;

const RENTAL_PROMPT = `You are Closers Assist — rental sales: Turo, Airbnb, RV, boat, truck. Handle pricing disputes, damage deposit concerns, cancellation pushback, upsells, 5-star review asks.

${REASONING_FRAMEWORK}

Give 2-3 plays with word-for-word scripts and confidence %.`;

const PROJECT_MANAGER_PROMPT = `You are Closers Assist — project managers who sell: pitching, upselling scope, defending budgets, closing change orders.

${REASONING_FRAMEWORK}

Handle budget objections, SOW defense, timeline pushback, closing verbal yes to signed contract. Give 2-3 plays with scripts and confidence %.`;

const OTHER_SALES_PROMPT = `You are Closers Assist — general sales: universal objections — price, timing, think about it, decision-maker stalls, ghosting.

${REASONING_FRAMEWORK}

Give 2-3 plays with word-for-word scripts and confidence %. Root everything in closing fundamentals.`;

const DEFAULT_PROMPT = `You are Closers Assist — an AI sales partner built for commission-based closers across industries. You handle objections, calculate numbers, write follow-ups, and close deals.

${REASONING_FRAMEWORK}

Be direct, practical, zero fluff. The person talking to you is between customers. Give them what they need right now.`;

const SYSTEM_PROMPTS: Record<string, string> = {
  automotive: AUTOMOTIVE_PROMPT,
  "real-estate": REAL_ESTATE_PROMPT,
  insurance: INSURANCE_PROMPT,
  solar: SOLAR_PROMPT,
  saas: SAAS_PROMPT,
  medical: MEDICAL_PROMPT,
  retail: RETAIL_PROMPT,
  rental: RENTAL_PROMPT,
  project_manager: PROJECT_MANAGER_PROMPT,
  other_sales: OTHER_SALES_PROMPT,
  default: DEFAULT_PROMPT,
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

const MEMORY_INSTRUCTIONS = `HOW TO TALK TO THIS PERSON:

You know them. The history above IS your memory — every deal they've told you about, every objection you've helped them handle, every follow-up you've written together. The memory profile above tells you who they are. The conversation history shows you what you've discussed.

Talk like someone who's been in their corner for weeks:
- Greet them by name naturally — not like a chatbot, like a coach who just walked onto the lot
- Reference specific deals, customers, and situations from your history: "How'd the Cunningham deal close?" not "Have you sold any cars recently?"
- Call back to past advice you gave: "Last time we talked about payment objections — did the 'total cost of ownership' angle work?"
- Notice patterns: "Three minis this week. Last month you were here too before you turned it around."
- Celebrate wins: "That $4k gross on Cunningham — that's your best deal this month."
- Push them when they're slacking: "You're $1 above draw with 7 units to bonus. What's the play today?"

Voice: Direct, warm, familiar. Like a veteran closer who's been mentoring them for months. Not a customer service agent. Not an AI assistant. A partner.

If you genuinely don't know something from the history, say "Refresh me on that" — never say "I have no memory" or "I don't remember." You have memory. You just might not have that one detail.`;

const TOOLS_INSTRUCTIONS = `INCOME TRACKER TOOLS:

CRITICAL — READ THIS FIRST:
You MUST call the appropriate tool whenever the user mentions a deal action (selling, logging, updating, deleting, summarizing). Saying "I logged it" / "saved" / "added to your tracker" WITHOUT calling the matching tool is a lie that erodes user trust and corrupts their income data. NEVER claim a deal was saved unless add_deal actually returned ok: true. If you can't call the tool for any reason, say so explicitly: "I wasn't able to log that — try again?" — do not pretend.

You can manage the user's deal log directly. Whenever the user mentions selling a deal, getting a mini, taking in a street purchase, wanting to update or remove a logged deal, or asking how the month is shaping up — USE THE TOOLS, don't just chat.

Tools available:
- add_deal — log a new sale. Use when the user says things like "I just sold a Camry to the Johnsons", "got a half mini today", "logged a street purchase for $4k". deal_type is one of: half_mini, full_mini, full_deal, street_purchase. For full_deal, you need front_gross. Other fields (vehicle, sold_date, notes) are optional — if sold_date isn't given, leave it blank and the tool defaults to today.
- update_deal — fix or amend an existing deal by id. Use when the user corrects something ("actually that was a full mini, not a half").
- delete_deal — remove a logged deal by id. Confirm with the user before deleting.
- list_deals — return deals for a given month/year (defaults to current month). Use when the user asks "what did I sell this month" or "show me last month".
- get_monthly_summary — return units, gross, commission, draw balance, and units-to-next-bonus for a month. Use when the user asks "where am I at", "how's the month looking", "what's my paycheck".

Rules:
- Don't ask the user for their commission rate or pay-plan numbers — the tools read pay_plans automatically. If they don't have a plan saved, the system creates a default automotive one on first deal log; you can mention this casually.
- After a tool returns, narrate the result naturally to the user (e.g. "Logged the Johnson Camry — \${commission} on the books, you're at X units this month"). Don't dump raw JSON.
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
  {
    name: "remember_fact",
    description: "Save a fact about the user to their persistent memory profile. Use when the user explicitly asks you to remember something, shares a preference, states a goal, or reveals something personal.",
    input_schema: {
      type: "object",
      properties: {
        category: { type: "string", enum: ["preference", "goal", "personal", "style", "pattern", "other"], description: "Category of the fact." },
        fact: { type: "string", description: "The fact to remember." },
      },
      required: ["category", "fact"],
    },
  },
];

type ToolArgs = Record<string, unknown>;

async function buildMonthlyContext(
  supabase: SupabaseRouteClient,
  userId: string
): Promise<string> {
  try {
    const { start } = monthWindow();
    const [plan, dealsResult] = await Promise.all([
      supabase.from("pay_plans").select("*").eq("user_id", userId).maybeSingle(),
      supabase.from("deals")
        .select("customer_name, deal_type, commission, units, sold_date")
        .eq("user_id", userId)
        .gte("sold_date", start)
        .order("sold_date", { ascending: false }),
    ]);

    const rows = (dealsResult.data ?? []) as {
      customer_name: string; deal_type: string;
      commission: number; units: number; sold_date: string;
    }[];
    const totalUnits = rows.reduce((s, r) => s + Number(r.units ?? 0), 0);
    const totalCommission = rows.reduce((s, r) => s + Number(r.commission ?? 0), 0);
    const monthlyDraw = Number(plan?.data?.monthly_draw ?? 2600);
    const drawBalance = totalCommission - monthlyDraw;

    const bonuses = Array.isArray(plan?.data?.volume_bonuses)
      ? [...(plan.data.volume_bonuses as { units: number; bonus: number }[])]
      : [];
    bonuses.sort((a, b) => Number(a.units) - Number(b.units));
    const next = bonuses.find((b) => Number(b.units) > totalUnits);

    const recentDeals = rows.slice(0, 5).map((d) =>
      `${d.sold_date}: ${d.customer_name} — ${d.deal_type} ($${d.commission}, ${d.units}u)`
    ).join("\n");

    if (rows.length === 0) {
      return `MONTHLY CONTEXT: No deals logged yet this month. The user may be new or hasn't started tracking.`;
    }

    const bonusLine = next
      ? `Next bonus: ${Number(next.units) - totalUnits} units away from $${next.bonus} at ${next.units} units.`
      : `All volume bonuses achieved this month.`;

    return `MONTHLY CONTEXT (use this proactively — don't wait to be asked):
Month: ${rows.length} deals, ${totalUnits} units, $${totalCommission.toLocaleString()} commission.
Draw: $${monthlyDraw.toLocaleString()}/mo. Draw balance: $${drawBalance.toLocaleString()} (${drawBalance >= 0 ? "ahead of draw" : "behind draw"}).
${bonusLine}
Recent deals:
${recentDeals || "none"}`;
  } catch {
    return ""; // fail silently — context is a nice-to-have
  }
}
async function buildMemoryProfile(
  profileData: Record<string, unknown> | null,
  monthlyContext: string,
  memoryMessages: ChatMessage[],
  supabase: SupabaseRouteClient | null,
  userId: string | null
): Promise<string> {
  const parts: string[] = [];

  // 0. Persisted facts from trained memory
  if (supabase && userId) {
    try {
      const { data: facts } = await supabase
        .from("agent_memory")
        .select("content")
        .eq("user_id", userId)
        .eq("role", "fact")
        .order("created_at", { ascending: false })
        .limit(30);

      if (facts && facts.length > 0) {
        const factLines = facts.map((f: { content: string }) => `- ${f.content}`);
        parts.push(`Learned facts (from past conversations):\n${factLines.join("\n")}`);
      }
    } catch { /* ignore — facts query is nice-to-have */ }
  }

  // 0b. Recent session summaries — what happened last time
  if (supabase && userId) {
    try {
      const { data: summaries } = await supabase
        .from("agent_memory")
        .select("content, created_at")
        .eq("user_id", userId)
        .eq("role", "summary")
        .order("created_at", { ascending: false })
        .limit(5);

      if (summaries && summaries.length > 0) {
        const summaryLines = summaries.map(
          (s: { content: string; created_at: string }) => {
            const d = new Date(s.created_at);
            const label = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
            return `[${label}] ${s.content}`;
          }
        );
        parts.push(`Recent session summaries:\n${summaryLines.join("\n")}`);
      }
    } catch { /* ignore */ }
  }

  // 1. Identity from profile
  if (profileData) {
    const name = [profileData.first_name, profileData.last_name].filter(Boolean).join(" ") || "the rep";
    const title = profileData.title || "";
    const company = profileData.company || "";
    const years = profileData.years_in_sales || "";
    const style = profileData.coaching_style || "";
    const focus = profileData.agent_focus || "";
    const goals = profileData.custom_goals || "";

    parts.push(`You are working with ${name}${title ? `, ${title}` : ""}${company ? ` at ${company}` : ""}${years ? `, ${years} years in sales` : ""}.`);

    if (style || focus) {
      parts.push(`Their style is ${style || "direct"}. Their primary focus is ${focus || "closing rate"}.`);
    }
    if (goals) {
      parts.push(`Their stated goal: ${goals}.`);
    }
  }

  // 2. Relationship context from conversation history
  if (memoryMessages.length > 0) {
    const pastTurns = memoryMessages.filter((m) => m.role === "user").length;
    const recentTopics = new Set<string>();
    const topicPattern = /\b(objection|script|commission|follow.?up|T\.?O\.?|desk|mini|deal|customer|bonus|CXI|review|text|email)\b/gi;

    for (const msg of memoryMessages.slice(-30)) {
      if (msg.role === "user" && typeof msg.content === "string") {
        const matches = msg.content.match(topicPattern);
        if (matches) matches.forEach((t) => recentTopics.add(t.toLowerCase()));
      }
    }

    parts.push(`You've had ${pastTurns} conversations. Common topics: ${[...recentTopics].slice(0, 8).join(", ") || "sales strategy"}.`);
    parts.push(`This is an ongoing relationship — talk like you know them. Reference past discussions naturally. Never reintroduce yourself.`);
  } else {
    parts.push(`This appears to be your first conversation. Welcome them warmly and establish the relationship.`);
  }

  // 3. Current numbers (extracted from monthly context)
  if (monthlyContext && !monthlyContext.includes("No deals logged")) {
    // Extract key stats from the monthly context string
    const unitMatch = monthlyContext.match(/([\d.]+)\s*units/);
    const commMatch = monthlyContext.match(/\$([\d,]+)\s*commission/);
    const bonusMatch = monthlyContext.match(/Next bonus:\s*(.+)/);

    if (unitMatch || commMatch) {
      const stats: string[] = [];
      if (unitMatch) stats.push(`${unitMatch[1]} units`);
      if (commMatch) stats.push(`$${commMatch[1]} commission`);
      if (bonusMatch) stats.push(bonusMatch[1]);
      parts.push(`Month to date: ${stats.join(", ")}.`);
    }
  }

  return parts.length > 0
    ? `WHO YOU'RE TALKING TO (use this proactively — reference it without being asked):\n${parts.join("\n")}`
    : "";
}

/**
 * Synthesize a completed conversation session into a compressed summary.
 * Runs when >1 hour has passed since the last message — treats the prior
 * messages as a "closed session" and stores a 2-3 line summary for future recall.
 */
async function synthesizeSession(
  supabase: SupabaseRouteClient,
  userId: string,
  messages: ChatMessage[]
): Promise<string | null> {
  if (messages.length < 4) return null;

  const conversationText = messages
    .map((m) => `${m.role}: ${typeof m.content === "string" ? m.content.slice(0, 400) : "[non-text]"}`)
    .join("\n");

  try {
    const summary = await ai.messages.create({
      model: "deepseek-chat",
      max_tokens: 250,
      system:
        "Summarize this sales coaching conversation in 2-3 sentences. Include: what was discussed, any deals logged (names, amounts), decisions made, goals mentioned, and the user's mood or state. Be specific with numbers and names. No fluff. Write like a colleague leaving a sticky note for the next shift.",
      messages: [{ role: "user", content: conversationText }],
    });

    const text =
      summary.content[0]?.type === "text" ? summary.content[0].text : null;
    if (!text || text.length < 10) return null;

    await supabase.from("agent_memory").insert({
      user_id: userId,
      role: "summary",
      content: text,
    });

    return text;
  } catch {
    return null; // synthesis is best-effort — never block the chat for it
  }
}

/**
 * Build rich context for a specific deal — the closer selected this deal
 * from the dropdown, so the AI should know everything about it.
 */
async function buildDealContext(
  supabase: SupabaseRouteClient,
  userId: string,
  dealId: string
): Promise<string> {
  try {
    const { data: deal, error } = await supabase
      .from("deals")
      .select("*")
      .eq("id", dealId)
      .eq("user_id", userId)
      .single();

    if (error || !deal) return "";

    const { data: memories } = await supabase
      .from("agent_memory")
      .select("content, created_at")
      .eq("user_id", userId)
      .order("created_at", { ascending: false })
      .limit(100);

    const dealMemories = (memories ?? [])
      .filter((m: { content: string }) => m.content.startsWith(`[deal:${dealId}]`))
      .slice(0, 8)
      .map((m: { content: string; created_at: string }) => {
        const d = new Date(m.created_at);
        const label = d.toLocaleDateString("en-US", { month: "short", day: "numeric" });
        return `[${label}] ${m.content.replace(`[deal:${dealId}] `, "")}`;
      });

    const lines = [
      "DEAL CONTEXT — The user has selected this specific deal. Focus your response on THIS deal:",
      `Customer: ${deal.customer_name}`,
      deal.vehicle ? `Vehicle: ${deal.vehicle}` : null,
      `Type: ${deal.deal_type}${deal.front_gross ? ` | Front gross: $${deal.front_gross.toLocaleString()}` : ""}${deal.commission ? ` | Commission: $${deal.commission.toLocaleString()}` : ""}`,
      deal.status ? `Status: ${deal.status}` : null,
      deal.last_contact_date ? `Last contact: ${deal.last_contact_date}` : null,
      deal.notes ? `Notes: ${deal.notes}` : null,
    ].filter(Boolean);

    if (dealMemories.length > 0) {
      lines.push(`\nPast conversations about ${deal.customer_name}:`);
      lines.push(...dealMemories);
    }

    return lines.join("\n");
  } catch {
    return ""; // fail silently — deal context is a nice-to-have
  }
}

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

    if (name === "remember_fact") {
      const category = args.category as string;
      const fact = args.fact as string;
      if (!fact?.trim()) return { error: "fact is required" };

      // Store as a special memory row with role="fact"
      const { error } = await supabase
        .from("agent_memory")
        .insert({
          user_id: userId,
          role: "fact",
          content: `[${category}] ${fact.trim()}`,
          industry: "system",
        });

      if (error) return { error: error.message };

      // Count existing facts
      const { count } = await supabase
        .from("agent_memory")
        .select("*", { count: "exact", head: true })
        .eq("user_id", userId)
        .eq("role", "fact");

      return { ok: true, saved: fact, category, total_facts: count ?? 1 };
    }

    return { error: `unknown tool: ${name}` };
  } catch (err) {
    return { error: err instanceof Error ? err.message : String(err) };
  }
}

export async function POST(req: NextRequest) {
  try {
    const { messages, industry = "automotive", dealId } = await req.json();

    if (!messages || !Array.isArray(messages)) {
      return new Response(JSON.stringify({ error: "Invalid messages" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // ── 1. Auth + data fetch ──────────────────────────────────────────────────

    const supabase = await createClient();

    // Support both Bearer token (mobile) and cookie (web) auth
    const authHeader = req.headers.get("authorization");
    let user = null;

    if (authHeader?.startsWith("Bearer ")) {
      const token = authHeader.slice(7);
      const { data } = await supabase.auth.getUser(token);
      user = data.user ?? null;
    } else {
      const { data } = await supabase.auth.getUser();
      user = data.user ?? null;
    }

    let profileData: Record<string, unknown> | null = null;
    let memoryMessages: ChatMessage[] = [];

    if (user) {
      // ── Session boundary detection — synthesize previous session if stale ────
      const { data: lastMsg } = await supabase
        .from("agent_memory")
        .select("created_at")
        .eq("user_id", user.id)
        .neq("role", "fact")
        .order("created_at", { ascending: false })
        .limit(1);

      if (lastMsg?.[0]?.created_at) {
        const lastTime = new Date(lastMsg[0].created_at).getTime();
        const hoursSince = (Date.now() - lastTime) / (1000 * 60 * 60);

        if (hoursSince > 1) {
          // Find the last summary timestamp to avoid re-synthesizing
          const { data: lastSummary } = await supabase
            .from("agent_memory")
            .select("created_at")
            .eq("user_id", user.id)
            .eq("role", "summary")
            .order("created_at", { ascending: false })
            .limit(1);

          const cutoff = lastSummary?.[0]?.created_at
            ? new Date(lastSummary[0].created_at).getTime()
            : 0;

          // Grab unsynthesized messages
          const { data: staleMessages } = await supabase
            .from("agent_memory")
            .select("role, content, created_at")
            .eq("user_id", user.id)
            .neq("role", "fact")
            .neq("role", "summary")
            .gt("created_at", new Date(cutoff).toISOString())
            .order("created_at", { ascending: true })
            .limit(80);

          if (staleMessages && staleMessages.length >= 4) {
            const msgs = staleMessages.map((m) => ({
              role: m.role as "user" | "assistant",
              content: m.content,
            }));
            await synthesizeSession(supabase, user.id, msgs);
          }
        }
      }

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
          .neq("role", "fact")
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

    // Inject real monthly numbers so the agent knows without being asked
    const monthlyContext = user
      ? await buildMonthlyContext(supabase, user.id)
      : "";

    // Build memory profile — who the agent is talking to
    const memoryProfile = user
      ? await buildMemoryProfile(profileData, monthlyContext, memoryMessages, supabase, user.id)
      : "";

    // Build deal context — if user selected a specific deal, inject everything about it
    const dealContext = user && dealId
      ? await buildDealContext(supabase, user.id, dealId)
      : "";

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
    const systemPrompt = [dateLine, memoryProfile, dealContext, personalizedPrompt, monthlyContext, MEMORY_INSTRUCTIONS, TOOLS_INSTRUCTIONS]
      .filter(Boolean)
      .join("\n\n---\n\n");

    const contextMessages = mergeMessages(memoryMessages, messages);

    // ── Pre-process audio/video uploads ──────────────────────────────────────
    // Transcribe audio via Deepgram, extract video frames via ffmpeg + Claude Vision.
    // This runs before the stream so the model sees clean text, not raw media.
    //
    // Normalize string content → [{type:"text", text:...}] first.
    // preprocessMedia expects array-shaped content blocks.
    const normalizedMessages = contextMessages.map((m) => {
      if (typeof m.content === "string") {
        return { role: m.role, content: [{ type: "text" as const, text: m.content }] };
      }
      return m;
    });
    const processedMessages = await preprocessMedia(
      normalizedMessages as { role: string; content: any[] }[]
    );

    // The last user message is what we'll persist after the response
    const lastUserMessage = [...messages].reverse().find((m: ChatMessage) => m.role === "user");

    // ── 3. Stream response ────────────────────────────────────────────────────

    const encoder = new TextEncoder();
    let assistantResponse = "";

    type StreamParams = Parameters<typeof ai.messages.stream>[0];
    type StreamMsgs   = StreamParams["messages"];

    const conversation: StreamMsgs = processedMessages
      .map((m) => {
        let content = m.content;
        // DeepSeek requires ContentBlockParam[] — convert plain strings
        if (typeof content === "string") {
          content = [{ type: "text" as const, text: content }];
        }
        console.log("[chat] msg role:", m.role, "content_type:", typeof content, "is_array:", Array.isArray(content), "preview:", JSON.stringify(content).slice(0, 120));
        return {
          role: m.role as "user" | "assistant",
          content: content as StreamMsgs[number]["content"],
        };
      })
      .filter((m) => {
        if (Array.isArray(m.content)) {
          return m.content.some((b) => {
            if (b.type === "text") return (b.text ?? "").trim().length > 0;
            return true; // image blocks are non-empty
          });
        }
        return false;
      });

    // Detect deal-tracker intent so we can FORCE add_deal when the user is
    // unambiguously logging a sale. Two-gate heuristic:
    //   1. DEAL_TRIGGER_RE matches deal-language (broad — catches verb-led
    //      phrasings like "closed the Smiths", "rolled the Tundra",
    //      "wrote up a RAV4", "out the door").
    //   2. QUESTION_RE suppresses advice-seeking ("how do I close...?"),
    //      where forcing add_deal would hallucinate args.
    const DEAL_TRIGGER_RE = /\b(sold|deal|mini|full[- ]?deal|street|gross|paycheck|commission|logged?|units?|closed|delivered|wrote up|wrote one up|writing up|write[- ]up|rolled|signed|out the door)\b/i;
    const QUESTION_RE = /[?]\s*$|^\s*(how|what|why|when|where|which|should|can|do|does|did|is|are|any tips|tips for|advice for|show me|display)\b/i;
    const lastUserText = lastUserMessage ? textOf(lastUserMessage.content) : "";
    const dealTriggered = DEAL_TRIGGER_RE.test(lastUserText);
    const isQuestion = QUESTION_RE.test(lastUserText);
    const forceAddDeal = dealTriggered && !isQuestion;
    console.log("[chat] tools count:", TOOL_DEFINITIONS.length,
      "deal_triggered:", dealTriggered,
      "is_question:", isQuestion,
      "force_add_deal:", forceAddDeal,
      "last_user:", lastUserText.slice(0, 120));

    // ── Detect if any message contains images ─────────────────────────────────
    const hasImages = conversation.some((m) => {
      if (typeof m.content === "string") return false;
      return Array.isArray(m.content) && m.content.some((b: unknown) =>
        (b as { type?: string })?.type === "image"
      );
    });

    // DeepSeek V4 handles text, images, and voice — single model for everything
    const activeClient = ai;
    const activeModel = "deepseek-chat";

    console.log("[chat] has_images:", hasImages, "model:", activeModel);

    const stream = new ReadableStream({
      async start(controller) {
        try {
          // Tool loop — run streams until stop_reason is no longer "tool_use".
          // Cap at 5 hops to prevent runaway loops.
          for (let hop = 0; hop < 5; hop++) {
            const streamParams: StreamParams = {
              model: activeModel,
              max_tokens: 1024,
              system: systemPrompt,
              tools: hasImages ? undefined : TOOL_DEFINITIONS, // Claude tool format differs
              messages: conversation,
            };
            // First hop only: when the user has unambiguously described a
            // logged-worthy action (deal-language present, not phrased as a
            // question), FORCE the model to call add_deal. Without this,
            // the model narrates "logged the Camry" in plain text without
            // emitting a tool_use block — silently corrupting income data.
            // Other hops, and ambiguous phrasings, fall through to SDK default
            // (auto), where the model picks based on the system prompt.
            if (hop === 0 && forceAddDeal) {
              // DeepSeek doesn't support { type: "tool", name: "..." } —
              // use { type: "any" } to force a tool call without naming one.
              streamParams.tool_choice = { type: "any" };
            }
            console.log("[chat] hop", hop,
              "tools count:", TOOL_DEFINITIONS.length,
              "tool_choice:", streamParams.tool_choice ?? "default-auto");

            const anthropicStream = activeClient.messages.stream(streamParams);

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
            console.log("[chat] hop", hop,
              "stop_reason:", final.stop_reason,
              "content_types:", final.content.map((b) => b.type),
              "user_id:", user?.id ?? "anon");

            if (final.stop_reason !== "tool_use") break;

            // Append assistant turn (text + tool_use blocks) and run tools.
            conversation.push({ role: "assistant", content: final.content });

            const toolUseBlocks = final.content.filter(
              (b): b is Extract<typeof b, { type: "tool_use" }> => b.type === "tool_use"
            );
            const toolResults = await Promise.all(
              toolUseBlocks.map(async (tu) => {
                const result = user
                  ? await dispatchTool(tu.name, tu.input as ToolArgs, supabase, user.id)
                  : { error: "not authenticated" };
                const isError =
                  !!result && typeof result === "object" && "error" in result;
                console.log("[chat] tool", tu.name,
                  "input:", JSON.stringify(tu.input),
                  "is_error:", isError,
                  "result:", JSON.stringify(result).slice(0, 300));
                return {
                  type: "tool_result" as const,
                  tool_use_id: tu.id,
                  content: JSON.stringify(result),
                  is_error: isError,
                };
              })
            );
            conversation.push({ role: "user", content: toolResults });
          }
        } catch (err) {
          const msg = err instanceof Error ? err.message : String(err);
          console.error("Stream/tool loop error:", msg, err);
          controller.enqueue(encoder.encode(`\n\n[error: ${msg}]`));
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
