import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "My Grafix Media",
    short_name: "My Grafix",
    description:
      "Design, Digital & Intelligence — Complete creative partner for ambitious businesses",
    start_url: "/",
    display: "standalone",
    background_color: "#fafafa",
    theme_color: "#0f0f0f",
    icons: [
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  };
}
