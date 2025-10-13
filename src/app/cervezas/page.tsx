import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { BusinessCtaSection } from '@/components/business-cta-section';
import { TestimonialsSection } from '@/components/testimonials-section';
import { getAllBeers } from '@/lib/beers-data';

export const metadata: Metadata = {
  title: 'Descubre nuestras cervezas',
  description:
    'Descubre el auténtico sabor artesanal de Jabato y lo que nos hace únicos.',
};

export default function Cervezas() {
  const beers = getAllBeers();

  // General testimonials for the cervezas page
  const generalTestimonials = [
    {
      quote:
        'La American Amber Ale de Jabato es simplemente excepcional. El equilibrio perfecto entre sabor y calidad artesanal.',
      author: 'Carlos Rodríguez',
      position: 'Gerente General, Bar El Refugio',
      avatar: '/placeholder-avatar.jpg',
    },
    {
      quote:
        'Nuestros clientes no paran de pedir las cervezas Jabato. La calidad y el sabor son incomparables.',
      author: 'María González',
      position: 'Propietaria, Restaurante La Cervecería',
      avatar: '/placeholder-avatar.jpg',
    },
    {
      quote:
        'Jabato ha transformado nuestra carta de cervezas. Productos artesanales de primera calidad.',
      author: 'Javier Martínez',
      position: 'Sommelier, Hotel Boutique Plaza',
      avatar: '/placeholder-avatar.jpg',
    },
  ];

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
              {beers.map((beer) => (
                <Link
                  key={beer.id}
                  href={`/cervezas/${beer.slug}`}
                  className="group block"
                >
                  <div className="relative aspect-square overflow-hidden mb-4">
                    <Image
                      src={beer.images.main}
                      alt={beer.name}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    {!beer.available && (
                      <div className="absolute top-4 right-4 bg-brand text-white px-3 py-1 text-sm font-semibold uppercase">
                        Próximamente
                      </div>
                    )}
                  </div>
                  <h3 className="text-2xl font-bold mb-1">{beer.name}</h3>
                  <p className="text-lg text-brand">ABV: {beer.abv}%</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection testimonials={generalTestimonials} />

      {/* Business CTA Section */}
      <BusinessCtaSection />
    </>
  );
}
