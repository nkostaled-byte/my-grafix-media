import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { Introduction } from "@/components/home/Introduction";
import { Pillars } from "@/components/home/Pillars";
import { SelectedWork } from "@/components/home/SelectedWork";
import { SystemSection } from "@/components/home/SystemSection";
import { Services } from "@/components/home/Services";
import { Partnership } from "@/components/home/Partnership";
import { About } from "@/components/home/About";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Introduction />
        <Pillars />
        <SelectedWork />
        <SystemSection />
        <Services />
        <Partnership />
        <About />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
