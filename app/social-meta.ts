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

  return [
    { title },
    { name: "description", content: description },
    { property: "og:site_name", content: "A blog by Varun KS" },
    { property: "og:type", content: type },
    { property: "og:url", content: getCanonicalUrl(pathname) },
    { property: "og:title", content: title },
    { property: "og:description", content: description },
    { property: "og:image", content: imageUrl },
    { property: "og:image:alt", content: imageAlt },
    { name: "twitter:card", content: "summary_large_image" },
    { name: "twitter:creator", content: "@VarunKS20161856" },
    { name: "twitter:title", content: title },
    { name: "twitter:description", content: description },
    { name: "twitter:image", content: imageUrl },
    { name: "twitter:image:alt", content: imageAlt },
  ];
}
