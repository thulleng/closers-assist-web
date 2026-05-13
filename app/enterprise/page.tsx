"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Calendar, Users, Zap, Shield, Bot, ArrowRight } from "lucide-react";
import { EnterpriseBookingForm } from "@/components/EnterpriseBookingForm";

const INCLUDES = [
  "Dedicated AI agent built for your dealership, brokerage, or team",
  "Custom-trained on YOUR scripts, objections, pay plan, and process",
  "Unlimited seats — every rep on your floor gets access",
  "CRM integration — connects to your existing system (VinSolutions, DealerSocket, etc.)",
  "Weekly optimization — we review and improve your agent every single week",
  "24/7 monitoring — if it breaks, we fix it before you notice",
  "Priority support — direct line to founder (Thul)",
  "90-day onboarding sprint — white-glove setup with weekly training",
];

const ADVANTAGES = [
  {
    icon: Bot,
    title: "An AI employee, not software",
    description:
      "You're not buying a tool. You're getting a digital closer who knows your floor, your inventory, and your plays. It shows up every day, never calls out sick, and gets better every week.",
  },
  {
    icon: Shield,
    title: "We handle everything",
    description:
      "Hosting, tokens, models, updates, security, integrations — none of it touches your plate. Your only job is to point it at your team and watch the numbers climb.",
  },
  {
    icon: Zap,
    title: "Live in 48 hours",
    description:
      "First agent live within two business days. We don't spend months in onboarding hell. Quick win, then iterate fast.",
  },
  {
    icon: Users,
    title: "Unlimited reps, one price",
    description:
      "$5,000/month covers your entire floor. 5 reps or 50 — same investment. Flat, predictable, no per-seat surprises.",
  },
];

const FAQ = [
  {
    q: "How is this different from the $29.99 Starter plan?",
    a: "Starter is self-serve — you log in, configure your agent, and run it yourself. Enterprise is done-for-you — we build, host, tune, and monitor a dedicated agent for your business. You don't touch a single setting.",
  },
  {
    q: "What CRMs do you integrate with?",
    a: "VinSolutions, DealerSocket, Elead, Reynolds, CDK, and most major auto CRMs. Don't see yours? We'll build the connector.",
  },
  {
    q: "How long until we see results?",
    a: "Most teams see lift within the first two weeks — your agent starts providing scripts and objection handlers immediately. Full optimization takes 90 days as it learns your floor's rhythm.",
  },
  {
    q: "Can we cancel anytime?",
    a: "Yes. Month-to-month. No long-term contract. But no one's canceled yet — your team becomes dependent on the agent pretty fast.",
  },
  {
    q: "Do you work with non-auto industries?",
    a: "Absolutely. Real estate, solar, HVAC, insurance, mortgage — if you run a sales floor, we can build for it.",
  },
];

export default function EnterprisePage() {
  const [calOpen, setCalOpen] = useState(false);

  return (
    <main className="min-h-screen bg-[#050506] text-white">
      {/* ── Hero ──────────────────────────────────────────── */}
      <section className="relative pt-32 pb-20 px-4 text-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-[#10B981]/5 via-transparent to-transparent" />
        <div className="relative max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#10B981]/10 border border-[#10B981]/20 text-[#10B981] text-sm font-medium mb-6">
            <Zap className="w-3.5 h-3.5" />
            Done-for-you AI agent service
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-[1.1] mb-6">
            Your AI Closer.
            <br />
            <span className="text-[#10B981]">Built. Hosted. Managed.</span>
          </h1>

          <p className="text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto mb-10">
            Stop buying software. Hire a digital employee who knows your
            scripts, handles every objection, and gets smarter every week — for
            less than one bad month of floor commissions.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#book"
              className="inline-flex items-center gap-2 bg-[#10B981] hover:bg-[#059669] text-black font-semibold px-8 py-4 rounded-xl text-lg transition-colors"
            >
              <Calendar className="w-5 h-5" />
              Book a Call
            </a>
            <Link
              href="/pricing"
              className="text-gray-400 hover:text-white transition-colors text-sm"
            >
              Prefer self-serve? Starter from $29.99/mo →
            </Link>
          </div>
        </div>
      </section>

      {/* ── What You Get ──────────────────────────────────── */}
      <section className="py-20 px-4 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">
          What's included at{" "}
          <span className="text-[#FBBF24]">$5,000/month</span>
        </h2>
        <p className="text-gray-400 text-center mb-12 max-w-xl mx-auto">
          Flat. Unlimited. One investment covers your entire team.
        </p>

        <div className="grid sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {INCLUDES.map((item, i) => (
            <div
              key={i}
              className="flex gap-3 bg-white/[0.03] border border-white/[0.06] rounded-xl p-4"
            >
              <Check className="w-5 h-5 text-[#10B981] shrink-0 mt-0.5" />
              <span className="text-gray-300 text-sm">{item}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Why Enterprise ─────────────────────────────────── */}
      <section className="py-20 px-4 max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          Why go Enterprise?
        </h2>

        <div className="grid sm:grid-cols-2 gap-6">
          {ADVANTAGES.map((adv, i) => (
            <div
              key={i}
              className="bg-white/[0.03] border border-white/[0.06] rounded-xl p-6"
            >
              <div className="w-10 h-10 bg-[#10B981]/10 rounded-lg flex items-center justify-center mb-4">
                <adv.icon className="w-5 h-5 text-[#10B981]" />
              </div>
              <h3 className="text-white font-semibold mb-2">{adv.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                {adv.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Booking ───────────────────────────────────────── */}
      <section id="book" className="py-20 px-4 max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-4">Let's talk</h2>
        <p className="text-gray-400 mb-10 max-w-lg mx-auto">
          No demos. No slide decks. Just a 15-minute call about your team, your
          floor, and how an AI closer can move the needle.
        </p>

        <EnterpriseBookingForm />

        <p className="text-gray-600 text-sm mt-8">
          Prefer email?{" "}
          <a
            href="mailto:thul@closersassist.com"
            className="text-[#10B981] hover:underline"
          >
            thul@closersassist.com
          </a>
        </p>
      </section>

      {/* ── FAQ ────────────────────────────────────────────── */}
      <section className="py-20 px-4 max-w-3xl mx-auto">
        <h2 className="text-xl font-bold text-center mb-8">
          Quick Answers
        </h2>
        <div className="space-y-3">
          {FAQ.map((item, i) => (
            <details
              key={i}
              className="group bg-white/[0.03] border border-white/[0.06] rounded-xl"
            >
              <summary className="flex items-center justify-between px-5 py-4 cursor-pointer text-sm font-medium text-gray-200">
                {item.q}
                <span className="text-gray-500 group-open:rotate-45 transition-transform text-lg leading-none ml-2">
                  +
                </span>
              </summary>
              <p className="px-5 pb-4 text-sm text-gray-400 leading-relaxed">
                {item.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ── Footer CTA ────────────────────────────────────── */}
      <section className="py-20 px-4 text-center">
        <p className="text-gray-600 text-sm">
          Already using ClosersAssist?{" "}
          <Link href="/dashboard" className="text-[#10B981] hover:underline">
            Go to Dashboard
          </Link>
        </p>
      </section>
    </main>
  );
}
