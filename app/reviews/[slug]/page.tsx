import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ReviewCard } from "@/components/reviews/ReviewCard";
import { TrustpilotRating } from "@/components/reviews/TrustpilotRating";
import { Container } from "@/components/ui/Container";
import { ArrowRightIcon } from "@/components/ui/icons";
import { VendorActions } from "@/components/vendors/VendorActions";
import { ReportStat, VendorMonogram, VerifiedBadge } from "@/components/vendors/parts";
import { categories } from "@/data/categories";
import { vendors } from "@/data/vendors";
import { formatCount } from "@/lib/format";
import { getRecentReviews } from "@/lib/reviews";

type Props = { params: Promise<{ slug: string }> };

// One page per vendor in data/vendors.ts; any other address is a 404.
export const dynamicParams = false;

export function generateStaticParams() {
  return vendors.map((v) => ({ slug: v.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const vendor = vendors.find((v) => v.slug === slug);
  return vendor ? { title: `${vendor.name} Reviews`, description: vendor.description } : {};
}

export default async function VendorReviewsPage({ params }: Props) {
  const { slug } = await params;
  const vendor = vendors.find((v) => v.slug === slug);
  if (!vendor) notFound();

  const category = categories.find((c) => c.slug === vendor.category);
  const recent = getRecentReviews(vendor.slug);

  return (
    <section className="relative pt-36 pb-28 sm:pt-44">
      <Container>
        <nav aria-label="Breadcrumb" className="animate-rise text-sm text-mist-500">
          <Link href="/" className="transition-colors hover:text-mist-100">
            Home
          </Link>
          <span className="mx-2">/</span>
          <Link href="/#vendors" className="transition-colors hover:text-mist-100">
            {category?.name ?? "Vendors"}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-mist-300">{vendor.name}</span>
        </nav>

        {/* Vendor summary */}
        <div
          className="animate-rise mt-8 grid gap-6 rounded-[28px] border border-white/10 bg-night-900/60 p-6 backdrop-blur-xl sm:p-8 lg:grid-cols-[minmax(0,1fr)_auto_auto_12.5rem] lg:items-center lg:gap-10"
          style={{ animationDelay: "100ms" }}
        >
          <div className="flex min-w-0 items-center gap-4">
            <VendorMonogram name={vendor.name} />
            <div className="min-w-0">
              <h1 className="flex flex-wrap items-center gap-x-3 gap-y-1 font-display text-4xl leading-tight text-white sm:text-5xl">
                {vendor.name} <VerifiedBadge />
              </h1>
              <p className="mt-1 text-sm text-mist-400">{vendor.description}</p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 rounded-2xl border border-white/10 bg-night-950/40 p-4 lg:contents">
            <div className="lg:border-l lg:border-white/10 lg:pl-8">
              <TrustpilotRating rating={vendor.trustpilotRating} reviews={vendor.trustpilotReviews} url={vendor.trustpilotUrl} />
            </div>
            <div className="border-l border-white/10 pl-3 lg:pl-8">
              <ReportStat count={vendor.recentReports} />
            </div>
          </div>
          <VendorActions name={vendor.name} website={vendor.website} />
        </div>

        {/* Reviews */}
        <div className="mt-16">
          <h2 className="animate-rise font-display text-3xl text-white sm:text-4xl" style={{ animationDelay: "200ms" }}>
            {recent.length > 0
              ? `Displaying the most recent ${recent.length} reviews out of ${formatCount(vendor.trustpilotReviews)}`
              : "Most recent reviews"}
          </h2>

          {recent.length > 0 ? (
            <ol className="mt-8 grid gap-4 md:grid-cols-2">
              {recent.map((review, i) => (
                <li key={`${review.date}-${review.author}-${i}`} className="animate-pop-in" style={{ animationDelay: `${250 + i * 50}ms` }}>
                  <ReviewCard review={review} />
                </li>
              ))}
            </ol>
          ) : (
            <p className="mt-8 rounded-[22px] border border-dashed border-white/15 p-8 text-center text-mist-400">
              No reviews have been added for {vendor.name} yet.
            </p>
          )}

          <Link
            href="/#vendors"
            className="mt-12 inline-flex items-center gap-2 text-sm text-mist-300 transition-colors hover:text-white"
          >
            <ArrowRightIcon className="size-4 rotate-180" /> Back to vendors
          </Link>
        </div>
      </Container>
    </section>
  );
}
