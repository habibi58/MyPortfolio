// Experience Section Component
import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { experienceData } from '../data';
import { SectionHeading } from './SectionHeading';

const GLOW_COLORS = ['#3b82f6', '#8b5cf6', '#14b8a6'];
const NODE_ICONS  = ['☁', '⚡', '⚙'];

export const ExperienceSection = () => {
  const cardRefs  = useRef([]);
  const countRefs = useRef([]);

  /* ── scroll reveal + counter animation ── */
  useEffect(() => {
    const observers = [];

    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      const color = GLOW_COLORS[i % GLOW_COLORS.length];

      const io = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;

          // reveal card
          el.style.opacity  = '1';
          el.style.transform = 'translateY(0)';

          // animate progress bars
          el.querySelectorAll('[data-width]').forEach((bar) => {
            setTimeout(() => { bar.style.width = bar.dataset.width + '%'; }, 250);
          });

          // animate counters
          el.querySelectorAll('[data-count]').forEach((counter) => {
            const target = parseInt(counter.dataset.count, 10);
            let cur = 0;
            const step = target / 40;
            const id = setInterval(() => {
              cur = Math.min(cur + step, target);
              counter.textContent = Math.round(cur);
              if (cur >= target) clearInterval(id);
            }, 30);
          });

          io.disconnect();
        },
        { threshold: 0.15 }
      );

      io.observe(el);
      observers.push(io);

      // hover glow
      el.addEventListener('mouseenter', () => {
        el.style.boxShadow    = `0 0 40px ${color}20, 0 20px 60px rgba(0,0,0,0.4)`;
        el.style.borderColor  = color + '40';
        el.style.transform    = 'translateY(-4px)';
      });
      el.addEventListener('mouseleave', () => {
        el.style.boxShadow   = 'none';
        el.style.borderColor = 'rgba(255,255,255,0.1)';
        el.style.transform   = 'translateY(0)';
      });
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  /* ── lightbox ── */
  const openLightbox = (emoji, title, desc) => {
    const lb = document.getElementById('exp-lightbox');
    document.getElementById('lb-emoji').textContent  = emoji;
    document.getElementById('lb-title').textContent  = title;
    document.getElementById('lb-desc').textContent   = desc;
    lb.style.opacity        = '1';
    lb.style.pointerEvents  = 'all';
    lb.querySelector('.lb-inner').style.transform = 'scale(1)';
  };
  const closeLightbox = () => {
    const lb = document.getElementById('exp-lightbox');
    lb.style.opacity       = '0';
    lb.style.pointerEvents = 'none';
    lb.querySelector('.lb-inner').style.transform = 'scale(0.92)';
  };

  return (
    <section id="experience" className="relative py-24 overflow-hidden">

      {/* ── ambient glow ── */}
      <div className="absolute top-0 left-1/2 w-[600px] h-[600px] rounded-full bg-blue-400/[0.02] blur-[120px] -translate-x-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-purple-500/[0.02] blur-[100px] pointer-events-none" />

      {/* ── floating particles ── */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-white"
            style={{
              width:  `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              left:   `${Math.random() * 100}%`,
              bottom: '-4px',
              opacity: Math.random() * 0.15 + 0.03,
              animation: `float-up ${Math.random() * 15 + 10}s ${Math.random() * 10}s linear infinite`,
            }}
          />
        ))}
      </div>

      {/* ── lightbox ── */}
      <div
        id="exp-lightbox"
        onClick={(e) => e.target === e.currentTarget && closeLightbox()}
        style={{
          position:       'fixed', inset: 0, zIndex: 9999,
          display:        'flex', alignItems: 'center', justifyContent: 'center',
          background:     'rgba(0,0,0,0.88)',
          backdropFilter: 'blur(10px)',
          opacity:        0, pointerEvents: 'none',
          transition:     'opacity 0.3s ease',
        }}
      >
        <div
          className="lb-inner"
          style={{
            background:   '#0d1220', border: '0.5px solid rgba(255,255,255,0.12)',
            borderRadius: '20px',    padding: '28px',
            maxWidth:     '560px',   width: '90%',
            transform:    'scale(0.92)',
            transition:   'transform 0.4s cubic-bezier(0.22,1,0.36,1)',
            position:     'relative',
          }}
        >
          <button
            onClick={closeLightbox}
            style={{
              position:     'absolute', top: '14px', right: '14px',
              width:        '30px',     height: '30px', borderRadius: '50%',
              background:   'rgba(255,255,255,0.07)',
              border:       '0.5px solid rgba(255,255,255,0.15)',
              color:        '#94a3b8',  fontSize: '16px',
              cursor:       'pointer',  display: 'flex',
              alignItems:   'center',   justifyContent: 'center',
            }}
          >✕</button>

          <div
            id="lb-emoji"
            style={{
              width: '100%', aspectRatio: '16/9', borderRadius: '12px',
              background:   'linear-gradient(135deg,#0d1220,#1a1f35)',
              border:       '0.5px solid rgba(255,255,255,0.08)',
              display:      'flex', alignItems: 'center', justifyContent: 'center',
              fontSize:     '64px', marginBottom: '16px',
            }}
          />
          <p id="lb-title" style={{ fontSize: '16px', fontWeight: 600, color: '#fff',     marginBottom: '6px' }} />
          <p id="lb-desc"  style={{ fontSize: '13px', color: '#94a3b8', lineHeight: 1.7 }} />
        </div>
      </div>

      {/* ── section body ── */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          subtitle="CAREER PATH"
          title="Experience"
          description="My professional journey and roles in IT support"
        />

        <div className="relative">
          {/* timeline line */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-px h-full">
            <div className="w-full h-full bg-gradient-to-b from-transparent via-blue-500/20 to-transparent rounded-full" />
          </div>

          <div className="space-y-20">
            {experienceData.map((exp, index) => {
              const color    = GLOW_COLORS[index % GLOW_COLORS.length];
              const nodeIcon = NODE_ICONS[index % NODE_ICONS.length];
              const isRight  = index % 2 === 0;

              /* per-experience gallery — customise or pull from exp.gallery */
              const gallery = exp.gallery ?? [
                { emoji: '📄', title: 'Project Screenshot',   desc: 'Work sample from this role.'            },
                { emoji: '📜', title: 'Certificate',          desc: 'Professional certification earned.'     },
                { emoji: '🏆', title: 'Achievement',          desc: 'Award or recognition received.'         },
              ];

              /* per-experience stats — customise or pull from exp.stats */
              const stats = exp.stats ?? [
                { count: 10, label: 'Projects'   },
                { count: 95, label: '% Uptime'   },
                { count: 30, label: '% Improved' },
              ];

              /* per-experience skills — falls back to exp.technologies */
              const skills = exp.skills ?? exp.technologies ?? [];

              /* per-experience progress bars */
              const bars = exp.bars ?? [];

              return (
                <div key={exp.id} className="grid grid-cols-1 md:grid-cols-[1fr_60px_1fr] gap-0">

                  {/* ── left slot ── */}
                  {isRight ? (
                    <ExperienceCard
                      exp={exp} index={index} color={color}
                      gallery={gallery} stats={stats} skills={skills} bars={bars}
                      cardRefs={cardRefs}
                      openLightbox={openLightbox}
                      style={{ gridColumn: 1 }}
                    />
                  ) : (
                    <div />
                  )}

                  {/* ── timeline node ── */}
                  <div className="hidden md:flex flex-col items-center">
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.15, type: 'spring', stiffness: 200 }}
                      className="relative mt-7 flex-shrink-0"
                    >
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-xl border-2 relative z-10"
                        style={{
                          background:   `linear-gradient(135deg,${color}20,${color}08)`,
                          borderColor:  color + '50',
                          boxShadow:    `0 0 20px ${color}25`,
                        }}
                      >
                        {nodeIcon}
                      </div>
                      <motion.div
                        animate={{ scale: [1, 1.8, 1], opacity: [0.3, 0, 0.3] }}
                        transition={{ duration: 2.5, repeat: Infinity }}
                        className="absolute inset-0 rounded-full"
                        style={{ background: `radial-gradient(circle,${color}40,transparent)` }}
                      />
                    </motion.div>
                    <div className="flex-1 w-px mt-2" style={{ background: `linear-gradient(180deg,${color}30,transparent)` }} />
                  </div>

                  {/* ── right slot ── */}
                  {!isRight ? (
                    <ExperienceCard
                      exp={exp} index={index} color={color}
                      gallery={gallery} stats={stats} skills={skills} bars={bars}
                      cardRefs={cardRefs}
                      openLightbox={openLightbox}
                      style={{ gridColumn: 3 }}
                    />
                  ) : (
                    <div />
                  )}

                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* float-up keyframe */}
      <style>{`
        @keyframes float-up {
          0%   { transform: translateY(0)    translateX(0);  opacity: 0;   }
          20%  { opacity: 1; }
          80%  { opacity: 0.4; }
          100% { transform: translateY(-100vh) translateX(30px); opacity: 0; }
        }
      `}</style>
    </section>
  );
};

/* ─────────────────────────────────────────
   Sub-component: ExperienceCard
───────────────────────────────────────── */
const ExperienceCard = ({
  exp, index, color,
  gallery, stats, skills, bars,
  cardRefs, openLightbox, style,
}) => (
  <div
    ref={(el) => (cardRefs.current[index] = el)}
    style={{
      opacity: 0, transform: 'translateY(40px)',
      transition: 'opacity 0.7s cubic-bezier(0.22,1,0.36,1), transform 0.7s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s ease, border-color 0.3s ease',
      transitionDelay: `${index * 0.1}s`,
      background:   'rgba(255,255,255,0.03)',
      border:       '0.5px solid rgba(255,255,255,0.1)',
      borderRadius: '20px', padding: '28px',
      cursor: 'pointer', position: 'relative', overflow: 'hidden',
      ...style,
    }}
  >
    {/* top gradient accent */}
    <div style={{
      position:   'absolute', top: 0, left: '24px', right: '24px',
      height:     '1px',
      background: `linear-gradient(90deg,transparent,${color}60,transparent)`,
    }} />

    {/* header */}
    <div className="flex items-start gap-4 mb-4">
      <div className="flex-shrink-0 w-11 h-11 rounded-xl flex items-center justify-content-center"
        style={{ background: `linear-gradient(135deg,${color}25,${color}08)`, border: `0.5px solid ${color}30`, display:'flex', alignItems:'center', justifyContent:'center' }}>
        <span style={{ fontSize: '20px' }}>
          {index === 0 ? '☁' : index === 1 ? '⚡' : '⚙'}
        </span>
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="text-white font-bold text-base leading-tight mb-1">{exp.position}</h3>
        <p className="text-sm font-medium" style={{ color }}>{exp.company}</p>
      </div>
      {exp.isCurrentRole && (
        <span className="flex-shrink-0 text-xs font-semibold px-2.5 py-1 rounded-full"
          style={{ background: `${color}15`, color, border: `0.5px solid ${color}30` }}>
          Current
        </span>
      )}
    </div>

    {/* meta */}
    <div className="flex flex-wrap gap-x-5 gap-y-1 mb-4">
      {exp.duration && (
        <span className="flex items-center gap-1.5 text-xs text-slate-400">
          <span style={{ color }}>📅</span> {exp.duration}
        </span>
      )}
      {exp.location && (
        <span className="flex items-center gap-1.5 text-xs text-slate-400">
          <span style={{ color }}>📍</span> {exp.location}
        </span>
      )}
    </div>

    {/* stats */}
    <div className="grid grid-cols-3 gap-2 mb-4">
      {stats.map((s, i) => (
        <div key={i} className="text-center rounded-xl py-2 px-1"
          style={{ background: 'rgba(255,255,255,0.03)', border: '0.5px solid rgba(255,255,255,0.06)' }}>
          <div className="text-lg font-bold leading-none mb-1" style={{ color }} data-count={s.count}>0</div>
          <div className="text-xs text-slate-500" style={{ fontSize: '10px', letterSpacing: '0.5px' }}>{s.label}</div>
        </div>
      ))}
    </div>

    {/* progress bars */}
    {bars.map((b, i) => (
      <div key={i} className="mb-3">
        <div className="flex justify-between mb-1">
          <span className="text-xs text-slate-400">{b.label}</span>
          <span className="text-xs font-semibold" style={{ color }}>{b.value}%</span>
        </div>
        <div className="h-0.5 rounded-full" style={{ background: 'rgba(255,255,255,0.06)' }}>
          <div className="h-full rounded-full" data-width={b.value}
            style={{ width: '0%', background: `linear-gradient(90deg,${color},${color}80)`, transition: 'width 1.2s cubic-bezier(0.22,1,0.36,1)' }} />
        </div>
      </div>
    ))}

    {/* description bullets */}
    {exp.description?.length > 0 && (
      <ul className="space-y-2 mb-4">
        {exp.description.map((d, i) => (
          <li key={i} className="flex gap-2.5 text-xs text-slate-300 leading-relaxed">
            <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: color }} />
            {d}
          </li>
        ))}
      </ul>
    )}

    {/* skills */}
    {skills.length > 0 && (
      <div className="flex flex-wrap gap-1.5 mb-4">
        {skills.map((sk) => (
          <span key={sk} className="text-xs px-2.5 py-1 rounded-full"
            style={{ color, background: `${color}10`, border: `0.5px solid ${color}25` }}>
            {sk}
          </span>
        ))}
      </div>
    )}

    {/* gallery */}
    {gallery.length > 0 && (
      <>
        <p className="text-xs uppercase tracking-widest text-slate-500 mb-2">Work Samples</p>
        <div className="grid grid-cols-3 gap-2">
          {gallery.map((g, i) => (
            <div
              key={i}
              onClick={(e) => { e.stopPropagation(); openLightbox(g.emoji, g.title, g.desc); }}
              className="relative rounded-xl overflow-hidden cursor-pointer group"
              style={{
                aspectRatio: '16/10',
                background:  `linear-gradient(135deg,${color}15,${color}05)`,
                border:      `0.5px solid rgba(255,255,255,0.08)`,
              }}
            >
              <div className="w-full h-full flex items-center justify-center text-2xl
                              transition-transform duration-500 group-hover:scale-110">
                {g.emoji}
              </div>
              <div className="absolute inset-0 flex items-center justify-center opacity-0
                              group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `${color}40`, backdropFilter: 'blur(2px)' }}>
                <span className="text-white text-sm">🔍</span>
              </div>
            </div>
          ))}
        </div>
      </>
    )}
  </div>
);