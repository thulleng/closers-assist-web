"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  ArrowRight,
  Gift,
  Users,
  DollarSign,
  Copy,
  CheckCircle2,
  Share2,
  MessageCircle,
  TrendingUp,
  Trophy,
  Star,
  BarChart3,
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

// Mock leaderboard — would come from Supabase
const topReferrers = [
  { name: "Thul L.", referrals: 12, badge: "🔥" },
  { name: "Mike R.", referrals: 8, badge: "⭐" },
  { name: "Jenna C.", referrals: 6, badge: "🚀" },
  { name: "David K.", referrals: 4, badge: "💪" },
  { name: "Lisa M.", referrals: 3, badge: "👏" },
];

function ReferralContent() {
  const searchParams = useSearchParams();
  const refCode = (searchParams?.get("ref") || "").toUpperCase();
  const referrer = REFERRERS[refCode] || null;
  const [copied, setCopied] = useState(false);
  const [showShareSheet, setShowShareSheet] = useState(false);
  const [referralLink, setReferralLink] = useState("");

  useEffect(() => {
    const base = typeof window !== "undefined" ? window.location.origin : "https://closersassist.com";
    setReferralLink(`${base}/referral?ref=${refCode || "THUL"}`);
  }, [refCode]);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(referralLink);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // fallback
      const input = document.createElement("input");
      input.value = referralLink;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      document.body.removeChild(input);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const shareViaText = () => {
    const text = `You gotta try this. It's an AI closer that handles deals AND your life. Built by a Toyota rep. https://closersassist.com/referral?ref=${refCode || "THUL"}`;
    const smsUrl = `sms:?&body=${encodeURIComponent(text)}`;
    window.open(smsUrl, "_blank");
    setShowShareSheet(false);
  };

  const shareGeneric = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Closers Assist — The AI agent every closer owns.",
          text: `You gotta try this. An AI closer that handles deals AND your life. Built by a working rep.`,
          url: referralLink,
        });
      } catch {}
    } else {
      copyLink();
    }
    setShowShareSheet(false);
  };

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

        {/* Main offer card */}
        <FadeIn delay={150}>
          <div className="mx-auto max-w-2xl">
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

              {/* Stats — show for everyone */}
              <div className="mt-6 grid grid-cols-3 gap-4 border-t border-white/10 pt-6">
                <div className="text-center">
                  <div className="font-display text-2xl font-black text-mega">$10</div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-ash">
                    Per signup
                  </div>
                </div>
                <div className="text-center border-x border-white/10">
                  <div className="font-display text-2xl font-black text-mega">1 mo</div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-ash">
                    Free for 5 refs
                  </div>
                </div>
                <div className="text-center">
                  <div className="font-display text-2xl font-black text-gold-light">∞</div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-ash">
                    Stack unlimited
                  </div>
                </div>
              </div>
            </div>

            {/* Share link card — only for non-referred visitors */}
            {!referrer && (
              <div className="mt-6 loud-card rounded-2xl overflow-hidden border border-white/5">
                <div className="px-6 py-4 border-b border-white/5 flex items-center gap-2 bg-white/[0.02]">
                  <Share2 className="h-4 w-4 text-deal-light" strokeWidth={2.2} />
                  <span className="text-xs font-bold uppercase tracking-wider text-deal-light">Your link</span>
                </div>
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="flex-1 bg-black/40 rounded-xl border border-white/10 px-4 py-3 text-sm text-white/70 font-mono truncate">
                      {referralLink || "closersassist.com/referral?ref=THUL"}
                    </div>
                    <button
                      onClick={copyLink}
                      className="flex items-center gap-2 rounded-xl bg-deal/20 hover:bg-deal/30 border border-deal/30 px-4 py-3 text-sm font-semibold text-deal-light transition-all active:scale-95"
                    >
                      {copied ? (
                        <CheckCircle2 className="h-4 w-4" strokeWidth={2.5} />
                      ) : (
                        <Copy className="h-4 w-4" strokeWidth={2.5} />
                      )}
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>

                  {/* Share buttons */}
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={shareViaText}
                      className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-3 text-sm font-medium text-bone transition-all active:scale-95"
                    >
                      <MessageCircle className="h-4 w-4" strokeWidth={2.2} />
                      Share via Text
                    </button>
                    <button
                      onClick={shareGeneric}
                      className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-3 text-sm font-medium text-bone transition-all active:scale-95"
                    >
                      <Share2 className="h-4 w-4" strokeWidth={2.2} />
                      Share
                    </button>
                    <button
                      onClick={copyLink}
                      className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-deal/20 hover:bg-deal/30 border border-deal/30 px-4 py-3 text-sm font-semibold text-deal-light transition-all active:scale-95"
                    >
                      {copied ? (
                        <CheckCircle2 className="h-4 w-4" strokeWidth={2.5} />
                      ) : (
                        <DollarSign className="h-4 w-4" strokeWidth={2.5} />
                      )}
                      {copied ? "Copied!" : "Earn $10"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </FadeIn>

        {/* Leaderboard — social proof */}
        <FadeIn delay={300}>
          <div className="mt-20">
            <div className="mb-8 text-center">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-deal/30 bg-deal/10 px-3.5 py-1.5">
                <Trophy className="h-3.5 w-3.5 text-deal-light" strokeWidth={2.5} />
                <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-deal-light">
                  Top Referrers
                </span>
              </div>
              <h2 className="font-display text-3xl font-black text-white sm:text-5xl">
                Closers help closers
              </h2>
              <p className="mt-2 text-ash text-sm max-w-md mx-auto">
                The more you share, the higher you climb. These closers are stacking credit.
              </p>
            </div>
            <div className="mx-auto max-w-lg loud-card rounded-2xl overflow-hidden border border-white/5">
              {/* Header */}
              <div className="grid grid-cols-[40px,1fr,80px] gap-2 px-5 py-3 border-b border-white/5 bg-white/[0.02] text-[10px] font-bold uppercase tracking-widest text-muted">
                <div></div>
                <div>Name</div>
                <div className="text-right">Referred</div>
              </div>
              {/* Rows */}
              {topReferrers.map((r, i) => (
                <div
                  key={r.name}
                  className="grid grid-cols-[40px,1fr,80px] gap-2 px-5 py-3 border-b border-white/5 last:border-0 hover:bg-white/[0.02] transition-colors"
                >
                  <div className="flex items-center">
                    {i === 0 ? (
                      <span className="text-lg">🏆</span>
                    ) : i === 1 ? (
                      <span className="text-lg">🥈</span>
                    ) : i === 2 ? (
                      <span className="text-lg">🥉</span>
                    ) : (
                      <span className="text-sm text-muted">{i + 1}</span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white">{r.name}</span>
                    <span className="text-xs">{r.badge}</span>
                  </div>
                  <div className="flex items-center justify-end gap-1">
                    <BarChart3 className="h-3 w-3 text-deal" strokeWidth={2.5} />
                    <span className="text-sm font-bold text-deal">{r.referrals}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* How it works */}
        <FadeIn delay={400}>
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
