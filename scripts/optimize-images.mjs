import { readdir, rename } from "node:fs/promises";
import { join } from "node:path";
import sharp from "sharp";

const dir = "public";
const files = (await readdir(dir)).filter((f) =>
  f.toLowerCase().endsWith(".jpg"),
);

for (const file of files) {
  const src = join(dir, file);
  const tmp = join(dir, `${file}.tmp`);
  const before = (await sharp(src).metadata()).size ?? 0;
  await sharp(src)
    .rotate()
    .resize({
      width: 2048,
      height: 2048,
      fit: "inside",
      withoutEnlargement: true,
    })
    .jpeg({ quality: 78, mozjpeg: true })
    .toFile(tmp);
  await rename(tmp, src);
  console.log(`${file}: ${(before / 1024).toFixed(0)}KB -> optimized`);
}
