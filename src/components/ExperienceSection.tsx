// Experience Section Component
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { experienceData } from '../data';
import { SectionHeading } from './SectionHeading';

interface GalleryItem {
  emoji?: string;
  img?: string | null;
  title: string;
  desc: string;
}

interface StatItem {
  count: number;
  label: string;
}

interface BarItem {
  label: string;
  value: number;
}

interface ExperienceItem {
  id: number;
  position: string;
  company: string;
  duration: string;
  location: string;
  isCurrentRole: boolean;
  description: string[];
  technologies?: string[];
  skills?: string[];
  stats?: StatItem[];
  bars?: BarItem[];
  gallery?: GalleryItem[];
}

interface Theme {
  accent: string;
  accent2: string;
  glow: string;
  border: string;
  bg: string;
  text: string;
  icon?: string;
  node?: string;
}

/* ─── colour theme per card index ─── */
const THEMES: Theme[] = [
  {
    accent:   '#3b82f6',
    accent2:  '#6366f1',
    glow:     'rgba(59, 130, 246, 0.1)',
    border:   'rgba(59, 130, 246, 0.2)',
    bg:       'rgba(59, 130, 246, 0.03)',
    text:     '#93c5fd',
    icon:     '/Logos/ttec-logo.svg',
    node:     '☁',
  },
  {
    accent:   '#8b5cf6',
    accent2:  '#ec4899',
    glow:     'rgba(139, 92, 246, 0.1)',
    border:   'rgba(139, 92, 246, 0.2)',
    bg:       'rgba(139, 92, 246, 0.03)',
    text:     '#c4b5fd',
    node:     '⚡',
  },
  {
    accent:   '#14b8a6',
    accent2:  '#3b82f6',
    glow:     'rgba(20, 184, 166, 0.1)',
    border:   'rgba(20, 184, 166, 0.2)',
    bg:       'rgba(20, 184, 166, 0.03)',
    text:     '#5eead4',
    node:     '⚙️',
  },
];

const getTheme = (i: number): Theme => THEMES[i % THEMES.length];

function animateCount(el: HTMLElement, target: number) {
  let cur = 0;
  const step = target / 45;
  const id = setInterval(() => {
    cur = Math.min(cur + step, target);
    el.textContent = String(Math.round(cur));
    if (cur >= target) clearInterval(id);
  }, 28);
}

/* ══════════════════════════════════════
   ExperienceSection
   ══════════════════════════════════════ */
