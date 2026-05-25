"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import Link from "next/link";
import {
  ArrowRight, CheckCircle2, Loader2, Car, MessageCircle, Settings2,
  Smartphone, DollarSign, Target, Star, Zap, Trophy, Copy, Check,
  ExternalLink, AlertCircle,
} from "lucide-react";
import FadeIn from "@/components/FadeIn";

// ─── Constants ──────────────────────────────────────────────────────────────

const INDUSTRIES = [
  { id: "auto", label: "Auto Sales" },
  { id: "real-estate", label: "Real Estate" },
  { id: "insurance", label: "Insurance" },
  { id: "solar", label: "Solar" },
  { id: "saas", label: "SaaS" },
  { id: "medical", label: "Medical Devices" },
  { id: "retail", label: "Retail (Big Ticket)" },
  { id: "hvac", label: "HVAC" },
  { id: "roofing", label: "Roofing" },
  { id: "pest-control", label: "Pest Control" },
  { id: "home-security", label: "Home Security" },
  { id: "mortgage", label: "Mortgage & Lending" },
  { id: "financial-advisors", label: "Financial Advisors" },
  { id: "recruiting", label: "Recruiting" },
  { id: "telecom", label: "Telecom" },
  { id: "rental", label: "Rental" },
  { id: "project-manager", label: "Project Manager" },
  { id: "other-sales", label: "Other Sales" },
];

const COACHING_STYLES = [
  { value: "direct", label: "Direct & Blunt", desc: "No sugar. Straight to the play." },
  { value: "motivating", label: "Motivating & Energetic", desc: "Hype you up before every walk." },
  { value: "analytical", label: "Calm & Analytical", desc: "Break down every number first." },
  { value: "mentor", label: "Mentor-Style", desc: "Step-by-step like a seasoned closer." },
];

const FOCUS_OPTIONS = [
  { value: "closing-rate", label: "Closing Rate" },
  { value: "follow-up", label: "Follow-up Discipline" },
  { value: "objection-handling", label: "Objection Handling" },
  { value: "product-knowledge", label: "Product Knowledge" },
  { value: "prospecting", label: "Prospecting" },
];

const inputCls =
  "w-full rounded-xl border border-white/20 bg-white/[0.06] px-4 py-3 text-white placeholder:text-muted text-sm outline-none focus:border-deal/60 focus:ring-1 focus:ring-deal/30 transition-all";

