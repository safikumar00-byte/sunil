import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";

const testimonials = [
  {
    quote:
      "With very little guidance team delivered designs that were consistently spot on. They understood our vision and ran with it.",
    name: "Marcus Anderson",
    role: "CEO, Data.storage",
    avatar: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    quote:
      "Viktor led the creation of our best fundraising deck to date! The work directly contributed to a successful round.",
    name: "alexwu",
    role: "Founder, Nexgate",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    quote: "Working with Viktor transformed our product vision into something tangible and beautifully crafted.",
    name: "James Mitchell",
    role: "VP Product, LaunchPad",
    avatar: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    quote: "The design quality exceeded our expectations and the process was effortless from start to finish.",
    name: "Rachel Foster",
    role: "Co-founder, Nexus Labs",
    avatar: "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
  {
    quote: "Incredible work from start to finish. The team is top-tier and the outcome speaks for itself.",
    name: "David Zhang",
    role: "Head of Design, Paradigm Labs",
    avatar: "https://images.pexels.com/photos/91227/pexels-photo-91227.jpeg?auto=compress&cs=tinysrgb&w=200",
  },
];

const tripled = [...testimonials, ...testimonials, ...testimonials];
const CARD_W = 427.5;
const GAP = 24;

export function TestimonialCarousel() {
  const { ref, inView } = useInViewAnimation<HTMLDivElement>();
  const [index, setIndex] = useState(testimonials.length);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    const t = setInterval(() => setIndex((i) => i + 1), 3000);
    return () => clearInterval(t);
  }, [paused]);

  // wrap-around
  useEffect(() => {
    if (index >= testimonials.length * 2) {
      const t = setTimeout(() => setIndex(testimonials.length), 800);
      return () => clearTimeout(t);
    }
    if (index < testimonials.length) {
      const t = setTimeout(() => setIndex(testimonials.length * 2 - 1), 800);
      return () => clearTimeout(t);
    }
  }, [index]);

  const trackRef = useRef<HTMLDivElement | null>(null);

  return (
    <section ref={ref} className="w-full py-20 overflow-hidden">
      <div className="md:max-w-4xl md:ml-auto px-6 mb-10 flex flex-col md:flex-row md:items-end md:justify-between gap-6">
        {inView && (
          <>
            <h2
              className="animate-fade-in-up text-[32px] md:text-[40px] lg:text-[44px] leading-[1.1] tracking-tight"
              style={{ color: "#0D212C", animationDelay: "0.1s" }}
            >
              What <span style={{ fontFamily: "PP Mondwest, serif" }}>builders</span> say
            </h2>
            <div
              className="animate-fade-in-up flex items-center gap-3"
              style={{ animationDelay: "0.2s" }}
            >
              <div className="flex">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Star key={i} className="w-5 h-5 fill-black text-black" />
                ))}
              </div>
              <span className="text-sm" style={{ color: "#0D212C" }}>Clutch 5/5</span>
            </div>
          </>
        )}
      </div>

      <div
        className="relative px-6"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div
          ref={trackRef}
          className="flex"
          style={{
            gap: `${GAP}px`,
            transform: `translateX(calc(50% - ${(CARD_W + GAP) * index + CARD_W / 2}px))`,
            transition: "transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)",
          }}
        >
          {tripled.map((t, i) => {
            const active = i === index;
            return (
              <div
                key={i}
                className="shrink-0 bg-white rounded-[32px] md:rounded-[40px] px-6 md:pl-10 md:pr-24 py-8"
                style={{
                  width: CARD_W,
                  maxWidth: "calc(100vw - 48px)",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.08)",
                  opacity: active ? 1 : 0.5,
                  transform: active ? "scale(1)" : "scale(0.95)",
                  transition: "opacity 0.8s, transform 0.8s",
                }}
              >
                <svg width="28" height="22" viewBox="0 0 28 22" fill="none" className="mb-4">
                  <path
                    d="M0 22V13.2C0 9.4 0.866 6.133 2.6 3.4 4.333 0.667 6.933-0.467 10.4 0L11.6 3.6C9.6 4 8.067 4.867 7 6.2 5.933 7.533 5.4 9.133 5.4 11H10V22H0ZM16 22V13.2C16 9.4 16.867 6.133 18.6 3.4 20.333 0.667 22.933-0.467 26.4 0L27.6 3.6C25.6 4 24.067 4.867 23 6.2 21.933 7.533 21.4 9.133 21.4 11H26V22H16Z"
                    fill="#0D212C"
                  />
                </svg>
                <p className="text-base leading-relaxed" style={{ color: "#0D212C" }}>
                  {t.quote}
                </p>
                <div className="flex items-center gap-3 mt-6">
                  <img src={t.avatar} alt={t.name} className="w-12 h-12 rounded-full object-cover" />
                  <div>
                    <div className="font-semibold text-sm" style={{ color: "#0D212C" }}>{t.name}</div>
                    <div className="text-sm" style={{ color: "#273C46" }}>→ {t.role}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex justify-center gap-3 mt-8">
          <button
            onClick={() => setIndex((i) => i - 1)}
            className="w-12 h-12 rounded-full border flex items-center justify-center"
            style={{ borderColor: "rgba(13,33,44,0.2)" }}
            aria-label="Previous"
          >
            <ChevronLeft className="w-5 h-5" style={{ color: "#0D212C" }} />
          </button>
          <button
            onClick={() => setIndex((i) => i + 1)}
            className="w-12 h-12 rounded-full border flex items-center justify-center"
            style={{ borderColor: "rgba(13,33,44,0.2)" }}
            aria-label="Next"
          >
            <ChevronRight className="w-5 h-5" style={{ color: "#0D212C" }} />
          </button>
        </div>
      </div>
    </section>
  );
}
