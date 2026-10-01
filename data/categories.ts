/**
 * ============================================================================
 *  CATEGORIES — the tabs in the "Vendors" section
 * ============================================================================
 *  • slug         Lowercase id. Vendors in data/vendors.ts use it as `category`.
 *  • name         Shown on the tab.
 *  • description  One line under the name.
 *  • icon         "fashion", "disposables", "electronics" or "generic".
 */
import type { Category } from "@/lib/types";

export const categories: Category[] = [
  {
    slug: "fashion-clothes",
    name: "Fashion & Clothes",
    description: "Apparel manufacturers, wholesalers, streetwear and accessories suppliers.",
    icon: "fashion",
  },
  {
    slug: "disposables",
    name: "Disposables",
    description: "Packaging, cups, cutlery, bags and single-use supplies.",
    icon: "disposables",
  },
  {
    slug: "electronics",
    name: "Electronics",
    description: "Gadgets, components, accessories and consumer electronics.",
    icon: "electronics",
  },
];
