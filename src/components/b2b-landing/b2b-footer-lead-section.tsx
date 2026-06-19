import { b2bLandingCopy } from "@content/data/b2b-landing";
import Image from "next/image";
import { WholesaleLeadForm } from "@/components/b2b-landing/wholesale-lead-form";

export function B2BFooterLeadSection() {
  return (
    <section className="relative overflow-hidden py-12 lg:py-20">
      <Image
        src="/cervezas-de-jabato.jpg"
        alt="Cervezas artesanales Jabato para bares y restaurantes"
        fill
        className="object-cover"
        sizes="100vw"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-black/65" aria-hidden="true" />

      <div className="container relative mx-auto max-w-lg px-4">
        <h2 className="mb-8 text-center font-heading text-4xl uppercase text-primary-foreground text-shadow-xs sm:text-5xl">
          {b2bLandingCopy.formFooterTitle}
        </h2>
        <WholesaleLeadForm />
      </div>
    </section>
  );
}
