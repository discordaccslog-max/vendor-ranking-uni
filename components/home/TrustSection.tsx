import { StarRating } from "@/components/reviews/StarRating";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { BadgeCheckIcon, GridIcon, KeyIcon, StarIcon } from "@/components/ui/icons";
import { categories } from "@/data/categories";

export function TrustSection() {
  // Keep these claims accurate to what the platform actually does.
  const indicators = [
    {
      title: "Reviewed Vendors",
      body: "Listings are reviewed by our team before they're published, so you start from a shortlist — not a search engine.",
      Icon: StarIcon,
      visual: <StarRating rating={5} size="sm" className="text-gold-300" emptyClassName="text-white/10" />,
    },
    {
      title: "Verified Information",
      body: "Where we've confirmed key business details, the listing is clearly marked so you know what's been checked.",
      Icon: BadgeCheckIcon,
      visual: (
        <span className="inline-flex items-center gap-1.5 rounded-full border border-jade-400/40 bg-jade-500/15 px-2.5 py-0.5 text-[11px] font-medium text-jade-400">
          <BadgeCheckIcon className="size-3.5" /> Verified
        </span>
      ),
    },
    {
      title: "Multiple Categories",
      body: "From software to manufacturing to creative services, with new categories added over time.",
      Icon: GridIcon,
      visual: <span className="font-display text-2xl text-gold-200">{categories.length}+</span>,
    },
    {
      title: "Free Access",
      body: "Browse, compare and discover vendors without subscriptions, paywalls or access fees.",
      Icon: KeyIcon,
      visual: <span className="font-display text-2xl text-gold-200">$0</span>,
    },
  ];

  return (
    <section id="trust" className="grain relative isolate overflow-hidden bg-ink-950 py-28 text-bone sm:py-36">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute top-1/2 -left-40 size-[36rem] -translate-y-1/2 animate-drift-a rounded-full bg-gold-400/[0.08] blur-[120px]" />
      </div>

      <Container className="grid gap-16 lg:grid-cols-[1fr_1.15fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <SectionHeader
            inverse
            eyebrow="Trust & verification"
            title={
              <>
                Less searching.
                <br />
                <em className="text-champagne animate-shimmer italic">More sourcing.</em>
              </>
            }
            description="Finding reliable vendors shouldn't require endless research. We're building a centralized source for discovering businesses across industries, with a focus on quality, transparency, and useful information."
          />
        </div>

        <ul className="grid gap-4 sm:grid-cols-2">
          {indicators.map(({ title, body, Icon, visual }, i) => (
            <Reveal as="li" key={title} delay={i * 100}>
              <div className="group h-full rounded-3xl border border-white/[0.08] bg-white/[0.025] p-7 transition-all duration-700 ease-luxe hover:-translate-y-1 hover:border-gold-300/30 hover:bg-white/[0.045]">
                <div className="flex items-center justify-between">
                  <span className="grid size-12 place-items-center rounded-2xl border border-white/10 bg-white/[0.03] text-gold-300 transition-colors duration-700 group-hover:border-gold-300/40">
                    <Icon className="size-5" />
                  </span>
                  {visual}
                </div>
                <h3 className="mt-10 text-lg font-medium tracking-[-0.01em]">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-white/55">{body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  );
}
