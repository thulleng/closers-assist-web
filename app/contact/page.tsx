import Link from "next/link";
import { Mail, ArrowRight, Clock } from "lucide-react";
import type { Metadata } from "next";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Thul Leng, founder of Closers Assist. Built on the floor at Sun Toyota.",
};

export default function ContactPage() {
  return (
    <main>
      <section className="relative overflow-hidden loud-bg">
        <div className="grid-pattern opacity-40" />
        <div className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-[0.12]"
          style={{
            backgroundImage: `url(https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1600)`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="pointer-events-none absolute -top-32 right-0 h-96 w-96 rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(16,185,129,0.15), transparent 70%)" }} />

        <div className="relative mx-auto max-w-3xl px-6 py-24 text-center">
          <FadeIn>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_8px_#FBBF24]" />
              <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-gold-light">
                Get in touch
              </span>
            </div>

            <h1 className="font-display text-5xl font-black leading-[1.05] tracking-[-0.02em] text-white md:text-7xl">
              Talk to the guy
              <br />
              <span className="text-shine font-black">who built it.</span>
            </h1>

            <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ash">
              No sales team. No demo request form that goes to a CRM. Just Thul —
              the rep who built this between customers on the Sun Toyota floor.
            </p>
          </FadeIn>

          <FadeIn delay={150}>
            <div className="mt-12 grid gap-5 md:grid-cols-2">
              {/* Email card */}
              <a
                href="mailto:thul@closersassist.com"
                className="loud-card group relative overflow-hidden rounded-2xl p-7 text-left transition-all hover:border-deal/40 hover:shadow-[0_0_40px_rgba(16,185,129,0.1)]"
              >
                <div className="pointer-events-none absolute -right-12 -top-12 h-24 w-24 rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity"
                  style={{ background: "radial-gradient(circle, rgba(16,185,129,0.2), transparent 70%)" }} />
                <div className="relative">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-deal/10">
                    <Mail className="h-6 w-6 text-deal" strokeWidth={2} />
                  </div>
                  <h2 className="text-lg font-bold text-white">Email directly</h2>
                  <p className="mt-2 text-sm leading-relaxed text-ash">
                    thul@closersassist.com
                  </p>
                  <p className="mt-1 text-xs text-muted">
                    Usually replies same day. Even on Saturdays.
                  </p>
                  <div className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-deal-light group-hover:gap-2.5 transition-all">
                    Send an email
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                  </div>
                </div>
              </a>

              {/* Response time card */}
              <div className="loud-card relative overflow-hidden rounded-2xl p-7 text-left">
                <div className="relative">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gold/10">
                    <Clock className="h-6 w-6 text-gold-light" strokeWidth={2} />
                  </div>
                  <h2 className="text-lg font-bold text-white">What to expect</h2>
                  <ul className="mt-3 space-y-2 text-sm text-ash">
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-deal">→</span>
                      <span>Response within 24 hours — usually same day</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-deal">→</span>
                      <span>No script. No pitch deck. Real conversation.</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="mt-0.5 text-deal">→</span>
                      <span>If you&apos;re a closer, you&apos;ll talk to a closer.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </FadeIn>

          <FadeIn delay={300}>
            <div className="mt-12">
              <Link
                href="/pricing"
                className="btn-loud group inline-flex items-center gap-2 rounded-xl px-8 py-5 text-lg"
              >
                Get Started — $29.99/mo
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" strokeWidth={2.5} />
              </Link>
              <p className="mt-4 text-sm text-muted">
                No credit card. Cancel anytime. Beat your last month or it&rsquo;s free.
              </p>
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
