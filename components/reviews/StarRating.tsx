/**
 * Star rating with partial fills (e.g. 4.3 fills the fifth star 30%).
 * Used for vendor reviews. Gold by default; pass className to recolour.
 */
const STAR = "M12 2.5l2.9 6.26 6.85.74-5.1 4.63 1.42 6.75L12 17.5l-6.07 3.38 1.42-6.75L2.25 9.5l6.85-.74L12 2.5z";

const sizes = { sm: "size-3.5", md: "size-4.5", lg: "size-6" };

type StarRatingProps = {
  /** 0–5, decimals allowed. */
  rating: number;
  size?: keyof typeof sizes;
  /** Colour of filled stars (Tailwind text-* class). */
  className?: string;
  /** Colour of empty stars (Tailwind text-* class). */
  emptyClassName?: string;
};

export function StarRating({
  rating,
  size = "md",
  className = "text-gold-400",
  emptyClassName = "text-sand-200",
}: StarRatingProps) {
  const clamped = Math.max(0, Math.min(5, rating));
  return (
    <span role="img" aria-label={`Rated ${clamped.toFixed(1)} out of 5`} className="inline-flex gap-0.5">
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, clamped - i)) * 100;
        return (
          <span key={i} className={`relative ${sizes[size]}`}>
            <svg viewBox="0 0 24 24" aria-hidden="true" className={`absolute inset-0 size-full fill-current ${emptyClassName}`}>
              <path d={STAR} />
            </svg>
            <span className="absolute inset-0 overflow-hidden" style={{ width: `${fill}%` }}>
              <svg viewBox="0 0 24 24" aria-hidden="true" className={`size-full fill-current ${sizes[size]} ${className}`}>
                <path d={STAR} />
              </svg>
            </span>
          </span>
        );
      })}
    </span>
  );
}
