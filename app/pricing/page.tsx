"use client";

import { useState } from "react";
import Link from "next/link";
import { Shield, Check, User, Users, Building2 } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import EmailCapture from "@/components/EmailCapture";

type Billing = "monthly" | "annual";
type Buyer = "solo" | "team" | "dealership";

const TIERS = [
  {
    id: "starter",
    name: "Starter",
    buyer: "solo" as Buyer,
    monthly: 29.99,
    annual: 23.99,
    unit: "rep",
    seats: 1,
    tagline: "For the solo closer who wants to make more money this month.",
    cta: "Get Started",
    href: "/#waitlist",
    priceId: "price_1TP9nMJzG6xU26F9ii7RlgCf",
    features: [
      "Everything your agent can do — no feature gating",
      "Unlimited uploads, skills, instructions, memory",
      "Full Skills Marketplace access",
      "All integrations (your CRM, email, calendar)",
      "Email support — 24-hour response",
    ],
  },
  {
    id: "pro",
    name: "Pro",
    buyer: "team" as Buyer,
    monthly: 624.75,
    annual: 499.75,
    unit: "team",
    seats: 25,
    tagline: "For the sales manager rolling it out to the whole team.",
    cta: "Get Started",
    href: "/#waitlist",
    priceId: "price_1TP9oGJzG6xU26F9N8yjczSE",
    features: [
      "Everything in Starter — for up to 25 reps",
      "Team dashboard — units, leaderboards, CXI tracking",
      "Priority support — 4-hour response",
      "Manager override & audit controls",
      "Monthly coaching call with a Closers Assist coach",
    ],
  },
  {
    id: "elite",
    name: "Elite",
    buyer: "dealership" as Buyer,
    monthly: 0,
    annual: 0,
    unit: "team",
    seats: 100,
    tagline: "For the dealership, brokerage, or agency rolling out at scale.",
    cta: "Talk to sales",
    href: "mailto:thul@closersassist.com",
    features: [
      "Everything in Pro — for up to 100 reps",
      "Dedicated success manager",
      "Custom skills dev — 2 per quarter included",
      "White-label + SSO + SOC2 compliance tooling",
      "Private Slack channel with founder (Thul)",
    ],
  },
];

const BUYER_TO_TIER: Record<Buyer, string> = {
  solo: "starter",
  team: "pro",
  dealership: "elite",
};

const FAQ = [
  {
    q: "How does billing actually work?",
    a: "Starter is billed per rep per month ($29.99 each). Pro is $24.99/rep/mo billed as a flat team rate — $624.75/mo covers up to 25 reps on one invoice. Elite is custom pricing — contact us for your rate.",
  },
  {
    q: "What if my team is bigger than 25 but smaller than 100?",
    a: "You go to Elite — custom pricing, one conversation. Email thul@closersassist.com and we'll build your rate.",
  },
  {
    q: "What if I have more than 100 reps?",
    a: "Email thul@closersassist.com and we'll build a custom enterprise plan with volume pricing. 100+ reps deserve a conversation, not a form.",
  },
  {
    q: "Is there a per-deal fee or commission cut?",
    a: "No. Flat subscription. Close 1 deal or 100 — your price doesn't change.",
  },
  {
    q: "Can I upgrade or downgrade anytime?",
    a: "Yes. Prorated, one click. No sales call required.",
  },
  {
    q: "Is my data mine?",
    a: "Yes. Export anytime. Cancel anytime and your data leaves with you. We don't hostage-hold.",
  },
  {
    q: "Do you sell my data?",
    a: "Never. Not to train models. Not to advertisers. Not to anyone.",
  },
];

async function startCheckout(priceId: string): Promise<string | null> {
  try {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ priceId }),
    });
    const data = await res.json();
    if (data.url) {
      window.location.href = data.url;
      return null;
    }
    return data.error ?? "Checkout unavailable. Try again.";
  } catch {
    return "Network error. Check your connection and try again.";
  }
}

