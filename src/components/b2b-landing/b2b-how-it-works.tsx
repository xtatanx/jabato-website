import { b2bLandingCopy, howItWorksSteps } from "@content/data/b2b-landing";

export function B2BHowItWorks() {
  return (
    <section className="py-12 lg:py-20">
      <div className="container mx-auto px-4">
        <h2 className="mb-10 font-heading text-5xl uppercase sm:text-6xl lg:text-7xl">
          {b2bLandingCopy.howItWorksTitle}
        </h2>
        <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {howItWorksSteps.map((step, index) => (
            <li key={step.title}>
              <span className="mb-4 block font-heading text-4xl text-brand">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h3 className="font-heading text-2xl uppercase">{step.title}</h3>
              <p className="mt-3 text-base leading-relaxed text-muted-foreground lg:text-lg">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
