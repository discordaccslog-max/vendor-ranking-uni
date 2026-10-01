/**
 * Helpers for reading vendor data. Pages and components should use these
 * instead of importing /data/vendors.ts directly, so that if the data source
 * ever changes (e.g. a CMS or database) only this file needs updating.
 */
import { vendors } from "@/data/vendors";
import type { Vendor } from "@/lib/types";

/** All vendors, ordered by the `rank` you set (1 first). */
export function getRankedVendors(): Vendor[] {
  return [...vendors].sort((a, b) => a.rank - b.rank);
}

export function getVendorBySlug(slug: string): Vendor | undefined {
  return vendors.find((v) => v.slug === slug);
}

/** Total reviews across every vendor — handy for trust stats. */
export function getTotalReviewCount(): number {
  return vendors.reduce((sum, v) => sum + v.reviewCount, 0);
}

/** Word label for a rating, Trustpilot-style. */
export function getRatingLabel(rating: number): string {
  if (rating >= 4.5) return "Excellent";
  if (rating >= 4) return "Great";
  if (rating >= 3) return "Average";
  if (rating >= 2) return "Poor";
  return "Bad";
}

/** 12480 → "12,480" */
export function formatCount(n: number): string {
  return n.toLocaleString("en-US");
}

/* Catch common editing mistakes early. Only runs in development and only logs
   warnings — it never breaks the site. */
if (process.env.NODE_ENV !== "production") {
  const seen = { slug: new Set<string>(), rank: new Set<number>() };
  for (const v of vendors) {
    if (seen.slug.has(v.slug)) console.warn(`[vendors] Duplicate slug "${v.slug}"`);
    if (seen.rank.has(v.rank)) console.warn(`[vendors] Duplicate rank ${v.rank} (${v.name})`);
    seen.slug.add(v.slug);
    seen.rank.add(v.rank);
    if (v.rating < 0 || v.rating > 5) console.warn(`[vendors] ${v.name}: rating should be 0–5`);
    const total = Object.values(v.ratingDistribution).reduce((a, b) => a + b, 0);
    if (Math.abs(total - 100) > 1)
      console.warn(`[vendors] ${v.name}: ratingDistribution adds up to ${total}, expected 100`);
  }
}
