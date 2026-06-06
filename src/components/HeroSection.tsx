// Hero Section Component
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Download } from 'lucide-react';
import { heroContent } from '../data';
import { ParticlesBackground } from './ParticlesBackground';
import { fadeInUp } from '../animations/variants';
import BlurText from './BlurText';
import { SocialIcons } from './SocialIcons';

const particleColors = ['#ffffff'];

const ROLES = ['Cloud Engineer', 'Web Developer', 'Software Engineer'];
const COLORS = ['#60a5fa', '#a78bfa', '#34d399'];
const ANIMS = ['blur', 'wave', 'carousel', 'depth', 'letter'];
const HOLD = 2800;

function ease(t: number) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t; }
function easeOut(t: number) { return 1 - Math.pow(1 - t, 3); }

function useRoleAnimator() {
  const riRef = useRef(0);
  const aiRef = useRef(0);
  const busyRef = useRef(false);
  const rARef = useRef<HTMLSpanElement>(null);
  const rBRef = useRef<HTMLSpanElement>(null);
  const holdTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function resetStyle(el: HTMLElement | null) {
    if (!el) return;
    Object.assign(el.style, {
      position: 'absolute', inset: '0', display: 'flex',
      alignItems: 'center', opacity: '1',
      transform: 'none', filter: 'none', willChange: 'transform,opacity,filter',
    });
  }

  function raf(dur: number, cb: (e: number, p: number) => void, done?: () => void) {
    const t0 = performance.now();
    function tick(now: number) {
      const p = Math.min((now - t0) / dur, 1);
      cb(ease(p), p);
      if (p < 1) requestAnimationFrame(tick);
      else if (done) done();
    }
    requestAnimationFrame(tick);
  }

  const T: Record<string, (prev: HTMLSpanElement, next: HTMLSpanElement, nc: string, done: () => void) => void> = {
    blur(prev, next, _nc, done) {
      resetStyle(next); next.style.opacity = '0'; next.style.filter = 'blur(28px)'; next.style.transform = 'scale(1.06)';
      raf(820, (e) => {
        prev.style.filter = `blur(${28 * e}px)`; prev.style.opacity = `${1 - e}`; prev.style.transform = `scale(${1 + 0.04 * e})`;
        next.style.filter = `blur(${28 * (1 - e)}px)`; next.style.opacity = `${e}`; next.style.transform = `scale(${1.06 - 0.06 * e})`;
      }, done);
    },
    wave(prev, next, _nc, done) {
      resetStyle(next); next.style.opacity = '0'; next.style.transform = 'translateY(48px) scaleX(0.92)';
      raf(900, (_, p) => {
        const e = ease(p); const wv = Math.sin(p * Math.PI * 3) * 8 * (1 - p);
        prev.style.transform = `translateY(${-50 * e + wv}px) scaleX(${1 - 0.08 * e})`; prev.style.opacity = `${1 - e}`;
        next.style.transform = `translateY(${48 * (1 - e) - wv * 0.5}px) scaleX(${0.92 + 0.08 * e})`; next.style.opacity = `${easeOut(p)}`;
      }, done);
    },
    carousel(prev, next, _nc, done) {
      resetStyle(next); next.style.opacity = '0.3'; next.style.transform = 'rotateX(88deg) translateY(70px)';
      raf(750, (e) => {
        prev.style.transform = `rotateX(${-88 * e}deg) translateY(${-70 * e}px)`; prev.style.opacity = `${1 - e}`;
        next.style.transform = `rotateX(${88 * (1 - e)}deg) translateY(${70 * (1 - e)}px)`; next.style.opacity = `${0.3 + 0.7 * e}`;
      }, done);
    },
    depth(prev, next, _nc, done) {
      resetStyle(next); next.style.opacity = '0'; next.style.filter = 'blur(10px)'; next.style.transform = 'scale(0.65)';
      raf(860, (e) => {
        prev.style.transform = `scale(${1 + 0.35 * e})`; prev.style.opacity = `${1 - e}`; prev.style.filter = `blur(${12 * e}px)`;
        next.style.transform = `scale(${0.65 + 0.35 * e})`; next.style.opacity = `${e}`; next.style.filter = `blur(${10 * (1 - e)}px)`;
      }, done);
    },
    letter(prev, next, nc, done) {
      const pt = prev.textContent, nt = next.textContent;
      const ml = Math.max(pt.length, nt.length);
      const RND = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
      const FRAMES = 34; let f = 0;
      resetStyle(next); next.style.opacity = '0';
      function tick() {
        f++;
        const p = f / FRAMES; let s = '';
        for (let i = 0; i < ml; i++) {
          const pc = pt[i] || '', nc2 = nt[i] || '';
          const lp = Math.max(0, Math.min(1, (p - i * 0.025) * 2.5));
          if (pc === ' ' || nc2 === ' ') { s += ' '; continue; }
          if (lp < 0.45) s += pc || (Math.random() < 0.3 ? RND[Math.floor(Math.random() * RND.length)] : '');
          else if (lp < 0.7) s += RND[Math.floor(Math.random() * RND.length)];
          else s += nc2 || '';
        }
        prev.textContent = s.trimEnd() || ' ';
        prev.style.color = p < 0.5 ? COLORS[riRef.current] : nc;
        if (f >= FRAMES) { prev.textContent = nt; prev.style.color = nc; done(); }
        else requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
    },
  };

  function runNext() {
    if (busyRef.current) return;
    busyRef.current = true;
    if (holdTimer.current) clearTimeout(holdTimer.current);

    const ni = (riRef.current + 1) % ROLES.length;
    const nc = COLORS[ni];
    const key = ANIMS[aiRef.current];
    const prev = rARef.current;
    const next = rBRef.current;
    if (!prev || !next) { busyRef.current = false; return; }

    next.textContent = ROLES[ni];
    next.style.color = nc;
    resetStyle(next); next.style.opacity = '0';

    T[key](prev, next, nc, () => {
      prev.textContent = ROLES[ni]; prev.style.color = nc;
      resetStyle(prev); prev.style.opacity = '1';
      next.style.opacity = '0'; resetStyle(next); next.textContent = '';
      riRef.current = ni;
      aiRef.current = (aiRef.current + 1) % ANIMS.length;
      busyRef.current = false;
      holdTimer.current = setTimeout(runNext, HOLD);
    });
  }

  useEffect(() => {
    const rA = rARef.current;
    const rB = rBRef.current;
    if (!rA || !rB) return;
    rA.textContent = ROLES[0]; rA.style.color = COLORS[0];
    resetStyle(rA); rA.style.opacity = '1';
    rB.style.opacity = '0';
    holdTimer.current = setTimeout(runNext, HOLD);
    return () => clearTimeout(holdTimer.current!);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { rARef, rBRef };
}

export const HeroSection = () => {
  const stageRef = useRef(null);
  const { rARef, rBRef } = useRoleAnimator();

  const scrollToProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) projectsSection.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
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
        className="relative flex min-h-screen w-full items-center justify-center overflow-visible pt-20"
      >
        <div className="relative z-10 mx-auto max-w-6xl w-full px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-full">

            {/* Left Column */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              style={{ paddingLeft: '25px' }}
            >
              {/* Name */}
              <BlurText
                text="Mohamad Jason Labis Celoza"
                delay={350}
                stepDuration={1.4}
                easing="easeOut"
                animateBy="words"
                direction="top"
                className="mb-6 font-syne text-3xl font-extrabold tracking-tight md:text-5xl lg:text-6xl text-white uppercase"
              />

              {/* ── Role Animator (replaces typewriter) ── */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 3, duration: 0.6 }}
                className="mt-6 mb-6 min-h-20"
              >
                <div className="flex items-center flex-wrap gap-x-3">
                  {/* "Aspiring" stays fixed */}
                  <BlurText
                    text="Aspiring"
                    delay={300}
                    stepDuration={1.4}
                    easing="easeOut"
                    animateBy="words"
                    direction="top"
                    className="font-display text-2xl font-bold md:text-4xl text-white"
                  />

                  {/* Animated role stage */}
                  <div
                    ref={stageRef}
                    style={{
                      position: 'relative',
                      display: 'inline-block',
                      minWidth: '360px',
                      height: 'clamp(36px, 4.5vw, 52px)',
                      overflow: 'hidden',
                      perspective: '800px',
                      transformStyle: 'preserve-3d',
                    }}
                  >
                    {/* Slot A — starts with first role */}
                    <span
                      ref={rARef}
                      style={{
                        position: 'absolute', inset: 0,
                        display: 'flex', alignItems: 'center',
                        fontSize: 'clamp(24px, 3.5vw, 42px)',
                        fontWeight: 700, letterSpacing: '-1px',
                        whiteSpace: 'nowrap',
                        color: COLORS[0],
                        fontFamily: 'inherit',
                      }}
                    />
                    {/* Slot B — incoming role */}
                    <span
                      ref={rBRef}
                      style={{
                        position: 'absolute', inset: 0,
                        display: 'flex', alignItems: 'center',
                        fontSize: 'clamp(24px, 3.5vw, 42px)',
                        fontWeight: 700, letterSpacing: '-1px',
                        whiteSpace: 'nowrap',
                        opacity: 0,
                        fontFamily: 'inherit',
                      }}
                    />
                  </div>
                </div>
              </motion.div>

              {/* Description */}
              <BlurText
                text={heroContent.description}
                delay={100}
                stepDuration={1.4}
                easing="easeOut"
                animateBy="words"
                direction="bottom"
                className="mb-10 text-lg text-gray-300 leading-relaxed md:text-xl"
              />

              {/* CTA Buttons */}
              <motion.div
                variants={fadeInUp}
                initial="hidden"
                animate="visible"
                transition={{ delay: 0.8 }}
                className="mt-12 mb-16 flex flex-col gap-6 sm:flex-row"
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
                  href="/Mohamad_Jason_Resume.pdf"
                  download="Mohamad_Jason_Resume.pdf"
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
              <div
                className="mt-12 mb-12"
              >
                <SocialIcons />
              </div>
            </motion.div>

            {/* Right Column */}
            <div />
          </div>
        </div>
      </section>
    </>
  );
};