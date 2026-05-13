import type { DashboardData } from "./dashboard-types";

export const roofingDashboardSample: DashboardData = {
  slug: "roofing",
  vertical: "Roofing",
  period: "APRIL 2026 · SALES DASHBOARD",
  subtitle: "Chris Dalton · Gulf Coast Roofing · Month to date",
  metrics: [
    { label: "JOBS", value: "9" },
    { label: "INS. CLAIMS", value: "5", money: true },
    { label: "GROSS", value: "$112K", money: true },
    { label: "TAKE HOME", value: "$9,415", highlight: true },
  ],
  dealsTitle: "JOBS THIS MONTH",
  dealColumns: {
    customer: "CUSTOMER",
    type: "TYPE",
    middle: "MATERIAL",
    right: "COMM.",
  },
  dealMiddleKey: "material",
  dealRightKey: "commission",
  formatMiddle: (d) => (d.meta?.material as string) || "—",
  deals: [
    { id: "joh", customer: "Johnson, B.", type: { label: "Full Replace", variant: "success" }, units: null, commission: 2200, meta: { material: "Arch. shingle" } },
    { id: "wil", customer: "Williams, A.", type: { label: "Insurance", variant: "info" }, units: null, commission: 1500, meta: { material: "Metal roof" } },
    { id: "gar", customer: "Garcia, R.", type: { label: "Repair", variant: "warning" }, units: null, commission: 600, meta: { material: "Flat roof" } },
  ],
  moreDealsRow: {
    label: "+ 6 more deals",
    middle: "$24K",
    right: "$1,800",
  },
  progress: {
    label: "PROGRESS TO BONUS",
    description: `9 of 12 jobs (<span class="text-deal font-medium">+$1,500 bonus</span>)`,
    current: 9,
    target: 12,
    unit: "jobs",
    caption: `<span class="text-warn font-medium">3 more jobs</span> to hit monthly bonus`,
  },
  earningsTitle: "EARNINGS BREAKDOWN",
  earnings: [
    { label: "9 jobs @ avg $12,445", amount: 112000 },
    { label: "Commission @ 10% (replacements)", amount: 8200 },
    { label: "Insurance claim bonus × 5 @ $200", amount: 1000 },
    { label: "Material upsell × 3 @ $72", amount: 215 },
    { label: "Total commission", amount: 9415, subtotal: true },
    { label: "April take-home", amount: 9415, total: true },
  ],
  takeHomeLabel: "April take-home",
  takeHomeAmount: "$6,150",
  milestones: [
    { leading: "3 more jobs", reward: "$1,500 monthly bonus" },
    { leading: "Insurance push", reward: "5 claims = $1,000 bonus (hit!)" },
    { leading: "Storm season", reward: "June is peak — build pipeline now" },
  ],
};
