import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { BusinessCtaSection } from '@/components/business-cta-section';
import {
  TestimonialsSection,
  type Testimonial,
} from '@/components/testimonials-section';
import LexicalRenderer from '@/components/lexical-renderer';
import { getAllBeers } from '@/lib/payload';
import { getBeersPage, getPageData } from '@/lib/pages-data';
import { getMediaUrl, isMediaPopulated } from '@/lib/media';
import { extractTextFromLexical } from '@/lib/lexical-utils';
import { unstable_cache } from 'next/cache';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageData('Cervezas');

  if (!page || !page.meta) {
    return {
      title: 'Descubre nuestras cervezas',
      description:
        'Descubre el auténtico sabor artesanal de Jabato y lo que nos hace únicos.',
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

const getCachedBeers = unstable_cache(async () => getAllBeers(), ['beers'], {
  tags: ['beers'],
});

export default async function Cervezas() {
  const beers = await getCachedBeers();
  const beersPageData = await getBeersPage();

  if (!beersPageData) {
    throw new Error('Cervezas page data is required but not found in CMS');
  }

  // Hero image
  const heroImage = beersPageData.hero?.heroImage;
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

  // Process testimonials from CMS
  const testimonials: Testimonial[] = beersPageData.quotesSection?.quotes
    ? beersPageData.quotesSection.quotes
        .filter(
          (quoteRef) =>
            quoteRef && typeof quoteRef === 'object' && 'value' in quoteRef,
        )
        .map((quoteRef) => {
          const quote = quoteRef.value;
          if (typeof quote !== 'object' || !quote) {
            return null;
          }

          const testimonial: Testimonial = {
            quote: quote.quote ? extractTextFromLexical(quote.quote) : '',
            author: quote.author?.name || '',
            position: quote.author?.position || '',
          };

          if (
            quote.author?.image &&
            typeof quote.author.image === 'object' &&
            'url' in quote.author.image
          ) {
            const avatarUrl = getMediaUrl(quote.author.image);
            if (avatarUrl) {
              testimonial.avatar = avatarUrl;
            }
          }

          return testimonial;
        })
        .filter(
          (testimonial): testimonial is Testimonial => testimonial !== null,
        )
    : [];

  return (
    <>
      <section className="relative grid items-center gap-8 mb-12 min-h-[400px] lg:aspect-video lg:gap-12 lg:mb-20 lg:h- lg:max-h-[400px] lg:w-full">
        {heroImageUrl && (
          <>
            <Image
              src={heroImageUrl}
              className="object-cover z-0"
              alt={heroImageAlt}
              fill
              priority
            />
            <div className="absolute inset-0 bg-black/30 z-0"></div>
          </>
        )}

        <div className="container mx-auto grid-area-1 relative z-10 px-4 text-center">
          {beersPageData.hero?.title && (
            <LexicalRenderer
              data={beersPageData.hero.title}
              className="text-shadow-xs text-primary-foreground"
              enableGutter={false}
              enableProse={false}
            />
          )}
        </div>
      </section>
      {beersPageData.contentSection?.title && (
        <section className="pb-12 lg:pb-20">
          <div className="container mx-auto">
            <LexicalRenderer
              data={beersPageData.contentSection.title}
              className="text-center text-lg sm:text-xl mb-6 sm:max-w-1/2 mx-auto lg:mb-8"
              enableGutter={false}
              enableProse={false}
            />
          </div>
        </section>
      )}
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
      <TestimonialsSection
        title={beersPageData.quotesSection?.title ?? undefined}
        testimonials={testimonials}
      />

      {/* Business CTA Section */}
      <BusinessCtaSection />
    </>
  );
}
