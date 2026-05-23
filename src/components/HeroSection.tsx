// Hero Section Component
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowDown, Download } from 'lucide-react';
import { portfolioOwner, heroContent } from '../data';
import { useDarkMode } from '../hooks';
import { Button } from './Button';
import { ParticlesBackground } from './ParticlesBackground';
import { fadeInUp } from '../animations/variants';
import BlurText from './BlurText';
import { SocialIcons } from './SocialIcons';

const particleColors = ['#ffffff'];

export const HeroSection = () => {
  const [displayedText, setDisplayedText] = useState('');
  const [cursorVisible, setCursorVisible] = useState(true);
  const { isDark } = useDarkMode();



  useEffect(() => {
    const text = heroContent.subHeading;
    let index = 0;
    const timer = setInterval(() => {
      if (index <= text.length) {
        setDisplayedText(text.substring(0, index));
        index++;
      } else {
        clearInterval(timer);
      }
    }, 50);

    const cursorTimer = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 500);

    return () => {
      clearInterval(timer);
      clearInterval(cursorTimer);
    };
  }, []);

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Particles Background - Moved outside section to prevent clipping */}
      <div className="fixed inset-0 z-0">
        <ParticlesBackground
          key={isDark ? 'particles-dark' : 'particles-light'}
          particleColors={particleColors}
          particleCount={500}
          particleSpread={20}
          speed={0.15}
          particleBaseSize={150}
          moveParticlesOnHover
          particleHoverFactor={1}
          alphaParticles={false}
          disableRotation={false}
          pixelRatio={typeof window !== 'undefined' ? Math.min(window.devicePixelRatio, 2) : 1}
          overlayClassName=""
        />
      </div>

      <section
        id="home"
        className="relative flex min-h-screen w-full items-center justify-center overflow-hidden pt-20"
      >


      <div className="relative z-10 mx-auto max-w-6xl w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-full">
          {/* Left Column */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {/* Name */}
           <BlurText
            text="Mohamad Jason Labis Celoza"
            delay={200}
            animateBy="words"
            direction="top"
            className="mb-6 font-display text-5xl font-extrabold tracking-tight md:text-7xl lg:text-8xl text-white"
            />

            {/* Typewriter */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.4 }}
              className="mb-6 min-h-20"
            >
              <h2 className="font-display bg-gradient-to-r from-blue-600 via-blue-500 to-blue-700 dark:from-blue-400 dark:via-blue-400 dark:to-blue-500 bg-clip-text text-2xl font-bold text-transparent md:text-4xl">
                {displayedText}
                <span className={`text-blue-700 dark:text-blue-400 ${cursorVisible ? 'opacity-100' : 'opacity-0'}`}>|</span>
              </h2>
            </motion.div>

            {/* Description */}
            <motion.p
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.6 }}
              className="mb-10 text-lg text-gray-300 leading-relaxed md:text-xl"
            >
              {heroContent.description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.8 }}
              className="mb-14 flex flex-col gap-4 sm:flex-row"
            >
              <Button size="lg" onClick={scrollToProjects} className="group">
                {heroContent.ctaPrimary}
                <ArrowDown
                  size={20}
                  className="transition-transform group-hover:translate-y-1"
                />
              </Button>
              <a
                href="/Mohamad_Jason_Resume.pdf"
                download="Mohamad_Jason_Resume.pdf"
                className="btn-premium-resume group"
              >
                <span className="download-icon-wrapper">
                  <Download size={20} className="text-blue-400 group-hover:text-indigo-300 transition-colors" />
                </span>
                {heroContent.ctaSecondary}
              </a>
            </motion.div>

            {/* Social Links */}
            <motion.div
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
              transition={{ delay: 1 }}
              className="mb-12"
            >
              <SocialIcons />
            </motion.div>
          </motion.div>

          {/* Right Column - Empty for now */}
          <div />
        </div>
      </div>
    </section>
    </>
  );
};
