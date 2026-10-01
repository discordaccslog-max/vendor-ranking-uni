/**
 * ============================================================================
 *  CATEGORIES — edit this list to change the cards on the homepage
 * ============================================================================
 *
 *  These three are placeholders. Replace them with your real categories:
 *  • name         Title on the card.
 *  • description  One line about what's in the category.
 *  • examples     A few example vendor types (shown as small tags).
 *  • icon         One of: "technology", "manufacturing", "marketing",
 *                 "logistics", "finance", "generic".
 *  • slug         Lowercase id used for the future category page URL.
 *  • live         Set to true once that category's page exists — the card
 *                 then links to /categories/<slug>. Until then it shows
 *                 "Coming soon".
 *
 *  Cards are numbered automatically (01, 02, 03…) in the order listed here.
 */
import type { Category } from "@/lib/types";

export const categories: Category[] = [
  {
    slug: "technology-software",
    name: "Technology & Software",
    description: "Vendors, platforms, agencies, and technology providers.",
    examples: ["SaaS platforms", "Dev agencies", "IT services"],
    icon: "technology",
  },
  {
    slug: "manufacturing-suppliers",
    name: "Manufacturing & Suppliers",
    description: "Manufacturers, wholesalers, distributors, and sourcing partners.",
    examples: ["Manufacturers", "Wholesalers", "Distributors"],
    icon: "manufacturing",
  },
  {
    slug: "marketing-creative",
    name: "Marketing & Creative",
    description: "Agencies, consultants, production companies, and creative partners.",
    examples: ["Agencies", "Consultants", "Production"],
    icon: "marketing",
  },
];
