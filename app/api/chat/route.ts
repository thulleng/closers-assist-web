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
    const systemPrompt = `${dateLine}\n\n${personalizedPrompt}\n\n---\n\n${MEMORY_INSTRUCTIONS}`;

    const contextMessages = mergeMessages(memoryMessages, messages);

    // The last user message is what we'll persist after the response
    const lastUserMessage = [...messages].reverse().find((m: ChatMessage) => m.role === "user");

    // ── 3. Stream response ────────────────────────────────────────────────────

    const encoder = new TextEncoder();
    let assistantResponse = "";

    const stream = new ReadableStream({
      async start(controller) {
        const anthropicStream = await client.messages.stream({
          model: "claude-sonnet-4-6",
          max_tokens: 1024,
          system: systemPrompt,
          messages: contextMessages.map((m: ChatMessage) => ({
            role: m.role as "user" | "assistant",
            // Pass content as-is — Anthropic SDK accepts both string and content block arrays
            content: m.content as Parameters<typeof client.messages.stream>[0]["messages"][number]["content"],
          })),
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

        // ── 4. Save turn to agent_memory ──────────────────────────────────────
        if (user && lastUserMessage && assistantResponse) {
          await supabase.from("agent_memory").insert([
            {
              user_id:  user.id,
              role:     "user",
              // Persist only text — images are not stored in memory
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
