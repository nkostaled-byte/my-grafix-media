import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { Introduction } from "@/components/home/Introduction";
import { Pillars } from "@/components/home/Pillars";
import { SelectedWork } from "@/components/home/SelectedWork";
import { SystemSection } from "@/components/home/SystemSection";
import { Services } from "@/components/home/Services";
import { MeetMaya } from "@/components/home/MeetMaya";
import { LivingSystemSection } from "@/components/home/LivingSystemSection";
import { Partnership } from "@/components/home/Partnership";
import { About } from "@/components/home/About";
import { FinalCTA } from "@/components/home/FinalCTA";
import {
  generateOrganizationSchema,
  generateWebsiteSchema,
  generateServiceSchema,
} from "@/lib/structured-data";

export default function Home() {
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebsiteSchema();
  const serviceSchema = generateServiceSchema();

  return (
    <>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />

      <main>
        <Hero />
        <Introduction />
        <Pillars />
        <SelectedWork />
        <SystemSection />
        <Services />
        <MeetMaya />
        <LivingSystemSection />
        <Partnership />
        <About />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
