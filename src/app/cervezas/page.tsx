import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import { Button } from '@/components/ui/button';

export const metadata: Metadata = {
  title: 'Descubre nuestras cervezas',
  description:
    'Descubre el auténtico sabor artesanal de Jabato y lo que nos hace únicos.',
};

export default function Cervezas() {
  return (
    <>
      <section className="relative grid items-center gap-8 mb-12 min-h-[400px] lg:aspect-video lg:gap-12 lg:mb-20 lg:h- lg:max-h-[400px] lg:w-full">
        <Image
          src="/personas-tomando-jabato-amber-ale.png"
          className="object-cover z-0"
          alt="4 pack de Jabato enlatado"
          fill
          priority
        />
        <div className="absolute inset-0 bg-black/30 z-0"></div>

        <div className="container mx-auto grid-area-1 relative z-10 px-4 text-center">
          <h1 className="text-4xl font-extrabold uppercase text-shadow-xs text-primary-foreground sm:text-5xl md:text-6xl lg:text-7xl">
            Nuestras <span className="text-brand">cervezas</span>
          </h1>
        </div>
      </section>
      <section className="pb-12 lg:pb-20">
        <div className="container mx-auto">
          <p className="text-center text-lg mb-6 sm:text-xl lg:mb-8 sm:max-w-1/2 mx-auto">
            Cada cerveza Jabato cuenta una historia de malta, lúpulo y pasión
            inquebrantable. Esta es nuestra colección viva y en constante
            expansión, el resultado de la experimentación con los mejores
            ingredientes. Sumérgete en el sabor de nuestros clásicos
            inconfundibles y mantente atento a las nuevas cervezas que nuestro
            maestro cervecero está perfeccionando en el barril y que pronto se
            unirán a nuestro catálogo. ¿Listo para tu próxima gran cerveza?
          </p>
        </div>
      </section>
      <section className="pb-12 lg:pb-20">
        <div className="container mx-auto px-4">
          <div className="sm:max-w-8/12 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {/* American Amber Ale */}
              <Link href="/cervezas/american-amber-ale" className="group block">
                <div className="relative aspect-square overflow-hidden mb-4">
                  <Image
                    src="/botellas-de-amber-ale-belgian-blond-ale-west-coast-ipa-porter-y-hard-seltzer.png"
                    alt="American Amber Ale"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <h3 className="text-2xl font-bold mb-1">American Amber Ale</h3>
                <p className="text-lg text-brand">ABV: 5.5%</p>
              </Link>

              {/* Belgian Blond Ale */}
              <Link href="/cervezas/belgian-blond-ale" className="group block">
                <div className="relative aspect-square overflow-hidden mb-4">
                  <Image
                    src="/botellas-de-amber-ale-belgian-blond-ale-west-coast-ipa-porter-y-hard-seltzer.png"
                    alt="Belgian Blond Ale"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-brand text-white px-3 py-1 text-sm font-semibold uppercase">
                    Próximamente
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-1">Belgian Blond Ale</h3>
                <p className="text-lg text-brand">ABV: 6.5%</p>
              </Link>

              {/* West Coast IPA */}
              <Link href="/cervezas/west-coast-ipa" className="group block">
                <div className="relative aspect-square overflow-hidden mb-4">
                  <Image
                    src="/botellas-de-amber-ale-belgian-blond-ale-west-coast-ipa-porter-y-hard-seltzer.png"
                    alt="West Coast IPA"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute top-4 right-4 bg-brand text-white px-3 py-1 text-sm font-semibold uppercase">
                    Próximamente
                  </div>
                </div>
                <h3 className="text-2xl font-bold mb-1">West Coast IPA</h3>
                <p className="text-lg text-brand">ABV: 6.0%</p>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="pb-12 lg:pb-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-extrabold text-center mb-8 sm:text-4xl lg:text-5xl pt-12 lg:pt-20 uppercase">
            Lo que dicen nuestros <span className="text-brand">clientes</span>
          </h2>

          <div className="relative">
            <Carousel className="w-full">
              <CarouselContent>
                <CarouselItem>
                  <div className="flex flex-col gap-6 p-6 text-center">
                    <p className="text-4xl md:text-5xl lg:text-6xl italic font-extrabold leading-none">
                      "La American Amber Ale de Jabato es simplemente
                      excepcional. El equilibrio perfecto entre sabor y calidad
                      artesanal."
                    </p>
                    <div className="flex items-center justify-center gap-4 mt-4">
                      <div className="w-16 h-16 flex-shrink-0">
                        <div className="relative w-full h-full rounded-full overflow-hidden">
                          <Image
                            src="/placeholder-avatar.jpg"
                            alt="Cliente 1"
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-lg">Carlos Rodríguez</p>
                        <p className="text-primary-foreground/70 text-sm">
                          Gerente General, Bar El Refugio
                        </p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>

                <CarouselItem>
                  <div className="flex flex-col gap-6 p-6 text-center">
                    <p className="text-4xl md:text-5xl lg:text-6xl italic font-extrabold leading-none">
                      "Nuestros clientes no paran de pedir las cervezas Jabato.
                      La calidad y el sabor son incomparables."
                    </p>
                    <div className="flex items-center justify-center gap-4 mt-4">
                      <div className="w-16 h-16 flex-shrink-0">
                        <div className="relative w-full h-full rounded-full overflow-hidden">
                          <Image
                            src="/placeholder-avatar.jpg"
                            alt="Cliente 2"
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-lg">María González</p>
                        <p className="text-primary-foreground/70 text-sm">
                          Propietaria, Restaurante La Cervecería
                        </p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>

                <CarouselItem>
                  <div className="flex flex-col gap-6 p-6 text-center">
                    <p className="text-4xl md:text-5xl lg:text-6xl italic font-extrabold leading-none">
                      "Jabato ha transformado nuestra carta de cervezas.
                      Productos artesanales de primera calidad."
                    </p>
                    <div className="flex items-center justify-center gap-4 mt-4">
                      <div className="w-16 h-16 flex-shrink-0">
                        <div className="relative w-full h-full rounded-full overflow-hidden">
                          <Image
                            src="/placeholder-avatar.jpg"
                            alt="Cliente 3"
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                      <div className="text-left">
                        <p className="font-bold text-lg">Javier Martínez</p>
                        <p className="text-primary-foreground/70 text-sm">
                          Sommelier, Hotel Boutique Plaza
                        </p>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              </CarouselContent>
              <div className="absolute bottom-6 right-6 flex gap-4">
                <CarouselPrevious className="static translate-y-0 h-14 w-14 bg-primary-foreground text-primary hover:bg-primary-foreground/90" />
                <CarouselNext className="static translate-y-0 h-14 w-14 bg-primary-foreground text-primary hover:bg-primary-foreground/90" />
              </div>
            </Carousel>
          </div>
        </div>
      </section>

      {/* Business CTA Section */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-extrabold mb-4 sm:text-4xl lg:text-5xl uppercase">
              ¿Quieres vender <span className="text-brand">Jabato</span> en tu
              negocio?
            </h2>
            <p className="text-lg sm:text-xl mb-8">
              Únete a nuestra red de distribuidores y ofrece a tus clientes la
              mejor cerveza artesanal. Contáctanos hoy y descubre las
              oportunidades que tenemos para tu negocio.
            </p>
            <Button asChild className="bg-brand hover:bg-brand/90">
              <a
                href="https://wa.me/573337058517?text=Hola%2C%20soy%20due%C3%B1o%20de%20un%20negocio%20y%20estoy%20interesado%20en%20vender%20Jabato%20en%20mi%20establecimiento.%20Me%20gustar%C3%ADa%20conocer%20m%C3%A1s%20informaci%C3%B3n."
                target="_blank"
                rel="noopener noreferrer"
              >
                Contactar por WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
