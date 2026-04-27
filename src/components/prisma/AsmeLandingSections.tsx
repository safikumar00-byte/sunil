import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight, ArrowUpRight, Globe, Instagram, Twitter } from "lucide-react";
import { PrismaActionButton } from "@/components/prisma/shared/PrismaActionButton";

const ASME_HERO_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_074625_a81f018a-956b-43fb-9aee-4d1508e30e6a.mp4";
const FEATURED_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260402_054547_9875cfc5-155a-4229-8ec8-b7ba7125cbf8.mp4";
const PHILOSOPHY_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260307_083826_e938b29f-a43a-41ec-a153-3d4730578ab8.mp4";

const serviceCards = [
  {
    description:
      "We dig deep into data, culture, and human behavior to surface the insights that drive meaningful, lasting change.",
    tag: "Strategy",
    title: "Research & Insight",
    video:
      "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4",
  },
  {
    description:
      "From concept to launch, we obsess over every detail to deliver experiences that feel effortless and look extraordinary.",
    tag: "Craft",
    title: "Design & Execution",
    video:
      "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260324_151826_c7218672-6e92-402c-9e45-f1e0f454bdc4.mp4",
  },
];

function FadingLoopVideo({ className, src }: { className: string; src: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const frameRef = useRef<number | null>(null);
  const resetTimerRef = useRef<number | null>(null);
  const fadingOutRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;

    if (!video) {
      return undefined;
    }

    const cancelFade = () => {
      if (frameRef.current !== null) {
        cancelAnimationFrame(frameRef.current);
        frameRef.current = null;
      }
    };

    const fadeTo = (target: number, duration: number) => {
      cancelFade();

      const initialOpacity = Number.parseFloat(video.style.opacity || "0");
      const startOpacity = Number.isNaN(initialOpacity) ? 0 : initialOpacity;
      const startTime = performance.now();

      const tick = (now: number) => {
        const progress = Math.min((now - startTime) / duration, 1);
        video.style.opacity = `${startOpacity + (target - startOpacity) * progress}`;

        if (progress < 1) {
          frameRef.current = requestAnimationFrame(tick);
        } else {
          frameRef.current = null;
        }
      };

      frameRef.current = requestAnimationFrame(tick);
    };

    const playVideo = () => {
      const playPromise = video.play();

      if (playPromise) {
        playPromise.catch(() => {
          // Autoplay may be interrupted during hydration; later media events retry playback.
        });
      }
    };

    const handleCanPlay = () => {
      playVideo();
      fadeTo(1, 500);
    };

    const handleTimeUpdate = () => {
      const remaining = video.duration - video.currentTime;

      if (!fadingOutRef.current && remaining <= 0.55 && remaining > 0) {
        fadingOutRef.current = true;
        fadeTo(0, 500);
      }
    };

    const handleEnded = () => {
      video.style.opacity = "0";
      resetTimerRef.current = window.setTimeout(() => {
        video.currentTime = 0;
        fadingOutRef.current = false;
        playVideo();
        fadeTo(1, 500);
      }, 100);
    };

    video.addEventListener("canplay", handleCanPlay);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);

    return () => {
      cancelFade();

      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }

      video.removeEventListener("canplay", handleCanPlay);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      muted
      autoPlay
      playsInline
      preload="auto"
      src={src}
      className={className}
      style={{ opacity: 0 }}
    />
  );
}

function useReveal(margin = "-100px") {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin });

  return { inView, ref };
}

function AsmeHeroSection() {
  return (
    <section
      id="prisma-lab"
      className="relative flex min-h-screen flex-col overflow-hidden bg-black pt-24"
    >
      <FadingLoopVideo
        src={ASME_HERO_VIDEO}
        className="absolute inset-0 z-0 h-full w-full object-cover object-bottom"
      />

      <div className="relative z-10 flex flex-1 -translate-y-[20%] flex-col items-center justify-center px-6 py-12 text-center">
        <div className="mb-6 inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/45 px-4 py-2 backdrop-blur-md">
          <Globe className="h-4 w-4 text-white/80" />
          <span className="text-xs uppercase tracking-[0.25em] text-white/70">Asme Lab</span>
        </div>
        <h2
          className="whitespace-nowrap text-6xl tracking-tight text-white md:text-8xl lg:text-9xl"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Know it then <em className="italic">all</em>
        </h2>

        <form className="mt-10 w-full max-w-xl">
          <div className="liquid-glass flex items-center gap-3 rounded-full py-2 pl-6 pr-2">
            <input
              type="email"
              placeholder="Enter your email"
              className="min-w-0 flex-1 bg-transparent text-white outline-none placeholder:text-white/40"
            />
            <button type="submit" className="rounded-full bg-white p-3 text-black">
              <ArrowRight className="h-5 w-5" />
            </button>
          </div>
        </form>

        <p className="mt-6 max-w-xl px-4 text-sm leading-relaxed text-white">
          Stay updated with the latest news and insights. Subscribe to our newsletter today and
          never miss out on exciting updates.
        </p>

        <PrismaActionButton className="mt-8" href="#prisma-services" intent="secondary">
          Read Manifesto
        </PrismaActionButton>
      </div>

      <div className="relative z-10 flex justify-center gap-4 pb-12">
        {[Instagram, Twitter, Globe].map((Icon, index) => (
          <a
            key={index}
            href="#"
            className="liquid-glass rounded-full p-4 text-white/80 transition-all hover:bg-white/5 hover:text-white"
          >
            <Icon className="h-5 w-5" />
          </a>
        ))}
      </div>
    </section>
  );
}

