"use client";

import { useState } from 'react';
import { useHeroLogic } from './HeroLogic';
import Menu from '../Menu/Menu'; 

const styles = {
  section: "relative w-full h-[100dvh] bg-[#050505] overflow-hidden transform-gpu",
  marqueeLayer: "absolute inset-0 flex flex-col justify-center gap-6 md:gap-12 z-0 pointer-events-none opacity-0 overflow-hidden transform-gpu",
  marqueeLine: "flex whitespace-nowrap font-serif text-[2.5rem] md:text-[clamp(4rem,7vw,7rem)] font-black text-white uppercase tracking-[2px] transform-gpu",
  centerImage: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65vw] md:w-[35vw] h-[60dvh] md:h-[85dvh] rounded-[16px] z-10 object-cover shadow-[0_30px_60px_rgba(0,0,0,0.5)] grayscale-[10%] opacity-0 transform-gpu",
  grayOverlay: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65vw] md:w-[35vw] h-[60dvh] md:h-[85dvh] rounded-[16px] z-20 bg-black/40 opacity-0 pointer-events-none transform-gpu",
  creamLayer: "absolute inset-0 z-30 bg-[#F9F8F6] will-change-[clip-path,opacity] [clip-path:inset(0%_0%_0%_0%_round_0px)] transform-gpu",
  signatureLayer: "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-40 flex flex-col items-center justify-center text-center pointer-events-none opacity-0 scale-95 will-change-[opacity,transform] transform-gpu",
  mapWidget: "absolute bottom-8 left-4 md:bottom-10 md:left-10 z-50 flex flex-col gap-3 md:gap-4 scale-[0.80] md:scale-100 origin-bottom-left will-change-[opacity,transform] transform-gpu", 
  
  header: "fixed top-0 left-0 w-full p-4 md:p-10 flex justify-between items-start md:items-center z-[9000] pointer-events-none transform-gpu",
  btnStore: "bg-[#111] text-white px-3 py-2.5 md:px-12 md:py-5 rounded-sm uppercase font-black tracking-[1px] md:tracking-[4px] text-[9px] md:text-base hover:bg-[#f48fb1] hover:text-[#111] transition-all cursor-pointer shadow-lg",
  btnMenu: "bg-white/80 backdrop-blur-md border border-black/10 text-[#111] p-2 md:px-5 md:py-5 rounded-sm hover:bg-[#f48fb1] hover:border-transparent hover:text-white transition-all cursor-pointer flex items-center justify-center shadow-lg",
};

