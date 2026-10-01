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
 *  rank                Position in the ranking (1 = best). Must be unique.
 *  name                Vendor name.
 *  description         1–2 sentences shown on the vendor's card.
 *  details             (optional) Longer text shown when the card is opened.
 *  highlights          (optional) Bullet points shown when the card is opened.
 *  logo                (optional) "/logos/file.svg" for a file in /public/logos,
 *                      or a full "https://..." image URL. Leave out to show initials.
 *  rating              Star rating from 0 to 5. Decimals allowed (4.7).
 *  reviewCount         Number of reviews, e.g. 12480 (no commas).
 *  ratingDistribution  % of reviews at each star level (the bars shown when a
 *                      card is opened). Numbers 0–100 that add up to 100.
 *  website             (optional) e.g. "https://example.com" — adds a "Visit website" button.
 */

import type { Vendor } from "@/lib/types";

/** Shown in the hero and above the rankings. Change it when you update the rankings. */
export const LAST_UPDATED = "September 18";

export const vendors: Vendor[] = [
  {
    rank: 1,
    name: "Northwind Supply Co.",
    description: "Consistently fast fulfilment and excellent support. The most reliable all-round choice.",
    details:
      "Northwind tops the rankings thanks to an outstanding fulfilment record and a support team customers repeatedly praise. Quality is consistent from batch to batch and pricing is transparent.",
    highlights: ["Same-day dispatch on most orders", "24/7 customer support", "Transparent pricing"],
    logo: "/logos/northwind.svg",
    rating: 4.8,
    reviewCount: 12480,
    ratingDistribution: { 5: 86, 4: 9, 3: 3, 2: 1, 1: 1 },
    website: "https://example.com",
  },
  {
    rank: 2,
    name: "Summit Source",
    description: "Premium quality and a wide catalogue. Slightly slower shipping keeps it just behind first place.",
    details:
      "Summit Source has one of the broadest selections we reviewed, with quality among the best in the category. Delivery takes a little longer, but customers say it's worth the wait.",
    highlights: ["Largest catalogue", "Premium quality control", "Bulk-order discounts"],
    logo: "/logos/summit.svg",
    rating: 4.5,
    reviewCount: 15210,
    ratingDistribution: { 5: 70, 4: 18, 3: 6, 2: 3, 1: 3 },
    website: "https://example.com",
  },
  {
    rank: 3,
    name: "BrightLeaf Trading",
    description: "Great value and very happy customers. A smaller range keeps it just off the top two.",
    details:
      "BrightLeaf wins on price, with everyday rates among the lowest we found, and its customers are some of the happiest. Its smaller range and occasional stock shortages keep it at number three.",
    highlights: ["Lowest everyday prices", "Flexible custom orders"],
    logo: "/logos/brightleaf.svg",
    rating: 4.6,
    reviewCount: 3940,
    ratingDistribution: { 5: 72, 4: 20, 3: 5, 2: 2, 1: 1 },
  },
  {
    // No `logo` here, so this vendor shows its initials instead.
    rank: 4,
    name: "Harbor & Vale",
    description: "A newer vendor with promising products, but mixed feedback on delivery and communication.",
    rating: 3.6,
    reviewCount: 1102,
    ratingDistribution: { 5: 38, 4: 22, 3: 14, 2: 10, 1: 16 },
  },
];
