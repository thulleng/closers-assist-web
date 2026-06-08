import type { Metadata } from "next";
import { KeyRound } from "lucide-react";
import IndustryPage, { type IndustryData } from "@/components/IndustryPage";

export const metadata: Metadata = {
  title: "For Rental Closers",
  description:
    "The AI agent built for rental sales — Turo hosts, Airbnb/vacation rentals, RV, boat, and truck/moving rental. Handle pricing disputes, damage deposits, cancellation pushback, and close more bookings.",
};

const data: IndustryData = {
  slug: "rental",
  name: "Rental",
  icon: KeyRound,
  eyebrow: "For Rental Closers",
  headline: (
    <>
      Handle every objection.
      <br />
      Keep every booking.
      <br />
      <span className="text-deal">Get every 5-star review.</span>
    </>
  ),
  sub: "Built for Turo hosts, Airbnb operators, RV and boat rental owners, and truck/moving rental reps. Knows your objections cold — pricing, deposits, cancellations, damage disputes.",
  heroImage: "/images/industries/rental.jpg",
  scenarioImage: "/images/industries/rental.jpg",
  featuresDay1: [
    "Pricing objection scripts — 'I found it cheaper on Turo' handled word-for-word with confidence %.",
    "Damage deposit defense — exactly what to say when guests push back on holds.",
    "Cancellation pushback playbook — keep the booking, offer alternatives, protect your calendar.",
    "Insurance and add-on upsell scripts — roadside, damage waiver, extra driver, early pickup.",
    "5-star review ask — timing, wording, and follow-up sequence to maximize review rate.",
    "Damage dispute scripts — how to document, communicate, and resolve without losing future bookings.",
    "Dynamic pricing justification — how to explain weekend/peak rates without sounding greedy.",
    "Repeat guest retention — scripts to turn one-time renters into regulars.",
  ],
  scenarioLabel: "When a guest pushes back",
  scenarioHeadline: (
    <>
      What this looks like when{" "}
      <span className="text-deal">a guest pushes back.</span>
    </>
  ),
  scenario: {
    setup:
      "Guest messages at 10 PM. Says your daily rate is $40 higher than a competitor. They're about to cancel a 5-day booking.",
    query: "Guest says I'm $40/day more than competitor. 5-day booking.",
    agentAction:
      "The agent gives you 3 scripts ranked by close rate — value stack, loyalty offer, partial flex — tailored to keep the booking without gutting your margin.",
    outcome:
      "Booking stays. Review comes in at 5 stars. Guest books again in 6 weeks.",
  },
  integrations:
    "Works for solo hosts and multi-unit operators. No integration required — works from day one.",
};

export default function RentalPage() {
  return <IndustryPage data={data} />;
}
