import { motion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { ease } from "./shared";

const navLinks = ["Work", "About", "Process", "Contact"];

export function Hero() {
  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[var(--p-bg)] text-[var(--p-fg)]">
      {/* Background layers */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_0%,rgba(212,175,120,0.12),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_80%_100%,rgba(120,140,200,0.08),transparent_60%)]" />
        <div className="absolute inset-0 noise-overlay opacity-[0.15] mix-blend-overlay" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_0%,rgba(0,0,0,0.4)_100%)]" />
      </div>

      {/* Navbar */}
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease }}
        className="absolute top-6 left-1/2 -translate-x-1/2 z-20 w-[calc(100%-2rem)] max-w-5xl"
      >
        <div className="flex items-center justify-between rounded-full border border-white/[0.08] bg-black/30 backdrop-blur-xl px-5 py-2.5">
          <span className="text-sm font-serif italic text-[var(--p-accent)]">Aria Vey</span>
          <div className="hidden md:flex items-center gap-7">
            {navLinks.map((l) => (
              <a
                key={l}
                href={`#${l.toLowerCase()}`}
                className="text-xs uppercase tracking-[0.2em] text-white/60 hover:text-white transition-colors duration-300"
              >
                {l}
              </a>
            ))}
          </div>
          <a
            href="#contact"
            className="text-xs uppercase tracking-[0.2em] text-white/80 hover:text-white transition-colors"
          >
            Let's talk →
          </a>
        </div>
      </motion.nav>

      {/* Hero content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8, ease }}
          className="mb-8 text-xs uppercase tracking-[0.4em] text-white/50"
        >
          Independent Designer · Available 2026
        </motion.p>

        <h1 className="font-serif text-[14vw] md:text-[10vw] lg:text-[9rem] leading-[0.9] tracking-[-0.04em] text-white">
          {["Designing", "the", "quiet", "future."].map((w, i) => (
            <span key={i} className="inline-block overflow-hidden align-bottom mr-[0.15em]">
              <motion.span
                initial={{ y: "110%", filter: "blur(12px)" }}
                animate={{ y: "0%", filter: "blur(0px)" }}
                transition={{ duration: 1, ease, delay: 0.5 + i * 0.12 }}
                className={`inline-block ${i === 2 ? "italic text-[var(--p-accent)]" : ""}`}
              >
                {w}
              </motion.span>
            </span>
          ))}
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8, ease }}
          className="mt-10 max-w-xl text-base md:text-lg text-white/60 leading-relaxed"
        >
          A multidisciplinary designer crafting brand systems, products, and digital
          experiences for studios who believe restraint is a form of luxury.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.4, duration: 0.8, ease }}
          className="mt-10 flex flex-col sm:flex-row gap-4"
        >
          <a
            href="#work"
            className="group inline-flex items-center gap-3 rounded-full bg-[var(--p-accent)] px-7 py-3.5 text-sm font-medium text-black transition-all hover:gap-4"
          >
            View selected work
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.03] px-7 py-3.5 text-sm font-medium text-white backdrop-blur-md transition-all hover:bg-white/[0.08] hover:border-white/30"
          >
            Start a project
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 1 }}
          className="absolute bottom-10 flex flex-col items-center gap-2 text-white/40"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
          <motion.div
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="w-4 h-4" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
