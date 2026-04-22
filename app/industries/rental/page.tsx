import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Check, KeyRound, ArrowRight } from "lucide-react";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "For Rental Closers",
  description:
    "The AI agent built for rental sales — Turo hosts, Airbnb/vacation rentals, RV, boat, and truck/moving rental. Handle pricing disputes, damage deposits, cancellation pushback, and close more bookings.",
};

const featuresDay1 = [
  "Pricing objection scripts — 'I found it cheaper on Turo' handled word-for-word with confidence %.",
  "Damage deposit defense — exactly what to say when guests push back on holds.",
  "Cancellation pushback playbook — keep the booking, offer alternatives, protect your calendar.",
  "Insurance and add-on upsell scripts — roadside, damage waiver, extra driver, early pickup.",
  "5-star review ask — timing, wording, and follow-up sequence to maximize review rate.",
  "Damage dispute scripts — how to document, communicate, and resolve without losing future bookings.",
  "Dynamic pricing justification — how to explain weekend/peak rates without sounding greedy.",
  "Repeat guest retention — scripts to turn one-time renters into regulars.",
];

export default function RentalPage() {
  return (
    <>
      {/* HERO with photo */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-20">
          <Image
            src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800"
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="hero-vignette -z-10" />

        <div className="mx-auto max-w-7xl px-6 pb-24 pt-20 md:pb-32 md:pt-28">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-deal/30 bg-deal/10 px-3 py-1.5">
              <KeyRound className="h-3.5 w-3.5 text-deal" strokeWidth={2} />
              <span className="text-xs font-medium tracking-wide text-deal">
                For Rental Closers
              </span>
            </div>
            <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-bone md:text-7xl">
              Handle every objection.
              <br />
              Keep every booking.
              <br />
              <span className="text-deal">Get every 5-star review.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ash md:text-xl">
              Built for Turo hosts, Airbnb operators, RV and boat rental owners,
              and truck/moving rental reps. Knows your objections cold —
              pricing, deposits, cancellations, damage disputes.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href="/pricing"
                className="group inline-flex items-center gap-2 rounded-md bg-deal px-6 py-3.5 text-[15px] font-medium text-pit transition-all hover:bg-deal-hover hover:scale-[1.02]"
              >
                Get Started
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  strokeWidth={2.5}
                />
              </Link>
              <Link
                href="/"
                className="rounded-md border border-iron bg-pit/60 px-6 py-3.5 text-[15px] font-medium text-bone backdrop-blur transition-colors hover:border-ash"
              >
                Try it now →
              </Link>
            </div>
        </div>
      </section>

      {/* DAY ONE FEATURES */}
      <section className="border-t border-iron bg-slate">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <FadeIn>
            <h2 className="mb-12 max-w-3xl font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-bone md:text-5xl">
              What rental closers get{" "}
              <span className="text-deal">day one.</span>
            </h2>
          </FadeIn>
          <div className="grid gap-3 md:grid-cols-2">
            {featuresDay1.map((f, i) => (
              <FadeIn key={f} delay={i * 50}>
                <div className="card-lift flex items-start gap-3 rounded-lg border border-iron bg-pit p-5 transition-colors hover:border-deal/40">
                  <Check
                    className="mt-0.5 h-5 w-5 flex-shrink-0 text-deal"
                    strokeWidth={2.5}
                  />
                  <p className="text-sm leading-relaxed text-bone">{f}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* SCENARIO */}
      <section className="border-t border-iron">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <FadeIn>
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-iron">
                <Image
                  src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=800"
                  alt="Rental keys"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-pit via-pit/30 to-transparent" />
              </div>
            </FadeIn>

            <FadeIn delay={200}>
              <div>
                <div className="mb-3 flex items-center gap-2">
                  <span className="h-1.5 w-1.5 rounded-full bg-deal" />
                  <span className="text-xs font-medium uppercase tracking-widest text-deal">
                    Real scenario
                  </span>
                </div>
                <h2 className="mb-8 font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-bone md:text-5xl">
                  What this looks like when{" "}
                  <span className="text-deal">a guest pushes back.</span>
                </h2>
                <div className="space-y-5 text-[17px] leading-relaxed text-bone">
                  <p>
                    Guest messages at 10 PM. Says your daily rate is $40 higher
                    than a competitor. They&rsquo;re about to cancel a 5-day
                    booking.
                  </p>
                  <p>
                    You open Closers Assist. Type:{" "}
                    <span className="rounded bg-slate px-2 py-0.5 font-mono text-sm text-deal">
                      Guest says I&apos;m $40/day more than competitor. 5-day booking.
                    </span>
                  </p>
                  <p>
                    The agent gives you 3 scripts ranked by close rate — value
                    stack, loyalty offer, partial flex — tailored to keep the
                    booking without gutting your margin.
                  </p>
                  <p className="border-l-2 border-deal pl-5 text-xl text-bone">
                    Booking stays. Review comes in at 5 stars. Guest books again
                    in 6 weeks.
                  </p>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* PRICING STRIP */}
      <section className="border-t border-iron bg-slate">
        <div className="mx-auto max-w-4xl px-6 py-20 text-center md:py-24">
          <FadeIn>
            <h2 className="mb-3 font-display text-3xl font-extrabold leading-tight tracking-tight text-bone md:text-5xl">
              <span className="font-mono">$29.99</span> per rep, per month.
            </h2>
            <p className="mb-10 text-lg leading-relaxed text-ash">
              Works for solo hosts and multi-unit operators. No integration
              required — works from day one.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/pricing"
                className="group inline-flex items-center gap-2 rounded-md bg-deal px-7 py-3.5 text-base font-medium text-pit transition-all hover:bg-deal-hover hover:scale-[1.02]"
              >
                Get Started
                <ArrowRight
                  className="h-4 w-4 transition-transform group-hover:translate-x-1"
                  strokeWidth={2.5}
                />
              </Link>
              <Link
                href="/"
                className="rounded-md border border-iron bg-pit/60 px-7 py-3.5 text-base font-medium text-bone backdrop-blur transition-colors hover:border-ash"
              >
                Try it now →
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
