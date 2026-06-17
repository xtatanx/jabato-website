import { b2bLandingCopy } from "@content/data/b2b-landing";
import Image from "next/image";
import { WholesaleLeadForm } from "@/components/b2b-landing/wholesale-lead-form";

export function B2BHeroSection() {
  return (
    <section className="relative min-h-[85vh]">
      <Image
        src="/gente-conversando-en-un-pub-tomando-cerveza-jabato.jpg"
        alt="Bar premium con cerveza Jabato"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-black/55" />

      <div className="container relative mx-auto flex min-h-[85vh] items-center px-4 py-10">
        <div className="grid w-full items-center gap-8 lg:grid-cols-[3fr_2fr] lg:gap-10">
          <div className="flex flex-col items-center text-center text-primary-foreground lg:items-start lg:text-left">
            <p className="mb-3 text-base font-semibold uppercase tracking-widest text-brand sm:text-lg">
              {b2bLandingCopy.heroEyebrow}
            </p>
            <h1 className="max-w-4xl font-heading text-4xl uppercase leading-none sm:text-5xl lg:text-7xl">
              {b2bLandingCopy.headline}
            </h1>
            <p className="mt-4 max-w-2xl text-xl text-primary-foreground/90 sm:text-2xl lg:mt-6">
              {b2bLandingCopy.subheadline}
            </p>
          </div>

          <div className="flex w-full justify-center">
            <WholesaleLeadForm className="w-full max-w-lg lg:max-w-none" />
          </div>
        </div>
      </div>
    </section>
  );
}
