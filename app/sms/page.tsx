import Link from "next/link";
import { MessageSquare, ArrowRight, Smartphone, Zap } from "lucide-react";
import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "SMS & Text",
  description: "Deal Clozr via SMS — your AI sales agent works over text messages. No app required. Just your phone number.",
};

export default function SMSPage() {
  return (
    <section className="relative min-h-screen overflow-hidden loud-bg">
      <div className="grid-pattern opacity-40" />
      <div className="pointer-events-none absolute -top-40 right-0 h-[500px] w-[500px] rounded-full blur-[120px]"
        style={{ background: "radial-gradient(circle, rgba(16,185,129,0.10), transparent 70%)" }} />

      <div className="relative mx-auto max-w-3xl px-6 py-20">
        {/* Hero */}
        <FadeIn>
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-deal/40 bg-deal/20 px-3.5 py-1.5 backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-deal opacity-75 pulse-ring" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-deal" />
            </span>
            <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-deal-light">
              NEW — SMS
            </span>
          </div>
          <h1 className="font-display text-4xl font-black leading-[1.05] tracking-[-0.02em] text-white md:text-6xl">
            Your agent on
            <br />
            <span className="text-shine font-black">any phone.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ash">
            No smartphone? No problem. Text your AI closer from any phone — 
            flip phone, prepaid, burner. Same agent. Same memory. Same plays.
          </p>
        </FadeIn>

        {/* How to link */}
        <FadeIn delay={100}>
          <div className="mt-12 rounded-2xl border border-white/10 bg-black/40 p-8 backdrop-blur">
            <h2 className="font-display text-xl font-bold text-white mb-6">
              How to connect
            </h2>
            <div className="space-y-6">
              {[
                { step: "1", title: "Sign in to Deal Clozr", desc: "Open your dashboard at dealclozr.com/dashboard/settings" },
                { step: "2", title: "Enter your phone number", desc: "Add your number in the SMS field under Platform Connections" },
                { step: "3", title: "Save our number to your contacts", desc: `Save <span class="text-deal font-semibold">+1 (555) 000-0000</span> as "Deal Clozr"` },
                { step: "4", title: "Text anything", desc: "Log a deal. Get a script. Check your bonus progress. It works on any phone, any carrier." },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex items-start gap-4">
                  <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-deal/20 text-sm font-bold text-deal">
                    {step}
                  </div>
                  <div>
                    <h3 className="font-semibold text-white text-sm">{title}</h3>
                    <p className="mt-1 text-sm text-ash leading-relaxed" dangerouslySetInnerHTML={{ __html: desc }} />
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link
                href="/dashboard/settings"
                className="btn-loud group inline-flex items-center gap-2 rounded-xl px-8 py-4 text-base"
              >
                Go to Settings
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
              </Link>
            </div>
          </div>
        </FadeIn>

        {/* Features */}
        <FadeIn delay={150}>
          <div className="mt-10 grid gap-4 sm:grid-cols-3">
            {[
              { icon: MessageSquare, title: "No app needed", desc: "Works on any phone that sends texts. Flip phones, prepaids, burner lines." },
              { icon: Zap, title: "Same experience", desc: "Same AI. Same memory. Same pay plan math. Messages or SMS — it's all the same agent." },
              { icon: Smartphone, title: "Any carrier", desc: "Verizon, T-Mobile, AT&T, prepaid, international. If it sends texts, it works." },
            ].map(({ icon: Icon, title, desc }) => (
              <div key={title} className="rounded-xl border border-white/5 bg-white/[0.02] p-5">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-deal/10">
                  <Icon className="h-5 w-5 text-deal" strokeWidth={2} />
                </div>
                <h3 className="text-sm font-bold text-white">{title}</h3>
                <p className="mt-1 text-xs text-ash leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* CTA */}
        <FadeIn delay={200}>
          <div className="mt-12 text-center">
            <Link
              href="/dashboard/settings"
              className="btn-loud group inline-flex items-center gap-2 rounded-xl px-8 py-4 text-lg"
            >
              Link Your Number
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
            </Link>
            <p className="mt-3 text-sm text-muted">
              One agent. Every platform. Web · Telegram · WhatsApp · SMS
            </p>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}
