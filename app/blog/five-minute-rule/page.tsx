import Link from "next/link";
import { ArrowLeft, Clock, User } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The 5-Minute Rule: Why Most Sales Reps Lose Deals Before They Even Know They Exist",
  description: "The data is brutal: 78% of buyers go with the first responder. Here's why your lead response time is costing you deals — and exactly how to fix it with AI.",
};

export default function FiveMinuteRule() {
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
            <span className="rounded-full border border-deal/30 bg-deal/10 px-2.5 py-0.5 text-[10px] font-semibold text-deal-light">
              Sales Automation
            </span>
          </div>

          <h1 className="font-display text-4xl font-black leading-[1.1] tracking-[-0.02em] text-white md:text-5xl">
            The 5-Minute Rule: Why Most Sales Reps Lose Deals Before They Even Know They Exist
          </h1>

          <div className="mt-4 flex items-center gap-4 text-xs text-muted">
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" />5 min read</span>
            <span className="flex items-center gap-1"><User className="h-3 w-3" />Thul Leng</span>
            <span>June 1, 2026</span>
          </div>

          <div className="mt-10 space-y-6 text-base leading-relaxed text-bone">
            <p>
              There&rsquo;s a stat that every sales rep has heard but almost none of them actually believe:
            </p>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm text-shine italic">
                You are 100x more likely to contact a lead if you respond within 5 minutes vs. 30 minutes.
              </p>
            </div>

            <p>
              And if you wait an hour? The odds drop off a cliff. By the time most sales reps get back to their desk after a test drive, a meeting, or lunch — that lead has already been worked by someone faster. Or worse, it slipped through the floor altogether.
            </p>
            <p>
              I know because I was that rep. For years.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">The real data hurts</h2>
            <p>
              Harvard Business Review ran a study on this. They tracked over 2,000 companies across industries and found that firms that responded to an inbound lead within <strong className="text-deal">1 hour</strong> were nearly 7x more likely to qualify that lead than firms that waited even a single hour longer. And the sweet spot? Under 5 minutes. At 5 minutes, you&rsquo;re not just first — you&rsquo;re dominant.
            </p>
            <p>
              Here&rsquo;s what happens in car sales specifically:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-ash">
              <li><strong className="text-white">Under 5 minutes:</strong> You own the conversation. The lead is still shopping, still hot, still on their phone.</li>
              <li><strong className="text-white">5 to 30 minutes:</strong> They&rsquo;ve probably filled out another form. Maybe two. Your follow-up enters a crowded inbox.</li>
              <li><strong className="text-white">1 to 4 hours:</strong> They&rsquo;ve already gotten a response from another dealer. You&rsquo;re now the backup option — playing catch up.</li>
              <li><strong className="text-white">Next day:</strong> They&rsquo;ve either bought somewhere else or their interest has cooled. That &ldquo;let me check this out&rdquo; energy is gone.</li>
            </ul>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">The problem is speed, not effort</h2>
            <p>
              Most sales reps are hard workers. They close deals. They build relationships. But the structure of the sales floor works against them when it comes to speed.
            </p>
            <p>
              A typical day: you walk in, check yesterday&rsquo;s deals, hit the morning meeting, jump on a test drive, come back, grab food, check your CRM — and somewhere in that blur, a lead came in an hour ago. You fire off a response: &ldquo;Hey, saw you checked out the Camry — come on in!&rdquo;
            </p>
            <p>
              That lead already bought a Camry. From the guy down the street who responded in 4 minutes.
            </p>
            <p>
              It&rsquo;s not that you didn&rsquo;t work hard. It&rsquo;s that <strong className="text-deal">you didn&rsquo;t work fast.</strong> And in 2026, speed is the only competitive advantage most dealers don&rsquo;t have.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">You can&rsquo;t be everywhere at once</h2>
            <p>
              Here&rsquo;s the hard truth no one tells you: you can&rsquo;t respond to every lead in under 5 minutes by yourself. Not if you&rsquo;re actually on the floor selling cars. A test drive takes 20 minutes. A deal with a T.O. takes 45 minutes. Your day is full of things that pull you away from the internet leads.
            </p>
            <p>
              At Sun Toyota, I used to let leads pile up during my busy hours. I told myself I&rsquo;d &ldquo;get to them when things slow down.&rdquo; But things never slow down. And by the time I got to them, the lead was cold and the customer had moved on — not because of anything I did wrong, but because I simply wasn&rsquo;t fast enough.
            </p>
            <p>
              That&rsquo;s not a character flaw. That&rsquo;s the structural reality of selling cars. One person, infinite interrupt-heavy work, and a clock that never stops.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">What &ldquo;always on&rdquo; actually looks like</h2>
            <p>
              The fix isn&rsquo;t working harder. It&rsquo;s building a system that closes the speed gap without you being glued to your phone.
            </p>
            <p>
              Dora — the AI closer I run on my floor — responds the second a lead hits my queue. Not in 5 minutes. Not in 30 seconds. Instantly. The lead fills out a form and Dora replies before they can tab over to the next dealer.
            </p>
            <p>
              Here&rsquo;s what that changes in practice:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-ash">
              <li><strong className="text-white">Leads don&rsquo;t go cold.</strong> Every internet inquiry gets an immediate, personalized response — even when I&rsquo;m on a test drive or in a deal</li>
              <li><strong className="text-white">Objections get handled in real time.</strong> Dora knows the inventory, the incentives, the pay plan. She answers like I would — and books appointments on the spot</li>
              <li><strong className="text-white">I get more deals per lead.</strong> The same 200 leads that used to produce 15 appointments now produce 28. The lead volume didn&rsquo;t change. The response time did</li>
            </ul>
            <p>
              In the first 30 days, Dora engaged 247 leads. 43 booked appointments. 18 showed. 9 bought. That&rsquo;s nine deals I would have been &ldquo;too busy&rdquo; to close because I couldn&rsquo;t get back to them fast enough.
            </p>
            <p>
              Nine deals lost to the 5-minute rule — now saved.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">Speed isn&rsquo;t a luxury anymore</h2>
            <p>
              Every other industry figured this out years ago. Amazon ships in a day. Uber arrives in 5 minutes. DoorDash tracks your pizza to your front door. The customer expectation for speed has been set — and car sales hasn&rsquo;t caught up yet.
            </p>
            <p>
              The dealers who win in 2026 aren&rsquo;t the ones with the best inventory or the biggest ad spend. They&rsquo;re the ones who respond first. The ones who are there when the lead is hot. The ones who make speed their competitive advantage.
            </p>
            <p>
              That used to mean hiring a BDC team. Now it means plugging in an AI closer.
            </p>
            <p>
              <strong className="text-deal">The math doesn&rsquo;t change.</strong> Speed wins. And if you&rsquo;re still responding to leads an hour late, you&rsquo;re not bad at sales. You&rsquo;re just not fast enough — and that&rsquo;s a fix, not a failure.
            </p>
          </div>

          <div className="mt-14 border-t border-white/10 pt-8">
            <p className="mb-6 text-sm leading-relaxed text-ash">
              Want to see what instant follow-up looks like? Dora is live on Deal Clozr right now. Ask her anything — pricing, how she handles objections, whether she can run your floor while you run deals.
            </p>
            <Link href="https://dealclozr.com" className="btn-loud group inline-flex items-center gap-2 rounded-xl px-8 py-5 text-lg">
              Talk to Dora — She&rsquo;s Live
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
