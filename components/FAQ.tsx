"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import Link from "next/link";

interface FAQItem {
  q: string;
  a: React.ReactNode;
}

const faqs: FAQItem[] = [
  {
    q: "How is this different from ChatGPT?",
    a: (
      <>
        ChatGPT is a general-purpose AI — it doesn't know your pay plan, your
        scripts, your customers, or your industry. Closers Assist is an{" "}
        <strong className="text-white">AI employee</strong> built specifically for
        closers. It knows your commission structure, remembers every customer
        conversation, and speaks your industry's language. ChatGPT starts
        from zero every chat. Closers Assist picks up where you left off.
      </>
    ),
  },
  {
    q: "Is my data private? Do you train on my conversations?",
    a: (
      <>
        <strong className="text-white">Your data stays yours.</strong> We do
        not train AI models on your conversations, your customer data, or your
        deal history. Your data is encrypted in transit and at rest. You can
        export or delete everything at any time. Read our{" "}
        <Link href="/privacy" className="text-deal underline hover:text-deal-light">
          Privacy Policy
        </Link>{" "}
        for full details.
      </>
    ),
  },
  {
    q: "What if the AI gives bad advice on a deal?",
    a: (
      <>
        Closers Assist is a <strong className="text-white">co-pilot, not a replacement</strong>{" "}
        for your judgment. It gives you plays, scripts, and math — you make the
        final call. It's trained on real sales scripts and objection
        handling from working reps, not generic advice from the internet. If it
        ever gives a play that doesn't fit your style, you override it.
        The agent learns from your corrections.
      </>
    ),
  },
  {
    q: "My team barely uses our CRM. Why would they use this?",
    a: (
      <>
        Because it's <strong className="text-white">Telegram.</strong> Not
        another tab, not another login, not another dashboard. Your team already
        texts — Closers Assist is just another chat. Type a question, get a
        play. No training. No IT ticket. No “where do I click?”
        Reps adopt it in under 2 minutes because there's nothing to learn.
      </>
    ),
  },
  {
    q: "What happens after the 14-day trial?",
    a: (
      <>
        You choose to continue or cancel. <strong className="text-white">No surprise billing.</strong>{" "}
        If you stay, you're billed monthly starting on day 15. Cancel
        anytime — no contracts, no early termination fees, no “talk to
        retention.” One click and you're done. Your data is yours to
        export.
      </>
    ),
  },
  {
    q: "What industries does it actually work for?",
    a: (
      <>
        <strong className="text-white">18 industries</strong> with live agents
        ready today: Auto, Real Estate, Insurance, Solar, SaaS, Medical
        Devices, Retail (Big Ticket), Pest Control, HVAC, Roofing, Home
        Security, Mortgage & Lending, Financial Advisors, Recruiting,
        Telecom, Rental, Project Manager, and General Sales. Each industry
        agent ships with industry-specific scripts, objection handling, and
        vocabulary.{" "}
        <Link href="/industries" className="text-deal underline hover:text-deal-light">
          See all industries →
        </Link>
      </>
    ),
  },
  {
    q: "Does it integrate with my CRM?",
    a: (
      <>
        Yes — for Enterprise customers ($5K/mo). We build a{" "}
        <strong className="text-white">custom CRM integration</strong> as part
        of your 48-hour white-glove setup. For Starter and Pro tiers, CRM sync
        is available as a skill add-on. The agent can also work alongside your
        CRM without direct integration — just tell it what happened and it
        remembers.
      </>
    ),
  },
  {
    q: "What's the onboarding like? How fast can I start?",
    a: (
      <>
        <strong className="text-white">Under 5 minutes.</strong> Pick your
        industry. Tell us your pay plan, your scripts (optional), and your
        goals. Deploy on Telegram. Start closing. No onboarding call required.
        Enterprise customers get a dedicated 48-hour white-glove setup with
        custom scripts, CRM integration, and team rollout.
      </>
    ),
  },
  {
    q: "Can I cancel anytime? Really?",
    a: (
      <>
        <strong className="text-white">Yes. One click.</strong> No retention
        calls. No “are you sure?” popups. No contracts. We're
        confident enough in the product that we don't need to trap you. If
        it doesn't work for your floor, cancel and walk away. Your data is
        exportable before you go.
      </>
    ),
  },
  {
    q: "What if I have a question the AI can't answer?",
    a: (
      <>
        For Starter and Pro customers, our support team responds within 24
        hours. For Enterprise customers, you get{" "}
        <strong className="text-white">priority support with a dedicated rep</strong>{" "}
        who knows your account. The AI also gets smarter over time — it learns
        from your corrections and the questions you ask, so the longer you use
        it, the less often you'll need to escalate.
      </>
    ),
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section className="relative overflow-hidden loud-bg-alt border-t border-white/5">
      {/* Grid pattern overlay */}
      <div className="grid-pattern opacity-40 pointer-events-none absolute inset-0" />

      <div className="relative mx-auto max-w-3xl px-6 py-20 md:py-28">
        {/* Header */}
        <div className="mb-12 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-deal/30 bg-deal/10 px-3.5 py-1.5">
            <HelpCircle className="h-3.5 w-3.5 text-deal-light" strokeWidth={2.5} />
            <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-deal-light">
              FAQ
            </span>
          </div>
          <h2 className="font-display text-3xl font-black leading-[1.05] tracking-[-0.02em] text-white sm:text-5xl">
            Everything you'd ask
            <span className="text-shine font-black"> on a call.</span>
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-ash">
            Real questions from real closers. No marketing fluff.
          </p>
        </div>

        {/* FAQ accordion */}
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="loud-card rounded-xl overflow-hidden border border-white/5 transition-all duration-200 hover:border-white/10"
            >
              <button
                onClick={() => toggle(i)}
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left"
              >
                <span className="text-[15px] font-semibold text-white leading-snug">
                  {faq.q}
                </span>
                <ChevronDown
                  className={`h-4 w-4 flex-shrink-0 text-ash transition-transform duration-200 ${
                    openIndex === i ? "rotate-180" : ""
                  }`}
                  strokeWidth={2.5}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  openIndex === i ? "max-h-96 pb-5 px-6" : "max-h-0"
                }`}
              >
                <div className="text-[14px] leading-relaxed text-ash border-t border-white/5 pt-4">
                  {faq.a}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Footer CTA */}
        <div className="mt-10 text-center">
          <p className="text-sm text-muted">
            Still have questions?{" "}
            <Link
              href="/contact"
              className="text-deal underline hover:text-deal-light font-medium"
            >
              Talk to us directly →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
