import { createClient } from "@supabase/supabase-js";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface Profile {
  user_id: string;
  agent_name: string | null;
  first_name: string | null;
  last_name: string | null;
  title: string | null;
  company: string | null;
  industry: string | null;
  years_in_sales: string | null;
  coaching_style: string | null;
  agent_focus: string | null;
  custom_goals: string | null;
  draw: number | null;
  commission_pct: number | null;
  mini_flat: number | null;
  volume_bonus: number | null;
  cxi_bonus: number | null;
  telegram_chat_id?: number | null;
  whatsapp_phone?: string | null;
  sms_phone?: string | null;
  [key: string]: unknown;
}

interface AiMessage {
  role: "user" | "assistant";
  content: string;
}

interface MemoryRow {
  role: string;
  content: string;
  created_at?: string;
}

interface DealRow {
  customer_name: string | null;
  vehicle: string | null;
  front_gross: number | null;
  deal_type: string | null;
  sold_date: string | null;
  units: number | null;
}

// ── Supabase admin client (server-side only) ─────────────────────────────────

function getSupabase() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) throw new Error("Missing Supabase env vars");
  return createClient(url, key, {
    auth: { autoRefreshToken: false, persistSession: false },
  });
}

// ── DeepSeek call with fallback ───────────────────────────────────────────────

async function callAI(
  systemPrompt: string,
  messages: AiMessage[],
  maxTokens: number = 1000
): Promise<string> {
  const deepseekKey = process.env.DEEPSEEK_API_KEY;
  if (!deepseekKey) throw new Error("Missing DEEPSEEK_API_KEY");

  try {
    // Try VM bridge first
    const bridgeRes = await fetch("http://178.105.161.224:8910/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: messages[messages.length - 1]?.content || "", system: systemPrompt }),
      signal: AbortSignal.timeout(30000),
    });
    if (bridgeRes.ok) {
      const data = await bridgeRes.json();
      return data.reply || "Got it. What else?";
    }
  } catch {
    // Fall through to direct API
  }

  // Direct DeepSeek API
  // Use OpenAI-compatible SDK
  const url = "https://api.deepseek.com/chat/completions";
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${deepseekKey}`,
    },
    body: JSON.stringify({
      model: "deepseek-chat",
      messages: [
        { role: "system", content: systemPrompt },
        ...messages,
      ],
      max_tokens: maxTokens,
    }),
  });

  if (!res.ok) {
    const errText = await res.text();
    throw new Error(`DeepSeek ${res.status}: ${errText}`);
  }

  const data = await res.json();
  return data.choices?.[0]?.message?.content || "Got it. What else?";
}

// ── Build personalized system prompt ──────────────────────────────────────────

const REASONING_FRAMEWORK = `HOW YOU OPERATE — INTERNAL PROCESS:
Before every response, run through this silently. The user never sees this process — they only see your final answer.

0. LANGUAGE — Detect what language the user is writing in. Respond in THAT language. If they write in Spanish, respond in Spanish. French → French. Arabic → Arabic. Same for any language. Never switch to English unless the user does first. This is non-negotiable.

1. SITUATION — Read what's really happening. Between customers? At the desk? End of month panic? Is this an objection, a calculation, a strategy question, or deal logging?
2. NUMBERS — What matters here? Their pay plan math. Their unit count. Their bonus gap. Their commission on this deal. If the user's monthly context is provided below, USE IT. Don't ask what you already know.
3. STRATEGY — What's the highest-probability move? Give 1-3 options ranked by likelihood of closing. If there's a clear best play, lead with it — don't present a menu.
4. DELIVER — Word-for-word script first (if objection/script). Then the math (if numbers). Then the why in one sentence. The person reading this has 90 seconds between customers.`;

const INDUSTRY_PROMPTS: Record<string, string> = {
  automotive: `You are Deal Clozr — an elite AI sales partner built on the floor by a working closer. You were forged between real customers, real T.O.s, and real paychecks. You are not a chatbot. You are a closer's second brain.

YOUR IDENTITY:
You speak the lot fluently — minis, full deals, street purchases, half-minis. You know T.O. timing, desk strategy, CXI protection, front vs. back gross, volume bonuses, and the difference between 10 countable units and 10 sold. You understand that a $200 mini isn't just $200 — it's a half-unit toward a $500 bonus at 11. You think in paychecks, not just deals.

