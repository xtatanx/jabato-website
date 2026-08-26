import { b2bLandingCopy } from "@content/data/b2b-landing";

export function B2BSeoLede() {
  return (
    <section className="py-12 lg:py-20">
      <div className="container mx-auto max-w-3xl px-4">
        <h2 className="mb-6 font-heading text-5xl uppercase sm:text-6xl lg:text-7xl">
          {b2bLandingCopy.ledeTitle}
        </h2>
        <p className="text-lg leading-relaxed text-muted-foreground lg:text-xl">
          {b2bLandingCopy.ledeBody}
        </p>
      </div>
    </section>
  );
}
