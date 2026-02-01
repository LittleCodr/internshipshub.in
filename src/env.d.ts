/// <reference types="vite/client" />

declare module "*.mdx" {
  import { MDXProps } from "@mdx-js/react";
  import { ComponentType } from "react";

  export const frontmatter: import("./types/content").ContentFrontmatter;
  const MDXComponent: ComponentType<MDXProps>;
  export default MDXComponent;
}
