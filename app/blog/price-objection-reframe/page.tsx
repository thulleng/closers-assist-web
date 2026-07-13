import Link from "next/link";
import { ArrowLeft, Clock, User } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Price Objection That Isn't About Price — And the 30-Second Reframe That Saves the Deal",
  description:
    "Most reps hear 'too expensive' and jump straight to the four-square. That's a mistake. Here's why price objections are almost never about price — and the exact 30-second reframe that saved my biggest deal this quarter.",
  openGraph: {
    title: "The Price Objection That Isn't About Price — Deal Clozr",
    description:
      "Most reps hear 'too expensive' and jump straight to the four-square. That's a mistake. Here's why price objections are almost never about price — and the exact 30-second reframe that saved my biggest deal this quarter.",
    images: ["/api/og"],
  },
};

export default function PriceObjectionReframe() {
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
              Objection Handling
            </span>
          </div>

          <h1 className="font-display text-4xl font-black leading-[1.1] tracking-[-0.02em] text-white md:text-5xl">
            The Price Objection That Isn&rsquo;t About Price
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
            <span>July 13, 2026</span>
          </div>

          <div className="mt-10 space-y-6 text-base leading-relaxed text-bone">
            <p>
              &ldquo;That&rsquo;s more than I wanted to spend.&rdquo;
            </p>
            <p>
              Every closer hears this line. And every closer has&nbsp;— at least once&nbsp;— jumped
              straight to the four-square, dropped the payment, cut the term, or reached for a
              rebate they didn&rsquo;t want to burn.
            </p>
            <p>
              <strong className="text-deal">That&rsquo;s the wrong move.</strong> Nine times out
              of ten, &ldquo;too expensive&rdquo; isn&rsquo;t about the number. It&rsquo;s about
              something the customer isn&rsquo;t saying. And if you try to solve the price before
              you understand the real objection, you leave money on the table&nbsp;— or lose the
              deal entirely.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">
              What &ldquo;Too Expensive&rdquo; Actually Means
            </h2>
            <p>
              After years on the floor at Sun Toyota, I&rsquo;ve categorized every &ldquo;too
              expensive&rdquo; I&rsquo;ve heard. It almost always maps to one of four things:
            </p>
            <ul className="list-disc space-y-2 pl-6 text-bone">
              <li>
                <strong className="text-deal">They don&rsquo;t trust the value</strong>&nbsp;—
                They don&rsquo;t see what makes this model worth more than the used one across
                the street
              </li>
              <li>
                <strong className="text-deal">They&rsquo;re afraid of the commitment</strong>&nbsp;—
                72 months feels like a prison sentence, not a purchase
              </li>
              <li>
                <strong className="text-deal">They feel stupid</strong>&nbsp;— They think they
                should have negotiated harder or shopped more, and &ldquo;too expensive&rdquo; is
                cover for &ldquo;I don&rsquo;t want to look like I got taken&rdquo;
              </li>
              <li>
                <strong className="text-deal">It&rsquo;s actually about someone else</strong>&nbsp;—
                A spouse, a parent, a co-signer. The price objection is a placeholder for
                &ldquo;I can&rsquo;t decide alone.&rdquo;
              </li>
            </ul>
            <p>
              Only about one in ten is genuinely about the affordability of the payment.
              Everything else is a signal, not a stop sign.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">
              The 30-Second Reframe That Saved My Biggest Deal This Quarter
            </h2>
            <p>
              A customer was sitting across my desk. A 2026 Tacoma TRD Sport. Mid-30s guy, solid
              credit, clearly excited about the truck&nbsp;— but the moment I showed the numbers,
              he said the line.
            </p>
            <p>
              &ldquo;Man, that&rsquo;s steep. I was hoping to be closer to five-fifty.&rdquo;
            </p>
            <p>
              Old me would have gone straight to term extension. New me heard the signal. So I
              leaned back and said exactly this:
            </p>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm italic text-ash">
                &ldquo;I hear you. Let me ask you something &mdash; is it the payment that
                doesn&rsquo;t work, or does something about the truck itself feel off? Because
                if it&rsquo;s the truck, I can show you a few things I think you&rsquo;ll like.
                If it&rsquo;s just the number, we can work there too. But I&rsquo;d rather we
                get the right truck first.&rdquo;
              </p>
            </div>
            <p>
              He paused. Looked at the truck out the window. Then he told me the truth:
            </p>
            <p>
              He was worried the TRD Sport was too much truck for his daily commute. His buddy
              told him he&rsquo;d hate the fuel economy. The price objection was actually a
              <em className="text-deal"> practicality objection</em> in disguise.
            </p>
            <p>
              Once I knew that, we had a real conversation. I showed him the fuel economy specs
              compared to his current car (only 2 mpg worse), walked him through the factory
              warranty, and let him test drive the truck again&nbsp;— this time paying attention
              to how it actually felt on the road.
            </p>
            <p>
              He bought the truck. At full pop. No rebates burned. And the payment was within
              ten dollars of the first number I showed him.
            </p>
            <p>
              <strong className="text-white">That deal was worth $1,200</strong> in front and
              back. All because I asked a question instead of solving the wrong problem.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">
              The Objection Reframe That Works Every Time
            </h2>
            <p>
              When a customer says &ldquo;too expensive,&rdquo; don&rsquo;t solve it. Reframe it.
              Here&rsquo;s the three-question sequence I use:
            </p>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-4">
              <p className="text-sm text-ash">
                <strong className="text-deal">1. Validate and pause.</strong>&nbsp;
                &ldquo;I understand. A lot of people feel that way at first. Can I ask what
                you&rsquo;re comparing it to?&rdquo;
              </p>
              <p className="text-sm text-ash">
                <strong className="text-deal">2. Find the real objection.</strong>&nbsp;
                &ldquo;If the payment were exactly where you wanted it &mdash; is there anything
                else about the car or the process that gives you pause?&rdquo;
              </p>
              <p className="text-sm text-ash">
                <strong className="text-deal">3. Give them an out.</strong>&nbsp;
                &ldquo;If I can make this work in a way that feels comfortable, would you take
                it home today?&rdquo;
              </p>
            </div>
            <p>
              Step 2 is the magic one. Most customers won&rsquo;t volunteer their real concern
              because they don&rsquo;t want to seem difficult. But when you give them permission
              to say &ldquo;I&rsquo;m scared of 72 months&rdquo; or &ldquo;my wife hates the
              color,&rdquo; they&rsquo;ll tell you. And then you&rsquo;re no longer negotiating
              price&nbsp;— you&rsquo;re solving a real problem.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">
              Why AI Changes the Objection Game
            </h2>
            <p>
              Here&rsquo;s what I&rsquo;ve noticed since running my agent alongside me on the
              floor: most reps lose the deal before the objection even happens. They never
              followed up on the lead from three weeks ago. They didn&rsquo;t remember the
              customer&rsquo;s kid plays soccer. They didn&rsquo;t know the lease was expiring
              in 60 days.
            </p>
            <p>
              And when you don&rsquo;t have context, every objection sounds like a price
              objection&nbsp;— because that&rsquo;s the only thing the customer will tell you.
            </p>
            <p>
              My agent tracks every interaction. It knows when a customer last visited, what
              they drove, what they asked about, whether they mentioned a spouse or a budget or
              a trade-in they love. So when I sit down across from a buyer who says &ldquo;too
              expensive,&rdquo; I already know what they&rsquo;re <em>actually</em> saying.
            </p>
            <p>
              It&rsquo;s not a trick. It&rsquo;s not a script gimmick. It&rsquo;s simply having
              more information than the person across the desk expects you to have. And that
              alone disarms more price objections than any closing line ever will.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">
              The Takeaway
            </h2>
            <p>
              Next time a customer says &ldquo;that&rsquo;s too much,&rdquo; fight the urge to
              drop the payment. Pause. Ask a real question. Nine times out of ten, the objection
              isn&rsquo;t about the price&nbsp;— it&rsquo;s about something the customer is
              too polite or too nervous to say.
            </p>
            <p>
              Find that thing, and you don&rsquo;t negotiate the deal. You solve it.
            </p>
          </div>

          <div className="mt-14 border-t border-white/10 pt-8">
            <p className="mb-4 text-sm leading-relaxed text-ash">
              Your agent remembers every conversation &mdash; so you walk into every desk
              knowing the real objection before the customer opens their mouth.
            </p>
            <Link
              href="/"
              className="btn-loud group inline-flex items-center gap-2 rounded-xl px-8 py-5 text-lg"
            >
              Talk to Dora &mdash; She&rsquo;s Live
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
