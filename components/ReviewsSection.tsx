"use client";

import { useEffect, useState } from "react";
import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";
import { MessageCircle, Star, Users } from "lucide-react";

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
        <div className="mt-8 rounded-2xl border border-dashed border-white/10 bg-gradient-to-b from-black/40 to-black/20 p-10 text-center backdrop-blur">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-deal/10 border border-deal/20">
            <Users className="h-6 w-6 text-deal" />
          </div>
          <h3 className="mb-2 font-display text-xl font-black text-white">
            Be one of the first
          </h3>
          <p className="mb-6 text-sm text-ash max-w-md mx-auto leading-relaxed">
            You&apos;re using Deal Clozr on the floor. Your co-workers are using it too.
            Drop a review — real stories from real closers help other reps see what&apos;s possible.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              onClick={() => setShowForm(true)}
              className="inline-flex items-center gap-2 rounded-xl bg-deal px-6 py-3 text-sm font-bold text-black transition-all hover:bg-deal-light hover:scale-105"
            >
              <Star className="h-4 w-4" />
              Write a Review
            </button>
          </div>
          <div className="mt-6 flex items-center justify-center gap-5 text-xs text-white/20">
            <span className="flex items-center gap-1.5">
              <Star className="h-3 w-3" /> Rated by your peers
            </span>
            <span className="flex items-center gap-1.5">
              <MessageCircle className="h-3 w-3" /> Real floor stories
            </span>
          </div>
        </div>
      )}

      {/* Write a review toggle */}
      <div className="mt-6 text-center">
        {!showForm && reviews.length > 0 && (
          <button
            onClick={() => setShowForm(true)}
            className="inline-flex items-center gap-2 rounded-xl border border-gold/20 bg-gold/5 px-5 py-2.5 text-sm font-semibold text-gold-light transition-all hover:border-gold/40 hover:bg-gold/10"
          >
            <Star className="h-4 w-4" />
            Share your story
          </button>
        )}

        {showForm && (
          <div className="mx-auto max-w-lg rounded-2xl border border-white/8 bg-black/40 p-6 text-left">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-lg font-black text-white">Share your experience</h3>
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
