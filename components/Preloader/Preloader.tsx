"use client";

import { useEffect, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger"; 

export default function Preloader() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if ('scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }
    ScrollTrigger.clearScrollMemory("manual");
    window.scrollTo(0, 0);
    document.body.style.overflow = "hidden";

    let isLoaded = false;
    let fallbackTimer: NodeJS.Timeout;

    const finishLoading = () => {
      if (isLoaded) return;
      isLoaded = true;
      setProgress(100);
      
      setTimeout(() => {
        setIsFading(true); 
        setTimeout(() => {
          setIsVisible(false); 
          document.body.style.overflow = ""; 
          ScrollTrigger.refresh(true);
        }, 800);
      }, 400); 
    };

    const initRealProgress = () => {
      const mediaElements = Array.from(document.querySelectorAll('img, iframe, video'));
      const total = mediaElements.length;
      let loaded = 0;

      if (total === 0 || document.readyState === "complete") {
        finishLoading();
        return;
      }

      const updateProgress = () => {
        loaded++;
        setProgress(Math.min((loaded / total) * 100, 100));
        if (loaded >= total) finishLoading();
      };

      mediaElements.forEach((el: any) => {
        if ((el.tagName === 'IMG' && el.complete) || el.readyState === 4) {
          updateProgress();
        } else {
          el.addEventListener('load', updateProgress, { once: true });
          el.addEventListener('error', updateProgress, { once: true }); 
        }
      });
    };

    setTimeout(initRealProgress, 100);
    fallbackTimer = setTimeout(finishLoading, 6000);

    return () => { 
      clearTimeout(fallbackTimer);
      document.body.style.overflow = "";
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      className={`fixed inset-0 z-[9999] bg-[#F9F8F6] flex flex-col items-center justify-center transition-transform duration-[800ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${isFading ? "-translate-y-full" : "translate-y-0"}`}
    >
      <style>{`
        @font-face {
          font-family: 'Caliway';
          src: url('/fonts/Caliway.ttf') format('truetype');
        }
      `}</style>

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
        <h2 className="font-serif text-[clamp(1.8rem,4vw,3rem)] font-bold text-[#111] tracking-[0.3em] pl-[0.3em] uppercase text-center">
          Colțul
        </h2>
        {/* AICI: Am scos marginea negativă pe mobil (mt-2) ca să nu se încalece pe ecranele înalte S25 Ultra */}
        <span className="text-[#f48fb1] text-[clamp(3rem,12vw,5rem)] leading-[0.8] md:leading-[0.5] whitespace-nowrap mt-2 md:-mt-4 text-center" style={{ fontFamily: "'Caliway', cursive" }}>
          cu flori
        </span>

        <div className="mt-8 md:mt-10 w-48 md:w-64 h-[2px] bg-black/10 rounded-full overflow-hidden">
          <div 
            className="h-full bg-[#f48fb1] transition-all ease-out duration-300"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        <span className="mt-3 text-[10px] text-[#111]/40 font-sans tracking-[0.2em] font-bold">
          {Math.round(progress)}%
        </span>
      </div>
    </div>
  );
}