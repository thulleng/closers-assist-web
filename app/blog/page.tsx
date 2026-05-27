import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRight, Clock, User } from "lucide-react";
import FadeIn from "@/components/FadeIn";

export const metadata: Metadata = {
  title: "Blog — From the Floor",
  description:
    "Real strategy, plays, and real talk from a working Toyota rep. No theory. Just what works on the floor. Written by Thul Leng at Sun Toyota.",
};

const POSTS = [
  {
    slug: "the-90-second-t-o",
    title: "The 90-Second T.O.",
    date: "May 27, 2026",
    readTime: "4 min",
    preview: "A T.O. isn't a failure — it's a tool. Here's exactly when to pull it, how to hand it off, and the three signals that tell you the window is open before the deal tips.",
    tag: "Floor Strategy",
  },
  {
    slug: "to-that-saved-the-deal",
    title: "The T.O. That Saved a $4,800 Deal — Here's What I Actually Said",
    date: "May 25, 2026",
    readTime: "4 min",
    preview: "Customer was walking. Manager was busy. Here's the T.O. I ran on myself that saved a deal — and why most T.O.s fail before you even open your mouth.",
    tag: "Floor Strategy",
  },
  {
    slug: "three-buyers-on-the-lot",
    title: "The Three Buyers on Every Lot",
    date: "May 20, 2026",
    readTime: "4 min",
    preview: "After years on the floor at Sun Toyota, I learned there aren't a hundred types of buyers. There are three — and the rep who can read the room in 90 seconds closes all three.",
    tag: "Customer Psychology",
  },
  {
    slug: "sun-toyota-pilot",
    title: "I Run an AI Closer on My Dealership Floor — Here's What Happened in 30 Days",
    date: "May 12, 2026",
    readTime: "5 min",
    preview: "30 days. 247 leads. 43 appointments. The real numbers from running an AI closer at Sun Toyota — and why your floor is next.",
    tag: "Case Study",
  },
  {
    slug: "how-i-built-this",
    title: "How I Built an AI Sales Agent Between Customers",
    date: "May 8, 2026",
    readTime: "4 min",
    preview: "I sell Toyotas. I'm not an engineer. Here's how I built Deal Clozr on the Sun Toyota floor — between test drives, T.O.s, and service lane laps.",
    tag: "Founder Story",
  },
  {
    slug: "mini-that-pays",
    title: "The $200 Mini That Pays $500",
    date: "May 5, 2026",
    readTime: "3 min",
    preview: "A half mini is $200. But that half unit at 10.5 turns into a $500 bonus at 11. Here's the math most reps never run — and why stacking minis is the highest-leverage play on the board.",
    tag: "Pay Plan Math",
  },
  {
    slug: "service-lane-plays",
    title: "Three Plays for the Service Lane",
    date: "May 2, 2026",
    readTime: "3 min",
    preview: "Oil change customers are the warmest leads on the lot. They already own a Toyota. They're already in the building. Here are three plays that turn a $49.95 oil change into a deal.",
    tag: "Objection Handling",
  },
];

export default function BlogIndex() {
  return (
    <main>
      <section className="relative overflow-hidden loud-bg">
        <div className="grid-pattern opacity-40" />
        <div className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full blur-[120px]"
          style={{ background: "radial-gradient(circle, rgba(16,185,129,0.12), transparent 70%)" }} />

        <div className="relative mx-auto max-w-4xl px-6 py-20 md:py-28">
          <FadeIn>
            <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-gold shadow-[0_0_8px_#FBBF24]" />
              <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-gold-light">
                From the Floor
              </span>
            </div>

            <h1 className="font-display text-5xl font-black leading-[1.05] tracking-[-0.02em] text-white md:text-7xl">
              Real strategy.
              <br />
              <span className="text-shine font-black">From a real closer.</span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ash">
              Strategy, plays, and real talk from a working rep. No theory. Just what works.
            </p>
          </FadeIn>

          <FadeIn delay={150}>
            <div className="mt-14 space-y-6">
              {POSTS.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block"
                >
                  <div className="loud-card relative overflow-hidden rounded-2xl p-7 transition-all hover:border-deal/30 hover:shadow-[0_0_32px_rgba(16,185,129,0.08)]">
                    <div className="pointer-events-none absolute -right-12 -top-12 h-24 w-24 rounded-full blur-2xl opacity-0 group-hover:opacity-60 transition-opacity"
                      style={{ background: "radial-gradient(circle, rgba(16,185,129,0.15), transparent 70%)" }} />
                    <div className="relative">
                      <div className="mb-2">
                        <span className="rounded-full border border-deal/30 bg-deal/10 px-2.5 py-0.5 text-[10px] font-semibold text-deal-light">
                          {post.tag}
                        </span>
                      </div>
                      <h2 className="text-xl font-bold text-white group-hover:text-deal-light transition-colors md:text-2xl">
                        {post.title}
                      </h2>
                      <p className="mt-2 text-sm leading-relaxed text-ash">
                        {post.preview}
                      </p>
                      <div className="mt-4 flex items-center gap-4 text-xs text-muted">
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" strokeWidth={2} />
                          {post.readTime}
                        </span>
                        <span className="flex items-center gap-1">
                          <User className="h-3 w-3" strokeWidth={2} />
                          Thul Leng
                        </span>
                        <span>{post.date}</span>
                        <span className="ml-auto flex items-center gap-1 font-semibold text-deal-light opacity-0 group-hover:opacity-100 transition-opacity">
                          Read
                          <ArrowRight className="h-3 w-3" strokeWidth={2.5} />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>
    </main>
  );
}
