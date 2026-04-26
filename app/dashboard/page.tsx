import type { Metadata } from "next";
import Link from "next/link";
import {
  Car,
  Home as HomeIcon,
  Shield,
  Sun,
  Monitor,
  HeartPulse,
  ShoppingBag,
  ArrowRight,
  LayoutDashboard,
  Wind,
  HardHat,
  Bug,
  Lock,
  Landmark,
  TrendingUp,
  Users,
  Radio,
  KeyRound,
  ClipboardList,
  Handshake,
} from "lucide-react";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Your Sales Dashboard",
  description:
    "Your daily scoreboard. Units, commission, tier progress, next milestones — all auto-generated from your pay plan and deal data.",
};

const verticals = [
  { slug: "auto",               icon: Car,           name: "Automotive",         example: "Units · Tier · Gross · Take home",            live: true  },
  { slug: "real-estate",        icon: HomeIcon,      name: "Real Estate",        example: "Closings · Split · GCI · Net",                 live: true  },
  { slug: "insurance",          icon: Shield,        name: "Insurance",          example: "NB policies · Retention · Premium · Take home", live: true  },
  { slug: "solar",              icon: Sun,           name: "Solar",              example: "Deals · kW · Redline · Paid",                  live: true  },
  { slug: "saas",               icon: Monitor,       name: "SaaS",               example: "ARR · Quota · Commission · Take home",          live: true  },
  { slug: "medical",            icon: HeartPulse,    name: "Medical Devices",    example: "Cases · Quota · Revenue · Comm",               live: true  },
  { slug: "retail",             icon: ShoppingBag,   name: "Retail",             example: "Tickets · Attach · GP · Take home",            live: true  },
  { slug: "hvac",               icon: Wind,          name: "HVAC",               example: "Installs · Service agreements · Comm",          live: false },
  { slug: "roofing",            icon: HardHat,       name: "Roofing",            example: "Jobs · Insurance claims · Gross · Paid",       live: false },
  { slug: "pest-control",       icon: Bug,           name: "Pest Control",       example: "Accounts · Renewals · Upsells · Take home",    live: false },
  { slug: "home-security",      icon: Lock,          name: "Home Security",      example: "Installs · Monitoring contracts · Comm",       live: false },
  { slug: "mortgage",           icon: Landmark,      name: "Mortgage & Lending", example: "Loans · Volume · Points · Take home",          live: false },
  { slug: "financial-advisors", icon: TrendingUp,    name: "Financial Advisors", example: "AUM · Fee income · New clients · Net",         live: false },
  { slug: "recruiting",         icon: Users,         name: "Recruiting",         example: "Placements · Fees · Pipeline · Take home",     live: false },
  { slug: "telecom",            icon: Radio,         name: "Telecom",            example: "Accounts · MRR · Comm · Quota",                live: false },
  { slug: "rental",             icon: KeyRound,      name: "Rental",             example: "Bookings · ADR · Revenue · Take home",         live: false },
  { slug: "project-manager",    icon: ClipboardList, name: "Project Manager",    example: "SOW · Change orders · Margin · Billed",        live: false },
  { slug: "other-sales",        icon: Handshake,     name: "Other Sales",        example: "Deals · Pipeline · Commission · Take home",    live: false },
];

export default function DashboardHubPage() {
  return (
    <section className="relative overflow-hidden loud-bg">
      <div className="grid-pattern opacity-50" />
      <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
        <FadeIn>
          <div className="mb-12 max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-deal/30 bg-deal/10 px-3 py-1.5">
              <LayoutDashboard className="h-3.5 w-3.5 text-deal-light" strokeWidth={2.2} />
              <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-deal-light">
                Sales Dashboard
              </span>
            </div>
            <h1 className="font-display text-5xl font-black leading-[0.98] tracking-[-0.02em] text-white md:text-7xl">
              Your daily scoreboard.
              <br />
              <span className="text-shine font-black">
                Tuned to your pay plan.
              </span>
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-ash md:text-xl">
              Every Closers Assist rep gets a dashboard that reshapes itself
              around how they actually earn. Auto sees units and volume
              tiers. Real estate sees cap progress. Solar sees clawback risk.{" "}
              <span className="font-semibold text-gold-light">
                Same skeleton, different flesh.
              </span>
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={100}>
          {/* Talk to Your Agent CTA */}
          <Link
            href="/dashboard/auto"
            className="mb-6 flex w-full items-center justify-between gap-4 rounded-2xl border border-deal/50 p-5 md:p-6 transition-all hover:border-deal hover:shadow-[0_0_32px_rgba(16,185,129,0.2)] group"
            style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.15), rgba(16,185,129,0.04))" }}
          >
            <div className="flex items-center gap-4">
              <div
                className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl shadow-[0_8px_24px_rgba(16,185,129,0.3)]"
                style={{ background: "linear-gradient(135deg, #10B981, #059669)" }}
              >
                <svg className="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <div>
                <div className="text-base font-bold text-white">Talk to Your Agent</div>
                <div className="text-sm text-ash">Ask anything — objections, pay math, scripts, follow-ups.</div>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 flex-shrink-0 text-deal transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
          </Link>

          {/* Info banner */}
          <div
            className="mb-10 rounded-2xl border border-white/10 p-5 md:p-6"
            style={{ background: "rgba(255,255,255,0.03)" }}
          >
            <p className="text-[14px] leading-relaxed text-ash">
              <span className="font-semibold text-bone">All 18 verticals supported.</span>{" "}
              Pick your industry below — your dashboard and agent auto-load the right scripts, pay plan math, and objection plays.
            </p>
          </div>
        </FadeIn>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {verticals.map((v, i) => {
          const cardClass = `loud-card group flex h-full flex-col rounded-2xl p-6`;
          const inner = (
            <>
              <div className="mb-4 flex items-start justify-between">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl shadow-[0_8px_20px_rgba(16,185,129,0.25)]"
                  style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.2), rgba(16,185,129,0.05))" }}
                >
                  <v.icon className="h-5 w-5 text-deal-light" strokeWidth={2.2} />
                </div>
                {v.live ? (
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[10px] font-black uppercase tracking-widest text-white shadow-[0_4px_12px_rgba(16,185,129,0.4)]"
                    style={{ background: "linear-gradient(135deg, #10B981, #059669)" }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    Live
                  </span>
                ) : (
                  <span className="rounded-full bg-white/10 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-ash">
                    Soon
                  </span>
                )}
              </div>
              <h3 className={`mb-1 text-lg font-bold ${v.live ? "text-white" : "text-ash/70"}`}>
                {v.name}
              </h3>
              <p className={`flex-1 font-mono text-xs ${v.live ? "text-ash" : "text-muted"}`}>
                {v.example}
              </p>
              {v.live && (
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-deal-light transition-all group-hover:gap-2">
                  Open {v.name} dashboard
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                </div>
              )}
            </>
          );
          return (
            <FadeIn key={v.slug} delay={i * 50}>
              {v.live ? (
                <Link href={`/dashboard/${v.slug}`} className={cardClass}>
                  {inner}
                </Link>
              ) : (
                <div className={`${cardClass} cursor-not-allowed opacity-60`}>
                  {inner}
                </div>
              )}
            </FadeIn>
          );
        })}
      </div>
      </div>
    </section>
  );
}
