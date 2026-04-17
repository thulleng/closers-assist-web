import type { DashboardData } from "./dashboard-types";

export const autoDashboardSample: DashboardData = {
  slug: "auto",
  vertical: "Auto",
  period: "APRIL 2026 · SALES DASHBOARD",
  subtitle: "Thul Leng · Sun Toyota · Month to date",
  metrics: [
    { label: "UNITS SOLD", value: "4.5" },
    { label: "COMM. TIER", value: "25%" },
    { label: "GROSS EARNED", value: "$4,900", money: true },
    { label: "TAKE HOME", value: "$2,300", highlight: true },
  ],
  dealsTitle: "DEALS THIS MONTH",
  dealColumns: {
    customer: "CUSTOMER",
    type: "TYPE",
    middle: "UNITS",
    right: "COMM.",
  },
  dealMiddleKey: "units",
  dealRightKey: "commission",
  deals: [
    {
      id: "km",
      customer: "Kevin Michael",
      type: { label: "Half mini", variant: "warning" },
      units: 0.5,
      commission: 200,
    },
    {
      id: "pg",
      customer: "Patrick Gallichio",
      type: { label: "Half mini", variant: "warning" },
      units: 0.5,
      commission: 200,
    },
    {
      id: "if",
      customer: "Idaliz Falcon",
      type: { label: "Half mini", variant: "warning" },
      units: 0.5,
      commission: 200,
    },
    {
      id: "vt",
      customer: "Vu Thai",
      type: { label: "Half mini", variant: "warning" },
      units: 0.5,
      commission: 200,
    },
    {
      id: "zc",
      customer: "Zaeli Cortes",
      type: { label: "Half mini", variant: "warning" },
      units: 0.5,
      commission: 200,
    },
    {
      id: "ff",
      customer: "Fernando Ferreira",
      type: { label: "Half mini", variant: "warning" },
      units: 0.5,
      commission: 200,
    },
    {
      id: "js",
      customer: "John Shoffner",
      type: { label: "Half mini", variant: "warning" },
      units: 0.5,
      commission: 200,
    },
    {
      id: "jb",
      customer: "Jinda Brown",
      type: { label: "Full deal", variant: "success" },
      units: 1,
      commission: 2500,
    },
    {
      id: "sp1",
      customer: "Street Purchase #1",
      type: { label: "Street", variant: "neutral" },
      units: null,
      commission: 500,
    },
    {
      id: "sp2",
      customer: "Street Purchase #2",
      type: { label: "Street", variant: "neutral" },
      units: null,
      commission: 500,
    },
  ],
  progress: {
    label: "PROGRESS TO NEXT BONUS",
    description:
      '4.5 units toward 11-unit volume bonus (<span class="text-deal font-medium">$500</span>)',
    current: 4.5,
    target: 11,
    unit: "units",
    caption:
      '<span class="text-warn font-medium">6.5 more units</span> needed for first volume bonus',
  },
  earningsTitle: "EARNINGS BREAKDOWN",
  earnings: [
    { label: "7 half-mini deals ($200 each)", amount: 1400 },
    { label: "Jinda Brown — full deal ($10K @ 25%)", amount: 2500 },
    { label: "2 street purchases ($500 each)", amount: 1000 },
    { label: "Total gross commissions", amount: 4900, subtotal: true },
    { label: "Draw deducted ($1,300 × 2)", amount: 2600, deduction: true },
    { label: "April take-home so far", amount: 2300, total: true },
  ],
  takeHomeLabel: "April take-home so far",
  takeHomeAmount: "$2,300",
  milestones: [
    {
      leading: "6.5 more units",
      reward: "11-unit volume bonus (+$500)",
    },
    {
      leading: "8.5 more units",
      reward: "13-unit volume bonus (+$750)",
    },
    {
      leading: "10.5 more units",
      reward: "15-unit bonus (+$1,000) + 30% retro tier",
    },
    {
      leading: "Keep CXI ≥ 4.8",
      reward: "+$250 bonus this month",
    },
    {
      leading: "Get reviews",
      reward: "$20 each on Google, Dealer Rater, BBB, Facebook",
    },
  ],
};
