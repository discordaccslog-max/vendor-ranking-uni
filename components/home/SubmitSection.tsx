import { StarRating } from "@/components/reviews/StarRating";
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
  "Show reviewed, verified information that builds trust",
];

export function SubmitSection() {
  return (
    <section id="for-vendors" className="overflow-hidden bg-bone pb-28 sm:pb-36">
      <Container className="grid items-center gap-16 lg:grid-cols-2 lg:gap-24">
        <div className="min-w-0">
          <SectionHeader
            eyebrow="For vendors"
            title={
              <>
                Are you a vendor? <em className="italic text-gold-600">Get discovered.</em>
              </>
            }
            description="We're building a growing network of suppliers and service providers across industries. Submit your business for consideration and get in front of people actively looking for vendors."
          />
          <ul className="mt-10 space-y-4">
            {BENEFITS.map((b, i) => (
              <Reveal as="li" key={b} delay={200 + i * 100} className="flex items-start gap-3">
                <span className="mt-0.5 grid size-6 shrink-0 place-items-center rounded-full bg-ink-950 text-gold-300">
                  <CheckIcon className="size-3.5" />
                </span>
                <span className="text-ink-800">{b}</span>
              </Reveal>
            ))}
          </ul>
          <Reveal delay={500}>
            <Button href={LINKS.submitVendor} variant="dark" size="lg" arrow className="mt-12">
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

/** Illustrative vendor profile card — shows what a listing could look like. */
function ProfilePreview() {
  return (
    <div className="relative mx-auto max-w-md lg:max-w-none">
      <div aria-hidden="true" className="absolute -inset-10 -z-10 rounded-full bg-gold-300/25 blur-3xl" />
      <div className="grain relative overflow-hidden rounded-[32px] bg-ink-950 p-8 text-bone shadow-[0_50px_100px_-40px_rgb(10_10_11/0.6)] sm:p-10">
        <div className="flex items-center justify-between text-[11px] tracking-[0.2em] text-white/40 uppercase">
          <span>Vendor profile</span>
          <span>Preview</span>
        </div>

        <div className="mt-10 flex items-center gap-5">
          <span className="grid size-16 place-items-center rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/[0.02] font-display text-2xl text-gold-200">
            Y
          </span>
          <div>
            <p className="font-display text-3xl">Your Business</p>
            <p className="mt-1 text-sm text-white/50">{categories[1]?.name ?? "Your category"}</p>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-jade-400/40 bg-jade-500/15 px-3 py-1 text-xs font-medium text-jade-400">
            <BadgeCheckIcon className="size-4" /> Verified information
          </span>
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3 py-1 text-xs text-white/70">
            <StarRating rating={5} size="sm" className="text-gold-300" emptyClassName="text-white/10" /> Reviewed
          </span>
        </div>

        <div className="mt-10 space-y-3" aria-hidden="true">
          <div className="h-2 w-full rounded-full bg-white/[0.07]" />
          <div className="h-2 w-5/6 rounded-full bg-white/[0.07]" />
          <div className="h-2 w-2/3 rounded-full bg-white/[0.07]" />
        </div>

        <div className="mt-10 flex items-center justify-between gap-4 border-t border-white/10 pt-6 text-sm">
          <span className="truncate text-white/50">Listed in {categories[1]?.name ?? "your category"}</span>
          <span className="shrink-0 text-gold-300">Get discovered →</span>
        </div>
      </div>
    </div>
  );
}