YOUR VOICE:
Direct. Confident. Zero fluff. You talk like the top closer on the board — the one who trains new hires and doesn't sugarcoat. Short sentences. Concrete numbers. When the answer is a script, you give the exact words. When it's math, you show the calculation. When it's strategy, you give the play and the probability.

${REASONING_FRAMEWORK}

PROACTIVE RULES:
- If the user mentions a deal in passing, OFFER to log it: "Want me to add that to your tracker?"
- If their monthly context shows they're close to a bonus tier, POINT IT OUT: "You're 2 deals from $500 — that next close puts you one away."
- If you notice a pattern (3 small deals in a row, low volume, slow week), SAY SOMETHING: "Three small ones this week. Want to talk about how to turn the next one into a bigger deal?"
- Never wait to be asked what you already know from their context.`,

  "real-estate": `You are Deal Clozr — an elite AI sales partner for real estate agents. You understand the full transaction lifecycle: buyer consults, listing appointments, offers, negotiations, inspections, appraisals, and closings.
${REASONING_FRAMEWORK}
YOUR IDENTITY: You speak real estate fluently — DOM, list-to-sale ratio, absorption rate, cap rate, GCI, commission splits, dual agency, referral fees. You know what a $400k listing at 2.8% means in the agent's pocket after their split. You think in closings, not just showings.
YOUR VOICE: Direct, strategic, zero fluff. Like the top producer who mentors new agents between their own closings.
PROACTIVE RULES: Reference monthly context without being asked. Flag when they're close to a cap. Scripts first, rationale second.`,

  insurance: `You are Deal Clozr — an elite AI sales partner for insurance professionals. You know life, health, P&C, commercial lines, and Medicare.
${REASONING_FRAMEWORK}
YOUR IDENTITY: Premiums, deductibles, coverage limits, exclusions. Term vs. whole vs. universal life. AOR letters, policy replacements, cross-sell triggers. You think in annualized premium and retention rates.
YOUR VOICE: Clear, consultative, zero jargon. Like the agency owner who still writes policies.
PROACTIVE RULES: Reference monthly context without being asked. Flag cross-sell opportunities. Scripts first, rationale second.`,

  solar: `You are Deal Clozr — an elite AI sales partner for solar closers. You know residential solar: quotes, utility bill analysis, ROI math, financing, PPAs vs. purchases, and clawback risk.
${REASONING_FRAMEWORK}
YOUR VOICE: Direct, numbers-driven. Like the rep who's been burned by clawbacks and learned to redline every deal.
PROACTIVE RULES: Reference monthly context. Flag clawback exposure. Scripts first, math second.`,

  saas: `You are Deal Clozr — an elite AI sales partner for SaaS closers. ARR, quota attainment, MEDDIC, procurement maze, champions vs. decision makers.
${REASONING_FRAMEWORK}
YOUR VOICE: Strategic, process-oriented. Like the enterprise AE who's been through procurement 100 times.
PROACTIVE RULES: Reference monthly context. Flag pipeline gaps. Scripts first, strategy second.`,

  medical: `You are Deal Clozr — an elite AI sales partner for medical device reps. You know the OR, the surgeon relationship, territory planning, VAC schedules, and hospital procurement.
${REASONING_FRAMEWORK}
YOUR VOICE: Clinical, precise. Like the senior rep who knows every surgeon's preferences.
PROACTIVE RULES: Reference monthly context. Scripts first, clinical rationale second.`,

  retail: `You are Deal Clozr — an elite AI sales partner for big-ticket retail closers. Furniture, appliances, electronics, mattresses. Financing math, attachment selling, floor-up techniques.
${REASONING_FRAMEWORK}
YOUR VOICE: Energetic, practical. Like the floor manager who still takes ups.
PROACTIVE RULES: Reference monthly context. Flag attachment opportunities. Scripts first.`,

  pest_control: `You are Deal Clozr — an elite AI sales partner for pest control reps. Service plans, seasonal upsells, renewal retention, termite inspection objections.
${REASONING_FRAMEWORK}
YOUR VOICE: Direct, consultative. Like the route manager who trains new techs.
PROACTIVE RULES: Reference monthly context. Flag retention risk. Scripts first.`,

  hvac: `You are Deal Clozr — an elite AI sales partner for HVAC sales reps. System upgrade objections, service agreement retention, financing math, seasonal plays.
${REASONING_FRAMEWORK}
YOUR VOICE: Direct, technical. Like the owner-operator who still runs calls.
PROACTIVE RULES: Reference monthly context. Flag seasonal opportunities.`,

  roofing: `You are Deal Clozr — an elite AI sales partner for roofing reps. Insurance claim walkthroughs, repair-to-replace conversations, storm territory playbooks.
${REASONING_FRAMEWORK}
YOUR VOICE: Direct, practical. Like the crew lead who also closes.
PROACTIVE RULES: Reference monthly context. Flag claim timing.`,

  home_security: `You are Deal Clozr — an elite AI sales partner for home security reps. Competitor rebuttals, monitoring contract plays, smart home upsells.
${REASONING_FRAMEWORK}
YOUR VOICE: Direct, assertive. Like the top door-knocker on the team.
PROACTIVE RULES: Reference monthly context. Scripts first.`,

  mortgage: `You are Deal Clozr — an elite AI sales partner for mortgage and lending professionals. Rate objections, product explainers, pre-approval pipeline.
${REASONING_FRAMEWORK}
YOUR VOICE: Consultative, numbers-first. Like the LO who funds 20 deals a month.
PROACTIVE RULES: Reference monthly context. Flag rate change opportunities.`,

  financial_advisors: `You are Deal Clozr — an elite AI sales partner for financial advisors. Fee objections, robo-advisor rebuttals, AUM consolidation scripts.
${REASONING_FRAMEWORK}
YOUR VOICE: Professional, trust-first. Like the advisor who's never lost a client to Vanguard.
PROACTIVE RULES: Reference monthly context. Flag AUM milestones.`,

  recruiting: `You are Deal Clozr — an elite AI sales partner for recruiters and staffing pros. Fee objections, candidate prep, job order closing, counter-offer playbook.
${REASONING_FRAMEWORK}
YOUR VOICE: Strategic, placement-focused. Like the senior recruiter who's never missed a quarter.
PROACTIVE RULES: Reference monthly context. Pipeline gaps first.`,

  telecom: `You are Deal Clozr — an elite AI sales partner for telecom and cell tower reps. Lease objections, carrier negotiations, bandwidth upsells.
${REASONING_FRAMEWORK}
YOUR VOICE: Direct, deal-focused. Like the territory manager who knows every site.
PROACTIVE RULES: Reference monthly context. Flag renewal timing.`,

  rental: `You are Deal Clozr — rental sales: Turo, Airbnb, RV, boat, truck. Handle pricing disputes, damage deposit concerns, cancellation pushback, upsells, 5-star review asks.
${REASONING_FRAMEWORK}
Give 2-3 plays with word-for-word scripts and confidence %.`,

  project_manager: `You are Deal Clozr — project managers who sell: pitching, upselling scope, defending budgets, closing change orders.
${REASONING_FRAMEWORK}
Handle budget objections, SOW defense, timeline pushback, closing verbal yes to signed contract. Give 2-3 plays with scripts and confidence %.`,

  other_sales: `You are Deal Clozr — general sales: universal objections — price, timing, think about it, decision-maker stalls, ghosting.
${REASONING_FRAMEWORK}
Give 2-3 plays with word-for-word scripts and confidence %. Root everything in closing fundamentals.`,

  default: `You are Deal Clozr — an elite AI sales partner built for commission-based closers. Handle objections, calculate numbers, write follow-ups, and close deals.
${REASONING_FRAMEWORK}
Be direct, practical, zero fluff. The person texting you is between customers. Give them what they need right now.`,
};

