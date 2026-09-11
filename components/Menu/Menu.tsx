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

  const tl = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    tl.current = gsap.timeline({ 
      paused: true,
      onReverseComplete: () => {
        if (containerRef.current) containerRef.current.style.display = "none";
      }
    });

    tl.current
      .set(containerRef.current, { yPercent: -100 })
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
      .fromTo(socialRef.current, { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.5");

    return () => { tl.current?.kill(); };
  }, []);

  useEffect(() => {
    const preventScroll = (e: Event) => e.preventDefault();

    if (isOpen) {
      document.body.style.overflow = "hidden";
      if (containerRef.current) containerRef.current.style.display = "flex";
      tl.current?.timeScale(1).play();
    } else {
      document.body.style.overflow = "";
      tl.current?.timeScale(3).reverse();
    }

    return () => { document.body.style.overflow = ""; };
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
    <div ref={containerRef} className="fixed top-0 left-0 w-full h-[100dvh] bg-[#050505]/95 backdrop-blur-2xl z-[10000] flex flex-col items-center justify-center pointer-events-auto overflow-hidden" style={{ display: "none" }}>
      <div ref={watermarkRef} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 flex flex-col items-center opacity-[0.02]">
         <h2 className="font-serif text-[20vw] font-bold text-white leading-none tracking-tighter">Colțul</h2>
      </div>

      {/* AICI: CONTACTUL ÎN STÂNGA-SUS PENTRU A FI VIZIBIL DIN PRIMA */}
      <div ref={socialRef} className="absolute top-6 left-6 md:top-10 md:left-10 flex flex-col md:flex-row items-start md:items-center gap-3 md:gap-6 z-[10001]">
        <a href="tel:0760464474" className="flex items-center gap-2 text-white/70 hover:text-[#f48fb1] font-bold text-xs md:text-sm transition-colors">
          <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>
          0760 464 474
        </a>
        <div className="flex items-center gap-4">
          <a href="https://wa.me/40760464474" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-[#f48fb1] hover:scale-110 transition-all duration-300">
             <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.015c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
          </a>
          <a href="https://www.instagram.com/coltulcufloribyioana?igsi=YXR0Z2ttZWFiMGZi" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-[#f48fb1] hover:scale-110 transition-all duration-300">
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" /></svg>
          </a>
          <a href="https://www.facebook.com/ColtulcuFloribyIoana/?_rdr" target="_blank" rel="noopener noreferrer" className="text-white/50 hover:text-[#f48fb1] hover:scale-110 transition-all duration-300">
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.469h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.469h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" /></svg>
          </a>
        </div>
      </div>

      {/* Butonul de închidere rafinat */}
      <button onClick={onClose} className="absolute top-6 right-6 md:top-10 md:right-10 flex flex-col items-center justify-center text-white/70 hover:text-[#f48fb1] active:scale-95 group transition-all duration-300 z-[10001]">
        <div className="w-10 h-10 md:w-12 md:h-12 flex items-center justify-center bg-black/20 rounded-full border border-white/10 group-hover:rotate-90 group-active:rotate-90 transition-transform duration-300">
          <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12"></path></svg>
        </div>
        <span className="text-[8px] md:text-[10px] tracking-[0.2em] uppercase mt-1.5 opacity-70 group-hover:opacity-100 transition-opacity">Închide</span>
      </button>

      <div className="flex flex-col-reverse md:flex-row items-center justify-center gap-10 md:gap-24 w-full max-w-[1400px] z-10 px-6">
        <div ref={bentoRef} className="grid grid-cols-3 grid-rows-3 gap-2 md:gap-3 w-full max-w-[340px] md:max-w-[480px] aspect-square">
          {bentoItems.map((item, idx) => (
            <div key={idx} className={`relative w-full h-full rounded-2xl overflow-hidden group cursor-pointer border border-white/10 bg-[#111] ${item.span}`}>
              <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover grayscale-[30%] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-700 opacity-80 group-hover:opacity-100" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent group-hover:from-black/70 transition-colors duration-500" />
              <span className={`absolute bottom-3 left-4 text-white font-sans tracking-widest uppercase font-semibold drop-shadow-lg group-hover:text-[#f48fb1] transition-colors leading-tight ${item.span.includes('text-') ? item.span.split(' ').filter(c => c.startsWith('text-')).join(' ') : ''}`}>{item.title}</span>
            </div>
          ))}
        </div>

        <ul ref={linksRef} className="flex flex-col items-center md:items-start justify-center gap-2 md:gap-4 mb-6 md:mb-0">
          {mainLinks.map((link, idx) => (
            <li key={idx} className="overflow-hidden cursor-pointer group py-1">
              <span className="font-serif text-[clamp(3.5rem,8vw,7rem)] text-white uppercase tracking-tighter group-hover:text-[#f48fb1] group-hover:italic transition-all duration-300 inline-block drop-shadow-md leading-none">{link}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}