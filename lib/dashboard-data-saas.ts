import type { DashboardData } from "./dashboard-types";

export const saasDashboardSample: DashboardData = {
  slug: "saas",
  vertical: "SaaS",
  period: "Q2 2026 · SALES DASHBOARD",
  subtitle: "Alex Park · Clearview SaaS · Quarter to date",
  metrics: [
    { label: "ARR CLOSED", value: "$486K" },
    { label: "QUOTA ATTN.", value: "108%", money: true },
    { label: "COMMISSION", value: "$52,680", money: true },
    { label: "TAKE HOME", value: "$52,680", highlight: true },
  ],
  dealsTitle: "CLOSED DEALS THIS QUARTER",
  dealColumns: {
    customer: "ACCOUNT",
    type: "SEGMENT",
    middle: "ARR",
    right: "COMM.",
  },
  dealMiddleKey: "arr",
  dealRightKey: "commission",
  formatMiddle: (d) => (d.meta?.arr as string) || "—",
  deals: [
    {
      id: "nw",
      customer: "Northwind Co.",
      type: { label: "Enterprise", variant: "purple" },
      units: null,
      commission: 36000,
      meta: { arr: "$240K" },
    },
    {
      id: "rid",
      customer: "Ridgeline Labs",
      type: { label: "Mid-market", variant: "info" },
      units: null,
      commission: 9600,
      meta: { arr: "$96K" },
    },
    {
      id: "orb",
      customer: "Orbit Health",
      type: { label: "Mid-market", variant: "info" },
      units: null,
      commission: 8400,
      meta: { arr: "$84K" },
    },
    {
      id: "pan",
      customer: "Pangea Logistics",
      type: { label: "SMB", variant: "neutral" },
      units: null,
      commission: 4200,
      meta: { arr: "$42K" },
    },
    {
      id: "koi",
      customer: "Koi Studios",
      type: { label: "SMB", variant: "neutral" },
      units: null,
      commission: 2400,
      meta: { arr: "$24K" },
    },
  ],
  progress: {
    label: "PROGRESS TO 2× ACCELERATOR",
    description:
      '$486K of $450K quota hit — next tier at 120% = <span class="text-deal font-medium">2× comm.</span>',
    current: 486,
    target: 540,
    unit: "K ARR",
    caption:
      '<span class="text-warn font-medium">$54K more ARR</span> → every $ after doubles (1 mid-market deal away)',
    marker: { value: 450, label: "100% @ $450K" },
  },
  earningsTitle: "EARNINGS BREAKDOWN",
  earnings: [
    { label: "Enterprise deal (15% rate)", amount: 36000 },
    { label: "Mid-market deals × 2 (10% rate)", amount: 18000 },
    { label: "SMB deals × 2 (10% rate)", amount: 6600 },
    { label: "Over-quota SPIFF (Ridgeline multi-year)", amount: 2000 },
    { label: "Gross commission", amount: 62600, subtotal: true },
    { label: "Held until deals invoice (Pangea, Koi)", amount: 9920, deduction: true },
    { label: "Paid this quarter", amount: 52680, total: true },
  ],
  takeHomeLabel: "Paid this quarter",
  takeHomeAmount: "$52,680",
  milestones: [
    {
      leading: "$54K more ARR",
      reward: "2× accelerator tier (1 mid-market deal)",
    },
    {
      leading: "Push Hanseatic to close",
      reward: "$180K ARR in pipeline, 85% MEDDIC",
    },
    {
      leading: "Orbit renewal",
      reward: "$84K expansion signal for Q3",
    },
    {
      leading: "President&rsquo;s Club",
      reward: "need $164K more ARR this half ($50K bonus)",
    },
  ],
};
