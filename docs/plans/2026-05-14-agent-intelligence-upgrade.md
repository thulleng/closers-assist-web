# Agent Intelligence Upgrade — Implementation Plan

> **For Hermes:** Use subagent-driven-development skill to implement this plan task-by-task.

**Goal:** Upgrade Deal Clozr agents with persistent cross-session memory, personality consistency, self-learning, self-healing, and proactive behavior — matching the sophistication of a personal AI operator.

**Architecture:** Layer these capabilities on top of the existing chat route (`app/api/chat/route.ts`), Supabase `agent_memory` table, and deal-tracking infrastructure. Each upgrade is independently deployable and builds on the last.

**Tech Stack:** Next.js 15, DeepSeek V4 (via `@anthropic-ai/sdk` transport), Supabase, Vercel (cron jobs)

---

### Task 1: Agent Personality Profile — Database Schema

**Objective:** Add a `personality_profile` JSONB column to `agent_profiles` so each agent remembers its voice, style, and persona across sessions.

**Files:**
- Create: `supabase/migrations/agent_personality.sql`
- Modify: `app/api/chat/route.ts:145-192` (buildPersonalizedPrompt)

**Step 1: Write migration**

```sql
-- supabase/migrations/agent_personality.sql
ALTER TABLE agent_profiles 
ADD COLUMN IF NOT EXISTS personality_profile JSONB DEFAULT '{}';

COMMENT ON COLUMN agent_profiles.personality_profile IS 'Persistent agent personality — voice, tone, quirks, learned preferences';
```

**Step 2: Run migration**

```bash
# In Supabase SQL Editor or via CLI
psql "$SUPABASE_URL" -f supabase/migrations/agent_personality.sql
```

**Step 3: Update buildPersonalizedPrompt to read personality**

In `app/api/chat/route.ts`, after line 159, add:

```typescript
const personalityProfile = (profile.personality_profile as Record<string, unknown>) || {};
const voiceTone     = (personalityProfile.voice_tone     as string) || coachingStyle;
const communication = (personalityProfile.communication as string) || "direct";
const quirks        = (personalityProfile.quirks        as string) || "";
const shorthand     = (personalityProfile.shorthand     as string) || "";
```

In the intro array (after goal line ~181), add:

```typescript
// Personality (persistent across sessions)
intro.push(`Voice: ${voiceTone}. Communication: ${communication}.`);
if (quirks) intro.push(`Quirks: ${quirks}.`);
if (shorthand) intro.push(`Shorthand they use: ${shorthand}.`);
```

**Step 4: Verify**

```bash
curl -X POST https://dealclozr.com/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"whats your personality"}],"userId":"test"}'
```

Expected: Agent responds referencing its configured personality traits from `agent_profiles`.

**Step 5: Commit**
```bash
git add supabase/migrations/ supabase/migrations/agent_personality.sql app/api/chat/route.ts
git commit -m "feat: add personality_profile schema and agent voice persistence"
```

---

### Task 2: Persistent Conversation Memory — Cross-Session Recall

**Objective:** Save key facts and conversation summaries after each chat session so the agent remembers what was discussed last week.

**Files:**
- Modify: `app/api/chat/route.ts` (session-end save around line ~800+ area)
- Modify: `app/api/chat/route.ts:467-560` (buildMemoryProfile — strengthen)

**Step 1: Save session summary on chat end**

After the final assistant response is streamed (find the return statement), add a post-processing step that saves to `agent_memory`:

```typescript
// Save conversation summary after every exchange
const lastUserMsg = textOf(messages[messages.length - 1].content).slice(0, 500);
const lastAsstMsg = finalText.slice(0, 500);

await supabase.from("agent_memory").insert({
  user_id: userId,
  role: "session",
  content: `[${new Date().toISOString().slice(0, 10)}] User: ${lastUserMsg}\nAgent: ${lastAsstMsg}`,
}).single();
```

**Step 2: Strengthen memory injection**

In `buildMemoryProfile`, ensure the session summaries are injected as context. After the facts query (line ~490), add a section that pulls the last 5 session summaries:

