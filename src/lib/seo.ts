export function toJsonLd(data: Record<string, unknown> | Record<string, unknown>[]) {
  return JSON.stringify(data, null, 2);
}

export function canonicalHref(url: string) {
  return url;
}

export function robotsContent(index: boolean) {
  return index ? "index,follow" : "noindex,nofollow";
}
