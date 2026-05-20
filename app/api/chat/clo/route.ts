import { NextRequest, NextResponse } from "next/server";

export const maxDuration = 30; // Vercel: extend function timeout

const CLO_BRIDGE = "http://178.105.161.224:8911/chat";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, session } = body;

    if (!message || typeof message !== "string" || message.length > 600) {
      return NextResponse.json({ error: "Message required (max 600 chars)" }, { status: 400 });
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 25000);

    const res = await fetch(CLO_BRIDGE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, session }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) {
      return NextResponse.json(
        { reply: "Dora is gathering her thoughts — ask me again! 💭" },
        { status: 200 }
      );
    }

    const data = await res.json();
    return NextResponse.json({ reply: data.reply || "Hey! I'm here. 👋" });
  } catch (err: any) {
    console.error("Dora bridge error:", err.message);
    return NextResponse.json(
      { reply: "I hit a speed bump — try again! Dora's awake, just took a second too long. 🏎️" },
      { status: 200 }
    );
  }
}
