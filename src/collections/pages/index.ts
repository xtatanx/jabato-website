import type { CollectionConfig } from "payload";
import { anyone } from "@/access/anyone";
import { authenticated } from "@/access/authenticated";
import { BeersBlock } from "@/blocks/beers";
import { BlogBlock } from "@/blocks/blog";
import { ContactBlock } from "@/blocks/contact";
import { HistoryBlock } from "@/blocks/history";
import { HomePageBlock } from "@/blocks/homepage";
import {
  revalidatePages,
  revalidatePagesAfterDelete,
} from "@/hooks/revalidate-pages";

export const Pages: CollectionConfig = {
  slug: "pages",
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
    {
      name: "template",
      type: "blocks",
      minRows: 1,
      maxRows: 1,
      required: true,
      blocks: [
        HomePageBlock,
        BeersBlock,
        BlogBlock,
        HistoryBlock,
        ContactBlock,
      ],
    },
  ],
  hooks: {
    afterChange: [revalidatePages],
    afterDelete: [revalidatePagesAfterDelete],
  },
};
