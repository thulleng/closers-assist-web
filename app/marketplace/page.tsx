import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Phone,
  Calculator,
  Swords,
  LineChart,
  FileSearch,
  Mail,
  Timer,
  ArrowRight,
  Store,
  Wrench,
  DollarSign,
  Zap,
  Users,
  type LucideIcon,
} from "lucide-react";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Skills Marketplace",
  description:
    "Install a skill. Build a skill. Get paid when reps use yours. The App Store for closers — 70/30 revenue share in your favor.",
};

type Skill = {
  icon: LucideIcon;
  name: string;
  author: string;
  category: string;
  price: string;
  priceNote?: string;
  body: string;
  installs: string;
  featured?: boolean;
};

const launchSkills: Skill[] = [
  {
    icon: Phone,
    name: "Cold Call Coach",
    author: "Closers Assist",
    category: "Live coaching",
    price: "$4.99",
    priceNote: "/mo",
    body: "Live call coaching. Reads your call transcript in real-time, feeds you next-best-moves on your phone screen while the customer is still talking.",
    installs: "Featured",
    featured: true,
  },
  {
    icon: Calculator,
    name: "Deal Math",
    author: "Closers Assist",
    category: "Commission",
    price: "$2.99",
    priceNote: "/mo",
    body: "Any pay plan, any structure. Type what happened, get what you earned — to the dollar. Mini, flat, unit, volume bonus, retro, tier accelerator, clawback.",
    installs: "Featured",
  },
  {
    icon: Mail,
    name: "Follow-Up Writer",
    author: "Closers Assist",
    category: "Follow-up",
    price: "$3.99",
    priceNote: "/mo",
    body: "Type the customer's name and objection. Get 3 follow-up messages ranked by proven close probability, tuned to their temperature and your industry — refining to your style over time.",
    installs: "Featured",
  },
  {
    icon: Swords,
    name: "Objection Killer",
    author: "Closers Assist",
    category: "Closing",
    price: "$4.99",
    priceNote: "/mo",
    body: "Drop any objection in. Get the 5 best responses, ranked by proven close rate on that exact objection type — refining to YOUR style as you use it.",
    installs: "Featured",
  },
  {
    icon: LineChart,
    name: "Pipeline Pulse",
    author: "Closers Assist",
    category: "Pipeline",
    price: "Free",
    body: "Daily 60-second stand-up. Who's hot, who's cold, who needs a touch today. Ships free with every tier.",
    installs: "Free forever",
  },
  {
    icon: FileSearch,
    name: "Trade Valuator",
    author: "Closers Assist",
    category: "Auto",
    price: "$3.99",
    priceNote: "/mo",
    body: "Book vs market vs your desk's comfort zone. Pulls KBB, NADA, Manheim, and your dealership's recent reconditioning costs.",
    installs: "Featured",
  },
];

const howItWorksSteps = [
  {
    num: "01",
    icon: Store,
    title: "Install",
    body: "Browse skills by industry, role, or use case. One-click install. Lives inside your agent from that moment forward.",
  },
  {
    num: "02",
    icon: Wrench,
    title: "Build",
    body: "Point-and-click skill builder. No code required. Upload your script or process, set the trigger, hit publish.",
  },
  {
    num: "03",
    icon: DollarSign,
    title: "Earn",
    body: "Every rep who installs your skill pays $0.99 – $9.99 (you set the price). You keep 70%. We keep 30%. Paid monthly.",
  },
];

const creatorMath = [
  { installs: 10, earnings: 35 },
  { installs: 100, earnings: 349 },
  { installs: 500, earnings: 1745 },
  { installs: 1000, earnings: 3490 },
];