export default function Hero() {
  const { refs, state, data } = useHeroLogic();
  const [touchStart, setTouchStart] = useState(0);

  const bouquets = [
    { id: 1, name: "Buchet Pasiune", price: "250 LEI", img: "/assets/1.jpg" },
    { id: 2, name: "Aranjament Emoție", price: "350 LEI", img: "/assets/2.jpg" },
    { id: 3, name: "Cutie Florală", price: "280 LEI", img: "/assets/3.jpg" },
    { id: 4, name: "Buchet Puritate", price: "190 LEI", img: "/assets/4.jpg" },
    { id: 5, name: "Coș de Toamnă", price: "220 LEI", img: "/assets/1.jpg" },
    { id: 6, name: "Trandafiri Rari", price: "450 LEI", img: "/assets/2.jpg" },
    { id: 7, name: "Buchet Exotic", price: "310 LEI", img: "/assets/3.jpg" },
    { id: 8, name: "Aranjament Lux", price: "550 LEI", img: "/assets/4.jpg" },
    { id: 9, name: "Inimă de Flori", price: "400 LEI", img: "/assets/1.jpg" },
    { id: 10, name: "Buchet Simplu", price: "150 LEI", img: "/assets/2.jpg" },
  ];

  const handlePrev = () => state.setActiveCard(p => Math.max(0, p - 1));
  const handleNext = () => state.setActiveCard(p => Math.min(bouquets.length - 1, p + 1));

  const handleTouchStart = (e: React.TouchEvent) => setTouchStart(e.targetTouches[0].clientX);
  const handleTouchEnd = (e: React.TouchEvent) => {
    const touchEnd = e.changedTouches[0].clientX;
    if (touchStart - touchEnd > 50) handleNext(); 
    if (touchStart - touchEnd < -50) handlePrev(); 
  };

  return (
    <>
      <style>{`
        @font-face { font-family: 'Caliway'; src: url('/fonts/Caliway.ttf') format('truetype'); }
        @keyframes drawSnake { 0% { stroke-dashoffset: 1500; } 50% { stroke-dashoffset: 0; } 100% { stroke-dashoffset: -1500; } }
        .snake-line { stroke-dasharray: 1500 1500; animation: drawSnake 12s cubic-bezier(0.4, 0, 0.2, 1) infinite; }
        @keyframes marqueeLeftRight { 0% { transform: translateX(-50%); } 100% { transform: translateX(0%); } }
        @keyframes marqueeRightLeft { 0% { transform: translateX(0%); } 100% { transform: translateX(-50%); } }
      `}</style>

      <header className={styles.header}>
        <div id="headerLogo" className="text-[#111] pointer-events-auto origin-top-left will-change-transform cursor-pointer hover:opacity-60 transition-opacity" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
          <div className="flex flex-col items-center font-serif text-[clamp(1.1rem,4vw,2.5rem)] font-bold tracking-tighter leading-none">
            <span className="tracking-[0.18em] pl-[0.18em]">COLȚUL</span>
            <span className="tracking-normal">CU FLORI</span>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row items-end md:items-center gap-3 md:gap-6 pointer-events-auto">
          <div id="headerContact" className="flex flex-row items-center gap-1.5 md:gap-3 text-[#111] origin-right transition-colors pr-1 md:pr-0">
            <a href="tel:0760464474" className="flex items-center gap-1 font-bold text-[9px] md:text-sm hover:text-[#f48fb1] transition-colors">
              <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
              <span className="whitespace-nowrap">0760 464 474</span>
            </a>
            <div className="w-[1px] h-3 bg-current opacity-30"></div>
            <a href="https://wa.me/40760464474" target="_blank" rel="noopener noreferrer" className="hover:text-[#f48fb1] transition-colors">
              <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.015c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
            </a>
            <a href="https://www.instagram.com/coltulcufloribyioana?igsi=YXR0Z2ttZWFiMGZi" target="_blank" rel="noopener noreferrer" className="hover:text-[#f48fb1] transition-colors">
              <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="https://www.facebook.com/ColtulcuFloribyIoana/?_rdr" target="_blank" rel="noopener noreferrer" className="hover:text-[#f48fb1] transition-colors">
              <svg className="w-3.5 h-3.5 md:w-4 md:h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
          </div>
          <div id="headerBtns" className="flex gap-1.5 md:gap-4 items-center">
            <div className={styles.btnStore}>Magazin</div>
            <div className={styles.btnMenu} onClick={() => state.setIsMenuOpen(true)}>
              <svg className="w-5 h-5 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" /></svg>
            </div>
          </div>
        </div>
      </header>

      <Menu isOpen={state.isMenuOpen} onClose={() => state.setIsMenuOpen(false)} />

      <section ref={refs.containerRef} className={styles.section}>
        
        {/* CAROUSEL COVERFLOW 3D - Acum cu butoanele de navigare vizibile și mai aproape */}
        <div className="hero-ui-hide absolute top-[15%] md:top-[18%] w-full z-[60] flex justify-center items-center pointer-events-auto h-[400px] md:h-[500px] overflow-hidden"
             onTouchStart={handleTouchStart} 
             onTouchEnd={handleTouchEnd}>
          
          {/* Săgeată Stânga (Mutată mai aproape cu calc și colorată corect în negru pentru vizibilitate) */}
          <button onClick={handlePrev} className={`absolute left-[calc(50%-43vw)] md:left-[calc(50%-220px)] w-10 h-10 md:w-14 md:h-14 bg-white/95 backdrop-blur-md rounded-full shadow-[0_5px_15px_rgba(0,0,0,0.15)] flex items-center justify-center text-[#111] hover:bg-[#f48fb1] hover:text-white transition-all z-[70] border border-black/10 ${state.activeCard === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <svg className="w-5 h-5 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7" /></svg>
          </button>
          
          {/* Săgeată Dreapta */}
          <button onClick={handleNext} className={`absolute right-[calc(50%-43vw)] md:right-[calc(50%-220px)] w-10 h-10 md:w-14 md:h-14 bg-white/95 backdrop-blur-md rounded-full shadow-[0_5px_15px_rgba(0,0,0,0.15)] flex items-center justify-center text-[#111] hover:bg-[#f48fb1] hover:text-white transition-all z-[70] border border-black/10 ${state.activeCard === bouquets.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
            <svg className="w-5 h-5 md:w-7 md:h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5l7 7-7 7" /></svg>
          </button>

          <div className="relative w-full h-full flex justify-center items-center">
            {bouquets.map((b, i) => {
              const offset = i - state.activeCard;
              const isCenter = offset === 0;
              const isLeft = offset === -1;
              const isRight = offset === 1;
              
              let transform = '';
              let zIndex = 0;
              let opacity = 'opacity-0 pointer-events-none';

              if (isCenter) {
                transform = 'translateX(0) scale(1)';
                zIndex = 30;
                opacity = 'opacity-100 pointer-events-auto';
              } else if (isLeft) {
                transform = 'translateX(-75%) scale(0.85)';
                zIndex = 20;
                opacity = 'opacity-50 pointer-events-auto';
              } else if (isRight) {
                transform = 'translateX(75%) scale(0.85)';
                zIndex = 20;
                opacity = 'opacity-50 pointer-events-auto';
              } else {
                transform = offset < 0 ? 'translateX(-150%) scale(0.6)' : 'translateX(150%) scale(0.6)';
                zIndex = 10;
              }

              return (
                <div key={b.id} 
                     onClick={() => state.setActiveCard(i)}
                     className={`absolute w-[70vw] md:w-[320px] bg-white/95 backdrop-blur-xl rounded-[24px] p-3 md:p-4 shadow-[0_15px_40px_rgba(244,143,177,0.25)] border border-white/50 transition-all duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] cursor-pointer ${opacity}`}
                     style={{ transform, zIndex }}>
                  <div className="w-full aspect-[4/5] rounded-[16px] overflow-hidden mb-4 relative">
                    <img src={b.img} alt={b.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700" />
                  </div>
                  <div className="text-center pb-2">
                    <p className="font-serif text-[#111] font-bold text-lg md:text-2xl leading-tight">{b.name}</p>
                    <p className="font-sans text-[#f48fb1] font-black tracking-widest text-xs md:text-sm mt-1">{b.price}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* --- Sfârșit Coverflow --- */}

        {state.isMapOpen && (
          <div className="fixed inset-0 z-[100] bg-[#F9F8F6]/90 backdrop-blur-md flex items-center justify-center p-4 cursor-pointer animate-in fade-in duration-300" onClick={() => state.setIsMapOpen(false)}>
            <div className="w-[95vw] md:w-[90vw] max-w-[1000px] h-[60dvh] md:h-[70dvh] rounded-xl overflow-hidden shadow-2xl border border-black/10 relative bg-white" onClick={e => e.stopPropagation()}>
              <button className="absolute top-4 right-4 z-10 bg-white text-black p-2 rounded-full hover:bg-[#f48fb1] hover:text-white transition-colors shadow-md" onClick={() => state.setIsMapOpen(false)}>
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
              <iframe src={data.mapUrls[state.activeMap]} className="w-full h-full border-none pointer-events-auto" />
            </div>
          </div>
        )}

        {state.isOrderModalOpen && (
          <div className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-300 md:hidden" onClick={() => state.setIsOrderModalOpen(false)}>
            <div className="bg-white rounded-2xl p-6 w-full max-w-[350px] shadow-2xl relative" onClick={e => e.stopPropagation()}>
              <button className="absolute top-4 right-4 text-gray-400 hover:text-black" onClick={() => state.setIsOrderModalOpen(false)}><svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg></button>
              <h3 className="font-serif text-2xl font-bold text-[#111]">Comandă Custom</h3>
              <p className="text-sm text-gray-500 mt-1 mb-4">Alege bugetul. Ioana creează magia.</p>
              <input type="text" placeholder="Adresa completă de livrare..." className="w-full border-b border-gray-300 bg-transparent text-sm py-3 outline-none focus:border-[#f48fb1] transition-colors mb-4"/>
              <div className="flex gap-2 mb-4">
                {[200, 300, 500].map(price => (
                  <button key={price} onClick={() => state.setSelectedPrice(price)} className={`flex-1 py-2 text-xs font-bold border rounded transition-colors ${state.selectedPrice === price ? 'bg-[#f48fb1] border-[#f48fb1] text-white' : 'border-gray-200 text-gray-500 hover:border-[#f48fb1]'}`}>{price} LEI{price===500 && '+'}</button>
                ))}
              </div>
              <button className="w-full bg-[#111] text-white font-bold text-xs tracking-[2px] py-4 rounded hover:bg-[#f48fb1] transition-colors flex items-center justify-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg> PLĂTEȘTE CU CARDUL
              </button>
            </div>
          </div>
        )}

        <div ref={refs.marqueeContainerRef} className={styles.marqueeLayer}>
          <div ref={refs.marquee1Ref} className="will-change-transform">
             <div className="flex w-[200%] animate-[marqueeLeftRight_40s_linear_infinite] gap-6 md:gap-12">
               <span className={styles.marqueeLine}>PASIUNE PENTRU FLORI • ARTA DE A DĂRUI • EMOȚIE ÎN FIECARE BUCHET • PASIUNE PENTRU FLORI • ARTA DE A DĂRUI</span>
             </div>
          </div>
          <div ref={refs.marquee2Ref} className="will-change-transform">
             <div className="flex w-[200%] animate-[marqueeRightLeft_40s_linear_infinite] gap-6 md:gap-12">
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
          <span className="text-[#f48fb1] text-[clamp(3.8rem,14vw,8.5rem)] leading-[0.7] md:leading-[0.5] block text-center drop-shadow-md whitespace-nowrap mt-6 md:-mt-2" style={{ fontFamily: "'Caliway', cursive" }}>
            cu flori
          </span>
        </div>

        <div className={`hero-ui-hide ${styles.mapWidget}`}>
          <div onClick={() => state.setIsMapOpen(true)} className="border-2 border-transparent bg-white/80 backdrop-blur-md p-3 md:p-4 rounded-sm hover:border-[#f48fb1] transition-colors duration-300 cursor-pointer group shadow-lg">
            <div className="flex justify-between items-center">
              <span className="text-[#111]/50 text-[0.6rem] tracking-[4px] uppercase font-sans font-bold">Harta Locației</span>
              <svg className="w-4 h-4 text-black/30 group-hover:text-[#f48fb1]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path></svg>
            </div>
            <div className="w-[140px] md:w-[160px] h-[80px] md:h-[100px] mt-2 bg-[#f0f0f0] rounded-sm overflow-hidden relative pointer-events-none">
              <iframe src={data.mapUrls[state.activeMap]} className="absolute w-[400px] h-[250px] origin-top-left scale-[0.35] md:scale-40 border-none" />
            </div>
          </div>
          <div className="border border-black/10 bg-white/90 backdrop-blur-md p-4 md:p-5 rounded-sm flex flex-col gap-3 md:gap-4 pointer-events-auto shadow-lg">
            <div className="flex items-center gap-3 md:gap-4 cursor-pointer group" onClick={() => state.setActiveMap(1)}>
              <div className={`w-4 h-4 border flex justify-center items-center rounded-sm transition-colors relative ${state.activeMap === 1 ? 'border-[#f48fb1]' : 'border-black/30'}`}>
                {state.activeMap === 1 && <div className="absolute inset-0 bg-[#f48fb1] rounded-sm blur-[4px] animate-pulse"></div>}
                <div className={`w-2 h-2 bg-[#f48fb1] relative z-10 transition-transform duration-200 ${state.activeMap === 1 ? 'scale-100' : 'scale-0'}`}></div>
              </div>
              <span className="font-sans text-[10px] md:text-xs text-[#555] uppercase tracking-widest font-bold group-hover:text-[#111] transition-colors">Bd. Râmnicu Sărat</span>
            </div>
            <div className="flex items-center gap-3 md:gap-4 cursor-pointer group" onClick={() => state.setActiveMap(2)}>
              <div className={`w-4 h-4 border flex justify-center items-center rounded-sm transition-colors relative ${state.activeMap === 2 ? 'border-[#f48fb1]' : 'border-black/30'}`}>
                {state.activeMap === 2 && <div className="absolute inset-0 bg-[#f48fb1] rounded-sm blur-[4px] animate-pulse"></div>}
                <div className={`w-2 h-2 bg-[#f48fb1] relative z-10 transition-transform duration-200 ${state.activeMap === 2 ? 'scale-100' : 'scale-0'}`}></div>
              </div>
              <span className="font-sans text-[10px] md:text-xs text-[#555] uppercase tracking-widest font-bold group-hover:text-[#111] transition-colors">Victor Brauner</span>
            </div>
          </div>
        </div>

        <div className="hero-ui-hide absolute bottom-8 right-4 md:bottom-1/2 md:translate-y-1/2 md:right-10 z-50 origin-bottom-right md:origin-right transform-gpu">
          <div className="hidden md:flex flex-col bg-white/90 backdrop-blur-xl border border-white/50 p-6 rounded-2xl shadow-[0_15px_40px_rgba(244,143,177,0.25)] w-[320px]">
            <h3 className="font-serif text-2xl font-bold text-[#111] leading-none">Comandă Instant</h3>
            <p className="text-xs text-gray-500 mt-2 mb-5">Lasă-te surprins! Alege doar bugetul, iar Ioana va crea o poveste florală custom.</p>
            <input type="text" placeholder="Adresa completă de livrare..." className="w-full border-b border-gray-300 bg-transparent text-sm py-2 outline-none focus:border-[#f48fb1] transition-colors mb-4"/>
            <div className="flex gap-2 mb-5">
              {[200, 300, 500].map(price => (
                <button key={price} onClick={() => state.setSelectedPrice(price)} className={`flex-1 py-2 text-xs font-bold border rounded transition-colors ${state.selectedPrice === price ? 'bg-[#f48fb1] border-[#f48fb1] text-white' : 'border-gray-200 text-gray-500 hover:border-[#f48fb1]'}`}>
                  {price} <span className="font-light text-[10px]">LEI</span>{price===500 && '+'}
                </button>
              ))}
            </div>
            <button className="w-full bg-[#111] text-white font-bold text-xs tracking-[3px] py-4 rounded-sm hover:bg-[#f48fb1] transition-colors flex justify-center items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg> PLĂTEȘTE
            </button>
            <p className="text-center text-[9px] text-gray-400 mt-3 font-sans tracking-widest uppercase">Tranzacții 100% Sigure</p>
          </div>

          <button onClick={() => state.setIsOrderModalOpen(true)} className="md:hidden bg-[#f48fb1] text-white font-black text-[11px] tracking-widest px-4 py-3.5 rounded-full shadow-lg animate-pulse flex items-center gap-1.5 border border-white/30">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z"/></svg> COMANDĂ INSTANT
          </button>
        </div>

      </section>
    </>
  );
}