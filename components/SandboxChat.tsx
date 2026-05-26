"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, X, Zap } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Message {
  role: "user" | "sassy";
  text: string;
}

const SUGGESTIONS = [
  "I sold a Camry for $32K — what's my commission?",
  "Customer says it's too expensive. What do I say?",
  "Write me a follow-up text for a customer who ghosted",
  "I need a payment quote on a $45K truck at 6.9% for 72 months",
];

const CAPABILITIES = [
  "📷 Send images — I'll read documents, screenshots, pay plans",
  "🎥 Send videos — I'll watch and summarize customer walkarounds",
  "🎤 Send voice notes — I'll transcribe and reply",
];

export default function SandboxChat() {
  const pathname = usePathname();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [remaining, setRemaining] = useState(5);
  const [done, setDone] = useState(false);
  const [open, setOpen] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Don't show on dashboard — logged-in users use Telegram
  if (pathname?.startsWith("/dashboard")) return null;

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 300);
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async (text?: string) => {
    const msg = (text || input).trim();
    if (!msg || loading || done) return;

    setMessages((prev) => [...prev, { role: "user", text: msg }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat/sandbox", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "sassy", text: data.reply || "..." }]);
      if (data.remaining !== undefined) setRemaining(data.remaining);
      if (data.done) setDone(true);
    } catch {
      setMessages((prev) => [...prev, { role: "sassy", text: "Try me again! ⚡" }]);
    } finally {
      setLoading(false);
    }
  };

  if (!open) {
    return (
      <div className="fixed bottom-36 right-4 z-40 md:bottom-8">
        <button
          id="try-agent-btn"
          onClick={() => setOpen(true)}
          className="group flex items-center gap-2 rounded-full bg-gradient-to-r from-deal to-emerald-400 px-5 py-3 text-sm font-bold text-black shadow-lg shadow-deal/30 transition-all hover:scale-105 active:scale-95"
        >
          <Zap className="h-4 w-4" />
          Try the agent
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-md px-3 pb-4 md:pb-6 md:right-4 md:left-auto md:bottom-8 md:w-96 md:px-0">
      <div className="flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-pit/95 backdrop-blur-xl shadow-2xl shadow-black/60">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 px-4 py-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-deal to-emerald-400 shadow-lg shadow-deal/20">
              <Sparkles className="h-4 w-4 text-black" />
            </div>
            <div>
              <span className="text-sm font-bold text-white">Try Dora</span>
              {!done && (
                <span className="ml-2 inline-flex items-center gap-1 rounded-full bg-deal/10 border border-deal/20 px-2 py-0.5 text-[10px] font-semibold text-deal-light">
                  <span className="h-1 w-1 rounded-full bg-deal animate-pulse" />
                  {remaining} free left
                </span>
              )}
            </div>
          </div>
          <button
            onClick={() => setOpen(false)}
            className="rounded-full p-1.5 text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
            aria-label="Close chat"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Messages */}
        <div className="overflow-y-auto px-4 py-4 space-y-3" style={{ maxHeight: "360px" }}>
          {messages.length === 0 && !loading && (
            <div className="text-center py-2">
              <p className="text-[13px] text-muted mb-4 leading-relaxed px-1">
                Talk to the real agent. Send images, videos, or voice notes — I'll handle them.
              </p>
              <div className="flex flex-col gap-1.5 items-center mb-5">
                {CAPABILITIES.map((c, i) => (
                  <span key={i} className="text-xs text-muted/70">{c}</span>
                ))}
              </div>
              <p className="text-[10px] font-semibold uppercase tracking-wider text-muted/50 mb-3">Try asking</p>
              <div className="flex flex-wrap gap-2 justify-center">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-3.5 py-2 text-xs leading-snug text-gray-300 hover:border-deal/40 hover:text-white hover:bg-deal/5 transition-all"
                  >
                    <Zap className="h-3.5 w-3.5 shrink-0 text-deal" />
                    <span className="max-w-[160px] truncate">{s}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`rounded-2xl px-3.5 py-2 text-sm leading-relaxed max-w-[88%] break-words ${
                  msg.role === "user"
                    ? "bg-deal/20 border border-deal/30 text-white rounded-br-md"
                    : "bg-white/5 border border-white/10 text-gray-200 rounded-tl-md"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex justify-start">
              <div className="rounded-2xl rounded-tl-md bg-white/5 border border-white/10 px-4 py-3">
                <div className="flex items-center gap-2">
                  <span className="flex gap-1">
                    <span className="h-1.5 w-1.5 rounded-full bg-deal animate-bounce" style={{ animationDelay: "0ms" }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-deal animate-bounce" style={{ animationDelay: "150ms" }} />
                    <span className="h-1.5 w-1.5 rounded-full bg-deal animate-bounce" style={{ animationDelay: "300ms" }} />
                  </span>
                  <span className="text-xs text-gray-400">Sassy is thinking</span>
                </div>
              </div>
            </div>
          )}

          {done && messages.length > 0 && (
            <div className="rounded-xl border border-gold-light/30 bg-gradient-to-br from-gold-light/10 to-gold-light/5 p-4 text-center">
              <p className="text-sm font-bold text-gold-light mb-1">Liked what you saw?</p>
              <p className="text-xs text-ash mb-3">
                Sign up free — pick up right where you left off. No credit card.
              </p>
              <Link
                href="/signup"
                className="btn-loud inline-flex items-center gap-1.5 rounded-lg px-5 py-2.5 text-xs font-bold"
                onClick={() => setOpen(false)}
              >
                <Zap className="h-3 w-3" /> Sign up free
              </Link>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {!done && (
          <form
            onSubmit={(e) => { e.preventDefault(); send(); }}
            className="flex items-center gap-2 border-t border-white/10 px-4 py-3"
          >
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Log a deal, check math, write a script..."
              maxLength={400}
              disabled={loading}
              className="flex-1 rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-deal/50 transition-colors disabled:opacity-40"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-deal text-black font-bold transition-all hover:bg-deal-light disabled:opacity-40"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
