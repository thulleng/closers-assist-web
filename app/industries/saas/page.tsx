import type { Metadata } from "next";
import { Monitor } from "lucide-react";
import IndustryPage, { type IndustryData } from "@/components/IndustryPage";

export const metadata: Metadata = {
  title: "For SaaS Sales Reps",
  description:
    "The AI agent for SaaS closers. Pipeline pulse, MEDDIC coaching, discovery questions, demo prep, procurement survival. Plays nice with Salesforce, HubSpot, Gong.",
};

const data: IndustryData = {
  slug: "saas",
  name: "SaaS",
  icon: Monitor,
  eyebrow: "For SaaS Closers",
  headline: (
    <>
      The discovery agent
      <br />
      <span className="text-deal">your reps never had.</span>
    </>
  ),
  sub: "Pipeline pulse, MEDDIC coaching, demo prep, procurement survival. Built for AEs and AMs who are tired of coaching tools that only watch the call and never help close it.",
  heroImage:
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=80&auto=format&fit=crop",
  scenarioImage:
    "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80&auto=format&fit=crop",
  featuresDay1: [
    "MEDDIC / MEDDPICC scoring on every opportunity — surfaces the weakest link live.",
    "Discovery question generator tuned to your ICP and stage.",
    "Demo prep agent — reviews the prospect's stack, tech footprint, and suggests the 3 features to lead with.",
    "Procurement maze playbook — security review, legal redlines, MSA templates, DPIA, SOC2 requests.",
    "Pipeline pulse — daily 60-second stand-up on who's hot, who's stalling, who needs a touch today.",
    "Commission math — accelerators, multi-year ramp, SPIFF stacking, clawback risk.",
    "Objection playbook — 'we need to see more data,' 'the budget moved to next year,' 'we're going with the incumbent.'",
    "Integrations with Salesforce, HubSpot, Gong, Chorus, Outreach, Salesloft, Clari, Gainsight.",
  ],
  scenarioLabel: "Before the call",
  scenarioHeadline: (
    <>
      What this looks like{" "}
      <span className="text-deal">5 minutes before a demo.</span>
    </>
  ),
  scenario: {
    setup:
      "You have a demo in 5 minutes with a VP of Engineering at a fintech. You've never talked to her. You have 3 deals closing this quarter and you skimmed the last call notes once.",
    query: "Demo in 5 — VP Eng at fintech, last touch 11 days ago, stalled on security review.",
    agentAction:
      "The agent pulls their last Gong call, surfaces the 3 unresolved objections, checks their tech stack via built-in enrichment, and hands you 5 discovery questions ranked by proven close rate for this segment (refines to your style as you use it).",
    outcome:
      "You walk in tight. MEDDIC score jumps 2 points. Demo converts to a champion-led procurement path.",
  },
  integrations:
    "Works with Salesforce, HubSpot, Gong, Chorus, Outreach, Salesloft. No integration fees.",
};

export default function SaasPage() {
  return <IndustryPage data={data} />;
}
