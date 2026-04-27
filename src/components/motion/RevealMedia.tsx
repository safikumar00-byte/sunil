import { motion } from "framer-motion";
import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

type RevealMediaProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
};

export function RevealMedia({ children, className, delay = 0 }: RevealMediaProps) {
  return (
    <motion.div
      className={cn("overflow-hidden rounded-2xl", className)}
      initial={{ opacity: 0, scale: 1.08, clipPath: "inset(22% 22% 22% 22% round 1.5rem)" }}
      transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
      viewport={{ once: true, margin: "-100px" }}
      whileInView={{ opacity: 1, scale: 1, clipPath: "inset(0% 0% 0% 0% round 1.5rem)" }}
    >
      {children}
    </motion.div>
  );
}
