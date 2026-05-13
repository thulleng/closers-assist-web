import type { DashboardData } from "./dashboard-types";

export const pest_controlDashboardSample: DashboardData = {
  slug: "pest-control",
  vertical: "Pest Control",
  period: "APRIL 2026 · SALES DASHBOARD",
  subtitle: "Sarah Kim · BugFree Pest Solutions · Month to date",
  metrics: [
    { label: "NEW ACCTS", value: "14" },
    { label: "RENEWALS", value: "22", money: true },
    { label: "MRR ADDED", value: "$1,240", money: true },
    { label: "TAKE HOME", value: "$3,815", highlight: true },
  ],
  dealsTitle: "ACCOUNTS THIS MONTH",
  dealColumns: {
    customer: "CUSTOMER",
    type: "TYPE",
    middle: "PLAN",
    right: "COMM.",
  },
  dealMiddleKey: "plan",
  dealRightKey: "commission",
  formatMiddle: (d) => (d.meta?.plan as string) || "—",
  deals: [
    { id: "tho", customer: "Thompson, G.", type: { label: "Quarterly", variant: "success" }, units: null, commission: 180, meta: { plan: "Premium plan" } },
    { id: "lee", customer: "Lee, H.", type: { label: "Monthly", variant: "info" }, units: null, commission: 220, meta: { plan: "Eco plan" } },
    { id: "mar", customer: "Martinez, C.", type: { label: "One-time", variant: "warning" }, units: null, commission: 95, meta: { plan: "Termite tx" } },
  ],
  moreDealsRow: {
    label: "+ 6 more deals",
    middle: "$24K",
    right: "$1,800",
  },
  progress: {
    label: "PROGRESS TO BONUS",
    description: `36 of 45 accounts (<span class="text-deal font-medium">+$800 bonus</span>)`,
    current: 36,
    target: 45,
    unit: "accts",
    caption: `<span class="text-warn font-medium">9 more accounts</span> to quarterly bonus tier`,
  },
  earningsTitle: "EARNINGS BREAKDOWN",
  earnings: [
    { label: "14 new accounts × avg $195/yr", amount: 2730 },
    { label: "22 renewals @ $35", amount: 770 },
    { label: "Termite treatment upsell × 3 @ $95", amount: 285 },
    { label: "Referral bonus × 2 @ $30", amount: 60 },
    { label: "Total commission", amount: 3815, subtotal: true },
    { label: "April take-home", amount: 3815, total: true },
  ],
  takeHomeLabel: "April take-home",
  takeHomeAmount: "$6,150",
  milestones: [
    { leading: "9 more accounts", reward: "$800 quarterly bonus" },
    { leading: "Renewal rate 88%", reward: "industry avg 75% — crushing it" },
    { leading: "Summer prep", reward: "mosquito season upsell campaign ready" },
  ],
};
