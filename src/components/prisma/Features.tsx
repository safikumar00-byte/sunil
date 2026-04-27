import { useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";

const CAPABILITIES_VIDEO =
  "https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260418_094631_d30ab262-45ee-4b7d-99f3-5d5848c8ef13.mp4";

const FADE_MS = 500;
const FADE_OUT_LEAD = 0.55;

interface FadingVideoProps {
  src: string;
  className: string;
}

function FadingVideo({ src, className }: FadingVideoProps) {
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
      const start = performance.now();

      const tick = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        const nextOpacity = startOpacity + (target - startOpacity) * progress;

        video.style.opacity = `${nextOpacity}`;

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
          // Autoplay can be interrupted during route transitions; the next event will retry.
        });
      }
    };

    const handleLoadedData = () => {
      video.style.opacity = "0";
      playVideo();
      fadeTo(1, FADE_MS);
    };

    const handleTimeUpdate = () => {
      const remaining = video.duration - video.currentTime;

      if (!fadingOutRef.current && remaining <= FADE_OUT_LEAD && remaining > 0) {
        fadingOutRef.current = true;
        fadeTo(0, FADE_MS);
      }
    };

    const handleEnded = () => {
      video.style.opacity = "0";

      resetTimerRef.current = window.setTimeout(() => {
        video.currentTime = 0;
        playVideo();
        fadingOutRef.current = false;
        fadeTo(1, FADE_MS);
      }, 100);
    };

    video.addEventListener("loadeddata", handleLoadedData);
    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);

    return () => {
      cancelFade();

      if (resetTimerRef.current !== null) {
        window.clearTimeout(resetTimerRef.current);
      }

      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      autoPlay
      muted
      playsInline
      preload="auto"
      className={className}
      src={src}
      style={{ opacity: 0 }}
    />
  );
}

interface CapabilityCardProps {
  body: string;
  className: string;
  iconPath: string;
  index: number;
  tags: string[];
  title: string;
}

const capabilities = [
  {
    title: "AI Scenery",
    iconPath:
      "M5 21q-.825 0-1.412-.587T3 19V5q0-.825.588-1.412T5 3h14q.825 0 1.413.588T21 5v14q0 .825-.587 1.413T19 21H5Zm1-4h12l-3.75-5-3 4L9 13l-3 4Z",
    tags: ["Natural Context", "Photo Realism", "Infinite Settings", "Eco-Vibe"],
    body: "AI analyzes your product to create indistinguishable natural environments - from Icelandic cliffs to misty forests.",
    className: "lg:mt-16 lg:min-h-[430px]",
  },
  {
    title: "Batch Production",
    iconPath:
      "M4 6.47 5.76 10H20v8H4V6.47M22 4h-4l2 4h-3l-2-4h-2l2 4h-3l-2-4H8l2 4H7L5 4H4c-1.1 0-1.99.89-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V4Z",
    tags: ["Scale Fast", "Visual Consistency", "Time Saver", "Ready to Post"],
    body: "Style your entire product line in minutes. Create a unified visual identity for catalogues and social media without weeks of retouching.",
    className: "lg:min-h-[490px] lg:-translate-y-4",
  },
  {
    title: "Smart Lighting",
    iconPath:
      "M9 21c0 .55.45 1 1 1h4c.55 0 1-.45 1-1v-1H9v1Zm3-19C8.14 2 5 5.14 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1h6c.55 0 1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.86-3.14-7-7-7Z",
    tags: ["Ray Tracing", "Physical Shadows", "Studio Quality", "Sunlight Sync"],
    body: "Automatic lighting and material adjustment. Achieve flawless integration with realistic shadows and sunlight.",
    className: "lg:mt-6 lg:min-h-[410px]",
  },
];

function CapabilityCard({ body, className, iconPath, index, tags, title }: CapabilityCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });

  return (
    <motion.article
      ref={ref}
      initial={{ filter: "blur(10px)", opacity: 0, y: 36 }}
      animate={inView ? { filter: "blur(0px)", opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.75, delay: index * 0.14, ease: [0.16, 1, 0.3, 1] }}
      className={`liquid-glass relative flex min-h-[360px] flex-col rounded-[1.25rem] p-5 text-white sm:p-6 ${className}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div className="liquid-glass grid h-11 w-11 shrink-0 place-items-center rounded-[0.75rem]">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="h-6 w-6 fill-current text-white">
            <path d={iconPath} />
          </svg>
        </div>

        <div className="flex max-w-[72%] flex-wrap justify-end gap-1.5">
          {tags.map((tag) => (
            <span
              key={tag}
              className="liquid-glass rounded-full px-3 py-1 text-[11px] leading-none text-white/90"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex-1" />

      <div className="mt-8">
        <h3
          className="text-3xl italic leading-none tracking-[-1px] text-white md:text-4xl"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          {title}
        </h3>
        <p className="mt-3 max-w-[32ch] text-sm font-light leading-snug text-white/90">{body}</p>
      </div>
    </motion.article>
  );
}

export function Features() {
  const headerRef = useRef<HTMLDivElement>(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-100px" });

  return (
    <section
      id="prisma-capabilities"
      className="relative min-h-screen overflow-hidden bg-black px-4 py-16 sm:px-8 md:px-16 lg:px-20 lg:pb-10 lg:pt-24"
    >
      <FadingVideo
        src={CAPABILITIES_VIDEO}
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />

      <div className="pointer-events-none absolute inset-0 z-[1]">
        <div className="absolute left-[8%] top-[18%] h-[34vw] w-[34vw] max-w-[520px] border border-white/15 opacity-70 [clip-path:polygon(50%_0,100%_100%,0_100%)]" />
        <div className="absolute right-[6%] top-[10%] h-[42vw] w-[42vw] max-w-[640px] rotate-12 border border-white/10 opacity-60 [clip-path:polygon(0_12%,100%_0,74%_100%)]" />
        <div className="absolute bottom-[12%] left-[24%] h-px w-[54vw] rotate-[-18deg] bg-white/25" />
        <div className="absolute bottom-[28%] right-[12%] h-px w-[34vw] rotate-[24deg] bg-white/20" />
        <div className="absolute left-[16%] top-[52%] h-24 w-px rotate-[32deg] bg-white/25" />
        <div className="absolute right-[30%] top-[38%] h-14 w-14 rotate-45 border border-white/20" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-8rem)] max-w-7xl flex-col">
        <motion.header
          ref={headerRef}
          initial={{ filter: "blur(10px)", opacity: 0, y: 24 }}
          animate={headerInView ? { filter: "blur(0px)", opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12 lg:mb-auto"
        >
          <p className="mb-6 text-sm text-white/80">// Capabilities</p>
          <h2
            className="max-w-3xl text-6xl italic leading-[0.9] tracking-[-3px] text-white md:text-7xl lg:text-[6rem]"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Production
            <br />
            evolved
          </h2>
        </motion.header>

        <div className="grid grid-cols-1 gap-5 md:grid-cols-3 md:items-end lg:gap-6">
          {capabilities.map((capability, index) => (
            <CapabilityCard key={capability.title} index={index} {...capability} />
          ))}
        </div>
      </div>
    </section>
  );
}
