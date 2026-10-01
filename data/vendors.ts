/**
 * ============================================================================
 *  VENDOR DATA — this is the ONLY file you need to edit to change the rankings
 * ============================================================================
 *
 *  HOW TO EDIT
 *  -----------
 *  • Each vendor is one `{ ... }` block in the list below.
 *  • RANK controls the order. 1 shows first, 2 second, and so on. The order the
 *    blocks appear in this file does NOT matter — only the `rank` number does.
 *  • To ADD a vendor: copy an existing block, paste it, and change the values.
 *    Give it a unique `slug` and `rank`.
 *  • To REMOVE a vendor: delete its whole `{ ... },` block.
 *  • Save the file — the site reloads automatically while `npm run dev` runs.
 *
 *  FIELD GUIDE
 *  -----------
 *  rank               Position in the ranking (1 = best). Must be unique.
 *  slug               Used in the page address: /vendors/<slug>.
 *                     Lowercase letters, numbers and dashes only. Must be unique.
 *  name               Vendor name as shown on the site.
 *  shortDescription   1–2 sentences shown on the rankings card.
 *  description        Full profile for the vendor page. Each "..." in the list
 *                     becomes its own paragraph.
 *  logo               (optional) Image path or URL.
 *                       - Local file: put it in /public/logos and write
 *                         "/logos/your-file.svg" (or .png / .jpg / .webp).
 *                       - Remote file: paste the full "https://..." URL.
 *                       - Leave it out to show a coloured initials badge.
 *  rating             Overall star rating from 0 to 5. Decimals allowed (4.7).
 *  reviewCount        Total number of reviews, e.g. 12480 (no commas).
 *  ratingDistribution Percentage of reviews at each star level (the bars on the
 *                     vendor page). Use numbers 0–100; they should add up to 100.
 *  highlights         (optional) Short bullet points for the vendor page.
 *  website            (optional) Vendor's website, e.g. "https://example.com".
 */

import type { Vendor } from "@/lib/types";

export const vendors: Vendor[] = [
  // ---------------------------------------------------------------- #1 ----
  {
    rank: 1,
    slug: "northwind-supply",
    name: "Northwind Supply Co.",
    shortDescription:
      "Consistently fast fulfilment and excellent support. The most reliable all-round choice this quarter.",
    description: [
      "Northwind Supply Co. tops our rankings thanks to an outstanding fulfilment record and a support team that customers repeatedly single out for praise.",
      "Orders ship quickly, quality is consistent from batch to batch, and pricing is transparent with no hidden fees. It is our default recommendation for most buyers.",
    ],
    logo: "/logos/northwind.svg",
    rating: 4.8,
    reviewCount: 12480,
    ratingDistribution: { 5: 86, 4: 9, 3: 3, 2: 1, 1: 1 },
    highlights: [
      "Same-day dispatch on most orders",
      "24/7 customer support",
      "Transparent, all-inclusive pricing",
    ],
    website: "https://example.com",
  },

  // ---------------------------------------------------------------- #2 ----
  {
    rank: 2,
    slug: "summit-source",
    name: "Summit Source",
    shortDescription:
      "Premium quality with a wide catalogue. Slightly slower shipping keeps it just behind first place.",
    description: [
      "Summit Source offers one of the broadest selections we reviewed, and its product quality is among the highest in the category.",
      "Delivery times are a little longer than the leader's, but customers consistently say the quality is worth the wait.",
    ],
    logo: "/logos/summit.svg",
    rating: 4.5,
    reviewCount: 8215,
    ratingDistribution: { 5: 70, 4: 18, 3: 6, 2: 3, 1: 3 },
    highlights: ["Largest catalogue in our review", "Premium quality control", "Bulk-order discounts"],
    website: "https://example.com",
  },

  // ---------------------------------------------------------------- #3 ----
  {
    rank: 3,
    slug: "brightleaf-trading",
    name: "BrightLeaf Trading",
    shortDescription:
      "Great value for money and a friendly team. A solid pick for budget-conscious buyers.",
    description: [
      "BrightLeaf Trading wins on price. Its everyday rates are among the lowest we found, and the team is quick to help with custom requests.",
      "Quality is good rather than exceptional, and stock levels can fluctuate during busy periods.",
    ],
    logo: "/logos/brightleaf.svg",
    rating: 4.1,
    reviewCount: 3940,
    ratingDistribution: { 5: 52, 4: 24, 3: 12, 2: 6, 1: 6 },
    highlights: ["Lowest everyday prices", "Flexible custom orders"],
  },

  // ---------------------------------------------------------------- #4 ----
  // This example has no `logo`, so it shows an initials badge instead.
  {
    rank: 4,
    slug: "harbor-and-vale",
    name: "Harbor & Vale",
    shortDescription:
      "A newer vendor with promising products, but mixed feedback on delivery and communication.",
    description: [
      "Harbor & Vale is a newer entrant with an interesting product range and competitive introductory pricing.",
      "Reviews are more mixed than for the vendors above, mainly around delivery delays and slow replies. One to watch as it matures.",
    ],
    rating: 3.6,
    reviewCount: 1102,
    ratingDistribution: { 5: 38, 4: 22, 3: 14, 2: 10, 1: 16 },
  },
];
