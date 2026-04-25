import { useRef, useState } from "react";
import { VButton } from "./Button";
import { marqueeImages } from "./marqueeImages";

interface Trail {
  id: number;
  x: number;
  y: number;
  src: string;
  rot: number;
}

export function PartnerSection() {
  const [trails, setTrails] = useState<Trail[]>([]);
  const lastSpawn = useRef(0);
  const idRef = useRef(0);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const now = performance.now();
    if (now - lastSpawn.current < 80) return;
    lastSpawn.current = now;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const src = marqueeImages[Math.floor(Math.random() * marqueeImages.length)];
    const rot = Math.random() * 20 - 10;
    const id = ++idRef.current;
    setTrails((prev) => [...prev, { id, x, y, src, rot }]);
    setTimeout(() => {
      setTrails((prev) => prev.filter((t) => t.id !== id));
    }, 1000);
  };

  return (
    <section className="w-full py-12 px-6">
      <div
        className="relative max-w-7xl mx-auto py-48 rounded-[40px] bg-white overflow-hidden"
        style={{ boxShadow: "0 4px 30px rgba(0,0,0,0.05)" }}
        onMouseMove={onMove}
      >
        {trails.map((t) => (
          <img
            key={t.id}
            src={t.src}
            alt=""
            className="pointer-events-none absolute w-32 h-32 object-cover rounded-xl"
            style={{
              left: t.x - 64,
              top: t.y - 64,
              transform: `rotate(${t.rot}deg)`,
              animation: "fadeOutScale 1s ease-out forwards",
            }}
          />
        ))}
        <style>{`@keyframes fadeOutScale { 0%{opacity:1;transform:scale(1) rotate(var(--r,0deg));} 100%{opacity:0;transform:scale(0.6);} }`}</style>
        <div className="relative text-center">
          <h2
            className="text-[48px] md:text-[64px] lg:text-[80px] mb-12"
            style={{ color: "#0D212C", fontFamily: "PP Mondwest, serif" }}
          >
            Partner with us
          </h2>
          <VButton variant="primary" className="!pl-2">
            <img
              src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=200"
              alt="Viktor"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span>Start chat with Viktor</span>
          </VButton>
        </div>
      </div>
    </section>
  );
}
