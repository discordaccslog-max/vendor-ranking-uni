import { formatCount } from "@/lib/format";

const STAR = "M12 2.5l2.9 6.26 6.85.74-5.1 4.63 1.42 6.75L12 17.5l-6.07 3.38 1.42-6.75L2.25 9.5l6.85-.74L12 2.5z";

/** Square colour for a TrustScore (red → green), like Trustpilot. */
function starColor(rating: number): string {
  if (rating >= 4.25) return "var(--color-tp-5)";
  if (rating >= 3.5) return "var(--color-tp-4)";
  if (rating >= 2.5) return "var(--color-tp-3)";
  if (rating >= 1.5) return "var(--color-tp-2)";
  return "var(--color-tp-1)";
}

/** Five Trustpilot-style star squares with partial fills (4.3 fills the 5th square 30%). */
export function TrustpilotStars({ rating, size = "md" }: { rating: number; size?: "sm" | "md" }) {
  const clamped = Math.max(0, Math.min(5, rating));
  const color = starColor(clamped);
  const box = size === "sm" ? "size-4" : "size-5";
  return (
    <span role="img" aria-label={`Rated ${clamped.toFixed(1)} out of 5`} className="inline-flex gap-0.5">
      {[0, 1, 2, 3, 4].map((i) => {
        const fill = Math.max(0, Math.min(1, clamped - i)) * 100;
        return (
          <span
            key={i}
            className={`grid place-items-center ${box}`}
            style={{ background: `linear-gradient(90deg, ${color} ${fill}%, rgb(255 255 255 / 0.14) ${fill}%)` }}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" className="size-[72%] fill-white">
              <path d={STAR} />
            </svg>
          </span>
        );
      })}
    </span>
  );
}

/** Trustpilot wordmark: the green star + "Trustpilot". */
export function TrustpilotLogo() {
  return (
    <span className="inline-flex items-center gap-1 text-[13px] font-semibold tracking-[-0.01em] text-white">
      <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-tp-5">
        <path d={STAR} />
      </svg>
      Trustpilot
    </span>
  );
}

type TrustpilotRatingProps = {
  rating: number;
  reviews: number;
  /** Link to the vendor's Trustpilot page, if known. */
  url?: string;
};

/** Trustpilot logo, star squares, TrustScore and review count. */
export function TrustpilotRating({ rating, reviews, url }: TrustpilotRatingProps) {
  const body = (
    <>
      <TrustpilotLogo />
      <span className="mt-2.5 block">
        <TrustpilotStars rating={rating} />
      </span>
      <span className="mt-2 block text-xs text-mist-400">
        TrustScore <span className="font-semibold text-mist-100">{rating.toFixed(1)}</span>
        <span className="mx-1.5 text-mist-500">|</span>
        {formatCount(reviews)} reviews
      </span>
    </>
  );
  return url ? (
    <a href={url} target="_blank" rel="noopener noreferrer" className="block transition-opacity hover:opacity-80">
      {body}
    </a>
  ) : (
    <div>{body}</div>
  );
}
