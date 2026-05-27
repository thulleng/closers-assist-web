import { NextRequest, NextResponse } from "next/server";

// ── Webhook ─────────────────────────────────────────────────────────────────

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const msg = body?.message as Record<string, any> | undefined;
    if (!msg) return NextResponse.json({ ok: true });

    const chatId = msg?.chat?.id as number | undefined;
    if (!chatId) return NextResponse.json({ ok: true });

    // ── Detect media types ──────────────────────────────────────────────────
    let text: string | undefined = msg?.text as string | undefined;
    let caption: string | undefined = msg?.caption as string | undefined;
    let mediaType: "text" | "photo" | "voice" | "video" | "audio" | "document" = "text";
    let fileId: string | undefined;

    if (msg.photo) {
      mediaType = "photo";
      // Last photo in array is largest
      const photos = msg.photo as Array<{ file_id: string }>;
      fileId = photos[photos.length - 1]?.file_id;
      text = caption || "[Image attached]";
    } else if (msg.voice) {
      mediaType = "voice";
      fileId = (msg.voice as { file_id: string }).file_id;
      text = caption || "[Voice message attached]";
    } else if (msg.video) {
      mediaType = "video";
      fileId = (msg.video as { file_id: string }).file_id;
      text = caption || "[Video attached]";
    } else if (msg.audio) {
      mediaType = "audio";
      fileId = (msg.audio as { file_id: string }).file_id;
      text = caption || "[Audio attached]";
    } else if (msg.document) {
      mediaType = "document";
      fileId = (msg.document as { file_id: string }).file_id;
      text = caption || "[Document attached]";
    }

    // Skip messages with no content
    if (!text && !fileId) return NextResponse.json({ ok: true });

    const token = process.env.TELEGRAM_BOT_TOKEN;
    if (!token) return NextResponse.json({ ok: true });

    const reply = async (msg: string) => {
      // Split long messages
      const maxLen = 4000;
      if (msg.length <= maxLen) {
        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chatId, text: msg, parse_mode: "Markdown" }),
        });
        return;
      }
      const chunks: string[] = [];
      let remaining = msg;
      while (remaining.length > 0) {
        if (remaining.length <= maxLen) { chunks.push(remaining); break; }
        let splitAt = remaining.lastIndexOf("\n", maxLen);
        if (splitAt === -1 || splitAt < maxLen / 2) splitAt = remaining.lastIndexOf(" ", maxLen);
        if (splitAt === -1 || splitAt < maxLen / 2) splitAt = maxLen;
        chunks.push(remaining.slice(0, splitAt));
        remaining = remaining.slice(splitAt).trim();
      }
      for (const chunk of chunks) {
        await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: chatId, text: chunk, parse_mode: "Markdown" }),
        });
      }
    };

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (!supabaseUrl || !supabaseKey) {
      await reply("⚠️ Service unavailable.");
      return NextResponse.json({ ok: true });
    }

    const { createClient } = await import("@supabase/supabase-js");
    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { autoRefreshToken: false, persistSession: false },
    });

    // ── Look up profile by telegram_chat_id ──
    const { data: profile, error: profileErr } = await supabase
      .from("agent_profiles")
      .select("*")
      .eq("telegram_chat_id", chatId)
      .maybeSingle();

    if (profileErr) {
      await reply("⚠️ Error looking up your account. Try again.");
      return NextResponse.json({ ok: true });
    }

    if (!profile) {
      try {
        // ── Default demo: Sample dealership pay plan ──
        const demoIntro = `👋 *Welcome to Deal Clozr!*

I'm an AI closer built on the floor by a working closer. Here's a preview of what I know:

*🏢 Demo Pay Plan — Sample Dealership*
• Draw: \\$2,600 bi-weekly
• Mini/flat: \\$200
• Full deal: variable (front gross × commission %)
• Volume bonus: \\$500 at 11 units + 25% retro
• CXI bonus: \\$250 at 4.8+

*What I do:*
→ Log deals & track unit count
→ Handle customer objections word-for-word
→ Calculate commission & bonus math
→ Write follow-up texts & emails
→ Push you toward the next bonus tier

*Ready to try?* Type a question — for example:
\`\`\`
I have a customer on a 2019 RAV4 with 60k miles. Trade-in is underwater by \\$3k. How do I handle it?
\`\`\`

*Want your own agent?* Tap below to connect your account:\n\nhttps://dealclozr.com/telegram?code=***&chat_id=${chatId}\n\nOnce linked, I'll learn YOUR pay plan, YOUR scripts, and YOUR goals. Same agent. Your data.`;

        // Send intro — chunk if needed
        const maxLen = 4000;
        if (demoIntro.length <= maxLen) {
          await reply(demoIntro);
        } else {
          const parts: string[] = [];
          let remaining = demoIntro;
          while (remaining.length > 0) {
            if (remaining.length <= maxLen) { parts.push(remaining); break; }
            let splitAt = remaining.lastIndexOf("\\n", maxLen);
            if (splitAt === -1 || splitAt < maxLen / 2) splitAt = remaining.lastIndexOf(" ", maxLen);
            if (splitAt === -1 || splitAt < maxLen / 2) splitAt = maxLen;
            parts.push(remaining.slice(0, splitAt));
            remaining = remaining.slice(splitAt).trim();
          }
          for (const part of parts) {
            await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ chat_id: chatId, text: part, parse_mode: "Markdown" }),
            });
          }
        }
      } catch (_) {
        // fallback — silent
      }
      return NextResponse.json({ ok: true });
    }

    // ── User is linked — build full context ──
    const userId = profile.user_id as string;

    // Typing indicator
    fetch(`https://api.telegram.org/bot${token}/sendChatAction`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: chatId, action: "typing" }),
    }).catch(() => {});

    // Deals this month
    const now = new Date();
    const monthStart = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-01`;
    const { data: deals } = await supabase
      .from("deals")
      .select("customer_name, vehicle, front_gross, deal_type, sold_date, units")
      .eq("user_id", userId)
      .gte("sold_date", monthStart)
      .order("sold_date", { ascending: false })
      .limit(20);

    // Recent memory: 100 messages for rich context
    const { data: memory } = await supabase
      .from("agent_memory")
      .select("role, content")
      .eq("user_id", userId)
      .neq("role", "fact")
      .neq("role", "summary")
      .order("created_at", { ascending: false })
      .limit(100);

    // Facts: learned knowledge (includes Obsidian vault notes)
    const { data: facts } = await supabase
      .from("agent_memory")
      .select("content")
      .eq("user_id", userId)
      .eq("role", "fact")
      .order("created_at", { ascending: false })
      .limit(30);

    // Session summaries: condensed past conversations
    const { data: summaries } = await supabase
      .from("agent_memory")
      .select("content, created_at")
      .eq("user_id", userId)
      .eq("role", "summary")
      .order("created_at", { ascending: false })
      .limit(5);

    // ── Build personalized system prompt ──
    const agentName = (profile.agent_name as string) || "Closer";
    const firstName = (profile.first_name as string) || "";
    const lastName = (profile.last_name as string) || "";
    const fullName = [firstName, lastName].filter(Boolean).join(" ");
    const title = (profile.title as string) || "";
    const company = (profile.company as string) || "";
    const industry = (profile.industry as string) || "default";
    const yearsInSales = (profile.years_in_sales as string) || "";
    const coachingStyle = (profile.coaching_style as string) || "direct";
    const agentFocus = (profile.agent_focus as string) || "closing rate";
    const customGoals = (profile.custom_goals as string) || "";

    const intro: string[] = [];
    intro.push(`You are ${agentName}, an AI sales coach.`);
    const who = [fullName, title ? `a ${title}` : "", company ? `at ${company}` : "", industry ? `in the ${industry} industry` : "", yearsInSales ? `with ${yearsInSales} years of experience` : ""].filter(Boolean).join(" ");
    if (who) intro.push(`You are working with ${who}.`);
    intro.push(`Your coaching style is ${coachingStyle}. Your primary focus is ${agentFocus}.`);
    if (customGoals) intro.push(`Their goal this month: ${customGoals}.`);

    const payParts: string[] = [];
    if (profile.draw) payParts.push(`$${profile.draw} draw`);
    if (profile.commission_pct) payParts.push(`${profile.commission_pct}% commission`);
    if (profile.mini_flat) payParts.push(`$${profile.mini_flat} mini/flat`);
    if (profile.volume_bonus) payParts.push(`$${profile.volume_bonus} volume bonus`);
    if (profile.cxi_bonus) payParts.push(`$${profile.cxi_bonus} CXI bonus`);
    if (payParts.length) intro.push(`Pay plan: ${payParts.join(", ")}.`);

    const REASONING_FRAMEWORK = `HOW YOU OPERATE — INTERNAL PROCESS:
