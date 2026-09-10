"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

interface MenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Menu({ isOpen, onClose }: MenuProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const linksRef = useRef<HTMLUListElement>(null);
  const bentoRef = useRef<HTMLDivElement>(null);
  const socialRef = useRef<HTMLDivElement>(null);
  const watermarkRef = useRef<HTMLDivElement>(null);

  // Păstrăm referința timeline-ului pentru a-l putea reda înainte și înapoi
  const tl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    // 1. Definim animația o singură dată la montare
    tl.current = gsap.timeline({ 
      paused: true,
      onReverseComplete: () => {
        // SECRETUL: Când meniul termină de urcat, îl facem INVIZIBIL complet ca să nu existe text "fantomă"
        if (containerRef.current) containerRef.current.style.display = "none";
      }
    });

    tl.current
      .set(containerRef.current, { yPercent: -100 }) // Îl mutăm sus din start
      .to(containerRef.current, { yPercent: 0, duration: 0.8, ease: "power4.inOut" })
      .fromTo(watermarkRef.current, { opacity: 0, scale: 0.8 }, { opacity: 0.02, scale: 1, duration: 1 }, "-=0.4")
      .fromTo(bentoRef.current?.children || [], 
        { scale: 0.8, opacity: 0, filter: "blur(10px)" }, 
        { scale: 1, opacity: 1, filter: "blur(0px)", duration: 0.7, stagger: 0.05, ease: "back.out(1.2)" }, "-=0.6"
      )
      .fromTo(linksRef.current?.children || [], 
        { y: 50, opacity: 0 }, 
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" }, "-=0.7"
      )
      .fromTo(socialRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.5");

    return () => {
      tl.current?.kill();
    };
  }, []);

  useEffect(() => {
    const preventScroll = (e: Event) => e.preventDefault();

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("wheel", preventScroll, { passive: false });
      window.addEventListener("touchmove", preventScroll, { passive: false });
      
      // 2. Afișăm elementul în DOM și rulăm animația
      if (containerRef.current) containerRef.current.style.display = "flex";
      tl.current?.play();
    } else {
      document.body.style.overflow = "";
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
      
      // 3. Derulăm animația înapoi la închidere
      tl.current?.reverse();
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("wheel", preventScroll);
      window.removeEventListener("touchmove", preventScroll);
    };
  }, [isOpen]);

  const mainLinks = ["Home", "Shop", "Cart"];
  
  const bentoItems = [
    { title: "Aranjamente Florale", img: "/assets/1.jpg", span: "col-span-2 row-span-2 text-base md:text-lg" },
    { title: "Buchete", img: "/assets/2.jpg", span: "col-span-1 row-span-1 text-[0.65rem] md:text-xs" },
    { title: "Decor", img: "/assets/3.jpg", span: "col-span-1 row-span-1 text-[0.65rem] md:text-xs" },
    { title: "Funerare", img: "/assets/4.jpg", span: "col-span-1 row-span-1 text-[0.65rem] md:text-xs" },
    { title: "Comenzi Buchete", img: "/assets/ioanacuflori.jpg", span: "col-span-2 row-span-1 text-sm md:text-sm" },
  ];

  return (
    <div 
      ref={containerRef}
      // Pleacă din prima cu display: none pentru a proteja secțiunea Hero de fragmente rătăcite!
      className="fixed top-0 left-0 w-full h-[100dvh] bg-[#050505]/95 backdrop-blur-2xl z-[10000] flex-col items-center justify-center pointer-events-auto"
      style={{ display: "none" }} 
    >
      <div ref={watermarkRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 flex flex-col items-center opacity-[0.02]">
         <h2 className="font-serif text-[20vw] font-bold text-white leading-none tracking-tighter">Colțul</h2>
      </div>

      <button 
        onClick={onClose} 
        className="absolute top-6 right-6 md:top-10 md:right-10 w-12 h-12 flex items-center justify-center text-white/70 hover:text-[#f48fb1] hover:rotate-90 transition-all duration-500 z-[10001] bg-black/20 rounded-full border border-white/10"
      >
        <svg className="w-6 h-6 md:w-8 md:h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"></path></svg>
      </button>

      <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-10 md:gap-24 w-full max-w-[1400px] z-10 px-6 mt-10 md:mt-0">
        
        <div ref={bentoRef} className="grid grid-cols-3 grid-rows-3 gap-2 md:gap-3 w-full max-w-[340px] md:max-w-[480px] aspect-square">
          {bentoItems.map((item, idx) => (
            <div key={idx} className={`relative w-full h-full rounded-2xl overflow-hidden group cursor-pointer border border-white/10 bg-[#111] ${item.span}`}>
              <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 opacity-80 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent group-hover:from-black/70 transition-colors duration-500" />
              <span className={`absolute bottom-3 left-4 text-white font-sans tracking-widest uppercase font-semibold drop-shadow-lg group-hover:text-[#f48fb1] transition-colors leading-tight ${item.span.includes('text-') ? item.span.split(' ').filter(c => c.startsWith('text-')).join(' ') : ''}`}>
                {item.title}
              </span>
            </div>
          ))}
        </div>

        <ul ref={linksRef} className="flex flex-col items-center md:items-start justify-center gap-2 md:gap-4">
          {mainLinks.map((link, idx) => (
            <li key={idx} className="overflow-hidden cursor-pointer group py-1">
              <span className="font-serif text-[clamp(3.5rem,8vw,7rem)] text-white uppercase tracking-tighter group-hover:text-[#f48fb1] group-hover:italic transition-all duration-300 inline-block drop-shadow-md leading-none">
                {link}
              </span>
            </li>
          ))}
        </ul>

      </div>

      <div ref={socialRef} className="absolute bottom-8 flex gap-8 items-center z-10">
        <a href="https://www.instagram.com/coltulcufloribyioana?igsi=YXR0Z2ttZWFiMGZi" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-[#f48fb1] hover:scale-110 transition-all duration-300">
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
        </a>
        <a href="https://www.facebook.com/ColtulcuFloribyIoana/?_rdr" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-[#f48fb1] hover:scale-110 transition-all duration-300">
          <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
        </a>
      </div>
    </div>
  );
}