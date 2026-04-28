import { Menu } from "lucide-react";

import { PrismaLogo } from "@/components/prisma/shared/PrismaLogo";
import { prismaNavbarItems } from "@/components/prisma/shared/homepageSections";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function PrismaNavbar() {
  return (
    <header className="fixed inset-x-0 top-0 z-[90] px-4 py-4 md:px-8">
      <div className="prisma-nav-shell mx-auto flex max-w-7xl items-center justify-between rounded-full px-4 py-3 md:px-6">
        <a href="#prisma-hero">
          <PrismaLogo />
        </a>

        <nav className="hidden items-center gap-3 lg:flex">
          {prismaNavbarItems.map((item, index) => (
            <div key={item.label} className="flex items-center gap-3">
              <a className="prisma-nav-link" href={item.href}>
                {item.label}
              </a>
              {index < prismaNavbarItems.length - 1 ? (
                <span className="text-muted-foreground/50" aria-hidden="true">
                  &bull;
                </span>
              ) : null}
            </div>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            className="prisma-button prisma-button-primary hidden md:inline-flex"
            href="#portfolio-contact"
          >
            Start a Project
          </a>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                className="liquid-glass h-10 w-10 rounded-full border-0 text-foreground lg:hidden"
                size="icon"
                variant="outline"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent className="border-border/60 bg-background text-foreground" side="right">
              <SheetHeader>
                <SheetTitle>
                  <PrismaLogo />
                </SheetTitle>
                <SheetDescription>Unified navigation for the Prisma homepage.</SheetDescription>
              </SheetHeader>
              <div className="mt-8 flex flex-col gap-3">
                {prismaNavbarItems.map((item) => (
                  <a
                    key={item.label}
                    className="rounded-2xl border border-border/60 px-4 py-3 text-sm text-foreground/90 transition-colors hover:bg-white/5"
                    href={item.href}
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
