"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Sparkles } from "lucide-react";

export default function CreditRepairPage() {
  const [messages, setMessages] = useState<{ role: "user" | "assistant"; content: string }[]>([
    {
      role: "assistant",
      content:
        "Hey! I'm your credit repair guide. I can help you understand your credit report, write dispute letters, create a repair plan, and track your progress. What's your credit goal — buying a house, getting an apartment, lowering your insurance, or just building a stronger score?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    if (!input.trim() || loading) return;
    const userMsg = input.trim();
    setInput("");
    setMessages((prev) => [...prev, { role: "user", content: userMsg }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: userMsg }].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          industry: "credit-repair",
        }),
      });

      if (!res.ok) throw new Error("API error");
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.response || "Sorry, try again." }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Something went wrong. Try again in a moment." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden loud-bg px-4 py-12">
      <div className="grid-pattern opacity-30" />
      <div
        className="pointer-events-none absolute inset-0 blur-3xl"
        style={{ background: "radial-gradient(circle at 50% 30%, rgba(16,185,129,0.18), transparent 60%)" }}
      />

      <div className="relative z-10 w-full max-w-2xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/[0.06] px-3.5 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 shadow-[0_0_8px_#34D399]" />
            <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-emerald-300">Free Credit Repair</span>
          </div>
          <h1 className="font-display text-3xl font-black tracking-[-0.02em] text-white sm:text-5xl">
            Fix your credit.<span className="text-shine"> For free.</span>
          </h1>
          <p className="mt-3 text-sm text-ash sm:text-base">
            Dispute letters, repair plans, score strategies — guided by AI. No catch.
          </p>
        </div>

        {/* Chat card */}
        <div className="glass-panel rounded-2xl border-white/10">
          {/* Messages */}
          <div className="flex max-h-[55vh] min-h-[40vh] flex-col gap-4 overflow-y-auto p-6">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                <div
                  className={`max-w-[85%] rounded-2xl px-5 py-3 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-emerald-500/15 border border-emerald-500/25 text-bone"
                      : "bg-white/[0.04] border border-white/5 text-bone"
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-2 rounded-2xl bg-white/[0.04] border border-white/5 px-5 py-3">
                  <Sparkles className="h-4 w-4 animate-pulse text-emerald-400" />
                  <span className="text-sm text-ash">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-white/5 p-4">
            <div className="flex gap-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder="Tell me about your credit situation..."
                className="flex-1 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-bone placeholder:text-ash/50 focus:border-emerald-500/40 focus:outline-none focus:ring-1 focus:ring-emerald-500/20"
              />
              <button
                onClick={send}
                disabled={!input.trim() || loading}
                className="rounded-xl bg-emerald-500/15 border border-emerald-500/30 px-4 py-3 text-emerald-400 hover:bg-emerald-500/25 disabled:opacity-30 transition-all"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <p className="mt-2 text-center text-[10px] text-ash/50">
              Your credit info stays private. Not financial advice.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
