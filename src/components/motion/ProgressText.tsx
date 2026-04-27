import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { cn } from "@/lib/utils";

type ProgressTextProps = {
  className?: string;
  highlightClassName?: string;
  highlightedWords?: string[];
  mutedClassName?: string;
  text: string;
};

function ProgressWord({
  className,
  progress,
  range,
  word,
}: {
  className: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
  word: string;
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);

  return (
    <motion.span className={className} style={{ opacity }}>
      {word}
    </motion.span>
  );
}

export function ProgressText({
  className,
  highlightClassName = "text-foreground",
  highlightedWords = [],
  mutedClassName = "text-muted-foreground",
  text,
}: ProgressTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.85", "end 0.2"],
  });
  const words = text.split(" ");

  return (
    <p ref={ref} className={className}>
      {words.map((word, index) => {
        const start = index / words.length;
        const end = Math.min(start + 0.22, 1);
        const normalized = word.toLowerCase().replace(/[^a-z]/g, "");
        const isHighlighted = highlightedWords.includes(normalized);

        return (
          <ProgressWord
            key={`${word}-${index}`}
            className={cn(
              "inline-block pr-[0.28em]",
              isHighlighted ? highlightClassName : mutedClassName,
            )}
            progress={scrollYProgress}
            range={[start, end]}
            word={word}
          />
        );
      })}
    </p>
  );
}
