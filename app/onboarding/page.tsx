"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Syne } from "next/font/google";
import { ArrowRight, ArrowLeft, Check, Zap, X } from "lucide-react";

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"], display: "swap" });

// ─── Types ───────────────────────────────────────────────────────────────────

interface OnboardingData {
  industry: string;
  firstName: string;
  lastName: string;
  storeName: string;
  yearsInSales: string;
  title: string;
  // Pay plan
  draw: string;
  split: string;
  mini: string;
  volThreshold: string;
  volBonus: string;
  csiBonus: string;
  firstGoal: string;
}

const EMPTY: OnboardingData = {
  industry: "",
  firstName: "",
  lastName: "",
  storeName: "",
  yearsInSales: "",
  title: "",
  draw: "",
  split: "",
  mini: "",
  volThreshold: "",
  volBonus: "",
  csiBonus: "",
  firstGoal: "",
};

const STORAGE_KEY = "ca_onboarding";

const STEPS = [
  { id: 1, label: "Industry" },
  { id: 2, label: "You" },
  { id: 3, label: "Pay Plan" },
  { id: 4, label: "First Goal" },
];

// ─── Industry data ────────────────────────────────────────────────────────────

const FEATURED_INDUSTRIES = [
  { value: "auto",        icon: "🚗", label: "Automotive",   desc: "Units, tiers, front/back gross, CXI" },
  { value: "real-estate", icon: "🏠", label: "Real Estate",  desc: "Commissions, splits, GCI, pipeline" },
  { value: "solar",       icon: "☀️", label: "Solar",        desc: "Installs, ESAT, dealer fees, adders" },
  { value: "insurance",   icon: "🛡️", label: "Insurance",    desc: "Policies, premium, retention, bonus" },
  { value: "saas",        icon: "💻", label: "SaaS",         desc: "ARR, churn, expansion, quota attainment" },
];

const ALL_INDUSTRIES = [
  { value: "auto",         icon: "🚗", label: "Automotive" },
  { value: "real-estate",  icon: "🏠", label: "Real Estate" },
  { value: "solar",        icon: "☀️", label: "Solar" },
  { value: "insurance",    icon: "🛡️", label: "Insurance" },
  { value: "saas",         icon: "💻", label: "SaaS / Tech" },
  { value: "medical",      icon: "🏥", label: "Medical / Healthcare" },
  { value: "mortgage",     icon: "🏦", label: "Mortgage & Lending" },
  { value: "finance",      icon: "💹", label: "Financial Services" },
  { value: "retail",       icon: "🛍️", label: "Retail" },
  { value: "home-services",icon: "🔧", label: "Home Services" },
  { value: "telecom",      icon: "📡", label: "Telecommunications" },
  { value: "staffing",     icon: "👥", label: "Staffing & Recruiting" },
  { value: "travel",       icon: "✈️", label: "Travel & Hospitality" },
  { value: "legal",        icon: "⚖️", label: "Legal Services" },
  { value: "education",    icon: "📚", label: "Education" },
  { value: "fitness",      icon: "💪", label: "Fitness & Wellness" },
  { value: "restaurant",   icon: "🍽️", label: "Restaurant & Food" },
  { value: "other",        icon: "⚡", label: "Other" },
];

// ─── Option sets ──────────────────────────────────────────────────────────────

const ROLES = [
  { value: "rep",     label: "Sales Rep" },
  { value: "manager", label: "Sales Manager" },
  { value: "finance", label: "Finance Manager" },
  { value: "gsm",     label: "GSM / GM" },
];

const CRMS = ["VinSolutions", "DealerSocket", "Reynolds & Reynolds", "Elead", "CDK", "Other", "None"];

const COMMISSION_TYPES = [
  { value: "flat",       label: "Flat per deal" },
  { value: "front-pct",  label: "% of front gross" },
  { value: "total-pct",  label: "% of total gross" },
  { value: "salary",     label: "Salary + bonus" },
];

const GOALS = [
  { value: "objections", label: "🎯  Close more objections", sub: "Get ranked plays for every push-back" },
  { value: "pay-plan",   label: "💰  Know my pay plan math",  sub: "Real-time commission calc on every deal" },
  { value: "follow-up",  label: "📲  Follow up dead leads",   sub: "AI-drafted texts that actually get replies" },
  { value: "all",        label: "🔥  All of the above",        sub: "Let the agent decide based on the moment" },
];

// ─── Shared field components ───────────────────────────────────────────────────

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block mb-2 text-ash font-medium" style={{ fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase" }}>
      {children}
    </label>
  );
}

