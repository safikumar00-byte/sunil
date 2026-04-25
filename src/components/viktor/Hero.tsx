import { VButton } from "./Button";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";

export function VHero() {
  const { ref, inView } = useInViewAnimation<HTMLDivElement>();
  return (
    <section ref={ref} className="max-w-[440px] mx-auto px-6 pt-12 md:pt-16 text-center">
      {inView && (
        <>
          <h1
            className="animate-fade-in-up text-[32px] md:text-[40px] lg:text-[44px] font-semibold tracking-tight mb-4"
            style={{ color: "#051A24", fontFamily: "PP Mondwest, serif", animationDelay: "0.1s" }}
          >
            Viktor Oddy
          </h1>
          <p
            className="animate-fade-in-up font-mono text-xs md:text-sm mb-2"
            style={{ color: "#051A24", animationDelay: "0.2s" }}
          >
            The creative studio of Viktor Oddy
          </p>
          <h2
            className="animate-fade-in-up text-[32px] md:text-[40px] lg:text-[44px] leading-[1.1] tracking-tight whitespace-nowrap"
            style={{ color: "#0D212C", animationDelay: "0.3s" }}
          >
            Build the <span style={{ fontFamily: "PP Mondwest, serif" }}>next wave,</span>
            <br />
            the <span style={{ fontFamily: "PP Mondwest, serif" }}>bold way.</span>
          </h2>
          <div
            className="animate-fade-in-up flex flex-col gap-6 mt-5 md:mt-6 text-sm md:text-base leading-relaxed text-left"
            style={{ color: "#051A24", animationDelay: "0.4s" }}
          >
            <p>
              I spent seven years at Apple crafting products used by over a billion people. I founded
              Vortex Studio to bring that same level of thinking to innovators shaping what comes next.
            </p>
            <p>
              The studio is deliberately small. I guide the creative vision on every project, backed by a
              veteran design crew that moves fast without cutting corners.
            </p>
            <p>Projects start at $5,000 per month.</p>
          </div>
          <div
            className="animate-fade-in-up flex flex-col sm:flex-row gap-3 md:gap-4 mt-5 md:mt-6 justify-center"
            style={{ animationDelay: "0.5s" }}
          >
            <VButton variant="primary">Start a chat</VButton>
            <VButton variant="secondary">View projects</VButton>
          </div>
        </>
      )}
    </section>
  );
}
