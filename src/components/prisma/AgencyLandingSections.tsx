import { useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import Hls from "hls.js";
import { ArrowUpRight, BarChart3, Palette, Play, Shield, Zap } from "lucide-react";
import featureOne from "@/assets/feature-1.gif";
import featureTwo from "@/assets/feature-2.gif";
import { PrismaActionButton } from "@/components/prisma/shared/PrismaActionButton";

const START_VIDEO = "https://stream.mux.com/9JXDljEVWYwWu01PUkAemafDugK89o01BR6zqJ3aS9u00A.m3u8";
const STATS_VIDEO = "https://stream.mux.com/NcU3HlHeF7CUL86azTTzpy3Tlb00d6iF3BmCdFslMJYM.m3u8";
const CTA_VIDEO = "https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8";

function HlsBackgroundVideo({
  className = "",
  desaturated = false,
  src,
}: {
  className?: string;
  desaturated?: boolean;
  src: string;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return undefined;
    }

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      return undefined;
    }

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);

      return () => hls.destroy();
    }

    video.src = src;
    return undefined;
  }, [src]);

  return (
    <video
      ref={videoRef}
      autoPlay
      loop
      muted
      playsInline
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
      style={{ filter: desaturated ? "saturate(0)" : undefined }}
    />
  );
}

