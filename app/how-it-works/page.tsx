import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Brain,
  Puzzle,
  UserCog,
  ArrowRight,
  ArrowDown,
  Zap,
  Lock,
  Infinity as InfinityIcon,
  MessageSquare,
  Layers,
  Shield,
} from "lucide-react";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Three layers. One agent. Your closer, amplified. See how Closers Assist is built — Core Brain, Industry Pack, and your Personal Layer.",
};

const layers = [
  {
    icon: Brain,
    tag: "LAYER 1",
    title: "Core Brain",
    subtitle: "Built by us. Sharpened every week.",
    body: "The foundation. Closing fundamentals, objection handling, follow-up timing, deal stage logic. Your agent doesn't start at zero — it starts as a senior closer, then learns your specifics.",
    bullets: [
      "The 7 core objection categories and how to diffuse each",
      "Follow-up cadence by deal temperature — hot, warm, cold, dead",
      "Trial close, assumptive close, alternative close language",
      "Discovery question banks for every pipeline stage",
      "Tone reading — when to push, when to back off, when to bring the manager",
    ],
  },
  {
    icon: Puzzle,
    tag: "LAYER 2",
    title: "Industry Pack",
    subtitle: "Auto-loaded the moment you pick your industry.",
    body: "Your world, in your agent's memory, from minute one. Pick auto and it arrives knowing pay plans, incentives, and Toyota Star Safety System. Pick real estate and it arrives fluent in commission splits, MLS workflow, and open house cadence.",
    bullets: [
      "Industry vocabulary — units, minis, streets, kicks, T.O., CXI (auto); cap, post-cap, splits, E&O (real estate)",
      "Manufacturer / broker / carrier incentive structures",
      "Pay plan templates — mini, flat, unit, volume bonus, retro, clawback",
      "Product knowledge libraries — specs, protocols, indications",
      "Regulatory Q&A — what you can and can't say by vertical",
    ],
  },
  {
    icon: UserCog,
    tag: "LAYER 3",
    title: "Your Personal Layer",
    subtitle: "Unlimited. Uncapped. Yours.",
    body: "Everything uniquely yours. Your actual pay plan. Your brochures. Your scripts. Your CRM data. Your customer memory. The agent's name (call it whatever — call it 'Dennis' if you want). No tier locks this down.",
    bullets: [
      "Unlimited file uploads — brochures, spec sheets, policy docs",
      "Unlimited custom skills — build your own, no code required",
      "Unlimited custom instructions — rewrite the agent's personality",
      "Unlimited integrations — CRM, email, calendar, phone system",
      "Unlimited memory — your agent never forgets a customer",
    ],
  },
];

const pillars = [
  {
    icon: Lock,
    title: "You own your data",
    body: "Export anytime. Cancel anytime and your data leaves with you. We never sell it, never use it to train models, never share it.",
  },
  {
    icon: InfinityIcon,
    title: "Zero feature gating",
    body: "Every tier ships the full agent. Starter, Pro, Elite — same capability. Tiers only differ by team size and support.",
  },
  {
    icon: Zap,
    title: "3 seconds to an answer",
    body: "On the lot, in the booth, at the customer's kitchen table. Faster than asking your manager. Built for phone-first use.",
  },
  {
    icon: Shield,
    title: "Built by a working rep",
    body: "The founder sells cars five days a week. The day he stops selling is the day this product stops being real.",
  },
];

const conversationSteps = [
  {
    role: "rep",
    label: "YOU",
    text: "Customer balking at $499/mo on RAV4 XLE lease.",
  },
  {
    role: "agent",
    label: "AGENT",
    text: "Pulling your pay plan, current Toyota lease incentive, and residual math on RAV4 XLE...",
    muted: true,
  },
  {
    role: "agent",
    label: "AGENT",
    text: "3 plays — ranked by proven close rate for this objection type (will refine as I learn your style):",
  },
  {
    role: "agent-list",
    label: "",
    text: [
      {
        title: "Reframe to weekly cost",
        body: "$499/mo = $115/week. Less than a tank of gas for the truck you're giving up.",
        rate: "78% close rate",
      },
      {
        title: "Drop to 36mo, show residual math",
        body: "Monthly drops to $449. Residual means $0 equity difference over 3 years.",
        rate: "71% close rate",
      },
      {
        title: "Pivot to XLE Hybrid",
        body: "+$20/mo, saves ~$110/mo in gas, better CXI ceiling on the delivery.",
        rate: "64% close rate",
      },
    ] as {
      title: string;
      body: string;
      rate: string;
    }[],
  },
];

