import { gsap } from "gsap";
import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

type CursorPreviewItem = {
  id: string;
  image: string;
  label: string;
};

type CursorPreviewProps = {
  className?: string;
  items: CursorPreviewItem[];
};

export function CursorPreview({ className, items }: CursorPreviewProps) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const echoRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const cursor = cursorRef.current;

    if (!cursor) {
      return undefined;
    }

    const moveCursorX = gsap.quickTo(cursor, "x", { duration: 0.32, ease: "power3.out" });
    const moveCursorY = gsap.quickTo(cursor, "y", { duration: 0.32, ease: "power3.out" });
    const echoes = echoRefs.current.filter(Boolean) as HTMLDivElement[];
    const echoMovers = echoes.map((echo, index) => ({
      x: gsap.quickTo(echo, "x", { duration: 0.42 + index * 0.12, ease: "power3.out" }),
      y: gsap.quickTo(echo, "y", { duration: 0.42 + index * 0.12, ease: "power3.out" }),
    }));

    const handleMove = (event: PointerEvent) => {
      moveCursorX(event.clientX + 24);
      moveCursorY(event.clientY + 24);

      echoMovers.forEach((mover) => {
        mover.x(event.clientX + 8);
        mover.y(event.clientY + 8);
      });
    };

    window.addEventListener("pointermove", handleMove);

    return () => window.removeEventListener("pointermove", handleMove);
  }, []);

  return (
    <div className={cn("relative", className)}>
      <div className="grid gap-3 md:grid-cols-2">
        {items.map((item) => (
          <button
            key={item.id}
            className="group liquid-glass relative flex items-center justify-between rounded-2xl px-5 py-5 text-left"
            onBlur={() => setActiveId((current) => (current === item.id ? null : current))}
            onFocus={() => setActiveId(item.id)}
            onMouseEnter={() => setActiveId(item.id)}
            onMouseLeave={() => setActiveId((current) => (current === item.id ? null : current))}
            type="button"
          >
            <span className="text-lg text-foreground transition-colors group-hover:text-white">
              {item.label}
            </span>
            <span className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
              Preview
            </span>
          </button>
        ))}
      </div>

      <div className="pointer-events-none hidden lg:block">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            ref={(node) => {
              echoRefs.current[index] = node;
            }}
            className="fixed left-0 top-0 z-[60] h-2.5 w-2.5 rounded-full bg-white/10"
          />
        ))}

        <div
          ref={cursorRef}
          className="fixed left-0 top-0 z-[70] flex h-44 w-36 items-end overflow-hidden rounded-2xl border border-white/10 bg-black/85"
        >
          {items.map((item) => (
            <img
              key={item.id}
              alt={item.label}
              className={cn(
                "absolute inset-0 h-full w-full object-cover transition-all duration-300",
                activeId === item.id
                  ? "translate-y-0 scale-100 opacity-100"
                  : "translate-y-6 scale-95 opacity-0",
              )}
              src={item.image}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
          <div className="relative z-[1] p-4">
            <div className="text-xs uppercase tracking-[0.16em] text-white/60">Hover State</div>
            <div className="mt-1 text-sm text-white">
              {items.find((item) => item.id === activeId)?.label}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
