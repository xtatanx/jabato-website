import type { Media } from '@payload-types';

/**
 * Get the URL for a Media object from Payload
 * Returns only the base URL (single size) - Next.js Image component will handle optimization
 */
export function getMediaUrl(media: Media | number | null | undefined): string | null {
  if (!media) {
    return null;
  }

  // If it's just an ID reference, we can't resolve it
  if (typeof media === 'number') {
    return null;
  }

  if (media.url) {
    const url = media.url;
    if (url.startsWith('http')) {
      return url;
    }
    const base =
      process.env.NEXT_PUBLIC_SITE_URL ??
      (process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '');
    return base ? `${base.replace(/\/$/, '')}${url.startsWith('/') ? url : `/${url}`}` : url;
  }

  return null;
}

/**
 * Type guard to check if media is populated (not just an ID)
 */
export function isMediaPopulated(
  media: Media | number | null | undefined,
): media is Media {
  return media !== null && media !== undefined && typeof media !== 'number';
}

