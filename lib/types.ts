/**
 * Shared types. The shape of a vendor entry lives here so every component
 * agrees on it. If you add a new field to your vendors, add it here first.
 */

/** Star level → percentage of reviews at that level (0–100). */
export type RatingDistribution = {
  5: number;
  4: number;
  3: number;
  2: number;
  1: number;
};

export type Vendor = {
  /** Position in the ranking. 1 = top. Controls the display order. */
  rank: number;
  /** URL-friendly id, used in the vendor page address: /vendors/<slug>. */
  slug: string;
  /** Display name. */
  name: string;
  /** One or two sentences shown on the rankings card. */
  shortDescription: string;
  /** Full profile text for the vendor page. Each string is one paragraph. */
  description: string[];
  /** Path under /public (e.g. "/logos/acme.svg") or a full https:// URL. Optional. */
  logo?: string;
  /** Overall star rating, 0–5 (decimals allowed, e.g. 4.7). */
  rating: number;
  /** Total number of reviews shown next to the rating. */
  reviewCount: number;
  /** Percentage of reviews at each star level. Should add up to ~100. */
  ratingDistribution: RatingDistribution;
  /** Optional bullet points shown on the vendor page. */
  highlights?: string[];
  /** Optional link to the vendor's own website. */
  website?: string;
  // TODO: add new vendor fields here (e.g. pricing, location, founded year),
  // then fill them in /data/vendors.ts and display them in the components.
};
