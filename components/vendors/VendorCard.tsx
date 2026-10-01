"use client";

import { useId, useState } from "react";
import type { Vendor } from "@/lib/types";
import { formatCount, ratingLabel } from "@/lib/format";
import { StarRating } from "@/components/StarRating";
import { RatingBreakdown } from "@/components/vendors/RatingBreakdown";
import { VendorLogo } from "@/components/vendors/VendorLogo";

/** One vendor in the rankings. Click the card to open details and the rating breakdown. */
export function VendorCard({ vendor, defaultOpen = false }: { vendor: Vendor; defaultOpen?: boolean }) {
  const [open, setOpen] = useState(defaultOpen);
  const panelId = useId();
  const top = vendor.rank === 1;

  return (
    <article
      className={`overflow-hidden rounded-xl border bg-white transition-colors ${
        open ? "border-ink/25" : "border-line hover:border-ink/25"
      }`}
    >
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={panelId}
        className="flex w-full items-center gap-4 p-4 text-left sm:gap-5 sm:p-5"
      >
        <span
          className={`grid size-9 shrink-0 place-items-center rounded-lg text-base font-bold tabular-nums ${
            top ? "bg-brand text-white" : "bg-surface text-ink"
          }`}
        >
          {vendor.rank}
        </span>
        <VendorLogo name={vendor.name} logo={vendor.logo} />

        <span className="min-w-0 flex-1">
          <span className="block text-base font-semibold sm:text-lg">{vendor.name}</span>
          <span className="mt-0.5 hidden text-muted sm:line-clamp-1">{vendor.description}</span>
          {/* Mobile: rating sits under the name */}
          <span className="mt-1.5 flex items-center gap-2 sm:hidden">
            <StarRating rating={vendor.rating} size="sm" />
            <span className="text-sm">
              <span className="font-semibold">{vendor.rating.toFixed(1)}</span>{" "}
              <span className="text-muted">({formatCount(vendor.reviewCount)})</span>
            </span>
          </span>
        </span>

        {/* Desktop: rating on the right */}
        <span className="hidden shrink-0 flex-col items-end gap-1 sm:flex">
          <StarRating rating={vendor.rating} />
          <span className="text-sm text-muted">
            <span className="font-semibold text-ink">{vendor.rating.toFixed(1)}</span> · {formatCount(vendor.reviewCount)}{" "}
            reviews
          </span>
        </span>

        <svg
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
          className={`size-5 shrink-0 text-muted transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          <path
            fillRule="evenodd"
            d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {/* Expandable panel (animated open/close) */}
      <div
        id={panelId}
        inert={!open}
        className={`grid transition-[grid-template-rows] duration-300 ease-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <div className="grid gap-6 border-t border-line p-4 sm:p-5 md:grid-cols-[1fr_17rem] md:gap-10">
            <div>
              <p className="leading-relaxed text-muted sm:hidden">{vendor.description}</p>
              {vendor.details && <p className="mt-3 leading-relaxed sm:mt-0">{vendor.details}</p>}
              {!vendor.details && <p className="hidden leading-relaxed sm:block">{vendor.description}</p>}

              {vendor.highlights && vendor.highlights.length > 0 && (
                <ul className="mt-4 space-y-2">
                  {vendor.highlights.map((h) => (
                    <li key={h} className="flex items-start gap-2 text-sm">
                      <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-brand">
                        <path
                          fillRule="evenodd"
                          d="M16.7 4.15a.75.75 0 0 1 .15 1.05l-8 10.5a.75.75 0 0 1-1.13.08l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.9 3.9 7.47-9.82a.75.75 0 0 1 1.05-.15Z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {h}
                    </li>
                  ))}
                </ul>
              )}

              {vendor.website && (
                <a
                  href={vendor.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex h-10 items-center gap-1.5 rounded-lg bg-ink px-4 text-sm font-semibold text-white transition-colors hover:bg-ink/85"
                >
                  Visit website
                  <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="size-4">
                    <path
                      fillRule="evenodd"
                      d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06Z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              )}
            </div>

            <div className="rounded-lg bg-surface p-4">
              <div className="mb-3 flex items-baseline justify-between">
                <span className="font-semibold">
                  {vendor.rating.toFixed(1)} <span className="font-normal text-muted">· {ratingLabel(vendor.rating)}</span>
                </span>
                <span className="text-sm text-muted">{formatCount(vendor.reviewCount)} reviews</span>
              </div>
              <RatingBreakdown distribution={vendor.ratingDistribution} animate={open} />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
