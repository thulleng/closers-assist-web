import { NextRequest } from "next/server";
import { createClient } from "@/lib/supabase/server";

const BRIDGE = "http://178.105.161.224:8910";
const DEEPSEEK = "https://api.deepseek.com/v1/chat/completions";

// ─── Context builder ─────────────────────────────────────────────────────────
function monthWindow() {
  const now = new Date();
  const y = now.getUTCFullYear(); const m = now.getUTCMonth();
  return {
    start: new Date(Date.UTC(y, m, 1)).toISOString().slice(0, 10),
    end: new Date(Date.UTC(y, m + 1, 1)).toISOString().slice(0, 10),
    label: now.toLocaleString("en-US", { month: "long", year: "numeric" }),
  };
}

async function buildContext(supabase: any, userId: string): Promise<string> {
  const { start, end, label } = monthWindow();
  const [profile, dealsRes] = await Promise.all([
    supabase.from("agent_profiles").select("first_name, last_name, company, draw").eq("user_id", userId).maybeSingle(),
    supabase.from("deals").select("customer_name, deal_type, commission, units, sold_date, id").eq("user_id", userId).gte("sold_date", start).lt("sold_date", end).order("sold_date", { ascending: false }),
  ]);

  const p = profile.data; const deals = dealsRes.data ?? [];
  const name = p ? [p.first_name, p.last_name].filter(Boolean).join(" ") : "User";
  const draw = p?.draw || 2600;

  const lines: string[] = [];
  lines.push(`User: ${name}${p?.company ? ` at ${p.company}` : ""}. $${draw} draw.`);
  lines.push(`Month: ${label}`);

  if (deals.length) {
    const u = deals.reduce((s: number, d: any) => s + (d.units || 0), 0);
    const c = deals.reduce((s: number, d: any) => s + (d.commission || 0), 0);
    const bal = c - draw;
    lines.push(`${deals.length} deals | ${u}u | $${c.toLocaleString()} commission | ${bal >= 0 ? "+" : ""}$${bal.toLocaleString()} vs draw`);
    lines.push(`Deal IDs: ${deals.map((d: any) => `${d.customer_name}=${d.id.slice(0, 8)}`).join(", ")}`);
    const recent = deals.slice(0, 10).map((d: any) => `${d.sold_date}: ${d.customer_name} — ${d.deal_type} $${d.commission} (${d.units}u)`).join("\n");
    lines.push(`\n${recent}`);
  } else {
    lines.push("No deals this month.");
  }

  return `\n[DASHBOARD DATA]\n${lines.join("\n")}\n[END DATA]`;
}

// ─── Bridge proxy ────────────────────────────────────────────────────────────
async function askBridge(message: string, sessionToken?: string): Promise<string | null> {
  try {
    const body: any = { message };
    if (sessionToken) body.session = sessionToken;
    const res = await fetch(`${BRIDGE}/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(30000),
    });
    if (!res.ok) return null;
    const data = await res.json();
    const reply = data.reply || "";
    if (!reply || reply.includes("Got tangled")) return null;
    return reply;
  } catch { return null; }
}

// ─── DeepSeek fallback ──────────────────────────────────────────────────────
async function askDeepSeek(system: string, message: string): Promise<string> {
  const key = process.env.DEEPSEEK_API_KEY;
  if (!key) return "I'm catching my breath — try me again! ⚡";
  const res = await fetch(DEEPSEEK, {
    method: "POST",
    headers: { "Content-Type": "application/json", "Authorization": `Bearer ${key}` },
    body: JSON.stringify({ model: "deepseek-v4-pro", messages: [{ role: "system", content: system }, { role: "user", content: message }], max_tokens: 600, temperature: 0.7 }),
    signal: AbortSignal.timeout(15000),
  });
  if (!res.ok) throw new Error(`DeepSeek ${res.status}`);
  const data = await res.json();
  return data.choices?.[0]?.message?.content || "I'm here! 👋";
}

// ─── System prompt (fallback only) ───────────────────────────────────────────
const SYSTEM = `You are Sassy — a sharp, fast AI closer built into ClosersAssist. Short punchy sentences. Lead with numbers. Never mention infrastructure, models, or internal details. Use the user's name.`;

// ─── POST handler ───────────────────────────────────────────────────────────
async function ensureProvisioned(supabase: any, userId: string, profile: any): Promise<boolean> {
  // Check if already provisioned
  if (profile?.provisioning_status === "provisioned") return true;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"}/api/admin/provision`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.SUPABASE_SERVICE_ROLE_KEY}`,
      },
      body: JSON.stringify({ user_id: userId }),
    });
    if (res.ok) {
      // Mark as provisioned in profile
      await supabase.from("agent_profiles").upsert(
        { user_id: userId, provisioning_status: "provisioned", updated_at: new Date().toISOString() },
        { onConflict: "user_id" }
      );
      return true;
    }
    console.error("Provision failed:", await res.text());
    return false;
  } catch (e: any) {
    console.error("Provision error:", e.message);
    return false;
  }
}

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json();
    if (!message?.trim()) return new Response("Say something!", { status: 200 });

    let enriched = message.trim();
    let userId: string | null = null;

    try {
      const supabase = await createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        userId = user.id;
        const ctx = await buildContext(supabase, user.id);

        // ── Auto-provision on first use ──
        const { data: profile } = await supabase
          .from("agent_profiles")
          .select("provisioning_status")
          .eq("user_id", user.id)
          .maybeSingle();
        if (!profile || profile.provisioning_status !== "provisioned") {
          await ensureProvisioned(supabase, user.id, profile);
        }

        enriched = `${ctx}\n\nUser says: ${message.trim()}`;
      }
    } catch { /* unauthenticated — no context */ }

    const reply = await askBridge(enriched, userId || undefined) 
      || await askDeepSeek(SYSTEM, enriched);

    return new Response(reply, {
      status: 200,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  } catch (err: any) {
    console.error("Sassy error:", err.message);
    return new Response("Try me again in a moment! ⚡", {
      status: 200,
      headers: { "Content-Type": "text/plain; charset=utf-8" },
    });
  }
}