export const ExperienceSection = () => {
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    rowRefs.current.forEach((row, i) => {
      if (!row) return;
      const t = getTheme(i);

      const io = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          row.style.opacity   = '1';
          row.style.transform = 'translateY(0)';

          row.querySelectorAll('[data-count]').forEach((el) => {
            const htmlEl = el as HTMLElement;
            if (htmlEl.dataset.count) animateCount(htmlEl, parseInt(htmlEl.dataset.count, 10));
          });
          row.querySelectorAll('[data-w]').forEach((el) => {
            const htmlEl = el as HTMLElement;
            setTimeout(() => { if (htmlEl.dataset.w) htmlEl.style.width = htmlEl.dataset.w + '%'; }, 300);
          });
          io.disconnect();
        },
        { threshold: 0.1 }
      );
      io.observe(row);
      observers.push(io);

      const card = row.querySelector('.exp-inner-card') as HTMLElement;
      if (card) {
        card.addEventListener('mouseenter', () => {
          card.style.boxShadow   = `0 0 0 1px ${t.border}, 0 24px 60px ${t.glow}, 0 8px 32px rgba(0,0,0,0.5)`;
          card.style.borderColor = t.border;
          card.style.transform   = 'translateY(-6px)';
        });
        card.addEventListener('mouseleave', () => {
          card.style.boxShadow   = 'none';
          card.style.borderColor = 'rgba(255,255,255,0.07)';
          card.style.transform   = 'translateY(0)';
        });
      }
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  /* ── lightbox ── */
  const openLightbox = (imgSrc: string | null, emoji: string, title: string, desc: string) => {
    const lb      = document.getElementById('exp-lb');
    const preview = document.getElementById('exp-lb-img');
    if (!lb || !preview) return;

    if (imgSrc) {
      // Clear first, then create img via DOM API (safer than innerHTML on mobile)
      preview.innerHTML = '';
      preview.style.background    = 'linear-gradient(135deg,#0a0f1a,#141c2e)';
      preview.style.display       = 'flex';
      preview.style.alignItems    = 'center';
      preview.style.justifyContent = 'center';

      const img = document.createElement('img');
      img.alt   = title;
      img.style.cssText = 'max-width:100%;height:auto;object-fit:contain;border-radius:10px;display:block;margin:0 auto;';
      img.onerror = () => {
        // Image failed — show emoji fallback
        preview.innerHTML  = emoji || '📄';
        preview.style.fontSize = '72px';
      };
      img.src = imgSrc; // set src AFTER onerror so handler is registered first
      preview.appendChild(img);
    } else {
      preview.innerHTML            = emoji;
      preview.style.fontSize       = '72px';
      preview.style.display        = 'flex';
      preview.style.alignItems     = 'center';
      preview.style.justifyContent = 'center';
      preview.style.background     = 'linear-gradient(135deg,#0a0f1a,#141c2e)';
      preview.style.minHeight      = '180px';
    }

    const titleEl = document.getElementById('exp-lb-title');
    const descEl  = document.getElementById('exp-lb-desc');
    if (titleEl) titleEl.textContent = title;
    if (descEl)  descEl.textContent  = desc;

    lb.style.opacity       = '1';
    lb.style.pointerEvents = 'all';
    const box = lb.querySelector('.exp-lb-box') as HTMLElement;
    if (box) box.style.transform = 'scale(1) translateY(0)';
  };

  const closeLightbox = () => {
    const lb = document.getElementById('exp-lb');
    if (!lb) return;
    lb.style.opacity       = '0';
    lb.style.pointerEvents = 'none';
    const box = lb.querySelector('.exp-lb-box') as HTMLElement;
    if (box) box.style.transform = 'scale(0.9) translateY(20px)';
  };

  return (
    <section id="experience" className="relative py-24 overflow-hidden">

      <style>{`
        @keyframes exp-node-ping {
          0%   { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        @keyframes exp-live-blink {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.25; }
        }
        .exp-inner-card {
          transition: transform .35s cubic-bezier(.22,1,.36,1),
                      border-color .3s ease,
                      box-shadow .3s ease;
        }
        .exp-gal-item:hover .exp-gal-thumb { transform: scale(1.1); }
        .exp-gal-item:hover .exp-gal-over  { opacity: 1 !important; }

        /* ── Lightbox mobile fixes ── */
        .exp-lb-box {
          box-sizing: border-box;
        }
        #exp-lb-img {
          /* Let the image size itself naturally — no fixed aspect ratio that collapses */
          min-height: 120px;
          max-height: 55vw;
          width: 100%;
          border-radius: 14px;
          margin-bottom: 16px;
          border: 0.5px solid rgba(255,255,255,0.08);
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        @media (max-width: 767px) {
          .exp-lb-box {
            padding: 18px 14px !important;
            border-radius: 16px !important;
            width: 96% !important;
            max-height: 90vh;
            overflow-y: auto;
          }
          #exp-lb-img {
            min-height: 200px;
            max-height: 65vw;
          }
          #exp-lb-img img {
            max-width: 100% !important;
            max-height: 62vw !important;
            width: auto !important;
            height: auto !important;
            object-fit: contain !important;
          }
          #exp-lb-title {
            font-size: 14px !important;
          }
          #exp-lb-desc {
            font-size: 12px !important;
          }
        }
      `}</style>

      {/* subtle grid */}
      <div className="pointer-events-none absolute inset-0"
        style={{ backgroundImage:'linear-gradient(rgba(255,255,255,0.01) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.01) 1px,transparent 1px)', backgroundSize:'60px 60px' }} />

      {/* floating particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} style={{
            position:'absolute',
            width:`${Math.random() * 2 + 1}px`,
            height:`${Math.random() * 2 + 1}px`,
            left:`${Math.random() * 100}%`,
            bottom:'-4px',
            borderRadius:'50%',
            background:'#fff',
            opacity:Math.random() * 0.12 + 0.03,
            animation:`float-up ${Math.random() * 14 + 10}s ${Math.random() * 8}s linear infinite`,
          }} />
        ))}
        <style>{`
          @keyframes float-up {
            0%   { transform:translateY(0) translateX(0);   opacity:0; }
            15%  { opacity:1; }
            85%  { opacity:0.3; }
            100% { transform:translateY(-100vh) translateX(25px); opacity:0; }
          }
        `}</style>
      </div>

      {/* ── LIGHTBOX ── */}
      <div
        id="exp-lb"
        onClick={(e) => e.target === e.currentTarget && closeLightbox()}
        style={{
          position:'fixed', inset:0, zIndex:9999,
          display:'flex', alignItems:'center', justifyContent:'center',
          background:'rgba(0,0,0,0.92)', backdropFilter:'blur(14px)',
          opacity:0, pointerEvents:'none',
          transition:'opacity .3s ease',
          padding: '16px',
          boxSizing: 'border-box',
        }}
      >
        <div className="exp-lb-box" style={{
          background:   '#08101e',
          border:       '0.5px solid rgba(255,255,255,0.12)',
          borderRadius: '22px',
          padding:      '20px',
          maxWidth:     '620px',
          width:        '92%',
          maxHeight:    '90vh',
          overflowY:    'auto',
          position:     'relative',
          transform:    'scale(0.9) translateY(20px)',
          transition:   'transform .4s cubic-bezier(.22,1,.36,1)',
          fontFamily:   'inherit',
        }}>
          <button
            onClick={closeLightbox}
            style={{
              position:'absolute', top:14, right:14,
              width:32, height:32, borderRadius:'50%',
              background:'rgba(255,255,255,0.06)',
              border:'0.5px solid rgba(255,255,255,0.12)',
              color:'rgba(255,255,255,0.5)', fontSize:15,
              cursor:'pointer', display:'flex',
              alignItems:'center', justifyContent:'center',
              transition:'all .2s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.background='rgba(255,255,255,0.14)'; e.currentTarget.style.color='#fff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.background='rgba(255,255,255,0.06)'; e.currentTarget.style.color='rgba(255,255,255,0.5)'; }}
          >✕</button>

          <div id="exp-lb-img" />
          <div id="exp-lb-title" style={{ fontSize:17, fontWeight:600, color:'#fff', marginBottom:6 }} />
          <div id="exp-lb-desc"  style={{ fontSize:13, color:'rgba(255,255,255,0.5)', lineHeight:1.7 }} />
        </div>
      </div>

      {/* ── SECTION BODY ── */}
      <div className="relative max-w-6xl mx-auto px-3 sm:px-4 sm:px-6 lg:px-8">
        <div style={{ marginBottom:'60px' }}>
          <SectionHeading
            subtitle="CAREER PATH"
            title="Experience"
            description="My professional journey"
          />
        </div>

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-px h-full pointer-events-none"
            style={{ background:'linear-gradient(180deg,transparent,rgba(59,130,246,0.15) 12%,rgba(59,130,246,0.15) 88%,transparent)' }} />

          <div className="space-y-20">
            {experienceData.map((exp: ExperienceItem, index) => {
              const t      = getTheme(index);
              const isLeft = index % 2 === 0;
              const gallery = exp.gallery ?? [
                { emoji:'📄', title:'Work Sample',  desc:'A key deliverable from this role.' },
                { emoji:'📜', title:'Certificate',  desc:'Professional certification earned.' },
                { emoji:'🏆', title:'Achievement',  desc:'Award or recognition received.'    },
              ];
              const stats  = exp.stats ?? [
                { count:10, label:'Projects'   },
                { count:95, label:'% Uptime'   },
                { count:30, label:'% Improved' },
              ];
              const bars   = exp.bars   ?? [];
              const skills = exp.skills ?? exp.technologies ?? [];

              return (
                <div
                  key={exp.id}
                  ref={(el) => { rowRefs.current[index] = el; }}
                  className="grid grid-cols-1 md:grid-cols-[1fr_80px_1fr]"
                  style={{
                    opacity:   0,
                    transform: 'translateY(48px)',
                    transition:`opacity .75s cubic-bezier(.22,1,.36,1) ${index * 0.12}s,
                                transform .75s cubic-bezier(.22,1,.36,1) ${index * 0.12}s`,
                  }}
                >
                  {isLeft
                    ? <ExperienceCard exp={exp} t={t} gallery={gallery} stats={stats} bars={bars} skills={skills} openLightbox={openLightbox} col={1} />
                    : <div />}

                  {/* node */}
                  <div className="hidden md:flex flex-col items-center">
                    <motion.div
                      className="relative flex-shrink-0 mt-6"
                      initial={{ scale:0, opacity:0 }}
                      whileInView={{ scale:1, opacity:1 }}
                      viewport={{ once:true }}
                      transition={{ delay:index * 0.15, type:'spring', stiffness:200 }}
                    >
                      <div style={{
                        width:52, height:52, borderRadius:'50%',
                        display:'flex', alignItems:'center', justifyContent:'center',
                        fontSize:22, position:'relative', zIndex:2,
                        background:`linear-gradient(135deg,${t.glow},${t.bg})`,
                        border:`1.5px solid ${t.border}`,
                        boxShadow:`0 0 24px ${t.glow}`,
                      }}>
                        {t.icon
                          ? <img src={t.icon} alt="logo" style={{ width:'100%', height:'100%', objectFit:'contain', padding:8, borderRadius:'50%' }} />
                          : t.node}
                        <div style={{ position:'absolute', inset:-4, borderRadius:'50%', border:`1px solid ${t.accent}`, opacity:0.35 }} />
                        <div style={{ position:'absolute', inset:0, borderRadius:'50%', background:`radial-gradient(circle,${t.accent}35,transparent)`, animation:'exp-node-ping 2.5s ease-out infinite' }} />
                      </div>
                    </motion.div>
                    <div className="flex-1 w-px mt-2" style={{ background:`linear-gradient(180deg,${t.accent}30,transparent)` }} />
                  </div>

                  {!isLeft
                    ? <ExperienceCard exp={exp} t={t} gallery={gallery} stats={stats} bars={bars} skills={skills} openLightbox={openLightbox} col={3} />
                    : <div />}
                </div>
              );
            })}
          </div>

          <motion.div
            className="flex flex-col items-center mt-16"
            initial={{ opacity:0, y:20 }}
            whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }}
            transition={{ delay:0.3 }}
          >
            <div style={{ width:10, height:10, borderRadius:'50%', background:'linear-gradient(135deg,#3b82f6,#8b5cf6)', boxShadow:'0 0 18px #3b82f640' }} />
            <p style={{ fontSize:10, letterSpacing:3, textTransform:'uppercase', color:'#ffffff', marginTop:12 }}>
              The journey continues
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

/* ══════════════════════════════════════
   ExperienceCard
   ══════════════════════════════════════ */
interface ExperienceCardProps {
  exp: ExperienceItem;
  t: Theme;
  gallery: GalleryItem[];
  stats: StatItem[];
  bars: BarItem[];
  skills: string[];
  openLightbox: (imgSrc: string | null, emoji: string, title: string, desc: string) => void;
  col: number;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ exp, t, gallery, stats, bars, skills, openLightbox, col }) => (
  <div style={{ gridColumn:col, padding:'4px' }}>
    <div
      className="exp-inner-card"
      style={{
        background:   'rgba(255,255,255,0.028)',
        border:       '1px solid rgba(255,255,255,0.07)',
        borderRadius: '22px',
        padding:      '26px 24px',
        position:     'relative',
        overflow:     'hidden',
      }}
    >
      <div style={{ position:'absolute', top:0, left:'10%', right:'10%', height:1, background:`linear-gradient(90deg,transparent,${t.accent}65,transparent)` }} />

      {/* header */}
      <div style={{ display:'flex', alignItems:'flex-start', gap:14, marginBottom:16 }}>
        <div style={{
          width:46, height:46, borderRadius:'50%', flexShrink:0,
          display:'flex', alignItems:'center', justifyContent:'center', fontSize:22,
          background:`linear-gradient(135deg,${t.glow},${t.bg})`,
          border:`0.5px solid ${t.border}`,
        }}>
          {t.icon
            ? <img src={t.icon} alt="logo" style={{ width:'100%', height:'100%', objectFit:'contain', padding:6, borderRadius:'50%' }} />
            : t.node}
        </div>
        <div style={{ flex:1, minWidth:0 }}>
          <div style={{ fontSize:17, fontWeight:700, color:'#fff', letterSpacing:'-0.3px', lineHeight:1.25 }}>{exp.position}</div>
          <div style={{ fontSize:13, fontWeight:500, color:t.accent, marginTop:2 }}>{exp.company}</div>
        </div>
        {exp.isCurrentRole && (
          <div style={{ padding:'4px 12px', borderRadius:30, flexShrink:0, fontSize:10, fontWeight:600, letterSpacing:'1.5px', textTransform:'uppercase', background:`${t.accent}12`, color:t.text, border:`0.5px solid ${t.border}` }}>
            CURRENT
          </div>
        )}
      </div>

      {/* meta */}
      <div style={{ display:'flex', flexWrap:'wrap', gap:'6px 18px', marginBottom:16 }}>
        {exp.duration && <span style={{ display:'flex', alignItems:'center', gap:5, fontSize:12, color:'rgba(255,255,255,0.4)' }}><span>📅</span>{exp.duration}</span>}
        {exp.location && <span style={{ display:'flex', alignItems:'center', gap:5, fontSize:12, color:'rgba(255,255,255,0.4)' }}><span>📍</span>{exp.location}</span>}
      </div>

      {/* stats */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8, marginBottom:16 }}>
        {stats.map((s, i) => (
          <div key={i} style={{ background:'rgba(255,255,255,0.032)', border:'0.5px solid rgba(255,255,255,0.06)', borderRadius:12, padding:'10px 8px', textAlign:'center' }}>
            <div data-count={s.count} style={{ fontSize:22, fontWeight:700, letterSpacing:'-1px', color:t.accent, lineHeight:1 }}>0</div>
            <div style={{ fontSize:'9px', color:'rgba(255,255,255,0.32)', marginTop:3, letterSpacing:'0.8px', textTransform:'uppercase' }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* bars */}
      {bars.map((b, i) => (
        <div key={i} style={{ marginBottom:10 }}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
            <span style={{ fontSize:11, color:'rgba(255,255,255,0.42)' }}>{b.label}</span>
            <span style={{ fontSize:11, fontWeight:600, color:t.accent }}>{b.value}%</span>
          </div>
          <div style={{ height:2, background:'rgba(255,255,255,0.05)', borderRadius:2, overflow:'hidden' }}>
            <div data-w={b.value} style={{ height:'100%', width:'0%', borderRadius:2, background:`linear-gradient(90deg,${t.accent},${t.accent2})`, transition:'width 1.3s cubic-bezier(.22,1,.36,1)' }} />
          </div>
        </div>
      ))}

      {/* bullets */}
      {exp.description?.length > 0 && (
        <ul style={{ listStyle:'none', margin:'14px 0' }}>
          {exp.description.map((d, i) => (
            <li key={i} style={{ display:'flex', gap:8, fontSize:12, color:'rgba(255,255,255,0.52)', lineHeight:1.7, marginBottom:7 }}>
              <span style={{ width:4, height:4, borderRadius:'50%', background:t.accent, flexShrink:0, marginTop:6, display:'block' }} />
              {d}
            </li>
          ))}
        </ul>
      )}

      {/* skill tags */}
      {skills.length > 0 && (
        <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:18 }}>
          {skills.map((sk) => (
            <span key={sk} style={{ padding:'4px 11px', borderRadius:30, fontSize:11, fontWeight:500, color:t.text, background:`${t.accent}0a`, border:`0.5px solid ${t.border}`, letterSpacing:'0.3px' }}>{sk}</span>
          ))}
        </div>
      )}

      {/* gallery */}
      {gallery.length > 0 && (
        <>
          <p style={{ fontSize:'9px', letterSpacing:'3px', textTransform:'uppercase', color:'rgba(255,255,255,0.22)', marginBottom:8 }}>
            Work Samples &amp; Certificates
          </p>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:8 }}>
            {gallery.map((g, i) => (
              <div
                key={i}
                className="exp-gal-item"
                onClick={(e) => { e.stopPropagation(); openLightbox(g.img ?? null, g.emoji ?? '📄', g.title, g.desc); }}
                style={{ aspectRatio:'16/10', borderRadius:12, overflow:'hidden', position:'relative', cursor:'pointer', border:'0.5px solid rgba(255,255,255,0.08)', background:`linear-gradient(135deg,${t.glow},${t.bg})` }}
              >
                <div className="exp-gal-thumb" style={{ width:'100%', height:'100%', display:'flex', alignItems:'center', justifyContent:'center', transition:'transform .5s ease', overflow:'hidden' }}>
                  {g.img
                    ? <img src={g.img} alt={g.title} style={{ width:'100%', height:'100%', objectFit:'cover' }} />
                    : <span style={{ fontSize:26 }}>{g.emoji}</span>}
                </div>
                <div className="exp-gal-over" style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center', background:`${t.accent}40`, backdropFilter:'blur(3px)', opacity:0, transition:'opacity .3s', fontSize:18 }}>🔍</div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  </div>
);
