import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { SectionHeading } from './SectionHeading';
import { educationData, type EducationItem } from '../data/education';



/* ═══════════════════════════════════════
   THEME
═══════════════════════════════════════ */
const COLORS: Record<string, {
  accent: string; glow: string; bg: string;
  border: string; text: string; accent2: string;
}> = {
  c: { accent: '#3b82f6', accent2: '#60a5fa', glow: 'rgba(59,130,246,0.5)',  bg: 'rgba(59,130,246,0.1)',  border: 'rgba(59,130,246,0.25)',  text: '#93c5fd' },
  s: { accent: '#2563eb', accent2: '#3b82f6', glow: 'rgba(37,99,235,0.5)',   bg: 'rgba(37,99,235,0.1)',   border: 'rgba(37,99,235,0.25)',   text: '#bfdbfe' },
  j: { accent: '#60a5fa', accent2: '#93c5fd', glow: 'rgba(96,165,250,0.5)',  bg: 'rgba(96,165,250,0.1)',  border: 'rgba(96,165,250,0.25)',  text: '#dbeafe' },
  e: { accent: '#93c5fd', accent2: '#bfdbfe', glow: 'rgba(147,197,253,0.5)', bg: 'rgba(147,197,253,0.1)', border: 'rgba(147,197,253,0.25)', text: '#eff6ff' },
};

/* ═══════════════════════════════════════
   STYLES
═══════════════════════════════════════ */
const STYLES = `
  /* ─────────── SHARED ─────────── */
  .edu-section { position: relative; }

  .edu-card-inner {
    background: rgba(255,255,255,0.03);
    border: 0.5px solid rgba(255,255,255,0.07);
    border-radius: 18px;
    padding: 22px 20px;
    position: relative;
    overflow: hidden;
    transition: transform 0.3s cubic-bezier(.22,1,.36,1),
                border-color 0.3s ease,
                box-shadow 0.3s ease;
  }
  .edu-card-inner:hover {
    border-color: rgba(255,255,255,0.14);
    transform: translateY(-4px);
  }

  /* top accent glow line */
  .edu-top-line {
    position: absolute;
    top: 0; left: 10%; right: 10%;
    height: 1px;
  }

  .edu-header { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }

  .edu-icon-box {
    width: 42px; height: 42px; border-radius: 12px;
    display: flex; align-items: center; justify-content: center;
    font-size: 20px; flex-shrink: 0;
  }

  .edu-school {
    font-size: 15px; font-weight: 700; color: #fff;
    line-height: 1.3; margin-bottom: 2px;
  }

  .edu-badge {
    font-size: 9px; font-weight: 700;
    padding: 2px 9px; border-radius: 99px;
    letter-spacing: 0.07em; text-transform: uppercase;
    display: inline-block;
  }

  .edu-course {
    font-size: 12px; color: rgba(255,255,255,0.48);
    margin-bottom: 10px; line-height: 1.5;
  }

  .edu-footer {
    display: flex; align-items: center;
    justify-content: space-between; gap: 8px;
    flex-wrap: wrap;
  }

  .edu-loc {
    display: flex; align-items: center; gap: 5px;
    font-size: 11px; color: rgba(255,255,255,0.35);
  }

  .edu-years {
    font-size: 11px; font-weight: 600;
    color: rgba(255,255,255,0.22);
    letter-spacing: 0.04em;
  }

  /* ─────────── MOBILE — left spine ─────────── */
  .edu-mobile {
    position: relative;
    padding-left: 30px;
  }
  .edu-mobile-spine {
    position: absolute; left: 10px; top: 20px;
    width: 2px; height: 0; border-radius: 2px;
    background: linear-gradient(180deg,#3b82f6,#8b5cf6,#14b8a6,#f59e0b);
    transition: height 1.4s cubic-bezier(0.22,1,0.36,1);
  }
  .edu-mobile-spine.drawn { height: calc(100% - 20px); }

  .edu-mobile-item {
    position: relative; margin-bottom: 14px;
    opacity: 0; transform: translateX(-24px);
    transition: opacity 0.55s cubic-bezier(0.22,1,0.36,1),
                transform 0.55s cubic-bezier(0.22,1,0.36,1);
  }
  .edu-mobile-item:last-child { margin-bottom: 0; }
  .edu-mobile-item.edu-in { opacity: 1; transform: translateX(0); }

  .edu-mobile-dot {
    position: absolute; left: -25px; top: 14px;
    width: 12px; height: 12px; border-radius: 50%;
    border: 2px solid #000; z-index: 2;
    transform: scale(0);
    transition: transform 0.4s cubic-bezier(0.34,1.56,0.64,1) 0.2s;
  }
  .edu-mobile-item.edu-in .edu-mobile-dot { transform: scale(1); }

  /* ─────────── DESKTOP — alternating timeline ─────────── */
  .edu-desktop {
    position: relative;
  }

  /* center spine */
  .edu-desktop-spine {
    position: absolute; left: 50%; top: 26px;
    transform: translateX(-50%);
    width: 2px; height: 0; border-radius: 2px;
    background: linear-gradient(180deg,#3b82f6,#8b5cf6,#14b8a6,#f59e0b);
    transition: height 1.6s cubic-bezier(0.22,1,0.36,1);
    z-index: 1;
  }
  .edu-desktop-spine.drawn { height: calc(100% - 26px); }

  .edu-desktop-row {
    display: grid;
    grid-template-columns: 1fr 80px 1fr;
    align-items: center;
    margin-bottom: 32px;
    position: relative;
  }
  .edu-desktop-row:last-child { margin-bottom: 0; }

  /* card slots */
  .edu-slot-left  { padding-right: 20px; }
  .edu-slot-right { padding-left:  20px; }

  /* slide from left */
  .edu-slide-left {
    opacity: 0; transform: translateX(-40px);
    transition: opacity 0.65s cubic-bezier(0.22,1,0.36,1),
                transform 0.65s cubic-bezier(0.22,1,0.36,1);
  }
  .edu-slide-left.edu-in { opacity: 1; transform: translateX(0); }

  /* slide from right */
  .edu-slide-right {
    opacity: 0; transform: translateX(40px);
    transition: opacity 0.65s cubic-bezier(0.22,1,0.36,1),
                transform 0.65s cubic-bezier(0.22,1,0.36,1);
  }
  .edu-slide-right.edu-in { opacity: 1; transform: translateX(0); }

  /* center node */
  .edu-node-wrap {
    display: flex; flex-direction: column;
    align-items: center; z-index: 2;
  }
  .edu-node {
    width: 52px; height: 52px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    font-size: 22px; position: relative; flex-shrink: 0;
    transform: scale(0);
    transition: transform 0.5s cubic-bezier(0.34,1.56,0.64,1);
  }
  .edu-node.edu-in { transform: scale(1); }

  /* ping ring on node */
  @keyframes edu-ping {
    0%   { transform: scale(1); opacity: 0.5; }
    100% { transform: scale(2.2); opacity: 0; }
  }
  .edu-node-ping {
    position: absolute; inset: 0; border-radius: 50%;
    animation: edu-ping 2.5s ease-out infinite;
  }

  /* connector line from card to node */
  .edu-connector {
    height: 1px; background: rgba(255,255,255,0.08);
    flex: 1; display: none;
  }

  /* hover glow on desktop cards */
  .edu-card-inner:hover {
    box-shadow: 0 20px 60px rgba(0,0,0,0.4);
  }

  /* Mobile: hide desktop, show mobile */
  @media (max-width: 767px) {
    .edu-desktop { display: none; }
    .edu-mobile  { display: block; }

    .edu-card-inner { padding: 14px 14px; border-radius: 14px; }
    .edu-school { font-size: 13px; }
    .edu-course { font-size: 11px; margin-bottom: 8px; }
    .edu-icon-box { width: 34px; height: 34px; font-size: 16px; border-radius: 10px; }
    .edu-header { gap: 10px; margin-bottom: 8px; }
  }

  /* Desktop: hide mobile, show desktop */
  @media (min-width: 768px) {
    .edu-mobile  { display: none; }
    .edu-desktop { display: block; }
  }
`;

