import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { ArrowRightIcon, ButtonLink } from "@/components/ui/ButtonLink";
import { RankBadge } from "@/components/vendors/RankBadge";
import { RatingDistribution } from "@/components/vendors/RatingDistribution";
import { RatingSummary } from "@/components/vendors/RatingSummary";
import { VendorLogo } from "@/components/vendors/VendorLogo";
import { CATEGORY_NAME } from "@/config/site";
import { getRankedVendors, getVendorBySlug } from "@/lib/vendors";

type Props = { params: Promise<{ slug: string }> };

// Pre-build one page per vendor in /data/vendors.ts; any other slug is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return getRankedVendors().map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const vendor = getVendorBySlug((await params).slug);
  if (!vendor) return {};
  return {
    title: `${vendor.name} — #${vendor.rank} ${CATEGORY_NAME} vendor`,
    description: vendor.shortDescription,
  };
}

export default async function VendorPage({ params }: Props) {
  const { slug } = await params;
  const vendor = getVendorBySlug(slug);
  if (!vendor) notFound();

  const ranked = getRankedVendors();
  const index = ranked.findIndex((v) => v.slug === vendor.slug);
  const prev = ranked[index - 1];
  const next = ranked[index + 1];

  return (
    <>
      {/* Header */}
      <section className="border-b border-ink-200 bg-gradient-to-b from-brand-50 to-white">
        <Container className="py-8 sm:py-12">
          <nav aria-label="Breadcrumb" className="text-sm text-ink-500">
            <ol className="flex items-center gap-2">
              <li>
                <Link href="/rankings" className="hover:text-brand-700">
                  Rankings
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="truncate font-medium text-ink-800">{vendor.name}</li>
            </ol>
          </nav>

          <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-center md:justify-between">
            <div className="flex items-center gap-5">
              <VendorLogo name={vendor.name} logo={vendor.logo} size="lg" />
              <div className="min-w-0">
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-brand-700">
                  <RankBadge rank={vendor.rank} size="md" />
                  Ranked #{vendor.rank} of {ranked.length} {CATEGORY_NAME} vendors
                </p>
                <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-balance text-ink-900 sm:text-4xl">
                  {vendor.name}
                </h1>
              </div>
            </div>
            <div className="rounded-3xl border border-ink-200 bg-white p-6 shadow-sm md:min-w-72">
              <RatingSummary rating={vendor.rating} reviewCount={vendor.reviewCount} size="lg" />
            </div>
          </div>
        </Container>
      </section>

      {/* Body */}
      <Container className="grid gap-8 py-12 sm:py-16 lg:grid-cols-[1fr_24rem] lg:gap-12">
        <div className="space-y-10">
          <section>
            <h2 className="text-xl font-bold text-ink-900">About {vendor.name}</h2>
            <div className="mt-4 space-y-4 text-lg leading-relaxed text-ink-600">
              {vendor.description.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </section>

          {vendor.highlights && vendor.highlights.length > 0 && (
            <section>
              <h2 className="text-xl font-bold text-ink-900">Highlights</h2>
              <ul className="mt-4 grid gap-3 sm:grid-cols-2">
                {vendor.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-3 rounded-2xl border border-ink-200 bg-ink-50/50 p-4 text-ink-700"
                  >
                    <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="mt-0.5 size-5 shrink-0 text-brand-500">
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm3.86-9.78a.75.75 0 0 0-1.22-.88l-3.24 4.5-1.6-1.6a.75.75 0 1 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.09l3.73-5.24Z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {h}
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* TODO: add more profile sections here (e.g. pros & cons, pricing table, FAQs). */}
        </div>

        <aside className="space-y-6">
          <div className="rounded-3xl border border-ink-200 bg-white p-6 shadow-sm">
            <RatingDistribution distribution={vendor.ratingDistribution} reviewCount={vendor.reviewCount} />
          </div>
          {vendor.website && (
            <ButtonLink href={vendor.website} external size="lg" className="w-full">
              Visit {vendor.name} <ArrowRightIcon />
            </ButtonLink>
          )}
          <ButtonLink href="/rankings" variant="secondary" className="w-full">
            Back to all rankings
          </ButtonLink>
        </aside>
      </Container>

      {/* Previous / next in the ranking */}
      {(prev || next) && (
        <Container className="pb-16">
          <nav aria-label="More vendors" className="grid gap-4 border-t border-ink-200 pt-8 sm:grid-cols-2">
            {prev ? (
              <Link
                href={`/vendors/${prev.slug}`}
                className="group rounded-2xl border border-ink-200 p-5 transition-colors hover:border-brand-300 hover:bg-brand-50/50"
              >
                <span className="text-xs font-medium tracking-wide text-ink-500 uppercase">← Ranked #{prev.rank}</span>
                <span className="mt-1 block font-semibold text-ink-900 group-hover:text-brand-700">{prev.name}</span>
              </Link>
            ) : (
              <span className="hidden sm:block" />
            )}
            {next && (
              <Link
                href={`/vendors/${next.slug}`}
                className="group rounded-2xl border border-ink-200 p-5 text-right transition-colors hover:border-brand-300 hover:bg-brand-50/50"
              >
                <span className="text-xs font-medium tracking-wide text-ink-500 uppercase">Ranked #{next.rank} →</span>
                <span className="mt-1 block font-semibold text-ink-900 group-hover:text-brand-700">{next.name}</span>
              </Link>
            )}
          </nav>
        </Container>
      )}
    </>
  );
}
