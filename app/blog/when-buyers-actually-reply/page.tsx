import Link from "next/link";
import { ArrowLeft, Clock, User } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "When Buyers Actually Reply — The Follow-Up Timing Most Reps Get Wrong",
  description:
    "Most reps blast follow-ups at 10am. Real buyers reply at 9:47pm. Here's why your timing is costing you deals — and how AI fixes it without you changing your schedule.",
};

export default function WhenBuyersActuallyReply() {
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
              Customer Psychology
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display text-4xl font-black leading-[1.1] tracking-[-0.02em] text-white md:text-5xl">
            When Buyers Actually Reply — The Follow-Up Timing Most Reps Get Wrong
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
            <span>June 15, 2026</span>
          </div>

          {/* Body */}
          <div className="mt-10 space-y-6 text-base leading-relaxed text-bone">
            <p>
              I used to send my first follow-up at 9:30 AM. Right after the morning
              meeting, coffee in hand, ready to "check in" with every lead from the
              last three days. Seemed right. That's when <em>I</em> was at my desk.
              That's when <em>I</em> was thinking about deals.
            </p>

            <p>
              Problem: <strong className="text-deal">most buyers don't think about buying a car at 9:30 AM.</strong>
            </p>

            <p>
              They're driving to work. Dropping kids off. Sitting in a meeting.
              Getting yelled at by their boss. Nine thirty AM is survival mode.
              Nobody's scrolling through their phone thinking, "You know what, let
              me text that sales rep back about the Tacoma."
            </p>

            <p>
              So my "timely" follow-ups sat there. Opened. Read. Maybe a quick
              glance. But no reply. And I figured the lead was dead.
            </p>

            <p>
              <strong className="text-deal">Wrong again.</strong>
            </p>

            <h2 className="font-display text-2xl font-bold text-white mt-10">
              What my CRM taught me (by accident)
            </h2>

            <p>
              I didn't set out to study reply timing. But after 60 days running an
              AI agent that logs every interaction automatically, I had data I'd
              never had before. Not just who replied — but <em>when</em>.
            </p>

            <p>
              And the pattern was so clear I couldn't unsee it:
            </p>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-3">
              <p className="text-white font-semibold text-sm">Reply timing — 347 conversations logged:</p>
              <ul className="list-disc pl-5 space-y-2 text-ash text-sm">
                <li><strong className="text-deal">8:00 PM - 10:30 PM:</strong> 41% of all replies. Dinner's done. Kids are in bed. Buyer is on the couch, scrolling, thinking.</li>
                <li><strong className="text-deal">6:00 AM - 8:00 AM:</strong> 23% of replies. Saturday morning coffee crew. Sunday morning "let me check this out" crowd.</li>
                <li><strong className="text-deal">12:00 PM - 1:30 PM:</strong> 19% of replies. Lunch break browsers.</li>
                <li><strong className="text-deal">9:00 AM - 11:00 AM:</strong> 17% of replies. The time slot I used to own — and it's the <em>weakest</em> window.</li>
              </ul>
            </div>

            <p>
              The number one time people reply? <strong className="text-deal">Between 8 and 10:30 at night.</strong>
              When I'm home. When I'm not at my desk. When my follow-up from 9:30 AM
              is already buried under twelve hours of notifications.
            </p>

            <p>
              I was sending my best work into the wrong time zone — not geography,
              <em>psychology</em>.
            </p>

            <h2 className="font-display text-2xl font-bold text-white mt-10">
              The psychology of the 9:47 PM buyer
            </h2>

            <p>
              Think about what's happening at 9:47 PM:
            </p>

            <ul className="list-disc pl-5 space-y-2 text-ash">
              <li><strong className="text-white">No pressure.</strong> No salesperson breathing down their neck. No time crunch. They can explore on their own terms.</li>
              <li><strong className="text-white">Low guard.</strong> The defensive walls are down. They're not in "protect myself from the dealer" mode. They're just a person thinking about a car.</li>
              <li><strong className="text-white">Decision-space.</strong> Big purchases happen in quiet moments. Leases ending next month. The new model that just dropped. The truck that can't make another trip to the dump.</li>
              <li><strong className="text-white">They want to move.</strong> If they're texting a sales rep at 9:47 PM, they're not just curious. They're <em>ready</em> for the conversation to start. They just need someone to be there.</li>
            </ul>

            <p>
              This is the moment most reps miss. Because at 9:47 PM, your phone is
              in your pocket. You're eating dinner. Watching the game. Putting the
              kids to bed. You're not on the clock — and that's exactly when the
              buyer is most open.
            </p>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm italic text-ash">
                "I had a guy text me about a RAV4 at 9:52 PM on a Tuesday. By
                9:58, my agent had qualified him, confirmed his trade-in value
                range, and set an appointment for Saturday morning. I woke up to a
                deal I didn't know existed."
              </p>
              <p className="mt-2 text-xs text-muted">— Rep using Deal Clozr, week 2</p>
            </div>

            <h2 className="font-display text-2xl font-bold text-white mt-10">
              What changed when I stopped fighting the clock
            </h2>

            <p>
              I can't be at my desk at 9:47 PM. That's not going to change. But
              the leads aren't going to stop coming at 9:47 PM either.
            </p>

            <p>
              So I stopped fighting it. Here's what I do now:
            </p>

            <ol className="list-decimal pl-5 space-y-3 text-ash">
              <li>
                <strong className="text-white">The agent handles the first touch.</strong> Lead comes in at any
                hour — evening, weekend, 3 AM on a Sunday — the agent responds
                immediately. Not a "thanks for your inquiry" autoresponder. A real
                conversation. Qualifying questions. Trade-in info. Appointment
                scheduling.
              </li>
              <li>
                <strong className="text-white">I get the summary at my time.</strong> Next morning, I open one
                message: "3 leads came in overnight. 2 qualified. 1 set an
                appointment for Saturday. Here's what they want, what they're
                driving, and what they're approved for."
              </li>
              <li>
                <strong className="text-white">I reply when I'm fresh.</strong> Instead of scrambling at 9:30 AM
                to send copy-paste follow-ups to everyone, I walk onto the floor
                with three warm conversations already in progress. My first
                message? "Hey, I saw you talked to my team last night. Let me
                pull that Tacoma around for you."
              </li>
            </ol>

            <p>
              The lead feels responded to immediately. I feel like I'm starting my
              day three steps ahead. And the deal moves faster because the 12-hour
              gap between "they asked" and "I replied" disappeared.
            </p>

            <h2 className="font-display text-2xl font-bold text-white mt-10">
              The real cost of slow timing
            </h2>

            <p>
              Let me put a number on it, because that's how I think.
            </p>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <ul className="list-disc pl-5 space-y-2 text-ash">
                <li><strong className="text-white">A lead that gets a reply within 5 minutes</strong> converts at roughly 8x the rate of one that waits an hour</li>
                <li><strong className="text-white">A lead that waits until morning</strong>? That 8x drops to baseline — you're competing with every other dealer they messaged at midnight</li>
                <li><strong className="text-white">By the time you get to work at 9 AM</strong>, that 9:47 PM lead has probably already contacted two other stores — and one of them already replied</li>
              </ul>
            </div>

            <p>
              Speed alone doesn't close the deal. But <strong className="text-deal">being the first human they talk to</strong> —
              not a bot, not a form, a human conversation that starts immediately?
              That's worth real money.
            </p>

            <p>
              My agent bridges the speed gap. The customer feels heard. I keep my
              evenings. The deal doesn't slip through because I was eating dinner.
            </p>

            <h2 className="font-display text-2xl font-bold text-white mt-10">
              The hardest part wasn't the tech
            </h2>

            <p>
              I'll be honest: the hardest part of this wasn't building the agent or
              training it. The hardest part was admitting I couldn't be everywhere
              at once.
            </p>

            <p>
              Reps pride themselves on hustle. On "I take every call." On "I never
              let a lead sit." But that hustle has a ceiling. You can't be on the
              floor closing a family into a Highlander <em>and</em> texting someone
              back at 9:47 PM. Something's got to give.
            </p>

            <p>
              I chose to give up the illusion that I could handle every moment
              myself. My agent handles the moments I can't. I handle the moments
              only I can.
            </p>

            <p>
              <strong className="text-deal">That's not automation replacing me. That's automation respecting my time.</strong>
            </p>
          </div>

          {/* CTA — Vera posts get the "Talk to Dora" CTA */}
          <div className="mt-14 border-t border-white/10 pt-8">
            <p className="mb-6 text-sm text-ash">
              Dora is live on the Deal Clozr homepage right now. She handles the
              after-hours leads, qualifies the tire-kickers, and sets appointments
              while you sleep. Test her with a question about any deal scenario.
              She replies like she's on the floor — because she is.
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
