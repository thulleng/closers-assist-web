"use client";

import { useState, useEffect, useRef, memo } from "react";
import { ArrowRight, Loader2, Sparkles, Zap, User } from "lucide-react";

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
  const [memoryLoaded, setMemoryLoaded] = useState(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const visitorRef = useRef<string>("");

  // Persistent visitor ID + load memory from Supabase
  useEffect(() => {
    let vid = localStorage.getItem("dora_visitor");
    if (!vid) {
      vid = "dora-" + crypto.randomUUID().slice(0, 8);
      localStorage.setItem("dora_visitor", vid);
    }
    visitorRef.current = vid;

    // Load past conversations
    fetch(`/api/dora/memory?visitor_id=${vid}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.messages?.length > 0) {
          setMessages(data.messages);
          setShowGreeting(false);
        }
        setMemoryLoaded(true);
      })
      .catch(() => setMemoryLoaded(true));
  }, []);

  // Save messages to Supabase after each exchange
  function saveMemory(msgs: Message[]) {
    if (!visitorRef.current) return;
    fetch("/api/dora/memory", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ visitor_id: visitorRef.current, messages: msgs }),
    }).catch(() => {});
  }

  // Auto-scroll chat
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

    // Capture current messages for history before adding new ones
    const history = messages;
    setMessages((prev) => [...prev, { role: "user", text: question }]);
    setLoading(true);

    try {
      const res = await fetch("/api/chat/clo", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question, messages: history }),
      });

      if (!res.ok) {
        setMessages((prev) => [
          ...prev,
          { role: "clo", text: "Dora's thinking — hit me again in a sec! ⚡" },
        ]);
        setLoading(false);
        return;
      }

      const reader = res.body?.getReader();
      if (!reader) {
        setMessages((prev) => [
          ...prev,
          { role: "clo", text: "Dora's thinking — hit me again! ⚡" },
        ]);
        setLoading(false);
        return;
      }

      const decoder = new TextDecoder();
      let buffer = "";
      let accumulated = "";
      let bubbleAdded = false;
      let rafPending = false;
      let lastFlush = 0;
      const FLUSH_MS = 50; // 20fps — smooth enough, cuts repaints by 3x

      function flush() {
        rafPending = false;
        if (!bubbleAdded) {
          setMessages((prev) => [...prev, { role: "clo", text: accumulated }]);
          bubbleAdded = true;
        } else {
          setMessages((prev) => {
            const copy = [...prev];
            copy[copy.length - 1] = { role: "clo", text: accumulated };
            return copy;
          });
        }
      }

      function scheduleFlush() {
        if (rafPending) return;
        rafPending = true;
        const now = performance.now();
        const elapsed = now - lastFlush;
        if (elapsed > FLUSH_MS) {
          flush();
          lastFlush = now;
        } else {
          requestAnimationFrame(() => {
            flush();
            lastFlush = performance.now();
          });
        }
      }

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        buffer += decoder.decode(value, { stream: true });

        const lines = buffer.split("\n");
        buffer = lines.pop() || "";

        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed || !trimmed.startsWith("data: ")) continue;

          try {
            const data = JSON.parse(trimmed.slice(6));

            if (data.text) {
              accumulated += data.text;
              scheduleFlush();
            }

            if (data.done) {
              if (data.remaining !== undefined) {
                setRemaining(data.remaining);
              }
              setLoading(false);
              // Save to Supabase memory
              saveMemory([
                ...history,
                { role: "user", text: question },
                { role: "clo", text: accumulated },
              ]);
              return;
            }

            if (data.error) {
              setMessages((prev) => [
                ...prev,
                { role: "clo", text: data.error },
              ]);
              setLoading(false);
              return;
            }
          } catch {
            // Skip unparseable chunks
          }
        }
      }

      setLoading(false);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "clo", text: "I hit a speed bump — try again! 🏎️" },
      ]);
      setLoading(false);
    }
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    sendMessage(input);
  }

  const MessageBubble = memo(function MessageBubble({ msg, isStreaming }: { msg: Message; isStreaming?: boolean }) {
    const isUser = msg.role === "user";

    return (
      <div className={`flex gap-3 ${isUser ? "justify-end" : ""}`}>
        {!isUser && (
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-deal to-emerald-400 flex items-center justify-center shrink-0 mt-0.5 shadow-[0_0_12px_rgba(16,185,129,0.2)]">
            <Sparkles className="h-3.5 w-3.5 text-black" />
          </div>
        )}
        <div
          className={`rounded-2xl px-5 py-3 text-sm leading-relaxed max-w-[85%] ${
            isUser ? "rounded-br-md text-white" : "rounded-tl-md text-gray-200"
          }`}
          style={
            isUser
              ? {
                  background: "rgba(16,185,129,0.15)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  border: "1px solid rgba(16,185,129,0.3)",
                }
              : {
                  background: "rgba(5,5,6,0.65)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.12)",
                }
          }
        >
          <span className="whitespace-pre-wrap">{msg.text}</span>
          {isStreaming && (
            <span className="inline-block w-1.5 h-4 bg-deal ml-0.5 align-text-bottom animate-pulse" />
          )}
        </div>
        {isUser && (
          <div className="w-8 h-8 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center shrink-0 mt-0.5">
            <User className="h-3.5 w-3.5 text-gray-400" />
          </div>
        )}
      </div>
    );
  });

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* ─── CHAT AREA ────────────────────────────────────────── */}
      <div
        ref={chatContainerRef}
        className="space-y-4 mb-4 h-[400px] overflow-y-auto scrollbar-thin overscroll-contain rounded-2xl p-4"
        style={{
          background: "rgba(5,5,6,0.35)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(16,185,129,0.2)",
          boxShadow: "0 0 40px rgba(16,185,129,0.08), inset 0 1px 0 rgba(255,255,255,0.03)",
          transform: "translateZ(0)",          // GPU composite — isolates from page repaints
          willChange: "transform",             // hints browser to promote to own layer
          scrollbarGutter: "stable",           // reserve scrollbar space — no layout shift
        }}
      >
        {/* Greeting */}
        {showGreeting && (
          <div className="flex gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-deal to-emerald-400 flex items-center justify-center shrink-0 mt-0.5 shadow-[0_0_16px_rgba(16,185,129,0.3)]">
              <Sparkles className="h-4 w-4 text-black" />
            </div>
            <div
              className="rounded-2xl rounded-tl-md px-5 py-4 text-base leading-relaxed max-w-md"
              style={{
                background: "rgba(5,5,6,0.65)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(16,185,129,0.3)",
                boxShadow: "0 0 30px rgba(16,185,129,0.12), 0 0 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)",
              }}
            >
              <p className="font-bold text-white mb-1 text-lg">Hey! I'm Dora 👋</p>
              <p className="text-gray-200 text-sm">
                I'm your AI closer — I handle follow-ups, track commissions, remember everything you'd forget.
                <span className="text-white font-semibold"> What do you sell?</span>
              </p>
            </div>
          </div>
        )}

        {/* Real messages */}
        {messages.map((msg, i) => {
          const isLast = i === messages.length - 1;
          const isStreaming = isLast && msg.role === "clo" && loading;
          return <MessageBubble key={i} msg={msg} isStreaming={isStreaming} />;
        })}

        {/* Typing indicator — only before first text chunk arrives */}
        {loading && (messages.length === 0 || messages[messages.length - 1]?.role !== "clo") && (
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-deal to-emerald-400 flex items-center justify-center shrink-0 mt-0.5 shadow-[0_0_12px_rgba(16,185,129,0.2)]">
              <Loader2 className="h-3.5 w-3.5 text-black animate-spin" />
            </div>
            <div
              className="rounded-2xl rounded-tl-md px-5 py-4"
              style={{
                background: "rgba(5,5,6,0.65)",
                border: "1px solid rgba(255,255,255,0.12)",
              }}
            >
              <span className="text-sm text-gray-400">Dora is thinking...</span>
            </div>
          </div>
        )}
      </div>

      {/* ─── INPUT ─────────────────────────────────────────────── */}
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
            boxShadow: "0 0 25px rgba(16,185,129,0.08), 0 0 4px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.03)",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "rgba(16,185,129,0.6)";
            e.currentTarget.style.boxShadow = "0 0 35px rgba(16,185,129,0.25)";
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

      {/* ─── SUGGESTED QUESTIONS ───────────────────────────────── */}
      {messages.length === 0 && memoryLoaded && (
        <div className="flex flex-wrap gap-2 justify-center mt-3">
          {SUGGESTIONS.map((s) => (
            <button
              key={s.label}
              onClick={() => sendMessage(s.label)}
              disabled={loading}
              className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium text-gray-300 transition-all duration-200 disabled:opacity-40 hover:text-white hover:border-deal/50"
              style={{
                border: "1px solid rgba(255,255,255,0.1)",
                background: "rgba(255,255,255,0.03)",
              }}
            >
              <span>{s.icon}</span>
              <span>{s.label}</span>
            </button>
          ))}
        </div>
      )}

      <div className="flex items-center justify-between mt-4">
        <p className="flex items-center gap-1.5 text-xs text-gray-500">
          <Zap className="h-3 w-3 text-deal/50" />
          {remaining > 0
            ? `${remaining} free question${remaining !== 1 ? "s" : ""} left`
            : "Ready to deploy? →"}
        </p>
        {messages.length > 0 && (
          <a
            href="/pricing"
            className="text-xs font-semibold text-deal hover:text-deal-light transition-colors"
          >
            See plans & pricing →
          </a>
        )}
      </div>
    </div>
  );
}
