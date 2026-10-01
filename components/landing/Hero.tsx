import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowRightIcon, ButtonLink } from "@/components/ui/ButtonLink";
import { StarRating } from "@/components/StarRating";
import { VendorLogo } from "@/components/vendors/VendorLogo";
import { SITE_COPY } from "@/config/site";
import { formatCount, getRankedVendors, getTotalReviewCount } from "@/lib/vendors";

export function Hero() {
  const top = getRankedVendors().slice(0, 3);
  const totalReviews = getTotalReviewCount();

  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-brand-50 via-white to-white">
      {/* Decorative background: soft glow + subtle grid */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-40 left-1/2 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full bg-brand-200/40 blur-3xl" />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(0_0_0/0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgb(0_0_0/0.035)_1px,transparent_1px)] bg-[size:48px_48px] [mask-image:radial-gradient(ellipse_at_top,black_30%,transparent_70%)]" />
      </div>

      <Container className="grid items-center gap-14 pt-16 pb-20 sm:pt-24 sm:pb-28 lg:grid-cols-[1.15fr_1fr] lg:gap-16">
        {/* Copy */}
        <div className="text-center lg:text-left">
          <p className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-white/80 px-3 py-1 text-xs font-semibold tracking-wide text-brand-800 uppercase shadow-sm">
            <span className="size-1.5 rounded-full bg-brand-500" />
            {SITE_COPY.heroEyebrow}
          </p>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-balance text-ink-900 sm:text-5xl lg:text-6xl xl:text-[4.25rem] xl:leading-[1.05]">
            View current <span className="relative whitespace-nowrap text-brand-600">rankings</span> among vendors
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-pretty text-ink-600 lg:mx-0">
            {SITE_COPY.heroTagline}
          </p>

          <div className="mt-10 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start">
            <ButtonLink href="/rankings" size="lg" className="w-full sm:w-auto">
              {SITE_COPY.heroCta}
              <ArrowRightIcon />
            </ButtonLink>
            <ButtonLink href="#how-it-works" size="lg" variant="secondary" className="w-full sm:w-auto">
              How it works
            </ButtonLink>
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-sm text-ink-500 lg:justify-start">
            <StarRating rating={5} size="sm" />
            <span>
              Based on <strong className="font-semibold text-ink-800">{formatCount(totalReviews)}</strong>{" "}
              reviews
            </span>
          </div>
        </div>

        {/* Leaderboard preview card */}
        <div className="relative mx-auto w-full max-w-md lg:max-w-none">
          <div aria-hidden="true" className="absolute -inset-4 -z-10 rounded-[2rem] bg-brand-500/10 blur-2xl" />
          <div className="rounded-3xl border border-ink-200/80 bg-white p-5 shadow-2xl shadow-ink-900/10 sm:p-6">
            <div className="flex items-center justify-between pb-4">
              <p className="text-sm font-semibold text-ink-900">Current top {top.length}</p>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-50 px-2.5 py-1 text-xs font-medium text-brand-700">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-400 opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-brand-500" />
                </span>
                Updated {SITE_COPY.lastUpdated}
              </span>
            </div>
            <ol className="space-y-3">
              {top.map((v) => (
                <li key={v.slug}>
                  <Link
                    href={`/vendors/${v.slug}`}
                    className="flex items-center gap-4 rounded-2xl border border-ink-100 bg-ink-50/60 p-3 transition-colors hover:border-brand-200 hover:bg-brand-50/60"
                  >
                    <span
                      className={`grid size-8 shrink-0 place-items-center rounded-full text-sm font-bold ${
                        v.rank === 1 ? "bg-brand-500 text-white" : "bg-white text-ink-700 ring-1 ring-ink-200"
                      }`}
                    >
                      {v.rank}
                    </span>
                    <VendorLogo name={v.name} logo={v.logo} size="sm" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate font-semibold text-ink-900">{v.name}</span>
                      <span className="mt-1 flex items-center gap-2">
                        <StarRating rating={v.rating} size="sm" />
                        <span className="text-xs font-medium text-ink-500">{v.rating.toFixed(1)}</span>
                      </span>
                    </span>
                  </Link>
                </li>
              ))}
            </ol>
            <Link
              href="/rankings"
              className="mt-4 flex items-center justify-center gap-1 text-sm font-semibold text-brand-700 hover:text-brand-800"
            >
              See full rankings <ArrowRightIcon className="size-4" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}
