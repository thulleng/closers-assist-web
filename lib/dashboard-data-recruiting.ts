import type { DashboardData } from "./dashboard-types";

export const recruitingDashboardSample: DashboardData = {
  slug: "recruiting",
  vertical: "Recruiting",
  period: "APRIL 2026 · SALES DASHBOARD",
  subtitle: "Alex Morgan · Sales Pro Inc. · Month to date",
  metrics: [
    { label: "DEALS", value: "10" },
    { label: "PIPELINE", value: "$45K", money: true },
    { label: "COMMISSION", value: "$8,200", money: true },
    { label: "TAKE HOME", value: "$6,150", highlight: true },
  ],
  dealsTitle: "DEALS THIS MONTH",
  dealColumns: {
    customer: "CUSTOMER",
    type: "TYPE",
    middle: "VALUE",
    right: "COMM.",
  },
  dealMiddleKey: "value",
  dealRightKey: "commission",
  formatMiddle: (d) => (d.meta?.value as string) || "—",
  deals: [
    { id: "a", customer: "Adams, J.", type: { label: "Closed", variant: "success" }, units: null, commission: 1500, meta: { value: "$15K deal" } },
    { id: "b", customer: "Baker, S.", type: { label: "Closed", variant: "success" }, units: null, commission: 1200, meta: { value: "$12K deal" } },
    { id: "c", customer: "Cole, M.", type: { label: "Pending", variant: "warning" }, units: null, commission: 900, meta: { value: "$9K deal" } },
  ],
  moreDealsRow: {
    label: "+ 6 more deals",
    middle: "$24K",
    right: "$1,800",
  },
  progress: {
    label: "PROGRESS TO GOAL",
    description: `10 of 15 deals (<span class="text-deal font-medium">+$1,500 bonus</span>)`,
    current: 10,
    target: 15,
    unit: "deals",
    caption: `<span class="text-warn font-medium">5 more deals</span> to hit monthly bonus`,
  },
  earningsTitle: "EARNINGS BREAKDOWN",
  earnings: [
    { label: "10 deals @ avg $8,200", amount: 82000 },
    { label: "Commission @ 10%", amount: 8200 },
    { label: "Draw", amount: -2000, deduction: true },
    { label: "Total commission", amount: 6150, subtotal: true },
    { label: "April take-home", amount: 6150, total: true },
  ],
  takeHomeLabel: "April take-home",
  takeHomeAmount: "$6,150",
  milestones: [
    { leading: "5 more deals", reward: "$1,500 monthly bonus" },
    { leading: "Pipeline health", reward: "$45K active — close 3 this week" },
  ],
};
