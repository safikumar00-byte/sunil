import { createFileRoute } from "@tanstack/react-router";
import { VHero } from "@/components/viktor/Hero";
import { Marquee } from "@/components/viktor/Marquee";
import { TestimonialSection } from "@/components/viktor/TestimonialSection";
import { PricingSection } from "@/components/viktor/PricingSection";
import { TestimonialCarousel } from "@/components/viktor/TestimonialCarousel";
import { ProjectsSection } from "@/components/viktor/ProjectsSection";
import { PartnerSection } from "@/components/viktor/PartnerSection";
import { VFooter } from "@/components/viktor/Footer";
import { CopyrightBar } from "@/components/viktor/CopyrightBar";
import { BottomNav } from "@/components/viktor/BottomNav";

export const Route = createFileRoute("/viktor")({
  component: ViktorPage,
  head: () => ({
    meta: [
      { title: "Viktor Oddy — Creative Studio" },
      {
        name: "description",
        content:
          "Viktor Oddy is a creative design studio building bold products with veteran design talent. Projects start at $5,000 per month.",
      },
      { property: "og:title", content: "Viktor Oddy — Creative Studio" },
      {
        property: "og:description",
        content: "A small, senior design studio led by Viktor Oddy.",
      },
    ],
  }),
});

function ViktorPage() {
  return (
    <main className="bg-white min-h-screen pb-32" style={{ fontFamily: "PP Neue Montreal, -apple-system, sans-serif" }}>
      <VHero />
      <Marquee />
      <TestimonialSection />
      <PricingSection />
      <TestimonialCarousel />
      <ProjectsSection />
      <PartnerSection />
      <VFooter />
      <CopyrightBar />
      <BottomNav />
    </main>
  );
}
