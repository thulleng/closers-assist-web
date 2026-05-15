import { NextRequest, NextResponse } from "next/server";
import DeepSeek from "@anthropic-ai/sdk";

// Rate limit: simple in-memory counter (resets on deployment)
const rateLimit = new Map<string, { count: number; reset: number }>();
const MAX_REQUESTS = 3; // per IP per hour
const WINDOW_MS = 60 * 60 * 1000;

export async function POST(req: NextRequest) {
  // Rate limit
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (entry && now < entry.reset && entry.count >= MAX_REQUESTS) {
    return NextResponse.json(
      { error: "Demo limit reached. Sign up for unlimited access." },
      { status: 429 }
    );
  }

  if (!entry || now >= entry.reset) {
    rateLimit.set(ip, { count: 1, reset: now + WINDOW_MS });
  } else {
    entry.count++;
  }

  try {
    const { message } = await req.json();

    if (!message || typeof message !== "string" || message.length > 500) {
      return NextResponse.json({ error: "Message required (max 500 chars)" }, { status: 400 });
    }

    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Service unavailable" }, { status: 500 });
    }

    const ai = new DeepSeek({
      apiKey,
      baseURL: "https://api.deepseek.com/anthropic",
    });

    const system = `You are Closers Assist — an AI sales assistant that helps commission-based salespeople close more deals. You handle objections, write follow-ups, calculate commission, and give strategy plays.

You're talking to someone trying the demo. Give them a real, helpful answer — not a sales pitch. Show them what you can do. Keep it under 3 paragraphs. Be direct and practical.

If they ask about pricing or signing up, tell them it's $29.99/month with a 14-day free trial at closersassist.com.`;

    const msg = await ai.messages.create({
      model: "deepseek-chat",
      max_tokens: 500,
      system,
      messages: [{ role: "user", content: message }],
    });

    const text =
      msg.content[0]?.type === "text" ? msg.content[0].text : "Sorry, I couldn't process that.";

    return NextResponse.json({ reply: text, remaining: MAX_REQUESTS - (entry?.count || 1) });
  } catch (err) {
    console.error("Demo chat error:", err);
    return NextResponse.json({ error: "Something went wrong. Try again." }, { status: 500 });
  }
}
