"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, ArrowLeft, Check, Zap } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

interface OnboardingData {
  // Step 1 — You
  firstName: string;
  role: string;
  industry: string;
  // Step 2 — Your Store
  storeName: string;
  city: string;
  state: string;
  crm: string;
  // Step 3 — Pay Plan
  commissionType: string;
  monthlyGoal: string;
  avgDeal: string;
  // Step 4 — First Goal
  firstGoal: string;
}

const EMPTY: OnboardingData = {
  firstName: "",
  role: "",
  industry: "",
  storeName: "",
  city: "",
  state: "",
  crm: "",
  commissionType: "",
  monthlyGoal: "",
  avgDeal: "",
  firstGoal: "",
};

const STORAGE_KEY = "ca_onboarding";

const STEPS = [
  { id: 1, label: "You" },
  { id: 2, label: "Your Store" },
  { id: 3, label: "Pay Plan" },
  { id: 4, label: "First Goal" },
];

// ─── Option Sets ─────────────────────────────────────────────────────────────

const ROLES = [
  { value: "rep",      label: "Sales Rep" },
  { value: "manager",  label: "Sales Manager" },
  { value: "finance",  label: "Finance Manager" },
  { value: "gsm",      label: "GSM / GM" },
];

const INDUSTRIES = [
  { value: "auto",        label: "🚗  Auto" },
  { value: "real-estate", label: "🏠  Real Estate" },
  { value: "insurance",   label: "🛡️  Insurance" },
  { value: "solar",       label: "☀️  Solar" },
  { value: "other",       label: "⚡  Other" },
];

const CRMS = [
  "VinSolutions",
  "DealerSocket",
  "Reynolds & Reynolds",
  "Elead",
  "CDK",
  "Other",
  "None",
];

const COMMISSION_TYPES = [
  { value: "flat",        label: "Flat per deal" },
  { value: "front-pct",  label: "% of front gross" },
  { value: "total-pct",  label: "% of total gross" },
  { value: "salary",     label: "Salary + bonus" },
];

const GOALS = [
  { value: "objections",  label: "🎯  Close more objections", sub: "Get ranked plays for every push-back" },
  { value: "pay-plan",    label: "💰  Know my pay plan math", sub: "Real-time commission calc on every deal" },
  { value: "follow-up",  label: "📲  Follow up dead leads",   sub: "AI-drafted texts that actually get replies" },
  { value: "all",         label: "🔥  All of the above",       sub: "Let the agent decide based on the moment" },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <label className="block text-sm font-medium text-ash mb-2 tracking-wide uppercase" style={{ letterSpacing: "0.06em", fontSize: 11 }}>
      {children}
    </label>
  );
}

function TextInput({
  value,
  onChange,
  placeholder,
  autoFocus,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  autoFocus?: boolean;
}) {
  return (
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      autoFocus={autoFocus}
      className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3.5 text-bone placeholder-muted text-base outline-none focus:border-deal focus:ring-1 focus:ring-deal/50 transition-all"
    />
  );
}

function PillGrid({
  options,
  value,
  onChange,
  cols = 2,
}: {
  options: { value: string; label: string }[];
  value: string;
  onChange: (v: string) => void;
  cols?: number;
}) {
  return (
    <div className={`grid gap-3`} style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
      {options.map((opt) => {
        const active = value === opt.value;
        return (
          <button
            key={opt.value}
            type="button"
            onClick={() => onChange(opt.value)}
            className={`rounded-xl border px-4 py-3 text-sm font-medium text-left transition-all ${
              active
                ? "border-deal bg-deal/10 text-deal"
                : "border-white/10 bg-white/4 text-ash hover:border-white/25 hover:text-bone"
            }`}
          >
            {active && <span className="mr-1.5 text-deal">✓</span>}
            {opt.label}
          </button>
        );
      })}
    </div>
  );
}

function GoalCard({
  goal,
  active,
  onClick,
}: {
  goal: (typeof GOALS)[number];
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`w-full rounded-xl border px-5 py-4 text-left transition-all ${
        active
          ? "border-deal bg-deal/10"
          : "border-white/10 bg-white/4 hover:border-white/25"
      }`}
    >
      <div className={`font-semibold text-base mb-0.5 ${active ? "text-deal" : "text-bone"}`}>
        {goal.label}
      </div>
      <div className="text-sm text-ash">{goal.sub}</div>
    </button>
  );
}