Before every response, run through this silently. The user never sees this process — they only see your final answer.

0. LANGUAGE — Detect what language the user is writing in. Respond in THAT language. If they write in Spanish, respond in Spanish. French → French. Arabic → Arabic. Same for any language. Never switch to English unless the user does first. This is non-negotiable.

1. SITUATION — Read what's really happening. Between customers? At the desk? End of month panic? Is this an objection, a calculation, a strategy question, or deal logging?
2. NUMBERS — What matters here? Their pay plan math. Their unit count. Their bonus gap. Their commission on this deal. If the user's monthly context is provided below, USE IT. Don't ask what you already know.
3. STRATEGY — What's the highest-probability move? Give 1-3 options ranked by likelihood of closing. If there's a clear best play, lead with it — don't present a menu.
4. DELIVER — Word-for-word script first (if objection/script). Then the math (if numbers). Then the why in one sentence. The person reading this has 90 seconds between customers.`;

    const INDUSTRY_PROMPTS: Record<string, string> = {
      automotive: `You are Deal Clozr — an elite AI sales partner built on the floor by a working closer. You were forged between real customers, real T.O.s, and real paychecks. You are not a chatbot. You are a closer's second brain.

YOUR IDENTITY:
You speak the lot fluently — minis, full deals, street purchases, half-minis. You know T.O. timing, desk strategy, CXI protection, front vs. back gross, volume bonuses, and the difference between 10 countable units and 10 sold. You understand that a $200 mini isn't just $200 — it's a half-unit toward a $500 bonus at 11. You think in paychecks, not just deals.

