"use client";

import Link from "next/link";
import type { Category } from "@/lib/types";
import { ArrowUpRightIcon, CATEGORY_ICONS } from "@/components/ui/icons";

/**
 * Premium category card. A soft light follows the cursor; the card lifts on hover.
 * Links to /categories/<slug> once `live` is true, otherwise shows "Coming soon".
 */
export function CategoryCard({ category, index }: { category: Category; index: number }) {
  const Icon = CATEGORY_ICONS[category.icon] ?? CATEGORY_ICONS.generic;
  const number = String(index + 1).padStart(2, "0");

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
  };

  const body = (
    <>
      {/* Cursor spotlight */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--x, 50%) var(--y, 0%), rgb(236 220 182 / 0.45), transparent 60%)",
        }}
      />

      <div className="relative flex items-start justify-between">
        <span className="font-display text-3xl text-gold-500">{number}</span>
        <span className="grid size-14 place-items-center rounded-2xl border border-sand-200 bg-bone text-ink-900 transition-all duration-700 ease-luxe group-hover:border-ink-950 group-hover:bg-ink-950 group-hover:text-gold-300">
          <Icon className="size-6" />
        </span>
      </div>

      <div className="relative mt-20 mb-8">
        <h3 className="font-display text-[2rem] leading-[1.05] tracking-[-0.01em] text-ink-950">{category.name}</h3>
        <p className="mt-4 leading-relaxed text-stone-600">{category.description}</p>
        <ul className="mt-6 flex flex-wrap gap-2">
          {category.examples.map((ex) => (
            <li key={ex} className="rounded-full border border-sand-200 bg-bone/70 px-3 py-1 text-xs text-stone-600">
              {ex}
            </li>
          ))}
        </ul>
      </div>

      <div className="relative mt-auto flex items-center justify-between border-t border-sand-200 pt-6">
        <span className="text-xs font-medium tracking-[0.18em] text-stone-500 uppercase">
          {category.live ? "Explore category" : "Rankings coming soon"}
        </span>
        <span className="grid size-10 place-items-center rounded-full border border-sand-200 text-ink-900 transition-all duration-700 ease-luxe group-hover:rotate-45 group-hover:border-ink-950 group-hover:bg-ink-950 group-hover:text-bone">
          <ArrowUpRightIcon className="size-4" />
        </span>
      </div>
    </>
  );

  const className =
    "group relative flex h-full flex-col overflow-hidden rounded-[28px] border border-sand-200 bg-white/70 p-8 shadow-[0_1px_0_rgb(255_255_255),0_1px_2px_rgb(10_10_11/0.04)] transition-all duration-700 ease-luxe hover:-translate-y-1.5 hover:border-gold-300/70 hover:shadow-[0_40px_80px_-40px_rgb(10_10_11/0.35)] sm:p-9";

  if (category.live) {
    return (
      <Link href={`/categories/${category.slug}`} onMouseMove={onMouseMove} className={className}>
        {body}
      </Link>
    );
  }
  return (
    <article onMouseMove={onMouseMove} className={className}>
      {body}
    </article>
  );
}
