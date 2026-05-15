// Morning brief cron — weekdays at 7:00 AM ET (12:00 UTC).
// Generates a personalized 2-3 sentence brief for each user:
// yesterday's deals, today's opportunities, bonus tracker status.
// Briefs are saved to agent_memory and surfaced on next chat open.

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

  // Only run weekdays (Mon-Fri in ET = 1-5 UTC days; cron handles scheduling)
  const supabase = await createClient();

  const { data: users } = await supabase
    .from("agent_profiles")
    .select("user_id, first_name");
  if (!users?.length) return NextResponse.json({ processed: 0 });

  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  let processed = 0;

  for (const user of users) {
    try {
      // ── Get yesterday's deals ─────────────────────────────────────
      const { data: deals } = await supabase
        .from("deals")
        .select("customer_name, deal_type, commission, units")
        .eq("user_id", user.user_id)
        .gte("sold_date", yesterday);

      // ── Get month-to-date stats ───────────────────────────────────
      const monthStart = new Date(
        new Date().getUTCFullYear(),
        new Date().getUTCMonth(),
        1
      )
        .toISOString()
        .slice(0, 10);

      const { data: mtdDeals } = await supabase
        .from("deals")
        .select("units, commission")
        .eq("user_id", user.user_id)
        .gte("sold_date", monthStart);

      const mtdUnits = (mtdDeals ?? []).reduce(
        (s, d: { units?: number }) => s + Number(d.units ?? 0),
        0
      );
      const mtdCommission = (mtdDeals ?? []).reduce(
        (s, d: { commission?: number }) => s + Number(d.commission ?? 0),
        0
      );

      // ── Build context for the AI ──────────────────────────────────
      const dealSummary = deals?.length
        ? deals
            .map(
              (d: { customer_name: string; commission: number }) =>
                `${d.customer_name} ($${d.commission.toLocaleString()})`
            )
            .join(", ")
        : "none";

      const context = [
        `Yesterday's deals: ${dealSummary}`,
        `Month to date: ${mtdUnits} units, $${mtdCommission.toLocaleString()} commission`,
        `Name: ${user.first_name || "closer"}`,
      ].join(". ");

      // ── Generate brief ────────────────────────────────────────────
      const response = await ai.messages.create({
        model: "deepseek-chat",
        max_tokens: 300,
        system: `You are an AI sales coach writing a morning brief. Be direct, motivating, and brief — 2-3 sentences max. Reference their name naturally. Context: ${context}`,
        messages: [{ role: "user", content: "Give me my morning brief." }],
      });

      const brief = (response.content[0] as { text: string }).text;

      // ── Save to memory ────────────────────────────────────────────
      await supabase.from("agent_memory").insert({
        user_id: user.user_id,
        role: "system",
        content: `[Morning Brief ${new Date().toISOString().slice(0, 10)}] ${brief}`,
      });

      processed++;
    } catch (e) {
      console.error(`[morning-brief] failed for ${user.user_id}:`, e);
    }
  }

  return NextResponse.json({ processed });
}
