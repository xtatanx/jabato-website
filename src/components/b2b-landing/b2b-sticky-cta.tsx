"use client";

import { b2bLandingCopy } from "@content/data/b2b-landing";
import { site } from "@content/site";
import { WhatsAppIcon } from "@/components/brand-icons";
import { TrackedWhatsAppLink } from "@/components/tracked-whatsapp-link";
import { Button } from "@/components/ui/button";

export function B2BStickyCta() {
  const whatsappUrl = `https://wa.me/${site.contact.whatsapp}?text=${encodeURIComponent(b2bLandingCopy.whatsappMessage)}`;

  const handleScrollToForm = () => {
    document.getElementById("cotizar")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border bg-background/95 p-3 shadow-lg backdrop-blur-sm md:hidden">
      <div className="flex gap-3">
        <Button
          type="button"
          size="lg"
          className="h-12 flex-1 text-base bg-brand hover:bg-brand/90"
          onClick={handleScrollToForm}
        >
          {b2bLandingCopy.formCta}
        </Button>
        <Button
          asChild
          variant="secondary"
          size="lg"
          className="h-12 shrink-0 px-4"
        >
          <TrackedWhatsAppLink
            href={whatsappUrl}
            intent="b2b"
            location="landing_b2b_sticky"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Cotizar por WhatsApp"
          >
            <WhatsAppIcon className="size-6 text-[#25D366]" />
            <span className="sr-only">{b2bLandingCopy.whatsappStickyCta}</span>
          </TrackedWhatsAppLink>
        </Button>
      </div>
    </div>
  );
}
