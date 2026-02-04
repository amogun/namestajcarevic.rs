export function StructuredData() {
  const businessData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://namestajcarevic.rs/#organization",
    "name": "Nameštaj Carevic",
    "alternateName": "Salon Nameštaja Carevic",
    "description": "Nameštaj Carevic - salon nameštaja u Kragujevcu. Kvalitetan nameštaj za dom, tradicionalno zanatstvo, 20+ godina iskustva.",
    "url": "https://namestajcarevic.rs",
    "logo": {
      "@type": "ImageObject",
      "url": "https://namestajcarevic.rs/logo.svg",
      "width": 200,
      "height": 80
    },
    "image": [
      "https://namestajcarevic.rs/logo.svg"
    ],
    "telephone": [
      "+381-64-119-31-83",
      "+381-60-024-42-02"
    ],
    "email": ["salon@namestajcarevic.rs", "carevicnamestaj@gmail.com"],
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Božidara Milosavljevica 12",
      "addressLocality": "Kragujevac",
      "addressRegion": "Šumadijski okrug",
      "postalCode": "34000",
      "addressCountry": "RS"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 44.0128,
      "longitude": 20.9114
    },
    "areaServed": [
      {
        "@type": "City",
        "name": "Kragujevac"
      },
      {
        "@type": "City",
        "name": "Beograd"
      },
      {
        "@type": "City",
        "name": "Kraljevo"
      }
    ],
    "serviceType": [
      "Prodaja nameštaja",
      "Dnevna soba",
      "Spavaća soba",
      "Trpezarija",
      "Kancelarijski nameštaj"
    ],
    "priceRange": "$$",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "10:00",
        "closes": "19:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "10:00",
        "closes": "14:00"
      }
    ],
    "sameAs": [
      "https://www.facebook.com/namestaj.carevic/",
      "https://www.instagram.com/namestaj.carevic/"
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Nameštaj katalog",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Dnevna soba nameštaj"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Spavaća soba nameštaj"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Trpezarija nameštaj"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Product",
            "name": "Kancelarijski nameštaj"
          }
        }
      ]
    },
    "foundingDate": "2004",
    "knowsAbout": [
      "Nameštaj",
      "Dizajn enterijera",
      "Tradicionalno zanatstvo",
      "Kvalitetni materijali",
      "Kragujevac",
      "Srbija"
    ],
    "slogan": "Kvalitet, udobnost i stil za Vaš dom"
  };

  const websiteData = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "name": "Nameštaj Carevic",
    "url": "https://namestajcarevic.rs",
    "description": "Salon nameštaja u Kragujevcu sa 20+ godina tradicije",
    "inLanguage": "sr-RS",
    "publisher": {
      "@id": "https://namestajcarevic.rs/#organization"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://namestajcarevic.rs/catalog?search={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(businessData),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteData),
        }}
      />
    </>
  );
}