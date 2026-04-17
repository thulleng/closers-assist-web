import type { DashboardData } from "./dashboard-types";

export const insuranceDashboardSample: DashboardData = {
  slug: "insurance",
  vertical: "Insurance",
  period: "APRIL 2026 · SALES DASHBOARD",
  subtitle: "Marcus Chen · State Farm · Month to date",
  metrics: [
    { label: "NB POLICIES", value: "12" },
    { label: "RETENTION", value: "94%", money: true },
    { label: "NB PREMIUM", value: "$48,200", money: true },
    { label: "TAKE HOME", value: "$7,890", highlight: true },
  ],
  dealsTitle: "POLICIES WRITTEN",
  dealColumns: {
    customer: "CLIENT",
    type: "LINE",
    middle: "PREMIUM",
    right: "COMM.",
  },
  dealMiddleKey: "premium",
  dealRightKey: "commission",
  formatMiddle: (d) => (d.meta?.premium as string) || "—",
  deals: [
    {
      id: "rod",
      customer: "Rodriguez family",
      type: { label: "Auto + Home", variant: "info" },
      units: null,
      commission: 630,
      meta: { premium: "$4,200" },
    },
    {
      id: "joh",
      customer: "Johnson, M.",
      type: { label: "Life", variant: "success" },
      units: null,
      commission: 1440,
      meta: { premium: "$2,400" },
    },
    {
      id: "pat",
      customer: "Patel Auto Svcs",
      type: { label: "Commercial", variant: "warning" },
      units: null,
      commission: 2775,
      meta: { premium: "$18,500" },
    },
    {
      id: "wil",
      customer: "Williams, T.",
      type: { label: "Auto", variant: "info" },
      units: null,
      commission: 270,
      meta: { premium: "$1,800" },
    },
  ],
  moreDealsRow: {
    label: "+ 8 more policies",
    middle: "$21,300",
    right: "$2,775",
  },
  progress: {
    label: "PROGRESS TO GROWTH BONUS",
    description:
      '$48,200 of $75K NB premium target (<span class="text-deal font-medium">+$2,500 bonus</span>)',
    current: 48200,
    target: 75000,
    unit: "$",
    caption:
      '<span class="text-warn font-medium">$26,800 more</span> in new business to unlock quarterly bonus',
  },
  earningsTitle: "EARNINGS BREAKDOWN",
  earnings: [
    { label: "New business commissions (12 policies)", amount: 7890 },
    { label: "Renewal overrides (48 policies × avg 2%)", amount: 2145 },
    { label: "Cross-sell bonus (Rodriguez bundle)", amount: 250 },
    { label: "Total commissions", amount: 10285, subtotal: true },
    { label: "Agency split (20%)", amount: 2057, deduction: true },
    { label: "Chargeback reserve (3%)", amount: 338, deduction: true },
    { label: "April take-home", amount: 7890, total: true },
  ],
  takeHomeLabel: "April take-home",
  takeHomeAmount: "$7,890",
  milestones: [
    {
      leading: "$26,800 more NB",
      reward: "$2,500 quarterly growth bonus",
    },
    {
      leading: "23 renewals this month",
      reward: "confirm retention touchpoints",
    },
    {
      leading: "14 auto-only clients",
      reward: "cross-sell home for $250 each",
    },
    {
      leading: "Book value",
      reward: "$312K annual premium (up 8% YTD)",
    },
  ],
};
