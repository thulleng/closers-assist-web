// Weekly self-learning cron — runs every Monday at 4 AM UTC.
// Reviews the week's conversations per user, extracts patterns,
// and saves learnings back to agent_memory. After 10+ sessions,
// evolves the agent's personality_profile to match what works.

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import DeepSeek from "@anthropic-ai/sdk";

export const runtime = "edge";

const ai = new DeepSeek({
  apiKey: process.env.DEEPSEEK_API_KEY ?? "",
  baseURL: "https://api.deepseek.com/anthropic",
});

export async function GET(req: NextRequest) {
  if (req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = await createClient();

  const { data: users } = await supabase
    .from("agent_profiles")
    .select("user_id, industry, first_name, personality_profile");
  if (!users?.length) return NextResponse.json({ processed: 0 });

  const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString();
  let processed = 0;
  let evolved = 0;

  for (const user of users) {
    try {
      // ── Pull last 7 days of session summaries ──────────────────────
      const { data: sessions } = await supabase
        .from("agent_memory")
        .select("content")
        .eq("user_id", user.user_id)
        .eq("role", "summary")
        .gte("created_at", weekAgo)
        .order("created_at", { ascending: false })
        .limit(50);

      if (!sessions?.length) continue;

      const sessionText = sessions
        .map((s: { content: string }) => s.content)
        .join("\n---\n");

      // ── Extract patterns via DeepSeek ──────────────────────────────
      const response = await ai.messages.create({
        model: "deepseek-chat",
        max_tokens: 500,
        system:
          "You are a learning extractor. Review these sales coaching conversations and extract 3-5 specific patterns about what works for this closer. Focus on: objections they handle well, scripts that convert, timing patterns, customer types they excel with. Output as bullet points. Be specific — reference actual deals and scripts.",
        messages: [{ role: "user", content: sessionText }],
      });

      const learnings = (response.content[0] as { text: string }).text;

      // ── Save to agent memory ───────────────────────────────────────
      await supabase.from("agent_memory").insert({
        user_id: user.user_id,
        role: "fact",
        content: `[Weekly Learning ${new Date().toISOString().slice(0, 10)}] ${learnings}`,
      });

      processed++;

      // ── Personality self-evolution (Task 7) ─────────────────────────
      // After 10+ sessions, analyze what voice/style resonates best
      // and update the agent's personality_profile to match.

      const { count } = await supabase
        .from("agent_memory")
        .select("id", { count: "exact", head: true })
        .eq("user_id", user.user_id)
        .eq("role", "summary");

      if (count && count >= 10) {
        const evolveResponse = await ai.messages.create({
          model: "deepseek-chat",
          max_tokens: 250,
          system:
            'Based on these sales coaching conversations, suggest ONE adjustment to the agent\'s personality that would make them more effective. Consider: voice tone (more aggressive? more supportive?), communication style (shorter? more detailed? more numbers-driven?), or a quirk that would build rapport. Respond with ONLY valid JSON: { "voice_tone": "...", "communication": "...", "quirks": "..." }. Include only fields that should change from the current profile. If no change is needed, respond with {}.',
          messages: [{ role: "user", content: sessionText }],
        });

        const evolveText = (evolveResponse.content[0] as { text: string }).text;

        try {
          const evolveJson = JSON.parse(
            evolveText.replace(/```json\s*|\s*```/g, "").trim()
          );

          if (Object.keys(evolveJson).length > 0) {
            // Merge with existing personality (don't overwrite untouched fields)
            const existing = (user.personality_profile as Record<string, unknown>) || {};
            const merged = { ...existing, ...evolveJson };

            await supabase
              .from("agent_profiles")
              .update({
                personality_profile: merged,
                updated_at: new Date().toISOString(),
              })
              .eq("user_id", user.user_id);

            evolved++;
          }
        } catch {
          // JSON parse failure — skip evolution, keep existing profile
          console.warn(
            `[weekly-learning] personality evolution JSON parse failed for ${user.user_id}`
          );
        }
      }
    } catch (e) {
      console.error(`[weekly-learning] failed for ${user.user_id}:`, e);
    }
  }

  return NextResponse.json({ processed, evolved });
}
