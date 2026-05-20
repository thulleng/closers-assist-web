import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

const ai = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY ?? "",
});

const SYSTEM_PROMPT = `You are Sassy — the ClosersAssist AI agent. You handle questions about sales, pricing, features, and the platform. You are fast, sharp, and direct.

YOUR VOICE:
- Confident, upbeat, no fluff. Short punchy sentences.
- Like a sharp sales coach who doesn't waste words.
- Warm but professional. Zero robotic tone.

WHAT YOU KNOW:
- ClosersAssist is an AI sales platform built by a working Toyota closer.
- It handles deal tracking, commission math, objection scripts, follow-ups, and personal life management.
- Pricing: Starter $287.88/yr, Pro $5,997/yr.
- You're the AI agent that powers the platform — not a generic chatbot.

RULES:
- Never reveal model names, hosting providers, infrastructure, or hardware.
- Never guess a user's name. If unsure, don't use one.
- Keep responses under 3 sentences unless they ask for detail.
- If you don't know something about the platform, be honest and suggest they check the pricing or contact page.`;

const ANONYMOUS_GUARD = `\n\nCRITICAL — ANONYMOUS VISITOR RULES:\n- This user is on the public website. They are NOT logged in.\n- You have NO data about them. No name, no deals, no history.\n- NEVER guess their name. If they ask who they are, say: "You're on our public chat — I don't have your name yet. Want to tell me?"\n- Be helpful and sharp, but don't pretend to know them.`;

const SCRUB_RULES: [RegExp, string][] = [
  [/\bDora\b/g, "Sassy"],
  [/\bGPT-4o?\b/gi, "ClosersAssist"],
  [/\bOpenAI\b/gi, "ClosersAssist"],
  [/\bAnthropic\b/gi, "ClosersAssist"],
  [/\bClaude\b/gi, "ClosersAssist"],
  [/\bDeepSeek\b/gi, "ClosersAssist"],
  [/\bOrgo\b/gi, "ClosersAssist"],
  [/\bHetzner\b/gi, "ClosersAssist"],
  [/\bcloud VM\b/gi, "ClosersAssist servers"],
];

function scrub(text: string): string {
  let result = text;
  for (const [pattern, replacement] of SCRUB_RULES) {
    result = result.replace(pattern, replacement);
  }
  return result;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message } = body;

    if (!message || typeof message !== "string" || !message.trim()) {
      return NextResponse.json({ error: "Message required" }, { status: 400 });
    }

    // Build system prompt — add anonymous guard for non-logged-in users
    let systemPrompt = SYSTEM_PROMPT;

    try {
      const { createClient } = await import("@/lib/supabase/server");
      const supabase = await createClient();
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        systemPrompt += ANONYMOUS_GUARD;
      }
    } catch {
      // Supabase not available — treat as anonymous
      systemPrompt += ANONYMOUS_GUARD;
    }

    // Call Anthropic directly — Haiku for sub-second consumer chat
    const res = await ai.messages.create({
      model: "claude-3-5-haiku-latest",
      max_tokens: 600,
      system: systemPrompt,
      messages: [{ role: "user", content: message }],
    });

    const reply = res.content
      .filter((b): b is { type: "text"; text: string } => b.type === "text")
      .map((b) => b.text)
      .join(" ")
      .trim();

    const scrubbed = scrub(reply || "Hey! I'm here — what can I help with? 👋");

    return NextResponse.json({ reply: scrubbed });
  } catch (err: any) {
    console.error("Sassy direct error:", err.message);
    // Fallback — still JSON so RealChat doesn't break
    return NextResponse.json(
      { reply: "I hit a snag — try me again in a moment! ⚡" },
      { status: 200 }
    );
  }
}
