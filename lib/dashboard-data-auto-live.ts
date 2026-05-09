import type { DashboardData, Deal, DealType } from "./dashboard-types";

type DealRow = {
  id: string;
  customer_name: string | null;
  vehicle: string | null;
  deal_type: "half_mini" | "full_mini" | "full_deal" | "street_purchase";
  front_gross: number | null;
  commission: number | null;
  units: number | null;
  sold_date: string | null;
  notes: string | null;
};

type PayPlanRow = {
  commission_rate: number | null;
  monthly_draw: number | null;
  half_mini_amount: number | null;
  full_mini_amount: number | null;
  street_purchase_amount: number | null;
  volume_bonuses: { units: number; bonus: number }[] | null;
  cxi_threshold: number | null;
  cxi_bonus: number | null;
  review_bonus: number | null;
};

type ProfileRow = {
  first_name: string | null;
  last_name: string | null;
  company: string | null;
};

const DEAL_TYPE_META: Record<DealRow["deal_type"], { label: string; variant: DealType["variant"] }> = {
  half_mini:       { label: "Half mini",  variant: "warning" },
  full_mini:       { label: "Full mini",  variant: "warning" },
  full_deal:       { label: "Full deal",  variant: "success" },
  street_purchase: { label: "Street",     variant: "neutral" },
};

function fmtUSD(n: number): string {
  return "$" + Math.round(Math.abs(n)).toLocaleString();
}

function monthLabel(d: Date): string {
  return d.toLocaleDateString("en-US", { month: "long", year: "numeric", timeZone: "America/New_York" }).toUpperCase();
}

