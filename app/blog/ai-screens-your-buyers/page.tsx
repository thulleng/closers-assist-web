import Link from "next/link";
import { ArrowLeft, Clock, User } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "AI Screens Your Buyers — So You Skip the Tire-Kickers and Close the Real Ones",
  description:
    "Tire-kickers cost closers $1,200 a week in wasted time. Here's how AI screens leads before they hit your phone — and why the best reps are letting bots handle the qualifiers.",
};

export default function AiScreensBuyers() {
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
              Sales Automation
            </span>
          </div>

          {/* Title */}
          <h1 className="font-display text-4xl font-black leading-[1.1] tracking-[-0.02em] text-white md:text-5xl">
            AI Screens Your Buyers — So You Skip the Tire-Kickers and Close the Real Ones
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
            <span>June 8, 2026</span>
          </div>

          {/* Body */}
          <div className="mt-10 space-y-6 text-base leading-relaxed text-bone">
            <p>
              Here's a number that changed how I look at every lead that hits my phone: <strong className="text-deal">67 percent</strong>.
            </p>

            <p>
              That's the percentage of internet leads and service lane "quick questions" that
              <strong className="text-deal"> never become a deal</strong>. They're asking about payment, trade-in value,
              or "is this car still available" — and they disappear before you can even type your name.
            </p>

            <p>
              I used to chase all of them. Every ping. Every "I'll come in Saturday." Every text at 9 PM from a
              number I didn't recognize. I figured quantity was the game. More leads = more shots. Right?
            </p>

            <p>
              Wrong. <strong className="text-deal">Chasing tire-kickers costs you real buyers.</strong>
            </p>

            <h2 className="font-display text-2xl font-bold text-white mt-10">
              The Math I Missed
            </h2>

            <p>
              Let me run the numbers I should have run years ago:
            </p>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <ul className="list-disc pl-5 space-y-2 text-ash">
                <li><strong className="text-white">10 leads a day</strong> hitting your CRM or phone</li>
                <li><strong className="text-white">7 of them</strong> are tire-kickers — no credit, no timeline, no real intent</li>
                <li>Each one eats <strong className="text-white">12 minutes</strong> of your time on average (text, call, text again, leave voicemail, forget about it)</li>
                <li>That's <strong className="text-deal">84 minutes a day</strong> on dead leads</li>
                <li>At 5-day weeks, that's <strong className="text-deal">7 hours a week</strong> — basically an entire shift</li>
                <li>At a conservative $175/hour on the floor, that's <strong className="text-deal">$1,225 a week</strong> in wasted time</li>
              </ul>
            </div>

            <p>
              A thousand two hundred and twenty-five dollars. Every week. Gone.
            </p>

            <p>
              Now think about what <strong className="text-deal">seven extra hours on the floor</strong> could do. That's 20 more real
              customer interactions a week. Five more ups. At least one more deal.
            </p>

            <h2 className="font-display text-2xl font-bold text-white mt-10">
              What Changed
            </h2>

            <p>
              I started running an <strong className="text-deal">AI screening layer</strong> between the lead source and my phone. Here's
              the flow:
            </p>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-3">
              <p className="text-white font-semibold">How it works:</p>
              <ol className="list-decimal pl-5 space-y-2 text-ash">
                <li><strong className="text-white">Lead comes in</strong> — internet lead, text, Facebook message, whatever</li>
                <li><strong className="text-white">AI asks three questions</strong> — Are you pre-approved? What's your timeline? What's your trade?</li>
                <li><strong className="text-white">Qualifies in under 60 seconds</strong> — if they answer with intent, I get a ping. If they ghost, I never see it.</li>
                <li><strong className="text-white">I step onto the floor</strong> — only when the lead is warm enough to close</li>
              </ol>
            </div>

            <p>
              Simple. No new process. No extra login. Just a bot at the door asking, "Who's serious?"
            </p>

            <p>
              The result? <strong className="text-deal">I went from chasing 10+ leads a day to working 3-4 real conversations.</strong>
              Same number of deals. Less than half the phone time.
            </p>

            <h2 className="font-display text-2xl font-bold text-white mt-10">
              The Objection I Always Hear
            </h2>

            <p>
              "But Thul — what if the bot chases off a real buyer?"
            </p>

            <p>
              Fair question. I thought the same thing. Here's what I actually found:
            </p>

            <ul className="list-disc pl-5 space-y-2 text-ash">
              <li><strong className="text-white">Real buyers answer questions.</strong> Someone who's about to drop $45,000 on a truck doesn't
              mind typing two sentences about their trade-in.</li>
              <li><strong className="text-white">Tire-kickers bounce.</strong> They weren't buying anyway. They were fishing for a price to
              beat their local dealer with.</li>
              <li><strong className="text-white">The bot warms them up.</strong> By the time I pick up the conversation, they've already
              confirmed their budget and timeline. I start five steps ahead.</li>
            </ul>

            <p>
              I've never lost a deal because the bot asked a qualifying question. Not once.
            </p>

            <h2 className="font-display text-2xl font-bold text-white mt-10">
              The Rep Who Screens vs. The Rep Who Chases
            </h2>

            <p>
              Walk onto any floor in America and you'll see two types of reps:
            </p>

            <p>
              <strong className="text-deal">Type A:</strong> Phone glued to hand. Replying to every "Is this available?" at stoplights.
              Sending "Hey, just checking in!" texts to people who haven't replied in three weeks.
              End of the month? <strong className="text-white">13 deals, exhausted, missed the bonus by 2.</strong>
            </p>

            <p>
              <strong className="text-deal">Type B:</strong> Phone in the pocket. Working the lot. Deep in a T.O. with a family
              that's ready to buy. End of the month? <strong className="text-white">18 deals, hit the bonus, went home at 6.</strong>
            </p>

            <p>
              Type B doesn't work harder. <strong className="text-deal">He works fewer leads.</strong> He just works the right ones.
            </p>

            <p>
              AI screening is what makes Type B possible. You can't be on the floor closing and on your phone
              qualifying at the same time. Something's got to give.
            </p>

            <h2 className="font-display text-2xl font-bold text-white mt-10">
              The Shift That Changed My Month
            </h2>

            <p>
              May was my best month this year. Not because I got more leads — I got about the same number.
              But I spent <strong className="text-deal">10 fewer hours on my phone</strong> and those 10 hours went onto the
              floor. Into T.O.s. Into the service lane. Into the things that actually move metal.
            </p>

            <p>
              One of those hours turned into a $3,800 front-end gross on a trade-up I would have missed
              if I'd been in the back office typing "I'll check on that for you" to someone who was already
              halfway to the Ford dealer down the street.
            </p>

            <p>
              Here's the truth: <strong className="text-deal">your time is your inventory.</strong> You only have so many hours on
              the floor. Every one you spend on a tire-kicker is one you can't spend on a buyer.
              AI doesn't replace your hustle. It <strong className="text-white">protects</strong> your hustle by keeping the noise out.
            </p>

            <h2 className="font-display text-2xl font-bold text-white mt-10">
              Try It Before You Judge It
            </h2>

            <p>
              I don't expect you to take my word for it. I built something exactly for this — a live
              AI closer that screens leads, handles objections, and sends the warm ones straight to your
              phone. It's running right now. You can talk to it.
            </p>

            <p className="text-ash">
              Ask Dora what she'd ask a tire-kicker. See how she handles a "just looking" objection.
              One conversation is all it takes to feel the difference between screening and chasing.
            </p>
          </div>

          {/* CTA — Vera posts get the "Talk to Dora" CTA */}
          <div className="mt-14 border-t border-white/10 pt-8">
            <p className="mb-6 text-sm text-ash">
              Dora is live on the Deal Clozr homepage right now. She'll screen, qualify, and set appointments
              — the same way she screens for me on the floor. Ask her anything.
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
