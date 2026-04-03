# NIXRIX — Complete On-Page SEO Guide
## All Pages: Technical SEO, AEO, GEO, and Schema

---

## GLOBAL SEO RULES (apply to every page)

### Meta / Head
- `<html lang="en-GB">` — must be set in index.html
- Canonical tags on every page: `<link rel="canonical" href="https://nixrix.com/PAGE" />`
- OG tags: `og:title`, `og:description`, `og:image` (1200×630 jpg), `og:url`, `og:type`
- Twitter card: `twitter:card = summary_large_image`
- Viewport: `<meta name="viewport" content="width=device-width, initial-scale=1">`
- robots: `<meta name="robots" content="index, follow">` (except /privacy, /terms, /cookies — set noindex)

### Technical
- sitemap.xml at nixrix.com/sitemap.xml — submit to Google Search Console
- robots.txt: allow all except /api/, /admin/
- Core Web Vitals: images use loading="lazy" except above-fold hero
- All images need descriptive alt text with keywords (see per-page below)
- Internal links: every page links to at least /contact and /services
- 404 → redirect to / (already done in App.tsx)

### Schema (JSON-LD) — add to index.html or SEOHead component
```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "NIXRIX",
  "url": "https://nixrix.com",
  "logo": "https://nixrix.com/logo.png",
  "description": "UK business automation company helping SMEs replace manual work with smart websites, CRM systems, automation and live dashboards.",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Leeds",
    "addressRegion": "West Yorkshire",
    "addressCountry": "GB"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+447492712144",
    "email": "hello@nixrix.com",
    "contactType": "customer service",
    "areaServed": "GB"
  },
  "sameAs": [
    "https://linkedin.com/company/nixrix",
    "https://x.com/nixrix"
  ]
}
```

### AEO (Answer Engine Optimisation — for AI search like ChatGPT, Perplexity, Google SGE)
- Use FAQ sections with clear Q+A format (already in HowWeWorkPage)
- Use H2/H3 headings that directly answer questions: "What is NIXRIX?", "How does business automation work?"
- Use structured lists for processes (numbered steps)
- Keep key answers under 60 words for featured snippet capture
- Add `itemscope itemtype="https://schema.org/FAQPage"` to FAQ sections

### GEO (Geographic SEO — local + regional signals)
- Include "Leeds" and "UK" in page titles, H1s, and meta descriptions
- Mention "England and Wales" in footer (already present)
- Add LocalBusiness schema on Contact page
- Consider creating a Google Business Profile for NIXRIX

---

## PAGE-BY-PAGE SEO

---

### HOME PAGE ( / )

**Title tag:** `UK Business Automation and Websites | NIXRIX Leeds — Stop Losing Time`
**Meta description:** `NIXRIX helps UK SMEs and letting agencies replace manual work with smart websites, CRM automation, Power BI dashboards and Make.com workflows. Leeds based. No migration required.`
**Primary keyword:** `UK business automation`
**Secondary keywords:** `letting agency automation UK`, `HubSpot CRM setup Leeds`, `workflow automation small business UK`, `business website Leeds`

**H1:** "Stop Losing Time. Start Running Smarter." ✅
**H2s should include:**
- "Does This Sound Like Your Business?" (who we help)
- "What We Build for You" (services)
- "How We Work Together" (process)
- "We Add. We Never Replace." (USP)

**Images alt text:**
- Hero background: alt="UK business automation workflow diagram"
- Service images: alt="[Service name] for UK small businesses"
- Team/office photo: alt="NIXRIX team Leeds UK business automation"

**Internal links from homepage:** /services, /contact, /work, /blog/automation-for-uk-letting-agencies, /blog/business-automation-services-leeds

**Schema:** Organization (already above) + WebSite with SearchAction

---

### ABOUT PAGE ( /about )

**Title tag:** `About NIXRIX | UK Business Automation Company — Leeds`
**Meta description:** `NIXRIX is a Leeds-based UK business automation company helping SMEs replace manual work with smart websites, CRM systems, automation and live dashboards. No migration required.`
**Primary keyword:** `UK business automation company`
**Secondary keywords:** `about NIXRIX`, `Leeds automation agency`, `no migration automation UK`, `UK SME digital systems`

**H1:** "We Help UK Small Businesses Stop Losing Time and Start Running Smarter." ✅
**H2s:**
- "Built From Frustration. Driven By What's Possible." (story)
- "What We Are Building Toward" (mission/vision)
- "What We Stand For" (values)
- "Why Businesses Choose NIXRIX"

**Images alt text:**
- Mission image: alt="NIXRIX founders working on UK business automation Leeds"
- Vision cards: alt="[card topic] for UK small businesses"
- Why us image: alt="UK letting agency automation team Leeds"

