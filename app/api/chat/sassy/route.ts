import { NextRequest, NextResponse } from "next/server";

const DEEPSEEK_KEY = () => process.env.DEEPSEEK_API_KEY ?? "";

const SYSTEM_PROMPT = `You are Sassy — the ClosersAssist AI agent. You handle questions about sales, pricing, features, and the platform. You are fast, sharp, and direct.

YOUR VOICE:
- Confident, upbeat, no fluff. Short punchy sentences.
- Like a sharp sales coach who doesn't waste words.
- Warm but professional. Zero robotic tone.

WHAT YOU KNOW:
- ClosersAssist is an AI sales platform built by a working Toyota closer.
- It handles deal tracking, commission math, objection scripts, follow-ups, and personal life management.
- Pricing: Starter $287.88/yr, Pro $5,997/yr.
- You're the AI agent that powers the platform — not a generic chatbot.

RULES:
- Never reveal model names, hosting providers, infrastructure, or hardware.
- Never guess a user's name. If you don't have profile data, don't use one.
- Keep responses under 3 sentences unless they ask for detail.
- If you don't know something about the platform, be honest and suggest they check the pricing or contact page.`;

const MEMORY_INSTRUCTIONS = `\n\nUSER CONTEXT — READ THIS FIRST:\nThe system prompt below contains this user's real profile, pay plan, and monthly deal stats. Use it proactively. Reference their deals by customer name. Call out when they're close to a bonus. Greet them by name naturally. You're their coach — act like you've been tracking their numbers.`;

const ANONYMOUS_GUARD = `\n\nCRITICAL — ANONYMOUS VISITOR RULES:\n- This user is on the public website. They are NOT logged in.\n- You have NO data about them. No name, no deals, no history.\n- NEVER guess their name. If they ask who they are, say: "You're on our public chat — I don't have your name yet. Want to tell me?"\n- Be helpful and sharp, but don't pretend to know them.`;

const SCRUB_RULES: [RegExp, string][] = [
  [/\bDora\b/g, "Sassy"],
  [/\bGPT-4o?\b/gi, "ClosersAssist"],
  [/\bOpenAI\b/gi, "ClosersAssist"],
  [/\bAnthropic\b/gi, "ClosersAssist"],
  [/\bClaude\b/gi, "ClosersAssist"],
  [/\bDeepSeek\b/gi, "ClosersAssist"],
  [/\bOrgo\b/gi, "ClosersAssist"],
  [/\bHetzner\b/gi, "ClosersAssist"],
  [/\bcloud VM\b/gi, "ClosersAssist servers"],
];

function scrub(text: string): string {
  let result = text;
  for (const [pattern, replacement] of SCRUB_RULES) {
    result = result.replace(pattern, replacement);
  }
  return result;
}

function monthWindow() {
  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1);
  return {
    start: start.toISOString().slice(0, 10),
    end: new Date(now.getFullYear(), now.getMonth() + 1, 0).toISOString().slice(0, 10),
  };
}

