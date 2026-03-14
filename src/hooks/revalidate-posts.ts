import { revalidatePath } from "next/cache";
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from "payload";

export const revalidatePosts: CollectionAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating posts collection`);

    revalidatePath("/blog");
    if (doc.slug) {
      revalidatePath(`/blog/${doc.slug}`);
    }
  }

  return doc;
};

export const revalidatePostsAfterDelete: CollectionAfterDeleteHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating posts collection after delete`);

    revalidatePath("/blog");
    if (doc?.slug) {
      revalidatePath(`/blog/${doc.slug}`);
    }
  }
};
