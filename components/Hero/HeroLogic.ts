import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export function useHeroLogic() {
  const containerRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const creamLayerRef = useRef<HTMLDivElement>(null);
  const uiRef = useRef<HTMLDivElement>(null);
  const signatureRef = useRef<HTMLDivElement>(null);
  const grayOverlayRef = useRef<HTMLDivElement>(null);
  const marqueeContainerRef = useRef<HTMLDivElement>(null);
  const marquee1Ref = useRef<HTMLDivElement>(null);
  const marquee2Ref = useRef<HTMLDivElement>(null);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeMap, setActiveMap] = useState<1 | 2>(1);
  const [isMapOpen, setIsMapOpen] = useState(false);

  const mapUrls = {
    1: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2849.2065842886745!2d26.1408103!3d44.4082855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1fe910df9e443%3A0xa5493daff59fc038!2sColtul%20Cu%20Flori!5e0!3m2!1sro!2sro!4v1700000000000!5m2!1sro!2sro",
    2: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2849.1065842886745!2d26.1508103!3d44.4182855!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1fe910df9e443%3A0xa5493daff59fc038!2sColtul%20Cu%20Flori%202!5e0!3m2!1sro!2sro!4v1700000000001!5m2!1sro!2sro"
  };

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const mm = gsap.matchMedia();

    mm.add("(min-width: 768px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%",
          scrub: 1,
          pin: true,
        }
      });

      // 1. Logo & Butoane se micșorează (încep la 0)
      tl.to("#headerLogo", { scale: 0.75, color: "#ffffff", duration: 0.5, ease: "none" }, 0);
      tl.to("#headerBtns", { scale: 0.85, duration: 0.5, ease: "none" }, 0);

      // 2. Harta face outline roz INSTANT (la 0), apoi dispare rapid
      if (uiRef.current) {
        tl.to(uiRef.current.children[0], { borderColor: "#f48fb1", duration: 0.1 }, 0);
        tl.to(uiRef.current, { opacity: 0, scale: 0.9, duration: 0.2 }, 0.1);
      }

      // 3. Marquees (Benzile rulante)
      tl.to(marqueeContainerRef.current, { opacity: 0.15, duration: 0.4 }, 0);
      tl.to(marquee1Ref.current, { x: "15vw", duration: 1, ease: "none" }, 0);
      tl.to(marquee2Ref.current, { x: "-15vw", duration: 1, ease: "none" }, 0);

      // 4. Chenarul Crem se strânge simultan cu toate celelalte (începe la 0)
      tl.to(creamLayerRef.current, {
        clipPath: "inset(7.5vh 32.5vw 7.5vh 32.5vw round 16px)", 
        duration: 0.6,
        ease: "power2.inOut"
      }, 0);

      // 5. Tranziția către Poza Ioanei
      tl.to(creamLayerRef.current, { opacity: 0, duration: 0.4 }, 0.6);
      tl.to(imageRef.current, { opacity: 1, duration: 0.4 }, 0.6);
      tl.to(grayOverlayRef.current, { opacity: 1, duration: 0.4 }, 0.6);

      // 6. Apare Semnătura
      tl.to(signatureRef.current, { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }, 0.8);
    });

    mm.add("(max-width: 767px)", () => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top top",
          end: "+=150%",
          scrub: 1,
          pin: true,
        }
      });

      tl.to("#headerLogo", { scale: 0.8, color: "#ffffff", duration: 0.5, ease: "none" }, 0);
      tl.to("#headerBtns", { scale: 0.9, duration: 0.5, ease: "none" }, 0);

      if (uiRef.current) {
        tl.to(uiRef.current.children[0], { borderColor: "#f48fb1", duration: 0.1 }, 0);
        tl.to(uiRef.current, { opacity: 0, scale: 0.9, duration: 0.2 }, 0.1);
      }

      tl.to(marqueeContainerRef.current, { opacity: 0.15, duration: 0.4 }, 0);
      tl.to(marquee1Ref.current, { x: "20vw", duration: 1, ease: "none" }, 0);
      tl.to(marquee2Ref.current, { x: "-20vw", duration: 1, ease: "none" }, 0);

      tl.to(creamLayerRef.current, {
        clipPath: "inset(10vh 7.5vw 10vh 7.5vw round 16px)",
        duration: 0.6,
        ease: "power2.inOut"
      }, 0);

      tl.to(creamLayerRef.current, { opacity: 0, duration: 0.4 }, 0.6);
      tl.to(imageRef.current, { opacity: 1, duration: 0.4 }, 0.6);
      tl.to(grayOverlayRef.current, { opacity: 1, duration: 0.4 }, 0.6);
      
      tl.to(signatureRef.current, { opacity: 1, scale: 1, duration: 0.4, ease: "power2.out" }, 0.8);
    });

    return () => mm.revert();
  }, []);

  return {
    refs: { containerRef, imageRef, creamLayerRef, uiRef, signatureRef, grayOverlayRef, marqueeContainerRef, marquee1Ref, marquee2Ref },
    state: { isMenuOpen, setIsMenuOpen, activeMap, setActiveMap, isMapOpen, setIsMapOpen },
    data: { mapUrls }
  };
}