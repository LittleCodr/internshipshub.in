import { compileMDX } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import type { ComponentProps, ReactNode } from "react";

const mdxComponents = {
  h2: (props: ComponentProps<"h2">) => (
    <h2 className="text-2xl font-semibold tracking-tight text-slate-900" {...props} />
  ),
  h3: (props: ComponentProps<"h3">) => (
    <h3 className="text-xl font-semibold text-slate-900" {...props} />
  ),
  ul: (props: ComponentProps<"ul">) => <ul className="list-disc pl-5" {...props} />,
  ol: (props: ComponentProps<"ol">) => (
    <ol className="list-decimal pl-5" {...props} />
  ),
  a: (props: ComponentProps<"a">) => (
    <a className="text-primary-600 hover:text-primary-700" {...props} />
  )
};

const remarkPlugins = [remarkGfm];
const rehypePlugins = [[rehypeSlug], [rehypeAutolinkHeadings, { behavior: "wrap" }]] as const;

export const renderMDX = async (source: string): Promise<ReactNode> => {
  if (!source) return null;

  const { content } = await compileMDX<{ body: string }>({
    source,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: remarkPlugins as unknown as import("unified").PluggableList,
        rehypePlugins: rehypePlugins as unknown as import("unified").PluggableList
      }
    }
  });

  return content;
};
