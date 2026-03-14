import sharp from 'sharp';
import { lexicalEditor } from '@payloadcms/richtext-lexical';
import { postgresAdapter } from '@payloadcms/db-postgres';
import { buildConfig } from 'payload';
import { Pages } from './src/collections/pages';
import { Media } from './src/collections/media';
import { seoPlugin } from '@payloadcms/plugin-seo';
import { Quotes } from '@/collections/quotes';
import { Beers } from '@/collections/beers';
import { Posts } from '@/collections/posts';
import { BusinessCta } from '@/globals/business-cta';
import { BeersCta } from '@/globals/beers-cta';

export default buildConfig({
  // If you'd like to use Rich Text, pass your editor here
  editor: lexicalEditor(),

  // Define and configure your collections in this array
  collections: [Pages, Media, Quotes, Beers, Posts],
  globals: [BusinessCta, BeersCta],

  // Your Payload secret - should be a complex and secure string, unguessable
  secret: process.env.PAYLOAD_SECRET || '',
  // Whichever Database Adapter you're using should go here
  // Mongoose is shown as an example, but you can also use Postgres
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL,
    },
  }),
  // If you want to resize images, crop, set focal point, etc.
  // make sure to install it and pass it to the config.
  // This is optional - if you don't need to do these things,
  // you don't need it!
  sharp: sharp as any,
  plugins: [
    seoPlugin({
      collections: ['pages', 'beers', 'posts'],
      uploadsCollection: 'media',
      // generateTitle: ({ doc }) => `Website.com — ${doc.title}`,
      // generateDescription: ({ doc }) => doc.excerpt,
    }),
  ],
});