export default function MarketplacePage() {
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden loud-bg">
        <div className="grid-pattern" />

        <div className="relative mx-auto max-w-7xl px-6 pb-24 pt-20 md:pb-32 md:pt-28">
          <FadeIn>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1.5 backdrop-blur">
              <Store className="h-3.5 w-3.5 text-gold-light" strokeWidth={2.2} />
              <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-gold-light">
                Skills Marketplace
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <h1 className="font-display text-[48px] font-black leading-[0.98] tracking-[-0.02em] text-white md:text-[72px]">
              The App Store
              <br />
              <span className="text-mega-amber font-black">for closers.</span>
            </h1>
          </FadeIn>

          <FadeIn delay={200}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ash md:text-xl">
              Install skills built by the best closers in your industry. Build
              your own. Publish them. Earn 70% every time another rep installs
              yours.{" "}
              <span className="font-bold text-shine">
                Your playbook is your paycheck.
              </span>
            </p>
          </FadeIn>

          <FadeIn delay={300}>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href="/pricing"
                className="btn-loud group inline-flex items-center gap-2 rounded-xl px-7 py-4 text-[15px]"
              >
                Get early access
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  strokeWidth={2.5}
                />
              </Link>
              <a
                href="#become-creator"
                className="btn-ghost rounded-xl px-6 py-4 text-[15px] font-semibold"
              >
                Become a creator
              </a>
            </div>
          </FadeIn>

          <FadeIn delay={400}>
            <div className="mt-14 flex flex-wrap items-center gap-6 text-sm text-ash">
              <div className="flex items-center gap-2">
                <Timer className="h-4 w-4 text-deal" strokeWidth={2} />
                <span>
                  Launching <span className="text-bone">Q3 2026</span>
                </span>
              </div>
              <div className="h-4 w-px bg-iron hidden sm:block" />
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-deal" strokeWidth={2} />
                <span>
                  Early access <span className="text-bone">at trial signup</span>
                </span>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FEATURED SKILLS GRID */}
      <section className="relative overflow-hidden loud-bg-alt">
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
          <FadeIn>
            <div className="mb-12 max-w-3xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-deal/30 bg-deal/10 px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-deal shadow-[0_0_8px_#10B981]" />
                <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-deal-light">
                  Launch skills
                </span>
              </div>
              <h2 className="font-display text-4xl font-black leading-[1.02] tracking-[-0.02em] text-white md:text-6xl">
                6 skills ship on{" "}
                <span className="text-shine font-black">day one.</span>
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ash">
                Built by Closers Assist to anchor the marketplace. Community
                skills ship alongside at launch.
              </p>
            </div>
          </FadeIn>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {launchSkills.map((skill, i) => (
              <FadeIn key={skill.name} delay={i * 60}>
                <div
                  className={`loud-card flex h-full flex-col rounded-2xl p-6 ${
                    skill.featured
                      ? "ring-2 ring-deal shadow-[0_0_40px_rgba(16,185,129,0.25)]"
                      : ""
                  }`}
                >
                  <div className="mb-4 flex items-start justify-between">
                    <div
                      className="flex h-12 w-12 items-center justify-center rounded-xl shadow-[0_8px_20px_rgba(16,185,129,0.25)]"
                      style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.2), rgba(16,185,129,0.05))" }}
                    >
                      <skill.icon
                        className="h-5 w-5 text-deal-light"
                        strokeWidth={2.2}
                      />
                    </div>
                    <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-ash backdrop-blur">
                      {skill.category}
                    </span>
                  </div>
                  <h3 className="mb-1 text-lg font-bold text-white">
                    {skill.name}
                  </h3>
                  <div className="mb-3 font-mono text-[11px] text-ash">
                    by {skill.author}
                  </div>
                  <p className="mb-5 flex-1 text-sm leading-relaxed text-ash">
                    {skill.body}
                  </p>
                  <div className="flex items-end justify-between border-t border-white/10 pt-4">
                    <div>
                      <div className="flex items-baseline gap-1">
                        <span className="font-display text-xl font-black text-mega">
                          {skill.price}
                        </span>
                        {skill.priceNote && (
                          <span className="text-xs text-ash">
                            {skill.priceNote}
                          </span>
                        )}
                      </div>
                      <div className="mt-0.5 font-mono text-[10px] text-muted">
                        {skill.installs}
                      </div>
                    </div>
                    <button
                      className="btn-ghost rounded-lg px-4 py-2 text-xs font-bold"
                      disabled
                    >
                      Notify me
                    </button>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS — 3 steps */}
      <section id="become-creator" className="relative overflow-hidden loud-bg">
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
          <FadeIn>
            <div className="mb-14 max-w-3xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-gold-light shadow-[0_0_8px_#FBBF24]" />
                <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-gold-light">
                  For creators
                </span>
              </div>
              <h2 className="font-display text-4xl font-black leading-[1.02] tracking-[-0.02em] text-white md:text-6xl">
                Install. Build.{" "}
                <span className="text-mega-amber font-black">Earn.</span>
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ash">
                Three steps from rep to creator. Your closing method becomes an
                asset that pays you while you sleep.
              </p>
            </div>
          </FadeIn>

          <div className="grid gap-4 md:grid-cols-3">
            {howItWorksSteps.map((step, i) => (
              <FadeIn key={step.num} delay={i * 120}>
                <div className="loud-card group relative overflow-hidden rounded-2xl p-8">
                  <div
                    className="absolute -right-12 -top-12 h-40 w-40 rounded-full blur-3xl transition-opacity group-hover:opacity-80"
                    style={{
                      background:
                        "radial-gradient(circle, rgba(251,191,36,0.2), transparent 70%)",
                    }}
                    aria-hidden
                  />
                  <div className="relative">
                    <div className="mb-5 font-mono text-sm font-bold text-gold-light">
                      {step.num}
                    </div>
                    <div
                      className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl shadow-[0_8px_24px_rgba(251,191,36,0.3)]"
                      style={{ background: "linear-gradient(135deg, rgba(251,191,36,0.2), rgba(251,191,36,0.05))" }}
                    >
                      <step.icon
                        className="h-5 w-5 text-gold-light"
                        strokeWidth={2.2}
                      />
                    </div>
                    <h3 className="mb-2 text-xl font-bold text-white">
                      {step.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-ash">
                      {step.body}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CREATOR EARNINGS TABLE */}
      <section className="relative overflow-hidden loud-bg-alt">
        <div className="relative mx-auto max-w-5xl px-6 py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-[1fr,1.2fr] lg:items-center">
            <FadeIn>
              <div>
                <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-gold-light shadow-[0_0_8px_#FBBF24]" />
                  <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-gold-light">
                    The math
                  </span>
                </div>
                <h2 className="font-display text-4xl font-black leading-[1.02] tracking-[-0.02em] text-white md:text-6xl">
                  <span className="text-mega-amber font-black">70%</span> of
                  every install.
                  <br />
                  Every month. Forever.
                </h2>
                <p className="mt-5 text-[17px] leading-relaxed text-ash">
                  Price your skill anywhere from $0.99 to $9.99/mo. You keep
                  70%. We keep 30% for hosting, payment processing, and
                  marketing the marketplace. Payouts arrive monthly via Stripe.
                </p>
                <p className="mt-4 text-sm text-muted">
                  Example math uses a $4.99/mo skill.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div className="overflow-hidden rounded-2xl border border-white/10 backdrop-blur"
                style={{ background: "linear-gradient(135deg, rgba(30,30,35,0.8), rgba(15,15,18,0.9))" }}
              >
                <div className="grid grid-cols-2 border-b border-white/10 bg-black/40">
                  <div className="p-4 text-[10px] font-bold uppercase tracking-[1.5px] text-ash">
                    Active installs
                  </div>
                  <div className="border-l border-white/10 p-4 text-[10px] font-bold uppercase tracking-[1.5px] text-ash">
                    Your monthly earnings
                  </div>
                </div>
                {creatorMath.map((row, i) => (
                  <div
                    key={i}
                    className="grid grid-cols-2 border-b border-white/8 last:border-b-0"
                  >
                    <div className="flex items-center p-5 font-mono text-lg font-bold text-white">
                      {row.installs.toLocaleString()}
                    </div>
                    <div className="flex items-center border-l border-white/8 p-5 font-display text-lg font-black text-mega">
                      ${row.earnings.toLocaleString()}/mo
                    </div>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* SKILL IDEAS STRIP */}
      <section className="relative overflow-hidden loud-bg">
        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
          <FadeIn>
            <div className="mb-12 max-w-3xl">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-deal/30 bg-deal/10 px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-deal shadow-[0_0_8px_#10B981]" />
                <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-deal-light">
                  Skill ideas that work
                </span>
              </div>
              <h2 className="font-display text-4xl font-black leading-[1.02] tracking-[-0.02em] text-white md:text-6xl">
                What could{" "}
                <span className="text-shine font-black">you</span> build?
              </h2>
              <p className="mt-5 text-lg leading-relaxed text-ash">
                If you&rsquo;ve been closing for more than a year, you already
                have a playbook. These are the skills top closers are already
                planning to publish.
              </p>
            </div>
          </FadeIn>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {[
              "Service-to-Sales Converter (auto)",
              "Open House Lead Cadence (real estate)",
              "Renewal Save Script (insurance)",
              "Utility Bill Reader (solar)",
              "MEDDIC Deal Scorer (SaaS)",
              "Dr.-Rep Intro Script (medical)",
              "Financing Menu Builder (retail)",
              "CXI Recovery Playbook (auto)",
              "Listing Presentation Engine (real estate)",
            ].map((idea, i) => (
              <FadeIn key={idea} delay={i * 40}>
                <div className="loud-card flex items-center gap-3 rounded-xl p-4 text-sm">
                  <Zap
                    className="h-4 w-4 flex-shrink-0 text-deal-light"
                    strokeWidth={2.2}
                  />
                  <span className="font-medium text-white">{idea}</span>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* CREATOR APPLICATION CTA */}
      <section className="relative overflow-hidden loud-bg-alt">
        <div className="grid-pattern opacity-50" />
        <div
          className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-70 blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(16,185,129,0.3) 0%, transparent 60%)",
          }}
        />
        <div className="relative mx-auto max-w-4xl px-6 py-24 text-center md:py-32">
          <FadeIn>
            <h2 className="font-display text-5xl font-black leading-[0.95] tracking-[-0.03em] text-white md:text-7xl">
              Your playbook
              <br />
              is your{" "}
              <span className="text-mega-amber font-black">paycheck.</span>
            </h2>
          </FadeIn>
          <FadeIn delay={150}>
            <p className="mx-auto mt-6 max-w-xl text-lg text-ash">
              Apply to be a launch creator. Early creators get featured
              placement, marketing support, and founder-direct access.
            </p>
          </FadeIn>
          <FadeIn delay={300}>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
              <a
                href="mailto:thul@closersassist.com?subject=Closers%20Assist%20Launch%20Creator%20Application"
                className="btn-loud group inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base"
              >
                Apply to be a creator
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  strokeWidth={2.5}
                />
              </a>
              <Link
                href="/pricing"
                className="btn-ghost rounded-xl px-8 py-4 text-base font-semibold"
              >
                Get Started
              </Link>
            </div>
          </FadeIn>
          <FadeIn delay={450}>
            <p className="mt-4 text-sm text-muted">
              Creator applications reviewed within 48 hours.
            </p>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