export default function HowItWorksPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden loud-bg">
        <div className="grid-pattern" />

        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-20 md:pb-32 md:pt-28">
          <FadeIn>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-deal/40 bg-deal/10 px-3.5 py-1.5 backdrop-blur">
              <Layers className="h-3.5 w-3.5 text-deal-light" strokeWidth={2.2} />
              <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-deal-light">
                How it works
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <h1 className="font-display text-[48px] font-black leading-[0.98] tracking-[-0.02em] text-white md:text-[72px]">
              Three layers. One agent.
              <br />
              <span className="text-shine font-black">
                Your closer, amplified.
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={200}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ash md:text-xl">
              Most AI sales tools are a chatbot in a box. Closers Assist is a
              three-layer agent designed the way closers actually work —{" "}
              <span className="font-semibold text-gold-light">
                a senior brain, your industry&rsquo;s playbook, and your
                personal layer
              </span>{" "}
              stacked on top.
            </p>
          </FadeIn>

          <FadeIn delay={300}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href="/pricing"
                className="btn-loud group inline-flex items-center gap-2 rounded-xl px-7 py-4 text-[15px]"
              >
                Start free — $9.99/mo after
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  strokeWidth={2.5}
                />
              </Link>
              <Link
                href="/industries"
                className="btn-ghost rounded-xl px-6 py-4 text-[15px] font-semibold"
              >
                Browse industries
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 3 LAYERS — stacked cards */}
      <section className="relative overflow-hidden loud-bg-alt">
        <div className="relative mx-auto max-w-5xl px-6 py-20 md:py-28">
          <FadeIn>
            <div className="mb-14 text-center">
              <div className="mb-3 inline-flex items-center justify-center gap-2 rounded-full border border-deal/30 bg-deal/10 px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-deal shadow-[0_0_8px_#10B981]" />
                <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-deal-light">
                  The 3-layer agent
                </span>
              </div>
              <h2 className="font-display text-4xl font-black leading-[1.02] tracking-[-0.02em] text-white md:text-6xl">
                A brain. A playbook.{" "}
                <span className="text-shine font-black">Your voice.</span>
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg text-ash">
                Each layer is independent. Each layer makes the one above it
                smarter.
              </p>
            </div>
          </FadeIn>

          <div className="space-y-6">
            {layers.map((layer, i) => (
              <div key={layer.title}>
                <FadeIn delay={i * 100}>
                  <div className="loud-card group relative overflow-hidden rounded-2xl p-8">
                    <div
                      className="absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl transition-opacity group-hover:opacity-80"
                      style={{
                        background:
                          "radial-gradient(circle, rgba(16,185,129,0.25), transparent 70%)",
                      }}
                      aria-hidden
                    />
                    <div className="relative grid gap-6 md:grid-cols-[auto,1fr] md:items-start">
                      <div
                        className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl shadow-[0_8px_24px_rgba(16,185,129,0.3)]"
                        style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.2), rgba(16,185,129,0.05))" }}
                      >
                        <layer.icon
                          className="h-6 w-6 text-deal-light"
                          strokeWidth={2.2}
                        />
                      </div>
                      <div>
                        <div className="mb-1 text-[10px] font-bold uppercase tracking-[1.5px] text-gold-light">
                          {layer.tag}
                        </div>
                        <h3 className="font-display text-2xl font-black text-white md:text-3xl">
                          {layer.title}
                        </h3>
                        <p className="mt-1 text-sm font-bold text-deal-light">
                          {layer.subtitle}
                        </p>
                        <p className="mt-4 text-[15px] leading-relaxed text-ash">
                          {layer.body}
                        </p>
                        <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                          {layer.bullets.map((b) => (
                            <li
                              key={b}
                              className="flex items-start gap-2 text-sm leading-relaxed text-ash"
                            >
                              <span className="mt-1.5 h-1 w-1 flex-shrink-0 rounded-full bg-deal" />
                              <span>{b}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </FadeIn>
                {i < layers.length - 1 && (
                  <FadeIn delay={i * 100 + 50}>
                    <div className="flex justify-center py-3">
                      <ArrowDown
                        className="h-5 w-5 text-deal/40"
                        strokeWidth={2}
                      />
                    </div>
                  </FadeIn>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONVERSATION FLOW */}
      <section className="relative overflow-hidden loud-bg">
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
          <FadeIn>
            <div className="mb-14 text-center">
              <div className="mb-3 inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-deal" />
                <span className="text-xs font-medium uppercase tracking-widest text-deal">
                  How a single ask actually flows
                </span>
              </div>
              <h2 className="font-display text-4xl font-black leading-[1.02] tracking-[-0.02em] text-white md:text-6xl">
                You type.{" "}
                <span className="text-deal">Three layers answer.</span>
              </h2>
              <p className="mx-auto mt-5 max-w-2xl text-lg text-ash">
                Every query pulls from all three layers at once. Here&rsquo;s
                what actually happens when you open the app in a customer
                standoff.
              </p>
            </div>
          </FadeIn>

          {/* Chat-style example */}
          <FadeIn>
            <div className="rounded-2xl loud-card rounded-2xl p-5 md:p-8">
              <div className="mb-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-deal pulse-ring" />
                  <span className="font-display text-xs font-bold tracking-widest text-bone">
                    CLOSERS ASSIST
                  </span>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-[10px] text-muted">
                  <MessageSquare className="h-3 w-3" strokeWidth={2} />
                  <span>9:47 PM · On the lot</span>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {conversationSteps.map((s, i) => {
                  if (s.role === "rep") {
                    return (
                      <div key={i} className="flex justify-end">
                        <div className="max-w-[85%] rounded-2xl rounded-br-sm bg-iron px-4 py-3">
                          <div className="mb-1 font-mono text-[10px] font-medium tracking-widest text-muted">
                            {s.label}
                          </div>
                          <div className="text-[15px] leading-relaxed text-bone">
                            {s.text as string}
                          </div>
                        </div>
                      </div>
                    );
                  }
                  if (s.role === "agent") {
                    return (
                      <div key={i} className="flex">
                        <div
                          className={`max-w-[85%] rounded-2xl rounded-bl-sm border px-4 py-3 ${
                            s.muted
                              ? "border-white/15 bg-white/5"
                              : "border-deal/30 bg-deal/10"
                          }`}
                        >
                          <div className="mb-1 font-mono text-[10px] font-medium tracking-widest text-deal">
                            {s.label}
                          </div>
                          <div
                            className={`text-[15px] leading-relaxed ${
                              s.muted ? "italic text-ash" : "text-bone"
                            }`}
                          >
                            {s.text as string}
                          </div>
                        </div>
                      </div>
                    );
                  }
                  if (s.role === "agent-list") {
                    const items = s.text as {
                      title: string;
                      body: string;
                      rate: string;
                    }[];
                    return (
                      <div key={i} className="flex">
                        <div className="flex w-full max-w-[90%] flex-col gap-2">
                          {items.map((item, j) => (
                            <div
                              key={j}
                              className="flex items-start gap-3 rounded-lg loud-card rounded-lg p-4"
                            >
                              <span className="flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md bg-deal/15 font-mono text-xs font-medium text-deal">
                                {j + 1}
                              </span>
                              <div className="flex-1">
                                <div className="text-sm font-medium text-bone">
                                  {item.title}
                                </div>
                                <div className="mt-1 text-sm leading-relaxed text-ash">
                                  {item.body}
                                </div>
                              </div>
                              <span className="flex-shrink-0 rounded-sm bg-deal/15 px-2 py-0.5 font-mono text-[10px] font-medium text-deal">
                                {item.rate}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  }
                  return null;
                })}
              </div>
            </div>
          </FadeIn>

          <FadeIn>
            <p className="mt-8 text-center text-[15px] text-ash">
              Response time:{" "}
              <span className="font-mono font-medium text-deal">under 3 seconds.</span>{" "}
              Faster than asking your desk.
            </p>
          </FadeIn>
        </div>
      </section>

      {/* WHAT MAKES IT DIFFERENT — 4 pillars */}
      <section className="relative overflow-hidden loud-bg">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <FadeIn>
            <div className="mb-14 max-w-3xl">
              <div className="mb-3 flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-deal" />
                <span className="text-xs font-medium uppercase tracking-widest text-deal">
                  Why this is different
                </span>
              </div>
              <h2 className="font-display text-4xl font-black leading-[1.02] tracking-[-0.02em] text-white md:text-6xl">
                Not another chatbot.
                <br />
                <span className="text-deal">Not another CRM bolt-on.</span>
              </h2>
            </div>
          </FadeIn>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {pillars.map((p, i) => (
              <FadeIn key={p.title} delay={i * 80}>
                <div className="loud-card h-full rounded-2xl p-6">
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-md bg-deal/10">
                    <p.icon className="h-5 w-5 text-deal" strokeWidth={2} />
                  </div>
                  <h3 className="mb-2 text-lg font-medium text-bone">
                    {p.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-ash">{p.body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* COMPARISON TABLE */}
      <section className="relative overflow-hidden loud-bg">
        <div className="mx-auto max-w-5xl px-6 py-20 md:py-28">
          <FadeIn>
            <div className="mb-12 text-center">
              <div className="mb-3 inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-deal" />
                <span className="text-xs font-medium uppercase tracking-widest text-deal">
                  Head to head
                </span>
              </div>
              <h2 className="font-display text-4xl font-black leading-[1.02] tracking-[-0.02em] text-white md:text-6xl">
                Closers Assist vs.{" "}
                <span className="text-deal">your current stack.</span>
              </h2>
            </div>
          </FadeIn>

          <FadeIn>
            <div className="overflow-hidden rounded-2xl border border-white/10 bg-black/40 backdrop-blur">
              <div className="grid grid-cols-4 border-b border-iron">
                <div className="p-4 text-xs font-medium uppercase tracking-widest text-muted">
                  What matters
                </div>
                <div className="border-l border-iron bg-deal/5 p-4 text-center">
                  <div className="font-display text-sm font-bold text-deal">
                    CLOSERS ASSIST
                  </div>
                </div>
                <div className="border-l border-iron p-4 text-center text-sm text-ash">
                  Generic AI chatbot
                </div>
                <div className="border-l border-iron p-4 text-center text-sm text-ash">
                  Your CRM
                </div>
              </div>

              {[
                {
                  row: "Knows your pay plan",
                  ours: true,
                  chat: false,
                  crm: false,
                },
                {
                  row: "Knows your industry vocabulary",
                  ours: true,
                  chat: false,
                  crm: "partial",
                },
                {
                  row: "Remembers your customers",
                  ours: true,
                  chat: false,
                  crm: "partial",
                },
                {
                  row: "Ranks plays by YOUR close rate",
                  ours: true,
                  chat: false,
                  crm: false,
                },
                {
                  row: "Works on your phone on the lot",
                  ours: true,
                  chat: "partial",
                  crm: "partial",
                },
                { row: "You own your data", ours: true, chat: false, crm: false },
                {
                  row: "Unlimited everything at every tier",
                  ours: true,
                  chat: false,
                  crm: false,
                },
                {
                  row: "Under $10/rep starting price",
                  ours: true,
                  chat: "partial",
                  crm: false,
                },
              ].map((r, i) => (
                <div
                  key={i}
                  className="grid grid-cols-4 border-b border-iron last:border-b-0"
                >
                  <div className="p-4 text-sm text-bone">{r.row}</div>
                  <div className="flex items-center justify-center border-l border-iron bg-deal/5 p-4">
                    {r.ours === true && (
                      <span className="text-deal">✓</span>
                    )}
                  </div>
                  <div className="flex items-center justify-center border-l border-iron p-4 font-mono text-xs">
                    {r.chat === true && <span className="text-deal">✓</span>}
                    {r.chat === false && <span className="text-muted">—</span>}
                    {r.chat === "partial" && (
                      <span className="text-warn">partial</span>
                    )}
                  </div>
                  <div className="flex items-center justify-center border-l border-iron p-4 font-mono text-xs">
                    {r.crm === true && <span className="text-deal">✓</span>}
                    {r.crm === false && <span className="text-muted">—</span>}
                    {r.crm === "partial" && (
                      <span className="text-warn">partial</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden loud-bg">
        <div className="grid-pattern opacity-50" />
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(16,185,129,0.35) 0%, transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center md:py-32">
          <FadeIn>
            <h2 className="font-display text-5xl font-black leading-[0.95] tracking-[-0.03em] text-white md:text-7xl">
              Now you know how it works.
              <br />
              <span className="text-shine font-black">
                Time to put it to work.
              </span>
            </h2>
          </FadeIn>
          <FadeIn delay={150}>
            <p className="mx-auto mt-6 max-w-xl text-lg text-ash">
              14-day free trial. No credit card. Cancel in one click.
            </p>
          </FadeIn>
          <FadeIn delay={300}>
            <Link
              href="/pricing"
              className="btn-loud group mt-10 inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base"
            >
              Start free — $9.99/mo after
              <ArrowRight
                className="h-4 w-4 transition-transform group-hover:translate-x-1"
                strokeWidth={2.5}
              />
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
