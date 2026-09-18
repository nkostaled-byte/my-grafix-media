import { Footer } from "@/components/layout/Footer";
import { LegalPageShell, type LegalSection } from "@/components/legal/LegalSections";

export const metadata = {
  title: "Terms & Conditions",
  description:
    "The terms and conditions governing use of the My Grafix Media website, information, features and services.",
};

const sections: LegalSection[] = [
  {
    heading: "1. About My Grafix Media",
    blocks: [
      {
        kind: "p",
        text: "My Grafix Media is a creative technology company providing services that may include:",
      },
      { kind: "h3", text: "Design" },
      {
        kind: "ul",
        items: [
          "Branding",
          "Graphic design",
          "Creative direction",
          "Marketing design",
          "Packaging",
          "Visual communication",
        ],
      },
      { kind: "h3", text: "Digital" },
      {
        kind: "ul",
        items: [
          "Website design and development",
          "E-commerce",
          "Web applications",
          "Digital experiences",
          "Business systems",
          "Website management",
        ],
      },
      { kind: "h3", text: "Intelligence" },
      {
        kind: "ul",
        items: [
          "AI solutions",
          "AI agents",
          "AI assistants",
          "Business automation",
          "Intelligent workflows",
          "Custom technology solutions",
        ],
      },
      {
        kind: "p",
        text: "Specific services, features, pricing, deliverables and timelines may vary.",
      },
    ],
  },
  {
    heading: "2. Website Information",
    blocks: [
      { kind: "p", text: "We aim to provide accurate and useful information on the website." },
      {
        kind: "p",
        text: "However, website content is provided for general informational purposes and may change from time to time.",
      },
      {
        kind: "p",
        text: "Service descriptions, examples, prices, availability, timelines and other information displayed on the website do not automatically constitute a binding quotation or offer unless expressly stated otherwise.",
      },
      {
        kind: "p",
        text: "A specific project will be governed by the applicable proposal, quotation, statement of work or service agreement.",
      },
    ],
  },
  {
    heading: "3. Project Enquiries",
    blocks: [
      {
        kind: "p",
        text: "Submitting an enquiry through the website does not automatically create a client relationship or contract.",
      },
      { kind: "p", text: "We may review your enquiry and contact you to discuss:" },
      {
        kind: "ul",
        items: [
          "Requirements",
          "Scope",
          "Budget",
          "Timeline",
          "Technical requirements",
          "Deliverables",
          "Applicable terms",
        ],
      },
      {
        kind: "p",
        text: "A project only becomes binding when the relevant parties have entered into an applicable agreement or otherwise accepted the applicable commercial terms.",
      },
    ],
  },
  {
    heading: "4. Quotations and Pricing",
    blocks: [
      { kind: "p", text: "Where pricing is displayed on the website, prices may be subject to change." },
      { kind: "p", text: "Unless expressly stated otherwise:" },
      {
        kind: "ul",
        items: [
          "Website prices are indicative",
          "Custom projects may require individual quotations",
          "Third-party costs may be charged separately",
          "Hosting, domains, software licences, subscriptions, APIs and other external services may incur additional costs",
          "Additional work outside an agreed scope may be quoted separately",
        ],
      },
      {
        kind: "p",
        text: "The final price and scope of a project will be determined by the applicable quotation, proposal or agreement.",
      },
    ],
  },
  {
    heading: "5. Intellectual Property",
    blocks: [
      {
        kind: "p",
        text: "Unless otherwise agreed in writing, My Grafix Media retains intellectual property rights in:",
      },
      {
        kind: "ul",
        items: [
          "Website content created by My Grafix Media",
          "Original design systems",
          "Templates",
          "Reusable components",
          "Code libraries",
          "Frameworks",
          "Processes",
          "Internal tools",
          "Concepts and methodologies",
          "Other pre-existing intellectual property",
        ],
      },
      {
        kind: "p",
        text: "Client ownership or licensing of project-specific deliverables will be determined by the applicable project agreement.",
      },
      {
        kind: "p",
        text: "Third-party software, fonts, stock assets, plugins, APIs, libraries and other licensed materials remain subject to their respective licences.",
      },
    ],
  },
  {
    heading: "6. Client Materials",
    blocks: [
      {
        kind: "p",
        text: "Where you provide materials to My Grafix Media, you represent that you have the necessary rights or permissions to provide and use those materials for the intended project.",
      },
      { kind: "p", text: "This may include:" },
      {
        kind: "ul",
        items: [
          "Logos",
          "Images",
          "Videos",
          "Text",
          "Product information",
          "Fonts",
          "Brand assets",
          "Customer information",
          "Other materials",
        ],
      },
      {
        kind: "p",
        text: "You remain responsible for ensuring that materials you provide do not unlawfully infringe another person's rights.",
      },
    ],
  },
  {
    heading: "7. Website and Digital Services",
    blocks: [
      {
        kind: "p",
        text: "Where My Grafix Media develops a website, application or digital system for a client, the precise:",
      },
      {
        kind: "ul",
        items: [
          "Scope",
          "Features",
          "Technology",
          "Integrations",
          "Hosting",
          "Maintenance",
          "Support",
          "Security responsibilities",
          "Ownership",
          "Delivery requirements",
        ],
      },
      {
        kind: "p",
        text: "will be determined by the applicable project agreement.",
      },
      {
        kind: "p",
        text: "Unless expressly included, third-party services and ongoing third-party costs are not automatically included in project pricing.",
      },
    ],
  },
  {
    heading: "8. AI Services and AI Agents",
    blocks: [
      {
        kind: "p",
        text: "My Grafix Media may provide AI-powered solutions, including AI assistants, automation and AI agents.",
      },
      {
        kind: "p",
        text: "AI systems may produce inaccurate, incomplete or unexpected results.",
      },
      {
        kind: "p",
        text: "AI-generated output should be reviewed where accuracy, legal compliance, financial decisions, safety, security or other material consequences are involved.",
      },
      {
        kind: "p",
        text: "AI services may depend on third-party models, APIs or infrastructure.",
      },
      {
        kind: "p",
        text: "Availability, functionality, pricing and performance of those third-party services may change.",
      },
      {
        kind: "p",
        text: "My Grafix Media does not guarantee that AI systems will always produce accurate, uninterrupted or error-free results.",
      },
    ],
  },
  {
    heading: "9. Maya",
    blocks: [
      {
        kind: "p",
        text: "Maya is an AI-powered website assistant intended to help visitors understand My Grafix Media and explore potential services.",
      },
      { kind: "p", text: "Maya does not:" },
      {
        kind: "ul",
        items: [
          "Enter into binding contracts on behalf of My Grafix Media",
          "Automatically approve project scopes",
          "Automatically provide binding quotations",
          "Provide legal, financial or professional advice",
          "Guarantee project availability",
          "Guarantee that every response is accurate",
        ],
      },
      {
        kind: "p",
        text: "Where necessary, enquiries may be escalated to a human member of the My Grafix Media team.",
      },
    ],
  },
  {
    heading: "10. Acceptable Use",
    blocks: [
      { kind: "p", text: "You agree not to use the website to:" },
      {
        kind: "ul",
        items: [
          "Break any applicable law",
          "Attempt to gain unauthorised access to systems",
          "Introduce malicious software",
          "Attack or disrupt the website",
          "Scrape or harvest personal information unlawfully",
          "Abuse automated systems",
          "Impersonate another person or organisation",
          "Submit fraudulent information",
          "Attempt to circumvent security controls",
          "Use the website for unlawful or harmful purposes",
        ],
      },
      {
        kind: "p",
        text: "We may restrict or block access where reasonably necessary to protect the website, our systems, our users or our business.",
      },
    ],
  },
  {
    heading: "11. Website Availability",
    blocks: [
      { kind: "p", text: "We aim to keep the website available and functioning properly." },
      { kind: "p", text: "However, we do not guarantee that the website will:" },
      {
        kind: "ul",
        items: [
          "Always be available",
          "Be uninterrupted",
          "Be completely error-free",
          "Be free of vulnerabilities",
          "Always contain current information",
        ],
      },
      {
        kind: "p",
        text: "The website may occasionally be unavailable due to maintenance, updates, infrastructure issues, security events or circumstances outside our reasonable control.",
      },
    ],
  },
  {
    heading: "12. Third-Party Services",
    blocks: [
      { kind: "p", text: "The website and our services may depend on third-party providers." },
      { kind: "p", text: "These may include providers of:" },
      {
        kind: "ul",
        items: [
          "Hosting",
          "Domains",
          "Cloud infrastructure",
          "AI models",
          "APIs",
          "Payment services",
          "Email",
          "Analytics",
          "Communication platforms",
          "Software",
          "Storage",
        ],
      },
      {
        kind: "p",
        text: "We are not responsible for outages, changes, restrictions or failures caused by third-party providers outside our reasonable control.",
      },
      {
        kind: "p",
        text: "Where a client project depends on a third-party service, the applicable project agreement may contain additional terms.",
      },
    ],
  },
  {
    heading: "13. External Links",
    blocks: [
      { kind: "p", text: "The website may contain links to third-party websites." },
      { kind: "p", text: "These links are provided for convenience." },
      {
        kind: "p",
        text: "We do not control third-party websites and do not necessarily endorse their content, products or services.",
      },
      {
        kind: "p",
        text: "Use of third-party websites is subject to their own terms and policies.",
      },
    ],
  },
  {
    heading: "14. Intellectual Property of My Grafix Media",
    blocks: [
      {
        kind: "p",
        text: "Unless otherwise indicated, the My Grafix Media website and its original content, design, branding, graphics, code and other materials are owned by or licensed to My Grafix Media.",
      },
      {
        kind: "p",
        text: "You may not reproduce, modify, distribute, sell, publish or commercially exploit website materials without appropriate permission.",
      },
      {
        kind: "p",
        text: "Nothing in these Terms transfers ownership of My Grafix Media intellectual property to you.",
      },
    ],
  },
  {
    heading: "15. Portfolio and Case Studies",
    blocks: [
      {
        kind: "p",
        text: "Examples of work displayed on the website may represent projects completed for clients or internal/demo projects.",
      },
      {
        kind: "p",
        text: "Where client work is shown, the relevant intellectual property remains subject to the rights and agreements applicable to that project.",
      },
      {
        kind: "p",
        text: "Portfolio examples do not guarantee that an identical result, design, performance or outcome will be achieved for another project.",
      },
    ],
  },
  {
    heading: "16. Warranties and Disclaimers",
    blocks: [
      {
        kind: "p",
        text: "To the maximum extent permitted by applicable law, the website and its general informational content are provided on an “as available” basis.",
      },
      { kind: "p", text: "We do not make guarantees regarding:" },
      {
        kind: "ul",
        items: [
          "Business results",
          "Sales",
          "Search-engine rankings",
          "Lead volume",
          "Conversion rates",
          "AI performance",
          "Website traffic",
          "Revenue",
          "Specific commercial outcomes",
        ],
      },
      { kind: "p", text: "unless a specific written agreement expressly provides otherwise." },
      {
        kind: "p",
        text: "Nothing in these Terms is intended to exclude or limit any consumer right or legal protection that cannot lawfully be excluded or limited.",
      },
    ],
  },
  {
    heading: "17. Limitation of Liability",
    blocks: [
      {
        kind: "p",
        text: "To the maximum extent permitted by applicable law, My Grafix Media will not be responsible for indirect, incidental, special or consequential losses arising from use of the website or reliance on general website information.",
      },
      {
        kind: "p",
        text: "Nothing in these Terms excludes or limits liability where such exclusion or limitation is prohibited by law.",
      },
      {
        kind: "p",
        text: "Specific limitations relating to paid services may be addressed in the applicable project or service agreement.",
      },
    ],
  },
  {
    heading: "18. Indemnity",
    blocks: [
      {
        kind: "p",
        text: "To the extent permitted by applicable law, you agree to indemnify My Grafix Media against claims, losses or expenses arising from your unlawful use of the website, your violation of these Terms, or materials you provide to us where you did not have the necessary rights or permissions.",
      },
      { kind: "p", text: "This clause does not limit rights that cannot lawfully be limited." },
    ],
  },
  {
    heading: "19. Privacy",
    blocks: [
      { kind: "p", text: "Your use of the website is also subject to our Privacy Policy." },
      { kind: "p", text: "The Privacy Policy explains how we collect and process personal information." },
    ],
  },
  {
    heading: "20. Electronic Communications",
    blocks: [
      {
        kind: "p",
        text: "Communications sent electronically, including through website forms and email, may be used for ordinary business communication.",
      },
      {
        kind: "p",
        text: "An enquiry submitted through the website does not automatically constitute acceptance of a quotation, contract or project agreement.",
      },
      {
        kind: "p",
        text: "Where a legally binding electronic agreement is intended, the applicable terms and acceptance process will be provided separately.",
      },
    ],
  },
  {
    heading: "21. Governing Law",
    blocks: [
      {
        kind: "p",
        text: "These Terms are governed by the laws of the Republic of South Africa, subject to any mandatory rights or protections that apply to users or consumers under applicable law.",
      },
      {
        kind: "p",
        text: "Nothing in these Terms is intended to deprive a consumer of rights that cannot lawfully be excluded.",
      },
    ],
  },
  {
    heading: "22. Changes to These Terms",
    blocks: [
      { kind: "p", text: "We may update these Terms from time to time." },
      {
        kind: "p",
        text: "The latest version will be published on this website with an updated “Last Updated” date.",
      },
      {
        kind: "p",
        text: "Your continued use of the website after an update may constitute acceptance of the updated Terms to the extent permitted by law.",
      },
    ],
  },
  {
    heading: "23. Severability",
    blocks: [
      {
        kind: "p",
        text: "If any provision of these Terms is found to be unlawful, invalid or unenforceable, that provision will be interpreted or limited to the extent necessary, and the remaining provisions will continue to apply to the extent permitted by law.",
      },
    ],
  },
  {
    heading: "24. Contact",
    blocks: [
      { kind: "p", text: "For questions regarding these Terms, please contact:" },
      { kind: "p", text: "My Grafix Media" },
      { kind: "p", text: "Website: https://mygrafixmedia.com" },
      { kind: "email", label: "Email:", address: "hello@mygrafixmedia.com" },
    ],
  },
];

export default function TermsPage() {
  return (
    <>
      <LegalPageShell
        title="Terms & Conditions"
        lastUpdated="12 September 2026"
        intro={[
          "These Terms and Conditions (“Terms”) govern your access to and use of the My Grafix Media website at https://mygrafixmedia.com and the information, features and services made available through the website.",
          "By accessing or using the website, you agree to these Terms. If you do not agree with these Terms, please do not use the website.",
          "These website Terms apply to use of the website. They do not replace a separate written agreement, quotation, statement of work, proposal, subscription agreement or other contract that may apply to services provided by My Grafix Media.",
        ]}
        sections={sections}
      />
      <Footer />
    </>
  );
}
