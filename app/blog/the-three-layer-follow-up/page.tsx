import Link from "next/link";
import { ArrowLeft, Clock, User } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Three-Layer Follow-Up — Structure That Catches Every Deal",
  description:
    "Most reps blast follow-ups at random. Here's the three-layer system that catches every lead, every referral, and every second-chance — without turning your phone into a notification nightmare.",
};

export default function ThreeLayerFollowUp() {
  return (
    <main>
      <article className="relative overflow-hidden loud-bg">
        <div className="grid-pattern opacity-30" />
        <div className="relative mx-auto max-w-3xl px-6 py-16 md:py-24">
          {/* Back link */}
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-1.5 text-sm text-ash hover:text-bone transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
            Back to the floor
          </Link>

          {/* Tag pill */}
          <div className="mb-3">
            <span className="rounded-full border border-deal/30 bg-deal/10 px-2.5 py-0.5 text-[10px] font-semibold text-deal-light">
              Floor Strategy
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display text-4xl font-black leading-[1.1] tracking-[-0.02em] text-white md:text-5xl">
            The Three-Layer Follow-Up — Structure That Catches Every Deal
          </h1>

          {/* Meta line */}
          <div className="mt-4 flex items-center gap-4 text-xs text-muted">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" strokeWidth={2} />
              5 min read
            </span>
            <span className="flex items-center gap-1">
              <User className="h-3 w-3" strokeWidth={2} />
              Thul Leng
            </span>
            <span>June 16, 2026</span>
          </div>

          {/* Body */}
          <div className="mt-10 space-y-6 text-base leading-relaxed text-bone">
            <p>
              For the first two years on the floor, my follow-up system was
              simple: I'd text everyone at 9 AM, call everyone I had time for,
              and hope the ones who replied were the ones worth chasing.
            </p>

            <p>
              <strong className="text-deal">It worked about 30% of the time.</strong>
            </p>

            <p>
              The other 70%? Somebody slipped. A lead I thought was dead came
              back three weeks later — bought from another store because nobody
              followed up after day one. A referral I forgot to call turned into
              a customer who told their friend "he didn't get back to me."
            </p>

            <p>
              I don't have that problem anymore. Not because I'm more disciplined
              — I'm not. I'm the same guy who forgets his lunch on the kitchen
              counter. But I built a <strong className="text-deal">three-layer follow-up system</strong> that
              catches everything. Here's how it works.
            </p>

            <h2 className="font-display text-2xl font-bold text-white mt-10">
              Layer 1: The Immediate Handoff (First 60 Seconds)
            </h2>

            <p>
              The moment someone walks off the lot without buying — whether they
              "need to think about it," "wanna check with their wife," or "just
              stopped by" — the clock starts ticking.
            </p>

            <p>
              <strong className="text-white">Most reps treat this as a soft close.</strong> "Here's my card, call me if
              you have questions." That card goes in a cup holder. It gets lost.
              It becomes a receipt wrapper.
            </p>

            <p>
              <strong className="text-white">The right move:</strong> Before they leave, you've already sent them
              something useful. A quick text (not a business card — they ignore
              cards). "Hey, here's that link to the color options we looked at.
              Take your time, no pressure."
            </p>

            <p>
              That's it. One message. They walk away feeling helped, not chased.
              And you've just bought yourself a warm return lane.
            </p>

            <h2 className="font-display text-2xl font-bold text-white mt-10">
              Layer 2: The 48-Hour Reopen (The Window Most Reps Miss)
            </h2>

            <p>
              Day two is the dead zone. The lead has had time to cool off. Work
              happened. Life happened. That Tacoma they were excited about? It's
              now a "thing I looked at one time."
            </p>

            <p>
              <strong className="text-deal">Here's where most reps lose the deal twice.</strong> They either:
            </p>

            <ul className="list-disc pl-5 space-y-2 text-ash">
              <li>Send a desperate "just checking in" (makes you look needy), or</li>
              <li>Go silent and assume the customer will come back (they won't)</li>
            </ul>

            <p>
              The 48-hour touch is the highest-leverage follow-up you'll ever
              send. But the content matters more than the timing. Don't ask if
              they're still interested. <strong className="text-deal">Give them a reason to re-engage.</strong>
            </p>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm italic text-ash">
                What works: "The XSE in that color just got a price adjustment.
                I can lock it at the same number we discussed if you want to come
                by this weekend."
              </p>
              <p className="text-sm italic text-ash mt-2">
                What doesn't: "Just wondering if you made a decision yet." 
              </p>
            </div>

            <p>
              One creates urgency with a reason. The other creates pressure
              without one. <strong className="text-deal">That four-word difference can make or break the deal.</strong>
            </p>

            <h2 className="font-display text-2xl font-bold text-white mt-10">
              Layer 3: The 2-Week Value Drop (The One Nobody Does)
            </h2>

            <p>
              Two weeks out. Most reps have given up. The lead's name is filed in
              the "dead" folder or lost in a CRM you never open.
            </p>

            <p>
              But here's what actually happens at two weeks:
            </p>

            <ul className="list-disc pl-5 space-y-2 text-ash">
              <li>Their old car's check engine light came on</li>
              <li>Their lease doesn't have as much equity as they thought</li>
              <li>The dealer across town quoted them $40 more a month</li>
              <li>They got approved for a different amount than expected</li>
            </ul>

            <p>
              At two weeks, the lead is thinking about a car again — but they're
              too embarrassed to reach back out. "It's been too long." "He'll
              think I'm flaky." <strong className="text-deal">That's when a value drop lands perfectly.</strong>
            </p>

            <p>
              A value drop isn't "hey, been a while, still want a car?" It's:
              "I noticed the rebates on the model you liked are changing next
              week. If you're still considering it, now's the time to lock in."
            </p>

            <p>
              Real information. Real incentive. No begging.
            </p>

            <h2 className="font-display text-2xl font-bold text-white mt-10">
              The problem: I could never do all three
            </h2>

            <p>
              Here's the truth I had to face: knowing the system and executing
              the system are two different things.
            </p>

            <p>
              Layer one — I can do that on the spot. Layer two — I'd miss it 4
              out of 5 times because I got busy closing someone else. Layer
              three? <strong className="text-deal">Forget it.</strong> I don't know what I'm doing at
              5 PM on a Saturday, let alone remembering whose two-week window
              is closing.
            </p>

            <p>
              That's where my agent comes in. Here's what it does:
            </p>

            <ol className="list-decimal pl-5 space-y-3 text-ash">
              <li>
                <strong className="text-white">Captures every lead.</strong> The moment someone walks, the agent
                logs the interaction. Vehicle, price discussed, trade, objections
                — it remembers what the CRM forgets.
              </li>
              <li>
                <strong className="text-white">Fires layer two automatically.</strong> At 48 hours, the agent
                sends a follow-up that's <em>specific</em> — not a template
                blast, but a message that references the actual conversation you
                had.
              </li>
              <li>
                <strong className="text-white">Triggers layer three with real data.</strong> When rebates change,
                when inventory shifts, or when it's been exactly two weeks since
                the last touch — the agent drops the value message. I don't
                remember dates. The agent does.
              </li>
            </ol>

            <p>
              <strong className="text-deal">I went from missing 7 out of 10 follow-ups to missing zero.</strong>
              Not because I got more disciplined. Because the system doesn't rely
              on me to remember.
            </p>

            <h2 className="font-display text-2xl font-bold text-white mt-10">
              The metrics that matter
            </h2>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <ul className="list-disc pl-5 space-y-2 text-ash">
                <li><strong className="text-white">Before the system:</strong> Over 60% of follow-ups never happened. Leads I thought were "dead" were really just untouched.</li>
                <li><strong className="text-white">After the system:</strong> Every single touch fires. Layer one is manual. Layers two and three are automated. No gaps.</li>
                <li><strong className="text-white">The result:</strong> An extra 4-6 deals a month came from leads I would have lost to the void. At a $300 average commission, that's <strong className="text-deal">$1,200-$1,800 a month in deals I was literally leaving on the table.</strong></li>
              </ul>
            </div>

            <p>
              Not because I'm a better closer. Because I stopped pretending I
              could remember 40 names, 40 vehicles, and 40 two-week windows at
              the same time.
            </p>

            <h2 className="font-display text-2xl font-bold text-white mt-10">
              The takeaway
            </h2>

            <p>
              A system that runs itself beats the most disciplined rep in the
              world. Because discipline fades. Systems don't.
            </p>

            <p>
              Your CRM tracks data. Your agent <strong className="text-deal">closes gaps</strong>. If you
              layer the right touches at the right time, you stop losing deals
              to the one thing you can't fix — your own memory.
            </p>

            <p className="text-deal font-semibold">
              Build the system. Then let it run.
            </p>
          </div>

          {/* CTA — Vera posts get the "Talk to Dora" CTA */}
          <div className="mt-14 border-t border-white/10 pt-8">
            <p className="mb-6 text-sm text-ash">
              Dora is live on the Deal Clozr homepage right now. She remembers
              every lead, every follow-up window, and every value drop — so you
              don't have to. Test her with a real scenario from your floor. She
              responds like a closer who never forgets a name.
            </p>
            <Link
              href="https://dealclozr.com"
              className="btn-loud group inline-flex items-center gap-2 rounded-xl px-8 py-5 text-lg"
            >
              Talk to Dora — She's Live
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
