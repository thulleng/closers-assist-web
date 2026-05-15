"use client";

import { useState } from "react";
import { X, ArrowRight, Check } from "lucide-react";

const STEPS = [
  {
    title: "Log your first deal",
    desc: "Type 'I just sold a Camry to Jane Foster — full deal, $3,200 front' in the chat. The AI logs it, calculates your commission, and tracks your bonus progress.",
    action: "Try it →",
    prompt: "I just sold a Camry to Jane Foster — full deal, $3,200 front",
  },
  {
    title: "Write a follow-up",
    desc: "Customer walked? Say 'Jane walked — payment objection on the Camry.' The AI writes a 4-day text sequence you can send in 10 seconds.",
    action: "Try it →",
    prompt: "Jane Foster walked — payment objection. She wanted under $500/mo on the Camry XSE. Write me a follow-up sequence.",
  },
  {
    title: "Beat a competitor",
    desc: "Cross-shopping an Accord? Ask 'Customer is comparing our Camry to an Accord Sport.' Get 3 talking points + a pivot line.",
    action: "Try it →",
    prompt: "Customer is cross-shopping our 2026 Camry XSE against the Honda Accord Sport. What are my wins?",
  },
];

export default function DemoGuide({
  onPromptSelect,
}: {
  onPromptSelect: (prompt: string) => void;
}) {
  const [step, setStep] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const s = STEPS[step];

  return (
    <div className="relative mb-6 rounded-2xl border border-deal/30 bg-deal/[0.04] p-5">
      <button
        onClick={() => setDismissed(true)}
        className="absolute right-3 top-3 flex h-7 w-7 items-center justify-center rounded-lg border border-iron bg-slate text-muted transition-colors hover:text-bone"
        aria-label="Dismiss"
      >
        <X className="h-3.5 w-3.5" strokeWidth={2} />
      </button>

      <div className="mb-4 flex items-center gap-2">
        <span className="rounded bg-deal/15 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-deal">
          Step {step + 1} of {STEPS.length}
        </span>
        <span className="text-[10px] text-muted">Quick tour — 60 seconds</span>
      </div>

      <h3 className="text-lg font-bold text-bone">{s.title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-ash">{s.desc}</p>

      <div className="mt-4 flex items-center gap-3">
        <button
          onClick={() => onPromptSelect(s.prompt)}
          className="btn-loud flex items-center gap-1.5 text-sm"
        >
          {s.action} <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
        </button>

        <div className="flex gap-1.5">
          {STEPS.map((_, i) => (
            <button
              key={i}
              onClick={() => setStep(i)}
              className={`h-2 rounded-full transition-all ${
                i === step ? "w-5 bg-deal" : i < step ? "w-2 bg-deal/50" : "w-2 bg-iron"
              }`}
              aria-label={`Step ${i + 1}`}
            />
          ))}
        </div>

        {step < STEPS.length - 1 && (
          <button
            onClick={() => setStep(step + 1)}
            className="ml-auto text-xs text-ash transition-colors hover:text-bone"
          >
            Next →
          </button>
        )}
        {step === STEPS.length - 1 && (
          <button
            onClick={() => setDismissed(true)}
            className="ml-auto flex items-center gap-1 text-xs text-deal transition-colors hover:text-deal-light"
          >
            <Check className="h-3.5 w-3.5" strokeWidth={2.5} /> Done
          </button>
        )}
      </div>
    </div>
  );
}
