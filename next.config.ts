import createMDX from "@next/mdx";
import type { NextConfig } from "next";
import remarkFrontmatter from "remark-frontmatter";
import remarkGfm from "remark-gfm";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

const withMDX = createMDX({
  options: {
    remarkPlugins: [
      remarkFrontmatter,
      [remarkMdxFrontmatter, { name: "frontmatter" }],
      remarkGfm,
    ],
  },
});

const nextConfig: NextConfig = {
  // `mdx` must be in `pageExtensions` so Next's RSC layer aliases
  // `react/jsx-runtime` to the server bundle for `.mdx` modules. Without it,
  // `.mdx` falls outside `aliasCodeConditionTest` and the dev runtime crashes
  // with `Cannot read properties of undefined (reading 'recentlyCreatedOwnerStacks')`.
  // We never place `.mdx` files inside `src/app/` so they will not become routes.
  pageExtensions: ["ts", "tsx", "mdx"],
  images: {
    remotePatterns: [],
  },
};

export default withMDX(nextConfig);
