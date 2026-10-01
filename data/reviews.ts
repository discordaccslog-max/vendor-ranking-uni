/**
 * ============================================================================
 *  REVIEWS — add reviews here by hand
 * ============================================================================
 *  Each vendor's "See reviews" page (/reviews/<vendor slug>) shows its most
 *  recent 25 reviews from this list, newest first. The order you add them in
 *  doesn't matter; they're sorted by `date`.
 *
 *  • vendor   The vendor's slug from data/vendors.ts (e.g. "pureserve-packaging").
 *  • author   Reviewer's name as you want it shown.
 *  • rating   1–5 stars.
 *  • title    (optional) Short headline.
 *  • body     The review text.
 *  • date     YYYY-MM-DD, e.g. "2026-09-18".
 *
 *  Example — copy this block (without the // ) for each review:
 *
 *  {
 *    vendor: "pureserve-packaging",
 *    author: "Jordan M.",
 *    rating: 5,
 *    title: "Fast and reliable",
 *    body: "Ordered 5,000 cups and they arrived in two days. Great quality.",
 *    date: "2026-09-18",
 *  },
 */
import type { Review } from "@/lib/types";

export const reviews: Review[] = [
  // Add reviews here.
];
