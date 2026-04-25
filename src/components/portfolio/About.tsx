import { Reveal, WordsReveal, GlassCard } from "./shared";

const tags = ["Brand Systems", "Product Design", "Art Direction", "Motion", "Web", "Type"];

export function About() {
  return (
    <section id="about" className="relative px-6 py-32 md:py-48">
      <div className="mx-auto max-w-6xl">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.4em] text-[var(--p-accent)]/70 mb-6">
            01 — About
          </p>
        </Reveal>

        <WordsReveal
          text="A designer who treats restraint as the highest form of craft."
          italicWords={["restraint", "craft"]}
          className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-[-0.03em] text-white max-w-5xl"
        />

        <div className="mt-20 grid grid-cols-1 md:grid-cols-12 gap-10">
          <Reveal className="md:col-span-7" delay={0.1}>
            <GlassCard className="p-8 md:p-10 h-full">
              <p className="text-base md:text-lg leading-relaxed text-white/70">
                I'm Aria — an independent designer working at the intersection of brand,
                product, and digital craft. Over the last eight years I've partnered with
                early-stage founders and established studios to shape identities that feel
                inevitable, and interfaces that disappear into use.
              </p>
              <p className="mt-6 font-serif italic text-xl md:text-2xl text-[var(--p-accent)] leading-snug">
                "Good design isn't decoration — it's the architecture of attention."
              </p>
              <div className="mt-8 flex flex-wrap gap-2">
                {tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs text-white/70"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </GlassCard>
          </Reveal>

          <Reveal className="md:col-span-5" delay={0.2}>
            <div className="grid grid-cols-2 gap-4 h-full">
              <GlassCard className="p-6 col-span-2">
                <p className="text-xs uppercase tracking-[0.25em] text-white/40 mb-2">Based</p>
                <p className="text-lg text-white">Lisbon · Remote worldwide</p>
              </GlassCard>
              <GlassCard className="p-6">
                <p className="text-xs uppercase tracking-[0.25em] text-white/40 mb-2">Focus</p>
                <p className="text-base text-white">Brand · Product</p>
              </GlassCard>
              <GlassCard className="p-6">
                <p className="text-xs uppercase tracking-[0.25em] text-white/40 mb-2">Since</p>
                <p className="text-base text-white">2017</p>
              </GlassCard>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
