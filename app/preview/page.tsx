import Link from "next/link";
import { ArrowRight, TrendingUp, DollarSign, BarChart3, Star, Car, CheckCircle2, Zap, Award } from "lucide-react";
import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Dashboard Preview · Deal Clozr",
  description: "See exactly what Deal Clozr's commission dashboard looks like. Real-time deal tracking, pay plan math, bonus tiers, and unit counts — all automated.",
  openGraph: {
    title: "Deal Clozr Dashboard Preview — See Your Commissions Live",
    description: "Real-time commission tracking, pay plan math, bonus tiers. See what closers see every day.",
  },
};

const mockDeals = [
  { customer: "Agnelo B.", vehicle: "Tundra Limited", type: "Full Deal", gross: "$3,200", commission: "$800", units: 1, date: "May 24" },
  { customer: "Mike Rinaldi", vehicle: "RAV4 XLE", type: "Full Mini", gross: "-", commission: "$200", units: 1, date: "May 22" },
  { customer: "Victoria F.", vehicle: "Camry SE", type: "Full Deal", gross: "$2,800", commission: "$700", units: 1, date: "May 21" },
  { customer: "James Smith", vehicle: "Tacoma SR5", type: "Full Deal", gross: "$1,200", commission: "$300", units: 0.5, date: "May 20" },
  { customer: "Sang Park", vehicle: "Highlander LTD", type: "Full Mini", gross: "-", commission: "$200", units: 1, date: "May 19" },
  { customer: "Idaliz F. M.", vehicle: "Corolla LE", type: "Full Deal", gross: "$1,800", commission: "$450", units: 1, date: "May 18" },
  { customer: "John Overbrook", vehicle: "RAV4 Hybrid", type: "Full Deal", gross: "$3,600", commission: "$900", units: 1, date: "May 17" },
  { customer: "Stephen C.", vehicle: "4Runner SR5", type: "Half Mini", gross: "-", commission: "$100", units: 0.5, date: "May 16" },
  { customer: "Carolyn P.", vehicle: "Sienna XLE", type: "Full Mini", gross: "-", commission: "$200", units: 1, date: "May 15" },
  { customer: "Marines A. G.", vehicle: "Corolla Cross", type: "Full Deal", gross: "$1,600", commission: "$400", units: 1, date: "May 14" },
];

const totalCommission = 4250;
const totalUnits = 9;
const fullDeals = 5;
const minis = 4;
const halfMinis = 1;
const drawAmount = 2600;

