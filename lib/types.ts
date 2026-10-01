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
  /**
   * Marks this vendor as the category's "Current Leading Vendor" and lists
   * why. Give it to the first vendor in a category.
   */
  leading?: {
    reasons: { factor: LeadingFactor; detail: string }[];
  };
};

/** What a leading vendor can be recognised for (see FACTORS in components/vendors/LeadingVendorCard.tsx). */
export type LeadingFactor = "pricing" | "delivery" | "quality" | "support";
