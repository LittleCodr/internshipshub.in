import type { MetadataRoute } from "next";
import { SITE_META } from "@lib/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/"
    },
    sitemap: `${SITE_META.url}/sitemap.xml`
  };
}
