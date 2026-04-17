import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Founder Story",
  description:
    "My name is Thul. I sell Toyotas. I built Closers Assist between customers. Here's why.",
};

export default function FounderPage() {
  return (
    <article className="relative overflow-hidden loud-bg">
      <div className="grid-pattern opacity-50" />
      <div className="relative mx-auto max-w-7xl px-6 pb-20 pt-20 md:pt-28">
        <FadeIn>
          <header className="mb-14 grid gap-12 lg:grid-cols-[1.2fr,1fr] lg:items-center">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-deal/30 bg-deal/10 px-3 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-deal shadow-[0_0_8px_#10B981]" />
                <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-deal-light">
                  Founder Story
                </span>
              </div>
              <h1 className="font-display text-5xl font-black leading-[0.98] tracking-[-0.02em] text-white md:text-7xl">
                I sell Toyotas.
                <br />
                I built this{" "}
                <span className="text-shine font-black">
                  between customers.
                </span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-ash md:text-xl">
                My name is Thul.{" "}
                <span className="font-semibold text-gold-light">
                  Here&rsquo;s why Closers Assist exists.
                </span>
              </p>
            </div>

            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
              <Image
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80&auto=format&fit=crop"
                alt="Working late"
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 45vw, 100vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-pit via-pit/20 to-transparent" />
              <div
                className="pointer-events-none absolute -bottom-10 -right-10 h-40 w-40 rounded-full blur-3xl"
                style={{
                  background:
                    "radial-gradient(circle, rgba(16,185,129,0.35), transparent 70%)",
                }}
                aria-hidden
              />
              <div className="absolute bottom-5 left-5 right-5 inline-flex items-center gap-2 self-start rounded-full border border-deal/40 bg-black/70 px-3.5 py-1.5 backdrop-blur w-fit">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-deal opacity-75 pulse-ring" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-deal" />
                </span>
                <span className="text-[11px] font-semibold text-white">
                  Sun Toyota — New Port Richey, FL
                </span>
              </div>
            </div>
          </header>
        </FadeIn>

      <div className="mx-auto max-w-3xl space-y-14">
        <FadeIn>
          <section>
            <h2 className="mb-5 font-display text-2xl font-bold text-bone">
              The Floor
            </h2>
            <div className="space-y-4 text-[17px] leading-relaxed text-bone">
              <p>I work at Sun Toyota. Five days a week. Sometimes six.</p>
              <p>
                I&rsquo;ve closed half-minis on a Tundra at 8 PM when the lot
                was empty. I&rsquo;ve written a Camry for $10K gross.
                I&rsquo;ve watched deals die at 11:55 PM on the last day of
                the month because the manager was tied up on someone
                else&rsquo;s T.O.
              </p>
              <p>I know my CXI math like my own birthday.</p>
            </div>
          </section>
        </FadeIn>

        <FadeIn>
          <section>
            <h2 className="mb-5 font-display text-2xl font-bold text-bone">
              The Problem
            </h2>
            <div className="space-y-4 text-[17px] leading-relaxed text-bone">
              <p>
                I tried every AI sales tool on the market. Every single one
                treated me like a data entry clerk.
              </p>
              <p>
                None of them knew what a mini was. None of them knew what a
                street purchase was. None of them understood that two
                half-minis plus a Camry plus a street isn&rsquo;t four units
                — it&rsquo;s 2.5 countable units.
              </p>
              <p>
                They were built for VPs of Sales at companies that buy
                Salesforce.{" "}
                <span className="text-deal">
                  Not for the guy on the lot at 9 PM trying to save a deal.
                </span>
              </p>
            </div>
          </section>
        </FadeIn>

        <FadeIn>
          <section>
            <h2 className="mb-5 font-display text-2xl font-bold text-bone">
              The Build
            </h2>
            <div className="space-y-4 text-[17px] leading-relaxed text-bone">
              <p>So I built it myself. Between customers. Nights. Weekends.</p>
              <p>
                One question drove every decision:{" "}
                <em className="text-deal">
                  what would I want if I could have anything?
                </em>
              </p>
              <p>
                An agent that knows my pay plan, my product, my customers, my
                objections, my scripts. Gets smarter every day. No feature
                gating. No upsells. No data held hostage. Mine.
              </p>
            </div>
          </section>
        </FadeIn>

        <FadeIn>
          <section>
            <h2 className="mb-5 font-display text-2xl font-bold text-bone">
              The Promise
            </h2>
            <div className="space-y-4 text-[17px] leading-relaxed text-bone">
              <p>I sell cars every day. I&rsquo;ll never stop.</p>
              <p className="border-l-2 border-deal pl-5 text-xl leading-relaxed text-bone">
                The day I stop selling is the day this product stops being
                real. That&rsquo;s the difference. That&rsquo;s the whole
                thing.
              </p>
            </div>
          </section>
        </FadeIn>
      </div>

      <FadeIn>
        <div className="mt-20 border-t border-iron pt-14 text-center">
          <Link
            href="/pricing"
            className="group inline-flex items-center gap-2 rounded-md bg-deal px-7 py-3.5 text-base font-medium text-pit transition-all hover:bg-deal-hover hover:scale-[1.02]"
          >
            Join me
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              strokeWidth={2.5}
            />
          </Link>
          <p className="mt-4 text-sm text-muted">
            14-day free trial. No credit card.
          </p>
        </div>
      </FadeIn>
      </div>
    </article>
  );
}
