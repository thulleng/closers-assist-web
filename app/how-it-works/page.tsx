import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Building2,
  UserCog,
  Zap,
  TrendingUp,
} from "lucide-react";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "How It Works",
  description:
    "Four steps. Pick your industry, set up your profile, use it live during deals, and watch it learn your style. Closers Assist is built for the floor.",
};

const steps = [
  {
    number: "01",
    icon: Building2,
    title: "Pick your industry",
    body: "Select your vertical — auto, real estate, insurance, solar, SaaS, or any of the 18 supported industries. Your agent auto-loads the vocabulary, pay plan structures, and product knowledge for your world the moment you sign up. No setup wizard. No onboarding call.",
    detail: "Works for: Turo hosts, Toyota reps, Airbnb operators, insurance agents, mortgage brokers, SaaS AEs, and 12 more.",
  },
  {
    number: "02",
    icon: UserCog,
    title: "Set up your profile",
    body: "Upload your actual pay plan. Drop in your scripts, your brochures, your CRM export. Add custom instructions in plain English — tell the agent your personality, your manager's name, your objection style. Takes 10 minutes. Pays back immediately.",
    detail: "Your data. Your agent. No one else sees it, uses it, or trains on it.",
  },
  {
    number: "03",
    icon: Zap,
    title: "Use it live during deals",
    body: "Customer's balking at the payment? Type it in. Need the exact lease residual math? Ask. Want a follow-up text for the customer who ghosted after a test drive? Done in 3 seconds. Works on your phone, on the lot, in the box, at the kitchen table.",
    detail: "Objection plays. Payment math. Commission calc. Follow-up scripts. All of it, instantly.",
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "It learns your style",
    body: "Every play you use, every script you tweak, every deal it helps you close — the agent refines to you. Your close rate data shapes which plays it ranks first. After 30 days it knows your style better than a manager who's been watching you for a year.",
    detail: "The longer you use it, the sharper it gets. It doesn't forget a customer, a deal, or a pattern.",
  },
];

export default function HowItWorksPage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden loud-bg">
        <div className="grid-pattern" />
        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-20 md:pb-32 md:pt-28">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-deal/40 bg-deal/10 px-3.5 py-1.5 backdrop-blur">
            <span className="h-1.5 w-1.5 rounded-full bg-deal shadow-[0_0_8px_#10B981]" />
            <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-deal-light">
              How it works
            </span>
          </div>

          <h1 className="font-display text-[48px] font-black leading-[0.98] tracking-[-0.02em] text-white md:text-[72px]">
            Four steps.
            <br />
            <span className="text-shine font-black">Ready to close.</span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ash md:text-xl">
            No onboarding call. No setup wizard. No data entry. Pick your
            industry, load your profile, and put it to work the same day.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-3">
            <Link
              href="/pricing"
              className="btn-loud group inline-flex items-center gap-2 rounded-xl px-7 py-4 text-[15px]"
            >
              Get Started
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
        </div>
      </section>

      {/* 4 STEPS */}
      <section className="relative overflow-hidden loud-bg-alt">
        <div className="relative mx-auto max-w-5xl px-6 py-20 md:py-28">
          <div className="space-y-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <FadeIn key={step.number} delay={i * 100}>
                  <div className="loud-card group relative overflow-hidden rounded-2xl p-8">
                    {/* Ambient glow */}
                    <div
                      className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full blur-3xl transition-opacity group-hover:opacity-80"
                      style={{
                        background:
                          "radial-gradient(circle, rgba(16,185,129,0.2), transparent 70%)",
                      }}
                      aria-hidden
                    />

                    <div className="relative grid gap-6 md:grid-cols-[auto,1fr] md:items-start">
                      {/* Step number + icon */}
                      <div className="flex flex-col items-center gap-2">
                        <div
                          className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl shadow-[0_8px_24px_rgba(16,185,129,0.25)]"
                          style={{
                            background:
                              "linear-gradient(135deg, rgba(16,185,129,0.2), rgba(16,185,129,0.05))",
                          }}
                        >
                          <Icon
                            className="h-6 w-6 text-deal-light"
                            strokeWidth={2.2}
                          />
                        </div>
                        <span className="font-mono text-[11px] font-bold tracking-widest text-deal/60">
                          {step.number}
                        </span>
                      </div>

                      {/* Content */}
                      <div>
                        <h2 className="font-display text-2xl font-black text-white md:text-3xl">
                          {step.title}
                        </h2>
                        <p className="mt-4 text-[15px] leading-relaxed text-ash">
                          {step.body}
                        </p>
                        <p className="mt-4 rounded-lg border border-deal/20 bg-deal/5 px-4 py-3 text-sm font-medium text-deal-light">
                          {step.detail}
                        </p>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </section>

      {/* PROOF STRIP */}
      <section className="border-t border-iron bg-slate">
        <div className="mx-auto max-w-5xl px-6 py-14">
          <FadeIn>
            <div className="grid gap-8 text-center md:grid-cols-3">
              <div>
                <div className="font-display text-5xl font-black text-white">
                  &lt;3s
                </div>
                <div className="mt-2 text-sm text-ash">
                  Average response time
                </div>
              </div>
              <div className="border-y border-iron py-8 md:border-x md:border-y-0 md:py-0">
                <div className="font-display text-5xl font-black text-white">
                  18
                </div>
                <div className="mt-2 text-sm text-ash">
                  Industries supported
                </div>
              </div>
              <div>
                <div className="font-display text-5xl font-black text-white">
                  $0
                </div>
                <div className="mt-2 text-sm text-ash">
                  Setup cost. Works day one.
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="relative overflow-hidden loud-bg">
        <div className="grid-pattern opacity-50" />
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-60 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(16,185,129,0.35) 0%, transparent 60%)",
          }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center md:py-32">
          <FadeIn>
            <h2 className="font-display text-5xl font-black leading-[0.95] tracking-[-0.03em] text-white md:text-7xl">
              You know how it works.
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
              Get Started
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
