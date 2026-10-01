/**
 * ============================================================================
 *  SITE CONFIG — brand, links and homepage copy in one place
 * ============================================================================
 */

/** Brand name shown in the header, footer and browser tab. */
export const SITE_NAME = "RankWell";

export const SITE_DESCRIPTION =
  "Discover reviewed and verified vendors and suppliers across a growing range of categories — free to browse.";

/**
 * Where people are sent to submit or report a vendor.
 * Reports use the on-site form at /report (see lib/reports/).
 * TODO: once a /submit page exists, change submitVendor to "/submit".
 */
export const CONTACT_EMAIL = "hello@example.com";
export const LINKS = {
  exploreCategories: "/#categories",
  submitVendor: `mailto:${CONTACT_EMAIL}?subject=Vendor%20submission`,
  reportVendor: "/report",
} as const;

/** Header navigation. Add new pages here as they're built (e.g. Search, Rankings). */
export const NAV_LINKS = [
  { label: "Categories", href: "/#categories" },
  { label: "How it works", href: "/#how-it-works" },
  { label: "Trust", href: "/#trust" },
  { label: "For vendors", href: "/#for-vendors" },
] as const;

/**
 * Animated numbers in the hero. Swap these for real platform statistics later
 * (e.g. vendors listed, reviews collected). `from` is where the count starts.
 * Leave `value` out of a stat to use the live number of categories.
 */
export const HERO_STATS: { value?: number; from?: number; prefix?: string; suffix?: string; label: string }[] = [
  { label: "Launch categories" },
  { value: 100, suffix: "%", label: "Free to browse" },
  { value: 0, from: 299, prefix: "$", label: "Access fees" },
];
