import type { RatingDistribution } from "@/lib/types";

const LEVELS = [5, 4, 3, 2, 1] as const;

/** 5-star → 1-star bars, using the percentages from /data/vendors.ts. */
export function RatingBreakdown({ distribution, animate }: { distribution: RatingDistribution; animate: boolean }) {
  return (
    <ul className="space-y-2.5">
      {LEVELS.map((level) => {
        const pct = Math.max(0, Math.min(100, distribution[level]));
        return (
          <li key={level} className="grid grid-cols-[3.25rem_1fr_2.75rem] items-center gap-3 text-sm">
            <span className="text-muted">{level}-star</span>
            <span className="h-2.5 overflow-hidden rounded-full bg-line">
              <span
                className="block h-full rounded-full bg-brand transition-[width] duration-700 ease-out"
                style={{ width: animate ? `${pct}%` : "0%" }}
              />
            </span>
            <span className="text-right tabular-nums">{pct}%</span>
          </li>
        );
      })}
    </ul>
  );
}
