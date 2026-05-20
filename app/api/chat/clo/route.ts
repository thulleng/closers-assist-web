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

/**
 * Dora — the marketing agent on closersassist.com
 * Streams DeepSeek response via SSE for typewriter effect.
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

  const apiKey = process.env.DEEPSEEK_API_KEY;
  if (!apiKey) {
    return new Response(
      `data: ${JSON.stringify({ error: "Dora's thinking — hit me again in a sec! ⚡", done: true })}\n\n`,
      { headers: { "Content-Type": "text/event-stream" } }
    );
  }

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
      try {
        const res = await fetch("https://api.deepseek.com/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model: "deepseek-v4-pro",
            messages: chatMessages,
            max_tokens: 400,
            temperature: 0.85,
            stream: true,
          }),
          signal: AbortSignal.timeout(15000),
        });

        if (!res.ok) {
          const errText = await res.text().catch(() => "");
          console.error(`DeepSeek API error ${res.status}: ${errText.slice(0, 200)}`);
          controller.enqueue(
            new TextEncoder().encode(`data: ${JSON.stringify({ error: "Dora's thinking — hit me again in a sec! ⚡", done: true })}\n\n`)
          );
          controller.close();
          return;
        }

        const reader = res.body?.getReader();
        if (!reader) {
          controller.enqueue(
            new TextEncoder().encode(`data: ${JSON.stringify({ error: "No response stream", done: true })}\n\n`)
          );
          controller.close();
          return;
        }

        const decoder = new TextDecoder();
        let buffer = "";
        let anyText = false;

        while (true) {
          const { done, value } = await reader.read();
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
            } catch {
              // skip unparseable chunks
            }
          }
        }

        // Final event with remaining count
        // Edge-case guard: if DeepSeek returned zero text (content filter block),
        // inject a graceful fallback so the UI doesn't hang on "thinking..."
        if (!anyText) {
          controller.enqueue(
            new TextEncoder().encode(`data: ${JSON.stringify({ text: "Hmm — that one tripped my filter. Try rewording, or ask me something else! 😏" })}\n\n`)
          );
        }
        controller.enqueue(
          new TextEncoder().encode(`data: ${JSON.stringify({ done: true, remaining })}\n\n`)
        );
        controller.close();
      } catch (err: any) {
        console.error("Dora stream error:", err.message);
        controller.enqueue(
          new TextEncoder().encode(`data: ${JSON.stringify({ error: "I hit a speed bump — try again! 🏎️", done: true })}\n\n`)
        );
        controller.close();
      }
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
