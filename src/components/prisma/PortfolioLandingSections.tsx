import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Hls from "hls.js";

import { PrismaActionButton } from "@/components/prisma/shared/PrismaActionButton";

const HERO_HLS = "https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8";

const projectImages = [
  "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1558655146-9f40138edfeb?auto=format&fit=crop&w=1200&q=85",
];

const journalImages = [
  "https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=400&q=80",
  "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=400&q=80",
];

const galleryImages = [
  "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=700&q=80",
  "https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=700&q=80",
];

function HlsVideo({
  className = "",
  flipped = false,
  src = HERO_HLS,
}: {
  className?: string;
  flipped?: boolean;
  src?: string;
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
      className={`absolute left-1/2 top-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover ${
        flipped ? "scale-y-[-1]" : ""
      } ${className}`}
      loop
      muted
      playsInline
    />
  );
}

function PortfolioHero() {
  const rootRef = useRef<HTMLElement>(null);
  const roles = ["Creative", "Fullstack", "Founder", "Scholar"];
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = window.setInterval(() => {
      setRoleIndex((index) => (index + 1) % roles.length);
    }, 2000);

    return () => window.clearInterval(interval);
  }, [roles.length]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({ ease: "power3.out" })
        .from(".name-reveal", { opacity: 0, y: 50, duration: 1.2, delay: 0.1 })
        .from(
          ".blur-in",
          {
            opacity: 0,
            filter: "blur(10px)",
            y: 20,
            duration: 1,
            stagger: 0.1,
          },
          0.3,
        );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="portfolio-hero"
      ref={rootRef}
      className="relative flex min-h-screen items-center justify-center overflow-hidden bg-bg px-6 pt-24 text-center"
    >
      <HlsVideo />
      <div className="absolute inset-0 bg-black/30" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-bg to-transparent" />

      <div className="relative z-10 mx-auto max-w-4xl">
        <p className="blur-in mb-8 text-xs uppercase tracking-[0.3em] text-muted">COLLECTION 26</p>
        <h2 className="name-reveal mb-6 text-6xl italic leading-[0.9] tracking-tight text-text-primary font-display md:text-8xl lg:text-9xl">
          Michael Smith
        </h2>
        <p className="blur-in mb-5 text-base text-text-primary md:text-xl">
          A{" "}
          <span key={roleIndex} className="inline-block animate-role-fade-in italic font-display">
            {roles[roleIndex]}
          </span>{" "}
          lives in Chicago.
        </p>
        <p className="blur-in mx-auto mb-12 max-w-md text-sm text-muted md:text-base">
          Designing seamless digital interactions by focusing on the unique nuances which bring
          systems to life.
        </p>
        <div className="blur-in inline-flex flex-wrap justify-center gap-4">
          <PrismaActionButton href="#portfolio-work" intent="primary">
            See Works
          </PrismaActionButton>
          <PrismaActionButton href="#portfolio-contact" intent="secondary">
            Reach out...
          </PrismaActionButton>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-muted">SCROLL</p>
        <div className="mx-auto h-10 w-px overflow-hidden bg-stroke">
          <div className="h-1/2 w-px bg-text-primary animate-scroll-down" />
        </div>
      </div>
    </section>
  );
}

function SectionHeader({
  action,
  eyebrow,
  subtext,
  title,
}: {
  action: string;
  eyebrow: string;
  subtext: string;
  title: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      className="mb-10 flex items-end justify-between gap-8 md:mb-14"
      initial={{ opacity: 0, y: 30 }}
      transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div>
        <div className="mb-5 flex items-center gap-4">
          <span className="h-px w-8 bg-stroke" />
          <span className="text-xs uppercase tracking-[0.3em] text-muted">{eyebrow}</span>
        </div>
        <h2 className="text-4xl tracking-tight text-text-primary md:text-6xl">{title}</h2>
        <p className="mt-4 max-w-md text-sm text-muted">{subtext}</p>
      </div>
      <PrismaActionButton href="#" intent="secondary">
        <span className="hidden items-center gap-2 md:inline-flex">
          {action} {"->"}
        </span>
      </PrismaActionButton>
    </motion.div>
  );
}

