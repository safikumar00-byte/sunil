import type { ComponentType } from "react";

import { About } from "@/components/prisma/About";
import { AgencyLandingSections } from "@/components/prisma/AgencyLandingSections";
import { AsmeLandingSections } from "@/components/prisma/AsmeLandingSections";
import { Features } from "@/components/prisma/Features";
import { FiddleMotionShowcase } from "@/components/prisma/FiddleMotionShowcase";
import { Hero } from "@/components/prisma/Hero";
import { MindloopLandingSections } from "@/components/prisma/MindloopLandingSections";
import { PortfolioLandingSections } from "@/components/prisma/PortfolioLandingSections";

export interface PrismaSectionDefinition {
  id: string;
  component?: ComponentType;
  label: string;
  navLabel?: string;
  renderKey?: string;
}

export const prismaSectionFlow: PrismaSectionDefinition[] = [
  {
    id: "prisma-hero",
    component: Hero,
    label: "Home",
    renderKey: "hero",
  },
  {
    id: "prisma-about",
    component: About,
    label: "About",
    renderKey: "about",
  },
  {
    id: "prisma-studio",
    component: AgencyLandingSections,
    label: "Studio",
    renderKey: "studio",
  },
  {
    id: "prisma-capabilities",
    component: Features,
    label: "Capabilities",
    renderKey: "capabilities",
  },
  {
    id: "prisma-lab",
    component: AsmeLandingSections,
    label: "Lab",
    renderKey: "lab",
  },
  {
    id: "prisma-services",
    label: "Services",
  },
  {
    id: "portfolio-work",
    component: PortfolioLandingSections,
    label: "Work",
    renderKey: "portfolio",
  },
  {
    id: "portfolio-contact",
    label: "Contact",
  },
  {
    id: "prisma-motion",
    component: FiddleMotionShowcase,
    label: "Motion",
    renderKey: "motion",
  },
  {
    id: "mindloop-home",
    component: MindloopLandingSections,
    label: "Mindloop",
    renderKey: "mindloop",
  },
];

const navbarOrder = [
  "prisma-hero",
  "prisma-about",
  "prisma-studio",
  "prisma-capabilities",
  "prisma-lab",
  "prisma-services",
  "portfolio-work",
  "portfolio-contact",
  "prisma-motion",
  "mindloop-home",
] as const;

export const prismaHomepageSections = [
  "prisma-hero",
  "prisma-about",
  "prisma-studio",
  "prisma-capabilities",
  "prisma-lab",
  "portfolio-work",
  "prisma-motion",
  "mindloop-home",
]
  .map((id) => prismaSectionFlow.find((section) => section.id === id))
  .filter((section): section is PrismaSectionDefinition & { component: ComponentType } =>
    Boolean(section?.component),
  );

export const prismaNavbarItems = navbarOrder
  .map((id) => prismaSectionFlow.find((section) => section.id === id))
  .filter((section): section is PrismaSectionDefinition => Boolean(section))
  .map(({ id, label, navLabel }) => ({
    href: `#${id}`,
    label: navLabel ?? label,
  }));
