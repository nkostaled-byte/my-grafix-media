export function generateOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "My Grafix Media",
    url: "https://mygrafixmedia.com",
    logo: "https://mygrafixmedia.com/logo.png",
    description:
      "My Grafix Media combines design, digital experiences and intelligent systems to help ambitious businesses stand out, work smarter and move forward.",
    address: {
      "@type": "PostalAddress",
      addressCountry: "ZA",
    },
    sameAs: [
      // Add social media links when available
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      url: "https://mygrafixmedia.com/contact",
    },
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
    knowsAbout: [
      "Web Design",
      "Web Development",
      "Brand Identity",
      "Graphic Design",
      "E-commerce",
      "AI Automation",
      "Business Automation",
      "Digital Marketing",
    ],
  };
}

export function generateWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "My Grafix Media",
    url: "https://mygrafixmedia.com",
    description:
      "Design · Digital · Intelligence — Complete creative partner for ambitious businesses",
    publisher: {
      "@type": "Organization",
      name: "My Grafix Media",
    },
  };
}

export function generateServiceSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Creative Agency Services",
    provider: {
      "@type": "Organization",
      name: "My Grafix Media",
      url: "https://mygrafixmedia.com",
    },
    areaServed: {
      "@type": "Place",
      name: "Worldwide",
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Creative Services",
      itemListElement: [
        {
          "@type": "OfferCatalog",
          name: "Design Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Brand Identity Design",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Graphic Design",
              },
            },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Digital Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Web Development",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "E-commerce Development",
              },
            },
          ],
        },
        {
          "@type": "OfferCatalog",
          name: "Intelligence Services",
          itemListElement: [
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "AI Automation",
              },
            },
            {
              "@type": "Offer",
              itemOffered: {
                "@type": "Service",
                name: "Business Automation",
              },
            },
          ],
        },
      ],
    },
  };
}
