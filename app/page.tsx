import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/home/Hero";
import { Introduction } from "@/components/home/Introduction";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Introduction />
      </main>
      <Footer />
    </>
  );
}
