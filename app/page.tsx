import { Hero } from "@/components/home/Hero";
import { VendorsSection } from "@/components/home/VendorsSection";
import { ReportSection } from "@/components/home/ReportSection";
import { SubmitSection } from "@/components/home/SubmitSection";
import { FinalCta } from "@/components/home/FinalCta";
import { MissionPopup } from "@/components/home/MissionPopup";

/** Homepage. Each section is its own component in components/home/. */
export default function HomePage() {
  return (
    <>
      <Hero />
      <VendorsSection />
      <ReportSection />
      <SubmitSection />
      <FinalCta />
      <MissionPopup />
    </>
  );
}
