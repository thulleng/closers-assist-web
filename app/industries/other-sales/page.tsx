import type { Metadata } from "next";
import { Handshake } from "lucide-react";
import IndustryPage, { type IndustryData } from "@/components/IndustryPage";

export const metadata: Metadata = {
  title: "For Sales Closers — Universal Playbook",
  description:
    "The AI agent for every closer, every industry. Universal objection handling: price, timing, need to think about it, decision-maker stalls, and ghosting recovery. Rooted in closing fundamentals.",
};

const data: IndustryData = {
  slug: "other-sales",
  name: "Other Sales",
  icon: Handshake,
  eyebrow: "For All Closers",
  headline: (
    <>
      Every objection.
      <br />
      Every stall.
      <br />
      <span className="text-deal">Every close.</span>
    </>
  ),
  sub: "The universal sales playbook. Industry-agnostic closing fundamentals for anyone who sells — price objections, timing stalls, decision-maker runaround, and ghosting recovery.",
  heroImage: "/images/industries/other-sales.jpg",
  scenarioImage: "/images/industries/other-sales.jpg",
  featuresDay1: [
    "Price objection playbook — word-for-word scripts for 'too expensive' ranked by close rate.",
    "'I need to think about it' closer — 3 plays to get a decision today without burning the relationship.",
    "Decision-maker stall scripts — how to get to the real decision-maker without offending your contact.",
    "Ghosting recovery sequence — follow-up texts and emails that re-engage without being annoying.",
    "Timing objection handler — 'not right now' turned into a committed future close with a date.",
    "Urgency creation scripts — ethical ways to create momentum when the buyer is stalling.",
    "Competitor comparison closer — how to win on value when they're shopping around.",
    "Follow-up sequence generator — Day 1, 3, 7, 14, 30 cadence tuned to hot/warm/cold leads.",
  ],
  scenarioLabel: "When the deal goes cold",
  scenarioHeadline: (
    <>
      What this looks like when{" "}
      <span className="text-deal">the deal stalls.</span>
    </>
  ),
  scenario: {
    setup:
      "Prospect went quiet after a great demo. Two follow-ups. No reply. It's been 10 days. You're watching the deal go cold in real time.",
    query: "Prospect ghosted after demo. 10 days. Two unanswered follow-ups.",
    agentAction:
      "The agent gives you 3 re-engagement messages ranked by open rate — one text, one email, one LinkedIn — with timing guidance and a subject line that gets replies.",
    outcome: "Prospect responds. Deal moves forward. Pipeline stays alive.",
  },
  integrations:
    "Works for any sales role, any industry, any product. No integration required — useful from minute one.",
};

export default function OtherSalesPage() {
  return <IndustryPage data={data} />;
}