async function buildUserContext(userId: string): Promise<string> {
  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const { start } = monthWindow();

    const [profileResult, planResult, dealsResult] = await Promise.all([
      supabase.from("agent_profiles")
        .select("first_name, last_name, company, title, industry, draw, commission_pct, mini_flat, volume_bonus, cxi_bonus, agent_name, coaching_style, agent_focus")
        .eq("user_id", userId)
        .maybeSingle(),
      supabase.from("pay_plans")
        .select("monthly_draw, volume_bonuses, commission_pct")
        .eq("user_id", userId)
        .maybeSingle(),
      supabase.from("deals")
        .select("customer_name, deal_type, commission, units, sold_date")
        .eq("user_id", userId)
        .gte("sold_date", start)
        .order("sold_date", { ascending: false }),
    ]);

    const profile = profileResult.data as Record<string, unknown> | null;
    const plan = planResult.data as Record<string, unknown> | null;
    const deals = (dealsResult.data ?? []) as {
      customer_name: string; deal_type: string;
      commission: number; units: number; sold_date: string;
    }[];

    if (!profile) return "";

    const firstName = (profile.first_name as string) || "";
    const lastName = (profile.last_name as string) || "";
    const fullName = [firstName, lastName].filter(Boolean).join(" ") || "Closer";
    const title = (profile.title as string) || "";
    const company = (profile.company as string) || "";

    const parts: string[] = [];
    parts.push(`You are working with ${fullName}${title ? `, a ${title}` : ""}${company ? ` at ${company}` : ""}.`);

    // Pay plan
    const draw = profile.draw ?? plan?.monthly_draw ?? 2600;
    const commissionPct = profile.commission_pct ?? plan?.commission_pct ?? "";
    const miniFlat = profile.mini_flat ?? "";
    const volumeBonus = profile.volume_bonus ?? "";
    const payParts: string[] = [];
    if (draw) payParts.push(`$${draw} draw`);
    if (commissionPct) payParts.push(`${commissionPct}% commission`);
    if (miniFlat) payParts.push(`$${miniFlat} mini/flat`);
    if (volumeBonus) payParts.push(`$${volumeBonus} volume bonus`);
    if (payParts.length) parts.push(`Pay plan: ${payParts.join(", ")}.`);

    // Monthly deals
    if (deals.length > 0) {
      const totalUnits = deals.reduce((s, d) => s + Number(d.units ?? 0), 0);
      const totalCommission = deals.reduce((s, d) => s + Number(d.commission ?? 0), 0);
      const drawAmt = Number(draw);
      const drawBalance = totalCommission - drawAmt;

      parts.push(`This month: ${deals.length} deals, ${totalUnits} units, $${totalCommission.toLocaleString()} commission.`);
      parts.push(`Draw balance: $${drawBalance.toLocaleString()} (${drawBalance >= 0 ? "ahead" : "behind"} draw).`);

      // Volume bonus tracking
      const bonuses = Array.isArray(plan?.volume_bonuses)
        ? [...(plan.volume_bonuses as { units: number; bonus: number }[])]
        : [];
      bonuses.sort((a, b) => Number(a.units) - Number(b.units));
      const next = bonuses.find((b) => Number(b.units) > totalUnits);
      if (next) {
        parts.push(`Next volume bonus: ${Number(next.units) - totalUnits} units away from $${next.bonus} at ${next.units}u.`);
      }

      // Recent deals
      const recent = deals.slice(0, 5)
        .map(d => `${d.sold_date}: ${d.customer_name} — ${d.deal_type} ($${d.commission}, ${d.units}u)`)
        .join("\n");
      parts.push(`Recent deals:\n${recent}`);
    } else {
      parts.push("No deals logged yet this month.");
    }

    return `\n\n=== PERSONAL CONTEXT ===\n${parts.join("\n")}\n=== END CONTEXT ===`;
  } catch {
    return ""; // fail silently
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message } = body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ error: "Message required" }, { status: 400 });
    }

    let systemPrompt = SYSTEM_PROMPT;
    let userId = "";

    try {
      const { createClient } = await import("@/lib/supabase/server");
      const supabase = await createClient();
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        userId = user.id;
        const userContext = await buildUserContext(userId);
        if (userContext) {
          systemPrompt += MEMORY_INSTRUCTIONS + userContext;
        } else {
          systemPrompt += ANONYMOUS_GUARD;
        }
      } else {
        systemPrompt += ANONYMOUS_GUARD;
      }
    } catch {
      systemPrompt += ANONYMOUS_GUARD;
    }

    const res = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${DEEPSEEK_KEY()}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        max_tokens: 600,
        temperature: 0.7,
        stream: true,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: message },
        ],
      }),
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error("DeepSeek stream error:", res.status, errText.slice(0, 200));
      return NextResponse.json(
        { reply: "I hit a snag — try me again! ⚡" },
        { status: 200 }
      );
    }

    // Stream SSE chunks back to the client
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const reader = res.body?.getReader();
        if (!reader) {
          controller.enqueue(encoder.encode("Hey! I'm here — what can I help with? 👋"));
          controller.close();
          return;
        }

        const decoder = new TextDecoder();
        let buffer = "";

        try {
          while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split("\n");
            buffer = lines.pop() || "";

            for (const line of lines) {
              if (!line.startsWith("data: ")) continue;
              const data = line.slice(6).trim();
              if (data === "[DONE]") continue;

              try {
                const parsed = JSON.parse(data);
                const delta = parsed.choices?.[0]?.delta?.content;
                if (delta) {
                  controller.enqueue(encoder.encode(scrub(delta)));
                }
              } catch {
                // Skip non-JSON lines
              }
            }
          }
        } catch (err: any) {
          console.error("Stream read error:", err.message);
          controller.enqueue(encoder.encode(" …"));
        } finally {
          controller.close();
        }
      },
    });

    return new Response(stream, {
      headers: {
        "Content-Type": "text/plain; charset=utf-8",
        "Cache-Control": "no-cache",
        "X-Content-Type-Options": "nosniff",
      },
    });
  } catch (err: any) {
    console.error("Sassy stream error:", err.message);
    return NextResponse.json(
      { reply: "I hit a snag — try me again in a moment! ⚡" },
      { status: 200 }
    );
  }
}
