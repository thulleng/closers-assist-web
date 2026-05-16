import Link from "next/link";
import { ArrowRight, Check, X, Brain, Database, UserPlus, MessageCircle, Shield, Clock, DollarSign, Zap } from "lucide-react";
import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Compare — Closers Assist vs ChatGPT, CRM, and Hiring an Assistant",
  description: "See how Closers Assist stacks up against ChatGPT, traditional CRMs, and hiring a human assistant. Built for closers. Not engineers.",
};

const comparisonRows = [
  {
    feature: "Knows your pay plan",
    closers: true,
    chatgpt: false,
    crm: false,
    human: "If you tell them",
    closersDetail: "Calculates commission, draw, bonuses, tier breaks — live",
  },
  {
    feature: "Remembers every customer",
    closers: true,
    chatgpt: false,
    crm: "Contacts only",
    human: "If they take notes",
    closersDetail: "Cross-session memory. Knows what you said to Johnson in March",
  },
  {
    feature: "Speaks your industry's language",
    closers: true,
    chatgpt: false,
    crm: false,
    human: "After training",
    closersDetail: "18 industries, real vocabulary. Minis, T.O.s, CXI, clawbacks",
  },
  {
    feature: "Available 24/7",
    closers: true,
    chatgpt: true,
    crm: true,
    human: false,
    closersDetail: "Never clocks out. Nights, weekends, holidays — always on",
  },
  {
    feature: "Cost per month",
    closers: "$29.99",
    chatgpt: "$20",
    crm: "$25–$300",
    human: "$2,500–$5,000",
    closersDetail: "One extra deal pays for years. Not months — years",
  },
  {
    feature: "Setup time",
    closers: "< 5 min",
    chatgpt: "Instant",
    crm: "Days to weeks",
    human: "Weeks",
    closersDetail: "Pick your industry. Deploy on Telegram. Start closing",
  },
  {
    feature: "Learns your style",
    closers: true,
    chatgpt: false,
    crm: false,
    human: "Eventually",
    closersDetail: "Your scripts, your voice, your objections. Gets better every deal",
  },
  {
    feature: "Handles personal life too",
    closers: true,
    chatgpt: "Partially",
    crm: false,
    human: "If you ask",
    closersDetail: "Calendar, appointments, reminders, travel — your second brain",
  },
  {
    feature: "CRM integration",
    closers: "Enterprise",
    chatgpt: false,
    crm: "Native",
    human: "Manual",
    closersDetail: "Custom integration for Enterprise. Skill add-on for other tiers",
  },
  {
    feature: "No contracts",
    closers: true,
    chatgpt: true,
    crm: false,
    human: false,
    closersDetail: "Month-to-month. Cancel in 1 click. No retention calls",
  },
];

const scenarios = [
  {
    title: "You're on the floor. A customer objects on price.",
    icon: MessageCircle,
    closers: "Pull up their deal. Your agent already calculated 3 plays based on your pay plan — reframe to weekly, drop to 36mo, pivot trim. < 3 seconds.",
    chatgpt: "Ask ChatGPT what to say about price objections. Get generic advice. Paste it. Hope it matches your pay plan math. 2+ minutes.",
    assistant: "Call your assistant. Wait for them to pull up the deal. Hope they remember the pay plan math. 5–10 minutes — if they pick up.",
  },
  {
    title: "A lead from 3 months ago walks back on the lot.",
    icon: Brain,
    closers: "Your agent instantly recalls: name, vehicle, objection, what closed them. Picks up the conversation like it was yesterday.",
    chatgpt: "Start a new chat. Re-explain everything. ChatGPT has no memory of the last conversation. Hope you took notes.",
    assistant: "Dig through old emails or CRM notes. Maybe find it. Maybe not. 10+ minutes of context rebuilding.",
  },
  {
    title: "It's 10 PM. A lead texts about a car they saw online.",
    icon: Clock,
    closers: "Your agent responds immediately. Qualifies the lead. Books the appointment. You wake up to a confirmed test drive at 10 AM.",
    chatgpt: "ChatGPT is available but it's just giving generic advice. It can't book anything, log anything, or follow your process.",
    assistant: "They're asleep. Lead goes cold. You respond in the morning — 12 hours later. In car sales, that lead is already at another dealership.",
  },
];

