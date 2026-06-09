// MobileSkillsScroll.tsx
// Infinite horizontal scroll strip for phones.
// Features: auto-scroll, swipe/drag to scroll, pause on touch/click.

import { useRef, useEffect } from 'react';
import {
  Wrench, Download, Network, Headphones,
} from 'lucide-react';
import { ClaudeCode, Antigravity, Cursor, Windsurf, Microsoft, Github } from '@lobehub/icons';

/* ── Styles ── */
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
      cursor: grab;
      user-select: none;
      -webkit-user-select: none;
    }
    .mss-outer:active {
      cursor: grabbing;
    }

    .mss-track {
      display: flex;
      flex-direction: row;
      align-items: center;
      width: max-content;
      will-change: transform;
      padding: 8px 0;
      pointer-events: none;
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
      pointer-events: auto;
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
      transition: transform 0.15s ease, border-color 0.15s ease;
    }

    .mss-item:active .mss-box {
      transform: scale(0.92);
      border-color: rgba(96, 165, 250, 0.4);
    }

    .mss-box svg {
      width: 28px;
      height: 28px;
    }

    .mss-box img {
      width: 30px;
      height: 30px;
      object-fit: contain;
    }

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

    .mss-row {
      margin-bottom: 16px;
    }
    .mss-row:last-child {
      margin-bottom: 0;
    }

    /* Pause indicator dot */
    .mss-paused-hint {
      position: absolute;
      top: 6px;
      right: 10px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: rgba(96, 165, 250, 0.5);
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
    }
    .mss-outer.is-paused .mss-paused-hint {
      opacity: 1;
    }
  }
