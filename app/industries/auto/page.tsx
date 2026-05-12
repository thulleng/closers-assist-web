import type { Metadata } from "next";
import { Car } from "lucide-react";
import IndustryPage, { type IndustryData } from "@/components/IndustryPage";

export const metadata: Metadata = {
  title: "For Auto Closers",
  description:
    "The AI agent built for auto closers. Knows your pay plan, your unit math, your volume bonuses, and Toyota Star Safety System + TSS 4.0 out of the box.",
};

const data: IndustryData = {
  slug: "auto",
  name: "Auto",
  icon: Car,
  eyebrow: "For Auto Closers",
  headline: (
    <>
      Know every pay plan.
      <br />
      Close every deal.
      <br />
      <span className="text-deal">Ranked every month.</span>
    </>
  ),
  sub: "Built on the showroom floor by a working Toyota rep. Knows your mini structure, unit math, volume bonuses, and CXI math. Loaded with Star Safety System and TSS 4.0 out of the box.",
  heroImage:
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=1920&q=80&auto=format&fit=crop",
  scenarioImage:
    "https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=800&q=80&auto=format&fit=crop",
  featuresDay1: [
    "Your dealership's pay plan modeled exactly — mini deals, full deals, streets, kicks, tier retro math, live.",
    "Monthly tracker — running unit count, gross commissions, tier progress, CXI score impact.",
    "Toyota Star Safety System: VSC, TRAC, ABS, EBD, Brake Assist, Smart Stop — memorized.",
    "Trade valuation sanity check — book vs. market vs. your desk's comfort zone.",
    "Finance menu language. Lease vs. finance math. Residual and money factor in plain English.",
    "Customer follow-up generator — Day 1, 3, 7, 14, 30 — tuned to hot/warm/cold.",
    "Manufacturer incentive stacker — knows which rebates stack and which don't.",
    "CXI survey strategy — what to say before, how to time the ask, how to recover from a 4.7.",
  ],
  scenarioLabel: "On the lot",
  scenarioHeadline: (
    <>
      What this looks like at{" "}
      <span className="text-deal">9 PM.</span>
    </>
  ),
  scenario: {
    setup:
      "Customer is in the box. Objecting to monthly payment on a RAV4 XLE lease. Desk is tied up on another T.O. You're on your own.",
    query: "Payment too high on RAV4 XLE lease.",
    agentAction:
      "The agent pulls your pay plan, the current Toyota lease incentive, residual math on that exact trim, and gives you 3 scripts ranked by proven close rate — refining to your style as you use it.",
    outcome: "You close the deal. Deal stays on the board. CXI stays 5.0.",
  },
  integrations:
    "Works with Reynolds, CDK, VinSolutions, DealerSocket, Elead. No integration fees.",
};

export default function AutoPage() {
  return <IndustryPage data={data} />;
}