export default function PricingPage() {
  const [billing, setBilling] = useState<Billing>("monthly");
  const [selectedBuyer, setSelectedBuyer] = useState<Buyer | null>(null);
  const [loadingTier, setLoadingTier] = useState<string | null>(null);
  const [checkoutError, setCheckoutError] = useState<string | null>(null);

  const selectedTier = selectedBuyer ? BUYER_TO_TIER[selectedBuyer] : null;

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden loud-bg">
        <div className="grid-pattern opacity-50" />
        <div className="relative mx-auto max-w-7xl px-6 pb-12 pt-20 text-center">
          <div className="mb-3 inline-flex items-center justify-center gap-2 rounded-full border border-deal/30 bg-deal/10 px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-deal shadow-[0_0_8px_#10B981]" />
            <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-deal-light">
              Pricing
            </span>
          </div>
          <h1 className="font-display text-5xl font-black leading-[0.98] tracking-[-0.02em] text-white md:text-7xl">
            Pick the plan that
            <br />
            <span className="text-shine font-black">fits your floor.</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ash md:text-xl">
            One extra deal covers your subscription for years.{" "}
            <span className="font-semibold text-gold-light">
              No feature gating.
            </span>{" "}
            Every tier ships the same full agent — tiers differ by team size
            and support, never by capability.
          </p>
        </div>
      </section>

      {/* BUYER SELECTOR */}
      <section className="mx-auto max-w-4xl px-6 pb-10">
        <p className="mb-4 text-center text-sm text-ash">
          Tell us who you are — we&rsquo;ll highlight your plan.
        </p>
        <div className="grid grid-cols-3 gap-3">
          {[
            {
              id: "solo" as Buyer,
              icon: User,
              label: "I'm a solo rep",
              sub: "Just me",
            },
            {
              id: "team" as Buyer,
              icon: Users,
              label: "I run a team",
              sub: "2–25 reps",
            },
            {
              id: "dealership" as Buyer,
              icon: Building2,
              label: "I run a dealership",
              sub: "26+ reps",
            },
          ].map((b) => {
            const active = selectedBuyer === b.id;
            return (
              <button
                key={b.id}
                onClick={() => setSelectedBuyer(b.id)}
                className={`flex flex-col items-center rounded-xl border p-4 text-center transition-all ${
                  active
                    ? "border-deal bg-deal/10 text-bone"
                    : "border-white/15 bg-white/5 text-white hover:border-deal/60"
                }`}
              >
                <b.icon
                  className={`mb-2 h-5 w-5 ${
                    active ? "text-deal" : "text-ash"
                  }`}
                  strokeWidth={2}
                />
                <div className="text-sm font-medium">{b.label}</div>
                <div className="mt-0.5 text-xs text-muted">{b.sub}</div>
              </button>
            );
          })}
        </div>
      </section>

      {/* BILLING TOGGLE */}
      <section className="mx-auto max-w-4xl px-6 pb-10 text-center">
        <div className="inline-flex rounded-full border border-white/15 bg-white/5 p-1">
          <button
            onClick={() => setBilling("monthly")}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
              billing === "monthly" ? "bg-deal text-pit" : "text-bone"
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setBilling("annual")}
            className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
              billing === "annual" ? "bg-deal text-pit" : "text-bone"
            }`}
          >
            Annual — save 20%
          </button>
        </div>
      </section>

      {/* TIERS */}
      <section className="mx-auto max-w-7xl px-6 pb-10">
        <div className="grid gap-4 md:grid-cols-3">
          {TIERS.map((tier) => {
            const price = billing === "annual" ? tier.annual : tier.monthly;
            const isRecommended = selectedTier === tier.id;
            const isDefaultFeatured = tier.id === "pro" && !selectedTier;
            const highlight = isRecommended || isDefaultFeatured;

            return (
              <div
                key={tier.id}
                className={`relative flex flex-col rounded-2xl bg-slate p-7 transition-all ${
                  highlight
                    ? "border-2 border-deal"
                    : "border border-iron"
                }`}
              >
                {highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-deal px-3 py-1 font-mono text-[10px] font-medium tracking-widest text-pit">
                    {isRecommended ? "YOUR PLAN" : "MOST POPULAR"}
                  </div>
                )}

                {/* Tier name */}
                <div
                  className={`mb-1 text-xs font-medium uppercase tracking-widest ${
                    highlight ? "text-deal" : "text-ash"
                  }`}
                >
                  {tier.name}
                </div>

                {/* Who it's for */}
                <div className="mb-4 flex items-center gap-1.5 text-sm text-bone">
                  {tier.id === "starter" && <User className="h-3.5 w-3.5 text-ash" strokeWidth={2} />}
                  {tier.id === "pro" && <Users className="h-3.5 w-3.5 text-ash" strokeWidth={2} />}
                  {tier.id === "elite" && <Building2 className="h-3.5 w-3.5 text-ash" strokeWidth={2} />}
                  <span>
                    {tier.id === "starter" && "1 rep"}
                    {tier.id === "pro" && "Up to 25 reps"}
                    {tier.id === "elite" && "Up to 100 reps"}
                  </span>
                </div>

                {/* Price */}
                <div className="mb-1 flex items-baseline gap-1">
                  {tier.id === "elite" ? (
                    <span className="font-mono text-4xl font-medium text-bone">
                      Custom
                    </span>
                  ) : (
                    <>
                      <span className="font-mono text-4xl font-medium text-bone">
                        ${price.toFixed(2)}
                      </span>
                      <span className="text-sm text-ash">/ month</span>
                    </>
                  )}
                </div>

                {/* Per-rep math */}
                {tier.id === "starter" && (
                  <div className="mb-1 font-mono text-xs text-muted">
                    Per rep. Billed monthly.
                  </div>
                )}
                {tier.id === "pro" && (
                  <div className="mb-1 font-mono text-xs text-muted">
                    Flat team rate — works out to ${(price / 25).toFixed(2)}/rep at 25 reps
                  </div>
                )}
                {tier.id === "elite" && (
                  <div className="mb-1 font-mono text-xs text-muted">
                    Starting at $19.99/rep/mo — contact us for your rate
                  </div>
                )}

                <p className="mb-5 mt-4 text-sm leading-relaxed text-ash">
                  {tier.tagline}
                </p>

                <div className="mb-5 h-px bg-iron" />

                {/* Features */}
                <ul className="mb-7 flex flex-1 flex-col gap-3">
                  {tier.features.map((f) => (
                    <li
                      key={f}
                      className="flex items-start gap-2.5 text-sm leading-relaxed text-bone"
                    >
                      <Check
                        className="mt-0.5 h-4 w-4 flex-shrink-0 text-deal"
                        strokeWidth={2.5}
                      />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                {"priceId" in tier ? (
                  <button
                    onClick={async () => {
                      setLoadingTier(tier.id);
                      setCheckoutError(null);
                      const err = await startCheckout((tier as { priceId: string }).priceId);
                      setLoadingTier(null);
                      if (err) setCheckoutError(err);
                    }}
                    disabled={loadingTier === tier.id}
                    className={`block w-full rounded-md py-3 text-center text-sm font-medium transition-colors disabled:opacity-60 disabled:cursor-not-allowed ${
                      highlight
                        ? "bg-deal text-pit hover:bg-deal-hover"
                        : "border border-iron text-bone hover:border-ash"
                    }`}
                  >
                    {loadingTier === tier.id ? "Redirecting…" : tier.cta}
                  </button>
                ) : (
                  <Link
                    href={tier.href}
                    className={`block rounded-md py-3 text-center text-sm font-medium transition-colors ${
                      highlight
                        ? "bg-deal text-pit hover:bg-deal-hover"
                        : "border border-iron text-bone hover:border-ash"
                    }`}
                  >
                    {tier.cta}
                  </Link>
                )}
              </div>
            );
          })}
        </div>
        {checkoutError && (
          <p className="mt-4 text-center text-sm text-red-400">{checkoutError}</p>
        )}
      </section>

      {/* PER-REP COMPARISON STRIP */}
      <section className="mx-auto max-w-5xl px-6 pb-16">
        <div className="loud-card rounded-2xl p-7">
          <div className="mb-5 text-center">
            <div className="mb-1 text-xs font-medium uppercase tracking-widest text-deal">
              The bigger your team, the less each rep costs
            </div>
            <p className="text-sm text-ash">
              Every tier ships the full agent — you&rsquo;re just paying for
              scale.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-4 text-center">
            <div className="loud-card rounded-lg p-5">
              <div className="mb-1 text-xs text-ash">Starter (1 rep)</div>
              <div className="font-mono text-2xl font-medium text-bone">
                $29.99
              </div>
              <div className="mt-1 font-mono text-xs text-muted">per rep</div>
            </div>
            <div className="rounded-lg border border-deal/40 bg-pit p-5">
              <div className="mb-1 text-xs text-ash">Pro (25 reps)</div>
              <div className="font-mono text-2xl font-medium text-deal">
                $24.99
              </div>
              <div className="mt-1 font-mono text-xs text-muted">per rep</div>
            </div>
            <div className="rounded-lg border border-deal/40 bg-pit p-5">
              <div className="mb-1 text-xs text-ash">Elite (100+ reps)</div>
              <div className="font-mono text-2xl font-medium text-deal">
                $19.99
              </div>
              <div className="mt-1 font-mono text-xs text-muted">per rep</div>
            </div>
          </div>
        </div>
      </section>

      {/* GUARANTEE */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="flex flex-col items-start gap-4 loud-card rounded-2xl p-7 md:flex-row md:items-center md:gap-6">
          <div className="flex h-14 w-14 flex-shrink-0 items-center justify-center rounded-xl bg-deal/10">
            <Shield className="h-7 w-7 text-deal" strokeWidth={2} />
          </div>
          <div>
            <h3 className="mb-1 text-xl font-medium text-bone">
              Beat your last month or it&rsquo;s free.
            </h3>
            <p className="text-sm leading-relaxed text-ash">
              Use Closers Assist for 30 days. If your commission check
              doesn&rsquo;t beat your previous month, we refund every dollar.
              No questions. No clawbacks. Cancel in one click.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-6 pb-20">
        <div className="mb-6 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-deal" />
          <span className="text-xs font-medium uppercase tracking-widest text-deal">
            Pricing FAQ
          </span>
        </div>
        <div className="flex flex-col gap-2.5">
          {FAQ.map((item) => (
            <details
              key={item.q}
              className="group loud-card rounded-lg p-5 open:ring-1 open:ring-deal"
            >
              <summary className="flex cursor-pointer items-center justify-between text-[15px] font-medium text-bone">
                <span>{item.q}</span>
                <span className="ml-4 text-ash transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="mt-3 text-sm leading-relaxed text-ash">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* FINAL CTA + WAITLIST */}
      <section className="relative overflow-hidden loud-bg">
        <div className="grid-pattern opacity-50" />
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(16,185,129,0.35) 0%, transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-2xl px-6 py-24 text-center md:py-28">
          <FadeIn>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-deal/40 bg-deal/10 px-3.5 py-1.5">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-deal opacity-75 pulse-ring" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-deal" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-deal-light">
                Early access — launching soon
              </span>
            </div>
            <h2 className="font-display text-4xl font-black leading-[0.98] tracking-[-0.02em] text-white md:text-6xl">
              Get early access.
              <br />
              <span className="text-shine font-black">Lock your spot.</span>
            </h2>
            <p className="mx-auto mt-5 max-w-lg text-lg text-ash">
              First 100 reps get founder pricing — locked forever.
            </p>
          </FadeIn>

          <FadeIn delay={200}>
            <div className="mx-auto mt-10 max-w-md">
              <EmailCapture
                placeholder="your@email.com"
                buttonText="Get early access →"
              />
            </div>
            <p className="mt-4 text-sm text-muted">
              No credit card. Cancel in one click. Beat your last month or it&rsquo;s free.
            </p>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
