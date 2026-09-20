"use client";

import Link from "next/link";
import { Kicker } from "@/components/ui/Kicker";
import { Reveal, RevealGroup, RevealItem } from "@/components/motion/Reveal";
import { proofAssets, businessOsModules } from "@/lib/proof";

/**
 * The proof. Instead of an archive of old client projects, the homepage
 * now shows what My Grafix builds itself: this website, Business OS,
 * Maya and the Living System. Rows stay editorial and hairline-ruled;
 * the Business OS gets a structural preview built from its real module
 * names — no invented data.
 */
export function BuiltBy() {
  return (
    <section className="section-spacing container-padding bg-background">
      <div className="mx-auto max-w-[1600px]">
        {/* Section Header */}
        <Reveal className="mb-14 max-w-3xl md:mb-20">
          <Kicker className="mb-4">Built by My Grafix</Kicker>
          <h2 className="display-lg text-3xl md:text-4xl lg:text-5xl">
            We build these things ourselves.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-muted md:text-lg">
            No archive of borrowed screenshots. Here is what we design, build
            and run right now — the clearest proof of how we work.
          </p>
        </Reveal>

        {/* Proof rows */}
        <div className="border-t border-border">
          {proofAssets.map((asset) => (
            <Reveal key={asset.id} distance={14}>
              <div className="group border-b border-border">
                <div className="grid grid-cols-1 gap-6 py-10 md:py-12 lg:grid-cols-12 lg:gap-12">
                  {/* Index + identity */}
                  <div className="lg:col-span-4">
                    <span className="mono-label mb-4 block text-subtle transition-colors duration-300 group-hover:text-accent-brand">
                      {asset.index}
                    </span>
                    <h3 className="display-lg mb-3 text-2xl md:text-3xl">
                      {asset.title}
                    </h3>
                    <p className="mono-label text-subtle">{asset.category}</p>
                  </div>

                  {/* Description */}
                  <div className="lg:col-span-5">
                    <p className="text-sm leading-relaxed text-muted md:text-base">
                      {asset.description}
                    </p>
                    <RevealGroup
                      stagger={0.05}
                      className="mt-5 space-y-2"
                    >
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
                    <Link
                      href={asset.href}
                      className="mono-label mt-6 inline-flex items-center gap-2 text-foreground transition-colors duration-200 group-hover:text-accent-brand"
                    >
                      {asset.action}
                      <span
                        aria-hidden="true"
                        className="inline-block transition-transform duration-200 ease-out group-hover:translate-x-0.5"
                      >
                        →
                      </span>
                    </Link>
                  </div>

                  {/* Business OS structural preview — real modules, no fake data */}
                  <div className="flex items-center lg:col-span-3">
                    {asset.id === "business-os" && (
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
                          Orders · POS · Bookings · Intake on one API
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
