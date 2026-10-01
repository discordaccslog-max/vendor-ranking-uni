import Link from "next/link";
import { SITE_NAME } from "@/config/site";

/** Brand mark: the star in a rounded square, plus the site name. */
export function Logo({ inverse = true }: { inverse?: boolean }) {
  return (
    <Link href="/" className="group inline-flex items-center gap-2.5" aria-label={`${SITE_NAME} home`}>
      <span className="grid size-8 place-items-center rounded-lg bg-gradient-to-b from-jade-400 to-jade-600 shadow-[inset_0_1px_0_rgb(255_255_255/0.25)] transition-transform duration-500 ease-luxe group-hover:-rotate-6">
        <svg viewBox="0 0 24 24" aria-hidden="true" className="size-[18px] fill-white">
          <path d="M12 2.5l2.9 6.26 6.85.74-5.1 4.63 1.42 6.75L12 17.5l-6.07 3.38 1.42-6.75L2.25 9.5l6.85-.74L12 2.5z" />
        </svg>
      </span>
      <span className={`text-[17px] font-semibold tracking-[-0.02em] ${inverse ? "text-bone" : "text-ink-950"}`}>
        {SITE_NAME}
      </span>
    </Link>
  );
}
