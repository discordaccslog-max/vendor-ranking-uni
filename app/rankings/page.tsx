import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { VendorCard } from "@/components/vendors/VendorCard";
import { CATEGORY_NAME, SITE_COPY } from "@/config/site";
import { getRankedVendors } from "@/lib/vendors";

export const metadata: Metadata = {
  title: SITE_COPY.rankingsTitle,
  description: SITE_COPY.rankingsIntro,
};

export default function RankingsPage() {
  const vendors = getRankedVendors();

  return (
    <>
      <section className="border-b border-ink-200 bg-gradient-to-b from-brand-50 to-white">
        <Container className="py-14 sm:py-20">
          <p className="text-sm font-semibold tracking-wide text-brand-600 uppercase">{CATEGORY_NAME} rankings</p>
          <h1 className="mt-3 text-3xl font-extrabold tracking-tight text-balance text-ink-900 sm:text-5xl">
            {SITE_COPY.rankingsTitle}
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-relaxed text-ink-600">{SITE_COPY.rankingsIntro}</p>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-white px-3 py-1 text-sm text-ink-500 ring-1 ring-ink-200">
            <span className="size-1.5 rounded-full bg-brand-500" />
            Last updated {SITE_COPY.lastUpdated}
          </p>
        </Container>
      </section>

      <Container className="py-12 sm:py-16">
        {/* TODO: add filters / sorting controls here if you add more vendors later. */}
        <ol className="space-y-6">
          {vendors.map((vendor) => (
            <li key={vendor.slug}>
              <VendorCard vendor={vendor} />
            </li>
          ))}
        </ol>

        {/* TODO: replace with a link to your full methodology page once you write one. */}
        <p className="mx-auto mt-12 max-w-2xl text-center text-sm leading-relaxed text-ink-500">
          Rankings reflect our overall assessment of each vendor&apos;s quality, reliability, value and customer
          satisfaction. Ratings and review counts are updated periodically.
        </p>
      </Container>
    </>
  );
}
