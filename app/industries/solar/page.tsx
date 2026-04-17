import type { Metadata } from "next";
import { Sun } from "lucide-react";
import IndustryPage, { type IndustryData } from "@/components/IndustryPage";

export const metadata: Metadata = {
  title: "For Solar Closers",
  description:
    "The AI agent for solar sales. Reads utility bills in seconds, builds proposals, handles objections, knows every federal and state incentive.",
};

const data: IndustryData = {
  slug: "solar",
  name: "Solar",
  icon: Sun,
  eyebrow: "For Solar Closers",
  headline: (
    <>
      Every utility bill, decoded.
      <br />
      <span className="text-deal">Every quote, optimized.</span>
    </>
  ),
  sub: "Reads utility bills in seconds. Builds proposals on the kitchen table. Handles 'is this really worth it' 100 times a day. Knows every federal, state, and utility incentive by heart.",
  heroImage:
    "https://images.unsplash.com/photo-1509391366360-2e959784a276?w=1920&q=80&auto=format&fit=crop",
  scenarioImage:
    "https://images.unsplash.com/photo-1545209463-e2825498edbf?w=800&q=80&auto=format&fit=crop",
  featuresDay1: [
    "Utility bill reader — upload the PDF, get kWh usage, rate tier, TOU breakdown, and true cost-per-kWh in 3 seconds.",
    "System sizer — factors in shading, roof orientation, panel efficiency, production ratio for your geography.",
    "Proposal generator — 25-year savings, financed vs cash vs PPA, ROI, and payback period.",
    "Federal ITC (30%) plus state/local incentive stacker — knows what's active in your state this week.",
    "Net metering math — 1:1, avoided cost, TOU export rates by utility.",
    "Commission structure modeled — redline, volume bonus, cancellation clawback risk.",
    "Objection playbook — 'too expensive,' 'I'll wait for battery prices to drop,' 'I'm moving,' 'I need to think about it.'",
    "Integrations with Enerflo, Solo, Aurora, OpenSolar, Sunrun tools, Sighten.",
  ],
  scenarioLabel: "At the kitchen table",
  scenarioHeadline: (
    <>
      What this looks like with a{" "}
      <span className="text-deal">$380 power bill.</span>
    </>
  ),
  scenario: {
    setup:
      "You're at the kitchen table. Homeowner pulls out a paper utility bill, $380 last month. They want to see numbers. Your laptop is slow.",
    query: "Utility bill $380/mo, 2,400 sqft single-family in Tampa, FL.",
    agentAction:
      "The agent reads the bill, sizes the system (9.8kW), pulls FPL net metering, stacks the 30% ITC, and prints a 25-year savings chart showing $112K lifetime savings with 6.4-year payback.",
    outcome:
      "You sign the contract that night. Cash deal, full redline, no clawback risk.",
  },
  integrations:
    "Works with Enerflo, Solo, Aurora, OpenSolar, Sighten. No integration fees.",
};

export default function SolarPage() {
  return <IndustryPage data={data} />;
}
