import type { Metadata } from "next";
import { CheckCircle2, Gift, Mail, Sparkles, Users } from "lucide-react";
import EmailCapture from "@/components/EmailCapture";

export const metadata: Metadata = {
  title: "Refer & Earn | Deal Clozr",
  description:
    "Refer closers to Deal Clozr and earn $10 credit per signup, plus a free month when five friends join.",
};

const rewards = [
  {
    icon: Gift,
    title: "$10 credit per signup",
    description:
      "Share Deal Clozr with another closer. When they sign up, you earn $10 in account credit.",
  },
  {
    icon: Users,
    title: "Free month at 5 referrals",
    description:
      "Hit five successful referrals and we will add a free month to your Deal Clozr account.",
  },
  {
    icon: Sparkles,
    title: "Built for closers",
    description:
      "Send your link to reps, managers, brokers, agents, or anyone who lives by the follow-up.",
  },
];

const steps = [
  "Drop your email below.",
  "We send your referral link.",
  "Share it with closers who want more deals.",
  "Stack credits as signups come in.",
];

export default function ReferralPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050506] text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.18),transparent_34%),radial-gradient(circle_at_top_right,rgba(251,191,36,0.14),transparent_30%),linear-gradient(180deg,rgba(255,255,255,0.03),transparent_45%)]" />
      <div className="grid-pattern opacity-40" />
      <div className="grain" />

      <section className="relative mx-auto flex min-h-screen max-w-6xl items-center px-6 py-20">
        <div className="grid w-full gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:items-center">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#10B981]/35 bg-[#10B981]/10 px-4 py-2 backdrop-blur">
              <Gift className="h-4 w-4 text-[#10B981]" strokeWidth={2.5} />
              <span className="text-[11px] font-bold uppercase tracking-[1.8px] text-[#6EE7B7]">
                Refer & Earn
              </span>
            </div>

            <h1 className="font-display text-5xl font-black leading-[0.96] tracking-[-0.04em] text-white sm:text-6xl lg:text-7xl">
              Share Deal Clozr.
              <br />
              <span className="text-shine font-black">Earn every signup.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ash sm:text-xl">
              Bring another closer into Deal Clozr and get rewarded. Earn{" "}
              <span className="font-bold text-[#10B981]">$10 credit for every signup</span>{" "}
              and unlock <span className="font-bold text-[#FBBF24]">a free month at 5 referrals</span>.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl border border-[#10B981]/25 bg-[#10B981]/10 p-5">
                <div className="font-display text-4xl font-black text-[#10B981]">$10</div>
                <p className="mt-1 text-sm font-semibold uppercase tracking-[1.4px] text-[#6EE7B7]">
                  Credit per signup
                </p>
              </div>
              <div className="rounded-2xl border border-[#FBBF24]/25 bg-[#FBBF24]/10 p-5">
                <div className="font-display text-4xl font-black text-[#FBBF24]">5 refs</div>
                <p className="mt-1 text-sm font-semibold uppercase tracking-[1.4px] text-[#FDE68A]">
                  Free month unlocked
                </p>
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 shadow-2xl shadow-[#10B981]/10 backdrop-blur md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-[#10B981]/15 text-[#10B981] ring-1 ring-[#10B981]/30">
                <Mail className="h-5 w-5" strokeWidth={2.5} />
              </div>
              <div>
                <h2 className="font-display text-2xl font-black text-white">
                  Get your referral link
                </h2>
                <p className="text-sm text-ash">Enter your email and we will send the link.</p>
              </div>
            </div>

            <EmailCapture
              placeholder="your@email.com"
              buttonText="Send My Link"
              className="w-full"
            />

            <div className="mt-8 border-t border-white/10 pt-6">
              <h3 className="mb-4 text-sm font-bold uppercase tracking-[1.6px] text-[#FBBF24]">
                How it works
              </h3>
              <div className="space-y-3">
                {steps.map((step) => (
                  <div key={step} className="flex items-start gap-3 text-sm text-bone">
                    <CheckCircle2
                      className="mt-0.5 h-4 w-4 flex-none text-[#10B981]"
                      strokeWidth={2.5}
                    />
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative border-t border-white/5 px-6 pb-20">
        <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-3">
          {rewards.map((reward) => {
            const Icon = reward.icon;

            return (
              <div
                key={reward.title}
                className="rounded-2xl border border-white/10 bg-white/[0.035] p-6 backdrop-blur"
              >
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-xl bg-[#10B981]/10 text-[#10B981] ring-1 ring-[#10B981]/25">
                  <Icon className="h-5 w-5" strokeWidth={2.5} />
                </div>
                <h3 className="font-display text-xl font-black text-white">{reward.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ash">{reward.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="relative border-t border-white/5 px-6 py-16 text-center">
        <h2 className="font-display text-3xl font-black text-white md:text-4xl">
          Already seeing results?
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-ash">
          See what other closers are saying about Deal Clozr.
        </p>
        <Link
          href="/reviews"
          className="mt-6 inline-flex items-center gap-2 rounded-xl border border-white/10 px-6 py-3 text-sm font-medium text-ash hover:text-white hover:border-white/20 transition-all"
        >
          Read reviews →
        </Link>
      </section>
    </main>
  );
}
