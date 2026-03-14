import type { CollectionConfig } from 'payload';
import { BeersBlock } from '@/blocks/beers';
import { BlogBlock } from '@/blocks/blog';
import { ContactBlock } from '@/blocks/contact';
import { HistoryBlock } from '@/blocks/history';
import { HomePageBlock } from '@/blocks/homepage';
import { authenticated } from '@/access/authenticated';
import { anyone } from '@/access/anyone';

export const Pages: CollectionConfig = {
  slug: 'pages',
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: 'title',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'template',
      type: 'blocks',
      minRows: 1,
      maxRows: 1,
      required: true,
      blocks: [HomePageBlock, BeersBlock, BlogBlock, HistoryBlock, ContactBlock],
    },
  ],
};
