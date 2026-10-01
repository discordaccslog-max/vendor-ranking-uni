import Link from "next/link";
import type { Vendor } from "@/lib/types";
import { ArrowRightIcon, ButtonLink } from "@/components/ui/ButtonLink";
import { RankBadge } from "@/components/vendors/RankBadge";
import { RatingSummary } from "@/components/vendors/RatingSummary";
import { VendorLogo } from "@/components/vendors/VendorLogo";

/** One row in the rankings list. */
export function VendorCard({ vendor }: { vendor: Vendor }) {
  const href = `/vendors/${vendor.slug}`;
  const top = vendor.rank === 1;

  return (
    <article
      className={`relative rounded-3xl border bg-white p-5 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-ink-900/5 sm:p-7 ${
        top ? "border-brand-300 shadow-lg shadow-brand-500/10 ring-1 ring-brand-200" : "border-ink-200"
      }`}
    >
      {top && (
        <span className="absolute -top-3 left-6 rounded-full bg-brand-500 px-3 py-1 text-xs font-semibold tracking-wide text-white uppercase shadow-sm">
          Top pick
        </span>
      )}

      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        {/* Rank + logo + name/description */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-4 sm:gap-5">
            <RankBadge rank={vendor.rank} />
            <VendorLogo name={vendor.name} logo={vendor.logo} size="md" />
            <div className="min-w-0 flex-1">
              <h2 className="text-lg font-bold tracking-tight text-ink-900 sm:text-xl">
                <Link href={href} className="hover:text-brand-700">
                  {vendor.name}
                </Link>
              </h2>
              {/* Desktop: description sits beside the logo */}
              <p className="mt-1.5 hidden leading-relaxed text-ink-600 sm:block">{vendor.shortDescription}</p>
            </div>
          </div>
          {/* Mobile: description gets the full card width */}
          <p className="mt-4 text-sm leading-relaxed text-ink-600 sm:hidden">{vendor.shortDescription}</p>
        </div>

        {/* Rating + CTA */}
        <div className="flex flex-row items-end justify-between gap-4 border-t border-ink-100 pt-5 sm:w-56 sm:flex-col sm:shrink-0 sm:items-end sm:border-t-0 sm:border-l sm:pt-0 sm:pl-6">
          <RatingSummary rating={vendor.rating} reviewCount={vendor.reviewCount} align="end" />
          <ButtonLink href={href} variant={top ? "primary" : "secondary"} className="shrink-0">
            Learn more <ArrowRightIcon className="size-4" />
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
