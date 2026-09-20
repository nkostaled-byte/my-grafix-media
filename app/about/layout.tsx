import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "My Grafix Media is a complete creative technology partner: design, digital development and AI automation under one roof. Learn about our approach and philosophy.",
  alternates: { canonical: "/about" },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
