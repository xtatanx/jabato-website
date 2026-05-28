import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type LedeProps = {
  children: ReactNode;
  tone?: "light" | "dark";
};

export function Lede({ children, tone = "dark" }: LedeProps) {
  return (
    <section className="pb-12 lg:pb-20">
      <div className="container mx-auto">
        <p
          className={cn(
            "text-center text-lg sm:text-xl mb-6 lg:mb-8 sm:max-w-1/2 mx-auto",
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
