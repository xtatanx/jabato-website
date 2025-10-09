import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { Metadata } from 'next';

export default function Home() {
  return (
    <div>
      <section className="relative grid items-center gap-8 mb-12 min-h-[400px] lg:aspect-video lg:gap-12 lg:mb-20 lg:h-[calc(100dvh-250px)] lg:min-h-[500px] lg:w-full">
        <Image
          src="/personas-tomando-jabato-amber-ale.png"
          className="object-cover z-0"
          alt="4 pack de Jabato enlatado"
          fill
          priority
        />
        <div className="absolute inset-0 bg-black/30 z-0"></div>

        <div className="container mx-auto grid-area-1 relative z-10 px-4">
          <div className="w-full lg:w-3/5 flex flex-col gap-6 lg:gap-8 items-start">
            <h1 className="text-4xl font-extrabold uppercase text-shadow-xs text-primary-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="text-brand">Cerveza artesanal</span> de principio
              a fin, sin atajos.
            </h1>
            <Button asChild className="bg-brand hover:bg-brand/90">
              <Link href="/cervezas">Descubre nuestras cervezas</Link>
            </Button>
          </div>
        </div>
      </section>
      <section className="pb-12 lg:pb-20">
        <div className="container mx-auto">
          <h2 className="text-center text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold text-secondary-foreground uppercase">
            La Máxima Calidad en Lotes Pequeños. Cervezas Artesanales Hechas{' '}
            <span className="text-brand">#APulsoYFrentera</span>
          </h2>
        </div>
      </section>
      <section className="bg-primary py-12 lg:py-20">
        <div className="container mx-auto flex flex-col lg:flex-row gap-10 sm:gap-16 lg:gap-12 px-4">
          <figure className="w-full lg:w-1/2 aspect-square relative lg:pl-8 rounded">
            <Image
              src="/equipo-homebrewer-de-jabato-en-sus-inicios.jpg"
              className="object-cover"
              alt="Equipo Homebrewer de Jabato en sus inicios"
              loading="lazy"
              fill
            />
            <figcaption className="text-sm sm:text-lg text-primary-foreground lg:text-xl xl:bg-secondary xl:text-secondary-foreground absolute top-[calc(100%)] xl:bottom-0 xl:right-0 xl:top-auto p-2 sm:p-4 xl:translate-x-1/2 xl:translate-y-1/2 xl:max-w-[80%] sm:max-w-none">
              Jorge González, probando la cerveza en sus inicios
            </figcaption>
          </figure>
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-primary-foreground my-4 lg:my-8 uppercase">
              La pasion detrás de <span className="text-brand">Jabato</span>
            </h2>
            <p className="text-lg sm:text-xl text-primary-foreground/90 mb-6 lg:mb-8">
              Un balde plastico, un fermentador y mucha pasión. Asi fue como
              nacio <span className="text-brand">Jabato</span>. Un proyecto
              personal que a traves de la cerveza y la amistad se convirtio en
              una cerveceria artesanal. Hoy queremos compartir nuestra pasión
              por la cerveza con el mundo.
            </p>
            <Link
              href="/historia"
              className="inline-flex items-center gap-2 text-lg sm:text-xl font-semibold text-brand hover:text-brand/80 transition-colors duration-200 group"
            >
              Conoce nuestra historia
              <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
      <section className="py-12 lg:py-20">
        <div className="container mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-12 px-4">
          <div className="flex flex-col items-start gap-6 lg:gap-12 w-full lg:w-1/2">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-secondary-foreground my-4 lg:my-8 uppercase">
              Explora nuestras <span className="text-brand">cervezas</span>
            </h2>
            <p className="text-lg sm:text-xl">
              Descubre nuestras cervezas, cada una con su propio caracter. Desde
              cervezas tradicionales hasta cervezas con un toque unico. Nuestra
              misión es crear cervezas deliciosas, que destaquen por su calidad
              y que te acompañen en todo parche.
            </p>
            <Link
              href="/cervezas"
              className="inline-flex items-center gap-2 text-lg sm:text-xl font-semibold text-brand hover:text-brand/80 transition-colors duration-200 group"
            >
              Ver todas las cervezas
              <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          </div>
          <div className="w-full lg:w-1/2 aspect-video relative">
            <Image
              src="/botellas-de-amber-ale-belgian-blond-ale-west-coast-ipa-porter-y-hard-seltzer.png"
              className="object-cover rounded transition-transform duration-300 group-[]:-hover:scale-105"
              alt="De Izquierda a derecha: Amber Ale, Belgian Blond Ale, West Coast IPA, Porter y Hard Seltzer"
              loading="lazy"
              fill
            />
          </div>
        </div>
      </section>
      <section className="bg-primary py-12 lg:py-20">
        <div className="container mx-auto flex flex-col gap-6 lg:gap-8 items-center px-4">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-extrabold text-primary-foreground text-center uppercase">
            Historias, Catas y Experiencias{' '}
            <span className="text-brand">Jabato</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 lg:gap-12 w-full">
            <Link
              href="/blog/maridaje-perfecto"
              className="flex flex-col gap-3 group cursor-pointer"
            >
              <div className="aspect-square relative rounded overflow-hidden">
                <Image
                  src="/botellas-de-amber-ale-belgian-blond-ale-west-coast-ipa-porter-y-hard-seltzer.png"
                  className="object-cover rounded transition-transform duration-300 group-hover:scale-105"
                  alt="De Izquierda a derecha: Amber Ale, Belgian Blond Ale, West Coast IPA, Porter y Hard Seltzer"
                  loading="lazy"
                  fill
                />
              </div>
              <time
                dateTime="2025-09-24"
                className="text-sm sm:text-md text-brand"
              >
                Septiembre 24, 2025
              </time>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-primary-foreground group-hover:text-brand transition-colors duration-200">
                Maridaje perfecto
              </h3>
            </Link>
            <Link
              href="/blog/que-es-cerveza-artesanal"
              className="flex flex-col gap-3 group cursor-pointer"
            >
              <div className="aspect-square relative rounded overflow-hidden">
                <Image
                  src="/botellas-de-amber-ale-belgian-blond-ale-west-coast-ipa-porter-y-hard-seltzer.png"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  alt="De Izquierda a derecha: Amber Ale, Belgian Blond Ale, West Coast IPA, Porter y Hard Seltzer"
                  loading="lazy"
                  fill
                />
              </div>
              <time
                dateTime="2025-09-24"
                className="text-sm sm:text-md text-brand"
              >
                Septiembre 20, 2025
              </time>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-primary-foreground group-hover:text-brand transition-colors duration-200">
                ¿Que es una cerveza artesanal?
              </h3>
            </Link>
            <Link
              href="/blog/como-catar-cervezas"
              className="flex flex-col gap-3 group cursor-pointer"
            >
              <div className="aspect-square relative rounded overflow-hidden">
                <Image
                  src="/botellas-de-amber-ale-belgian-blond-ale-west-coast-ipa-porter-y-hard-seltzer.png"
                  className="object-cover rounded transition-transform duration-300 group-hover:scale-105"
                  alt="De Izquierda a derecha: Amber Ale, Belgian Blond Ale, West Coast IPA, Porter y Hard Seltzer"
                  loading="lazy"
                  fill
                />
              </div>
              <time
                dateTime="2025-09-24"
                className="text-sm sm:text-md text-brand"
              >
                Septiembre 10, 2025
              </time>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-primary-foreground group-hover:text-brand transition-colors duration-200">
                ¿Como catar cervezas?
              </h3>
            </Link>
            <Link
              href="/blog/cerveza-artesanal-colombia"
              className="flex flex-col gap-3 group cursor-pointer"
            >
              <div className="aspect-square relative rounded overflow-hidden">
                <Image
                  src="/botellas-de-amber-ale-belgian-blond-ale-west-coast-ipa-porter-y-hard-seltzer.png"
                  className="object-cover rounded transition-transform duration-300 group-hover:scale-105"
                  alt="De Izquierda a derecha: Amber Ale, Belgian Blond Ale, West Coast IPA, Porter y Hard Seltzer"
                  loading="lazy"
                  fill
                />
              </div>
              <time
                dateTime="2025-09-24"
                className="text-sm sm:text-md text-brand"
              >
                Septiembre 5, 2025
              </time>
              <h3 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-primary-foreground group-hover:text-brand transition-colors duration-200">
                Cerveza artesanal en Colombia
              </h3>
            </Link>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-lg sm:text-xl font-semibold text-brand hover:text-brand/80 transition-colors duration-200 group"
          >
            Ver más historias
            <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </div>
  );
}
