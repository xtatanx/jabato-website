import {
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import type { CollectionConfig } from "payload";
import { slugField } from "payload";
import { TextColorFeature } from "payload-lexical-typography";
import { anyone } from "../access/anyone";
import { authenticated } from "../access/authenticated";
import {
  revalidatePosts,
  revalidatePostsAfterDelete,
} from "../hooks/revalidate-posts";

export const Posts: CollectionConfig = {
  slug: "posts",
  access: {
    create: authenticated,
    delete: authenticated,
    read: anyone,
    update: authenticated,
  },
  admin: {
    useAsTitle: "title",
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    slugField({
      fieldToUse: "title",
      position: "sidebar",
    }),
    {
      name: "category",
      type: "select",
      options: [
        {
          label: "Historias",
          value: "historias",
        },
        {
          label: "Catas",
          value: "catas",
        },
        {
          label: "Experiencias",
          value: "experiencias",
        },
      ],
      required: true,
    },
    {
      name: "featured",
      type: "checkbox",
      defaultValue: false,
    },
    {
      name: "excerpt",
      type: "text",
      required: true,
    },
    {
      name: "content",
      type: "richText",
      editor: lexicalEditor({
        features: ({ rootFeatures }) => {
          return [
            ...rootFeatures,
            HeadingFeature({ enabledHeadingSizes: ["h2", "h3", "h4"] }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
            HorizontalRuleFeature(),
            TextColorFeature({ colors: ["#db2b34"] }),
          ];
        },
      }),
      required: true,
    },
    {
      name: "featuredImage",
      type: "upload",
      relationTo: "media",
    },
    {
      name: "publishedDate",
      type: "date",
      required: true,
    },
  ],
  hooks: {
    afterChange: [revalidatePosts],
    afterDelete: [revalidatePostsAfterDelete],
  },
};
