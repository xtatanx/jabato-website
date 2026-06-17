import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { renderHighlight } from "@/components/content/highlight";
import { Button } from "@/components/ui/button";
import { unwrapBlockElement } from "@/lib/unwrap-block-element";
import { cn } from "@/lib/utils";

export type HeroProps = {
  image: string;
  imageAlt: string;
  title?: string;
  highlight?: string;
  children?: ReactNode;
  subtitle?: string;
  cta?: { href: string; label: string };
  align?: "left" | "center";
  tone?: "light" | "dark";
  priority?: boolean;
  /** Optional size override; defaults to standard hero. */
  size?: "default" | "tall";
  className?: string;
};

export function Hero({
  image,
  imageAlt,
  title,
  highlight,
  children,
  subtitle,
  cta,
  align = "center",
  tone = "light",
  priority = true,
  size = "default",
  className,
}: HeroProps) {
  const isTall = size === "tall";

  return (
    <section
      className={cn(
        "relative grid items-center gap-8 mb-12 min-h-[400px] lg:aspect-video lg:gap-12 lg:mb-20 lg:w-full",
        isTall
          ? "lg:h-[calc(100dvh-250px)] lg:min-h-[500px]"
          : "lg:max-h-[400px]",
        className,
      )}
    >
      <Image
        src={image}
        className="object-cover z-0"
        alt={imageAlt}
        fill
        priority={priority}
        loading={priority ? "eager" : "lazy"}
      />
      <div className="absolute inset-0 bg-black/30 z-0" aria-hidden="true" />

      <div
        className={cn(
          "container mx-auto grid-area-1 relative z-10 px-4",
          align === "center" ? "text-center" : "text-left",
        )}
      >
        <div
          className={cn(
            "flex flex-col gap-6 lg:gap-8",
            align === "center"
              ? "items-center w-full"
              : "items-start w-full lg:w-3/5",
          )}
        >
          {children ? (
            <h1
              className={cn(
                "text-4xl font-extrabold uppercase text-shadow-xs sm:text-5xl md:text-6xl lg:text-7xl",
                tone === "light"
                  ? "text-primary-foreground"
                  : "text-secondary-foreground",
              )}
            >
              {unwrapBlockElement(children)}
            </h1>
          ) : title ? (
            <h1
              className={cn(
                "text-4xl font-extrabold uppercase text-shadow-xs sm:text-5xl md:text-6xl lg:text-7xl",
                tone === "light"
                  ? "text-primary-foreground"
                  : "text-secondary-foreground",
              )}
            >
              {renderHighlight(title, highlight)}
            </h1>
          ) : null}

          {subtitle ? (
            <p
              className={cn(
                "text-lg sm:text-xl lg:text-2xl text-shadow-xs max-w-3xl",
                tone === "light"
                  ? "text-primary-foreground/90"
                  : "text-secondary-foreground/90",
              )}
            >
              {subtitle}
            </p>
          ) : null}

          {cta ? (
            <Button asChild className="bg-brand hover:bg-brand/90">
              <Link href={cta.href}>{cta.label}</Link>
            </Button>
          ) : null}
        </div>
      </div>
    </section>
  );
}
