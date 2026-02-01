interface SeoTextBlockProps {
  title: string;
  paragraphs: string[];
}

export function SeoTextBlock({ title, paragraphs }: SeoTextBlockProps) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      <div className="mt-4 space-y-3 text-sm leading-relaxed text-slate-600">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
    </section>
  );
}
