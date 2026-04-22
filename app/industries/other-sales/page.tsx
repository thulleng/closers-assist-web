import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Check, Handshake, ArrowRight } from "lucide-react";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "For Sales Closers — Universal Playbook",
  description:
    "The AI agent for every closer, every industry. Universal objection handling: price, timing, need to think about it, decision-maker stalls, and ghosting recovery. Rooted in closing fundamentals.",
};

const featuresDay1 = [
  "Price objection playbook — word-for-word scripts for 'too expensive' ranked by close rate.",
  "'I need to think about it' closer — 3 plays to get a decision today without burning the relationship.",
  "Decision-maker stall scripts — how to get to the real decision-maker without offending your contact.",
  "Ghosting recovery sequence — follow-up texts and emails that re-engage without being annoying.",
  "Timing objection handler — 'not right now' turned into a committed future close with a date.",
  "Urgency creation scripts — ethical ways to create momentum when the buyer is stalling.",
  "Competitor comparison closer — how to win on value when they're shopping around.",
  "Follow-up sequence generator — Day 1, 3, 7, 14, 30 cadence tuned to hot/warm/cold leads.",
];

export default function OtherSalesPage() {
  return (
    <>
      {/* HERO with photo */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-20">
          <Image
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800"
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
              <Handshake className="h-3.5 w-3.5 text-deal" strokeWidth={2} />
              <span className="text-xs font-medium tracking-wide text-deal">
                For All Closers
              </span>
            </div>
            <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-bone md:text-7xl">
              Every objection.
              <br />
              Every stall.
              <br />
              <span className="text-deal">Every close.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ash md:text-xl">
              The universal sales playbook. Industry-agnostic closing
              fundamentals for anyone who sells — price objections, timing
              stalls, decision-maker runaround, and ghosting recovery.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Link
                href="/#waitlist"
                className="group inline-flex items-center gap-2 rounded-md bg-deal px-6 py-3.5 text-[15px] font-medium text-pit transition-all hover:bg-deal-hover hover:scale-[1.02]"
              >
                Join Waitlist
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
              What every closer gets{" "}
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
                  src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800"
                  alt="Handshake sales close"
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
                  <span className="text-deal">the deal stalls.</span>
                </h2>
                <div className="space-y-5 text-[17px] leading-relaxed text-bone">
                  <p>
                    Prospect went quiet after a great demo. Two follow-ups.
                    No reply. It&rsquo;s been 10 days. You&rsquo;re watching
                    the deal go cold in real time.
                  </p>
                  <p>
                    You open Closers Assist. Type:{" "}
                    <span className="rounded bg-slate px-2 py-0.5 font-mono text-sm text-deal">
                      Prospect ghosted after demo. 10 days. Two unanswered follow-ups.
                    </span>
                  </p>
                  <p>
                    The agent gives you 3 re-engagement messages ranked by
                    open rate — one text, one email, one LinkedIn — with
                    timing guidance and a subject line that gets replies.
                  </p>
                  <p className="border-l-2 border-deal pl-5 text-xl text-bone">
                    Prospect responds. Deal moves forward. Pipeline stays
                    alive.
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
              Works for any sales role, any industry, any product. No
              integration required — useful from minute one.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link
                href="/#waitlist"
                className="group inline-flex items-center gap-2 rounded-md bg-deal px-7 py-3.5 text-base font-medium text-pit transition-all hover:bg-deal-hover hover:scale-[1.02]"
              >
                Join Waitlist
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
