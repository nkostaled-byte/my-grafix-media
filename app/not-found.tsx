import Link from "next/link";

export default function NotFound() {
  return (
    <main className="section-spacing container-padding">
      <div className="mx-auto max-w-[1200px] text-center">
        <p className="mono-label mb-6 text-subtle">404</p>
        <h1 className="display-lg mb-6 text-3xl md:text-5xl">
          Looks like this page got lost.
        </h1>
        <p className="mx-auto mb-10 max-w-xl text-base leading-relaxed text-muted md:text-lg">
          The page you were looking for isn&apos;t here. Everything else is a
          short walk away.
        </p>
        <Link
          href="/"
          className="mono-label inline-flex items-center gap-2 text-foreground underline-offset-4 transition-colors duration-200 hover:text-accent-brand hover:underline"
        >
          Return home
          <span aria-hidden="true">→</span>
        </Link>
      </div>
    </main>
  );
}
