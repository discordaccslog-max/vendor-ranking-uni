"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { VendorRow } from "@/components/vendors/VendorRow";
import { categories } from "@/data/categories";
import { vendors } from "@/data/vendors";

/** Category tabs (text + sliding underline) and the vendors in the selected category. */
export function VendorsSection() {
  const [active, setActive] = useState(categories[0]?.slug ?? "");
  const shown = vendors.filter((v) => v.category === active);
  const activeCategory = categories.find((c) => c.slug === active);

  // Position the underline under the selected tab.
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const [indicator, setIndicator] = useState({ left: 0, width: 0 });
  useLayoutEffect(() => {
    const update = () => {
      const el = tabRefs.current[active];
      if (el) setIndicator({ left: el.offsetLeft, width: el.offsetWidth });
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, [active]);

  return (
    <section id="vendors" className="relative py-28 sm:py-36">
      <Container>
        <SectionHeader
          title="Choose a category."
          description="Every vendor below is listed free of charge, with their Trustpilot rating and the number of bad-feedback reports we've received about them in the past six months."
        />

        {/* Category tabs */}
        <Reveal delay={200}>
          <div
            role="tablist"
            aria-label="Vendor categories"
            className="relative mt-14 flex gap-8 overflow-x-auto border-b border-white/10 [scrollbar-width:none] sm:gap-12 [&::-webkit-scrollbar]:hidden"
          >
            {categories.map((category) => {
              const selected = category.slug === active;
              const count = vendors.filter((v) => v.category === category.slug).length;
              return (
                <button
                  key={category.slug}
                  ref={(el) => {
                    tabRefs.current[category.slug] = el;
                  }}
                  type="button"
                  role="tab"
                  id={`tab-${category.slug}`}
                  aria-selected={selected}
                  aria-controls="vendor-panel"
                  onClick={() => setActive(category.slug)}
                  className="group relative shrink-0 pb-5 text-left"
                >
                  <span className="flex items-start gap-2">
                    <span
                      className={`font-display text-3xl whitespace-nowrap transition-colors duration-300 sm:text-4xl ${
                        selected ? "text-white" : "text-mist-500 group-hover:text-mist-300"
                      }`}
                    >
                      {category.name}
                    </span>
                    <span
                      className={`mt-1 text-xs tabular-nums transition-colors duration-300 ${
                        selected ? "text-fuchsia-200" : "text-mist-500"
                      }`}
                    >
                      {String(count).padStart(2, "0")}
                    </span>
                  </span>
                </button>
              );
            })}
            {/* Sliding underline */}
            <span
              aria-hidden="true"
              className="absolute bottom-0 h-0.5 rounded-full bg-[linear-gradient(90deg,#a78bfa,#f0abfc,#67e8f9)] transition-all duration-500 ease-luxe"
              style={{ left: indicator.left, width: indicator.width }}
            />
          </div>
        </Reveal>

        {/* Vendors in the selected category */}
        <div id="vendor-panel" role="tabpanel" aria-labelledby={`tab-${active}`} className="mt-8">
          {activeCategory && <p className="text-mist-400">{activeCategory.description}</p>}
          <ol key={active} className="mt-6 space-y-4">
            {shown.map((vendor, i) => (
              <li key={vendor.slug} className="animate-pop-in" style={{ animationDelay: `${i * 90}ms` }}>
                <VendorRow vendor={vendor} rank={i + 1} />
              </li>
            ))}
          </ol>
          {shown.length === 0 && <p className="mt-6 text-mist-400">No vendors listed in this category yet.</p>}
        </div>
      </Container>
    </section>
  );
}
