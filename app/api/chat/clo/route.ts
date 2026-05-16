import { NextRequest, NextResponse } from "next/server";

const CLO_BRIDGE = "http://178.105.161.224:8911/chat";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message } = body;

    if (!message || typeof message !== "string" || message.length > 600) {
      return NextResponse.json({ error: "Message required (max 600 chars)" }, { status: 400 });
    }

    const apiSecret = process.env.CLOSERS_API_SECRET || "";
    if (!apiSecret) {
      return NextResponse.json(
        { reply: "Clo's getting a tune-up. Try me again in a minute! 🔧" },
        { status: 200 }
      );
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 55000);

    const res = await fetch(CLO_BRIDGE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ secret: apiSecret, message }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) {
      return NextResponse.json(
        { reply: "Clo is gathering her thoughts... ask me again! 💭" },
        { status: 200 }
      );
    }

    const data = await res.json();
    return NextResponse.json({ reply: data.reply || "Hey! I'm here. 👋" });
  } catch (err: any) {
    console.error("Clo bridge error:", err.message);
    return NextResponse.json(
      { reply: "Connection hiccup — Clo will be right back! ⚡" },
      { status: 200 }
    );
  }
}
