/**
 * ============================================================================
 *  VENDOR DATA — the only file you need to edit to update the rankings
 * ============================================================================
 *
 *  HOW TO EDIT
 *  • Each vendor is one `{ ... }` block in the list below.
 *  • `rank` controls the order (1 shows first). The order of the blocks in
 *    this file does NOT matter — only the `rank` number does.
 *  • Add a vendor: copy a block, paste it, change the values.
 *  • Remove a vendor: delete its whole `{ ... },` block.
 *  • Update LAST_UPDATED whenever you change the rankings.
 *
 *  FIELDS
 *  rank          Position in the ranking (1 = best). Must be unique.
 *  name          Vendor name.
 *  description   1–2 sentences shown under the name.
 *  logo          (optional) "/logos/file.svg" for a file in /public/logos,
 *                or a full "https://..." image URL. Leave out to show initials.
 *  rating        Star rating from 0 to 5. Decimals allowed (4.7).
 *  reviewCount   Number of reviews, e.g. 12480 (no commas).
 *  website       (optional) e.g. "https://example.com" — adds a "Visit site" link.
 */

import type { Vendor } from "@/lib/types";

/** Shown at the top of the page. Change it when you update the rankings. */
export const LAST_UPDATED = "1 October 2026";

export const vendors: Vendor[] = [
  {
    rank: 1,
    name: "Northwind Supply Co.",
    description: "Consistently fast fulfilment and excellent support. The most reliable all-round choice.",
    logo: "/logos/northwind.svg",
    rating: 4.8,
    reviewCount: 12480,
    website: "https://example.com",
  },
  {
    rank: 2,
    name: "Summit Source",
    description: "Premium quality and a wide catalogue. Slightly slower shipping keeps it just behind first place.",
    logo: "/logos/summit.svg",
    rating: 4.5,
    reviewCount: 8215,
    website: "https://example.com",
  },
  {
    rank: 3,
    name: "BrightLeaf Trading",
    description: "Great value for money and a friendly team. A solid pick for budget-conscious buyers.",
    logo: "/logos/brightleaf.svg",
    rating: 4.1,
    reviewCount: 3940,
  },
  {
    // No `logo` here, so this vendor shows its initials instead.
    rank: 4,
    name: "Harbor & Vale",
    description: "A newer vendor with promising products, but mixed feedback on delivery and communication.",
    rating: 3.6,
    reviewCount: 1102,
  },
];