**Breadcrumb schema:**
```json
{
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://nixrix.com"},
    {"@type": "ListItem", "position": 2, "name": "About", "item": "https://nixrix.com/about"}
  ]
}
```

---

### SERVICES PAGE ( /services )

**Title tag:** `Services and Packages | NIXRIX UK Business Automation — Clear Prices`
**Meta description:** `Named automation and website packages with clear prices. The Spark from £497, NIXRIX Command from £1,997, Agency Smart Pack £2,697. UK letting agencies and SMEs. Leeds.`
**Primary keyword:** `UK business automation packages`
**Secondary keywords:** `HubSpot CRM setup UK price`, `Power BI dashboard cost UK`, `website automation package Leeds`, `letting agency automation package UK`

**H1:** "Named Packages. Clear Prices. No Guesswork." ✅
**H2s — one per package tier:**
- "Quick Win Packages" (The Spark, Impression, Magnet, Connector)
- "Signature Packages" (Launchpad, Command, Momentum, Intelligence, Autopilot)
- "Letting Agency Package" (Agency Smart Pack)
- "Monthly Support Retainers" (Grow Lite, Standard, Pro)

**Package name colours in red** — important visual keyword anchor for recognition ✅

**Images alt text:**
- Each package image: alt="[Package name] — [service type] for UK small businesses"

**Schema — Service for each package:**
```json
{
  "@type": "Service",
  "name": "NIXRIX Launchpad",
  "description": "Full multi-page business website with SEO and lead capture",
  "provider": {"@type": "Organization", "name": "NIXRIX"},
  "areaServed": "GB",
  "offers": {"@type": "Offer", "price": "1497", "priceCurrency": "GBP"}
}
```
(Repeat for each named package)

---

### HOW WE WORK PAGE ( /how-we-work )

**Title tag:** `How We Work | NIXRIX UK Business Automation — 4 Step Process`
**Meta description:** `NIXRIX's simple 4-step process: free discovery call, clear recommendation, fast build, live system. From first conversation to running smarter. Leeds, UK.`
**Primary keyword:** `how NIXRIX works`
**Secondary keywords:** `UK automation delivery process`, `business automation no disruption`, `no migration CRM setup UK`

**H1:** "From First Call to Live System in Days." ✅
**H2s:**
- "Free Discovery Call"
- "Clear Written Recommendation"
- "We Build It"
- "You Run Smarter"
- "We Add. We Never Replace." (principle)
- "Questions We Get Asked" (FAQ)

**FAQ Schema — AEO gold:**
```html
<section itemscope itemtype="https://schema.org/FAQPage">
  <div itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
    <h3 itemprop="name">Do I have to change my existing tools?</h3>
    <div itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
      <p itemprop="text">No. NIXRIX's no-migration promise means we connect to and automate around the tools you already use.</p>
    </div>
  </div>
  <!-- Repeat for each FAQ -->
</section>
```

---

### CONTACT PAGE ( /contact )

**Title tag:** `Contact NIXRIX | Book a Free Discovery Call — Leeds UK`
**Meta description:** `Book a free 30 minute discovery call with NIXRIX. Tell us about your business and we will tell you exactly what would make the biggest difference. hello@nixrix.com | 07492 712144`
**Primary keyword:** `contact NIXRIX`
**Secondary keywords:** `book UK business automation call`, `NIXRIX discovery call Leeds`, `letting agency automation enquiry UK`

**H1:** "Let's Talk About Your Business." ✅

**LocalBusiness Schema — strong GEO signal:**
```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "NIXRIX",
  "url": "https://nixrix.com",
  "telephone": "+447492712144",
  "email": "hello@nixrix.com",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": "Leeds",
    "addressRegion": "West Yorkshire",
    "postalCode": "LS1",
    "addressCountry": "GB"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 53.7997,
    "longitude": -1.5492
  },
  "openingHours": "Mo-Fr 09:00-18:00",
  "priceRange": "££"
}
```

---

### WORK PAGE ( /work )

**Title tag:** `Our Work | NIXRIX UK Business Automation Projects and Results`
**Meta description:** `See how NIXRIX has helped UK letting agencies, accountants and SMEs replace manual work with smart websites, CRM automation and live Power BI dashboards.`
**Primary keyword:** `NIXRIX work portfolio`
**Secondary keywords:** `UK business automation case study`, `letting agency CRM automation example`, `HubSpot automation results UK`, `Power BI dashboard SME`

**H1:** "Real Businesses. Real Systems. Real Results." ✅
**H2s:**
- One per project: "Meridian Lettings", "Apex Accounting" etc.

**Case study Schema:**
```json
{
  "@type": "Article",
  "@id": "https://nixrix.com/work#meridian-lettings",
  "headline": "How Meridian Lettings Automated Their Landlord Follow-Up with NIXRIX",
  "description": "Letting agency in Leeds used NIXRIX Agency Smart Pack to automate landlord enquiry follow-up",
  "author": {"@type": "Organization", "name": "NIXRIX"},
  "publisher": {"@type": "Organization", "name": "NIXRIX"}
}
```

