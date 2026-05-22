"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowRight,
  Gift,
  Users,
  DollarSign,
  Copy,
  CheckCircle2,
} from "lucide-react";
import Link from "next/link";
import FadeIn from "@/components/FadeIn";
import EmailCapture from "@/components/EmailCapture";

// In a real app this would be in Supabase. For now, early access referrers.
const REFERRERS: Record<string, { name: string; role: string }> = {
  THUL: { name: "Thul Leng", role: "Sun Toyota · Founder" },
  ALEX: { name: "Alex M.", role: "Insurance Agent · Beta User" },
  SARAH: { name: "Sarah K.", role: "Real Estate · Beta User" },
};

function ReferralContent() {
  const searchParams = useSearchParams();
  const refCode = (searchParams?.get("ref") || "").toUpperCase();
  const referrer = REFERRERS[refCode] || null;
  const [copied, setCopied] = useState(false);

  const referralLink = typeof window !== "undefined"
    ? `${window.location.origin}/referral?ref=${refCode || "THUL"}`
    : "";

  return (
    <div className="relative min-h-screen overflow-hidden loud-bg">
      <div className="grid-pattern" />
      <div className="grain" />

      <div className="relative mx-auto max-w-4xl px-6 py-20 md:py-28">
        {/* Referral badge */}
        {referrer && (
          <FadeIn>
            <div className="mb-12 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1.5 backdrop-blur">
                <Gift className="h-3.5 w-3.5 text-gold-light" strokeWidth={2.5} />
                <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-gold-light">
                  Referral from {referrer.name}
                </span>
              </div>
              <h1 className="font-display text-[42px] font-black leading-[0.95] tracking-[-0.02em] text-white md:text-[64px]">
                {referrer.name} thinks you
                <br />
                <span className="text-shine font-black">should close more.</span>
              </h1>
              <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-ash">
                {referrer.name} ({referrer.role}) uses Closers Assist to close
                more deals. They sent you here because closers share what works.
              </p>
            </div>
          </FadeIn>
        )}

        {!referrer && (
          <FadeIn>
            <div className="mb-12 text-center">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-deal/40 bg-deal/10 px-3.5 py-1.5 backdrop-blur">
                <Users className="h-3.5 w-3.5 text-deal-light" strokeWidth={2.5} />
                <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-deal-light">
                  Refer & Earn
                </span>
              </div>
              <h1 className="font-display text-[42px] font-black leading-[0.95] tracking-[-0.02em] text-white md:text-[64px]">
                Share the tool.
                <br />
                <span className="text-shine font-black">Get paid.</span>
              </h1>
              <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-ash">
                Every closer you bring in earns you credit. Salespeople talk.
                Now that talk pays.
              </p>
            </div>
          </FadeIn>
        )}

        {/* The offer */}
        <FadeIn delay={150}>
          <div className="mx-auto max-w-2xl">
            {/* Email capture */}
            <div className="loud-card rounded-2xl p-8">
              <h3 className="mb-2 font-display text-2xl font-black text-white">
                {referrer ? "Start your free trial" : "Get your referral link"}
              </h3>
              <p className="mb-5 text-sm text-ash">
                {referrer
                  ? "Enter your email. You'll be closing in 60 seconds."
                  : "Enter your email to get your unique referral link. Share it. Earn credit when they sign up."}
              </p>
              <EmailCapture
                placeholder="your@email.com"
                buttonText={referrer ? "Try It Free" : "Get My Link"}
              />

              {/* Referral stats — only show for non-referred visitors */}
              {!referrer && (
                <div className="mt-6 grid grid-cols-2 gap-4 border-t border-white/10 pt-6">
                  <div className="text-center">
                    <div className="font-display text-2xl font-black text-mega">
                      $10
                    </div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-ash">
                      Per signup
                    </div>
                  </div>
                  <div className="text-center border-l border-white/10">
                    <div className="font-display text-2xl font-black text-mega">
                      1 mo
                    </div>
                    <div className="text-[10px] font-semibold uppercase tracking-wider text-ash">
                      Free for 5 refs
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </FadeIn>

        {/* How it works */}
        <FadeIn delay={300}>
          <div className="mt-20">
            <div className="mb-8 text-center">
              <h2 className="font-display text-3xl font-black text-white sm:text-5xl">
                How it works
              </h2>
            </div>
            <div className="grid gap-6 sm:grid-cols-3">
              {[
                {
                  step: "01",
                  title: "Share your link",
                  body: "Text it. Post it. Drop it in your group chat. Your link tracks every signup.",
                },
                {
                  step: "02",
                  title: "They sign up",
                  body: "They get the full Closers Assist experience. No credit card. Instant access.",
                },
                {
                  step: "03",
                  title: "You get paid",
                  body: "$10 credit per signup. 5 referrals = 1 month free. Stack unlimited.",
                },
              ].map(({ step, title, body }) => (
                <div key={step} className="loud-card rounded-2xl p-6 text-center">
                  <div className="mb-3 font-display text-[28px] font-black text-shine">
                    {step}
                  </div>
                  <h4 className="font-bold text-white">{title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-ash">
                    {body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* Bottom CTA */}
        <FadeIn delay={450}>
          <div className="mt-16 text-center">
            <Link
              href="/pricing"
              className="btn-loud inline-flex items-center gap-2 rounded-xl px-8 py-4 text-lg"
            >
              See Pricing — $29.99/mo
              <ArrowRight className="h-5 w-5" />
            </Link>
            <p className="mt-4 text-sm text-muted">
              No credit card. Cancel anytime. Share the link, stack the credit.
            </p>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}

export default function ReferralPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center loud-bg">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-deal border-t-transparent" />
        </div>
      }
    >
      <ReferralContent />
    </Suspense>
  );
}
