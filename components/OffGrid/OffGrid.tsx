"use client";

import { useOffGridLogic } from './OffGridLogic';

const styles = {
  section: "relative w-full h-screen bg-[#050505] overflow-hidden border-t border-white/5",
  track: "absolute top-0 left-0 h-full w-[315vw] max-md:w-[800vw] will-change-transform flex items-center", 
  cardGroup: "absolute z-10", 
  imageBox: "relative w-full h-full rounded-sm overflow-hidden border border-white/10 parallax-img",
  image: "w-full h-full object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-700 hover:scale-105",
  heading: "font-serif text-[clamp(2.5rem,4vw,4.5rem)] leading-[0.9] text-white uppercase tracking-wider drop-shadow-xl whitespace-nowrap",
  accent: "font-serif italic text-white text-[clamp(2.8rem,4.5vw,5.5rem)] leading-none tracking-wide drop-shadow-lg",
  textClusterLeft: "absolute flex flex-col items-start parallax-txt z-20 pointer-events-none drop-shadow-[0_0_15px_rgba(0,0,0,0.8)] [text-shadow:_0_0_20px_rgba(255,255,255,0.4)]",
  textClusterRight: "absolute flex flex-col items-end text-right parallax-txt z-20 pointer-events-none drop-shadow-[0_0_15px_rgba(0,0,0,0.8)] [text-shadow:_0_0_20px_rgba(255,255,255,0.4)]",
  label: "font-sans text-[0.65rem] md:text-[0.75rem] font-bold text-white uppercase tracking-[0.4em] mb-2",
  desc: "font-sans text-xs md:text-sm text-white/70 font-light leading-relaxed max-w-[240px]",
};

