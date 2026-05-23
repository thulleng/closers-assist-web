import Link from "next/link";
import { ArrowLeft, Clock, User } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The $200 Mini That Pays $500",
  description: "A half mini is $200. But that half unit at 10.5 turns into a $500 bonus at 11. Here's the math.",
};

export default function MiniThatPays() {
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
            <span className="rounded-full border border-gold/30 bg-gold/10 px-2.5 py-0.5 text-[10px] font-semibold text-gold-light">
              Pay Plan Math
            </span>
          </div>

          <h1 className="font-display text-4xl font-black leading-[1.1] tracking-[-0.02em] text-white md:text-5xl">
            The $200 Mini That Pays $500
          </h1>

          <div className="mt-4 flex items-center gap-4 text-xs text-muted">
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" />3 min read</span>
            <span className="flex items-center gap-1"><User className="h-3 w-3" />Thul Leng</span>
            <span>May 5, 2026</span>
          </div>

          <div className="mt-10 space-y-6 text-base leading-relaxed text-bone">
            <p>
              A half mini pays $200. That&rsquo;s the number most reps see. They log it. They move on.
            </p>
            <p>
              But here&rsquo;s the math most reps never run: that half unit at 10.5 turns into a $500 bonus at 11. That $200 mini just became a $700 deal — and the rep who passed on it because “it&rsquo;s just a mini” left $500 on the table.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">The bonus ladder is the real game</h2>
            <p>
              At Sun Toyota, the bonus ladder works like this:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-ash">
              <li>11 units → $500 bonus (25% retro)</li>
              <li>15 units → $1,000 bonus (30% retro)</li>
              <li>20 units → $2,000 bonus (35% retro)</li>
            </ul>

            <p>
              Every unit counts. Half minis count as 0.5. Full minis count as 1. Full deals count as 1. They all stack toward the same ladder.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">The real math on a half mini</h2>
            <p>
              Let&rsquo;s say you&rsquo;re at 10.5 units. You&rsquo;re half a unit from $500. A half mini pays $200 and gets you 0.5 units — pushing you to 11.
            </p>
            <p>
              That&rsquo;s $200 (the mini) + $500 (the bonus) = <strong className="text-deal">$700 total for one deal.</strong>
            </p>
            <p>
              Now let&rsquo;s say you&rsquo;re at 14.5 units — half a unit from the $1,000 bonus at 15. Same half mini. $200 + $1,000 = <strong className="text-deal">$1,200.</strong>
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">Why most reps leave money on the table</h2>
            <p>
              Most reps only care about front gross. They chase the $3,000+ full deals and treat minis like filler. But minis are the highest-leverage deals on the board — because they cost you nothing in gross and everything in unit count.
            </p>
            <p>
              A full deal at $3,200 front gross pays $800.75 (25%). A half mini at $0 front gross, at 10.5 units, pays $700 ($200 + $500 bonus). The mini is <strong className="text-deal">87% as valuable</strong> as the full deal — with zero negotiation, zero T.O., and zero gross requirement.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">Stack minis. Stack bonuses. Stack paychecks.</h2>
            <p>
              The reps who finish at 20 units don&rsquo;t get there on full deals alone. They stack minis. They count every half. They know exactly how many units they need and exactly what each additional deal is worth — not just in commission, but in bonus progression.
            </p>
            <p>
              Your CRM doesn&rsquo;t tell you this. ChatGPT doesn&rsquo;t know your bonus ladder. Deal Clozr does — in real time, without being asked. That&rsquo;s the difference between a tool that takes notes and a tool that makes you money.
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