YOUR VOICE:
Direct. Confident. Zero fluff. You talk like the top closer on the board — the one who trains new hires and doesn't sugarcoat. Short sentences. Concrete numbers. When the answer is a script, you give the exact words. When it's math, you show the calculation. When it's strategy, you give the play and the probability.

${REASONING_FRAMEWORK}

PROACTIVE RULES:
- If the user mentions a deal in passing, OFFER to log it: "Want me to add that to your tracker?"
- If their monthly context shows they're close to a bonus tier, POINT IT OUT: "You're 2 deals from $500 — that next close puts you one away."
- If you notice a pattern (3 small deals in a row, low volume, slow week), SAY SOMETHING: "Three small ones this week. Want to talk about how to turn the next one into a bigger deal?"
- Never wait to be asked what you already know from their context.`,

      "real-estate": `You are Deal Clozr — an elite AI sales partner for real estate agents. You understand the full transaction lifecycle: buyer consults, listing appointments, offers, negotiations, inspections, appraisals, and closings.
${REASONING_FRAMEWORK}
YOUR IDENTITY: You speak real estate fluently — DOM, list-to-sale ratio, absorption rate, cap rate, GCI, commission splits, dual agency, referral fees. You know what a $400k listing at 2.8% means in the agent's pocket after their split. You think in closings, not just showings.
YOUR VOICE: Direct, strategic, zero fluff. Like the top producer who mentors new agents between their own closings.
PROACTIVE RULES: Reference monthly context without being asked. Flag when they're close to a cap. Scripts first, rationale second.`,

      insurance: `You are Deal Clozr — an elite AI sales partner for insurance professionals. You know life, health, P&C, commercial lines, and Medicare.
${REASONING_FRAMEWORK}
YOUR IDENTITY: Premiums, deductibles, coverage limits, exclusions. Term vs. whole vs. universal life. AOR letters, policy replacements, cross-sell triggers. You think in annualized premium and retention rates.
YOUR VOICE: Clear, consultative, zero jargon. Like the agency owner who still writes policies.
PROACTIVE RULES: Reference monthly context without being asked. Flag cross-sell opportunities. Scripts first, rationale second.`,

      solar: `You are Deal Clozr — an elite AI sales partner for solar closers. You know residential solar: quotes, utility bill analysis, ROI math, financing, PPAs vs. purchases, and clawback risk.
${REASONING_FRAMEWORK}
YOUR VOICE: Direct, numbers-driven. Like the rep who's been burned by clawbacks and learned to redline every deal.
PROACTIVE RULES: Reference monthly context. Flag clawback exposure. Scripts first, math second.`,

      saas: `You are Deal Clozr — an elite AI sales partner for SaaS closers. ARR, quota attainment, MEDDIC, procurement maze, champions vs. decision makers.
${REASONING_FRAMEWORK}
YOUR VOICE: Strategic, process-oriented. Like the enterprise AE who's been through procurement 100 times.
PROACTIVE RULES: Reference monthly context. Flag pipeline gaps. Scripts first, strategy second.`,

      medical: `You are Deal Clozr — an elite AI sales partner for medical device reps. You know the OR, the surgeon relationship, territory planning, VAC schedules, and hospital procurement.
${REASONING_FRAMEWORK}
YOUR VOICE: Clinical, precise. Like the senior rep who knows every surgeon's preferences.
PROACTIVE RULES: Reference monthly context. Scripts first, clinical rationale second.`,

      retail: `You are Deal Clozr — an elite AI sales partner for big-ticket retail closers. Furniture, appliances, electronics, mattresses. Financing math, attachment selling, floor-up techniques.
${REASONING_FRAMEWORK}
YOUR VOICE: Energetic, practical. Like the floor manager who still takes ups.
PROACTIVE RULES: Reference monthly context. Flag attachment opportunities. Scripts first.`,

      rental: `You are Deal Clozr — rental sales: Turo, Airbnb, RV, boat, truck. Handle pricing disputes, damage deposit concerns, cancellation pushback, upsells, 5-star review asks.
${REASONING_FRAMEWORK}
Give 2-3 plays with word-for-word scripts and confidence %.`,

      project_manager: `You are Deal Clozr — project managers who sell: pitching, upselling scope, defending budgets, closing change orders.
${REASONING_FRAMEWORK}
Handle budget objections, SOW defense, timeline pushback, closing verbal yes to signed contract. Give 2-3 plays with scripts and confidence %.`,

      other_sales: `You are Deal Clozr — general sales: universal objections — price, timing, think about it, decision-maker stalls, ghosting.
${REASONING_FRAMEWORK}
Give 2-3 plays with word-for-word scripts and confidence %. Root everything in closing fundamentals.`,

      default: `You are Deal Clozr — an elite AI sales partner built for commission-based closers. Handle objections, calculate numbers, write follow-ups, and close deals.
${REASONING_FRAMEWORK}
Be direct, practical, zero fluff. The person texting you is between customers. Give them what they need right now.`,
    };
    const basePrompt = INDUSTRY_PROMPTS[industry as string] || INDUSTRY_PROMPTS.default;

    let systemPrompt = `${intro.join("\n")}\n\n---\n\n${basePrompt}`;

    // Deal context
    if (deals && deals.length > 0) {
      const dealLines = deals.map((d: any) =>
        `- ${d.customer_name || "?"}: ${d.vehicle || "N/A"}, ${d.deal_type || "deal"}, $${d.front_gross || 0} front${d.units ? `, ${d.units} unit${d.units !== 1 ? "s" : ""}` : ""}`
      ).join("\n");
      systemPrompt += `\n\n## DEALS THIS MONTH (${deals.length})\n${dealLines}`;
    }

    // Memory context: 25 turns, richer excerpts
    if (memory && memory.length > 0) {
      const recentMsgs = memory
        .slice(0, 25)
        .reverse()
        .map((m: any) => `${m.role === "user" ? "REP" : "YOU"}: ${(m.content || "").slice(0, 200)}`)
        .join("\n");
      systemPrompt += `\n\n## RECENT CONTEXT (last 25 turns)\n${recentMsgs}`;
    }

    // Facts (includes Obsidian vault notes)
    if (facts && facts.length > 0) {
      const factLines = facts.map((f: any) => `- ${f.content}`);
      systemPrompt += `\n\n## WHAT YOU KNOW ABOUT THIS USER\n${factLines.join("\n")}`;
    }

    // Session summaries
    if (summaries && summaries.length > 0) {
      const summaryLines = summaries.map((s: any) => {
        const d = new Date(s.created_at);
        return `[${d.toLocaleDateString("en-US", { month: "short", day: "numeric" })}] ${s.content}`;
      });
      systemPrompt += `\n\n## PAST SESSION SUMMARIES\n${summaryLines.join("\n")}`;
    }

    systemPrompt += `\n\nMEMORY: You know this user. Reference facts and history naturally. Save important details as facts. Never say "I don't remember" -- say "Refresh me on that." Keep responses tight -- 90 seconds between customers.`;

    // ── Process media if present ────────────────────────────────────────────
    let processedText = text || "";
    if (fileId && mediaType !== "text") {
      try {
        const fileRes = await fetch(
          `https://api.telegram.org/bot${token}/getFile?file_id=${fileId}`
        );
        const fileData = await fileRes.json() as { ok: boolean; result?: { file_path?: string } };
        if (fileData.ok && fileData.result?.file_path) {
          const fileUrl = `https://api.telegram.org/file/bot${token}/${fileData.result.file_path}`;
          const dl = await fetch(fileUrl);
          const fileBuffer = Buffer.from(await dl.arrayBuffer());

          if (mediaType === "voice" || mediaType === "audio") {
            const { transcribeAudio: ta } = await import("@/app/api/chat/media");
            const b64 = fileBuffer.toString("base64");
            const ext = mediaType === "voice" ? "ogg" : "m4a";
            processedText = await ta({
              type: "audio",
              source: { type: "base64", media_type: `audio/${ext}`, data: b64 }
            });
          } else if (mediaType === "video") {
            const { processVideo: pv } = await import("@/app/api/chat/media");
            const b64 = fileBuffer.toString("base64");
            processedText = await pv({
              type: "video",
              source: { type: "base64", media_type: "video/mp4", data: b64 }
            });
          } else if (mediaType === "photo") {
            const b64 = fileBuffer.toString("base64");
            const DeepSeek = (await import("@anthropic-ai/sdk")).default;
            const ai = new DeepSeek({
              apiKey: process.env.DEEPSEEK_API_KEY || "",
              baseURL: "https://api.deepseek.com/anthropic",
            });
            const visionRes = await ai.messages.create({
              model: "deepseek-chat",
              max_tokens: 500,
              messages: [{
                role: "user",
                content: [
                  { type: "image", source: { type: "base64", media_type: "image/jpeg", data: b64 } },
                  { type: "text", text: caption || "What's in this image? Describe concisely." }
                ],
              }],
            });
            processedText = visionRes.content[0]?.type === "text"
              ? `[Image]: ${visionRes.content[0].text}${caption ? `\nCaption: ${caption}` : ""}`
              : `[Image attached]${caption ? ` - ${caption}` : ""}`;
          }
        }
      } catch (mediaErr: any) {
        console.error("TG media error:", mediaErr.message);
        processedText = `[${mediaType} — processing failed] ${caption || ""}`;
      }
    }

    // ── Save user message ──
    await supabase.from("agent_memory").insert({
      user_id: userId,
      role: "user",
      content: processedText,
    });

    // ── Build compact context + proxy to VM Sassy bridge ──
    const contextLines: string[] = [];
    contextLines.push(`[USER: ${fullName || firstName}${company ? ` @ ${company}` : ""} | ${industry}]`);
    if (payParts.length) contextLines.push(`Pay: ${payParts.join(", ")}`);
    if (deals && deals.length > 0) {
      const dealSummary = deals.map((d: any) =>
        `${d.customer_name}: ${d.deal_type || "deal"} $${d.front_gross || 0}`
      ).join(" | ");
      contextLines.push(`MTD: ${deals.length} deals — ${dealSummary}`);
    }
    // Inject recent memory (last 5 turns) so the bridge has context
    if (memory && memory.length > 0) {
      const recent = memory.slice(0, 5).reverse()
        .map((m: any) => `${m.role === "user" ? "REP" : "SASSY"}: ${(m.content || "").slice(0, 150)}`)
        .join("\n");
      contextLines.push(`Recent:\n${recent}`);
    }
    const bridgeMessage = `${contextLines.join("\n")}\n---\n${processedText}`;

    let replyText = "";
    try {
      const bridgeRes = await fetch("http://178.105.161.224:8910/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: bridgeMessage, session: userId }),
        signal: AbortSignal.timeout(45000),
      });
      if (bridgeRes.ok) {
        const data = await bridgeRes.json();
        replyText = data.reply || "Got it. What else?";
      } else {
        throw new Error(`Bridge ${bridgeRes.status}`);
      }
    } catch (bridgeErr: any) {
      console.error("Bridge fallback:", bridgeErr.message);
      // Fallback: direct DeepSeek
      const { default: DeepSeek } = await import("@anthropic-ai/sdk");
      const deepseek = new DeepSeek({
        apiKey: process.env.DEEPSEEK_API_KEY || "",
        baseURL: "https://api.deepseek.com/anthropic",
      });
      const response = await deepseek.messages.create({
        model: "deepseek-chat",
        max_tokens: 1000,
        system: systemPrompt,
        messages: [{ role: "user", content: processedText || "" }],
      });
      replyText = response.content[0]?.type === "text"
        ? response.content[0].text
        : "Got it. What else?";
    }

    // ── Save assistant response ──
    await supabase.from("agent_memory").insert({
      user_id: userId,
      role: "assistant",
      content: replyText,
    });

    await reply(replyText);
    return NextResponse.json({ ok: true });
  } catch (e: any) {
    console.error("TG CRASH:", e.message);
    return NextResponse.json({ ok: true });
  }
}

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
