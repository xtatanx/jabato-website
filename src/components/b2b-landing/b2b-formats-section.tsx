import { b2bLandingCopy, formatItems } from "@content/data/b2b-landing";
import { Beer, Package, ShoppingCart, Snowflake } from "lucide-react";

const FORMAT_ICONS = [Package, Beer, ShoppingCart, Snowflake] as const;

export function B2BFormatsSection() {
  return (
    <section className="py-12 lg:py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-10 font-heading text-5xl uppercase sm:text-6xl lg:text-7xl">
          {b2bLandingCopy.formatsTitle}
        </h2>
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {formatItems.map((item, index) => {
            const Icon = FORMAT_ICONS[index];
            return (
              <div key={item.title}>
                <Icon className="mb-4 size-10 text-brand" />
                <h3 className="font-heading text-2xl uppercase">
                  {item.title}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-muted-foreground lg:text-lg">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
