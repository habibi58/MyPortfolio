// Hero Section Component
// Mobile optimizations applied ONLY via injected <style> at ≤767px.
// Desktop JSX is byte-for-byte identical to the original.

import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { heroContent } from '../../data';
import { ParticlesBackground } from '../ui/Particles/ParticlesBackground';
import { fadeInUp } from '../../animations/variants';
import BlurText from '../ui/BlurText/BlurText';
import { SocialIcons } from '../ui/SocialIcons/SocialIcons';

const particleColors = ['#ffffff'];

const ROLES = ['Data and AI Engineer'];
const COLORS = ['#a78bfa'];

function useRoleAnimator() {
  const rARef = useRef<HTMLSpanElement>(null);
  const rBRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const rA = rARef.current;
    const rB = rBRef.current;
    if (!rA || !rB) return;
    rA.textContent = ROLES[0]; rA.style.color = COLORS[0];
    rA.style.position = 'absolute'; rA.style.inset = '0'; rA.style.display = 'flex';
    rA.style.alignItems = 'center'; rA.style.opacity = '1';
    rA.style.transform = 'none'; rA.style.filter = 'none';
    rB.style.opacity = '0';
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { rARef, rBRef };
}

/* ═══════════════════════════════════════════════════════════════════════
   MOBILE-ONLY STYLES
   Every rule is inside @media (max-width: 767px) — desktop untouched.
   ═══════════════════════════════════════════════════════════════════════ */
const HERO_MOBILE_STYLES = `
@media (max-width: 767px) {

  /* Left column — center everything */
  .hero-left {
    display: flex !important;
    flex-direction: column !important;
    align-items: center !important;
    text-align: center !important;
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  /* Name (BlurText wrapper) */
  .hero-name {
    text-align: center !important;
    font-size: 1.35rem !important;
    line-height: 1.2 !important;
    margin-bottom: 16px !important;
    display: flex !important;
    flex-wrap: wrap !important;
    justify-content: center !important;
    width: 100% !important;
    margin-top:20px;
  }

  /* "Aspiring + role" row — keep side by side, centered */
  .hero-role-row {
    justify-content: center !important;
    flex-wrap: nowrap !important;
    align-items: center !important;
    gap: 8px !important;
  }

  /* "Aspiring" BlurText */
  .hero-aspiring {
    font-size: 1.1rem !important;
    text-align: center !important;
    white-space: nowrap !important;
    flex-shrink: 0 !important;
  }

  /* Animated role stage — wide enough for longest role */
  .hero-role-stage {
    min-width: 0 !important;
    max-width: 220px !important;
    width: 220px !important;
    height: 28px !important;
    margin: 0 !important;
    flex-shrink: 1 !important;
    overflow: visible !important;
  }

  /* Role slot font size */
  .hero-role-slot {
    font-size: 16px !important;
    justify-content: flex-start !important;
    white-space: nowrap !important;
  }

  /* Description — hidden on mobile */
  .hero-description {
    display: none !important;
  }

  /* CTA button row — 2-column grid */
  .hero-cta {
    display: grid !important;
    grid-template-columns: 1fr 1fr !important;
    gap: 12px !important;
    width: 100% !important;
    height: 40px;
    margin-top: 12px !important;
    margin-bottom: 5px !important;
  }

  /* Each button fills its grid cell equally, smaller text */
  .hero-cta > * {
    width: 100% !important;
    justify-content: center !important;
    font-size: 11px !important;
    padding: 6px 8px !important;
  }

  /* Target inner label spans too */
  .hero-cta .vw-label,
  .hero-cta .btn-premium-resume {
    font-size: 11px !important;
  }

  /* Shrink icons inside buttons */
  .hero-cta .vw-icon,
  .hero-cta .vw-icon i,
  .hero-cta .download-icon-wrapper svg,
  .hero-cta .icon-stack svg {
    font-size: 16px !important;
    width: 16px !important;
    height: 19px !important;
  }

  /* Profile picture — neon flicker (mobile only) */
  .hero-profile-pic {
    display: flex !important;
    justify-content: center !important;
    margin-bottom: 20px !important;
  }

  @keyframes neon-flicker {
    0%,100% { box-shadow: 0 0 8px #3b82f6, 0 0 20px #3b82f6, 0 0 40px #3b82f6; border-color: #3b82f6; }
    50%      { box-shadow: 0 0 4px #3b82f6, 0 0 10px #3b82f6;                   border-color: #60a5fa; }
  }

  .hero-avatar {
    width: 200px !important;
    height: 200px !important;
    border-radius: 50% !important;
    border: 2.5px solid #3b82f6 !important;
    background: #000 !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    overflow: hidden !important;
    animation: neon-flicker 1.8s ease-in-out infinite !important;
  }

  .hero-avatar img {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover !important;
    border-radius: 50% !important;
  }

  /* Social icons — center */
  .hero-social {
    display: flex !important;
    justify-content: center !important;
    margin-top: 8px !important;
    margin-bottom: 24px !important;
  }

  /* Hide right column avatar on mobile */
  .hero-grid > div:nth-child(2) {
    display: none !important;
  }
}
`;

