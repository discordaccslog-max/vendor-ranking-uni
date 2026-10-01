import { TrustpilotStars, TrustpilotLogo } from "@/components/reviews/TrustpilotRating";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BadgeCheckIcon, CheckIcon } from "@/components/ui/icons";
import { LINKS } from "@/config/site";
import { categories } from "@/data/categories";

const BENEFITS = [
  "Get in front of businesses actively looking for vendors",
  "Be listed in the category where buyers are searching",
  "Show verified information that builds trust",
];

export function SubmitSection() {
  return (
    <section id="for-vendors" className="relative overflow-hidden py-28 sm:py-36">
      <Container className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
        <div className="min-w-0">
          <SectionHeader
            eyebrow="For vendors"
            title={
              <>
                Are you a vendor? <em className="text-aurora italic">Get discovered.</em>
              </>
            }
            description="We're building a growing network of suppliers and service providers across industries. Submit your business for consideration and get in front of people actively looking for vendors."
          />
          <ul className="mt-10 space-y-4">
            {BENEFITS.map((b, i) => (
              <Reveal as="li" key={b} delay={200 + i * 100} className="flex items-start gap-3">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-white/10 text-fuchsia-300">
                  <CheckIcon className="size-3.5" />
                </span>
                <span className="text-mist-300">{b}</span>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={500}>
            <Button href={LINKS.submitVendor} variant="light" size="lg" arrow className="mt-12">
              Submit Your Business
            </Button>
          </Reveal>
        </div>

        <Reveal delay={200} className="min-w-0">
          <ProfilePreview />
        </Reveal>
      </Container>
    </section>
  );
}

/** Illustrative vendor listing — shows what a listing could look like. */
function ProfilePreview() {
  const category = categories[0]?.name ?? "Your category";
  return (
    <div className="relative mx-auto max-w-md lg:max-w-none">
      <div aria-hidden="true" className="absolute -inset-10 -z-10 rounded-full bg-violet-500/25 blur-3xl" />
      <div className="relative overflow-hidden rounded-[32px] border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl sm:p-10">
        <div className="flex items-center justify-between text-[11px] tracking-[0.2em] text-mist-500 uppercase">
          <span>Vendor listing</span>
          <span>Preview</span>
        </div>

        <div className="mt-10 flex items-center gap-5">
          <span className="grid size-16 place-items-center rounded-2xl bg-[linear-gradient(135deg,rgb(167_139_250/0.4),rgb(240_171_252/0.25),rgb(103_232_249/0.3))] font-display text-2xl text-white ring-1 ring-white/15">
            Y
          </span>
          <div className="min-w-0">
            <p className="font-display text-3xl text-white">Your Business</p>
            <p className="mt-1 truncate text-sm text-mist-400">{category}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-300/30 bg-emerald-400/10 px-3 py-1 text-xs font-medium text-emerald-300">
            <BadgeCheckIcon className="size-4" /> Verified vendor
          </span>
        </div>

        <div className="mt-8 flex items-center justify-between gap-4 rounded-2xl border border-white/10 bg-night-950/40 p-4">
          <div>
            <TrustpilotLogo />
            <div className="mt-2">
              <TrustpilotStars rating={5} size="sm" />
            </div>
          </div>
          <div className="text-right">
            <p className="font-display text-3xl leading-none text-emerald-300">0</p>
            <p className="mt-1 text-xs text-mist-400">reports · 6 months</p>
          </div>
        </div>

        <div className="mt-8 space-y-3" aria-hidden="true">
          <div className="h-2 w-full rounded-full bg-white/[0.07]" />
          <div className="h-2 w-5/6 rounded-full bg-white/[0.07]" />
          <div className="h-2 w-2/3 rounded-full bg-white/[0.07]" />
        </div>
      </div>
    </div>
  );
}
