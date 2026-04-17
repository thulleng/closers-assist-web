"use client";

import { useEffect, useState } from "react";
import { Zap } from "lucide-react";

const typingScript = [
  { role: "user", text: "Customer balking at $499/mo on RAV4 XLE lease." },
  {
    role: "agent",
    text: "3 plays, ranked by proven close rate (learning your style):",
  },
  {
    role: "agent-list",
    text: [
      "Reframe to weekly cost ($115/wk) — 78% close",
      "Drop to 36mo, show residual math — 71% close",
      "Pivot to XLE Hybrid, $20/mo more, better CXI — 64% close",
    ],
  },
];

export default function PhoneMockup() {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const t = setTimeout(() => {
      if (step < typingScript.length) setStep(step + 1);
    }, step === 0 ? 800 : 1400);
    return () => clearTimeout(t);
  }, [step]);

  return (
    <div className="relative mx-auto w-full max-w-[300px]">
      {/* Green glow behind phone */}
      <div
        className="pointer-events-none absolute inset-0 -z-10 blur-3xl"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.35), transparent 70%)",
        }}
      />

      {/* Phone frame */}
      <div className="relative rounded-[40px] border border-iron bg-pit p-2 shadow-2xl">
        <div className="rounded-[32px] bg-slate p-4">
          {/* Notch */}
          <div className="mx-auto mb-3 h-5 w-24 rounded-b-2xl bg-pit" />

          {/* Status bar */}
          <div className="mb-3 flex items-center justify-between px-2 font-mono text-[10px] text-ash">
            <span>9:47 PM</span>
            <div className="flex items-center gap-1">
              <span>5G</span>
              <span>•</span>
              <span>84%</span>
            </div>
          </div>

          {/* App header */}
          <div className="mb-4 flex items-center gap-2 rounded-md border border-iron bg-pit px-3 py-2">
            <div className="h-2 w-2 rounded-full bg-deal animate-pulse" />
            <span className="font-display text-[11px] font-bold tracking-wider text-bone">
              CLOSERS ASSIST
            </span>
            <div className="ml-auto flex items-center gap-1 text-[10px] text-ash">
              <Zap className="h-3 w-3 text-deal" strokeWidth={2} />
              <span>Live</span>
            </div>
          </div>

          {/* Chat messages */}
          <div className="flex min-h-[280px] flex-col gap-3">
            {step >= 1 && (
              <div className="ml-auto max-w-[85%] rounded-2xl rounded-br-sm bg-iron px-3 py-2 text-[11px] leading-relaxed text-bone animate-fade-in">
                {typingScript[0].text}
              </div>
            )}

            {step >= 2 && (
              <div className="mr-auto max-w-[90%] rounded-2xl rounded-bl-sm bg-deal/10 border border-deal/30 px-3 py-2 text-[11px] leading-relaxed text-bone animate-fade-in">
                {typingScript[1].text}
              </div>
            )}

            {step >= 3 && Array.isArray(typingScript[2].text) && (
              <div className="mr-auto flex max-w-[95%] flex-col gap-2 animate-fade-in">
                {typingScript[2].text.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 rounded-lg border border-iron bg-pit px-3 py-2.5"
                    style={{ animationDelay: `${i * 100}ms` }}
                  >
                    <span className="font-mono text-[10px] font-medium text-deal">
                      {i + 1}
                    </span>
                    <span className="text-[10.5px] leading-relaxed text-bone">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Input bar */}
          <div className="mt-4 flex items-center gap-2 rounded-full border border-iron bg-pit px-3 py-2">
            <div className="h-1.5 w-1.5 rounded-full bg-deal animate-pulse" />
            <span className="flex-1 text-[10.5px] text-muted">
              Type your next close...
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
