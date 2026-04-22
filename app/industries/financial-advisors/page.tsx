import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Financial Advisors Sales AI Agent | Closers Assist",
  description: "Close More AUM. Deepen Every Client Relationship. Closers Assist gives every Financial Advisors rep their own AI agent.",
};

export default function FinancialAdvisorsPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/30 via-transparent to-transparent" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-red-400 text-sm font-medium uppercase tracking-widest">Financial Advisors Industry</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-[1.02]">
            Close More AUM.
            <span className="text-red-500">Deepen Every Client Relationship.</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed">
            Your AI-powered sales agent built for financial advisors — handle fee objections, articulate your value clearly, and convert prospects into long-term managed accounts.
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
            Financial advisors lose prospects to 'I'll just use a robo-advisor' and fee objections. Your AI agent knows how to articulate the human value of advice, handle fiduciary questions, and close the AUM conversation.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black tracking-tight mb-4">Built for <span className="text-red-500">Financial Advisors Reps</span></h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">Every feature designed around how you actually sell.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-red-500/30 transition-all">
              <h3 className="text-lg font-bold text-white mb-2">Fee Objection Handler</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Turn '1% is too much' into a value conversation — with ROI math on advice, tax optimization, and behavioral coaching.</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-red-500/30 transition-all">
              <h3 className="text-lg font-bold text-white mb-2">Robo-Advisor Rebuttal</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Data-backed responses that highlight what algorithms miss — life planning, tax strategy, estate coordination, and real relationships.</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-red-500/30 transition-all">
              <h3 className="text-lg font-bold text-white mb-2">Discovery Call Coach</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">The right questions to uncover a prospect's real financial fears, goals, and decision timeline in the first meeting.</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-red-500/30 transition-all">
              <h3 className="text-lg font-bold text-white mb-2">AUM Consolidation Playbook</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Scripts to bring over outside accounts — 401(k) rollovers, held-away assets, and inherited portfolios.</p>
            </div>

          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 bg-zinc-950 border-y border-zinc-800/50">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center">
                    <div>
            <div className="text-5xl font-black text-red-500 mb-2">$2.4M</div>
            <div className="text-zinc-400 text-sm">Avg. new AUM per rep with consistent follow-up</div>
          </div>
          <div>
            <div className="text-5xl font-black text-red-500 mb-2">68%</div>
            <div className="text-zinc-400 text-sm">Prospect-to-client conversion rate</div>
          </div>
          <div>
            <div className="text-5xl font-black text-red-500 mb-2">4x</div>
            <div className="text-zinc-400 text-sm">Wallet share from consolidation conversations</div>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-black tracking-tight mb-4">Your clients deserve more than an algorithm.</h2>
          <p className="text-zinc-400 text-lg mb-8">Join thousands of Financial Advisors reps closing more with their own AI agent. Less than $10/month. Cancel anytime.</p>
          <Link href="/#waitlist" className="bg-red-500 hover:bg-red-600 text-white font-bold px-10 py-5 rounded-lg text-lg transition-all hover:scale-105 shadow-lg shadow-red-500/25 inline-block">
            Get Your Agent — Free 14 Days
          </Link>
        </div>
      </section>
    </div>
  );
}
