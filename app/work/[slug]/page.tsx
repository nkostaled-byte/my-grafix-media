import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Footer } from "@/components/layout/Footer";
import { ThemeProjectImage } from "@/components/ui/ThemeProjectImage";

const caseStudies = {
  "brand-identity-platform": {
    title: "Brand Identity & Digital Platform",
    category: "Design · Digital",
    client: "Premium Retail Brand",
    image: "/images/projects/brand-identity-website.svg",
    summary: "A connected identity and digital platform designed to make a growing retail brand feel clearer, more consistent, and easier to discover.",
    challenge: "The brand needed a stronger visual system and a digital presence that could carry the same character across web, campaigns, and future touchpoints.",
    approach: "We shaped the identity and digital experience together: a focused visual language, clearer information hierarchy, and a responsive platform structure built to evolve.",
    deliverables: ["Visual identity direction", "Digital platform structure", "Responsive interface design", "Reusable content patterns"],
  },
  "ecommerce-platform": {
    title: "E-commerce Experience",
    category: "Digital",
    client: "Online Retailer",
    image: "/images/projects/ecommerce-platform.svg",
    summary: "A considered storefront concept that makes product discovery, product confidence, and checkout feel simple.",
    challenge: "The experience needed to move beyond a catalogue and create a clear, focused path from browsing to buying without unnecessary friction.",
    approach: "We organised the storefront around focused collections, stronger product hierarchy, clear pricing, and a visual system that gives the products room to lead.",
    deliverables: ["Storefront experience direction", "Collection and product hierarchy", "Responsive shopping interface", "Conversion-focused content structure"],
  },
  "ai-automation-system": {
    title: "AI Workflow Automation",
    category: "Intelligence",
    client: "Technology Company",
    image: "/images/projects/ai-automation-dashboard.svg",
    summary: "An operations dashboard concept for making automated work visible, understandable, and easier to improve.",
    challenge: "Automation becomes difficult to trust when teams cannot see what is running, what needs attention, or where a process is creating value.",
    approach: "We translated complex workflows into a calm operational view: active processes, useful status signals, and a clear path from overview to detail.",
    deliverables: ["Workflow experience strategy", "Operations dashboard concept", "Status and reporting patterns", "AI system interface direction"],
  },
  "mobile-app-development": {
    title: "Mobile Application",
    category: "Digital",
    client: "Tech Startup",
    image: "/images/projects/mobile-app.svg",
    summary: "A mobile product concept centred on clear actions, useful feedback, and a focused everyday experience.",
    challenge: "The product needed to make a complex service feel approachable on a small screen while keeping key actions easy to find.",
    approach: "We prioritised the primary journey, created a compact mobile information hierarchy, and used modular surfaces that can support future features.",
    deliverables: ["Mobile experience direction", "Core journey structure", "Interface system", "Prototype-ready screen patterns"],
  },
  "brand-guidelines-system": {
    title: "Brand Guidelines & Identity System",
    category: "Design",
    client: "Growing Business",
    image: "/images/projects/brand-guidelines.svg",
    summary: "A practical identity system designed to help a growing business stay recognisable as its communications expand.",
    challenge: "A brand can lose clarity when different people apply it differently across documents, campaigns, digital products, and social content.",
    approach: "We organised the identity into usable rules: how the mark behaves, how type and colour work together, and how the system translates into real applications.",
    deliverables: ["Identity system structure", "Logo usage direction", "Typography and colour guidance", "Application examples"],
  },
  "crm-platform": {
    title: "CRM Dashboard Platform",
    category: "Digital · Intelligence",
    client: "Sales Organization",
    image: "/images/projects/crm-dashboard.svg",
    summary: "A CRM dashboard concept that brings pipeline visibility, customer context, and operational signals into one calmer workspace.",
    challenge: "Teams lose time when customer information, opportunity status, and reporting live across disconnected tools and views.",
    approach: "We focused the dashboard on the decisions a team needs to make: what is active, what changed, and where attention is needed next.",
    deliverables: ["Dashboard information architecture", "Pipeline and KPI patterns", "Customer context surfaces", "System interface direction"],
  },
  "landing-page-optimization": {
    title: "High-Converting Landing Page",
    category: "Digital",
    client: "B2B Software Company",
    image: "/images/projects/landing-page.svg",
    summary: "A focused landing-page concept built around a clear promise, a stronger narrative, and a more direct next step.",
    challenge: "The page needed to explain a complex offer quickly while giving the right visitors enough confidence to begin a conversation.",
    approach: "We simplified the hierarchy, made the value proposition more immediate, and shaped the page around progressive proof and a clear project CTA.",
    deliverables: ["Message and page structure", "Conversion-focused layout", "Responsive interface direction", "CTA and content hierarchy"],
  },
} as const;

