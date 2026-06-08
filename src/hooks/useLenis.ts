import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

let lenisInstance: Lenis | null = null;

export const useLenis = () => {
  useEffect(() => {
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    const lenis = new Lenis({
      lerp: isMobile ? 0.25 : 0.015, // Much higher lerp on mobile to prevent locking
      duration: isMobile ? 0.8 : 3.5, // Very short duration on mobile
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      smoothWheel: true,
      wheelMultiplier: isMobile ? 0.8 : 1.5, // Lower multiplier on mobile
      syncTouch: !isMobile, // Disable touch sync on mobile to prevent locking
      touchMultiplier: isMobile ? 1.2 : 1.5, // Moderate touch response on mobile
    });

    lenisInstance = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    const updateLenis = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateLenis);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(updateLenis);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);
};

export const getLenisInstance = () => lenisInstance;
