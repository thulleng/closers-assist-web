import { DollarSign, Users, Target } from "lucide-react";

async function fetchMetrics() {
  try {
    const secret = process.env.CLOSERS_API_SECRET;
    if (!secret) return null;

    const base = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : process.env.NEXT_PUBLIC_SITE_URL || "https://closersassist.com";

    const res = await fetch(`${base}/api/admin/metrics?secret=${encodeURIComponent(secret)}`);
    const data = await res.json();
    if (data.error) return null;
    return data as {
      stripe: { mrr: number; active_subscriptions: number; arpu: number };
      platform: { total_users: number; deals_this_month: number; deals_all_time: number };
    };
  } catch {
    return null;
  }
}

export default async function LiveMetricsStrip() {
  const metrics = await fetchMetrics();
  if (!metrics) return null;

  const fmt = (n: number) => n.toLocaleString();
  const usd = (n: number) => `$${n.toLocaleString()}`;

  return (
    <div className="mb-10 grid grid-cols-3 gap-3">
      <Card
        icon={<DollarSign className="h-4 w-4 text-deal" strokeWidth={2.5} />}
        label="MRR"
        value={usd(metrics.stripe.mrr)}
        sub={`${metrics.stripe.active_subscriptions} subs`}
        accent="green"
      />
      <Card
        icon={<Users className="h-4 w-4 text-gold-light" strokeWidth={2.5} />}
        label="Users"
        value={fmt(metrics.platform.total_users)}
        sub={`${fmt(metrics.platform.deals_all_time)} deals`}
        accent="gold"
      />
      <Card
        icon={<Target className="h-4 w-4 text-deal" strokeWidth={2.5} />}
        label="This Month"
        value={fmt(metrics.platform.deals_this_month)}
        sub={`ARPU ${usd(metrics.stripe.arpu)}`}
        accent="green"
      />
    </div>
  );
}

function Card({
  icon, label, value, sub, accent,
}: {
  icon: React.ReactNode; label: string; value: string; sub: string; accent: "green" | "gold";
}) {
  return (
    <div className="rounded-xl border border-iron bg-slate/30 p-4 text-center">
      <div className="mb-2 flex justify-center">{icon}</div>
      <p className={`font-display text-2xl font-black ${accent === "green" ? "glow-text-green" : "text-gold-light"}`}>
        {value}
      </p>
      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted">{label}</p>
      <p className="mt-0.5 text-[10px] text-muted">{sub}</p>
    </div>
  );
}
