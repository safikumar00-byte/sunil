import { useEffect, useRef, useState } from "react";
import { Quote } from "lucide-react";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";

export function TestimonialSection() {
  const { ref, inView } = useInViewAnimation<HTMLDivElement>();
  const imgWrapRef = useRef<HTMLDivElement | null>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(() => {
        raf = 0;
        const el = imgWrapRef.current;
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;
        const progress = Math.max(0, Math.min(1, 1 - rect.top / vh));
        setOffset(Math.min(200, progress * 200));
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <section ref={ref} className="py-12 px-6 max-w-2xl mx-auto text-center">
      {inView && (
        <>
          <div className="animate-fade-in-up flex justify-center" style={{ animationDelay: "0.1s" }}>
            <Quote className="w-6 h-6 text-slate-900" />
          </div>
          <h2
            className="animate-fade-in-up mt-4 text-[32px] md:text-[40px] lg:text-[44px] leading-[1.1] tracking-tight"
            style={{ color: "#0D212C", animationDelay: "0.2s" }}
          >
            I left <span style={{ fontFamily: "PP Mondwest, serif" }}>Apple</span> to build the studio I always wanted to work with
          </h2>
          <p
            className="animate-fade-in-up mt-6 italic text-sm"
            style={{ color: "#273C46", animationDelay: "0.3s" }}
          >
            Viktor Oddy
          </p>
          <div
            className="animate-fade-in-up mt-8 flex items-center justify-center gap-8 flex-wrap"
            style={{ animationDelay: "0.4s" }}
          >
            <span className="text-slate-900 font-medium" style={{ fontSize: 24, width: 80 }}>Apple</span>
            <span className="text-slate-900 font-medium" style={{ fontSize: 24, width: 83 }}>IDEO</span>
            <span className="text-slate-900 font-medium" style={{ fontSize: 24, width: 110 }}>Polygon</span>
          </div>
          <div
            ref={imgWrapRef}
            className="animate-fade-in-up mt-12 flex justify-center"
            style={{ animationDelay: "0.5s" }}
          >
            <img
              src="https://images.higgs.ai/?default=1&output=webp&url=https%3A%2F%2Fd8j0ntlcm91z4.cloudfront.net%2Fuser_38xzZboKViGWJOttwIXH07lWA1P%2Fhf_20260330_103804_7aa5494f-4d5b-432e-9dc7-20715275f143.png&w=1280&q=85"
              alt="Chris Halaska"
              className="w-full max-w-xs rounded-2xl shadow-lg"
              style={{ transform: `translateY(${-offset * 0.2}px)`, transition: "transform 0.1s linear" }}
            />
          </div>
        </>
      )}
    </section>
  );
}
