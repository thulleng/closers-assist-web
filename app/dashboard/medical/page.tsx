import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, HeartPulse, Download, Settings2 } from "lucide-react";
import Dashboard from "@/components/Dashboard";
import { medicalDashboardSample } from "@/lib/dashboard-data-medical";

export const metadata: Metadata = {
  title: "Medical Devices Dashboard",
  description:
    "Live sales dashboard for medical device reps. Cases, quota attainment, procedure mix, territory progress — updated daily.",
};

export default function MedicalDashboardPage() {
  return (
    <>
      <section className="border-b border-white/5 bg-black/40 backdrop-blur-md">
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
              <HeartPulse className="h-4 w-4 text-neon-green" strokeWidth={2} />
              <span className="font-mono text-xs font-medium uppercase tracking-widest text-neon-green">
                Medical
              </span>
            </div>
            <div className="mx-2 h-4 w-px bg-white/10 hidden sm:block" />
            <button type="button" className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-ash transition-all hover:border-white/20 hover:text-bone hover:bg-white/10">
              <Download className="h-3.5 w-3.5" strokeWidth={2} />
              Export
            </button>
            <button type="button" className="inline-flex items-center gap-1.5 rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-ash transition-all hover:border-white/20 hover:text-bone hover:bg-white/10">
              <Settings2 className="h-3.5 w-3.5" strokeWidth={2} />
              Comp plan
            </button>
          </div>
        </div>
      </section>

      <Dashboard data={medicalDashboardSample} />

      <section className="mx-auto max-w-[480px] px-4 pb-20">
        <div className="glass-panel p-5 text-center">
          <div className="mb-1 font-mono text-[10px] font-medium uppercase tracking-[1.5px] text-neon-green">
            DEMO DASHBOARD
          </div>
          <div className="mb-3 text-[15px] text-bone">
            Live preview using sample ortho territory data. Real accounts
            auto-generate from Veeva + your comp plan upload.
          </div>
          <Link href="/pricing" className="btn-loud inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm">
            Get Started
          </Link>
        </div>
      </section>
    </>
  );
}
