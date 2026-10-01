import { Hero } from "@/components/home/Hero";
import { FeaturedCategories } from "@/components/home/FeaturedCategories";
import { HowItWorks } from "@/components/home/HowItWorks";
import { TrustSection } from "@/components/home/TrustSection";
import { ReportSection } from "@/components/home/ReportSection";
import { SubmitSection } from "@/components/home/SubmitSection";
import { FinalCta } from "@/components/home/FinalCta";

/**
 * Homepage. Each section is its own component in components/home/ —
 * reorder, remove or add sections here.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <FeaturedCategories />
      <HowItWorks />
      <TrustSection />
      <ReportSection />
      <SubmitSection />
      {/* TODO: add sections here later (e.g. search bar, top-rated vendors, testimonials). */}
      <FinalCta />
    </>
  );
}
