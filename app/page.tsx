import { Hero } from "@/components/home/Hero";
import { RankingsSection } from "@/components/home/RankingsSection";
import { Footer } from "@/components/home/Footer";
import { LAST_UPDATED } from "@/data/vendors";
import { getRankedVendors } from "@/lib/vendors";

export default function HomePage() {
  return (
    <>
      <Hero lastUpdated={LAST_UPDATED} />
      <RankingsSection vendors={getRankedVendors()} lastUpdated={LAST_UPDATED} />
      {/* TODO: add more homepage sections here (e.g. FAQ, methodology). */}
      <Footer />
    </>
  );
}
