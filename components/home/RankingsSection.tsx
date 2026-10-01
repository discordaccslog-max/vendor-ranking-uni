"use client";

import { useMemo, useState } from "react";
import type { Vendor } from "@/lib/types";
import { CATEGORY_NAME, INTRO } from "@/config/site";
import { VendorCard } from "@/components/vendors/VendorCard";

const SORTS = {
  rank: { label: "Rank", compare: (a: Vendor, b: Vendor) => a.rank - b.rank },
  rating: { label: "Highest rated", compare: (a: Vendor, b: Vendor) => b.rating - a.rating || a.rank - b.rank },
  reviews: { label: "Most reviewed", compare: (a: Vendor, b: Vendor) => b.reviewCount - a.reviewCount || a.rank - b.rank },
} as const;

type SortKey = keyof typeof SORTS;

export function RankingsSection({ vendors, lastUpdated }: { vendors: Vendor[]; lastUpdated: string }) {
  const [sort, setSort] = useState<SortKey>("rank");
  const sorted = useMemo(() => [...vendors].sort(SORTS[sort].compare), [vendors, sort]);

  return (
    <section id="rankings" className="scroll-mt-4 bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-sm font-medium text-muted">Last updated {lastUpdated}</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">Top {CATEGORY_NAME} vendors</h2>
            <p className="mt-2 max-w-xl text-muted">{INTRO}</p>
          </div>

          {/* Sort control */}
          <div role="group" aria-label="Sort vendors" className="inline-flex self-start rounded-lg border border-line bg-white p-1 md:self-auto">
            {(Object.keys(SORTS) as SortKey[]).map((key) => (
              <button
                key={key}
                type="button"
                onClick={() => setSort(key)}
                aria-pressed={sort === key}
                className={`rounded-md px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors ${
                  sort === key ? "bg-ink text-white" : "text-muted hover:text-ink"
                }`}
              >
                {SORTS[key].label}
              </button>
            ))}
          </div>
        </div>

        <ol className="mt-8 space-y-3">
          {sorted.map((vendor) => (
            <li key={vendor.name}>
              <VendorCard vendor={vendor} defaultOpen={vendor.rank === 1} />
            </li>
          ))}
        </ol>

        <p className="mt-6 text-sm text-muted">Click a vendor to see details and its rating breakdown.</p>
      </div>
    </section>
  );
}
