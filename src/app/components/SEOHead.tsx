import { useEffect } from "react";

interface SEOHeadProps {
  title: string;
  description: string;
  keywords?: string;
  schemaType?: "organization" | "service" | "article" | "local";
  canonicalPath?: string;
  ogImage?: string;
  noIndex?: boolean;
}

const BASE_URL = "https://nixrix.com";
const DEFAULT_OG_IMAGE = `${BASE_URL}/og-image.jpg`;

const ORG_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "NIXRIX",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  description: "UK business automation company helping SMEs replace manual work with smart websites, CRM systems, automation and live dashboards.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Leeds",
    addressRegion: "West Yorkshire",
    addressCountry: "GB",
  },
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+447492712144",
    email: "hello@nixrix.com",
    contactType: "customer service",
    areaServed: "GB",
  },
  sameAs: [
    "https://linkedin.com/company/nixrix",
    "https://x.com/nixrix",
    "https://instagram.com/nixrix",
    "https://facebook.com/nixrix",
  ],
};

const LOCAL_SCHEMA = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "NIXRIX",
  url: BASE_URL,
  telephone: "+447492712144",
  email: "hello@nixrix.com",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Leeds",
    addressRegion: "West Yorkshire",
    postalCode: "LS1",
    addressCountry: "GB",
  },
  geo: { "@type": "GeoCoordinates", latitude: 53.7997, longitude: -1.5492 },
  openingHours: "Mo-Fr 09:00-18:00",
  priceRange: "££",
};

export function SEOHead({
  title,
  description,
  keywords,
  schemaType = "organization",
  canonicalPath = "",
  ogImage = DEFAULT_OG_IMAGE,
  noIndex = false,
}: SEOHeadProps) {
  useEffect(() => {
    // Title
    document.title = title;

    const setMeta = (name: string, content: string, property = false) => {
      const attr = property ? "property" : "name";
      let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement("meta");
        el.setAttribute(attr, name);
        document.head.appendChild(el);
      }
      el.content = content;
    };

    // Standard meta
    setMeta("description", description);
    if (keywords) setMeta("keywords", keywords);
    setMeta("robots", noIndex ? "noindex,nofollow" : "index,follow");

    // OG
    setMeta("og:title", title, true);
    setMeta("og:description", description, true);
    setMeta("og:image", ogImage, true);
    setMeta("og:url", `${BASE_URL}${canonicalPath}`, true);
    setMeta("og:type", "website", true);
    setMeta("og:site_name", "NIXRIX", true);

    // Twitter card
    setMeta("twitter:card", "summary_large_image");
    setMeta("twitter:title", title);
    setMeta("twitter:description", description);
    setMeta("twitter:image", ogImage);

    // Canonical
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = `${BASE_URL}${canonicalPath}`;

    // JSON-LD schema
    const schemaData = schemaType === "local" ? LOCAL_SCHEMA : ORG_SCHEMA;
    let script = document.querySelector("#nixrix-schema") as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = "nixrix-schema";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schemaData);
  }, [title, description, keywords, schemaType, canonicalPath, ogImage, noIndex]);

  return null;
}
