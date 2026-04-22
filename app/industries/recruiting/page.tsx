import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Recruiting & Staffing Sales AI Agent | Closers Assist",
  description: "Place More Candidates. Win More Clients. Closers Assist gives every Recruiting & Staffing rep their own AI agent.",
};

export default function RecruitingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0b] text-white">
      {/* Hero */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/30 via-transparent to-transparent" />
        <div className="max-w-5xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-red-500/10 border border-red-500/20 rounded-full px-4 py-1.5 mb-6">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-red-400 text-sm font-medium uppercase tracking-widest">Recruiting & Staffing Industry</span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6 leading-[1.02]">
            Place More Candidates.
            <span className="text-red-500">Win More Clients.</span>
          </h1>
          <p className="text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed">
            Your AI-powered sales agent built for recruiters and staffing reps — handle client objections, prep candidates for interviews, and close both sides of the placement faster.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link href="/pricing" className="bg-red-500 hover:bg-red-600 text-white font-bold px-8 py-4 rounded-lg transition-all hover:scale-105 shadow-lg shadow-red-500/25">
              Get Started
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
            Recruiting reps lose deals to slow follow-up and client fee objections. Your AI agent knows your fee structures, your candidate prep scripts, and how to keep both sides warm from first call to placement.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-black tracking-tight mb-4">Built for <span className="text-red-500">Recruiting & Staffing Reps</span></h2>
            <p className="text-zinc-400 text-lg max-w-xl mx-auto">Every feature designed around how you actually sell.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-red-500/30 transition-all">
              <h3 className="text-lg font-bold text-white mb-2">Client Fee Objection Handler</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Counter 'your fee is too high' with placement ROI, time-to-hire data, and quality-of-hire comparisons that justify your rate.</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-red-500/30 transition-all">
              <h3 className="text-lg font-bold text-white mb-2">Candidate Prep Coach</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Comprehensive interview prep scripts, salary negotiation coaching, and objection handling for candidates going into offers.</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-red-500/30 transition-all">
              <h3 className="text-lg font-bold text-white mb-2">Job Order Closer</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">Scripts to secure exclusive job orders, set realistic timelines, and position yourself as the go-to search partner.</p>
            </div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 hover:border-red-500/30 transition-all">
              <h3 className="text-lg font-bold text-white mb-2">Counter-Offer Playbook</h3>
              <p className="text-zinc-400 text-sm leading-relaxed">When a candidate gets a counter-offer from their current employer, your agent has the conversation framework to keep the placement on track.</p>
            </div>

          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 px-6 bg-zinc-950 border-y border-zinc-800/50">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 text-center">
                    <div>
            <div className="text-5xl font-black text-red-500 mb-2">58%</div>
            <div className="text-zinc-400 text-sm">Faster time-to-fill</div>
          </div>
          <div>
            <div className="text-5xl font-black text-red-500 mb-2">$180K</div>
            <div className="text-zinc-400 text-sm">Avg. annual billing increase per recruiter</div>
          </div>
          <div>
            <div className="text-5xl font-black text-red-500 mb-2">3x</div>
            <div className="text-zinc-400 text-sm">Candidate acceptance rate on coached placements</div>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-20 px-6">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-4xl font-black tracking-tight mb-4">Fill more roles. Faster. Every time.</h2>
          <p className="text-zinc-400 text-lg mb-8">Join thousands of Recruiting & Staffing reps closing more with their own AI agent. Less than $10/month. Cancel anytime.</p>
          <Link href="/pricing" className="bg-red-500 hover:bg-red-600 text-white font-bold px-10 py-5 rounded-lg text-lg transition-all hover:scale-105 shadow-lg shadow-red-500/25 inline-block">
            Get Your Agent — Free 14 Days
          </Link>
        </div>
      </section>
    </div>
  );
}
