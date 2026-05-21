import { NextRequest } from "next/server";

const SASSY_BRIDGE = "http://127.0.0.1:8913";

/**
 * Sassy — Thul's personal agent bridge.
 * Routes website chat to Sassy's Hermes instance (same brain as Telegram).
 */
export async function POST(req: NextRequest) {
  let body: { message?: string; session?: string };
  try {
    body = await req.json();
  } catch {
    return Response.json({ error: "Bad request" }, { status: 400 });
  }

  const { message, session } = body;
  if (!message?.trim()) {
    return Response.json({ error: "Message required" }, { status: 400 });
  }

  try {
    const res = await fetch(`${SASSY_BRIDGE}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: message.trim(), session: session || "" }),
      signal: AbortSignal.timeout(45000),
    });

    const data = await res.json();
    return Response.json(data);
  } catch (e) {
    console.error("Sassy bridge error:", e);
    return Response.json(
      { reply: "I'm here — hit me again. ⚡" },
      { status: 200 }
    );
  }
}
