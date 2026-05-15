import Link from "next/link";
import { ArrowRight } from "lucide-react";
import AIAvatar from "@/components/AIAvatar";

export default function NotFound() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden loud-bg">
      <div className="grid-pattern opacity-40" />
      <div
        className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(16,185,129,0.25) 0%, transparent 60%)",
        }}
      />

      <div className="relative z-10 mx-auto max-w-lg px-6 text-center">
        <div className="mb-8 flex justify-center">
          <AIAvatar variant="circuit" size={120} accentColor="green" />
        </div>

        <h1 className="font-display text-7xl font-black tracking-[-0.03em] text-white md:text-9xl">
          404
        </h1>

        <p className="mt-4 text-xl font-bold text-bone md:text-2xl">
          This page doesn&rsquo;t exist.
        </p>
        <p className="mt-2 text-base leading-relaxed text-ash">
          But your next commission does.
        </p>

        <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="btn-loud group inline-flex items-center gap-2 rounded-xl px-7 py-4 text-[15px]"
          >
            Back to the floor
            <ArrowRight
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              strokeWidth={2.5}
            />
          </Link>
          <Link
            href="/pricing"
            className="btn-ghost rounded-xl px-6 py-4 text-[15px] font-semibold"
          >
            See pricing
          </Link>
        </div>

        <p className="mt-8 text-sm text-muted">
          $29.99/month. One deal pays for 10 years.
        </p>
      </div>
    </section>
  );
}
