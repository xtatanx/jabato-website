import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from "payload";
import { revalidateMainPaths } from "./revalidate-paths";

export const revalidatePages: CollectionAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating pages collection`);

    revalidateMainPaths();
  }

  return doc;
};

export const revalidatePagesAfterDelete: CollectionAfterDeleteHook = ({
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating pages collection after delete`);

    revalidateMainPaths();
  }
};
