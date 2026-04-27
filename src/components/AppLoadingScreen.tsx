import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface LoadingScreenProps {
  onComplete: () => void;
}

const words = ["Design", "Create", "Inspire"];

export function LoadingScreen({ onComplete }: LoadingScreenProps) {
  const [progress, setProgress] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const onCompleteRef = useRef(onComplete);

  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    let animationFrame = 0;
    let completeTimer = 0;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const nextProgress = Math.min((elapsed / 2700) * 100, 100);

      setProgress(nextProgress);

      if (nextProgress < 100) {
        animationFrame = requestAnimationFrame(tick);
      } else {
        completeTimer = window.setTimeout(() => {
          onCompleteRef.current();
        }, 400);
      }
    };

    animationFrame = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(animationFrame);

      if (completeTimer) {
        window.clearTimeout(completeTimer);
      }
    };
  }, []);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setWordIndex((current) => {
        if (current >= words.length - 1) {
          window.clearInterval(interval);
          return current;
        }

        return current + 1;
      });
    }, 900);

    return () => window.clearInterval(interval);
  }, []);

  return (
    <motion.div
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className="fixed inset-0 z-[9999] bg-background text-foreground"
    >
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="absolute left-8 top-8 text-xs uppercase tracking-[0.3em] text-muted-foreground md:left-12 md:top-12 md:text-sm"
      >
        Prisma
      </motion.div>

      <div className="absolute inset-0 flex items-center justify-center">
        <AnimatePresence mode="wait">
          <motion.span
            key={wordIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="font-display text-4xl italic text-foreground/80 md:text-6xl lg:text-7xl"
          >
            {words[wordIndex]}
          </motion.span>
        </AnimatePresence>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="absolute bottom-8 right-8 font-display text-6xl tabular-nums text-foreground md:bottom-12 md:right-12 md:text-8xl lg:text-9xl"
      >
        {Math.round(progress).toString().padStart(3, "0")}
      </motion.div>

      <div className="absolute bottom-0 left-0 right-0 h-[3px] bg-white/10">
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: progress / 100 }}
          transition={{ duration: 0.1, ease: "linear" }}
          className="h-full origin-left bg-foreground"
        />
      </div>
    </motion.div>
  );
}
