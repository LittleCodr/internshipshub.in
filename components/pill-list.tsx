interface PillListProps {
  title: string;
  items: string[];
}

export function PillList({ title, items }: PillListProps) {
  if (!items.length) return null;
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
      <ul className="mt-4 flex flex-wrap gap-2 text-sm">
        {items.map((item) => (
          <li key={item} className="rounded-full bg-slate-100 px-3 py-1 text-slate-600">
            {item}
          </li>
        ))}
      </ul>
    </section>
  );
}
