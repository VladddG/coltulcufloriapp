"use client";

import { useSplitRevealLogic } from './SplitRevealLogic';

export default function SplitReveal() {
  const { refs } = useSplitRevealLogic();

  return (
    <section ref={refs.containerRef} className="relative w-full h-screen bg-[#050505] overflow-hidden flex items-center justify-center border-t border-white/5">
      
      {/* Panoul stâng (Vine din afara ecranului la stânga) */}
      <div ref={refs.leftHalfRef} className="absolute top-0 left-0 w-[50vw] h-full overflow-hidden z-10 will-change-transform">
        <img 
          src="/assets/ioanacuflori.jpg" 
          className="absolute top-0 left-0 w-[100vw] max-w-none h-full object-cover opacity-30 grayscale border-r border-[#f48fb1]/30" 
          alt="Split Left" 
        />
      </div>

      {/* Panoul drept (Vine din afara ecranului la dreapta) */}
      {/* Trucul premium: translate-x-[50vw] pe imagine o aliniază milimetric cu cealaltă jumătate când se unesc */}
      <div ref={refs.rightHalfRef} className="absolute top-0 right-0 w-[50vw] h-full overflow-hidden z-10 will-change-transform">
        <img 
          src="/assets/ioanacuflori.jpg" 
          className="absolute top-0 left-0 w-[100vw] max-w-none h-full object-cover opacity-30 grayscale -translate-x-[50vw] border-l border-[#f48fb1]/30" 
          alt="Split Right" 
        />
      </div>

      {/* Textul Central */}
      <div ref={refs.textRef} className="relative z-20 text-center flex flex-col items-center pointer-events-none will-change-transform">
        <span className="font-sans text-[0.65rem] tracking-[8px] text-white/50 uppercase mb-4 drop-shadow-md">
          Următorul Pas
        </span>
        <h2 className="font-serif text-[clamp(4rem,8vw,8rem)] font-bold text-white uppercase leading-[0.8] drop-shadow-2xl">
          Descoperă
        </h2>
        <span 
          className="text-[#f48fb1] text-[clamp(5rem,10vw,9rem)] -mt-6 drop-shadow-xl" 
          style={{ fontFamily: "'Great Vibes', cursive" }}
        >
          colecția
        </span>
      </div>

    </section>
  );
}