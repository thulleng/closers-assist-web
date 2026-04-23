"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Syne } from "next/font/google";
import { ArrowRight, ArrowLeft, Check, Zap, X } from "lucide-react";
import RealChat from "@/components/RealChat";

const syne = Syne({ subsets: ["latin"], weight: ["700", "800"], display: "swap" });

// ─── Types ───────────────────────────────────────────────────────────────────

// Form state — all strings for controlled inputs
interface OnboardingData {
  industry: string;
  firstName: string;
  lastName: string;
  company: string;
  yearsInSales: string;
  title: string;
  // Pay plan (stored as strings in form, serialised as numbers on save)
  draw: string;
  commissionSplit: string;
  miniFlat: string;
  volumeThreshold: string;
  volumeBonus: string;
  cxiBonus: string;
}

const EMPTY: OnboardingData = {
  industry: "",
  firstName: "",
  lastName: "",
  company: "",
  yearsInSales: "",
  title: "",
  draw: "",
  commissionSplit: "",
  miniFlat: "",
  volumeThreshold: "",
  volumeBonus: "",
  cxiBonus: "",
};

const STORAGE_KEY = "ca_onboarding";

const STEPS = [
  { id: 1, label: "Industry" },
  { id: 2, label: "Your Role" },
  { id: 3, label: "Pay Plan" },
  { id: 4, label: "First Question" },
];

// ─── Industry → dashboard route ───────────────────────────────────────────────

const INDUSTRY_DASHBOARD: Record<string, string> = {
  "auto":         "/dashboard/auto",
  "real-estate":  "/dashboard/real-estate",
  "insurance":    "/dashboard/insurance",
  "solar":        "/dashboard/solar",
  "saas":         "/dashboard/saas",
  "medical":      "/dashboard/medical",
  "retail":       "/dashboard/retail",
};

function getDashboard(industry: string) {
  return INDUSTRY_DASHBOARD[industry] ?? "/dashboard/auto";
}

// ─── Industry starter prompts ─────────────────────────────────────────────────

