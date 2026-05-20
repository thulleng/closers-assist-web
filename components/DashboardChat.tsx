"use client";

import { useState, useRef, useEffect } from "react";
import { Send, Sparkles, ChevronDown } from "lucide-react";

interface Message {
  role: "user" | "sassy";
  text: string;
}

export default function DashboardChat() {
  const [messages, setMessages] = useState<Message[]>([
    { role: "sassy", text: "Hey! 👋 I'm your agent. Ask me anything — add a deal, check your progress to the next bonus, calculate a commission split. I'm the same agent from Telegram." },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async () => {
    const text = input.trim();
    if (!text || loading) return;

    setMessages((prev) => [...prev, { role: "user", text }]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat/sassy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text }),
      });

      if (!res.ok) throw new Error("Failed");

      const reply = await res.text();
      setMessages((prev) => [...prev, { role: "sassy" as const, text: reply || "I'm here! 👋" }]);
    } catch {
      setMessages((prev) => [...prev, { role: "sassy", text: "Try me again in a moment! ⚡" }]);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="fixed bottom-0 right-0 z-40 w-full lg:w-[420px] xl:w-[480px]">
      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex w-full items-center justify-between rounded-t-2xl border border-b-0 border-white/10 bg-black/90 px-5 py-3 backdrop-blur-xl"
      >
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-neon-green" strokeWidth={2} />
          <span className="text-sm font-semibold text-white">Your Agent</span>
          {loading && (
            <span className="flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-1.5 w-1.5 animate-ping rounded-full bg-neon-green opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-neon-green" />
            </span>
          )}
        </div>
        <ChevronDown
          className={`h-4 w-4 text-ash transition-transform ${collapsed ? "" : "rotate-180"}`}
          strokeWidth={2}
        />
      </button>

      {!collapsed && (
        <div className="border border-white/10 bg-black/95 backdrop-blur-xl">
          {/* Messages */}
          <div className="h-[320px] overflow-y-auto px-4 py-3 space-y-3">
            {messages.map((m, i) => (
              <div
                key={i}
                className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${
                    m.role === "user"
                      ? "bg-neon-green/15 text-bone border border-neon-green/20"
                      : "bg-white/5 text-ash border border-white/5"
                  }`}
                >
                  {m.text || (loading && i === messages.length - 1 ? "..." : m.text)}
                </div>
              </div>
            ))}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-white/5 px-4 py-3">
            <div className="flex items-center gap-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Add a deal, check bonus, math..."
                className="flex-1 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm text-white placeholder:text-white/20 focus:border-neon-green/50 focus:outline-none focus:ring-1 focus:ring-neon-green/30"
                disabled={loading}
                autoFocus
              />
              <button
                onClick={send}
                disabled={loading || !input.trim()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-neon-green text-black transition-all hover:bg-neon-green/80 disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <Send className="h-4 w-4" strokeWidth={2.5} />
              </button>
            </div>
            <p className="mt-2 text-center text-[10px] text-white/15">
              Same agent as Telegram. Ask me to add deals, check your bonus ladder, run commission math.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
