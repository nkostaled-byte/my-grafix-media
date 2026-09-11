import Link from "next/link";

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
        <div className="py-16 grid grid-cols-1 md:grid-cols-12 gap-12">
          {/* Brand Section */}
          <div className="md:col-span-5">
            <Link
              href="/"
              className="text-xl font-medium inline-block mb-4 hover:opacity-70 transition-opacity"
            >
              My Grafix Media
            </Link>
            <p className="text-muted text-[15px] leading-relaxed max-w-md">
              Design · Digital · Intelligence
            </p>
            <p className="text-subtle text-sm mt-4 max-w-md">
              Built in South Africa. Designed for everywhere.
            </p>
          </div>

          {/* Links Sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="md:col-span-3">
              <h3 className="font-medium mb-4 text-sm uppercase tracking-wider">
                {section.title}
              </h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-muted hover:text-foreground transition-colors text-[15px]"
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
        <div className="py-6 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-subtle">
          <p>&copy; {new Date().getFullYear()} My Grafix Media. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-foreground transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-foreground transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
