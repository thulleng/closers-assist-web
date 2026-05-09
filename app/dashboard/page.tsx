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
  Zap,
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
            <div className="mb-3 inline-flex items-center gap-2 rounded-full glass-panel px-3.5 py-1.5">
              <LayoutDashboard className="h-3.5 w-3.5 text-neon-green" strokeWidth={2.2} />
              <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-neon-green">
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
            className="mb-6 flex w-full items-center justify-between gap-4 rounded-2xl p-5 md:p-6 transition-all group neon-border"
            style={{ background: "linear-gradient(135deg, rgba(0,255,136,0.12), rgba(0,255,136,0.03))" }}
          >
            <div className="flex items-center gap-4">
              <div
                className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl"
                style={{
                  background: "linear-gradient(135deg, #00FF88, #10B981)",
                  boxShadow: "0 0 24px rgba(0,255,136,0.4), 0 8px 24px rgba(16,185,129,0.3)",
                }}
              >
                <Zap className="h-6 w-6 text-pit" strokeWidth={2.2} />
              </div>
              <div>
                <div className="text-base font-bold text-white">Talk to Your Agent</div>
                <div className="text-sm text-ash">Ask anything — objections, pay math, scripts, follow-ups.</div>
              </div>
            </div>
            <ArrowRight className="h-5 w-5 flex-shrink-0 text-neon-green transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
          </Link>

          {/* Info banner */}
          <div className="mb-10 glass-panel p-5 md:p-6">
            <p className="text-[14px] leading-relaxed text-ash">
              <span className="font-semibold text-bone">All 18 verticals supported.</span>{" "}
              Pick your industry below — your dashboard and agent auto-load the right scripts, pay plan math, and objection plays.
            </p>
          </div>
        </FadeIn>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {verticals.map((v, i) => {
          const cardClass = `glass-panel group flex h-full flex-col p-6 transition-all ${
            v.live ? "hover:border-neon-green/50 hover:shadow-[0_0_24px_rgba(0,255,136,0.15)]" : ""
          }`;
          const inner = (
            <>
              <div className="mb-4 flex items-start justify-between">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl"
                  style={{
                    background: v.live
                      ? "linear-gradient(135deg, rgba(0,255,136,0.18), rgba(0,255,136,0.04))"
                      : "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
                    boxShadow: v.live ? "0 0 16px rgba(0,255,136,0.15)" : "none",
                  }}
                >
                  <v.icon className={`h-5 w-5 ${v.live ? "text-neon-green" : "text-muted"}`} strokeWidth={2.2} />
                </div>
                {v.live ? (
                  <span
                    className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[10px] font-black uppercase tracking-widest text-pit"
                    style={{
                      background: "linear-gradient(135deg, #00FF88, #10B981)",
                      boxShadow: "0 0 16px rgba(0,255,136,0.35), 0 4px 12px rgba(16,185,129,0.3)",
                    }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-pit" />
                    Live
                  </span>
                ) : (
                  <span className="rounded-full bg-white/5 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-muted">
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
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-neon-green transition-all group-hover:gap-2">
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
                <div className={`${cardClass} cursor-not-allowed opacity-50`}>
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
