import { useEffect, useRef } from "react";
import { gsap } from "gsap";

type UseMagneticOptions = {
  disabled?: boolean;
  radius?: number;
  strength?: number;
};

export function useMagnetic<T extends HTMLElement>({
  disabled = false,
  radius = 240,
  strength = 0.18,
}: UseMagneticOptions = {}) {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const element = ref.current;

    if (!element || disabled) {
      return undefined;
    }

    const xTo = gsap.quickTo(element, "x", {
      duration: 0.45,
      ease: "power3.out",
    });
    const yTo = gsap.quickTo(element, "y", {
      duration: 0.45,
      ease: "power3.out",
    });
    const rotateXTo = gsap.quickTo(element, "rotateX", {
      duration: 0.5,
      ease: "power3.out",
    });
    const rotateYTo = gsap.quickTo(element, "rotateY", {
      duration: 0.5,
      ease: "power3.out",
    });

    const reset = () => {
      xTo(0);
      yTo(0);
      rotateXTo(0);
      rotateYTo(0);
    };

    const handleMove = (event: PointerEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = event.clientX - centerX;
      const deltaY = event.clientY - centerY;
      const distance = Math.hypot(deltaX, deltaY);

      if (distance > radius) {
        reset();
        return;
      }

      const falloff = 1 - distance / radius;
      xTo(deltaX * strength * falloff);
      yTo(deltaY * strength * falloff);
      rotateXTo(deltaY * -0.03 * falloff);
      rotateYTo(deltaX * 0.03 * falloff);
    };

    window.addEventListener("pointermove", handleMove);
    element.addEventListener("pointerleave", reset);

    return () => {
      window.removeEventListener("pointermove", handleMove);
      element.removeEventListener("pointerleave", reset);
    };
  }, [disabled, radius, strength]);

  return ref;
}
