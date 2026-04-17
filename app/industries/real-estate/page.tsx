import type { Metadata } from "next";
import { Home as HomeIcon } from "lucide-react";
import IndustryPage, { type IndustryData } from "@/components/IndustryPage";

export const metadata: Metadata = {
  title: "For Real Estate Agents",
  description:
    "The AI agent built for real estate closers. Knows your commission splits, listing prep, open house cadence, and buyer nurture. Works with Follow Up Boss, kvCORE, Chime, BoomTown.",
};

const data: IndustryData = {
  slug: "real-estate",
  name: "Real Estate",
  icon: HomeIcon,
  eyebrow: "For Real Estate Closers",
  headline: (
    <>
      Close more listings.
      <br />
      Nurture every buyer.
      <br />
      <span className="text-deal">Never miss a follow-up.</span>
    </>
  ),
  sub: "Built for agents who actually close — not for the brokerage's VP of Marketing. Knows your commission splits, your MLS workflow, your open-house cadence, and the exact moment a buyer goes cold.",
  heroImage:
    "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&q=80&auto=format&fit=crop",
  scenarioImage:
    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80&auto=format&fit=crop",
  featuresDay1: [
    "Your brokerage's commission split modeled exactly — cap, post-cap, team splits, referral fees.",
    "Listing prep generator — comparative market analysis, pricing strategy, listing presentation scripts.",
    "Buyer nurture cadence — Day 1, 3, 7, 14, 30 follow-ups tuned to buyer temperature.",
    "Open house playbook — sign-in language, follow-up within 4 hours, objection flips.",
    "Offer-writing language — escalation clauses, contingency waivers, seller love letters that actually work.",
    "Commission math on every deal — your net after cap, split, team, and E&O.",
    "Listing agreement Q&A — exclusive right to sell, dual agency, compensation disclosure.",
    "CRM-ready integrations with Follow Up Boss, kvCORE, Chime, BoomTown, Wise Agent, LionDesk.",
  ],
  scenarioLabel: "At the kitchen table",
  scenarioHeadline: (
    <>
      What this looks like at a{" "}
      <span className="text-deal">listing appointment.</span>
    </>
  ),
  scenario: {
    setup:
      "You're sitting with a seller. They're looking at a Zillow Zestimate $40K higher than your recommended list price. They're not happy. Your broker is on another appointment.",
    query: "Seller fixated on Zestimate $40K over my CMA.",
    agentAction:
      "The agent pulls the last 12 Zestimate-vs-sale-price variances in their zip, the 3 comparable closings you used, and gives you 3 scripts ranked by proven list-to-close rate (refines to your style as you use it).",
    outcome: "You sign the listing at your price. 30 days to close.",
  },
  integrations:
    "Works with Follow Up Boss, kvCORE, Chime, BoomTown, Wise Agent, LionDesk. No integration fees.",
};

export default function RealEstatePage() {
  return <IndustryPage data={data} />;
}
