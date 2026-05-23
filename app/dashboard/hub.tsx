import type { Metadata } from "next";
import Link from "next/link";
import {
  Car, Home as HomeIcon, Shield, Sun, Monitor, HeartPulse, ShoppingBag,
  ArrowRight, LayoutDashboard, Wind, HardHat, Bug, Lock, Landmark,
  TrendingUp, Users, Radio, KeyRound, ClipboardList, Handshake,
  Zap, Sparkles, Layers, DollarSign,
} from "lucide-react";
import FadeIn from "@/components/FadeIn";
import NeuralBackground from "@/components/NeuralBackground";

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
  { slug: "hvac",               icon: Wind,          name: "HVAC",               example: "Installs · Service agreements · Comm",          live: true  },
  { slug: "roofing",            icon: HardHat,       name: "Roofing",            example: "Jobs · Insurance claims · Gross · Paid",       live: true  },
  { slug: "pest-control",       icon: Bug,           name: "Pest Control",       example: "Accounts · Renewals · Upsells · Take home",    live: true  },
  { slug: "home-security",      icon: Lock,          name: "Home Security",      example: "Installs · Monitoring contracts · Comm",       live: true  },
  { slug: "mortgage",           icon: Landmark,      name: "Mortgage & Lending", example: "Loans · Volume · Points · Take home",          live: true  },
  { slug: "financial-advisors", icon: TrendingUp,    name: "Financial Advisors", example: "AUM · Fee income · New clients · Net",         live: true  },
  { slug: "recruiting",         icon: Users,         name: "Recruiting",         example: "Placements · Fees · Pipeline · Take home",     live: true  },
  { slug: "telecom",            icon: Radio,         name: "Telecom",            example: "Accounts · MRR · Comm · Quota",                live: true  },
  { slug: "rental",             icon: KeyRound,      name: "Rental",             example: "Bookings · ADR · Revenue · Take home",         live: true  },
  { slug: "project-manager",    icon: ClipboardList, name: "Project Manager",    example: "SOW · Change orders · Margin · Billed",        live: true  },
  { slug: "other-sales",        icon: Handshake,     name: "Other Sales",        example: "Deals · Pipeline · Commission · Take home",    live: true  },
];

const stats = [
  { value: "18",   label: "Industries",   icon: Layers,     desc: "Every closer, covered" },
  { value: "$29",  label: "Per rep / mo", icon: DollarSign,  desc: "One deal pays 10 yrs" },
  { value: "24/7", label: "Always On",     icon: Sparkles,   desc: "Never sleeps. Never calls out." },
];

