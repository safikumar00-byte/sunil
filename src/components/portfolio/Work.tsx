import { ArrowUpRight } from "lucide-react";
import { Reveal, WordsReveal } from "./shared";

const projects = [
  {
    title: "Soren Atelier",
    cat: "Brand Identity",
    year: "2025",
    desc: "A complete identity system for a Copenhagen-based perfumery.",
    img: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=1200&q=80",
    span: "md:col-span-8",
  },
  {
    title: "Halcyon OS",
    cat: "Product Design",
    year: "2025",
    desc: "Operating system for ambient computing.",
    img: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80",
    span: "md:col-span-4",
  },
  {
    title: "Northwind",
    cat: "Web Design",
    year: "2024",
    desc: "Editorial site for a sailing magazine.",
    img: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=1200&q=80",
    span: "md:col-span-4",
  },
  {
    title: "Vesper Coffee",
    cat: "Packaging",
    year: "2024",
    desc: "Specialty roastery brand and packaging system.",
    img: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1200&q=80",
    span: "md:col-span-4",
  },
  {
    title: "Lumen Studio",
    cat: "Art Direction",
    year: "2024",
    desc: "Visual direction for a generative art collective.",
    img: "https://images.unsplash.com/photo-1604871000636-074fa5117945?w=1200&q=80",
    span: "md:col-span-4",
  },
];

export function Work() {
  return (
    <section id="work" className="relative px-6 py-32 md:py-48 border-t border-white/[0.06]">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
          <div>
            <Reveal>
              <p className="text-xs uppercase tracking-[0.4em] text-[var(--p-accent)]/70 mb-6">
                02 — Selected Work
              </p>
            </Reveal>
            <WordsReveal
              text="Recent projects, carefully chosen."
              italicWords={["chosen"]}
              className="font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.05] tracking-[-0.03em] text-white"
            />
          </div>
          <Reveal delay={0.2}>
            <p className="text-sm text-white/50 max-w-xs">
              A small selection from eight years of practice across brand, product, and editorial.
            </p>
          </Reveal>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-5">
          {projects.map((p, i) => (
            <Reveal key={p.title} delay={i * 0.08} className={p.span}>
              <a
                href="#"
                className="group relative block overflow-hidden rounded-2xl border border-white/[0.08] bg-white/[0.03] aspect-[4/3] md:aspect-auto md:h-[420px]"
              >
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent opacity-90" />
                <div className="absolute inset-0 p-7 flex flex-col justify-between">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] uppercase tracking-[0.3em] text-white/60">
                      {p.cat} · {p.year}
                    </span>
                    <span className="w-9 h-9 rounded-full border border-white/20 flex items-center justify-center transition-all duration-500 group-hover:bg-[var(--p-accent)] group-hover:border-[var(--p-accent)] group-hover:rotate-45">
                      <ArrowUpRight className="w-4 h-4 text-white group-hover:text-black" />
                    </span>
                  </div>
                  <div>
                    <h3 className="font-serif text-3xl md:text-4xl text-white leading-tight">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm text-white/60 max-w-md opacity-0 translate-y-2 transition-all duration-500 group-hover:opacity-100 group-hover:translate-y-0">
                      {p.desc}
                    </p>
                  </div>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
