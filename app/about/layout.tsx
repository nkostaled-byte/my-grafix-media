import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "My Grafix Media is a South African creative agency combining design, digital development, and AI automation. Learn about our approach and philosophy.",
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
