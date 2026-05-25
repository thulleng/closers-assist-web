import Link from "next/link";
import { ArrowLeft, Clock, User } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The T.O. That Saved a $4,800 Deal — Here's What I Actually Said",
  description: "Customer was walking. Manager was busy. Here's the T.O. I ran on myself that saved a deal — and why most T.O.s fail before you even open your mouth.",
  openGraph: {
    title: "The T.O. That Saved a $4,800 Deal — Deal Clozr",
    description: "Customer was walking. Manager was busy. Here's the T.O. I ran on myself — and why most T.O.s fail before you open your mouth.",
    images: ["/api/og"],
  },
};

export default function TOThatSavedTheDeal() {
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
              Floor Strategy
            </span>
          </div>

          <h1 className="font-display text-4xl font-black leading-[1.1] tracking-[-0.02em] text-white md:text-5xl">
            The T.O. That Saved a $4,800 Deal — Here&rsquo;s What I Actually Said
          </h1>

          <div className="mt-4 flex items-center gap-4 text-xs text-muted">
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" />4 min read</span>
            <span className="flex items-center gap-1"><User className="h-3 w-3" />Thul Leng</span>
            <span>May 25, 2026</span>
          </div>

          <div className="mt-10 space-y-6 text-base leading-relaxed text-bone">
            <p>
              Last Thursday. 4:30pm. Camry XSE. Customer had been on the lot for an hour. Test drove. Sat at the desk. Numbers looked good — $385 a month, $2,500 down, 36-month lease. The kind of deal that writes itself.
            </p>
            <p>
              Then he stood up.
            </p>
            <p>
              &ldquo;I need to sleep on it.&rdquo;
            </p>
            <p>
              Every closer on this floor knows what &ldquo;I need to sleep on it&rdquo; means. It means he&rsquo;s going to sleep on it, wake up, check three more dealerships on TrueCar, and send me to voicemail for two weeks. I knew it. He knew it. The deal was walking.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">The standard play — and why I didn&rsquo;t run it</h2>
            <p>
              The textbook move here is the manager T.O. &ldquo;Let me grab my manager — maybe he can sharpen the pencil for you.&rdquo; It&rsquo;s the oldest move in the book. And it works — sometimes.
            </p>
            <p>
              But I&rsquo;ve watched too many T.O.s crush deals. The customer knows what&rsquo;s happening. They feel the handoff. Their guard goes up. The manager walks over, introduces himself like he wasn&rsquo;t just summoned from the tower, and the customer mentally checks out before he finishes his first sentence.
            </p>
            <p>
              I didn&rsquo;t have a manager available anyway — Tony was closing a Tundra deal in the box. So I ran a T.O. on myself. And here&rsquo;s the part that matters: <strong className="text-deal">I didn&rsquo;t make it sound like a T.O.</strong>
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">What I actually said</h2>
            <p>
              He&rsquo;s standing. Keys in hand. One foot toward the door. I stayed seated. Didn&rsquo;t stand up. Didn&rsquo;t block the exit. Didn&rsquo;t do the &ldquo;wait, let me ask you one thing&rdquo; move that every customer has heard a hundred times.
            </p>
            <p>
              I said:
            </p>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm italic text-ash">
                &ldquo;Totally fair. Here&rsquo;s the thing though — and I&rsquo;ll be straight with you. This exact Camry, this exact trim, this exact payment? It won&rsquo;t be here Monday. I&rsquo;m not saying that to pressure you. I&rsquo;m saying it because I&rsquo;ve watched three of these sell in the last two weeks, and the next allocation doesn&rsquo;t hit for 45 days. Sleep on it if you need to. Just know the car won&rsquo;t be sleeping with you.&rdquo;
              </p>
            </div>
            <p>
              He sat back down.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">Why it worked</h2>
            <p>
              Let me break down what actually happened there, because it&rsquo;s not magic — it&rsquo;s psychology.
            </p>
            <p>
              <strong className="text-bone">1. I agreed with him first.</strong> &ldquo;Totally fair.&rdquo; Three words. But they matter. Most reps start arguing the moment a customer hesitates. &ldquo;What&rsquo;s holding you back?&rdquo; &ldquo;Is it the payment?&rdquo; &ldquo;What if I could get you a better number?&rdquo; All of that screams: I&rsquo;m losing this deal and I&rsquo;m panicking. Instead, I told him he was right. That disarmed him.
            </p>
            <p>
              <strong className="text-bone">2. I gave him real data, not a pitch.</strong> I didn&rsquo;t say &ldquo;these are selling fast.&rdquo; I said &ldquo;I&rsquo;ve watched three of these sell in the last two weeks, and the next allocation doesn&rsquo;t hit for 45 days.&rdquo; That&rsquo;s not a sales line — that&rsquo;s inventory reality. He could feel the difference. One sounds like pressure. The other sounds like a heads-up.
            </p>
            <p>
              <strong className="text-bone">3. I made the problem external.</strong> I didn&rsquo;t frame it as &ldquo;you should buy right now.&rdquo; I framed it as &ldquo;the car won&rsquo;t be here.&rdquo; The enemy wasn&rsquo;t his indecision. The enemy was the market. We weren&rsquo;t on opposite sides of the desk — we were on the same side, looking at a car that had a short shelf life.
            </p>
            <p>
              <strong className="text-bone">4. I ended on ownership, not pressure.</strong> &ldquo;Sleep on it if you need to. Just know the car won&rsquo;t be sleeping with you.&rdquo; That&rsquo;s the line. It&rsquo;s not a threat. It&rsquo;s not an ultimatum. It&rsquo;s a reality check wrapped in a half-joke. And it lands because I&rsquo;ve already established I&rsquo;m not desperate for this deal.
            </p>
            <p>
              He sat back down, pulled out his license, and said: &ldquo;Alright. Let&rsquo;s do it.&rdquo;
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">Why most T.O.s fail before you open your mouth</h2>
            <p>
              Here&rsquo;s what I learned the hard way: the T.O. fails the moment the customer feels managed. The handoff. The &ldquo;let me grab someone.&rdquo; The arrival of a new face who&rsquo;s clearly been briefed on their objections. Customers can smell a T.O. from across the showroom. And once they know they&rsquo;re being handled, you&rsquo;ve lost the psychological high ground.
            </p>
            <p>
              The best T.O. doesn&rsquo;t look like a T.O. It looks like a conversation. It looks like you — the same rep they&rsquo;ve been talking to for an hour — leveling with them. No handoff. No manager summoned from the tower. Just a closer who knows the inventory, knows the numbers, and knows when to push and when to shut up.
            </p>
            <p>
              That&rsquo;s not always possible. Sometimes you need the manager. Sometimes the customer needs to hear a different voice. But if you can run the T.O. yourself — and make it feel like you&rsquo;re doing them a favor by giving them information they don&rsquo;t have — you win more deals.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">The AI advantage: prepping the T.O. before they walk in</h2>
            <p>
              Here&rsquo;s where it gets interesting. My Deal Clozr agent knows my inventory. It knows allocation dates. It knows what&rsquo;s moving and what&rsquo;s been sitting. Before that Camry customer even walked onto the lot, the agent had already flagged: &ldquo;This trim — XSE — only two left in allocation. Next batch hits in 45 days. Scarcity is real. Use it.&rdquo;
            </p>
            <p>
              I didn&rsquo;t have to pull inventory reports or ask my sales manager. The intel was in my pocket before the customer parked. That&rsquo;s not a party trick. That&rsquo;s the difference between a rep who&rsquo;s guessing and a rep who&rsquo;s armed.
            </p>
            <p>
              Two weeks ago, I would have said &ldquo;these are moving fast&rdquo; and sounded like every other salesperson on the planet. Instead, I had the exact count — three sold this month, next allocation 45 days. Specificity sells. Vagueness walks.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">Try it this week</h2>
            <p>
              Next time a customer says &ldquo;I need to think about it,&rdquo; resist the urge to T.O. them to your manager. Instead:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-ash">
              <li><strong className="text-bone">Agree first.</strong> &ldquo;Totally fair.&rdquo; or &ldquo;Makes sense.&rdquo; Disarm, don&rsquo;t argue.</li>
              <li><strong className="text-bone">Give them one piece of real data they don&rsquo;t have.</strong> Inventory count. Allocation date. Incentive deadline. Something specific, not generic.</li>
              <li><strong className="text-bone">Frame the problem externally.</strong> The car, the market, the timeline — not their indecision. You&rsquo;re on the same team.</li>
              <li><strong className="text-bone">End on ownership.</strong> &ldquo;Do what you need to do. Just know the car won&rsquo;t wait for you.&rdquo; No pressure. Just facts.</li>
            </ul>
            <p>
              It&rsquo;s not a script. It&rsquo;s a framework. And it works because it doesn&rsquo;t sound like you&rsquo;re trying to save a deal — even when you are.
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
