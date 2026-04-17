import type { Metadata } from "next";
import { Shield } from "lucide-react";
import IndustryPage, { type IndustryData } from "@/components/IndustryPage";

export const metadata: Metadata = {
  title: "For Insurance Agents",
  description:
    "The AI agent for insurance closers. Book of business tracking, renewal triggers, cross-sell math, policy Q&A. Built for P&C, Life, and Commercial agents.",
};

const data: IndustryData = {
  slug: "insurance",
  name: "Insurance",
  icon: Shield,
  eyebrow: "For Insurance Closers",
  headline: (
    <>
      Your book of business,
      <br />
      <span className="text-deal">amplified.</span>
    </>
  ),
  sub: "Renewal tracking, cross-sell triggers, policy Q&A, quote comparisons. Built for P&C, Life, and Commercial agents who live or die on retention and cross-sell.",
  heroImage:
    "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80&auto=format&fit=crop",
  scenarioImage:
    "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&q=80&auto=format&fit=crop",
  featuresDay1: [
    "Your book of business, mapped — retention rate, premium by line, cross-sell gaps surfaced live.",
    "Renewal alerts 60 / 30 / 14 days out with retention scripts ranked by your save rate.",
    "Cross-sell trigger engine — every auto-only client with a home, every homeowner without an umbrella.",
    "Policy Q&A in plain English — deductibles, endorsements, exclusions, coinsurance, declarations pages.",
    "Quote comparison side-by-side — same coverage across 3+ carriers with commission implications.",
    "Commission tracking — new business vs renewal, override splits, contingency bonus math.",
    "Life sales math — permanent vs term illustrations, cash value projections, 7-pay tests, modified endowments.",
    "Integrations with Applied, EZLynx, HawkSoft, AgencyBloc, Salesforce FSC, and most AMS platforms.",
  ],
  scenarioLabel: "At renewal time",
  scenarioHeadline: (
    <>
      What this looks like on a{" "}
      <span className="text-deal">shopping call.</span>
    </>
  ),
  scenario: {
    setup:
      "Long-time client calls. Their auto renewal went up 18%. They're shopping. You have 40 seconds before they threaten to leave.",
    query: "Client shopping auto — 18% increase at renewal.",
    agentAction:
      "The agent pulls their full book, flags they've never bundled their home policy, runs the bundled quote, and gives you 3 retention plays ranked by save probability.",
    outcome:
      "You save the auto, add the home, and cross-sell the umbrella. Retention intact, premium up 24%.",
  },
  integrations:
    "Works with Applied, EZLynx, HawkSoft, AgencyBloc, Salesforce FSC. No integration fees.",
};

export default function InsurancePage() {
  return <IndustryPage data={data} />;
}
