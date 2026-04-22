import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "You're in — Closers Assist",
  description: "Welcome to Closers Assist.",
};

export default function SuccessPage() {
  return (
    <div className="relative flex min-h-[80vh] items-center justify-center overflow-hidden loud-bg">
      <div className="grid-pattern opacity-30" />

      <div className="relative mx-auto max-w-lg px-6 py-24 text-center">
        {/* Icon */}
        <div className="mb-8 flex justify-center">
          <div className="flex h-20 w-20 items-center justify-center rounded-full border border-deal/40 bg-deal/10 shadow-[0_0_40px_rgba(16,185,129,0.3)]">
            <CheckCircle2 className="h-10 w-10 text-deal" strokeWidth={1.5} />
          </div>
        </div>

        {/* Headline */}
        <h1 className="font-display text-4xl font-black leading-tight tracking-[-0.02em] text-white md:text-5xl">
          You&rsquo;re in.{" "}
          <span className="text-shine">Welcome to Closers Assist.</span>
        </h1>

        <p className="mt-5 text-lg leading-relaxed text-ash">
          Your subscription is active. Your agent is ready. Go close something.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/dashboard"
            className="group inline-flex items-center gap-2 rounded-md bg-deal px-7 py-3.5 text-[15px] font-medium text-pit transition-all hover:bg-deal-hover hover:scale-[1.02]"
          >
            Go to Dashboard
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              strokeWidth={2.5}
            />
          </Link>
          <Link
            href="/"
            className="rounded-md border border-iron bg-pit/60 px-7 py-3.5 text-[15px] font-medium text-bone backdrop-blur transition-colors hover:border-ash"
          >
            Back to home
          </Link>
        </div>

        {/* Support note */}
        <p className="mt-10 text-sm text-muted">
          Questions? Email{" "}
          <a
            href="mailto:thul@closersassist.com"
            className="text-ash transition-colors hover:text-deal"
          >
            thul@closersassist.com
          </a>
        </p>
      </div>
    </div>
  );
}
