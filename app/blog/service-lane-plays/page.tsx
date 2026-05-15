import Link from "next/link";
import { ArrowLeft, Clock, User } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Three Plays for the Service Lane",
  description: "Oil change customers are the warmest leads on the lot. Three plays that turn service into sales.",
};

export default function ServiceLanePlays() {
  return (
    <main>
      <article className="relative overflow-hidden loud-bg">
        <div className="grid-pattern opacity-30" />
        <div className="relative mx-auto max-w-3xl px-6 py-16 md:py-24">
          <Link href="/blog" className="mb-8 inline-flex items-center gap-1.5 text-sm text-ash hover:text-bone transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
            Back to the floor
          </Link>

          <div className="mb-3">
            <span className="rounded-full border border-deal/30 bg-deal/10 px-2.5 py-0.5 text-[10px] font-semibold text-deal-light">
              Objection Handling
            </span>
          </div>

          <h1 className="font-display text-4xl font-black leading-[1.1] tracking-[-0.02em] text-white md:text-5xl">
            Three Plays for the Service Lane
          </h1>

          <div className="mt-4 flex items-center gap-4 text-xs text-muted">
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" />3 min read</span>
            <span className="flex items-center gap-1"><User className="h-3 w-3" />Thul Leng</span>
            <span>May 2, 2026</span>
          </div>

          <div className="mt-10 space-y-6 text-base leading-relaxed text-bone">
            <p>
              Oil change customers are the warmest leads on the lot. They already own a Toyota. They&rsquo;re already in the building. They&rsquo;re already spending money. And they&rsquo;re waiting — bored — for 30 to 45 minutes.
            </p>
            <p>
              Here are three plays that turn a $49.95 oil change into a deal.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">Play 1: The Equity Pull</h2>
            <p>
              Before they walk in, pull their trade value. Run the numbers. When you approach them in the waiting area, you&rsquo;re not selling — you&rsquo;re informing.
            </p>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm italic text-ash">
                &ldquo;Hey, while you&rsquo;re waiting — I ran your RAV4&rsquo;s trade value real quick. You&rsquo;re sitting on about $4,500 more equity than you probably think. If you&rsquo;ve got 5 minutes, I can show you what a new one looks like at basically the same payment.&rdquo;
              </p>
            </div>
            <p>
              <strong className="text-deal">Why it works:</strong> You&rsquo;re not asking them to buy. You&rsquo;re giving them information. And the information is good news — their car is worth more than they thought. That&rsquo;s not a pitch. That&rsquo;s a favor.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">Play 2: The Payment Drop</h2>
            <p>
              Most customers assume a new car means a higher payment. That&rsquo;s often wrong — especially with lease incentives and trade equity.
            </p>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm italic text-ash">
                &ldquo;Quick thing — a lot of our service customers don&rsquo;t realize their payment could actually go down with a new one. New incentives just dropped. Want me to run the numbers real quick while your oil change finishes? No pressure — just curious if it works in your favor.&rdquo;
              </p>
            </div>
            <p>
              <strong className="text-deal">Why it works:</strong> &ldquo;Could go down&rdquo; creates curiosity. &ldquo;No pressure&rdquo; disarms. &ldquo;While your oil change finishes&rdquo; frames it as killing time, not being sold to. And if the math works — you just created a deal out of an oil change.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">Play 3: The Service Save</h2>
            <p>
              The first two services on a new Toyota are free. That&rsquo;s $200 back in their pocket — and the perfect bridge from service to sales.
            </p>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm italic text-ash">
                &ldquo;Just so you know — your first two services are free when you buy new. That&rsquo;s $200 you&rsquo;re about to spend today that you&rsquo;d get back. If the numbers line up, it might make more sense to put this oil change money toward something new. Let me run it quick?&rdquo;
              </p>
            </div>
            <p>
              <strong className="text-deal">Why it works:</strong> You&rsquo;re reframing the service cost as a loss — money they&rsquo;re spending that they could be saving. And you&rsquo;re offering a no-commitment way to check. The worst they can say is no — and they&rsquo;re still stuck waiting for their car.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">The common thread</h2>
            <p>
              All three plays share one thing: <strong className="text-deal">you&rsquo;re not selling.</strong> You&rsquo;re informing. You&rsquo;re offering. You&rsquo;re helping them kill time.
            </p>
            <p>
              Service lane customers don&rsquo;t want to be sold. They want their oil changed. But if you can make the conversation about <em>their</em> car, <em>their</em> payment, and <em>their</em> situation — you&rsquo;ve got a shot.
            </p>
            <p>
              And if you don&rsquo;t? They&rsquo;re still getting their oil changed. Nothing lost. Everything gained.
            </p>
          </div>

          <div className="mt-14 border-t border-white/10 pt-8">
            <Link href="/pricing" className="btn-loud group inline-flex items-center gap-2 rounded-xl px-8 py-5 text-lg">
              Get Started — $29.99/mo
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
