import type { Metadata } from "next";
import { ShoppingBag } from "lucide-react";
import IndustryPage, { type IndustryData } from "@/components/IndustryPage";

export const metadata: Metadata = {
  title: "For Big Ticket Retail Closers",
  description:
    "The AI agent for furniture, appliances, jewelry, marine, RV, and powersports closers who get paid on the gross. Every spec, every finance scenario, every close.",
};

const data: IndustryData = {
  slug: "retail",
  name: "Retail",
  icon: ShoppingBag,
  eyebrow: "For Big Ticket Retail Closers",
  headline: (
    <>
      Every spec.
      <br />
      Every finance scenario.
      <br />
      <span className="text-deal">Every close.</span>
    </>
  ),
  sub: "Built for furniture, appliances, jewelry, marine, RV, and powersports closers who get paid on the gross. Knows your product catalog, your financing menu, and the exact math on every deal.",
  heroImage:
    "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=1920&q=80&auto=format&fit=crop",
  scenarioImage:
    "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&q=80&auto=format&fit=crop",
  featuresDay1: [
    "Full product catalog — specs, features, warranty tiers, delivery lead times, return policy.",
    "Financing menu math — 0%, 12/24/36mo, Synchrony, Wells Fargo, Affirm, promo terms, fallback tiers.",
    "Gross profit calculator on every deal — cost, MSRP, trade-in, financing rebate, GP after all-in.",
    "Add-on attachment math — protection plans, delivery, install, stain guard, disposal fees.",
    "Trade-in valuator (marine, RV, powersports) — NADA + market comps + your dealer's desk range.",
    "Objection playbook by category — 'the one at Costco is cheaper,' 'I need to measure,' 'let me check with my spouse.'",
    "SPIFF and contest tracking — current month bonus structure, who's in 1st/2nd/3rd, what you need to pass.",
    "Integrations with Lightspeed, Epicor, STORIS, DX1, IDS, and most big-ticket POS platforms.",
  ],
  scenarioLabel: "On the floor",
  scenarioHeadline: (
    <>
      What this looks like with a{" "}
      <span className="text-deal">$8K sectional customer.</span>
    </>
  ),
  scenario: {
    setup:
      "Customer loves the sectional. Asks about financing. Your financing menu is 3 tiers deep with 7 promo options. The GSM is in a meeting. It's Sunday.",
    query: "Customer wants 0% on $8K sectional, 650 FICO, trade-in loveseat worth $300.",
    agentAction:
      "The agent runs all 7 promo terms, flags the Synchrony 36mo at 0% is live this week, calculates the gross with trade, stacks the protection plan, and gives you a 3-option presentation ranked by close rate and GP.",
    outcome:
      "You present Option 2. Customer signs. $8,400 gross, plan attached, delivery Thursday.",
  },
  integrations:
    "Works with Lightspeed, Epicor, STORIS, DX1, IDS. No integration fees.",
};

export default function RetailPage() {
  return <IndustryPage data={data} />;
}
