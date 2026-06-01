import Link from "next/link";
import { ArrowLeft, Clock, User } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Four Numbers That Matter in Every Deal",
  description:
    "Payment, term, money factor, residual. Every closer runs these numbers — but most reps don't understand how they connect. Here's the deal math that actually moves deals.",
  openGraph: {
    title: "The Four Numbers That Matter in Every Deal — Deal Clozr",
    description:
      "Payment, term, money factor, residual. How the four numbers connect and how knowing them changes the way you sell.",
    images: ["/api/og"],
  },
};

export default function FourNumbersThatMatter() {
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
              Deal Math
            </span>
          </div>

          <h1 className="font-display text-4xl font-black leading-[1.1] tracking-[-0.02em] text-white md:text-5xl">
            The Four Numbers That Matter in Every Deal
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
            <span>June 1, 2026</span>
          </div>

          <div className="mt-10 space-y-6 text-base leading-relaxed text-bone">
            <p>
              Most sales reps can tell you the payment on a Camry LE without
              pulling a single number. Fifty-two weeks a year, twelve cars at a
              time — the numbers start living in your head.
            </p>
            <p>
              But knowing the payment and understanding the deal are two
              different things. I spent my first two years on the floor knowing
              what the payment was without understanding why it was that number.
              I couldn't explain where the money went. I couldn't move a deal
              when it got stuck because I only had one lever: the price of the
              car.
            </p>
            <p>
              Then I learned the four numbers. Every deal is these four numbers
              in different clothes. Lease or finance, new or used, the structure
              is the same. Once I understood them, I stopped being a closer and
              started being a deal architect.
            </p>
            <p>
              Here's what they are and how I use them every day on this floor.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">
              Number 1: The Payment
            </h2>
            <p>
              <strong className="text-bone">This is what the customer hears.</strong>{" "}
              The payment is the only number that matters to 80% of the people
              sitting at your desk. They don't care about the MSRP. They don't
              care about the rebate. They care about what leaves their bank
              account every month.
            </p>
            <p>
              Here's the mistake most reps make: they treat the payment like a
              fixed output. "The car is $34,000. The payment is $487. Take it or
              leave it." That's not selling — that's reading a spec sheet.
            </p>
            <p>
              The payment is the headline. But the headline can change based on
              what you do with the other three numbers. I've kept the same car,
              the same price, and changed the payment by $85 a month just by
              moving the other levers. The customer thought I "found a way to
              make it work." What I actually did was restructure the deal.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">
              Number 2: The Term
            </h2>
            <p>
              <strong className="text-bone">This is time disguised as money.</strong>{" "}
              36 months, 48 months, 60 months, 72 months. Every extra year
              drops the payment and costs the customer more in total. But the
              customer almost never asks about the total cost. They ask about
              the monthly payment.
            </p>
            <p>
              Here's where deal math gets interesting. A customer walks in
              wanting a $400 payment on a $36,000 car. At 60 months, that's
              roughly $580. At 72 months, it's roughly $510. At 84 months — and
              yes, some banks do 84 — it's roughly $460. None of those numbers
              hit $400.
            </p>
            <p>
              But add a $4,000 trade with $2,000 in equity, a $1,500 rebate,
              and suddenly you're at $380 on the 72-month. Same car. Same
              customer. Different deal.
            </p>
            <p>
              The term is the first lever I pull when the payment doesn't work.
              I don't lead with it — leading with "let's stretch it to 72
              months" sounds predatory. But when a customer says "I can't do
              $487," I say: "What if we kept the car you want and adjusted the
              structure instead?" Then I walk through the options. Longer term
              drops the payment. Different mileage on a lease drops the payment.
              More down drops the payment. I give them choices — and every
              choice is the same car.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">
              Number 3: The Money Factor (or Rate)
            </h2>
            <p>
              <strong className="text-bone">This is the hidden variable.</strong>{" "}
              The interest rate on a finance deal. The money factor on a lease.
              Most customers don't know what this is. Most reps don't either.
              They just plug it into the system and let the computer spit out a
              payment.
            </p>
            <p>
              But the rate is where the house makes its money — and where a
              good closer can find room without touching the price of the car.
            </p>
            <p>
              Here's a real example from last week. Customer leased a RAV4
              XLE. Base money factor was .00275 (about 6.6% APR). That's
              standard — not great, not terrible. The customer had a 780 credit
              score. He qualified for Tier 1+, which is .00185 (about 4.4%
              APR). The difference on a $34,000, 36-month lease? About $34 a
              month.
            </p>
            <p>
              I didn't cut the price. I didn't add a term. I checked the rate
              tier before I even ran the numbers. The customer thought I worked
              magic. I just read the rate sheet.
            </p>
            <p>
              Toyota Financial Services publishes their tiers. Most stores have
              a rate sheet on the desk. But I bet if you walked onto your floor
              right now and asked five reps what money factor their last lease
              was at, four of them wouldn't know. That's four reps leaving $30
              to $50 a month on the table because they didn't check.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">
              Number 4: The Residual
            </h2>
            <p>
              <strong className="text-bone">This is the endgame.</strong> The
              residual is what the car is worth at the end of the lease. Toyota
              residuals are strong — usually 55% to 62% depending on the model
              and term. A high residual means lower monthly payment. Simple
              math.
            </p>
            <p>
              But here's what most people miss: the residual is set by the
              bank. I can't change it. You can't change it. The customer can't
              negotiate it. It's locked. And that's actually great for the
              closer — because it means there's a fixed number in the deal that
              nobody can argue with.
            </p>
            <p>
              "I understand you want a lower payment, sir. Unfortunately, I
              can't change what the bank says the car is worth in three years.
              But here's what I can do —" and then I move to the rate, the
              term, or the cap cost. The residual becomes a firewall. It shuts
              down the negotiation on that point and redirects the customer to
              the levers I can actually pull.
            </p>
            <p>
              On the finance side, the residual is just trade value at the end.
              The same principle applies: the car's value in the future is not
              something I control. But I can frame the deal around it. "This
              Camry holds 58% of its value after three years. That means you're
              paying for 42% of the car. That's the lease. If you buy it, you
              own the whole thing — and it's still worth more than anything
              else in its class." That's not a pitch. That's math. And math
              doesn't argue back.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">
              How I run the four numbers on every deal
            </h2>
            <p>
              Here's my actual process at the desk. Customer sits down. I've
              already checked their credit tier (if they let me) and the current
              rate sheet. I know the residual on the car they picked. I know the
              term I'm starting with.
            </p>
            <p>
              I present the deal in one sentence: "This RAV4 at 36 months,
              $2,500 down, with your credit tier, lands at $469 a month."
            </p>
            <p>
              They push back. Every single time. If they don't push back, I
              priced it too low.
            </p>
            <p>
              When they push back, I don't go to the price of the car first. I
              go to the rate. "Let me check if there's a better rate tier." Then
              I go to the term. "What if we stretched it to 39 months instead?"
              Then I go to the structure. "What if we put a little more down, or
              what if we do a one-pay lease?"
            </p>
            <p>
              Price of the car is the last lever I pull. Not the first. Because
              once you discount the metal, you can't get it back. But you can
              always adjust the term, the rate, or the structure. The four
              numbers give you four shots at closing the deal. Most reps only
              give themselves one.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">
              The AI that runs the math for me
            </h2>
            <p>
              This is where Deal Clozr changed the game for me on the floor. My
              AI agent knows the rate tiers. It knows the residuals. It knows
              Toyota Financial Services lease programs. When a customer sits
              down, I pull up the agent on my phone and it tells me: "This
              model, this trim, this term — residual is 59%. Current rate tier
              for a 750+ credit is .00185. Here's the payment at 36, 39, and 48
              months."
            </p>
            <p>
              I used to have to run three different deals manually and hope I
              remembered the right structure. Now I have the full matrix in ten
              seconds. The customer asks "what if I put $3,000 down?" — I have
              the answer before they finish the sentence. That speed builds
              confidence. And confidence closes deals.
            </p>
            <p>
              Before the agent, I was a good closer who knew his numbers. Now
              I'm a closer who knows every possible version of the deal before
              the customer even thinks to ask.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">
              What I'd tell a new rep
            </h2>
            <p>
              If you're new on the floor and you only learn one thing this
              month, learn these four numbers. Not the scripts. Not the
              objection handlers. Not the closes. The deal math.
            </p>
            <p>
              Learn what a money factor is and how it changes by credit tier.
              Learn the residuals on the cars you sell most. Learn how term
              affects payment. And learn which lever to pull first.
            </p>
            <p>
              A customer can feel it when you understand the deal. They can
              also feel it when you're guessing. The four numbers are the
              difference between sounding like a closer and sounding like
              someone who just learned the payment from a computer screen.
            </p>
            <p>
              I spent two years guessing. Then I spent one year learning the
              math. That third year was my best year on the floor — and it had
              nothing to do with my personality or my scripts. It had everything
              to do with knowing what the numbers actually mean.
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
