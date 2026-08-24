// ──────────────────────────────────────────────────────────────────────
// Cinematic Timeline ScrollStack Portfolio Section
// Apple-style scroll storytelling with synced timeline + project cards
// Mobile fixes applied ONLY via <style> + CSS class overrides at ≤767px
// Desktop JSX is byte-for-byte identical to the original
// ──────────────────────────────────────────────────────────────────────

import { useState, useRef, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import {
  Ticket,
  Package,
  LayoutDashboard,
  Monitor,
  Wifi,
  Bot,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { projectsData, type Project } from '../../data';

/* ═══════════════════════════════════════════════════════════════════════
   CONFIG
   ═══════════════════════════════════════════════════════════════════════ */

interface ProjectVisual {
  color: string;
  bgLight: string;
  Icon: LucideIcon;
}

const projectVisuals: ProjectVisual[] = [
  { color: '#2563eb', bgLight: '#eff6ff', Icon: Ticket },
  { color: '#059669', bgLight: '#ecfdf5', Icon: Package },
  { color: '#7c3aed', bgLight: '#f5f3ff', Icon: LayoutDashboard },
  { color: '#ea580c', bgLight: '#fff7ed', Icon: Monitor },
  { color: '#0891b2', bgLight: '#ecfeff', Icon: Wifi },
  { color: '#4f46e5', bgLight: '#eef2ff', Icon: Bot },
];

/** Smooth deceleration curve — feels cinematic, not mechanical */
const EASE = [0.16, 1, 0.3, 1] as const;

/* Technology icon mapping */
const techIcons: Record<string, string> = {
  HTML:       'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
  CSS:        'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
  JavaScript: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
  PHP:        'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg',
  MySQL:      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg',
  'React.js': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
  React:      'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg',
  TypeScript: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg',
  Vite:       'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vite/vite-original.svg',
  'Tailwind CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
  Tailwind:   'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg',
};

/* Technology badge color map */
const techColorMap: Record<string, { bg: string; text: string; border: string }> = {
  HTML:       { bg: 'rgba(228,77,38,0.12)',   text: '#f97060', border: 'rgba(228,77,38,0.25)'   },
  CSS:        { bg: 'rgba(33,118,217,0.12)',  text: '#60a5fa', border: 'rgba(33,118,217,0.25)'  },
  JavaScript: { bg: 'rgba(240,202,53,0.12)',  text: '#fbbf24', border: 'rgba(240,202,53,0.25)'  },
  PHP:        { bg: 'rgba(119,123,180,0.12)', text: '#a78bfa', border: 'rgba(119,123,180,0.25)' },
  MySQL:      { bg: 'rgba(0,116,156,0.12)',   text: '#22d3ee', border: 'rgba(0,116,156,0.25)'   },
  React:      { bg: 'rgba(97,218,251,0.10)',  text: '#67e8f9', border: 'rgba(97,218,251,0.22)'  },
  'React.js': { bg: 'rgba(97,218,251,0.10)',  text: '#67e8f9', border: 'rgba(97,218,251,0.22)'  },
  TypeScript: { bg: 'rgba(49,120,198,0.12)',  text: '#93c5fd', border: 'rgba(49,120,198,0.25)'  },
  Python:     { bg: 'rgba(55,118,171,0.12)',  text: '#7dd3fc', border: 'rgba(55,118,171,0.25)'  },
  Tailwind:   { bg: 'rgba(6,182,212,0.12)',   text: '#2dd4bf', border: 'rgba(6,182,212,0.25)'   },
  'Tailwind CSS': { bg: 'rgba(6,182,212,0.12)', text: '#2dd4bf', border: 'rgba(6,182,212,0.25)'   },
  Node:       { bg: 'rgba(83,158,69,0.12)',   text: '#86efac', border: 'rgba(83,158,69,0.25)'   },
  'Node.js':  { bg: 'rgba(83,158,69,0.12)',   text: '#86efac', border: 'rgba(83,158,69,0.25)'   },
  MongoDB:    { bg: 'rgba(71,162,72,0.12)',   text: '#4ade80', border: 'rgba(71,162,72,0.25)'   },
  Firebase:   { bg: 'rgba(255,160,0,0.12)',   text: '#fcd34d', border: 'rgba(255,160,0,0.25)'   },
  Vue:        { bg: 'rgba(66,184,131,0.12)',  text: '#6ee7b7', border: 'rgba(66,184,131,0.25)'  },
  'Vue.js':   { bg: 'rgba(66,184,131,0.12)',  text: '#6ee7b7', border: 'rgba(66,184,131,0.25)'  },
  Figma:      { bg: 'rgba(162,89,255,0.12)',  text: '#c084fc', border: 'rgba(162,89,255,0.25)'  },
  Vite:       { bg: 'rgba(139,92,246,0.12)',  text: '#a78bfa', border: 'rgba(139,92,246,0.25)'  },
};

/* Badge animation variants */
const badgeVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.85 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] as const, delay: i * 0.15 },
  }),
};

