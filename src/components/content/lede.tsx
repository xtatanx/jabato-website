import type { ReactNode } from "react";
import { unwrapBlockElement } from "@/lib/unwrap-block-element";
import { cn } from "@/lib/utils";

export type LedeProps = {
  children: ReactNode;
  tone?: "light" | "dark";
  variant?: "display" | "body";
};

const displayClasses =
  "mx-auto text-center font-heading text-2xl font-extrabold uppercase leading-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl";

export function Lede({
  children,
  tone = "dark",
  variant = "display",
}: LedeProps) {
  if (variant === "body") {
    return (
      <section className="pb-12 lg:pb-20">
        <div className="container mx-auto px-4">
          <div
            className={cn(
              "mx-auto mb-6 max-w-2xl space-y-4 text-center text-lg sm:text-xl lg:mb-8 [&_p]:m-0",
              tone === "light"
                ? "text-primary-foreground"
                : "text-secondary-foreground",
            )}
          >
            {children}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white pb-12 lg:pb-20">
      <div className="container mx-auto px-4">
        <p className={displayClasses}>{unwrapBlockElement(children)}</p>
      </div>
    </section>
  );
}
