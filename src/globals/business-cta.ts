import {
  FixedToolbarFeature,
  HeadingFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from "@payloadcms/richtext-lexical";
import type { GlobalConfig } from "payload";
import { TextColorFeature } from "payload-lexical-typography";
import { link } from "@/fields/link";
import { revalidateHeader } from "@/hooks/revalidate-header";

export const BusinessCta: GlobalConfig = {
  slug: "businessCta",
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
      type: "text",
    },
    link({
      appearances: false,
    }),
  ],
  hooks: {
    afterChange: [revalidateHeader],
  },
};