`;

/* ── Item definitions ── */
const ROW1 = [
  { label: 'Technical Support', icon: <Wrench    style={{ width: 28, height: 28, color: '#60a5fa' }} /> },
  { label: 'Software Install',  icon: <Download  style={{ width: 28, height: 28, color: '#60a5fa' }} /> },
  { label: 'Networking Basics', icon: <Network   style={{ width: 28, height: 28, color: '#60a5fa' }} /> },
  { label: 'Windows OS',        icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/windows8/windows8-original.svg" alt="Windows" style={{ width: 30, height: 30 }} /> },
  { label: 'Microsoft Office',  icon: <Microsoft.Color size={32} /> },
  { label: 'Customer Service',  icon: <Headphones style={{ width: 28, height: 28, color: '#60a5fa' }} /> },
  { label: 'Claude Code',       icon: <ClaudeCode.Color size={32} /> },
  { label: 'Cursor AI',         icon: <Cursor.Avatar size={30} /> },
  { label: 'Windsurf',          icon: <Windsurf.Avatar size={30} /> },
  { label: 'Antigravity',       icon: <Antigravity.Color size={32} /> },
  { label: 'VS Code',           icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" alt="VS Code" style={{ width: 30, height: 30 }} /> },
  { label: 'GitHub',            icon: <Github size={32} /> },
];

const ROW2 = [
  { label: 'HTML',         icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg"            alt="HTML"     style={{ width: 30, height: 30 }} /> },
  { label: 'CSS',          icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg"              alt="CSS"      style={{ width: 30, height: 30 }} /> },
  { label: 'JavaScript',   icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg"  alt="JS"       style={{ width: 30, height: 30 }} /> },
  { label: 'React.js',     icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"            alt="React"    style={{ width: 30, height: 30 }} /> },
  { label: 'Vite',         icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg"          alt="Vite"     style={{ width: 30, height: 30 }} /> },
  { label: 'PHP',          icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg"                alt="PHP"      style={{ width: 30, height: 30 }} /> },
  { label: 'MySQL',        icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg"            alt="MySQL"    style={{ width: 30, height: 30 }} /> },
  { label: 'C#',           icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg"          alt="C#"       style={{ width: 30, height: 30 }} /> },
  { label: 'VB.NET',       icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/visualbasic/visualbasic-original.svg" alt="VB.NET" style={{ width: 30, height: 30 }} /> },
  { label: 'Tailwind CSS', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" alt="Tailwind" style={{ width: 30, height: 30 }} /> },
  { label: 'TypeScript',   icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg"  alt="TS"       style={{ width: 30, height: 30 }} /> },
];

/* ── Scroll hook with swipe + pause ── */
function useScrollRow(
  outerRef: React.RefObject<HTMLDivElement | null>,
  trackRef: React.RefObject<HTMLDivElement | null>,
  speed: number,
  reverse: boolean,
) {
  useEffect(() => {
    const outer = outerRef.current;
    const track = trackRef.current;
    if (!outer || !track) return;

    let x = 0;
    let renderX = 0;
    let rafId: number;
    let paused = false;
    let resumeTimer: ReturnType<typeof setTimeout>;

    let isDragging = false;
    let dragStartX = 0;
    let dragLastX = 0;
    let dragVelocity = 0;
    let lastDragTime = 0;

    // segmentW = width of ONE copy of items (track has 3 copies)
    let segmentW = 0;

    const initSegment = () => {
      segmentW = track.scrollWidth / 3;
      x = -segmentW;       // start in middle copy
      renderX = -segmentW;
    };
    requestAnimationFrame(() => requestAnimationFrame(initSegment));

    // Wrap x so it stays within the middle segment range.
    // Only x is wrapped — renderX NEVER wraps (no visible jump).
    const wrapX = (val: number) => {
      if (segmentW === 0) return val;
      if (val <= -segmentW * 2) return val + segmentW;
      if (val >  -segmentW)     return val - segmentW;
      return val;
    };

    const LERP = 0.14;

    const tick = () => {
      if (!paused && !isDragging) {
        x += reverse ? speed : -speed;
      }

      // Wrap x silently
      const wx = wrapX(x);
      if (wx !== x) {
        // x jumped by one segment — shift renderX by the same amount
        // so lerp never has to cross the wrap boundary visibly
        const diff = wx - x;
        renderX += diff;
        x = wx;
      }

      renderX += (x - renderX) * LERP;
      track.style.transform = `translateX(${renderX}px)`;
      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);

    const pause = (ms = 2000) => {
      paused = true;
      outer.classList.add('is-paused');
      clearTimeout(resumeTimer);
      resumeTimer = setTimeout(() => {
        paused = false;
        outer.classList.remove('is-paused');
      }, ms);
    };

    /* ── Touch events ── */
    const onTouchStart = (e: TouchEvent) => {
      isDragging = true;
      dragStartX = e.touches[0].clientX;
      dragLastX = dragStartX;
      dragVelocity = 0;
      lastDragTime = Date.now();
      clearTimeout(resumeTimer);
      outer.classList.add('is-paused');
    };

    const onTouchMove = (e: TouchEvent) => {
      if (!isDragging) return;
      const now = Date.now();
      const clientX = e.touches[0].clientX;
      const delta = clientX - dragLastX;
      dragVelocity = delta / (now - lastDragTime || 1);
      dragLastX = clientX;
      lastDragTime = now;
      x = wrapX(x + delta);
      renderX = x; // 1:1 finger tracking during drag
    };

    const onTouchEnd = () => {
      isDragging = false;
      const momentum = dragVelocity * 18;
      x = wrapX(x + momentum);
      pause(1800);
    };

    /* ── Mouse events (for desktop testing) ── */
    const onMouseDown = (e: MouseEvent) => {
      isDragging = true;
      dragStartX = e.clientX;
      dragLastX = dragStartX;
      dragVelocity = 0;
      lastDragTime = Date.now();
      clearTimeout(resumeTimer);
      outer.classList.add('is-paused');
    };

    const onMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      const now = Date.now();
      const delta = e.clientX - dragLastX;
      dragVelocity = delta / (now - lastDragTime || 1);
      dragLastX = e.clientX;
      lastDragTime = now;
      x = wrapX(x + delta);
      renderX = x;
    };

    const onMouseUp = () => {
      if (!isDragging) return;
      isDragging = false;
      const momentum = dragVelocity * 18;
      x = wrapX(x + momentum);
      pause(1800);
    };

    /* ── Tap to pause/resume ── */
    const onClick = (e: MouseEvent) => {
      // Only treat as a tap if barely moved
      if (Math.abs((e.clientX) - dragStartX) < 6) {
        pause(3000);
      }
    };

    outer.addEventListener('touchstart', onTouchStart, { passive: true });
    outer.addEventListener('touchmove',  onTouchMove,  { passive: true });
    outer.addEventListener('touchend',   onTouchEnd);
    outer.addEventListener('mousedown',  onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup',   onMouseUp);
    outer.addEventListener('click',      onClick);

    return () => {
      cancelAnimationFrame(rafId);
      clearTimeout(resumeTimer);
      outer.removeEventListener('touchstart', onTouchStart);
      outer.removeEventListener('touchmove',  onTouchMove);
      outer.removeEventListener('touchend',   onTouchEnd);
      outer.removeEventListener('mousedown',  onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup',   onMouseUp);
      outer.removeEventListener('click',      onClick);
    };
  }, [outerRef, trackRef, speed, reverse]);
}

/* ── Single scrolling row ── */
function ScrollRow({ items, speed, reverse = false }: {
  items: typeof ROW1;
  speed: number;
  reverse?: boolean;
}) {
  const outerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  useScrollRow(outerRef, trackRef, speed, reverse);

  const tripled = [...items, ...items, ...items];

  return (
    <div className="mss-outer mss-row" ref={outerRef}>
      <div className="mss-paused-hint" />
      <div className="mss-track" ref={trackRef}>
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
