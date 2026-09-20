import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Built by My Grafix",
  description:
    "What My Grafix builds itself: this website, the Business OS dashboard, Maya the AI concierge and the Living System automation model. Design, digital and intelligence, proven in the wild.",
  alternates: { canonical: "/work" },
};

export default function WorkLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
