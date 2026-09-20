export type ProofAsset = {
  id: string;
  index: string;
  title: string;
  category: string;
  description: string;
  detail: string[];
  href: string;
  action: string;
  /** Optional illustration already used on the site. */
  image?: string;
};

/**
 * The four real proof assets behind My Grafix. No client work, no
 * fabricated case studies — everything here is built and maintained
 * by My Grafix itself.
 */
export const proofAssets: ProofAsset[] = [
  {
    id: "my-grafix-website",
    index: "01",
    title: "The My Grafix Website",
    category: "Design · Digital",
    description:
      "The site you're on right now. Editorial art direction, custom motion systems, theme awareness, cookie handling, form intake and a small intake API — designed and built in house.",
    detail: [
      "Custom editorial design language and motion system",
      "Server rendering, SEO infrastructure and structured data",
      "Contact intake routed through our own API",
    ],
    href: "/",
    action: "You're already here",
    image: "/images/projects/brand-identity-website.svg",
  },
  {
    id: "business-os",
    index: "02",
    title: "Business OS",
    category: "Digital · Intelligence",
    description:
      "A real operating system we built for running a modern business on the ground: clients, leads, bookings, POS and orders, products, inventory, invoices, reviews, forms and enquiry intake — all connected through our own API infrastructure.",
    detail: [
      "Sales channels, bookings and POS with order workflows",
      "Customers, leads and enquiries with intake forms",
      "Products, inventory and invoicing on one backend",
      "Deployed on our own API and database infrastructure",
    ],
    href: "/work/business-os",
    action: "See the system",
  },
  {
    id: "maya",
    index: "03",
    title: "Maya",
    category: "Intelligence",
    description:
      "Our live AI concierge — the small marker in the corner of this site. Maya talks with visitors, understands their goals and hands real enquiries to the team. Text-based, running on our own chat API.",
    detail: [
      "Live on this website right now",
      "Explores services and qualifies enquiries",
      "Hands conversations over to humans",
    ],
    href: "/work/maya",
    action: "Meet Maya",
  },
  {
    id: "living-system",
    index: "04",
    title: "Living System",
    category: "Automation",
    description:
      "The animated model lower on our homepage: a website, an AI agent, business systems, automation, a human and a customer — one signal travelling through a system that keeps working while you work.",
    detail: [
      "Shows how a real enquiry moves through a business",
      "Six connected nodes with a live signal",
      "Our standing model for intelligent workflows",
    ],
    href: "/work/living-system",
    action: "See the system",
  },
];

/**
 * The eleven core modules of the Business OS dashboard, as they appear
 * in its sidebar — used for a truthful structural preview, not fake data.
 */
export const businessOsModules = [
  "Overview",
  "Analytics",
  "Website",
  "Orders",
  "POS",
  "Products",
  "Bookings",
  "Customers",
  "Lead Gen",
  "Inventory",
  "Invoices",
];
