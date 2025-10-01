export function StructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Sanaya's Scents",
    "description": "Luxury fragrance catalog and personalized scent discovery",
    "url": "https://sanayascents.com",
    "logo": "https://sanayascents.com/logo.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+1-555-123-4567",
      "contactType": "customer service",
      "email": "hello@sanayascents.com"
    },
    "sameAs": [
      "https://instagram.com/sanayascents",
      "https://facebook.com/sanayascents",
      "https://twitter.com/sanayascents"
    ]
  }

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Sanaya's Scents",
    "url": "https://sanayascents.com",
    "description": "Discover your perfect fragrance with our personalized scent discovery quiz and curated collection of luxury perfumes.",
    "potentialAction": {
      "@type": "SearchAction",
      "target": "https://sanayascents.com/search?q={search_term_string}",
      "query-input": "required name=search_term_string"
    }
  }

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://sanayascents.com"
      }
    ]
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema)
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema)
        }}
      />
    </>
  )
}
