import { Reveal, WordsReveal, GlassCard } from "./shared";

const featured = {
  quote:
    "Aria has the rare ability to translate a fuzzy founder vision into a system that feels obvious in hindsight. Our brand finally looks like the company we always wanted to build.",
  name: "Mira Sato",
  role: "Co-founder, Halcyon",
};

const others = [
  {
    quote: "Quietly the best designer I've worked with. Every detail is intentional.",
    name: "Daniel Reyes",
    role: "CEO, Soren Atelier",
  },
  {
    quote: "She turned six months of indecision into a launch we're still proud of.",
    name: "Elena Marsh",
    role: "Head of Brand, Vesper",
  },
  {
    quote: "Strategic, fast, and deeply considered. A true partner.",
    name: "Theo Lange",
    role: "Founder, Northwind",
  },
  {
    quote: "The kind of designer studios pretend to be. Hire her once and you'll never go back.",
    name: "Priya Nair",
    role: "Creative Director, Lumen",
  },
];

export function Testimonials() {
  return (
    <section className="relative px-6 py-32 md:py-48 border-t border-white/[0.06]">
      <div className="mx-auto max-w-7xl">
        <div className="mb-16 max-w-3xl">
          <Reveal>
            <p className="text-xs uppercase tracking-[0.4em] text-[var(--p-accent)]/70 mb-6">
              05 — Words from clients
            </p>
          </Reveal>
          <WordsReveal
            text="Trusted by founders who care."
            italicWords={["care"]}
            className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-[-0.03em] text-white"
          />
        </div>

        <Reveal>
          <GlassCard className="p-10 md:p-16 mb-5">
            <p className="font-serif text-2xl md:text-4xl lg:text-5xl leading-[1.2] text-white">
              <span className="text-[var(--p-accent)] font-serif italic">"</span>
              {featured.quote}
              <span className="text-[var(--p-accent)] font-serif italic">"</span>
            </p>
            <div className="mt-10 flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[var(--p-accent)]/40 to-white/10" />
              <div>
                <p className="text-sm text-white">{featured.name}</p>
                <p className="text-xs text-white/50">{featured.role}</p>
              </div>
            </div>
          </GlassCard>
        </Reveal>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {others.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.08}>
              <GlassCard className="p-8 h-full">
                <p className="text-base md:text-lg text-white/75 leading-relaxed">
                  "{t.quote}"
                </p>
                <div className="mt-8 flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-white/20 to-white/[0.04]" />
                  <div>
                    <p className="text-sm text-white">{t.name}</p>
                    <p className="text-xs text-white/50">{t.role}</p>
                  </div>
                </div>
              </GlassCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