/* ═══════════════════════════════════════
   CARD  (shared between mobile + desktop)
═══════════════════════════════════════ */
interface CardProps {
  edu: EducationItem;
}

const EduCard = ({ edu }: CardProps) => {
  const t = COLORS[edu.levelKey];
  return (
    <div
      className="edu-card-inner"
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = `0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px ${t.border}`;
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = 'none';
      }}
    >
      {/* top accent line */}
      <div
        className="edu-top-line"
        style={{ background: `linear-gradient(90deg,transparent,${t.accent},transparent)` }}
      />

      {/* header */}
      <div className="edu-header">
        <div
          className="edu-icon-box"
          style={{ background: t.bg, border: `0.5px solid ${t.border}` }}
        >
          {edu.icon}
        </div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div className="edu-school">{edu.school}</div>
          <span
            className="edu-badge"
            style={{ background: t.bg, color: t.text, border: `0.5px solid ${t.border}` }}
          >
            {edu.level}
          </span>
        </div>
      </div>

      {/* course */}
      {edu.course && (
        <div className="edu-course">{edu.course}</div>
      )}

      {/* footer */}
      <div className="edu-footer">
        <span className="edu-loc">
          <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/>
            <circle cx="12" cy="10" r="3"/>
          </svg>
          {edu.location}
        </span>
        <span className="edu-years">{edu.years}</span>
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════
   MAIN SECTION