function TextInput({ value, onChange, placeholder, autoFocus }: {
  value: string; onChange: (v: string) => void; placeholder?: string; autoFocus?: boolean;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      autoFocus={autoFocus}
      className="w-full rounded-xl border border-iron bg-slate px-4 py-3.5 text-bone placeholder-muted text-base outline-none focus:border-deal focus:ring-1 focus:ring-deal/40 transition-all"
    />
  );
}

function PillGrid({ options, value, onChange, cols = 2 }: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
  cols?: number;
}) {
  return (
    <div className="grid gap-3" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <button key={opt.value} type="button" onClick={() => onChange(opt.value)}
            className={`rounded-xl border px-4 py-3 text-sm font-medium text-left transition-all ${
              active ? "border-deal bg-deal/10 text-deal" : "border-iron bg-slate text-ash hover:border-white/25 hover:text-bone"
            }`}
          >
            {active && <span className="mr-1.5">✓</span>}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

// ─── More Industries Modal ─────────────────────────────────────────────────────

function MoreModal({ current, onPick, onClose }: {
  current: string;
  onPick: (v: string) => void;
  onClose: () => void;
}) {
  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      <div
        className="relative z-10 w-full max-w-lg rounded-2xl border border-iron bg-slate p-6 max-h-[80vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className={`${syne.className} text-lg font-bold text-white`}>All Industries</h2>
          <button type="button" onClick={onClose} className="text-ash hover:text-bone transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2.5">
          {ALL_INDUSTRIES.map((ind) => {
            const active = current === ind.value;
            return (
              <button
                key={ind.value}
                type="button"
                onClick={() => onPick(ind.value)}
                className={`flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium text-left transition-all ${
                  active ? "border-deal bg-deal/10 text-deal" : "border-iron bg-pit text-ash hover:border-white/20 hover:text-bone"
                }`}
              >
                <span className="text-xl">{ind.icon}</span>
                <span>{ind.label}</span>
                {active && <Check size={13} className="ml-auto shrink-0" />}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Step 1 — Industry Picker ──────────────────────────────────────────────────

function Step1Industry({ value, onPick }: { value: string; onPick: (v: string) => void }) {
  const [modalOpen, setModalOpen] = useState(false);
  const closeModal = useCallback(() => setModalOpen(false), []);

  function handlePickFromModal(v: string) {
    setModalOpen(false);
    onPick(v);
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-3">
        {FEATURED_INDUSTRIES.map((ind) => {
          const active = value === ind.value;
          return (
            <button
              key={ind.value}
              type="button"
              onClick={() => onPick(ind.value)}
              className={`flex flex-col items-start gap-2 rounded-2xl border p-5 text-left transition-all duration-200 ${
                active
                  ? "border-deal bg-deal/10"
                  : "border-iron bg-slate hover:border-white/20"
              }`}
            >
              <span style={{ fontSize: 40, lineHeight: 1 }}>{ind.icon}</span>
              <div>
                <div className={`font-bold text-base leading-tight ${active ? "text-deal" : "text-white"}`}>
                  {ind.label}
                </div>
                <div className="text-xs text-ash mt-0.5 leading-snug">{ind.desc}</div>
              </div>
              {active && (
                <div className="ml-auto mt-auto self-end">
                  <Check size={15} className="text-deal" />
                </div>
              )}
            </button>
          );
        })}

        {/* More → card */}
        <button
          type="button"
          onClick={() => setModalOpen(true)}
          className="flex flex-col items-start justify-between gap-2 rounded-2xl border border-iron bg-slate p-5 text-left hover:border-white/20 transition-all duration-200"
        >
          <span style={{ fontSize: 40, lineHeight: 1 }}>➕</span>
          <div>
            <div className="font-bold text-base text-white">More →</div>
            <div className="text-xs text-ash mt-0.5">13 more industries</div>
          </div>
        </button>
      </div>

      {modalOpen && (
        <MoreModal current={value} onPick={handlePickFromModal} onClose={closeModal} />
      )}
    </>
  );
}

// ─── Step 2 — Your Role ───────────────────────────────────────────────────────

const YEARS_OPTIONS = ["<1", "1–3", "3–5", "5–10", "10+"];

function Step2Role({ data, update }: {
  data: OnboardingData;
  update: (k: keyof OnboardingData, v: string) => void;
}) {
  const inputCls =
    "w-full rounded-xl border border-white/20 bg-white/[0.08] px-4 py-3.5 text-white placeholder:text-ash text-base outline-none focus:border-deal focus:ring-1 focus:ring-deal/40 transition-all";

  return (
    <div className="space-y-4">
      {/* First Name / Last Name */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <FieldLabel>First Name *</FieldLabel>
          <input
            type="text"
            value={data.firstName}
            onChange={(e) => update("firstName", e.target.value)}
            placeholder="Thul"
            autoFocus
            className={inputCls}
          />
        </div>
        <div>
          <FieldLabel>Last Name *</FieldLabel>
          <input
            type="text"
            value={data.lastName}
            onChange={(e) => update("lastName", e.target.value)}
            placeholder="Nguyen"
            className={inputCls}
          />
        </div>
      </div>

      {/* Company / Years in Sales */}
      <div className="grid grid-cols-2 gap-3">
        <div>
          <FieldLabel>Company / Dealership *</FieldLabel>
          <input
            type="text"
            value={data.storeName}
            onChange={(e) => update("storeName", e.target.value)}
            placeholder="Sun Toyota"
            className={inputCls}
          />
        </div>
        <div>
          <FieldLabel>Years in Sales</FieldLabel>
          <select
            value={data.yearsInSales}
            onChange={(e) => update("yearsInSales", e.target.value)}
            className={`${inputCls} cursor-pointer appearance-none`}
            style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%239CA3AF' stroke-width='2'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`, backgroundRepeat: "no-repeat", backgroundPosition: "right 16px center" }}
          >
            <option value="" disabled className="bg-slate">Select…</option>
            {YEARS_OPTIONS.map((y) => (
              <option key={y} value={y} className="bg-slate text-white">{y} years</option>
            ))}
          </select>
        </div>
      </div>

      {/* Your Title */}
      <div>
        <FieldLabel>Your Title *</FieldLabel>
        <input
          type="text"
          value={data.title}
          onChange={(e) => update("title", e.target.value)}
          placeholder="e.g. Sales Rep, Finance Manager, Sales Manager"
          className={inputCls}
        />
      </div>
    </div>
  );
}

// ─── Step 3 — Pay Plan ────────────────────────────────────────────────────────

const AVG_FRONT = 1200; // assumed avg front gross per deal for the preview

function calcPayPlan(data: OnboardingData, units = 5) {
  const draw         = parseFloat(data.draw)         || 0;
  const split        = parseFloat(data.split)        || 0;
  const mini         = parseFloat(data.mini)         || 0;
  const volThreshold = parseFloat(data.volThreshold) || 0;
  const volBonus     = parseFloat(data.volBonus)     || 0;
  const csiBonus     = parseFloat(data.csiBonus)     || 0;

  const perDeal      = Math.max(mini, AVG_FRONT * (split / 100));
  const rawComm      = perDeal * units;
  const commission   = Math.max(draw, rawComm);
  const volEarned    = volThreshold > 0 && units >= volThreshold ? volBonus : 0;
  const total        = commission + volEarned + csiBonus;

  return { commission, volEarned, csiBonus, total };
}

function PayPlanPreview({ data }: { data: OnboardingData }) {
  const hasAny = data.draw || data.split || data.mini || data.volBonus || data.csiBonus;
  const { commission, volEarned, csiBonus, total } = calcPayPlan(data, 5);
  const fmt = (n: number) => "$" + Math.round(n).toLocaleString();

  return (
    <div className={`rounded-2xl border transition-all duration-300 overflow-hidden ${hasAny ? "border-deal/40 bg-deal/5" : "border-iron bg-slate/50"}`}>
      <div className="px-5 py-4 border-b border-white/6 flex items-center justify-between">
        <span className="font-mono text-[10px] font-semibold uppercase tracking-[1.5px] text-ash">
          Estimated: 5-unit month
        </span>
        {hasAny && <span className="text-[10px] text-muted">~${AVG_FRONT.toLocaleString()} avg front</span>}
      </div>
      <div className="px-5 py-4 space-y-2.5">
        <div className="flex justify-between text-sm">
          <span className="text-ash">Commission</span>
          <span className={`font-mono font-medium ${hasAny ? "text-bone" : "text-muted"}`}>
            {hasAny ? fmt(commission) : "—"}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-ash">Volume Bonus</span>
          <span className={`font-mono font-medium ${volEarned > 0 ? "text-deal" : "text-muted"}`}>
            {hasAny ? fmt(volEarned) : "—"}
          </span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-ash">CSI / CXI Bonus</span>
          <span className={`font-mono font-medium ${csiBonus > 0 ? "text-gold-light" : "text-muted"}`}>
            {hasAny ? fmt(csiBonus) : "—"}
          </span>
        </div>
        <div className="h-px bg-white/8 my-1" />
        <div className="flex justify-between">
          <span className="text-sm font-semibold text-white">Total</span>
          <span className={`font-mono text-lg font-bold ${hasAny ? "text-deal" : "text-muted"}`}>
            {hasAny ? fmt(total) : "$0"}
          </span>
        </div>
      </div>
    </div>
  );
}

function Step3PayPlan({ data, update }: {
  data: OnboardingData;
  update: (k: keyof OnboardingData, v: string) => void;
}) {
  const inputCls =
    "w-full rounded-xl border border-white/20 bg-white/[0.08] px-4 py-3.5 text-white placeholder:text-ash text-base outline-none focus:border-deal focus:ring-1 focus:ring-deal/40 transition-all";

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <div>
          <FieldLabel>Monthly Draw ($)</FieldLabel>
          <input type="number" min="0" value={data.draw} onChange={(e) => update("draw", e.target.value)}
            placeholder="0" className={inputCls} />
        </div>
        <div>
          <FieldLabel>Commission Split (%)</FieldLabel>
          <input type="number" min="0" max="100" value={data.split} onChange={(e) => update("split", e.target.value)}
            placeholder="25" className={inputCls} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <FieldLabel>Mini / Flat Rate ($)</FieldLabel>
          <input type="number" min="0" value={data.mini} onChange={(e) => update("mini", e.target.value)}
            placeholder="200" className={inputCls} />
        </div>
        <div>
          <FieldLabel>Volume Bonus Threshold (units)</FieldLabel>
          <input type="number" min="0" value={data.volThreshold} onChange={(e) => update("volThreshold", e.target.value)}
            placeholder="10" className={inputCls} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <FieldLabel>Volume Bonus Amount ($)</FieldLabel>
          <input type="number" min="0" value={data.volBonus} onChange={(e) => update("volBonus", e.target.value)}
            placeholder="500" className={inputCls} />
        </div>
        <div>
          <FieldLabel>CSI / CXI Bonus ($)</FieldLabel>
          <input type="number" min="0" value={data.csiBonus} onChange={(e) => update("csiBonus", e.target.value)}
            placeholder="300" className={inputCls} />
        </div>
      </div>

      {/* Live preview */}
      <div className="pt-2">
        <PayPlanPreview data={data} />
        <p className="mt-2 text-center text-xs text-muted">
          Assumes ~$1,200 avg front gross · updates as you type
        </p>
      </div>
    </div>
  );
}

// ─── Step 4 — First Goal ──────────────────────────────────────────────────────

function Step4Goal({ data, update }: {
  data: OnboardingData;
  update: (k: keyof OnboardingData, v: string) => void;
}) {
  return (
    <div className="space-y-3">
      {GOALS.map((goal) => {
        const active = data.firstGoal === goal.value;
        return (
          <button key={goal.value} type="button" onClick={() => update("firstGoal", goal.value)}
            className={`w-full rounded-xl border px-5 py-4 text-left transition-all ${
              active ? "border-deal bg-deal/10" : "border-iron bg-slate hover:border-white/20"
            }`}
          >
            <div className={`font-semibold text-base mb-0.5 ${active ? "text-deal" : "text-bone"}`}>{goal.label}</div>
            <div className="text-sm text-ash">{goal.sub}</div>
          </button>
        );
      })}
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<OnboardingData>(EMPTY);
  const [completing, setCompleting] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setData(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const update = (key: keyof OnboardingData, value: string) =>
    setData((prev) => ({ ...prev, [key]: value }));

  // Step 1: auto-advance 300ms after industry pick
  function handleIndustryPick(v: string) {
    update("industry", v);
    setTimeout(() => setStep(1), 300);
  }

  const isLastStep = step === STEPS.length - 1;
  const progress = ((step + 1) / STEPS.length) * 100;

  function canAdvance() {
    if (step === 0) return data.industry !== "";
    if (step === 1) return data.firstName.trim() !== "" && data.lastName.trim() !== "" && data.storeName.trim() !== "" && data.title.trim() !== "";
    if (step === 2) return true; // all pay plan fields optional
    if (step === 3) return data.firstGoal !== "";
    return true;
  }

  function handleNext() {
    if (!canAdvance()) return;
    if (isLastStep) {
      setCompleting(true);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      router.push("/dashboard/auto");
    } else {
      setStep((s) => s + 1);
    }
  }

  const headings: Record<number, { title: string; sub: string }> = {
    0: {
      title: "What do you sell?",
      sub: "Your agent auto-loads the vocabulary, scripts, and pay plan math for your world.",
    },
    1: {
      title: "Tell us about your floor.",
      sub: "Takes 60 seconds. Makes your agent 10x more useful.",
    },
    2: {
      title: "How do you get paid?",
      sub: "Your agent uses this to calculate your real commission on every deal — instantly.",
    },
    3: {
      title: "What do you want first?",
      sub: "Pick one focus. You can change this anytime in settings.",
    },
  };

  const stepContent: Record<number, React.ReactNode> = {
    0: <Step1Industry value={data.industry} onPick={handleIndustryPick} />,
    1: <Step2Role data={data} update={update} />,
    2: <Step3PayPlan data={data} update={update} />,
    3: <Step4Goal data={data} update={update} />,
  };

  return (
    <div className="min-h-screen bg-pit flex flex-col">
      {/* Progress bar */}
      <div className="h-1 w-full bg-white/5">
        <div className="h-full bg-deal transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
      </div>

      {/* Step indicators */}
      <div className="flex items-center justify-center gap-2 pt-8 pb-2 px-6">
        {STEPS.map((s, i) => {
          const done    = i < step;
          const current = i === step;
          return (
            <div key={s.id} className="flex items-center gap-2">
              <div className="flex flex-col items-center gap-1">
                <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
                  done    ? "bg-deal text-white" :
                  current ? "border-2 border-deal text-deal bg-deal/10" :
                            "border border-white/15 text-muted bg-white/[0.04]"
                }`}>
                  {done ? <Check size={14} strokeWidth={3} /> : s.id}
                </div>
                <span className={`text-[10px] font-medium tracking-wider uppercase ${
                  current ? "text-deal" : done ? "text-deal/60" : "text-muted"
                }`}>
                  {s.label}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div className={`mb-4 h-px w-10 sm:w-16 transition-all duration-500 ${done ? "bg-deal/50" : "bg-white/10"}`} />
              )}
            </div>
          );
        })}
      </div>

      {/* Content */}
      <div className="flex flex-1 items-start justify-center px-6 pt-8 pb-20">
        <div className="w-full max-w-lg">
          {/* Heading */}
          <div className="mb-8">
            <h1
              className={`${syne.className} text-white leading-tight mb-2`}
              style={{ fontSize: 48, fontWeight: 800, letterSpacing: "-1px" }}
            >
              {headings[step].title}
            </h1>
            <p className="text-ash text-base">{headings[step].sub}</p>
          </div>

          {/* Step content with fade */}
          <div className="animate-fade-in" key={step}>
            {stepContent[step]}
          </div>

          {/* Navigation — hidden on step 0 (auto-advances on card tap) */}
          {step > 0 && (
            <div className="mt-8">
              {/* Steps 2 and 3 (index 1 and 2): full-width Next → with Back below */}
              {(step === 1 || step === 2) ? (
                <div className="space-y-3">
                  <button type="button" onClick={handleNext} disabled={!canAdvance() || completing}
                    className={`btn-loud w-full flex items-center justify-center gap-2 rounded-xl py-4 text-base font-bold transition-all ${
                      !canAdvance() || completing ? "opacity-40 cursor-not-allowed" : ""
                    }`}
                  >
                    Next <ArrowRight size={17} />
                  </button>
                  <div className="flex items-center justify-between">
                    <button type="button" onClick={() => setStep((s) => s - 1)}
                      className="flex items-center gap-1.5 text-sm text-ash hover:text-bone transition-colors py-2"
                    >
                      <ArrowLeft size={15} /> Back
                    </button>
                    {/* Skip only on pay plan step (index 2) */}
                    {step === 2 && (
                      <button type="button" onClick={handleNext}
                        className="text-sm text-ash hover:text-bone transition-colors py-2 underline underline-offset-2"
                      >
                        Skip for now →
                      </button>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <button type="button" onClick={() => setStep((s) => s - 1)}
                    className="flex items-center gap-2 text-sm text-ash hover:text-bone transition-colors"
                  >
                    <ArrowLeft size={16} /> Back
                  </button>
                  <button type="button" onClick={handleNext} disabled={!canAdvance() || completing}
                    className={`btn-loud flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold transition-all ${
                      !canAdvance() || completing ? "opacity-40 cursor-not-allowed" : ""
                    }`}
                  >
                    {completing ? (
                      <><Zap size={16} className="animate-pulse" /> Setting up your agent...</>
                    ) : isLastStep ? (
                      <><Zap size={16} /> Launch my agent</>
                    ) : (
                      <>Continue <ArrowRight size={16} /></>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Step 1 skip */}
          {step === 0 && (
            <p className="text-center mt-8 text-xs text-muted">
              Already set up?{" "}
              <button type="button" onClick={() => router.push("/dashboard/auto")}
                className="text-ash underline underline-offset-2 hover:text-bone transition-colors"
              >
                Go to dashboard
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
