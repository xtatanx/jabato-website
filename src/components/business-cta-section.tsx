import { Button } from "@/components/ui/button";

interface BusinessCtaSectionProps {
  title?: string;
  description?: string;
  whatsappMessage?: string;
}

export function BusinessCtaSection({
  title = "¿Quieres vender Jabato en tu negocio?",
  description = "Únete a nuestra red de distribuidores y ofrece a tus clientes la mejor cerveza artesanal. Contáctanos hoy y descubre las oportunidades que tenemos para tu negocio.",
  whatsappMessage = "Hola, soy dueño de un negocio y estoy interesado en vender Jabato en mi establecimiento. Me gustaría conocer más información.",
}: BusinessCtaSectionProps) {
  const encodedMessage = encodeURIComponent(whatsappMessage);
  const whatsappUrl = `https://wa.me/573337058517?text=${encodedMessage}`;

  return (
    <section className="py-12 lg:py-20">
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
          <p className="text-lg sm:text-xl mb-8">{description}</p>
          <Button asChild className="bg-brand hover:bg-brand/90">
            <a href={whatsappUrl} target="_blank" rel="noopener noreferrer">
              Contactar por WhatsApp
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
}
