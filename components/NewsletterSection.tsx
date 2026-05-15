"use client";

import { useState } from "react";
import { ArrowRight, Newspaper, Loader2 } from "lucide-react";

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setStatus("loading");
    try {
      const res = await fetch("https://formspree.io/f/mqapdvke", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ email, tag: "newsletter", source: "from-the-floor" }),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <section className="relative overflow-hidden loud-bg border-t border-white/5">
      <div className="grid-pattern opacity-40" />
      <div className="relative mx-auto max-w-4xl px-6 py-20 md:py-24">
        <div className="text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-gold/30 bg-gold/10 px-3.5 py-1.5 backdrop-blur">
            <Newspaper className="h-3.5 w-3.5 text-gold-light" strokeWidth={2.5} />
            <span className="text-[10px] font-bold uppercase tracking-[1.5px] text-gold-light">
              From the Floor
            </span>
          </div>
          <h2 className="font-display text-3xl font-black leading-[1.05] tracking-[-0.02em] text-white sm:text-5xl">
            Real plays. Real floor.
            <br />
            <span className="text-shine font-black">Every Monday.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg leading-relaxed text-ash">
            One email a week. What&apos;s working on the showroom floor right
            now — objections, scripts, deal math. Written by a working rep.
            Used by working reps.
          </p>

          {/* Preview cards */}
          <div className="mt-10 grid gap-4 text-left sm:grid-cols-3">
            {[
              {
                title: "The &apos;Think About It&apos; Kill",
                body: "Customer says they need to sleep on it. Here&apos;s the 3-step play that flips it on the spot.",
                tag: "Objections",
              },
              {
                title: "Service Lane Gold",
                body: "Your best ups are already in the building. The Monday morning service playbook.",
                tag: "Floor Plays",
              },
              {
                title: "Pay Plan Math in 10 Seconds",
                body: "How to calculate your commission before the customer finishes their sentence.",
                tag: "Deal Math",
              },
            ].map(({ title, body, tag }) => (
              <div
                key={title}
                className="loud-card rounded-xl p-5"
              >
                <span className="mb-2 inline-block rounded-full border border-gold/30 bg-gold/10 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-gold-light">
                  {tag}
                </span>
                <h4 className="mb-1.5 text-[15px] font-bold text-white">
                  {title}
                </h4>
                <p className="text-[13px] leading-relaxed text-ash">
                  {body}
                </p>
              </div>
            ))}
          </div>

          {/* Signup */}
          <div className="mt-10">
            {status === "success" ? (
              <div className="inline-flex items-center gap-3 rounded-xl border border-deal/40 bg-deal/10 px-6 py-4">
                <span className="text-lg">📬</span>
                <span className="text-[15px] font-medium text-deal-light">
                  You&apos;re in. First email Monday.
                </span>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="mx-auto flex max-w-md flex-col gap-3 sm:flex-row"
              >
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your@email.com"
                  disabled={status === "loading"}
                  className="flex-1 rounded-xl border border-white/20 bg-white/8 px-4 py-3.5 text-[15px] text-white placeholder:text-ash backdrop-blur focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold disabled:opacity-50"
                />
                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl bg-gold-light px-6 py-3.5 text-[15px] font-bold text-pit transition-all hover:bg-gold disabled:opacity-50"
                >
                  {status === "loading" ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Subscribing…
                    </>
                  ) : (
                    <>
                      Get the Playbook
                      <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
                    </>
                  )}
                </button>
              </form>
            )}
            <p className="mt-3 text-sm text-muted">
              One email. Every Monday. No spam. Unsubscribe anytime.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
