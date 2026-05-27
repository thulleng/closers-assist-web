"use client";

import { useEffect, useState, useRef } from "react";
import ReviewCard from "./ReviewCard";
import ReviewForm from "./ReviewForm";
import { MessageCircle, Star, Users, ChevronLeft, ChevronRight, Sparkles, Quote } from "lucide-react";

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

const gradientBorders = [
  "from-emerald-500 via-teal-400 to-cyan-400",
  "from-purple-500 via-pink-500 to-rose-400",
  "from-amber-400 via-orange-500 to-red-500",
  "from-sky-400 via-blue-500 to-indigo-500",
  "from-pink-400 via-fuchsia-500 to-violet-500",
  "from-lime-400 via-green-500 to-emerald-500",
];

export default function ReviewsSection() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState("");
  const [spotlight, setSpotlight] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  const fetchReviews = async () => {
    try {
      const res = await fetch("/api/reviews?limit=12");
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

  // Auto-rotate spotlight every 5s
  useEffect(() => {
    if (reviews.length === 0) return;
    const interval = setInterval(() => {
      setSpotlight((prev) => (prev + 1) % Math.min(reviews.length, 6));
    }, 5000);
    return () => clearInterval(interval);
  }, [reviews.length]);

  const scrollSpotlight = (dir: "prev" | "next") => {
    setSpotlight((prev) => {
      const max = Math.min(reviews.length, 6) - 1;
      if (dir === "prev") return prev === 0 ? max : prev - 1;
      return prev === max ? 0 : prev + 1;
    });
  };

  const featured = reviews.slice(0, 6);

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
      {/* Spotlight — hero review, rotating */}
      {featured.length > 0 && (
        <div className="relative mb-8 overflow-hidden rounded-3xl border border-white/[0.06] bg-gradient-to-b from-black/60 via-black/40 to-black/60 p-[1px]">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 via-transparent to-purple-500/10" />
          <div className="relative rounded-3xl bg-pit/90 backdrop-blur-xl p-6 md:p-8">
            {/* Floating quote mark */}
            <div className="absolute -top-3 -left-2 text-7xl font-serif text-deal/20 select-none leading-none">
              &ldquo;
            </div>

            <div className="flex items-start justify-between gap-4">
              {/* Star rating */}
              <div className="flex shrink-0 gap-1">
                {Array.from({ length: featured[spotlight].rating }).map((_, i) => (
                  <Star
                    key={i}
                    className="h-4 w-4 fill-gold-light text-gold-light"
                    strokeWidth={0}
                  />
                ))}
              </div>

              {/* Nav arrows */}
              {featured.length > 1 && (
                <div className="flex gap-1.5 shrink-0">
                  <button
                    onClick={() => scrollSpotlight("prev")}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all"
                  >
                    <ChevronLeft className="h-3.5 w-3.5" />
                  </button>
                  <button
                    onClick={() => scrollSpotlight("next")}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/40 hover:text-white hover:bg-white/10 transition-all"
                  >
                    <ChevronRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              )}
            </div>

            {/* Quote */}
            <blockquote className="mt-4 text-base md:text-lg leading-relaxed text-white/90 font-medium italic">
              &ldquo;{featured[spotlight].review_text}&rdquo;
            </blockquote>

            {/* Author */}
            <div className="mt-5 flex items-center gap-3 border-t border-white/[0.06] pt-4">
              <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${gradientBorders[spotlight % gradientBorders.length]} text-sm font-bold text-black shadow-lg`}>
                {featured[spotlight].name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2)}
              </div>
              <div>
                <p className="text-sm font-bold text-white">{featured[spotlight].name}</p>
                <p className="text-xs text-white/40">
                  {[featured[spotlight].role, featured[spotlight].company, featured[spotlight].location]
                    .filter(Boolean)
                    .join(" · ")}
                </p>
              </div>
              {/* Dots indicator */}
              {featured.length > 1 && (
                <div className="ml-auto flex gap-1.5">
                  {featured.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setSpotlight(i)}
                      className={`h-1.5 rounded-full transition-all ${
                        i === spotlight
                          ? "w-6 bg-deal"
                          : "w-1.5 bg-white/20 hover:bg-white/40"
                      }`}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Grid — all reviews */}
      {featured.length > 0 && (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((review, i) => (
            <div
              key={review.id}
              className={`group relative overflow-hidden rounded-2xl border transition-all duration-300 hover:scale-[1.02] ${
                i === spotlight
                  ? "border-deal/40 shadow-lg shadow-deal/10 z-10"
                  : "border-white/[0.06] hover:border-white/20"
              }`}
              style={{
                background:
                  i === spotlight
                    ? "linear-gradient(135deg, rgba(16,185,129,0.08), rgba(0,0,0,0.5))"
                    : "linear-gradient(180deg, rgba(255,255,255,0.03), rgba(0,0,0,0.4))",
              }}
            >
              {/* Gradient top border on hover */}
              <div
                className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${gradientBorders[i % gradientBorders.length]} opacity-0 group-hover:opacity-100 transition-opacity`}
              />

              <div className="p-5">
                {/* Stars */}
                <div className="flex gap-0.5 mb-3">
                  {Array.from({ length: review.rating }).map((_, si) => (
                    <Star
                      key={si}
                      className="h-3.5 w-3.5 fill-gold-light text-gold-light"
                      strokeWidth={0}
                    />
                  ))}
                </div>

                {/* Text */}
                <p className="text-sm leading-relaxed text-ash/90 line-clamp-4">
                  {review.review_text}
                </p>

                {/* Author */}
                <div className="mt-4 flex items-center gap-2.5 pt-3 border-t border-white/[0.04]">
                  <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${gradientBorders[i % gradientBorders.length]} text-[10px] font-bold text-black`}>
                    {review.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2)}
                  </div>
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-white truncate">{review.name}</p>
                    <p className="text-[10px] text-white/30 truncate">
                      {[review.role, review.company].filter(Boolean).join(" · ")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Empty state — no approved reviews yet */}
      {reviews.length === 0 && !showForm && (
        <div className="relative overflow-hidden rounded-3xl border border-dashed border-white/10 bg-gradient-to-b from-black/50 via-black/30 to-black/50 p-12 text-center">
          {/* Decorative glow */}
          <div className="pointer-events-none absolute -top-20 -right-20 h-40 w-40 rounded-full bg-deal/10 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-40 w-40 rounded-full bg-purple-500/10 blur-3xl" />

          <div className="relative">
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-deal/20 to-emerald-500/20 border border-deal/20 shadow-lg">
              <Quote className="h-7 w-7 text-deal" />
            </div>
            <h3 className="mb-2 font-display text-2xl font-black text-white">
              Your story belongs here
            </h3>
            <p className="mb-8 text-sm text-ash max-w-sm mx-auto leading-relaxed">
              You&apos;re using Deal Clozr on the floor. Your coworkers are too.
              Drop a review — real stories from real closers help other reps see what&apos;s possible.
            </p>
            <button
              onClick={() => setShowForm(true)}
              className="group inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-deal to-emerald-400 px-6 py-3.5 text-sm font-bold text-black shadow-lg shadow-deal/20 hover:shadow-deal/40 hover:scale-105 transition-all"
            >
              <Sparkles className="h-4 w-4" />
              Write Your Review
              <span className="text-black/60 group-hover:translate-x-0.5 transition-transform">→</span>
            </button>
            <div className="mt-6 flex items-center justify-center gap-6 text-[11px] text-white/20">
              <span className="flex items-center gap-1.5">
                <Star className="h-3 w-3" /> Star rating
              </span>
              <span className="flex items-center gap-1.5">
                <MessageCircle className="h-3 w-3" /> Your real words
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="h-3 w-3" /> Helps other closers
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Write a review toggle */}
      <div className="mt-6 text-center">
        {!showForm && reviews.length > 0 && (
          <button
            onClick={() => setShowForm(true)}
            className="group inline-flex items-center gap-2 rounded-xl border border-deal/20 bg-deal/5 px-5 py-3 text-sm font-semibold text-deal-light hover:bg-deal/10 hover:border-deal/40 transition-all"
          >
            <Sparkles className="h-4 w-4" />
            Share your story
            <span className="group-hover:translate-x-0.5 transition-transform">→</span>
          </button>
        )}

        {showForm && (
          <div className="mx-auto max-w-lg rounded-2xl border border-white/8 bg-black/60 backdrop-blur-xl p-6 text-left shadow-xl">
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
