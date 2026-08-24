// ExperienceSection.tsx
import React, { useEffect, useRef, useState, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'framer-motion';
import { experienceData } from '../../data';
import { SectionHeading } from '../ui/SectionHeading/SectionHeading';

/* ─── interfaces ─── */
interface GalleryItem {
  emoji?: string;
  img?: string | null;
  imgs?: string[];
  title: string;
  desc: string;
}
interface StatItem { count: number; label: string; }
interface BarItem  { label: string; value: number; }
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
  accent: string; accent2: string; glow: string;
  border: string; bg: string; text: string;
  icon?: string; node?: string;
}
interface LightboxState {
  open: boolean;
  imgs: string[];
  singleSrc: string | null;
  emoji: string;
  title: string;
  desc: string;
}

/* ─── themes ─── */
const THEMES: Theme[] = [
  { accent:'#a100ff', accent2:'#3b82f6', glow:'rgba(161,0,255,0.15)',  border:'rgba(161,0,255,0.3)',  bg:'rgba(161,0,255,0.04)',  text:'#d8b4fe', icon:'/Logos/accenture-logo.svg', node:'⚡' },
  { accent:'#3b82f6', accent2:'#6366f1', glow:'rgba(59,130,246,0.1)',  border:'rgba(59,130,246,0.2)',  bg:'rgba(59,130,246,0.03)',  text:'#93c5fd', icon:'/Logos/ttec-logo.svg', node:'☁' },
  { accent:'#14b8a6', accent2:'#3b82f6', glow:'rgba(20,184,166,0.1)',  border:'rgba(20,184,166,0.2)',  bg:'rgba(20,184,166,0.03)',  text:'#5eead4', node:'⚙️' },
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
   ArrowBtn
══════════════════════════════════════ */
const ArrowBtn: React.FC<{
  dir: 'left' | 'right';
  disabled: boolean;
  onClick: (e: React.MouseEvent) => void;
  size?: number;
}> = ({ dir, disabled, onClick, size = 36 }) => (
  <button
    onClick={onClick}
    disabled={disabled}
    style={{
      position: 'absolute',
      [dir]: 10,
      top: '50%',
      transform: 'translateY(-50%)',
      width: size, height: size, borderRadius: '50%',
      background: disabled ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.7)',
      border: '1px solid rgba(255,255,255,0.2)',
      color: disabled ? 'rgba(255,255,255,0.2)' : '#fff',
      fontSize: size * 0.55,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      cursor: disabled ? 'default' : 'pointer',
      transition: 'background .2s',
      zIndex: 10,
      pointerEvents: disabled ? 'none' : 'auto',
      lineHeight: 1,
    }}
    onMouseEnter={(e) => { if (!disabled) e.currentTarget.style.background = 'rgba(0,0,0,0.92)'; }}
    onMouseLeave={(e) => { e.currentTarget.style.background = disabled ? 'rgba(0,0,0,0.3)' : 'rgba(0,0,0,0.7)'; }}
  >
    {dir === 'left' ? '‹' : '›'}
  </button>
);