export const HeroSection = () => {
  const stageRef = useRef(null);
  const { rARef, rBRef } = useRoleAnimator();

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) projectsSection.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      {/* Mobile-only style injection */}
      <style dangerouslySetInnerHTML={{ __html: HERO_MOBILE_STYLES }} />

      <div className="fixed inset-0 z-0">
        <ParticlesBackground
          key="particles-dark"
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
        className="relative flex min-h-screen w-full items-center justify-center overflow-visible pt-16 sm:pt-20"
      >
        <div className="relative z-10 mx-auto max-w-6xl w-full px-3 sm:px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center min-h-full hero-grid">

            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              style={{ paddingLeft: '20px' }}
              className="hero-left sm:pl-6"
            >
              {/* Profile Picture — mobile only, hidden on desktop via CSS */}
              <motion.div
                className="hero-profile-pic"
                style={{ display: 'none' }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 2, type: 'spring', stiffness: 50, damping: 20 }}
              >
                <div className="hero-avatar">
                  <img
                  src="/Profile/Profile.png"
                  alt="Mohamad Jason"
                  onError={(e) => {
                    const target = e.currentTarget;
                    target.style.display = 'none';
                    const fallback = target.nextElementSibling as HTMLElement;
                    if (fallback) fallback.style.display = 'flex';
                  }}
                />
                  <span
                    style={{
                      display: 'none',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '32px',
                      color: '#3b82f6',
                    }}
                  >
                    <i className="ti ti-user" aria-hidden="true" />
                  </span>
                </div>
              </motion.div>

              {/* Name */}
              <BlurText
                text="Mohamad Jason Labis Celoza"
                delay={350}
                stepDuration={1.4}
                easing="easeOut"
                animateBy="words"
                direction="top"
                className="hero-name mb-4 sm:mb-6 font-syne text-2xl sm:text-3xl font-extrabold tracking-tight md:text-5xl lg:text-6xl text-white uppercase"
              />

              {/* ── Role Animator ── */}
              {(() => {
                const isMobile = typeof window !== 'undefined' && window.innerWidth <= 767;
                const stageFontSize = isMobile ? '18px' : 'clamp(24px, 3.5vw, 40px)';
                const stageWidth = isMobile ? '100%' : '100%';
                const stageMinWidth = isMobile ? '220px' : '300px';
                const stageMaxWidth = isMobile ? '100%' : '600px';
                const stageHeight = isMobile ? '28px' : 'clamp(36px, 4.5vw, 52px)';
                const stageOverflow = 'visible';
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 3, duration: 0.6 }}
                    style={{
                      marginTop: '24px',
                      marginBottom: '24px',
                      width: '100%',
                      display: 'flex',
                      justifyContent: isMobile ? 'center' : 'flex-start',
                    }}
                  >
                    {/* inner pill — shrinks to content, then gets centered by parent */}
                    <div
                      style={{
                        display: 'inline-flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: isMobile ? '6px' : '12px',
                        flexWrap: 'nowrap',
                      }}
                    >
                      {/* "Aspiring" — temporarily disabled */}
                      {/* <BlurText
                        text="Aspiring"
                        delay={300}
                        stepDuration={1.4}
                        easing="easeOut"
                        animateBy="words"
                        direction="top"
                        className="hero-aspiring font-display text-2xl font-bold md:text-4xl text-white"
                        style={isMobile ? { fontSize: '13px', whiteSpace: 'nowrap', marginLeft: '12px' } : {}}
                      /> */}

                      {/* Animated role stage */}
                      <div
                        ref={stageRef}
                        style={{
                          position: 'relative',
                          display: 'inline-block',
                          width: stageWidth,
                          minWidth: stageMinWidth,
                          maxWidth: stageMaxWidth,
                          height: stageHeight,
                          overflow: stageOverflow,
                          perspective: '800px',
                          transformStyle: 'preserve-3d',
                          flexShrink: 0,
                        }}
                      >
                        {/* Slot A */}
                        <span
                          ref={rARef}
                          style={{
                            position: 'absolute', inset: 0,
                            display: 'flex', alignItems: 'center',
                            fontSize: stageFontSize,
                            fontWeight: 700, letterSpacing: '-1px',
                            whiteSpace: 'nowrap',
                            color: COLORS[0],
                            fontFamily: 'inherit',
                          }}
                        />
                        {/* Slot B */}
                        <span
                          ref={rBRef}
                          style={{
                            position: 'absolute', inset: 0,
                            display: 'flex', alignItems: 'center',
                            fontSize: stageFontSize,
                            fontWeight: 700, letterSpacing: '-1px',
                            whiteSpace: 'nowrap',
                            opacity: 0,
                            fontFamily: 'inherit',
                          }}
                        />
                      </div>
                    </div>
                  </motion.div>
                );
              })()}

              {/* Description */}
              <BlurText
                text={heroContent.description}
                delay={100}
                stepDuration={1.4}
                easing="easeOut"
                animateBy="words"
                direction="bottom"
                className="hero-description mb-10 text-lg text-gray-300 leading-relaxed md:text-xl"
              />

              {/* CTA Buttons */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.8 }}
                className="hero-cta mt-12 mb-16 flex flex-col gap-6 sm:flex-row"
                style={{ marginTop: '15px' }}
              >
                <motion.button
                  onClick={scrollToProjects}
                  className="btn-view-work"
                  initial={{ opacity: 0, scale: 0.65 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 2.8, duration: 0.9, type: 'spring', stiffness: 80, damping: 14 }}
                >
                  <span className="vw-label">{heroContent.ctaPrimary}</span>
                  <span className="vw-icon">
                    <i className="ti ti-arrow-right" aria-hidden="true" />
                  </span>
                </motion.button>

                <motion.a
                  href="/Resume/MohamadjasonCV.pdf"
                  download="MohamadjasonCV.pdf"
                  className="btn-premium-resume"
                  initial={{ opacity: 0, scale: 0.65 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 3.1, duration: 0.9, type: 'spring', stiffness: 80, damping: 14 }}
                >
                  <span className="download-icon-wrapper">
                    <span className="icon-stack">
                      <Download size={18} />
                      <Download size={18} />
                    </span>
                  </span>
                  <span className="bottom-bar" />
                  {heroContent.ctaSecondary}
                </motion.a>
              </motion.div>

              {/* Social Links */}
              <div className="hero-social mt-12 mb-12">
                <SocialIcons />
              </div>
            </motion.div>

            {/* Right Column */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex items-center justify-center"
            >
              <div className="relative" style={{ marginTop: '-50px', marginLeft: '70px' }}>
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1,
                    boxShadow: [
                      '0 0 30px rgba(59, 130, 246, 0.5), 0 0 60px rgba(59, 130, 246, 0.3)',
                      '0 0 40px rgba(59, 130, 246, 0.7), 0 0 80px rgba(59, 130, 246, 0.5)',
                      '0 0 30px rgba(59, 130, 246, 0.5), 0 0 60px rgba(59, 130, 246, 0.3)',
                    ]
                  }}
                  transition={{ 
                    delay: 0.6, 
                    duration: 1.2, 
                    type: 'spring', 
                    stiffness: 50, 
                    damping: 20,
                    boxShadow: {
                      repeat: Infinity,
                      duration: 2,
                    }
                  }}
                  className="w-72 h-72 sm:w-80 sm:h-80 lg:w-96 lg:h-96 rounded-full border-4 border-blue-500 bg-black overflow-hidden shadow-2xl"
                  style={{
                    boxShadow: '0 0 30px rgba(59, 130, 246, 0.5), 0 0 60px rgba(59, 130, 246, 0.3)',
                  }}
                >
                  <img
                    src="/Profile/Profile.png"
                    alt="Mohamad Jason"
                    className="w-full h-full object-cover rounded-full"
                    onError={(e) => {
                      const target = e.currentTarget;
                      target.style.display = 'none';
                      const fallback = target.nextElementSibling as HTMLElement;
                      if (fallback) fallback.style.display = 'flex';
                    }}
                  />
                  <span
                    style={{
                      display: 'none',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '48px',
                      color: '#3b82f6',
                    }}
                  >
                    <i className="ti ti-user" aria-hidden="true" />
                  </span>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
};
