import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="pt-8">
      <section className="flex flex-col lg:flex-row items-center lg:h-[650px] gap-8 lg:gap-12 container mx-auto mb-12 lg:mb-20 px-4">
        <div className="w-full lg:w-3/5 flex flex-col gap-6 lg:gap-8 items-start">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-extrabold leading-tight">
            <span className="text-brand">Cerveza artesanal</span> de principio a
            fin, <span className="text-brand">sin atajos</span>.
          </h1>
          <Button asChild size="lg" className="w-full sm:w-auto">
            <Link href="/cervezas">Descubre nuestras cervezas</Link>
          </Button>
        </div>
        <div className="w-full lg:w-2/5 h-64 sm:h-80 lg:h-full relative">
          <Image
            src="/4-pack-de-jabato-enlata.jpg"
            className="object-cover rounded"
            alt="4 pack de Jabato enlatado"
            fill
            priority
          />
        </div>
      </section>
      <section className="bg-primary py-12 lg:py-20">
        <div className="container mx-auto flex flex-col lg:flex-row gap-8 lg:gap-12 px-4">
          <figure className="w-full lg:w-1/2 aspect-square relative lg:pl-8">
            <Image
              src="/equipo-homebrewer-de-jabato-en-sus-inicios.jpg"
              className="object-cover rounded"
              alt="Equipo Homebrewer de Jabato en sus inicios"
              loading="lazy"
              fill
            />
            <figcaption className="text-sm sm:text-lg lg:text-xl bg-secondary text-secondary-foreground absolute bottom-0 right-0 p-2 sm:p-4 translate-x-1/2 translate-y-1/2 max-w-[80%] sm:max-w-none">
              Jorge González, probando la cerveza en sus inicios
            </figcaption>
          </figure>
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-primary-foreground my-4 lg:my-8 leading-tight">
              La pasion detrás de <span className="text-brand">Jabato</span>
            </h2>
            <p className="text-lg sm:text-xl text-primary-foreground/90 mb-6 lg:mb-8">
              Un balde plastico, un fermentador y mucha pasión. Asi fue como
              nacio <span className="text-brand">Jabato</span>. Un proyecto
              personal que a traves de la cerveza y la amistad se convirtio en
              una cerveceria artesanal. Hoy queremos compartir nuestra pasión
              por la cerveza con el mundo.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-brand hover:bg-brand/90 w-full sm:w-auto"
            >
              <Link href="/historia">Conoce nuestra historia</Link>
            </Button>
          </div>
        </div>
      </section>
      <section className="py-12 lg:py-20">
        <div className="container mx-auto flex flex-col lg:flex-row items-center gap-8 lg:gap-12 px-4">
          <div className="flex flex-col items-start gap-6 lg:gap-12 w-full lg:w-1/2">
            <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold text-secondary-foreground my-4 lg:my-8 leading-tight">
              Explora nuestras <span className="text-brand">cervezas</span>
            </h2>
            <p className="text-lg sm:text-xl">
              Descubre nuestras cervezas, cada una con su propio caracter. Desde
              cervezas tradicionales hasta cervezas con un toque unico. Nuestra
              misión es crear cervezas deliciosas, que destaquen por su calidad
              y que te acompañen en todo parche.
            </p>
            <Button asChild size="lg" className="w-full sm:w-auto">
              <Link href="/cervezas">Ver todas las cervezas</Link>
            </Button>
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-8xl font-bold text-primary-foreground text-center leading-tight">
            <span className="text-brand">Guía Jabato:</span> Maridaje, Procesos
            y Más
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 lg:gap-12 w-full max-w-6xl mx-auto">
            <div className="flex flex-col gap-3 group">
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
              <h3 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-primary-foreground">
                Maridaje perfecto
              </h3>
              <p className="text-base sm:text-lg lg:text-xl text-primary-foreground group-hover:underline">
                Descubre cómo combinar nuestras cervezas con tus comidas
                favoritas. Desde snacks salados hasta postres dulces, te
                ayudamos a encontrar el maridaje perfecto.
              </p>
            </div>
            <div className="flex flex-col gap-3 group">
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
              <h3 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-primary-foreground">
                ¿Que es una cerveza artesanal?
              </h3>
              <p className="text-base sm:text-lg lg:text-xl text-primary-foreground group-hover:underline">
                Descubre cómo es el proceso de hacer una cerveza artesanal.
                Desde la receta hasta el proceso de fermentación, te ayudamos a
                entender cómo es el proceso de hacer una cerveza artesanal.
              </p>
            </div>
            <div className="flex flex-col gap-3 group">
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
              <h3 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-primary-foreground">
                ¿Como catar cervezas?
              </h3>
              <p className="text-base sm:text-lg lg:text-xl text-primary-foreground group-hover:underline">
                Descubre cómo catar una cerveza, desde la cerveza mas fuerte
                hasta la mas ligera. Te ayudamos a encontrar la cerveza perfecta
                para tu paladar.
              </p>
            </div>
            <div className="flex flex-col gap-3 group">
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
              <h3 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-primary-foreground">
                Maridaje perfecto
              </h3>
              <p className="text-base sm:text-lg lg:text-xl text-primary-foreground group-hover:underline">
                Descubre cómo combinar nuestras cervezas con tus comidas
                favoritas. Desde snacks salados hasta postres dulces, te
                ayudamos a encontrar el maridaje perfecto.
              </p>
            </div>
          </div>
          <Button
            asChild
            size="lg"
            className="bg-brand hover:bg-brand/90 w-full sm:w-auto"
          >
            <Link href="/blog">Ir al blog</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
