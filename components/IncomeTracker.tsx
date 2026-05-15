"use client";

import { type DashboardData, variantStyles } from "@/lib/dashboard-types";
import {
  TrendingUp, DollarSign, Target, Award, Star, Zap,
  ArrowUp, ArrowDown, Activity
} from "lucide-react";
import FadeIn from "@/components/FadeIn";

function fmtUSD(n: number): string {
  const sign = n < 0 ? "-" : "";
  return sign + "$" + Math.abs(Math.round(n)).toLocaleString();
}

function fmtNum(n: number, decimals = 1): string {
  return n.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: decimals });
}

export default function IncomeTracker({ data }: { data: DashboardData }) {
  // ── Extract values ──────────────────────────────────────────────────────────
  const unitsMetric = data.metrics[0];       // UNITS SOLD
  const tierMetric  = data.metrics[1];       // COMM. TIER
  const grossMetric = data.metrics[2];       // GROSS EARNED (commission total)
  const takeMetric  = data.metrics[3];       // TAKE HOME

  const units     = parseFloat(unitsMetric?.value ?? "0");
  const gross     = (() => { const v = grossMetric?.value ?? "$0"; return parseInt(v.replace(/[^0-9.-]/g, "")) || 0; })();
  const takeHome  = (() => { const v = takeMetric?.value ?? "$0"; return parseInt(v.replace(/[^0-9.-]/g, "")) || 0; })();
  const drawAmt   = gross - takeHome; // reverse-calc draw from gross - takehome

  // ── Pace projection ─────────────────────────────────────────────────────────
  const now = new Date();
  const daysInMonth = new Date(now.getUTCFullYear(), now.getUTCMonth() + 1, 0).getDate();
  const dayOfMonth = now.getUTCDate();
  const paceUnits = dayOfMonth > 0
    ? Math.round((units / dayOfMonth) * daysInMonth * 10) / 10
    : 0;
  const paceTakeHome = dayOfMonth > 0
    ? Math.round((takeHome / dayOfMonth) * daysInMonth)
    : 0;

  // ── Bonus tiers ─────────────────────────────────────────────────────────────
  const bonusTiers = [
    { units: 11, bonus: 500, label: "1st Volume", note: "" },
    { units: 13, bonus: 750, label: "2nd Volume", note: "" },
    { units: 15, bonus: 1000, label: "3rd Volume", note: "+30% retro" },
  ];
  const nextBonus = bonusTiers.find((t) => t.units > units);
  const progressPct = nextBonus
    ? Math.min((units / nextBonus.units) * 100, 100)
    : 100;
  const pastFirst = bonusTiers.filter((t) => t.units <= units).length;

  // ── Money sentinel ──────────────────────────────────────────────────────────
  const isAheadOfDraw = takeHome >= 0;
  const drawPct = drawAmt > 0 ? Math.min((gross / drawAmt) * 100, 100) : 100;

  return (
    <section className="relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-neon-green/[0.03] via-transparent to-transparent pointer-events-none" />
      <div className="grid-pattern opacity-[0.03]" />

      <div className="relative mx-auto max-w-[500px] space-y-5 px-4 py-6">

        {/* ═══════════ HERO — TAKE-HOME ═══════════ */}
        <FadeIn>
          <div className="relative overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-br from-black/80 via-black/60 to-black/80 backdrop-blur-xl p-6">
            <div className="absolute top-0 right-0 w-64 h-64 bg-neon-green/[0.04] rounded-full blur-3xl -translate-y-1/2 translate-x-1/4 pointer-events-none" />

            <div className="relative space-y-1 text-center">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3 py-1 mb-3">
                <Activity className="h-3 w-3 text-neon-green" />
                <span className="font-mono text-[10px] font-bold uppercase tracking-[2px] text-ash">
                  {data.period}
                </span>
              </div>

              <div className="font-mono text-[10px] font-bold uppercase tracking-[3px] text-muted mb-3">
                Estimated Take-Home
              </div>

              {/* Large number */}
              <div className={`font-display text-6xl font-black tracking-[-0.03em] md:text-7xl ${
                isAheadOfDraw ? "glow-text-green" : "text-rose-400"
              }`}>
                {fmtUSD(takeHome)}
              </div>

              {/* Draw status pill */}
              <div className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-bold mt-2 ${
                isAheadOfDraw
                  ? "bg-neon-green/10 text-neon-green border border-neon-green/20"
                  : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
              }`}>
                {isAheadOfDraw
                  ? <><ArrowUp className="h-3 w-3" /> Ahead of draw</>
                  : <><ArrowDown className="h-3 w-3" /> Behind draw</>
                }
              </div>

              <div className="text-[12px] text-ash mt-2 font-medium">
                {fmtNum(units)} units · {data.deals.length} deal{data.deals.length !== 1 ? "s" : ""} this month
              </div>
            </div>

            {/* Draw coverage ring */}
            <div className="mt-5 flex justify-center">
              <div className="relative w-32 h-2 rounded-full bg-white/[0.06] overflow-hidden">
                <div
                  className="absolute inset-y-0 left-0 rounded-full transition-all duration-1000"
                  style={{
                    width: `${Math.min(drawPct, 100)}%`,
                    background: isAheadOfDraw
                      ? "linear-gradient(90deg, #00FF88, #10B981)"
                      : "linear-gradient(90deg, #FB7185, #E11D48)",
                    boxShadow: isAheadOfDraw
                      ? "0 0 12px rgba(0,255,136,0.4)"
                      : "0 0 12px rgba(225,29,72,0.4)",
                  }}
                />
              </div>
            </div>
            <div className="text-center mt-1.5">
              <span className="font-mono text-[9px] uppercase tracking-[1px] text-muted">
                Draw: {fmtUSD(drawAmt)} · {drawPct >= 100 ? "Covered" : `${Math.round(drawPct)}% covered`}
              </span>
            </div>
          </div>
        </FadeIn>

        {/* ═══════════ UNIT TRACKER — Milestone Ladder ═══════════ */}
        <FadeIn delay={50}>
          <div className="glass-panel rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Target className="h-4 w-4 text-neon-green" strokeWidth={2.2} />
                <span className="font-mono text-[10px] font-bold uppercase tracking-[2px] text-neon-green">
                  Unit Progress
                </span>
              </div>
              {paceUnits > 0 && (
                <div className="flex items-center gap-1.5">
                  <TrendingUp className="h-3.5 w-3.5 text-gold" strokeWidth={2.2} />
                  <span className="font-mono text-[11px] font-bold text-gold">
                    {fmtNum(paceUnits)}u pace
                  </span>
                </div>
              )}
            </div>

            {/* Milestone stepper */}
            <div className="relative">
              {/* Connecting line */}
              <div className="absolute top-4 left-4 right-4 h-0.5 bg-white/[0.08]" />

              <div className="relative flex justify-between">
                {bonusTiers.map((tier, i) => {
                  const achieved = units >= tier.units;
                  const isNext = nextBonus?.units === tier.units;
                  return (
                    <div key={tier.units} className="flex flex-col items-center gap-2 z-10">
                      {/* Dot */}
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 transition-all ${
                        achieved
                          ? "bg-neon-green/20 border-neon-green shadow-[0_0_12px_rgba(0,255,136,0.3)]"
                          : isNext
                            ? "bg-gold/10 border-gold shadow-[0_0_12px_rgba(251,191,36,0.2)]"
                            : "bg-white/[0.03] border-white/10"
                      }`}>
                        {achieved ? (
                          <svg className="w-4 h-4 text-neon-green" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <span className={`font-display text-xs font-bold ${isNext ? "text-gold" : "text-muted"}`}>
                            {tier.units}
                          </span>
                        )}
                      </div>
                      {/* Label */}
                      <div className="text-center">
                        <div className={`font-mono text-[9px] font-bold ${
                          achieved ? "text-neon-green" : isNext ? "text-gold" : "text-muted"
                        }`}>
                          {tier.label}
                        </div>
                        <div className={`font-display text-[13px] font-bold ${
                          achieved ? "text-neon-green" : isNext ? "text-gold" : "text-muted"
                        }`}>
                          +${tier.bonus}
                        </div>
                        {tier.note && (
                          <div className="font-mono text-[8px] text-gold mt-0.5">{tier.note}</div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Current status */}
            <div className="mt-4 flex items-center justify-between rounded-xl bg-white/[0.03] border border-white/[0.06] px-4 py-3">
              <span className="font-mono text-[11px] text-ash">
                {nextBonus
                  ? `${fmtNum(nextBonus.units - units)}u to +$${nextBonus.bonus} at ${nextBonus.units}u`
                  : "All bonuses achieved 🎯"}
              </span>
              <div className="flex items-center gap-1.5">
                <div className="h-1.5 w-20 rounded-full bg-white/[0.06] overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${progressPct}%`,
                      background: "linear-gradient(90deg, #00FF88, #10B981)",
                      boxShadow: "0 0 8px rgba(0,255,136,0.3)",
                    }}
                  />
                </div>
                <span className="font-display text-sm font-bold text-white">{Math.round(progressPct)}%</span>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* ═══════════ MONEY GRID ═══════════ */}
        <FadeIn delay={80}>
          <div className="grid grid-cols-2 gap-3">
            {/* Commission */}
            <div className="glass-panel rounded-2xl p-4 hover:bg-white/[0.04] transition-colors">
              <div className="flex items-center gap-1.5 mb-2">
                <DollarSign className="h-3.5 w-3.5 text-neon-green" strokeWidth={2} />
                <span className="font-mono text-[10px] font-bold uppercase tracking-[1px] text-ash">Commission</span>
              </div>
              <div className="font-display text-[28px] font-bold glow-text-green leading-none">
                {grossMetric?.value ?? "$0"}
              </div>
              <div className="mt-1 text-[11px] text-ash">
                {tierMetric?.value ?? "0%"} tier
              </div>
            </div>

            {/* Draw */}
            <div className="glass-panel rounded-2xl p-4 hover:bg-white/[0.04] transition-colors">
              <div className="flex items-center gap-1.5 mb-2">
                <ArrowDown className="h-3.5 w-3.5 text-rose-400" strokeWidth={2} />
                <span className="font-mono text-[10px] font-bold uppercase tracking-[1px] text-ash">Draw</span>
              </div>
              <div className="font-display text-[28px] font-bold text-rose-400 leading-none">
                -{fmtUSD(drawAmt)}
              </div>
              <div className="mt-1 text-[11px] text-ash">
                Monthly deduction
              </div>
            </div>

            {/* Bonuses */}
            <div className="glass-panel rounded-2xl p-4 hover:bg-white/[0.04] transition-colors">
              <div className="flex items-center gap-1.5 mb-2">
                <Award className="h-3.5 w-3.5 text-gold" strokeWidth={2} />
                <span className="font-mono text-[10px] font-bold uppercase tracking-[1px] text-ash">Bonuses</span>
              </div>
              <div className="font-display text-[28px] font-bold text-gold leading-none">
                $0
              </div>
              <div className="mt-1 text-[11px] text-ash">
                {pastFirst > 0 ? `${pastFirst} earned` : "None yet"}
              </div>
            </div>

            {/* Reviews + CXI */}
            <div className="glass-panel rounded-2xl p-4 hover:bg-white/[0.04] transition-colors">
              <div className="flex items-center gap-1.5 mb-2">
                <Star className="h-3.5 w-3.5 text-neon-purple" strokeWidth={2} />
                <span className="font-mono text-[10px] font-bold uppercase tracking-[1px] text-ash">CXI + Reviews</span>
              </div>
              <div className="font-display text-[28px] font-bold text-neon-purple leading-none">
                $0
              </div>
              <div className="mt-1 text-[11px] text-ash">
                0 reviews · CXI —
              </div>
            </div>
          </div>
        </FadeIn>

        {/* ═══════════ PACE PROJECTION ═══════════ */}
        {dayOfMonth > 1 && (
          <FadeIn delay={110}>
            <div className="relative overflow-hidden rounded-2xl border border-gold/20 bg-gradient-to-br from-gold/[0.04] to-transparent p-5">
              <div className="flex items-center gap-2 mb-3">
                <TrendingUp className="h-4 w-4 text-gold" strokeWidth={2.2} />
                <span className="font-mono text-[10px] font-bold uppercase tracking-[2px] text-gold-light">
                  Pace Projection
                </span>
              </div>

              <div className="grid grid-cols-3 gap-3 text-center">
                <div>
                  <div className="font-display text-2xl font-bold text-gold">
                    {fmtNum(paceUnits)}u
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-[1px] text-muted mt-1">
                    Month-End Units
                  </div>
                </div>
                <div>
                  <div className={`font-display text-2xl font-bold ${paceTakeHome >= 0 ? "text-gold" : "text-rose-400"}`}>
                    {fmtUSD(paceTakeHome)}
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-[1px] text-muted mt-1">
                    Projected Take-Home
                  </div>
                </div>
                <div>
                  <div className="font-display text-2xl font-bold text-gold">
                    {bonusTiers.filter((t) => paceUnits >= t.units).length > 0
                      ? `${bonusTiers.filter((t) => paceUnits >= t.units).length}x`
                      : "—"}
                  </div>
                  <div className="font-mono text-[9px] uppercase tracking-[1px] text-muted mt-1">
                    Bonus Tiers Hit
                  </div>
                </div>
              </div>
            </div>
          </FadeIn>
        )}

        {/* ═══════════ RECENT DEALS ═══════════ */}
        <FadeIn delay={140}>
          <div className="glass-panel rounded-2xl p-5">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Zap className="h-4 w-4 text-neon-green" strokeWidth={2.2} />
                <span className="font-mono text-[10px] font-bold uppercase tracking-[2px] text-neon-green">
                  {data.dealsTitle}
                </span>
              </div>
              <span className="font-mono text-[11px] text-ash">
                {data.deals.length} deal{data.deals.length !== 1 ? "s" : ""}
              </span>
            </div>

            {data.deals.length === 0 ? (
              <div className="text-center py-6">
                <div className="text-4xl mb-2">📭</div>
                <p className="text-[13px] text-muted font-medium">No deals yet this month</p>
                <p className="text-[11px] text-muted mt-1">
                  Tell your Closers Assist agent "I sold a..." to start tracking
                </p>
              </div>
            ) : (
              <div className="space-y-1.5">
                {data.deals.slice(-8).reverse().map((d) => {
                  const rightText = data.formatRight ? data.formatRight(d) : fmtUSD(d.commission);
                  const unitsText = d.units !== null ? `${d.units}u` : "—";
                  return (
                    <div
                      key={d.id}
                      className="flex items-center justify-between rounded-xl bg-white/[0.02] border border-white/[0.04] px-4 py-3 transition-colors hover:bg-white/[0.05]"
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span className={`inline-flex items-center rounded-lg px-2 py-[3px] text-[9px] font-bold ${variantStyles[d.type.variant]}`}>
                          {d.type.label}
                        </span>
                        <div className="min-w-0">
                          <div className="text-[13px] text-bone font-medium truncate">{d.customer}</div>
                          <div className="text-[10px] text-muted">{unitsText}</div>
                        </div>
                      </div>
                      <span className="font-display text-[15px] font-bold text-neon-green ml-3 flex-shrink-0">
                        {rightText}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </FadeIn>

        {/* ═══════════ PAY PLAN REFERENCE ═══════════ */}
        <FadeIn delay={170}>
          <div className="text-center pb-4">
            <p className="font-mono text-[9px] uppercase tracking-[1px] text-muted">
              25% commission · $2,600 draw · Bonuses at 11/13/15u · CXI ≥ 4.8 = $250 · $20/review
            </p>
          </div>
        </FadeIn>

      </div>
    </section>
  );
}
