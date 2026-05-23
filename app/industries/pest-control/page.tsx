import type { Metadata } from "next";
import { Bug } from "lucide-react";
import IndustryPage, { type IndustryData } from "@/components/IndustryPage";

export const metadata: Metadata = {
  title: "Pest Control Sales AI Agent | Deal Clozr",
  description:
    "The AI agent built for pest control reps. Handle service plan objections, upsell quarterly treatments, and never lose a renewal again.",
};

const data: IndustryData = {
  slug: "pest-control",
  name: "Pest Control",
  icon: Bug,
  eyebrow: "For Pest Control Closers",
  headline: (
    <>
      Close more treatments.
      <br />
      Retain more accounts.
      <br />
      <span className="text-deal">Never lose a renewal.</span>
    </>
  ),
  sub: "Your AI agent built for pest control reps — handle objections on bundled plans, upsell quarterly treatments, and never lose a renewal again.",
  heroImage: "/images/pest_control.jpg",
  scenarioImage:
    "/images/pest_control.jpg",
  featuresDay1: [
    "Service plan objection handler — instantly counter 'I'll just call if I see bugs' with data-backed responses on prevention value and cost savings.",
    "Seasonal upsell coach — know exactly when to pitch mosquito, rodent, or termite add-ons based on season and customer history.",
    "Renewal retention scripts — never lose an annual contract renewal with talking points ready before every renewal call.",
    "Bundle math calculator scripts — show customers live savings when bundling quarterly, termite, and mosquito plans on the spot.",
    "Competitor rebuttal scripts — counter DIY solutions and national chain pricing with professional service value comparisons.",
    "Door-to-door pitch scripts — seasonal canvassing scripts with neighborhood-specific talking points.",
    "Termite inspection closer — convert a free inspection into a full treatment plan with confidence-building language.",
    "Google review request cadence — turn happy recurring customers into a steady flow of social proof.",
  ],
  scenarioLabel: "When they resist the plan",
  scenarioHeadline: (
    <>
      What this looks like when{" "}
      <span className="text-deal">a customer only wants a one-time spray.</span>
    </>
  ),
  scenario: {
    setup:
      "Customer found ants in the kitchen. Wants a one-time treatment. Says 'I don't need a plan — I'll call you if they come back.' You know ants will be back in 6 weeks without a barrier.",
    query: "Customer wants one-time ant treatment. Won't sign up for quarterly plan.",
    agentAction:
      "The agent gives you the prevention ROI script — cost-per-treatment comparison, seasonal pest calendar for your region, and the 'what if they come back during your dinner party' close that gets plan signatures.",
    outcome:
      "Customer signs quarterly plan. Adds mosquito treatment for summer. Renews next year without a call.",
  },
  integrations:
    "Works with PestPac, Briostack, and your existing pest control software. No integration fees.",
};

export default function PestControlPage() {
  return <IndustryPage data={data} />;
}
