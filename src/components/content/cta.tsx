import Link from "next/link";
import { renderHighlight } from "@/components/content/highlight";
import { Button } from "@/components/ui/button";

export type CtaProps = {
  title: string;
  highlight?: string;
  description?: string;
  cta: { href: string; label: string };
};

export function Cta({ title, highlight, description, cta }: CtaProps) {
  return (
    <section className="py-12 lg:py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center flex flex-col gap-6 lg:gap-8">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-secondary-foreground uppercase">
            {renderHighlight(title, highlight)}
          </h2>
          {description ? (
            <p className="text-lg sm:text-xl text-secondary-foreground/80">
              {description}
            </p>
          ) : null}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button asChild className="bg-brand hover:bg-brand/90">
              <Link href={cta.href}>{cta.label}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
