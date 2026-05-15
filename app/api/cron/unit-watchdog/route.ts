// Unit watchdog cron — Friday at 10:00 AM ET (15:00 UTC).
// Checks if any user has fewer than 2 deals this week.
// If so, saves a PACE ALERT to agent_memory that the agent
// surfaces proactively on next chat open.

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  if (req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = await createClient();

  const { data: users } = await supabase
    .from("agent_profiles")
    .select("user_id, first_name");
  if (!users?.length) return NextResponse.json({ processed: 0 });

  const weekAgo = new Date(Date.now() - 7 * 86400000)
    .toISOString()
    .slice(0, 10);
  let alerted = 0;

  for (const user of users) {
    try {
      const { data: deals } = await supabase
        .from("deals")
        .select("id")
        .eq("user_id", user.user_id)
        .gte("sold_date", weekAgo);

      const dealCount = deals?.length ?? 0;

      if (dealCount < 2) {
        // Check we haven't already alerted this week
        const { data: existing } = await supabase
          .from("agent_memory")
          .select("id")
          .eq("user_id", user.user_id)
          .eq("role", "system")
          .like("content", "%[PACE ALERT]%")
          .gte("created_at", weekAgo)
          .limit(1);

        if (!existing?.length) {
          await supabase.from("agent_memory").insert({
            user_id: user.user_id,
            role: "system",
            content: `[PACE ALERT] ${user.first_name || "Closer"}, you're at ${dealCount} deal${dealCount === 1 ? "" : "s"} this week — below your 2-deal pace. The agent will check in and help you turn it around next time you chat.`,
          });
          alerted++;
        }
      }
    } catch (e) {
      console.error(`[unit-watchdog] failed for ${user.user_id}:`, e);
    }
  }

  return NextResponse.json({ alerted, checked: users.length });
}
