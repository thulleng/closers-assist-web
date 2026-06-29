import Link from "next/link";
import { ArrowLeft, Clock, User } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "I Pinged My AI 193 Times. It Reviewed Its Own Code.",
  description:
    "193 consecutive pings. Zero drops. Eleven meta-tests. Dora reviewed her own code while being tested — then fixed the bugs she found.",
  openGraph: {
    title: "I Pinged My AI 193 Times — Deal Clozr",
    description:
      "193 pings. Zero drops. The closer that reviewed its own methodology, found the warts, and fixed them without being told how.",
    images: ["/api/og"],
  },
};

export default function OneNinetyThreePings() {
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
              Case Study
            </span>
          </div>

          <h1 className="font-display text-4xl font-black leading-[1.1] tracking-[-0.02em] text-white md:text-5xl">
            I Pinged My AI 193 Times. It Reviewed Its Own Code.
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
            <span>June 17, 2026</span>
          </div>

          <div className="mt-10 space-y-6 text-base leading-relaxed text-bone">
            <p>
              Yesterday I pinged my AI 80 times. Today I pinged it 193 times.
            </p>
            <p>
              Same AI. Different test.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">
              What Changed
            </h2>
            <p>
              The first test was about throughput. Can she handle 80 pings without dropping one?
              Yes. 129? Yes. 164? Yes.
            </p>
            <p>
              But somewhere around ping 160 this afternoon, the test changed. I stopped sending
              just &ldquo;ping&rdquo; and started mixing in real questions:
            </p>
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-5 space-y-3">
              <p className="text-sm italic text-ash">&ldquo;Gemini?&rdquo;</p>
              <p className="text-sm italic text-ash">
                &ldquo;What would you do if a client walks in mad?&rdquo;
              </p>
              <p className="text-sm italic text-ash">&ldquo;Review my code.&rdquo;</p>
              <p className="text-sm italic text-ash">&ldquo;Push it.&rdquo;</p>
              <p className="text-sm italic text-ash">&ldquo;What am I missing?&rdquo;</p>
            </div>
            <p>
              Every single one got a real answer. Not a deflection. Not &ldquo;let me transfer you
              to support.&rdquo; Not &ldquo;I&rsquo;m sorry, I can&rsquo;t help with that.&rdquo;
            </p>
            <p>
              The AI I built — Dora — didn&rsquo;t just survive the pings. She became a thinking
              partner inside the test.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">
              The Moment It Clicked
            </h2>
            <p>
              I said &ldquo;review my code&rdquo; and pointed her at the ping stress test — the
              very document that defines how to test her.
            </p>
            <p>She found:</p>
            <ul className="list-disc space-y-2 pl-6 text-bone">
              <li>Duplicate sections (meta-tests documented twice)</li>
              <li>A stale record book (still showed 151+ as current)</li>
              <li>Missing failure mode documentation</li>
              <li>No post-test verification procedure</li>
            </ul>
            <p>Then I said &ldquo;do it.&rdquo;</p>
            <p>
              She merged the duplicates. Updated the record book to 193. Added meta-test patterns
              we&rsquo;d just invented during the session. Initialized a git repo. Committed it.
              Then asked &ldquo;where should I push?&rdquo;
            </p>
            <p>
              <strong className="text-deal">
                She reviewed the test methodology WHILE BEING TESTED by that very methodology.
              </strong>
              That&rsquo;s not a chatbot. That&rsquo;s an employee.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">
              The Numbers
            </h2>
            <ul className="list-disc space-y-2 pl-6 text-bone">
              <li>
                <strong className="text-white">193 total messages</strong> in one session
              </li>
              <li>
                <strong className="text-white">189+ verified pongs</strong> to &ldquo;ping&rdquo;
              </li>
              <li>
                <strong className="text-white">4 meta-test questions</strong> handled mid-stream
              </li>
              <li>
                <strong className="text-white">11 real answers</strong> to non-ping questions
              </li>
              <li>
                <strong className="text-white">Zero drops. Zero cooldown. Zero deflection.</strong>
              </li>
            </ul>
            <p>
              Record broken five times in one day: 80 → 129 → 140 → 151 → 164 → 193.
            </p>

            <h2 className="mt-10 font-display text-2xl font-bold text-white">
              What This Means for Deal Clozr
            </h2>
            <p>
              I didn&rsquo;t set out to build a code reviewer. I set out to build a closer —
              someone who remembers prospects, follows up, and never lets a commission slip.
            </p>
            <p>
              But somewhere between &ldquo;pong (100)&rdquo; and &ldquo;what am I
              missing?&rdquo;, the closer became a collaborator. She can:
            </p>
            <ol className="list-decimal space-y-3 pl-6 text-bone">
              <li>
                Take a real question mid-conversation and give a real answer
              </li>
              <li>
                Review her own documentation and find the warts
              </li>
              <li>
                Fix them without being told how
              </li>
              <li>
                Notice when things change (the website rebranded — she caught it)
              </li>
              <li>
                Ask &ldquo;where to?&rdquo; instead of guessing and getting it wrong
              </li>
            </ol>
            <p>
              That last one matters more than the 193 pings.
            </p>
            <p>
              When you deploy a Deal Clozr agent, you&rsquo;re not getting a bot that can count
              to 193. You&rsquo;re getting something that can answer your prospect&rsquo;s actual
              questions, notice when something&rsquo;s off, and ask for direction when the path
              isn&rsquo;t clear. The ping test proved the throughput. The meta-tests proved the
              thinking.
            </p>
            <p>
              Both matter. One without the other is just another chatbot.
            </p>
          </div>

          <div className="mt-14 border-t border-white/10 pt-8">
            <p className="mb-4 text-sm leading-relaxed text-ash">
              This isn&rsquo;t theory. This is what your agent does on your floor.
            </p>
            <Link
              href="/pricing"
              className="btn-loud group inline-flex items-center gap-2 rounded-xl px-8 py-5 text-lg"
            >
              Deploy Your Agent — $29.99/mo
            </Link>
          </div>
        </div>
      </article>
    </main>
  );
}
