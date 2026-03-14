import * as migration_20251022_231041 from "./20251022_231041";

export const migrations = [
  {
    up: migration_20251022_231041.up,
    down: migration_20251022_231041.down,
    name: "20251022_231041",
  },
];
