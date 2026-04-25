import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { WordsPullUpMultiStyle } from "./WordsPullUpMultiStyle";

interface FeatureCardProps {
  index: number;
  number: string;
  title: string;
  iconUrl: string;
  items: string[];
}

function FeatureCard({ index, number, title, iconUrl, items }: FeatureCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ scale: 0.95, opacity: 0 }}
      animate={inView ? { scale: 1, opacity: 1 } : {}}
      transition={{ duration: 0.7, delay: index * 0.15, ease: [0.22, 1, 0.36, 1] }}
      className="bg-[#212121] rounded-2xl p-5 md:p-6 flex flex-col h-full min-h-[420px]"
    >
      <img src={iconUrl} alt="" className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg object-cover" />
      <h3 className="mt-5 text-lg sm:text-xl font-medium" style={{ color: "#E1E0CC" }}>
        {title} <span className="text-gray-500 ml-1">{number}</span>
      </h3>
      <ul className="mt-5 space-y-3 flex-1">
        {items.map((it, i) => (
          <li key={i} className="flex gap-2 text-xs sm:text-sm text-gray-400">
            <Check className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
      <a href="#" className="mt-6 inline-flex items-center gap-1.5 text-xs sm:text-sm text-primary group">
        Learn more
        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" style={{ transform: "rotate(-45deg)" }} />
      </a>
    </motion.div>
  );
}

export function Features() {
  const videoCardRef = useRef<HTMLDivElement>(null);
  const videoInView = useInView(videoCardRef, { once: true, margin: "-100px" });

  return (
    <section className="relative min-h-screen bg-black py-20 md:py-32 px-4 md:px-6 overflow-hidden">
      <div className="absolute inset-0 bg-noise opacity-[0.15] pointer-events-none" />
      <div className="relative max-w-7xl mx-auto">
        <div className="text-center mb-12 md:mb-16">
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal leading-tight">
            <WordsPullUpMultiStyle
              segments={[
                { text: "Studio-grade workflows for visionary creators.", className: "" },
              ]}
              className=""
            />
          </div>
          <div className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal leading-tight mt-1" style={{ color: "#E1E0CC" }}>
            <WordsPullUpMultiStyle
              segments={[
                { text: "Built for pure vision. Powered by art.", className: "text-gray-500" },
              ]}
              delay={0.3}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 lg:h-[480px] gap-3 sm:gap-2 md:gap-1">
          <motion.div
            ref={videoCardRef}
            initial={{ scale: 0.95, opacity: 0 }}
            animate={videoInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0, ease: [0.22, 1, 0.36, 1] }}
            className="relative rounded-2xl overflow-hidden min-h-[420px] lg:min-h-0"
          >
            <video
              autoPlay
              loop
              muted
              playsInline
              className="absolute inset-0 w-full h-full object-cover"
              src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260406_133058_0504132a-0cf3-4450-a370-8ea3b05c95d4.mp4"
            />
            <div className="absolute bottom-0 left-0 right-0 p-5 md:p-6 bg-gradient-to-t from-black/70 to-transparent">
              <p className="text-base sm:text-lg font-medium" style={{ color: "#E1E0CC" }}>
                Your creative canvas.
              </p>
            </div>
          </motion.div>

          <FeatureCard
            index={1}
            number="01"
            title="Project Storyboard."
            iconUrl="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171918_4a5edc79-d78f-4637-ac8b-53c43c220606.png&w=1280&q=85"
            items={[
              "Drag-and-drop scene blocks",
              "Frame-by-frame shot planning",
              "Realtime collaborative editing",
              "Auto-sync to your timeline",
            ]}
          />
          <FeatureCard
            index={2}
            number="02"
            title="Smart Critiques."
            iconUrl="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171741_ed9845ab-f5b2-4018-8ce7-07cc01823522.png&w=1280&q=85"
            items={[
              "AI-powered scene analysis",
              "Creative notes from mentors",
              "Native tool integrations",
            ]}
          />
          <FeatureCard
            index={3}
            number="03"
            title="Immersion Capsule."
            iconUrl="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260405_171809_f56666dc-c099-4778-ad82-9ad4f209567b.png&w=1280&q=85"
            items={[
              "Notification silencing modes",
              "Curated ambient soundscapes",
              "Calendar & schedule syncing",
            ]}
          />
        </div>
      </div>
    </section>
  );
}
