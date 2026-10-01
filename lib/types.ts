/**
 * ============================================================================
 *  DATA MODEL
 * ============================================================================
 *  Shared types for the platform. Only `Category` is used on the homepage
 *  today; the rest describe features that will be added later (vendor
 *  profiles, rankings, reviews, verification, submissions and reports) so the
 *  pieces fit together when they're built.
 */

/** Icons available for categories. Add more in components/ui/icons.tsx. */
export type CategoryIcon = "technology" | "manufacturing" | "marketing" | "logistics" | "finance" | "generic";

export type Category = {
  /** URL id, e.g. "technology-software" → /categories/technology-software (future page). */
  slug: string;
  /** Display name, e.g. "Technology & Software". */
  name: string;
  /** One-line summary of what's in the category. */
  description: string;
  /** Example vendor types, shown as small tags on the card. */
  examples: string[];
  icon: CategoryIcon;
  /**
   * Set to true once the category page exists. Until then the card shows
   * "Coming soon" instead of linking anywhere.
   */
  live?: boolean;
};

// ---------------------------------------------------------------------------
//  Future features (not used yet)
// ---------------------------------------------------------------------------

/** How far a vendor's information has been checked. */
export type VerificationStatus = "unverified" | "reviewed" | "verified";

/** Star level → percentage of reviews at that level (0–100). */
export type RatingDistribution = { 5: number; 4: number; 3: number; 2: number; 1: number };

export type Vendor = {
  slug: string;
  name: string;
  /** Slug of the Category this vendor belongs to. */
  category: string;
  /** Position within its category's ranking. 1 = top. */
  rank?: number;
  description: string;
  logo?: string;
  website?: string;
  location?: string;
  verification: VerificationStatus;
  rating?: number;
  reviewCount?: number;
  ratingDistribution?: RatingDistribution;
};

export type Review = {
  vendorSlug: string;
  author: string;
  rating: number;
  title?: string;
  body: string;
  /** ISO date, e.g. "2026-09-18". */
  date: string;
};

export type VendorSubmission = {
  businessName: string;
  website: string;
  category: string;
  contactEmail: string;
  notes?: string;
};

export type VendorReportReason = "misleading-information" | "poor-service" | "suspicious-activity" | "other";

export type VendorReport = {
  vendorName: string;
  reason: VendorReportReason;
  details: string;
  contactEmail?: string;
};
