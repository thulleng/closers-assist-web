import {
  type DashboardData,
  variantStyles,
} from "@/lib/dashboard-types";
import { AlertTriangle, TrendingUp, DollarSign, Target, Award, Star, Zap } from "lucide-react";
import FadeIn from "@/components/FadeIn";

function fmtUSD(n: number): string {
  return "$" + Math.abs(n).toLocaleString();
}

export default function IncomeTracker({ data }: { data: DashboardData }) {
  const progressPct = Math.min(
    (data.progress.current / data.progress.target) * 100,
    100
  );
  const markerPct = data.progress.marker
    ? (data.progress.marker.value / data.progress.target) * 100
    : null;

  // Extract key values from metrics
  const takeHomeMetric = data.metrics.find((m) => m.highlight) ?? data.metrics[3];
  const unitsMetric = data.metrics[0];
  const grossMetric = data.metrics.find((m) => m.money && !m.highlight) ?? data.metrics[2];

  // Pace: project full-month units
  const now = new Date();
  const daysInMonth = new Date(now.getUTCFullYear(), now.getUTCMonth() + 1, 0).getDate();
  const dayOfMonth = now.getUTCDate();
  const paceUnits = dayOfMonth > 0
    ? Math.round((data.progress.current / dayOfMonth) * daysInMonth * 10) / 10
    : 0;

  return (
    <section className="relative overflow-hidden loud-bg">
      <div className="grid-pattern opacity-30" />
      <div className="relative mx-auto max-w-[480px] space-y-4 px-4 py-8">

        {/* ── HERO: TAKE-HOME ── */}
        <FadeIn>
          <div className="relative overflow-hidden rounded-2xl money-card p-6 text-center">
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
            <div className="relative">
              <div className="mb-1 font-mono text-[10px] font-bold uppercase tracking-[2px] text-pit/70">
                Estimated Take-Home
              </div>
              <div className="font-display text-5xl font-black tracking-[-0.02em] text-pit md:text-6xl">
                {takeHomeMetric?.value ?? "—"}
              </div>
              <div className="mt-1 text-[13px] font-medium text-pit/60">
                {data.earnings.length > 0 ? (data.earnings[data.earnings.length - 1]?.label ?? "Month to date") : "Month to date"}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* ── UNITS GOAL + PACE ── */}
        <FadeIn delay={50}>
          <div className="glass-panel p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-neon-green" strokeWidth={2.2} />
                <span className="font-mono text-[10px] font-bold uppercase tracking-[1.5px] text-neon-green">
                  Units Goal
                </span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-3.5 w-3.5 text-gold" strokeWidth={2.2} />
                <span className="font-mono text-[11px] font-bold text-gold">
                  {paceUnits}u projected
                </span>
              </div>
            </div>

            <div className="mb-2 flex items-baseline justify-between">
              <span className="font-display text-3xl font-bold text-white">
                {unitsMetric?.value ?? "0"}
                <span className="ml-1 text-base font-normal text-ash">/ 20u</span>
              </span>
              <span className="text-[13px] text-ash">
                {(20 - data.progress.current).toFixed(1)}u to go
              </span>
            </div>

            {/* Progress bar */}
            <div className="relative mb-1 h-3 overflow-hidden rounded-full bg-black/40 border border-white/5">
              <div
                className="absolute inset-y-0 left-0 rounded-full transition-all duration-700"
                style={{
                  width: `${Math.min((data.progress.current / 20) * 100, 100)}%`,
                  background: "linear-gradient(90deg, #00FF88, #10B981)",
                  boxShadow: "0 0 16px rgba(0, 255, 136, 0.5), inset 0 1px 0 rgba(255,255,255,0.2)",
                }}
              />
            </div>
          </div>
        </FadeIn>

        {/* ── FRONT GROSS + COMMISSION ── */}
        <FadeIn delay={80}>
          <div className="grid grid-cols-2 gap-3">
            <div className="glass-panel p-4">
              <div className="mb-1 flex items-center gap-1.5">
                <DollarSign className="h-3.5 w-3.5 text-ash" strokeWidth={2} />
                <span className="font-mono text-[10px] font-bold uppercase tracking-[1px] text-ash">
                  Front Gross
                </span>
              </div>
              <div className="font-display text-2xl font-bold text-white">
                {grossMetric?.value ?? "—"}
              </div>
            </div>
            <div className="neon-border glass-panel p-4">
              <div className="mb-1 flex items-center gap-1.5">
                <DollarSign className="h-3.5 w-3.5 text-neon-green" strokeWidth={2} />
                <span className="font-mono text-[10px] font-bold uppercase tracking-[1px] text-neon-green">
                  Commission
                </span>
              </div>
              <div className="font-display text-2xl font-bold glow-text-green">
                {takeHomeMetric?.value ?? "—"}
              </div>
            </div>
          </div>
        </FadeIn>

        {/* ── BONUS MILESTONES ── */}
        <FadeIn delay={110}>
          <div className="glass-panel p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Award className="h-4 w-4 text-gold" strokeWidth={2.2} />
                <span className="font-mono text-[10px] font-bold uppercase tracking-[1.5px] text-gold-light">
                  Unit Bonuses
                </span>
              </div>
              <span className="font-mono text-[11px] font-bold text-gold">
                {data.progress.target - data.progress.current > 0
                  ? `${(data.progress.target - data.progress.current).toFixed(1)}u to first bonus`
                  : "All bonuses achieved"}
              </span>
            </div>
            <div className="flex gap-2">
              {[11, 13, 15].map((tier) => {
                const bonus = tier === 11 ? 500 : tier === 13 ? 750 : 1000;
                const achieved = data.progress.current >= tier;
                return (
                  <div
                    key={tier}
                    className={`flex-1 rounded-xl p-3 text-center transition-all ${
                      achieved
                        ? "bg-neon-green/10 border border-neon-green/30"
                        : "bg-white/5 border border-white/5"
                    }`}
                  >
                    <div className={`font-display text-lg font-bold ${achieved ? "glow-text-green" : "text-ash"}`}>
                      {tier}u
                    </div>
                    <div className={`font-mono text-[11px] font-bold ${achieved ? "text-neon-green" : "text-muted"}`}>
                      +${bonus}
                    </div>
                    {tier === 15 && (
                      <div className="mt-0.5 font-mono text-[9px] text-gold">
                        +30% retro
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </FadeIn>

        {/* ── CXI + REVIEWS ── */}
        <FadeIn delay={140}>
          <div className="grid grid-cols-2 gap-3">
            <div className="glass-panel p-4">
              <div className="mb-1 flex items-center gap-1.5">
                <Star className="h-3.5 w-3.5 text-neon-purple" strokeWidth={2} />
                <span className="font-mono text-[10px] font-bold uppercase tracking-[1px] text-neon-purple">
                  CXI Score
                </span>
              </div>
              <div className="font-display text-2xl font-bold text-white">
                0.0<span className="text-base font-normal text-ash">/5.0</span>
              </div>
              <div className="mt-1 text-[11px] text-ash">
                ≥ 4.8 = +$250
              </div>
            </div>
            <div className="glass-panel p-4">
              <div className="mb-1 flex items-center gap-1.5">
                <Star className="h-3.5 w-3.5 text-gold" strokeWidth={2} fill="currentColor" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-[1px] text-gold-light">
                  Reviews
                </span>
              </div>
              <div className="font-display text-2xl font-bold text-white">
                0
              </div>
              <div className="mt-1 text-[11px] text-ash">
                × $20 = $0
              </div>
            </div>
          </div>
        </FadeIn>

        {/* ── DEALS ── */}
        <FadeIn delay={170}>
          <div className="glass-panel p-4">
            <div className="mb-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-neon-green" strokeWidth={2.2} />
                <span className="font-mono text-[10px] font-bold uppercase tracking-[1.5px] text-neon-green">
                  {data.dealsTitle}
                </span>
              </div>
              <span className="font-mono text-[11px] text-ash">
                {data.deals.length} deals
              </span>
            </div>
            <div className="space-y-1.5">
              {data.deals.map((d, i) => {
                const rightText = data.formatRight
                  ? data.formatRight(d)
                  : fmtUSD(d.commission);
                return (
                  <div
                    key={d.id}
                    className="flex items-center justify-between rounded-lg bg-white/[0.03] border border-white/5 px-3 py-2.5 transition-colors hover:bg-white/[0.06]"
                  >
                    <div className="flex items-center gap-2 min-w-0">
                      <span
                        className={`inline-block rounded px-1.5 py-[2px] text-[9px] font-bold ${variantStyles[d.type.variant]}`}
                      >
                        {d.type.label}
                      </span>
                      <span className="text-[13px] text-bone truncate">{d.customer}</span>
                    </div>
                    <span className="font-mono text-[13px] font-medium text-neon-green ml-2 flex-shrink-0">
                      {rightText}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </FadeIn>

        {/* ── PAY PLAN REFERENCE ── */}
        <FadeIn delay={200}>
          <div className="text-center">
            <p className="font-mono text-[9px] uppercase tracking-[1px] text-muted">
              25% commission · $2,600 draw · Bonuses at 11/13/15u · CXI ≥ 4.8 = $250 · $20/review
            </p>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
