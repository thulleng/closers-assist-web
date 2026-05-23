import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Car } from "lucide-react";
import IncomeTracker from "@/components/IncomeTracker";
import QuickDealLoggerWrapper from "@/components/QuickDealLoggerWrapper";
import DashboardTopBarActions from "@/components/DashboardTopBarActions";
import { autoDashboardSample } from "@/lib/dashboard-data-auto";
import { buildAutoDashboard } from "@/lib/dashboard-data-auto-live";
import { createClient } from "@/lib/supabase/server";
import type { DashboardData } from "@/lib/dashboard-types";

export const metadata: Metadata = {
  title: "Auto Dashboard",
  description:
    "Live sales dashboard for auto closers. Units, tier progress, earnings breakdown, next milestones — updated daily.",
};

export const dynamic = "force-dynamic";

async function loadDashboardData(): Promise<DashboardData> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return autoDashboardSample;

  const now = new Date();
  const start = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), 1)).toISOString().slice(0, 10);
  const end   = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() + 1, 1)).toISOString().slice(0, 10);

  const [dealsResult, planResult, profileResult] = await Promise.all([
    supabase
      .from("deals")
      .select("id, customer_name, vehicle, deal_type, front_gross, commission, units, sold_date, notes")
      .eq("user_id", user.id)
      .gte("sold_date", start).lt("sold_date", end)
      .order("sold_date", { ascending: true }),
    supabase
      .from("pay_plans")
      .select("commission_rate, monthly_draw, half_mini_amount, full_mini_amount, street_purchase_amount, volume_bonuses, cxi_threshold, cxi_bonus, review_bonus")
      .eq("user_id", user.id)
      .maybeSingle(),
    supabase
      .from("agent_profiles")
      .select("first_name, last_name, company")
      .eq("user_id", user.id)
      .maybeSingle(),
  ]);

  if (!planResult.data) return autoDashboardSample;
  return buildAutoDashboard(dealsResult.data ?? [], planResult.data, profileResult.data ?? null);
}

export default async function AutoDashboardPage() {
  const data = await loadDashboardData();
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  const isDemo = !user;
  return (
    <>
      {/* Top bar — glass with neon accent */}
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
            <DashboardTopBarActions deals={data.deals} csvFilename={`closers-assist-deals-${data.period.replace(/\s+/g, "-").toLowerCase()}.csv`} />
          </div>
        </div>
      </section>

      {/* Dashboard itself */}
      <IncomeTracker data={data} />

      {/* Quick Deal Logger — inline on the dashboard */}
      <section className="mx-auto max-w-[500px] px-4 pb-5">
        <QuickDealLoggerWrapper />
      </section>

      {/* Footer — only show demo CTA when not authenticated */}
      {isDemo && (
        <section className="mx-auto max-w-[500px] px-4 pb-20">
          <div className="glass-panel p-5 text-center">
            <div className="mb-1 font-mono text-[10px] font-medium uppercase tracking-[1.5px] text-neon-green">
              DEMO DASHBOARD
            </div>
            <div className="mb-4 text-[15px] text-bone">
              This is a live preview using sample Sun Toyota data. On your real
              account, this dashboard auto-generates from your pay plan upload
              and daily deal logs.
            </div>
            <Link
              href="/pricing"
              className="btn-loud inline-flex items-center gap-2 rounded-lg px-6 py-3 text-sm"
            >
              Get Started
            </Link>
          </div>
        </section>
      )}

      {/* Sassy lives on Telegram — chat with her there for deals and life */}
    </>
  );
}