function StepIndicator({ current, total }: { current: number; total: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {Array.from({ length: total }, (_, i) => (
        <div key={i} className={`h-1.5 rounded-full transition-all duration-300 ${
          i <= current ? "w-8 bg-deal" : "w-4 bg-white/10"
        }`} />
      ))}
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────

function OnboardingContent() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [industry, setIndustry] = useState("");
  const [telegramCopied, setTelegramCopied] = useState(false);
  const [agentName, setAgentName] = useState("");
  const [agentGender, setAgentGender] = useState("female");
  const [draw, setDraw] = useState("");
  const [commPct, setCommPct] = useState("");
  const [miniFlat, setMiniFlat] = useState("");
  const [volumeBonus, setVolumeBonus] = useState("");
  const [cxiBonus, setCxiBonus] = useState("");
  const [coachingStyle, setCoachingStyle] = useState("direct");
  const [agentFocus, setAgentFocus] = useState("closing-rate");
  const [customGoals, setCustomGoals] = useState("");

  const saveAll = async () => {
    setSaving(true);
    setError(null);
    try {
      const supabase = createClient();
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { setError("Not signed in"); setSaving(false); return; }

      const { error: upsertError } = await supabase
        .from("agent_profiles")
        .upsert({
          user_id: user.id,
          industry: industry || "auto",
          agent_name: agentName || "Closer",
          agent_gender: agentGender,
          coaching_style: coachingStyle,
          agent_focus: agentFocus,
          custom_goals: customGoals,
          draw: parseFloat(draw) || 0,
          commission_pct: parseFloat(commPct) || 0,
          mini_flat: parseFloat(miniFlat) || 0,
          volume_bonus: parseFloat(volumeBonus) || 0,
          cxi_bonus: parseFloat(cxiBonus) || 0,
          updated_at: new Date().toISOString(),
        }, { onConflict: "user_id" });

      if (upsertError) throw upsertError;
      router.push(`/dashboard/${industry || "auto"}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  };

  const steps = ["Industry", "Telegram", "Pay Plan", "Style", "Start"];

  return (
    <div className="relative min-h-screen overflow-hidden loud-bg">
      <div className="grid-pattern" />
      <div className="grain" />

      <div className="relative mx-auto max-w-2xl px-6 py-12 md:py-20">
        {/* Step indicator */}
        <StepIndicator current={step} total={steps.length} />

        <div className="text-center mb-8">
          <h1 className="font-display text-3xl font-black text-white md:text-4xl">
            {step === 0 && "What do you sell?"}
            {step === 1 && "Connect Telegram"}
            {step === 2 && "Set Your Pay Plan"}
            {step === 3 && "Style & Focus"}
            {step === 4 && "You're Ready"}
          </h1>
          <p className="mt-2 text-sm text-ash">
            {step === 0 && "Pick your industry. Your agent loads the right language instantly."}
            {step === 1 && "Your agent works in Telegram. Connect it in one tap."}
            {step === 2 && "The math that makes your dashboard accurate. Takes 60 seconds."}
            {step === 3 && "How should your agent talk? What should it push you on?"}
            {step === 4 && "Everything's set. Let's get you closing."}
          </p>
        </div>

        {/* ───────────── STEP 0: INDUSTRY ───────────── */}
        {step === 0 && (
          <FadeIn>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
              {INDUSTRIES.map((ind) => (
                <button
                  key={ind.id}
                  onClick={() => { setIndustry(ind.id); setStep(1); }}
                  className={`rounded-xl border px-3 py-3 text-sm font-medium transition-all text-center ${
                    industry === ind.id
                      ? "border-deal/60 bg-deal/10 text-deal"
                      : "border-white/10 bg-white/[0.03] text-ash hover:border-white/20 hover:text-bone"
                  }`}
                >
                  {ind.label}
                </button>
              ))}
            </div>
          </FadeIn>
        )}

        {/* ───────────── STEP 1: TELEGRAM ───────────── */}
        {step === 1 && (
          <FadeIn>
            <div className="loud-card rounded-2xl p-6 md:p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-deal to-emerald-400">
                  <MessageCircle className="h-6 w-6 text-white" />
                </div>
                <div>
                  <div className="text-sm font-bold text-white">Open Telegram</div>
                  <div className="text-xs text-ash">Search @CloseBot or tap the link</div>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                <a
                  href="https://t.me/CloseBot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-loud w-full flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold"
                >
                  <ExternalLink className="h-4 w-4" />
                  Open @DealClozrBot in Telegram
                </a>

                <div className="flex items-center gap-2">
                  <div className="flex-1 border border-white/10 rounded-xl bg-black/30 px-4 py-3 text-sm font-mono text-white/70 truncate">
                    @CloseBot
                  </div>
                  <button
                    onClick={() => {
                      navigator.clipboard.writeText("@CloseBot");
                      setTelegramCopied(true);
                      setTimeout(() => setTelegramCopied(false), 2000);
                    }}
                    className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-ash hover:text-white transition-all"
                  >
                    {telegramCopied ? <Check className="h-4 w-4 text-deal" /> : <Copy className="h-4 w-4" />}
                    {telegramCopied ? "Copied" : "Copy"}
                  </button>
                </div>
              </div>

              <div className="space-y-2 text-sm text-ash">
                <div className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4 text-deal" />
                  Works on any device — phone, tablet, desktop
                </div>
                <div className="flex items-center gap-2">
                  <Zap className="h-4 w-4 text-deal" />
                  Under 3 seconds per response
                </div>
              </div>

              <button
                onClick={() => setStep(2)}
                className="mt-6 w-full flex items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-ash hover:text-white hover:border-white/20 transition-all"
              >
                I'll do it later — skip for now
                <ArrowRight className="h-4 w-4" />
              </button>
            </div>
          </FadeIn>
        )}

        {/* ───────────── STEP 2: PAY PLAN ───────────── */}
        {step === 2 && (
          <FadeIn>
            <div className="loud-card rounded-2xl p-6 md:p-8">
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block mb-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-ash">Monthly Draw ($)</label>
                    <input type="number" min="0" value={draw} onChange={(e) => setDraw(e.target.value)} placeholder="2600" className={inputCls} />
                  </div>
                  <div>
                    <label className="block mb-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-ash">Commission Split (%)</label>
                    <input type="number" min="0" max="100" value={commPct} onChange={(e) => setCommPct(e.target.value)} placeholder="25" className={inputCls} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block mb-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-ash">Mini / Flat Rate ($)</label>
                    <input type="number" min="0" value={miniFlat} onChange={(e) => setMiniFlat(e.target.value)} placeholder="200" className={inputCls} />
                  </div>
                  <div>
                    <label className="block mb-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-ash">Volume Bonus ($)</label>
                    <input type="number" min="0" value={volumeBonus} onChange={(e) => setVolumeBonus(e.target.value)} placeholder="500" className={inputCls} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block mb-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-ash">CXI / Review Bonus ($)</label>
                    <input type="number" min="0" value={cxiBonus} onChange={(e) => setCxiBonus(e.target.value)} placeholder="300" className={inputCls} />
                  </div>
                  <div>
                    <label className="block mb-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-ash">Agent Name</label>
                    <input type="text" value={agentName} onChange={(e) => setAgentName(e.target.value)} placeholder="Closer" className={inputCls} />
                  </div>
                  <div>
                    <label className="block mb-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-ash">Voice</label>
                    <div className="flex gap-2">
                      <button
                        onClick={() => setAgentGender("female")}
                        className={`flex-1 rounded-xl border py-3 text-sm font-bold transition-all ${
                          agentGender === "female"
                            ? "border-pink-400/60 bg-pink-500/15 text-pink-300"
                            : "border-white/10 bg-white/[0.03] text-ash hover:border-white/20 hover:text-bone"
                        }`}
                      >
                        ♀ Female
                      </button>
                      <button
                        onClick={() => setAgentGender("male")}
                        className={`flex-1 rounded-xl border py-3 text-sm font-bold transition-all ${
                          agentGender === "male"
                            ? "border-blue-400/60 bg-blue-500/15 text-blue-300"
                            : "border-white/10 bg-white/[0.03] text-ash hover:border-white/20 hover:text-bone"
                        }`}
                      >
                        ♂ Male
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <button
                  onClick={() => setStep(1)}
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-ash hover:text-white transition-all"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(3)}
                  className="flex-1 btn-loud rounded-xl py-3 text-sm font-bold"
                >
                  Next — Style & Focus
                  <ArrowRight className="h-4 w-4 inline ml-1" />
                </button>
              </div>
            </div>
          </FadeIn>
        )}

        {/* ───────────── STEP 3: STYLE & FOCUS ───────────── */}
        {step === 3 && (
          <FadeIn>
            <div className="space-y-5">
              {/* Coaching Style */}
              <div className="loud-card rounded-2xl p-6">
                <label className="block mb-3 text-[10px] font-bold uppercase tracking-[0.1em] text-ash">Coaching Style</label>
                <div className="grid grid-cols-2 gap-2">
                  {COACHING_STYLES.map((cs) => (
                    <button
                      key={cs.value}
                      onClick={() => setCoachingStyle(cs.value)}
                      className={`text-left rounded-xl border px-4 py-3 text-sm transition-all ${
                        coachingStyle === cs.value
                          ? "border-deal/60 bg-deal/10 text-deal"
                          : "border-white/10 bg-white/[0.03] text-ash hover:border-white/20 hover:text-bone"
                      }`}
                    >
                      <div className="font-bold">{cs.label}</div>
                      <div className="text-[10px] text-muted mt-0.5">{cs.desc}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Focus */}
              <div className="loud-card rounded-2xl p-6">
                <label className="block mb-3 text-[10px] font-bold uppercase tracking-[0.1em] text-ash">Primary Focus</label>
                <div className="grid grid-cols-2 gap-2">
                  {FOCUS_OPTIONS.map((fo) => (
                    <button
                      key={fo.value}
                      onClick={() => setAgentFocus(fo.value)}
                      className={`text-left rounded-xl border px-4 py-3 text-sm font-medium transition-all ${
                        agentFocus === fo.value
                          ? "border-deal/60 bg-deal/10 text-deal"
                          : "border-white/10 bg-white/[0.03] text-ash hover:border-white/20 hover:text-bone"
                      }`}
                    >
                      {agentFocus === fo.value && <Check className="h-3 w-3 inline mr-1.5" strokeWidth={3} />}
                      {fo.label}
                    </button>
                  ))}
                </div>

                <div className="mt-4">
                  <label className="block mb-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-ash">Your #1 Goal This Month</label>
                  <input
                    type="text"
                    value={customGoals}
                    onChange={(e) => setCustomGoals(e.target.value)}
                    placeholder="e.g. Hit 15 units"
                    className={inputCls}
                  />
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setStep(2)}
                  className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-semibold text-ash hover:text-white transition-all"
                >
                  Back
                </button>
                <button
                  onClick={() => setStep(4)}
                  className="flex-1 btn-loud rounded-xl py-3 text-sm font-bold"
                >
                  Review & Finish
                  <ArrowRight className="h-4 w-4 inline ml-1" />
                </button>
              </div>
            </div>
          </FadeIn>
        )}

        {/* ───────────── STEP 4: CONFIRM ───────────── */}
        {step === 4 && (
          <FadeIn>
            <div className="loud-card rounded-2xl p-6 md:p-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-deal to-emerald-400 flex items-center justify-center shadow-[0_0_40px_rgba(16,185,129,0.3)]">
                  <Trophy className="h-10 w-10 text-white" />
                </div>
              </div>

              <h2 className="font-display text-3xl font-black text-white mb-2">
                You're Set Up
              </h2>
              <p className="text-sm text-ash mb-6 max-w-md mx-auto">
                Your agent knows your industry, pay plan, and coaching style.
                One tap and you're on your dashboard.
              </p>

              {/* Summary */}
              <div className="bg-white/[0.03] rounded-xl border border-white/10 p-4 mb-6 text-left space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted">Industry</span><span className="text-bone font-semibold">{INDUSTRIES.find(i => i.id === industry)?.label || "Auto Sales"}</span></div>
                {draw && <div className="flex justify-between"><span className="text-muted">Monthly Draw</span><span className="text-bone font-semibold">${parseInt(draw).toLocaleString()}</span></div>}
                {commPct && <div className="flex justify-between"><span className="text-muted">Commission Split</span><span className="text-bone font-semibold">{commPct}%</span></div>}
                <div className="flex justify-between"><span className="text-muted">Coaching Style</span><span className="text-bone font-semibold">{COACHING_STYLES.find(c => c.value === coachingStyle)?.label}</span></div>
                <div className="flex justify-between"><span className="text-muted">Primary Focus</span><span className="text-bone font-semibold">{FOCUS_OPTIONS.find(f => f.value === agentFocus)?.label}</span></div>
                {customGoals && <div className="flex justify-between"><span className="text-muted">Goal</span><span className="text-bone font-semibold">{customGoals}</span></div>}
              </div>

              {/* Telegram CTA — agent is already live */}
              <div className="bg-[#10B981]/[0.04] border border-[#10B981]/20 rounded-xl p-5 mb-6 text-center">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Smartphone className="h-5 w-5 text-[#10B981]" />
                  <h3 className="text-white font-bold text-sm">Your agent is already live</h3>
                </div>
                <p className="text-xs text-gray-400 mb-3">
                  Open Telegram and start closing. Your agent knows your pay plan, your style, and your floor.
                </p>
                <a
                  href="https://t.me/DealClozrBot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-[#0088cc] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#0099dd] transition-colors"
                >
                  <ExternalLink className="h-4 w-4" />
                  Open @DealClozrBot on Telegram
                </a>
                <p className="mt-2 text-[10px] text-gray-600">
                  Your dashboard tracks everything automatically after setup.
                </p>
              </div>

              {error && (
                <div className="flex items-center gap-2 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-400 mb-4">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {error}
                </div>
              )}

              <button
                onClick={saveAll}
                disabled={saving}
                className="btn-loud w-full flex items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold disabled:opacity-50"
              >
                {saving ? (
                  <><Loader2 className="h-4 w-4 animate-spin" /> Saving...</>
                ) : (
                  <><Zap className="h-4 w-4" /> Go to My Dashboard</>
                )}
              </button>
            </div>
          </FadeIn>
        )}
      </div>
    </div>
  );
}

// ─── Exports ─────────────────────────────────────────────────────────────────

export default function OnboardingPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center loud-bg">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-deal border-t-transparent" />
        </div>
      }
    >
      <OnboardingContent />
    </Suspense>
  );
}
