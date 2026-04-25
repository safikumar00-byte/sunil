import { motion, useInView, type Variants } from "framer-motion";
import { useRef, type ReactNode } from "react";

export const ease = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease } },
};

export const stagger: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};

export function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={fadeUp}
      transition={{ delay, duration: 0.8, ease }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function WordsReveal({
  text,
  className = "",
  italicWords = [],
}: {
  text: string;
  className?: string;
  italicWords?: string[];
}) {
  const ref = useRef<HTMLHeadingElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const words = text.split(" ");
  return (
    <h2
      ref={ref}
      className={className}
      style={{ display: "flex", flexWrap: "wrap", gap: "0.25em" }}
    >
      {words.map((w, i) => {
        const clean = w.replace(/[.,!?]/g, "");
        const isItalic = italicWords.includes(clean);
        return (
          <span key={i} style={{ overflow: "hidden", display: "inline-block" }}>
            <motion.span
              initial={{ y: "110%", opacity: 0 }}
              animate={inView ? { y: "0%", opacity: 1 } : {}}
              transition={{ duration: 0.8, ease, delay: i * 0.05 }}
              style={{ display: "inline-block" }}
              className={isItalic ? "italic font-serif text-[var(--p-accent)]" : ""}
            >
              {w}
            </motion.span>
          </span>
        );
      })}
    </h2>
  );
}

export function GlassCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`relative rounded-2xl border border-white/[0.08] bg-white/[0.03] backdrop-blur-xl transition-all duration-500 hover:border-white/[0.16] hover:bg-white/[0.05] hover:-translate-y-1 ${className}`}
      style={{
        boxShadow:
          "0 1px 0 0 rgba(255,255,255,0.05) inset, 0 30px 60px -30px rgba(0,0,0,0.6)",
      }}
    >
      {children}
    </div>
  );
}