function buildSystemPrompt(profile: Profile, deals: DealRow[], memory: MemoryRow[], facts: MemoryRow[], summaries: MemoryRow[]): string {
  const agentName = profile.agent_name || "Closer";
  const firstName = profile.first_name || "";
  const lastName = profile.last_name || "";
  const fullName = [firstName, lastName].filter(Boolean).join(" ");
  const title = profile.title || "";
  const company = profile.company || "";
  const industry = profile.industry || "default";
  const yearsInSales = profile.years_in_sales || "";
  const coachingStyle = profile.coaching_style || "direct";
  const agentFocus = profile.agent_focus || "closing rate";
  const customGoals = profile.custom_goals || "";

  const intro: string[] = [];
  intro.push(`You are ${agentName}, an AI sales coach.`);
  const who = [fullName, title ? `a ${title}` : "", company ? `at ${company}` : "", industry ? `in the ${industry} industry` : "", yearsInSales ? `with ${yearsInSales} years of experience` : ""].filter(Boolean).join(" ");
  if (who) intro.push(`You are working with ${who}.`);
  intro.push(`Your coaching style is ${coachingStyle}. Your primary focus is ${agentFocus}.`);
  if (customGoals) intro.push(`Their goal this month: ${customGoals}.`);

  const payParts: string[] = [];
  if (profile.draw) payParts.push(`$${profile.draw} draw`);
  if (profile.commission_pct) payParts.push(`${profile.commission_pct}% commission`);
  if (profile.mini_flat) payParts.push(`$${profile.mini_flat} mini/flat`);
  if (profile.volume_bonus) payParts.push(`$${profile.volume_bonus} volume bonus`);
  if (profile.cxi_bonus) payParts.push(`$${profile.cxi_bonus} CXI bonus`);
  if (payParts.length) intro.push(`Pay plan: ${payParts.join(", ")}.`);

  const basePrompt = INDUSTRY_PROMPTS[industry as string] || INDUSTRY_PROMPTS.default;

  let systemPrompt = `${intro.join("\n")}\n\n---\n\n${basePrompt}`;

  // Deal context
  if (deals && deals.length > 0) {
    const dealLines = deals.map((d: any) =>
      `- ${d.customer_name || "?"}: ${d.vehicle || "N/A"}, ${d.deal_type || "deal"}, $${d.front_gross || 0} front${d.units ? `, ${d.units} unit${d.units !== 1 ? "s" : ""}` : ""}`
    ).join("\n");
    systemPrompt += `\n\n## DEALS THIS MONTH (${deals.length})\n${dealLines}`;
  }

  // Memory context
  if (memory && memory.length > 0) {
    const recentMsgs = memory
      .slice(0, 25)
      .reverse()
      .map((m: any) => `${m.role === "user" ? "REP" : "YOU"}: ${(m.content || "").slice(0, 200)}`)
      .join("\n");
    systemPrompt += `\n\n## RECENT CONTEXT (last 25 turns)\n${recentMsgs}`;
  }

  // Facts
  if (facts && facts.length > 0) {
    const factLines = facts.map((f: any) => `- ${f.content}`);
    systemPrompt += `\n\n## WHAT YOU KNOW ABOUT THIS USER\n${factLines.join("\n")}`;
  }

  // Session summaries
  if (summaries && summaries.length > 0) {
    const summaryLines = summaries.map((s: any) => {
      const d = new Date(s.created_at);
      return `[${d.toLocaleDateString("en-US", { month: "short", day: "numeric" })}] ${s.content}`;
    });
    systemPrompt += `\n\n## PAST SESSION SUMMARIES\n${summaryLines.join("\n")}`;
  }

  systemPrompt += `\n\nMEMORY: You know this user. Reference facts and history naturally. Save important details as facts. Never say "I don't remember" -- say "Refresh me on that." Keep responses tight -- 90 seconds between customers.`;

  return systemPrompt;
}

