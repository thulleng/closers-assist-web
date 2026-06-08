import type { Metadata } from "next";
import { Radio } from "lucide-react";
import IndustryPage, { type IndustryData } from "@/components/IndustryPage";

export const metadata: Metadata = {
  title: "Telecom & Cell Towers Sales AI Agent | Deal Clozr",
  description:
    "The AI agent built for telecom reps. Handle tower lease objections, close infrastructure agreements, and upsell bandwidth and service upgrades with confidence.",
};

const data: IndustryData = {
  slug: "telecom",
  name: "Telecom & Cell Towers",
  icon: Radio,
  eyebrow: "For Telecom & Tower Closers",
  headline: (
    <>
      Close more contracts.
      <br />
      Maximize every tower.
      <br />
      <span className="text-deal">Own the infrastructure conversation.</span>
    </>
  ),
  sub: "Your AI agent built for telecom reps — handle lease objections, close infrastructure agreements, and upsell bandwidth and service upgrades with confidence.",
  heroImage: "/images/industries/telecom.jpg",
  scenarioImage: "/images/industries/telecom.jpg",
  featuresDay1: [
    "Lease objection handler — counter property owner hesitation on tower leases with market rate comparisons, revenue projections, and neighbor case studies.",
    "Enterprise deal coach — keep complex multi-site deals moving with stakeholder mapping, procurement navigation, and follow-up cadence.",
    "Bandwidth upsell playbook — identify upgrade opportunities from 4G to 5G, dedicated circuits, and redundancy packages based on customer usage data.",
    "Technical objection translator — turn complex technical specs into business value language that resonates with non-technical decision makers.",
    "Procurement navigation — scripts to push through legal, IT, and finance approvals without stalling.",
    "Lease renewal playbook — keep existing tower leases renewing at market rates with data-backed negotiation frameworks.",
    "SLA objection handling — articulate uptime guarantees, support response times, and service credits clearly.",
    "Competitive displacement scripts — win against incumbent carriers with total-cost and performance comparisons.",
  ],
  scenarioLabel: "When the lease stalls",
  scenarioHeadline: (
    <>
      What this looks like when{" "}
      <span className="text-deal">the property owner hesitates.</span>
    </>
  ),
  scenario: {
    setup:
      "Property owner has been sitting on your tower lease proposal for 3 weeks. Your site acquisition manager says they're 'thinking about it.' The competitor is circling. You need this site.",
    query: "Property owner stalling on tower lease. 3 weeks. Competitor circling.",
    agentAction:
      "The agent pulls comparable lease rates in the county, calculates the 30-year revenue projection for the owner, and gives you 3 scripts — urgency play, neighbor reference, and the 'what are we really waiting for' close.",
    outcome:
      "Owner signs the lease. Site goes live next quarter. Your company locks a critical coverage gap.",
  },
  integrations:
    "Works with Salesforce, ServiceNow, and your existing telecom stack. No integration fees.",
};

export default function TelecomPage() {
  return <IndustryPage data={data} />;
}
