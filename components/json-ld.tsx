import Script from "next/script";

export function JsonLd({ json }: { json: string }) {
  if (!json) return null;
  return <Script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
