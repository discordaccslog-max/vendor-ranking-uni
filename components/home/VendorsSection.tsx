"use client";

import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { CATEGORY_ICONS } from "@/components/ui/icons";
import { LeadingVendorCard } from "@/components/vendors/LeadingVendorCard";
import { VendorRow } from "@/components/vendors/VendorRow";
import { categories } from "@/data/categories";
import { vendors } from "@/data/vendors";

/** Category tabs + the vendors in the selected category. */
export function VendorsSection() {
  const [active, setActive] = useState(categories[0]?.slug ?? "");
  const shown = vendors.filter((v) => v.category === active);
  const activeCategory = categories.find((c) => c.slug === active);

  return (
    <section id="vendors" className="relative py-28 sm:py-36">
      <Container>
        <SectionHeader
          title="Choose a category."
          description="Every vendor below is listed free of charge, with their Trustpilot rating and the number of bad-feedback reports we've received about them in the past six months."
        />

        {/* Category tabs */}
        <Reveal delay={200}>
          <div role="tablist" aria-label="Vendor categories" className="mt-14 grid gap-3 md:grid-cols-3">
            {categories.map((category) => {
              const Icon = CATEGORY_ICONS[category.icon] ?? CATEGORY_ICONS.generic;
              const selected = category.slug === active;
              const count = vendors.filter((v) => v.category === category.slug).length;
              return (
                <button
                  key={category.slug}
                  type="button"
                  role="tab"
                  id={`tab-${category.slug}`}
                  aria-selected={selected}
                  aria-controls="vendor-panel"
                  onClick={() => setActive(category.slug)}
                  className={`group relative overflow-hidden rounded-[22px] border p-5 text-left transition-all duration-500 ease-luxe sm:p-6 ${
                    selected
                      ? "border-violet-300/50 bg-white/[0.08] shadow-[0_20px_60px_-30px_rgb(167_139_250/0.8)]"
                      : "border-white/10 bg-white/[0.025] hover:border-white/25 hover:bg-white/[0.05]"
                  }`}
                >
                  {selected && (
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-fuchsia-300 to-transparent"
                    />
                  )}
                  <span className="flex items-center gap-4">
                    <span
                      className={`grid size-12 shrink-0 place-items-center rounded-2xl transition-all duration-500 ${
                        selected
                          ? "bg-[linear-gradient(135deg,#a78bfa,#f0abfc,#67e8f9)] text-night-950"
                          : "bg-white/[0.06] text-mist-300 group-hover:text-mist-100"
                      }`}
                    >
                      <Icon className="size-6" />
                    </span>
                    <span className="min-w-0">
                      <span className="block font-display text-2xl leading-tight text-mist-100">{category.name}</span>
                      <span className="mt-0.5 block text-xs tracking-[0.16em] text-mist-500 uppercase">
                        {count} vendor{count === 1 ? "" : "s"}
                      </span>
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Vendors in the selected category */}
        <div id="vendor-panel" role="tabpanel" aria-labelledby={`tab-${active}`} className="mt-10">
          {activeCategory && <p className="text-mist-400">{activeCategory.description}</p>}
          <ol key={active} className="mt-6 space-y-4">
            {shown.map((vendor, i) => (
              <li key={vendor.slug} className="animate-pop-in" style={{ animationDelay: `${i * 90}ms` }}>
                {vendor.leading ? (
                  <LeadingVendorCard vendor={vendor} />
                ) : (
                  <VendorRow vendor={vendor} rank={i + 1} />
                )}
              </li>
            ))}
          </ol>
          {shown.length === 0 && <p className="mt-6 text-mist-400">No vendors listed in this category yet.</p>}
        </div>
      </Container>
    </section>
  );
}
