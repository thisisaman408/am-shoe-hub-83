import { Nav } from "@/components/layout/Nav";
import { Footer } from "@/components/layout/Footer";
import { Hero } from "@/components/sections/Hero";
import { Manifesto } from "@/components/sections/Manifesto";
import { Ticker } from "@/components/sections/Ticker";
import { Drops } from "@/components/sections/Drops";
import { Brands } from "@/components/sections/Brands";
import { HowToOrder } from "@/components/sections/HowToOrder";
import { Proof } from "@/components/sections/Proof";
import { Founder } from "@/components/sections/Founder";
import { Contact } from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <Nav />
      <main className="relative z-[2]">
        <Hero />
        <Manifesto />
        <Ticker />
        <Drops />
        <Brands />
        <HowToOrder />
        <Proof />
        <Founder />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
