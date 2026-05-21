// Navbar Component
import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useScroll } from '../hooks';
import { navItems } from '../data';
import GooeyNav from './GooeyNav/GooeyNav';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
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
    const handleScroll = () => {
      const sections = navItems.map((item) => item.id);
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setIsOpen(false);
    const id = href.replace('#', '');
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 1 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${hasScrolled
        ? 'bg-white/10 backdrop-blur-md dark:bg-slate-900/10'
        : 'bg-transparent'
        }`}
    >
      <div className="grid w-full grid-cols-2 lg:grid-cols-[1fr_auto_1fr] items-center py-3 pl-8 pr-8 lg:pl-12 lg:pr-12">

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1.2, ease: 'linear' }}
          className="justify-self-start translate-x-6"
        >
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick('#home');
            }}
            className="font-display text-2xl font-extrabold text-slate-900 dark:text-white"
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
            <div className="rounded-2xl bg-slate-900/90 px-1.5 py-1.5 shadow-xl shadow-slate-900/20 ring-1 ring-white/10 backdrop-blur-xl dark:bg-slate-950/90">
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
            className="rounded-xl p-2.5 hover:bg-slate-100 dark:hover:bg-slate-800 lg:hidden transition-colors"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </motion.div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="border-t border-slate-200/50 dark:border-slate-700/30 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl lg:hidden"
          >
            <motion.div className="space-y-1 px-4 py-4">
              {navItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  onClick={() => handleNavClick(item.href)}
                  className={`block w-full rounded-xl px-4 py-3 text-left font-medium transition-all duration-300 ${activeSection === item.id
                    ? 'bg-gradient-to-r from-blue-600/10 to-blue-700/10 text-blue-700 dark:text-blue-400 border border-blue-600/20'
                    : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                    }`}
                >
                  {item.label}
                </motion.button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};
