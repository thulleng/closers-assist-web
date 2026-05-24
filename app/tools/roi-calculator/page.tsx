"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, DollarSign, TrendingUp, Calculator, Zap, Star } from "lucide-react";

export default function LTVCalculator() {
  const [avgCommission, setAvgCommission] = useState("2500");
  const [monthlyCost, setMonthlyCost] = useState("29.99");

  const comm = Number(avgCommission) || 2500;
  const cost = Number(monthlyCost) || 29.99;
  const monthsCovered = Math.floor(comm / cost);
  const yearsCovered = (comm / cost / 12).toFixed(1);
  const yearlyCost = cost * 12;
  const tenYearCost = cost * 120;
  const dealsForYear = Math.ceil(yearlyCost / comm);
  const dealsForFiveYears = Math.ceil(cost * 60 / comm);

  return (
    <div className="relative min-h-screen overflow-hidden loud-bg">
      <div className="grid-pattern" />
      <div className="grain" />

      <div className="relative mx-auto max-w-4xl px-6 py-16 md:py-24">
        {/* Breadcrumb */}
        <div className="mb-8 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-deal/40 bg-deal/10 px-3.5 py-1.5 backdrop-blur">
            <Calculator className="h-3.5 w-3.5 text-deal-light" strokeWidth={2.5} />
            <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-deal-light">Free Tool</span>
          </div>
          <h1 className="font-display text-4xl font-black leading-[1.05] tracking-[-0.02em] text-white sm:text-6xl">
            Deal Clozr ROI Calculator
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-ash">
            One extra deal pays for how long? See exactly what your subscription is worth in terms of deals closed.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr,1.2fr]">
          {/* Input */}
          <div className="loud-card rounded-2xl border border-white/10 p-6 md:p-8">
            <h2 className="mb-6 font-display text-xl font-black text-white">Your Numbers</h2>
            <div className="space-y-5">
              <div>
                <label className="block mb-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-ash">Average Commission on a Deal ($)</label>
                <input type="number" value={avgCommission} onChange={(e) => setAvgCommission(e.target.value)}
                  className="w-full rounded-xl border border-deal/40 bg-deal/10 px-4 py-3 text-white text-sm outline-none focus:border-deal/60 transition-all" />
                <p className="mt-1.5 text-[11px] text-muted">Mini, full deal, or average — whatever a typical close means to you</p>
              </div>
              <div>
                <label className="block mb-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-ash">Deal Clozr Monthly Cost ($)</label>
                <input type="number" value={monthlyCost} onChange={(e) => setMonthlyCost(e.target.value)}
                  className="w-full rounded-xl border border-white/20 bg-white/[0.06] px-4 py-3 text-white text-sm outline-none focus:border-deal/60 transition-all" />
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-4">
            <div className="loud-card rounded-2xl border border-deal/20 p-6 md:p-8 text-center">
              <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-ash mb-2">
                One deal covers your subscription for
              </p>
              <div className="font-display text-5xl font-black text-white md:text-6xl">
                {yearsCovered}
              </div>
              <p className="text-sm text-ash">years</p>

              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-1.5">
                <DollarSign className="h-3.5 w-3.5 text-gold-light" />
                <span className="text-sm font-bold text-gold-light">
                  {monthsCovered} months of coverage
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="loud-card rounded-xl border border-white/8 p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-ash mb-1">Yearly Cost</p>
                <p className="font-display text-2xl font-black text-white">${yearlyCost.toFixed(0)}</p>
                <p className="text-[10px] text-muted mt-0.5">${cost.toFixed(2)}/mo × 12</p>
              </div>
              <div className="loud-card rounded-xl border border-white/8 p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-ash mb-1">Deals per Year</p>
                <p className="font-display text-2xl font-black text-white">{dealsForYear}</p>
                <p className="text-[10px] text-muted mt-0.5">to break even on subscription</p>
              </div>
              <div className="loud-card rounded-xl border border-deal/10 p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-ash mb-1">10-Year Total</p>
                <p className="font-display text-2xl font-black text-white">${tenYearCost.toFixed(0)}</p>
                <p className="text-[10px] text-muted mt-0.5">what you'd spend in a decade</p>
              </div>
              <div className="loud-card rounded-xl border border-deal/10 p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-ash mb-1">5-Year Cost</p>
                <p className="font-display text-2xl font-black text-white">${dealsForFiveYears}</p>
                <p className="text-[10px] text-muted mt-0.5">deals to cover 5 years</p>
              </div>
            </div>

            <div className="loud-card rounded-2xl border border-deal/10 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Star className="h-4 w-4 text-gold-light" strokeWidth={2.5} />
                <span className="text-xs font-bold uppercase tracking-[0.1em] text-gold-light">The Bottom Line</span>
              </div>
              <ul className="space-y-2 text-sm text-ash">
                <li className="flex items-start gap-2">
                  <TrendingUp className="h-4 w-4 text-deal shrink-0 mt-0.5" />
                  <span><strong className="text-bone">${comm.toLocaleString()} deal:</strong> covers <strong className="text-deal">{yearsCovered} years</strong> of Deal Clozr</span>
                </li>
                <li className="flex items-start gap-2">
                  <Zap className="h-4 w-4 text-deal shrink-0 mt-0.5" />
                  <span><strong className="text-bone">One extra mini (${200}):</strong> covers <strong className="text-deal">{(200 / cost / 12).toFixed(1)} years</strong></span>
                </li>
                <li className="flex items-start gap-2">
                  <DollarSign className="h-4 w-4 text-deal shrink-0 mt-0.5" />
                  <span><strong className="text-bone">Monthly cost:</strong> less than a tank of gas, one lunch, or half a streaming subscription</span>
                </li>
              </ul>
            </div>

            <div className="text-center">
              <Link
                href="/pricing"
                className="btn-loud inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-bold"
              >
                Get Your Agent — Starts Paying for Itself Day 1
                <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-20 text-center">
          <p className="text-xs text-muted">
            Results are estimates. Actual ROI depends on your deal volume, commission structure, and how much you use your agent.
            But the math is hard to argue with — one deal covers years.
          </p>
        </div>
      </div>
    </div>
  );
}
