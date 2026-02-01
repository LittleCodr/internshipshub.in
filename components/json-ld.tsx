import Script from "next/script";
import { createHash } from "node:crypto";

export function JsonLd({ json }: { json: string }) {
  if (!json) return null;
  const scriptId = createHash("sha256").update(json).digest("hex").slice(0, 16);

  return (
    <Script
      id={`json-ld-${scriptId}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
