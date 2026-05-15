import type { Metadata } from "next";
import { Shield } from "lucide-react";
import IndustryPage, { type IndustryData } from "@/components/IndustryPage";

export const metadata: Metadata = {
  title: "Home Security Sales AI Agent | Closers Assist",
  description:
    "The AI agent built for home security reps. Knows your competitive comparisons, monitoring contract rebuttals, and smart home upsell cadence. Close more systems and activate more monitoring accounts.",
};

const data: IndustryData = {
  slug: "home-security",
  name: "Home Security",
  icon: Shield,
  eyebrow: "For Home Security Closers",
  headline: (
    <>
      Close more systems.
      <br />
      Activate more monitoring accounts.
      <br />
      <span className="text-deal">Win every door.</span>
    </>
  ),
  sub: "Your AI agent built for home security reps — handle competitor objections, close monitoring contracts, and upsell smart home integrations with confidence.",
  heroImage:
    "https://images.unsplash.com/photo-1558002038-1055907df827?w=1920&q=80&auto=format&fit=crop",
  scenarioImage:
    "https://images.unsplash.com/photo-1558002038-1055907df827?w=800&q=80&auto=format&fit=crop",
  featuresDay1: [
    "Competitor comparison coach — instantly counter ADT, Ring, and SimpliSafe objections with feature-by-feature breakdowns.",
    "No-contract objection handler — scripts that reframe monitoring contracts as value guarantees, not traps.",
    "Smart home upsell playbook — know exactly when to introduce cameras, doorbell, thermostat, and lock integrations.",
    "Door-to-door opener scripts — high-converting door scripts tailored to neighborhoods, demographics, and recent incidents.",
    "Monitoring ROI calculator — show customers the true cost of going without monitored protection.",
    "Seasonal pitch cadence — holiday, vacation, and summer scripts timed to when families think about security.",
    "Referral request scripts — turn happy monitoring customers into a consistent referral pipeline.",
    "Same-day close language — scripts purpose-built for the in-home consultation close.",
  ],
  scenarioLabel: "At the door",
  scenarioHeadline: (
    <>
      What this looks like when{" "}
      <span className="text-deal">they say they have ADT.</span>
    </>
  ),
  scenario: {
    setup:
      "You're at the door. Homeowner says 'We already have ADT.' They're about to close the door on you. You have 15 seconds to keep the conversation alive.",
    query: "Homeowner says they already have ADT. Front door. 15 seconds.",
    agentAction:
      "The agent gives you 3 rebuttal scripts ranked by conversion rate — feature gap, cost comparison, and local incident angle — with the exact lines that get the door to stay open.",
    outcome:
      "Door stays open. Conversation moves to the kitchen table. You close a full system with monitoring.",
  },
  integrations:
    "Works with alarm.com, BuilderTrend, and your existing CRM. No integration fees.",
};

export default function HomeSecurityPage() {
  return <IndustryPage data={data} />;
}