const verdicts = [
  {
    vs: "ChatGPT",
    icon: Zap,
    summary: "ChatGPT is a tool. Closers Assist is an employee.",
    detail: "ChatGPT gives you answers. Closers Assist remembers your deals, knows your pay plan, speaks your industry, and handles your personal life. One starts from zero every chat. The other picks up where you left off. If you're a closer, the difference is the difference between a calculator and a closer.",
  },
  {
    vs: "Traditional CRM",
    icon: Database,
    summary: "Your CRM tracks deals. We close them.",
    detail: "CRMs were built for managers — pipeline reports, forecasting, activity tracking. Closers Assist was built for the rep on the floor. It doesn't just log what happened — it tells you what to say next, with your scripts, your math, and your voice. A CRM is a filing cabinet. Closers Assist is the closer standing next to you.",
  },
  {
    vs: "Hiring an Assistant",
    icon: UserPlus,
    summary: "$29.99/mo vs $3,000/mo. Never calls in sick.",
    detail: "A human assistant costs $3,000–5,000/month, works 40 hours, takes breaks, forgets things, and can't be on the floor with you during a T.O. Closers Assist costs $29.99/month, works 24/7, never forgets a detail, and is always one tap away on Telegram. For the cost of one lunch, you get an employee who never clocks out.",
  },
];

