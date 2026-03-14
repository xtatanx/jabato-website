import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import type { Block } from "payload";
import { TextColorFeature } from "payload-lexical-typography";

export const ContactBlock: Block = {
  slug: "contactBlock",
  interfaceName: "ContactBlock",
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
      name: "contactInfo",
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
          name: "sections",
          type: "array",
          fields: [
            {
              name: "heading",
              type: "text",
              required: true,
            },
            {
              name: "content",
              type: "textarea",
              required: true,
            },
          ],
          minRows: 1,
        },
      ],
    },
  ],
  labels: {
    plural: "ContactBlocks",
    singular: "ContactBlock",
  },
};
