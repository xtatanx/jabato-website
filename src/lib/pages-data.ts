import type {
  BeersBlock,
  BlogBlock,
  ContactBlock,
  HistoryBlock,
  HomePageBlock,
  Page,
} from '@payload-types';
import { getPageByTitle } from './payload';

type PageBlock =
  | HomePageBlock
  | BeersBlock
  | BlogBlock
  | HistoryBlock
  | ContactBlock;

/**
 * Get the homepage from Payload CMS
 */
export async function getHomePage(): Promise<HomePageBlock | null> {
  try {
    const page = await getPageByTitle('Home');

    if (!page) {
      return null;
    }

    // Find the HomePageBlock in the template array
    const homePageBlock = page.template.find(
      (block: PageBlock | null | undefined): block is HomePageBlock =>
        block !== null &&
        block !== undefined &&
        typeof block === 'object' &&
        'blockType' in block &&
        block.blockType === 'homePageBlock'
    ) as HomePageBlock | undefined;

    return homePageBlock || null;
  } catch (error) {
    console.error('Error fetching homepage:', error);
    return null;
  }
}

/**
 * Get full page data (for metadata)
 */
export async function getPageData(title: string): Promise<Page | null> {
  return getPageByTitle(title);
}

/**
 * Get the history page from Payload CMS
 */
export async function getHistoryPage(): Promise<HistoryBlock | null> {
  try {
    const page = await getPageByTitle('Nuestra Historia');

    if (!page) {
      return null;
    }

    // Find the HistoryBlock in the template array
    const historyBlock = page.template.find(
      (block: PageBlock | null | undefined): block is HistoryBlock =>
        block !== null &&
        block !== undefined &&
        typeof block === 'object' &&
        'blockType' in block &&
        block.blockType === 'historyBlock'
    ) as HistoryBlock | undefined;

    return historyBlock || null;
  } catch (error) {
    console.error('Error fetching history page:', error);
    return null;
  }
}

/**
 * Get the beers page from Payload CMS
 */
export async function getBeersPage(): Promise<BeersBlock | null> {
  try {
    const page = await getPageByTitle('Nuestras Cervezas');

    if (!page) {
      return null;
    }

    // Find the BeersBlock in the template array
    const beersBlock = page.template.find(
      (block: PageBlock | null | undefined): block is BeersBlock =>
        block !== null &&
        block !== undefined &&
        typeof block === 'object' &&
        'blockType' in block &&
        block.blockType === 'beersBlock'
    ) as BeersBlock | undefined;

    return beersBlock || null;
  } catch (error) {
    console.error('Error fetching beers page:', error);
    return null;
  }
}

/**
 * Get the blog page from Payload CMS
 */
export async function getBlogPage(
  title: string = 'Nuestro Blog'
): Promise<BlogBlock | null> {
  try {
    const page = await getPageByTitle(title);

    if (!page) {
      return null;
    }

    const blogBlock = page.template.find(
      (block: PageBlock | null | undefined): block is BlogBlock =>
        block !== null &&
        block !== undefined &&
        typeof block === 'object' &&
        'blockType' in block &&
        block.blockType === 'blogBlock'
    ) as BlogBlock | undefined;

    return blogBlock || null;
  } catch (error) {
    console.error('Error fetching blog page:', error);
    return null;
  }
}

/**
 * Get the contact page from Payload CMS
 */
export async function getContactPage(): Promise<ContactBlock | null> {
  try {
    const page = await getPageByTitle('Contacto');

    if (!page) {
      return null;
    }

    // Find the ContactBlock in the template array
    const contactBlock = page.template.find(
      (block: PageBlock | null | undefined): block is ContactBlock =>
        block !== null &&
        block !== undefined &&
        typeof block === 'object' &&
        'blockType' in block &&
        block.blockType === 'contactBlock'
    ) as ContactBlock | undefined;

    return contactBlock || null;
  } catch (error) {
    console.error('Error fetching contact page:', error);
    return null;
  }
}
