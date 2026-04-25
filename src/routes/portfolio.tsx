import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Work } from "@/components/portfolio/Work";
import { Services } from "@/components/portfolio/Services";
import { Process } from "@/components/portfolio/Process";
import { Testimonials } from "@/components/portfolio/Testimonials";
import { Stats } from "@/components/portfolio/Stats";
import { Contact, Footer } from "@/components/portfolio/Contact";

export const Route = createFileRoute("/portfolio")({
  component: PortfolioPage,
  head: () => ({
    meta: [
      { title: "Aria Vey — Independent Designer" },
      {
        name: "description",
        content:
          "Independent designer crafting brand systems, products, and digital experiences for studios who believe restraint is a form of luxury.",
      },
      { property: "og:title", content: "Aria Vey — Independent Designer" },
      {
        property: "og:description",
        content: "Brand, product, and digital craft for founders who care.",
      },
    ],
  }),
});

function PortfolioPage() {
  return (
    <main className="portfolio-root min-h-screen">
      <Hero />
      <About />
      <Work />
      <Services />
      <Process />
      <Testimonials />
      <Stats />
      <Contact />
      <Footer />
    </main>
  );
}
