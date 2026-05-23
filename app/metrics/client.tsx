"use client";

import { useEffect, useState } from "react";
import { TrendingUp, Users, DollarSign, Activity, CreditCard, Target } from "lucide-react";

type Metrics = {
  stripe: {
    mrr: number;
    active_subscriptions: number;
    total_customers: number;
    arpu: number;
    error?: string;
  };
  platform: {
    total_users: number;
    profiles_created: number;
    active_users_this_month: number;
    active_users_last_month: number;
    deals_this_month: number;
    deals_all_time: number;
  };
  generated_at: string;
};

export function MetricsClient() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [secret, setSecret] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchMetrics = async (s: string) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/admin/metrics?secret=${encodeURIComponent(s)}`);
      const data = await res.json();
      if (data.error) { setError(data.error); setMetrics(null); }
      else setMetrics(data);
    } catch {
      setError("Failed to load");
    } finally {
      setLoading(false);
    }
  };

  const fmt = (n: number) => n.toLocaleString();
  const fmtUSD = (n: number) => `$${n.toLocaleString()}`;

  return (
    <section className="relative min-h-screen overflow-hidden loud-bg">
      <div className="grid-pattern opacity-40" />
      <div className="pointer-events-none absolute top-20 right-20 h-96 w-96 rounded-full blur-[120px] opacity-20"
        style={{ background: "radial-gradient(circle, rgba(16,185,129,0.4), transparent 70%)" }} />
      <div className="pointer-events-none absolute bottom-20 left-20 h-80 w-80 rounded-full blur-[100px] opacity-15"
        style={{ background: "radial-gradient(circle, rgba(251,191,36,0.4), transparent 70%)" }} />

      <div className="relative mx-auto max-w-6xl px-6 py-16">
        <div className="mb-10">
          <h1 className="text-shine font-display text-4xl font-black tracking-tight sm:text-5xl">Deal Clozr</h1>
          <p className="mt-2 text-sm text-ash">Internal metrics. Investor-ready.</p>
        </div>

        {!metrics && (
          <div className="mx-auto max-w-md">
            <div className="glass-panel rounded-2xl p-6">
              <label className="mb-2 block text-xs font-semibold text-ash uppercase tracking-wider">API Secret</label>
              <input
                type="password"
                value={secret}
                onChange={(e) => setSecret(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && fetchMetrics(secret)}
                placeholder="Enter CLOSERS_API_SECRET"
                className="w-full rounded-xl border border-iron bg-slate px-4 py-3 text-sm text-bone placeholder:text-muted focus:border-deal/60 focus:outline-none"
              />
              <button
                onClick={() => fetchMetrics(secret)}
                disabled={loading || !secret}
                className="btn-loud mt-4 w-full"
              >
                {loading ? "Loading..." : "View Metrics"}
              </button>
              {error && <p className="mt-3 text-xs text-red-400">{error}</p>}
            </div>
          </div>
        )}

        {metrics && (
          <>
            {/* KPI Row */}
            <div className="mb-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <MetricCard icon={<DollarSign className="h-5 w-5" />} label="MRR" value={fmtUSD(metrics.stripe.mrr)} sub={`${metrics.stripe.active_subscriptions} active subs`} accent="green" />
              <MetricCard icon={<Users className="h-5 w-5" />} label="Total Users" value={fmt(metrics.platform.total_users)} sub={`${metrics.platform.profiles_created} profiles`} accent="gold" />
              <MetricCard icon={<Activity className="h-5 w-5" />} label="Deals This Month" value={fmt(metrics.platform.deals_this_month)} sub={`${metrics.platform.active_users_this_month} active users`} accent="green" />
              <MetricCard icon={<Target className="h-5 w-5" />} label="All-Time Deals" value={fmt(metrics.platform.deals_all_time)} sub={`ARPU ${fmtUSD(metrics.stripe.arpu)}`} accent="gold" />
            </div>

            {/* Detail Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <DetailCard label="Active Users This Month" value={fmt(metrics.platform.active_users_this_month)} trend={metrics.platform.active_users_last_month > 0 ? `${Math.round((metrics.platform.active_users_this_month / metrics.platform.active_users_last_month) * 100)}% vs last` : null} />
              <DetailCard label="Stripe Customers" value={fmt(metrics.stripe.total_customers)} />
              <DetailCard label="Monthly Recurring Revenue" value={fmtUSD(metrics.stripe.mrr)} />
              <DetailCard label="Active Subscriptions" value={fmt(metrics.stripe.active_subscriptions)} />
              <DetailCard label="Avg Revenue Per User" value={fmtUSD(metrics.stripe.arpu)} />
              <DetailCard label="Last Month Active" value={fmt(metrics.platform.active_users_last_month)} />
            </div>

            {metrics.stripe.error && (
              <div className="mt-6 rounded-xl border border-gold/30 bg-gold/10 p-4">
                <p className="text-xs text-gold">Stripe: {metrics.stripe.error}</p>
                <p className="mt-1 text-[11px] text-ash">Stripe numbers may be incomplete. STRIPE_SECRET_KEY may need configuration.</p>
              </div>
            )}

            <p className="mt-8 text-center text-[11px] text-muted">
              Generated {new Date(metrics.generated_at).toLocaleString()}
            </p>
          </>
        )}
      </div>
    </section>
  );
}

function MetricCard({ icon, label, value, sub, accent }: {
  icon: React.ReactNode; label: string; value: string; sub: string; accent: "green" | "gold";
}) {
  return (
    <div className="glass-panel rounded-2xl p-5">
      <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-xl ${accent === "green" ? "bg-deal/15 text-deal" : "bg-gold/15 text-gold"}`}>
        {icon}
      </div>
      <p className="text-xs font-semibold uppercase tracking-wider text-ash">{label}</p>
      <p className={`mt-1 font-display text-3xl font-black ${accent === "green" ? "glow-text-green" : "text-gold-light"}`}>{value}</p>
      <p className="mt-1 text-[11px] text-muted">{sub}</p>
    </div>
  );
}

function DetailCard({ label, value, trend }: { label: string; value: string; trend?: string | null }) {
  return (
    <div className="rounded-xl border border-iron bg-slate/50 p-4">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-muted">{label}</p>
      <p className="mt-1 text-xl font-bold text-bone">{value}</p>
      {trend && <p className="mt-1 text-[11px] text-deal">{trend}</p>}
    </div>
  );
}
