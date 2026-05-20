import StarRating from "./StarRating";

interface ReviewCardProps {
  name: string;
  rating: number;
  review_text: string;
  role?: string | null;
  company?: string | null;
  location?: string | null;
  created_at?: string;
}

export default function ReviewCard({ name, rating, review_text, role, company, location, created_at }: ReviewCardProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const timeAgo = created_at ? getTimeAgo(new Date(created_at)) : null;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/8 bg-black/40 p-6 backdrop-blur transition-all hover:border-gold/30 h-full flex flex-col">
      {/* Quote mark */}
      <div className="mb-4 text-4xl font-serif leading-none text-gold-light/30 select-none">
        &ldquo;
      </div>

      {/* Stars */}
      <StarRating rating={rating} readonly size="sm" />

      {/* Review text */}
      <p className="mt-3 text-sm leading-relaxed text-ash flex-1">
        {review_text}
      </p>

      {/* Author */}
      <div className="mt-4 flex items-center gap-3 border-t border-white/5 pt-4">
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gold/20 text-xs font-bold text-gold-light">
          {initials}
        </div>
        <div className="min-w-0">
          <p className="text-sm font-semibold text-white truncate">{name}</p>
          {(role || company || location) && (
            <p className="text-xs text-white/40 truncate">
              {[role, company, location].filter(Boolean).join(" · ")}
            </p>
          )}
        </div>
        {timeAgo && (
          <span className="ml-auto shrink-0 text-[10px] text-white/20">{timeAgo}</span>
        )}
      </div>
    </div>
  );
}

function getTimeAgo(date: Date): string {
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  if (seconds < 60) return "just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`;
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}
