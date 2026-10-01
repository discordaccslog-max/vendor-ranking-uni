"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { CloseIcon, MenuIcon } from "@/components/ui/icons";
import { LINKS, NAV_LINKS } from "@/config/site";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const solid = scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-700 ease-luxe ${
        solid ? "border-b border-white/[0.07] bg-night-950/70 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-18 w-full max-w-7xl items-center justify-between px-5 sm:px-8 lg:px-10">
        <nav aria-label="Main" className="hidden items-center gap-1 lg:flex">
          <Link href="/" className="rounded-full px-4 py-2 text-sm text-mist-400 transition-colors hover:text-white">
            Home
          </Link>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-full px-4 py-2 text-sm text-mist-400 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          className="-ml-2 grid size-11 place-items-center rounded-full text-mist-100 transition-colors hover:bg-white/10 lg:hidden"
        >
          {open ? <CloseIcon className="size-5" /> : <MenuIcon className="size-5" />}
        </button>

        <span className="hidden sm:block">
          <Button href={LINKS.viewVendors} variant="light">
            View Vendors
          </Button>
        </span>
      </div>

      {/* Mobile menu */}
      <div
        id="mobile-menu"
        inert={!open}
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-luxe lg:hidden ${
          open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <div className="overflow-hidden">
          <nav aria-label="Mobile" className="flex flex-col gap-1 px-5 pt-2 pb-6 sm:px-8">
            {[{ label: "Home", href: "/" }, ...NAV_LINKS].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="border-b border-white/[0.07] py-4 font-display text-2xl text-mist-100"
              >
                {link.label}
              </Link>
            ))}
            <span className="mt-6 flex sm:hidden">
              <Button href={LINKS.viewVendors} variant="aurora" size="lg" arrow className="w-full">
                View Vendors
              </Button>
            </span>
          </nav>
        </div>
      </div>
    </header>
  );
}
