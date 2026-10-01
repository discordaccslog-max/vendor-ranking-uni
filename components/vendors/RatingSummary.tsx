import { StarRating } from "@/components/StarRating";
import { formatCount, getRatingLabel } from "@/lib/vendors";

type RatingSummaryProps = {
  rating: number;
  reviewCount: number;
  size?: "md" | "lg";
  align?: "start" | "end";
};

/** Rating number + label, stars, and review count — used on cards and vendor pages. */
export function RatingSummary({ rating, reviewCount, size = "md", align = "start" }: RatingSummaryProps) {
  const lg = size === "lg";
  return (
    <div className={`flex flex-col gap-2 ${align === "end" ? "sm:items-end" : "items-start"}`}>
      <div className="flex items-baseline gap-2">
        <span className={`font-extrabold tracking-tight text-ink-900 ${lg ? "text-4xl" : "text-2xl"}`}>
          {rating.toFixed(1)}
        </span>
        <span className={`font-semibold text-ink-600 ${lg ? "text-lg" : "text-sm"}`}>{getRatingLabel(rating)}</span>
      </div>
      <StarRating rating={rating} size={lg ? "xl" : "md"} />
      <p className={`text-ink-500 ${lg ? "text-base" : "text-sm"}`}>
        <span className="font-semibold text-ink-700">{formatCount(reviewCount)}</span> reviews
      </p>
    </div>
  );
}
