import type { Metadata } from "next";
import { Home } from "lucide-react";
import IndustryPage, { type IndustryData } from "@/components/IndustryPage";

export const metadata: Metadata = {
  title: "Roofing Sales AI Agent | Closers Assist",
  description:
    "The AI agent built for roofing reps. Insurance claim walkthroughs, repair-to-replace conversations, and storm territory plays that close more roofs.",
};

const data: IndustryData = {
  slug: "roofing",
  name: "Roofing",
  icon: Home,
  eyebrow: "For Roofing Closers",
  headline: (
    <>
      Close more roofs.
      <br />
      Own the storm season.
      <br />
      <span className="text-deal">Every claim. Every close.</span>
    </>
  ),
  sub: "Your AI agent built for roofing reps — handle insurance claim walkthroughs, close full replacements over repairs, and dominate your territory after every storm.",
  heroImage:
    "https://images.unsplash.com/photo-1635424824849-1b09bdcc55b1?w=1920&q=80&auto=format&fit=crop",
  scenarioImage:
    "https://images.unsplash.com/photo-1635424824849-1b09bdcc55b1?w=800&q=80&auto=format&fit=crop",
  featuresDay1: [
    "Insurance claim coach — walk homeowners through the claim process step by step, removing confusion and building trust.",
    "Repair vs. replace closer — data-backed responses that show the long-term cost of a repair vs. the value of a full replacement.",
    "Material upsell playbook — know when and how to pitch upgrades from 3-tab to architectural to premium with ROI math.",
    "Storm territory playbook — optimized door-to-door scripts for post-storm canvassing that qualify fast and close same day.",
    "Adjuster meeting prep — what to say, what to document, and how to advocate for full replacement during the adjuster walk.",
    "Financing objection scripts — make monthly payment conversations simple with financing options ready at your fingertips.",
    "Seasonal maintenance upsell — turn a repair call into a gutter, soffit, or skylight opportunity.",
    "Google review request scripts — timing and wording to build social proof that brings more doors.",
  ],
  scenarioLabel: "After the storm",
  scenarioHeadline: (
    <>
      What this looks like when{" "}
      <span className="text-deal">the homeowner only wants a repair.</span>
    </>
  ),
  scenario: {
    setup:
      "Homeowner has visible storm damage — missing shingles, granule loss, a soft spot near the chimney. Insurance adjuster hasn't been out yet. Homeowner says 'Can't you just patch it?'",
    query: "Homeowner wants patch repair. Visible storm damage. Adjuster hasn't visited.",
    agentAction:
      "The agent gives you the repair-vs-replace ROI script — lifespan comparison, energy savings, insurance premium impact, and resale value — plus 3 objection responses tailored to 'just patch it' skeptics.",
    outcome:
      "Homeowner agrees to a full inspection. Adjuster confirms replacement coverage. You close a full roof at full margin.",
  },
  integrations:
    "Works with AccuLynx, JobNimbus, CompanyCam, and your existing roofing CRM. No integration fees.",
};

export default function RoofingPage() {
  return <IndustryPage data={data} />;
}
