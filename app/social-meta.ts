const SITE_URL = "https://www.varunks.xyz";

interface SocialMetaOptions {
  pathname: string;
  title?: string;
  description?: string;
  image?: string;
  imageAlt?: string;
  type?: "website" | "article";
}

export function getCanonicalUrl(pathname: string) {
  const url = new URL(SITE_URL);
  url.pathname = pathname.replace(/\/+$/, "") || "/";
  return url.href;
}

export function getSocialMeta({
  pathname,
  title = "A blog by Varun KS",
  description = "A blog about the stuff I find interesting",
  image = "/social/blog.png",
  imageAlt = "Blog by Varun KS",
  type = "website",
}: SocialMetaOptions) {
  const imageUrl = new URL(image, SITE_URL).href;

  return {
    title,
    description,
    "og:site_name": "A blog by Varun KS",
    "og:type": type,
    "og:url": getCanonicalUrl(pathname),
    "og:title": title,
    "og:description": description,
    "og:image": imageUrl,
    "og:image:alt": imageAlt,
    "twitter:card": "summary_large_image",
    "twitter:creator": "@VarunKS20161856",
    "twitter:title": title,
    "twitter:description": description,
    "twitter:image": imageUrl,
    "twitter:image:alt": imageAlt,
  };
}
