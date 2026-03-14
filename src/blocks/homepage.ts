import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  ParagraphFeature,
} from "@payloadcms/richtext-lexical";
import type { Block } from "payload";
import { TextColorFeature } from "payload-lexical-typography";
import { link } from "@/fields/link";

export const HomePageBlock: Block = {
  slug: "homePageBlock",
  interfaceName: "HomePageBlock",
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
        link({
          appearances: false,
        }),
      ],
    },
    {
      name: "subtitle",
      type: "group",
      fields: [
        {
          name: "text",
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
      name: "historySection",
      type: "group",
      fields: [
        {
          name: "image",
          type: "upload",
          relationTo: "media",
        },
        {
          name: "title",
          type: "richText",
          editor: lexicalEditor({
            features: ({ rootFeatures }) => {
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
        },
        {
          name: "description",
          type: "richText",
          editor: lexicalEditor({
            features: () => {
              return [
                FixedToolbarFeature(),
                ParagraphFeature(),
                InlineToolbarFeature(),
                TextColorFeature({
                  colors: ["#db2b34"],
                }),
              ];
            },
          }),
        },
        link({
          appearances: false,
        }),
      ],
    },
    {
      name: "beersSection",
      type: "group",
      fields: [
        {
          name: "image",
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
        },
        {
          name: "description",
          type: "richText",
          editor: lexicalEditor({
            features: () => {
              return [
                FixedToolbarFeature(),
                ParagraphFeature(),
                InlineToolbarFeature(),
                TextColorFeature({
                  colors: ["#db2b34"],
                }),
              ];
            },
          }),
        },
        link({
          appearances: false,
        }),
      ],
    },
    {
      name: "blogSection",
      type: "group",
      fields: [
        {
          name: "text",
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
        link({
          appearances: false,
        }),
      ],
    },
  ],
  labels: {
    plural: "HomePageBlocks",
    singular: "HomePageBlock",
  },
};
