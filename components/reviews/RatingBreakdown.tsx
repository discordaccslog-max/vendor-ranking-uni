import type { RatingDistribution } from "@/lib/types";

const LEVELS = [5, 4, 3, 2, 1] as const;

/**
 * 5-star → 1-star bars for a vendor's reviews. Not used on the homepage yet —
 * ready for vendor profile pages.
 */
export function RatingBreakdown({ distribution, animate = true }: { distribution: RatingDistribution; animate?: boolean }) {
  return (
    <ul className="space-y-2.5">
      {LEVELS.map((level) => {
        const pct = Math.max(0, Math.min(100, distribution[level]));
        return (
          <li key={level} className="grid grid-cols-[3.25rem_1fr_2.75rem] items-center gap-3 text-sm">
            <span className="text-stone-500">{level}-star</span>
            <span className="h-1.5 overflow-hidden rounded-full bg-sand-100">
              <span
                className="block h-full rounded-full bg-gradient-to-r from-gold-500 to-gold-300 transition-[width] duration-1000 ease-luxe"
                style={{ width: animate ? `${pct}%` : "0%" }}
              />
            </span>
            <span className="text-right text-ink-900 tabular-nums">{pct}%</span>
          </li>
        );
      })}
    </ul>
  );
}
