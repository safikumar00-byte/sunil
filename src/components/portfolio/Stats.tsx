import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Reveal } from "./shared";

function Counter({ to, suffix = "" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const start = performance.now();
    const duration = 1800;
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setN(Math.round(to * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, to]);

  return (
    <span ref={ref}>
      {n}
      {suffix}
    </span>
  );
}

const stats = [
  { v: 8, s: "+", label: "Years of practice" },
  { v: 64, s: "", label: "Brands shipped" },
  { v: 27, s: "", label: "Awards & features" },
  { v: 12, s: "", label: "Countries served" },
];

export function Stats() {
  return (
    <section className="relative px-6 py-32 md:py-40 border-t border-white/[0.06]">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.1}>
              <div className="text-center md:text-left">
                <p className="font-serif text-6xl md:text-8xl text-white tracking-[-0.04em] leading-none">
                  <Counter to={s.v} suffix={s.s} />
                </p>
                <p className="mt-4 text-xs uppercase tracking-[0.25em] text-white/45">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
