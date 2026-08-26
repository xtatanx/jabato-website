import { b2bLandingCopy, coverageLocalidades } from "@content/data/b2b-landing";

export function B2BCoverageSection() {
  return (
    <section className="py-12 lg:py-20">
      <div className="container mx-auto max-w-3xl px-4">
        <h2 className="mb-6 font-heading text-5xl uppercase sm:text-6xl lg:text-7xl">
          {b2bLandingCopy.coverageTitle}
        </h2>
        <p className="text-lg leading-relaxed text-muted-foreground lg:text-xl">
          {b2bLandingCopy.coverageBody}
        </p>
        <ul className="mt-8 flex flex-wrap gap-3">
          {coverageLocalidades.map((localidad) => (
            <li
              key={localidad}
              className="rounded-full border border-border bg-muted px-4 py-2 text-sm font-medium lg:text-base"
            >
              {localidad}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
