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

const gradientBorders = [
  "from-emerald-500 via-teal-400 to-cyan-400",
  "from-purple-500 via-pink-500 to-rose-400",
  "from-amber-400 via-orange-500 to-red-500",
  "from-sky-400 via-blue-500 to-indigo-500",
  "from-pink-400 via-fuchsia-500 to-violet-500",
  "from-lime-400 via-green-500 to-emerald-500",
];

export default function ReviewCard({ name, rating, review_text, role, company, location, created_at }: ReviewCardProps) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const timeAgo = created_at ? getTimeAgo(new Date(created_at)) : null;
  const gradientIndex = name.length % gradientBorders.length;

  return (
    <div className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-gradient-to-b from-white/[0.03] to-black/40 p-6 backdrop-blur transition-all duration-300 hover:scale-[1.02] hover:border-white/20 h-full flex flex-col shadow-lg shadow-black/20">
      {/* Gradient top border on hover */}
      <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${gradientBorders[gradientIndex]} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

      {/* Glow dot */}
      <div className={`absolute -top-1 -right-1 h-6 w-6 rounded-full bg-gradient-to-br ${gradientBorders[gradientIndex]} blur-xl opacity-0 group-hover:opacity-40 transition-opacity`} />

      {/* Stars */}
      <div className="mb-3">
        <StarRating rating={rating} readonly size="sm" />
      </div>

      {/* Review text */}
      <p className="text-sm leading-relaxed text-ash/90 flex-1 line-clamp-5">
        {review_text}
      </p>

      {/* Author */}
      <div className="mt-4 flex items-center gap-3 border-t border-white/[0.04] pt-4">
        <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br ${gradientBorders[gradientIndex]} text-xs font-bold text-black shadow-md`}>
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
          <span className="ml-auto shrink-0 text-[10px] text-white/20 group-hover:text-white/40 transition-colors">{timeAgo}</span>
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
