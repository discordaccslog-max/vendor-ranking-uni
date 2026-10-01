import { reviews } from "@/data/reviews";
import type { Review } from "@/lib/types";

/** How many reviews a vendor's reviews page shows. */
export const REVIEWS_PER_PAGE = 25;

/** A vendor's most recent reviews, newest first. */
export function getRecentReviews(vendorSlug: string, limit = REVIEWS_PER_PAGE): Review[] {
  return reviews
    .filter((r) => r.vendor === vendorSlug)
    .sort((a, b) => b.date.localeCompare(a.date))
    .slice(0, limit);
}

/** "2026-09-18" → "Sep 18, 2026" */
export function formatReviewDate(date: string): string {
  const d = new Date(`${date}T00:00:00Z`);
  if (Number.isNaN(d.getTime())) return date;
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", timeZone: "UTC" });
}
