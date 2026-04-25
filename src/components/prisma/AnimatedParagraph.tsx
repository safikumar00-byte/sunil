import { useRef } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";

function AnimatedLetter({
  char,
  progress,
  range,
}: {
  char: string;
  progress: MotionValue<number>;
  range: [number, number];
}) {
  const opacity = useTransform(progress, range, [0.2, 1]);
  return <motion.span style={{ opacity }}>{char}</motion.span>;
}

export function AnimatedParagraph({ text, className = "" }: { text: string; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });
  const chars = Array.from(text);
  const total = chars.length;

  return (
    <p ref={ref} className={className}>
      {chars.map((c, i) => {
        const charProgress = i / total;
        return (
          <AnimatedLetter
            key={i}
            char={c}
            progress={scrollYProgress}
            range={[charProgress - 0.1, charProgress + 0.05]}
          />
        );
      })}
    </p>
  );
}
