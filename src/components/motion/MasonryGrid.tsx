import { useEffect, useMemo, useRef, useState } from "react";
import { gsap } from "gsap";

import { cn } from "@/lib/utils";

type MasonryItem = {
  id: string;
  image: string;
  label: string;
  ratio: number;
};

type PositionedItem = MasonryItem & {
  height: number;
  width: number;
  x: number;
  y: number;
};

type MasonryGridProps = {
  className?: string;
  cols?: number;
  gap?: number;
  items: MasonryItem[];
};

function getLayout(items: MasonryItem[], width: number, cols: number, gap: number) {
  if (!width) {
    return { height: 0, positioned: [] as PositionedItem[] };
  }

  const columnHeights = Array.from({ length: cols }, () => 0);
  const columnWidth = (width - gap * (cols - 1)) / cols;

  const positioned = items.map((item) => {
    const columnIndex = columnHeights.indexOf(Math.min(...columnHeights));
    const x = columnIndex * (columnWidth + gap);
    const height = columnWidth / item.ratio;
    const y = columnHeights[columnIndex];

    columnHeights[columnIndex] += height + gap;

    return {
      ...item,
      height,
      width: columnWidth,
      x,
      y,
    };
  });

  return {
    height: Math.max(...columnHeights, 0),
    positioned,
  };
}

export function MasonryGrid({ className, cols = 3, gap = 18, items }: MasonryGridProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Record<string, HTMLDivElement | null>>({});
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const node = containerRef.current;

    if (!node) {
      return undefined;
    }

    const observer = new ResizeObserver(([entry]) => {
      setWidth(entry.contentRect.width);
    });

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  const layout = useMemo(() => getLayout(items, width, cols, gap), [cols, gap, items, width]);

  useEffect(() => {
    layout.positioned.forEach((item, index) => {
      const element = itemRefs.current[item.id];

      if (!element) {
        return;
      }

      gsap.to(element, {
        duration: 0.9 + index * 0.015,
        ease: "power3.out",
        height: item.height,
        width: item.width,
        x: item.x,
        y: item.y,
      });
    });
  }, [layout]);

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full", className)}
      style={{ height: layout.height }}
    >
      {layout.positioned.map((item) => (
        <div
          key={item.id}
          ref={(node) => {
            itemRefs.current[item.id] = node;
          }}
          className="absolute left-0 top-0 overflow-hidden rounded-2xl border border-white/10 bg-card"
        >
          <img alt={item.label} className="h-full w-full object-cover" src={item.image} />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/15 to-transparent" />
          <div className="absolute inset-x-0 bottom-0 p-4">
            <div className="text-sm text-white">{item.label}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
