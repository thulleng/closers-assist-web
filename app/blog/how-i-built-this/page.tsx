import Link from "next/link";
import { ArrowLeft, Clock, User } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "How I Built an AI Sales Agent Between Customers",
  description: "I sell Toyotas. I'm not an engineer. Here's how I built Closers Assist on the Sun Toyota floor.",
};

export default function HowIBuiltThis() {
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
              Founder Story
            </span>
          </div>

          <h1 className="font-display text-4xl font-black leading-[1.1] tracking-[-0.02em] text-white md:text-5xl">
            How I Built an AI Sales Agent Between Customers
          </h1>

          <div className="mt-4 flex items-center gap-4 text-xs text-muted">
            <span className="flex items-center gap-1"><Clock className="h-3 w-3" />4 min read</span>
            <span className="flex items-center gap-1"><User className="h-3 w-3" />Thul Leng</span>
            <span>May 8, 2026</span>
          </div>

          <div className="mt-10 space-y-6 text-base leading-relaxed text-bone">
            <p>
              I sell Toyotas at Sun Toyota in New Port Richey, Florida. I am not an engineer. I do not have a CS degree. I have never worked in tech.
            </p>
            <p>
              I built Closers Assist on the showroom floor — between test drives, T.O.s, and service lane laps. Here&rsquo;s how it happened.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">The CRM graveyard</h2>
            <p>
              Every sales rep knows this feeling: you open your CRM and it&rsquo;s a graveyard. Hundreds of names. Dozens of &ldquo;thinking about it.&rdquo; A handful of &ldquo;call back next month.&rdquo; And you&rsquo;re supposed to remember who&rsquo;s who, who&rsquo;s warm, and what you said last time.
            </p>
            <p>
              I tried everything. Spreadsheets. Notes app. Sticky notes on the desk. Nothing worked. The CRM was where leads went to die.
            </p>
            <p>
              Then I asked ChatGPT for a follow-up script one Saturday morning. It gave me something decent — but generic. It didn&rsquo;t know I was at a Toyota store. It didn&rsquo;t know a mini from a full deal. It had no idea what my pay plan looked like.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">The $29.99 realization</h2>
            <p>
              I started thinking: what if an AI actually knew my world? Knew my pay plan — draw, bonuses, tier breaks. Knew what a T.O. was. Knew that a half mini pays $200 but gets me closer to a $500 bonus at 11 units.
            </p>
            <p>
              What if it remembered every customer, every deal, every objection I&rsquo;d ever handled? What if it called me out when I was slacking — because it could see I was 3 units behind pace?
            </p>
            <p>
              I priced it at $29.99 because one deal — one single deal — pays for 10 years of the tool. That&rsquo;s not marketing math. That&rsquo;s real math. If you close one extra deal because your agent gave you the right script at the right moment, you&rsquo;re ahead for a decade.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">Built on the floor. Not in a boardroom.</h2>
            <p>
              I built the first version on my phone. Between customers. I&rsquo;d be standing in the service lane, waiting for an oil change to finish, and I&rsquo;d pull out my phone and add a feature.
            </p>
            <p>
              The objection handler came from a real customer who said &ldquo;$499 is too high.&rdquo; The follow-up writer came from a real ghost who stopped replying after a test drive. The pay plan calculator came from me staring at a deal jacket at 8pm trying to figure out if it was worth it.
            </p>
            <p>
              This isn&rsquo;t a SaaS company that studied the auto industry from a WeWork in San Francisco. This is a Toyota closer who built the tool he wished he had — and then realized every closer needs it.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">What&rsquo;s next</h2>
            <p>
              Closers Assist is live. $29.99/rep/month. Auto, real estate, insurance, solar, SaaS — 18 industries. Same agent. Same memory. Web + Telegram, live now.
            </p>
            <p>
              I&rsquo;m still on the floor at Sun Toyota. Still selling. Still building between customers. Because the best sales tools aren&rsquo;t built in boardrooms. They&rsquo;re built by people who actually need them.
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
