"use client";

import { useState, useEffect, useRef, useCallback } from "react";
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

// Auto-demo Q&A pairs — cycles when chat is idle
const DEMO_QA: { q: string; a: string }[] = [
  {
    q: "I sell cars. What can this actually do for me?",
    a: "Everything a second brain should. I track your deals, calculate commissions in real time, remind you about follow-ups, and even handle your personal life — dentist appointments, family schedules, the works. One AI that knows both your floor and your life. 😏"
  },
  {
    q: "Is this just a ChatGPT wrapper?",
    a: "Nope. I'm built by a working car sales rep who closes deals every day. I know your pay plan, your draw, your bonus ladder. ChatGPT doesn't know a mini from a full deal. I do. I'm purpose-built for salespeople, not a general chatbot with a sales sticker."
  },
  {
    q: "How fast can I get one?",
    a: "Literally under 5 minutes. Pay, get a magic link, connect Telegram or WhatsApp, and I'm live. No setup. No training. I already know how to sell cars. You just tell me your pay plan and I handle the rest."
  },
  {
    q: "What's the catch?",
    a: "No catch. $29.99/mo, no contract, cancel anytime. The founder is a working rep at Sun Toyota — he built this for himself first, then realized every salesperson needed one. Try it. If I don't save you at least one deal a month, you're out $30. That's a lunch."
  },
];

