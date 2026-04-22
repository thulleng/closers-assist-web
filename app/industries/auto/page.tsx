import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Check, Car, ArrowRight } from "lucide-react";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "For Auto Closers",
  description:
    "The AI agent built for auto closers. Knows your pay plan, your unit math, your volume bonuses, and Toyota Star Safety System + TSS 4.0 out of the box.",
};

const featuresDay1 = [
  "Your dealership's pay plan modeled exactly — mini deals, full deals, streets, kicks, tier retro math, live.",
  "Monthly tracker — running unit count, gross commissions, tier progress, CXI score impact.",
  "Toyota Star Safety System: VSC, TRAC, ABS, EBD, Brake Assist, Smart Stop — memorized.",
  "Trade valuation sanity check — book vs. market vs. your desk's comfort zone.",
  "Finance menu language. Lease vs. finance math. Residual and money factor in plain English.",
  "Customer follow-up generator — Day 1, 3, 7, 14, 30 — tuned to hot/warm/cold.",
  "Manufacturer incentive stacker — knows which rebates stack and which don't.",
  "CXI survey strategy — what to say before, how to time the ask, how to recover from a 4.7.",
];

export default function AutoPage() {
  return (
    <>
      {/* HERO with photo */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-20">
          <Image
            src="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80&auto=format&fit=crop"
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="hero-vignette -z-10" />

        <div className="mx-auto max-w-7xl px-6 pb-24 pt-20 md:pb-32 md:pt-28">
          <FadeIn>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-deal/30 bg-deal/10 px-3 py-1.5">
              <Car className="h-3.5 w-3.5 text-deal" strokeWidth={2} />
              <span className="text-xs font-medium tracking-wide text-deal">
                For Auto Closers
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-bone md:text-7xl">
              Know every pay plan.
              <br />
              Close every deal.
              <br />
              <span className="text-deal">Ranked every month.</span>
            </h1>
          </FadeIn>

          <FadeIn delay={200}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ash md:text-xl">
              Built on the showroom floor by a working Toyota rep. Knows your
              mini structure, unit math, volume bonuses, and CXI math. Loaded
              with Star Safety System and TSS 4.0 out of the box.
            </p>
          </FadeIn>

          <FadeIn delay={300}>
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
                href="/how-it-works"
                className="rounded-md border border-iron bg-pit/60 px-6 py-3.5 text-[15px] font-medium text-bone backdrop-blur transition-colors hover:border-ash"
              >
                See how it works
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* DAY ONE FEATURES */}
      <section className="border-t border-iron bg-slate">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <FadeIn>
            <h2 className="mb-12 max-w-3xl font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-bone md:text-5xl">
              What auto closers get <span className="text-deal">day one.</span>
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
                  src="https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=800&q=80&auto=format&fit=crop"
                  alt="Showroom at night"
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
                    On the lot
                  </span>
                </div>
                <h2 className="mb-8 font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-bone md:text-5xl">
                  What this looks like at{" "}
                  <span className="text-deal">9 PM.</span>
                </h2>
                <div className="space-y-5 text-[17px] leading-relaxed text-bone">
                  <p>
                    Customer is in the box. Objecting to monthly payment on a
                    RAV4 XLE lease. Desk is tied up on another T.O.
                    You&rsquo;re on your own.
                  </p>
                  <p>
                    You open Closers Assist on your phone. Type:{" "}
                    <span className="rounded bg-slate px-2 py-0.5 font-mono text-sm text-deal">
                      Payment too high on RAV4 XLE lease.
                    </span>
                  </p>
                  <p>
                    The agent pulls your pay plan, the current Toyota lease
                    incentive, residual math on that exact trim, and gives
                    you 3 scripts ranked by proven close rate — refining
                    to <span className="text-deal">your</span> style as you
                    use it.
                  </p>
                  <p className="border-l-2 border-deal pl-5 text-xl text-bone">
                    You close the deal. Deal stays on the board. CXI stays
                    5.0.
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
              Works with Reynolds, CDK, VinSolutions, DealerSocket, Elead. No
              integration fees.
            </p>
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
          </FadeIn>
        </div>
      </section>
    </>
  );
}
