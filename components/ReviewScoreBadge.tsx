"use client";

import { useEffect, useState } from "react";
import { Star } from "lucide-react";

type ReviewData = {
  count: number;
  avgRating: number;
};

export default function ReviewScoreBadge() {
  const [data, setData] = useState<ReviewData | null>(null);

  useEffect(() => {
    fetch("/api/reviews?limit=50")
      .then((res) => res.json())
      .then((json) => {
        const reviews = json.reviews || [];
        if (reviews.length === 0) {
          setData({ count: 0, avgRating: 0 });
          return;
        }
        const total = reviews.reduce((s: number, r: any) => s + r.rating, 0);
        setData({
          count: reviews.length,
          avgRating: Math.round((total / reviews.length) * 10) / 10,
        });
      })
      .catch(() => setData(null));
  }, []);

  if (!data || data.count === 0) return null;

  return (
    <a
      href="/reviews"
      className="mt-4 inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.03] px-4 py-1.5 text-xs text-white/60 hover:border-deal/20 hover:text-deal-light transition-all"
    >
      <span className="flex items-center gap-0.5">
        {[1, 2, 3, 4, 5].map((i) => (
          <Star
            key={i}
            className={`h-3 w-3 ${
              i <= Math.round(data.avgRating)
                ? "text-gold-light fill-gold-light"
                : "text-white/10"
            }`}
            strokeWidth={1.5}
          />
        ))}
      </span>
      <span className="font-bold text-white/70">{data.avgRating}</span>
      <span className="text-white/40">·</span>
      <span>
        <strong className="text-white/70">{data.count}</strong>{" "}
        verified review{data.count !== 1 ? "s" : ""}
      </span>
      <svg
        className="h-3 w-3 text-deal-light"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth={2}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </a>
  );
}
