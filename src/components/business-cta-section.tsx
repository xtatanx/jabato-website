import { distributionCta } from "@content/data/distribution-cta";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BusinessCtaSectionProps {
  title?: string;
  description?: string;
  href?: string;
  ctaLabel?: string;
  tone?: "light" | "dark";
}

export function BusinessCtaSection({
  title = distributionCta.title,
  description = distributionCta.description,
  href = distributionCta.href,
  ctaLabel = distributionCta.ctaLabel,
  tone = "light",
}: BusinessCtaSectionProps) {
  const isDark = tone === "dark";

  return (
    <section
      className={cn(
        "py-12 lg:py-20",
        isDark && "bg-primary text-primary-foreground",
      )}
    >
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold mb-4 sm:text-4xl lg:text-5xl uppercase">
            {title.includes("Jabato") ? (
              <>
                {title.split("Jabato")[0]}
                <span className="text-brand">Jabato</span>
                {title.split("Jabato")[1]}
              </>
            ) : (
              title
            )}
          </h2>
          <p
            className={cn(
              "text-lg sm:text-xl mb-8",
              isDark && "text-primary-foreground/90",
            )}
          >
            {description}
          </p>
          <Button asChild className="bg-brand hover:bg-brand/90">
            <Link href={href}>{ctaLabel}</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
