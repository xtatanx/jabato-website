import { revalidateTag, revalidatePath } from 'next/cache';
import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from 'payload';

export const revalidateBeers: CollectionAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating beers collection`);

    revalidateTag('beers');
    revalidatePath('/cervezas');
    if (doc.slug) {
      revalidatePath(`/cervezas/${doc.slug}`);
    }
  }

  return doc;
};

export const revalidateBeersAfterDelete: CollectionAfterDeleteHook = ({
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating beers collection after delete`);

    revalidateTag('beers');
    revalidatePath('/cervezas');
  }
};