/* ═══════════════════════════════════════════════════════════════════════
   MOBILE-ONLY STYLES
   Injected once via a <style> tag. All rules are inside @media (max-width: 767px)
   so desktop is completely unaffected.
   ═══════════════════════════════════════════════════════════════════════ */

const MOBILE_STYLES = `
@media (max-width: 767px) {

  /* Section wrapper — prevent horizontal bleed */
  #projects {
    margin-top: 48px !important;
    overflow-x: hidden;
  }

  /* Section header padding */
  .pss-header {
    padding-left: 16px !important;
    padding-right: 16px !important;
    padding-bottom: 28px !important;
  }

  /* "Portfolio" eyebrow */
  .pss-eyebrow {
    font-size: 10px !important;
    margin-bottom: 10px !important;
  }

  /* "Featured Projects" title */
  .pss-title {
    font-size: 28px !important;
    margin-bottom: 10px !important;
  }

  /* Subtitle paragraph */
  .pss-subtitle {
    font-size: 13px !important;
    margin-bottom: 20px !important;
  }

  /* Outer list container */
  .pss-list {
    padding-left: 14px !important;
    padding-right: 14px !important;
    padding-bottom: 48px !important;
  }

  /* Per-project row — stack vertically, tighter height */
  .pss-row {
    flex-direction: column !important;
    gap: 8px !important;
    min-height: 62vh !important;
    padding-top: 16px !important;
    padding-bottom: 12px !important;
  }
  .pss-row:first-child {
    padding-top: 0 !important;
  }

  /* Right column (card wrapper) — full width */
  .pss-card-col {
    width: 100% !important;
    min-width: 0 !important;
  }

  /* Card article — full width, no 90% cap */
  .pss-card-article {
    max-width: 100% !important;
  }

  /* Image / icon zone — tall enough for full image display on mobile */
  .pss-visual-zone {
    height: 220px !important;
    padding: 10px 12px !important;
  }

  /* Card content area */
  .pss-card-body {
    padding: 12px 14px 16px 14px !important;
  }

  /* Description text */
  .pss-description {
    font-size: 14px !important;
    margin-bottom: 14px !important;
  }

  /* Badge row */
  .pss-badges {
    gap: 6px !important;
    margin-bottom: 14px !important;
  }

  /* Individual badges */
  .pss-badge {
    font-size: 11px !important;
    padding: 5px 10px !important;
    gap: 5px !important;
  }

  .pss-badge img {
    width: 13px !important;
    height: 13px !important;
  }

  /* Image wrapper — tighter padding on mobile */
  .pss-img-wrap {
    padding: 10px 12px !important;
  }

  /* Mobile project label strip (shown only on mobile) */
  .pss-mobile-label {
    display: flex !important;
  }

  /* Progress dots (shown only on mobile) */
  .pss-dots {
    display: flex !important;
  }
}

/* Desktop — hide mobile-only elements */
@media (min-width: 768px) {
  .pss-mobile-label {
    display: none !important;
  }
  .pss-dots {
    display: none !important;
  }
}
`;

/* ═══════════════════════════════════════════════════════════════════════
   MOBILE LABEL  (visible only on phones, rendered above each card)
   ═══════════════════════════════════════════════════════════════════════ */

interface MobileLabelProps {
  project: Project;
  index: number;
  isActive: boolean;
}

