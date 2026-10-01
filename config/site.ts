/**
 * ============================================================================
 *  SITE CONFIG — links, navigation and homepage numbers in one place
 * ============================================================================
 */

export const SITE_TITLE = "Browse Verified Vendors & Suppliers — Free Of Charge";

export const SITE_DESCRIPTION =
  "Browse peer-reviewed, verified vendors and suppliers across multiple categories — completely free of charge.";

/** Shown in the footer and used by the "Submit a Vendor" button. */
export const CONTACT_EMAIL = "hello@example.com";

/**
 * Where buttons go.
 * TODO: once a /submit page exists, change submitVendor to "/submit".
 */
export const LINKS = {
  viewVendors: "/#vendors",
  submitVendor: `mailto:${CONTACT_EMAIL}?subject=Vendor%20submission`,
  reportVendor: "/report",
} as const;

/** Header navigation. */
export const NAV_LINKS = [
  { label: "Vendors", href: "/#vendors" },
  { label: "Report a vendor", href: "/report" },
  { label: "For vendors", href: "/#for-vendors" },
] as const;

/**
 * Animated numbers in the hero. Swap these for real platform statistics later.
 * `from` is where the count starts. Leave `value` out to use the live number
 * of categories (or set `source: "vendors"` for the live number of vendors).
 */
export const HERO_STATS: {
  value?: number;
  source?: "categories" | "vendors";
  from?: number;
  prefix?: string;
  suffix?: string;
  label: string;
}[] = [
  { source: "vendors", label: "Verified vendors" },
  { source: "categories", label: "Categories" },
  { value: 0, from: 299, prefix: "$", label: "Cost to access" },
];
