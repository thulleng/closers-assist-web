import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Closers Assist terms of service.",
};

export default function TermsPage() {
  return (
    <div className="relative overflow-hidden loud-bg">
      <div className="mx-auto max-w-3xl px-6 py-20 md:py-28">
        <div className="mb-10">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-deal/30 bg-deal/10 px-3 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-deal" />
            <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-deal-light">
              Legal
            </span>
          </div>
          <h1 className="font-display text-4xl font-black leading-tight tracking-tight text-white md:text-5xl">
            Terms of Service
          </h1>
          <p className="mt-3 text-sm text-ash">
            Last updated: April 17, 2026
          </p>
        </div>

        <div className="space-y-10 text-[15px] leading-relaxed text-ash">
          <section>
            <h2 className="mb-4 text-xl font-bold text-white">
              1. Acceptance
            </h2>
            <p>
              By using Closers Assist, you agree to these terms. If you
              don&rsquo;t agree, don&rsquo;t use the service. These terms apply
              to all users — individual reps, team managers, and dealerships.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold text-white">
              2. The service
            </h2>
            <p>
              Closers Assist provides AI-powered sales agent software. The
              service is provided &ldquo;as is&rdquo; — we work hard to keep it
              running reliably but can&rsquo;t guarantee 100% uptime. We&rsquo;re
              a small team building fast.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold text-white">
              3. Your account
            </h2>
            <p>
              You&rsquo;re responsible for your account and everything that
              happens under your login. Don&rsquo;t share credentials. One
              Starter account = one rep. Pro and Elite plans allow the rep
              counts stated in your plan.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold text-white">
              4. Payment and refunds
            </h2>
            <p>
              Subscriptions bill monthly or annually. We offer a 14-day free
              trial with no credit card required. If you&rsquo;re not satisfied
              within your first 30 days, contact us for a full refund — no
              questions, no clawbacks. That&rsquo;s the guarantee.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold text-white">
              5. Acceptable use
            </h2>
            <p>
              Use Closers Assist to close more deals. Don&rsquo;t use it to
              spam customers, scrape data, resell access, or do anything
              illegal. Common sense applies.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold text-white">
              6. Skills Marketplace
            </h2>
            <p>
              If you publish a skill to the marketplace, you grant Closers
              Assist a license to distribute it to other users. You keep
              ownership. You earn 70% of every install. We take 30% to keep
              the lights on. Skills must comply with our content guidelines.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold text-white">
              7. Limitation of liability
            </h2>
            <p>
              Closers Assist is a tool. We&rsquo;re not responsible for deals
              you lose, commissions you miss, or advice your agent gives that
              you choose to take. You&rsquo;re the closer — the agent assists.
              Maximum liability is limited to fees paid in the prior 3 months.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold text-white">
              8. Changes
            </h2>
            <p>
              We may update these terms. We&rsquo;ll notify you by email if we
              make material changes. Continuing to use the service after
              changes means you accept the new terms.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold text-white">
              9. Contact
            </h2>
            <p>
              Questions? Email{" "}
              <a
                href="mailto:thul@closersassist.com"
                className="text-deal-light hover:text-white underline"
              >
                thul@closersassist.com
              </a>
              .
            </p>
          </section>
        </div>

        <div className="mt-14 border-t border-white/10 pt-8">
          <Link
            href="/"
            className="text-sm font-medium text-deal-light transition-colors hover:text-white"
          >
            ← Back to Closers Assist
          </Link>
        </div>
      </div>
    </div>
  );
}
