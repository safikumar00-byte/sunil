import { ArrowUpRight, Mail } from "lucide-react";
import { Reveal, WordsReveal } from "./shared";

export function Contact() {
  return (
    <section
      id="contact"
      className="relative px-6 py-32 md:py-48 border-t border-white/[0.06] overflow-hidden"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_50%_100%,rgba(212,175,120,0.18),transparent_60%)]" />
      </div>

      <div className="mx-auto max-w-5xl text-center">
        <Reveal>
          <p className="text-xs uppercase tracking-[0.4em] text-[var(--p-accent)]/70 mb-8">
            06 — Let's build
          </p>
        </Reveal>

        <WordsReveal
          text="Have something worth making?"
          italicWords={["worth", "making"]}
          className="font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.02] tracking-[-0.04em] text-white justify-center"
        />

        <Reveal delay={0.2}>
          <p className="mt-10 text-base md:text-lg text-white/60 max-w-xl mx-auto leading-relaxed">
            I take on a small number of projects each year. If you're shaping something
            you believe in, I'd love to hear about it.
          </p>
        </Reveal>

        <Reveal delay={0.3}>
          <div className="mt-14 flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:hello@aria.studio"
              className="group inline-flex items-center gap-3 rounded-full bg-[var(--p-accent)] px-8 py-4 text-sm font-medium text-black transition-all hover:gap-4"
            >
              <Mail className="w-4 h-4" />
              hello@aria.studio
              <ArrowUpRight className="w-4 h-4 transition-transform group-hover:rotate-45" />
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-8 py-4 text-sm text-white backdrop-blur-md transition-all hover:bg-white/[0.08] hover:border-white/30"
            >
              Book an intro call
            </a>
          </div>
        </Reveal>

        <Reveal delay={0.4}>
          <div className="mt-20 flex flex-wrap justify-center gap-x-10 gap-y-3 text-xs uppercase tracking-[0.25em] text-white/40">
            <a href="#" className="hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-white transition-colors">Are.na</a>
            <a href="#" className="hover:text-white transition-colors">Read.cv</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] px-6 py-10">
      <div className="mx-auto max-w-7xl flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="font-serif italic text-[var(--p-accent)] text-lg">Aria Vey</p>
        <div className="flex gap-8 text-xs uppercase tracking-[0.25em] text-white/40">
          <a href="#work" className="hover:text-white transition-colors">Work</a>
          <a href="#about" className="hover:text-white transition-colors">About</a>
          <a href="#process" className="hover:text-white transition-colors">Process</a>
          <a href="#contact" className="hover:text-white transition-colors">Contact</a>
        </div>
        <p className="text-xs text-white/30">© 2026 — Studio of one.</p>
      </div>
    </footer>
  );
}
