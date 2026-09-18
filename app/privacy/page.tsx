import { Footer } from "@/components/layout/Footer";
import { LegalPageShell, type LegalSection } from "@/components/legal/LegalSections";

export const metadata = {
  title: "Privacy Policy",
  description:
    "How My Grafix Media collects, uses, stores and protects personal information, including the Maya website assistant.",
};

const sections: LegalSection[] = [
  {
    heading: "1. Who We Are",
    blocks: [
      {
        kind: "p",
        text: "My Grafix Media is a creative technology company providing services including design, digital experiences, websites, web development, automation, AI solutions, business systems and related digital services.",
      },
      {
        kind: "p",
        text: "For purposes of applicable data protection legislation, My Grafix Media may act as the responsible party in relation to personal information that we collect directly through our website and business communications.",
      },
      {
        kind: "ul",
        items: [
          "Responsible Party: My Grafix Media",
          "Website: https://mygrafixmedia.com",
          "Privacy Contact: hello@mygrafixmedia.com",
        ],
      },
    ],
  },
  {
    heading: "2. Information We May Collect",
    blocks: [
      {
        kind: "p",
        text: "Depending on how you interact with us, we may collect information including:",
      },
      { kind: "h3", text: "Information you provide directly" },
      { kind: "p", text: "This may include:" },
      {
        kind: "ul",
        items: [
          "Name and surname",
          "Company or organisation name",
          "Email address",
          "Telephone or mobile number",
          "Project requirements",
          "Business information",
          "Information contained in messages or enquiries",
          "Information submitted through forms",
          "Information provided during conversations with Maya",
          "Other information you voluntarily provide to us",
        ],
      },
      {
        kind: "p",
        text: "Please do not submit passwords, payment-card information, identity documents or other highly sensitive information through general website forms unless specifically requested through an appropriate secure process.",
      },
      { kind: "h3", text: "Automatically collected information" },
      {
        kind: "p",
        text: "When you visit our website, certain technical information may be collected automatically, depending on the technologies and services active on the website.",
      },
      { kind: "p", text: "This may include:" },
      {
        kind: "ul",
        items: [
          "IP address",
          "Browser type",
          "Device type",
          "Operating system",
          "Approximate location derived from technical information",
          "Pages visited",
          "Referring website",
          "Date and time of visits",
          "Basic interaction information",
          "Technical and diagnostic information",
        ],
      },
    ],
  },
  {
    heading: "3. How We Use Your Information",
    blocks: [
      {
        kind: "p",
        text: "We may use personal information for legitimate business purposes, including to:",
      },
      {
        kind: "ul",
        items: [
          "Respond to enquiries",
          "Communicate with you",
          "Understand your project requirements",
          "Prepare proposals or quotations",
          "Provide requested services",
          "Manage client relationships",
          "Improve our website and services",
          "Provide customer support",
          "Operate and improve Maya, our website AI assistant",
          "Qualify project enquiries",
          "Identify appropriate My Grafix Media services",
          "Prevent abuse, fraud or security incidents",
          "Maintain website security",
          "Comply with legal and regulatory obligations",
          "Keep appropriate business records",
          "Send marketing communications where permitted by law and where appropriate consent or another lawful basis exists",
        ],
      },
      {
        kind: "p",
        text: "We will not use personal information for purposes that are incompatible with the purpose for which it was collected unless permitted or required by applicable law.",
      },
    ],
  },
  {
    heading: "4. Maya — Our Website AI Assistant",
    blocks: [
      {
        kind: "p",
        text: "Our website may provide access to Maya, an AI-powered assistant designed to help visitors understand My Grafix Media's services and determine how we may be able to assist with a project.",
      },
      {
        kind: "p",
        text: "Maya may process information that you voluntarily provide during a conversation, including:",
      },
      {
        kind: "ul",
        items: [
          "Your name",
          "Company information",
          "Email address",
          "Project requirements",
          "Questions",
          "Information about your business",
          "Other information contained within your conversation",
        ],
      },
      {
        kind: "p",
        text: "Maya is intended to provide general information and assist with enquiries.",
      },
      {
        kind: "p",
        text: "Maya may not always provide complete or accurate information. AI-generated responses should not be treated as a binding quotation, contract, technical specification or professional advice.",
      },
      {
        kind: "p",
        text: "Where Maya is uncertain about an important question, the conversation may be escalated to a member of the My Grafix Media team for human review.",
      },
      {
        kind: "p",
        text: "If you provide information to Maya, you acknowledge that the information may be processed for the purposes described in this Privacy Policy.",
      },
    ],
  },
  {
    heading: "5. Human Escalation and Communication",
    blocks: [
      {
        kind: "p",
        text: "Where appropriate, enquiries or conversations may be reviewed by members of the My Grafix Media team.",
      },
      {
        kind: "p",
        text: "For example, if Maya cannot confidently answer a question, relevant conversation information may be provided to a team member so that we can provide a more accurate response.",
      },
      {
        kind: "p",
        text: "We will take reasonable steps to limit information shared internally to what is reasonably necessary for the relevant purpose.",
      },
    ],
  },
  {
    heading: "6. Legal Basis for Processing",
    blocks: [
      {
        kind: "p",
        text: "Where POPIA applies, we process personal information in accordance with applicable lawful grounds for processing.",
      },
      { kind: "p", text: "Depending on the circumstances, this may include:" },
      {
        kind: "ul",
        items: [
          "Your consent",
          "Taking steps at your request before entering into a contract",
          "Performing a contract",
          "Complying with a legal obligation",
          "Protecting legitimate business interests where permitted by law",
          "Other lawful grounds recognised by applicable legislation",
        ],
      },
      {
        kind: "p",
        text: "Where consent is relied upon, you may generally withdraw that consent, subject to legal or contractual limitations and the circumstances of the processing concerned.",
      },
    ],
  },
  {
    heading: "7. Marketing Communications",
    blocks: [
      {
        kind: "p",
        text: "If you voluntarily provide your contact details, we may contact you about your enquiry, project or relationship with My Grafix Media.",
      },
      {
        kind: "p",
        text: "Where required by applicable law, promotional communications will only be sent where we have an appropriate lawful basis to do so.",
      },
      {
        kind: "p",
        text: "You may request that we stop sending promotional communications to you.",
      },
      {
        kind: "p",
        text: "We will respect applicable unsubscribe and opt-out requirements.",
      },
    ],
  },
  {
    heading: "8. Cookies and Similar Technologies",
    blocks: [
      {
        kind: "p",
        text: "Our website may use cookies or similar technologies to:",
      },
      {
        kind: "ul",
        items: [
          "Keep the website functioning",
          "Understand website usage",
          "Improve performance",
          "Remember preferences",
          "Improve user experience",
          "Support security",
          "Measure marketing or website performance where applicable",
        ],
      },
      {
        kind: "p",
        text: "The specific cookies used may change as the website and its services evolve.",
      },
      {
        kind: "p",
        text: "Where required, we will provide appropriate information or controls regarding non-essential cookies.",
      },
    ],
  },
  {
    heading: "9. Service Providers and Third Parties",
    blocks: [
      {
        kind: "p",
        text: "We may use trusted third-party service providers to operate parts of our business and website.",
      },
      {
        kind: "p",
        text: "Depending on the services we use, these may include providers for:",
      },
      {
        kind: "ul",
        items: [
          "Website hosting",
          "Cloud infrastructure",
          "Email",
          "Analytics",
          "AI services",
          "Automation",
          "Database services",
          "File storage",
          "Communication",
          "Payment processing",
          "Security",
          "Customer relationship management",
        ],
      },
      {
        kind: "p",
        text: "These providers may process information on our behalf or as independent parties, depending on their role.",
      },
      {
        kind: "p",
        text: "We aim to use appropriate service providers and take reasonable steps to protect personal information processed through third-party services.",
      },
    ],
  },
  {
    heading: "10. International Data Transfers",
    blocks: [
      {
        kind: "p",
        text: "Some technology or service providers we use may process information outside South Africa.",
      },
      {
        kind: "p",
        text: "Where personal information is transferred outside South Africa, we will take reasonable steps to ensure that the transfer and processing are conducted in accordance with applicable data protection requirements.",
      },
    ],
  },
  {
    heading: "11. Data Retention",
    blocks: [
      {
        kind: "p",
        text: "We retain personal information only for as long as reasonably necessary for the purpose for which it was collected, including where necessary to:",
      },
      {
        kind: "ul",
        items: [
          "Respond to enquiries",
          "Provide services",
          "Maintain business records",
          "Resolve disputes",
          "Comply with legal obligations",
          "Protect our legitimate interests",
          "Enforce agreements",
        ],
      },
      {
        kind: "p",
        text: "The appropriate retention period may vary depending on the nature of the information and the purpose for which it is processed.",
      },
    ],
  },
  {
    heading: "12. Information Security",
    blocks: [
      {
        kind: "p",
        text: "We take reasonable technical and organisational measures designed to protect personal information against:",
      },
      {
        kind: "ul",
        items: [
          "Unauthorised access",
          "Loss",
          "Misuse",
          "Alteration",
          "Disclosure",
          "Destruction",
        ],
      },
      {
        kind: "p",
        text: "However, no internet transmission or electronic storage system can be guaranteed to be completely secure.",
      },
      {
        kind: "p",
        text: "You should therefore avoid sending confidential or highly sensitive information through ordinary website forms or unsecured communication channels.",
      },
    ],
  },
  {
    heading: "13. Your Privacy Rights",
    blocks: [
      {
        kind: "p",
        text: "Subject to applicable law, you may have rights relating to your personal information, including the right to:",
      },
      {
        kind: "ul",
        items: [
          "Ask whether we hold personal information about you",
          "Request access to certain personal information",
          "Request correction or updating of inaccurate information",
          "Request deletion where legally appropriate",
          "Object to certain processing",
          "Withdraw consent where consent is the applicable basis",
          "Request information about how your personal information is processed",
          "Lodge a complaint regarding the handling of your personal information",
        ],
      },
      { kind: "p", text: "Requests should be sent to:" },
      { kind: "email", label: "", address: "hello@mygrafixmedia.com" },
      {
        kind: "p",
        text: "We may need to take reasonable steps to verify your identity before processing certain requests.",
      },
    ],
  },
  {
    heading: "14. Children's Information",
    blocks: [
      {
        kind: "p",
        text: "Our website and services are primarily intended for businesses and adults.",
      },
      {
        kind: "p",
        text: "We do not knowingly request or intentionally collect personal information from children through general website enquiries.",
      },
      {
        kind: "p",
        text: "If you believe that a child has provided personal information to us without appropriate consent or authorisation, please contact us so that we can assess the situation and take appropriate action.",
      },
    ],
  },
  {
    heading: "15. Links to Other Websites",
    blocks: [
      {
        kind: "p",
        text: "Our website may contain links to third-party websites or services.",
      },
      {
        kind: "p",
        text: "We are not responsible for the privacy practices, security or content of third-party websites.",
      },
      {
        kind: "p",
        text: "You should review the privacy policies of those websites before providing them with personal information.",
      },
    ],
  },
  {
    heading: "16. Changes to This Privacy Policy",
    blocks: [
      {
        kind: "p",
        text: "We may update this Privacy Policy from time to time to reflect:",
      },
      {
        kind: "ul",
        items: [
          "Changes to our services",
          "Changes to our technology",
          "Changes to legal requirements",
          "Changes to how we process information",
        ],
      },
      {
        kind: "p",
        text: "The updated version will be published on this website with a revised “Last Updated” date.",
      },
    ],
  },
  {
    heading: "17. Contact Us",
    blocks: [
      {
        kind: "p",
        text: "If you have questions about this Privacy Policy or how we process personal information, please contact:",
      },
      { kind: "p", text: "My Grafix Media" },
      { kind: "p", text: "Website: https://mygrafixmedia.com" },
      { kind: "email", label: "Email:", address: "hello@mygrafixmedia.com" },
    ],
  },
];

export default function PrivacyPage() {
  return (
    <>
      <LegalPageShell
        title="Privacy Policy"
        lastUpdated="12 September 2026"
        intro={[
          "My Grafix Media (“My Grafix Media”, “we”, “us”, or “our”) respects your privacy and is committed to protecting your personal information.",
          "This Privacy Policy explains how we collect, use, store, protect and otherwise process personal information when you visit https://mygrafixmedia.com, communicate with us, use our website assistant Maya, submit an enquiry, request our services, or otherwise interact with us.",
          "We aim to process personal information responsibly and in accordance with applicable South African privacy laws, including the Protection of Personal Information Act 4 of 2013 (POPIA), where applicable.",
        ]}
        sections={sections}
      />
      <Footer />
    </>
  );
}
