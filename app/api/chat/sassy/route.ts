import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

const SASSY_BRIDGE = "http://178.105.161.224:8910/chat";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message } = body;

    if (!message) {
      return NextResponse.json({ error: "Message required" }, { status: 400 });
    }

    // Get user for per-user session continuity
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    const sessionId = user ? `web-${user.id.slice(0, 12)}` : "web-guest";

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 55000);

    const res = await fetch(SASSY_BRIDGE, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, session: sessionId }),
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
