import { revalidateTag } from "next/cache";
import type { GlobalAfterChangeHook } from "payload";
import { revalidateMainPaths } from "./revalidate-paths";

export const revalidateHeader: GlobalAfterChangeHook = ({
  doc,
  req: { payload, context },
}) => {
  if (!context.disableRevalidate) {
    payload.logger.info(`Revalidating header`);

    revalidateTag("global_header");
    revalidateMainPaths();
  }

  return doc;
};
