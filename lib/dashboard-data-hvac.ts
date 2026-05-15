import type { DashboardData } from "./dashboard-types";

export const hvacDashboardSample: DashboardData = {
  slug: "hvac",
  vertical: "HVAC",
  period: "APRIL 2026 · SALES DASHBOARD",
  subtitle: "Mike Torres · CoolAir Services · Month to date",
  metrics: [
    { label: "INSTALLS", value: "7" },
    { label: "SERVICE PLANS", value: "12", money: true },
    { label: "GROSS REV", value: "$84,200", money: true },
    { label: "TAKE HOME", value: "$5,840", highlight: true },
  ],
  dealsTitle: "INSTALLS THIS MONTH",
  dealColumns: {
    customer: "CUSTOMER",
    type: "TYPE",
    middle: "SYSTEM",
    right: "COMM.",
  },
  dealMiddleKey: "system",
  dealRightKey: "commission",
  formatMiddle: (d) => (d.meta?.system as string) || "—",
  deals: [
    { id: "and", customer: "Anderson, L.", type: { label: "Full System", variant: "success" }, units: null, commission: 1800, meta: { system: "5-ton Carrier" } },
    { id: "bro", customer: "Brooks, M.", type: { label: "Heat Pump", variant: "info" }, units: null, commission: 1250, meta: { system: "3-ton Trane" } },
    { id: "che", customer: "Chen, D.", type: { label: "Mini Split", variant: "purple" }, units: null, commission: 900, meta: { system: "Daikin 4-zone" } },
    { id: "dav", customer: "Davis, P.", type: { label: "Service Agmt", variant: "warning" }, units: null, commission: 350, meta: { system: "Annual plan" } },
  ],
  moreDealsRow: {
    label: "+ 6 more deals",
    middle: "$24K",
    right: "$1,800",
  },
  progress: {
    label: "PROGRESS TO VOLUME BONUS",
    description: `$84K of $100K revenue (<span class="text-deal font-medium">+$2,000 bonus</span>)`,
    current: 84200,
    target: 100000,
    unit: "$",
    caption: `<span class="text-warn font-medium">$15,800 more</span> (2-3 full installs) to unlock bonus`,
  },
  earningsTitle: "EARNINGS BREAKDOWN",
  earnings: [
    { label: "7 installs @ avg $12,030", amount: 84200 },
    { label: "Commission @ 8% (full systems)", amount: 5200 },
    { label: "Service agreements × 12 @ $30", amount: 360 },
    { label: "Duct cleaning upsell × 4 @ $70", amount: 280 },
    { label: "Total commission", amount: 5840, subtotal: true },
    { label: "April take-home", amount: 5840, total: true },
  ],
  takeHomeLabel: "April take-home",
  takeHomeAmount: "$6,150",
  milestones: [
    { leading: "$15,800 more", reward: "$2,000 volume bonus" },
    { leading: "Service agreement push", reward: "every 5 = +$150 SPIFF" },
    { leading: "Summer pre-season", reward: "2 weeks until peak AC demand" },
  ],
};
