"use client";

import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Inițializăm Lenis cu setările optime pentru un site premium
    const lenis = new Lenis({
      duration: 1.2, // Cât de lungă e "inerția"
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Curbă matematică pentru frânare lină
      smoothWheel: true,
    });

    // Bucla de animație care sincronizează scroll-ul cu refresh rate-ul monitorului (60/120Hz)
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    // Curățăm memoria când componenta este distrusă
    return () => lenis.destroy();
  }, []);

  return <>{children}</>;
}