import type { Metadata } from "next";
import LiveMetricsStrip from "@/components/LiveMetricsStrip";

export const metadata: Metadata = {
  title: "Deal Clozr — Investor Brief",
  description: "AI closer for commission sales. Built on the floor by a working closer.",
};

export default function InvestPage() {
  return (
    <section className="relative min-h-screen overflow-hidden loud-bg text-bone">
      <div className="grid-pattern opacity-30" />
      <div className="pointer-events-none absolute top-0 right-0 h-[500px] w-[500px] rounded-full blur-[150px] opacity-20"
        style={{ background: "radial-gradient(circle, rgba(16,185,129,0.5), transparent 70%)" }} />

      <div className="relative mx-auto max-w-3xl px-6 py-20">
        {/* Hero */}
        <div className="mb-16 text-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-deal/30 bg-deal/10 px-4 py-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-deal shadow-[0_0_8px_#10B981]" />
            <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-deal-light">Investor Brief</span>
          </div>
          <h1 className="text-shine font-display text-4xl font-black tracking-tight sm:text-6xl">Deal Clozr</h1>
          <p className="mt-4 text-xl text-ash sm:text-2xl">Every closer's second brain.</p>
          <p className="mt-2 text-sm text-muted">Built on the floor by a working closer · Holiday, Florida</p>
        </div>

        {/* Live Metrics */}
        <LiveMetricsStrip />

        {/* What It Is */}
        <Section title="What It Is">
          <p>Deal Clozr is an AI sales partner that lives in a closer's pocket. It remembers every customer, handles every objection, logs every deal, writes every follow-up text, and tracks every dollar of commission — before the closer even asks.</p>
          <p className="mt-3">$29.99/month per rep. One deal pays for 10 years. Zero setup, zero prompt engineering. It sounds like YOU, not generic AI.</p>
        </Section>

        {/* Why It Wins */}
        <Section title="Why It Wins">
          <ul className="space-y-3">
            <WinItem title="Persistent memory" body="ChatGPT forgets. Deal Clozr remembers every customer, every deal, every objection — across weeks and sessions." />
            <WinItem title="Zero setup" body="No prompt engineering. No templates. Reps open the app and start talking. Built for people who sell, not people who configure software." />
            <WinItem title="Sounds like you" body="Learns your voice, your pay plan, your floor. Not a generic chatbot — a closer's closer." />
            <WinItem title="Enterprise moat" body="Dedicated AI closer for entire sales floors. $5K/month, done-for-you. CRM-integrated, live in 48 hours." />
          </ul>
        </Section>

        {/* Market */}
        <Section title="The Market">
          <p>22 million commission-based salespeople in the US. Every one of them spends hours writing follow-ups, calculating commissions, and replaying objections in their head. That's the market.</p>
          <p className="mt-3">The competitor is ChatGPT — free, generic, forgetful. Deal Clozr wins on memory, voice, and zero-friction. A closer opens ChatGPT once and never comes back because it doesn't know their pay plan. Deal Clozr does.</p>
        </Section>

        {/* Traction */}
        <Section title="Traction">
          <ul className="space-y-3">
            <TractionItem label="Product" value="Live on dealclozr.com — 18 industry verticals, Stripe payments, live AI chat" />
            <TractionItem label="Enterprise" value="$5K/mo done-for-you tier with dedicated agent — on the lot, pilot launching May 2026" />
            <TractionItem label="Team" value="Solo founder — Thul Leng. Working Toyota closer. Built this between customers on the floor." />
            <TractionItem label="Deals Logged" value="Real closers logging real deals. System tracking units, commissions, and bonus progress." />
          </ul>
        </Section>

        {/* Revenue Model */}
        <Section title="Revenue Model">
          <div className="grid gap-4 sm:grid-cols-2">
            <ModelCard tier="SaaS" price="$29.99" unit="per rep / month" desc="Self-serve. Stripe checkout. Scales with the floor." />
            <ModelCard tier="Enterprise" price="$5,000" unit="per month flat" desc="Done-for-you. Dedicated AI closer for the whole team. CRM integration, 48hr setup, weekly optimization." />
          </div>
        </Section>

        {/* The Ask */}
        <Section title="The Opportunity">
          <p>Sales teams are drowning in admin while ChatGPT gives them generic answers. Deal Clozr is the first AI that actually knows the closer — their deals, their pay plan, their voice, their floor.</p>
          <p className="mt-3">The SaaS model funds the machine. Enterprise delivers margin. Every rep who tries it sticks because no other tool remembers their customer's wife's name from three weeks ago.</p>
          <p className="mt-3">This isn't a chatbot. It's a closer's second brain. Built by a closer, for closers.</p>
        </Section>

        {/* Footer */}
        <div className="mt-16 border-t border-iron pt-8 text-center">
          <p className="text-sm text-ash">dealclozr.com</p>
          <p className="mt-1 text-xs text-muted">Thul Leng · thul@dealclozr.com · on the lot, Holiday FL</p>
        </div>
      </div>
    </section>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="mb-12">
      <h2 className="mb-4 font-display text-2xl font-bold text-deal">{title}</h2>
      <div className="space-y-1 text-sm leading-relaxed text-ash">{children}</div>
    </div>
  );
}

function WinItem({ title, body }: { title: string; body: string }) {
  return (
    <li className="rounded-xl border border-iron bg-slate/50 p-4">
      <span className="font-semibold text-bone">{title}</span>
      <span className="text-ash"> — {body}</span>
    </li>
  );
}

function TractionItem({ label, value }: { label: string; value: string }) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-0.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-deal shadow-[0_0_6px_#10B981]" />
      <div>
        <span className="font-semibold text-bone">{label}:</span>{" "}
        <span className="text-ash">{value}</span>
      </div>
    </li>
  );
}

function ModelCard({ tier, price, unit, desc }: { tier: string; price: string; unit: string; desc: string }) {
  return (
    <div className={`glass-panel rounded-2xl p-5 ${tier === "Enterprise" ? "border-gold/30" : ""}`}>
      <p className="text-[11px] font-bold uppercase tracking-wider text-muted">{tier}</p>
      <p className={`mt-1 font-display text-4xl font-black ${tier === "Enterprise" ? "text-gold-light" : "glow-text-green"}`}>{price}</p>
      <p className="text-xs text-ash">{unit}</p>
      <p className="mt-3 text-[13px] leading-relaxed text-ash">{desc}</p>
    </div>
  );
}
