import { useEffect } from "react";

/**
 * useSEO - client-side document head updater.
 * Sets <title>, meta description, canonical, OpenGraph and Twitter card tags.
 */
export function useSEO({ title, description, image, url, type = "website" }) {
  useEffect(() => {
    const baseTitle = "EtherAuthority Interns";
    const finalTitle = title ? `${title} · ${baseTitle}` : baseTitle;
    document.title = finalTitle;

    const canonicalUrl = url || (typeof window !== "undefined" ? window.location.href : "");

    setMeta("description", description);
    setMeta("og:title", finalTitle, "property");
    setMeta("og:description", description, "property");
    setMeta("og:type", type, "property");
    setMeta("og:image", image, "property");
    setMeta("og:url", canonicalUrl, "property");

    setMeta("twitter:card", image ? "summary_large_image" : "summary", "name");
    setMeta("twitter:title", finalTitle, "name");
    setMeta("twitter:description", description, "name");
    setMeta("twitter:image", image, "name");

    setLink("canonical", canonicalUrl);
  }, [title, description, image, url, type]);
}

function setMeta(key, content, attr = "name") {
  if (!key) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!content) {
    if (el) el.remove();
    return;
  }
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

function setLink(rel, href) {
  if (!href) return;
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  el.setAttribute("href", href);
}
