import Link from "next/link";
import Image from "next/image";
import { Check, ArrowRight, type LucideIcon } from "lucide-react";
import FadeIn from "@/components/FadeIn";

export type IndustryScenario = {
  setup: string;
  query: string;
  agentAction: string;
  outcome: string;
};

export type IndustryData = {
  /** URL segment e.g. "real-estate" */
  slug: string;
  /** Display name e.g. "Real Estate" */
  name: string;
  /** Icon from lucide-react */
  icon: LucideIcon;
  /** Eyebrow above hero headline */
  eyebrow: string;
  /** Hero headline — supports JSX with <span className="text-deal"> for accent */
  headline: React.ReactNode;
  /** Hero sub-headline paragraph */
  sub: string;
  /** Hero background Unsplash photo URL */
  heroImage: string;
  /** Scenario section background photo */
  scenarioImage: string;
  /** 8 day-one feature bullets */
  featuresDay1: string[];
  /** Scenario label above the "at 9 PM" section */
  scenarioLabel: string;
  /** Scenario headline — keep it short */
  scenarioHeadline: React.ReactNode;
  /** The situation narrative */
  scenario: IndustryScenario;
  /** Integrations line for the pricing strip */
  integrations: string;
};

export default function IndustryPage({ data }: { data: IndustryData }) {
  const Icon = data.icon;
  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-20">
          <Image
            src={data.heroImage}
            alt=""
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="hero-vignette -z-10" />
        <div className="hero-glow -z-10" />

        <div className="mx-auto max-w-7xl px-6 pb-24 pt-20 md:pb-32 md:pt-28">
          <FadeIn>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-deal/30 bg-deal/10 px-3 py-1.5">
              <Icon className="h-3.5 w-3.5 text-deal" strokeWidth={2} />
              <span className="text-xs font-medium tracking-wide text-deal">
                {data.eyebrow}
              </span>
            </div>
          </FadeIn>

          <FadeIn delay={100}>
            <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-bone md:text-7xl">
              {data.headline}
            </h1>
          </FadeIn>

          <FadeIn delay={200}>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ash md:text-xl">
              {data.sub}
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

      {/* DAY ONE */}
      <section className="border-t border-iron bg-slate">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <FadeIn>
            <h2 className="mb-12 max-w-3xl font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-bone md:text-5xl">
              What {data.name.toLowerCase()} closers get{" "}
              <span className="text-deal">day one.</span>
            </h2>
          </FadeIn>
          <div className="grid gap-3 md:grid-cols-2">
            {data.featuresDay1.map((f, i) => (
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
                  src={data.scenarioImage}
                  alt={data.scenarioLabel}
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
                    {data.scenarioLabel}
                  </span>
                </div>
                <h2 className="mb-8 font-display text-3xl font-extrabold leading-[1.1] tracking-tight text-bone md:text-5xl">
                  {data.scenarioHeadline}
                </h2>
                <div className="space-y-5 text-[17px] leading-relaxed text-bone">
                  <p>{data.scenario.setup}</p>
                  <p>
                    You open Closers Assist on your phone. Type:{" "}
                    <span className="rounded bg-slate px-2 py-0.5 font-mono text-sm text-deal">
                      {data.scenario.query}
                    </span>
                  </p>
                  <p>{data.scenario.agentAction}</p>
                  <p className="border-l-2 border-deal pl-5 text-xl text-bone">
                    {data.scenario.outcome}
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
              {data.integrations}
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
