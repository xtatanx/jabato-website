import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  ParagraphFeature,
} from "@payloadcms/richtext-lexical";
import type { Block } from "payload";
import { TextColorFeature } from "payload-lexical-typography";

export const HistoryBlock: Block = {
  slug: "historyBlock",
  interfaceName: "HistoryBlock",
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
            features: ({ rootFeatures }) => {
              return [
                ...rootFeatures,
                HeadingFeature({
                  enabledHeadingSizes: ["h1", "h2", "h3", "h4"],
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
      name: "timelineSection",
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
          name: "milestones",
          type: "array",
          fields: [
            {
              name: "year",
              type: "text",
              required: true,
            },
            {
              name: "title",
              type: "text",
              required: true,
            },
            {
              name: "description",
              type: "textarea",
              required: true,
            },
            {
              name: "image",
              type: "upload",
              relationTo: "media",
              required: false,
            },
          ],
          minRows: 1,
        },
      ],
    },
  ],
  labels: {
    plural: "HistoryBlocks",
    singular: "HistoryBlock",
  },
};
