import Link from "next/link";
import { ArrowLeft, Clock, User } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "The Three Buyers on Every Lot",
  description: "After years on the floor at Sun Toyota, I learned there aren't a hundred types of buyers. There are three. Here's how to spot each one in 90 seconds and close them the way they want to be closed.",
};

export default function ThreeBuyersOnTheLot() {
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
              Customer Psychology
            </span>
          </div>

          <h1 className="font-display text-4xl font-black leading-[1.1] tracking-[-0.02em] text-white md:text-5xl">
            The Three Buyers on Every Lot
          </h1>

          <div className="mt-4 flex items-center gap-4 text-xs text-muted">
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" />4 min read</span>
            <span className="flex items-center gap-1"><User className="h-3 w-3" />Thul Leng</span>
            <span>May 20, 2026</span>
          </div>

          <div className="mt-10 space-y-6 text-base leading-relaxed text-bone">
            <p>
              I&rsquo;ve sold hundreds of cars at Sun Toyota. And here&rsquo;s something that took me way too long to learn: there aren&rsquo;t a hundred types of buyers. There are three.
            </p>
            <p>
              The Researcher. The Emotional Buyer. The Payment Buyer.
            </p>
            <p>
              Every customer walking onto this lot falls into one of these buckets — usually within the first two minutes. The rep who treats all three the same way loses two out of three. The rep who can read the room in 90 seconds closes all three.
            </p>
            <p>
              Here&rsquo;s how to spot them, what they actually care about, and how to close them the way <em>they</em> want to be closed — not the way <em>you</em> want to sell.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">The Researcher</h2>
            <p>
              <strong className="text-bone">How to spot them:</strong> They walk onto the lot holding a printout. Or they&rsquo;ve got three tabs open on their phone — TrueCar, KBB, and our inventory page. They know the MSRP, the invoice price, and probably the name of the engineer who designed the transmission.
            </p>
            <p>
              <strong className="text-bone">What they say:</strong> “I&rsquo;ve been doing some research.” “What&rsquo;s your best price?” “I saw a similar one at [competitor] for $400 less.”
            </p>
            <p>
              <strong className="text-bone">What they actually care about:</strong> Winning. Not the car. Not the payment. The feeling that they got the absolute best deal possible. The Researcher isn&rsquo;t buying a RAV4 — they&rsquo;re buying the satisfaction of knowing nobody got one over on them.
            </p>
            <p>
              <strong className="text-bone">How to close them:</strong> Give them a win. Not a discount — a win. Say something like: “You&rsquo;ve clearly done your homework. Most people don&rsquo;t know about invoice pricing on these. Since you do, let me show you exactly where we land — and here&rsquo;s the part most people miss.” Then show them something they didn&rsquo;t find online. A dealer incentive. A loyalty rebate. A service credit. The Researcher needs to feel like they discovered something nobody else has. Give them that feeling and they&rsquo;ll sign.
            </p>
            <p>
              <strong className="text-bone">What kills the deal:</strong> Arguing. Negotiating the wrong line item. Telling them their research is wrong. The Researcher will walk over a $200 difference just to prove a point. Don&rsquo;t make it about the money. Make it about them being the smartest person in the room.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">The Emotional Buyer</h2>
            <p>
              <strong className="text-bone">How to spot them:</strong> They&rsquo;re touching the car before they&rsquo;re talking to you. Running their hand along the dash. Sitting in the driver&rsquo;s seat for 30 seconds just&hellip; sitting. They might have brought their kid or their spouse, and they keep glancing at them for reactions.
            </p>
            <p>
              <strong className="text-bone">What they say:</strong> “I love this color.” “This feels right.” “I&rsquo;ve always wanted a Tacoma.” Sometimes they don&rsquo;t say much at all — they just keep looking at the car.
            </p>
            <p>
              <strong className="text-bone">What they actually care about:</strong> The feeling. The Emotional Buyer is not buying transportation. They&rsquo;re buying who they become in this car. The 4Runner buyer isn&rsquo;t buying an SUV — they&rsquo;re buying weekends camping, off-road capability, being the person who goes places other people can&rsquo;t. The Camry buyer isn&rsquo;t buying a sedan — they&rsquo;re buying reliability, peace of mind, being the smart one in the family.
            </p>
            <p>
              <strong className="text-bone">How to close them:</strong> Shut up and let the car do the work. Your job is to connect the dots between the car and the feeling they already have. “I can tell this is your truck. Let&rsquo;s get you in it.” Don&rsquo;t talk specs. Don&rsquo;t talk numbers yet. Talk about what happens after they leave the lot — the road trip, the school pickup, the first time they pull into their own driveway.
            </p>
            <p>
              <strong className="text-bone">What kills the deal:</strong> Logic. Spec sheets. Comparisons. Bringing up a different trim level “just in case.” The Emotional Buyer made their decision the moment they sat in the seat. If you oversell, you&rsquo;ll talk them out of it. I&rsquo;ve watched reps lose Emotional Buyers by showing them a “better option” when the buyer already picked their car with their heart. Don&rsquo;t do it.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">The Payment Buyer</h2>
            <p>
              <strong className="text-bone">How to spot them:</strong> First question out of their mouth is about money. “What&rsquo;s the monthly on this?” “Can you get me under $400?” They might look at the car for 30 seconds before asking. They might not look at the car at all.
            </p>
            <p>
              <strong className="text-bone">What they say:</strong> “I need to be at $350.” “What&rsquo;s the cheapest one you got?” “I don&rsquo;t care about the features, I just need the payment.”
            </p>
            <p>
              <strong className="text-bone">What they actually care about:</strong> Safety. Not the car&rsquo;s safety rating — financial safety. The Payment Buyer is scared of getting in over their head. They&rsquo;ve done the budget math at their kitchen table six times. They know exactly what they can afford — and they&rsquo;re terrified you&rsquo;re going to push them past it.
            </p>
            <p>
              <strong className="text-bone">How to close them:</strong> Respect the number. If they say $400, your first quote better come in at $390 — or you better explain exactly why it&rsquo;s at $410, line by line. The Payment Buyer has been burned before. Or watched their parents get burned. Or heard enough dealer horror stories to expect the worst. Show them you&rsquo;re on their side by being the first car salesperson who actually listened to their number. Structure the deal around their payment, not around the car. The car is secondary. The number is primary.
            </p>
            <p>
              <strong className="text-bone">What kills the deal:</strong> Bumping them. “Let me see what I can do” and coming back $80 higher. Talking about features they don&rsquo;t care about. Trying to convert them into a Researcher or an Emotional Buyer. They&rsquo;re neither. Sell the payment, not the car.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">Why most reps lose two out of three</h2>
            <p>
              Here&rsquo;s the mistake I made for my first year on the floor: I sold everyone the same way. I was a Payment Buyer at heart — so I led with numbers, every time. Researchers walked because I couldn&rsquo;t give them the win they needed. Emotionals walked because I bored them with payment math when they were already in love with the car.
            </p>
            <p>
              The best closers I&rsquo;ve worked with don&rsquo;t have one style. They have three — and they switch in real time based on who&rsquo;s standing in front of them.
            </p>
            <p>
              You can feel it within 90 seconds. Sometimes within 30. The guy who walks in holding a spreadsheet is not the same buyer as the woman who walks in, sees a 4Runner, and stops mid-sentence. Sell them differently. It sounds obvious — but watch your floor tomorrow. Count how many reps use the exact same approach on every customer. That&rsquo;s why they&rsquo;re closing 8 units a month while the top guy is closing 18.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">The AI advantage</h2>
            <p>
              My Closers Assist agent does this automatically now. It reads the lead — the words they use, the questions they ask, the way they phrase things — and adjusts the follow-up style before I even touch the customer.
            </p>
            <p>
              Researcher lead? It sends trim comparisons and pricing breakdowns. Emotional lead? It sends lifestyle content and owner stories. Payment lead? It sends payment estimates and lease options with the monthly front and center.
            </p>
            <p>
              Before the agent, I was guessing which bucket they fell into based on a name and a phone number. Now the guesswork is gone before they even walk through the door. And when they do walk in? I already know how to sell them.
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
