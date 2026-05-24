import Link from "next/link";
import { ArrowRight, Smartphone, Zap, MessageCircle, Shield, CheckCircle2 } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "WhatsApp · Deal Clozr",
  description: "Deal Clozr on WhatsApp — your AI sales agent on the messaging app you already use. Same agent, same memory, same plays. Log deals, handle objections, track commissions.",
};

export default function WhatsAppPage() {
  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden loud-bg">
        <div className="grid-pattern opacity-40" />
        <div className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[500px] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(37,211,102,0.12), transparent 70%)" }} />
        <div className="pointer-events-none absolute -bottom-40 left-0 h-[400px] w-[400px] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(16,185,129,0.10), transparent 70%)" }} />

        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            {/* Left — copy */}
            <FadeIn>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-deal/40 bg-deal/20 px-3.5 py-1.5 backdrop-blur">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-deal opacity-75 pulse-ring" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-deal" />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-deal-light">
                  LIVE on WhatsApp
                </span>
              </div>

              <h1 className="font-display text-4xl font-black leading-[1.05] tracking-[-0.02em] text-white md:text-6xl">
                Your agent.
                <br />
                <span className="text-shine font-black">On WhatsApp.</span>
              </h1>

              <p className="mt-6 max-w-lg text-lg leading-relaxed text-ash">
                Same agent. Same memory. Same pay plan math. Now on WhatsApp —
                the app 2 billion people already use every day.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/dashboard/settings"
                  className="btn-loud group inline-flex items-center gap-2 rounded-xl px-8 py-5 text-lg"
                >
                  Link Your WhatsApp
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
                </Link>
              </div>

              <p className="mt-4 text-sm text-muted">
                Sign in to your dashboard. Add your number. Start closing from WhatsApp — same agent, same memory.
              </p>
            </FadeIn>

            {/* Right — phone mockup */}
            <FadeIn delay={150}>
              <div className="relative mx-auto max-w-sm">
                {/* Phone frame */}
                <div className="overflow-hidden rounded-[2.5rem] border-2 border-white/10 bg-[#0f0f0f] shadow-2xl">
                  {/* Status bar */}
                  <div className="flex items-center justify-between bg-[#075e54] px-6 py-3">
                    <span className="text-[10px] font-medium text-white/60">9:41</span>
                    <span className="text-[11px] font-bold text-white">Deal Clozr</span>
                    <span className="text-[10px] font-medium text-white/60">📶 🔋</span>
                  </div>

                  {/* Chat bubbles */}
                  <div className="space-y-4 px-4 py-5">
                    {/* Agent message 1 */}
                    <div className="flex items-start gap-2">
                      <div className="mt-1 h-7 w-7 flex-shrink-0 rounded-full bg-deal/20 flex items-center justify-center text-[10px] font-black text-deal">DC</div>
                      <div>
                        <div className="rounded-2xl rounded-tl-sm bg-[#1c1c1e] px-4 py-2.5">
                          <p className="text-[13px] leading-relaxed text-white/90">
                            Morning Thul. You're at 7.5 units — 3.5 from the $500 bonus at 11. What's the play today?
                          </p>
                        </div>
                        <span className="mt-1 block text-[9px] text-white/30">8:02 AM</span>
                      </div>
                    </div>

                    {/* User message */}
                    <div className="flex items-start justify-end gap-2">
                      <div>
                        <div className="rounded-2xl rounded-tr-sm bg-[#075e54] px-4 py-2.5">
                          <p className="text-[13px] leading-relaxed text-white">
                            Service lane. Got 3 appointments.
                          </p>
                        </div>
                        <span className="mt-1 block text-right text-[9px] text-white/30">8:03 AM</span>
                      </div>
                    </div>

                    {/* Agent message 2 */}
                    <div className="flex items-start gap-2">
                      <div className="mt-1 h-7 w-7 flex-shrink-0 rounded-full bg-deal/20 flex items-center justify-center text-[10px] font-black text-deal">DC</div>
                      <div>
                        <div className="rounded-2xl rounded-tl-sm bg-[#1c1c1e] px-4 py-2.5">
                          <p className="text-[13px] leading-relaxed text-white/90">
                            Service lane on a Monday — high percentage. Three plays for the RAV4 oil change crowd:
                          </p>
                          <div className="mt-2 space-y-1.5">
                            <div className="rounded-lg bg-white/5 px-3 py-2">
                              <span className="text-[10px] font-bold text-deal">1. EQUITY PULL</span>
                              <p className="mt-0.5 text-[11px] text-white/70">"Your RAV4 is worth more than you think. Let me run the numbers."</p>
                            </div>
                            <div className="rounded-lg bg-white/5 px-3 py-2">
                              <span className="text-[10px] font-bold text-deal">2. PAYMENT DROP</span>
                              <p className="mt-0.5 text-[11px] text-white/70">"Your payment could actually go down with a new one. Quick check?"</p>
                            </div>
                            <div className="rounded-lg bg-white/5 px-3 py-2">
                              <span className="text-[10px] font-bold text-deal">3. SERVICE SAVE</span>
                              <p className="mt-0.5 text-[11px] text-white/70">"First two services are free. That's $200 back in your pocket."</p>
                            </div>
                          </div>
                        </div>
                        <span className="mt-1 block text-[9px] text-white/30">8:04 AM</span>
                      </div>
                    </div>

                    {/* User message 2 */}
                    <div className="flex items-start justify-end gap-2">
                      <div>
                        <div className="rounded-2xl rounded-tr-sm bg-[#075e54] px-4 py-2.5">
                          <p className="text-[13px] leading-relaxed text-white">
                            Equity pull is solid. Let me run that.
                          </p>
                        </div>
                        <span className="mt-1 block text-right text-[9px] text-white/30">8:05 AM</span>
                      </div>
                    </div>
                  </div>

                  {/* Input bar */}
                  <div className="border-t border-white/10 px-4 py-3">
                    <div className="flex items-center gap-2 rounded-full bg-[#1c1c1e] px-4 py-2">
                      <span className="text-[12px] text-white/30">Message...</span>
                      <div className="ml-auto h-6 w-6 rounded-full bg-[#075e54] flex items-center justify-center">
                        <span className="text-[10px] text-white">↑</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Floating label */}
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full border border-deal/30 bg-deal/10 px-4 py-1.5 backdrop-blur">
                  <span className="text-[10px] font-semibold text-deal">Same agent. Every device.</span>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* HOW TO CONNECT */}
      <section className="relative overflow-hidden loud-bg-alt border-t border-white/5">
        <div className="grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-5xl px-6 py-20">
          <FadeIn>
            <div className="mb-12 text-center">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1.5">
                <Smartphone className="h-3.5 w-3.5 text-gold-light" strokeWidth={2.5} />
                <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-gold-light">
                  How to connect
                </span>
              </div>
              <h2 className="font-display text-3xl font-black leading-[1.05] tracking-[-0.02em] text-white sm:text-5xl">
                4 steps.
                <span className="text-shine font-black"> 60 seconds.</span>
              </h2>
            </div>

            <div className="mx-auto max-w-2xl space-y-6">
              {[
                { step: "1", title: "Sign in to Deal Clozr", desc: "Open your dashboard at dealclozr.com — same account you already use." },
                { step: "2", title: "Add your WhatsApp number", desc: "Enter your phone number in Settings under Platform Connections." },
                { step: "3", title: "Save our number", desc: "Add +1 (555) 000-0000 as \"Deal Clozr\" in your contacts." },
                { step: "4", title: "Text anything", desc: "Log deals. Handle objections. Check your pay plan. Same agent. Same voice. Same memory." },
              ].map(({ step, title, desc }) => (
                <div key={step} className="group flex items-start gap-5 rounded-2xl border border-white/8 bg-black/40 p-6 backdrop-blur transition-all hover:border-deal/20">
                  <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-deal/15 font-display text-lg font-black text-deal-light">
                    {step}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-white">{title}</h3>
                    <p className="mt-1 text-sm text-ash leading-relaxed">{desc}</p>
                  </div>
                  <CheckCircle2 className="mt-1 h-5 w-5 flex-shrink-0 text-deal/40" strokeWidth={2} />
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Link
                href="/dashboard/settings"
                className="btn-loud group inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base"
              >
                Go to Settings
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* FEATURES */}
      <section className="relative overflow-hidden loud-bg border-t border-white/5">
        <div className="relative mx-auto max-w-5xl px-6 py-20">
          <FadeIn>
            <div className="mb-12 text-center">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1.5">
                <Zap className="h-3.5 w-3.5 text-gold-light" strokeWidth={2.5} />
                <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-gold-light">
                  Why WhatsApp
                </span>
              </div>
              <h2 className="font-display text-3xl font-black leading-[1.05] tracking-[-0.02em] text-white sm:text-5xl">
                Already open.<br className="sm:hidden" />
                <span className="text-shine font-black"> Already yours.</span>
              </h2>
            </div>

            <div className="grid gap-5 md:grid-cols-3">
              {[
                {
                  icon: MessageCircle,
                  title: "2 billion users",
                  body: "More people have WhatsApp than any CRM. Your agent meets them where they already are — no download, no new habit.",
                },
                {
                  icon: Zap,
                  title: "Instant. Anywhere.",
                  body: "WhatsApp works on any phone, any network. Your agent replies in under a second — even on 3G.",
                },
                {
                  icon: Shield,
                  title: "End-to-end encrypted",
                  body: "Customer names, deal numbers, pay plan details — all encrypted. Your data stays between you and your agent.",
                },
              ].map(({ icon: Icon, title, body }) => (
                <div key={title} className="loud-card group relative overflow-hidden rounded-2xl p-7">
                  <div className="pointer-events-none absolute -right-12 -top-12 h-24 w-24 rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity"
                    style={{ background: "radial-gradient(circle, rgba(37,211,102,0.15), transparent 70%)" }} />
                  <div className="relative">
                    <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-deal/10">
                      <Icon className="h-6 w-6 text-deal" strokeWidth={2} />
                    </div>
                    <h3 className="text-lg font-bold text-white">{title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ash">{body}</p>
                  </div>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* MORE PLATFORMS */}
      <section className="relative overflow-hidden loud-bg-alt border-t border-white/5">
        <div className="grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-4xl px-6 py-16">
          <FadeIn>
            <div className="mb-10 text-center">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1.5">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-gold opacity-75 pulse-ring" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-gold" />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-gold-light">
                  All platforms
                </span>
              </div>
              <h2 className="font-display text-2xl font-black tracking-tight text-white sm:text-3xl">
                One agent. Every platform.
              </h2>
              <p className="mt-2 text-sm text-ash">Pick the one your team already uses. Same agent. Same memory. Same price.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { name: "WhatsApp", desc: "2 billion users. End-to-end encrypted. You already have it open.", icon: "💬", status: "Live" },
                { name: "SMS / Text", desc: "Any phone. Any carrier. No app needed.", icon: "📱", status: "Live" },
                { name: "Telegram", desc: "Fast, reliable, works on any connection.", icon: "✈️", status: "Live" },
              ].map(({ name, desc, icon, status }) => (
                <div key={name} className="rounded-2xl border border-deal/20 bg-deal/5 p-6 text-center">
                  <div className="mb-3 text-3xl">{icon}</div>
                  <h3 className="font-bold text-white">{name}</h3>
                  <p className="mt-1 text-xs text-ash">{desc}</p>
                  <span className="mt-3 inline-block rounded-full border border-deal/40 bg-deal/10 px-3 py-0.5 text-[10px] font-semibold text-deal">
                    ● {status}
                  </span>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden loud-bg border-t border-white/5">
        <div className="grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 py-20 text-center">
          <FadeIn>
            <h2 className="font-display text-3xl font-black leading-[1.05] tracking-[-0.02em] text-white sm:text-5xl">
              Web + WhatsApp + Telegram.
              <br />
              <span className="text-shine font-black">One agent. One price.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-lg text-ash">
              Web + WhatsApp + Telegram + SMS — one agent. One price. Every platform.
            </p>
            <div className="mt-8">
              <Link
                href="/dashboard/settings"
                className="btn-loud group inline-flex items-center gap-2 rounded-xl px-8 py-5 text-lg"
              >
                Connect WhatsApp Now
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
