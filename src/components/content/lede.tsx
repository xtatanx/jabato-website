import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type LedeProps = {
  children: ReactNode;
  tone?: "light" | "dark";
  variant?: "display" | "body";
};

export function Lede({ children, tone = "dark", variant = "display" }: LedeProps) {
  if (variant === "body") {
    return (
      <section className="pb-12 lg:pb-20">
        <div className="container mx-auto px-4">
          <p
            className={cn(
              "mx-auto mb-6 max-w-2xl text-center text-lg sm:text-xl lg:mb-8",
              tone === "light"
                ? "text-primary-foreground"
                : "text-secondary-foreground",
            )}
          >
            {children}
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white pb-12 lg:pb-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto text-center text-2xl font-extrabold uppercase leading-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl">
          {children}
        </div>
      </div>
    </section>
  );
}
