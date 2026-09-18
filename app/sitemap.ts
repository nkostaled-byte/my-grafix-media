import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://mygrafixmedia.com";

  return [
    {
      url: baseUrl,
      lastModified: "2026-09-11",
      changeFrequency: "monthly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: "2026-09-11",
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: "2026-09-11",
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: "2026-09-11",
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: "2026-09-11",
      changeFrequency: "yearly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: "2026-09-12",
      changeFrequency: "yearly",
      priority: 0.2,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: "2026-09-12",
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];
}
