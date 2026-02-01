type SeoTextBlockProps = {
  title: string;
  paragraphs: string[];
};

export function SeoTextBlock({ title, paragraphs }: SeoTextBlockProps) {
  return (
    <section className="mt-12 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      {paragraphs.map((paragraph, index) => (
        <p key={index} className="mt-4 text-sm leading-6 text-slate-600">
          {paragraph}
        </p>
      ))}
    </section>
  );
}
