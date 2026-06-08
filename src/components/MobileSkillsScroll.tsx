// MobileSkillsScroll.tsx
// A simple infinite horizontal scroll strip built for phones.
// Shown only on mobile (≤767px) via CSS — hidden on desktop.
// No dependency on ScrollVelocity or its CSS.

import { useRef, useEffect } from 'react';
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
  }
`;

/* ── Item definitions ── */
const ROW1 = [
  { label: 'Technical Support',    icon: <Wrench    style={{ width: 28, height: 28, color: '#60a5fa' }} /> },
  { label: 'Software Install',     icon: <Download  style={{ width: 28, height: 28, color: '#60a5fa' }} /> },
  { label: 'Networking Basics',    icon: <Network   style={{ width: 28, height: 28, color: '#60a5fa' }} /> },
  { label: 'Windows OS',           icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/windows8/windows8-original.svg" alt="Windows" style={{ width: 30, height: 30 }} /> },
  { label: 'Microsoft Office',     icon: <Microsoft.Color size={32} /> },
  { label: 'Customer Service',     icon: <Headphones style={{ width: 28, height: 28, color: '#60a5fa' }} /> },
  { label: 'Claude Code',          icon: <ClaudeCode.Color size={32} /> },
  { label: 'Cursor AI',            icon: <Cursor.Avatar size={30} /> },
  { label: 'Windsurf',             icon: <Windsurf.Avatar size={30} /> },
  { label: 'Antigravity',          icon: <Antigravity.Color size={32} /> },
  { label: 'VS Code',              icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vscode/vscode-original.svg" alt="VS Code" style={{ width: 30, height: 30 }} /> },
  { label: 'GitHub',               icon: <Github size={32} /> },
];

const ROW2 = [
  { label: 'HTML',         icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/html5/html5-original.svg"         alt="HTML"       style={{ width: 30, height: 30 }} /> },
  { label: 'CSS',          icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/css3/css3-original.svg"           alt="CSS"        style={{ width: 30, height: 30 }} /> },
  { label: 'JavaScript',   icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/javascript/javascript-original.svg" alt="JS"       style={{ width: 30, height: 30 }} /> },
  { label: 'React.js',     icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/react/react-original.svg"         alt="React"      style={{ width: 30, height: 30 }} /> },
  { label: 'Vite',         icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/vitejs/vitejs-original.svg"       alt="Vite"       style={{ width: 30, height: 30 }} /> },
  { label: 'PHP',          icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/php/php-original.svg"             alt="PHP"        style={{ width: 30, height: 30 }} /> },
  { label: 'MySQL',        icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/mysql/mysql-original.svg"         alt="MySQL"      style={{ width: 30, height: 30 }} /> },
  { label: 'C#',           icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/csharp/csharp-original.svg"       alt="C#"         style={{ width: 30, height: 30 }} /> },
  { label: 'VB.NET',       icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/visualbasic/visualbasic-original.svg" alt="VB.NET" style={{ width: 30, height: 30 }} /> },
  { label: 'Tailwind CSS', icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" alt="Tailwind" style={{ width: 30, height: 30 }} /> },
  { label: 'TypeScript',   icon: <img src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/typescript/typescript-original.svg" alt="TS"       style={{ width: 30, height: 30 }} /> },
];

/* ── Infinite scroll hook ── */
function useInfiniteScroll(ref: React.RefObject<HTMLDivElement>, speed: number, reverse = false) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let x = 0;
    let rafId: number;
    const halfWidth = el.scrollWidth / 2;

    const tick = () => {
      x += reverse ? speed : -speed;
      if (!reverse && x <= -halfWidth) x += halfWidth;
      if (reverse  && x >= 0)          x -= halfWidth;
      el.style.transform = `translateX(${x}px)`;
      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, [ref, speed, reverse]);
}

/* ── Single scrolling row ── */
function ScrollRow({ items, speed, reverse }: {
  items: typeof ROW1;
  speed: number;
  reverse?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  useInfiniteScroll(trackRef, speed, reverse);

  // Duplicate items so the loop is seamless
  const doubled = [...items, ...items, ...items];

  return (
    <div className="mss-outer mss-row">
      <div className="mss-track" ref={trackRef}>
        {doubled.map((item, i) => (
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
