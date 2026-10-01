import { HERO_HEADLINE, SITE_NAME } from "@/config/site";
import { StarRating } from "@/components/StarRating";

export function Hero({ lastUpdated }: { lastUpdated: string }) {
  return (
    <section className="bg-forest text-white">
      {/* Top bar */}
      <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="flex items-center gap-2 text-lg font-bold tracking-tight">
          <span className="grid size-7 place-items-center rounded bg-brand">
            <svg viewBox="0 0 24 24" aria-hidden="true" className="size-4 fill-white">
              <path d="M12 2.5l2.9 6.26 6.85.74-5.1 4.63 1.42 6.75L12 17.5l-6.07 3.38 1.42-6.75L2.25 9.5l6.85-.74L12 2.5z" />
            </svg>
          </span>
          {SITE_NAME}
        </a>
        <a href="#rankings" className="text-sm font-medium text-white/80 hover:text-white">
          Rankings
        </a>
      </div>

      {/* Headline */}
      <div id="top" className="mx-auto max-w-5xl px-4 pt-16 pb-20 sm:px-6 sm:pt-24 sm:pb-28">
        <StarRating rating={5} size="lg" />
        <h1 className="mt-8 max-w-3xl text-4xl leading-[1.08] font-bold tracking-tight sm:text-6xl">
          {HERO_HEADLINE}
        </h1>
        <p className="mt-6 flex items-center gap-2 text-lg text-white/75">
          <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="size-5 text-brand">
            <path
              fillRule="evenodd"
              d="M5.75 2a.75.75 0 0 1 .75.75V4h7V2.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V2.75A.75.75 0 0 1 5.75 2Zm-1 5.5c-.69 0-1.25.56-1.25 1.25v6.5c0 .69.56 1.25 1.25 1.25h10.5c.69 0 1.25-.56 1.25-1.25v-6.5c0-.69-.56-1.25-1.25-1.25H4.75Z"
              clipRule="evenodd"
            />
          </svg>
          Last updated <span className="font-semibold text-white">{lastUpdated}</span>
        </p>
        <a
          href="#rankings"
          className="mt-10 inline-flex h-12 items-center gap-2 rounded-lg bg-brand px-6 font-semibold text-white transition-colors hover:bg-brand-hover"
        >
          See the rankings
          <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="size-5">
            <path
              fillRule="evenodd"
              d="M10 3a.75.75 0 0 1 .75.75v10.64l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3.75A.75.75 0 0 1 10 3Z"
              clipRule="evenodd"
            />
          </svg>
        </a>
      </div>
    </section>
  );
}