export default function ComparePage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden loud-bg">
        <div className="grid-pattern opacity-40 pointer-events-none absolute inset-0" />
        <div
          className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(16,185,129,0.12), transparent 70%)" }}
        />
        <div className="relative mx-auto max-w-5xl px-6 py-20 md:py-28">
          <FadeIn>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-deal/30 bg-deal/10 px-3.5 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-deal shadow-[0_0_8px_#10B981]" />
              <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-deal-light">
                Head to head
              </span>
            </div>
            <h1 className="font-display text-4xl font-black leading-[1.05] tracking-[-0.02em] text-white md:text-6xl">
              An AI employee vs
              <br />
              <span className="text-shine font-black">everything else.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ash">
              See exactly how Closers Assist stacks up against ChatGPT, traditional CRMs,
              and hiring a human assistant. No marketing. Just the math.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* Comparison Table */}
      <section className="relative overflow-hidden loud-bg-alt border-t border-white/5">
        <div className="relative mx-auto max-w-5xl px-6 py-16 md:py-24">
          <FadeIn>
            <h2 className="font-display text-3xl font-black leading-[1.05] tracking-[-0.02em] text-white text-center mb-12">
              The full breakdown
            </h2>
          </FadeIn>

          <FadeIn delay={100}>
            <div className="overflow-x-auto">
              <div className="min-w-[700px] overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur">
                {/* Header */}
                <div className="grid grid-cols-[1.4fr,1fr,1fr,1fr,1fr] border-b border-iron bg-white/[0.03]">
                  <div className="p-4 text-xs font-medium uppercase tracking-widest text-muted">Feature</div>
                  <div className="border-l border-iron p-4 text-center">
                    <span className="font-display text-xs font-bold text-deal">CLOSERS ASSIST</span>
                  </div>
                  <div className="border-l border-iron p-4 text-center">
                    <span className="text-xs font-semibold text-ash">ChatGPT</span>
                  </div>
                  <div className="border-l border-iron p-4 text-center">
                    <span className="text-xs font-semibold text-ash">CRM</span>
                  </div>
                  <div className="border-l border-iron p-4 text-center">
                    <span className="text-xs font-semibold text-ash">Human Asst.</span>
                  </div>
                </div>

                {/* Rows */}
                {comparisonRows.map((row, i) => (
                  <div
                    key={row.feature}
                    className={`grid grid-cols-[1.4fr,1fr,1fr,1fr,1fr] transition-colors hover:bg-white/[0.02] ${
                      i < comparisonRows.length - 1 ? "border-b border-iron" : ""
                    }`}
                  >
                    <div className="p-4">
                      <div className="text-sm font-semibold text-white">{row.feature}</div>
                      <div className="mt-0.5 text-[11px] text-muted">{row.closersDetail}</div>
                    </div>
                    <div className="flex items-center justify-center border-l border-iron bg-deal/[0.06] p-4">
                      {typeof row.closers === "boolean" ? (
                        row.closers ? (
                          <Check className="h-5 w-5 text-deal" strokeWidth={3} />
                        ) : (
                          <X className="h-5 w-5 text-red-400/60" strokeWidth={2} />
                        )
                      ) : (
                        <span className="text-sm font-bold text-deal">{row.closers}</span>
                      )}
                    </div>
                    <div className="flex items-center justify-center border-l border-iron p-4">
                      {typeof row.chatgpt === "boolean" ? (
                        row.chatgpt ? (
                          <Check className="h-4 w-4 text-ash/40" strokeWidth={2} />
                        ) : (
                          <X className="h-4 w-4 text-red-400/40" strokeWidth={2} />
                        )
                      ) : (
                        <span className="text-sm text-ash">{row.chatgpt}</span>
                      )}
                    </div>
                    <div className="flex items-center justify-center border-l border-iron p-4">
                      {typeof row.crm === "boolean" ? (
                        row.crm ? (
                          <Check className="h-4 w-4 text-ash/40" strokeWidth={2} />
                        ) : (
                          <X className="h-4 w-4 text-red-400/40" strokeWidth={2} />
                        )
                      ) : (
                        <span className="text-sm text-ash">{row.crm}</span>
                      )}
                    </div>
                    <div className="flex items-center justify-center border-l border-iron p-4">
                      {typeof row.human === "boolean" ? (
                        row.human ? (
                          <Check className="h-4 w-4 text-ash/40" strokeWidth={2} />
                        ) : (
                          <X className="h-4 w-4 text-red-400/40" strokeWidth={2} />
                        )
                      ) : (
                        <span className="text-sm text-ash">{row.human}</span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Real Scenarios */}
      <section className="relative overflow-hidden loud-bg border-t border-white/5">
        <div className="relative mx-auto max-w-5xl px-6 py-16 md:py-24">
          <FadeIn>
            <h2 className="font-display text-3xl font-black leading-[1.05] tracking-[-0.02em] text-white text-center mb-4">
              Real scenarios.
              <span className="text-shine font-black"> Real differences.</span>
            </h2>
            <p className="text-center text-ash mb-12">Three moments every closer knows. Here's how each option performs.</p>
          </FadeIn>

          <div className="space-y-8">
            {scenarios.map((s, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="loud-card rounded-2xl overflow-hidden border border-white/5">
                  <div className="flex items-center gap-3 border-b border-white/5 bg-white/[0.02] px-6 py-4">
                    <s.icon className="h-5 w-5 text-deal-light" strokeWidth={2.2} />
                    <h3 className="text-[15px] font-bold text-white">{s.title}</h3>
                  </div>
                  <div className="grid gap-0 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/5">
                    <div className="p-5 bg-deal/[0.04]">
                      <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-deal/20 px-2.5 py-0.5">
                        <span className="h-1 w-1 rounded-full bg-deal" />
                        <span className="text-[10px] font-bold uppercase tracking-wider text-deal-light">Closers Assist</span>
                      </div>
                      <p className="text-sm leading-relaxed text-bone">{s.closers}</p>
                    </div>
                    <div className="p-5">
                      <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-0.5">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-ash">ChatGPT</span>
                      </div>
                      <p className="text-sm leading-relaxed text-muted">{s.chatgpt}</p>
                    </div>
                    <div className="p-5">
                      <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-white/5 px-2.5 py-0.5">
                        <span className="text-[10px] font-semibold uppercase tracking-wider text-ash">Human Assistant</span>
                      </div>
                      <p className="text-sm leading-relaxed text-muted">{s.assistant}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Verdicts */}
      <section className="relative overflow-hidden loud-bg-alt border-t border-white/5">
        <div className="relative mx-auto max-w-5xl px-6 py-16 md:py-24">
          <FadeIn>
            <h2 className="font-display text-3xl font-black leading-[1.05] tracking-[-0.02em] text-white text-center mb-12">
              The verdict
            </h2>
          </FadeIn>

          <div className="grid gap-6 md:grid-cols-3">
            {verdicts.map((v, i) => (
              <FadeIn key={i} delay={i * 100}>
                <div className="loud-card rounded-2xl p-7 border border-white/5 h-full flex flex-col">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-deal/10">
                      <v.icon className="h-4 w-4 text-deal-light" strokeWidth={2.2} />
                    </div>
                    <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-deal-light">
                      vs {v.vs}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-3">{v.summary}</h3>
                  <p className="text-sm leading-relaxed text-ash flex-1">{v.detail}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ROI Banner */}
      <section className="relative overflow-hidden border-t border-white/5"
        style={{ background: "linear-gradient(180deg, #050506 0%, #0a0a0e 100%)" }}>
        <div className="pointer-events-none absolute left-1/2 top-1/2 h-64 w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl opacity-40"
          style={{ background: "radial-gradient(circle, rgba(16,185,129,0.2) 0%, transparent 60%)" }} />
        <FadeIn>
          <div className="relative mx-auto max-w-3xl px-6 py-20 text-center md:py-24">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-gold-light shadow-[0_0_8px_#FBBF24]" />
              <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-gold-light">
                The bottom line
              </span>
            </div>
            <h2 className="font-display text-4xl font-black leading-[1.05] tracking-[-0.02em] text-white md:text-6xl">
              One extra deal pays for
              <br />
              <span className="text-mega-amber font-black">10 years of Closers Assist.</span>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-ash">
              ChatGPT can't close deals. Your CRM can't close deals. A human assistant costs 100x more.
              <br />
              <span className="font-semibold text-white">Closers Assist closes them with you.</span>
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/pricing"
                className="btn-loud inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm"
              >
                See Pricing
                <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
              </Link>
              <Link
                href="/how-it-works"
                className="inline-flex items-center gap-2 rounded-xl border border-white/10 px-6 py-3 text-sm font-medium text-ash hover:text-white hover:border-white/20 transition-all"
              >
                How it works →
              </Link>
            </div>
            <p className="mt-4 text-sm text-muted">
              14-day free trial. No credit card. Cancel anytime.
            </p>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