export default function DashboardHubPage() {
  return (
    <section className="relative overflow-hidden loud-bg">
      <div className="grid-pattern opacity-40" />
      <NeuralBackground density={15} color="green" opacity={0.04} />

      <div
        className="absolute top-24 left-[3%] w-[480px] h-[480px] rounded-full blur-[120px] pointer-events-none float-up opacity-70"
        style={{ background: "radial-gradient(circle, rgba(0,255,136,0.12) 0%, transparent 60%)" }}
      />
      <div
        className="absolute bottom-32 right-[5%] w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none float-down opacity-60"
        style={{ background: "radial-gradient(circle, rgba(251,191,36,0.10) 0%, transparent 60%)" }}
      />
      <div
        className="absolute top-1/2 left-[55%] w-[340px] h-[340px] rounded-full blur-[120px] pointer-events-none float-side opacity-50"
        style={{ background: "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 60%)" }}
      />

      <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
        <FadeIn>
          <div className="mb-14 max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-neon-green/20 bg-neon-green/[0.04] px-3.5 py-1.5 backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-neon-green opacity-75 pulse-ring" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-neon-green shadow-[0_0_8px_#10B981]" />
              </span>
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
            <p className="mt-6 text-lg leading-relaxed text-ash md:text-xl max-w-2xl">
              Every Deal Clozr rep gets a dashboard that reshapes itself
              around how they actually earn. Auto sees units and volume
              tiers. Real estate sees cap progress. Solar sees clawback risk.{" "}
              <span className="font-semibold text-gold-light">
                Same skeleton, different flesh.
              </span>
            </p>
          </div>
        </FadeIn>

        <FadeIn delay={60}>
          <div className="mb-12 grid grid-cols-3 gap-3 sm:gap-4">
            {stats.map((s) => (
              <div
                key={s.label}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-black/40 backdrop-blur-md p-4 sm:p-5 text-center transition-all duration-300 hover:border-neon-green/30 hover:bg-black/50"
              >
                <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: "radial-gradient(circle at center, rgba(0,255,136,0.06) 0%, transparent 70%)" }}
                />
                <div className="relative">
                  <s.icon className="h-4 w-4 text-neon-green/50 mx-auto mb-2" strokeWidth={1.5} />
                  <div className="font-display text-[30px] sm:text-[38px] font-black leading-none"
                    style={{
                      background: "linear-gradient(180deg, #ffffff 0%, #6EE7B7 60%, #10B981 100%)",
                      WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                      textShadow: "0 0 40px rgba(16,185,129,0.2)",
                    }}
                  >{s.value}</div>
                  <div className="font-mono text-[10px] font-bold uppercase tracking-[1.5px] text-ash mt-1.5">{s.label}</div>
                  <div className="text-[10px] text-muted mt-0.5 hidden sm:block">{s.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </FadeIn>

        <FadeIn delay={80}>
          <Link
            href="/dashboard/auto"
            className="mb-8 flex w-full items-center justify-between gap-4 rounded-2xl p-5 md:p-6 transition-all duration-300 group relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(0,255,136,0.10), rgba(0,255,136,0.02))",
              border: "1px solid rgba(0,255,136,0.15)",
            }}
          >
            <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
              style={{ background: "radial-gradient(circle at 30% 50%, rgba(0,255,136,0.10) 0%, transparent 60%)" }}
            />
            <div className="relative flex items-center gap-4">
              <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl"
                style={{
                  background: "linear-gradient(135deg, #00FF88, #10B981)",
                  boxShadow: "0 0 24px rgba(0,255,136,0.4), 0 8px 24px rgba(16,185,129,0.3)",
                }}
              ><Zap className="h-6 w-6 text-pit" strokeWidth={2.2} /></div>
              <div>
                <div className="text-base font-bold text-white">Talk to Your Agent</div>
                <div className="text-sm text-ash">Ask anything — objections, pay math, scripts, follow-ups.</div>
              </div>
            </div>
            <ArrowRight className="relative h-5 w-5 flex-shrink-0 text-neon-green transition-all duration-300 group-hover:translate-x-1 group-hover:scale-110" strokeWidth={2.5} />
          </Link>
        </FadeIn>

        <FadeIn delay={100}>
          <div className="mb-12 glass-panel p-5 md:p-6">
            <p className="text-[14px] leading-relaxed text-ash">
              <span className="font-semibold text-bone">All 18 verticals supported.</span>{" "}
              Pick your industry below — your dashboard and agent auto-load the right scripts, pay plan math, and objection plays.
            </p>
          </div>
        </FadeIn>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {verticals.map((v, i) => (
            <FadeIn key={v.slug} delay={i * 40}>
              <Card v={v} />
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

function Card({ v }: { v: (typeof verticals)[number] }) {
  const inner = (
    <>
      <div className="mb-4 flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110 group-hover:shadow-[0_0_20px_rgba(0,255,136,0.25)]"
          style={{
            background: v.live
              ? "linear-gradient(135deg, rgba(0,255,136,0.18), rgba(0,255,136,0.04))"
              : "linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
            boxShadow: v.live ? "0 0 16px rgba(0,255,136,0.12)" : "none",
          }}
        ><v.icon className={`h-5 w-5 transition-colors duration-300 ${v.live ? "text-neon-green" : "text-muted"}`} strokeWidth={2.2} /></div>
        {v.live ? (
          <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1 font-mono text-[10px] font-black uppercase tracking-widest text-pit"
            style={{
              background: "linear-gradient(135deg, #00FF88, #10B981)",
              boxShadow: "0 0 16px rgba(0,255,136,0.35), 0 4px 12px rgba(16,185,129,0.3)",
            }}
          ><span className="h-1.5 w-1.5 rounded-full bg-pit pulse-ring" />Live</span>
        ) : (
          <span className="rounded-full bg-white/5 px-3 py-1 font-mono text-[10px] font-bold uppercase tracking-widest text-muted">Soon</span>
        )}
      </div>
      <h3 className={`mb-1 text-lg font-bold transition-colors duration-300 ${v.live ? "text-white group-hover:text-neon-green" : "text-ash/70"}`}>{v.name}</h3>
      <p className={`flex-1 font-mono text-xs ${v.live ? "text-ash" : "text-muted"}`}>{v.example}</p>
      {v.live && (
        <div className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-neon-green transition-all duration-300 group-hover:gap-2 group-hover:text-white">
          Open {v.name} dashboard
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={2.5} />
        </div>
      )}
    </>
  );

  const cardClasses = `glass-panel group flex h-full flex-col p-6 transition-all duration-300 relative overflow-hidden ${
    v.live ? "hover:border-neon-green/40 hover:shadow-[0_0_32px_rgba(0,255,136,0.12)] hover:bg-white/[0.06]" : ""
  }`;

  return v.live ? (
    <Link href={`/dashboard/${v.slug}`} className={cardClasses}>
      <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: "radial-gradient(circle at 30% 20%, rgba(0,255,136,0.05) 0%, transparent 50%)" }}
      />
      <div className="relative z-10">{inner}</div>
    </Link>
  ) : (
    <div className={`${cardClasses} cursor-not-allowed opacity-40`}>
      <div className="relative z-10">{inner}</div>
    </div>
  );
}
