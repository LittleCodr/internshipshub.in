import type { MDXComponents } from "mdx/types";

export const mdxComponents: MDXComponents = {
  h2: (props) => <h2 className="mt-8 text-2xl font-semibold text-slate-900" {...props} />,
  h3: (props) => <h3 className="mt-6 text-xl font-semibold text-slate-900" {...props} />,
  p: (props) => <p className="mt-4 text-base leading-7 text-slate-700" {...props} />,
  ul: (props) => <ul className="mt-4 list-disc space-y-2 pl-5 text-slate-700" {...props} />,
  ol: (props) => <ol className="mt-4 list-decimal space-y-2 pl-5 text-slate-700" {...props} />,
  a: (props) => (
    <a
      className="text-primary underline decoration-primary/50 transition hover:decoration-primary"
      {...props}
    />
  ),
  strong: (props) => <strong className="font-semibold text-slate-900" {...props} />
};
