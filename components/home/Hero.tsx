import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { CheckIcon } from "@/components/ui/icons";
import { LINKS } from "@/config/site";

const TRUST_POINTS = ["Free of charge", "Peer-reviewed vendors", "Multiple industries"];

/** Staggered entrance on page load (pair with the `animate-rise` class). */
const delay = (ms: number) => ({ animationDelay: `${ms}ms` });

export function Hero() {
  return (
    <section className="relative">
      <Container className="relative flex min-h-[100svh] flex-col pt-32 pb-20 sm:pt-40">
        <div className="mx-auto flex max-w-5xl flex-1 flex-col items-center justify-center text-center">
          {/* Highlight badge */}
          <p
            style={delay(50)}
            className="animate-rise relative mb-9 inline-flex rounded-full bg-[linear-gradient(110deg,#a78bfa,#f0abfc_45%,#67e8f9)] p-px shadow-[0_0_40px_-6px_rgb(240_171_252/0.6)]"
          >
            <span className="relative inline-flex items-center gap-2.5 overflow-hidden rounded-full bg-night-950/85 px-4 py-2 text-sm font-medium text-white backdrop-blur-md sm:px-5 sm:text-base">
              <span
                aria-hidden="true"
                className="animate-shimmer pointer-events-none absolute inset-0 bg-[linear-gradient(100deg,transparent_35%,rgb(255_255_255/0.14)_50%,transparent_65%)] bg-[length:200%_100%]"
              />
              <span aria-hidden="true" className="relative flex gap-0.5 text-fuchsia-200">
                {[0, 1, 2, 3, 4].map((i) => (
                  <svg key={i} viewBox="0 0 24 24" className="size-3.5 fill-current sm:size-4">
                    <path d="M12 2.5l2.9 6.26 6.85.74-5.1 4.63 1.42 6.75L12 17.5l-6.07 3.38 1.42-6.75L2.25 9.5l6.85-.74L12 2.5z" />
                  </svg>
                ))}
              </span>
              <span className="relative">Leading Public Vendor Forum With Verified Reviews</span>
            </span>
          </p>

          <h1
            style={delay(150)}
            className="animate-rise font-display text-[3.1rem] leading-[0.98] tracking-[-0.03em] text-balance text-white sm:text-7xl lg:text-[6.25rem]"
          >
            Browse Verified Vendors &amp; Suppliers —{" "}
            <em className="pr-2 italic">Free Of Charge</em>
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

      </Container>
    </section>
  );
}
