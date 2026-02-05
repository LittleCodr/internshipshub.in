export const SITE_URL = "https://internshipshub.in";

export function toJsonLd(data: Record<string, unknown> | Record<string, unknown>[]) {
  return JSON.stringify(data, null, 2);
}

export function absoluteUrl(pathOrUrl: string) {
  try {
    const base = new URL(SITE_URL);
    const resolved = new URL(pathOrUrl || "/", SITE_URL);
    // Force the canonical host/protocol in case a staging URL sneaks in.
    resolved.protocol = base.protocol;
    resolved.hostname = base.hostname;
    resolved.search = "";
    resolved.hash = "";

    const normalized = resolved.toString();
    if (resolved.pathname !== "/" && normalized.endsWith("/")) {
      return normalized.slice(0, -1);
    }
    return normalized;
  } catch (error) {
    console.error("Failed to normalise URL", error);
    return SITE_URL;
  }
}

export function canonicalHref(url: string) {
  return absoluteUrl(url);
}

export function robotsContent(index: boolean) {
  return index ? "index,follow" : "noindex,nofollow";
}
