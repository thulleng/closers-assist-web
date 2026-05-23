import Link from "next/link";
import { ArrowRight, Smartphone, Zap, MessageCircle } from "lucide-react";
import type { Metadata } from "next";
import { Suspense } from "react";
import FadeIn from "@/components/FadeIn";
import TelegramLinkClient from "@/components/TelegramLinkClient";

export const metadata: Metadata = {
  title: "Telegram",
  description: "Deal Clozr on Telegram — your AI sales agent follows you to the lot. Same agent, every device.",
};

export default async function TelegramPage({
  searchParams,
}: {
  searchParams: Promise<{ code?: string; chat_id?: string }>;
}) {
  const params = await searchParams;
  const isLinking = !!(params.code && params.chat_id);

  return (
    <main>
      {/* LINKING FLOW — shown when user comes from bot start link */}
      {isLinking && (
        <section className="relative overflow-hidden loud-bg min-h-[60vh] flex items-center">
          <div className="grid-pattern opacity-40" />
          <div className="relative mx-auto max-w-3xl px-6 py-20 w-full">
            <Suspense fallback={null}>
              <TelegramLinkClient />
            </Suspense>
          </div>
        </section>
      )}

      {/* MARKETING PAGE — shown when no linking params */}
      {!isLinking && (
        <>
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
              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-deal/40 bg-deal/20 px-3.5 py-1.5 backdrop-blur">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-deal opacity-75 pulse-ring" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-deal" />
                </span>
                <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-deal-light">
                  LIVE on Telegram
                </span>
              </div>

              <h1 className="font-display text-4xl font-black leading-[1.05] tracking-[-0.02em] text-white md:text-6xl">
                Your agent.
                <br />
                <span className="text-shine font-black">In your pocket.</span>
              </h1>

              <p className="mt-6 max-w-lg text-lg leading-relaxed text-ash">
                Same agent. Same memory. Same pay plan math. Now live on Telegram —
                the app you already have open between customers.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                <a
                  href="https://t.me/ClosersAssistBot"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-loud group inline-flex items-center gap-2 rounded-xl px-8 py-5 text-lg"
                >
                  Open in Telegram
                  <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
                </a>
              </div>

              <p className="mt-4 text-sm text-muted">
                Search <span className="font-mono text-deal-light">@ClosersAssistBot</span> on Telegram. Same AI engine. Web + Telegram — one agent.
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
                            Morning Thul. You're at 7.5 units — 3.5 from the $500 bonus at 11. What's the play today?
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
                              <p className="mt-0.5 text-[11px] text-white/70">Pull their trade value before they walk in. “Your RAV4 is worth more than you think.”</p>
                            </div>
                            <div className="rounded-lg bg-white/5 px-3 py-2">
                              <span className="text-[10px] font-bold text-deal">2. PAYMENT DROP</span>
                              <p className="mt-0.5 text-[11px] text-white/70">“Your payment could actually go down with a new one. Run the numbers real quick?”</p>
                            </div>
                            <div className="rounded-lg bg-white/5 px-3 py-2">
                              <span className="text-[10px] font-bold text-deal">3. SERVICE SAVE</span>
                              <p className="mt-0.5 text-[11px] text-white/70">“First two services are free. That&rsquo;s $200 back in your pocket.”</p>
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

      {/* MORE PLATFORMS — coming soon */}
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
                  Coming Soon
                </span>
              </div>
              <h2 className="font-display text-2xl font-black tracking-tight text-white sm:text-3xl">
                More ways to connect
              </h2>
              <p className="mt-2 text-sm text-ash">Same agent. More platforms. Pick the one your team already uses.</p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              {[
                { name: "WhatsApp", desc: "Webhook live. Meta Business setup pending.", icon: "💬", status: "In development" },
                { name: "Slack", desc: "For SaaS sales teams who live in channels.", icon: "💜", status: "Coming soon" },
                { name: "Discord", desc: "For gaming, creator, and community sellers.", icon: "🎮", status: "Coming soon" },
              ].map(({ name, desc, icon, status }) => (
                <div key={name} className={`rounded-2xl border p-6 text-center transition-opacity ${status === "In development" ? "border-gold/20 bg-gold/5 opacity-80" : "border-white/5 bg-slate/30 opacity-60 hover:opacity-80"}`}>
                  <div className="mb-3 text-3xl">{icon}</div>
                  <h3 className="font-bold text-white">{name}</h3>
                  <p className="mt-1 text-xs text-muted">{desc}</p>
                  <span className={`mt-3 inline-block rounded-full border px-3 py-0.5 text-[10px] font-semibold ${status === "In development" ? "border-gold/40 text-gold" : "border-gold/20 text-gold/60"}`}>
                    {status}
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
              Web + Telegram.
              <br />
              <span className="text-shine font-black">One agent. One price.</span>
            </h2>
            <p className="mx-auto mt-4 max-w-lg text-lg text-ash">
              Open Telegram now. Your agent is already there — same memory, same pay plan, same plays.
            </p>
            <div className="mt-8">
              <a
                href="https://t.me/ClosersAssistBot"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-loud group inline-flex items-center gap-2 rounded-xl px-8 py-5 text-lg"
              >
                Try It Now — Free
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
        </>
      )}
    </main>
  );
}
