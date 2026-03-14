import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  ParagraphFeature,
} from '@payloadcms/richtext-lexical';
import type { CollectionConfig } from 'payload';
import { slugField } from 'payload';
import { anyone } from '../access/anyone';
import { authenticated } from '../access/authenticated';
import {
  revalidateBeers,
  revalidateBeersAfterDelete,
} from '../hooks/revalidate-beers';
import { TextColorFeature } from 'payload-lexical-typography';

export const Beers: CollectionConfig = {
  slug: 'beers',
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
    slugField({
      fieldToUse: 'title',
      position: 'sidebar',
    }),
    {
      name: 'description',
      type: 'richText',
      editor: lexicalEditor({
        features: () => {
          return [
            ParagraphFeature(),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ];
        },
      }),
    },
    {
      name: 'volume',
      type: 'text',
      defaultValue: '330ml',
    },
    {
      name: 'abv',
      type: 'number',
      required: true,
      min: 0,
      max: 20,
    },
    {
      name: 'ibu',
      type: 'number',
      required: true,
      min: 0,
      max: 120,
    },
    {
      name: 'style',
      type: 'text',
      required: true,
    },
    {
      name: 'images',
      type: 'array',
      fields: [
        {
          name: 'image',
          type: 'upload',
          relationTo: 'media',
          required: true,
        },
      ],
      minRows: 1,
    },
    {
      name: 'pricePerBottle',
      type: 'number',
      required: true,
      min: 0,
    },
    {
      name: 'packs',
      type: 'array',
      fields: [
        {
          name: 'title',
          type: 'text',
          required: true,
        },
        {
          name: 'units',
          type: 'number',
          required: true,
          min: 1,
        },
      ],
      defaultValue: [
        { title: '6 botellas', units: 6 },
        { title: '12 botellas', units: 12 },
        { title: '24 botellas', units: 24 },
      ],
    },
    {
      name: 'whyChoose',
      type: 'richText',
      editor: lexicalEditor({
        features: () => {
          return [
            ParagraphFeature(),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ];
        },
      }),
    },
    {
      name: 'servingAndStorage',
      type: 'richText',
      editor: lexicalEditor({
        features: () => {
          return [
            ParagraphFeature(),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ];
        },
      }),
    },
    {
      name: 'ingredients',
      type: 'group',
      fields: [
        {
          name: 'malts',
          type: 'array',
          fields: [
            {
              name: 'malt',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'hops',
          type: 'array',
          fields: [
            {
              name: 'hop',
              type: 'text',
              required: true,
            },
          ],
        },
        {
          name: 'yeast',
          type: 'text',
        },
      ],
    },
    {
      name: 'pairing',
      type: 'array',
      fields: [
        {
          name: 'item',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'testimonialsSectionTitle',
      type: 'richText',
      admin: {
        description: "Title for the Testimonials section on this beer's page.",
      },
      editor: lexicalEditor({
        features: () => {
          return [
            HeadingFeature({
              enabledHeadingSizes: ['h2'],
            }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            TextColorFeature({
              colors: ['#db2b34'],
            }),
          ];
        },
      }),
    },
    {
      name: 'testimonials',
      type: 'relationship',
      relationTo: 'quotes',
      hasMany: true,
      filterOptions: {
        type: {
          not_equals: 'general',
        },
      },
    },
    {
      name: 'available',
      type: 'checkbox',
      defaultValue: true,
    },
  ],
  hooks: {
    afterChange: [revalidateBeers],
    afterDelete: [revalidateBeersAfterDelete],
  },
};
