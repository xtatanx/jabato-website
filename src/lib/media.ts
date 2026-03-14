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

  // Media object should have url property
  if (media.url) {
    // Return relative path (already includes /media/ prefix from Payload)
    return media.url;
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