export default function OffGrid() {
  const { refs } = useOffGridLogic();

  return (
    <section ref={refs.containerRef} className={styles.section}>
      <div ref={refs.trackRef} className={styles.track}>
        
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0 opacity-[0.04]">
          <svg viewBox="0 0 4000 100" preserveAspectRatio="none" className="w-full h-full stroke-white stroke-[2px] fill-none">
            <path d="M 0 50 C 150 10, 300 90, 450 50 C 600 10, 650 120, 750 50 C 850 -20, 1000 90, 1150 50 C 1300 10, 1400 90, 1550 50 C 1700 10, 1800 90, 1950 50 S 2100 -10, 2250 50 S 2400 90, 2550 50 S 2800 10, 3000 50 S 3300 120, 3500 50 S 3800 -20, 4000 50" />
          </svg>
        </div>

        {/* --- 1. POZA MARE --- */}
        <div className={`${styles.cardGroup} top-[20vh] left-[5vw] max-md:left-[10vw] w-[22vw] max-md:w-[65vw] h-[55vh]`}>
          <div className={styles.imageBox} data-speedx="0.8">
            <img src="/assets/1.jpg" className={styles.image} alt="Colecție" />
          </div>
          <div className={`${styles.textClusterRight} top-[10vh] -right-[14vw] max-md:-right-[20vw]`}>
            <span className={styles.accent}>Pasiune</span>
            <h3 className={`${styles.heading} -mt-1`}>Design Floral</h3>
          </div>
          <div className={`${styles.textClusterRight} -bottom-[8vh] right-[0vw]`}>
            <span className={styles.label}>Colecția Nouă</span>
            <span className={styles.desc}>Forme inspirate din arhitectura pură a naturii.</span>
          </div>
        </div>

        {/* --- 2. POZA MICĂ --- */}
        <div className={`${styles.cardGroup} bottom-[20vh] left-[40vw] max-md:left-[85vw] w-[14vw] max-md:w-[45vw] h-[26vh]`}>
          <div className={styles.imageBox} data-speedx="1.1">
            <img src="/assets/2.jpg" className={styles.image} alt="Detaliu" />
          </div>
          {/* Textul a fost mutat la Poza 5 */}
        </div>

        {/* --- 3. POZA ÎNALTĂ --- */}
        <div className={`${styles.cardGroup} top-[15vh] left-[62vw] max-md:left-[145vw] w-[20vw] max-md:w-[55vw] h-[65vh]`}>
          <div className={styles.imageBox} data-speedx="0.9">
            <img src="/assets/ioanacuflori.jpg" className={styles.image} alt="Viziune" />
          </div>
          <div className={`${styles.textClusterLeft} bottom-[10vh] -left-[10vw] max-md:-left-[20vw]`}>
            <span className={styles.accent}>Viziune</span>
            <h3 className={`${styles.heading} -mt-1`}>Estetică</h3>
          </div>
          <div className={`${styles.textClusterRight} -top-[5vh] -right-[12vw] max-md:-right-[10vw]`}>
            <span className={styles.label}>Arhitectură</span>
            <span className={styles.desc}>Linii clare ce comunică respect pentru spațiu.</span>
          </div>
        </div>

        {/* --- 4. POZA PĂTRATĂ --- */}
        <div className={`${styles.cardGroup} bottom-[15vh] left-[90vw] max-md:left-[215vw] w-[18vw] max-md:w-[50vw] h-[35vh]`}>
          <div className={styles.imageBox} data-speedx="1.1">
            <img src="/assets/3.jpg" className={styles.image} alt="Decor" />
          </div>
          <div className={`${styles.textClusterRight} -top-[8vh] right-[0vw]`}>
            <span className={styles.label}>Forme Naturale</span>
          </div>
        </div>

        {/* --- 5. POZA WIDE --- */}
        <div className={`${styles.cardGroup} top-[30vh] left-[118vw] max-md:left-[280vw] w-[28vw] max-md:w-[75vw] h-[40vh]`}>
          <div className={styles.imageBox} data-speedx="1.0">
            <img src="/assets/4.jpg" className={styles.image} alt="Evenimente" />
          </div>
          
          {/* 📍 Aici am adus textul "Echilibru Nuanțe" (Deasupra și la stânga pozei 5) */}
          <div className={`${styles.textClusterLeft} -top-[16vh] -left-[14vw] max-md:-left-[20vw]`} data-speedx="1.5">
            <span className={styles.accent}>Echilibru</span>
            <h3 className={`${styles.heading} -mt-1`}>Nuanțe</h3>
          </div>

          <div className={`${styles.textClusterRight} -bottom-[15vh] right-[0vw]`}>
            <span className={styles.accent}>Momente</span>
            <h3 className={`${styles.heading} -mt-1`}>Evenimente</h3>
          </div>
        </div>

        {/* --- 6. POZA ACCENT MICĂ --- */}
        <div className={`${styles.cardGroup} top-[12vh] left-[155vw] max-md:left-[370vw] w-[12vw] max-md:w-[35vw] h-[22vh]`}>
          <div className={styles.imageBox} data-speedx="1.3">
            <img src="/assets/5.jpg" className={styles.image} alt="Estetica" />
          </div>
          <div className={`${styles.textClusterLeft} -bottom-[10vh] -left-[6vw] max-md:-left-[15vw]`}>
            <span className={styles.label}>Minimalism</span>
          </div>
        </div>

        {/* --- 7. POZA URIAȘĂ --- */}
        <div className={`${styles.cardGroup} bottom-[10vh] left-[175vw] max-md:left-[420vw] w-[26vw] max-md:w-[70vw] h-[60vh]`}>
          <div className={styles.imageBox} data-speedx="0.85">
            <img src="/assets/1.jpg" className={styles.image} alt="Emoție" />
          </div>
          <div className={`${styles.textClusterLeft} top-[10vh] -left-[12vw] max-md:-left-[25vw]`}>
            <span className={styles.accent}>Fericire</span>
            <h3 className={`${styles.heading} -mt-1`}>Emoție Pură</h3>
          </div>
          <div className={`${styles.textClusterRight} -top-[8vh] right-[4vw]`}>
            <span className={styles.label}>Cromatică Vibrantă</span>
            <span className={styles.desc}>Fiecare ton induce o stare de armonie profundă.</span>
          </div>
        </div>

        {/* --- 8. POZA MEDIE --- */}
        <div className={`${styles.cardGroup} top-[15vh] left-[215vw] max-md:left-[505vw] w-[16vw] max-md:w-[45vw] h-[30vh]`}>
          <div className={styles.imageBox} data-speedx="1.15">
            <img src="/assets/2.jpg" className={styles.image} alt="Armonie" />
          </div>
          <div className={`${styles.textClusterRight} -bottom-[12vh] -right-[6vw] max-md:-right-[20vw]`}>
            <span className={styles.accent}>Dorință</span>
          </div>
        </div>

        {/* --- 9. POZA CENTRU JOS --- */}
        <div className={`${styles.cardGroup} bottom-[15vh] left-[240vw] max-md:left-[565vw] w-[22vw] max-md:w-[60vw] h-[45vh]`}>
          <div className={styles.imageBox} data-speedx="0.9">
            <img src="/assets/ioanacuflori.jpg" className={styles.image} alt="Creație" />
          </div>
          <div className={`${styles.textClusterLeft} -top-[12vh] -left-[8vw] max-md:-left-[15vw]`}>
            <span className={styles.label}>Semnătura Noastră</span>
            <span className={styles.desc}>Livrăm fragmente de frumos asamblate manual.</span>
          </div>
        </div>

        {/* --- 10. POZA FINALĂ --- */}
        <div className={`${styles.cardGroup} top-[25vh] left-[275vw] max-md:left-[640vw] w-[25vw] max-md:w-[70vw] h-[55vh]`}>
          <div className={styles.imageBox} data-speedx="1.0">
            <img src="/assets/3.jpg" className={styles.image} alt="Esența" />
          </div>
          <div className={`${styles.textClusterLeft} top-[20vh] -left-[14vw] max-md:-left-[25vw]`}>
            <span className={styles.accent}>Natură</span>
            <h3 className={`${styles.heading} -mt-1`}>Esența</h3>
          </div>
          <div className={`${styles.textClusterRight} bottom-[10vh] -right-[8vw] max-md:-right-[20vw]`}>
            <span className={styles.label}>Descoperă</span>
          </div>
        </div>

      </div>
    </section>
  );
}