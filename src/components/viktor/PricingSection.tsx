import { VButton } from "./Button";
import { useInViewAnimation } from "@/hooks/useInViewAnimation";

export function PricingSection() {
  const { ref, inView } = useInViewAnimation<HTMLDivElement>();
  return (
    <section ref={ref} className="w-full py-12 px-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:max-w-4xl md:ml-auto">
        {inView && (
          <>
            <div
              className="animate-fade-in-up rounded-[40px] pl-10 pr-10 md:pr-24 pt-3 pb-10"
              style={{
                animationDelay: "0.1s",
                background: "#051A24",
                boxShadow: "inset 0 2px 8px 0 rgba(255,255,255,0.08), 0 4px 30px rgba(0,0,0,0.15)",
              }}
            >
              <h3 className="text-[22px] font-medium mt-6" style={{ color: "#F6FCFF" }}>
                Monthly Partnership
              </h3>
              <p className="mt-3 text-sm" style={{ color: "#E0EBF0" }}>
                A dedicated creative design team.<br />You work directly with Viktor.
              </p>
              <div className="mt-8">
                <div className="text-2xl" style={{ color: "#F6FCFF" }}>$5,000</div>
                <div className="text-sm mt-1" style={{ color: "#E0EBF0" }}>Monthly</div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 mt-8">
                <VButton variant="primary" href="https://halaskastudio.com/./book">Start a chat</VButton>
                <VButton variant="secondary" href="https://halaskastudio.com/./book">How it works</VButton>
              </div>
            </div>

            <div
              className="animate-fade-in-up rounded-[40px] pl-10 pr-10 md:pr-24 pt-3 pb-10 bg-white"
              style={{ animationDelay: "0.2s", boxShadow: "0 4px 16px rgba(0,0,0,0.08)" }}
            >
              <h3 className="text-[22px] font-medium mt-6" style={{ color: "#0D212C" }}>
                Custom Project
              </h3>
              <p className="mt-3 text-sm" style={{ color: "#051A24" }}>
                Fixed scope, fixed timeline.<br />Same team, same standards.
              </p>
              <div className="mt-8">
                <div className="text-2xl" style={{ color: "#0D212C" }}>$5,000</div>
                <div className="text-sm mt-1" style={{ color: "#051A24" }}>Minimum</div>
              </div>
              <div className="mt-8">
                <VButton variant="tertiary">Start a chat</VButton>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
