import { useInViewAnimation } from "@/hooks/useInViewAnimation";

const projects = [
  {
    name: "evr",
    desc: "From idea to millions raised for a web3 AI product",
    img: "https://motionsites.ai/assets/hero-evr-ventures-preview-DZxeVFEX.gif",
  },
  {
    name: "Automation Machines",
    desc: "Streamlining industrial automation processes",
    img: "https://motionsites.ai/assets/hero-automation-machines-preview-DlTveRIN.gif",
  },
  {
    name: "xPortfolio",
    desc: "Modern portfolio management platform",
    img: "https://motionsites.ai/assets/hero-xportfolio-preview-D4A8maiC.gif",
  },
];

function ProjectItem({ name, desc, img }: (typeof projects)[number]) {
  const { ref, inView } = useInViewAnimation<HTMLDivElement>();
  return (
    <div ref={ref} className={inView ? "animate-fade-in-up" : "opacity-0"}>
      <div className="ml-20 md:ml-28 mb-6">
        <h3
          className="text-2xl md:text-3xl font-semibold"
          style={{ color: "#051A24", fontFamily: "PP Mondwest, serif" }}
        >
          {name}
        </h3>
        <p className="text-sm md:text-base mt-2" style={{ color: "rgba(5,26,36,0.7)" }}>
          {desc}
        </p>
      </div>
      <img src={img} alt={name} className="w-full rounded-2xl shadow-lg object-cover" />
    </div>
  );
}

export function ProjectsSection() {
  return (
    <section className="max-w-[1200px] mx-auto px-6 py-12 flex flex-col gap-16 md:gap-20">
      {projects.map((p) => (
        <ProjectItem key={p.name} {...p} />
      ))}
    </section>
  );
}
