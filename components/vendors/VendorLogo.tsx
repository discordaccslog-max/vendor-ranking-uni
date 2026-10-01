import Image from "next/image";

function initials(name: string): string {
  return name
    .replace(/[^A-Za-z0-9 ]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]!.toUpperCase())
    .join("");
}

/** Vendor logo, or the vendor's initials when no logo is set. */
export function VendorLogo({ name, logo }: { name: string; logo?: string }) {
  if (logo) {
    // `unoptimized` lets you use any local path or remote URL without extra config.
    return (
      <Image
        src={logo}
        alt=""
        width={48}
        height={48}
        unoptimized
        className="size-10 shrink-0 rounded-md object-contain sm:size-12"
      />
    );
  }
  return (
    <span
      aria-hidden="true"
      className="grid size-10 shrink-0 place-items-center rounded-md border border-line bg-neutral-50 text-sm font-semibold text-muted sm:size-12"
    >
      {initials(name)}
    </span>
  );
}
