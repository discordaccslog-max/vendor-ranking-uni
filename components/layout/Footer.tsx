import { Logo } from "@/components/layout/Logo";
import { Container } from "@/components/ui/Container";
import { CONTACT_EMAIL, LINKS, NAV_LINKS, SITE_NAME } from "@/config/site";
import { categories } from "@/data/categories";

export function Footer() {
  const columns = [
    { title: "Platform", links: NAV_LINKS.map((l) => ({ label: l.label, href: l.href })) },
    // TODO: point these at /categories/<slug> once category pages exist.
    { title: "Categories", links: categories.map((c) => ({ label: c.name, href: "#categories" })) },
    {
      title: "Vendors",
      links: [
        { label: "Submit your business", href: LINKS.submitVendor },
        { label: "Report a vendor", href: LINKS.reportVendor },
        { label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
      ],
    },
  ];

  return (
    <footer className="relative bg-ink-950 text-white/55">
      <Container className="grid gap-14 py-20 lg:grid-cols-[1.3fr_2fr]">
        <div className="max-w-sm">
          <Logo />
          <p className="mt-6 leading-relaxed">
            The vendor &amp; supplier source for every category. Reviewed, verified, and free to discover.
          </p>
        </div>
        <div className="grid gap-10 sm:grid-cols-3">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-medium tracking-[0.2em] text-gold-300 uppercase">{col.title}</p>
              <ul className="mt-5 space-y-3 text-sm">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="transition-colors duration-300 hover:text-bone">
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Container>
      <div className="border-t border-white/[0.07]">
        <Container className="flex flex-col gap-2 py-7 text-xs sm:flex-row sm:justify-between">
          <p>
            © {new Date().getFullYear()} {SITE_NAME}. All rights reserved.
          </p>
          <p>Free to browse. No subscriptions, no paywalls.</p>
        </Container>
      </div>
    </footer>
  );
}
