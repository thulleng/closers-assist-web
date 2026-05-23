import type { Metadata } from "next";
import { Users } from "lucide-react";
import IndustryPage, { type IndustryData } from "@/components/IndustryPage";

export const metadata: Metadata = {
  title: "Recruiting & Staffing Sales AI Agent | Deal Clozr",
  description:
    "The AI agent built for recruiting and staffing reps. Handle client fee objections, prep candidates for interviews, and close both sides of the placement faster.",
};

const data: IndustryData = {
  slug: "recruiting",
  name: "Recruiting & Staffing",
  icon: Users,
  eyebrow: "For Recruiting & Staffing Closers",
  headline: (
    <>
      Place more candidates.
      <br />
      Win more clients.
      <br />
      <span className="text-deal">Close both sides faster.</span>
    </>
  ),
  sub: "Your AI agent built for recruiters and staffing reps — handle client objections, prep candidates for interviews, and close both sides of the placement faster.",
  heroImage:
    "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=1920&q=80&auto=format&fit=crop",
  scenarioImage:
    "https://images.unsplash.com/photo-1521791136064-7986c2920216?w=800&q=80&auto=format&fit=crop",
  featuresDay1: [
    "Client fee objection handler — counter 'your fee is too high' with placement ROI, time-to-hire data, and quality-of-hire comparisons.",
    "Candidate prep coach — comprehensive interview prep scripts, salary negotiation coaching, and objection handling for candidates.",
    "Job order closer — scripts to secure exclusive job orders, set realistic timelines, and position yourself as the go-to search partner.",
    "Counter-offer playbook — when a candidate gets a counter-offer, your agent has the framework to keep the placement on track.",
    "Cold outreach scripts — phone and email sequences for business development that get hiring managers to respond.",
    "Pipeline pacing — follow-up cadences for clients and candidates that prevent deals from stalling.",
    "Offer presentation scripts — how to present compensation packages to maximize acceptance rate.",
    "Retainer defense — articulate the value of retained search vs. contingency when clients push back.",
  ],
  scenarioLabel: "When the counter-offer lands",
  scenarioHeadline: (
    <>
      What this looks like when{" "}
      <span className="text-deal">a candidate gets a counter-offer.</span>
    </>
  ),
  scenario: {
    setup:
      "Your placed candidate just got a $15K counter-offer from their current employer. They text you Friday at 4 PM — 'I think I'm staying.' The placement fee is on the line.",
    query: "Candidate got $15K counter-offer. Says they're staying. Placement at risk.",
    agentAction:
      "The agent gives you a counter-offer rebuttal framework — why counter-offers rarely work out, the long-term career math, and a re-engagement script to get the candidate back to the offer table.",
    outcome:
      "Candidate stays with your placement. Start date confirmed. Client sends you another job order.",
  },
  integrations:
    "Works with Bullhorn, Greenhouse, Lever, and your existing ATS. No integration fees.",
};

export default function RecruitingPage() {
  return <IndustryPage data={data} />;
}
