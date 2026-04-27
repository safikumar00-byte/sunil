import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { PrismaActionButton } from "@/components/prisma/shared/PrismaActionButton";
import { WordsPullUp } from "./WordsPullUp";

export function Hero() {
  return (
    <section id="prisma-hero" className="h-screen w-full bg-black p-4 pt-24 md:p-6 md:pt-28">
      <div className="relative h-full w-full rounded-2xl md:rounded-[2rem] overflow-hidden">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
        />
        <div className="absolute inset-0 noise-overlay opacity-[0.7] mix-blend-overlay pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 pointer-events-none" />

        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-10 pb-4 md:pb-6 z-10">
          <div className="grid grid-cols-12 gap-4 items-end">
            <div className="col-span-12 lg:col-span-8">
              <h3
                className="font-medium leading-[0.85] tracking-[-0.07em] text-[4vw] sm:text-[4vw] md:text-[4vw] lg:text-[4vw] xl:text-[4vw] 2xl:text-[4vw]"
                style={{ color: "hsl(var(--foreground))" }}
              >
                <WordsPullUp text="Hi, This is" />
              </h3>
              <h3
                className="font-medium leading-[0.85] tracking-[-0.07em] text-[16vw] sm:text-[16vw] md:text-[16vw] lg:text-[16vw] xl:text-[16vw] 2xl:text-[16vw]"
                style={{ color: "hsl(var(--foreground))" }}
              >
                <WordsPullUp text="SUNIL" showAsterisk />
              </h3>
            </div>
            <div className="col-span-12 lg:col-span-4 flex flex-col gap-5 lg:pb-8">
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="text-muted-foreground text-xs sm:text-sm md:text-base"
                style={{ lineHeight: 1.2 }}
              >
                Prisma is a worldwide network of visual artists, filmmakers and storytellers bound
                not by place, status or labels but by passion and hunger to unlock potential through
                our unique perspectives.
              </motion.p>
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
              >
                <PrismaActionButton className="pl-5 pr-1.5" href="#prisma-about" intent="primary">
                  <span className="inline-flex items-center gap-3">
                    Join the lab
                    <span className="flex h-9 w-9 items-center justify-center rounded-full bg-black text-white sm:h-10 sm:w-10">
                      <ArrowRight className="w-4 h-4" />
                    </span>
                  </span>
                </PrismaActionButton>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
