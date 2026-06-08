"use client";

import { useState } from "react";
import { PencilLine, Star, X, CheckCircle } from "lucide-react";
import ReviewForm from "./ReviewForm";

export default function WriteReviewBanner() {
  const [showForm, setShowForm] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <section className="relative overflow-hidden rounded-2xl border border-deal/20 bg-gradient-to-br from-deal/5 to-black/60 p-8 text-center md:p-12">
        <div className="relative z-10">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-deal/20">
            <CheckCircle className="h-7 w-7 text-deal-light" strokeWidth={2} />
          </div>
          <h2 className="font-display text-2xl font-black text-white md:text-3xl">
            Review submitted! 🎉
          </h2>
          <p className="mt-3 text-base text-ash">
            Thanks for sharing your experience. Your review is live on the site.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="relative overflow-hidden rounded-2xl border border-white/8 bg-gradient-to-br from-white/[0.03] to-black/60 p-8 md:p-12">
      {/* Glow */}
      <div className="pointer-events-none absolute -top-20 -right-20 h-60 w-60 rounded-full bg-deal/5 blur-[100px]" />

      <div className="relative z-10">
        {!showForm ? (
          <div className="flex flex-col items-center text-center md:flex-row md:items-start md:gap-8 md:text-left">
            <div className="mb-4 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-deal/10 md:mb-0">
              <PencilLine className="h-6 w-6 text-deal-light" strokeWidth={2} />
            </div>
            <div className="flex-1">
              <h2 className="font-display text-xl font-black text-white md:text-2xl">
                Used Deal Clozr? Write a review
              </h2>
              <p className="mt-2 text-sm text-ash md:text-base">
                Help other closers decide. Your real experience matters more than any ad.
              </p>
              <div className="mt-2 flex items-center justify-center gap-1 md:justify-start">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star
                    key={i}
                    className="h-3.5 w-3.5 text-gold-light"
                    strokeWidth={1.5}
                  />
                ))}
                <span className="ml-1 text-xs text-muted">Click to rate & review</span>
              </div>
              <button
                onClick={() => setShowForm(true)}
                className="btn-loud mt-4 inline-flex items-center gap-2 rounded-xl px-6 py-3 text-sm font-bold"
              >
                Write Your Review
                <PencilLine className="h-4 w-4" strokeWidth={2.5} />
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="mb-6 flex items-center justify-between">
              <h3 className="font-display text-lg font-black text-white">
                Share your experience
              </h3>
              <button
                onClick={() => setShowForm(false)}
                className="flex items-center gap-1 text-sm text-ash hover:text-white transition-colors"
              >
                <X className="h-4 w-4" /> Cancel
              </button>
            </div>
            <ReviewForm
              onSubmitted={() => {
                setSubmitted(true);
              }}
            />
          </div>
        )}
      </div>
    </section>
  );
}
