/**
 * ============================================================================
 *  DATA MODEL
 * ============================================================================
 */

/** Icons available for categories (see components/ui/icons.tsx). */
export type CategoryIcon = "fashion" | "disposables" | "electronics" | "generic";

export type Category = {
  /** Lowercase id; vendors point at this. */
  slug: string;
  name: string;
  description: string;
  icon: CategoryIcon;
};

export type Vendor = {
  /** Lowercase id, unique across all vendors. */
  slug: string;
  name: string;
  /** Slug of the Category this vendor is listed in. */
  category: string;
  /** One or two sentences about the vendor. */
  description: string;
  /** What they supply — shown as small tags. */
  tags: string[];
  /** Trustpilot TrustScore, 0–5 (decimals allowed). */
  trustpilotRating: number;
  /** Number of Trustpilot reviews. */
  trustpilotReviews: number;
  /** Link to the vendor's Trustpilot page. Optional. */
  trustpilotUrl?: string;
  /** Bad-feedback reports received in the past 6 months. */
  recentReports: number;
  /** Vendor's website — shown as the "View site" button. */
  website: string;
  /** Shows a small "Leading vendor" note on this vendor. Optional. */
  leading?: boolean;
};

/** A review shown on a vendor's reviews page (/reviews/<vendor slug>). */
export type Review = {
  /** Slug of the vendor this review is about (from data/vendors.ts). */
  vendor: string;
  /** Reviewer's name as you want it shown. */
  author: string;
  /** Star rating, 1–5. */
  rating: number;
  /** Optional headline for the review. */
  title?: string;
  /** The review text. */
  body: string;
  /** Date of the review, written as YYYY-MM-DD (e.g. "2026-09-18"). */
  date: string;
};
