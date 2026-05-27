"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, Calculator, DollarSign, TrendingUp, BarChart3, Star, Copy, Check } from "lucide-react";

export default function PayPlanCalculator() {
  const [draw, setDraw] = useState("2600");
  const [commPct, setCommPct] = useState("25");
  const [miniFlat, setMiniFlat] = useState("200");
  const [volumeBonus, setVolumeBonus] = useState("500");
  const [bonusAt, setBonusAt] = useState("11");
  const [units, setUnits] = useState("10");
  const [fullDeals, setFullDeals] = useState("4");
  const [avgFrontGross, setAvgFrontGross] = useState("3200");
  const [showBreakdown, setShowBreakdown] = useState(false);

  const u = Number(units) || 0;
  const fd = Number(fullDeals) || 0;
  const afg = Number(avgFrontGross) || 0;
  const miniCount = Math.max(0, u - fd);
  const miniCommission = miniCount * (Number(miniFlat) || 0);
  const fullCommission = fd * (afg * (Number(commPct) / 100));
  const beforeBonus = fullCommission + miniCommission;
  const drawAmt = Number(draw) || 0;
  const bonusThreshold = Number(bonusAt) || 11;
  const bonusAmt = Number(volumeBonus) || 0;
  const earnedBonus = u >= bonusThreshold ? bonusAmt : 0;
  const retroPct = earnedBonus > 0 ? 25 : 0;
  const retroAmount = earnedBonus > 0 ? beforeBonus * 0.25 : 0;
  const grossPay = beforeBonus + earnedBonus + retroAmount;
  const takeHome = Math.max(0, grossPay - drawAmt);
  const annualAtRate = Math.round(grossPay * 12);
  const dealsToBreakeven = Math.ceil(drawAmt / ((Number(miniFlat) || 1)));
  const oneExtraDealYears = ((Number(miniFlat) || 200) / 29.99 / 12).toFixed(1);

  return (
    <div className="relative min-h-screen overflow-hidden loud-bg">
      <div className="grid-pattern" />
      <div className="grain" />

      <div className="relative mx-auto max-w-5xl px-6 py-16 md:py-24">
        {/* Breadcrumb */}
        <div className="mb-8 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-deal/40 bg-deal/10 px-3.5 py-1.5 backdrop-blur">
            <Calculator className="h-3.5 w-3.5 text-deal-light" strokeWidth={2.5} />
            <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-deal-light">Free Tool</span>
          </div>
          <h1 className="font-display text-4xl font-black leading-[1.05] tracking-[-0.02em] text-white sm:text-6xl">
            Pay Plan Calculator
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-ash">
            See exactly what you'll earn at every unit count. Draw, mini, commission split, volume bonus — run the numbers real quick.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr,1.2fr]">
          {/* ─── INPUT FORM ─── */}
          <div className="loud-card rounded-2xl border border-white/10 p-6 md:p-8">
            <h2 className="mb-6 font-display text-xl font-black text-white">Your Pay Plan</h2>

            <div className="space-y-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-ash">Monthly Draw ($)</label>
                  <input type="number" value={draw} onChange={(e) => setDraw(e.target.value)}
                    className="w-full rounded-xl border border-white/20 bg-white/[0.06] px-4 py-3 text-white placeholder:text-muted text-sm outline-none focus:border-deal/60 focus:ring-1 focus:ring-deal/30 transition-all" />
                </div>
                <div>
                  <label className="block mb-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-ash">Commission Split (%)</label>
                  <input type="number" value={commPct} onChange={(e) => setCommPct(e.target.value)}
                    className="w-full rounded-xl border border-white/20 bg-white/[0.06] px-4 py-3 text-white placeholder:text-muted text-sm outline-none focus:border-deal/60 focus:ring-1 focus:ring-deal/30 transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-ash">Mini / Flat ($)</label>
                  <input type="number" value={miniFlat} onChange={(e) => setMiniFlat(e.target.value)}
                    className="w-full rounded-xl border border-white/20 bg-white/[0.06] px-4 py-3 text-white placeholder:text-muted text-sm outline-none focus:border-deal/60 focus:ring-1 focus:ring-deal/30 transition-all" />
                </div>
                <div>
                  <label className="block mb-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-ash">Volume Bonus ($)</label>
                  <input type="number" value={volumeBonus} onChange={(e) => setVolumeBonus(e.target.value)}
                    className="w-full rounded-xl border border-white/20 bg-white/[0.06] px-4 py-3 text-white placeholder:text-muted text-sm outline-none focus:border-deal/60 focus:ring-1 focus:ring-deal/30 transition-all" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-ash">Bonus at (units)</label>
                  <input type="number" value={bonusAt} onChange={(e) => setBonusAt(e.target.value)}
                    className="w-full rounded-xl border border-white/20 bg-white/[0.06] px-4 py-3 text-white placeholder:text-muted text-sm outline-none focus:border-deal/60 focus:ring-1 focus:ring-deal/30 transition-all" />
                </div>
                <div>
                  <label className="block mb-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-ash">Avg Front Gross ($)</label>
                  <input type="number" value={avgFrontGross} onChange={(e) => setAvgFrontGross(e.target.value)}
                    className="w-full rounded-xl border border-white/20 bg-white/[0.06] px-4 py-3 text-white placeholder:text-muted text-sm outline-none focus:border-deal/60 focus:ring-1 focus:ring-deal/30 transition-all" />
                </div>
              </div>

              <hr className="border-white/10" />

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-ash">Your Units</label>
                  <input type="number" value={units} onChange={(e) => setUnits(e.target.value)}
                    className="w-full rounded-xl border border-deal/40 bg-deal/10 px-4 py-3 text-white placeholder:text-muted text-sm outline-none focus:border-deal/60 focus:ring-1 focus:ring-deal/30 transition-all" />
                </div>
                <div>
                  <label className="block mb-1.5 text-[10px] font-bold uppercase tracking-[0.1em] text-ash">Full Deals</label>
                  <input type="number" value={fullDeals} onChange={(e) => setFullDeals(e.target.value)}
                    className="w-full rounded-xl border border-white/20 bg-white/[0.06] px-4 py-3 text-white placeholder:text-muted text-sm outline-none focus:border-deal/60 focus:ring-1 focus:ring-deal/30 transition-all" />
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowBreakdown(true)}
              className="btn-loud mt-6 flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-bold"
            >
              <BarChart3 className="h-4 w-4" />
              Calculate My Pay
            </button>
          </div>

          {/* ─── RESULTS ─── */}
          <div>
            {!showBreakdown ? (
              <div className="flex h-full items-center justify-center rounded-2xl border border-dashed border-white/10 p-12 text-center">
                <div>
                  <Calculator className="mx-auto h-12 w-12 text-muted" strokeWidth={1.5} />
                  <p className="mt-4 text-sm text-muted">Enter your pay plan and units above</p>
                  <p className="text-xs text-muted/60 mt-1">Defaults are a real dealership's numbers — adjust to yours</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Big number card */}
                <div className="loud-card rounded-2xl border border-deal/20 p-6 md:p-8 text-center">
                  <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-ash mb-2">
                    {u >= bonusThreshold ? `✅ BONUS UNLOCKED` : `${bonusThreshold - u} units from bonus`}
                  </p>
                  <div className="font-display text-5xl font-black text-white md:text-6xl">
                    ${grossPay.toLocaleString()}
                  </div>
                  <p className="mt-1 text-sm text-ash">Estimated monthly gross pay</p>

                  {takeHome > 0 && (
                    <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-deal/30 bg-deal/10 px-4 py-1.5">
                      <DollarSign className="h-3.5 w-3.5 text-deal-light" />
                      <span className="text-sm font-bold text-deal-light">
                        ${takeHome.toLocaleString()} take-home over draw
                      </span>
                    </div>
                  )}
                </div>

                {/* Breakdown cards */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="loud-card rounded-xl border border-white/8 p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-ash mb-1">Full Deals</p>
                    <p className="font-display text-2xl font-black text-white">${fullCommission.toLocaleString()}</p>
                    <p className="text-[10px] text-muted mt-0.5">{fd} deals × {afg.toLocaleString()} gross × {commPct}%</p>
                  </div>
                  <div className="loud-card rounded-xl border border-white/8 p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-ash mb-1">Minis</p>
                    <p className="font-display text-2xl font-black text-white">${miniCommission.toLocaleString()}</p>
                    <p className="text-[10px] text-muted mt-0.5">{miniCount} mini{miniCount !== 1 ? "s" : ""} × ${Number(miniFlat).toLocaleString()}</p>
                  </div>
                  <div className="loud-card rounded-xl border border-white/8 p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-ash mb-1">Volume Bonus</p>
                    <p className="font-display text-2xl font-black text-white">${earnedBonus.toLocaleString()}</p>
                    <p className="text-[10px] text-muted mt-0.5">
                      {earnedBonus > 0 ? `✅ ${u} units ≥ ${bonusAt}` : `${bonusThreshold - u} more units needed`}
                    </p>
                  </div>
                  <div className="loud-card rounded-xl border border-white/8 p-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-ash mb-1">Retro ({retroPct}%)</p>
                    <p className="font-display text-2xl font-black text-white">${retroAmount.toLocaleString()}</p>
                    <p className="text-[10px] text-muted mt-0.5">
                      {retroAmount > 0 ? `${retroPct}% of ${beforeBonus.toLocaleString()}` : "Unlocks at bonus tier"}
                    </p>
                  </div>
                </div>

                {/* Smart insights */}
                <div className="loud-card rounded-2xl border border-deal/10 p-5">
                  <div className="flex items-center gap-2 mb-3">
                    <Star className="h-4 w-4 text-gold-light" strokeWidth={2.5} />
                    <span className="text-xs font-bold uppercase tracking-[0.1em] text-gold-light">Your Insights</span>
                  </div>
                  <ul className="space-y-2 text-sm text-ash">
                    <li className="flex items-start gap-2">
                      <TrendingUp className="h-4 w-4 text-deal shrink-0 mt-0.5" />
                      <span><strong className="text-bone">At this rate:</strong> ~${annualAtRate.toLocaleString()}/year before taxes</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <DollarSign className="h-4 w-4 text-deal shrink-0 mt-0.5" />
                      <span><strong className="text-bone">Breakeven:</strong> ~{dealsToBreakeven} mini{dealsToBreakeven !== 1 ? "s" : ""} to clear your draw</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Star className="h-4 w-4 text-deal shrink-0 mt-0.5" />
                      <span><strong className="text-bone">One extra deal:</strong> covers <strong className="text-deal">{oneExtraDealYears} years</strong> of Deal Clozr ($29.99/mo)</span>
                    </li>
                  </ul>
                </div>

                {/* CTA */}
                <div className="text-center">
                  <Link
                    href="/pricing"
                    className="btn-loud inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-bold"
                  >
                    Get Your Own Agent — Tracks This Automatically
                    <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                  </Link>
                  <p className="mt-3 text-xs text-muted">Your agent logs every deal, calculates commission, and tracks bonus tiers — so you don't have to.</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-20 text-center">
          <p className="text-xs text-muted">
            Results are estimates based on the numbers you enter. Actual pay depends on your specific pay plan, backend gross, dealer fees, and adjustments. Built by a working closer — not an accountant.
          </p>
        </div>
      </div>
    </div>
  );
}
