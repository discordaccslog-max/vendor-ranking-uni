import { CategoryCard } from "@/components/home/CategoryCard";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { categories } from "@/data/categories";

export function FeaturedCategories() {
  return (
    <section id="categories" className="relative bg-bone py-28 sm:py-36">
      <Container>
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeader
            eyebrow="Featured categories"
            title={
              <>
                The vendor &amp; supplier source for <em className="italic text-gold-600">every</em> category.
              </>
            }
          />
          <Reveal delay={200} className="lg:pb-3">
            <p className="font-display text-2xl text-ink-950 italic">Reviewed. Verified. Free to discover.</p>
          </Reveal>
        </div>

        <ul className="mt-16 grid gap-5 md:grid-cols-3">
          {categories.map((category, i) => (
            <Reveal as="li" key={category.slug} delay={i * 120}>
              <CategoryCard category={category} index={i} />
            </Reveal>
          ))}
        </ul>

        <Reveal delay={200}>
          <p className="mt-10 text-center text-sm text-stone-500">
            More categories are added as the directory grows.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
