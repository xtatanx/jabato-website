import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Button } from '@/components/ui/button';
import LexicalRenderer from '@/components/lexical-renderer';
import { getHomePage, getPageData } from '@/lib/pages-data';
import { getRecentPosts, formatPostDate } from '@/lib/posts-data';
import { getMediaUrl, isMediaPopulated } from '@/lib/media';
import { getLinkUrl, shouldOpenInNewTab } from '@/lib/links';

export async function generateMetadata(): Promise<Metadata> {
  const page = await getPageData('Home');

  if (!page || !page.meta) {
    return {
      title: 'Cerveza Artesanal | Jabato Cervecería',
      description:
        'Cervezas artesanales hechas en Colombia. ¡Somos la cervecería que nació grande desde pequeña!',
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

export default async function Home() {
  const homePageData = await getHomePage();
  const recentPosts = await getRecentPosts(4);

  if (!homePageData) {
    throw new Error('Homepage data is required but not found in CMS');
  }

  // Hero Section
  const heroImage = homePageData.hero.heroImage;
  const heroImageUrl = getMediaUrl(heroImage);
  let heroImageAlt = '';
  if (
    heroImage &&
    isMediaPopulated(heroImage) &&
    typeof heroImage === 'object' &&
    'alt' in heroImage
  ) {
    heroImageAlt = heroImage.alt;
  }
  const heroLinkUrl = getLinkUrl(homePageData.hero.link);
  const heroLinkNewTab = shouldOpenInNewTab(homePageData.hero.link);

  // History Section
  const historyImage = homePageData.historySection.image;
  const historyImageUrl = getMediaUrl(historyImage);
  let historyImageAlt = '';
  if (
    historyImage &&
    isMediaPopulated(historyImage) &&
    typeof historyImage === 'object' &&
    'alt' in historyImage
  ) {
    historyImageAlt = historyImage.alt;
  }
  const historyLinkUrl = getLinkUrl(homePageData.historySection.link);
  const historyLinkNewTab = shouldOpenInNewTab(
    homePageData.historySection.link
  );

  // Beers Section
  const beersImage = homePageData.beersSection.image;
  const beersImageUrl = getMediaUrl(beersImage);
  let beersImageAlt = '';
  if (
    beersImage &&
    isMediaPopulated(beersImage) &&
    typeof beersImage === 'object' &&
    'alt' in beersImage
  ) {
    beersImageAlt = beersImage.alt;
  }
  const beersLinkUrl = getLinkUrl(homePageData.beersSection.link);
  const beersLinkNewTab = shouldOpenInNewTab(homePageData.beersSection.link);

  // Blog Section
  const blogLinkUrl = getLinkUrl(homePageData.blogSection.link);
  const blogLinkNewTab = shouldOpenInNewTab(homePageData.blogSection.link);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative grid items-center gap-8 mb-12 min-h-[400px] lg:aspect-video lg:gap-12 lg:mb-20 lg:h-[calc(100dvh-250px)] lg:min-h-[500px] lg:w-full">
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

        <div className="container mx-auto grid-area-1 relative z-10 px-4">
          <div className="w-full lg:w-3/5 flex flex-col gap-6 lg:gap-8 items-start">
            {homePageData.hero.title && (
              <LexicalRenderer
                data={homePageData.hero.title}
                className="text-shadow-xs text-primary-foreground"
                enableGutter={false}
                enableProse={false}
              />
            )}
            {homePageData.hero.link.label && (
              <Button asChild className="bg-brand hover:bg-brand/90">
                {heroLinkNewTab ? (
                  <a
                    href={heroLinkUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {homePageData.hero.link.label}
                  </a>
                ) : (
                  <Link href={heroLinkUrl}>{homePageData.hero.link.label}</Link>
                )}
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Subtitle Section */}
      {homePageData.subtitle?.text && (
        <section className="pb-12 lg:pb-20">
          <div className="container mx-auto">
            <LexicalRenderer
              data={homePageData.subtitle.text}
              className="text-center text-secondary-foreground"
              enableGutter={false}
              enableProse={false}
            />
          </div>
        </section>
      )}

      {/* History Section */}
      <section className="bg-primary py-12 lg:py-20">
        <div className="container mx-auto flex flex-col lg:flex-row gap-10 sm:gap-16 lg:gap-12 px-4">
          {historyImageUrl && (
            <figure className="w-full lg:w-1/2 aspect-square relative lg:pl-8 rounded">
              <Image
                src={historyImageUrl}
                className="object-cover"
                alt={historyImageAlt}
                loading="lazy"
                fill
              />
              {(() => {
                if (
                  historyImage &&
                  isMediaPopulated(historyImage) &&
                  typeof historyImage === 'object' &&
                  'caption' in historyImage &&
                  historyImage.caption
                ) {
                  return (
                    <figcaption className="text-sm sm:text-lg text-primary-foreground lg:text-xl xl:bg-secondary xl:text-secondary-foreground absolute top-[calc(100%)] xl:bottom-0 xl:right-0 xl:top-auto p-2 sm:p-4 xl:translate-x-1/2 xl:translate-y-1/2 xl:max-w-[80%] sm:max-w-none">
                      <LexicalRenderer
                        data={historyImage.caption}
                        enableGutter={false}
                        enableProse={false}
                      />
                    </figcaption>
                  );
                }
                return null;
              })()}
            </figure>
          )}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            {homePageData.historySection.title && (
              <LexicalRenderer
                data={homePageData.historySection.title}
                className="text-primary-foreground my-4 lg:my-8"
                enableGutter={false}
                enableProse={false}
              />
            )}
            {homePageData.historySection.description && (
              <LexicalRenderer
                data={homePageData.historySection.description}
                className="text-lg sm:text-xl text-primary-foreground/90 mb-6 lg:mb-8"
                enableGutter={false}
                enableProse={false}
              />
            )}
            {homePageData.historySection.link.label && (
              <Link
                href={historyLinkUrl}
                target={historyLinkNewTab ? '_blank' : undefined}
                rel={historyLinkNewTab ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center gap-2 text-lg sm:text-xl font-semibold text-brand hover:text-brand/80 transition-colors duration-200 group"
              >
                {homePageData.historySection.link.label}
                <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            )}
          </div>
        </div>
      </section>

      {/* Beers Section */}
      <section className="py-12 lg:py-20">
        <div className="container mx-auto flex flex-col lg:flex-row gap-10 sm:gap-16 lg:gap-12 px-4">
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            {homePageData.beersSection.title && (
              <LexicalRenderer
                data={homePageData.beersSection.title}
                className="text-secondary-foreground my-4 lg:my-8"
                enableGutter={false}
                enableProse={false}
              />
            )}
            {homePageData.beersSection.description && (
              <LexicalRenderer
                data={homePageData.beersSection.description}
                className="text-lg sm:text-xl text-secondary-foreground/90 mb-6 lg:mb-8"
                enableGutter={false}
                enableProse={false}
              />
            )}
            {homePageData.beersSection.link.label && (
              <Link
                href={beersLinkUrl}
                target={beersLinkNewTab ? '_blank' : undefined}
                rel={beersLinkNewTab ? 'noopener noreferrer' : undefined}
                className="inline-flex items-center gap-2 text-lg sm:text-xl font-semibold text-brand hover:text-brand/80 transition-colors duration-200 group"
              >
                {homePageData.beersSection.link.label}
                <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            )}
          </div>
          {beersImageUrl && (
            <div className="w-full lg:w-1/2 aspect-video relative">
              <Image
                src={beersImageUrl}
                className="object-cover rounded transition-transform duration-300 group-[]:-hover:scale-105"
                alt={beersImageAlt}
                loading="lazy"
                fill
              />
            </div>
          )}
        </div>
      </section>

      {/* Blog Section */}
      <section className="bg-primary py-12 lg:py-20">
        <div className="container mx-auto flex flex-col gap-6 lg:gap-8 items-center px-4">
          {homePageData.blogSection.text && (
            <LexicalRenderer
              data={homePageData.blogSection.text}
              className="text-primary-foreground text-center"
              enableGutter={false}
              enableProse={false}
            />
          )}
          {recentPosts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 lg:gap-12 w-full">
              {recentPosts.map((post) => {
                const postImageUrl = post.featuredImage
                  ? getMediaUrl(post.featuredImage)
                  : null;
                const postImageAlt = isMediaPopulated(post.featuredImage)
                  ? post.featuredImage.alt
                  : post.title;

                return (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="flex flex-col gap-3 group cursor-pointer"
                  >
                    {postImageUrl && (
                      <div className="aspect-square relative rounded overflow-hidden">
                        <Image
                          src={postImageUrl}
                          className="object-cover rounded transition-transform duration-300 group-hover:scale-105"
                          alt={postImageAlt}
                          loading="lazy"
                          fill
                        />
                      </div>
                    )}
                    <time
                      dateTime={post.publishedDate}
                      className="text-sm sm:text-md text-brand"
                    >
                      {formatPostDate(post.publishedDate)}
                    </time>
                    <h3 className="text-lg sm:text-xl lg:text-2xl font-extrabold text-primary-foreground group-hover:text-brand transition-colors duration-200">
                      {post.title}
                    </h3>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg sm:text-xl text-primary-foreground/80">
                No hay publicaciones disponibles.
              </p>
            </div>
          )}
          {homePageData.blogSection.link.label && (
            <Link
              href={blogLinkUrl}
              target={blogLinkNewTab ? '_blank' : undefined}
              rel={blogLinkNewTab ? 'noopener noreferrer' : undefined}
              className="inline-flex items-center gap-2 text-lg sm:text-xl font-semibold text-brand hover:text-brand/80 transition-colors duration-200 group"
            >
              {homePageData.blogSection.link.label}
              <ArrowRight className="w-5 h-5 transition-transform duration-200 group-hover:translate-x-1" />
            </Link>
          )}
        </div>
      </section>
    </div>
  );
}
