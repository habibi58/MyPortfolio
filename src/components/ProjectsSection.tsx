// ──────────────────────────────────────────────────────────────────────
// Cinematic Timeline ScrollStack Portfolio Section
// Apple-style scroll storytelling with synced timeline + project cards
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
import { projectsData, type Project } from '../data';

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
const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* Technology icon mapping */
const techIcons: Record<string, string> = {
  'HTML': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg',
  'CSS': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg',
  'JavaScript': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg',
  'PHP': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg',
  'MySQL': 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg',
};

/* ═══════════════════════════════════════════════════════════════════════
   SCROLL STACK ITEM  (Right Column Card)
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
    <motion.div
      className="w-full flex justify-end"
    >
      <motion.article
        className="rounded-[20px] overflow-hidden relative"
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

className="relative h-[350px] flex items-center justify-center overflow-hidden"
          style={{ backgroundColor: '#000000', padding: '24px' }}
        >
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover rounded-xl"
            />
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
                  <Icon
                    size={32}
                    style={{ color: visual.color }}
                    strokeWidth={1.5}
                  />
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
        <div style={{ padding: '0px 40px 32px 40px' }}>
          <p
            className="text-[0.935rem] leading-[1.75] mb-6"
            style={{ color: '#636363' }}
          >
            {project.fullDescription}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2 mb-7">
            {project.technologies.map((tech) => {
              const iconUrl = techIcons[tech];
              return (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-medium transition-colors duration-200 hover:bg-[#e5e5e5] hover:text-[#171717]"
                  style={{
                    backgroundColor: '#f5f5f5',
                    color: '#525252',
                    border: '1px solid #ebebeb',
                  }}
                >
                  {iconUrl && <img src={iconUrl} alt={tech} className="w-4 h-4" />}
                  {tech}
                </span>
              );
            })}
          </div>
        </div>
      </motion.article>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════════════════
   PROJECTS SECTION  (Main Export — TimelineScrollSection + ScrollStack)
   ═══════════════════════════════════════════════════════════════════════ */

export const ProjectsSection = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* ── Intersection Observer: scroll position → active project sync ── */
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number(entry.target.getAttribute('data-index'));
            if (!isNaN(idx)) setActiveIndex(idx);
          }
        });
      },
      { rootMargin: '-40% 0px -40% 0px', threshold: 0.01 },
    );

    itemRefs.current.forEach((el) => {
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
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
      {/* ── Section Header ── */}
      <div className="px-4 sm:px-6 lg:px-8 pb-16 flex flex-col items-center text-center" style={{ maxWidth: '64rem', marginLeft: 'auto', marginRight: 'auto' }}>
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: EASE }}
          className="flex flex-col items-center"
        >
          <p
            className="font-mono text-sm font-semibold tracking-[0.3em] uppercase mb-5"
            style={{ color: '#3b82f6' }}
          >
            Portfolio
          </p>
          <h2
            className="font-display text-5xl lg:text-6xl font-extrabold tracking-tight mb-6"
            style={{ color: '#ffffff' }}
          >
            Featured Projects
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: '#888', textAlign: 'center', marginBottom: '40px' }}
          >
            A curated showcase of my work in IT support systems, web
            development, and software engineering
          </p>
        </motion.div>
      </div>

      {/* ── Two-Column Layout ── */}
      <div className="px-4 sm:px-6 lg:px-8 pb-32" style={{ maxWidth: '64rem', marginLeft: 'auto', marginRight: 'auto' }}>
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
              y: activeIndex === index ? 0 : 80,
            }}
            transition={{ duration: 0.75, ease: EASE }}
            className="flex items-start gap-8"
            style={{
              minHeight:
                index === projectsData.length - 1 ? '65vh' : '80vh',
              paddingTop: index === 0 ? '0' : '2rem',
              paddingBottom: '2rem',
            }}
          >
            {/* Left side — Timeline item */}
            <div className="w-[200px] shrink-0 pt-4">
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
                    color: activeIndex === index ? '#ffffff' : '#ffffff',
                    opacity: activeIndex === index ? 1 : 0.5,
                  }}
                  transition={{ duration: 0.5, ease: EASE }}
                >
                  {project.title}
                </motion.h3>
              </motion.button>
            </div>

            {/* Right side — Project card */}
            <div className="flex-1">
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
    </section>
  );
};
