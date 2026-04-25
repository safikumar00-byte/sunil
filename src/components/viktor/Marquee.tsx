import { marqueeImages } from "./marqueeImages";

export function Marquee() {
  const items = [...marqueeImages, ...marqueeImages];
  return (
    <div className="w-full mt-16 md:mt-20 mb-16 overflow-hidden">
      <div className="flex animate-marquee w-max">
        {items.map((src, i) => (
          <img
            key={i}
            src={src}
            alt=""
            className="h-[280px] md:h-[500px] object-cover mx-3 rounded-2xl shadow-lg"
            loading="lazy"
          />
        ))}
      </div>
    </div>
  );
}
