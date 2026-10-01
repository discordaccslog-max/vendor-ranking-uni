/**
 * ============================================================================
 *  VENDORS — edit this list to change the vendors shown on the site
 * ============================================================================
 *  ⚠ These are PLACEHOLDERS with made-up numbers. Replace them with real
 *  vendors and their real Trustpilot data before launch.
 *
 *  • slug               Unique lowercase id.
 *  • name               Vendor name.
 *  • category           Slug from data/categories.ts.
 *  • description        One or two sentences.
 *  • tags               What they supply (small tags on the card).
 *  • trustpilotRating   TrustScore 0–5 (e.g. 4.6).
 *  • trustpilotReviews  Number of Trustpilot reviews.
 *  • trustpilotUrl      (optional) Link to their Trustpilot page.
 *  • recentReports      Bad-feedback reports in the past 6 months.
 *  • website            Vendor's website (the "View site" button).
 *  • leading            (optional) Makes this the category's "Current Leading
 *                       Vendor", with the reasons it leads. Factors:
 *                       "pricing", "delivery", "quality", "support".
 *
 *  Vendors are ranked in the order listed here within their category, so put
 *  a leading vendor first.
 */
import type { Vendor } from "@/lib/types";

export const vendors: Vendor[] = [
  // ---- Fashion & Clothes --------------------------------------------------
  {
    slug: "atelier-nova",
    name: "Atelier Nova",
    category: "fashion-clothes",
    description: "Cut-and-sew manufacturer for premium basics with low minimum order quantities.",
    tags: ["Private label", "Basics", "Low MOQ"],
    trustpilotRating: 4.8,
    trustpilotReviews: 2314,
    recentReports: 0,
    website: "https://example.com",
  },
  {
    slug: "threadline-supply",
    name: "Threadline Supply",
    category: "fashion-clothes",
    description: "Wholesale blanks and streetwear essentials shipped from regional warehouses.",
    tags: ["Blanks", "Streetwear", "Wholesale"],
    trustpilotRating: 4.5,
    trustpilotReviews: 1187,
    recentReports: 2,
    website: "https://example.com",
  },
  {
    slug: "velvet-row",
    name: "Velvet Row Apparel",
    category: "fashion-clothes",
    description: "Seasonal womenswear collections with trend-led designs and fast restocks.",
    tags: ["Womenswear", "Seasonal", "Dropshipping"],
    trustpilotRating: 4.2,
    trustpilotReviews: 642,
    recentReports: 4,
    website: "https://example.com",
  },
  {
    slug: "northloom",
    name: "Northloom Accessories",
    category: "fashion-clothes",
    description: "Bags, belts, hats and jewellery sourced from vetted workshops.",
    tags: ["Accessories", "Jewellery", "Bags"],
    trustpilotRating: 3.9,
    trustpilotReviews: 318,
    recentReports: 7,
    website: "https://example.com",
  },

  // ---- Disposables --------------------------------------------------------
  {
    slug: "pureserve-packaging",
    name: "PureServe Packaging",
    category: "disposables",
    description: "Food-safe takeaway containers, cups and lids for restaurants and cafés.",
    tags: ["Takeaway", "Food-safe", "Bulk"],
    trustpilotRating: 4.7,
    trustpilotReviews: 3051,
    recentReports: 1,
    website: "https://example.com",
    leading: {
      reasons: [
        { factor: "pricing", detail: "Lowest bulk pricing in the category" },
        { factor: "delivery", detail: "Most orders dispatched within 24 hours" },
        { factor: "quality", detail: "Food-safe certified, consistent batches" },
        { factor: "support", detail: "Dedicated account manager on every order" },
      ],
    },
  },
  {
    slug: "ecocup-co",
    name: "EcoCup Co.",
    category: "disposables",
    description: "Compostable cups, straws and cutlery with custom-print options.",
    tags: ["Compostable", "Custom print", "Cups"],
    trustpilotRating: 4.6,
    trustpilotReviews: 1478,
    recentReports: 0,
    website: "https://example.com",
  },
  {
    slug: "clearline",
    name: "Clearline Disposables",
    category: "disposables",
    description: "Gloves, aprons and hygiene supplies for hospitality and healthcare.",
    tags: ["Gloves", "Hygiene", "PPE"],
    trustpilotRating: 4.1,
    trustpilotReviews: 806,
    recentReports: 3,
    website: "https://example.com",
  },
  {
    slug: "brightwrap",
    name: "Brightwrap",
    category: "disposables",
    description: "Mailer bags, tissue paper and branded e-commerce packaging.",
    tags: ["Mailers", "E-commerce", "Branding"],
    trustpilotRating: 3.7,
    trustpilotReviews: 254,
    recentReports: 6,
    website: "https://example.com",
  },

  // ---- Electronics --------------------------------------------------------
  {
    slug: "voltway",
    name: "Voltway Electronics",
    category: "electronics",
    description: "Phone accessories, chargers and audio gear with full compliance paperwork.",
    tags: ["Accessories", "Chargers", "Audio"],
    trustpilotRating: 4.9,
    trustpilotReviews: 5420,
    recentReports: 1,
    website: "https://example.com",
  },
  {
    slug: "circuit-harbor",
    name: "Circuit Harbor",
    category: "electronics",
    description: "Components, modules and dev boards for makers and small manufacturers.",
    tags: ["Components", "Modules", "Prototyping"],
    trustpilotRating: 4.4,
    trustpilotReviews: 1932,
    recentReports: 2,
    website: "https://example.com",
  },
  {
    slug: "pulse-gadgets",
    name: "Pulse Gadgets",
    category: "electronics",
    description: "Trending smart-home and lifestyle gadgets ready for resale.",
    tags: ["Smart home", "Gadgets", "Resale"],
    trustpilotRating: 4.0,
    trustpilotReviews: 711,
    recentReports: 5,
    website: "https://example.com",
  },
  {
    slug: "nexa-refurb",
    name: "Nexa Refurb",
    category: "electronics",
    description: "Graded refurbished laptops, tablets and phones in bulk lots.",
    tags: ["Refurbished", "Laptops", "Bulk lots"],
    trustpilotRating: 3.6,
    trustpilotReviews: 289,
    recentReports: 9,
    website: "https://example.com",
  },
];
