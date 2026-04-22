import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Car, Download, Settings2 } from "lucide-react";
import Dashboard from "@/components/Dashboard";
import { autoDashboardSample } from "@/lib/dashboard-data-auto";

export const metadata: Metadata = {
  title: "Auto Dashboard",
  description:
    "Live sales dashboard for auto closers. Units, tier progress, earnings breakdown, next milestones — updated daily.",
};

export default function AutoDashboardPage() {
  return (
    <>
      {/* Subtle top bar */}
      <section className="border-b border-iron bg-slate">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-2 text-sm text-ash transition-colors hover:text-bone"
          >
            <ArrowLeft className="h-4 w-4" strokeWidth={2} />
            All dashboards
          </Link>
          <div className="flex items-center gap-2">
            <div className="hidden items-center gap-2 sm:flex">
              <Car className="h-4 w-4 text-deal" strokeWidth={2} />
              <span className="font-mono text-xs font-medium uppercase tracking-widest text-deal">
                Auto
              </span>
            </div>
            <div className="mx-2 h-4 w-px bg-iron hidden sm:block" />
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-md border border-iron px-3 py-1.5 text-xs font-medium text-ash transition-colors hover:border-ash hover:text-bone"
              aria-label="Export dashboard"
            >
              <Download className="h-3.5 w-3.5" strokeWidth={2} />
              Export
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-1.5 rounded-md border border-iron px-3 py-1.5 text-xs font-medium text-ash transition-colors hover:border-ash hover:text-bone"
              aria-label="Pay plan settings"
            >
              <Settings2 className="h-3.5 w-3.5" strokeWidth={2} />
              Pay plan
            </button>
          </div>
        </div>
      </section>

      {/* Dashboard itself */}
      <Dashboard data={autoDashboardSample} />

      {/* Footer CTA strip */}
      <section className="mx-auto max-w-[480px] px-4 pb-20">
        <div className="rounded-xl border border-iron bg-slate p-5">
          <div className="mb-1 font-mono text-[10px] font-medium uppercase tracking-[1.5px] text-deal">
            DEMO DASHBOARD
          </div>
          <div className="mb-3 text-[15px] text-bone">
            This is a live preview using sample Sun Toyota data. On your real
            account, this dashboard auto-generates from your pay plan upload
            and daily deal logs.
          </div>
          <Link
            href="/#waitlist"
            className="inline-flex items-center gap-2 rounded-md bg-deal px-5 py-2.5 text-sm font-medium text-pit transition-colors hover:bg-deal-hover"
          >
            Join Waitlist
          </Link>
        </div>
      </section>
    </>
  );
}