```typescript
const { data: recentSessions } = await supabase
  .from("agent_memory")
  .select("content, created_at")
  .eq("user_id", userId)
  .eq("role", "session")
  .order("created_at", { ascending: false })
  .limit(5);

if (recentSessions?.length) {
  const sessionLines = recentSessions.map((s: { content: string }) => s.content).join("\n---\n");
  parts.push(`Recent conversation history:\n${sessionLines}`);
}
```

**Step 3: Verify**

```bash
# Chat twice, then check if agent references first conversation
curl -X POST https://dealclozr.com/api/chat \
  -d '{"messages":[{"role":"user","content":"what did we talk about last time?"}],"userId":"test-user"}'
```

**Step 4: Commit**
```bash
git add app/api/chat/route.ts
git commit -m "feat: persistent conversation memory with session summaries"
```

---

### Task 3: Weekly Self-Learning Cron Job

**Objective:** Every Sunday night, review the week's conversations per user, extract patterns, and inject learnings back into the agent's memory.

**Files:**
- Create: `app/api/cron/weekly-learning/route.ts`
- Modify: `vercel.json` (cron trigger)

**Step 1: Create the cron route**

```typescript
// app/api/cron/weekly-learning/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import DeepSeek from "@anthropic-ai/sdk";

export const runtime = "edge";

const ai = new DeepSeek({
  apiKey: process.env.DEEPSEEK_API_KEY ?? "",
  baseURL: "https://api.deepseek.com/anthropic",
});

export async function GET(req: NextRequest) {
  // Auth: Vercel cron secret
  if (req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = await createClient();
  
  // Get all active users
  const { data: users } = await supabase.from("agent_profiles").select("user_id, industry");
  if (!users?.length) return NextResponse.json({ processed: 0 });

  let processed = 0;
  for (const user of users) {
    try {
      // Pull last 7 days of session summaries
      const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString();
      const { data: sessions } = await supabase
        .from("agent_memory")
        .select("content")
        .eq("user_id", user.user_id)
        .eq("role", "session")
        .gte("created_at", weekAgo)
        .order("created_at", { ascending: false })
        .limit(50);

      if (!sessions?.length) continue;

      const sessionText = sessions.map((s: { content: string }) => s.content).join("\n---\n");

      // Ask DeepSeek to extract learnings
      const response = await ai.messages.create({
        model: "deepseek-chat",
        max_tokens: 500,
        system: "You are a learning extractor. Review these sales conversations and extract 3-5 specific patterns about what works for this closer. Focus on: objections they handle well, scripts that convert, timing patterns, customer types they excel with. Output as bullet points. Be specific — reference actual deals and scripts.",
        messages: [{ role: "user", content: sessionText }],
      });

      const learnings = (response.content[0] as { text: string }).text;

      // Save back to agent memory
      await supabase.from("agent_memory").insert({
        user_id: user.user_id,
        role: "fact",
        content: `[Weekly Learning ${new Date().toISOString().slice(0, 10)}] ${learnings}`,
      });

      processed++;
    } catch (e) {
      console.error(`Weekly learning failed for ${user.user_id}:`, e);
    }
  }

  return NextResponse.json({ processed });
}
```

**Step 2: Add Vercel cron trigger**

```json
// vercel.json — add to existing
{
  "crons": [
    {
      "path": "/api/cron/weekly-learning",
      "schedule": "0 4 * * 1"
    }
  ]
}
```

**Step 3: Set CRON_SECRET**

```bash
vercel env add CRON_SECRET --production
# Generate: openssl rand -hex 32
```

**Step 4: Verify**

```bash
curl -H "Authorization: Bearer $(vercel env pull CRON_SECRET)" \
  https://dealclozr.com/api/cron/weekly-learning
```

**Step 5: Commit**
```bash
git add app/api/cron/weekly-learning/route.ts vercel.json
git commit -m "feat: weekly self-learning cron job — extracts patterns from agent conversations"
```

---

