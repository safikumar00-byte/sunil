import type { HTMLAttributes, ReactNode } from "react";

import { useMagnetic } from "@/hooks/useMagnetic";
import { cn } from "@/lib/utils";

type MagneticProps = HTMLAttributes<HTMLDivElement> & {
  children: ReactNode;
  disabled?: boolean;
  radius?: number;
  strength?: number;
};

export function Magnetic({
  children,
  className,
  disabled,
  radius,
  strength,
  ...props
}: MagneticProps) {
  const ref = useMagnetic<HTMLDivElement>({ disabled, radius, strength });

  return (
    <div ref={ref} className={cn("transform-gpu will-change-transform", className)} {...props}>
      {children}
    </div>
  );
}
