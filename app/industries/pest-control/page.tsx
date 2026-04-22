import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Pest Control Sales AI Agent | Closers Assist",
  description: "Close More Treatments. Retain More Accounts. Closers Assist gives every Pest Control rep their own AI agent.",
};

export default function PestControlPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/30 via-transparent to-transparent" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-red-400 text-sm font-medium uppercase tracking-widest">Pest Control Industry</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-[1.02]">
            Close More Treatments.
            <span className="text-red-500">Retain More Accounts.</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed">
            Your AI-powered sales agent built for pest control reps — handle objections on bundled plans, upsell quarterly treatments, and never lose a renewal again.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/#waitlist" className="bg-red-500 hover:bg-red-600 text-white font-bold px-8 py-4 rounded-lg transition-all hover:scale-105 shadow-lg shadow-red-500/25">
              Join Waitlist
            </Link>
            <Link href="/how-it-works" className="border border-zinc-700 hover:border-zinc-500 text-zinc-300 font-semibold px-8 py-4 rounded-lg transition-all">
              See How It Works
            </Link>
          </div>
        </div>
      </section>

      {/* Pain Point */}
      <section className="py-16 px-6 bg-zinc-950/50 border-y border-zinc-800/50">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-2xl text-zinc-300 leading-relaxed font-light">
            Pest control reps lose deals to price objections and forget follow-up windows. Your AI agent knows your service plans, seasonal upsell timing, and every objection response cold.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black tracking-tight mb-4">Built for <span className="text-red-500">Pest Control Reps</span></h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">Every feature designed around how you actually sell.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-red-500/30 transition-all">
              <h3 className="text-lg font-bold text-white mb-2">Service Plan Objection Handler</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Instantly counter 'I'll just call if I see bugs' with data-backed responses on prevention value and cost savings.</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-red-500/30 transition-all">
              <h3 className="text-lg font-bold text-white mb-2">Seasonal Upsell Coach</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Know exactly when to pitch mosquito, rodent, or termite add-ons based on season and customer history.</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-red-500/30 transition-all">
              <h3 className="text-lg font-bold text-white mb-2">Renewal Retention Scripts</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Never lose an annual contract renewal. Your agent preps you with the right talking points before every renewal call.</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-red-500/30 transition-all">
              <h3 className="text-lg font-bold text-white mb-2">Bundle Math Calculator</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Show customers live savings when bundling quarterly + termite + mosquito plans on the spot.</p>
            </div>

          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 bg-zinc-950 border-y border-zinc-800/50">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center">
                    <div>
            <div className="text-5xl font-black text-red-500 mb-2">340%</div>
            <div className="text-zinc-400 text-sm">More referrals from bundle sells</div>
          </div>
          <div>
            <div className="text-5xl font-black text-red-500 mb-2">92%</div>
            <div className="text-zinc-400 text-sm">Renewal retention rate</div>
          </div>
          <div>
            <div className="text-5xl font-black text-red-500 mb-2">2x</div>
            <div className="text-zinc-400 text-sm">Upsell conversion on seasonal add-ons</div>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-black tracking-tight mb-4">Stop losing renewals to price objections.</h2>
          <p className="text-zinc-400 text-lg mb-8">Join thousands of Pest Control reps closing more with their own AI agent. Less than $10/month. Cancel anytime.</p>
          <Link href="/#waitlist" className="bg-red-500 hover:bg-red-600 text-white font-bold px-10 py-5 rounded-lg text-lg transition-all hover:scale-105 shadow-lg shadow-red-500/25 inline-block">
            Get Your Agent — Free 14 Days
          </Link>
        </div>
      </section>
    </div>
  );
}
