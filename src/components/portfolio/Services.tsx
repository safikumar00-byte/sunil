import { Layers, Compass, Sparkles, Code2, Palette, Type } from "lucide-react";
import { Reveal, WordsReveal, GlassCard } from "./shared";

const services = [
  {
    icon: Compass,
    title: "Brand Strategy",
    desc: "Positioning, narrative, and visual foundations that hold for a decade — not a quarter.",
    tags: ["Positioning", "Naming", "Voice"],
  },
  {
    icon: Layers,
    title: "Identity Systems",
    desc: "Marks, type, color, and motion stitched into a coherent system designed to scale.",
    tags: ["Logo", "Type", "Guidelines"],
  },
  {
    icon: Palette,
    title: "Art Direction",
    desc: "Photography, illustration, and editorial direction that gives a brand a worldview.",
    tags: ["Editorial", "Photo", "Set"],
  },
  {
    icon: Type,
    title: "Product Design",
    desc: "Interfaces and flows where function leads and aesthetic follows quietly behind.",
    tags: ["UX", "UI", "Systems"],
  },
  {
    icon: Code2,
    title: "Web & Digital",
    desc: "Editorial websites and prototypes built with care for performance and craft.",
    tags: ["Web", "Motion", "Code"],
  },
  {
    icon: Sparkles,
    title: "Creative Direction",
    desc: "Long-term partnership for founders who need a steady hand on the visual rudder.",
    tags: ["Retainer", "Studio", "Lead"],
  },
];

export function Services() {
  return (
    <section className="relative px-6 py-32 md:py-48 border-t border-white/[0.06]">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 max-w-3xl">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.4em] text-[var(--p-accent)]/70 mb-6">
              03 — Capabilities
            </p>
          </Reveal>
          <WordsReveal
            text="What I do, and how deep I go."
            italicWords={["deep"]}
            className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-[-0.03em] text-white"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.06}>
              <GlassCard className="p-8 h-full group cursor-default">
                <div className="w-12 h-12 rounded-xl border border-white/10 bg-white/[0.04] flex items-center justify-center mb-7 transition-all duration-500 group-hover:bg-[var(--p-accent)]/15 group-hover:border-[var(--p-accent)]/40">
                  <s.icon className="w-5 h-5 text-[var(--p-accent)]" />
                </div>
                <h3 className="font-serif text-2xl text-white mb-3">{s.title}</h3>
                <p className="text-sm text-white/60 leading-relaxed mb-6">{s.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {s.tags.map((t) => (
                    <span
                      key={t}
                      className="text-[10px] uppercase tracking-[0.2em] text-white/40 border-b border-white/10 pb-0.5"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