/* ══════════════════════════════════════
   LightboxCarousel — swipable inside the lightbox
══════════════════════════════════════ */
const LightboxCarousel: React.FC<{ imgs: string[]; title: string }> = ({ imgs, title }) => {
  const [cur, setCur] = useState(0);
  const [delta, setDelta] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startX = useRef<number | null>(null);

  const clamp = (n: number) => Math.max(0, Math.min(imgs.length - 1, n));
  const goTo  = (n: number) => { setCur(clamp(n)); setDelta(0); };

  const onTouchStart = (e: React.TouchEvent) => { startX.current = e.touches[0].clientX; setDragging(true); };
  const onTouchMove  = (e: React.TouchEvent) => { if (startX.current === null) return; setDelta(e.touches[0].clientX - startX.current); };
  const onTouchEnd   = () => { if (Math.abs(delta) > 40) goTo(cur + (delta < 0 ? 1 : -1)); else setDelta(0); startX.current = null; setDragging(false); };
  const onMouseDown  = (e: React.MouseEvent) => { startX.current = e.clientX; setDragging(true); };
  const onMouseMove  = (e: React.MouseEvent) => { if (!dragging || startX.current === null) return; setDelta(e.clientX - startX.current); };
  const onMouseUp    = () => { if (Math.abs(delta) > 40) goTo(cur + (delta < 0 ? 1 : -1)); else setDelta(0); startX.current = null; setDragging(false); };

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === 'ArrowLeft') goTo(cur - 1); if (e.key === 'ArrowRight') goTo(cur + 1); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [cur]);

  return (
    <div style={{ width: '100%', userSelect: 'none', WebkitUserSelect: 'none' }}>
      {/* slide frame */}
      <div
        style={{
          position: 'relative', overflow: 'hidden', borderRadius: 12,
          border: '0.5px solid rgba(255,255,255,0.1)',
          cursor: dragging ? 'grabbing' : 'grab',
          touchAction: 'pan-y pinch-zoom',
          background: '#06101e',
          marginBottom: 14,
        }}
        onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseUp}
      >
        {/* track */}
        <div style={{
          display: 'flex',
          transform: `translateX(calc(${-cur * 100}% + ${delta}px))`,
          transition: dragging ? 'none' : 'transform 0.35s cubic-bezier(0.22,1,0.36,1)',
          willChange: 'transform',
        }}>
          {imgs.map((src, i) => (
            <div key={i} style={{
              flexShrink: 0, width: '100%', minHeight: 200,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              padding: '12px',
              boxSizing: 'border-box',
            }}>
              <img
                src={src}
                alt={`${title} ${i + 1}`}
                draggable={false}
                style={{
                  maxWidth: '100%', maxHeight: '52vw', minHeight: 160,
                  objectFit: 'contain', display: 'block',
                  pointerEvents: 'none', borderRadius: 8,
                }}
              />
            </div>
          ))}
        </div>

        {/* counter */}
        <div style={{
          position: 'absolute', top: 10, left: 10, zIndex: 5,
          background: 'rgba(0,0,0,0.65)', borderRadius: 6, padding: '3px 10px',
          fontSize: 11, color: 'rgba(255,255,255,0.85)', fontWeight: 600,
          pointerEvents: 'none',
        }}>
          {cur + 1} / {imgs.length}
        </div>

        {/* arrows */}
        <ArrowBtn dir="left"  disabled={cur === 0}               onClick={(e) => { e.stopPropagation(); goTo(cur - 1); }} />
        <ArrowBtn dir="right" disabled={cur === imgs.length - 1} onClick={(e) => { e.stopPropagation(); goTo(cur + 1); }} />
      </div>

      {/* dots */}
      <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 6, marginBottom: 6 }}>
        {imgs.map((_, i) => (
          <button key={i} onClick={() => goTo(i)} style={{
            width: i === cur ? 20 : 7, height: 7, borderRadius: 4,
            border: 'none', padding: 0,
            background: i === cur ? '#3b82f6' : 'rgba(255,255,255,0.22)',
            cursor: 'pointer',
            transition: 'width 0.28s cubic-bezier(0.22,1,0.36,1), background 0.28s',
          }} />
        ))}
      </div>

      <p style={{ textAlign: 'center', fontSize: 10, color: 'rgba(255,255,255,0.22)', marginTop: 4, letterSpacing: '1.5px' }}>
        SWIPE · ARROW KEYS · TAP DOTS
      </p>
    </div>
  );
};

