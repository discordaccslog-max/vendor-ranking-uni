import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CheckIcon } from "@/components/ui/icons";
import { HERO_STATS, LINKS } from "@/config/site";
import { categories } from "@/data/categories";

const TRUST_POINTS = ["Free to browse", "Reviewed vendors", "Multiple industries"];

/** Staggered entrance on page load (pair with the `animate-rise` class). */
const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

export function Hero() {
  return (
    <section className="grain relative isolate overflow-hidden bg-ink-950 text-bone">
      <HeroBackground />

      <Container className="relative flex min-h-[100svh] flex-col pt-32 pb-10 sm:pt-36">
        <div className="mx-auto flex max-w-5xl flex-1 flex-col items-center text-center">
          <p style={delay(100)} className="animate-rise flex items-center gap-3 text-[11px] font-medium tracking-[0.22em] whitespace-nowrap text-gold-300 uppercase sm:text-xs sm:tracking-[0.28em]">
            <span className="hidden h-px w-8 bg-gradient-to-r from-transparent to-gold-300/70 sm:block" />
            The vendor &amp; supplier source
            <span className="hidden h-px w-8 bg-gradient-to-l from-transparent to-gold-300/70 sm:block" />
          </p>

          <h1
            style={delay(250)}
            className="animate-rise mt-8 font-display text-[3.25rem] leading-[0.95] tracking-[-0.03em] text-balance sm:text-7xl lg:text-[6.75rem]"
          >
            Find Trusted Vendors &amp; Suppliers —{" "}
            <em className="text-champagne animate-shimmer pr-2 italic">Free.</em>
          </h1>

          <p style={delay(450)} className="animate-rise mt-7 max-w-2xl text-lg leading-relaxed text-pretty text-white/60 sm:text-xl">
            Discover reviewed and verified vendors across a growing range of categories. Compare your options,
            discover new suppliers, and find the right businesses for your needs — without paying for access.
          </p>

          <div style={delay(600)} className="animate-rise mt-10 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
            <Button href={LINKS.exploreCategories} variant="gold" size="lg" arrow className="w-full sm:w-auto">
              Explore Categories
            </Button>
            <Button href={LINKS.submitVendor} variant="outline-light" size="lg" className="w-full sm:w-auto">
              Submit a Vendor
            </Button>
          </div>

          <ul style={delay(750)} className="animate-rise mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-white/50">
            {TRUST_POINTS.map((point) => (
              <li key={point} className="flex items-center gap-2">
                <CheckIcon className="size-4 text-gold-300" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* Stats — replace with real platform numbers in config/site.ts */}
        <dl
          style={delay(950)}
          className="animate-rise mx-auto mt-16 grid w-full max-w-4xl grid-cols-3 border-t border-white/10"
        >
          {HERO_STATS.map((stat, i) => (
            <div key={stat.label} className={`px-2 pt-7 text-center ${i > 0 ? "border-l border-white/10" : ""}`}>
              <dd className="font-display text-4xl text-bone sm:text-6xl">
                <AnimatedNumber
                  value={stat.value ?? categories.length}
                  from={stat.from}
                  prefix={stat.prefix}
                  suffix={stat.suffix}
                />
              </dd>
              <dt className="mt-2 text-[10px] font-medium tracking-[0.2em] text-white/45 uppercase sm:text-xs">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </Container>
    </section>
  );
}

/** Slow-moving light: two drifting glows, a light sweep and a fine grid. */
export function HeroBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Top light source */}
      <div className="absolute -top-1/3 left-1/2 h-[70vh] w-[110vw] -translate-x-1/2 rounded-[100%] bg-[radial-gradient(closest-side,rgb(224_199_146/0.22),transparent)]" />
      {/* Drifting glows */}
      <div className="absolute top-[10%] left-[-10%] size-[42rem] animate-drift-a rounded-full bg-gold-400/[0.13] blur-[120px]" />
      <div className="absolute right-[-15%] bottom-[-10%] size-[46rem] animate-drift-b rounded-full bg-jade-500/[0.16] blur-[130px]" />
      {/* Light sweep */}
      <div className="absolute top-1/4 left-0 h-40 w-full animate-sweep bg-gradient-to-r from-transparent via-white/[0.05] to-transparent blur-2xl" />
      {/* Fine grid, faded at the edges */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgb(255_255_255/0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgb(255_255_255/0.035)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_70%_60%_at_50%_35%,black,transparent)]" />
      {/* Fade into the next section */}
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-b from-transparent to-ink-950" />
    </div>
  );
}