export function buildAutoDashboard(
  deals: DealRow[],
  plan: PayPlanRow,
  profile: ProfileRow | null
): DashboardData {
  const now = new Date();

  // ── Metrics ────────────────────────────────────────────────────────────────
  const totalUnits      = deals.reduce((s, r) => s + Number(r.units      ?? 0), 0);
  const totalCommission = deals.reduce((s, r) => s + Number(r.commission ?? 0), 0);
  const monthlyDraw     = Number(plan.monthly_draw ?? 0);
  const takeHome        = totalCommission - monthlyDraw;
  const commTierPct     = Math.round(Number(plan.commission_rate ?? 0) * 100);

  // ── Deals list ─────────────────────────────────────────────────────────────
  const dealList: Deal[] = deals.map((r) => {
    const meta = DEAL_TYPE_META[r.deal_type];
    return {
      id:        r.id,
      customer:  r.customer_name ?? "—",
      type:      meta,
      units:     r.deal_type === "street_purchase" ? null : Number(r.units ?? 0),
      commission: Number(r.commission ?? 0),
    };
  });

  // ── Earnings breakdown — group by deal type ────────────────────────────────
  const earnings: DashboardData["earnings"] = [];
  const halfMinis  = deals.filter((d) => d.deal_type === "half_mini");
  const fullMinis  = deals.filter((d) => d.deal_type === "full_mini");
  const fullDeals  = deals.filter((d) => d.deal_type === "full_deal");
  const streets    = deals.filter((d) => d.deal_type === "street_purchase");

  if (halfMinis.length) {
    const each = Number(plan.half_mini_amount ?? 0);
    earnings.push({
      label:  `${halfMinis.length} half-mini deal${halfMinis.length === 1 ? "" : "s"} (${fmtUSD(each)} each)`,
      amount: halfMinis.reduce((s, r) => s + Number(r.commission ?? 0), 0),
    });
  }
  if (fullMinis.length) {
    const each = Number(plan.full_mini_amount ?? 0);
    earnings.push({
      label:  `${fullMinis.length} full-mini deal${fullMinis.length === 1 ? "" : "s"} (${fmtUSD(each)} each)`,
      amount: fullMinis.reduce((s, r) => s + Number(r.commission ?? 0), 0),
    });
  }
  for (const d of fullDeals) {
    const front = Number(d.front_gross ?? 0);
    earnings.push({
      label:  `${d.customer_name ?? "Customer"} — full deal (${fmtUSD(front)} @ ${commTierPct}%)`,
      amount: Number(d.commission ?? 0),
    });
  }
  if (streets.length) {
    const each = Number(plan.street_purchase_amount ?? 0);
    earnings.push({
      label:  `${streets.length} street purchase${streets.length === 1 ? "" : "s"} (${fmtUSD(each)} each)`,
      amount: streets.reduce((s, r) => s + Number(r.commission ?? 0), 0),
    });
  }

  earnings.push({ label: "Total gross commissions", amount: totalCommission, subtotal: true });
  if (monthlyDraw > 0) {
    earnings.push({ label: `Draw deducted (${fmtUSD(monthlyDraw)})`, amount: monthlyDraw, deduction: true });
  }
  const monthShort = now.toLocaleDateString("en-US", { month: "long", timeZone: "America/New_York" });
  earnings.push({ label: `${monthShort} take-home so far`, amount: takeHome, total: true });

  // ── Progress + milestones ──────────────────────────────────────────────────
  const bonuses = (plan.volume_bonuses ?? []).slice().sort((a, b) => Number(a.units) - Number(b.units));
  const nextBonus = bonuses.find((b) => Number(b.units) > totalUnits);

  const progressTarget = nextBonus ? Number(nextBonus.units) : (bonuses[bonuses.length - 1]?.units ?? 11);
  const progressDescription = nextBonus
    ? `${totalUnits} units toward ${nextBonus.units}-unit volume bonus (<span class="text-deal font-medium">${fmtUSD(Number(nextBonus.bonus))}</span>)`
    : `${totalUnits} units — all volume bonuses hit`;
  const progressCaption = nextBonus
    ? `<span class="text-warn font-medium">${(Number(nextBonus.units) - totalUnits).toLocaleString(undefined, { maximumFractionDigits: 1 })} more units</span> needed for next volume bonus`
    : "";

  const milestones: DashboardData["milestones"] = bonuses
    .filter((b) => Number(b.units) > totalUnits)
    .map((b) => ({
      leading: `${(Number(b.units) - totalUnits).toLocaleString(undefined, { maximumFractionDigits: 1 })} more units`,
      reward:  `${b.units}-unit volume bonus (+${fmtUSD(Number(b.bonus))})`,
    }));

  if (Number(plan.cxi_bonus ?? 0) > 0) {
    milestones.push({
      leading: `Keep CXI ≥ ${plan.cxi_threshold ?? 4.8}`,
      reward:  `+${fmtUSD(Number(plan.cxi_bonus))} bonus this month`,
    });
  }
  if (Number(plan.review_bonus ?? 0) > 0) {
    milestones.push({
      leading: "Get reviews",
      reward:  `${fmtUSD(Number(plan.review_bonus))} each on Google, Dealer Rater, BBB, Facebook`,
    });
  }

  // ── Subtitle ───────────────────────────────────────────────────────────────
  const fullName = [profile?.first_name, profile?.last_name].filter(Boolean).join(" ") || "Your sales";
  const company  = profile?.company || "Dealership";
  const subtitle = `${fullName} · ${company} · Month to date`;

  return {
    slug: "auto",
    vertical: "Auto",
    period: `${monthLabel(now)} · SALES DASHBOARD`,
    subtitle,
    metrics: [
      { label: "UNITS SOLD",   value: totalUnits.toLocaleString(undefined, { maximumFractionDigits: 1 }) },
      { label: "COMM. TIER",   value: `${commTierPct}%` },
      { label: "GROSS EARNED", value: fmtUSD(totalCommission), money: true },
      { label: "TAKE HOME",    value: fmtUSD(takeHome),        highlight: true },
    ],
    dealsTitle: "DEALS THIS MONTH",
    dealColumns: { customer: "CUSTOMER", type: "TYPE", middle: "UNITS", right: "COMM." },
    dealMiddleKey: "units",
    dealRightKey: "commission",
    deals: dealList,
    progress: {
      label: "PROGRESS TO NEXT BONUS",
      description: progressDescription,
      current: totalUnits,
      target: progressTarget,
      unit: "units",
      caption: progressCaption,
    },
    earningsTitle: "EARNINGS BREAKDOWN",
    earnings,
    takeHomeLabel: `${monthShort} take-home so far`,
    takeHomeAmount: fmtUSD(takeHome),
    milestones,
  };
}
