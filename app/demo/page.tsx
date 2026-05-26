"use client";

import { useState } from "react";
import Link from "next/link";
import { Play, MessageSquare, DollarSign, BarChart3, Target } from "lucide-react";
import { useLang } from "@/lib/LangContext";

const DEMO_STEPS = [
  {
    icon: MessageSquare,
    title: "1. Log a deal",
    desc: "Rep types 'I just sold a Camry to Jane Foster — full deal, $3,200 front.' AI logs it, calculates $800 commission, tracks the unit toward their bonus.",
    prompt: "I just sold a Camry to Jane Foster — full deal, $3,200 front gross",
  },
  {
    icon: DollarSign,
    title: "2. Check your pay",
    desc: "Dashboard auto-updates. Units, commission, draw balance, bonus progress — all live. 'You're 2 units from a $500 bonus.'",
    prompt: "Where am I at this month?",
  },
  {
    icon: Target,
    title: "3. Handle an objection",
    desc: "Rep says 'Customer wants to think about it.' AI gives the exact script, then writes a 4-day follow-up sequence.",
    prompt: "Customer Jane Foster wants to think about the Camry. Payment objection — she wants under $500/mo. What do I say and write me follow-ups?",
  },
  {
    icon: BarChart3,
    title: "4. Beat a competitor",
    desc: "'Customer is cross-shopping an Accord.' AI returns 3 wins, 1 honest acknowledgment, and a pivot line. No googling on the lot.",
    prompt: "Customer is comparing our 2026 Camry XSE to a Honda Accord Sport. Give me the battle card.",
  },
];

export default function DemoPage() {
  const [copyIndex, setCopyIndex] = useState<number | null>(null);
  const { tl } = useLang();

  const copyPrompt = async (text: string, i: number) => {
    try { await navigator.clipboard.writeText(text); } catch { /* ok */ }
    setCopyIndex(i);
    setTimeout(() => setCopyIndex(null), 2000);
  };

  return (
    <section className="relative min-h-screen overflow-hidden loud-bg">
      <div className="grid-pattern opacity-40" />
      <div className="pointer-events-none absolute top-0 right-0 h-[600px] w-[600px] rounded-full blur-[150px] opacity-20"
        style={{ background: "radial-gradient(circle, rgba(16,185,129,0.5), transparent 70%)" }} />

      <div className="relative mx-auto max-w-4xl px-6 py-16">
        {/* Hero */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-deal/30 bg-deal/10 px-4 py-1.5">
            <Play className="h-3 w-3 text-deal" strokeWidth={2.5} />
            <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-deal-light">Live Demo</span>
          </div>
          <h1 className="text-shine font-display text-4xl font-black tracking-tight sm:text-6xl">See it work</h1>
          <p className="mt-4 text-lg text-ash">Every closer's second brain. In under 2 minutes.</p>
        </div>

        {/* Video */}
        <div className="mb-16">
          <div className="relative mx-auto max-w-3xl overflow-hidden rounded-2xl border border-white/10 shadow-[0_0_60px_rgba(16,185,129,0.12)]">
<video
              src="/demo-90s.mp4?v=3"
              controls
              poster="/images/video-poster.jpg"
              className="w-full"
              preload="metadata"
            />
          </div>
          <p className="mt-3 text-center text-xs text-muted">
            From sign-up to your first closed deal — everything you need.
          </p>
        </div>

        {/* Steps */}
        <div className="mb-16 space-y-4">
          <h2 className="mb-6 text-center font-display text-2xl font-bold text-white">Try it yourself</h2>
          <p className="mb-8 text-center text-sm text-ash">
            Open{" "}
            <a href="https://dealclozr.com" target="_blank" rel="noopener" className="text-deal hover:underline">
              dealclozr.com
            </a>
            {" "}in another tab. Copy any prompt below and paste it into the chat.
          </p>

          {DEMO_STEPS.map((s, i) => (
            <div key={i} className="glass-panel rounded-2xl p-5">
              <div className="flex items-start gap-4">
                <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-deal/15">
                  <s.icon className="h-5 w-5 text-deal" strokeWidth={2} />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-bold text-bone">{s.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-ash">{s.desc}</p>
                  <div className="mt-3 flex items-center gap-2">
                    <code className="flex-1 rounded-lg border border-iron bg-slate px-3 py-2 text-[13px] text-bone break-all">
                      {s.prompt}
                    </code>
                    <button
                      onClick={() => copyPrompt(s.prompt, i)}
                      className="flex-shrink-0 rounded-lg border border-deal/40 bg-deal/10 px-3 py-2 text-xs font-semibold text-deal transition-colors hover:bg-deal/20"
                    >
                      {copyIndex === i ? "Copied ✓" : "Copy"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center">
          <Link href="/pricing" className="btn-loud inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base">
            Start your free trial <span className="text-deal-light">→</span>
          </Link>
          <p className="mt-3 text-xs text-muted">$29.99/month. 14-day trial. Cancel anytime.</p>
        </div>
      </div>
    </section>
  );
}
