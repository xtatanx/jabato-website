import { b2bLandingCopy } from "@content/data/b2b-landing";
import { site } from "@content/site";
import { WhatsAppIcon } from "@/components/brand-icons";
import { TrackedWhatsAppLink } from "@/components/tracked-whatsapp-link";
import { Button } from "@/components/ui/button";

export function B2BHeroWhatsAppCta() {
  const whatsappUrl = `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(b2bLandingCopy.whatsappMessage)}`;

  return (
    <div className="mx-auto w-full max-w-lg text-center lg:max-w-none">
      <p className="mb-3 text-base font-bold text-primary-foreground/90 sm:text-lg">
        {b2bLandingCopy.whatsappHeroLabel}
      </p>
      <Button
        asChild
        variant="secondary"
        size="lg"
        className="h-14 w-full text-lg"
      >
        <TrackedWhatsAppLink
          href={whatsappUrl}
          intent="b2b"
          location="landing_b2b_hero"
          target="_blank"
          rel="noopener noreferrer"
        >
          <WhatsAppIcon className="size-6 text-[#25D366]" />
          {b2bLandingCopy.whatsappHeroCta}
        </TrackedWhatsAppLink>
      </Button>
    </div>
  );
}
