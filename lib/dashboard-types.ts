// Shared dashboard types — used across all 15 vertical dashboards.
// Each vertical extends or specializes these as needed.

export type DealType = {
  /** Unique badge label e.g. "Half mini", "Full deal", "Street" */
  label: string;
  /** Semantic color variant */
  variant: "success" | "info" | "warning" | "neutral" | "purple";
};

export type Deal = {
  id: string;
  customer: string;
  type: DealType;
  units: number | null; // null for street purchases (don't count as units)
  commission: number;
  /** Optional metadata per vertical */
  meta?: Record<string, string | number>;
};

export type Milestone = {
  /** Short text before the action e.g. "6.5 more units" */
  leading: string;
  /** Result/reward of hitting milestone */
  reward: string;
};

export type ProgressBar = {
  /** Section title e.g. "PROGRESS TO NEXT BONUS" */
  label: string;
  /** One-line description with current target and reward */
  description: string;
  /** Current value */
  current: number;
  /** Target value */
  target: number;
  /** Unit label for the progress labels (e.g. "units", "kW", "$") */
  unit: string;
  /** Optional sub-caption, e.g. "6.5 more units needed for first volume bonus" */
  caption?: string;
  /** Optional mid-bar marker (e.g. SaaS quota line) — value on the 0..target scale */
  marker?: { value: number; label: string };
};

export type EarningsLine = {
  label: string;
  amount: number;
  /** Negative amounts render in the alert color */
  deduction?: boolean;
  /** Bolded subtotal lines with borders */
  subtotal?: boolean;
  /** Large, final total line */
  total?: boolean;
};

export type SummaryMetric = {
  label: string;
  value: string;
  /** Highlighted (green number + green border) — usually the take-home */
  highlight?: boolean;
  /** Color the value in green without a border treatment (for gross/positive money) */
  money?: boolean;
};

export type DashboardData = {
  /** Vertical slug, e.g. "auto" — drives routing */
  slug: string;
  /** Display name, e.g. "Auto" */
  vertical: string;
  /** Top label, e.g. "APRIL 2026 · SALES DASHBOARD" */
  period: string;
  /** Second line, e.g. "Thul Leng · Sun Toyota · Month to date" */
  subtitle: string;
  /** 4 summary metrics at the top */
  metrics: SummaryMetric[];
  /** Deal-list section title, e.g. "DEALS THIS MONTH" */
  dealsTitle: string;
  /** Column headers for the deals table (4 cols: Customer / Type / Middle / Right) */
  dealColumns: { customer: string; type: string; middle: string; right: string };
  /** Key to render in middle column: "units" or meta key */
  dealMiddleKey: string;
  /** Key to render in right column: "commission" or meta key */
  dealRightKey: string;
  /** How to format the middle col value */
  formatMiddle?: (d: Deal) => string;
  /** How to format the right col value */
  formatRight?: (d: Deal) => string;
  deals: Deal[];
  /** Optional "+ 19 more" summary row */
  moreDealsRow?: { label: string; middle: string; right: string };
  /** Optional alert/warning card (e.g. solar clawback) */
  alert?: { label: string; title: string; body: string };
  progress: ProgressBar;
  earningsTitle: string;
  earnings: EarningsLine[];
  /** Footer take-home line e.g. "April take-home so far" */
  takeHomeLabel: string;
  takeHomeAmount: string;
  milestones: Milestone[];
};

/** Map DealType.variant to Tailwind classes for badges. */
export const variantStyles: Record<DealType["variant"], string> = {
  success: "bg-deal/15 text-deal",
  info: "bg-blue-500/15 text-blue-400",
  warning: "bg-warn/15 text-warn",
  neutral: "bg-ash/10 text-ash",
  purple: "bg-purple-500/15 text-purple-400",
};
