import { Reveal, WordsReveal } from "./shared";

const steps = [
  {
    n: "01",
    title: "Listen",
    desc: "We start with a conversation, not a brief. I want to understand the founder, the friction, and the future you see.",
  },
  {
    n: "02",
    title: "Frame",
    desc: "I distill the inputs into a strategic frame — positioning, audience, and the single idea everything will hang from.",
  },
  {
    n: "03",
    title: "Make",
    desc: "Concept, refine, ship. I work in tight loops, sharing in-progress work weekly so you're never surprised at delivery.",
  },
  {
    n: "04",
    title: "Hand off",
    desc: "Files, systems, and documentation built so your team — or mine — can carry the work forward with confidence.",
  },
];

export function Process() {
  return (
    <section id="process" className="relative px-6 py-32 md:py-48 border-t border-white/[0.06]">
      <div className="mx-auto max-w-6xl">
        <div className="mb-20 max-w-3xl">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.4em] text-[var(--p-accent)]/70 mb-6">
              04 — Process
            </p>
          </Reveal>
          <WordsReveal
            text="A simple way of working, built on trust."
            italicWords={["trust"]}
            className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-[-0.03em] text-white"
          />
        </div>

        <div className="relative">
          <div className="absolute left-[28px] md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-white/10 to-transparent" />
          <div className="space-y-16 md:space-y-24">
            {steps.map((s, i) => (
              <Reveal key={s.n} delay={i * 0.1}>
                <div
                  className={`relative grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-16 items-start ${
                    i % 2 === 1 ? "md:[&>*:first-child]:order-2" : ""
                  }`}
                >
                  <div className={`pl-16 md:pl-0 ${i % 2 === 1 ? "md:text-right" : ""}`}>
                    <span className="font-serif italic text-[var(--p-accent)] text-lg">
                      {s.n}
                    </span>
                    <h3 className="font-serif text-3xl md:text-5xl text-white mt-2 leading-tight">
                      {s.title}
                    </h3>
                  </div>
                  <div className="pl-16 md:pl-0">
                    <p className="text-base md:text-lg text-white/60 leading-relaxed max-w-md">
                      {s.desc}
                    </p>
                  </div>
                  <div className="absolute left-[20px] md:left-1/2 top-2 -translate-x-1/2 w-4 h-4 rounded-full bg-[var(--p-bg)] border-2 border-[var(--p-accent)]" />
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
