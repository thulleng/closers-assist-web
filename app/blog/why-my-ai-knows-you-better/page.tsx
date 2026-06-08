import Link from "next/link";
import { ArrowLeft, Clock, User } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Why My AI Knows You Better Than My CRM Ever Did",
  description: "A CRM remembers what you said. My agent remembers how you buy, how you think, and exactly when to bring you back. Here's why memory changes everything on the floor.",
  openGraph: {
    title: "Why My AI Knows You Better Than My CRM Ever Did — Deal Clozr",
    description:
      "A CRM remembers what you said. My agent remembers how you buy. Memory changes everything on the floor.",
    images: ["/api/og"],
  },
};

export default function WhyMyAIKnowsYouBetter() {
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
              AI & Sales
            </span>
          </div>

          <h1 className="font-display text-4xl font-black leading-[1.1] tracking-[-0.02em] text-white md:text-5xl">
            Why My AI Knows You Better Than My CRM Ever Did
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
            <span>June 8, 2026</span>
          </div>

          <div className="mt-10 space-y-6 text-base leading-relaxed text-bone">
            <p>
              Every CRM on every lot does the same thing: it stores what the
              customer said, and then it waits for you to do something with it.
            </p>
            <p>
              That&rsquo;s not memory. That&rsquo;s a filing cabinet.
            </p>
            <p>
              A filing cabinet with a 48-hour window before the lead goes cold.
              A filing cabinet that doesn&rsquo;t call you when a customer
              mentions their lease is up next month. A filing cabinet that
              doesn&rsquo;t know the difference between &ldquo;I&rsquo;m just
              looking&rdquo; from a Researcher and &ldquo;I&rsquo;m just
              looking&rdquo; from a Payment Buyer who&rsquo;s scared to
              negotiate.
            </p>
            <p>
              I ran CRMs for years. They&rsquo;re fine for compliance. They
              tell my sales manager who I called and when. But they never made
              me a better closer. They never told me something I didn&rsquo;t
              already know.
            </p>
            <p>
              My AI agent does. And that changes everything.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">
              What memory actually looks like on the floor
            </h2>
            <p>
              A lead comes in at 9:47pm on a Tuesday. His name is Mike. He asks
              about a Tacoma TRD Off-Road. The CRM logs it. Cool.
            </p>
            <p>
              Here&rsquo;s what my agent does with that same 9:47pm lead:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-ash">
              <li>
                <strong className="text-bone">Remembers the exact trim</strong>{" "}
                — not &ldquo;Tacoma,&rdquo; but TRD Off-Road in Lunar Rock.
                It&rsquo;s the difference between &ldquo;we have Tacomas&rdquo;
                and &ldquo;I know exactly which one you were looking at.&rdquo;
              </li>
              <li>
                <strong className="text-bone">Reads his style</strong> — Mike
                asked about towing capacity, payload, and approach angle before
                he asked about the payment. My agent tags him: Researcher.
                Follow-up goes spec-first, price-last.
              </li>
              <li>
                <strong className="text-bone">
                  Knows his timeline from his language
                </strong>{" "}
                — &ldquo;I&rsquo;m looking to get into something in the next
                couple weeks&rdquo; versus &ldquo;just doing some research.&rdquo;
                The agent adjusts the cadence. Two-week timeline gets a call
                prompt on Day 2. Research mode gets content first, call on Day
                7.
              </li>
              <li>
                <strong className="text-bone">
                  Connects him to my inventory
                </strong>{" "}
                — before I even say a word, the agent tells me: &ldquo;Two TRD
                Off-Roads on the lot. One Lunar Rock in transit. ETA June 14.
                Customer is a Researcher. Lead with the numbers.&rdquo;
              </li>
            </ul>
            <p>
              The CRM gave me a name and a phone number. The agent gave me a
              playbook.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">
              The thing CRMs can&rsquo;t do: learn
            </h2>
            <p>
              Here&rsquo;s where it gets interesting. My agent doesn&rsquo;t
              just remember the lead — it remembers <em>me</em>.
            </p>
            <p>
              It knows my pay plan. It knows that when I hit 11 units, I get
              $500 — and it tracks my pace against the calendar. Last week it
              flagged: &ldquo;You&rsquo;re at 7 units on June 4. At this pace,
              you finish at 12 — one deal past the $500 bonus but short of the
              $1,000 at 15. I&rsquo;m prioritizing leads with high conversion
              probability for the next 7 days.&rdquo;
            </p>
            <p>
              That&rsquo;s not a dashboard. That&rsquo;s a coach. And it
              doesn&rsquo;t require me to log in, run a report, or ask a
              question. It surfaces what I need to know before I know I need
              it.
            </p>
            <p>
              A CRM is reactive. You type, it stores. My agent is proactive. It
              watches, it learns, it acts. That&rsquo;s the difference between
              a tool you use and a tool that uses itself on your behalf.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">
              How memory makes follow-up feel human
            </h2>
            <p>
              The oldest objection in car sales: &ldquo;I don&rsquo;t want to
              talk to a robot.&rdquo;
            </p>
            <p>
              I hear it from other reps. And I used to believe it. But after 60
              days running this agent, I realized the objection isn&rsquo;t
              about the robot — it&rsquo;s about the script.
            </p>
            <p>
              A bad AI sounds robotic because it has no memory. It sends the
              same message to every lead. It doesn&rsquo;t know who you are,
              what you asked, or why you stopped replying. That&rsquo;s not an
              AI problem — that&rsquo;s a bad implementation problem.
            </p>
            <p>
              My agent doesn&rsquo;t send generic follow-ups. When a lead named
              Sarah goes cold after asking about a Corolla Hybrid, the agent
              doesn&rsquo;t send &ldquo;just checking in.&rdquo; It sends:
            </p>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm italic text-ash">
                &ldquo;Hey Sarah — the Corolla Hybrid you asked about last
                month is still here. Also just got a 2026 allocation with the
                Blueprint color you mentioned. Inventory is tight on these, but
                I wanted you to know before it hits the website. No rush —
                happy to send over the updated numbers if you&rsquo;re
                curious.&rdquo;
              </p>
            </div>
            <p>
              That&rsquo;s not a script. That&rsquo;s a specific person being
              addressed about a specific car they specifically asked about.
              Sarah feels seen. She replies. That&rsquo;s what memory buys you.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">
              The gap between a CRM and a closer
            </h2>
            <p>
              Every dealer I know spends thousands on CRM software. Some of
              them are fine. Some of them are terrible. But none of them close
              a deal.
            </p>
            <p>
              A CRM is a record of history. It tells you what happened. An AI
              agent with memory is an engine of action. It tells you what to do
              next — and then it does the boring parts for you.
            </p>
            <p>
              Here&rsquo;s the distinction that matters: the CRM knows a
              customer exists. My agent knows how to sell them. It knows their
              buyer type, their price sensitivity, their timeline, their
              objection pattern, and the exact moment they&rsquo;re most likely
              to respond. And it learns more with every interaction.
            </p>
            <p>
              That&rsquo;s not a feature. That&rsquo;s a fundamental shift in
              how the floor works. The rep with an agent that remembers isn&rsquo;t
              just faster — they&rsquo;re more human. Because real human
              connection requires remembering who someone is.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">
              What&rsquo;s next for the agent
            </h2>
            <p>
              I&rsquo;m building the next layer right now. The agent is
              learning to recognize patterns across customers — not just one
              lead, but the shape of a deal it&rsquo;s seen before. When a
              customer says &ldquo;let me talk to my wife&rdquo; and a certain
              set of follow-up conditions hit, the agent already knows the
              closing script that works. It&rsquo;s seen this movie before.
            </p>
            <p>
              That&rsquo;s where this is heading. Not a smarter filing cabinet.
              A closer that remembers every deal, every objection, every
              objection that worked — and surfaces the right play before the
              rep has to ask for it.
            </p>
            <p>
              The CRM industry has spent 20 years building better ways to store
              data. I spent 60 days building a way to actually use it.
            </p>

            <p className="text-bone font-semibold">
              Deal Clozr is $29.99 per rep per month. One deal pays for 10
              years. And unlike your CRM, this one actually remembers who you
              are.
            </p>
          </div>

          <div className="mt-14 border-t border-white/10 pt-8">
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
