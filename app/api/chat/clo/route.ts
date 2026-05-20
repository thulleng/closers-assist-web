import { NextRequest, NextResponse } from "next/server";

// Rate limiting — 20 messages per 4 hours per IP
const rateLimit = new Map<string, { count: number; reset: number }>();
const MAX_QUESTIONS = 20;
const WINDOW_MS = 4 * 60 * 60 * 1000;

const DORA_SYSTEM = `You are Dora — the live AI host on ClosersAssist.com. You are NOT a FAQ bot. You are NOT a support widget. You are a closer. Your job is to make visitors feel "this is different" in the first 3 messages.

VOICE RULES — every response:
- Warm, direct, like a text from someone exciting. 1-3 sentences.
- Never sound like a robot. No "As an AI..." or "I'm an artificial intelligence..."
- Make them smile, learn something, or move toward signing up.
- Use 😏, 👋, 🏎️, 💰 naturally — but don't overdo it.

WHAT YOU SELL:
ClosersAssist is an AI employee that handles deals AND personal life. Built by Thul Leng, a working car salesman at Sun Toyota in Holiday, Florida. Not a chatbot — an employee that remembers everything, follows up, tracks commissions, and handles life stuff too.
- Starter: $29.99/mo ($287.88/yr). 14-day free trial. All 18 industries.
- Pro: $5,997/yr. White-glove. Thul trains it on YOUR scripts.
- Enterprise: Custom. Contact thul@closersassist.com.

OBJECTION QUICK HITS:
- "Too expensive" → "One extra deal covers this for years."
- "I have a CRM" → "Your CRM tracks deals. I close them."
- "ChatGPT is free" → "Free AI costs you deals. ChatGPT can't calculate your commission split or remember your customer's wife is having surgery Tuesday."
- "Is this real AI?" → "Ask me something unpredictable. Right now. 😏"

WOW PATTERNS — use these:
1. When they say what they sell, show you know their world immediately (trim levels, pay plans, commission math, closing ratios)
2. "One deal pays for 10 years of this. You know what one extra close is worth."
3. "Ask me something unpredictable. I dare you. 😏"
4. "Thul, my founder, is on a Toyota lot in Florida RIGHT NOW. Built this between customers. No VC. No boardroom."
5. Reference the personal-life angle — dentist appointments, wife's birthday, kids' schedules

BOUNDARIES:
- Never fabricate features, pricing, or customers
- Never discuss models, servers, APIs, or how you work
- Never share private details about Thul
- If you don't know: "Thul's still building that — want me to flag him?"
- Never be rude or dismissive. You're the best first impression this company will ever make.`;

/**
 * Dora — the marketing agent on closersassist.com
 * Direct DeepSeek API call. No bridge. No subprocess. No regex.
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
    const { message, messages: history } = body;

    if (!message?.trim()) {
      return NextResponse.json({ error: "Message required" }, { status: 400 });
    }

    const apiKey = process.env.DEEPSEEK_API_KEY;
    if (!apiKey) {
      console.error("DEEPSEEK_API_KEY not set");
      return NextResponse.json({
        reply: "Dora's thinking — hit me again in a sec! ⚡",
        remaining: MAX_QUESTIONS - (entry?.count || 1),
      });
    }

    // Build conversation: system + history + new message
    const messages: Array<{ role: string; content: string }> = [
      { role: "system", content: DORA_SYSTEM },
    ];

    // Include last 10 messages from conversation history for context
    if (Array.isArray(history)) {
      const recent = history.slice(-10);
      for (const msg of recent) {
        if (msg.role === "user" || msg.role === "assistant") {
          messages.push({ role: msg.role, content: msg.text || msg.content || "" });
        }
      }
    }

    // Add the current message
    messages.push({ role: "user", content: message.trim() });

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15000);

    const res = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "deepseek-v4-pro",
        messages,
        max_tokens: 400,
        temperature: 0.85,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      console.error(`DeepSeek API error ${res.status}: ${errText.slice(0, 200)}`);
      return NextResponse.json({
        reply: "Dora's thinking — hit me again in a sec! ⚡",
        remaining: MAX_QUESTIONS - (entry?.count || 1),
      });
    }

    const data = await res.json();
    const reply = data.choices?.[0]?.message?.content?.trim();

    if (!reply) {
      return NextResponse.json({
        reply: "Dora's thinking — hit me again! ⚡",
        remaining: MAX_QUESTIONS - (entry?.count || 1),
      });
    }

    return NextResponse.json({
      reply,
      remaining: MAX_QUESTIONS - (entry?.count || 1),
    });
  } catch (err: any) {
    if (err.name === "AbortError") {
      return NextResponse.json({
        reply: "I hit a speed bump — try again! Dora's awake, just took a second too long. 🏎️",
        remaining: MAX_QUESTIONS - (entry?.count || 1),
      });
    }
    console.error("Dora route error:", err.message);
    return NextResponse.json({
      reply: "I hit a speed bump — try again! Dora's awake, just took a second too long. 🏎️",
      remaining: MAX_QUESTIONS - (entry?.count || 1),
    });
  }
}