const MobileLabel = ({ project, index, isActive }: MobileLabelProps) => (
  <div
    className="pss-mobile-label"
    style={{
      /* hidden by default; shown by CSS at ≤767px */
      display: 'none',
      alignItems: 'center',
      gap: '8px',
      marginBottom: '8px',
      paddingLeft: '2px',
    }}
  >
    <motion.span
      style={{
        display: 'block',
        width: '6px',
        height: '6px',
        borderRadius: '50%',
        flexShrink: 0,
        backgroundColor: isActive ? '#3b82f6' : 'rgba(255,255,255,0.2)',
      }}
      animate={{ backgroundColor: isActive ? '#3b82f6' : 'rgba(255,255,255,0.2)' }}
      transition={{ duration: 0.4 }}
    />
    <span
      style={{
        fontFamily: 'monospace',
        fontSize: '19px',
        fontWeight: 600,
        letterSpacing: '0.15em',
        textTransform: 'uppercase' as const,
        color: isActive ? '#3b82f6' : 'rgba(196,196,200,0.6)',
        minWidth: '27px',
      }}
    >
      {String(index + 1).padStart(2, '0')}
    </span>
    <span
      style={{
        fontSize: '16px',
        fontWeight: 700,
        color: isActive ? '#ffffff' : 'rgba(255,255,255,0.4)',
        lineHeight: 1.3,
      }}
    >
      {project.title}
    </span>
  </div>
);

/* ═══════════════════════════════════════════════════════════════════════
   SCROLL STACK ITEM  (Right Column Card)
   — Desktop JSX is identical to original; CSS classes carry mobile overrides
   ═══════════════════════════════════════════════════════════════════════ */

interface ScrollStackItemProps {
  project: Project;
  index: number;
  isActive: boolean;
  visual: ProjectVisual;
}