// ─── Steps ───────────────────────────────────────────────────────────────────

function Step1({ data, update }: { data: OnboardingData; update: (k: keyof OnboardingData, v: string) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <FieldLabel>First name</FieldLabel>
        <TextInput
          value={data.firstName}
          onChange={(v) => update("firstName", v)}
          placeholder="e.g. Thul"
          autoFocus
        />
      </div>

      <div>
        <FieldLabel>Your role</FieldLabel>
        <PillGrid
          options={ROLES}
          value={data.role}
          onChange={(v) => update("role", v)}
          cols={2}
        />
      </div>

      <div>
        <FieldLabel>Your industry</FieldLabel>
        <PillGrid
          options={INDUSTRIES}
          value={data.industry}
          onChange={(v) => update("industry", v)}
          cols={2}
        />
      </div>
    </div>
  );
}

function Step2({ data, update }: { data: OnboardingData; update: (k: keyof OnboardingData, v: string) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <FieldLabel>Store / company name</FieldLabel>
        <TextInput
          value={data.storeName}
          onChange={(v) => update("storeName", v)}
          placeholder="e.g. Sun Toyota"
          autoFocus
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <FieldLabel>City</FieldLabel>
          <TextInput
            value={data.city}
            onChange={(v) => update("city", v)}
            placeholder="Tampa"
          />
        </div>
        <div>
          <FieldLabel>State</FieldLabel>
          <TextInput
            value={data.state}
            onChange={(v) => update("state", v)}
            placeholder="FL"
          />
        </div>
      </div>

      <div>
        <FieldLabel>CRM you use</FieldLabel>
        <div className="grid grid-cols-2 gap-3">
          {CRMS.map((crm) => {
            const active = data.crm === crm;
            return (
              <button
                key={crm}
                type="button"
                onClick={() => update("crm", crm)}
                className={`rounded-xl border px-4 py-3 text-sm font-medium text-left transition-all ${
                  active
                    ? "border-deal bg-deal/10 text-deal"
                    : "border-white/10 bg-white/4 text-ash hover:border-white/25 hover:text-bone"
                }`}
              >
                {active && <span className="mr-1.5">✓</span>}
                {crm}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}

function Step3({ data, update }: { data: OnboardingData; update: (k: keyof OnboardingData, v: string) => void }) {
  return (
    <div className="space-y-6">
      <div>
        <FieldLabel>How your commission is structured</FieldLabel>
        <PillGrid
          options={COMMISSION_TYPES}
          value={data.commissionType}
          onChange={(v) => update("commissionType", v)}
          cols={2}
        />
      </div>

      <div>
        <FieldLabel>Monthly unit goal</FieldLabel>
        <TextInput
          value={data.monthlyGoal}
          onChange={(v) => update("monthlyGoal", v)}
          placeholder="e.g. 15"
        />
      </div>

      <div>
        <FieldLabel>Average deal value ($)</FieldLabel>
        <TextInput
          value={data.avgDeal}
          onChange={(v) => update("avgDeal", v)}
          placeholder="e.g. 35000"
        />
        <p className="mt-2 text-xs text-muted">
          Used to calculate commission projections — you can update this anytime.
        </p>
      </div>
    </div>
  );
}

function Step4({ data, update }: { data: OnboardingData; update: (k: keyof OnboardingData, v: string) => void }) {
  return (
    <div className="space-y-3">
      {GOALS.map((goal) => (
        <GoalCard
          key={goal.value}
          goal={goal}
          active={data.firstGoal === goal.value}
          onClick={() => update("firstGoal", goal.value)}
        />
      ))}
    </div>
  );
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(0); // 0-indexed internally
  const [data, setData] = useState<OnboardingData>(EMPTY);
  const [completing, setCompleting] = useState(false);

  // Restore saved progress
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setData(JSON.parse(saved));
    } catch {}
  }, []);

  // Persist on every change
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  }, [data]);

  const update = (key: keyof OnboardingData, value: string) =>
    setData((prev) => ({ ...prev, [key]: value }));

  const isLastStep = step === STEPS.length - 1;
  const progress = ((step + 1) / STEPS.length) * 100;

  function canAdvance() {
    if (step === 0) return data.firstName.trim() !== "" && data.role !== "" && data.industry !== "";
    if (step === 1) return data.storeName.trim() !== "";
    if (step === 2) return data.commissionType !== "" && data.monthlyGoal.trim() !== "";
    if (step === 3) return data.firstGoal !== "";
    return true;
  }

  async function handleNext() {
    if (!canAdvance()) return;
    if (isLastStep) {
      setCompleting(true);
      // Persist final state
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
      router.push("/dashboard/auto");
    } else {
      setStep((s) => s + 1);
    }
  }

  const stepContent: Record<number, React.ReactNode> = {
    0: <Step1 data={data} update={update} />,
    1: <Step2 data={data} update={update} />,
    2: <Step3 data={data} update={update} />,
    3: <Step4 data={data} update={update} />,
  };

  const stepHeadings: Record<number, { title: string; sub: string }> = {
    0: {
      title: data.firstName ? `Hey ${data.firstName} 👋` : "Let's get to know you.",
      sub: "Takes 90 seconds. Your agent will be ready when you're done.",
    },
    1: {
      title: "Where do you work?",
      sub: "Your store context helps the agent know your floor, your market, your CRM.",
    },
    2: {
      title: "Tell me your pay plan.",
      sub: "This is how the agent does commission math in real time — right on the floor.",
    },
    3: {
      title: "What do you want first?",
      sub: "Pick one. You can change this anytime in settings.",
    },
  };

  return (
    <div className="min-h-screen bg-pit flex flex-col">
      {/* Progress bar */}
      <div className="h-1 w-full bg-white/5">
        <div
          className="h-full bg-deal transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Step indicators */}
      <div className="flex items-center justify-center gap-2 pt-8 pb-2 px-6">
        {STEPS.map((s, i) => {
          const done    = i < step;
          const current = i === step;
          return (
            <div key={s.id} className="flex items-center gap-2">
              <div className="flex flex-col items-center gap-1">
                <div
                  className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-all duration-300 ${
                    done
                      ? "bg-deal text-white"
                      : current
                      ? "border-2 border-deal text-deal bg-deal/10"
                      : "border border-white/15 text-muted bg-white/4"
                  }`}
                >
                  {done ? <Check size={14} strokeWidth={3} /> : s.id}
                </div>
                <span className={`text-[10px] font-medium tracking-wider uppercase ${current ? "text-deal" : done ? "text-deal/60" : "text-muted"}`}>
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

      {/* Card */}
      <div className="flex flex-1 items-start justify-center px-6 pt-8 pb-16">
        <div className="w-full max-w-lg">
          {/* Heading */}
          <div className="mb-8">
            <h1 className="font-display text-3xl font-black text-white leading-tight mb-2">
              {stepHeadings[step].title}
            </h1>
            <p className="text-ash text-base">{stepHeadings[step].sub}</p>
          </div>

          {/* Step content */}
          <div className="animate-fade-in" key={step}>
            {stepContent[step]}
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-between mt-10">
            {step > 0 ? (
              <button
                type="button"
                onClick={() => setStep((s) => s - 1)}
                className="flex items-center gap-2 text-sm text-ash hover:text-bone transition-colors"
              >
                <ArrowLeft size={16} />
                Back
              </button>
            ) : (
              <div />
            )}

            <button
              type="button"
              onClick={handleNext}
              disabled={!canAdvance() || completing}
              className={`btn-loud flex items-center gap-2 rounded-xl px-7 py-3.5 text-sm font-bold transition-all ${
                !canAdvance() || completing ? "opacity-40 cursor-not-allowed" : ""
              }`}
            >
              {completing ? (
                <>
                  <Zap size={16} className="animate-pulse" />
                  Setting up your agent...
                </>
              ) : isLastStep ? (
                <>
                  <Zap size={16} />
                  Launch my agent
                </>
              ) : (
                <>
                  Continue
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </div>

          {/* Skip link on first step */}
          {step === 0 && (
            <p className="text-center mt-6 text-xs text-muted">
              Already set up?{" "}
              <button
                type="button"
                onClick={() => router.push("/dashboard/auto")}
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
