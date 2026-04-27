import { motion } from "framer-motion";
import type { ElementType, ReactNode } from "react";

import { cn } from "@/lib/utils";

type SplitBy = "char" | "word";

type SplitTextProps<T extends ElementType> = {
  as?: T;
  className?: string;
  delay?: number;
  once?: boolean;
  splitBy?: SplitBy;
  text: string;
};

export function SplitText<T extends ElementType = "div">({
  as,
  className,
  delay = 0,
  once = true,
  splitBy = "word",
  text,
}: SplitTextProps<T>) {
  const Component = (as ?? "div") as ElementType;
  const segments = splitBy === "char" ? Array.from(text) : text.split(" ");

  return (
    <Component className={cn("overflow-hidden", className)}>
      <span className="flex flex-wrap">
        {segments.map((segment, index) => {
          const content = splitBy === "char" ? segment : `${segment}\u00A0`;
          const isWhitespaceChar = splitBy === "char" && /^\s$/.test(segment);

          return (
            <span key={`${segment}-${index}`} className="overflow-hidden">
              <motion.span
                className={cn(
                  "inline-block will-change-transform",
                  isWhitespaceChar && "w-[0.3em]",
                )}
                initial={{ opacity: 0, y: "110%" }}
                transition={{
                  delay: delay + index * (splitBy === "char" ? 0.018 : 0.06),
                  duration: 0.72,
                  ease: [0.16, 1, 0.3, 1],
                }}
                viewport={{ once, margin: "-100px" }}
                whileInView={{ opacity: 1, y: 0 }}
              >
                {isWhitespaceChar ? "\u00A0" : (content as ReactNode)}
              </motion.span>
            </span>
          );
        })}
      </span>
    </Component>
  );
}
