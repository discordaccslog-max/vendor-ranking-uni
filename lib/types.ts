/**
 * The shape of one vendor entry. If you add a field to your vendors,
 * add it here first, then fill it in /data/vendors.ts.
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
  /** Position in the ranking. 1 = top. Controls the default order. */
  rank: number;
  /** Display name. */
  name: string;
  /** One or two sentences shown on the vendor's card. */
  description: string;
  /** Longer text shown when the card is expanded. Optional. */
  details?: string;
  /** Short bullet points shown when the card is expanded. Optional. */
  highlights?: string[];
  /** Path under /public (e.g. "/logos/acme.svg") or a full https:// URL. Optional. */
  logo?: string;
  /** Overall star rating, 0–5 (decimals allowed, e.g. 4.7). */
  rating: number;
  /** Total number of reviews. */
  reviewCount: number;
  /** Percentage of reviews at each star level. Should add up to 100. */
  ratingDistribution: RatingDistribution;
  /** Link to the vendor's website. Optional. */
  website?: string;
  // TODO: add new vendor fields here (e.g. price range, location).
};
