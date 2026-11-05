// Navbar Component
import { useState, useEffect, useMemo, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useScroll } from '../../hooks';
import { navItems } from '../../data';
import GooeyNav from '../ui/GooeyNav/GooeyNav';
import { getLenisInstance } from '../../hooks/useLenis';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const pendingNavigationRef = useRef<string | null>(null);
  const { scrollY } = useScroll();

  const hasScrolled = scrollY > 10;

  const gooeyItems = useMemo(
    () => navItems.map((item) => ({ label: item.label, href: item.href })),
    []
  );

  const activeGooeyIndex = useMemo(() => {
    const index = navItems.findIndex((item) => item.id === activeSection);
    return index >= 0 ? index : 0;
  }, [activeSection]);

  useEffect(() => {
    if (!isOpen) return;

    const body = document.body;
    const root = document.documentElement;
    const previousBodyOverflow = body.style.overflow;
    const previousRootOverflow = root.style.overflow;
    const lenis = getLenisInstance();

    lenis?.stop();
    body.style.overflow = 'hidden';
    root.style.overflow = 'hidden';

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };
    const preventBackgroundScroll = (event: Event) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest('#mobile-navigation')) return;
      event.preventDefault();
    };

    window.addEventListener('keydown', closeOnEscape);
    window.addEventListener('wheel', preventBackgroundScroll, { passive: false });
    window.addEventListener('touchmove', preventBackgroundScroll, { passive: false });

    return () => {
      window.removeEventListener('keydown', closeOnEscape);
      window.removeEventListener('wheel', preventBackgroundScroll);
      window.removeEventListener('touchmove', preventBackgroundScroll);
      body.style.overflow = previousBodyOverflow;
      root.style.overflow = previousRootOverflow;
      lenis?.start();
    };
  }, [isOpen]);

  useEffect(() => {
    if (isOpen || !pendingNavigationRef.current) return;

    const id = pendingNavigationRef.current;
    pendingNavigationRef.current = null;
    const element = document.getElementById(id);
    if (!element) return;

    const navHeight = document.querySelector('.site-navbar > .container-custom')?.getBoundingClientRect().height ?? 64;
    const lenis = getLenisInstance();

    if (lenis) {
      lenis.scrollTo(element, { offset: -navHeight - 16 });
    } else {
      element.scrollIntoView({
        behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
        block: 'start',
      });
    }
  }, [isOpen]);

  useEffect(() => {
    const closeOnDesktop = () => {
      if (window.matchMedia('(min-width: 1024px)').matches) setIsOpen(false);
    };

    window.addEventListener('resize', closeOnDesktop);
    return () => window.removeEventListener('resize', closeOnDesktop);
  }, []);

  useEffect(() => {
    let frameId = 0;

    const handleScroll = () => {
      cancelAnimationFrame(frameId);
      frameId = requestAnimationFrame(() => {
        const sections = navItems.map((item) => item.id);
        let activeId = sections[0] ?? 'home';
        let currentBest = Number.POSITIVE_INFINITY;

        for (const section of sections) {
          const element = document.getElementById(section);
          if (!element) continue;

          const rect = element.getBoundingClientRect();
          const distance = Math.abs(rect.top - 100);
          if (distance < currentBest) {
            currentBest = distance;
            activeId = section;
          }
        }

        setActiveSection((previous) => (previous === activeId ? previous : activeId));
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleNavClick = (href: string) => {
    const id = href.replace('#', '');
    setActiveSection(id);
    if (isOpen) {
      pendingNavigationRef.current = id;
      setIsOpen(false);
      return;
    }

    setIsOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const navHeight = document.querySelector('.site-navbar > .container-custom')?.getBoundingClientRect().height ?? 64;
      const lenis = getLenisInstance();

      if (lenis) {
        lenis.scrollTo(element, { offset: -navHeight - 16 });
      } else {
        element.scrollIntoView({
          behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
          block: 'start',
        });
      }
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 1 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 2, duration: 3.5, ease: [0.22, 1, 0.36, 1] }}
      className={`site-navbar fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${hasScrolled
        ? 'bg-slate-900/10 backdrop-blur-md'
        : 'bg-transparent'
        }`}
    >
      <div className="container-custom grid grid-cols-2 items-center py-3 lg:grid-cols-[1fr_auto_1fr]">

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1.2, ease: 'linear' }}
          className="justify-self-start"
        >
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
            className="font-display text-2xl font-extrabold text-white"
          >
            Jason
          </a>
        </motion.div>

        {/* Desktop — GooeyNav */}
        <div className="hidden justify-self-center lg:block">
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="rounded-2xl bg-slate-950/90 px-1.5 py-1.5 shadow-xl shadow-slate-900/20 ring-1 ring-white/10 backdrop-blur-xl">
              <GooeyNav
                items={gooeyItems}
                activeIndex={activeGooeyIndex}
                onNavigate={handleNavClick}
                particleCount={12}
                animationTime={500}
              />
            </div>
          </motion.div>
        </div>

        {/* Right Side Controls */}
        <motion.div className="flex items-center gap-2 justify-self-end sm:gap-3">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="min-h-11 min-w-11 rounded-xl p-2.5 transition-colors hover:bg-slate-800 lg:hidden pointer-events-auto touch-manipulation"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isOpen}
            aria-controls="mobile-navigation"
            style={{ zIndex: 100 }}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </motion.div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="mobile-navigation"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="pointer-events-auto max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain border-t border-white/10 bg-black lg:hidden"
            style={{ zIndex: 100, maxHeight: 'calc(100dvh - 5rem - env(safe-area-inset-top))' }}
          >
            <div className="container-custom space-y-1 py-4">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.href)}
                  className={`block w-full rounded-xl px-4 py-3 text-left font-medium transition-all duration-300 pointer-events-auto ${activeSection === item.id
                    ? 'bg-black/40 text-white border border-white/20'
                    : 'text-slate-300 hover:bg-slate-800'
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
