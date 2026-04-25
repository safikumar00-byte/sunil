import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/prisma/Hero";
import { About } from "@/components/prisma/About";
import { Features } from "@/components/prisma/Features";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "Prisma — Creative Studio" },
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
    <main className="bg-black min-h-screen">
      <Hero />
      <About />
      <Features />
    </main>
  );
}
