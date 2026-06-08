// MobileSkillsScroll.tsx
// Infinite horizontal scroll strip — mobile only (≤767px).
// Momentum physics: swipe velocity is captured on lift and decays smoothly
// back to the base auto-scroll speed. No jarring snap or pause.

import { useRef, useEffect, useCallback } from 'react';
import {
  Wrench, Download, Network, Headphones,
} from 'lucide-react';
import { ClaudeCode, Antigravity, Cursor, Windsurf, Microsoft, Github } from '@lobehub/icons';

/* ── Styles — scoped, mobile-only ── */
const STYLES = `
  .mss-outer {
    display: none;
  }
  @media (max-width: 767px) {
    .mss-outer {
      display: block;
      overflow: hidden;
      width: 100%;
      position: relative;
    }

    .mss-track {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: max-content;
      will-change: transform;
      padding: 8px 0;
      cursor: grab;
      user-select: none;
      -webkit-user-select: none;
      /* pan-y: vertical page scroll still works, we capture horizontal */
      touch-action: pan-y;
    }

    .mss-track.is-dragging {
      cursor: grabbing;
    }

    .mss-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      width: 76px;
      min-width: 76px;
      margin-right: 20px;
      flex-shrink: 0;
    }

    .mss-box {
      width: 52px;
      height: 52px;
      border-radius: 14px;
      background: rgba(0, 0, 0, 0.55);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      box-shadow: inset 0 1px 0 rgba(255, 255, 255, 0.05);
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 8px;
      flex-shrink: 0;
      -webkit-tap-highlight-color: transparent;
    }

    .mss-box svg  { width: 28px; height: 28px; }
    .mss-box img  { width: 30px; height: 30px; object-fit: contain; }

    .mss-label {
      font-size: 10px;
      font-weight: 700;
      color: #cbd5e1;
      text-align: center;
      line-height: 1.3;
      width: 76px;
      white-space: normal;
      word-break: break-word;
    }

    .mss-row          { margin-bottom: 16px; }
    .mss-row:last-child { margin-bottom: 0; }
  }
`;