export default function DashboardPreview() {
  return (
    <div className="relative min-h-screen overflow-hidden loud-bg">
      <div className="grid-pattern opacity-30" />
      <div className="grain" />

      <div className="relative mx-auto max-w-6xl px-6 py-16 md:py-24">
        {/* Breadcrumb */}
        <div className="mb-8 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-deal/40 bg-deal/10 px-3.5 py-1.5 backdrop-blur">
            <BarChart3 className="h-3.5 w-3.5 text-deal-light" strokeWidth={2.5} />
            <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-deal-light">Live Preview</span>
          </div>
          <h1 className="font-display text-4xl font-black leading-[1.05] tracking-[-0.02em] text-white sm:text-6xl">
            Your dashboard.
            <br />
            <span className="text-shine font-black">Live from the floor.</span>
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-ash">
            What every closer sees when they open Deal Clozr. Deals logged automatically. Commissions calculated. Bonus tiers tracked. No manual entry.
          </p>
        </div>

        {/* Stats bar */}
        <FadeIn>
          <div className="grid grid-cols-2 gap-3 mb-6 sm:grid-cols-4">
            {[
              { label: "Total Units", value: totalUnits.toString(), color: "text-white", sub: `${fullDeals} full · ${minis} mini · ${halfMinis} half` },
              { label: "Commission MTD", value: `$${totalCommission.toLocaleString()}`, color: "text-deal", sub: `$${(totalCommission - drawAmount).toLocaleString()} over draw` },
              { label: "Close to Bonus", value: "2 units", color: "text-gold-light", sub: "$500 bonus at 11 units" },
              { label: "CXI Score", value: "4.8", color: "text-blue-400", sub: "$250 bonus if ≥ 4.8" },
            ].map((s) => (
              <div key={s.label} className="loud-card rounded-xl border border-white/8 p-4 md:p-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-ash mb-1">{s.label}</p>
                <p className={`font-display text-2xl font-black sm:text-3xl ${s.color}`}>{s.value}</p>
                <p className="text-[10px] text-muted mt-0.5">{s.sub}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Deals table */}
        <FadeIn delay={100}>
          <div className="loud-card rounded-2xl border border-white/10 overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-[1fr,1fr,1fr,1fr,80px,80px] gap-2 px-5 py-3 border-b border-white/5 bg-white/[0.02] text-[10px] font-bold uppercase tracking-widest text-muted">
              <div>Customer</div>
              <div>Vehicle</div>
              <div>Type</div>
              <div className="text-right">Gross</div>
              <div className="text-right">Comm</div>
              <div className="text-right">Units</div>
            </div>

            {/* Rows */}
            {mockDeals.map((d, i) => (
              <div key={i} className={`grid grid-cols-[1fr,1fr,1fr,1fr,80px,80px] gap-2 px-5 py-3 text-sm transition-colors hover:bg-white/[0.02] ${i < mockDeals.length - 1 ? "border-b border-white/5" : ""}`}>
                <div className="font-semibold text-white truncate">{d.customer}</div>
                <div className="text-ash truncate">{d.vehicle}</div>
                <div>
                  <span className={`inline-block rounded-full px-2 py-0.5 text-[10px] font-bold ${
                    d.type === "Full Deal" ? "bg-deal/15 text-deal" :
                    d.type === "Full Mini" ? "bg-purple-500/15 text-purple-400" :
                    "bg-blue-500/15 text-blue-400"
                  }`}>
                    {d.type}
                  </span>
                </div>
                <div className="text-right text-ash">{d.gross}</div>
                <div className="text-right font-bold text-white">{d.commission}</div>
                <div className="text-right text-ash">{d.units}</div>
              </div>
            ))}

            {/* Total row */}
            <div className="grid grid-cols-[1fr,1fr,1fr,1fr,80px,80px] gap-2 px-5 py-3 bg-deal/[0.04] border-t border-deal/20 text-sm font-bold">
              <div className="text-white">Total</div>
              <div></div>
              <div></div>
              <div className="text-right text-white">—</div>
              <div className="text-right text-deal">${totalCommission.toLocaleString()}</div>
              <div className="text-right text-deal">{totalUnits}</div>
            </div>
          </div>
        </FadeIn>

        {/* Bonus ladder callout */}
        <FadeIn delay={150}>
          <div className="mt-6 loud-card rounded-2xl border border-gold/20 p-5 md:p-6">
            <div className="flex items-center gap-2 mb-3">
              <Award className="h-5 w-5 text-gold-light" strokeWidth={2.5} />
              <span className="text-xs font-bold uppercase tracking-[0.1em] text-gold-light">Bonus Ladder</span>
            </div>
            <div className="grid gap-3 sm:grid-cols-3">
              {[
                { label: "11 Units", bonus: "$500 + 25% retro", status: totalUnits >= 9 ? "2 away" : totalUnits >= 11 ? "✅" : `${11 - totalUnits} away` },
                { label: "15 Units", bonus: "$750 + 25% retro", status: `${15 - totalUnits} away` },
                { label: "CXI ≥ 4.8", bonus: "$250", status: "On track" },
              ].map((b) => (
                <div key={b.label} className="rounded-xl border border-white/8 bg-black/30 p-4">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-bold text-white">{b.label}</span>
                    <span className={`text-[10px] font-bold ${
                      b.status === "✅" || b.status === "On track" ? "text-deal" : "text-gold-light"
                    }`}>{b.status}</span>
                  </div>
                  <p className="text-xs text-ash">{b.bonus}</p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* CTA */}
        <FadeIn delay={200}>
          <div className="mt-12 text-center">
            <Link
              href="/pricing"
              className="btn-loud inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base font-bold"
            >
              Get This Dashboard — Automatically
              <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
            </Link>
            <p className="mt-3 text-sm text-muted">
              Every deal you text gets logged. Every commission gets calculated. Every bonus tier gets tracked.
              <br />No manual entry. No spreadsheets. No guessing.
            </p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}
