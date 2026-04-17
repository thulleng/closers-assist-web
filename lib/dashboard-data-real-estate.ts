import type { DashboardData } from "./dashboard-types";

export const realEstateDashboardSample: DashboardData = {
  slug: "real-estate",
  vertical: "Real Estate",
  period: "APRIL 2026 · SALES DASHBOARD",
  subtitle: "Sarah Martinez · Keller Williams · Month to date",
  metrics: [
    { label: "DEALS CLOSED", value: "3" },
    { label: "SPLIT", value: "70/30" },
    { label: "GCI EARNED", value: "$21,750", money: true },
    { label: "TAKE HOME", value: "$15,225", highlight: true },
  ],
  dealsTitle: "CLOSINGS THIS MONTH",
  dealColumns: {
    customer: "PROPERTY",
    type: "SIDE",
    middle: "PRICE",
    right: "GCI",
  },
  dealMiddleKey: "price",
  dealRightKey: "commission",
  formatMiddle: (d) => (d.meta?.price as string) || "—",
  deals: [
    {
      id: "oak",
      customer: "412 Oak Ridge Dr",
      type: { label: "Listing", variant: "success" },
      units: null,
      commission: 12125,
      meta: { price: "$485K" },
    },
    {
      id: "lake",
      customer: "89 Lakeshore Blvd",
      type: { label: "Buyer", variant: "info" },
      units: null,
      commission: 8125,
      meta: { price: "$325K" },
    },
    {
      id: "pine",
      customer: "1523 Pine Ct",
      type: { label: "Referral", variant: "warning" },
      units: null,
      commission: 1500,
      meta: { price: "$220K" },
    },
  ],
  progress: {
    label: "PROGRESS TO CAP",
    description:
      '$18,300 toward $25K annual cap (<span class="text-deal font-medium">then 100% to you</span>)',
    current: 18300,
    target: 25000,
    unit: "$",
    caption:
      '<span class="text-warn font-medium">$6,700 more</span> to cap — then no more brokerage split',
  },
  earningsTitle: "EARNINGS BREAKDOWN",
  earnings: [
    { label: "Oak Ridge (listing, 2.5%)", amount: 12125 },
    { label: "Lakeshore (buyer, 2.5%)", amount: 8125 },
    { label: "Pine Ct (referral, 25% split)", amount: 1500 },
    { label: "Total GCI", amount: 21750, subtotal: true },
    { label: "Brokerage split (30%)", amount: 6525, deduction: true },
    { label: "April take-home", amount: 15225, total: true },
  ],
  takeHomeLabel: "April take-home",
  takeHomeAmount: "$15,225",
  milestones: [
    {
      leading: "$6,700 more GCI",
      reward: "hit cap, keep 100% of remaining YTD",
    },
    {
      leading: "4 active listings",
      reward: "avg 45 days to close, $52K projected",
    },
    {
      leading: "7 buyers in nurture",
      reward: "3 pre-approved, 1 under contract",
    },
    {
      leading: "Post-cap bonus tier",
      reward: "$5K cash back if you hit $150K GCI by Dec",
    },
  ],
};
