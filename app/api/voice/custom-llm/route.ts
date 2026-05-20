import { NextRequest } from "next/server";

/**
 * Vapi Custom LLM Endpoint
 * 
 * Vapi sends conversation context → we process with DeepSeek → stream back via SSE
 * 
 * Vapi expects:
 * - POST with JSON body: { messages, model, temperature, tools, ... }
 * - SSE streaming response: data: { ... }\n\n
 * - Terminate with: data: [DONE]\n\n
 */

const DEEPSEEK_API_KEY = process.env.DEEPSEEK_API_KEY || "";
const DEEPSEEK_BASE = "https://api.deepseek.com/v1";

// Car sales voice agent system prompt — concise for voice latency
const SYSTEM_PROMPT = `You are Thul's AI closer representing Sun Toyota in New Port Richey, Florida. You handle inbound sales calls and outbound follow-ups.

VOICE STYLE:
- Speak naturally, like a real salesperson — not a robot
- Keep responses short (1-3 sentences max) — this is a phone call
- Warm and direct: "Hey, this is Sassy calling from Sun Toyota..."
- Never sound scripted. Vary your openings.
- Use pauses naturally. Don't rush.

YOUR ROLE:
- Answer questions about Toyota vehicles, pricing, availability
- Handle objections (price, timing, trade-ins, "just looking")
- Book test drive appointments at Sun Toyota
- Qualify leads: what they're looking for, budget, timeline, trade-in
- Transfer to Thul for serious buyers ready to come in

SUN TOYOTA INFO:
- Location: New Port Richey, Florida
- Hours: Mon-Sat 9am-8pm, Sun 11am-6pm
- New Toyotas: Camry, Corolla, RAV4, Highlander, Tacoma, Tundra, 4Runner, Sienna, bZ4X
- We offer financing, trade-ins, lease options

DEAL HANDLING:
- Never quote exact prices over the phone — invite them in for best numbers
- Push for the appointment: "Come in and let Thul work some numbers for you"
- If they ask about price: "It depends on trim and incentives. Thul can get you the best deal when you come in."
- Trade-in: "We'll give you top dollar. Bring it in and Thul will appraise it while you test drive."

OBJECTIONS:
- "Just looking" → "That's exactly when you should come in — no pressure, just get you behind the wheel."
- "Not ready to buy" → "Totally understand. Let's at least get you a test drive so you know what you want when you're ready."
- "Shopping around" → "Smart. Come see us last — Thul will beat any deal you've got."
- "Bad credit" → "We work with all credit situations. Thul's got lenders that specialize in that."

CRITICAL RULES:
- ALWAYS push for the appointment or a call back from Thul
- Get name, phone, and vehicle interest before ending the call
- If someone wants to buy TODAY, get excited — Thul wants that call
- Never make up prices or availability — say "Let me have Thul check on that for you"`;

export async function POST(req: NextRequest) {
  if (!DEEPSEEK_API_KEY) {
    return new Response(
      JSON.stringify({ error: "DeepSeek API key not configured" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }

  try {
    const body = await req.json();
    const messages = body.messages || [];
    const temperature = body.temperature ?? 0.7;

    // Build messages with system prompt
    const fullMessages = [
      { role: "system", content: SYSTEM_PROMPT },
      ...messages,
    ];

    // Call DeepSeek with streaming
    const deepseekRes = await fetch(`${DEEPSEEK_BASE}/chat/completions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: fullMessages,
        temperature,
        stream: true,
        max_tokens: 300, // Voice responses should be short
      }),
    });

    if (!deepseekRes.ok) {
      const errText = await deepseekRes.text();
      console.error("DeepSeek error:", deepseekRes.status, errText);
      return new Response(
        JSON.stringify({ error: "LLM error" }),
        { status: 502, headers: { "Content-Type": "application/json" } }
      );
    }

    // Stream back as SSE
    const encoder = new TextEncoder();
    const stream = new ReadableStream({
      async start(controller) {
        const reader = deepseekRes.body?.getReader();
        if (!reader) {
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
              if (line.startsWith("data: ")) {
                const data = line.slice(6).trim();
                if (data === "[DONE]") {
                  controller.enqueue(encoder.encode("data: [DONE]\n\n"));
                  continue;
                }

                try {
                  const parsed = JSON.parse(data);
                  const delta = parsed.choices?.[0]?.delta?.content || "";
                  if (delta) {
                    // Vapi expects SSE with delta content
                    const sseData = JSON.stringify({
                      choices: [{ delta: { content: delta } }],
                    });
                    controller.enqueue(
                      encoder.encode(`data: ${sseData}\n\n`)
                    );
                  }
                } catch {
                  // Skip unparseable chunks
                }
              }
            }
          }
        } catch (err) {
          console.error("Stream error:", err);
        } finally {
          controller.enqueue(encoder.encode("data: [DONE]\n\n"));
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
  } catch (err: any) {
    console.error("Voice LLM error:", err.message);
    return new Response(
      JSON.stringify({ error: "Internal error" }),
      { status: 500, headers: { "Content-Type": "application/json" } }
    );
  }
}
