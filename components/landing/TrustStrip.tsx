import { Container } from "@/components/ui/Container";
import { SITE_COPY } from "@/config/site";
import { formatCount, getRankedVendors, getTotalReviewCount } from "@/lib/vendors";

export function TrustStrip() {
  // TODO: replace or extend these stats with your own (e.g. "Since 2019").
  const stats = [
    { value: String(getRankedVendors().length), label: "Vendors ranked" },
    { value: formatCount(getTotalReviewCount()), label: "Reviews analysed" },
    { value: SITE_COPY.lastUpdated, label: "Last updated" },
    { value: "100%", label: "Independent" },
  ];

  return (
    <section aria-label="Key facts" className="border-y border-ink-200 bg-white">
      <Container>
        <dl className="grid grid-cols-2 divide-ink-200 py-8 md:grid-cols-4 md:divide-x">
          {stats.map((s) => (
            <div key={s.label} className="px-4 py-4 text-center">
              <dt className="text-xs font-medium tracking-wide text-ink-500 uppercase">{s.label}</dt>
              <dd className="mt-1 text-xl font-bold tracking-tight text-ink-900 sm:text-3xl">{s.value}</dd>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}
