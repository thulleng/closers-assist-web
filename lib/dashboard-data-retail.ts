import type { DashboardData } from "./dashboard-types";

export const retailDashboardSample: DashboardData = {
  slug: "retail",
  vertical: "Retail",
  period: "APRIL 2026 · SALES DASHBOARD",
  subtitle: "Jamie Rivera · Premier Furniture · Month to date",
  metrics: [
    { label: "TICKETS", value: "18" },
    { label: "ATTACH RATE", value: "67%", money: true },
    { label: "GROSS PROFIT", value: "$42,380", money: true },
    { label: "TAKE HOME", value: "$4,682", highlight: true },
  ],
  dealsTitle: "TICKETS THIS MONTH",
  dealColumns: {
    customer: "CUSTOMER",
    type: "CATEGORY",
    middle: "TICKET",
    right: "COMM.",
  },
  dealMiddleKey: "ticket",
  dealRightKey: "commission",
  formatMiddle: (d) => (d.meta?.ticket as string) || "—",
  deals: [
    {
      id: "har",
      customer: "Harrison, T.",
      type: { label: "Sectional", variant: "purple" },
      units: null,
      commission: 842,
      meta: { ticket: "$8,420" },
    },
    {
      id: "ngu",
      customer: "Nguyen, K.",
      type: { label: "Bedroom", variant: "info" },
      units: null,
      commission: 620,
      meta: { ticket: "$6,200" },
    },
    {
      id: "smi",
      customer: "Smith family",
      type: { label: "Sectional", variant: "purple" },
      units: null,
      commission: 480,
      meta: { ticket: "$4,800" },
    },
    {
      id: "pat",
      customer: "Patel, R.",
      type: { label: "Dining", variant: "warning" },
      units: null,
      commission: 340,
      meta: { ticket: "$3,400" },
    },
  ],
  moreDealsRow: {
    label: "+ 14 more tickets",
    middle: "$38.2K",
    right: "$2,400",
  },
  progress: {
    label: "PROGRESS TO SPIFF BONUS",
    description:
      '$61,020 of $75K written (<span class="text-deal font-medium">+$1,000 monthly SPIFF</span>)',
    current: 61020,
    target: 75000,
    unit: "$",
    caption:
      '<span class="text-warn font-medium">$13,980 more</span> (2-3 sectional tickets) to unlock SPIFF',
  },
  earningsTitle: "EARNINGS BREAKDOWN",
  earnings: [
    { label: "18 tickets × avg $3,390", amount: 61020 },
    { label: "Gross profit @ avg 69% (dept mix)", amount: 42380 },
    { label: "Commission @ 10% of GP", amount: 4238 },
    { label: "Protection plan attach bonus × 12", amount: 360 },
    { label: "Synchrony financing rebate", amount: 84 },
    { label: "Total commission", amount: 4682, subtotal: true },
    { label: "April take-home", amount: 4682, total: true },
  ],
  takeHomeLabel: "April take-home",
  takeHomeAmount: "$4,682",
  milestones: [
    {
      leading: "$13,980 more",
      reward: "$1,000 SPIFF bonus this month",
    },
    {
      leading: "Protection plan push",
      reward: "attach rate 67% → 80% = +$195 bonus",
    },
    {
      leading: "Top 3 finish",
      reward: "1st=$1,500, 2nd=$1,000, 3rd=$500 (you&rsquo;re #4)",
    },
    {
      leading: "0% promo ends",
      reward: "5 days left, push financing attach",
    },
  ],
};