### Task 4: Self-Healing Middleware

**Objective:** Catch DeepSeek API failures before they reach the user. Retry once with better context. If that fails, serve a graceful fallback.

**Files:**
- Create: `app/api/chat/middleware/healing.ts`
- Modify: `app/api/chat/route.ts` (wrap the main AI call)

**Step 1: Create healing middleware**

```typescript
// app/api/chat/middleware/healing.ts
import DeepSeek from "@anthropic-ai/sdk";

type AiConfig = {
  ai: DeepSeek;
  model: string;
  maxTokens: number;
  system: string;
  messages: DeepSeek.Messages.MessageParam[];
  tools?: DeepSeek.Messages.Tool[];
};

type HealingResult = {
  success: boolean;
  response?: DeepSeek.Messages.Message;
  error?: string;
  retries: number;
};

const FALLBACK_RESPONSE = "I hit a snag — DeepSeek's servers are backed up. Try again in 30 seconds, or type 'help' for the offline playbook.";

export async function withHealing(config: AiConfig): Promise<HealingResult> {
  let lastError = "";

  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await config.ai.messages.create({
        model: config.model,
        max_tokens: config.maxTokens,
        system: config.system,
        messages: config.messages,
        ...(config.tools?.length ? { tools: config.tools } : {}),
      });

      if (response.stop_reason === "max_tokens" && attempt < 2) {
        // Retry with higher max_tokens
        config.maxTokens = Math.min(config.maxTokens * 2, 8192);
        continue;
      }

      return { success: true, response, retries: attempt };

    } catch (err) {
      lastError = err instanceof Error ? err.message : String(err);
      console.error(`DeepSeek API error (attempt ${attempt + 1}):`, lastError);

      if (attempt < 2) {
        // Exponential backoff
        await new Promise(r => setTimeout(r, 1000 * Math.pow(2, attempt)));
        
        // On retry, inject error context
        config.messages = [
          ...config.messages.slice(0, -1),
          { role: "user", content: `[Your previous response failed. Please try again with a simpler answer.]\n${config.messages[config.messages.length - 1].content}` },
        ];
      }
    }
  }

  return { success: false, error: lastError, retries: 3 };
}
```

**Step 2: Wrap the main AI call**

In `route.ts`, find where `ai.messages.create(...)` is called and wrap it:

```typescript
import { withHealing } from "./middleware/healing";

// Replace direct ai.messages.create call with:
const result = await withHealing({
  ai,
  model: "deepseek-chat",
  maxTokens: 2048,
  system: finalSystemPrompt,
  messages: conversationMessages,
  tools: TOOL_DEFINITIONS,
});

if (!result.success) {
  // Log the failure for debugging
  console.error("All retries exhausted:", result.error);
  // Return fallback
  return new Response(
    JSON.stringify({ 
      text: FALLBACK_RESPONSE,
      error: result.error 
    }),
    { status: 200, headers: { "Content-Type": "application/json" } }
  );
}

// Continue with result.response as normal
```

**Step 3: Handle streaming edge case**

If streaming is used, skip healing for streaming calls (add a `stream` check):

```typescript
if (stream) {
  // Streaming can't be healed — let it fail through with proper error response
  const response = await ai.messages.create({ ... });
} else {
  // Use healing for non-streaming
  const result = await withHealing({ ... });
}
```

**Step 4: Verify**

To test, temporarily use a bad API key and verify the fallback message arrives:

```bash
curl -X POST https://dealclozr.com/api/chat \
  -H "Content-Type: application/json" \
  -d '{"messages":[{"role":"user","content":"test"}],"userId":"test-heal"}'
```

**Step 5: Commit**
```bash
git add app/api/chat/middleware/healing.ts app/api/chat/route.ts
git commit -m "feat: self-healing middleware — retry with backoff, graceful fallback"
```

---

### Task 5: Proactive Check-Ins — Morning Brief

**Objective:** Every weekday morning at 7:00 AM, agents send their users a proactive summary: yesterday's deals, today's opportunities, and bonus status.

