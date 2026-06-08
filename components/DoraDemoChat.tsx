"use client";

import { useEffect, useState } from "react";
import { Bot, User } from "lucide-react";

const STEPS = [
  { role: "user", text: "I need to talk to my wife first.", delay: 0 },
  { role: "dora", text: "Totally fair. Quick question — what's her biggest concern?", delay: 2000 },
  { role: "user", text: "Probably the payment.", delay: 4500 },
  { role: "dora", text: "Got it. If I can show you a payment that's $40 under what you're paying now — does that change the conversation?", delay: 6500 },
  { role: "user", text: "…let's see it.", delay: 10000 },
  { role: "dora", text: "🏆 Love it. One sec — pulling real numbers for you right now.", delay: 12000 },
];

export default function DoraDemoChat() {
  const [visibleMessages, setVisibleMessages] = useState<{ role: string; text: string }[]>([]);

  useEffect(() => {
    setVisibleMessages([]);

    const timers = STEPS.map((step) =>
      setTimeout(() => {
        setVisibleMessages((prev) => [...prev, { role: step.role, text: step.text }]);
      }, step.delay)
    );

    // Reset loop
    const loopTimeout = setTimeout(() => {
      setVisibleMessages([]);
    }, 16000);

    return () => {
      timers.forEach(clearTimeout);
      clearTimeout(loopTimeout);
    };
  }, []);

  return (
    <div className="overflow-hidden rounded-2xl border border-white/[0.06] bg-black/60 backdrop-blur-xl shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
      {/* Header */}
      <div className="flex items-center gap-2.5 border-b border-white/[0.06] px-4 py-3">
        <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-deal to-emerald-600">
          <Bot className="h-4 w-4 text-black" strokeWidth={2.5} />
        </div>
        <div className="flex-1">
          <div className="text-xs font-semibold text-white">Dora</div>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-deal shadow-[0_0_6px_#10B981]" />
            <span className="text-[10px] text-muted">Deal Clozr AI · Live</span>
          </div>
        </div>
        <span className="rounded-full border border-deal/20 bg-deal/5 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-deal-light">
          Demo
        </span>
      </div>

      {/* Messages */}
      <div className="space-y-3 px-4 py-4">
        {visibleMessages.map((msg, i) => (
          <div
            key={i}
            className={`flex items-start gap-2.5 animate-in fade-in slide-in-from-bottom-2 duration-500 ${
              msg.role === "user" ? "flex-row-reverse" : ""
            }`}
            style={{ animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)" }}
          >
            <div
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full ${
                msg.role === "user"
                  ? "bg-white/10"
                  : "bg-gradient-to-br from-deal to-emerald-600"
              }`}
            >
              {msg.role === "user" ? (
                <User className="h-3.5 w-3.5 text-ash" strokeWidth={2} />
              ) : (
                <Bot className="h-3.5 w-3.5 text-black" strokeWidth={2.5} />
              )}
            </div>
            <div
              className={`max-w-[80%] rounded-xl px-3.5 py-2.5 text-xs leading-relaxed ${
                msg.role === "user"
                  ? "rounded-tr-sm bg-white/10 text-white"
                  : "rounded-tl-sm bg-deal/15 text-deal-light"
              }`}
            >
              {msg.text}
              {msg.role === "dora" && msg.text.includes("🏆") && (
                <span className="ml-0.5">✨</span>
              )}
            </div>
          </div>
        ))}

        {/* Typing indicator */}
        {visibleMessages.length > 0 && visibleMessages.length % 2 === 0 && visibleMessages.length < STEPS.length && (
          <div className="flex items-start gap-2.5">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-deal to-emerald-600">
              <Bot className="h-3.5 w-3.5 text-black" strokeWidth={2.5} />
            </div>
            <div className="flex items-center gap-1 rounded-xl rounded-tl-sm bg-deal/10 px-3.5 py-2.5">
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-deal-light" style={{ animationDelay: "0ms" }} />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-deal-light" style={{ animationDelay: "150ms" }} />
              <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-deal-light" style={{ animationDelay: "300ms" }} />
            </div>
          </div>
        )}

        {/* Cue text */}
        {visibleMessages.length === 0 && (
          <div className="py-6 text-center">
            <p className="text-xs text-muted">▶ Demo auto-playing</p>
          </div>
        )}
      </div>
    </div>
  );
}
