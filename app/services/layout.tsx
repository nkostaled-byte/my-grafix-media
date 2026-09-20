import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Design, Digital, and Intelligence services from My Grafix Media. Brand identity, web development, e-commerce, AI automation, and intelligent systems for ambitious businesses.",
  alternates: { canonical: "/services" },
};

export default function ServicesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
