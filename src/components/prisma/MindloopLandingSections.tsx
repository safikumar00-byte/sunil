import { useEffect, useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, type MotionValue } from "framer-motion";
import Hls from "hls.js";
import { Instagram, Linkedin, Twitter } from "lucide-react";

import avatar1 from "@/assets/avatar-1.png";
import avatar2 from "@/assets/avatar-2.png";
import avatar3 from "@/assets/avatar-3.png";
import chatgptIcon from "@/assets/icon-chatgpt.png";
import googleIcon from "@/assets/icon-google.png";
import perplexityIcon from "@/assets/icon-perplexity.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fadeUp } from "@/lib/motion";
import { cn } from "@/lib/utils";

const HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_120549_0cd82c36-56b3-4dd9-b190-069cfc3a623f.mp4";
const MISSION_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_132944_a0d124bb-eaa1-4082-aa30-2310efb42b4b.mp4";
const SOLUTION_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260325_125119_8e5ae31c-0021-4396-bc08-f7aebeb877a2.mp4";
const CTA_HLS = "https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8";

const navLinks = [
  { href: "#mindloop-home", label: "Home" },
  { href: "#mindloop-how-it-works", label: "How It Works" },
  { href: "#mindloop-philosophy", label: "Philosophy" },
  { href: "#mindloop-use-cases", label: "Use Cases" },
];

const socialLinks = [
  { href: "https://instagram.com", icon: Instagram, label: "Instagram" },
  { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
  { href: "https://twitter.com", icon: Twitter, label: "Twitter" },
];

const platformCards = [
  {
    description:
      "Shape how your ideas appear in conversational search and become the answer users trust.",
    icon: chatgptIcon,
    name: "ChatGPT",
  },
  {
    description:
      "Show up where intent is active, context matters, and fast synthesis wins attention.",
    icon: perplexityIcon,
    name: "Perplexity",
  },
  {
    description:
      "Stay visible across AI overviews and discovery flows where search behavior keeps shifting.",
    icon: googleIcon,
    name: "Google AI",
  },
];

const solutionFeatures = [
  {
    description: "A cleaner signal layer for readers, tuned for substance over volume.",
    title: "Curated Feed",
  },
  {
    description: "Publishing workflows that help writers shape, package, and refine each issue.",
    title: "Writer Tools",
  },
  {
    description: "A place for replies, recommendations, and shared context to keep ideas moving.",
    title: "Community",
  },
  {
    description:
      "Distribution built for newsletters, social sharing, and ongoing reader discovery.",
    title: "Distribution",
  },
];

function ConcentricLogo({
  className,
  innerClassName,
}: {
  className?: string;
  innerClassName?: string;
}) {
  return (
    <div
      className={cn(
        "relative flex h-7 w-7 items-center justify-center rounded-full border-2 border-foreground/60",
        className,
      )}
    >
      <div className={cn("h-3 w-3 rounded-full border border-foreground/60", innerClassName)} />
    </div>
  );
}

function SectionContainer({
  children,
  className,
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  return (
    <section id={id} className={cn("px-8 md:px-28", className)}>
      {children}
    </section>
  );
}

function BackgroundVideo({ className, src }: { className?: string; src: string }) {
  return (
    <video
      autoPlay
      className={cn("absolute inset-0 h-full w-full object-cover", className)}
      loop
      muted
      playsInline
      src={src}
    />
  );
}

function HlsVideo({ className, src }: { className?: string; src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return undefined;
    }

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
      return () => hls.destroy();
    }

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
      return undefined;
    }

    video.src = src;
    return undefined;
  }, [src]);

  return <video ref={videoRef} autoPlay className={className} loop muted playsInline />;
}

function WordReveal({
  index,
  progress,
  text,
  tone = "muted",
  total,
}: {
  index: number;
  progress: MotionValue<number>;
  text: string;
  tone?: "muted" | "foreground";
  total: number;
}) {
  const start = index / total;
  const end = Math.min(start + 0.22, 1);
  const opacity = useTransform(progress, [start, end], [0.15, 1]);

  return (
    <motion.span
      className={cn(
        "inline-block pr-[0.28em]",
        tone === "foreground" ? "text-foreground" : "text-[hsl(var(--hero-subtitle))]",
      )}
      style={{ opacity }}
    >
      {text}
    </motion.span>
  );
}

function ScrollRevealParagraph({
  className,
  highlightedWords = [],
  progress,
  text,
}: {
  className?: string;
  highlightedWords?: string[];
  progress: MotionValue<number>;
  text: string;
}) {
  const words = text.split(" ");

  return (
    <p className={className}>
      {words.map((word, index) => {
        const normalized = word.toLowerCase().replace(/[^a-z]/g, "");
        const tone = highlightedWords.includes(normalized) ? "foreground" : "muted";

        return (
          <WordReveal
            key={`${word}-${index}`}
            index={index}
            progress={progress}
            text={word}
            tone={tone}
            total={words.length}
          />
        );
      })}
    </p>
  );
}

