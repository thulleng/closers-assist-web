"use client";

import { useState } from "react";
import { ArrowRight, Loader2, Sparkles } from "lucide-react";

export default function DemoChat() {
  const [question, setQuestion] = useState("");
  const [reply, setReply] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [remaining, setRemaining] = useState(3);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!question.trim() || loading) return;

    setLoading(true);
    try {
      const res = await fetch("/api/demo-chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: question }),
      });
      const data = await res.json();

      if (data.error && res.status === 429) {
        setReply(
          "You've used all your demo questions. Time to go unlimited — $29.99/month, 14-day free trial."
        );
        setRemaining(0);
      } else if (data.reply) {
        setReply(data.reply);
        setRemaining(data.remaining ?? remaining - 1);
      } else {
        setReply("Something went wrong. Try again?");
      }
    } catch {
      setReply("Couldn't reach the server. Try again in a moment.");
    }
    setLoading(false);
  }

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Input area */}
      {!reply && (
        <form onSubmit={handleSubmit} className="space-y-3">
          <div className="relative">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder='Try it: "How do I handle a price objection on a Camry?"'
              maxLength={500}
              className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-5 py-4 pr-14 text-sm text-white placeholder:text-gray-500 focus:border-deal/50 focus:outline-none transition-colors backdrop-blur"
            />
            <button
              type="submit"
              disabled={loading || !question.trim()}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-deal p-2 text-black hover:bg-deal-light transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <ArrowRight className="h-4 w-4" />
              )}
            </button>
          </div>
          <p className="text-center text-xs text-gray-600">
            Free demo — {remaining} questions remaining. No signup required.
          </p>
        </form>
      )}

      {/* Response area */}
      {reply && (
        <div className="space-y-5">
          {/* The question */}
          <div className="text-right">
            <span className="inline-block rounded-2xl rounded-br-md bg-deal/10 border border-deal/20 px-4 py-2.5 text-sm text-white max-w-md text-left">
              {question}
            </span>
          </div>

          {/* The AI reply */}
          <div className="flex gap-3">
            <div className="w-8 h-8 rounded-lg bg-deal/10 flex items-center justify-center shrink-0 mt-0.5">
              <Sparkles className="h-4 w-4 text-deal" />
            </div>
            <div className="rounded-2xl rounded-tl-md bg-white/[0.03] border border-white/[0.06] px-5 py-4 text-sm text-gray-300 leading-relaxed max-w-lg">
              {reply}
            </div>
          </div>

          {/* CTA */}
          <div className="text-center pt-2">
            <p className="text-sm text-gray-500 mb-3">
              {remaining > 0
                ? `${remaining} free question${remaining !== 1 ? "s" : ""} left.`
                : "That was your last demo question."}
            </p>
            {remaining > 0 ? (
              <button
                onClick={() => {
                  setReply(null);
                  setQuestion("");
                }}
                className="text-xs text-gray-600 hover:text-gray-400 underline underline-offset-2 mr-4"
              >
                Ask another
              </button>
            ) : null}
            <a
              href="/pricing"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-deal hover:text-deal-light transition-colors"
            >
              Get unlimited access — $29.99/mo
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
