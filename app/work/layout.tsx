import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Work",
  description:
    "Explore My Grafix Media's portfolio of branding, web development, and AI automation projects. See how we help ambitious businesses stand out and work smarter.",
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
