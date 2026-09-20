import { useEffect } from 'react';
import Lenis from 'lenis';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let lenisInstance: Lenis | null = null;

export const useLenis = () => {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    const lenis = new Lenis({
      lerp: isMobile ? 0.25 : 0.015,
      duration: isMobile ? 0.8 : 3.5,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: isMobile ? 0.8 : 1.5,
      syncTouch: !isMobile,
      touchMultiplier: isMobile ? 1.2 : 1.5,
    });

    lenisInstance = lenis;
    lenis.on('scroll', ScrollTrigger.update);

    let rafId = 0;
    const updateLenis = (time: number) => {
      lenis.raf(time);
      rafId = window.requestAnimationFrame(updateLenis);
    };

    rafId = window.requestAnimationFrame(updateLenis);

    return () => {
      window.cancelAnimationFrame(rafId);
      lenis.destroy();
      lenisInstance = null;
    };
  }, []);
};

export const getLenisInstance = () => lenisInstance;