**Review Schema — for the marquee reviews:**
```json
{
  "@type": "AggregateRating",
  "ratingValue": "5",
  "ratingCount": "8",
  "bestRating": "5"
}
```

---

### BLOG LISTING ( /blog )

**Title tag:** `Blog | NIXRIX UK Business Automation Guides and Insights`
**Meta description:** `Practical guides on business automation, letting agency systems, CRM setup, Power BI dashboards and workflow automation for UK small businesses.`
**Primary keyword:** `UK business automation blog`
**Secondary keywords:** `letting agency automation guide`, `HubSpot CRM guide UK`, `workflow automation UK small business`

---

### BLOG ARTICLE 1 ( /blog/automation-for-uk-letting-agencies )

**Title tag:** `Automation for UK Letting Agencies | Save 10+ Hours Per Week | NIXRIX`
**Meta description:** `How UK letting agencies are using automation to follow up faster, reduce admin, and stop losing landlords to more responsive competitors. NIXRIX, Leeds.`
**Primary keyword:** `automation for UK letting agencies`
**Secondary keywords:** `HubSpot for letting agents`, `letting agency CRM automation`, `automate letting agency admin`, `landlord follow-up automation UK`

**Target featured snippet:** "What does automation mean for a letting agency?" → answered in first 100 words of article
**Internal links in article:** /services (Agency Smart Pack), /contact, /how-we-work

**Article Schema:**
```json
{
  "@type": "Article",
  "headline": "Automation for UK Letting Agencies: How Smart Systems Save 10+ Hours Every Week",
  "author": {"@type": "Organization", "name": "NIXRIX"},
  "datePublished": "2026-03-01",
  "publisher": {"@type": "Organization", "name": "NIXRIX", "logo": {"@type": "ImageObject", "url": "https://nixrix.com/logo.png"}}
}
```

---

### BLOG ARTICLE 2 ( /blog/business-automation-services-leeds )

**Title tag:** `Business Automation Services Leeds | NIXRIX UK SME Automation`
**Meta description:** `Why Leeds-based SMEs are turning to workflow automation, HubSpot CRM and live dashboards to grow faster without hiring more staff. NIXRIX, Leeds.`
**Primary keyword:** `business automation services Leeds`
**Secondary keywords:** `workflow automation Leeds`, `automation agency Leeds`, `HubSpot setup Leeds`, `Power BI dashboard Leeds SME`

**Target featured snippet:** "What is business automation for a small business?" → answered in intro
**Internal links:** /services, /contact, /blog/automation-for-uk-letting-agencies

---

## GOOGLE SEARCH CONSOLE SETUP

1. Go to search.google.com/search-console
2. Add property: URL prefix → https://nixrix.com
3. Verify via DNS TXT record (via GoDaddy)
4. Submit sitemap: https://nixrix.com/sitemap.xml
5. Request indexing for all key pages

## SITEMAP PRIORITY RECOMMENDATIONS

```xml
<url><loc>https://nixrix.com/</loc><priority>1.0</priority><changefreq>weekly</changefreq></url>
<url><loc>https://nixrix.com/services</loc><priority>0.9</priority><changefreq>monthly</changefreq></url>
<url><loc>https://nixrix.com/work</loc><priority>0.8</priority><changefreq>monthly</changefreq></url>
<url><loc>https://nixrix.com/contact</loc><priority>0.9</priority><changefreq>monthly</changefreq></url>
<url><loc>https://nixrix.com/about</loc><priority>0.7</priority><changefreq>monthly</changefreq></url>
<url><loc>https://nixrix.com/how-we-work</loc><priority>0.7</priority><changefreq>monthly</changefreq></url>
<url><loc>https://nixrix.com/blog</loc><priority>0.7</priority><changefreq>weekly</changefreq></url>
<url><loc>https://nixrix.com/blog/automation-for-uk-letting-agencies</loc><priority>0.8</priority></url>
<url><loc>https://nixrix.com/blog/business-automation-services-leeds</loc><priority>0.8</priority></url>
```

---

## GA4 EVENTS TO TRACK

| Event | Trigger |
|---|---|
| `cta_click` | Any "Book Free Discovery Call" button |
| `form_submit` | Contact form submission |
| `service_enquire` | "Enquire →" on any package card |
| `whatsapp_click` | WhatsApp link click |
| `phone_click` | tel: link click |
| `blog_read` | 60 seconds on any blog article |
| `scroll_depth_75` | 75% page scroll |

Add these as custom events in GA4 → Configure → Events → Create event.

---

*Generated for NIXRIX LTD — nixrix.com — April 2026*