**Files:**
- Create: `app/api/cron/morning-brief/route.ts`
- Modify: `vercel.json`

**Step 1: Create morning brief route**

```typescript
// app/api/cron/morning-brief/route.ts
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

  // Only run weekdays
  const day = new Date().getUTCDay();
  if (day === 0 || day === 6) return NextResponse.json({ skipped: "weekend" });

  const supabase = await createClient();
  const { data: users } = await supabase.from("agent_profiles").select("user_id, first_name");
  if (!users?.length) return NextResponse.json({ processed: 0 });

  let processed = 0;
  for (const user of users) {
    try {
      // Get yesterday's deals
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      const { data: deals } = await supabase
        .from("deals")
        .select("*")
        .eq("user_id", user.user_id)
        .gte("sold_date", yesterday);

      // Build context  
      const context = deals?.length 
        ? `Yesterday: ${deals.length} deal(s) closed. Today is a new day.`
        : `No deals logged yesterday. Fresh day.`;

      // Generate brief
      const response = await ai.messages.create({
        model: "deepseek-chat",
        max_tokens: 300,
        system: `You are an AI sales coach. Write a 2-3 sentence morning brief. Be direct and motivating. Reference their name: ${user.first_name || "closer"}. Context: ${context}`,
        messages: [{ role: "user", content: "Give me my morning brief." }],
      });

      const brief = (response.content[0] as { text: string }).text;

      // Save to memory (will be shown on next chat open)
      await supabase.from("agent_memory").insert({
        user_id: user.user_id,
        role: "system",
        content: `[Morning Brief ${new Date().toISOString().slice(0, 10)}] ${brief}`,
      });

      processed++;
    } catch (e) {
      console.error(`Morning brief failed for ${user.user_id}:`, e);
    }
  }

  return NextResponse.json({ processed });
}
```

**Step 2: Add cron trigger**

```json
// vercel.json
{
  "crons": [
    { "path": "/api/cron/weekly-learning", "schedule": "0 4 * * 1" },
    { "path": "/api/cron/morning-brief",    "schedule": "0 12 * * 1-5" }
  ]
}
```

**Step 3: Display brief in chat**

In `buildMemoryProfile`, inject morning briefs:

```typescript
const { data: briefs } = await supabase
  .from("agent_memory")
  .select("content, created_at")
  .eq("user_id", userId)
  .eq("role", "system")
  .gte("created_at", new Date(Date.now() - 86400000).toISOString())
  .limit(1);

if (briefs?.length) {
  parts.push(`MORNING BRIEF:\n${briefs[0].content}`);
}
```

**Step 4: Verify**

```bash
curl -H "Authorization: Bearer $(vercel env pull CRON_SECRET)" \
  https://dealclozr.com/api/cron/morning-brief
```

**Step 5: Commit**
```bash
git add app/api/cron/morning-brief/route.ts vercel.json app/api/chat/route.ts
git commit -m "feat: proactive morning brief — daily deal summary + motivation"
```

---

### Task 6: Pattern Detection — Unit Watchdog

**Objective:** If the user drops below their average pace (fewer than 2 deals/week), the agent proactively reaches out with a pattern alert and strategy suggestion.

**Files:**
- Create: `app/api/cron/unit-watchdog/route.ts`
- Modify: `vercel.json`

**Step 1: Create watchdog route**

