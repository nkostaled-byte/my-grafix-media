import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { MayaAssistant } from "@/components/maya/MayaAssistant";
import { CookieConsent } from "@/components/ui/CookieConsent";
import { MotionProvider } from "@/components/motion/MotionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mygrafixmedia.com"),
  title: {
    default: "My Grafix Media — Design · Digital · Intelligence",
    template: "%s — My Grafix Media",
  },
  description:
    "My Grafix Media combines design, digital experiences and intelligent systems to help ambitious businesses stand out, work smarter and move forward.",
  keywords: [
    "design agency",
    "web development",
    "branding",
    "AI automation",
    "digital agency",
    "South Africa",
    "web design",
    "e-commerce",
    "AI agents",
  ],
  authors: [{ name: "My Grafix Media" }],
  creator: "My Grafix Media",
  openGraph: {
    type: "website",
    locale: "en_ZA",
    url: "https://mygrafixmedia.com",
    title: "My Grafix Media — Design · Digital · Intelligence",
    description:
      "My Grafix Media combines design, digital experiences and intelligent systems to help ambitious businesses stand out, work smarter and move forward.",
    siteName: "My Grafix Media",
    images: [
      {
        url: "/og/my-grafix-media-og.jpg",
        width: 1200,
        height: 630,
        alt: "My Grafix Media — Design · Digital · Intelligence",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og/my-grafix-media-og.jpg"],
    title: "My Grafix Media — Design · Digital · Intelligence",
    description:
      "My Grafix Media combines design, digital experiences and intelligent systems to help ambitious businesses stand out, work smarter and move forward.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${geistSans.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/icon-192.png" />
      </head>
      <body className="min-h-screen flex flex-col">
        <MotionProvider>
          <Header />
          {children}
          <MayaAssistant />
          <CookieConsent />
        </MotionProvider>
      </body>
    </html>
  );
}
