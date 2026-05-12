import type { Metadata } from "next";
import { Landmark } from "lucide-react";
import IndustryPage, { type IndustryData } from "@/components/IndustryPage";

export const metadata: Metadata = {
  title: "Mortgage & Lending Sales AI Agent | Closers Assist",
  description:
    "The AI agent built for mortgage and lending reps. Handle rate objections, explain complex products clearly, and guide borrowers from application to close.",
};

const data: IndustryData = {
  slug: "mortgage",
  name: "Mortgage & Lending",
  icon: Landmark,
  eyebrow: "For Mortgage & Lending Closers",
  headline: (
    <>
      Close more loans.
      <br />
      Retain more borrowers.
      <br />
      <span className="text-deal">Win the rate conversation.</span>
    </>
  ),
  sub: "Your AI agent built for mortgage and lending reps — handle rate objections, explain complex products clearly, and guide borrowers from application to close.",
  heroImage:
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1920&q=80&auto=format&fit=crop",
  scenarioImage:
    "https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80&auto=format&fit=crop",
  featuresDay1: [
    "Rate objection handler — when a borrower says 'I found a lower rate,' your agent has the total cost comparison ready with APR, fees, points, and long-term math.",
    "Product explainer — break down FHA, VA, conventional, jumbo, and ARM products in plain language that builds confidence and closes faster.",
    "Pre-approval pipeline coach — keep borrowers moving with the right nudges, document checklists, and timeline expectations.",
    "Refinance opportunity spotter — identify existing customers ripe for a refinance conversation based on rate changes and equity milestones.",
    "Closing cost scripts — explain lender fees, third-party costs, and prepaids without losing the borrower's trust.",
    "First-time homebuyer playbook — walk new buyers through the entire process with language that reduces anxiety and builds commitment.",
    "Realtor referral scripts — nurture agent referral relationships with value-add touchpoints that keep the pipeline full.",
    "Rate lock strategy — when to lock, when to float, and how to explain the decision clearly.",
  ],
  scenarioLabel: "When they rate-shop you",
  scenarioHeadline: (
    <>
      What this looks like when{" "}
      <span className="text-deal">a borrower finds a lower rate.</span>
    </>
  ),
  scenario: {
    setup:
      "Borrower calls you. Says an online lender quoted them 6.25% — 50 basis points below your best rate. They're ready to walk. You know the online quote probably has hidden points and fees.",
    query: "Borrower says online lender is 50 bps lower. Ready to walk.",
    agentAction:
      "The agent pulls the full APR comparison — points, origination, processing, underwriting, and third-party fees — and gives you a side-by-side script that reveals the true cost. It also flags what online lenders don't tell borrowers about closing.",
    outcome:
      "Borrower sees the real numbers. Stays with you. Loan closes on time. They refer two friends.",
  },
  integrations:
    "Works with Encompass, Calyx Point, and your existing LOS. No integration fees.",
};

export default function MortgagePage() {
  return <IndustryPage data={data} />;
}
