"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const STARTER_PRICE = 9.99;

export default function RoiCalculator() {
  const [commission, setCommission] = useState(500);
  const [extraDeals, setExtraDeals] = useState(1);

  const calc = useMemo(() => {
    const monthlyExtra = commission * extraDeals;
    const yearlyExtra = monthlyExtra * 12;
    const yearlyCost = STARTER_PRICE * 12;
    const roi = yearlyExtra - yearlyCost;
    const daysToBreakeven = (yearlyCost / yearlyExtra) * 365;
    const yearsPaidFor = commission / yearlyCost;

    let breakevenLabel: string;
    if (daysToBreakeven < 1) breakevenLabel = "< 1 day";
    else if (daysToBreakeven < 30)
      breakevenLabel = `${Math.round(daysToBreakeven)} days`;
    else breakevenLabel = `${Math.round(daysToBreakeven / 30)} mo`;

    let yearsLabel: string;
    if (yearsPaidFor >= 1) {
      const y = Math.round(yearsPaidFor);
      yearsLabel = `${y} year${y === 1 ? "" : "s"}`;
    } else {
      yearsLabel = `${Math.round(yearsPaidFor * 12)} months`;
    }

    return {
      roi: Math.round(roi),
      breakevenLabel,
      yearsLabel,
    };
  }, [commission, extraDeals]);

  const fmt = (n: number) => "$" + n.toLocaleString();

  return (
    <div className="rounded-xl border border-iron bg-slate p-6 md:p-8">
      {/* Header */}
      <div className="mb-6 flex items-baseline justify-between">
        <div>
          <div className="text-xs font-medium uppercase tracking-widest text-ash">
            Starter plan
          </div>
          <div className="mt-1 font-mono text-2xl font-medium text-bone">
            $9.99<span className="text-sm text-ash">/mo</span>
          </div>
        </div>
        <div className="text-right">
          <div className="text-xs text-muted">Your break-even</div>
          <div className="font-mono text-sm font-medium text-deal">
            {calc.breakevenLabel}
          </div>
        </div>
      </div>

      <div className="mb-6 h-px bg-iron" />

      {/* Commission slider */}
      <div className="mb-6">
        <div className="mb-2 flex items-baseline justify-between">
          <label className="text-sm text-ash">
            Your average commission per deal
          </label>
          <span className="font-mono text-base font-medium text-bone">
            {fmt(commission)}
          </span>
        </div>
        <input
          type="range"
          min={100}
          max={5000}
          step={50}
          value={commission}
          onChange={(e) => setCommission(Number(e.target.value))}
          className="w-full"
        />
        <div className="mt-1 flex justify-between font-mono text-[10px] text-muted">
          <span>$100</span>
          <span>$5,000</span>
        </div>
      </div>

      {/* Extra deals slider */}
      <div className="mb-6">
        <div className="mb-2 flex items-baseline justify-between">
          <label className="text-sm text-ash">
            Extra deals per month this gets you
          </label>
          <span className="font-mono text-base font-medium text-bone">
            {extraDeals}
          </span>
        </div>
        <input
          type="range"
          min={1}
          max={10}
          step={1}
          value={extraDeals}
          onChange={(e) => setExtraDeals(Number(e.target.value))}
          className="w-full"
        />
        <div className="mt-1 flex justify-between font-mono text-[10px] text-muted">
          <span>1</span>
          <span>10</span>
        </div>
      </div>

      <div className="my-6 h-px bg-iron" />

      {/* Results */}
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-md border border-deal bg-pit p-4">
          <div className="mb-1 text-xs text-ash">Your ROI this year</div>
          <div className="font-mono text-2xl font-medium text-deal md:text-3xl">
            {fmt(calc.roi)}
          </div>
        </div>
        <div className="rounded-md border border-iron bg-pit p-4">
          <div className="mb-1 text-xs text-ash">1 deal pays for</div>
          <div className="font-mono text-2xl font-medium text-bone md:text-3xl">
            {calc.yearsLabel}
          </div>
        </div>
      </div>

      <p className="mt-5 text-sm leading-relaxed text-bone">
        One extra deal pays for{" "}
        <span className="font-medium text-deal">{calc.yearsLabel}</span> of
        Closers Assist.
      </p>

      <Link
        href="/pricing"
        className="group mt-5 flex w-full items-center justify-center gap-2 rounded-md bg-deal py-3 text-center text-[15px] font-medium text-pit transition-colors hover:bg-deal-hover"
      >
        Lock in my rate
        <ArrowRight
          className="h-4 w-4 transition-transform group-hover:translate-x-1"
          strokeWidth={2.5}
        />
      </Link>

      <p className="mt-3 text-center text-[11px] text-muted">
        Team pricing starts at $199.99/mo for up to 25 reps.{" "}
        <Link
          href="/pricing"
          className="text-ash transition-colors hover:text-deal"
        >
          See all plans →
        </Link>
      </p>
    </div>
  );
}
