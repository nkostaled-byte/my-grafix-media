import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Button } from "@/components/ui/Button";
import { Footer } from "@/components/layout/Footer";
import { proofAssets } from "@/lib/proof";

type ProofSlug = (typeof proofAssets)[number]["id"];

export function generateStaticParams() {
  return proofAssets.map((asset) => ({ slug: asset.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const asset = proofAssets.find((a) => a.id === slug);
  if (!asset) return { title: "Built by My Grafix" };
  return { title: asset.title, description: asset.description };
}

/**
 * Detail pages for the four proof assets My Grafix builds and runs
 * itself. No invented clients, statistics or results — only what is
 * verifiable from our own systems.
 */
export default async function ProofPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const asset = proofAssets.find((a) => a.id === slug);
  if (!asset) notFound();

  return (
    <>
      <main className="pt-20">
        <section className="section-spacing container-padding">
          <div className="mx-auto max-w-[1200px]">
            <Link href="/work" className="mb-12 inline-flex text-sm text-muted underline-offset-4 hover:text-foreground hover:underline">← Back to Built by My Grafix</Link>
            <p className="mb-6 text-sm font-medium uppercase tracking-wider text-subtle">{asset.category}</p>
            <h1 className="max-w-4xl text-4xl font-medium leading-tight tracking-tight md:text-6xl">{asset.title}</h1>
            <p className="mt-8 max-w-3xl text-lg leading-relaxed text-muted md:text-lg">{asset.description}</p>
          </div>
        </section>

        <section className="section-spacing container-padding bg-border/20">
          <div className="mx-auto max-w-[1200px]">
            <p className="mb-8 text-sm font-medium uppercase tracking-wider text-subtle">What it includes</p>
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {asset.detail.map((item, index) => (
                <div key={item} className="border-t border-border py-5 text-xl font-medium"><span className="mr-4 text-sm text-subtle">0{index + 1}</span>{item}</div>
              ))}
            </div>
          </div>
        </section>

        <section className="section-spacing container-padding">
          <div className="mx-auto max-w-[1200px] rounded-3xl border border-border p-10 text-center md:p-16">
            <h2 className="mb-6 text-3xl font-medium tracking-tight md:text-5xl">Want the same for your business?</h2>
            <p className="mx-auto mb-9 max-w-2xl text-lg leading-relaxed text-muted">Tell us what you are building and we can explore the right combination of design, digital, and intelligence.</p>
            <Button href="/contact" size="large">Start a Project</Button>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
