import Link from "next/link";
import type { Metadata } from "next";
import { Star, ArrowRight, Quote } from "lucide-react";
import { LazyReviewsSection } from "@/lib/lazy-imports";

export const metadata: Metadata = {
  title: "Reviews | Deal Clozr",
  description:
    "Real closers. Real results. See what sales reps across auto, solar, real estate, insurance, and more are saying about Deal Clozr.",
  openGraph: {
    title: "Reviews | Deal Clozr",
    description:
      "Real closers. Real results. See what sales reps are saying about Deal Clozr.",
  },
};

export default function ReviewsPage() {
  return (
    <main className="min-h-screen bg-pit">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-white/5 px-6 pt-28 pb-16 md:pt-36 md:pb-24">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-deal/10 blur-[120px]" />
          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-purple-600/10 blur-[120px]" />
        </div>

        <div className="relative mx-auto max-w-4xl text-center">
          <div className="mx-auto mb-6 flex w-fit items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-sm text-ash">
            <Star className="h-4 w-4 text-gold-light" strokeWidth={2} />
            <span>From the closers on the front lines</span>
          </div>

          <h1 className="font-display text-4xl font-black tracking-tight text-white md:text-6xl">
            Real words from{" "}
            <span className="bg-gradient-to-r from-deal-light to-purple-400 bg-clip-text text-transparent">
              real closers
            </span>
          </h1>

          <p className="mx-auto mt-5 max-w-2xl text-lg text-ash md:text-xl">
            No fake testimonials. No stock photos. Just honest reviews from
            sales reps who use Deal Clozr every day to close more, stress less.
          </p>

          <div className="mx-auto mt-10 flex flex-wrap items-center justify-center gap-8 text-sm">
            <div className="flex items-center gap-2 text-ash">
              <Star className="h-4 w-4 fill-gold-light text-gold-light" />
              <span className="font-semibold text-white">4.9</span>
              <span>avg rating</span>
            </div>
            <div className="h-4 w-px bg-white/10" />
            <div className="flex items-center gap-2 text-ash">
              <Quote className="h-4 w-4 text-deal-light" strokeWidth={2} />
              <span className="font-semibold text-white">50+</span>
              <span>verified reviews</span>
            </div>
            <div className="h-4 w-px bg-white/10" />
            <div className="flex items-center gap-2 text-ash">
              <ArrowRight className="h-4 w-4 text-purple-400" strokeWidth={2} />
              <span>Updated weekly</span>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews feed */}
      <section className="px-6 py-16 md:py-24">
        <div className="mx-auto max-w-7xl">
          <LazyReviewsSection />
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden border-t border-white/5 px-6 py-20 text-center">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(16,185,129,0.08),transparent_60%)]" />
        </div>

        <div className="relative mx-auto max-w-2xl">
          <h2 className="font-display text-3xl font-black text-white md:text-4xl">
            Ready to write your own review?
          </h2>
          <p className="mt-4 text-lg text-ash">
            Get Deal Clozr in your corner. First month free — cancel anytime.
          </p>
          <Link
            href="/pricing"
            className="btn-loud mt-8 inline-flex items-center gap-2 rounded-xl px-8 py-3 text-sm font-bold"
          >
            Get Started Free
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </Link>
        </div>
      </section>
    </main>
  );
}