export function MindloopNavbar() {
  return (
    <motion.header
      {...fadeUp(0)}
      className="fixed top-0 z-50 flex w-full items-center justify-between px-8 py-4 md:px-28"
    >
      <a href="#mindloop-home" className="flex items-center gap-3">
        <ConcentricLogo />
        <span className="text-sm font-bold tracking-[0.02em] text-foreground md:text-base">
          Mindloop
        </span>
      </a>

      <nav className="hidden items-center gap-3 lg:flex">
        {navLinks.map((link, index) => (
          <div key={link.label} className="flex items-center gap-3">
            <a
              href={link.href}
              className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </a>
            {index < navLinks.length - 1 ? (
              <span className="text-muted-foreground/60" aria-hidden="true">
                &bull;
              </span>
            ) : null}
          </div>
        ))}
      </nav>

      <div className="flex items-center gap-2">
        {socialLinks.map(({ href, icon: Icon, label }) => (
          <a
            key={label}
            aria-label={label}
            className="liquid-glass flex h-10 w-10 items-center justify-center rounded-full text-foreground/85 transition-colors hover:text-foreground"
            href={href}
          >
            <Icon className="h-4 w-4" />
          </a>
        ))}
      </div>
    </motion.header>
  );
}

export function MindloopHeroSection() {
  return (
    <SectionContainer
      id="mindloop-home"
      className="relative min-h-screen overflow-hidden pt-28 md:pt-32"
    >
      <BackgroundVideo className="z-0" src={HERO_VIDEO} />
      <div className="absolute inset-0 z-[1] bg-black/28" />
      <div className="absolute inset-x-0 bottom-0 z-[2] h-64 bg-gradient-to-t from-background to-transparent" />

      <div className="relative z-10 flex min-h-[calc(100vh-7rem)] flex-col items-center justify-center text-center">
        <motion.div {...fadeUp(0.05)} className="mb-8 flex items-center gap-4">
          <div className="flex -space-x-2">
            {[avatar1, avatar2, avatar3].map((avatar, index) => (
              <img
                key={avatar}
                alt={`Mindloop subscriber ${index + 1}`}
                className="h-8 w-8 rounded-full border-2 border-background object-cover"
                src={avatar}
              />
            ))}
          </div>
          <span className="text-sm text-muted-foreground">7,000+ people already subscribed</span>
        </motion.div>

        <motion.h1
          {...fadeUp(0.12)}
          className="max-w-5xl text-5xl font-medium tracking-[-2px] text-foreground md:text-7xl lg:text-8xl"
        >
          Get <span className="font-serif italic font-normal">Inspired</span> with Us
        </motion.h1>

        <motion.p
          {...fadeUp(0.2)}
          className="mt-6 max-w-3xl text-lg leading-relaxed text-[hsl(var(--hero-subtitle))]"
        >
          Join our feed for meaningful updates, news around technology and a shared journey toward
          depth and direction.
        </motion.p>

        <motion.form
          {...fadeUp(0.28)}
          className="liquid-glass mt-10 flex w-full max-w-lg flex-col gap-2 rounded-full p-2 sm:flex-row"
          onSubmit={(event) => event.preventDefault()}
        >
          <Input
            aria-label="Email address"
            className="h-12 rounded-full border-0 bg-transparent px-5 text-foreground shadow-none ring-0 placeholder:text-muted-foreground focus-visible:ring-0"
            placeholder="Enter your email"
            type="email"
          />
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Button
              className="h-12 w-full rounded-full bg-foreground px-8 text-background hover:bg-foreground/90 sm:w-auto"
              type="submit"
            >
              SUBSCRIBE
            </Button>
          </motion.div>
        </motion.form>
      </div>
    </SectionContainer>
  );
}

export function MindloopSearchSection() {
  return (
    <SectionContainer
      id="mindloop-how-it-works"
      className="pb-6 pt-52 text-center md:pb-9 md:pt-64"
    >
      <motion.h2
        {...fadeUp(0)}
        className="mx-auto max-w-5xl text-5xl tracking-[-2px] text-foreground md:text-7xl lg:text-8xl"
      >
        Search has <span className="font-serif italic font-normal">changed.</span> Have you?
      </motion.h2>

      <motion.p
        {...fadeUp(0.08)}
        className="mx-auto mb-24 mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground"
      >
        Search is no longer just a list of links. Mindloop helps people publish in a way that holds
        up inside AI-native discovery.
      </motion.p>

      <div className="mb-20 grid gap-12 md:grid-cols-3 md:gap-8">
        {platformCards.map((card, index) => (
          <motion.article
            key={card.name}
            {...fadeUp(index * 0.08)}
            className="mx-auto flex max-w-sm flex-col items-center"
          >
            <img alt={card.name} className="h-[200px] w-[200px] object-contain" src={card.icon} />
            <h3 className="mt-8 text-base font-semibold text-foreground">{card.name}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{card.description}</p>
          </motion.article>
        ))}
      </div>

      <motion.p {...fadeUp(0.12)} className="text-center text-sm text-muted-foreground">
        If you don&apos;t answer the questions, someone else will.
      </motion.p>
    </SectionContainer>
  );
}

