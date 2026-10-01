/**
 * Trustpilot-style star rating: five coloured squares with white stars.
 * Supports partial fills (e.g. 4.3 fills the fifth square 30%).
 * The fill colour reflects the overall rating level (red → green).
 */

type Size = "sm" | "md" | "lg" | "xl";

const boxSize: Record<Size, string> = {
  sm: "size-4 rounded-[3px]",
  md: "size-5 rounded-[4px]",
  lg: "size-7 rounded-[5px]",
  xl: "size-9 rounded-md",
};

const gap: Record<Size, string> = {
  sm: "gap-0.5",
  md: "gap-0.5",
  lg: "gap-1",
  xl: "gap-1",
};

/** Colour of the filled squares for a given overall rating. */
export function starColor(rating: number): string {
  if (rating >= 4.25) return "var(--color-star-5)";
  if (rating >= 3.5) return "var(--color-star-4)";
  if (rating >= 2.5) return "var(--color-star-3)";
  if (rating >= 1.5) return "var(--color-star-2)";
  return "var(--color-star-1)";
}

type StarRatingProps = {
  /** 0–5, decimals allowed. */
  rating: number;
  size?: Size;
  className?: string;
};

export function StarRating({ rating, size = "md", className = "" }: StarRatingProps) {
  const clamped = Math.max(0, Math.min(5, rating));
  const color = starColor(clamped);

  return (
    <div
      role="img"
      aria-label={`Rated ${clamped.toFixed(1)} out of 5 stars`}
      className={`inline-flex shrink-0 ${gap[size]} ${className}`}
    >
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, clamped - i)) * 100;
        return (
          <span
            key={i}
            className={`grid place-items-center ${boxSize[size]}`}
            style={{
              background: `linear-gradient(90deg, ${color} ${fill}%, var(--color-star-empty) ${fill}%)`,
            }}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="size-[72%] fill-white">
              <path d="M12 2.5l2.9 6.26 6.85.74-5.1 4.63 1.42 6.75L12 17.5l-6.07 3.38 1.42-6.75L2.25 9.5l6.85-.74L12 2.5z" />
            </svg>
          </span>
        );
      })}
    </div>
  );
}