type Slug = keyof typeof caseStudies;

export function generateStaticParams() {
  return Object.keys(caseStudies).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const study = caseStudies[slug as Slug];
  if (!study) return { title: "Case Study" };
  return { title: study.title, description: study.summary };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const study = caseStudies[slug as Slug];
  if (!study) notFound();

  return (
    <>
      <main className="pt-20">
        <section className="section-spacing container-padding">
          <div className="mx-auto max-w-[1600px]">
            <Link href="/work" className="mb-12 inline-flex text-sm text-muted underline-offset-4 hover:text-foreground hover:underline">← Back to selected work</Link>
            <div className="grid grid-cols-1 items-end gap-12 lg:grid-cols-12 lg:gap-20">
              <div className="lg:col-span-8">
                <p className="mb-6 text-sm font-medium uppercase tracking-wider text-subtle">{study.category}</p>
                <h1 className="max-w-5xl text-5xl font-medium leading-tight tracking-tight md:text-7xl">{study.title}</h1>
              </div>
              <div className="lg:col-span-4 lg:pb-2">
                <p className="mb-2 text-sm text-subtle">Project direction</p>
                <p className="text-lg text-muted">{study.client}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="container-padding">
          <div className="mx-auto max-w-[1600px] overflow-hidden rounded-3xl border border-border bg-background">
            <div className="relative aspect-[16/8]">
              <ThemeProjectImage src={study.image} alt={`${study.title} concept visual`} sizes="100vw" className="object-contain p-4 md:p-10" />
            </div>
          </div>
          <p className="mx-auto mt-4 max-w-[1600px] text-xs uppercase tracking-wider text-subtle">Concept visual — illustrative direction, not a claim of completed client work.</p>
        </section>

        <section className="section-spacing container-padding">
          <div className="mx-auto grid max-w-[1200px] grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <p className="mb-5 text-sm font-medium uppercase tracking-wider text-subtle">Overview</p>
              <h2 className="text-3xl font-medium leading-tight tracking-tight md:text-4xl">{study.summary}</h2>
            </div>
            <div className="space-y-12 text-lg leading-relaxed text-muted lg:col-span-7">
              <div><h3 className="mb-3 text-xl font-medium text-foreground">The challenge</h3><p>{study.challenge}</p></div>
              <div><h3 className="mb-3 text-xl font-medium text-foreground">The approach</h3><p>{study.approach}</p></div>
            </div>
          </div>
        </section>

        <section className="section-spacing container-padding bg-border/20">
          <div className="mx-auto max-w-[1200px]">
            <p className="mb-8 text-sm font-medium uppercase tracking-wider text-subtle">What this direction includes</p>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {study.deliverables.map((item, index) => <div key={item} className="border-t border-border py-5 text-xl font-medium"><span className="mr-4 text-sm text-subtle">0{index + 1}</span>{item}</div>)}
            </div>
          </div>
        </section>

        <section className="section-spacing container-padding">
          <div className="mx-auto max-w-[1200px] rounded-3xl border border-border p-10 text-center md:p-16">
            <h2 className="mb-6 text-4xl font-medium tracking-tight md:text-5xl">Have a project with a similar challenge?</h2>
            <p className="mx-auto mb-9 max-w-2xl text-lg leading-relaxed text-muted">Tell us what you are building and we can explore the right combination of design, digital, and intelligence.</p>
            <Button href="/contact" size="large">Start a Project</Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