export function MindloopMissionSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    offset: ["start 0.8", "end 0.2"],
    target: sectionRef,
  });

  return (
    <section
      ref={sectionRef}
      id="mindloop-philosophy"
      className="px-8 pb-32 pt-0 md:px-28 md:pb-44"
    >
      <motion.div {...fadeUp(0)} className="mx-auto mb-[4.5rem] flex max-w-5xl justify-center">
        <video
          autoPlay
          className="aspect-square w-full max-w-[800px] rounded-[1.75rem] object-cover"
          loop
          muted
          playsInline
          src={MISSION_VIDEO}
        />
      </motion.div>

      <div className="mx-auto max-w-5xl">
        <ScrollRevealParagraph
          className="text-2xl font-medium leading-tight tracking-[-1px] md:text-4xl lg:text-5xl"
          highlightedWords={["curiosity", "meets", "clarity"]}
          progress={scrollYProgress}
          text="We're building a space where curiosity meets clarity - where readers find depth, writers find reach, and every newsletter becomes a conversation worth having."
        />

        <ScrollRevealParagraph
          className="mt-10 text-xl font-medium leading-tight tracking-[-1px] md:text-2xl lg:text-3xl"
          progress={scrollYProgress}
          text="A platform where content, community, and insight flow together - with less noise, less friction, and more meaning for everyone involved."
        />
      </div>
    </section>
  );
}

export function MindloopSolutionSection() {
  return (
    <SectionContainer id="mindloop-use-cases" className="border-t border-border/30 py-32 md:py-44">
      <motion.div {...fadeUp(0)} className="mx-auto max-w-6xl">
        <p className="text-xs uppercase tracking-[3px] text-muted-foreground">SOLUTION</p>
        <h2 className="mt-5 max-w-4xl text-4xl tracking-[-1.5px] text-foreground md:text-6xl">
          The platform for <span className="font-serif italic font-normal">meaningful</span> content
        </h2>

        <motion.div {...fadeUp(0.08)} className="mt-14 overflow-hidden rounded-2xl">
          <video
            autoPlay
            className="aspect-[3/1] w-full object-cover"
            loop
            muted
            playsInline
            src={SOLUTION_VIDEO}
          />
        </motion.div>

        <div className="mt-14 grid gap-8 md:grid-cols-4">
          {solutionFeatures.map((feature, index) => (
            <motion.article key={feature.title} {...fadeUp(index * 0.08)}>
              <h3 className="text-base font-semibold text-foreground">{feature.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {feature.description}
              </p>
            </motion.article>
          ))}
        </div>
      </motion.div>
    </SectionContainer>
  );
}

export function MindloopCtaSection() {
  return (
    <SectionContainer className="overflow-hidden border-t border-border/30 py-32 md:py-44">
      <section className="relative overflow-hidden rounded-[2rem]">
        <HlsVideo className="absolute inset-0 z-0 h-full w-full object-cover" src={CTA_HLS} />
        <div className="absolute inset-0 z-[1] bg-background/45" />

        <div className="relative z-10 flex min-h-[520px] flex-col items-center justify-center px-8 py-20 text-center">
          <motion.div {...fadeUp(0)} className="flex flex-col items-center">
            <ConcentricLogo className="h-10 w-10" innerClassName="h-5 w-5" />
            <h2 className="mt-8 text-4xl tracking-[-1px] text-foreground md:text-6xl">
              <span className="font-serif italic font-normal">Start Your Journey</span>
            </h2>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
              Subscribe for the next chapter, or start publishing inside a platform designed for
              depth, discovery, and durable attention.
            </p>
          </motion.div>

          <motion.div
            {...fadeUp(0.1)}
            className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
          >
            <Button className="h-12 rounded-lg bg-foreground px-8 text-background hover:bg-foreground/90">
              Subscribe Now
            </Button>
            <Button
              className="liquid-glass h-12 rounded-lg border-0 px-8 text-foreground hover:bg-white/5 hover:text-foreground"
              variant="outline"
            >
              Start Writing
            </Button>
          </motion.div>
        </div>
      </section>
    </SectionContainer>
  );
}

export function MindloopFooter() {
  return (
    <footer className="flex flex-col justify-between gap-4 px-8 py-12 md:flex-row md:px-28">
      <p className="text-sm text-muted-foreground">&copy; 2026 Mindloop. All rights reserved.</p>
      <div className="flex items-center gap-6">
        {["Privacy", "Terms", "Contact"].map((item) => (
          <a
            key={item}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
            href="#"
          >
            {item}
          </a>
        ))}
      </div>
    </footer>
  );
}

export function MindloopLandingSections() {
  return (
    <div className="mindloop-root relative bg-background text-foreground">
      <MindloopHeroSection />
      <MindloopSearchSection />
      <MindloopMissionSection />
      <MindloopSolutionSection />
      <MindloopCtaSection />
      <MindloopFooter />
    </div>
  );
}
