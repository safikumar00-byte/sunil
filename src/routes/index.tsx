import { createFileRoute } from "@tanstack/react-router";
import { PrismaNavbar } from "@/components/prisma/shared/PrismaNavbar";
import { prismaHomepageSections } from "@/components/prisma/shared/homepageSections";

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
        {prismaHomepageSections.map(({ component: Section, id }) => (
          <Section key={id} />
        ))}
      </main>
    </div>
  );
}