const INDUSTRY_STARTERS: Record<string, string[]> = {
  "auto": [
    "Customer says $499/mo is too high — what's my play?",
    "Calculate my commission: $800 front, $400 back, 25% split",
    "Write a follow-up text for a customer who ghosted after a test drive",
    "What's the best way to T.O. without losing the customer?",
  ],
  "real-estate": [
    "Buyer says the market is too hot and wants to wait — what's my play?",
    "Calculate my commission: $450K sale, 3% buyer side, 30% referral split",
    "Write a follow-up text for a client who ghosted after their third showing",
    "How do I handle a lowball offer without losing the client?",
  ],
  "solar": [
    "Homeowner says they'll wait until prices drop — what's my play?",
    "Calculate my commission on a $28K system with a $2K dealer fee",
    "Write a follow-up text for a homeowner who went cold after the proposal",
    "How do I overcome 'I need to talk to my spouse'?",
  ],
  "insurance": [
    "Prospect says their current rate is lower — what's my play?",
    "Calculate my commission: $1,200 annual premium at 15% first-year",
    "Write a follow-up text for a lead who went cold after the quote call",
    "How do I handle 'I already have coverage' without being pushy?",
  ],
  "saas": [
    "Prospect says they'll revisit next quarter — what's my play?",
    "Calculate my commission: $24K ACV at 8% with a 60-day close",
    "Write a follow-up email for a champion who went silent after the demo",
    "How do I navigate a multi-stakeholder deal without losing momentum?",
  ],
  "medical": [
    "Provider says they're locked into their current vendor — what's my play?",
    "Calculate my commission: $80K device sale at 6% with quarterly quota",
    "Write a follow-up email for a surgeon who went cold after the trial",
    "How do I get past the gatekeeper to reach the decision maker?",
  ],
  "mortgage": [
    "Borrower says they'll wait for rates to drop — what's my play?",
    "Calculate my commission: $380K loan at 1.2 points origination",
    "Write a follow-up text for a pre-approval client who went quiet",
    "How do I handle 'I'm also talking to three other lenders'?",
  ],
  "retail": [
    "Customer says they can get it cheaper online — what's my play?",
    "How do I upsell without making the customer feel pressured?",
    "Write a follow-up message for a customer who left without buying",
    "What's the best way to handle a return that becomes a new sale?",
  ],
  "home-services": [
    "Homeowner says my quote is too high — what's my play?",
    "Calculate my commission on a $12K HVAC install at 8%",
    "Write a follow-up text for a lead who went cold after the estimate",
    "How do I handle 'I need to get other quotes'?",
  ],
  "telecom": [
    "Customer wants to cancel — what's my retention play?",
    "Calculate my commission: $85/mo plan with $200 activation bonus",
    "Write a follow-up text for a prospect who was interested but went quiet",
    "How do I upsell from a base plan to a premium bundle?",
  ],
  "staffing": [
    "Client says they'll hire directly — what's my play?",
    "Calculate my commission: $90K placement at 18% contingency",
    "Write a follow-up email for a hiring manager who went cold",
    "How do I handle 'your rates are higher than the other agency'?",
  ],
  "finance": [
    "Prospect says they're happy with their current advisor — what's my play?",
    "Calculate my commission: $250K AUM at 1% advisory fee",
    "Write a follow-up for a prospect who ghosted after the discovery call",
    "How do I handle objections about market volatility?",
  ],
  "travel": [
    "Guest says they found a cheaper rate online — what's my play?",
    "Calculate my commission on a $6K group booking at 10%",
    "Write a follow-up for a couple who went quiet after the proposal",
    "How do I upsell a room upgrade without feeling pushy?",
  ],
  "legal": [
    "Prospect says they'll handle it themselves — what's my play?",
    "Walk me through how to structure a contingency fee conversation",
    "Write a follow-up for a potential client who went cold after the consult",
    "How do I handle 'another firm quoted me less'?",
  ],
  "education": [
    "Student says they can't afford the program — what's my play?",
    "Calculate my commission: $8,500 enrollment at 12%",
    "Write a follow-up for a prospect who went quiet after the info session",
    "How do I overcome 'I need to think about it' on an enrollment call?",
  ],
  "fitness": [
    "Prospect says they're not ready to commit — what's my play?",
    "Calculate my commission: $1,200 annual membership at 15%",
    "Write a follow-up text for a trial member who didn't convert",
    "How do I handle 'I can just work out at home'?",
  ],
  "restaurant": [
    "How do I upsell dessert without being pushy?",
    "Guest is upset about wait time — what's my play to save the experience?",
    "Write a follow-up message for a large party booking that went quiet",
    "How do I turn a complaint into a loyal customer?",
  ],
  "other": [
    "Customer says my price is too high — what's my play?",
    "How do I calculate my commission on a typical deal?",
    "Write a follow-up message for a prospect who went cold",
    "What's the best way to handle objections without being pushy?",
  ],
};

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
            value={data.company}
            onChange={(e) => update("company", e.target.value)}
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
  const draw            = parseFloat(data.draw)            || 0;
  const commissionSplit = parseFloat(data.commissionSplit) || 0;
  const miniFlat        = parseFloat(data.miniFlat)        || 0;
  const volumeThreshold = parseFloat(data.volumeThreshold) || 0;
  const volumeBonus     = parseFloat(data.volumeBonus)     || 0;
  const cxiBonus        = parseFloat(data.cxiBonus)        || 0;

  const perDeal    = Math.max(miniFlat, AVG_FRONT * (commissionSplit / 100));
  const rawComm    = perDeal * units;
  const commission = Math.max(draw, rawComm);
  const volEarned  = volumeThreshold > 0 && units >= volumeThreshold ? volumeBonus : 0;
  const total      = commission + volEarned + cxiBonus;

  return { commission, volEarned, cxiBonus, total };
}

