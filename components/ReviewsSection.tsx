"use client";

import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";

interface Review {
  id: string;
  name: string;
  rating: number;
  review_text: string;
  role: string | null;
  company: string | null;
  location: string | null;
  created_at: string;
}

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");

  const fetchReviews = async () => {
    try {
      const res = await fetch("/api/reviews?limit=6");
      if (!res.ok) throw new Error("Failed to load");
      const data = await res.json();
      setReviews(data.reviews || []);
    } catch (err) {
      setError("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  if (loading) {
    return (
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse rounded-2xl border border-white/8 bg-black/40 p-6 h-48" />
        ))}
      </div>
    );
  }

  if (error && reviews.length === 0) {
    return (
      <div className="mt-8 text-center">
        <p className="text-sm text-ash">{error}</p>
        <button
          onClick={() => { setError(""); setLoading(true); fetchReviews(); }}
          className="mt-3 text-sm text-gold-light hover:text-gold transition-colors"
        >
          Try again
        </button>
      </div>
    );
  }

  return (
    <>
      {/* Reviews grid */}
      {reviews.length > 0 && (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {reviews.map((review) => (
            <ReviewCard key={review.id} {...review} />
          ))}
        </div>
      )}

      {/* Empty state — no approved reviews yet */}
      {reviews.length === 0 && !showForm && (
        <div className="mt-8 rounded-2xl border border-dashed border-white/10 bg-black/30 p-10 text-center">
          <div className="mb-3 text-4xl">⭐</div>
          <h3 className="mb-2 font-display text-lg font-black text-white">No reviews yet</h3>
          <p className="mb-4 text-sm text-ash">Be the first to share how Closers Assist helped you close more deals.</p>
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 rounded-xl bg-deal px-5 py-2.5 text-sm font-bold text-black transition-all hover:bg-deal-light"
          >
            Write a Review
          </button>
        </div>
      )}

      {/* Write a review toggle */}
      <div className="mt-6 text-center">
        {!showForm && reviews.length > 0 && (
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-gold/20 bg-gold/5 px-5 py-2.5 text-sm font-semibold text-gold-light transition-all hover:border-gold/40 hover:bg-gold/10"
          >
            ✍️ Write a Review
          </button>
        )}

        {showForm && (
          <div className="mx-auto max-w-lg rounded-2xl border border-white/8 bg-black/40 p-6 text-left">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-lg font-black text-white">Write a Review</h3>
              <button
                onClick={() => setShowForm(false)}
                className="text-sm text-ash hover:text-white transition-colors"
              >
                Cancel
              </button>
            </div>
            <ReviewForm
              onSubmitted={() => {
                setShowForm(false);
                fetchReviews();
              }}
            />
          </div>
        )}
      </div>
    </>
  );
}
