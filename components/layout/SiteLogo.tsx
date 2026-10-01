import Link from "next/link";
import { SITE_NAME } from "@/config/site";

/** Brand mark + name. TODO: swap the star mark for your own logo if you have one. */
export function SiteLogo({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link href="/" className="group inline-flex items-center gap-2" aria-label={`${SITE_NAME} home`}>
      <span className="grid size-8 place-items-center rounded-lg bg-brand-500 shadow-sm shadow-brand-500/30 transition-transform group-hover:-rotate-6">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="size-5 fill-white">
          <path d="M12 2.5l2.9 6.26 6.85.74-5.1 4.63 1.42 6.75L12 17.5l-6.07 3.38 1.42-6.75L2.25 9.5l6.85-.74L12 2.5z" />
        </svg>
      </span>
      <span className={`text-lg font-bold tracking-tight ${inverse ? "text-white" : "text-ink-900"}`}>
        {SITE_NAME}
      </span>
    </Link>
  );
}
