import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Naomi — Founder Operations · Deal Clozr",
  description: "The original agent. Naomi tracked every deal, every commission, every bonus tier before Sassy and Dora existed.",
};

export default function NaomiPage() {
  return (
    <main className="min-h-screen bg-pit text-bone">
      <div className="max-w-4xl mx-auto px-6 py-24">
        <div className="text-center mb-16">
          <p className="text-deal text-sm uppercase tracking-[2px] mb-4">Founder Operations</p>
          <h1 className="font-display text-6xl font-black mb-4">
            Meet <span className="text-deal">Naomi</span>.
          </h1>
          <p className="text-xl text-ash max-w-2xl mx-auto">
            The first agent. Before Sassy. Before Dora. Naomi was tracking deals on the floor — 
            every customer, every commission, every bonus tier. She was the proof that AI could run 
            operations for a working rep.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-16 text-center">
          <div className="bg-black/40 border border-white/10 rounded-2xl p-8">
            <div className="font-display text-4xl font-black text-deal">$5,800</div>
            <div className="text-sm text-ash mt-2">Commission tracked in May</div>
          </div>
          <div className="bg-black/40 border border-white/10 rounded-2xl p-8">
            <div className="font-display text-4xl font-black text-gold-light">15</div>
            <div className="text-sm text-ash mt-2">Deals logged with customer names</div>
          </div>
          <div className="bg-black/40 border border-white/10 rounded-2xl p-8">
            <div className="font-display text-4xl font-black text-white">11.5</div>
            <div className="text-sm text-ash mt-2">Units tracked by May 21</div>
          </div>
        </div>

        <div className="bg-black/40 border border-white/10 rounded-2xl p-8 mb-12">
          <h2 className="font-display text-2xl font-bold mb-6">May 2026 — The Tracker That Started It All</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-white/10 text-ash text-left">
                  <th className="pb-3 pr-4">#</th>
                  <th className="pb-3 pr-4">Customer</th>
                  <th className="pb-3 pr-4">Type</th>
                  <th className="pb-3 pr-4">Front Gross</th>
                  <th className="pb-3">Pay</th>
                </tr>
              </thead>
              <tbody className="text-bone/80">
                {[
                  ["Mike Rinaldi", "Full Mini", "—", "$400"],
                  ["Idaliz Falcon Melendez", "Half Mini", "—", "$200"],
                  ["Austin Tarbox", "Full Mini", "—", "$400"],
                  ["Marines Aviles Garcia", "Full Deal", "$3,203", "$800.75"],
                  ["Victoria Franceschini", "Full Mini", "—", "$400"],
                  ["Stephen Cunningham", "Full Deal", "$4,000", "$1,000"],
                  ["Octavius Rocha Torress", "Full Mini", "—", "$400"],
                  ["Shelley Ann Ratman", "Half Mini", "—", "$200"],
                  ["Eliana Torres", "Full Mini", "—", "$400"],
                  ["Corrine Collins", "Full Mini", "—", "$400"],
                ].map(([name, type, gross, pay], i) => (
                  <tr key={i} className="border-b border-white/5">
                    <td className="py-2 pr-4 text-ash">{i + 1}</td>
                    <td className="py-2 pr-4">{name}</td>
                    <td className="py-2 pr-4">{type}</td>
                    <td className="py-2 pr-4">{gross}</td>
                    <td className="py-2 text-deal">{pay}</td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr className="font-bold text-white">
                  <td colSpan={3} className="pt-4">Totals</td>
                  <td className="pt-4">$7,203</td>
                  <td className="pt-4 text-deal">$5,800.75</td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-16">
          <div className="bg-black/40 border border-white/10 rounded-2xl p-8">
            <div className="text-2xl mb-3">📋</div>
            <h3 className="font-display text-xl font-bold mb-3">Bonus Ladder Mapped</h3>
            <p className="text-ash text-sm leading-relaxed">
              11 units → $500. 13 → $750. 15 → $1,000. 17 → $1,500. 20 → $2,000. 
              Every threshold documented. "0.5 to go for $500."
            </p>
          </div>
          <div className="bg-black/40 border border-white/10 rounded-2xl p-8">
            <div className="text-2xl mb-3">🏗️</div>
            <h3 className="font-display text-xl font-bold mb-3">Built Sassy's Foundation</h3>
            <p className="text-ash text-sm leading-relaxed">
              The deal tracking structure, commission math, and bonus ladder that Naomi built 
              became the blueprint for Sassy's database. The original tracker became the 
              database agent.
            </p>
          </div>
        </div>

        <div className="text-center">
          <p className="text-ash text-sm">
            <strong className="text-deal">Naomi</strong> was the first · <strong className="text-deal">Sassy</strong> automated it · <strong className="text-deal">Dora</strong> closes it
          </p>
          <p className="text-muted text-xs mt-2">
            Three agents. One floor. Built on nights and weekends. No VC. No boardroom.
          </p>
        </div>
      </div>
    </main>
  );
}
