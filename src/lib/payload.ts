import { getPayload } from 'payload';
import type { Where } from 'payload';
import config from '@payload-config';
import type { Page, Post, Media, Beer, Quote } from '@payload-types';
import type { BeerData, Testimonial } from '@/lib/beers-data';
import { getMediaUrl, isMediaPopulated } from '@/lib/media';
import { extractTextFromLexical } from '@/lib/lexical-utils';

let cachedPayload: Awaited<ReturnType<typeof getPayload>> | null = null;

/**
 * Get Payload instance (cached for performance)
 */
export async function getPayloadClient() {
  if (cachedPayload) {
    return cachedPayload;
  }

  cachedPayload = await getPayload({ config });
  return cachedPayload;
}

/**
 * Fetch a page by title
 */
export async function getPageByTitle(title: string): Promise<Page | null> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'pages',
      where: {
        title: {
          equals: title,
        },
      },
      depth: 2,
      limit: 1,
    });

    return result.docs[0] || null;
  } catch (error) {
    console.error('Error fetching page by title:', error);
    return null;
  }
}

/**
 * Fetch a page by slug (for future page routing)
 */
export async function getPageBySlug(slug: string): Promise<Page | null> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'pages',
      where: {
        slug: {
          equals: slug,
        },
      },
      depth: 2,
      limit: 1,
    });

    return result.docs[0] || null;
  } catch (error) {
    console.error('Error fetching page by slug:', error);
    return null;
  }
}

/**
 * Fetch posts from Payload
 */
export async function getPosts(options?: {
  limit?: number;
  sort?: string;
  where?: Where;
}): Promise<Post[]> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'posts',
      limit: options?.limit || 10,
      sort: options?.sort || '-publishedDate',
      where: options?.where ?? ({} as Where),
      depth: 2,
    });

    return result.docs;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

/**
 * Fetch a single post by slug
 */
export async function getPostBySlug(slug: string): Promise<Post | null> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'posts',
      where: {
        slug: {
          equals: slug,
        },
      },
      depth: 2,
      limit: 1,
    });

    return result.docs[0] || null;
  } catch (error) {
    console.error('Error fetching post by slug:', error);
    return null;
  }
}

/**
 * Transform Payload Beer to BeerData format
 */
function transformBeer(beer: Beer): BeerData {
  // Transform images
  const imageUrls =
    beer.images
      ?.map((img: { image: number | Media; id?: string | null }) => {
        if (img.image && isMediaPopulated(img.image)) {
          return getMediaUrl(img.image);
        }
        return null;
      })
      .filter((url: string | null): url is string => url !== null) || [];

  const images = {
    main: imageUrls[0] || '',
    thumbnails: imageUrls,
  };

  // Transform packs
  const packs: BeerData['packs'] = {
    '6-bottles': { price: 0, unitPrice: 0 },
    '12-bottles': { price: 0, unitPrice: 0 },
    '24-bottles': { price: 0, unitPrice: 0 },
  };

  if (beer.packs && Array.isArray(beer.packs)) {
    beer.packs.forEach(
      (pack: { title: string; units: number; id?: string | null }) => {
        const units = pack.units;
        const price = beer.pricePerBottle * units;
        const unitPrice = beer.pricePerBottle;

        if (units === 6) {
          packs['6-bottles'] = { price, unitPrice };
        } else if (units === 12) {
          packs['12-bottles'] = { price, unitPrice };
        } else if (units === 24) {
          packs['24-bottles'] = { price, unitPrice };
        }
      },
    );
  } else {
    // Default packs if not configured
    const unitPrice = beer.pricePerBottle;
    packs['6-bottles'] = { price: unitPrice * 6, unitPrice };
    packs['12-bottles'] = { price: unitPrice * 12, unitPrice };
    packs['24-bottles'] = { price: unitPrice * 24, unitPrice };
  }

  // Transform ingredients
  const ingredients = {
    malts:
      beer.ingredients?.malts?.map(
        (m: { malt: string; id?: string | null }) => m.malt,
      ) || [],
    hops:
      beer.ingredients?.hops?.map(
        (h: { hop: string; id?: string | null }) => h.hop,
      ) || [],
    yeast: beer.ingredients?.yeast || undefined,
  };

  // Transform pairing
  const pairing =
    beer.pairing?.map((p: { item: string; id?: string | null }) => p.item) ||
    [];

  // Transform testimonials
  const testimonials: Testimonial[] = [];
  if (beer.testimonials && Array.isArray(beer.testimonials)) {
    beer.testimonials.forEach((testimonialRef: number | Quote) => {
      if (
        testimonialRef &&
        typeof testimonialRef === 'object' &&
        'quote' in testimonialRef
      ) {
        const quote = testimonialRef as Quote;
        const testimonial: Testimonial = {
          quote: quote.quote ? extractTextFromLexical(quote.quote) : '',
          author: quote.author?.name || '',
          position: quote.author?.position || '',
        };

        if (quote.author?.image && isMediaPopulated(quote.author.image)) {
          const avatarUrl = getMediaUrl(quote.author.image);
          if (avatarUrl) {
            testimonial.avatar = avatarUrl;
          }
        }

        testimonials.push(testimonial);
      }
    });
  }

  // Extract description text
  const description = beer.description
    ? extractTextFromLexical(beer.description)
    : '';

  // Create short description (first sentence or first 100 chars)
  const shortDescription = description
    ? (() => {
        const firstSentence = description.split('.')[0];
        if (firstSentence.length <= 100) {
          return firstSentence;
        }
        return description.slice(0, 100) + '...';
      })()
    : '';

  // Extract whyChoose and servingAndStorage
  const whyChoose = beer.whyChoose
    ? extractTextFromLexical(beer.whyChoose)
    : undefined;

  const servingAndStorage = beer.servingAndStorage
    ? extractTextFromLexical(beer.servingAndStorage)
    : undefined;

  return {
    id: beer.slug,
    name: beer.title,
    slug: beer.slug,
    style: beer.style,
    description,
    shortDescription,
    abv: beer.abv,
    ibu: beer.ibu,
    volume: beer.volume || '330ml',
    images,
    packs,
    ingredients,
    pairing,
    testimonialsSectionTitle: beer.testimonialsSectionTitle ?? undefined,
    testimonials,
    available: beer.available ?? true,
    whyChoose,
    servingAndStorage,
  };
}

/**
 * Fetch all beers from Payload
 */
export async function getAllBeers(): Promise<BeerData[]> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'beers',
      depth: 2,
      sort: 'title',
    });

    return result.docs.map(transformBeer);
  } catch (error) {
    console.error('Error fetching beers:', error);
    return [];
  }
}

/**
 * Fetch a single beer by slug
 */
export async function getBeerBySlug(slug: string): Promise<BeerData | null> {
  try {
    const payload = await getPayloadClient();
    const result = await payload.find({
      collection: 'beers',
      where: {
        slug: {
          equals: slug,
        },
      },
      depth: 2,
      limit: 1,
    });

    if (result.docs.length === 0) {
      return null;
    }

    return transformBeer(result.docs[0]);
  } catch (error) {
    console.error('Error fetching beer by slug:', error);
    return null;
  }
}
