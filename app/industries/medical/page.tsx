import type { Metadata } from "next";
import { HeartPulse } from "lucide-react";
import IndustryPage, { type IndustryData } from "@/components/IndustryPage";

export const metadata: Metadata = {
  title: "For Medical Device Reps",
  description:
    "The AI agent for medical device sales. Every device spec, every clinical protocol, every coding nuance — at your fingertips between cases.",
};

const data: IndustryData = {
  slug: "medical",
  name: "Medical Devices",
  icon: HeartPulse,
  eyebrow: "For Medical Device Reps",
  headline: (
    <>
      Protocol-ready.
      <br />
      Rep-surgeon-ready.
      <br />
      <span className="text-deal">Territory-ready.</span>
    </>
  ),
  sub: "Every device spec, every clinical protocol, every coding nuance — at your fingertips between cases. Built for reps in ortho, cardio, spine, neuro, and capital equipment who live between the OR and the hotel bar.",
  heroImage:
    "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=1920&q=80&auto=format&fit=crop",
  scenarioImage:
    "https://images.unsplash.com/photo-1538108149393-fbbd81895907?w=800&q=80&auto=format&fit=crop",
  featuresDay1: [
    "Full device spec library — indications, contraindications, implant catalog numbers, sterilization cycles.",
    "Clinical protocol briefings by procedure — surgical technique, instrument sets, loaner kit contents.",
    "CPT and ICD-10 coding helper — reimbursement math by payer, by region, by site of service.",
    "Rep-surgeon script library — new product intros, adoption conversations, competitor displacement.",
    "Territory planner — call frequency by account tier, A/B/C prioritization, route optimization.",
    "Quota and commission math — base, ramp, accelerators, SPIFF stacking, territory splits.",
    "Competitive battle cards — live comparisons against the 3 competitors that matter in each procedure.",
    "Integrations with Veeva, Salesforce Health Cloud, Showpad, MediSpend, and most CRM-of-record systems.",
  ],
  scenarioLabel: "Between cases",
  scenarioHeadline: (
    <>
      What this looks like at{" "}
      <span className="text-deal">7:15 AM in the OR lounge.</span>
    </>
  ),
  scenario: {
    setup:
      "You're in the OR lounge. Dr. Patel is between cases, drinking bad coffee, 11 minutes to kill. She asks about your new 7mm locking plate vs the competitor's 6.5mm. You forgot the fatigue test data.",
    query: "7mm locking plate fatigue data vs competitor 6.5mm ortho plate.",
    agentAction:
      "The agent pulls the peer-reviewed fatigue study, the indication comparison, your recent case outcomes at this hospital, and gives you a 90-second answer with the data.",
    outcome:
      "Dr. Patel asks you to bring a loaner kit Thursday. Two cases booked the next week.",
  },
  integrations:
    "Works with Veeva, Salesforce Health Cloud, Showpad, MediSpend. No integration fees.",
};

export default function MedicalPage() {
  return <IndustryPage data={data} />;
}
