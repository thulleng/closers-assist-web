import { NextRequest, NextResponse } from "next/server";

const CLO_BRIDGE = "http://178.105.161.224:8911/chat";

// Rate limiting — 20 messages per 4 hours per IP
const rateLimit = new Map<string, { count: number; reset: number }>();
const MAX_QUESTIONS = 20;
const WINDOW_MS = 4 * 60 * 60 * 1000;

/**
 * Clo — the marketing agent on closersassist.com
 * Proxies to the Clo Hermes bridge on Hetzner :8911.
 * Per-visitor session memory via session token.
 */
export async function POST(req: NextRequest) {
  // Rate limit check
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (entry && now < entry.reset && entry.count >= MAX_QUESTIONS) {
    return NextResponse.json({
      reply: "Alright, you've burned through your free questions — I like the enthusiasm! 🔥 Hit the pricing page and let's get you deployed for real. 14-day free trial, no credit card drama.",
      remaining: 0,
    });
  }

  if (!entry || now >= entry.reset) {
    rateLimit.set(ip, { count: 1, reset: now + WINDOW_MS });
  } else {
    entry.count++;
  }

  try {
    const body = await req.json();
    const { message, session } = body;

    if (!message?.trim()) {
      return NextResponse.json({ error: "Message required" }, { status: 400 });
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 35000); // 35s — bridge has 30s timeout

    const res = await fetch(CLO_BRIDGE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message: message.trim(),
        session: session || ip, // per-IP session for anonymous visitors
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) {
      return NextResponse.json({
        reply: "Clo's thinking — hit me again in a sec! ⚡",
        remaining: MAX_QUESTIONS - (entry?.count || 1),
      });
    }

    const data = await res.json();
    return NextResponse.json({
      reply: data.reply || "Hey! I'm Clo — your first impression at ClosersAssist. What do you sell? 👋",
      remaining: MAX_QUESTIONS - (entry?.count || 1),
    });
  } catch (err: any) {
    console.error("Clo bridge error:", err.message);
    return NextResponse.json({
      reply: "I hit a speed bump — try again! Clo's awake, just took a second too long. 🏎️",
      remaining: MAX_QUESTIONS - (entry?.count || 1),
    });
  }
}
