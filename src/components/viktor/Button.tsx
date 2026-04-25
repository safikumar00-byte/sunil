import * as React from "react";

type Variant = "primary" | "secondary" | "tertiary";

const PRIMARY_SHADOW =
  "0 1px 2px 0 rgba(5,26,36,0.1), 0 4px 4px 0 rgba(5,26,36,0.09), 0 9px 6px 0 rgba(5,26,36,0.05), 0 17px 7px 0 rgba(5,26,36,0.01), 0 26px 7px 0 rgba(5,26,36,0), inset 0 2px 8px 0 rgba(255,255,255,0.5)";
const SECONDARY_SHADOW = "0 0 0 0.5px rgba(0,0,0,0.05), 0 4px 30px rgba(0,0,0,0.08)";
const TERTIARY_SHADOW =
  "0 0 0 0.5px rgba(0,0,0,0.05), 0 4px 30px rgba(0,0,0,0.08), inset 0 2px 8px 0 rgba(255,255,255,0.8)";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  href?: string;
  asChild?: boolean;
}

export function VButton({
  variant = "primary",
  href,
  className = "",
  children,
  style,
  ...rest
}: Props) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3 text-sm font-medium transition-opacity hover:opacity-90 cursor-pointer";
  const variants: Record<Variant, string> = {
    primary: "bg-[#051A24] text-white",
    secondary: "bg-white text-[#051A24]",
    tertiary: "bg-white text-[#051A24]",
  };
  const shadow =
    variant === "primary"
      ? PRIMARY_SHADOW
      : variant === "secondary"
        ? SECONDARY_SHADOW
        : TERTIARY_SHADOW;

  const merged: React.CSSProperties = { boxShadow: shadow, ...style };

  if (href) {
    return (
      <a href={href} className={`${base} ${variants[variant]} ${className}`} style={merged}>
        {children}
      </a>
    );
  }
  return (
    <button className={`${base} ${variants[variant]} ${className}`} style={merged} {...rest}>
      {children}
    </button>
  );
}