```typescript
// app/api/cron/unit-watchdog/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const runtime = "edge";

export async function GET(req: NextRequest) {
  if (req.headers.get("Authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = await createClient();
  const { data: users } = await supabase.from("agent_profiles").select("user_id, first_name");
  if (!users?.length) return NextResponse.json({ processed: 0 });

  const weekAgo = new Date(Date.now() - 7 * 86400000).toISOString().slice(0, 10);
  let alerted = 0;

  for (const user of users) {
    try {
      const { data: deals } = await supabase
        .from("deals")
        .select("id")
        .eq("user_id", user.user_id)
        .gte("sold_date", weekAgo);

      if (!deals?.length || deals.length < 2) {
        await supabase.from("agent_memory").insert({
          user_id: user.user_id,
          role: "system",
          content: `[PACE ALERT] ${user.first_name || "Closer"}, you're at ${deals?.length || 0} deals this week — below your average. When you open this chat, the agent will check in and help you turn it around.`,
        });
        alerted++;
      }
    } catch (e) {
      console.error(`Unit watchdog failed for ${user.user_id}:`, e);
    }
  }

  return NextResponse.json({ alerted, checked: users.length });
}
```

**Step 2: Add cron trigger**

```json
{ "path": "/api/cron/unit-watchdog", "schedule": "0 15 * * 5" }
```

**Step 3: Inject alert into personality prompt**

In `buildPersonalizedPrompt`, check for recent system alerts:

```typescript
// Check for active alerts
const { data: alerts } = await supabase
  .from("agent_memory")
  .select("content")
  .eq("user_id", profile.user_id)
  .eq("role", "system")
  .gte("created_at", new Date(Date.now() - 72 * 3600000).toISOString())
  .limit(3);

if (alerts?.length) {
  const alertText = alerts.map((a: { content: string }) => a.content).join("\n");
  intro.push(`\nACTIVE ALERTS — address these proactively:\n${alertText}`);
}
```

**Step 4: Verify & Commit**
```bash
curl -H "Authorization: Bearer $(vercel env pull CRON_SECRET)" \
  https://dealclozr.com/api/cron/unit-watchdog
```

---

### Task 7: Personality Self-Evolution

**Objective:** Let agents evolve their own personality over time based on what works. After 10+ conversations, the weekly learning job updates the `personality_profile` JSONB.

**Files:**
- Modify: `app/api/cron/weekly-learning/route.ts`

**Step 1: Add personality evolution step**

At the end of the weekly learning job, after saving facts, add:

```typescript
// Count total sessions for this user
const { count } = await supabase
  .from("agent_memory")
  .select("id", { count: "exact", head: true })
  .eq("user_id", user.user_id)
  .eq("role", "session");

if (count && count >= 10) {
  // Ask: what personality shift would help this closer?
  const evolveResponse = await ai.messages.create({
    model: "deepseek-chat",
    max_tokens: 200,
    system: "Based on these conversations, suggest ONE adjustment to the agent's personality (voice tone, communication style, or a quirk). Respond with JSON: { \"voice_tone\": \"...\", \"communication\": \"...\", \"quirks\": \"...\" }. Only include fields that should change.",
    messages: [{ role: "user", content: sessionText }],
  });

  const evolveText = (evolveResponse.content[0] as { text: string }).text;
  
  try {
    const evolveJson = JSON.parse(evolveText);
    await supabase.from("agent_profiles")
      .update({ 
        personality_profile: evolveJson,
        updated_at: new Date().toISOString()
      })
      .eq("user_id", user.user_id);
  } catch { /* skip if JSON parse fails */ }
}
```

**Step 2: Verify**
```bash
curl -H "Authorization: Bearer $CRON_SECRET" \
  https://dealclozr.com/api/cron/weekly-learning
# Check agent_profiles row — personality_profile should have values
```

**Step 3: Commit**
```bash
git add app/api/cron/weekly-learning/route.ts
git commit -m "feat: personality self-evolution after 10+ conversations"
```

---

## Summary

All 7 tasks are incremental and independently deployable. Each builds on the existing Supabase + DeepSeek architecture without new dependencies.

**Total new code:** ~400 lines across 4 new files and 1 modified file.

**Total Vercel cron jobs added:** 3 (weekly-learning, morning-brief, unit-watchdog)

**Token cost:** Minimal — all cron jobs use short prompts with tight max_tokens. Estimated <$2/month additional.

**Rollout order:**
1. Tasks 1+2: Personality + Memory (makes agents feel "alive" immediately)
2. Task 4: Self-healing (prevents user-facing failures)
3. Tasks 3+5+6+7: Learning loop + proactive behavior (makes them "self-improving")
