import { HeroBackground } from "@/components/home/Hero";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { LINKS } from "@/config/site";

export function FinalCta() {
  return (
    <section className="grain relative isolate overflow-hidden bg-ink-950 py-36 text-center text-bone sm:py-48">
      <HeroBackground />
      <Container>
        <Reveal>
          <h2 className="mx-auto max-w-4xl font-display text-5xl leading-[0.98] tracking-[-0.03em] text-balance sm:text-7xl lg:text-8xl">
            Your next supplier is <em className="text-champagne animate-shimmer italic">out there.</em>
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-white/60">
            Explore businesses, discover new suppliers, and find the right vendors for your next project.
          </p>
        </Reveal>
        <Reveal delay={300}>
          <Button href={LINKS.exploreCategories} variant="gold" size="lg" arrow className="mt-12">
            Explore Categories
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
