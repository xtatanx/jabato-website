import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
  ParagraphFeature,
} from "@payloadcms/richtext-lexical";
import type { GlobalConfig } from "payload";
import { TextColorFeature } from "payload-lexical-typography";
import { link } from "@/fields/link";
import { revalidateHeader } from "@/hooks/revalidate-header";

export const BeersCta: GlobalConfig = {
  slug: "beersCta",
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
            TextColorFeature({
              colors: ["#db2b34"],
            }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
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
            ParagraphFeature(),
            TextColorFeature({
              colors: ["#db2b34"],
            }),
            FixedToolbarFeature(),
            InlineToolbarFeature(),
          ];
        },
      }),
    },
    link({
      appearances: ["default", "outline"],
      overrides: { name: "primaryButton" },
    }),
    link({
      appearances: ["default", "outline"],
      overrides: { name: "secondaryButton" },
    }),
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
};