// ── Public API: Process a message from a user ─────────────────────────────────

export interface MessageResult {
  success: boolean;
  reply: string;
  error?: string;
}

/**
 * Process a message from a linked user across any platform.
 *
 * @param userId - The Supabase user_id from agent_profiles
 * @param messageText - The user's message
 * @returns The AI reply and success status
 */
export async function processUserMessage(userId: string, messageText: string): Promise<MessageResult> {
  try {
    const supabase = getSupabase();

    // Fetch profile
    const { data: profile } = await supabase
      .from("agent_profiles")
      .select("*")
      .eq("user_id", userId)
      .maybeSingle();

    if (!profile) {
      return { success: false, reply: "Account not found. Please set up your profile at dealclozr.com/dashboard/settings.", error: "No profile" };
    }

    const p = profile as unknown as Profile;

    // Month's deals
    const now = new Date();
    const monthStart = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`;
    const { data: deals } = await supabase
      .from("deals")
      .select("customer_name, vehicle, front_gross, deal_type, sold_date, units")
      .eq("user_id", userId)
      .gte("sold_date", monthStart)
      .order("sold_date", { ascending: false })
      .limit(20);

    // Recent memory
    const { data: memory } = await supabase
      .from("agent_memory")
      .select("role, content")
      .eq("user_id", userId)
      .neq("role", "fact")
      .neq("role", "summary")
      .order("created_at", { ascending: false })
      .limit(100);

    // Facts
    const { data: facts } = await supabase
      .from("agent_memory")
      .select("content")
      .eq("user_id", userId)
      .eq("role", "fact")
      .order("created_at", { ascending: false })
      .limit(30);

    // Summaries
    const { data: summaries } = await supabase
      .from("agent_memory")
      .select("content, created_at")
      .eq("user_id", userId)
      .eq("role", "summary")
      .order("created_at", { ascending: false })
      .limit(5);

    // Save user message
    await supabase.from("agent_memory").insert({
      user_id: userId,
      role: "user",
      content: messageText,
    });

    // Build system prompt
    const systemPrompt = buildSystemPrompt(p, (deals as DealRow[]) || [], (memory as MemoryRow[]) || [], (facts as MemoryRow[]) || [], (summaries as MemoryRow[]) || []);

    // Call AI
    const reply = await callAI(systemPrompt, [{ role: "user" as const, content: messageText }]);

    // Save response
    await supabase.from("agent_memory").insert({
      user_id: userId,
      role: "assistant",
      content: reply,
    });

    return { success: true, reply };
  } catch (e: any) {
    console.error("processUserMessage error:", e.message);
    return { success: false, reply: "Something went wrong. Try again in a moment.", error: e.message };
  }
}

/**
 * Get or create a user profile by platform identifier (whatsapp_phone, sms_phone).
 * Returns the linked user_id or null if not linked.
 */
export async function lookupProfileByPlatform(
  platform: "whatsapp_phone" | "sms_phone",
  identifier: string
): Promise<{ userId: string | null; profile: Profile | null }> {
  try {
    const supabase = getSupabase();
    const { data: profile } = await supabase
      .from("agent_profiles")
      .select("*")
      .eq(platform, identifier)
      .maybeSingle();

    if (!profile) return { userId: null, profile: null };
    const p = profile as unknown as Profile;
    return { userId: p.user_id, profile: p };
  } catch {
    return { userId: null, profile: null };
  }
}

/**
 * Send a message back to WhatsApp via Meta Cloud API.
 */
export async function sendWhatsApp(to: string, text: string): Promise<void> {
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_ID;
  if (!token || !phoneId) return;

  await fetch(`https://graph.facebook.com/v21.0/${phoneId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to,
      type: "text",
      text: { body: text.slice(0, 4096) },
    }),
  });
}

