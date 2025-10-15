import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import TimelineVertical from '@/components/timeline-vertical';
import {
  getHistoriaPageSchema,
  getOrganizationSchema,
} from '@/lib/structured-data';
import { Button } from '@/components/ui/button';

interface TimelineMilestone {
  year: string;
  title: string;
  description: string;
  image?: string;
}

const milestones: TimelineMilestone[] = [
  {
    year: '2020',
    title: 'Los Inicios',
    description:
      'Un balde plástico, un fermentador y mucha pasión. Así fue como nació Jabato. Jorge González comenzó experimentando con recetas caseras, buscando ese sabor perfecto que no encontraba en las cervezas comerciales. Lo que empezó como un hobby en casa, pronto se convertiría en una obsesión por crear cervezas artesanales de calidad.',
    image: '/equipo-homebrewer-de-jabato-en-sus-inicios.jpg',
  },
  {
    year: '2021',
    title: 'Primeras Recetas',
    description:
      'El año de la experimentación. Decenas de recetas probadas, ajustadas y perfeccionadas. Amigos y familia se convirtieron en nuestros primeros catadores, brindando feedback honesto que nos ayudó a pulir cada detalle. Fue el año de aprender qué funcionaba y qué no, de entender los ingredientes y de encontrar nuestro estilo único.',
  },
  {
    year: '2022',
    title: 'Nacimiento de Jabato',
    description:
      'El salto de fe. De la cocina de casa a una pequeña instalación propia. Jabato Cervecería nació oficialmente, con la misión de compartir nuestra pasión por la cerveza artesanal con Colombia. Un proyecto personal que a través de la cerveza y la amistad se convirtió en una realidad. #APulsoYFrentera dejó de ser solo una frase para convertirse en nuestra filosofía.',
  },
  {
    year: '2023',
    title: 'Expansión de Línea',
    description:
      'Lanzamos nuestras primeras tres cervezas de línea: American Amber Ale, Belgian Blond Ale, y West Coast IPA. Cada una con su propio carácter, pero todas compartiendo el mismo compromiso con la calidad. Comenzamos a distribuir en bares y restaurantes locales, y la respuesta del público superó nuestras expectativas más optimistas.',
    image:
      '/botellas-de-amber-ale-belgian-blond-ale-west-coast-ipa-porter-y-hard-seltzer.png',
  },
  {
    year: '2024',
    title: 'Crecimiento',
    description:
      'El año del crecimiento y la comunidad. Expandimos nuestra distribución, conocimos a cientos de amantes de la cerveza artesanal, y construimos una comunidad apasionada alrededor de Jabato. Cada cerveza vendida, cada feedback recibido, cada sonrisa de satisfacción nos motivó a seguir mejorando. La máxima calidad en lotes pequeños se convirtió en nuestro sello distintivo.',
  },
  {
    year: '2025',
    title: 'El Futuro',
    description:
      'Continuamos innovando, experimentando con nuevos estilos y técnicas. Nuestro compromiso con la cerveza artesanal de principio a fin, sin atajos, se mantiene intacto. Queremos seguir compartiendo nuestra pasión con el mundo, una cerveza a la vez. El camino que comenzó con un balde plástico continúa, y apenas estamos empezando.',
  },
];

export default function HistoriaPage() {
  const organizationSchema = getOrganizationSchema();
  const pageSchema = getHistoriaPageSchema();

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
        <section className="bg-primary relative grid items-center gap-8 pb-12 min-h-[400px] lg:aspect-video lg:gap-12 lg:bb-20 lg:max-h-[400px] lg:w-full">
          <Image
            src="/equipo-homebrewer-de-jabato-en-sus-inicios.jpg"
            className="object-cover z-0"
            alt="Equipo Homebrewer de Jabato en sus inicios"
            fill
            priority
          />
          <div className="absolute inset-0 bg-black/30 z-0" />

          <div className="container mx-auto grid-area-1 relative z-10 px-4 text-center">
            <h1 className="text-4xl font-extrabold uppercase text-shadow-xs text-primary-foreground sm:text-5xl md:text-6xl lg:text-7xl">
              Nuestra <span className="text-brand">Historia</span>
            </h1>
          </div>
        </section>

        {/* Timeline Section - Vertical with Scroll Animation */}
        <section className="bg-primary py-12 lg:py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-primary-foreground text-center uppercase mb-12 lg:mb-20">
              El Camino de <span className="text-brand">Jabato</span>
            </h2>

            <TimelineVertical milestones={milestones} />
          </div>
        </section>

        {/* Call to Action Section */}
        <section className="py-12 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center flex flex-col gap-6 lg:gap-8">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-secondary-foreground uppercase">
                ¿Listo para probar nuestra{' '}
                <span className="text-brand">pasión?</span>
              </h2>
              <p className="text-lg sm:text-xl text-secondary-foreground/80">
                Cada botella cuenta una historia. Descubre nuestras cervezas
                artesanales y sé parte del camino de Jabato.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button asChild className="bg-brand hover:bg-brand/90">
                  <Link href="/cervezas">Ver nuestras cervezas</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