function PayPlanPreview({ data }: { data: OnboardingData }) {
  const hasAny = data.draw || data.commissionSplit || data.miniFlat || data.volumeBonus || data.cxiBonus;
  const { commission, volEarned, cxiBonus, total } = calcPayPlan(data, 5);
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
          <span className={`font-mono font-medium ${cxiBonus > 0 ? "text-gold-light" : "text-muted"}`}>
            {hasAny ? fmt(cxiBonus) : "—"}
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
          <input type="number" min="0" max="100" value={data.commissionSplit} onChange={(e) => update("commissionSplit", e.target.value)}
            placeholder="25" className={inputCls} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <FieldLabel>Mini / Flat Rate ($)</FieldLabel>
          <input type="number" min="0" value={data.miniFlat} onChange={(e) => update("miniFlat", e.target.value)}
            placeholder="200" className={inputCls} />
        </div>
        <div>
          <FieldLabel>Volume Bonus Threshold (units)</FieldLabel>
          <input type="number" min="0" value={data.volumeThreshold} onChange={(e) => update("volumeThreshold", e.target.value)}
            placeholder="10" className={inputCls} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <FieldLabel>Volume Bonus Amount ($)</FieldLabel>
          <input type="number" min="0" value={data.volumeBonus} onChange={(e) => update("volumeBonus", e.target.value)}
            placeholder="500" className={inputCls} />
        </div>
        <div>
          <FieldLabel>CSI / CXI Bonus ($)</FieldLabel>
          <input type="number" min="0" value={data.cxiBonus} onChange={(e) => update("cxiBonus", e.target.value)}
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

// ─── Step 4 — Go Live ────────────────────────────────────────────────────────

function Step4GoLive({ data, onFinish }: {
  data: OnboardingData;
  onFinish: () => void;
}) {
  const starters = INDUSTRY_STARTERS[data.industry] ?? INDUSTRY_STARTERS["other"];

  return (
    <div className="space-y-5">
      <RealChat industry={data.industry || "automotive"} starters={starters} />

      <button
        type="button"
        onClick={onFinish}
        className="btn-loud w-full flex items-center justify-center gap-2 rounded-xl py-4 text-base font-bold"
      >
        Go to my Dashboard <ArrowRight size={17} />
      </button>
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
    if (step === 1) return data.firstName.trim() !== "" && data.lastName.trim() !== "" && data.company.trim() !== "" && data.title.trim() !== "";
    if (step === 2) return true; // all pay plan fields optional
    if (step === 3) return true; // step 4 has its own finish button
    return true;
  }

  function handleNext() {
    if (!canAdvance()) return;
    if (isLastStep) {
      handleFinish();
    } else {
      setStep((s) => s + 1);
    }
  }

  function handleFinish() {
    setCompleting(true);
    // Resolve human-readable industry label
    const industryLabel =
      ALL_INDUSTRIES.find((i) => i.value === data.industry)?.label ?? data.industry;

    // Write exact schema — numeric fields as numbers, metadata fields added
    const payload = {
      industry:         data.industry,
      industryLabel,
      firstName:        data.firstName,
      lastName:         data.lastName,
      company:          data.company,
      yearsInSales:     data.yearsInSales,
      title:            data.title,
      draw:             parseFloat(data.draw)            || 0,
      commissionSplit:  parseFloat(data.commissionSplit) || 0,
      miniFlat:         parseFloat(data.miniFlat)        || 0,
      volumeThreshold:  parseFloat(data.volumeThreshold) || 0,
      volumeBonus:      parseFloat(data.volumeBonus)     || 0,
      cxiBonus:         parseFloat(data.cxiBonus)        || 0,
      completedAt:      new Date().toISOString(),
    };

    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    router.push(getDashboard(data.industry));
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
      title: "Your agent is ready.",
      sub: "Ask anything. It knows your industry, your pay plan, your scripts.",
    },
  };

  const stepContent: Record<number, React.ReactNode> = {
    0: <Step1Industry value={data.industry} onPick={handleIndustryPick} />,
    1: <Step2Role data={data} update={update} />,
    2: <Step3PayPlan data={data} update={update} />,
    3: <Step4GoLive data={data} onFinish={handleFinish} />,
  };

  return (
    <div className="min-h-screen bg-pit flex flex-col">
      {/* Progress bar */}
      <div className="h-1 w-full bg-white/5">
        <div className="h-full bg-deal transition-all duration-500 ease-out" style={{ width: `${progress}%` }} />
      </div>

      {/* Step indicators */}
      <div className="flex items-center justify-center pt-8 pb-2 px-6">
        {STEPS.map((s, i) => {
          const done    = i < step;
          const current = i === step;
          return (
            <div key={s.id} className="flex items-center">
              {/* Dot + label */}
              <div className="flex flex-col items-center gap-1.5">
                <div className={`flex h-4 w-4 items-center justify-center rounded-full border-2 transition-all duration-300 ${
                  done    ? "border-deal bg-deal" :
                  current ? "border-deal bg-deal" :
                            "border-iron bg-transparent"
                }`}>
                  {done && <Check size={9} strokeWidth={3.5} className="text-white" />}
                </div>
                <span className={`text-[10px] font-medium tracking-wide whitespace-nowrap transition-colors duration-300 ${
                  current ? "text-deal" : done ? "text-deal/60" : "text-muted"
                }`}>
                  {s.label}
                </span>
              </div>

              {/* Connecting line */}
              {i < STEPS.length - 1 && (
                <div className={`mb-4 h-px w-12 sm:w-20 transition-all duration-500 ${done ? "bg-deal/50" : "bg-iron"}`} />
              )}
            </div>
          );
        })}
      </div>

      {/* Content */}
      <div className="flex flex-1 items-start justify-center px-6 pt-8 pb-20">
        <div className={`w-full ${step === 3 ? "max-w-2xl" : "max-w-lg"}`}>
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

          {/* Navigation — hidden on step 0 (auto-advances) and step 4 (has its own CTA) */}
          {step > 0 && step < 3 && (
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
