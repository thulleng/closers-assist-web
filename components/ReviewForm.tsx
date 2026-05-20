"use client";

import { useState } from "react";
import StarRating from "./StarRating";

interface ReviewFormProps {
  onSubmitted?: () => void;
}

export default function ReviewForm({ onSubmitted }: ReviewFormProps) {
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [location, setLocation] = useState("");
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (rating === 0) {
      setError("Please select a rating");
      return;
    }
    if (reviewText.trim().length < 10) {
      setError("Review must be at least 10 characters");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/reviews", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          role: role.trim() || undefined,
          company: company.trim() || undefined,
          location: location.trim() || undefined,
          rating,
          review_text: reviewText.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Failed to submit");
      }

      setSubmitted(true);
      onSubmitted?.();
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="rounded-2xl border border-deal/20 bg-deal/5 p-8 text-center">
        <div className="mb-3 text-4xl">🎉</div>
        <h3 className="mb-2 font-display text-xl font-black text-white">Review submitted!</h3>
        <p className="text-sm text-ash">
          Thanks for sharing your experience. Your review will appear once approved.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="mb-2 block text-sm font-semibold text-white">Your rating *</label>
        <StarRating rating={rating} onChange={setRating} size="lg" />
      </div>

      <div>
        <label htmlFor="rv-text" className="mb-2 block text-sm font-semibold text-white">
          Your review *
        </label>
        <textarea
          id="rv-text"
          value={reviewText}
          onChange={(e) => setReviewText(e.target.value)}
          rows={4}
          placeholder="How has Closers Assist helped you close more deals?"
          className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-deal/50 focus:outline-none focus:ring-1 focus:ring-deal/30 resize-none"
          maxLength={600}
        />
        <p className="mt-1 text-right text-[10px] text-white/20">{reviewText.length}/600</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="rv-name" className="mb-2 block text-sm font-semibold text-white">
            Your name *
          </label>
          <input
            id="rv-name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John D."
            className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-deal/50 focus:outline-none focus:ring-1 focus:ring-deal/30"
            maxLength={60}
            required
          />
        </div>
        <div>
          <label htmlFor="rv-role" className="mb-2 block text-sm font-semibold text-white">
            Role
          </label>
          <input
            id="rv-role"
            type="text"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            placeholder="Sales Rep"
            className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-deal/50 focus:outline-none focus:ring-1 focus:ring-deal/30"
            maxLength={60}
          />
        </div>
        <div>
          <label htmlFor="rv-company" className="mb-2 block text-sm font-semibold text-white">
            Company
          </label>
          <input
            id="rv-company"
            type="text"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Sun Toyota"
            className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-deal/50 focus:outline-none focus:ring-1 focus:ring-deal/30"
            maxLength={60}
          />
        </div>
        <div>
          <label htmlFor="rv-location" className="mb-2 block text-sm font-semibold text-white">
            Location
          </label>
          <input
            id="rv-location"
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Tampa, FL"
            className="w-full rounded-xl border border-white/10 bg-black/50 px-4 py-3 text-sm text-white placeholder:text-white/20 focus:border-deal/50 focus:outline-none focus:ring-1 focus:ring-deal/30"
            maxLength={60}
          />
        </div>
      </div>

      {error && (
        <p className="text-sm text-red-400">{error}</p>
      )}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-xl bg-deal px-6 py-3.5 font-bold text-black transition-all hover:bg-deal-light disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {submitting ? "Submitting..." : "Submit Review"}
      </button>
    </form>
  );
}
