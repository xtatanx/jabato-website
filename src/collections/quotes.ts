import {
  FixedToolbarFeature,
  InlineToolbarFeature,
  lexicalEditor,
  ParagraphFeature,
} from "@payloadcms/richtext-lexical";
import type { CollectionConfig } from "payload";
import { anyone } from "@/access/anyone";
import { authenticated } from "@/access/authenticated";
import {
  revalidateQuotes,
  revalidateQuotesAfterDelete,
} from "@/hooks/revalidate-quotes";

export const Quotes: CollectionConfig = {
  slug: "quotes",
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: "quote",
  },
  fields: [
    {
      name: "type",
      type: "select",
      options: [
        {
          label: "General",
          value: "general",
        },
        {
          label: "American Amber Ale",
          value: "american amber ale",
        },
        {
          label: "West Coast IPA",
          value: "west coast ipa",
        },
        {
          label: "Belgian Blond Ale",
          value: "belgian blond ale",
        },
        {
          label: "Hard Seltzer",
          value: "hard seltzer",
        },
      ],
      defaultValue: "general",
    },
    {
      name: "quote",
      type: "richText",
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
      name: "author",
      type: "group",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
        },
        {
          name: "name",
          type: "text",
        },
        {
          name: "position",
          type: "text",
        },
      ],
    },
  ],
  hooks: {
    afterChange: [revalidateQuotes],
    afterDelete: [revalidateQuotesAfterDelete],
  },
};
