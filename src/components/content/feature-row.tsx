import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { renderHighlight } from "@/components/content/highlight";
import { cn } from "@/lib/utils";

export type FeatureRowProps = {
  image: string;
  imageAlt: string;
  title: string;
  highlight?: string;
  description: string;
  cta: { href: string; label: string };
  imagePosition?: "left" | "right";
  tone?: "light" | "dark";
  caption?: ReactNode;
};

export function FeatureRow({
  image,
  imageAlt,
  title,
  highlight,
  description,
  cta,
  imagePosition = "left",
  tone = "dark",
  caption,
}: FeatureRowProps) {
  const isDark = tone === "light";

  return (
    <section
      className={cn(
        "py-12 lg:py-20",
        isDark ? "bg-primary text-primary-foreground" : "",
      )}
    >
      <div
        className={cn(
          "container mx-auto flex flex-col gap-10 sm:gap-16 lg:gap-12 px-4",
          imagePosition === "left" ? "lg:flex-row" : "lg:flex-row-reverse",
        )}
      >
        <figure className="w-full lg:w-1/2 aspect-square relative rounded">
          <Image
            src={image}
            className="object-cover rounded"
            alt={imageAlt}
            loading="lazy"
            fill
          />
          {caption ? (
            <figcaption className="text-sm sm:text-lg lg:text-xl xl:bg-secondary xl:text-secondary-foreground absolute top-[calc(100%)] xl:bottom-0 xl:right-0 xl:top-auto p-2 sm:p-4 xl:translate-x-1/2 xl:translate-y-1/2 xl:max-w-[80%]">
              {caption}
            </figcaption>
          ) : null}
        </figure>
        <div className="w-full lg:w-1/2 flex flex-col justify-center">
          <h2
            className={cn(
              "text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold uppercase my-4 lg:my-8",
              isDark ? "text-primary-foreground" : "text-secondary-foreground",
            )}
          >
            {renderHighlight(title, highlight)}
          </h2>
          <p
            className={cn(
              "text-lg sm:text-xl mb-6 lg:mb-8",
              isDark
                ? "text-primary-foreground/90"
                : "text-secondary-foreground/90",
            )}
          >
            {description}
          </p>
          <Link
            href={cta.href}
            className="inline-flex items-center gap-2 text-lg sm:text-xl font-semibold text-brand hover:text-brand/80 transition-colors duration-200 group"
          >
            {cta.label}
            <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </section>
  );
}
