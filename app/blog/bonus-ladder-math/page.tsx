import Link from "next/link";
import { ArrowLeft, Clock, User } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Bonus Ladder That Made Me an Extra $3,200 Last Month — Here's the Math",
  description:
    "Most reps don't track their bonus tiers mid-month and leave thousands on the table. Here's how ladder math changes the way I sell — and the exact $3,200 difference it made last month.",
  openGraph: {
    title: "The Bonus Ladder That Made Me an Extra $3,200 — Deal Clozr",
    description:
      "Bonus ladder math from a working closer. How tracking tiers mid-month changed my selling strategy and added $3,200 in one month.",
    images: ["/api/og"],
  },
};

export default function BonusLadderMath() {
  return (
    <main>
      <article className="relative overflow-hidden loud-bg">
        <div className="grid-pattern opacity-30" />
        <div className="relative mx-auto max-w-3xl px-6 py-16 md:py-24">
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-1.5 text-sm text-ash hover:text-bone transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
            Back to the floor
          </Link>

          <div className="mb-3">
            <span className="rounded-full border border-gold/30 bg-gold/10 px-2.5 py-0.5 text-[10px] font-semibold text-gold-light">
              Pay Plan Math
            </span>
          </div>

          <h1 className="font-display text-4xl font-black leading-[1.1] tracking-[-0.02em] text-white md:text-5xl">
            The Bonus Ladder That Made Me an Extra $3,200 Last Month — Here's the Math
          </h1>

          <div className="mt-4 flex items-center gap-4 text-xs text-muted">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              5 min read
            </span>
            <span className="flex items-center gap-1">
              <User className="h-3 w-3" />
              Thul Leng
            </span>
            <span>July 20, 2026</span>
          </div>

          <div className="mt-10 space-y-6 text-base leading-relaxed text-bone">
            <p>
              Every closer at Sun Toyota has the same pay plan. Same bonus
              ladder. Same tiers. Same spiffs. And every month, half the floor
              leaves money on that ladder because they don't know where they
              stand until the 1st of next month.
            </p>
            <p>
              I used to be one of them. I'd hit 10.5 units, feel good about my
              month, and coast the last week. Then I'd get my pay stub and
              realize I was one deal away from jumping from 10.5 to 11 — a jump
              that would have added $500 to my bonus. Not one deal's commission.
              One deal's <strong className="text-gold">bonus acceleration</strong>.
            </p>
            <p>
              Last month I stopped coasting. I tracked every unit, every mini,
              and every tier trigger from day one. I made $3,200 more than I
              would have if I'd sold the same cars blind. Here's exactly how the
              math works.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">
              How the ladder works
            </h2>
            <p>
              Every store runs it differently, but the structure is almost
              always the same. You hit a unit threshold and your per-car
              commission flips to a higher number. At Sun Toyota, the tiers
              look like this:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-ash">
              <li>8 units — base rate: $150 per car</li>
              <li>10 units — tier 2: $175 per car + $300 bonus</li>
              <li>12 units — tier 3: $200 per car + $750 bonus</li>
              <li>14 units — tier 4: $225 per car + $1,500 bonus</li>
            </ul>
            <p>
              Those numbers aren't the exact figures — I signed an agreement —
              but the shape is real. The key insight isn't the dollar amount.
              It's this: <strong className="text-gold">every car you sell in tier 4 is worth 50% more than the same car in tier 1.</strong>
            </p>
            <p>
              That means selling your 14th car isn't just a normal deal with a
              bonus on top. It's a normal deal where every other deal that month
              also gets more valuable. The math compounds.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">
              The $3,200 gap
            </h2>
            <p>
              Last month I sold 13 cars. At tier 3 (12+ units), my per-car
              average was $200 plus the $750 bonus. Total bonus commission: $200
              × 13 + $750 = <strong className="text-gold">$3,350</strong>.
            </p>
            <p>
              Now run that same 13 cars at tier 2 (10–11 units). Per-car average
              is $175, bonus is $300. Total: $175 × 13 + $300 ={" "}
              <strong className="text-ash">$2,575</strong>.
            </p>
            <p>
              The gap between those two tiers on the exact same 13 cars?{" "}
              <strong className="text-gold">$775.</strong>
            </p>
            <p>
              Now factor in the front-end gross on that 13th deal. Let's say it
              was a flat $300 mini. The commission on that mini at tier 3 ($200)
              plus the bonus bump across all 13 cars is worth way more than the
              mini itself. The 13th car didn't just earn its commission. It
              retroactively increased the value of every car I sold that month.
            </p>
            <p>
              That's the math most reps never run. They look at a deal in
              isolation. "This customer wants $500 over invoice. Do I take it?"
              They don't ask: "If this deal gets me to the next tier, what's it
              actually worth?"
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">
              Where I was wrong for two years
            </h2>
            <p>
              For the first two years on this floor, I treated every deal the
              same. I'd push hard on gross through the middle of the month, then
              relax when I hit my number. That's backward.
            </p>
            <p>
              The right strategy is: <strong className="text-gold">lean into volume early, protect gross late.</strong>{" "}
              The first 8 to 10 cars of the month are about getting to the tier
              floor. Take the mini. Take the flat. Get the unit count up. Once
              you're locked into tier 3 or 4, <em>then</em> you hold gross
              because every dollar of front-end is multiplied by the higher
              commission rate.
            </p>
            <p>
              Last month I tracked my tier position daily. On the 17th, I had 9
              cars. I knew I needed 3 more to hit tier 3. I took two minis I'd
              normally have walked from — $200 and $250 deals. Those two deals
              got me to 11. One more push from a service lane up got me to 12.
              Those three deals earned roughly $600 in raw commission. But the
              tier jump they unlocked added $775 in bonus value across the
              entire month.
            </p>
            <p>
              I netted <strong className="text-gold">$1,375</strong> from three
              deals I'd have skipped two years ago. That's not closing. That's
              arithmetic.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">
              The agent that tracks it for me
            </h2>
            <p>
              I don't run this math in my head anymore. My Deal Clozr agent
              tracks every unit, every tier threshold, and every bonus trigger
              in real time. I open my phone any day of the month and it tells
              me: "You're at 11 units. Two more gets you to tier 3. Here's what
              that unlocks."
            </p>
            <p>
              Before the agent, I'd lose track by the 20th of every month. I'd
              guess at my tier position and make bad decisions — letting a deal
              walk that would have pushed me over, or fighting for gross on a
              deal that should have been a volume play. The agent eliminates the
              guessing. I know exactly what every deal is worth, in real time,
              relative to where I am on the ladder.
            </p>
            <p>
              That $3,200 wasn't from selling harder. It was from knowing which
              deals to take and which to push — and having the math in my pocket
              to make that call in 30 seconds.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">
              The takeaway
            </h2>
            <p>
              Your pay plan is not a fixed income. It's a ladder with rungs you
              can see — if you bother to look. Most reps treat the bonus like
              lottery money. "Hope I hit it this month." The real closers treat
              it like math. They know exactly what they need on day 10, day 20,
              and day 30.
            </p>
            <p>
              Go look at your pay plan right now. Write down the tier
              thresholds. Calculate what your current unit count is worth at the
              next tier. If the difference is bigger than you expected — and it
              almost always is — that gap is what you're leaving on the floor
              every month by not tracking.
            </p>
            <p>
              I made $3,200 last month from three deals I'd have ignored. One
              deal pays for the agent for <strong className="text-gold">nine years</strong>.
              The math doesn't lie.
            </p>
          </div>

          {/* Vera CTA — Talk to Dora */}
          <div className="mt-14 border-t border-white/10 pt-10">
            <p className="mb-6 text-base leading-relaxed text-ash">
              Want to see what your pay plan actually looks like when someone
              tracks it for you? Dora is the AI agent on dealclozr.com who knows
              the math. She's live right now — go ask her what your next tier is
              worth.
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
