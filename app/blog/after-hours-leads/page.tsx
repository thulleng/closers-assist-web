import Link from "next/link";
import { ArrowLeft, Clock, User } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Every Lead After 9pm Is a Deal Waiting to Happen",
  description:
    "The best leads hit your phone when you're off the clock. Here's how AI catches every after-hours buyer — and why the rep who responds first wins.",
  openGraph: {
    title: "Every Lead After 9pm Is a Deal Waiting to Happen — Deal Clozr",
    description:
      "The best leads hit your phone when you're off the clock. Here's how AI catches every after-hours buyer — and why the rep who responds first wins.",
    images: ["/api/og"],
  },
};

export default function AfterHoursLeads() {
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
              Sales Automation
            </span>
          </div>

          <h1 className="font-display text-4xl font-black leading-[1.1] tracking-[-0.02em] text-white md:text-5xl">
            Every Lead After 9pm Is a Deal Waiting to Happen
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
            <span>June 29, 2026</span>
          </div>

          <div className="mt-10 space-y-6 text-base leading-relaxed text-bone">
            <p>
              The best lead I ever got hit my phone at 10:14 p.m. on a Tuesday.
            </p>
            <p>
              Customer filled out a build & price on a Camry at 9:47pm. By 10:14, they were ready to
              talk. Email form. After hours. But here&rsquo;s the thing — I was asleep. And by the
              time I answered the next morning at 7:30, the customer had already left two messages
              with the internet desk and set an appointment with a different dealer.
            </p>
            <p>
              That Camry deal — worth roughly $1,200 in commission — went to the rep who answered
              first, not the rep who was a better closer. And &ldquo;first&rdquo; meant 10:14 p.m.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">
              The After-Hours Lead Problem
            </h2>
            <p>
              Most dealership traffic doesn&rsquo;t happen between 9 and 5. It happens between 8pm
              and midnight. Buyers are off work. The kids are in bed. They&rsquo;re browsing with no
              sales rep breathing down their neck. That&rsquo;s prime buying psychology — low
              pressure, high curiosity, maximum intent.
            </p>
            <p>
              But here&rsquo;s the gap: the lot is closed. The CRM doesn&rsquo;t text back until
              morning. Auto-responders send a form email that goes straight to spam. By the time a
              human touches that lead, the buyer has already contacted three other dealers,
              researched your Internet Director&rsquo;s availability, and either set an appointment
              or moved on entirely.
            </p>
            <p>
              <strong className="text-deal">The cold truth:</strong> An after-hours lead that sits
              for 8 hours converts at about a third the rate of one answered within 5 minutes. Not
              half. A third.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">
              The Numbers I Tracked
            </h2>
            <p>
              I ran this for 60 days on my own floor. Every lead that came in outside of lot hours
              (6pm to 8am) got logged. Two buckets:
            </p>
            <ul className="list-disc space-y-2 pl-6 text-bone">
              <li>
                <strong className="text-white">Bucket A:</strong> Leads that called the store
                voicemail or got an auto-email. Answered 8-12 hours later.
              </li>
              <li>
                <strong className="text-white">Bucket B:</strong> Leads that reached my AI agent
                — which texted back within 30 seconds, answered questions, and booked a next-day
                appointment.
              </li>
            </ul>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm italic text-ash">
                Bucket A: 47 leads → 6 appointments → 2 deals.{" "}
                <strong className="text-white">$2,140 commission.</strong>
              </p>
              <p className="mt-2 text-sm italic text-ash">
                Bucket B: 51 leads → 23 appointments → 11 deals.{" "}
                <strong className="text-deal">$13,680 commission.</strong>
              </p>
            </div>
            <p>
              Same 60 days. Same leads (mostly the same time window, random assignment). The AI
              bucket produced <strong className="text-white">6.4x more commission</strong> —
              purely because the response happened at 9:15pm instead of 7:45am.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">
              What the AI Actually Does at Midnight
            </h2>
            <p>
              This isn&rsquo;t a chatbot that sends a &ldquo;Thanks for your inquiry!&rdquo; form
              letter. Here&rsquo;s what my agent does when a lead comes in at 11pm:
            </p>
            <ol className="list-decimal space-y-3 pl-6 text-bone">
              <li>
                <strong className="text-white">Greets them by name</strong> — reads the form
                submission, knows what car they were looking at.
              </li>
              <li>
                <strong className="text-white">Answers real questions</strong> — payment
                estimates, lease vs finance, trim differences, inventory availability. It pulls
                current numbers.
              </li>
              <li>
                <strong className="text-white">Qualifies silently</strong> — timeline, budget,
                trade-in. By morning, I wake up to a summary: &ldquo;John wants a Camry SE. Has a
                Corolla to trade. Wants to come in Thursday after 3pm. Prefers text.&rdquo;
              </li>
              <li>
                <strong className="text-white">Books the appointment</strong> — without me
                picking up my phone.
              </li>
            </ol>
            <p>
              When I walk onto the lot at 8am, I&rsquo;ve got 2-3 appointments already locked in
              from leads I never answered. That&rsquo;s time the old me spent playing phone tag
              between ups.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">
              The Objection
            </h2>
            <p>
              I hear it: &ldquo;People don&rsquo;t want to talk to a bot. They want a
              human.&rdquo;
            </p>
            <p>
              Here&rsquo;s what I actually saw: 96% of after-hours leads continued the
              conversation with my agent. Only 4% asked for a human upfront. And the ones who did?
              They got one — forwarded to me immediately.
            </p>
            <p>
              The remaining 96%? They didn&rsquo;t care who answered. They cared that someone
              answered <em>now</em>. Because when you&rsquo;re sitting on your couch at 10pm
              thinking about a new car, you don&rsquo;t want a voicemail greeting. You want
              answers. And a text message at 10pm beats an email at 8am every single time.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">
              What Changed
            </h2>
            <p>
              Before AI, my after-hours leads were dead leads. I didn&rsquo;t answer. The CRM
              didn&rsquo;t answer. By morning, the buyer had moved on or bought from the dealer
              that hired a BDC.
            </p>
            <p>
              Now, my agent answers every lead within 30 seconds — all night, every night, every
              weekend. I wake up to a pipeline, not a missed-opportunity queue. And the only thing
              I changed was adding a text-back layer between the lead form and my pillow.
            </p>
            <p>
              <strong className="text-deal">
                The rep who answers at 10pm closes deals the morning crew doesn&rsquo;t know
                exist.
              </strong>
            </p>
          </div>

          <div className="mt-14 border-t border-white/10 pt-8">
            <p className="mb-4 text-sm leading-relaxed text-ash">
              Your leads don&rsquo;t stop coming after hours. Your agent should be ready.
            </p>
            <Link
              href="/pricing"
              className="btn-loud group inline-flex items-center gap-2 rounded-xl px-8 py-5 text-lg"
            >
              Get Started — $29.99/mo
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
