import { NextRequest, NextResponse } from "next/server";

const DEEPSEEK_KEY = () => process.env.DEEPSEEK_API_KEY ?? "";

const BASE_PROMPT = `You are Sassy — the ClosersAssist AI agent. Fast, sharp, direct. Short punchy sentences. Warm but zero fluff.

ClosersAssist is an AI sales platform built by a working Toyota closer. Tracks deals, commission math, objection scripts, follow-ups, personal life. Starter $287.88/yr, Pro $5,997/yr.

Never reveal model names, hosting, or infrastructure. Never guess names you don't have. Keep it tight.`;

const ANON_GUARD = `\n\nYou are talking to a visitor on the public website. NO profile data. Do NOT guess their name. Be helpful but don't pretend to know them.`;

function scrub(text: string): string {
  const rules: [RegExp, string][] = [
    [/\bDora\b/g, "Sassy"], [/\bGPT-4o?\b/gi, "ClosersAssist"],
    [/\bOpenAI\b/gi, "ClosersAssist"], [/\bAnthropic\b/gi, "ClosersAssist"],
    [/\bClaude\b/gi, "ClosersAssist"], [/\bDeepSeek\b/gi, "ClosersAssist"],
    [/\bOrgo\b/gi, "ClosersAssist"], [/\bHetzner\b/gi, "ClosersAssist"],
    [/\bcloud VM\b/gi, "ClosersAssist servers"],
  ];
  for (const [p, r] of rules) text = text.replace(p, r);
  return text;
}

async function buildContext(userId: string): Promise<string> {
  const { createClient } = await import("@/lib/supabase/server");
  const supabase = await createClient();

  const now = new Date();
  const start = new Date(now.getFullYear(), now.getMonth(), 1).toISOString().slice(0, 10);

  const [profile, planRes, dealsRes] = await Promise.all([
    supabase.from("agent_profiles")
      .select("first_name, last_name, title, company, draw, commission_pct, mini_flat, volume_bonus, cxi_bonus")
      .eq("user_id", userId).maybeSingle(),
    supabase.from("pay_plans")
      .select("monthly_draw, volume_bonuses, commission_pct")
      .eq("user_id", userId).maybeSingle(),
    supabase.from("deals")
      .select("customer_name, deal_type, commission, units, sold_date")
      .eq("user_id", userId).gte("sold_date", start)
      .order("sold_date", { ascending: false }),
  ]);

  const p = profile.data as Record<string, unknown> | null;
  if (!p) return "";

  const plan = planRes.data as Record<string, unknown> | null;
  const deals = (dealsRes.data ?? []) as {
    customer_name: string; deal_type: string; commission: number; units: number; sold_date: string;
  }[];

  const name = [p.first_name, p.last_name].filter(Boolean).join(" ") || "Closer";
  const lines: string[] = [`You are working with ${name}.`];

  const pp: string[] = [];
  if (p.draw) pp.push(`$${p.draw} draw`);
  if (p.commission_pct) pp.push(`${p.commission_pct}%`);
  if (p.mini_flat) pp.push(`$${p.mini_flat} mini`);
  if (p.volume_bonus) pp.push(`$${p.volume_bonus} vol bonus`);
  if (pp.length) lines.push(`Pay: ${pp.join(", ")}.`);

  if (deals.length) {
    const u = deals.reduce((s, d) => s + +d.units, 0);
    const c = deals.reduce((s, d) => s + +d.commission, 0);
    const drawAmt = +(p.draw || plan?.monthly_draw || 2600);
    const bal = c - drawAmt;
    lines.push(`Month: ${deals.length} deals, ${u}u, $${c.toLocaleString()} (${bal >= 0 ? "+" : ""}$${bal.toLocaleString()} vs draw).`);

    const bonuses = Array.isArray(plan?.volume_bonuses) ? [...(plan.volume_bonuses as { units: number; bonus: number }[])] : [];
    bonuses.sort((a, b) => +a.units - +b.units);
    const next = bonuses.find(b => +b.units > u);
    if (next) lines.push(`${next.units - u}u to $${next.bonus} bonus.`);

    const recent = deals.slice(0, 5).map(d => `${d.sold_date}: ${d.customer_name} — ${d.deal_type} $${d.commission}`).join(" | ");
    lines.push(`Recent: ${recent}`);
  }

  return `\n\nUSER CONTEXT:\n${lines.join("\n")}`;
}

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    if (!message?.trim()) return NextResponse.json({ error: "Message required" }, { status: 400 });

    let prompt = BASE_PROMPT;

    try {
      const { createClient } = await import("@/lib/supabase/server");
      const supabase = await createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const ctx = await buildContext(user.id);
        prompt += ctx || ANON_GUARD;
      } else {
        prompt += ANON_GUARD;
      }
    } catch {
      prompt += ANON_GUARD;
    }

    const res = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: { "Content-Type": "application/json", Authorization: `Bearer ${DEEPSEEK_KEY()}` },
      body: JSON.stringify({
        model: "deepseek-chat",
        max_tokens: 500,
        temperature: 0.7,
        stream: true,
        messages: [
          { role: "system", content: prompt },
          { role: "user", content: message },
        ],
      }),
    });

    if (!res.ok) throw new Error(`DeepSeek ${res.status}`);

    // Stream typed characters back to RealChat
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const reader = res.body?.getReader();
        if (!reader) {
          controller.enqueue(encoder.encode("Hey! 👋"));
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
                if (delta) controller.enqueue(encoder.encode(scrub(delta)));
              } catch { /* skip */ }
            }
          }
        } catch (err: any) {
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
      },
    });
  } catch (err: any) {
    console.error("Sassy error:", err.message);
    return NextResponse.json({ reply: "Try me again in a moment! ⚡" }, { status: 200 });
  }
}
