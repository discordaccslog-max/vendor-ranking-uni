import { vendors } from "@/data/vendors";
import type { Vendor } from "@/lib/types";

/** All vendors, ordered by the `rank` you set (1 first). */
export function getRankedVendors(): Vendor[] {
  return [...vendors].sort((a, b) => a.rank - b.rank);
}

/* Catch common editing mistakes. Development only; logs warnings in the
   terminal running `npm run dev` and never breaks the site. */
if (process.env.NODE_ENV !== "production") {
  const ranks = new Set<number>();
  for (const v of vendors) {
    if (ranks.has(v.rank)) console.warn(`[vendors] Duplicate rank ${v.rank} (${v.name})`);
    ranks.add(v.rank);
    if (v.rating < 0 || v.rating > 5) console.warn(`[vendors] ${v.name}: rating should be 0–5`);
    const total = Object.values(v.ratingDistribution).reduce((a, b) => a + b, 0);
    if (Math.abs(total - 100) > 1)
      console.warn(`[vendors] ${v.name}: ratingDistribution adds up to ${total}, expected 100`);
  }
}
