import type { DashboardData } from "./dashboard-types";

export const medicalDashboardSample: DashboardData = {
  slug: "medical",
  vertical: "Medical Devices",
  period: "APRIL 2026 · SALES DASHBOARD",
  subtitle: "Dr. Rep · MedLine Ortho · Territory: Tampa Bay",
  metrics: [
    { label: "CASES", value: "23" },
    { label: "QUOTA", value: "82%", money: true },
    { label: "REVENUE", value: "$164,800", money: true },
    { label: "TAKE HOME", value: "$14,832", highlight: true },
  ],
  dealsTitle: "TOP CASES THIS MONTH",
  dealColumns: {
    customer: "ACCOUNT",
    type: "PROCEDURE",
    middle: "REV.",
    right: "COMM.",
  },
  dealMiddleKey: "rev",
  dealRightKey: "commission",
  formatMiddle: (d) => (d.meta?.rev as string) || "—",
  deals: [
    {
      id: "tg1",
      customer: "Tampa General",
      type: { label: "Spine fusion", variant: "purple" },
      units: null,
      commission: 2520,
      meta: { rev: "$28K" },
    },
    {
      id: "sj",
      customer: "St. Joseph's",
      type: { label: "Total knee", variant: "info" },
      units: null,
      commission: 1620,
      meta: { rev: "$18K" },
    },
    {
      id: "tg2",
      customer: "Tampa General",
      type: { label: "Total hip", variant: "info" },
      units: null,
      commission: 1980,
      meta: { rev: "$22K" },
    },
    {
      id: "mp",
      customer: "Morton Plant",
      type: { label: "Trauma", variant: "success" },
      units: null,
      commission: 756,
      meta: { rev: "$8.4K" },
    },
  ],
  moreDealsRow: {
    label: "+ 19 more cases",
    middle: "$88.4K",
    right: "$7,956",
  },
  progress: {
    label: "PROGRESS TO Q2 QUOTA",
    description:
      '$164,800 of $200K quarterly quota (<span class="text-deal font-medium">accelerator at 100%</span>)',
    current: 164.8,
    target: 200,
    unit: "K",
    caption:
      '<span class="text-warn font-medium">$35.2K more</span> (roughly 3 total-joint cases) to unlock accelerator',
  },
  earningsTitle: "EARNINGS BREAKDOWN",
  earnings: [
    { label: "Spine (12% comm rate)", amount: 3360 },
    { label: "Total joints × 18 (9% rate)", amount: 10530 },
    { label: "Trauma × 4 (9% rate)", amount: 942 },
    { label: "Gross commission", amount: 14832, subtotal: true },
    { label: "April paid", amount: 14832, total: true },
  ],
  takeHomeLabel: "April paid",
  takeHomeAmount: "$14,832",
  milestones: [
    {
      leading: "$35.2K more",
      reward: "hit Q2 quota, unlock 1.5× accelerator",
    },
    {
      leading: "Dr. Patel adoption",
      reward: "trial loaner kit Thursday, 2 cases booked",
    },
    {
      leading: "New product launch",
      reward: "7mm locking plate, higher margin",
    },
    {
      leading: "President&rsquo;s Circle",
      reward: "$120K more YTD needed ($25K trip)",
    },
  ],
};
