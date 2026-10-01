import type { Vendor } from "@/lib/types";
import { TrustpilotRating } from "@/components/reviews/TrustpilotRating";
import { VendorActions } from "@/components/vendors/VendorActions";
import { ReportStat, VendorMonogram, VerifiedBadge } from "@/components/vendors/parts";

/** One ranked vendor in the list. */
export function VendorRow({ vendor, rank }: { vendor: Vendor; rank: number }) {
  return (
    <article className="group relative overflow-hidden rounded-[24px] border border-white/10 bg-night-900/55 p-5 backdrop-blur-xl transition-all duration-500 ease-luxe hover:border-white/20 hover:bg-night-900/70 sm:p-6">
      {/* Accent line that lights up on hover */}
      <span
        aria-hidden="true"
        className="absolute inset-y-6 left-0 w-px bg-gradient-to-b from-transparent via-fuchsia-300 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100"
      />

      <div className="grid gap-5 xl:grid-cols-[3rem_minmax(0,1fr)_13.5rem_9rem_12.5rem] xl:items-center xl:gap-6">
        <span className="hidden font-display text-4xl text-mist-500 tabular-nums xl:block">
          {String(rank).padStart(2, "0")}
        </span>

        {/* Identity */}
        <div className="min-w-0">
          <div className="flex items-center gap-4">
            <VendorMonogram name={vendor.name} />
            <div className="min-w-0">
              <p className="flex items-center gap-2 text-xs text-mist-500 tabular-nums">
                <span className="xl:hidden">#{rank}</span>
                {vendor.leading && (
                  <span className="font-medium tracking-[0.16em] text-fuchsia-200 uppercase">Leading vendor</span>
                )}
              </p>
              <h3 className="flex flex-wrap items-center gap-x-2.5 gap-y-1 text-lg leading-snug font-medium text-mist-100">
                {vendor.name} <VerifiedBadge />
              </h3>
            </div>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-mist-400">{vendor.description}</p>
          <ul className="mt-3 flex flex-wrap gap-1.5">
            {vendor.tags.map((tag) => (
              <li key={tag} className="rounded-full border border-white/10 px-2.5 py-0.5 text-[11px] text-mist-300">
                {tag}
              </li>
            ))}
          </ul>
        </div>

        {/* Below xl: ratings box + actions side by side. On xl they become their own columns. */}
        <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_12.5rem] md:items-center xl:contents">
          <div className="grid grid-cols-2 gap-3 rounded-2xl border border-white/10 bg-night-950/40 p-4 xl:contents">
            <div className="xl:border-l xl:border-white/10 xl:pl-6">
              <TrustpilotRating rating={vendor.trustpilotRating} reviews={vendor.trustpilotReviews} url={vendor.trustpilotUrl} />
            </div>
            <div className="border-l border-white/10 pl-3 xl:pl-6">
              <ReportStat count={vendor.recentReports} />
            </div>
          </div>
          <VendorActions name={vendor.name} website={vendor.website} />
        </div>
      </div>
    </article>
  );
}