function VideoFades({ tallBottom = false }: { tallBottom?: boolean }) {
  return (
    <>
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[200px] bg-gradient-to-b from-black to-transparent" />
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-black to-transparent ${
          tallBottom ? "h-[300px]" : "h-[200px]"
        }`}
      />
    </>
  );
}

function SectionBadge({ children }: { children: React.ReactNode }) {
  return (
    <span className="liquid-glass inline-flex rounded-full px-3.5 py-1 text-xs font-medium text-white font-body">
      {children}
    </span>
  );
}

function PrimaryButton({ children }: { children: React.ReactNode }) {
  return (
    <PrismaActionButton href="#" icon intent="secondary">
      {children}
    </PrismaActionButton>
  );
}

function SectionHeader({ badge, title }: { badge: string; title: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ filter: "blur(10px)", opacity: 0, y: 24 }}
      animate={inView ? { filter: "blur(0px)", opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="mx-auto mb-12 max-w-3xl text-center md:mb-16"
    >
      <SectionBadge>{badge}</SectionBadge>
      <h2 className="mt-6 text-4xl italic leading-[0.9] tracking-tight text-white font-heading md:text-5xl lg:text-6xl">
        {title}
      </h2>
    </motion.div>
  );
}

function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ filter: "blur(10px)", opacity: 0, y: 28 }}
      animate={inView ? { filter: "blur(0px)", opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function StartSection() {
  return (
    <section
      id="prisma-studio"
      className="relative min-h-[500px] overflow-hidden bg-black px-4 py-24 md:px-8"
    >
      <HlsBackgroundVideo src={START_VIDEO} />
      <VideoFades />

      <div className="relative z-10 mx-auto flex min-h-[500px] max-w-4xl flex-col items-center justify-center text-center">
        <Reveal>
          <SectionBadge>How It Works</SectionBadge>
          <h2 className="mt-6 text-4xl italic leading-[0.9] tracking-tight text-white font-heading md:text-5xl lg:text-6xl">
            You dream it. We ship it.
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-sm font-light leading-tight text-white/60 font-body md:text-base">
            Share your vision. Our AI handles the rest--wireframes, design, code, launch. All in
            days, not quarters.
          </p>
          <div className="mt-8">
            <PrimaryButton>Get Started</PrimaryButton>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const chessRows = [
  {
    body: "Every pixel is intentional. Our AI studies what works across thousands of top sites--then builds yours to outperform them all.",
    button: "Learn more",
    image: featureOne,
    reverse: false,
    title: "Designed to convert. Built to perform.",
  },
  {
    body: "Your site evolves on its own. AI monitors every click, scroll, and conversion--then optimizes in real time. No manual updates. Ever.",
    button: "See how it works",
    image: featureTwo,
    reverse: true,
    title: "It gets smarter. Automatically.",
  },
];

export function FeaturesChess() {
  return (
    <section className="bg-black px-4 py-24 md:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeader badge="Capabilities" title="Pro features. Zero complexity." />

        <div className="space-y-8 md:space-y-12">
          {chessRows.map((row, index) => (
            <Reveal key={row.title} delay={index * 0.08}>
              <div
                className={`flex flex-col items-center gap-8 md:gap-12 ${
                  row.reverse ? "lg:flex-row-reverse" : "lg:flex-row"
                }`}
              >
                <div className="flex-1">
                  <h3 className="max-w-xl text-4xl italic leading-[0.9] tracking-tight text-white font-heading md:text-5xl">
                    {row.title}
                  </h3>
                  <p className="mt-5 max-w-xl text-sm font-light leading-snug text-white/60 font-body md:text-base">
                    {row.body}
                  </p>
                  <div className="mt-8">
                    <PrimaryButton>{row.button}</PrimaryButton>
                  </div>
                </div>

                <div className="liquid-glass flex-1 overflow-hidden rounded-2xl p-2">
                  <img
                    src={row.image}
                    alt=""
                    className="aspect-video h-full w-full rounded-[1rem] object-cover"
                  />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

const whyUsCards = [
  {
    body: "Concept to launch at a pace that redefines fast. Because waiting isn't a strategy.",
    icon: Zap,
    title: "Days, Not Months",
  },
  {
    body: "Every detail considered. Every element refined. Design so precise, it feels inevitable.",
    icon: Palette,
    title: "Obsessively Crafted",
  },
  {
    body: "Layouts informed by data. Decisions backed by performance. Results you can measure.",
    icon: BarChart3,
    title: "Built to Convert",
  },
  {
    body: "Enterprise-grade protection comes standard. SSL, DDoS mitigation, compliance. All included.",
    icon: Shield,
    title: "Secure by Default",
  },
];

export function FeaturesGrid() {
  return (
    <section className="bg-black px-4 py-24 md:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeader badge="Why Us" title="The difference is everything." />

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {whyUsCards.map((card, index) => {
            const Icon = card.icon;

            return (
              <Reveal key={card.title} delay={index * 0.08}>
                <article className="liquid-glass flex min-h-[280px] flex-col rounded-2xl p-6">
                  <div className="liquid-glass-strong flex h-10 w-10 items-center justify-center rounded-full">
                    <Icon className="h-5 w-5 text-white" />
                  </div>
                  <div className="flex-1" />
                  <h3 className="text-2xl italic leading-none tracking-tight text-white font-heading">
                    {card.title}
                  </h3>
                  <p className="mt-4 text-sm font-light leading-snug text-white/60 font-body">
                    {card.body}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const stats = [
  ["200+", "Sites launched"],
  ["98%", "Client satisfaction"],
  ["3.2x", "More conversions"],
  ["5 days", "Average delivery"],
];

export function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-black px-4 py-28 md:px-8 lg:py-36">
      <HlsBackgroundVideo src={STATS_VIDEO} desaturated />
      <VideoFades />

      <div className="relative z-10 mx-auto max-w-7xl">
        <Reveal>
          <div className="liquid-glass rounded-3xl p-8 md:p-12 lg:p-16">
            <div className="grid grid-cols-2 gap-8 lg:grid-cols-4">
              {stats.map(([value, label]) => (
                <div key={label} className="text-center">
                  <div className="text-4xl italic leading-none text-white font-heading md:text-5xl lg:text-6xl">
                    {value}
                  </div>
                  <div className="mt-3 text-sm font-light text-white/60 font-body">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

const testimonials = [
  {
    name: "Sarah Chen",
    quote:
      "A complete rebuild in five days. The result outperformed everything we'd spent months building before.",
    role: "CEO, Luminary",
  },
  {
    name: "Marcus Webb",
    quote:
      "Conversions up 4x. That's not a typo. The design just works differently when it's built on real data.",
    role: "Head of Growth, Arcline",
  },
  {
    name: "Elena Voss",
    quote:
      "They didn't just design our site. They defined our brand. World-class doesn't begin to cover it.",
    role: "Brand Director, Helix",
  },
];

export function TestimonialsSection() {
  return (
    <section className="bg-black px-4 py-24 md:px-8 lg:py-32">
      <div className="mx-auto max-w-7xl">
        <SectionHeader badge="What They Say" title="Don't take our word for it." />

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={index * 0.08}>
              <article className="liquid-glass flex min-h-[260px] flex-col rounded-2xl p-8">
                <p className="text-sm italic leading-relaxed text-white/80 font-body">
                  "{testimonial.quote}"
                </p>
                <div className="flex-1" />
                <div className="mt-8">
                  <div className="text-sm font-medium text-white font-body">{testimonial.name}</div>
                  <div className="mt-1 text-xs font-light text-white/50 font-body">
                    {testimonial.role}
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export function CtaFooter() {
  return (
    <section className="relative overflow-hidden bg-black px-4 py-28 md:px-8 lg:py-36">
      <HlsBackgroundVideo src={CTA_VIDEO} />
      <VideoFades />

      <div className="relative z-10 mx-auto max-w-7xl text-center">
        <Reveal>
          <h2 className="mx-auto max-w-4xl text-5xl italic leading-[0.85] tracking-tight text-white font-heading md:text-6xl lg:text-7xl">
            Your next website starts here.
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-sm font-light leading-tight text-white/60 font-body md:text-base">
            Book a free strategy call. See what AI-powered design can do. No commitment, no
            pressure. Just possibilities.
          </p>
          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <PrimaryButton>Book a Call</PrimaryButton>
            <a
              href="#"
              className="rounded-full bg-white px-6 py-3 text-sm font-medium text-black font-body"
            >
              View Pricing
            </a>
          </div>
        </Reveal>

        <footer className="mt-32 flex flex-col items-center justify-between gap-5 border-t border-white/10 pt-8 md:flex-row">
          <p className="text-xs text-white/40 font-body">(c) 2026 Studio. All rights reserved.</p>
          <div className="flex items-center gap-6">
            {["Privacy", "Terms", "Contact"].map((link) => (
              <a key={link} href="#" className="text-xs text-white/40 font-body">
                {link}
              </a>
            ))}
          </div>
        </footer>
      </div>
    </section>
  );
}

export function AgencyLandingSections() {
  return (
    <div className="bg-black">
      <StartSection />
      <FeaturesChess />
      <FeaturesGrid />
      <StatsSection />
      <TestimonialsSection />
      <CtaFooter />
    </div>
  );
}
