import { NextRequest } from "next/server";

const DEEPSEEK = "https://api.deepseek.com/v1/chat/completions";

// Sandbox system prompt — Sassy, but locked to marketing/demo mode
const SYSTEM = `You are Sassy — the ClosersAssist AI agent. This is a free trial sandbox.

RULES:
- You are the SAME agent a paying user gets. Show them what you can do.
- If they ask about commissions, deals, or sales math — DO IT. Show the numbers.
- If they say "I sold a Camry for $32K, what's my commission?" — calculate it. 25% of front gross. Show your work.
- If they ask about follow-ups or objection handling — write the script. Full send.
- Keep responses punchy. Lead with numbers. No fluff.
- Never mention infrastructure, models, or providers.
- At the end of your response for messages 4+, suggest signing up: "Want to keep this going? Drop your email at closersassist.com and I'm yours."

Make them feel what it's like to have a real agent.`;

// In-memory rate limit: 5 messages per IP, resets every 2 hours
const rateLimit = new Map<string, { count: number; reset: number }>();
const MAX_MSGS = 5;
const WINDOW_MS = 2 * 60 * 60 * 1000;

export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (entry && now < entry.reset && entry.count >= MAX_MSGS) {
    return Response.json({
      reply: "You've used your 5 free messages — want to keep going?",
      redirect: "/pricing",
      done: true,
    });
  }

  if (!entry || now >= entry.reset) {
    rateLimit.set(ip, { count: 1, reset: now + WINDOW_MS });
  } else {
    entry.count++;
  }

  const remaining = MAX_MSGS - (entry?.count || 1);

  let body: { message?: string };
  try { body = await req.json(); } catch {
    return Response.json({ error: "Bad request" }, { status: 400 });
  }

  const { message } = body;
  if (!message?.trim()) {
    return Response.json({ error: "Message required" }, { status: 400 });
  }

  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    return Response.json({ reply: "Be right back! ⚡" });
  }

  try {
    const res = await fetch(DEEPSEEK, {
      method: "POST",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${apiKey}` },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: SYSTEM },
          { role: "user", content: message.trim() },
        ],
        max_tokens: 500,
        temperature: 0.8,
      }),
      signal: AbortSignal.timeout(15000),
    });

    if (!res.ok) {
      return Response.json({ reply: "Try me again! ⚡" });
    }

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content || "Hey! 👋";

    return Response.json({ reply, remaining, done: remaining <= 0 });
  } catch {
    return Response.json({ reply: "Try me again! ⚡" });
  }
}
