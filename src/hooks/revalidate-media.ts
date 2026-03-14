import type {
  CollectionAfterChangeHook,
  CollectionAfterDeleteHook,
} from "payload";
import { revalidateMainPaths } from "./revalidate-paths";

export const revalidateMedia: CollectionAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating media collection`);

    revalidateMainPaths();
  }

  return doc;
};

export const revalidateMediaAfterDelete: CollectionAfterDeleteHook = ({
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating media collection after delete`);

    revalidateMainPaths();
  }
};
