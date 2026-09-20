import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms governing the use of the My Grafix Media website and our design, digital and intelligence services.",
  alternates: { canonical: "/terms" },
  robots: { index: false, follow: true },
};

export default function TermsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