function SelectedWorks() {
  const projects = [
    "Automotive Motion",
    "Urban Architecture",
    "Human Perspective",
    "Brand Identity",
  ];
  const spans = ["md:col-span-7", "md:col-span-5", "md:col-span-5", "md:col-span-7"];
  const aspects = ["aspect-[1.15/1]", "aspect-square", "aspect-square", "aspect-[1.15/1]"];

  return (
    <section id="portfolio-work" className="bg-bg py-12 md:py-16">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <SectionHeader
          action="View all work"
          eyebrow="Selected Work"
          subtext="A selection of projects I've worked on, from concept to launch."
          title={
            <>
              Featured <span className="italic font-display">projects</span>
            </>
          }
        />

        <div className="grid grid-cols-1 gap-5 md:grid-cols-12 md:gap-6">
          {projects.map((title, index) => (
            <article
              key={title}
              className={`group relative overflow-hidden rounded-3xl border border-stroke bg-surface ${spans[index]} ${aspects[index]}`}
            >
              <img
                alt=""
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                src={projectImages[index]}
              />
              <div className="absolute inset-0 opacity-20 mix-blend-multiply [background-image:radial-gradient(circle,_#000_1px,_transparent_1px)] [background-size:4px_4px]" />
              <div className="absolute inset-0 flex items-center justify-center bg-bg/70 opacity-0 backdrop-blur-lg transition-opacity duration-500 group-hover:opacity-100">
                <span className="rounded-full border border-white/15 bg-black/80 px-5 py-2 text-sm text-white">
                  View {"-"} <span className="italic font-display">{title}</span>
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Journal() {
  const entries = [
    ["Designing for rhythm, not screens", "8 min", "Mar 14"],
    ["When systems start to breathe", "6 min", "Apr 02"],
    ["A field note on creative velocity", "5 min", "Apr 18"],
    ["The quiet value of useful polish", "9 min", "May 01"],
  ];

  return (
    <section className="bg-bg py-16 md:py-24">
      <div className="mx-auto max-w-[1200px] px-6 md:px-10 lg:px-16">
        <SectionHeader
          action="View all"
          eyebrow="Journal"
          subtext="Notes on design practice, product craft, and building meaningful interfaces."
          title={
            <>
              Recent <span className="italic font-display">thoughts</span>
            </>
          }
        />

        <div className="space-y-4">
          {entries.map(([title, readTime, date], index) => (
            <a
              key={title}
              className="flex items-center gap-6 rounded-[40px] border border-stroke bg-surface/30 p-4 transition-colors hover:bg-surface sm:rounded-full"
              href="#"
            >
              <img
                alt=""
                className="h-16 w-16 rounded-full object-cover"
                src={journalImages[index]}
              />
              <div className="min-w-0 flex-1">
                <h3 className="truncate text-base text-text-primary md:text-xl">{title}</h3>
                <p className="mt-1 text-xs text-muted">
                  {readTime} read · {date}
                </p>
              </div>
              <span className="hidden text-xl text-muted sm:block">{"->"}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function Explorations() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLButtonElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (contentRef.current) {
        ScrollTrigger.create({
          trigger: sectionRef.current,
          start: "top top",
          end: "bottom bottom",
          pin: contentRef.current,
          pinSpacing: false,
        });
      }

      cardRefs.current.forEach((card, index) => {
        gsap.to(card, {
          ease: "none",
          rotate: index % 2 === 0 ? -8 : 8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
          y: index % 2 === 0 ? -180 : 180,
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-[300vh] overflow-hidden bg-bg">
      <div
        ref={contentRef}
        className="relative z-10 flex h-screen items-center justify-center px-6 text-center"
      >
        <div className="max-w-xl">
          <p className="mb-5 text-xs uppercase tracking-[0.3em] text-muted">Explorations</p>
          <h2 className="text-5xl tracking-tight text-text-primary md:text-7xl">
            Visual <span className="italic font-display">playground</span>
          </h2>
          <p className="mx-auto mt-5 max-w-md text-sm text-muted">
            Fragments, studies, and motion experiments collected between client work.
          </p>
          <div className="mt-8">
            <PrismaActionButton href="#" intent="secondary">
              {"Dribbble ->"}
            </PrismaActionButton>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 z-20 mx-auto grid max-w-[1400px] grid-cols-2 gap-12 px-8 py-[35vh] md:gap-40">
        {galleryImages.map((image, index) => (
          <button
            key={image}
            ref={(node) => {
              if (node) {
                cardRefs.current[index] = node;
              }
            }}
            className={`aspect-square w-full max-w-[320px] overflow-hidden rounded-3xl border border-stroke bg-surface shadow-2xl shadow-black/40 ${
              index % 2 === 0 ? "justify-self-start" : "mt-32 justify-self-end"
            }`}
            onClick={() => window.open(image, "_blank", "noopener,noreferrer")}
            style={{ rotate: index % 2 === 0 ? "-4deg" : "4deg" }}
          >
            <img alt="" className="h-full w-full object-cover" src={image} />
          </button>
        ))}
      </div>
    </section>
  );
}

function Stats() {
  const stats = [
    ["20+", "Years Experience"],
    ["95+", "Projects Done"],
    ["200%", "Satisfied Clients"],
  ];

  return (
    <section id="portfolio-stats" className="bg-bg py-16 md:py-24">
      <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-6 px-6 md:grid-cols-3 md:px-10 lg:px-16">
        {stats.map(([value, label]) => (
          <div key={label} className="rounded-3xl border border-stroke bg-surface p-8 text-center">
            <div className="text-5xl italic text-text-primary font-display md:text-7xl">
              {value}
            </div>
            <div className="mt-3 text-sm text-muted">{label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function ContactFooter() {
  const marqueeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.to(marqueeRef.current, {
        duration: 40,
        ease: "none",
        repeat: -1,
        xPercent: -50,
      });
    }, marqueeRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="portfolio-contact"
      className="relative overflow-hidden bg-bg pb-8 pt-16 md:pb-12 md:pt-20"
    >
      <HlsVideo flipped />
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 overflow-hidden py-8">
        <div
          ref={marqueeRef}
          className="flex w-max whitespace-nowrap text-6xl text-text-primary/10 md:text-8xl"
        >
          {Array.from({ length: 10 }).map((_, index) => (
            <span key={index} className="mr-8">
              BUILDING THE FUTURE ���
            </span>
          ))}
        </div>
      </div>

      <div className="relative z-10 mx-auto max-w-[1200px] px-6 text-center md:px-10 lg:px-16">
        <h2 className="text-5xl tracking-tight text-text-primary md:text-7xl">
          Let&apos;s build something <span className="italic font-display">alive</span>.
        </h2>
        <div className="mt-8">
          <PrismaActionButton href="mailto:hello@michaelsmith.com" intent="primary">
            hello@michaelsmith.com
          </PrismaActionButton>
        </div>

        <footer className="mt-24 flex flex-col items-center justify-between gap-6 border-t border-stroke pt-8 md:flex-row">
          <div className="flex gap-5 text-sm text-muted">
            {["Twitter", "LinkedIn", "Dribbble", "GitHub"].map((link) => (
              <a key={link} href="#" className="hover:text-text-primary">
                {link}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm text-muted">
            <span className="h-2 w-2 animate-pulse rounded-full bg-white/75" />
            Available for projects
          </div>
        </footer>
      </div>
    </section>
  );
}

export function PortfolioLandingSections() {
  return (
    <div className="portfolio-landing bg-bg text-text-primary font-body">
      <PortfolioHero />
      <SelectedWorks />
      <Journal />
      <Explorations />
      <Stats />
      <ContactFooter />
    </div>
  );
}
