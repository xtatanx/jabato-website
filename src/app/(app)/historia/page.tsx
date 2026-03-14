import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import TimelineVertical from '@/components/timeline-vertical';
import { Button } from '@/components/ui/button';
import LexicalRenderer from '@/components/lexical-renderer';
import {
  getHistoriaPageSchema,
  getOrganizationSchema,
} from '@/lib/structured-data';
import { getHistoryPage, getPageData } from '@/lib/pages-data';
import { getMediaUrl, isMediaPopulated } from '@/lib/media';

interface TimelineMilestone {
  year: string;
  title: string;
  description: string;
  image?: string;
}

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageData('Nuestra Historia');

  if (!page || !page.meta) {
    return {
      title: 'Nuestra Historia',
      description:
        'Descubre la historia de Jabato, desde nuestros inicios como homebrewers hasta convertirnos en una cervecería artesanal reconocida en Colombia.',
    };
  }

  return {
    title: page.meta.title || page.title,
    description: page.meta.description || undefined,
    openGraph: (() => {
      const metaImage = page.meta.image;
      if (
        metaImage &&
        isMediaPopulated(metaImage) &&
        typeof metaImage === 'object' &&
        'alt' in metaImage
      ) {
        return {
          images: [
            {
              url: getMediaUrl(metaImage) || '',
              alt: metaImage.alt,
            },
          ],
        };
      }
      return undefined;
    })(),
  };
}

export default async function HistoriaPage() {
  const organizationSchema = getOrganizationSchema();
  const pageSchema = getHistoriaPageSchema();
  const historyPageData = await getHistoryPage();

  if (!historyPageData) {
    throw new Error('Historia page data is required but not found in CMS');
  }

  // Ensure required sections exist
  if (
    !historyPageData.timelineSection ||
    !historyPageData.timelineSection.milestones
  ) {
    throw new Error(
      'Historia page timeline section with milestones is required in CMS'
    );
  }

  // Process milestones from CMS
  const processedMilestones: TimelineMilestone[] =
    historyPageData.timelineSection.milestones.map((milestone) => ({
      year: milestone.year,
      title: milestone.title,
      description: milestone.description,
      image:
        milestone.image && isMediaPopulated(milestone.image)
          ? getMediaUrl(milestone.image) || undefined
          : undefined,
    }));

  // Hero image
  const heroImage = historyPageData.hero?.heroImage;
  const heroImageUrl =
    heroImage && isMediaPopulated(heroImage) ? getMediaUrl(heroImage) : null;
  let heroImageAlt = '';
  if (
    heroImage &&
    isMediaPopulated(heroImage) &&
    typeof heroImage === 'object' &&
    'alt' in heroImage
  ) {
    heroImageAlt = heroImage.alt;
  }

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
        <section className="bg-primary relative grid items-center gap-8 mb-12 min-h-[400px] lg:aspect-video lg:gap-12 lg:mb-20 lg:max-h-[400px] lg:w-full">
          {heroImageUrl && (
            <>
              <Image
                src={heroImageUrl}
                className="object-cover z-0"
                alt={heroImageAlt}
                fill
                priority
              />
              <div className="absolute inset-0 bg-black/30 z-0" />
            </>
          )}

          <div className="container mx-auto grid-area-1 relative z-10 px-4 text-center">
            {historyPageData.hero?.title && (
              <LexicalRenderer
                data={historyPageData.hero.title}
                className="text-shadow-xs text-primary-foreground"
                enableGutter={false}
                enableProse={false}
              />
            )}
          </div>
        </section>

        {/* SEO Text Section */}
        {historyPageData.contentSection?.text && (
          <section className="pb-12 lg:pb-20">
            <div className="container mx-auto">
              <LexicalRenderer
                data={historyPageData.contentSection.text}
                className="text-center mb-6 sm:max-w-1/2 mx-auto lg:mb-8 text-lg sm:text-xl"
                enableGutter={false}
                enableProse={false}
              />
            </div>
          </section>
        )}

        {/* Timeline Section - Vertical with Scroll Animation */}
        <section className="bg-primary py-12 lg:py-20">
          <div className="container mx-auto px-4">
            {historyPageData.timelineSection?.title && (
              <LexicalRenderer
                data={historyPageData.timelineSection.title}
                className="text-primary-foreground text-center mb-12 lg:mb-20"
                enableGutter={false}
                enableProse={false}
              />
            )}

            <TimelineVertical milestones={processedMilestones} />
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
