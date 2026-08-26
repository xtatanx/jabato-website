import { site } from "@content/site";
import Link from "next/link";
import { TrackedWhatsAppLink } from "@/components/tracked-whatsapp-link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface BusinessCtaSectionProps {
  title?: string;
  description?: string;
  whatsappMessage?: string;
  href?: string;
  ctaLabel?: string;
  tone?: "light" | "dark";
  showWhatsApp?: boolean;
}

export function BusinessCtaSection({
  title = "¿Quieres vender Jabato en tu negocio?",
  description = "Únete a nuestra red de distribuidores y ofrece a tus clientes la mejor cerveza artesanal. Contáctanos hoy y descubre las oportunidades que tenemos para tu negocio.",
  whatsappMessage = "Hola, soy dueño de un negocio y estoy interesado en vender Jabato en mi establecimiento. Me gustaría conocer más información.",
  href,
  ctaLabel = "Ver distribución",
  tone = "light",
  showWhatsApp = true,
}: BusinessCtaSectionProps) {
  const encodedMessage = encodeURIComponent(whatsappMessage);
  const whatsappUrl = `https://wa.me/${site.contact.whatsapp}?text=${encodedMessage}`;
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
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            {href ? (
              <Button asChild className="bg-brand hover:bg-brand/90">
                <Link href={href}>{ctaLabel}</Link>
              </Button>
            ) : null}
            {showWhatsApp ? (
              <Button
                asChild
                variant={href ? "outline" : "default"}
                className={
                  href
                    ? isDark
                      ? "border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"
                      : undefined
                    : "bg-brand hover:bg-brand/90"
                }
              >
                <TrackedWhatsAppLink
                  href={whatsappUrl}
                  intent="b2b"
                  location="business_cta"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Contactar por WhatsApp
                </TrackedWhatsAppLink>
              </Button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