/* ══════════════════════════════════════
   Lightbox portal
══════════════════════════════════════ */
const Lightbox: React.FC<{ state: LightboxState; onClose: () => void }> = ({ state, onClose }) => {
  useEffect(() => {
    if (!state.open) return;
    const h = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [state.open, onClose]);

  if (!state.open) return null;

  const isMulti = state.imgs.length > 1;

  return createPortal(
    <div
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        background: 'rgba(0,0,0,0.93)', backdropFilter: 'blur(16px)',
        padding: '16px', boxSizing: 'border-box',
        animation: 'lb-in 0.2s ease forwards',
      }}
    >
      <style>{`
        @keyframes lb-in  { from { opacity:0 } to { opacity:1 } }
        @keyframes lb-up  { from { opacity:0; transform:scale(0.92) translateY(20px) } to { opacity:1; transform:scale(1) translateY(0) } }
        @media (max-width:600px) { .lb-box { padding:14px 12px !important; border-radius:16px !important; } }
      `}</style>

      <div className="lb-box" style={{
        background: '#08101e',
        border: '0.5px solid rgba(255,255,255,0.13)',
        borderRadius: 22, padding: '22px',
        maxWidth: isMulti ? 740 : 620,
        width: '96%', maxHeight: '92vh', overflowY: 'auto',
        position: 'relative', fontFamily: 'inherit',
        animation: 'lb-up 0.32s cubic-bezier(0.22,1,0.36,1) forwards',
        boxSizing: 'border-box',
      }}>
        {/* close */}
        <button onClick={onClose} style={{
          position: 'absolute', top: 14, right: 14,
          width: 32, height: 32, borderRadius: '50%',
          background: 'rgba(255,255,255,0.07)',
          border: '0.5px solid rgba(255,255,255,0.14)',
          color: 'rgba(255,255,255,0.55)', fontSize: 15,
          cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
          transition: 'all .2s', zIndex: 2,
        }}
          onMouseEnter={(e) => { e.currentTarget.style.background='rgba(255,255,255,0.16)'; e.currentTarget.style.color='#fff'; }}
          onMouseLeave={(e) => { e.currentTarget.style.background='rgba(255,255,255,0.07)'; e.currentTarget.style.color='rgba(255,255,255,0.55)'; }}
        >✕</button>

        {/* content */}
        {isMulti ? (
          <LightboxCarousel imgs={state.imgs} title={state.title} />
        ) : state.singleSrc ? (
          <div style={{
            width: '100%', borderRadius: 12, marginBottom: 16,
            border: '0.5px solid rgba(255,255,255,0.08)',
            background: '#06101e', display: 'flex',
            alignItems: 'center', justifyContent: 'center',
            minHeight: 180, overflow: 'hidden',
          }}>
            <img
              src={state.singleSrc}
              alt={state.title}
              style={{ maxWidth: '100%', maxHeight: '55vw', objectFit: 'contain', borderRadius: 10, display: 'block' }}
              onError={(e) => {
                const wrap = (e.target as HTMLImageElement).parentElement!;
                wrap.innerHTML = state.emoji || '📄';
                wrap.style.fontSize = '72px';
              }}
            />
          </div>
        ) : (
          <div style={{
            width: '100%', minHeight: 180, borderRadius: 12, marginBottom: 16,
            border: '0.5px solid rgba(255,255,255,0.08)',
            background: 'linear-gradient(135deg,#0a0f1a,#141c2e)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 72,
          }}>
            {state.emoji}
          </div>
        )}

        <div style={{ fontSize: 17, fontWeight: 600, color: '#fff', marginBottom: 6, paddingRight: 36 }}>{state.title}</div>
        <div style={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>{state.desc}</div>
      </div>
    </div>,
    document.body
  );
};

/* ══════════════════════════════════════
   GalleryCarousel — card-level gallery (3 items)
   Shows a static thumbnail for each item.
   Multi-image items show first photo + photo count badge.
   Clicking any item opens the lightbox.
══════════════════════════════════════ */
interface GalleryCarouselProps {
  gallery: GalleryItem[];
  t: Theme;
  openLightbox: (item: GalleryItem) => void;
}

