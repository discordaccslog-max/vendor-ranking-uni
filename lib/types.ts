/**
 * The shape of one vendor entry. If you add a field to your vendors,
 * add it here first, then fill it in /data/vendors.ts.
 */
export type Vendor = {
  /** Position in the ranking. 1 = top. Controls the display order. */
  rank: number;
  /** Display name. */
  name: string;
  /** One or two sentences shown under the name. */
  description: string;
  /** Path under /public (e.g. "/logos/acme.svg") or a full https:// URL. Optional. */
  logo?: string;
  /** Overall star rating, 0–5 (decimals allowed, e.g. 4.7). */
  rating: number;
  /** Total number of reviews shown next to the rating. */
  reviewCount: number;
  /** Optional link to the vendor's website. */
  website?: string;
  // TODO: add new vendor fields here (e.g. price range, location).
};
