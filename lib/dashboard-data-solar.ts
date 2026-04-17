import type { DashboardData } from "./dashboard-types";

export const solarDashboardSample: DashboardData = {
  slug: "solar",
  vertical: "Solar",
  period: "APRIL 2026 · SALES DASHBOARD",
  subtitle: "Jake Thompson · SunRise Energy · Month to date",
  metrics: [
    { label: "DEALS SIGNED", value: "6" },
    { label: "kW SOLD", value: "52.4" },
    { label: "REDLINE", value: "$14,820", money: true },
    { label: "TAKE HOME", value: "$10,374", highlight: true },
  ],
  dealsTitle: "DEALS THIS MONTH",
  dealColumns: {
    customer: "HOMEOWNER",
    type: "STATUS",
    middle: "kW",
    right: "COMM.",
  },
  dealMiddleKey: "kw",
  dealRightKey: "commission",
  formatMiddle: (d) => (d.meta?.kw as string) || "—",
  deals: [
    {
      id: "and",
      customer: "Anderson, B.",
      type: { label: "Installed", variant: "success" },
      units: null,
      commission: 2760,
      meta: { kw: "9.2" },
    },
    {
      id: "mar",
      customer: "Martinez family",
      type: { label: "Installed", variant: "success" },
      units: null,
      commission: 3420,
      meta: { kw: "11.4" },
    },
    {
      id: "pat",
      customer: "Patel, S.",
      type: { label: "Permit", variant: "info" },
      units: null,
      commission: 2400,
      meta: { kw: "8.0" },
    },
    {
      id: "wil",
      customer: "Williams, D.",
      type: { label: "Clawback", variant: "warning" },
      units: null,
      commission: 2040,
      meta: { kw: "6.8" },
    },
    {
      id: "che",
      customer: "Chen, L.",
      type: { label: "Permit", variant: "info" },
      units: null,
      commission: 3150,
      meta: { kw: "10.5" },
    },
    {
      id: "rod",
      customer: "Rodriguez, M.",
      type: { label: "Signed", variant: "neutral" },
      units: null,
      commission: 1950,
      meta: { kw: "6.5" },
    },
  ],
  alert: {
    label: "CLAWBACK RISK WINDOW",
    title: "Williams, D. — $2,040 at risk · 14 days until clear",
    body: "Homeowner requested cancellation review. Resolve before Apr 30.",
  },
  progress: {
    label: "PROGRESS TO MONTHLY BONUS",
    description:
      '52.4 kW toward 75 kW monthly target (<span class="text-deal font-medium">+$1,500 bonus</span>)',
    current: 52.4,
    target: 75,
    unit: "kW",
    caption:
      '<span class="text-warn font-medium">22.6 kW more</span> (roughly 2-3 deals) to unlock bonus',
  },
  earningsTitle: "EARNINGS BREAKDOWN",
  earnings: [
    { label: "6 deals signed × avg $2,470", amount: 14820 },
    { label: "Total redline", amount: 14820, subtotal: true },
    { label: "Clawback reserve (10% until install)", amount: 2406, deduction: true },
    { label: "Williams clawback flagged", amount: 2040, deduction: true },
    { label: "Paid this month", amount: 10374, total: true },
  ],
  takeHomeLabel: "Paid this month",
  takeHomeAmount: "$10,374",
  milestones: [
    {
      leading: "22.6 kW more",
      reward: "$1,500 monthly volume bonus",
    },
    {
      leading: "Save Williams deal",
      reward: "$2,040 back on the board",
    },
    {
      leading: "Push 2 permits to install",
      reward: "releases $1,662 from reserve",
    },
    {
      leading: "100 kW tier",
      reward: "+$2,500 quarterly accelerator (47.6 kW away)",
    },
  ],
};
