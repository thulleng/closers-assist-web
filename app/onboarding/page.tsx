"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Copy,
  MessageCircle,
  Sparkles,
  Zap,
  Smartphone,
  Monitor,
  ExternalLink,
} from "lucide-react";
import FadeIn from "@/components/FadeIn";
import Counter from "@/components/Counter";

function OnboardingContent() {
  const searchParams = useSearchParams();
  const email = searchParams?.get("email") || "";

  return (
    <div className="relative min-h-screen overflow-hidden loud-bg">
      <div className="grid-pattern" />
      <div className="grain" />

      <div className="relative mx-auto max-w-4xl px-6 py-20 md:py-28">
        {/* STEP 1 — Welcome */}
        <FadeIn>
          <div className="text-center">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-deal/40 bg-deal/10 px-3.5 py-1.5 backdrop-blur">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-deal opacity-75 pulse-ring" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-deal" />
              </span>
              <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-deal-light">
                Subscription active
              </span>
            </div>
            <h1 className="font-display text-[42px] font-black leading-[0.95] tracking-[-0.02em] text-white md:text-[64px]">
              Welcome to
              <br />
              <span className="text-shine font-black">Closers Assist.</span>
            </h1>
            <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-ash">
              {email ? (
                <>
                  <span className="font-semibold text-white">{email}</span>{" "}
                  &mdash; you&rsquo;re set up.
                </>
              ) : (
                "You&rsquo;re set up."
              )}{" "}
              Now pick your floor.
            </p>
          </div>
        </FadeIn>

        {/* STEP 2 — Pick your platform */}
        <FadeIn delay={150}>
          <div className="mt-16 grid gap-5 sm:grid-cols-2">
            {/* Telegram option */}
            <div className="loud-card group relative overflow-hidden rounded-2xl p-7 ring-2 ring-deal/40 shadow-[0_0_40px_rgba(16,185,129,0.2)]">
              <div className="absolute right-4 top-4 rounded-full border border-deal/40 bg-deal/20 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-deal-light">
                Fastest
              </div>
              <div
                className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl shadow-[0_8px_24px_rgba(16,185,129,0.3)]"
                style={{
                  background: "linear-gradient(135deg, #10B981, #059669)",
                }}
              >
                <SendIcon className="h-7 w-7 text-white" />
              </div>
              <h3 className="mb-2 font-display text-2xl font-black text-white">
                Telegram
              </h3>
              <p className="mb-5 text-sm leading-relaxed text-ash">
                Open Telegram on any device. Your agent lives in your chat list
                — just like texting a friend. No new app. No login. Instant.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-ash">
                  <Smartphone className="h-4 w-4 text-deal-light" />
                  Works on phone, tablet, desktop
                </div>
                <div className="flex items-center gap-2 text-sm text-ash">
                  <Zap className="h-4 w-4 text-deal-light" />
                  Under 3 seconds per response
                </div>
                <div className="flex items-center gap-2 text-sm text-ash">
                  <MessageCircle className="h-4 w-4 text-deal-light" />
                  Feels like texting a closer
                </div>
              </div>
              <a
                href="https://t.me/CloseBot"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-deal px-5 py-3.5 text-[15px] font-bold text-white shadow-[0_8px_24px_rgba(16,185,129,0.4)] transition-all hover:shadow-[0_12px_32px_rgba(16,185,129,0.5)]"
              >
                Open in Telegram
                <ExternalLink className="h-4 w-4" />
              </a>
              <p className="mt-3 text-center text-[11px] text-muted">
                Or search{" "}
                <span className="font-mono text-deal-light">@CloseBot</span> in
                Telegram
              </p>
            </div>

            {/* Web option */}
            <div className="loud-card group relative overflow-hidden rounded-2xl p-7">
              <div
                className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl shadow-[0_8px_24px_rgba(251,191,36,0.25)]"
                style={{
                  background: "linear-gradient(135deg, #FBBF24, #D97706)",
                }}
              >
                <Monitor className="h-7 w-7 text-[#422006]" />
              </div>
              <h3 className="mb-2 font-display text-2xl font-black text-white">
                Web App
              </h3>
              <p className="mb-5 text-sm leading-relaxed text-ash">
                Full dashboard. Deal board. Commission tracking. Pipeline view.
                Everything on one screen when you&rsquo;re at your desk.
              </p>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm text-ash">
                  <Monitor className="h-4 w-4 text-gold-light" />
                  Dashboard + deal board
                </div>
                <div className="flex items-center gap-2 text-sm text-ash">
                  <Sparkles className="h-4 w-4 text-gold-light" />
                  Commission tracking &amp; history
                </div>
                <div className="flex items-center gap-2 text-sm text-ash">
                  <Copy className="h-4 w-4 text-gold-light" />
                  Export scripts, plays, and notes
                </div>
              </div>
              <Link
                href="/dashboard/auto"
                className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-xl border-2 border-gold-light bg-gold-light/10 px-5 py-3.5 text-[15px] font-bold text-gold-light transition-all hover:bg-gold-light/20"
              >
                Open Dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
              <p className="mt-3 text-center text-[11px] text-muted">
                Best on desktop. Mobile-friendly.
              </p>
            </div>
          </div>
        </FadeIn>

        {/* STEP 3 — Quick start checklist */}
        <FadeIn delay={300}>
          <div className="mt-20">
            <div className="mb-8 text-center">
              <h2 className="font-display text-3xl font-black text-white sm:text-5xl">
                Your first 5 minutes
              </h2>
              <p className="mt-3 text-ash">
                Do these three things and you&rsquo;re dangerous.
              </p>
            </div>
            <div className="grid gap-4 sm:grid-cols-3">
              {[
                {
                  step: "1",
                  title: "Pick your industry",
                  body: "Tell the agent what you sell. It loads your world instantly — pay plans, scripts, objections.",
                  done: true,
                },
                {
                  step: "2",
                  title: "Upload your pay plan",
                  body: "Snap a photo. The agent reads it. Now every deal math is automatic.",
                  done: false,
                },
                {
                  step: "3",
                  title: "Use it on a live deal",
                  body: "Next customer objection you get — type it in. Watch it work in real time.",
                  done: false,
                },
              ].map((item) => (
                <div key={item.step} className="loud-card rounded-2xl p-6">
                  <div className="mb-3 flex items-center gap-3">
                    <div
                      className={`flex h-8 w-8 items-center justify-center rounded-full font-display text-sm font-black ${
                        item.done
                          ? "bg-deal text-white"
                          : "bg-white/10 text-ash"
                      }`}
                    >
                      {item.done ? "✓" : item.step}
                    </div>
                    <h4 className="font-bold text-white">{item.title}</h4>
                  </div>
                  <p className="text-sm leading-relaxed text-ash">
                    {item.body}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </FadeIn>

        {/* STEP 4 — The numbers */}
        <FadeIn delay={450}>
          <div className="mt-20 rounded-2xl border border-white/8 bg-black/40 p-8 backdrop-blur">
            <div className="mb-5 text-center text-[10px] font-bold uppercase tracking-[2px] text-ash">
              Your math, starting now
            </div>
            <div className="grid grid-cols-3 gap-3 sm:gap-6">
              <div className="text-center">
                <Counter
                  to={29.99}
                  decimals={2}
                  prefix="$"
                  duration={2000}
                  className="font-display text-[28px] font-black leading-none tracking-[-0.03em] text-mega sm:text-[40px] md:text-[48px]"
                />
                <div className="mt-1 text-[9px] font-semibold uppercase tracking-wider text-ash">
                  Per month
                </div>
              </div>
              <div className="border-x border-white/10 text-center">
                <div className="font-display text-[28px] font-black leading-none tracking-[-0.03em] text-mega sm:text-[40px] md:text-[48px]">
                  &lt;3s
                </div>
                <div className="mt-1 text-[9px] font-semibold uppercase tracking-wider text-ash">
                  Question to play
                </div>
              </div>
              <div className="text-center">
                <div className="font-display text-[28px] font-black leading-none tracking-[-0.03em] text-mega sm:text-[40px] md:text-[48px]">
                  18
                </div>
                <div className="mt-1 text-[9px] font-semibold uppercase tracking-wider text-ash">
                  Industries
                </div>
              </div>
            </div>
          </div>
        </FadeIn>

        {/* STEP 5 — Pro tip */}
        <FadeIn delay={600}>
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-4 py-2">
              <span className="text-sm text-gold-light">💡</span>
              <span className="text-sm font-medium text-ash">
                Pro tip: Pin the Telegram bot. It&rsquo;s faster than opening an
                app.
              </span>
            </div>
            <div className="mt-8">
              <Link
                href="/telegram"
                className="inline-flex items-center gap-2 text-sm text-ash hover:text-white transition-colors underline underline-offset-4"
              >
                How to link Telegram to your account
                <ArrowRight className="h-3 w-3" />
              </Link>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
}

function SendIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z" />
    </svg>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center loud-bg">
          <div className="h-8 w-8 animate-spin rounded-full border-2 border-deal border-t-transparent" />
        </div>
      }
    >
      <OnboardingContent />
    </Suspense>
  );
}
