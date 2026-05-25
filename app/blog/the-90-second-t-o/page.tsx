import Link from "next/link";
import { ArrowLeft, Clock, User } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The 90-Second T.O.",
  description: "A T.O. isn't a failure — it's a tool. Here's exactly when to pull it, how to hand it off, and the three signals that tell you the window is open.",
};

export default function The90SecondTO() {
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
            The 90-Second T.O.
          </h1>

          <div className="mt-4 flex items-center gap-4 text-xs text-muted">
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" />4 min read</span>
            <span className="flex items-center gap-1"><User className="h-3 w-3" />Thul Leng</span>
            <span>May 27, 2026</span>
          </div>

          <div className="mt-10 space-y-6 text-base leading-relaxed text-bone">
            <p>
              A T.O. isn&rsquo;t a failure. It&rsquo;s a tool. And like any tool, it works best when you know exactly when to pull it — and exactly when to keep it holstered.
            </p>
            <p>
              I&rsquo;ve watched hundreds of deals go down at Sun Toyota. Some T.O.s saved the deal. Some T.O.s killed a deal that was already closing itself. The difference is almost always timing — about 90 seconds of timing.
            </p>
            <p>
              Here&rsquo;s what I learned about T.O. timing, the three signals that tell you the window is open, and the handoff script I use every single time.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">The #1 T.O. mistake</h2>
            <p>
              Most reps T.O. too late. They wait until the customer is halfway out the door, arms crossed, saying &ldquo;I need to think about it.&rdquo; By then, it&rsquo;s already over. The T.O. becomes damage control — not a close.
            </p>
            <p>
              The right time to T.O. is about 90 seconds <em>before</em> the deal tips. You feel the energy shift. The customer goes quiet. Or they start asking the same question three different ways. Or they glance at their spouse — and that glance says everything.
            </p>
            <p>
              Those 90 seconds are the window. Hit it and the T.O. feels like a natural handoff — &ldquo;Let me grab my manager, he can get you a better answer on that.&rdquo; Miss it and the T.O. feels like you&rsquo;re calling for backup because you&rsquo;re losing. The customer feels that difference. So does the manager.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">The three T.O. signals</h2>
            <p>
              After enough deals, you learn to read the room without thinking. Here are the three signals that tell me it&rsquo;s time:
            </p>

            <p>
              <strong className="text-bone">1. The repeat question.</strong> Customer asks &ldquo;what&rsquo;s the payment?&rdquo; three times. You give them the same answer each time. They&rsquo;re still not satisfied. They&rsquo;re not confused about the numbers — they&rsquo;re stuck on the commitment. A fresh voice resets the frame. The same number from a manager hits different than the same number from you.
            </p>

            <p>
              <strong className="text-bone">2. The spouse glance.</strong> Customer looks at their partner. The partner looks back. Nobody says anything for three full seconds. That silence is the deal hanging in the air — nobody wants to be the one who says yes, and nobody wants to be the one who says no. The T.O. breaks the stalemate. Not by pushing harder. By giving them someone new to push against.
            </p>

            <p>
              <strong className="text-bone">3. The budget wall.</strong> Customer says &ldquo;I can&rsquo;t go over $400.&rdquo; You&rsquo;ve shown them the $417 option. You&rsquo;ve shown them the $389 option with less car. They&rsquo;re not budging. A manager can find $17 in a deal that you can&rsquo;t — a rate adjustment, a trade bump, a rebate you forgot about. That&rsquo;s not weakness. That&rsquo;s using your resources. T.O. before they walk over seventeen dollars.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">The handoff script</h2>
            <p>
              The handoff matters as much as the timing. A bad handoff sounds like a surrender. A good handoff sounds like an upgrade. Here&rsquo;s the script I use — word for word:
            </p>

            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm italic text-ash">
                &ldquo;Hey, let me grab my sales manager real quick. He&rsquo;s been doing this 20 years and he can probably find a way to make those numbers work better than I can. Give me one minute.&rdquo;
              </p>
            </div>

            <p>
              Three things happening in that script:
            </p>
            <ul className="list-disc pl-5 space-y-2 text-ash">
              <li><strong className="text-bone">You&rsquo;re not admitting failure.</strong> You&rsquo;re escalating for a better outcome. There&rsquo;s a difference and the customer hears it.</li>
              <li><strong className="text-bone">You&rsquo;re building the manager up</strong> before they walk in. The customer is pre-sold on the manager before they say a word. &ldquo;20 years&rdquo; gives them weight. Now when the manager sits down, they&rsquo;re not a stranger — they&rsquo;re the expert you promised.</li>
              <li><strong className="text-bone">You&rsquo;re framing it as a favor.</strong> &ldquo;Make those numbers work better&rdquo; — not &ldquo;fix this mess.&rdquo; The customer feels like they&rsquo;re getting VIP treatment, not a rescue mission.</li>
            </ul>

            <p>
              The worst handoff I&rsquo;ve ever seen: rep stands up, sighs, and says &ldquo;let me get my manager.&rdquo; No setup. No framing. Just defeat. The customer heard it. They checked out before the manager even walked in. Don&rsquo;t do that.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">When NOT to T.O.</h2>
            <p>
              Here&rsquo;s the part most reps never learn: sometimes the best T.O. is no T.O.
            </p>
            <p>
              If the customer is still asking <strong className="text-bone">genuine questions</strong> — not repeating, but genuinely curious — don&rsquo;t T.O. They&rsquo;re still exploring. A manager walking in mid-exploration feels like pressure, not help. Let them ask. Let them learn. Let them get there.
            </p>
            <p>
              If the customer is <strong className="text-bone">Emotional</strong> — they love the car, they&rsquo;re telling you about the road trip they&rsquo;re going to take — don&rsquo;t T.O. Let the car sell itself. A manager insert can kill the vibe. I&rsquo;ve watched it happen. Rep had the deal in the bag — customer was already mentally driving the car home — and the manager walked over, shook hands, and the whole mood shifted. Customer got reminded this was a dealership, not a joyride. Deal went cold.
            </p>
            <p>
              If the customer is <strong className="text-bone">solving their own objection</strong> — they went from &ldquo;the payment is too high&rdquo; to &ldquo;what if we did a 72-month term?&rdquo; — don&rsquo;t T.O. They&rsquo;re doing your job for you. Let them finish.
            </p>
            <p>
              T.O. when the deal is stuck. Not when it&rsquo;s moving. Sounds obvious — but go watch your floor tomorrow. Count how many T.O.s happen on deals that were already closing. It&rsquo;s more than you think.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">The T.O. that saved a deal last week</h2>
            <p>
              Last Tuesday. Customer on a RAV4 XLE. Payment came back at $487. He needed $450. I ran it twice — best I could do was $468 with the rebate. He looked at his wife. She shook her head. He said &ldquo;that&rsquo;s still a little high.&rdquo;
            </p>
            <p>
              90-second window. Right there.
            </p>
            <p>
              I said the script. Grabbed my manager. Gave him the download in the hallway: &ldquo;$468 is my best. Needs $450. Wife is the decision maker — she hasn&rsquo;t said a word but she&rsquo;s the one who needs to hear this.&rdquo;
            </p>
            <p>
              Manager walks in, sits down, looks at the wife. Not the husband. Says: &ldquo;Ma&rsquo;am, I want to make sure you&rsquo;re getting the right car at the right number. Let me show you something.&rdquo; He pulls up a lease option on the same RAV4 — $447 a month. Payment drops. Wife nods. Husband signs. Deal done.
            </p>
            <p>
              The manager didn&rsquo;t do anything I couldn&rsquo;t have done technically — same car, same rebate, different structure. But the wife needed to hear it from someone else. Someone with &ldquo;manager&rdquo; in their title. The T.O. wasn&rsquo;t about math. It was about authority.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">The bottom line</h2>
            <p>
              A T.O. is not a sign you&rsquo;re a weak closer. It&rsquo;s a sign you know when to use every tool on the floor.
            </p>
            <p>
              The reps who refuse to T.O. because of ego leave deals on the table. The reps who T.O. too early burn their manager&rsquo;s credibility — and their own. The reps who get it right — the ones who feel the 90-second window — close more deals than both.
            </p>
            <p>
              Learn the signals. Practice the handoff. And for the love of God, don&rsquo;t wait until they&rsquo;re walking out the door.
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
