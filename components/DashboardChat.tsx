"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, ChevronUp, ChevronDown, Plus, Calculator, Trophy } from "lucide-react";

interface Message {
  role: "user" | "sassy";
  text: string;
}

const QUICK_ACTIONS = [
  { icon: "📊", label: "How am I doing this month?" },
  { icon: "➕", label: "Log a deal" },
  { icon: "🧮", label: "Commission on $3,200 front?" },
  { icon: "🏆", label: "How close to next bonus?" },
];

export default function DashboardChat() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "sassy", text: "Hey! 👋 I'm your agent. Ask me anything." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [collapsed, setCollapsed] = useState(true); // START COLLAPSED
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async (text?: string) => {
    const msg = (text || input).trim();
    if (!msg || loading) return;

    setMessages((prev) => [...prev, { role: "user", text: msg }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat/sassy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg }),
      });
      const reply = await res.text();
      setMessages((prev) => [...prev, { role: "sassy", text: reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: "sassy", text: "Try me again! ⚡" }]);
    } finally {
      setLoading(false);
    }
  };

  if (collapsed) {
    return (
      <div className="fixed bottom-20 right-4 z-40 md:bottom-6">
        <button
          onClick={() => setCollapsed(false)}
          className="flex items-center gap-2 rounded-full bg-deal px-4 py-3 text-sm font-bold text-black shadow-lg shadow-deal/30 transition-all hover:scale-105 active:scale-95"
        >
          <Sparkles className="h-4 w-4" />
          Chat with Sassy
          <ChevronUp className="h-4 w-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 mx-auto max-w-2xl px-4 pb-20 md:pb-6">
      {/* Backdrop */}
      <div className="absolute inset-0 -top-10 bg-black/40 backdrop-blur-sm rounded-t-3xl" />

      <div className="relative flex flex-col" style={{ maxHeight: "60vh" }}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-deal to-emerald-400">
              <Sparkles className="h-3.5 w-3.5 text-black" />
            </div>
            <span className="text-sm font-bold text-white">Your Agent</span>
          </div>
          <button
            onClick={() => setCollapsed(true)}
            className="rounded-full p-2 text-gray-400 hover:bg-white/10 hover:text-white transition-colors"
          >
            <ChevronDown className="h-5 w-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="overflow-y-auto px-4 space-y-2" style={{ maxHeight: "calc(60vh - 130px)" }}>
          {messages.map((msg, i) => (
            <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
              <div
                className={`rounded-2xl px-4 py-2.5 text-sm leading-relaxed max-w-[85%] ${
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
              <div className="rounded-2xl rounded-tl-md bg-white/5 border border-white/10 px-4 py-2.5">
                <span className="text-sm text-gray-400">Sassy is thinking...</span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* Quick actions — only when no user messages yet */}
        {messages.length <= 1 && (
          <div className="px-4 py-2 flex flex-wrap gap-1.5">
            {QUICK_ACTIONS.map((a) => (
              <button
                key={a.label}
                onClick={() => send(a.label)}
                disabled={loading}
                className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-gray-300 hover:border-deal/40 hover:text-white transition-colors disabled:opacity-40"
              >
                <span>{a.icon}</span>
                <span className="hidden sm:inline">{a.label.length > 25 ? a.label.slice(0, 25) + "..." : a.label}</span>
                <span className="sm:hidden">{a.label.split(" ").slice(0, 2).join(" ")}</span>
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <form
          onSubmit={(e) => { e.preventDefault(); send(); }}
          className="flex items-center gap-2 px-4 py-3"
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Add a deal, check bonus, math..."
            maxLength={400}
            disabled={loading}
            className="flex-1 rounded-xl bg-white/5 border border-white/10 px-4 py-2.5 text-sm text-white placeholder:text-gray-500 focus:outline-none focus:border-deal/50 transition-colors disabled:opacity-40"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-deal text-black font-bold transition-all hover:bg-deal-light disabled:opacity-40 disabled:cursor-not-allowed"
          >
            <Send className="h-4 w-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