export function AboutSection() {
  const { inView, ref } = useReveal();

  return (
    <section className="relative overflow-hidden bg-black px-6 pb-10 pt-32 md:pb-14 md:pt-44">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(255,255,255,0.03)_0%,_transparent_70%)]" />
      <div ref={ref} className="relative z-10 mx-auto max-w-6xl">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-sm uppercase tracking-widest text-white/40"
        >
          About Us
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="mt-8 text-4xl leading-[1.1] tracking-tight text-white md:text-6xl lg:text-7xl"
        >
          Pioneering <span className="italic text-white/60 font-heading">ideas</span> for
          <br className="hidden md:block" /> minds that{" "}
          <span className="italic text-white/60 font-heading">create, build, and inspire.</span>
        </motion.h2>
      </div>
    </section>
  );
}

export function FeaturedVideoSection() {
  const { inView, ref } = useReveal();

  return (
    <section className="overflow-hidden bg-black px-6 pb-20 pt-6 md:pb-32 md:pt-10">
      <div className="mx-auto max-w-6xl">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 60 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="relative aspect-video overflow-hidden rounded-3xl"
        >
          <video
            className="h-full w-full object-cover"
            src={FEATURED_VIDEO}
            muted
            autoPlay
            loop
            playsInline
            preload="auto"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 flex flex-col items-start justify-between gap-6 p-6 md:p-10 lg:flex-row lg:items-end">
            <div className="liquid-glass max-w-md rounded-2xl p-6 md:p-8">
              <p className="mb-3 text-xs uppercase tracking-widest text-white/50">Our Approach</p>
              <p className="text-sm leading-relaxed text-white md:text-base">
                We believe in the power of curiosity-driven exploration. Every project starts with a
                question, and every answer opens a new door to innovation.
              </p>
            </div>

            <motion.a
              href="#"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="liquid-glass rounded-full px-8 py-3 text-sm font-medium text-white"
            >
              Explore more
            </motion.a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export function PhilosophySection() {
  const heading = useReveal();
  const left = useReveal();
  const right = useReveal();

  return (
    <section className="overflow-hidden bg-black px-6 py-28 md:py-40">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          ref={heading.ref}
          initial={{ opacity: 0, y: 40 }}
          animate={heading.inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-16 text-5xl tracking-tight text-white md:mb-24 md:text-7xl lg:text-8xl"
        >
          Innovation <span className="italic text-white/40 font-heading">x</span> Vision
        </motion.h2>

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 md:gap-12">
          <motion.div
            ref={left.ref}
            initial={{ opacity: 0, x: -40 }}
            animate={left.inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="aspect-[4/3] overflow-hidden rounded-3xl"
          >
            <video
              className="h-full w-full object-cover"
              src={PHILOSOPHY_VIDEO}
              muted
              autoPlay
              loop
              playsInline
              preload="auto"
            />
          </motion.div>

          <motion.div
            ref={right.ref}
            initial={{ opacity: 0, x: 40 }}
            animate={right.inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            <div>
              <p className="mb-4 text-xs uppercase tracking-widest text-white/40">
                Choose your space
              </p>
              <p className="text-base leading-relaxed text-white/70 md:text-lg">
                Every meaningful breakthrough begins at the intersection of disciplined strategy and
                remarkable creative vision. We operate at that crossroads, turning bold thinking
                into tangible outcomes that move people and reshape industries.
              </p>
            </div>

            <div className="my-10 h-px w-full bg-white/10" />

            <div>
              <p className="mb-4 text-xs uppercase tracking-widest text-white/40">
                Shape the future
              </p>
              <p className="text-base leading-relaxed text-white/70 md:text-lg">
                We believe that the best work emerges when curiosity meets conviction. Our process
                is designed to uncover hidden opportunities and translate them into experiences that
                resonate long after the first impression.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export function ServicesSection() {
  const header = useReveal();

  return (
    <section id="prisma-services" className="relative overflow-hidden bg-black px-6 py-28 md:py-40">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,255,255,0.02)_0%,_transparent_60%)]" />
      <div className="relative z-10 mx-auto max-w-6xl">
        <motion.div
          ref={header.ref}
          initial={{ opacity: 0, y: 30 }}
          animate={header.inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="mb-12 flex items-end justify-between"
        >
          <h2 className="text-3xl tracking-tight text-white md:text-5xl">What we do</h2>
          <p className="hidden text-sm text-white/40 md:block">Our services</p>
        </motion.div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8">
          {serviceCards.map((card, index) => (
            <ServiceCard key={card.title} {...card} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  description,
  index,
  tag,
  title,
  video,
}: {
  description: string;
  index: number;
  tag: string;
  title: string;
  video: string;
}) {
  const { inView, ref } = useReveal();

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.15, ease: [0.16, 1, 0.3, 1] }}
      className="liquid-glass group overflow-hidden rounded-3xl"
    >
      <div className="relative aspect-video overflow-hidden">
        <video
          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
          src={video}
          muted
          autoPlay
          loop
          playsInline
          preload="auto"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
      </div>

      <div className="p-6 md:p-8">
        <div className="mb-6 flex items-center justify-between gap-4">
          <p className="text-xs uppercase tracking-widest text-white/40">{tag}</p>
          <span className="liquid-glass rounded-full p-2 text-white">
            <ArrowUpRight className="h-4 w-4" />
          </span>
        </div>
        <h3 className="mb-3 text-xl tracking-tight text-white md:text-2xl">{title}</h3>
        <p className="text-sm leading-relaxed text-white/50">{description}</p>
      </div>
    </motion.article>
  );
}

export function AsmeLandingSections() {
  return (
    <div className="bg-black">
      <AsmeHeroSection />
      <AboutSection />
      <FeaturedVideoSection />
      <PhilosophySection />
      <ServicesSection />
    </div>
  );
}