═══════════════════════════════════════ */
export const EducationSection = () => {
  /* ── refs ── */
  const mobileWrapRef  = useRef<HTMLDivElement>(null);
  const mobileSpineRef = useRef<HTMLDivElement>(null);
  const mobileItemRefs = useRef<(HTMLDivElement | null)[]>([]);

  const desktopWrapRef  = useRef<HTMLDivElement>(null);
  const desktopSpineRef = useRef<HTMLDivElement>(null);
  const desktopRowRefs  = useRef<(HTMLDivElement | null)[]>([]);

  /* ── Mobile animation ── */
  useEffect(() => {
    const wrap  = mobileWrapRef.current;
    const spine = mobileSpineRef.current;
    if (!wrap || !spine) return;

    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      spine.classList.add('drawn');
      mobileItemRefs.current.forEach((el, i) => {
        if (!el) return;
        setTimeout(() => el.classList.add('edu-in'), 200 + i * 130);
      });
    }, { threshold: 0.08 });

    io.observe(wrap);
    return () => io.disconnect();
  }, []);

  /* ── Desktop animation ── */
  useEffect(() => {
    const wrap  = desktopWrapRef.current;
    const spine = desktopSpineRef.current;
    if (!wrap || !spine) return;

    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      spine.classList.add('drawn');
      desktopRowRefs.current.forEach((row, i) => {
        if (!row) return;
        setTimeout(() => {
          // Animate card
          row.querySelectorAll('.edu-slide-left, .edu-slide-right').forEach(el => {
            el.classList.add('edu-in');
          });
          // Animate node
          row.querySelectorAll('.edu-node').forEach(el => {
            el.classList.add('edu-in');
          });
        }, 250 + i * 160);
      });
    }, { threshold: 0.06 });

    io.observe(wrap);
    return () => io.disconnect();
  }, []);

  return (
    <section id="education" className="edu-section relative py-24 overflow-hidden">
      <style dangerouslySetInnerHTML={{ __html: STYLES }} />

      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.012) 1px,transparent 1px),' +
            'linear-gradient(90deg,rgba(255,255,255,0.012) 1px,transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      {/* Ambient glow */}
      <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
        style={{ background: 'radial-gradient(circle,rgba(59,130,246,0.04),transparent 70%)' }} />

      <div className="relative max-w-6xl mx-auto px-3 sm:px-4 sm:px-6 lg:px-8">

        {/* Section heading */}
        <div style={{ marginBottom: '52px' }}>
          <SectionHeading
            subtitle=""
            title="Education"
            description="My educational journey from elementary through college"
          />
        </div>

        {/* ══════════ MOBILE ══════════ */}
        <div className="edu-mobile" ref={mobileWrapRef}>
          <div className="edu-mobile-spine" ref={mobileSpineRef} />
          {educationData.map((edu, index) => {
            const t = COLORS[edu.levelKey];
            return (
              <div
                key={edu.id}
                className="edu-mobile-item"
                ref={(el) => { mobileItemRefs.current[index] = el; }}
              >
                <div
                  className="edu-mobile-dot"
                  style={{ background: t.accent, boxShadow: `0 0 10px ${t.glow}` }}
                />
                <EduCard edu={edu} />
              </div>
            );
          })}
        </div>

        {/* ══════════ DESKTOP ══════════ */}
        <div className="edu-desktop" ref={desktopWrapRef}>
          <div className="edu-desktop-spine" ref={desktopSpineRef} />

          {educationData.map((edu, index) => {
            const t = COLORS[edu.levelKey];
            const isLeft = index % 2 === 0;

            return (
              <div
                key={edu.id}
                className="edu-desktop-row"
                ref={(el) => { desktopRowRefs.current[index] = el; }}
              >
                {/* Left slot */}
                {isLeft ? (
                  <div className="edu-slot-left edu-slide-left">
                    <EduCard edu={edu} />
                  </div>
                ) : (
                  <div />
                )}

                {/* Center node */}
                <div className="edu-node-wrap">
                  <div
                    className="edu-node"
                    style={{
                      background: `linear-gradient(135deg,${t.bg},rgba(0,0,0,0.3))`,
                      border: `1.5px solid ${t.border}`,
                      boxShadow: `0 0 24px ${t.glow}`,
                    }}
                  >
                    <span style={{ fontSize: 22, position: 'relative', zIndex: 1 }}>{edu.icon}</span>
                    <div
                      className="edu-node-ping"
                      style={{ background: `radial-gradient(circle,${t.accent}30,transparent)` }}
                    />
                  </div>
                </div>

                {/* Right slot */}
                {!isLeft ? (
                  <div className="edu-slot-right edu-slide-right">
                    <EduCard edu={edu} />
                  </div>
                ) : (
                  <div />
                )}
              </div>
            );
          })}

          {/* End dot */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '24px' }}>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8, type: 'spring', stiffness: 200 }}
              style={{
                width: 10, height: 10, borderRadius: '50%',
                background: 'linear-gradient(135deg,#3b82f6,#f59e0b)',
                boxShadow: '0 0 16px rgba(59,130,246,0.5)',
              }}
            />
            <p style={{
              fontSize: 10, letterSpacing: 3, textTransform: 'uppercase',
              color: 'rgba(255,255,255,0.25)', marginTop: 10,
            }}>
              The beginning of the journey
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
