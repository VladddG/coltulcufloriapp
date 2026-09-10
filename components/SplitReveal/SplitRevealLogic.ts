import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function useSplitRevealLogic() {
  const containerRef = useRef<HTMLElement>(null);
  const leftHalfRef = useRef<HTMLDivElement>(null);
  const rightHalfRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      // FAZA 1
      gsap.fromTo(leftHalfRef.current, 
        { x: "-30vw" }, 
        { x: "0vw", ease: "none", scrollTrigger: { trigger: containerRef.current, start: "top bottom", end: "top top", scrub: true } }
      );

      gsap.fromTo(rightHalfRef.current, 
        { x: "30vw" }, 
        { x: "0vw", ease: "none", scrollTrigger: { trigger: containerRef.current, start: "top bottom", end: "top top", scrub: true } }
      );

      // FAZA 2
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=120%",
          scrub: 1,
          pin: true,
        }
      });
      
      tl.fromTo(textRef.current, 
        { opacity: 0, scale: 0.8 }, 
        { opacity: 1, scale: 1, duration: 1, ease: "back.out(1.5)" }, 
        0 
      );
    }, containerRef); // Izolăm contextul

    return () => ctx.revert(); // Curățare perfectă!
  }, []);

  return { refs: { containerRef, leftHalfRef, rightHalfRef, textRef } };
}