import { NextRequest, NextResponse } from "next/server";

const SASSY_BRIDGE = "http://178.105.161.224:8910/chat";

/**
 * Proxies all website chat through the same Sassy Hermes agent on Hetzner
 * that handles Telegram messages. Same memory, same personality, same session.
 *
 * Logged-in users get a persistent per-user session.
 * Anonymous visitors share a default session.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message } = body;

    if (!message?.trim()) {
      return NextResponse.json({ error: "Message required" }, { status: 400 });
    }

    // Extract user identity for session routing
    let session = "sassy-web-dashboard"; // anonymous default
    try {
      const { createClient } = await import("@/lib/supabase/server");
      const supabase = await createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        session = user.id; // bridge will hash this into a per-user session ID
      }
    } catch {
      // No user — use default anonymous session
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 55000);

    const res = await fetch(SASSY_BRIDGE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: message.trim(), session }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    if (!res.ok) {
      return NextResponse.json(
        { reply: "Sassy is thinking... ask me again in a moment. 💭" },
        { status: 200 }
      );
    }

    const data = await res.json();
    return NextResponse.json({ reply: data.reply || "I'm here! 👋" });
  } catch (err: any) {
    console.error("Sassy bridge error:", err.message);
    return NextResponse.json(
      { reply: "Sassy is tied up right now. Try again in a moment. ⏳" },
      { status: 200 }
    );
  }
}
