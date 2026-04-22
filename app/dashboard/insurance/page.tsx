import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Shield, Download, Settings2 } from "lucide-react";
import Dashboard from "@/components/Dashboard";
import { insuranceDashboardSample } from "@/lib/dashboard-data-insurance";

export const metadata: Metadata = {
  title: "Insurance Dashboard",
  description:
    "Live sales dashboard for insurance agents. New business premium, retention rate, cross-sell tracking, next milestones — updated daily.",
};

export default function InsuranceDashboardPage() {
  return (
    <>
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
              <Shield className="h-4 w-4 text-deal" strokeWidth={2} />
              <span className="font-mono text-xs font-medium uppercase tracking-widest text-deal">
                Insurance
              </span>
            </div>
            <div className="mx-2 h-4 w-px bg-iron hidden sm:block" />
            <button type="button" className="inline-flex items-center gap-1.5 rounded-md border border-iron px-3 py-1.5 text-xs font-medium text-ash transition-colors hover:border-ash hover:text-bone">
              <Download className="h-3.5 w-3.5" strokeWidth={2} />
              Export
            </button>
            <button type="button" className="inline-flex items-center gap-1.5 rounded-md border border-iron px-3 py-1.5 text-xs font-medium text-ash transition-colors hover:border-ash hover:text-bone">
              <Settings2 className="h-3.5 w-3.5" strokeWidth={2} />
              Commission plan
            </button>
          </div>
        </div>
      </section>

      <Dashboard data={insuranceDashboardSample} />

      <section className="mx-auto max-w-[480px] px-4 pb-20">
        <div className="rounded-xl border border-iron bg-slate p-5">
          <div className="mb-1 font-mono text-[10px] font-medium uppercase tracking-[1.5px] text-deal">
            DEMO DASHBOARD
          </div>
          <div className="mb-3 text-[15px] text-bone">
            Live preview using sample State Farm data. Real accounts
            auto-generate from your AMS and commission schedule.
          </div>
          <Link href="/#waitlist" className="inline-flex items-center gap-2 rounded-md bg-deal px-5 py-2.5 text-sm font-medium text-pit transition-colors hover:bg-deal-hover">
            Join Waitlist
          </Link>
        </div>
      </section>
    </>
  );
}
