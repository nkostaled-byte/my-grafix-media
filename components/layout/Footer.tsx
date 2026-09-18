import Link from "next/link";
import Image from "next/image";

const footerSections = [
  {
    title: "Services",
    links: [
      { label: "Branding & Design", href: "/services#design" },
      { label: "Web Development", href: "/services#digital" },
      { label: "AI & Automation", href: "/services#intelligence" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "Work", href: "/work" },
      { label: "About", href: "/about" },
      { label: "Contact", href: "/contact" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-background">
      <div className="container-padding mx-auto max-w-[1600px]">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 gap-10 py-14 md:grid-cols-12">
          {/* Brand Section */}
          <div className="md:col-span-6">
            <Link href="/" className="mb-4 inline-flex items-center gap-2.5 transition-opacity hover:opacity-70">
              <Image
                src="/logo.png"
                alt="My Grafix Media"
                width={36}
                height={36}
                className="h-9 w-9"
              />
              <span className="text-lg font-semibold tracking-[-0.02em]">
                My Grafix Media
              </span>
            </Link>
            <p className="max-w-md text-sm text-subtle">
              Design · Digital · Intelligence
            </p>
          </div>

          {/* Links Sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="md:col-span-3">
              <h3 className="kicker mb-4 text-subtle">{section.title}</h3>
              <ul className="space-y-2.5">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-muted transition-colors duration-200 hover:text-accent-brand"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border py-6 text-sm text-subtle md:flex-row">
          <p>&copy; {new Date().getFullYear()} My Grafix Media. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="transition-colors duration-200 hover:text-foreground">
              Privacy Policy
            </Link>
            <Link href="/terms" className="transition-colors duration-200 hover:text-foreground">
              Terms &amp; Conditions
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
