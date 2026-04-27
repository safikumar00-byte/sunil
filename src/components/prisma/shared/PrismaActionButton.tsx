import type { ButtonHTMLAttributes, ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";

type PrismaActionButtonProps = {
  as?: "a" | "button";
  children: ReactNode;
  className?: string;
  href?: string;
  icon?: boolean;
  intent?: "primary" | "secondary";
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function PrismaActionButton({
  as = "a",
  children,
  className,
  href = "#",
  icon = false,
  intent = "secondary",
  ...props
}: PrismaActionButtonProps) {
  const classes = cn(
    "prisma-button",
    intent === "primary" ? "prisma-button-primary" : "prisma-button-secondary",
    className,
  );

  if (as === "button") {
    return (
      <button className={classes} {...props}>
        <span>{children}</span>
        {icon ? <ArrowUpRight className="h-4 w-4" /> : null}
      </button>
    );
  }

  return (
    <a className={classes} href={href}>
      <span>{children}</span>
      {icon ? <ArrowUpRight className="h-4 w-4" /> : null}
    </a>
  );
}