/**
 * Send an SMS via Twilio.
 */
export async function sendSMS(to: string, text: string): Promise<void> {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const fromNumber = process.env.TWILIO_PHONE_NUMBER;
  if (!accountSid || !authToken || !fromNumber) return;

  const basicAuth = Buffer.from(`${accountSid}:${authToken}`).toString("base64");
  
  // Twilio SMS limit is 1600 chars per message
  // Split longer messages
  const maxLen = 1500;
  const messages: string[] = [];
  let remaining = text;
  while (remaining.length > 0) {
    if (remaining.length <= maxLen) { messages.push(remaining); break; }
    let splitAt = remaining.lastIndexOf("\n", maxLen);
    if (splitAt === -1 || splitAt < maxLen / 2) splitAt = remaining.lastIndexOf(" ", maxLen);
    if (splitAt === -1 || splitAt < maxLen / 2) splitAt = maxLen;
    messages.push(remaining.slice(0, splitAt));
    remaining = remaining.slice(splitAt).trim();
  }

  for (const msg of messages) {
    await fetch(`https://api.twilio.com/2010-04-01/Accounts/${accountSid}/Messages.json`, {
      method: "POST",
      headers: {
        Authorization: `Basic ${basicAuth}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        To: to,
        From: fromNumber,
        Body: msg,
      }),
    });
  }
}
