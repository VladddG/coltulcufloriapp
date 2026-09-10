import Preloader from "@/components/Preloader/Preloader";
import Hero from "@/components/Hero/Hero";
import OffGrid from "@/components/OffGrid/OffGrid";
import SplitReveal from "@/components/SplitReveal/SplitReveal";

export default function Home() {
  return (
    // FĂRĂ overflow-x-hidden aici!
    <main className="w-full bg-[#050505]">
      <Preloader />
      <Hero />
      <OffGrid />
      <SplitReveal />
    </main>
  );
}