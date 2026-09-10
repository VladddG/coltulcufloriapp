"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"; 

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    ScrollTrigger.clearScrollMemory("manual");
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";

    const hidePreloader = () => {
      setIsFading(true); 
      setTimeout(() => {
        setIsVisible(false); 
        document.body.style.overflow = ""; 
        ScrollTrigger.refresh(true);
      }, 800);
    };

    // Ascultăm exclusiv după evenimentul real de încărcare completă a paginii și a resurselor (poze)
    if (document.readyState === "complete") {
      hidePreloader();
    } else {
      window.addEventListener("load", hidePreloader);
    }

    return () => { 
      window.removeEventListener("load", hidePreloader);
      document.body.style.overflow = "";
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-[#F9F8F6] flex flex-col items-center justify-center transition-transform duration-[800ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${isFading ? "-translate-y-full" : "translate-y-0"}`}
    >
      <div className={`relative flex items-center justify-center mb-6 transition-opacity duration-500 ${isFading ? "opacity-0" : "opacity-100"}`}>
        <div className="absolute inset-0 bg-[#f48fb1] rounded-full blur-[25px] opacity-20 animate-pulse scale-150 pointer-events-none"></div>
        <svg viewBox="0 0 100 100" className="relative w-16 h-16 text-[#f48fb1] animate-spin">
          <g transform="translate(50 50)">
            <ellipse cx="0" cy="-22" rx="8" ry="20" fill="currentColor" opacity="0.9" />
            <ellipse cx="0" cy="22" rx="8" ry="20" fill="currentColor" opacity="0.9" />
            <ellipse cx="-22" cy="0" rx="20" ry="8" fill="currentColor" opacity="0.9" />
            <ellipse cx="22" cy="0" rx="20" ry="8" fill="currentColor" opacity="0.9" />
            <ellipse cx="0" cy="-22" rx="8" ry="20" fill="currentColor" opacity="0.6" transform="rotate(45)" />
            <ellipse cx="0" cy="22" rx="8" ry="20" fill="currentColor" opacity="0.6" transform="rotate(45)" />
            <ellipse cx="-22" cy="0" rx="20" ry="8" fill="currentColor" opacity="0.6" transform="rotate(45)" />
            <ellipse cx="22" cy="0" rx="20" ry="8" fill="currentColor" opacity="0.6" transform="rotate(45)" />
            <circle cx="0" cy="0" r="8" fill="#F9F8F6" />
            <circle cx="0" cy="0" r="3" fill="#111" opacity="0.8" />
          </g>
        </svg>
      </div>
      <div className={`flex flex-col items-center transition-opacity duration-500 ${isFading ? "opacity-0" : "opacity-100"}`}>
        <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] font-bold text-[#111] tracking-[0.3em] uppercase">Colțul</h2>
        <span className="text-[#f48fb1] text-[clamp(3.5rem,7vw,5rem)] -mt-6" style={{ fontFamily: "'Great Vibes', cursive" }}>cu flori</span>
      </div>
    </div>
  );
}