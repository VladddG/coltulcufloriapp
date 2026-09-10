import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function useOffGridLogic() {
  const containerRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=215%", 
          scrub: 1,      
          pin: true,     
        }
      });
      
      tl.to(trackRef.current, { x: "-215vw", ease: "none" }, 0);
      
      gsap.utils.toArray('.parallax-img').forEach((item: any) => {
        const speed = item.dataset.speedx || 1;
        tl.to(item, { x: () => -2 * parseFloat(speed) + "vw", ease: "none" }, 0);
      });
      
      // PARALLAX EVIDENT: Textele glisează mult mai puternic (-10vw în loc de -4vw)
      gsap.utils.toArray('.parallax-txt').forEach((text: any) => {
        const speed = text.dataset.speedx || 1.2;
        tl.to(text, { x: () => -10 * parseFloat(speed) + "vw", ease: "none" }, 0);
      });
    });

    mm.add("(max-width: 767px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=640%", 
          scrub: 1,      
          pin: true,     
        }
      });
      tl.to(trackRef.current, { x: "-640vw", ease: "none" }, 0);
      
      gsap.utils.toArray('.parallax-img').forEach((item: any) => {
        const speed = item.dataset.speedx || 1;
        tl.to(item, { x: () => -4 * parseFloat(speed) + "vw", ease: "none" }, 0);
      });
      
      // PARALLAX EVIDENT MOBILE
      gsap.utils.toArray('.parallax-txt').forEach((text: any) => {
        const speed = text.dataset.speedx || 1.2;
        tl.to(text, { x: () => -14 * parseFloat(speed) + "vw", ease: "none" }, 0);
      });
    });

    return () => mm.revert(); 
  }, []);

  return { refs: { containerRef, trackRef } };
}