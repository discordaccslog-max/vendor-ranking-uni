import type { LeadingFactor, Vendor } from "@/lib/types";
import { TrustpilotRating } from "@/components/reviews/TrustpilotRating";
import { VendorActions } from "@/components/vendors/VendorActions";
import { ReportStat, VendorMonogram, VerifiedBadge } from "@/components/vendors/parts";
import { BadgeCheckIcon, HeadsetIcon, TagIcon, TrophyIcon, TruckIcon } from "@/components/ui/icons";

/** Label + icon for each reason a vendor can lead. */
const FACTORS: Record<LeadingFactor, { label: string; Icon: (p: { className?: string }) => React.ReactElement }> = {
  pricing: { label: "Pricing", Icon: TagIcon },
  delivery: { label: "Delivery speed", Icon: TruckIcon },
  quality: { label: "Quality", Icon: BadgeCheckIcon },
  support: { label: "Support", Icon: HeadsetIcon },
};

/** Featured card for a category's "Current Leading Vendor". */
export function LeadingVendorCard({ vendor }: { vendor: Vendor }) {
  const reasons = vendor.leading?.reasons ?? [];

  return (
    <article className="relative rounded-[30px] bg-[linear-gradient(135deg,#a78bfa,#f0abfc_45%,#67e8f9)] p-px shadow-[0_40px_120px_-40px_rgb(192_132_252/0.75)]">
      <div className="relative overflow-hidden rounded-[29px] bg-night-900/90 p-6 backdrop-blur-xl sm:p-9">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-24 -right-20 size-80 rounded-full bg-fuchsia-500/20 blur-3xl"
        />

        {/* Badge */}
        <div className="relative flex flex-wrap items-center justify-between gap-3">
          <span className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(110deg,#a78bfa,#f0abfc_45%,#67e8f9)] px-4 py-1.5 text-xs font-semibold tracking-[0.12em] text-night-950 uppercase shadow-[0_8px_30px_-8px_rgb(240_171_252/0.8)]">
            <TrophyIcon className="size-4" /> Current Leading Vendor
          </span>
          <span className="font-display text-5xl leading-none text-aurora">01</span>
        </div>

        <div className="relative mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_17rem] lg:gap-x-12">
          {/* Identity */}
          <div className="min-w-0 lg:col-start-1">
            <div className="flex items-center gap-5">
              <VendorMonogram name={vendor.name} size="lg" />
              <div className="min-w-0">
                <h3 className="font-display text-4xl leading-tight text-white sm:text-5xl">{vendor.name}</h3>
                <div className="mt-2">
                  <VerifiedBadge />
                </div>
              </div>
            </div>
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-mist-300">{vendor.description}</p>
            <ul className="mt-4 flex flex-wrap gap-2">
              {vendor.tags.map((tag) => (
                <li key={tag} className="rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-xs text-mist-300">
                  {tag}
                </li>
              ))}
            </ul>
          </div>

          {/* Ratings + actions (right column on desktop, under the name on phones) */}
          <div className="flex flex-col gap-4 lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <div className="grid grid-cols-2 gap-3 rounded-2xl border border-white/10 bg-night-950/50 p-4 lg:grid-cols-1">
              <TrustpilotRating rating={vendor.trustpilotRating} reviews={vendor.trustpilotReviews} url={vendor.trustpilotUrl} />
              <div className="border-l border-white/10 pl-3 lg:border-t lg:border-l-0 lg:pt-4 lg:pl-0">
                <ReportStat count={vendor.recentReports} />
              </div>
            </div>
            <VendorActions name={vendor.name} website={vendor.website} size="lg" />
          </div>

          {/* Why it leads */}
          {reasons.length > 0 && (
            <div className="border-t border-white/10 pt-6 lg:col-start-1">
              <p className="text-xs font-medium tracking-[0.22em] text-violet-300 uppercase">Why it&apos;s leading</p>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {reasons.map(({ factor, detail }) => {
                  const { label, Icon } = FACTORS[factor];
                  return (
                    <li key={factor} className="rounded-2xl border border-white/10 bg-white/[0.04] p-4">
                      <span className="flex items-center gap-2 text-sm font-medium text-white">
                        <span className="grid size-8 place-items-center rounded-xl bg-[linear-gradient(135deg,rgb(167_139_250/0.35),rgb(103_232_249/0.25))] text-white">
                          <Icon className="size-4" />
                        </span>
                        {label}
                      </span>
                      <p className="mt-2.5 text-sm leading-snug text-mist-400">{detail}</p>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>

      </div>
    </article>
  );
}
