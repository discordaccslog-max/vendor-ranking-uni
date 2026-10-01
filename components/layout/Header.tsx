import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { SiteLogo } from "@/components/layout/SiteLogo";

// TODO: add more navigation links here as you add pages (e.g. About, Methodology).
const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/rankings", label: "Rankings" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-ink-200/70 bg-white/80 backdrop-blur-md">
      <Container className="flex h-16 items-center justify-between gap-4">
        <SiteLogo />
        <nav className="flex items-center gap-1 sm:gap-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="hidden rounded-full px-3 py-2 text-sm font-medium text-ink-600 transition-colors hover:bg-ink-100 hover:text-ink-900 sm:inline-flex"
            >
              {link.label}
            </Link>
          ))}
          <ButtonLink href="/rankings" size="md" className="ml-1">
            See rankings
          </ButtonLink>
        </nav>
      </Container>
    </header>
  );
}
