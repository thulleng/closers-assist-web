import Link from "next/link";
import { ArrowLeft, Clock, User } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Service Lane Is the Best Place to Sell a Car — Here's the Script",
  description:
    "Every customer sitting in your service lane has already bought from you. They trust you. Here's the exact script a Toyota rep uses to turn oil changes into new-car deals.",
  openGraph: {
    title: "The Service Lane Is the Best Place to Sell a Car — Deal Clozr",
    description:
      "Every customer sitting in your service lane has already bought from you. They trust you. Here's the exact script a Toyota rep uses to turn oil changes into new-car deals.",
    images: ["/api/og"],
  },
};

export default function ServiceLaneUps() {
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
            <span className="rounded-full border border-deal/30 bg-deal/10 px-2.5 py-0.5 text-[10px] font-semibold text-deal-light">
              Floor Strategy
            </span>
          </div>

          <h1 className="font-display text-4xl font-black leading-[1.1] tracking-[-0.02em] text-white md:text-5xl">
            The Service Lane Is the Best Place to Sell a Car — Here&rsquo;s the Script
          </h1>

          <div className="mt-4 flex items-center gap-4 text-xs text-muted">
            <span className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              4 min read
            </span>
            <span className="flex items-center gap-1">
              <User className="h-3 w-3" />
              Thul Leng
            </span>
            <span>July 6, 2026</span>
          </div>

          <div className="mt-10 space-y-6 text-base leading-relaxed text-bone">
            <p>
              Most reps fight for ups at the front door. Meanwhile, the service lane has
              40-60 customers a day who have <em className="text-deal">already bought from
              us</em>. They trust the dealership. They&rsquo;re sitting in a waiting room
              for 90 minutes with nothing to do. And almost nobody talks to them about a
              new car.
            </p>
            <p>
              That&rsquo;s insane. That&rsquo;s free money with a chair and a coffee
              machine next to it.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">
              Why Service Customers Are Gold
            </h2>
            <p>
              A fresh up walking onto the lot has done zero homework? You&rsquo;re
              starting from scratch. Payment education. Brand trust. Feature walkthrough.
              The whole song and dance.
            </p>
            <p>
              A service customer? They already own a car from your brand. They already
              trust your service department. They&rsquo;ve already decided that
              convenience and familiarity matter more than saving $500 across town.
            </p>
            <p>
              <strong className="text-deal">Here&rsquo;s the stat that changed how I work:</strong>{" "}
              A service customer is <strong className="text-white">3x more likely</strong> to
              buy their next car from the same dealership than a random internet lead. Why?
              Because you&rsquo;ve already proven your service department won&rsquo;t screw them.
              That trust carries straight into the showroom.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">
              The Script I Use — It Takes 90 Seconds
            </h2>
            <p>
              Here&rsquo;s the exact opener I walk over with. No pitch. No pressure. Just
              a conversation.
            </p>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm italic text-ash">
                &ldquo;Hey — I&rsquo;m Thul, I sell cars up front. I saw you pulled in
                for service. How long they telling you?&rdquo;
              </p>
            </div>
            <p>
              That&rsquo;s it. Acknowledge they&rsquo;re waiting. Show you noticed them.
              Now they know you&rsquo;re a person, not a predator.
            </p>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm italic text-ash">
                &ldquo;While you wait — mind if I ask what you&rsquo;re driving? Just
                curious. I&rsquo;ve been seeing a lot of people coming off lease on that
                model and the new ones are honestly nicer.&rdquo;
              </p>
            </div>
            <p>
              No &ldquo;are you looking to buy?&rdquo; No &ldquo;can I show you
              something?&rdquo; You&rsquo;re just talking about cars — which is literally
              the most natural thing in a dealership waiting room.
            </p>
            <p>
              If they bite, you&rsquo;ve got a live guest. If they don&rsquo;t? You said
              three sentences and walked away. No bridge burned. Try again on their next
              service visit.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">
              What 90 Minutes of Sitting Does
            </h2>
            <p>
              The waiting room is the most underrated sales tool on the lot. A customer
              sitting for 90 minutes has:
            </p>
            <ul className="list-disc space-y-2 pl-6 text-bone">
              <li>Scrolled Instagram and saw their friend&rsquo;s new car</li>
              <li>Gotten bored enough to actually look at the magazine on the table</li>
              <li>Wondered &ldquo;how much is my car worth right now?&rdquo; at least once</li>
              <li>
                Had time to google &ldquo;2027 Camry price&rdquo; while waiting for their
                inspection results
              </li>
            </ul>
            <p>
              That&rsquo;s not a customer who needs to be sold. That&rsquo;s a customer
              who needs a single nudge, and they&rsquo;ll walk themselves to the showroom.
            </p>
            <p>
              <strong className="text-deal">Real example:</strong> Last month I grabbed a
              guy waiting on his Highlander&rsquo;s 90k service. We talked for 4 minutes.
              His daughter was about to start driving. I showed him what a Corolla lease
              runs. He took a card, said he&rsquo;d think about it. Three weeks later he
              came back on a Saturday, bought the Corolla, and texted me &ldquo;still
              glad you talked to me that day.&rdquo;
            </p>
            <p>
              That deal was worth <strong className="text-white">$850 mini-stacked</strong>{" "}
              with a backend product. And I earned it in a 4-minute conversation that
              started because his oil was due.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">
              The System Makes It Repeatable
            </h2>
            <p>
              The problem with service lane ups is consistency. You can&rsquo;t stand
              out there all day. You&rs7;ve got fresh ups at the front door, phone ringing,
              deals to structure. The service lane becomes &ldquo;I&rsquo;ll get to it
              later&rdquo; — and later never comes.
            </p>
            <p>
              That&rsquo;s where having an AI agent that tracks every customer interaction
              changes things. My agent knows when a customer is in service, knows what they
              drive, knows how long until their lease ends. It sends a quiet text that
              morning: &ldquo;Hey, saw you&rsquo;re coming in for service today — while
              you&rsquo;re here, want me to pull up your trade value? No pressure.&rdquo;
            </p>
            <p>
              That one text <strong className="text-white">doubled</strong> my service lane
              strike rate. Because now I&rsquo;m not cold-walking the waiting room — the
              customer already knows I&rsquo;ll be there. And they&rsquo;ve already said
              yes in their head before I shake their hand.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">
              The One Thing That Matters
            </h2>
            <p>
              Most reps don&rsquo;t work the service lane because it feels like an
              interruption. &ldquo;They&rsquo;re here for an oil change, not a car
              sale.&rdquo;
            </p>
            <p>
              Here&rsquo;s what I learned: <strong className="text-deal">trusted customers
              don&rsquo;t mind being asked.</strong> They mind being pushed. Walk in with
              curiosity, not a quota, and they&rsquo;ll tell you exactly where they stand.
            </p>
            <p>
              The service lane put <strong className="text-white">$5,800</strong> in my
              pocket last month alone. More than any single internet lead source I run.
              And it cost me nothing but a walk across the lot and a 90-second opening
              line.
            </p>
          </div>

          <div className="mt-14 border-t border-white/10 pt-8">
            <p className="mb-4 text-sm leading-relaxed text-ash">
              Your agent can text every service customer before they walk in — warm up the
              lane before you leave your desk.
            </p>
            <Link
              href="/"
              className="btn-loud group inline-flex items-center gap-2 rounded-xl px-8 py-5 text-lg"
            >
              Talk to Dora — She&rsquo;s Live
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
