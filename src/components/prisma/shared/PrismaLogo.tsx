import { cn } from "@/lib/utils";

export function PrismaLogo({
  className,
  labelClassName,
}: {
  className?: string;
  labelClassName?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-3", className)}>
      <span className="relative flex h-8 w-8 items-center justify-center rounded-full border-2 border-foreground/60">
        <span className="h-3.5 w-3.5 rounded-full border border-foreground/60" />
      </span>
      <span
        className={cn("text-sm font-semibold tracking-[0.08em] text-foreground", labelClassName)}
      >
        PRISMA
      </span>
    </span>
  );
}