const GalleryCarousel: React.FC<GalleryCarouselProps> = ({ gallery, t, openLightbox }) => {
  const [idx, setIdx] = useState(0);
  const [delta, setDelta] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startX = useRef<number | null>(null);
  const isMulti = gallery.length > 1;

  const clamp = (n: number) => Math.max(0, Math.min(gallery.length - 1, n));
  const goTo = useCallback((n: number) => { setIdx(clamp(n)); setDelta(0); }, [gallery.length]);

  const onTouchStart = (e: React.TouchEvent) => { if (!isMulti) return; startX.current = e.touches[0].clientX; setDragging(true); };
  const onTouchMove  = (e: React.TouchEvent) => { if (!isMulti || startX.current === null) return; setDelta(e.touches[0].clientX - startX.current); };
  const onTouchEnd   = () => { if (!isMulti) return; if (Math.abs(delta) > 40) goTo(idx + (delta < 0 ? 1 : -1)); else setDelta(0); startX.current = null; setDragging(false); };
  const onMouseDown  = (e: React.MouseEvent) => { if (!isMulti) return; startX.current = e.clientX; setDragging(true); };
  const onMouseMove  = (e: React.MouseEvent) => { if (!isMulti || !dragging || startX.current === null) return; setDelta(e.clientX - startX.current); };
  const onMouseUp    = () => { if (!isMulti) return; if (Math.abs(delta) > 40) goTo(idx + (delta < 0 ? 1 : -1)); else setDelta(0); startX.current = null; setDragging(false); };

  return (
    <div>
      <p style={{ fontSize: '9px', letterSpacing: '3px', textTransform: 'uppercase', color: 'rgba(255,255,255,0.22)', marginBottom: 8 }}>
        Work Samples &amp; Certificates
      </p>

      {/* outer clip + swipe container */}
      <div
        style={{
          position: 'relative', borderRadius: 14, overflow: 'hidden',
          border: '0.5px solid rgba(255,255,255,0.08)',
          cursor: isMulti ? (dragging ? 'grabbing' : 'grab') : 'pointer',
          userSelect: 'none', WebkitUserSelect: 'none',
          touchAction: 'pan-y pinch-zoom',
        }}
        onTouchStart={onTouchStart} onTouchMove={onTouchMove} onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={onMouseUp} onMouseLeave={onMouseUp}
      >
        {/* sliding track */}
        <div style={{
          display: 'flex',
          transform: `translateX(calc(${-idx * 100}% + ${delta}px))`,
          transition: dragging ? 'none' : 'transform 0.35s cubic-bezier(0.22,1,0.36,1)',
          willChange: 'transform',
        }}>
          {gallery.map((g, i) => {
            /* resolve thumbnail: multi-img → first image, single img → that img, else emoji */
            const thumbSrc = g.imgs && g.imgs.length > 0 ? g.imgs[0] : (g.img ?? null);
            const photoCount = g.imgs ? g.imgs.length : null;

            return (
              <div
                key={i}
                onClick={() => { if (Math.abs(delta) < 6) openLightbox(g); }}
                style={{
                  flexShrink: 0, width: '100%', aspectRatio: '16/9',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  background: `linear-gradient(135deg,${t.glow},${t.bg})`,
                  overflow: 'hidden', position: 'relative',
                  cursor: 'pointer',
                }}
              >
                {/* thumbnail */}
                {thumbSrc ? (
                  <img
                    src={thumbSrc}
                    alt={g.title}
                    draggable={false}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', pointerEvents: 'none' }}
                  />
                ) : (
                  <span style={{ fontSize: 36, pointerEvents: 'none' }}>{g.emoji}</span>
                )}

                {/* photo count badge for multi-image items */}
                {photoCount && photoCount > 1 && (
                  <div style={{
                    position: 'absolute', top: 8, left: 8,
                    background: 'rgba(0,0,0,0.7)', borderRadius: 6,
                    padding: '3px 8px', fontSize: 10, fontWeight: 600,
                    color: '#fff', display: 'flex', alignItems: 'center', gap: 4,
                    pointerEvents: 'none',
                  }}>
                    🖼 {photoCount}
                  </div>
                )}

                {/* title overlay */}
                <div style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  padding: '20px 12px 10px',
                  background: 'linear-gradient(0deg,rgba(0,0,0,0.75) 0%,transparent 100%)',
                  fontSize: 11, fontWeight: 500, color: 'rgba(255,255,255,0.85)',
                  pointerEvents: 'none',
                }}>
                  {g.title}
                </div>

                {/* expand icon */}
                <div style={{
                  position: 'absolute', top: 8, right: 8,
                  background: 'rgba(0,0,0,0.5)', borderRadius: 6, padding: '3px 7px',
                  fontSize: 11, color: 'rgba(255,255,255,0.6)', pointerEvents: 'none',
                }}>
                  {photoCount && photoCount > 1 ? '⛶' : '🔍'}
                </div>
              </div>
            );
          })}
        </div>

        {/* left / right arrows for the outer gallery (between the 3 items) */}
        {isMulti && (
          <>
            <ArrowBtn dir="left"  disabled={idx === 0}               size={30} onClick={(e) => { e.stopPropagation(); goTo(idx - 1); }} />
            <ArrowBtn dir="right" disabled={idx === gallery.length - 1} size={30} onClick={(e) => { e.stopPropagation(); goTo(idx + 1); }} />
          </>
        )}
      </div>

      {/* dots */}
      {isMulti && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 6, marginTop: 10 }}>
          {gallery.map((_, i) => (
            <button key={i} onClick={() => goTo(i)} style={{
              width: i === idx ? 18 : 6, height: 6, borderRadius: 3,
              border: 'none', padding: 0,
              background: i === idx ? t.accent : 'rgba(255,255,255,0.18)',
              cursor: 'pointer',
              transition: 'width 0.28s cubic-bezier(0.22,1,0.36,1), background 0.28s',
            }} />
          ))}
        </div>
      )}
    </div>
  );
};

