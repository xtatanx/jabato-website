import type { Page } from '@payload-types';

type LinkField = {
  type?: ('reference' | 'custom') | null;
  newTab?: boolean | null;
  reference?: {
    relationTo: 'pages';
    value: number | Page;
  } | null;
  url?: string | null;
  label: string;
};

/**
 * Get the href URL for a link field from Payload
 */
export function getLinkUrl(link: LinkField): string {
  if (!link) {
    return '#';
  }

  // Custom URL
  if (link.type === 'custom' && link.url) {
    return link.url;
  }

  // Reference link (internal page)
  if (link.type === 'reference' && link.reference?.value) {
    const page = link.reference.value;

    // If it's just an ID, we can't resolve it
    if (typeof page === 'number') {
      return '#';
    }

    // For now, pages don't have slugs, so we'll need to determine the route
    // This can be extended based on page title or a slug field if added later
    // Map common page titles to routes
    const titleToRoute: Record<string, string> = {
      Home: '/',
      'Cervezas': '/cervezas',
      'Historia': '/historia',
      'Contacto': '/contacto',
      Blog: '/blog',
    };

    if (page.title in titleToRoute) {
      return titleToRoute[page.title];
    }

    // Default fallback
    return '#';
  }

  return '#';
}

/**
 * Check if link should open in new tab
 */
export function shouldOpenInNewTab(link: LinkField): boolean {
  return link?.newTab === true;
}

