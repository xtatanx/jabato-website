import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  ParagraphFeature,
} from "@payloadcms/richtext-lexical";
import type { Block } from "payload";
import { TextColorFeature } from "payload-lexical-typography";

export const BeersBlock: Block = {
  slug: "beersBlock",
  interfaceName: "BeersBlock",
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
      name: "contentSection",
      type: "group",
      fields: [
        {
          name: "title",
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
        },
      ],
    },
    {
      name: "quotesSection",
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
        {
          name: "quotes",
          type: "relationship",
          relationTo: ["quotes"],
          hasMany: true,
          maxRows: 6,
          minRows: 1,
        },
      ],
    },
  ],
  labels: {
    plural: "BeersBlocks",
    singular: "BeersBlock",
  },
};
