"use client";

import { useHeroLogic } from './HeroLogic';
import Menu from '../Menu/Menu'; 

const styles = {
  section: "relative w-full h-[100dvh] bg-[#050505] overflow-hidden transform-gpu",
  
  // AICI am micșorat distanța dintre rânduri (de la gap-[25dvh] la gap-6 pe mobil și gap-12 pe desktop)
  marqueeLayer: "absolute inset-0 flex flex-col justify-center gap-6 md:gap-12 z-0 pointer-events-none opacity-0 overflow-hidden transform-gpu",
  marqueeLine: "flex whitespace-nowrap font-serif text-[clamp(4rem,7vw,7rem)] font-black text-white uppercase tracking-[2px] transform-gpu",
  
  centerImage: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] md:w-[35vw] h-[80dvh] md:h-[85dvh] rounded-[16px] z-10 object-cover shadow-[0_30px_60px_rgba(0,0,0,0.5)] grayscale-[10%] opacity-0 transform-gpu",
  grayOverlay: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85vw] md:w-[35vw] h-[80dvh] md:h-[85dvh] rounded-[16px] z-20 bg-black/40 opacity-0 pointer-events-none transform-gpu",
  
  creamLayer: "absolute inset-0 z-30 bg-[#F9F8F6] will-change-[clip-path,opacity] [clip-path:inset(0%_0%_0%_0%_round_0px)] transform-gpu",
  
  signatureLayer: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 flex flex-col items-center justify-center text-center pointer-events-none opacity-0 scale-95 will-change-[opacity,transform] transform-gpu",
  
  mapWidget: "absolute bottom-6 left-4 md:bottom-10 md:left-10 z-50 flex flex-col gap-3 md:gap-4 scale-[0.80] md:scale-100 origin-bottom-left will-change-[opacity,transform] transform-gpu", 
  
  header: "fixed top-0 left-0 w-full p-4 md:p-12 flex justify-between items-start z-[9000] pointer-events-none transform-gpu",
  headerLogo: "font-serif text-[clamp(1.1rem,4vw,2.5rem)] text-[#111] font-bold tracking-tighter leading-none pointer-events-auto origin-top-left will-change-transform cursor-pointer hover:opacity-60 transition-opacity",
  headerControls: "flex gap-2 md:gap-4 pointer-events-auto origin-top-right will-change-transform",
  
  btnStore: "bg-[#111] text-white px-5 py-3 md:px-12 md:py-6 rounded-sm uppercase font-black tracking-[2px] md:tracking-[4px] text-[10px] md:text-base hover:bg-[#f48fb1] hover:text-[#111] transition-all cursor-pointer shadow-lg",
  btnMenu: "bg-white/80 backdrop-blur-md border border-black/10 text-[#111] p-2.5 md:px-6 md:py-6 rounded-sm hover:bg-[#f48fb1] hover:border-transparent hover:text-white transition-all cursor-pointer flex items-center justify-center shadow-lg",
};

