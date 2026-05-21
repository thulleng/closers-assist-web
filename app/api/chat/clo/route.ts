import { NextRequest } from "next/server";

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

// ─── 4-tier model chain ─────────────────────────────────────────────────────
async function tryTierStream(chatMessages: Array<{ role: string; content: string }>, tierIdx: number):
  Promise<{ stream: ReadableStream | null; reply: string | null }> {

  const tiers = [
    { url: "https://api.deepseek.com/v1/chat/completions",    model: "deepseek-chat",   key: process.env.DEEPSEEK_API_KEY,  timeout: 20000 },
    { url: "https://api.deepseek.com/v1/chat/completions",    model: "deepseek-v4-pro",  key: process.env.DEEPSEEK_API_KEY,  timeout: 40000 },
    { url: "https://api.anthropic.com/v1/messages",           model: "claude-opus-4-7",  key: process.env.ANTHROPIC_API_KEY, timeout: 50000 },
    { url: "https://api.openai.com/v1/chat/completions",      model: "gpt-5.5",          key: process.env.OPENAI_API_KEY,    timeout: 60000 },
  ];

  const tier = tiers[tierIdx];
  if (!tier || !tier.key) return { stream: null, reply: null };

  const { url, model, key, timeout } = tier;

  // Anthropic — non-streaming fallback only (different SSE format)
  if (url.includes("anthropic")) {
    try {
      const res = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": key,
          "anthropic-version": "2023-06-01",
        },
        body: JSON.stringify({
          model,
          max_tokens: 400,
          system: chatMessages[0]?.content || DORA_SYSTEM,
          messages: chatMessages.slice(1),
        }),
        signal: AbortSignal.timeout(timeout),
      });
      if (!res.ok) return { stream: null, reply: null };
      const data = await res.json();
      return { stream: null, reply: data.content?.[0]?.text || null };
    } catch { return { stream: null, reply: null }; }
  }

  // DeepSeek / OpenAI streaming
  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${key}`,
      },
      body: JSON.stringify({
        model,
        messages: chatMessages,
        max_tokens: 300,
        temperature: 0.85,
        stream: true,
      }),
      signal: AbortSignal.timeout(timeout),
    });
    if (!res.ok) return { stream: null, reply: null };

    const reader = res.body?.getReader();
    if (!reader) return { stream: null, reply: null };

    // Build a new ReadableStream that pipes the SSE events
    const newStream = new ReadableStream({
      async start(controller) {
        const decoder = new TextDecoder();
        let buffer = "";
        let anyText = false;

        while (true) {
          const { done, value } = await reader!.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            const trimmed = line.trim();
            if (!trimmed || !trimmed.startsWith("data: ")) continue;
            const data = trimmed.slice(6);
            if (data === "[DONE]") continue;

            try {
              const parsed = JSON.parse(data);
              const delta = parsed.choices?.[0]?.delta?.content;
              if (delta) {
                anyText = true;
                controller.enqueue(
                  new TextEncoder().encode(`data: ${JSON.stringify({ text: delta })}\n\n`)
                );
              }
            } catch { /* skip unparseable chunks */ }
          }
        }

        if (!anyText) {
          controller.enqueue(
            new TextEncoder().encode(`data: ${JSON.stringify({ text: "Hmm — that one tripped my filter. Try rewording, or ask me something else! 😏" })}\n\n`)
          );
        }
        controller.close();
      },
    });

    return { stream: newStream, reply: null };
  } catch { return { stream: null, reply: null }; }
}

async function streamOrFallback(chatMessages: Array<{ role: string; content: string }>, controller: ReadableStreamDefaultController, remaining: number): Promise<void> {
  for (let i = 0; i < 4; i++) {
    const result = await tryTierStream(chatMessages, i);

    if (result.stream) {
      // Stream succeeded — pipe the rest
      const reader = result.stream.getReader();
      const decoder = new TextDecoder();
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        controller.enqueue(value);
      }
      controller.enqueue(
        new TextEncoder().encode(`data: ${JSON.stringify({ done: true, remaining })}\n\n`)
      );
      controller.close();
      return;
    }

    if (result.reply) {
      // Non-streaming reply from Anthropic — send as one chunk
      controller.enqueue(
        new TextEncoder().encode(`data: ${JSON.stringify({ text: result.reply })}\n\n`)
      );
      controller.enqueue(
        new TextEncoder().encode(`data: ${JSON.stringify({ done: true, remaining })}\n\n`)
      );
      controller.close();
      return;
    }
  }

  // All 4 tiers failed
  controller.enqueue(
    new TextEncoder().encode(`data: ${JSON.stringify({ error: "I hit a speed bump — try again! 🏎️", done: true })}\n\n`)
  );
  controller.close();
}

/**
 * Dora — the marketing agent on closersassist.com
 * Streams via 4-tier model chain for typewriter effect.
 */
export async function POST(req: NextRequest) {
  const ip = req.headers.get("x-forwarded-for") || req.headers.get("x-real-ip") || "unknown";
  const now = Date.now();
  const entry = rateLimit.get(ip);

  if (entry && now < entry.reset && entry.count >= MAX_QUESTIONS) {
    return new Response(
      `data: ${JSON.stringify({ reply: "Alright, you've burned through your free questions — I like the enthusiasm! 🔥 Hit the pricing page and let's get you deployed for real. 14-day free trial, no credit card drama.", remaining: 0, done: true })}\n\n`,
      { headers: { "Content-Type": "text/event-stream", "Cache-Control": "no-cache", Connection: "keep-alive" } }
    );
  }

  if (!entry || now >= entry.reset) {
    rateLimit.set(ip, { count: 1, reset: now + WINDOW_MS });
  } else {
    entry.count++;
  }
  const remaining = MAX_QUESTIONS - (entry?.count || 1);

  let body: { message?: string; messages?: Array<{ role: string; text?: string; content?: string }> };
  try {
    body = await req.json();
  } catch {
    return new Response(
      `data: ${JSON.stringify({ error: "Bad request", done: true })}\n\n`,
      { status: 400, headers: { "Content-Type": "text/event-stream" } }
    );
  }

  const { message, messages: history } = body;
  if (!message?.trim()) {
    return new Response(
      `data: ${JSON.stringify({ error: "Message required", done: true })}\n\n`,
      { status: 400, headers: { "Content-Type": "text/event-stream" } }
    );
  }

  // Build conversation
  const chatMessages: Array<{ role: string; content: string }> = [
    { role: "system", content: DORA_SYSTEM },
  ];

  if (Array.isArray(history)) {
    for (const msg of history.slice(-10)) {
      if (msg.role === "user" || msg.role === "assistant" || msg.role === "clo") {
        const role = msg.role === "clo" ? "assistant" : msg.role;
        chatMessages.push({ role, content: msg.text || msg.content || "" });
      }
    }
  }

  chatMessages.push({ role: "user", content: message.trim() });

  const stream = new ReadableStream({
    async start(controller) {
      await streamOrFallback(chatMessages, controller, remaining);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
