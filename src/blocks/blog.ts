import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  ParagraphFeature,
} from "@payloadcms/richtext-lexical";
import type { Block } from "payload";
import { TextColorFeature } from "payload-lexical-typography";

export const BlogBlock: Block = {
  slug: "blogBlock",
  interfaceName: "BlogBlock",
  fields: [
    {
      name: "hero",
      type: "group",
      fields: [
        {
          name: "heroImage",
          type: "upload",
          relationTo: "media",
        },
        {
          name: "title",
          type: "richText",
          editor: lexicalEditor({
            features: () => {
              return [
                HeadingFeature({
                  enabledHeadingSizes: ["h1"],
                }),
                FixedToolbarFeature(),
                InlineToolbarFeature(),
                TextColorFeature({
                  colors: ["#db2b34"],
                }),
              ];
            },
          }),
          label: false,
        },
      ],
    },
    {
      name: "introSection",
      type: "group",
      fields: [
        {
          name: "text",
          type: "richText",
          editor: lexicalEditor({
            features: () => {
              return [
                ParagraphFeature(),
                FixedToolbarFeature(),
                InlineToolbarFeature(),
                TextColorFeature({
                  colors: ["#db2b34"],
                }),
              ];
            },
          }),
          label: false,
        },
      ],
    },
    {
      name: "categorySection",
      type: "group",
      fields: [
        {
          name: "title",
          type: "richText",
          editor: lexicalEditor({
            features: () => {
              return [
                HeadingFeature({
                  enabledHeadingSizes: ["h2"],
                }),
                FixedToolbarFeature(),
                InlineToolbarFeature(),
                TextColorFeature({
                  colors: ["#db2b34"],
                }),
              ];
            },
          }),
          label: false,
        },
      ],
    },
    {
      name: "showFeaturedPost",
      type: "checkbox",
      defaultValue: true,
    },
    {
      name: "showCategoryFilter",
      type: "checkbox",
      defaultValue: true,
    },
    {
      name: "showBusinessCta",
      type: "checkbox",
      defaultValue: true,
    },
    {
      name: "postsPerPage",
      type: "number",
      defaultValue: 6,
      min: 1,
      max: 24,
    },
  ],
  labels: {
    plural: "BlogBlocks",
    singular: "BlogBlock",
  },
};
