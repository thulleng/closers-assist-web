import Link from "next/link";
import { ArrowLeft, Clock, User } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why Buyers Ghost You — And the One Question That Brings Them Back",
  description:
    "The real reason prospects go silent isn't what you think. It's not the price, the product, or the competition. Here's the psychology of the ghost — and the one question that re-engages 4 out of 5.",
};

export default function WhyBuyersGhostYou() {
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
            Why Buyers Ghost You — And the One Question That Brings Them Back
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
            <span>June 29, 2026</span>
          </div>

          {/* Body */}
          <div className="mt-10 space-y-6 text-base leading-relaxed text-bone">
            <p>
              Every rep knows the feeling. You had a great walkaround. The guy was smiling. His wife
              liked the color. You shook hands. Then — nothing. Text goes unanswered. Call goes to
              voicemail. The number that was texting you at 10 PM is suddenly a dead line.
            </p>

            <p>
              <strong className="text-deal">You got ghosted.</strong>
            </p>

            <p>
              For years I blamed myself. I pushed too hard. I didn't push hard enough. The price was
              too high. The payment was too much. I'd run every scenario through my head and come up
              empty every time.
            </p>

            <p>
              Then I started tracking what actually happened to the people who ghosted me. I called
              the ones who eventually bought from other stores. I asked what went through their head
              that night when they said "I'll think about it" and never called back.
            </p>

            <p>
              <strong className="text-deal">What I learned changed how I sell.</strong>
            </p>

            <h2 className="font-display text-2xl font-bold text-white mt-10">
              The Ghost Isn't What You Think
            </h2>

            <p>
              Here's what almost every buyer told me: <strong className="text-white">They weren't avoiding me.</strong>
            </p>

            <p>
              They were avoiding the decision.
            </p>

            <p>
              The psychology is simple. When someone walks off the lot, they're standing at the edge
              of a $40,000 commitment. That's not a normal purchase. That's a life event. Their brain
              does what any brain does when faced with a high-stakes decision: <strong className="text-deal">it hits the brakes.</strong>
            </p>

            <p>
              But here's the part most reps miss — <strong className="text-white">the brake isn't "no."</strong> It's "not yet."
              Most buyers who ghost are still interested. They're just overwhelmed. They need someone
              to give them a reason to step back toward the decision without feeling pressured.
            </p>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm italic text-ash">
                "I wasn't ignoring him. I just didn't know what to say. I felt bad saying no because he
                was nice. So I said nothing." — A buyer who came back three weeks later
              </p>
            </div>

            <h2 className="font-display text-2xl font-bold text-white mt-10">
              The One Question That Changes Everything
            </h2>

            <p>
              After enough of these conversations, I landed on a single question that re-engages
              <strong className="text-deal"> roughly 4 out of 5</strong> ghosted leads:
            </p>

            <div className="rounded-xl border border-deal/20 bg-deal/5 p-5 text-center">
              <p className="text-lg font-bold text-white">
                "Hey — no pressure at all. Just curious: <strong className="text-deal-light">what's the one thing holding you back?</strong>"
              </p>
            </div>

            <p>
              That's it. No "still interested?" No "we have new inventory." No price drop. Just an
              honest question that gives them permission to tell you the truth.
            </p>

            <p>
              Here's why it works:
            </p>

            <ul className="list-disc pl-5 space-y-2 text-ash">
              <li>
                <strong className="text-white">It lowers the stakes.</strong> You're not asking for a commitment. You're asking
                for one piece of information. That's easy to give.
              </li>
              <li>
                <strong className="text-white">It flips the dynamic.</strong> Instead of chasing, you're listening. Most buyers
                expect another pitch. When they get curiosity instead, they relax.
              </li>
              <li>
                <strong className="text-white">It surfaces the real objection.</strong> Nine times out of ten, it's not the
                payment. It's "I need to talk to my wife" or "I'm nervous about my credit" or "I
                found something cheaper but I liked you better."
              </li>
            </ul>

            <p>
              Once you know the real objection, you can actually answer it. Before that question,
              you're just guessing.
            </p>

            <h2 className="font-display text-2xl font-bold text-white mt-10">
              The Real Deal I Closed With One Text
            </h2>

            <p>
              Guy came in on a Tuesday. Drove a Tacoma. Loved the new Tundra. Spent 45 minutes
              in the truck. Asked smart questions. Shook my hand and said "let me sleep on it."
              Then nothing for four days.
            </p>

            <p>
              I sent that one question on Saturday morning. He replied in 11 minutes:
            </p>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 text-sm italic text-ash">
              "Honestly man, I'm worried about the payment jump. My Tacoma payment is $412. I know
              the Tundra is more but I don't know how much more I can handle."
            </div>

            <p>
              There it was. Not "I don't want the truck." Not "the price is too high."
              <strong className="text-deal"> Three hundred dollars.</strong> That's the gap between what he was comfortable with and what
              he thought the payment would be. I showed him the real number on a 72-month. It was
              $487. He was expecting $600+. He came in Monday and signed.
            </p>

            <p>
              That deal almost died because the buyer was too embarrassed to say "I don't know how
              car payments work." One question saved it.
            </p>

            <h2 className="font-display text-2xl font-bold text-white mt-10">
              The Problem With "Just Checking In"
            </h2>

            <p>
              Most reps follow up ghosted leads with messages like:
            </p>

            <ul className="list-disc pl-5 space-y-2 text-ash">
              <li>"Hey, just checking in!"</li>
              <li>"Still thinking about that truck?"</li>
              <li>"We got new inventory, come take a look!"</li>
            </ul>

            <p>
              Here's what those messages communicate to a buyer who's overwhelmed: <strong className="text-deal">more pressure.</strong>
            </p>

            <p>
              "Just checking in" sounds friendly — but to someone who's avoiding the decision, it
              sounds like "I'm about to pitch you again." They read it, feel the guilt spike, and
              put the phone down.
            </p>

            <p>
              The one-question approach works because <strong className="text-white">it doesn't ask for a sale.</strong> It asks for
              honesty. And when you give people permission to be honest, most of them will take it.
            </p>

            <h2 className="font-display text-2xl font-bold text-white mt-10">
              The Second-Hand Close
            </h2>

            <p>
              Here's one more pattern I've seen work consistently. When a buyer tells you the real
              reason they're hesitating — the wife, the credit, the payment fear — don't immediately
              try to solve it. Say this instead:
            </p>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 text-sm italic text-ash">
              "I hear you. Can I ask — if that one thing weren't an issue, would you want the car?"
            </div>

            <p>
              This does two things. First, <strong className="text-deal">it confirms intent.</strong> If they say yes, you know
              the objection is the only blocker. Second, <strong className="text-deal">it separates the objection from the
              desire.</strong> Now you're on the same team, working together to solve the problem — instead
              of opposite sides of a negotiation.
            </p>

            <p>
              Most reps try to crush the objection. That makes the buyer defensive. <strong className="text-white">The better
              play is to acknowledge the objection, confirm the desire, then solve together.</strong>
            </p>

            <h2 className="font-display text-2xl font-bold text-white mt-10">
              What This Looks Like With an AI Agent
            </h2>

            <p>
              I don't send follow-ups manually anymore. My AI agent handles the timing — sends the
              first "no pressure" message at the right interval, detects when the buyer replies with
              the real objection, and surfaces it to me so I can step in at the perfect moment.
            </p>

            <p>
              The psychology is the same. The question is the same. But now I don't have to track
              30 follow-ups in my head while I'm on the floor closing someone else.
            </p>

            <p>
              <strong className="text-deal">The agent does the listening. I do the closing.</strong>
            </p>

            <h2 className="font-display text-2xl font-bold text-white mt-10">
              The Takeaway
            </h2>

            <p>
              Buyers don't ghost because they don't want your product. They ghost because they don't
              know what to say next. Your job isn't to chase harder — it's to give them an easy door
              back into the conversation.
            </p>

            <p>
              <strong className="text-deal">One question.</strong> No pitch. No pressure. Just honest curiosity about what's
              holding them back.
            </p>

            <p>
              Next time someone goes silent, try it. You might be surprised what comes out.
            </p>
          </div>

          {/* CTA — Vera cron post, use Dora CTA */}
          <div className="mt-14 border-t border-white/10 pt-8">
            <p className="mb-6 text-sm text-ash">
              Dora handles follow-ups like this automatically. She tracks every lead, sends the right
              message at the right time, and surfaces the real objection before you even pick up your
              phone. She's live right now on the Deal Clozr homepage.
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