/* ══════════════════════════════════════
   ExperienceSection
══════════════════════════════════════ */
export const ExperienceSection = () => {
  const rowRefs = useRef<(HTMLDivElement | null)[]>([]);

  const [lightbox, setLightbox] = useState<LightboxState>({
    open: false, imgs: [], singleSrc: null, emoji: '', title: '', desc: '',
  });

  const openLightbox = useCallback((item: GalleryItem) => {
    const isMulti = !!(item.imgs && item.imgs.length > 1);
    setLightbox({
      open:      true,
      imgs:      isMulti ? item.imgs! : [],
      singleSrc: isMulti ? null : (item.img ?? null),
      emoji:     item.emoji ?? '📄',
      title:     item.title,
      desc:      item.desc,
    });
  }, []);

  const closeLightbox = useCallback(() => {
    setLightbox((prev) => ({ ...prev, open: false }));
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];

    rowRefs.current.forEach((row, i) => {
      if (!row) return;
      const t = getTheme(i);

      const io = new IntersectionObserver(([entry]) => {
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
      }, { threshold: 0.1 });
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

  return (
    <section id="experience" className="relative py-24 overflow-hidden">
      <style>{`
        @keyframes exp-node-ping {
          0%   { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(2.4); opacity: 0; }
        }
        .exp-inner-card {
          transition: transform .35s cubic-bezier(.22,1,.36,1),
                      border-color .3s ease, box-shadow .3s ease;
        }
      `}</style>

      {/* grid bg */}
      <div className="pointer-events-none absolute inset-0" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.01) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,0.01) 1px,transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      {/* particles */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width:  `${Math.random() * 2 + 1}px`,
            height: `${Math.random() * 2 + 1}px`,
            left:   `${Math.random() * 100}%`,
            bottom: '-4px', borderRadius: '50%', background: '#fff',
            opacity: Math.random() * 0.12 + 0.03,
            animation: `float-up ${Math.random() * 14 + 10}s ${Math.random() * 8}s linear infinite`,
          }} />
        ))}
        <style>{`
          @keyframes float-up {
            0%   { transform:translateY(0) translateX(0); opacity:0; }
            15%  { opacity:1; }
            85%  { opacity:0.3; }
            100% { transform:translateY(-100vh) translateX(25px); opacity:0; }
          }
        `}</style>
      </div>

      {/* lightbox */}
      <Lightbox state={lightbox} onClose={closeLightbox} />

      {/* body */}
      <div className="relative max-w-6xl mx-auto px-3 sm:px-6 lg:px-8">
        <div style={{ marginBottom: '60px' }}>
          <SectionHeading subtitle="CAREER PATH" title="Experience" description="My professional journey" />
        </div>

        <div className="relative">
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 w-px h-full pointer-events-none"
            style={{ background: 'linear-gradient(180deg,transparent,rgba(59,130,246,0.15) 12%,rgba(59,130,246,0.15) 88%,transparent)' }} />

          <div className="space-y-20">
            {experienceData.map((exp: ExperienceItem, index) => {
              const t      = getTheme(index);
              const isLeft = index % 2 === 0;
              const gallery = exp.gallery ?? [
                { emoji: '📄', title: 'Work Sample',  desc: 'A key deliverable from this role.' },
                { emoji: '📜', title: 'Certificate',  desc: 'Professional certification earned.' },
                { emoji: '🏆', title: 'Achievement',  desc: 'Award or recognition received.' },
              ];
              const stats  = exp.stats  ?? [{ count:10, label:'Projects' }, { count:95, label:'% Uptime' }, { count:30, label:'% Improved' }];
              const bars   = exp.bars   ?? [];
              const skills = exp.skills ?? exp.technologies ?? [];

              return (
                <div
                  key={exp.id}
                  ref={(el) => { rowRefs.current[index] = el; }}
                  className="grid grid-cols-1 md:grid-cols-[1fr_80px_1fr]"
                  style={{
                    opacity: 0, transform: 'translateY(48px)',
                    transition: `opacity .75s cubic-bezier(.22,1,.36,1) ${index * 0.12}s,
                                 transform .75s cubic-bezier(.22,1,.36,1) ${index * 0.12}s`,
                  }}
                >
                  {isLeft
                    ? <ExperienceCard exp={exp} t={t} gallery={gallery} stats={stats} bars={bars} skills={skills} openLightbox={openLightbox} col={1} />
                    : <div />}

                  {/* node */}
                  <div className="hidden md:flex flex-col items-center">
                    <motion.div className="relative flex-shrink-0 mt-6"
                      initial={{ scale:0, opacity:0 }}
                      whileInView={{ scale:1, opacity:1 }}
                      viewport={{ once:true }}
                      transition={{ delay: index * 0.15, type:'spring', stiffness:200 }}
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

          <motion.div className="flex flex-col items-center mt-16"
            initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }}
            viewport={{ once:true }} transition={{ delay:0.3 }}
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
  exp: ExperienceItem; t: Theme; gallery: GalleryItem[];
  stats: StatItem[]; bars: BarItem[]; skills: string[];
  openLightbox: (item: GalleryItem) => void;
  col: number;
}

const ExperienceCard: React.FC<ExperienceCardProps> = ({ exp, t, gallery, stats, bars, skills, openLightbox, col }) => (
  <div style={{ gridColumn: col, padding: '4px' }}>
    <div className="exp-inner-card" style={{
      background: 'rgba(255,255,255,0.028)', border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: '22px', padding: '26px 24px', position: 'relative', overflow: 'hidden',
    }}>
      <div style={{ position:'absolute', top:0, left:'10%', right:'10%', height:1, background:`linear-gradient(90deg,transparent,${t.accent}65,transparent)` }} />

      {/* header */}
      <div style={{ display:'flex', alignItems:'flex-start', gap:14, marginBottom:16 }}>
        <div style={{ width:46, height:46, borderRadius:'50%', flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center', fontSize:22, background:`linear-gradient(135deg,${t.glow},${t.bg})`, border:`0.5px solid ${t.border}` }}>
          {t.icon ? <img src={t.icon} alt="logo" style={{ width:'100%', height:'100%', objectFit:'contain', padding:6, borderRadius:'50%' }} /> : t.node}
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
            <span key={sk} style={{ padding:'4px 11px', borderRadius:30, fontSize:11, fontWeight:500, color:t.text, background:`${t.accent}0a`, border:`0.5px solid ${t.border}`, letterSpacing:'0.3px' }}>
              {sk}
            </span>
          ))}
        </div>
      )}

      {/* gallery */}
      {gallery.length > 0 && (
        <GalleryCarousel gallery={gallery} t={t} openLightbox={openLightbox} />
      )}
    </div>
  </div>
);
