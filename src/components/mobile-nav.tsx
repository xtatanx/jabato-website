"use client";

import { site } from "@content/site";
import { Menu } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

export function MobileNav() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="md:hidden text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
          aria-label="Abrir menú"
        >
          <Menu className="size-6" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-full max-w-none h-full border-none bg-primary text-primary-foreground p-0 sm:max-w-none [&>button]:text-primary-foreground [&>button]:hover:bg-primary-foreground/10"
      >
        <SheetTitle className="sr-only">Menú de navegación</SheetTitle>
        <div className="flex h-16 items-center border-b border-primary-foreground/20 px-4">
          <SheetClose asChild>
            <Link href="/" aria-label="Ir al inicio">
              <Image
                src="/jabato-horizontal-logo.svg"
                alt={`${site.name} Cervecería`}
                width={86}
                height={26}
                priority
              />
            </Link>
          </SheetClose>
        </div>
        <nav className="flex flex-col px-4 py-8">
          {site.nav.map((item) => (
            <SheetClose asChild key={item.href}>
              <Link
                href={item.href}
                className="text-xl font-bold py-4 hover:text-brand transition-colors"
              >
                {item.label}
              </Link>
            </SheetClose>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
