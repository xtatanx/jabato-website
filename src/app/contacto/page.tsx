import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import ContactForm from '@/components/contact-form';
import BreadcrumbNav from '@/components/breadcrumb-nav';
import {
  getContactPageSchema,
  getOrganizationSchema,
} from '@/lib/structured-data';

export default function ContactoPage() {
  const organizationSchema = getOrganizationSchema();
  const pageSchema = getContactPageSchema();

  const breadcrumbItems = [{ label: 'Contacto', href: '/contacto' }];

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }}
      />

      <div>
        {/* Hero Section */}
        <section className="bg-primary relative grid items-center gap-8 min-h-[400px] lg:aspect-video lg:gap-12  lg:max-h-[400px] lg:w-full">
          <Image
            src="/personas-tomando-jabato-amber-ale.png"
            className="object-cover z-0"
            alt="Personas tomando Jabato Amber Ale"
            fill
            priority
          />
          <div className="absolute inset-0 bg-black/30 z-0" />

          <div className="container mx-auto grid-area-1 relative z-10 px-4 text-center">
            <h1 className="text-4xl font-extrabold uppercase text-shadow-xs text-primary-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              Pongámonos en <span className="text-brand">contacto</span>
            </h1>
          </div>
        </section>

        {/* Contact Form Section */}
        <section className="bg-primary py-12 lg:py-20">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-6">
              {/* Contact Information */}
              <div className="text-primary-foreground max-w-lg">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground uppercase mb-8">
                  Hablemos de <span className="text-brand">cerveza</span>
                </h2>

                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      ¿Qué podemos hacer por ti?
                    </h3>
                    <p className="text-primary-foreground/80">
                      Desde consultas sobre nuestros productos hasta
                      oportunidades de distribución y colaboraciones. Estamos
                      abiertos a nuevas ideas y proyectos que nos ayuden a
                      llevar la pasión por la cerveza artesanal a más personas.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Tiempo de respuesta
                    </h3>
                    <p className="text-primary-foreground/80">
                      Nos comprometemos a responder todos los mensajes en un
                      plazo máximo de 24 horas durante días hábiles. Tu mensaje
                      es importante para nosotros.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Información adicional
                    </h3>
                    <p className="text-primary-foreground/80">
                      Si tienes alguna pregunta específica sobre nuestros
                      procesos, ingredientes o disponibilidad, no dudes en
                      mencionarlo en tu mensaje. Estaremos encantados de
                      ayudarte.
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-card p-10 rounded-lg">
                <ContactForm />
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-12 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center flex flex-col gap-6 lg:gap-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-secondary-foreground uppercase">
                Mientras esperas, descubre nuestras{' '}
                <span className="text-brand">cervezas</span>
              </h2>
              <p className="text-lg sm:text-xl text-secondary-foreground/80">
                Cada cerveza Jabato cuenta una historia única de sabor y
                calidad. Explora nuestra colección y encuentra tu próxima
                cerveza favorita.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button asChild className="bg-brand hover:bg-brand/90">
                  <Link href="/cervezas">Ver nuestras cervezas</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/historia">Conoce nuestra historia</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
