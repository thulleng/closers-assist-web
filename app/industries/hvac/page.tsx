import type { Metadata } from "next";
import { Wind } from "lucide-react";
import IndustryPage, { type IndustryData } from "@/components/IndustryPage";

export const metadata: Metadata = {
  title: "HVAC Sales AI Agent | Deal Clozr",
  description:
    "The AI agent built for HVAC reps. Handle system upgrade objections, sell maintenance agreements, and close emergency replacements with confidence.",
};

const data: IndustryData = {
  slug: "hvac",
  name: "HVAC",
  icon: Wind,
  eyebrow: "For HVAC Closers",
  headline: (
    <>
      Close more installs.
      <br />
      Sell more service agreements.
      <br />
      <span className="text-deal">Turn every call into revenue.</span>
    </>
  ),
  sub: "Your AI agent built for HVAC reps — handle system upgrade objections, sell maintenance agreements, and close emergency replacements with confidence.",
  heroImage: "/images/industries/hvac.jpg",
  scenarioImage: "/images/industries/hvac.jpg",
  featuresDay1: [
    "System upgrade objection handler — turn 'just fix it' into a full replacement conversation with ROI math, energy savings, and financing options.",
    "Maintenance agreement closer — scripts and rebuttals purpose-built to convert one-time repair customers into recurring agreement holders.",
    "Financing calculator scripts — show customers monthly payment breakdowns on equipment upgrades in real time.",
    "Emergency replacement playbook — when the system is down in July, your agent has the fastest path from diagnosis to signed install.",
    "SEER upsell scripts — explain efficiency ratings in dollars saved, not technical specs, to close higher-tier systems.",
    "Seasonal tune-up cadence — reach customers at the right time with the right maintenance offer before peak season.",
    "IAQ add-on playbook — introduce air purifiers, humidifiers, and UV systems as natural additions to any install.",
    "Review generation scripts — timing and language to turn happy installs into 5-star reviews that bring more calls.",
  ],
  scenarioLabel: "When they just want a fix",
  scenarioHeadline: (
    <>
      What this looks like when{" "}
      <span className="text-deal">a customer says 'just fix it.'</span>
    </>
  ),
  scenario: {
    setup:
      "15-year-old AC compressor is shot. Customer says 'Just replace the compressor — I'm not buying a whole new system.' It's 92 degrees. They're sweating. But you know that compressor is a $2,400 band-aid on a system that's end of life.",
    query: "Customer wants compressor-only fix. 15-year-old system. Won't consider replacement.",
    agentAction:
      "The agent gives you the repair-vs-replace ROI comparison — 10-year energy cost difference, warranty coverage gap, financing monthly breakdown, and the 'what happens next summer' closing script.",
    outcome:
      "Customer finances a full 18 SEER system with a maintenance agreement. Cool air. Happy customer. Full commission.",
  },
  integrations:
    "Works with ServiceTitan, Housecall Pro, and your existing HVAC CRM. No integration fees.",
};

export default function HvacPage() {
  return <IndustryPage data={data} />;
}