export default function DemoChat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [remaining, setRemaining] = useState(10);
  const [showGreeting, setShowGreeting] = useState(true);
  const [sessionId, setSessionId] = useState("");
  const [demoIndex, setDemoIndex] = useState(0);
  const [demoStep, setDemoStep] = useState<"idle" | "typing_q" | "pause" | "typing_a" | "done">("idle");
  const [demoMessages, setDemoMessages] = useState<Message[]>([]);
  const demoTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const userHasInteracted = useRef(false);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Generate persistent session ID
  useEffect(() => {
    let sid = localStorage.getItem("clo_session");
    if (!sid) {
      sid = "visitor-" + Math.random().toString(36).slice(2, 10);
      localStorage.setItem("clo_session", sid);
    }
    setSessionId(sid);
  }, []);

  // Auto-scroll chat
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, loading, demoMessages, demoStep]);

  // ─── AUTO-DEMO LOOP ───────────────────────────────────────────────
  const startDemoLoop = useCallback(() => {
    if (userHasInteracted.current) return;

    const runDemo = (index: number) => {
      const pair = DEMO_QA[index % DEMO_QA.length];

      // Step 1: Show user question typing
      setDemoStep("typing_q");
      setDemoMessages([{ role: "user", text: "..." }]);

      demoTimeoutRef.current = setTimeout(() => {
        setDemoMessages([{ role: "user", text: pair.q }]);
        setDemoStep("pause");

        // Step 2: Pause, then show Dora typing
        demoTimeoutRef.current = setTimeout(() => {
          setDemoStep("typing_a");
          setDemoMessages([
            { role: "user", text: pair.q },
            { role: "clo", text: "..." },
          ]);

          // Step 3: Show Dora's answer
          demoTimeoutRef.current = setTimeout(() => {
            setDemoMessages([
              { role: "user", text: pair.q },
              { role: "clo", text: pair.a },
            ]);
            setDemoStep("done");

            // Step 4: Smooth transition to next pair — no clear, no gap
            demoTimeoutRef.current = setTimeout(() => {
              runDemo((index + 1) % DEMO_QA.length);
            }, 5000);
          }, 1200);
        }, 800);
      }, 800);
    };

    // Initial delay before first demo
    demoTimeoutRef.current = setTimeout(() => runDemo(0), 4000);
  }, []);

  useEffect(() => {
    if (showGreeting && messages.length === 0) {
      startDemoLoop();
    }
    return () => {
      if (demoTimeoutRef.current) clearTimeout(demoTimeoutRef.current);
    };
  }, [showGreeting, messages.length, startDemoLoop]);

  // ─── SEND MESSAGE ──────────────────────────────────────────────────
  async function sendMessage(text: string) {
    if (!text.trim() || loading) return;

    // Kill demo immediately
    if (demoTimeoutRef.current) clearTimeout(demoTimeoutRef.current);
    userHasInteracted.current = true;
    setDemoMessages([]);
    setDemoStep("idle");

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

  // Render a single message bubble
  function MessageBubble({ msg }: { msg: Message }) {
    const isUser = msg.role === "user";
    const isTyping = msg.text === "...";

    return (
      <div className={`flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-300 ${isUser ? "justify-end" : ""}`}>
        {!isUser && (
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-deal to-emerald-400 flex items-center justify-center shrink-0 mt-0.5 shadow-[0_0_12px_rgba(16,185,129,0.2)]">
            <Sparkles className="h-3.5 w-3.5 text-black" />
          </div>
        )}
        <div
          className={`rounded-2xl px-5 py-3.5 text-sm leading-relaxed max-w-[85%] ${
            isUser ? "rounded-br-md text-white" : "rounded-tl-md text-gray-300"
          } ${isTyping ? "min-w-[60px]" : ""}`}
          style={
            isUser
              ? {
                  background: "rgba(16,185,129,0.15)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  border: "1px solid rgba(16,185,129,0.3)",
                  boxShadow: "0 0 20px rgba(16,185,129,0.12)",
                }
              : {
                  background: "rgba(5,5,6,0.5)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                  border: "1px solid rgba(255,255,255,0.15)",
                  boxShadow: "0 0 20px rgba(0,0,0,0.3)",
                }
          }
        >
          {isTyping ? (
            <div className="flex gap-1.5 py-1">
              <span className="w-2 h-2 rounded-full bg-deal/60 animate-bounce" style={{ animationDelay: "0ms" }} />
              <span className="w-2 h-2 rounded-full bg-deal/60 animate-bounce" style={{ animationDelay: "150ms" }} />
              <span className="w-2 h-2 rounded-full bg-deal/60 animate-bounce" style={{ animationDelay: "300ms" }} />
            </div>
          ) : (
            <span className="whitespace-pre-wrap">{msg.text}</span>
          )}
        </div>
        {isUser && (
          <div className="w-8 h-8 rounded-xl bg-white/[0.06] border border-white/[0.08] flex items-center justify-center shrink-0 mt-0.5">
            <User className="h-3.5 w-3.5 text-gray-400" />
          </div>
        )}
      </div>
    );
  }

  const displayMessages = userHasInteracted.current ? messages : demoMessages;
  const isDemoPlaying = !userHasInteracted.current && demoMessages.length > 0;

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* ─── LIVE DEMO BADGE ─────────────────────────────────── */}
      {!userHasInteracted.current && (
        <div className="flex justify-center mb-3">
          <div className="inline-flex items-center gap-2 rounded-full border border-deal/40 bg-deal/10 backdrop-blur px-4 py-1.5">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-deal opacity-75 animate-ping" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-deal shadow-[0_0_8px_#10B981]" />
            </span>
            <span className="text-xs font-bold uppercase tracking-[1.5px] text-deal-light">
              LIVE DEMO — Watch Dora in action
            </span>
          </div>
        </div>
      )}

      {/* ─── CHAT AREA ────────────────────────────────────────── */}
      <div
        ref={chatContainerRef}
        className="space-y-4 mb-4 max-h-[380px] min-h-[200px] overflow-y-auto scrollbar-thin overscroll-contain rounded-2xl p-4"
        style={{
          background: "rgba(5,5,6,0.35)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "1px solid rgba(16,185,129,0.2)",
          boxShadow: "0 0 40px rgba(16,185,129,0.08), inset 0 1px 0 rgba(255,255,255,0.03)",
        }}
      >
        {/* Auto greeting */}
        {showGreeting && messages.length === 0 && !isDemoPlaying && (
          <div className="flex gap-3 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-deal to-emerald-400 flex items-center justify-center shrink-0 mt-0.5 shadow-[0_0_16px_rgba(16,185,129,0.3)]">
              <Sparkles className="h-4 w-4 text-black" />
            </div>
            <div
              className="rounded-2xl rounded-tl-md px-5 py-4 text-base text-gray-200 leading-relaxed max-w-md"
              style={{
                background: "rgba(5,5,6,0.55)",
                backdropFilter: "blur(12px)",
                WebkitBackdropFilter: "blur(12px)",
                border: "1px solid rgba(16,185,129,0.3)",
                boxShadow:
                  "0 0 30px rgba(16,185,129,0.12), 0 0 60px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.04)",
              }}
            >
              <p className="font-bold text-deal-light mb-1 text-lg">Hey! I'm Dora 👋</p>
              <p className="text-gray-200 text-base">
                I'm the AI host here at ClosersAssist. I handle sales objections, track commissions,
                remind you about dentist appointments — basically everything.{" "}
                <span className="text-white font-semibold">What do you do for a living?</span>
              </p>
              <p className="text-sm text-gray-500 mt-2 font-medium">
                (I'm real AI — not a scripted chatbot. Try me. 😏)
              </p>
            </div>
          </div>
        )}

        {/* Demo messages */}
        {isDemoPlaying &&
          demoMessages.map((msg, i) => (
            <div key={`demo-${i}`} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <MessageBubble msg={msg} />
            </div>
          ))}

        {/* Real messages */}
        {userHasInteracted.current &&
          messages.map((msg, i) => (
            <div key={i} className="animate-in fade-in slide-in-from-bottom-2 duration-300">
              <MessageBubble msg={msg} />
            </div>
          ))}

        {/* Typing indicator (real) */}
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

        {/* Demo label watermark */}
        {isDemoPlaying && (
          <div className="text-center mt-2">
            <span className="text-[10px] text-gray-600 uppercase tracking-widest font-semibold">
              ● Auto-demo playing — type to talk to Dora
            </span>
          </div>
        )}
      </div>

      {/* ─── SUGGESTED QUESTIONS ───────────────────────────────── */}
      {messages.length === 0 && showGreeting && (
        <div className="mb-4">
          <p className="text-sm text-gray-400 mb-3 text-center font-semibold tracking-wide">
            Or tap a question:
          </p>
          <div className="flex flex-wrap gap-2.5 justify-center">
            {SUGGESTIONS.map((s) => (
              <button
                key={s.label}
                onClick={() => sendMessage(s.label)}
                disabled={loading}
                className="inline-flex items-center gap-1.5 sm:gap-2 rounded-full px-3.5 py-2.5 sm:px-5 sm:py-3 text-sm sm:text-base font-semibold text-white transition-all duration-300 disabled:opacity-40"
                style={{
                  border: "1.5px solid rgba(16,185,129,0.35)",
                  background: "linear-gradient(135deg, rgba(16,185,129,0.08), rgba(5,5,6,0.5))",
                  boxShadow: "0 0 20px rgba(16,185,129,0.12), 0 0 2px rgba(16,185,129,0.1)",
                  backdropFilter: "blur(8px)",
                  WebkitBackdropFilter: "blur(8px)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(16,185,129,0.8)";
                  e.currentTarget.style.background =
                    "linear-gradient(135deg, rgba(16,185,129,0.15), rgba(5,5,6,0.6))";
                  e.currentTarget.style.boxShadow =
                    "0 0 35px rgba(16,185,129,0.35), 0 0 8px rgba(16,185,129,0.2)";
                  e.currentTarget.style.transform = "scale(1.05)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "rgba(16,185,129,0.35)";
                  e.currentTarget.style.background =
                    "linear-gradient(135deg, rgba(16,185,129,0.08), rgba(5,5,6,0.5))";
                  e.currentTarget.style.boxShadow =
                    "0 0 20px rgba(16,185,129,0.12), 0 0 2px rgba(16,185,129,0.1)";
                  e.currentTarget.style.transform = "scale(1)";
                }}
              >
                <span className="text-lg">{s.icon}</span>
                <span>{s.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

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
            boxShadow:
              "0 0 25px rgba(16,185,129,0.08), 0 0 4px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.03)",
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = "rgba(16,185,129,0.6)";
            e.currentTarget.style.boxShadow =
              "0 0 35px rgba(16,185,129,0.25), 0 0 12px rgba(16,185,129,0.15), inset 0 1px 0 rgba(255,255,255,0.04)";
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = "rgba(255,255,255,0.2)";
            e.currentTarget.style.boxShadow =
              "0 0 25px rgba(16,185,129,0.08), 0 0 4px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.03)";
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

      {/* ─── GOLD CTA ──────────────────────────────────────────── */}
      <div className="mt-5 flex flex-col items-center gap-3">
        <a
          href="/pricing"
          className="group inline-flex items-center gap-3 rounded-xl px-8 py-4 text-base font-bold text-black transition-all duration-300 hover:scale-105"
          style={{
            background: "linear-gradient(135deg, #FBBF24 0%, #F59E0B 50%, #D97706 100%)",
            boxShadow: "0 0 40px rgba(251,191,36,0.35), 0 4px 20px rgba(0,0,0,0.3)",
          }}
        >
          Talk to Dora — $29.99/mo
          <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
        </a>
        <p className="flex items-center gap-2 text-xs text-gray-500">
          <Zap className="h-3 w-3 text-deal/60" />
          {remaining > 0
            ? `${remaining} free question${remaining !== 1 ? "s" : ""} left`
            : "Ready to deploy? →"}
        </p>
      </div>
    </div>
  );
}
