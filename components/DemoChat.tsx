"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, Loader2, Sparkles, Zap, MessageCircle } from "lucide-react";

type Message = { role: "user" | "clo"; text: string };

const SUGGESTIONS = [
  { icon: "💰", label: "How much does it cost?" },
  { icon: "⚡", label: "How fast can I get one?" },
  { icon: "🤖", label: "Is this actually AI or just scripts?" },
  { icon: "🏠", label: "Can it really handle my personal life too?" },
  { icon: "🚗", label: "I sell cars — what can it do for me?" },
  { icon: "😏", label: "What makes this different from ChatGPT?" },
];

export default function DemoChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [remaining, setRemaining] = useState(10);
  const [showGreeting, setShowGreeting] = useState(true);
  const [sessionId, setSessionId] = useState("");
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Generate persistent session ID for per-visitor memory
  useEffect(() => {
    let sid = localStorage.getItem("clo_session");
    if (!sid) {
      sid = "visitor-" + Math.random().toString(36).slice(2, 10);
      localStorage.setItem("clo_session", sid);
    }
    setSessionId(sid);
  }, []);

  // Auto-scroll chat container only (NOT the page)
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, loading]);

  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;

    const question = text.trim();
    setInput("");
    setShowGreeting(false);
    setMessages((prev) => [...prev, { role: "user", text: question }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat/clo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question, session: sessionId }),
      });
      const data = await res.json();

      if (data.reply) {
        setMessages((prev) => [...prev, { role: "clo", text: data.reply }]);
        setRemaining(data.remaining ?? remaining - 1);
      } else {
        setMessages((prev) => [
          ...prev,
          { role: "clo", text: "I tripped over a cable — try me again? 🔌" },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "clo", text: "Connection hiccup — hit me again! ⚡" },
      ]);
    }
    setLoading(false);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  return (
    <div className="w-full max-w-2xl mx-auto sticky top-20">
      {/* Chat area */}
      <div ref={chatContainerRef} className="space-y-4 mb-4 max-h-[320px] overflow-y-auto scrollbar-thin overscroll-contain">
        {/* Auto greeting */}
        {showGreeting && messages.length === 0 && (
          <div className="flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-deal to-emerald-400 flex items-center justify-center shrink-0 mt-0.5 shadow-[0_0_16px_rgba(16,185,129,0.3)]">
              <Sparkles className="h-4 w-4 text-black" />
            </div>
            <div className="rounded-2xl rounded-tl-md px-5 py-4 text-base text-gray-200 leading-relaxed max-w-md"
              style={{
                background: "rgba(5,5,6,0.55)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(16,185,129,0.3)",
                boxShadow: "0 0 30px rgba(16,185,129,0.12), 0 0 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)"
              }}>
              <p className="font-bold text-deal-light mb-1 text-base">Hey! I'm Dora 👋</p>
              <p className="text-gray-300">
                I'm the AI host here at ClosersAssist. I handle sales objections, track commissions, remind you about dentist appointments — basically everything.{" "}
                <span className="text-white font-semibold">What do you do for a living?</span>
              </p>
              <p className="text-sm text-gray-500 mt-2 font-medium">
                (I'm real AI — not a scripted chatbot. Try me. 😏)
              </p>
            </div>
          </div>
        )}

        {/* Messages */}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 ${
              msg.role === "user" ? "justify-end" : ""
            }`}
          >
            {msg.role === "clo" && (
              <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-deal to-emerald-400 flex items-center justify-center shrink-0 mt-0.5 shadow-[0_0_12px_rgba(16,185,129,0.2)]">
                <Sparkles className="h-3.5 w-3.5 text-black" />
              </div>
            )}
            <div
              className={`rounded-2xl px-5 py-3.5 text-sm leading-relaxed max-w-[85%] ${
                msg.role === "user"
                  ? "rounded-br-md text-white"
                  : "rounded-tl-md text-gray-300"
              }`}
              style={msg.role === "user" ? {
                background: "rgba(16,185,129,0.15)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                border: "1px solid rgba(16,185,129,0.3)",
                boxShadow: "0 0 20px rgba(16,185,129,0.12)"
              } : {
                background: "rgba(5,5,6,0.5)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                border: "1px solid rgba(255,255,255,0.15)",
                boxShadow: "0 0 20px rgba(0,0,0,0.3)"
              }}
            >
              {msg.text}
            </div>
            {msg.role === "user" && (
              <div className="w-8 h-8 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center shrink-0 mt-0.5">
                <MessageCircle className="h-3.5 w-3.5 text-gray-500" />
              </div>
            )}
          </div>
        ))}

        {/* Typing indicator */}
        {loading && (
          <div className="flex gap-3 animate-in fade-in duration-200">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-deal to-emerald-400 flex items-center justify-center shrink-0 mt-0.5 shadow-[0_0_12px_rgba(16,185,129,0.2)]">
              <Sparkles className="h-3.5 w-3.5 text-black" />
            </div>
            <div className="rounded-2xl rounded-tl-md bg-white/[0.04] border border-white/[0.08] px-5 py-4">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 rounded-full bg-deal/60 animate-bounce" style={{ animationDelay: "0ms" }} />
                <span className="w-2 h-2 rounded-full bg-deal/60 animate-bounce" style={{ animationDelay: "150ms" }} />
                <span className="w-2 h-2 rounded-full bg-deal/60 animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Suggested questions */}
      {messages.length === 0 && showGreeting && (
        <div className="mb-4">
          <p className="text-sm text-gray-400 mb-2.5 text-center font-medium">Or tap a question:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {SUGGESTIONS.map((s) => (
              <button
                key={s.label}
                onClick={() => sendMessage(s.label)}
                disabled={loading}
                className="inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-sm transition-all disabled:opacity-40"
                style={{
                  border: "1px solid rgba(255,255,255,0.2)",
                  background: "rgba(255,255,255,0.06)",
                  color: "#d1d5db",
                  boxShadow: "0 0 12px rgba(16,185,129,0.06), 0 0 2px rgba(255,255,255,0.05)"
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(16,185,129,0.5)";
                  e.currentTarget.style.color = "#fff";
                  e.currentTarget.style.background = "rgba(16,185,129,0.08)";
                  e.currentTarget.style.boxShadow = "0 0 18px rgba(16,185,129,0.2), 0 0 4px rgba(16,185,129,0.15)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
                  e.currentTarget.style.color = "#d1d5db";
                  e.currentTarget.style.background = "rgba(255,255,255,0.06)";
                  e.currentTarget.style.boxShadow = "0 0 12px rgba(16,185,129,0.06), 0 0 2px rgba(255,255,255,0.05)";
                }}
              >
                <span>{s.icon}</span>
                <span>{s.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="relative">
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            messages.length > 0
              ? "Keep talking — I'm listening..."
              : 'Ask me anything — I\'m live! Try "What makes you different?"'
          }
          maxLength={600}
          disabled={loading}
          className="w-full rounded-xl px-5 py-4 pr-14 text-sm text-white placeholder:text-gray-400 focus:outline-none transition-all duration-300 backdrop-blur disabled:opacity-50"
          style={{
            background: "rgba(5,5,6,0.5)",
            backdropFilter: "blur(10px)",
            WebkitBackdropFilter: "blur(10px)",
            border: "1px solid rgba(255,255,255,0.2)",
            boxShadow: "0 0 25px rgba(16,185,129,0.08), 0 0 4px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.03)"
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "rgba(16,185,129,0.6)";
            e.currentTarget.style.boxShadow = "0 0 35px rgba(16,185,129,0.25), 0 0 12px rgba(16,185,129,0.15), inset 0 1px 0 rgba(255,255,255,0.04)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
            e.currentTarget.style.boxShadow = "0 0 25px rgba(16,185,129,0.08), 0 0 4px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.03)";
          }}
        />
        <button
          type="submit"
          disabled={loading || !input.trim()}
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-deal p-2 text-black hover:bg-deal-light transition-all disabled:opacity-40 disabled:cursor-not-allowed hover:shadow-[0_0_16px_rgba(16,185,129,0.3)]"
        >
          {loading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <ArrowRight className="h-4 w-4" />
          )}
        </button>
      </form>

      {/* Footer */}
      <div className="mt-3 flex items-center justify-between">
        <p className="text-xs text-gray-600">
          {remaining > 0 ? (
            <>
              <Zap className="h-3 w-3 inline mr-1 text-deal/60" />
              {remaining} free question{remaining !== 1 ? "s" : ""} left
            </>
          ) : (
            <span className="text-deal-light">Ready to deploy? →</span>
          )}
        </p>
        {messages.length > 0 && (
          <a
            href="/pricing"
            className="text-xs font-semibold text-deal hover:text-deal-light transition-colors inline-flex items-center gap-1"
          >
            Get yours <ArrowRight className="h-3 w-3" />
          </a>
        )}
      </div>
    </div>
  );
}