export default function Hero() {
  const { refs, state, data } = useHeroLogic();

  return (
    <>
      <style>{`
        @font-face {
          font-family: 'Caliway';
          src: url('/fonts/Caliway.ttf') format('truetype');
        }
        @keyframes drawSnake {
          0% { stroke-dashoffset: 1500; }
          50% { stroke-dashoffset: 0; }
          100% { stroke-dashoffset: -1500; }
        }
        .snake-line {
          stroke-dasharray: 1500 1500;
          animation: drawSnake 12s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }
        @keyframes marqueeLeftRight {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0%); }
        }
        @keyframes marqueeRightLeft {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
      `}</style>

      <header className={styles.header}>
        <div id="headerLogo" className={styles.headerLogo} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="flex flex-col items-center">
            <span className="tracking-[0.18em] pl-[0.18em]">COLȚUL</span>
            <span className="tracking-normal">CU FLORI</span>
          </div>
        </div>
        <div id="headerBtns" className={styles.headerControls}>
          <div className={styles.btnStore}>Magazin</div>
          <div className={styles.btnMenu} onClick={() => state.setIsMenuOpen(true)}>
            <svg className="w-5 h-5 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" /></svg>
          </div>
        </div>
      </header>

      <Menu isOpen={state.isMenuOpen} onClose={() => state.setIsMenuOpen(false)} />

      <section ref={refs.containerRef} className={styles.section}>
        {state.isMapOpen && (
          <div className="fixed inset-0 z-[100] bg-[#F9F8F6]/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer animate-in fade-in duration-300" onClick={() => state.setIsMapOpen(false)}>
            <div className="w-[95vw] md:w-[90vw] max-w-[1000px] h-[60dvh] md:h-[70dvh] rounded-xl overflow-hidden shadow-2xl border border-black/10 relative bg-white">
              <button className="absolute top-4 right-4 z-10 bg-white text-black p-2 rounded-full hover:bg-[#f48fb1] hover:text-white transition-colors shadow-md">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
              <iframe src={data.mapUrls[state.activeMap]} className="w-full h-full border-none pointer-events-auto" />
            </div>
          </div>
        )}

        <div ref={refs.marqueeContainerRef} className={styles.marqueeLayer}>
          <div ref={refs.marquee1Ref} className="will-change-transform">
             <div className="flex w-[200%] animate-[marqueeLeftRight_40s_linear_infinite] gap-8">
               <span className={styles.marqueeLine}>PASIUNE PENTRU FLORI • ARTA DE A DĂRUI • EMOȚIE ÎN FIECARE BUCHET • PASIUNE PENTRU FLORI • ARTA DE A DĂRUI</span>
             </div>
          </div>
          <div ref={refs.marquee2Ref} className="will-change-transform">
             <div className="flex w-[200%] animate-[marqueeRightLeft_40s_linear_infinite] gap-8">
               <span className={styles.marqueeLine}>EMOȚIE ÎN FIECARE BUCHET • PASIUNE PENTRU FLORI • ARTA DE A DĂRUI • EMOȚIE ÎN FIECARE BUCHET • PASIUNE</span>
             </div>
          </div>
        </div>

        <img ref={refs.imageRef} src="/assets/ioanacuflori.jpg" alt="Ioana" className={styles.centerImage} />
        <div ref={refs.grayOverlayRef} className={styles.grayOverlay}></div>

        <div ref={refs.creamLayerRef} className={styles.creamLayer}>
          <svg className="absolute -top-[5%] -left-[5%] w-[60vw] h-[60vw] max-md:w-[100vw] max-md:h-[100vw] opacity-40 pointer-events-none" viewBox="0 0 1000 1000" fill="none" stroke="#222" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path pathLength="1000" className="snake-line" d="M -100,500 L 500,500 C 350,150 650,150 500,500 C 650,150 850,350 500,500 C 850,350 850,650 500,500 C 850,650 650,850 500,500 C 650,850 350,850 500,500 C 350,850 150,650 500,500 C 150,650 150,350 500,500 C 150,350 350,150 500,500 L 1100,500" />
          </svg>
          <svg className="absolute -bottom-[5%] -right-[5%] w-[70vw] h-[70vw] max-md:w-[120vw] max-md:h-[120vw] opacity-20 rotate-[45deg] pointer-events-none" viewBox="0 0 1000 1000" fill="none" stroke="#222" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path pathLength="1000" className="snake-line" style={{ animationDelay: '3s' }} d="M -100,500 L 500,500 C 350,150 650,150 500,500 C 650,150 850,350 500,500 C 850,350 850,650 500,500 C 850,650 650,850 500,500 C 650,850 350,850 500,500 C 350,850 150,650 500,500 C 150,650 150,350 500,500 C 150,350 350,150 500,500 L 1100,500" />
          </svg>
        </div>

        <div ref={refs.signatureRef} className={styles.signatureLayer}>
          <h2 className="font-serif text-[clamp(2.2rem,4vw,3.5rem)] font-bold text-white tracking-[0.5em] pl-[0.5em] drop-shadow-md text-center">
            COLȚUL
          </h2>
          <span className="text-[#f48fb1] text-[clamp(3.8rem,14vw,8.5rem)] leading-[0.7] md:leading-[0.5] block text-center drop-shadow-md whitespace-nowrap mt-1 md:-mt-2" style={{ fontFamily: "'Caliway', cursive" }}>
            cu flori
          </span>
        </div>

        <div ref={refs.uiRef} className={styles.mapWidget}>
          <div onClick={() => state.setIsMapOpen(true)} className="border-2 border-transparent bg-white/80 backdrop-blur-md p-4 rounded-sm hover:border-[#f48fb1] transition-colors duration-300 cursor-pointer group shadow-lg will-change-transform">
            <div className="flex justify-between items-center">
              <span className="text-[#111]/50 text-[0.6rem] tracking-[4px] uppercase font-sans font-bold">Harta Locației</span>
              <svg className="w-4 h-4 text-black/30 group-hover:text-[#f48fb1]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>
            </div>
            <div className="w-[160px] h-[100px] mt-2 bg-[#f0f0f0] rounded-sm overflow-hidden relative pointer-events-none">
              <iframe src={data.mapUrls[state.activeMap]} className="absolute w-[400px] h-[250px] origin-top-left scale-40 border-none" />
            </div>
          </div>
          <div className="border border-black/10 bg-white/90 backdrop-blur-md p-5 rounded-sm flex flex-col gap-4 pointer-events-auto shadow-lg">
            <div className="flex items-center gap-4 cursor-pointer group" onClick={() => state.setActiveMap(1)}>
              <div className={`w-4 h-4 border flex justify-center items-center rounded-sm transition-colors ${state.activeMap === 1 ? 'border-[#f48fb1]' : 'border-black/30'}`}><div className={`w-2 h-2 bg-[#f48fb1] transition-transform duration-200 ${state.activeMap === 1 ? 'scale-100' : 'scale-0'}`}></div></div>
              <span className="font-sans text-xs text-[#555] uppercase tracking-widest font-bold group-hover:text-[#111] transition-colors">Bd. Râmnicu Sărat</span>
            </div>
            <div className="flex items-center gap-4 cursor-pointer group" onClick={() => state.setActiveMap(2)}>
              <div className={`w-4 h-4 border flex justify-center items-center rounded-sm transition-colors ${state.activeMap === 2 ? 'border-[#f48fb1]' : 'border-black/30'}`}><div className={`w-2 h-2 bg-[#f48fb1] transition-transform duration-200 ${state.activeMap === 2 ? 'scale-100' : 'scale-0'}`}></div></div>
              <span className="font-sans text-xs text-[#555] uppercase tracking-widest font-bold group-hover:text-[#111] transition-colors">Victor Brauner</span>
            </div>
          </div>
        </div>

      </section>
    </>
  );
}