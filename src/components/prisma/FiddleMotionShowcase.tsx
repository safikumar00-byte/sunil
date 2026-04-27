import { useState } from "react";
import { motion } from "framer-motion";

import avatar1 from "@/assets/avatar-1.png";
import avatar2 from "@/assets/avatar-2.png";
import avatar3 from "@/assets/avatar-3.png";
import featureOne from "@/assets/feature-1.gif";
import featureTwo from "@/assets/feature-2.gif";
import { CursorPreview } from "@/components/motion/CursorPreview";
import { Magnetic } from "@/components/motion/Magnetic";
import { MasonryGrid } from "@/components/motion/MasonryGrid";
import { ProgressText } from "@/components/motion/ProgressText";
import { RevealMedia } from "@/components/motion/RevealMedia";
import { SplitText } from "@/components/motion/SplitText";
import { Button } from "@/components/ui/button";
import { fadeUp } from "@/lib/motion";

const revealCards = [
  {
    body: "Media blocks that reveal through scale and clipped bounds rather than flat fades.",
    image: featureOne,
    title: "Reveal on Scroll",
  },
  {
    body: "Scroll progress can drive copy, imagery, and spacing with one shared mental model.",
    image: featureTwo,
    title: "Progress Mapping",
  },
];

const cursorItems = [
  { id: "water", image: featureOne, label: "Water" },
  { id: "earth", image: avatar1, label: "Earth" },
  { id: "air", image: avatar2, label: "Air" },
  { id: "fire", image: featureTwo, label: "Fire" },
];

const masonryItems = [
  { id: "1", image: featureOne, label: "Reveal Rhythm", ratio: 1.45 },
  { id: "2", image: avatar1, label: "Portrait State", ratio: 1 },
  { id: "3", image: avatar2, label: "Hover Target", ratio: 1 },
  { id: "4", image: featureTwo, label: "Layout Motion", ratio: 1.25 },
  { id: "5", image: avatar3, label: "Identity Frame", ratio: 1 },
  { id: "6", image: featureOne, label: "Surface Study", ratio: 1.4 },
];

const columnOptions = [2, 3, 4];

export function FiddleMotionShowcase() {
  const [cols, setCols] = useState(3);

  return (
    <section
      id="prisma-motion"
      className="border-t border-border/30 bg-black px-8 py-28 md:px-28 md:py-36"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp(0)} className="max-w-4xl">
          <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground">Motion System</p>
          <SplitText
            as="h2"
            className="mt-5 max-w-5xl text-4xl tracking-[-2px] text-foreground md:text-6xl"
            splitBy="word"
            text="Reusable interaction patterns extracted from the fiddle studies."
          />
          <motion.p
            {...fadeUp(0.12)}
            className="mt-6 max-w-3xl text-base leading-relaxed text-muted-foreground"
          >
            These components turn the exploratory HTML demos into app-ready building blocks: split
            text, reveal media, progress-driven typography, magnetic surfaces, cursor previews, and
            orchestrated masonry.
          </motion.p>
        </motion.div>

        <div className="mt-16 grid gap-8 lg:grid-cols-2">
          {revealCards.map((card, index) => (
            <motion.article key={card.title} {...fadeUp(index * 0.08)}>
              <RevealMedia className="liquid-glass p-2">
                <img
                  alt={card.title}
                  className="aspect-[4/3] w-full rounded-[1rem] object-cover"
                  src={card.image}
                />
              </RevealMedia>
              <h3 className="mt-5 text-2xl text-foreground">{card.title}</h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                {card.body}
              </p>
            </motion.article>
          ))}
        </div>

        <div className="mt-20 grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div {...fadeUp(0)}>
            <ProgressText
              className="text-2xl font-medium leading-tight tracking-[-1px] md:text-4xl"
              highlightedWords={["motion", "system", "reusable", "anywhere"]}
              mutedClassName="text-white/40"
              text="A motion system should be reusable anywhere in the application, not trapped inside a single section. The fiddle studies now map to shared primitives that we can compose across brand pages, editorial surfaces, and interactive landing blocks."
            />
          </motion.div>

          <motion.div {...fadeUp(0.08)} className="grid gap-4">
            <CursorPreview items={cursorItems} />
          </motion.div>
        </div>

        <div className="mt-20 grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <motion.div {...fadeUp(0)} className="space-y-4">
            <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
              Magnetic Surfaces
            </p>
            <div className="grid gap-4">
              {[featureOne, featureTwo, avatar3].map((image, index) => (
                <Magnetic
                  key={image}
                  className="liquid-glass overflow-hidden rounded-2xl p-2"
                  radius={260}
                  strength={0.14}
                >
                  <img
                    alt={`Magnetic sample ${index + 1}`}
                    className="aspect-[4/3] w-full rounded-[1rem] object-cover"
                    src={image}
                  />
                </Magnetic>
              ))}
            </div>
          </motion.div>

          <motion.div {...fadeUp(0.08)}>
            <div className="mb-6 flex items-center justify-between gap-4">
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-muted-foreground">
                  Orchestrated Masonry
                </p>
                <p className="mt-2 max-w-xl text-sm leading-relaxed text-muted-foreground">
                  This grid recalculates dimensions and animates items into place using `gsap`,
                  which makes the layout shifts feel physical instead of abrupt.
                </p>
              </div>
              <div className="hidden gap-2 sm:flex">
                {columnOptions.map((value) => (
                  <Button
                    key={value}
                    className="h-10 rounded-full px-4"
                    onClick={() => setCols(value)}
                    variant={cols === value ? "default" : "outline"}
                  >
                    {value} Cols
                  </Button>
                ))}
              </div>
            </div>
            <MasonryGrid cols={cols} items={masonryItems} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
