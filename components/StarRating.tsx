/**
 * Five square star boxes (Trustpilot-style) with partial fills,
 * e.g. 4.3 fills the fifth box 30%. Colour reflects the rating level.
 */

function starColor(rating: number): string {
  if (rating >= 4.25) return "var(--color-star-5)";
  if (rating >= 3.5) return "var(--color-star-4)";
  if (rating >= 2.5) return "var(--color-star-3)";
  if (rating >= 1.5) return "var(--color-star-2)";
  return "var(--color-star-1)";
}

export function StarRating({ rating }: { rating: number }) {
  const clamped = Math.max(0, Math.min(5, rating));
  const color = starColor(clamped);

  return (
    <div role="img" aria-label={`Rated ${clamped.toFixed(1)} out of 5`} className="inline-flex gap-0.5">
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, clamped - i)) * 100;
        return (
          <span
            key={i}
            className="grid size-5 place-items-center"
            style={{ background: `linear-gradient(90deg, ${color} ${fill}%, var(--color-star-empty) ${fill}%)` }}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="size-3.5 fill-white">
              <path d="M12 2.5l2.9 6.26 6.85.74-5.1 4.63 1.42 6.75L12 17.5l-6.07 3.38 1.42-6.75L2.25 9.5l6.85-.74L12 2.5z" />
            </svg>
          </span>
        );
      })}
    </div>
  );
}
