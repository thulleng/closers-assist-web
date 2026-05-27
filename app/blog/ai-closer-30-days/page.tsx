import Link from "next/link";
import { ArrowLeft, Clock, User } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "I Run an AI Closer on My Dealership Floor — Here's What Happened in 30 Days",
  description: "30 days. 247 leads. 43 appointments. The real numbers from running an AI closer on the lot — and why your floor is next.",
  openGraph: {
    title: "I Ran an AI Closer on My Floor for 30 Days — Deal Clozr",
    description: "247 leads. 43 appointments. Real numbers from running Deal Clozr on the lot for 30 days.",
    images: ["/api/og"],
  },
};

export default function AICloser30Days() {
  return (
    <main>
      <article className="relative overflow-hidden loud-bg">
        <div className="grid-pattern opacity-30" />
        <div className="relative mx-auto max-w-3xl px-6 py-16 md:py-24">
          <Link href="/blog" className="mb-8 inline-flex items-center gap-1.5 text-sm text-ash hover:text-bone transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
            Back to the floor
          </Link>

          <div className="mb-3">
            <span className="rounded-full border border-gold/30 bg-gold/10 px-2.5 py-0.5 text-[10px] font-semibold text-gold-light">
              Case Study
            </span>
          </div>

          <h1 className="font-display text-4xl font-black leading-[1.1] tracking-[-0.02em] text-white md:text-5xl">
            I Run an AI Closer on My Dealership Floor — Here&rsquo;s What Happened in 30 Days
          </h1>

          <div className="mt-4 flex items-center gap-4 text-xs text-muted">
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" />5 min read</span>
            <span className="flex items-center gap-1"><User className="h-3 w-3" />Thul Leng</span>
            <span>May 12, 2026</span>
          </div>

          <div className="mt-10 space-y-6 text-base leading-relaxed text-bone">
            <p>
              I sell Toyotas on the lot in New Port Richey, Florida. I&rsquo;ve been on this floor for years. I know what a T.O. sounds like, what a draw check feels like, and what it means when a lead goes cold at 48 hours.
            </p>
            <p>
              30 days ago, I flipped a switch. I put an AI agent on my floor — not as a demo, not as a gimmick. As a closer. It handles internet leads, writes follow-ups, answers objections, and books appointments. It works while I&rsquo;m on test drives. It works while I sleep.
            </p>
            <p>
              Here&rsquo;s exactly what happened — the numbers, the objections, and the three deals I would have lost without it.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">The problem: 200 leads. One closer. A 48-hour clock.</h2>
            <p>
              Every dealership floor runs on the same math: you get more leads than you can handle. On the lot, we pull 200 to 250 internet leads a month. Some are real buyers. Most are “just looking.” A handful are ready today. The problem is you don&rsquo;t know which is which until you follow up.
            </p>
            <p>
              And follow-up is the bottleneck. You call. They don&rsquo;t answer. You text. They reply three days later. You leave a voicemail. They call back while you&rsquo;re on a demo drive. By the time you reconnect, they&rsquo;ve already filled out a form at another store. The 48-hour window on an internet lead is real — and most of us lose half our leads inside it.
            </p>
            <p>
              I ran the numbers on my own pipeline before the pilot. In March, I received 218 internet leads. I made contact with 94 of them — 43%. Of those 94, I set 31 appointments. 11 showed. 8 bought. That&rsquo;s a 3.6% close rate from lead to deal. The other 124 leads? Ghosted. Cold. Buried in the CRM graveyard.
            </p>
            <p>
              That&rsquo;s not a skill problem. That&rsquo;s a capacity problem. One person can&rsquo;t follow up with 200 people in real time. But an AI can.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">The setup: what the agent actually does</h2>
            <p>
              I built the agent on Deal Clozr — the same platform I launched last month. But this was the first time I ran it as a full pilot on my own floor. Here&rsquo;s what it does:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-ash">
              <li><strong className="text-bone">Instant lead response.</strong> When an internet lead hits the CRM, the agent fires a personalized message within 2 minutes. It knows the vehicle they inquired about, the trim, the incentives running that week.</li>
              <li><strong className="text-bone">Objection handling.</strong> It&rsquo;s trained on real objections from real customers. “I&rsquo;m just looking.” “The payment is too high.” “I need to talk to my wife.” It doesn&rsquo;t give generic responses — it gives scripts that have actually worked on this floor.</li>
              <li><strong className="text-bone">Follow-up cadence.</strong> Day 1, Day 3, Day 7, Day 14. Text, then email, then call prompt. The cadence doesn&rsquo;t miss. It doesn&rsquo;t get busy. It doesn&rsquo;t forget.</li>
              <li><strong className="text-bone">Escalation.</strong> When a lead goes warm — they reply, they ask a real question, they say “what&rsquo;s your best price” — the agent tags me. I get a notification. I step in. The AI warms them up. I close them.</li>
              <li><strong className="text-bone">Pay plan awareness.</strong> The agent knows my bonus ladder. It knows I need 11 units for the $500 bonus and 15 for $1,000. It prioritizes leads that move the unit count — not just the highest gross.</li>
            </ul>
            <p>
              The agent doesn&rsquo;t replace me. It&rsquo;s not supposed to. It handles the 80% of follow-up that&rsquo;s repetitive — the first touch, the objection response, the “just checking in.” I handle the close. That&rsquo;s the split.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">The results: 30 days of real numbers</h2>
            <p>
              April 12 to May 12. One closer. One AI agent. One Toyota store. Here&rsquo;s the data:
            </p>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center">
                <div className="text-3xl font-black text-deal">247</div>
                <div className="mt-1 text-[10px] font-semibold uppercase tracking-[1px] text-muted">Leads Handled</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center">
                <div className="text-3xl font-black text-deal">89%</div>
                <div className="mt-1 text-[10px] font-semibold uppercase tracking-[1px] text-muted">Contact Rate</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center">
                <div className="text-3xl font-black text-deal">43</div>
                <div className="mt-1 text-[10px] font-semibold uppercase tracking-[1px] text-muted">Appointments</div>
              </div>
              <div className="rounded-xl border border-white/10 bg-white/[0.03] p-4 text-center">
                <div className="text-3xl font-black text-deal">14</div>
                <div className="mt-1 text-[10px] font-semibold uppercase tracking-[1px] text-muted">Deals Closed</div>
              </div>
            </div>

            <p>
              Let me break that down against my March numbers, because the comparison is where it gets real.
            </p>

            <ul className="list-disc pl-5 space-y-2 text-ash">
              <li><strong className="text-bone">Contact rate:</strong> 43% → 89%. The AI responded within 2 minutes, every time. That&rsquo;s the difference. Speed-to-lead is the single biggest lever in auto sales, and I just maxed it out.</li>
              <li><strong className="text-bone">Appointments set:</strong> 31 → 43. A 39% increase. Not because the AI is a better closer than me — because it followed up with 123 more people than I could have on my own.</li>
              <li><strong className="text-bone">Deals closed:</strong> 8 → 14. A 75% increase in unit count. At an average commission of $475 per unit, that&rsquo;s an extra $2,850 in my pocket — before bonuses.</li>
              <li><strong className="text-bone">Bonus unlocked:</strong> 14 units put me past the 11-unit bonus ($500) and within striking distance of 15 ($1,000). Without the AI, I would have finished at 8 or 9.</li>
            </ul>

            <p>
              The math isn&rsquo;t complicated. More leads touched = more appointments = more deals. The AI doesn&rsquo;t need to be brilliant. It just needs to be fast and consistent. It was both.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">Three deals the AI saved</h2>

            <p>
              <strong className="text-deal">Deal 1: The 11pm RAV4 lead.</strong>
              Customer submitted a lead at 10:47pm on a Tuesday. Asked about a RAV4 XLE Premium. The AI responded at 10:49pm with trim comparisons, current incentives, and a question: “Are you trading anything in?” They replied at 11:02pm with their trade details. By 8:15am the next morning, I had an appointment on my calendar. That customer bought Friday. If I had waited until the morning to respond — 10 hours later — they would have filled out three more forms and I would have been the fourth call. Speed wins.
            </p>

            <p>
              <strong className="text-deal">Deal 2: The “just looking” that wasn&rsquo;t.</strong>
              Internet lead comes in. “Just looking, not ready to buy.” The AI didn&rsquo;t argue. It sent back: “Totally get it — no pressure. While you&rsquo;re looking, here&rsquo;s a quick payment estimate on the Camry SE you asked about so you know what the numbers look like when you&rsquo;re ready.” The customer replied 4 hours later: “Actually that&rsquo;s lower than I thought. Can I come see it?” Closed two days later. The AI turned an objection into a payment quote. I would have just moved on.
            </p>

            <p>
              <strong className="text-deal">Deal 3: The lease turn-in they forgot about.</strong>
              Customer called in about a Highlander. Mentioned in passing that their current lease was up “sometime next month.” The AI flagged it and sent a follow-up: “Heads up — your lease maturity is actually May 28th. If we do the Highlander now, I can get you into it before your turn-in date and waive the disposition fee. Want me to check numbers?” They came in the next day. That&rsquo;s not selling. That&rsquo;s service. And the AI caught a detail I would have missed.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">The real objection: “AI can&rsquo;t sell cars”</h2>
            <p>
              I hear this from other reps. I hear it from managers. “Customers don&rsquo;t want to talk to a robot.” “You can&rsquo;t build rapport through a bot.” “Sales is human.”
            </p>
            <p>
              They&rsquo;re right — and they&rsquo;re missing the point. The AI isn&rsquo;t closing. The AI is handling the grunt work. The 47 “just checking in” texts. The 23 “here&rsquo;s the payment breakdown” emails. The 19 “did you have any other questions” follow-ups. Every one of those used to eat 5 to 10 minutes of my day. Now they eat zero.
            </p>
            <p>
              The AI frees me up to do what I&rsquo;m actually good at: being on the lot, walking the car, reading the customer, closing the deal. That&rsquo;s the split. And here&rsquo;s the part nobody talks about — customers don&rsquo;t care if the follow-up text came from me or my agent. They care that it was fast, relevant, and helpful.
            </p>
            <p>
              I had exactly one customer in 30 days ask if they were talking to a bot. I told them the truth: “My assistant handles the paperwork side so I can focus on getting you the right car. You&rsquo;re talking to me now.” They laughed and said “makes sense.” That was the only objection.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">The takeaway: every dealer needs this yesterday</h2>
            <p>
              Here&rsquo;s what I know after 30 days: the dealership that adopts AI follow-up first wins. Period. Not in five years. Not when the technology is “ready.” Now.
            </p>
            <p>
              The math is too simple to ignore. If you close one extra deal per month because your AI handled the follow-up you would have missed, that&rsquo;s $3,000 to $5,000 in gross profit — per rep. The tool costs $29.99. One deal pays for 10 years.
            </p>
            <p>
              The reps who fight this will be the same reps wondering why their pipeline dried up while the guy in the next desk is closing 14 units a month. The managers who ignore this will watch their lead-to-close ratios stall while the store across town — the one that adopted AI six months ago — pulls ahead.
            </p>
            <p>
              I&rsquo;m not a tech founder sitting in a boardroom telling you AI is the future. I&rsquo;m a Toyota closer standing on the lot telling you AI just added six deals to my month — and I can prove it.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">What&rsquo;s next</h2>
            <p>
              The pilot isn&rsquo;t over. I&rsquo;m running month two right now — tracking every lead, every appointment, every deal. I&rsquo;ll post the 60-day update here on the blog. If the numbers hold, I&rsquo;m scaling this to the full floor.
            </p>
            <p>
              In the meantime, Deal Clozr is live. $29.99 per rep per month. Same agent I&rsquo;m running on my floor. Same objection handler. Same follow-up cadence. Same speed-to-lead advantage. Auto, real estate, insurance, solar, SaaS, and 13 more industries — because the follow-up problem isn&rsquo;t unique to car sales.
            </p>
            <p>
              One deal pays for 10 years. You do the math.
            </p>
          </div>

          <div className="mt-14 border-t border-white/10 pt-8">
            <Link href="/pricing" className="btn-loud group inline-flex items-center gap-2 rounded-xl px-8 py-5 text-lg">
              Get Started — $29.99/mo
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
