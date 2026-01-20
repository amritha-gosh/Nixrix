import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  ogImage?: string;
  canonicalUrl?: string;
  schemaType?: 'website' | 'organization' | 'service' | 'article';
}

export function SEOHead({
  title = 'NIXRIX - Modern Business Websites with AI & Dashboards | UK Web Design',
  description = 'Professional websites starting from £199. AI chatbots, KPI dashboards, automation, and SEO. Based in Leeds, UK. Transform your digital presence with intelligent web solutions.',
  keywords = 'web design UK, business websites, AI chatbot, KPI dashboard, Power BI integration, website automation, SEO services, Leeds web design, intelligent websites, SME web solutions',
  ogImage = 'https://images.unsplash.com/photo-1758519291531-e96279895745?w=1200',
  canonicalUrl,
  schemaType = 'website'
}: SEOProps) {
  const location = useLocation();
  const baseUrl = 'https://nixrix.com'; // Replace with actual domain
  const fullUrl = canonicalUrl || `${baseUrl}${location.pathname}`;

  useEffect(() => {
    // Update document title
    document.title = title;

    // Update or create meta tags
    const updateMeta = (name: string, content: string, property?: boolean) => {
      const attribute = property ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`);
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Standard meta tags
    updateMeta('description', description);
    updateMeta('keywords', keywords);
    updateMeta('author', 'NIXRIX');
    updateMeta('robots', 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1');
    updateMeta('googlebot', 'index, follow');
    
    // Open Graph tags
    updateMeta('og:title', title, true);
    updateMeta('og:description', description, true);
    updateMeta('og:url', fullUrl, true);
    updateMeta('og:type', 'website', true);
    updateMeta('og:image', ogImage, true);
    updateMeta('og:image:width', '1200', true);
    updateMeta('og:image:height', '630', true);
    updateMeta('og:site_name', 'NIXRIX', true);
    updateMeta('og:locale', 'en_GB', true);
    
    // Twitter Card tags
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', title);
    updateMeta('twitter:description', description);
    updateMeta('twitter:image', ogImage);
    
    // Additional SEO tags
    updateMeta('viewport', 'width=device-width, initial-scale=1, maximum-scale=5');
    updateMeta('theme-color', '#0D9488');
    
    // Canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = fullUrl;

    // Schema.org structured data
    const schemaData = {
      '@context': 'https://schema.org',
      '@type': schemaType === 'organization' ? 'Organization' : 'WebSite',
      name: 'NIXRIX',
      description: description,
      url: baseUrl,
      logo: `${baseUrl}/logo.png`,
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Leeds',
        addressCountry: 'GB'
      },
      contactPoint: {
        '@type': 'ContactPoint',
        email: 'hello@nixrix.com',
        contactType: 'Customer Service',
        areaServed: 'GB'
      },
      sameAs: [
        // Add social media links when available
      ],
      ...(schemaType === 'organization' && {
        '@type': 'Organization',
        founder: {
          '@type': 'Person',
          name: 'NIXRIX Team'
        },
        foundingDate: '2024',
        areaServed: {
          '@type': 'GeoCircle',
          geoMidpoint: {
            '@type': 'GeoCoordinates',
            latitude: '53.8008',
            longitude: '-1.5491'
          }
        }
      }),
      ...(schemaType === 'service' && {
        '@type': 'Service',
        serviceType: 'Web Design and Development',
        provider: {
          '@type': 'Organization',
          name: 'NIXRIX'
        },
        areaServed: 'GB',
        hasOfferCatalog: {
          '@type': 'OfferCatalog',
          name: 'Web Design Services',
          itemListElement: [
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'Website Design',
                description: 'Professional responsive websites starting from £199'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'AI Chatbot Integration',
                description: 'Intelligent chatbots for customer engagement and lead capture'
              }
            },
            {
              '@type': 'Offer',
              itemOffered: {
                '@type': 'Service',
                name: 'KPI Dashboard Integration',
                description: 'Power BI dashboards with real-time business insights'
              }
            }
          ]
        }
      })
    };

    let scriptTag = document.querySelector('script[type="application/ld+json"]');
    if (!scriptTag) {
      scriptTag = document.createElement('script');
      scriptTag.type = 'application/ld+json';
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(schemaData);

  }, [title, description, keywords, ogImage, fullUrl, schemaType]);

  return null;
}