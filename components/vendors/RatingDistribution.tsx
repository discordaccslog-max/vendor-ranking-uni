import type { RatingDistribution as Distribution } from "@/lib/types";
import { formatCount } from "@/lib/vendors";

const LEVELS = [5, 4, 3, 2, 1] as const;

type RatingDistributionProps = {
  distribution: Distribution;
  reviewCount: number;
};

/**
 * The 5-star → 1-star bars on the vendor page. Bar widths are the percentages
 * set in /data/vendors.ts (ratingDistribution).
 */
export function RatingDistribution({ distribution, reviewCount }: RatingDistributionProps) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <h2 className="text-lg font-bold text-ink-900">Rating breakdown</h2>
        <p className="text-sm text-ink-500">{formatCount(reviewCount)} reviews</p>
      </div>
      <ul className="mt-5 space-y-3">
        {LEVELS.map((level) => {
          const pct = Math.max(0, Math.min(100, distribution[level]));
          return (
            <li key={level} className="grid grid-cols-[4rem_1fr_3rem] items-center gap-3 text-sm">
              <span className="font-medium text-ink-700">{level}-star</span>
              <span
                className="h-3 overflow-hidden rounded-full bg-ink-100"
                role="meter"
                aria-label={`${level}-star reviews`}
                aria-valuenow={pct}
                aria-valuemin={0}
                aria-valuemax={100}
              >
                <span className="block h-full rounded-full bg-brand-500" style={{ width: `${pct}%` }} />
              </span>
              <span className="text-right font-medium text-ink-500 tabular-nums">{pct}%</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
