import Image from "next/image";

type Size = "sm" | "md" | "lg";

const sizes: Record<Size, { box: string; px: number; text: string }> = {
  sm: { box: "size-10 rounded-lg", px: 40, text: "text-sm" },
  md: { box: "size-16 rounded-xl", px: 64, text: "text-lg" },
  lg: { box: "size-20 sm:size-24 rounded-2xl", px: 96, text: "text-2xl" },
};

// Background colours for the initials fallback, picked by name so each
// vendor without a logo keeps a stable colour.
const FALLBACK_COLORS = ["bg-brand-600", "bg-sky-600", "bg-violet-600", "bg-amber-600", "bg-rose-600"];

function initials(name: string): string {
  return name
    .replace(/[^A-Za-z0-9 ]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");
}

/** Vendor logo, or a coloured initials badge when no logo is set. */
export function VendorLogo({ name, logo, size = "md" }: { name: string; logo?: string; size?: Size }) {
  const s = sizes[size];

  if (logo) {
    return (
      <span className={`relative block shrink-0 overflow-hidden bg-white ring-1 ring-ink-200 ${s.box}`}>
        {/* `unoptimized` lets you use any local path or remote URL without extra config. */}
        <Image src={logo} alt={`${name} logo`} fill sizes={`${s.px}px`} unoptimized className="object-contain" />
      </span>
    );
  }

  const color = FALLBACK_COLORS[name.length % FALLBACK_COLORS.length];
  return (
    <span
      aria-hidden="true"
      className={`grid shrink-0 place-items-center font-bold text-white ${color} ${s.box} ${s.text}`}
    >
      {initials(name)}
    </span>
  );
}
