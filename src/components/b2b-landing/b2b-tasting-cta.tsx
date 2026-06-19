import { b2bLandingCopy } from "@content/data/b2b-landing";
import { site } from "@content/site";
import { WhatsAppIcon } from "@/components/brand-icons";
import { TrackedWhatsAppLink } from "@/components/tracked-whatsapp-link";
import { Button } from "@/components/ui/button";

export function B2BTastingCta() {
  const whatsappUrl = `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(b2bLandingCopy.whatsappMessage)}`;

  return (
    <section className="bg-brand py-12 lg:py-20">
      <div className="container mx-auto max-w-3xl px-4 text-center">
        <p className="text-xl leading-relaxed text-white sm:text-2xl lg:text-3xl">
          {b2bLandingCopy.tastingCopy}
        </p>
        <div className="mt-10 flex justify-center">
          <Button
            asChild
            variant="secondary"
            size="lg"
            className="h-14 px-8 text-lg"
          >
            <TrackedWhatsAppLink
              href={whatsappUrl}
              intent="b2b"
              location="landing_b2b"
              target="_blank"
              rel="noopener noreferrer"
            >
              <WhatsAppIcon className="size-6 text-[#25D366]" />
              {b2bLandingCopy.whatsappCta}
            </TrackedWhatsAppLink>
          </Button>
        </div>
      </div>
    </section>
  );
}
