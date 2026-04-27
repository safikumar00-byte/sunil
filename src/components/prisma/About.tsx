import { WordsPullUpMultiStyle } from "./WordsPullUpMultiStyle";
import { AnimatedParagraph } from "./AnimatedParagraph";

export function About() {
  return (
    <section id="prisma-about" className="bg-black px-4 py-20 md:px-6 md:py-32">
      <div className="mx-auto max-w-6xl rounded-2xl border border-white/8 bg-card px-6 py-20 text-center md:rounded-[2rem] md:py-28">
        {/* <p className="text-primary text-[10px] sm:text-xs uppercase tracking-widest mb-8">
          Visual arts
        </p> */}

        <div
          className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl max-w-3xl mx-auto leading-[0.95] sm:leading-[0.9]"
          style={{ color: "hsl(var(--foreground))" }}
        >
          <WordsPullUpMultiStyle
            segments={[
              { text: "I am Sunil Kumar,", className: "font-normal" },
              { text: "a self-taught Designer.", className: "italic font-serif" },
              {
                text: "I have skills in color grading, visual effects, and narrative design.",
                className: "font-normal",
              },
            ]}
          />
        </div>

        {/* <div className="mt-12 max-w-2xl mx-auto">
          <AnimatedParagraph
            text="Over the last seven years, I have worked with Parallax, a Berlin-based production house that crafts cinema, series, and Noir Studio in Paris. Together, we have created work that has earned international acclaim at several major festivals."
            className="text-xs sm:text-sm md:text-base leading-relaxed"
          />
        </div> */}
      </div>
    </section>
  );
}
