import { revalidatePath, revalidateTag } from "next/cache";
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from "payload";

export const revalidateQuotes: CollectionAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating quotes collection`);

    revalidateTag("beers");
    revalidatePath("/cervezas");
  }

  return doc;
};

export const revalidateQuotesAfterDelete: CollectionAfterDeleteHook = ({
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating quotes collection after delete`);

    revalidateTag("beers");
    revalidatePath("/cervezas");
  }
};
