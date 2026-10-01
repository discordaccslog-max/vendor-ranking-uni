import type { Vendor } from "@/lib/types";
import { StarRating } from "@/components/StarRating";
import { VendorLogo } from "@/components/vendors/VendorLogo";
import { formatCount } from "@/lib/vendors";

/** One vendor in the ranked list. */
export function VendorRow({ vendor }: { vendor: Vendor }) {
  return (
    <li className="flex gap-4 border-b border-line py-6 sm:gap-5">
      <span className="w-6 shrink-0 pt-1 font-serif text-2xl leading-none tabular-nums sm:w-8 sm:text-3xl">
        {vendor.rank}
      </span>
      <VendorLogo name={vendor.name} logo={vendor.logo} />

      <div className="min-w-0 flex-1 sm:flex sm:items-start sm:justify-between sm:gap-8">
        <div className="min-w-0">
          <h2 className="text-lg leading-snug font-semibold">{vendor.name}</h2>
          <p className="mt-1 leading-relaxed text-muted">{vendor.description}</p>
        </div>

        <div className="mt-3 shrink-0 sm:mt-0.5 sm:text-right">
          <StarRating rating={vendor.rating} />
          <p className="mt-1.5 text-sm text-muted">
            <span className="font-semibold text-ink">{vendor.rating.toFixed(1)}</span>
            {" · "}
            {formatCount(vendor.reviewCount)} reviews
          </p>
          {vendor.website && (
            <a
              href={vendor.website}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-sm underline underline-offset-4 hover:text-muted"
            >
              Visit site
            </a>
          )}
        </div>
      </div>
    </li>
  );
}
