export type SectionBlock =
  | { kind: "p"; text: string }
  | { kind: "h3"; text: string }
  | { kind: "ul"; items: string[] }
  | { kind: "email"; label: string; address: string };

export type LegalSection = {
  heading: string;
  blocks: SectionBlock[];
};

export function LegalSections({ sections }: { sections: LegalSection[] }) {
  return (
    <div className="space-y-14">
      {sections.map((section) => (
        <section key={section.heading} className="space-y-4">
          <h2 className="text-2xl font-medium tracking-tight text-foreground md:text-3xl">
            {section.heading}
          </h2>
          {section.blocks.map((block, index) => {
            if (block.kind === "h3") {
              return (
                <h3
                  key={`${section.heading}-h3-${index}`}
                  className="pt-2 text-lg font-medium text-foreground"
                >
                  {block.text}
                </h3>
              );
            }

            if (block.kind === "ul") {
              return (
                <ul
                  key={`${section.heading}-ul-${index}`}
                  className="list-disc space-y-2 pl-6 marker:text-subtle"
                >
                  {block.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              );
            }

            if (block.kind === "email") {
              return (
                <p key={`${section.heading}-email-${index}`}>
                  {block.label}{" "}
                  <a
                    href={`mailto:${block.address}`}
                    className="text-foreground underline underline-offset-4"
                  >
                    {block.address}
                  </a>
                </p>
              );
            }

            return <p key={`${section.heading}-p-${index}`}>{block.text}</p>;
          })}
        </section>
      ))}
    </div>
  );
}

export function LegalPageShell({
  title,
  lastUpdated,
  intro,
  sections,
}: {
  title: string;
  lastUpdated: string;
  intro: string[];
  sections: LegalSection[];
}) {
  return (
    <main className="pt-20">
      <section className="section-spacing container-padding">
        <div className="mx-auto max-w-3xl">
          <p className="mb-6 text-sm font-medium uppercase tracking-wider text-subtle">Legal</p>
          <h1 className="mb-6 text-5xl font-medium tracking-tight md:text-6xl">{title}</h1>
          <p className="mb-12 text-sm text-subtle">Last Updated: {lastUpdated}</p>
          <div className="mb-14 space-y-5 text-base leading-relaxed text-muted">
            {intro.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <LegalSections sections={sections} />
        </div>
      </section>
    </main>
  );
}
