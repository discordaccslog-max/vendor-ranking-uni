import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { LINKS } from "@/config/site";

export function FinalCta() {
  return (
    <section className="relative py-36 text-center sm:py-48">
      <Container>
        <Reveal>
          <h2 className="mx-auto max-w-4xl font-display text-5xl leading-[0.98] tracking-[-0.03em] text-balance text-white sm:text-7xl lg:text-8xl">
            Your next supplier is <em className="text-aurora animate-shimmer italic">out there.</em>
          </h2>
        </Reveal>
        <Reveal delay={150}>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-mist-300">
            Explore businesses, discover new suppliers, and find the right vendors for your next project.
          </p>
        </Reveal>
        <Reveal delay={300}>
          <Button href={LINKS.viewVendors} variant="aurora" size="lg" arrow className="mt-12">
            View Vendors
          </Button>
        </Reveal>
      </Container>
    </section>
  );
}
