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
} from "lucide-react";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Your Sales Dashboard",
  description:
    "Your daily scoreboard. Units, commission, tier progress, next milestones — all auto-generated from your pay plan and deal data.",
};

const verticals = [
  {
    slug: "auto",
    icon: Car,
    name: "Auto",
    example: "Units · Tier · Gross · Take home",
    live: true,
  },
  {
    slug: "real-estate",
    icon: HomeIcon,
    name: "Real Estate",
    example: "Closings · Split · GCI · Net",
    live: true,
  },
  {
    slug: "insurance",
    icon: Shield,
    name: "Insurance",
    example: "NB policies · Retention · Premium · Take home",
    live: true,
  },
  {
    slug: "solar",
    icon: Sun,
    name: "Solar",
    example: "Deals · kW · Redline · Paid",
    live: true,
  },
  {
    slug: "saas",
    icon: Monitor,
    name: "SaaS",
    example: "ARR · Quota · Commission · Take home",
    live: true,
  },
  {
    slug: "medical",
    icon: HeartPulse,
    name: "Medical Devices",
    example: "Cases · Quota · Revenue · Comm",
    live: true,
  },
  {
    slug: "retail",
    icon: ShoppingBag,
    name: "Retail",
    example: "Tickets · Attach · GP · Take home",
    live: true,
  },
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
          <div
            className="mb-10 rounded-2xl border border-deal/40 p-5 md:p-6 backdrop-blur"
            style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.12), rgba(16,185,129,0.03))" }}
          >
            <p className="text-[15px] leading-relaxed text-white">
              <span className="font-bold text-shine">
                All 15 verticals live.
              </span>{" "}
              Each dashboard auto-generates from the rep&rsquo;s pay plan
              upload and deal data — no setup beyond a one-time connection.
            </p>
        </div>
      </FadeIn>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {verticals.map((v, i) => (
          <FadeIn key={v.slug} delay={i * 50}>
            <Link
              href={v.live ? `/dashboard/${v.slug}` : "#"}
              className={`loud-card group flex h-full flex-col rounded-2xl p-6 ${
                v.live ? "" : "cursor-not-allowed opacity-60"
              }`}
              {...(v.live ? {} : { onClick: (e) => e.preventDefault() })}
            >
              <div className="mb-4 flex items-start justify-between">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl shadow-[0_8px_20px_rgba(16,185,129,0.25)]"
                  style={{ background: "linear-gradient(135deg, rgba(16,185,129,0.2), rgba(16,185,129,0.05))" }}
                >
                  <v.icon
                    className="h-5 w-5 text-deal-light"
                    strokeWidth={2.2}
                  />
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
              <h3
                className={`mb-1 text-lg font-bold ${
                  v.live ? "text-white" : "text-ash/70"
                }`}
              >
                {v.name}
              </h3>
              <p
                className={`flex-1 font-mono text-xs ${
                  v.live ? "text-ash" : "text-muted"
                }`}
              >
                {v.example}
              </p>
              {v.live && (
                <div className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-deal-light transition-all group-hover:gap-2">
                  Open {v.name} dashboard
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                </div>
              )}
            </Link>
          </FadeIn>
        ))}
      </div>
      </div>
    </section>
  );
}
