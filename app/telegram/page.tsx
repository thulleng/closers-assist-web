import Link from "next/link";
import { ArrowRight, Smartphone, Zap, MessageCircle } from "lucide-react";
import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Telegram",
  description: "Closers Assist on Telegram — your AI sales agent follows you to the lot. Same agent, every device.",
};

export default function TelegramPage() {
  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden loud-bg">
        <div className="grid-pattern opacity-40" />
        <div className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[500px] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(0,136,204,0.12), transparent 70%)" }} />
        <div className="pointer-events-none absolute -bottom-40 left-0 h-[400px] w-[400px] rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(16,185,129,0.10), transparent 70%)" }} />

        <div className="relative mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="grid gap-12 md:grid-cols-2 md:items-center">
            {/* Left — copy */}
            <FadeIn>
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#0088cc]/30 bg-[#0088cc]/10 px-3.5 py-1.5">
                <MessageCircle className="h-3.5 w-3.5 text-[#0088cc]" strokeWidth={2.5} />
                <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-[#0088cc]">
                  Coming to Telegram
                </span>
              </div>

              <h1 className="font-display text-4xl font-black leading-[1.05] tracking-[-0.02em] text-white md:text-6xl">
                Your agent.
                <br />
                <span className="text-shine font-black">In your pocket.</span>
              </h1>

              <p className="mt-6 max-w-lg text-lg leading-relaxed text-ash">
                Same agent. Same memory. Same pay plan math. Now on Telegram —
                the app you already have open between customers.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  href="/pricing"
                  className="btn-loud group inline-flex items-center gap-2 rounded-xl px-8 py-5 text-lg"
                >
                  Get early access
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
                </Link>
                <a
                  href="https://t.me/Max_CreditRepair_bot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl border border-[#0088cc]/30 bg-[#0088cc]/10 px-8 py-5 text-lg font-semibold text-[#0088cc] transition-all hover:bg-[#0088cc]/20"
                >
                  <MessageCircle className="h-5 w-5" strokeWidth={2} />
                  Try a demo bot
                </a>
              </div>

              <p className="mt-4 text-sm text-muted">
                Powered by the same Claude Haiku engine. Web + Telegram — one agent, every platform.
              </p>
            </FadeIn>

            {/* Right — Telegram chat mock */}
            <FadeIn delay={150}>
              <div className="relative mx-auto max-w-sm">
                {/* Phone frame */}
                <div className="overflow-hidden rounded-[2.5rem] border-2 border-white/10 bg-[#0f0f0f] shadow-2xl">
                  {/* Status bar */}
                  <div className="flex items-center justify-between bg-[#1a1a1a] px-6 py-3">
                    <span className="text-[10px] font-medium text-white/60">9:41</span>
                    <span className="text-[11px] font-bold text-white">Cheerleader</span>
                    <span className="text-[10px] font-medium text-white/60">📶 🔋</span>
                  </div>

                  {/* Chat bubbles */}
                  <div className="space-y-4 px-4 py-5">
                    {/* Agent message 1 */}
                    <div className="flex items-start gap-2">
                      <div className="mt-1 h-7 w-7 flex-shrink-0 rounded-full bg-deal/20 flex items-center justify-center text-[10px] font-black text-deal">CA</div>
                      <div>
                        <div className="rounded-2xl rounded-tl-sm bg-[#1c1c1e] px-4 py-2.5">
                          <p className="text-[13px] leading-relaxed text-white/90">
                            Morning Thul. You&apos;re at 7.5 units — 3.5 from the $500 bonus at 11. What&apos;s the play today?
                          </p>
                        </div>
                        <span className="mt-1 block text-[9px] text-white/30">8:02 AM</span>
                      </div>
                    </div>

                    {/* User message */}
                    <div className="flex items-start justify-end gap-2">
                      <div>
                        <div className="rounded-2xl rounded-tr-sm bg-[#0088cc] px-4 py-2.5">
                          <p className="text-[13px] leading-relaxed text-white">
                            Service lane. Got 3 appointments.
                          </p>
                        </div>
                        <span className="mt-1 block text-right text-[9px] text-white/30">8:03 AM</span>
                      </div>
                    </div>

                    {/* Agent message 2 */}
                    <div className="flex items-start gap-2">
                      <div className="mt-1 h-7 w-7 flex-shrink-0 rounded-full bg-deal/20 flex items-center justify-center text-[10px] font-black text-deal">CA</div>
                      <div>
                        <div className="rounded-2xl rounded-tl-sm bg-[#1c1c1e] px-4 py-2.5">
                          <p className="text-[13px] leading-relaxed text-white/90">
                            Service lane on a Monday — high percentage. Three plays for the RAV4 oil change crowd:
                          </p>
                          <div className="mt-2 space-y-1.5">
                            <div className="rounded-lg bg-white/5 px-3 py-2">
                              <span className="text-[10px] font-bold text-deal">1. EQUITY PULL</span>
                              <p className="mt-0.5 text-[11px] text-white/70">Pull their trade value before they walk in. &ldquo;Your RAV4 is worth more than you think.&rdquo;</p>
                            </div>
                            <div className="rounded-lg bg-white/5 px-3 py-2">
                              <span className="text-[10px] font-bold text-deal">2. PAYMENT DROP</span>
                              <p className="mt-0.5 text-[11px] text-white/70">&ldquo;Your payment could actually go down with a new one. Run the numbers real quick?&rdquo;</p>
                            </div>
                            <div className="rounded-lg bg-white/5 px-3 py-2">
                              <span className="text-[10px] font-bold text-deal">3. SERVICE SAVE</span>
                              <p className="mt-0.5 text-[11px] text-white/70">&ldquo;First two services are free. That&rsquo;s $200 back in your pocket.&rdquo;</p>
                            </div>
                          </div>
                        </div>
                        <span className="mt-1 block text-[9px] text-white/30">8:04 AM</span>
                      </div>
                    </div>

                    {/* User message 2 */}
                    <div className="flex items-start justify-end gap-2">
                      <div>
                        <div className="rounded-2xl rounded-tr-sm bg-[#0088cc] px-4 py-2.5">
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
                      <div className="ml-auto h-6 w-6 rounded-full bg-[#0088cc] flex items-center justify-center">
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

      {/* FEATURES */}
      <section className="relative overflow-hidden loud-bg-alt border-t border-white/5">
        <div className="grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-5xl px-6 py-20">
          <FadeIn>
            <div className="mb-12 text-center">
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1.5">
                <Zap className="h-3.5 w-3.5 text-gold-light" strokeWidth={2.5} />
                <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-gold-light">
                  Why Telegram
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
                  icon: Smartphone,
                  title: "No new app",
                  body: "You already have Telegram open. Your agent lives there now — no new icon, no new login, no new habit.",
                },
                {
                  icon: Zap,
                  title: "Instant. Always.",
                  body: "Messages deliver in under a second. No browser tab to find. No page to reload. Just open the chat.",
                },
                {
                  icon: MessageCircle,
                  title: "Same memory",
                  body: "Your agent remembers every deal, every conversation, every goal — whether you're on web or Telegram.",
                },
              ].map(({ icon: Icon, title, body }) => (
                <div key={title} className="loud-card group relative overflow-hidden rounded-2xl p-7">
                  <div className="pointer-events-none absolute -right-12 -top-12 h-24 w-24 rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity"
                    style={{ background: "radial-gradient(circle, rgba(16,185,129,0.15), transparent 70%)" }} />
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

      {/* CTA */}
      <section className="relative overflow-hidden loud-bg border-t border-white/5">
        <div className="grid-pattern opacity-40" />
        <div className="relative mx-auto max-w-3xl px-6 py-20 text-center">
          <FadeIn>
            <h2 className="font-display text-3xl font-black leading-[1.05] tracking-[-0.02em] text-white sm:text-5xl">
              Web today.
              <br />
              <span className="text-shine font-black">Telegram soon.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-lg text-ash">
              Early access users get Telegram first. Same price. Same agent. Just more places.
            </p>
            <div className="mt-8">
              <Link
                href="/pricing"
                className="btn-loud group inline-flex items-center gap-2 rounded-xl px-8 py-5 text-lg"
              >
                Get Started — $29.99/mo
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
