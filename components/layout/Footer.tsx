import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { SiteLogo } from "@/components/layout/SiteLogo";
import { CATEGORY_NAME, SITE_NAME } from "@/config/site";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-ink-200 bg-ink-50">
      <Container className="flex flex-col gap-8 py-12 md:flex-row md:items-start md:justify-between">
        <div className="max-w-sm space-y-3">
          <SiteLogo />
          <p className="text-sm leading-relaxed text-ink-500">
            Independent rankings of {CATEGORY_NAME} vendors, kept up to date so you can buy with confidence.
          </p>
        </div>
        <nav className="flex gap-12 text-sm">
          <div className="space-y-3">
            <p className="font-semibold text-ink-900">Explore</p>
            <ul className="space-y-2 text-ink-500">
              <li>
                <Link href="/" className="hover:text-brand-700">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/rankings" className="hover:text-brand-700">
                  Rankings
                </Link>
              </li>
              {/* TODO: add links to future pages (Methodology, About, Contact) */}
            </ul>
          </div>
        </nav>
      </Container>
      <div className="border-t border-ink-200">
        <Container className="flex flex-col gap-2 py-6 text-xs text-ink-400 sm:flex-row sm:justify-between">
          <p>
            © {year} {SITE_NAME}. All rights reserved.
          </p>
          {/* TODO: replace with your own disclosure / affiliate statement if needed. */}
          <p>Rankings and ratings are editorial and updated periodically.</p>
        </Container>
      </div>
    </footer>
  );
}
