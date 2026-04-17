import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Closers Assist privacy policy — how we handle your data.",
};

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-ash">
            Last updated: April 17, 2026
          </p>
        </div>

        <div className="space-y-10 text-[15px] leading-relaxed text-ash">
          <section>
            <h2 className="mb-4 text-xl font-bold text-white">
              1. What we collect
            </h2>
            <p>
              Closers Assist collects information you provide directly — your
              name, email address, and any data you upload to your personal
              agent layer (pay plans, scripts, customer notes). We also collect
              standard usage data (pages visited, features used, device type)
              to improve the product.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold text-white">
              2. How we use it
            </h2>
            <p>
              We use your data to power your AI agent, improve our product, and
              communicate with you about your account. We do not sell your data
              to third parties. We do not share your personal agent data
              (scripts, customers, pay plans) with other users.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold text-white">
              3. Your data is yours
            </h2>
            <p>
              You own everything you upload to your personal layer. You can
              export or delete your data at any time from your account settings.
              If you cancel, we retain your data for 30 days then permanently
              delete it unless you request earlier deletion.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold text-white">
              4. AI processing
            </h2>
            <p>
              Your conversations with your Closers Assist agent are processed
              by Anthropic&rsquo;s Claude API. By using Closers Assist, you
              agree to{" "}
              <a
                href="https://www.anthropic.com/legal/privacy"
                className="text-deal-light hover:text-white underline"
                target="_blank"
                rel="noopener noreferrer"
              >
                Anthropic&rsquo;s privacy policy
              </a>{" "}
              as it applies to API usage.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold text-white">
              5. Security
            </h2>
            <p>
              We use industry-standard encryption for data in transit and at
              rest. Your personal agent layer is isolated per user — no other
              rep can access your data.
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-xl font-bold text-white">
              6. Contact
            </h2>
            <p>
              Questions about privacy? Email us at{" "}
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
