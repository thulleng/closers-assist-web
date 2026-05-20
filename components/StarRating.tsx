"use client";

interface StarRatingProps {
  rating: number;
  onChange?: (rating: number) => void;
  readonly?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function StarRating({ rating, onChange, readonly = false, size = "md" }: StarRatingProps) {
  const sizes = { sm: "text-sm", md: "text-xl", lg: "text-3xl" };

  return (
    <div className={`flex gap-0.5 ${readonly ? "" : "cursor-pointer"}`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => onChange?.(star)}
          className={`transition-colors ${sizes[size]} ${
            readonly ? "cursor-default" : "cursor-pointer hover:scale-110 transition-transform"
          } ${star <= rating ? "text-gold-light" : "text-white/15 hover:text-gold-light/50"}`}
          aria-label={`${star} star${star !== 1 ? "s" : ""}`}
        >
          ★
        </button>
      ))}
    </div>
  );
}
