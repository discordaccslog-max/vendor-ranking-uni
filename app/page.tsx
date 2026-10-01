import { VendorRow } from "@/components/vendors/VendorRow";
import { CATEGORY_NAME, INTRO, SITE_NAME } from "@/config/site";
import { LAST_UPDATED } from "@/data/vendors";
import { getRankedVendors } from "@/lib/vendors";

export default function HomePage() {
  const vendors = getRankedVendors();

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6">
      <header className="border-b border-line py-5">
        <span className="font-semibold">{SITE_NAME}</span>
      </header>

      <main className="py-12 sm:py-16">
        <h1 className="font-serif text-3xl leading-tight sm:text-4xl">{CATEGORY_NAME} vendor rankings</h1>
        <p className="mt-3 max-w-xl leading-relaxed text-muted">{INTRO}</p>
        <p className="mt-5 text-sm text-muted">
          Last updated <span className="text-ink">{LAST_UPDATED}</span>
        </p>

        <ol className="mt-10 border-t-2 border-ink">
          {vendors.map((vendor) => (
            <VendorRow key={`${vendor.rank}-${vendor.name}`} vendor={vendor} />
          ))}
        </ol>
      </main>

      <footer className="border-t border-line py-6 text-sm text-muted">
        © {new Date().getFullYear()} {SITE_NAME}
      </footer>
    </div>
  );
}
