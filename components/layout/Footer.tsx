import { Container } from "@/components/ui/Container";
import { CONTACT_EMAIL, LINKS, NAV_LINKS } from "@/config/site";
import { categories } from "@/data/categories";

export function Footer() {
  const columns = [
    { title: "Platform", links: NAV_LINKS.map((l) => ({ label: l.label, href: l.href })) },
    { title: "Categories", links: categories.map((c) => ({ label: c.name, href: LINKS.viewVendors })) },
    {
      title: "Contact",
      links: [
        { label: "Submit your business", href: LINKS.submitVendor },
        { label: CONTACT_EMAIL, href: `mailto:${CONTACT_EMAIL}` },
      ],
    },
  ];

  return (
    <footer className="relative border-t border-white/[0.07] bg-night-950/60 text-mist-500 backdrop-blur-xl">
      <Container className="grid gap-14 py-16 lg:grid-cols-[1.3fr_2fr]">
        <p className="max-w-sm font-display text-3xl leading-tight text-mist-100">
          Verified vendors &amp; suppliers. <em className="text-aurora italic">Free of charge.</em>
        </p>
        <div className="grid gap-10 sm:grid-cols-3">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="text-xs font-medium tracking-[0.2em] text-violet-300 uppercase">{col.title}</p>
              <ul className="mt-5 space-y-3 text-sm">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a href={link.href} className="transition-colors duration-300 hover:text-mist-100">
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
          <p>© {new Date().getFullYear()} All rights reserved.</p>
          <p>Free to browse. No subscriptions, no paywalls.</p>
        </Container>
      </div>
    </footer>
  );
}
