import type { Metadata } from "next";
import { ClipboardList } from "lucide-react";
import IndustryPage, { type IndustryData } from "@/components/IndustryPage";

export const metadata: Metadata = {
  title: "For Project Managers Who Sell",
  description:
    "The AI agent built for project managers who pitch clients, defend budgets, and close change orders. SOW defense, scope upsell scripts, and verbal-yes-to-signed-contract playbooks.",
};

const data: IndustryData = {
  slug: "project-manager",
  name: "Project Manager",
  icon: ClipboardList,
  eyebrow: "For Project Managers",
  headline: (
    <>
      Defend every budget.
      <br />
      Close every change order.
      <br />
      <span className="text-deal">Turn a yes into a signature.</span>
    </>
  ),
  sub: "Built for PMs who sell — pitching clients, upselling scope, defending SOWs, and closing change orders without damaging the relationship. Real scripts. Real confidence.",
  heroImage:
    "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=1920&q=80&auto=format&fit=crop",
  scenarioImage:
    "https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800&q=80&auto=format&fit=crop",
  featuresDay1: [
    "SOW defense scripts — word-for-word responses when clients push back on scope or deliverables.",
    "Change order closer — how to present, justify, and get sign-off on out-of-scope work.",
    "Budget objection playbook — 'you're over budget' handled without killing the relationship.",
    "Timeline pushback scripts — realistic deadline conversations that preserve trust and margin.",
    "Verbal-yes-to-signed-contract — close the loop from 'sounds good' to ink on the page.",
    "Scope creep prevention — how to flag and price new requests before they become freebies.",
    "Client pitch framework — structure for proposals that win on value, not just price.",
    "Upsell conversation scripts — expand engagement with existing clients naturally and confidently.",
  ],
  scenarioLabel: "When the client pushes back",
  scenarioHeadline: (
    <>
      What this looks like when{" "}
      <span className="text-deal">the client pushes back.</span>
    </>
  ),
  scenario: {
    setup:
      "Client emails mid-project. Says you're 20% over the original estimate and they're not approving the change order until you justify every line item.",
    query:
      "Client pushing back on change order. 20% over estimate. Need to justify scope.",
    agentAction:
      "The agent gives you a change order defense script, a line-item justification framework, and a closing line to move from objection to signature — without torching the relationship.",
    outcome:
      "Change order approved. Project stays on track. Client renews the engagement.",
  },
  integrations:
    "One recovered change order pays for years of Closers Assist. No integration required.",
};

export default function ProjectManagerPage() {
  return <IndustryPage data={data} />;
}