/* ── Item definitions ── */
const ROW1 = [
  { label: 'Technical Support',    icon: <Wrench    style={{ width: 28, height: 28, color: '#60a5fa' }} /> },
  { label: 'Software Install',     icon: <Download  style={{ width: 28, height: 28, color: '#60a5fa' }} /> },
  { label: 'Networking Basics',    icon: <Network   style={{ width: 28, height: 28, color: '#60a5fa' }} /> },
  { label: 'Windows OS',           icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/windows8/windows8-original.svg"       alt="Windows"  style={{ width: 30, height: 30 }} /> },
  { label: 'Microsoft Office',     icon: <Microsoft.Color size={32} /> },
  { label: 'Customer Service',     icon: <Headphones style={{ width: 28, height: 28, color: '#60a5fa' }} /> },
  { label: 'Claude Code',          icon: <ClaudeCode.Color size={32} /> },
  { label: 'Cursor AI',            icon: <Cursor.Avatar size={30} /> },
  { label: 'Windsurf',             icon: <Windsurf.Avatar size={30} /> },
  { label: 'Antigravity',          icon: <Antigravity.Color size={32} /> },
  { label: 'VS Code',              icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg"            alt="VS Code"  style={{ width: 30, height: 30 }} /> },
  { label: 'GitHub',               icon: <Github size={32} /> },
];

const ROW2 = [
  { label: 'HTML',         icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg"            alt="HTML"       style={{ width: 30, height: 30 }} /> },
  { label: 'CSS',          icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg"              alt="CSS"        style={{ width: 30, height: 30 }} /> },
  { label: 'JavaScript',   icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg"  alt="JS"         style={{ width: 30, height: 30 }} /> },
  { label: 'React.js',     icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"            alt="React"      style={{ width: 30, height: 30 }} /> },
  { label: 'Vite',         icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg"          alt="Vite"       style={{ width: 30, height: 30 }} /> },
  { label: 'PHP',          icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg"                alt="PHP"        style={{ width: 30, height: 30 }} /> },
  { label: 'MySQL',        icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg"            alt="MySQL"      style={{ width: 30, height: 30 }} /> },
  { label: 'C#',           icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg"          alt="C#"         style={{ width: 30, height: 30 }} /> },
  { label: 'VB.NET',       icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/visualbasic/visualbasic-original.svg" alt="VB.NET"   style={{ width: 30, height: 30 }} /> },
  { label: 'Tailwind CSS', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" alt="Tailwind" style={{ width: 30, height: 30 }} /> },
  { label: 'TypeScript',   icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"  alt="TS"         style={{ width: 30, height: 30 }} /> },
];

/* ─────────────────────────────────────────────────────────────────────────────
   Physics constants
   ──────────────────────────────────────────────────────────────────────────── */
const FRICTION      = 0.92;   // velocity multiplied each frame during coast (0–1)
const MIN_COAST_VEL = 0.15;   // below this |velocity| we consider coast finished
const MAX_VELOCITY  = 30;     // cap so an insane flick doesn't fly off screen

/* ─────────────────────────────────────────────────────────────────────────────
   ScrollRow
   ──────────────────────────────────────────────────────────────────────────── */
function ScrollRow({ items, speed, reverse = false }: {
  items: typeof ROW1;
  speed: number;
  reverse?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);

  /* position & physics — all refs so RAF never needs re-registration */
  const posRef          = useRef(0);      // current translateX (px)
  const velRef          = useRef(0);      // momentum velocity (px/frame), signed
  const coastingRef     = useRef(false);  // true while momentum decay is active
  const draggingRef     = useRef(false);  // true while finger is down
  const lastTouchXRef   = useRef(0);
  const lastTouchTRef   = useRef(0);      // timestamp of last touchmove (for velocity)
  const rawVelRef       = useRef(0);      // instantaneous px/ms during drag

  /* ── RAF loop ── */
  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    let rafId: number;

    const autoStep = reverse ? speed : -speed; // base step per frame

    const tick = () => {
      const sectionW = el.scrollWidth / 3; // tripled list → 1 section = scrollWidth/3

      if (draggingRef.current) {
        /* finger down — position written directly by touchMove, nothing to add */
      } else if (coastingRef.current) {
        /* momentum decay: move by velRef, bleed toward autoStep */
        const target = autoStep;                   // where we want velRef to settle
        velRef.current += (target - velRef.current) * 0.04; // ease toward auto speed
        velRef.current *= FRICTION;

        posRef.current += velRef.current;

        /* done coasting when velocity is close enough to the natural auto speed */
        if (Math.abs(velRef.current - target) < MIN_COAST_VEL &&
            Math.abs(velRef.current) < Math.abs(autoStep) + MIN_COAST_VEL) {
          velRef.current = autoStep;
          coastingRef.current = false;
        }
      } else {
        /* normal auto-scroll */
        posRef.current += autoStep;
      }

      /* seamless loop wrap */
      if (!reverse && posRef.current <= -sectionW)  posRef.current += sectionW;
      if ( reverse && posRef.current >=  0)          posRef.current -= sectionW;

      el.style.transform = `translateX(${posRef.current}px)`;
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ── Touch handlers ── */
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    draggingRef.current   = true;
    coastingRef.current   = false;          // cancel any in-progress coast
    velRef.current        = 0;
    rawVelRef.current     = 0;
    lastTouchXRef.current = e.touches[0].clientX;
    lastTouchTRef.current = e.timeStamp;

    trackRef.current?.classList.add('is-dragging');
  }, []);

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!draggingRef.current) return;

    const clientX = e.touches[0].clientX;
    const dt      = e.timeStamp - lastTouchTRef.current;
    const dx      = clientX - lastTouchXRef.current;

    /* running velocity in px/ms, smoothed with EMA to reduce jitter */
    if (dt > 0) {
      const instant = dx / dt;
      rawVelRef.current = rawVelRef.current * 0.6 + instant * 0.4;
    }

    lastTouchXRef.current = clientX;
    lastTouchTRef.current = e.timeStamp;

    posRef.current += dx;

    /* wrap guard after large drag */
    const el = trackRef.current;
    if (el) {
      const sectionW = el.scrollWidth / 3;
      if (posRef.current < -(sectionW * 2)) posRef.current += sectionW;
      if (posRef.current >  sectionW)        posRef.current -= sectionW;
    }
  }, []);

  const handleTouchEnd = useCallback(() => {
    draggingRef.current = false;
    trackRef.current?.classList.remove('is-dragging');

    /* convert px/ms → px/frame (assuming ~60 fps), clamp, then coast */
    const pxPerFrame = rawVelRef.current * (1000 / 60);
    velRef.current   = Math.max(-MAX_VELOCITY, Math.min(MAX_VELOCITY, pxPerFrame));
    coastingRef.current = true;
  }, []);

  const tripled = [...items, ...items, ...items];

  return (
    <div className="mss-outer mss-row">
      <div
        className="mss-track"
        ref={trackRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      >
        {tripled.map((item, i) => (
          <div className="mss-item" key={i}>
            <div className="mss-box">{item.icon}</div>
            <span className="mss-label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Main export ── */
export const MobileSkillsScroll = () => (
  <>
    <style dangerouslySetInnerHTML={{ __html: STYLES }} />
    <ScrollRow items={ROW1} speed={0.6} />
    <ScrollRow items={ROW2} speed={0.6} reverse />
  </>
);
