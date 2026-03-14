import { revalidatePath } from "next/cache";

export const MAIN_APP_PATHS = [
  "/",
  "/historia",
  "/cervezas",
  "/blog",
  "/contacto",
] as const;

export function revalidateMainPaths(): void {
  for (const path of MAIN_APP_PATHS) {
    revalidatePath(path);
  }
}
