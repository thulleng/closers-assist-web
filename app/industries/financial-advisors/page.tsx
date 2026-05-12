import type { Metadata } from "next";
import { TrendingUp } from "lucide-react";
import IndustryPage, { type IndustryData } from "@/components/IndustryPage";

export const metadata: Metadata = {
  title: "Financial Advisors Sales AI Agent | Closers Assist",
  description:
    "The AI agent built for financial advisors. Handle fee objections, articulate your value against robo-advisors, and convert prospects into long-term managed accounts.",
};

const data: IndustryData = {
  slug: "financial-advisors",
  name: "Financial Advisors",
  icon: TrendingUp,
  eyebrow: "For Financial Advisor Closers",
  headline: (
    <>
      Close more AUM.
      <br />
      Deepen every relationship.
      <br />
      <span className="text-deal">Win on advice, not price.</span>
    </>
  ),
  sub: "Your AI agent built for financial advisors — handle fee objections, articulate your value clearly, and convert prospects into long-term managed accounts.",
  heroImage:
    "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=1920&q=80&auto=format&fit=crop",
  scenarioImage:
    "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&q=80&auto=format&fit=crop",
  featuresDay1: [
    "Fee objection handler — turn '1% is too much' into a value conversation with ROI math on advice, tax optimization, and behavioral coaching.",
    "Robo-advisor rebuttal — data-backed responses that highlight what algorithms miss: life planning, tax strategy, estate coordination, and real relationships.",
    "Discovery call coach — the right questions to uncover a prospect's real financial fears, goals, and decision timeline in the first meeting.",
    "AUM consolidation playbook — scripts to bring over outside accounts: 401(k) rollovers, held-away assets, and inherited portfolios.",
    "Fiduciary conversation — articulate your fiduciary obligation clearly and why it matters for their financial future.",
    "Retirement income scripts — make complex drawdown strategies feel simple and confidence-building.",
    "Referral request framework — turn satisfied clients into a consistent flow of qualified introductions.",
    "Annual review cadence — structured touchpoints that deepen relationships and uncover new AUM opportunities.",
  ],
  scenarioLabel: "When they compare fees",
  scenarioHeadline: (
    <>
      What this looks like when{" "}
      <span className="text-deal">a prospect questions your fee.</span>
    </>
  ),
  scenario: {
    setup:
      "Prospect just got a proposal from a robo-advisor charging 0.25%. They forward it to you with one line: 'Why should I pay you 1%?' You have one email to keep this conversation alive.",
    query: "Prospect comparing 1% AUM fee to 0.25% robo-advisor. Needs justification.",
    agentAction:
      "The agent builds a personalized value comparison — tax-loss harvesting examples, estate coordination, behavioral coaching during volatility, and the real cost of algorithmic advice during a downturn. Gives you a response email ready to send.",
    outcome:
      "Prospect responds. They set a second meeting. You close $850K in new AUM.",
  },
  integrations:
    "Works with Redtail, Wealthbox, Salesforce, and your existing CRM. No integration fees.",
};

export default function FinancialAdvisorsPage() {
  return <IndustryPage data={data} />;
}
