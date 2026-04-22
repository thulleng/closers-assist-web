import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "HVAC Sales AI Agent | Closers Assist",
  description: "Close More Installs. Sell More Service Agreements. Closers Assist gives every HVAC rep their own AI agent.",
};

export default function HvacPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/30 via-transparent to-transparent" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-red-400 text-sm font-medium uppercase tracking-widest">HVAC Industry</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-[1.02]">
            Close More Installs.
            <span className="text-red-500">Sell More Service Agreements.</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed">
            Your AI-powered sales agent built for HVAC reps — handle system upgrade objections, sell maintenance agreements, and close emergency replacements with confidence.
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
            HVAC reps face sticker shock on every install and lose service agreement renewals to inertia. Your AI agent knows your equipment lines, financing options, and the ROI math that closes deals.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black tracking-tight mb-4">Built for <span className="text-red-500">HVAC Reps</span></h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">Every feature designed around how you actually sell.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-red-500/30 transition-all">
              <h3 className="text-lg font-bold text-white mb-2">System Upgrade Objection Handler</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Turn 'just fix it' into a full replacement conversation with ROI math, energy savings, and financing options ready.</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-red-500/30 transition-all">
              <h3 className="text-lg font-bold text-white mb-2">Maintenance Agreement Closer</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Scripts and rebuttals purpose-built to convert one-time repair customers into recurring agreement holders.</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-red-500/30 transition-all">
              <h3 className="text-lg font-bold text-white mb-2">Financing Calculator</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Show customers monthly payment breakdowns on equipment upgrades in real time — remove the price barrier instantly.</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-red-500/30 transition-all">
              <h3 className="text-lg font-bold text-white mb-2">Emergency Replacement Playbook</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">When the system is down in July, your agent has the fastest path from diagnosis to signed install.</p>
            </div>

          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 bg-zinc-950 border-y border-zinc-800/50">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center">
                    <div>
            <div className="text-5xl font-black text-red-500 mb-2">180K</div>
            <div className="text-zinc-400 text-sm">Avg. revenue added per rep annually</div>
          </div>
          <div>
            <div className="text-5xl font-black text-red-500 mb-2">67%</div>
            <div className="text-zinc-400 text-sm">Service agreement close rate</div>
          </div>
          <div>
            <div className="text-5xl font-black text-red-500 mb-2">3x</div>
            <div className="text-zinc-400 text-sm">Higher ticket on financed installs</div>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-black tracking-tight mb-4">Turn every service call into a sales opportunity.</h2>
          <p className="text-zinc-400 text-lg mb-8">Join thousands of HVAC reps closing more with their own AI agent. Less than $10/month. Cancel anytime.</p>
          <Link href="/#waitlist" className="bg-red-500 hover:bg-red-600 text-white font-bold px-10 py-5 rounded-lg text-lg transition-all hover:scale-105 shadow-lg shadow-red-500/25 inline-block">
            Get Your Agent — Free 14 Days
          </Link>
        </div>
      </section>
    </div>
  );
}
