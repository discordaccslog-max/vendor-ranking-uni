import { AnimatedNumber } from "@/components/ui/AnimatedNumber";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CheckIcon } from "@/components/ui/icons";
import { HERO_STATS, LINKS } from "@/config/site";
import { categories } from "@/data/categories";
import { vendors } from "@/data/vendors";

const TRUST_POINTS = ["Free of charge", "Peer-reviewed vendors", "Multiple industries"];

/** Staggered entrance on page load (pair with the `animate-rise` class). */
const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

export function Hero() {
  return (
    <section className="relative">
      <Container className="relative flex min-h-[100svh] flex-col pt-32 pb-10 sm:pt-40">
        <div className="mx-auto flex max-w-5xl flex-1 flex-col items-center justify-center text-center">
          <h1
            style={delay(150)}
            className="animate-rise font-display text-[3.1rem] leading-[0.98] tracking-[-0.03em] text-balance text-white sm:text-7xl lg:text-[6.25rem]"
          >
            Browse Verified Vendors &amp; Suppliers —{" "}
            <em className="text-aurora animate-shimmer pr-2 italic">Free Of Charge.</em>
          </h1>

          <p style={delay(350)} className="animate-rise mt-8 max-w-2xl text-lg leading-relaxed text-pretty text-mist-300 sm:text-xl">
            Discover peer-reviewed vendors across a growing range of categories. Compare ratings, check their recent
            reports, and find the right supplier — without ever paying for access.
          </p>

          <div style={delay(500)} className="animate-rise mt-11 flex w-full flex-col items-center justify-center gap-3 sm:w-auto sm:flex-row">
            <Button href={LINKS.viewVendors} variant="aurora" size="lg" arrow className="w-full sm:w-auto">
              View Vendors
            </Button>
            <Button href={LINKS.submitVendor} variant="glass" size="lg" className="w-full sm:w-auto">
              Submit a Vendor
            </Button>
          </div>

          <ul style={delay(650)} className="animate-rise mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-mist-400">
            {TRUST_POINTS.map((point) => (
              <li key={point} className="flex items-center gap-2">
                <CheckIcon className="size-4 text-fuchsia-300" />
                {point}
              </li>
            ))}
          </ul>
        </div>

        {/* Stats — edit in config/site.ts */}
        <dl style={delay(850)} className="animate-rise mx-auto mt-16 grid w-full max-w-4xl grid-cols-3 border-t border-white/10">
          {HERO_STATS.map((stat, i) => {
            const value =
              stat.value ?? (stat.source === "vendors" ? vendors.length : categories.length);
            return (
              <div key={stat.label} className={`px-2 pt-7 text-center ${i > 0 ? "border-l border-white/10" : ""}`}>
                <dd className="font-display text-4xl text-white sm:text-6xl">
                  <AnimatedNumber value={value} from={stat.from} prefix={stat.prefix} suffix={stat.suffix} />
                </dd>
                <dt className="mt-2 text-[10px] font-medium tracking-[0.2em] text-mist-500 uppercase sm:text-xs">
                  {stat.label}
                </dt>
              </div>
            );
          })}
        </dl>
      </Container>
    </section>
  );
}
