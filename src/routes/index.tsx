import { createFileRoute } from "@tanstack/react-router";
import { About } from "@/components/prisma/About";
import { AgencyLandingSections } from "@/components/prisma/AgencyLandingSections";
import { AsmeLandingSections } from "@/components/prisma/AsmeLandingSections";
import { Features } from "@/components/prisma/Features";
import { FiddleMotionShowcase } from "@/components/prisma/FiddleMotionShowcase";
import { Hero } from "@/components/prisma/Hero";
import { MindloopLandingSections } from "@/components/prisma/MindloopLandingSections";
import { PortfolioLandingSections } from "@/components/prisma/PortfolioLandingSections";
import { PrismaNavbar } from "@/components/prisma/shared/PrismaNavbar";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Prisma - Creative Studio" },
      {
        name: "description",
        content:
          "Prisma is a worldwide network of visual artists, filmmakers and storytellers unlocking potential through unique perspectives.",
      },
    ],
  }),
});

function Index() {
  return (
    <div className="prisma-home bg-black text-foreground">
      <PrismaNavbar />
      <main className="min-h-screen">
        <Hero />
        <About />
        <AgencyLandingSections />
        <Features />
        <AsmeLandingSections />
        <PortfolioLandingSections />
        <FiddleMotionShowcase />
        <MindloopLandingSections />
      </main>
    </div>
  );
}