const ScrollStackItem = ({
  project,
  index,
  isActive,
  visual,
}: ScrollStackItemProps) => {
  const { Icon } = visual;

  return (
    <motion.div className="w-full flex justify-end md:justify-end justify-center flex-col items-center">
      <motion.article
        className="pss-card-article rounded-[20px] overflow-hidden relative"
        style={{
          backgroundColor: '#000000',
          border: '1px solid #3b82f635',
          maxWidth: '90%',
        }}
        animate={{
          scale: isActive ? 1 : 0.965,
          boxShadow: isActive
            ? '0 30px 80px rgba(0,0,0,0.10), 0 8px 30px rgba(0,0,0,0.05)'
            : '0 4px 20px rgba(0,0,0,0.03)',
        }}
        transition={{ duration: 0.55, ease: EASE }}
      >
        {/* Pattern overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(circle, rgba(0,0,0,0.03) 1px, transparent 1px)',
            backgroundSize: '16px 16px',
            opacity: 0.5,
          }}
        />

        {/* ── Visual / Image Area ── */}
        <div
          className="pss-visual-zone relative h-[200px] md:h-[350px] flex items-center justify-center overflow-hidden py-3 md:py-6 px-4 md:px-8"
          style={{ backgroundColor: '#000000' }}
        >
          {project.image ? (
            <div
              className="pss-img-wrap"
              style={{
                width: '100%',
                height: '100%',
                padding: '16px 20px',
                boxSizing: 'border-box',
              }}
            >
              <img
                src={project.image}
                alt={project.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '12px',
                  display: 'block',
                }}
              />
            </div>
          ) : (
            <>
              {/* Dot pattern */}
              <div
                className="absolute inset-0 opacity-40"
                style={{
                  backgroundImage: `radial-gradient(circle, ${visual.color}18 1px, transparent 1px)`,
                  backgroundSize: '24px 24px',
                }}
              />

              {/* Decorative shapes */}
              <div
                className="absolute -right-6 -top-6 w-40 h-40 rounded-full"
                style={{ backgroundColor: `${visual.color}08` }}
              />
              <div
                className="absolute -left-8 -bottom-8 w-28 h-28 rounded-full"
                style={{ backgroundColor: `${visual.color}06` }}
              />
              <div
                className="absolute right-16 bottom-12 w-16 h-16 rounded-xl rotate-12"
                style={{ border: `2px solid ${visual.color}15` }}
              />
              <div
                className="absolute left-20 top-10 w-10 h-10 rounded-lg -rotate-6"
                style={{ border: `2px solid ${visual.color}10` }}
              />

              {/* Center icon block */}
              <motion.div
                className="relative z-10 flex flex-col items-center gap-4"
                animate={{
                  scale: isActive ? 1 : 0.9,
                  opacity: isActive ? 1 : 0.7,
                }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <div
                  className="w-20 h-20 rounded-2xl flex items-center justify-center"
                  style={{ backgroundColor: `${visual.color}12` }}
                >
                  <Icon size={32} style={{ color: visual.color }} strokeWidth={1.5} />
                </div>
                <span
                  className="text-xs font-mono font-bold tracking-[0.2em] uppercase"
                  style={{ color: `${visual.color}` }}
                >
                  Project {String(index + 1).padStart(2, '0')}
                </span>
              </motion.div>
            </>
          )}
        </div>

        {/* ── Content ── */}
        <div className="pss-card-body" style={{ padding: '0px 16px 20px 16px' }}>
          {/* Short intro sentence */}
          <p
            className="pss-description text-[0.935rem] leading-[1.75]"
            style={{ color: '#636363', marginBottom: '10px' }}
          >
            {project.fullDescription}
          </p>

          {/* Feature bullets — rendered if features array exists */}
          {project.features && project.features.length > 0 && (
            <ul
              style={{
                paddingLeft: '0',
                margin: '0 0 20px 0',
                listStyle: 'none',
                display: 'flex',
                flexDirection: 'column',
                gap: '6px',
              }}
            >
              {project.features.map((feature, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '8px',
                    fontSize: '0.875rem',
                    lineHeight: '1.6',
                    color: '#636363',
                  }}
                >
                  <span style={{
                    flexShrink: 0,
                    marginTop: '7px',
                    width: '5px',
                    height: '5px',
                    borderRadius: '50%',
                    backgroundColor: '#3b82f6',
                    display: 'inline-block',
                  }} />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          )}

          {/* ── Tech badges ── */}
          <motion.div
            className="pss-badges flex flex-wrap gap-2 mb-7"
            initial="hidden"
            animate={isActive ? 'visible' : 'hidden'}
          >
            {project.technologies.map((tech, i) => {
              const iconUrl = techIcons[tech];
              const colors = techColorMap[tech] ?? {
                bg: 'rgba(255,255,255,0.06)',
                text: '#a3a3a3',
                border: 'rgba(255,255,255,0.12)',
              };

              return (
                <motion.span
                  key={tech}
                  custom={i}
                  variants={badgeVariants}
                  whileHover={{ y: -2, transition: { duration: 0.2 } }}
                  className="pss-badge inline-flex items-center rounded-full font-medium"
                  style={{
                    backgroundColor: colors.bg,
                    color: colors.text,
                    border: `1px solid ${colors.border}`,
                    padding: '8px 16px',
                    gap: '7px',
                    fontSize: '13px',
                  }}
                >
                  {iconUrl && (
                    <img src={iconUrl} alt={tech} style={{ width: '18px', height: '18px', objectFit: 'contain' }} />
                  )}
                  {tech}
                </motion.span>
              );
            })}
          </motion.div>
        </div>
      </motion.article>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════
   PROJECTS SECTION  (Main Export)
   — Desktop JSX is identical to original; mobile via CSS classes only
   ═══════════════════════════════════════════════════════════════════════ */

export const ProjectsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* ── Scroll-based active detection ──
     Uses scroll position + element offsets instead of IntersectionObserver
     so only ONE project is active at a time with no jitter.
     On scroll, finds which project's center is closest to the viewport center.  ── */
  useEffect(() => {
    let rafId: number;
    let lastActive = 0;

    const getActive = () => {
      const viewportCenter = window.innerHeight / 2;
      let closest = 0;
      let closestDist = Infinity;

      itemRefs.current.forEach((el, i) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const elCenter = rect.top + rect.height / 2;
        const dist = Math.abs(elCenter - viewportCenter);
        if (dist < closestDist) {
          closestDist = dist;
          closest = i;
        }
      });

      return closest;
    };

    const onScroll = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        const next = getActive();
        if (next !== lastActive) {
          lastActive = next;
          setActiveIndex(next);
        }
      });
    };

    // Set initial active on mount
    const initial = getActive();
    lastActive = initial;
    setActiveIndex(initial);

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  /* ── Click timeline item → smooth-scroll to project card ── */
  const scrollToProject = useCallback((index: number) => {
    itemRefs.current[index]?.scrollIntoView({
      behavior: 'smooth',
      block: 'center',
    });
  }, []);

  return (
    <section
      id="projects"
      className="relative w-full"
      style={{ marginTop: '100px' }}
    >
      {/* ── Inject mobile-only styles once ── */}
      <style dangerouslySetInnerHTML={{ __html: MOBILE_STYLES }} />

      {/* ── Section Header ── */}
      <div
        className="pss-header px-3 sm:px-4 sm:px-6 lg:px-8 pb-16 flex flex-col items-center text-center"
        style={{ maxWidth: '64rem', marginLeft: 'auto', marginRight: 'auto' }}
      >
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: EASE }}
          className="flex flex-col items-center"
        >
          <p
            className="pss-eyebrow font-mono text-sm font-semibold tracking-[0.3em] uppercase mb-5"
            style={{ color: '#3b82f6' }}
          >
            Portfolio
          </p>
          <h2
            className="pss-title font-display text-5xl lg:text-6xl font-extrabold tracking-tight mb-6"
            style={{ color: '#ffffff' }}
          >
            Featured Projects
          </h2>
          <p
            className="pss-subtitle text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: '#888', textAlign: 'center', marginBottom: '120px' }}
          >
            
          </p>
        </motion.div>
      </div>

      {/* ── Two-Column Layout ── */}
      <div
        className="pss-list px-3 sm:px-4 sm:px-6 lg:px-8 pb-32"
        style={{ maxWidth: '64rem', marginLeft: 'auto', marginRight: 'auto' }}
      >
        {projectsData.map((project, index) => (
          <motion.div
            key={project.id}
            ref={(el) => {
              itemRefs.current[index] = el;
            }}
            data-index={index}
            initial={{ opacity: 0, y: 80 }}
            animate={{
              opacity: activeIndex === index ? 1 : 0.1,
              scale: activeIndex === index ? 1 : 0.95,
              y: activeIndex === index ? 0 : 20,
            }}
            transition={{
              opacity: { duration: 0.6, ease: EASE },
              scale:   { duration: 0.6, ease: EASE },
              y:       { duration: 0.6, ease: EASE },
            }}
            className="pss-row flex items-start gap-8 md:items-start items-center flex-col md:flex-row"
            style={{
              minHeight: index === projectsData.length - 1 ? '65vh' : '80vh',
              paddingTop: index === 0 ? '0' : '2rem',
              paddingBottom: '2rem',
            }}
          >
            {/* Left side — Timeline item */}
            <div className="w-[200px] shrink-0 pt-4 hidden md:block">
              <motion.button
                layout
                onClick={() => scrollToProject(index)}
                className="relative block text-left w-full py-3 cursor-pointer"
                whileHover={{ x: 4 }}
                transition={{
                  layout: { duration: 0.5, ease: EASE },
                  default: { duration: 0.3, ease: EASE },
                }}
                aria-current={activeIndex === index ? 'true' : undefined}
              >
                {/* ── Project number ── */}
                <motion.span
                  className="block font-mono text-xs font-semibold tracking-wider mb-1 select-none"
                  animate={{
                    color: activeIndex === index ? '#3b82f6' : '#c4c4c8',
                    opacity: activeIndex === index ? 1 : 0.7,
                  }}
                  transition={{ duration: 0.4 }}
                >
                  {String(index + 1).padStart(2, '0')}
                </motion.span>

                {/* ── Project title ── */}
                <motion.h3
                  className="font-display font-bold leading-snug"
                  animate={{
                    fontSize: activeIndex === index ? '1.25rem' : '0.925rem',
                    lineHeight: activeIndex === index ? '1.5rem' : '1.35rem',
                    color: '#ffffff',
                    opacity: activeIndex === index ? 1 : 0.5,
                  }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  {project.title}
                </motion.h3>
              </motion.button>
            </div>

            {/* Right side — Project card */}
            <div className="pss-card-col flex-1">
              {/* Mobile-only label (hidden on desktop via CSS) */}
              <MobileLabel
                project={project}
                index={index}
                isActive={activeIndex === index}
              />

              <ScrollStackItem
                project={project}
                index={index}
                isActive={activeIndex === index}
                visual={projectVisuals[index] || projectVisuals[0]}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── Mobile progress dots (hidden on desktop via CSS) ── */}
      <div
        className="pss-dots justify-center"
        style={{
          display: 'none', /* shown at ≤767px via CSS */
          gap: '8px',
          paddingBottom: '32px',
          paddingTop: '4px',
        }}
      >
        {projectsData.map((_, i) => {
          const visual = projectVisuals[i] || projectVisuals[0];
          return (
            <motion.button
              key={i}
              onClick={() => scrollToProject(i)}
              aria-label={`Go to project ${i + 1}`}
              style={{
                height: '6px',
                borderRadius: '9999px',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                backgroundColor: activeIndex === i ? visual.color : 'rgba(255,255,255,0.2)',
              }}
              animate={{
                width: activeIndex === i ? 20 : 6,
                backgroundColor: activeIndex === i ? visual.color : 'rgba(255,255,255,0.2)',
              }}
              transition={{ duration: 0.35, ease: EASE }}
            />
          );
        })}
      </div>
    </section>
  );
};
