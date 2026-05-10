"use client";

import { useState } from "react";
import Link from "next/link";
import { Shield, Check, User, Users, Building2, ArrowRight, X } from "lucide-react";
import FadeIn from "@/components/FadeIn";
import TiltCard from "@/components/TiltCard";
import DealFlowVisual from "@/components/DealFlowVisual";

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
    href: "/pricing",
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
    href: "/pricing",
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
      {/* HERO — with deal flow visual */}
      <section className="relative overflow-hidden loud-bg">
        <div className="grid-pattern opacity-50" />
        
        {/* Background — AI robotic hand digital network */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-[0.20] pointer-events-none"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=1600&q=80&auto=format&fit=crop)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        
        <div className="relative mx-auto max-w-7xl px-6 pb-12 pt-20">
          <div className="grid gap-10 md:grid-cols-[1fr,auto] md:items-center">
            {/* Left — copy */}
            <div className="text-center md:text-left">
              <div className="mb-3 inline-flex items-center justify-center gap-2 rounded-full border border-deal/30 bg-deal/10 px-3 py-1.5 md:justify-start">
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
              <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-ash md:text-xl md:mx-0">
                One extra deal covers your subscription for years.{" "}
                <span className="font-semibold text-gold-light">
                  No feature gating.
                </span>{" "}
                Every tier ships the same full agent — tiers differ by team size
                and support, never by capability.
              </p>
            </div>

            {/* Right — Deal flow visual */}
            <div className="flex-shrink-0 mx-auto mt-6 md:mt-0">
              <DealFlowVisual size={320} />
            </div>
          </div>
        </div>
      </section>

      {/* VS FREE AI — why $29.99 when ChatGPT is free? */}
      <section className="relative overflow-hidden loud-bg-alt border-b border-white/5">
        <div className="grid-pattern opacity-40" />
        <div className="absolute inset-0 bg-cover bg-center opacity-[0.08] pointer-events-none"
          style={{
            backgroundImage: `url(https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1600)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="relative mx-auto max-w-5xl px-6 py-20">
          {/* Headline */}
          <div className="text-center mb-12">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_8px_#FBBF24]" />
              <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-gold-light">
                The real difference
              </span>
            </div>
            <h2 className="font-display text-4xl font-black leading-[1.05] tracking-[-0.02em] text-white md:text-5xl">
              Why $29.99 when ChatGPT
              <br />
              <span className="text-shine-amber font-black">is free?</span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-ash">
              Free AI gives you generic answers. ClosersAssist gives you the
              exact script, your actual numbers, and a partner who remembers
              every deal you&rsquo;ve closed.
            </p>
          </div>

          {/* Comparison rows */}
          <div className="space-y-2">
            {[
              { feat: "Knows your actual pay plan", us: "Calculates your commission on every deal. Draw, bonuses, tier breaks — all live.", them: "Has no idea what a 'mini' is, let alone your split." },
              { feat: "Tracks units to bonus in real time", us: "You're 2 units from $500 — it tells you without being asked.", them: "Can't count your deals. Every conversation starts from zero." },
              { feat: "Remembers every deal, every month", us: "References the Johnson deal from March. Spots patterns. Never forgets.", them: "Amnesia. New chat, blank slate. No memory across sessions." },
              { feat: "Speaks your industry fluently", us: "Minis, T.O.s, CXI, clawbacks, cap rates — 18 industries, real vocabulary.", them: "Generic LinkedIn advice. You'd spend half the chat explaining your job." },
              { feat: "Logs deals with one sentence", us: "\"Just sold a Camry to the Smiths\" → deal logged, commission calculated, tracker updated.", them: "Can write you a nice summary. Can't save a deal to a database." },
              { feat: "Calls you out when you're slacking", us: "\"Three minis this week. Last month you turned it around — what's the play today?\"", them: "Agrees with everything you say. Never pushes back." },
              { feat: "Your data stays yours", us: "Never trains on your pay plan, deal history, or customer names. Export anytime.", them: "Your conversations train their models. Read the fine print." },
              { feat: "Built by a working closer", us: "Built on the floor at Sun Toyota by someone who lives off commission.", them: "Built by engineers in San Francisco who've never worked a Saturday on the lot." },
              { feat: "Chat anywhere, instantly", us: "Web, phone, soon Telegram. Always logged in. Always knows who you are.", them: "Browser tab. Login walls. Context lost when you switch devices." },
            ].map((row, i) => (
              <div
                key={row.feat}
                className="group grid grid-cols-[auto,1fr,1fr] gap-0 rounded-xl border border-white/5 bg-white/[0.02] transition-all duration-300 hover:border-deal/30 hover:bg-white/[0.05] hover:shadow-[inset_0_0_40px_rgba(16,185,129,0.04)]"
              >
                {/* === OUR COLUMN — ClosersAssist === */}
                <div className="flex items-start gap-3 rounded-l-xl p-5 transition-colors duration-300 bg-deal/[0.03] group-hover:bg-deal/[0.06]">
                  {/* Glowing check circle */}
                  <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-deal/20 shadow-[0_0_10px_rgba(16,185,129,0.3)]">
                    <Check className="h-3.5 w-3.5 text-deal" strokeWidth={3} />
                  </div>
                  <span className="text-sm text-bone leading-relaxed">{row.us}</span>
                </div>

                {/* === THEIR COLUMN — Free AI === */}
                <div className="flex items-start gap-3 rounded-r-xl p-5 opacity-60 group-hover:opacity-50 transition-opacity duration-300">
                  {/* Dim X circle */}
                  <div className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full bg-white/5">
                    <X className="h-3.5 w-3.5 text-ash/30" strokeWidth={2} />
                  </div>
                  <span className="text-sm text-muted leading-relaxed">{row.them}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom punchline */}
          <div className="mt-10 text-center">
            <p className="text-lg font-semibold text-bone">
              One extra deal covers your subscription{" "}
              <span className="text-gold-light">for 10 years.</span>
            </p>
            <p className="mt-1 text-sm text-ash">
              Free AI costs you deals you don&rsquo;t even know you&rsquo;re losing.
            </p>
          </div>
        </div>
      </section>

      {/* === VISUAL BRIDGE: persistent bg across mid-sections === */}
      <div className="relative overflow-hidden loud-bg-alt">
        {/* Background image — spans all mid-sections */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-[0.12] pointer-events-none"
          style={{
            backgroundImage: `url(https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1600&q=80&auto=format&fit=crop)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        {/* Floating orbs for depth */}
        <div className="absolute top-[10%] left-[5%] w-[300px] h-[300px] rounded-full blur-[100px] pointer-events-none opacity-60"
          style={{ background: "radial-gradient(circle, rgba(16,185,129,0.10) 0%, transparent 60%)" }} />
        <div className="absolute bottom-[30%] right-[3%] w-[250px] h-[250px] rounded-full blur-[100px] pointer-events-none opacity-50"
          style={{ background: "radial-gradient(circle, rgba(251,191,36,0.08) 0%, transparent 60%)" }} />

      <div className="relative">
      {/* BUYER SELECTOR */}
      <section className="mx-auto max-w-4xl px-6 pt-10 pb-10">
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
      <section id="plans" className="mx-auto max-w-7xl px-6 pb-10">
        <div className="grid gap-4 md:grid-cols-3">
          {TIERS.map((tier) => {
            const price = billing === "annual" ? tier.annual : tier.monthly;
            const isRecommended = selectedTier === tier.id;
            const isDefaultFeatured = tier.id === "pro" && !selectedTier;
            const highlight = isRecommended || isDefaultFeatured;

            return (
              <TiltCard key={tier.id} maxTilt={8} scale={1.03} className="flex flex-col rounded-2xl">
              <div
                className={`relative flex flex-col rounded-2xl bg-slate p-7 ${
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
              </TiltCard>
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
      </div></div>{/* close visual bridge */}

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
                Now live
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
            <div className="mt-10">
              <Link href="#plans" className="btn-loud group inline-flex items-center gap-2 rounded-xl px-8 py-5 text-lg">
                Get Started — $29.99/mo
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
              </Link>
              <p className="mt-4 text-sm text-muted">No credit card. Cancel anytime. Beat your last month or it&rsquo;s free.</p>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
