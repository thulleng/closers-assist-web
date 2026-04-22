import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { Check, ClipboardList, ArrowRight } from "lucide-react";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "For Project Managers Who Sell",
  description:
    "The AI agent built for project managers who pitch clients, defend budgets, and close change orders. SOW defense, scope upsell scripts, and verbal-yes-to-signed-contract playbooks.",
};

const featuresDay1 = [
  "SOW defense scripts — word-for-word responses when clients push back on scope or deliverables.",
  "Change order closer — how to present, justify, and get sign-off on out-of-scope work.",
  "Budget objection playbook — 'you're over budget' handled without killing the relationship.",
  "Timeline pushback scripts — realistic deadline conversations that preserve trust and margin.",
  "Verbal-yes-to-signed-contract — close the loop from 'sounds good' to ink on the page.",
  "Scope creep prevention — how to flag and price new requests before they become freebies.",
  "Client pitch framework — structure for proposals that win on value, not just price.",
  "Upsell conversation scripts — expand engagement with existing clients naturally and confidently.",
];

export default function ProjectManagerPage() {
  return (
    <>
      {/* HERO with photo */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-20">
          <Image
            src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800"
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
              <ClipboardList className="h-3.5 w-3.5 text-deal" strokeWidth={2} />
              <span className="text-xs font-medium tracking-wide text-deal">
                For Project Managers
              </span>
            </div>
            <h1 className="font-display text-4xl font-extrabold leading-[1.05] tracking-tight text-bone md:text-7xl">
              Defend every budget.
              <br />
              Close every change order.
              <br />
              <span className="text-deal">Turn a yes into a signature.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ash md:text-xl">
              Built for PMs who sell — pitching clients, upselling scope,
              defending SOWs, and closing change orders without damaging the
              relationship. Real scripts. Real confidence.
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
              What project managers get{" "}
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
                  src="https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=800"
                  alt="Project planning"
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
                  <span className="text-deal">the client pushes back.</span>
                </h2>
                <div className="space-y-5 text-[17px] leading-relaxed text-bone">
                  <p>
                    Client emails mid-project. Says you&rsquo;re 20% over the
                    original estimate and they&rsquo;re not approving the change
                    order until you justify every line item.
                  </p>
                  <p>
                    You open Closers Assist. Type:{" "}
                    <span className="rounded bg-slate px-2 py-0.5 font-mono text-sm text-deal">
                      Client pushing back on change order. 20% over estimate. Need to justify scope.
                    </span>
                  </p>
                  <p>
                    The agent gives you a change order defense script, a
                    line-item justification framework, and a closing line to
                    move from objection to signature — without torching the
                    relationship.
                  </p>
                  <p className="border-l-2 border-deal pl-5 text-xl text-bone">
                    Change order approved. Project stays on track. Client renews
                    the engagement.
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
              One recovered change order pays for years of Closers Assist. No
              integration required.
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
