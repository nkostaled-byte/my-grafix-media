"use client";

import Link from "next/link";
import { Footer } from "@/components/layout/Footer";
import { Kicker } from "@/components/ui/Kicker";
import { Button } from "@/components/ui/Button";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { proofAssets, businessOsModules } from "@/lib/proof";

/**
 * The work page shows what My Grafix builds itself — no archive of old
 * clients, no fabricated results. The four proof assets are the real
 * systems we maintain today: this website, Business OS, Maya and the
 * Living System.
 */
export default function WorkPage() {
  return (
    <>
      <main className="pt-20">
        {/* Hero */}
        <section className="section-spacing container-padding">
          <div className="mx-auto max-w-[1600px]">
            <Reveal className="max-w-4xl">
              <Kicker className="mb-5">Built by My Grafix</Kicker>
              <h1 className="display-lg mb-7 text-3xl md:text-5xl lg:text-6xl">
                What we build.
              </h1>
              <p className="max-w-3xl text-lg leading-relaxed text-muted md:text-xl">
                Digital experiences. Business systems. Intelligent workflows.
                AI-powered experiences.
              </p>
              <p className="mt-6 max-w-3xl text-base leading-relaxed text-muted">
                We&apos;re in a new chapter, so we don&apos;t lean on old client
                projects. The clearest proof of what we can do for you is what
                we build and run ourselves, right now.
              </p>
            </Reveal>
          </div>
        </section>

        {/* Proof assets */}
        <section className="container-padding pb-10">
          <div className="mx-auto max-w-[1600px]">
            <div className="border-t border-border">
              {proofAssets.map((asset) => (
                <Reveal key={asset.id} distance={14}>
                  <div className="group border-b border-border">
                    <Link
                      href={asset.href}
                      className="block"
                      aria-label={`${asset.title} — ${asset.action}`}
                    >
                      <div className="grid grid-cols-1 gap-6 py-10 transition-colors duration-300 md:py-12 lg:grid-cols-12 lg:gap-12">
                        <div className="lg:col-span-4">
                          <span className="mono-label mb-4 block text-subtle transition-colors duration-300 group-hover:text-accent-brand">
                            {asset.index}
                          </span>
                          <h2 className="display-lg mb-3 text-2xl md:text-3xl">
                            {asset.title}
                          </h2>
                          <p className="mono-label text-subtle">{asset.category}</p>
                        </div>

                        <div className="lg:col-span-5">
                          <p className="text-sm leading-relaxed text-muted md:text-base">
                            {asset.description}
                          </p>
                          <RevealGroup stagger={0.05} className="mt-5 space-y-2">
                            {asset.detail.map((line) => (
                              <RevealItem key={line}>
                                <p className="flex items-baseline gap-3 text-sm text-muted">
                                  <span
                                    className="node-pulse h-1 w-1 shrink-0 rounded-full bg-accent-brand"
                                    aria-hidden="true"
                                  />
                                  {line}
                                </p>
                              </RevealItem>
                            ))}
                          </RevealGroup>
                        </div>

                        <div className="flex items-center lg:col-span-3">
                          {asset.id === "business-os" ? (
                            <div className="w-full overflow-hidden rounded-[8px] bg-surface-raised p-5 hairline">
                              <p className="mono-label mb-3 text-subtle">
                                Business OS · Modules
                              </p>
                              <ul className="flex flex-wrap gap-1.5" aria-label="Business OS modules">
                                {businessOsModules.map((module) => (
                                  <li
                                    key={module}
                                    className="rounded-[6px] bg-surface px-2.5 py-1.5 text-xs text-foreground hairline"
                                  >
                                    {module}
                                  </li>
                                ))}
                              </ul>
                              <p className="mono-label mt-4 text-subtle">
                                One API · One dashboard
                              </p>
                            </div>
                          ) : (
                            <span className="mono-label inline-flex items-center gap-2 text-foreground transition-colors duration-200 group-hover:text-accent-brand">
                              {asset.action}
                              <span
                                aria-hidden="true"
                                className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                              >
                                →
                              </span>
                            </span>
                          )}
                        </div>
                      </div>
                    </Link>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Closing line */}
        <section className="section-spacing container-padding bg-foreground text-background">
          <div className="mx-auto max-w-[1600px]">
            <Reveal className="max-w-2xl">
              <Kicker className="mb-5 text-background/55">Ready to Start?</Kicker>
              <h2 className="display-lg mb-6 text-3xl md:text-5xl">
                Your business could be next.
              </h2>
              <p className="mb-8 max-w-xl text-base leading-relaxed opacity-75 md:text-lg">
                Tell us what you are building and we&apos;ll help you find the right
                combination of design, digital and intelligence.
              </p>
              <Button href="/contact" variant="inverse" size="large" className="group">
                Start a Project
                <span
                  aria-hidden="true"
                  className="ml-0.5 inline-block transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                >
                  →
                </span>
              </Button>
            </Reveal>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
