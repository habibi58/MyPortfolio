import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import './LoadingScreen.css';

interface LoadingScreenProps {
  onFinished: () => void;
}

const LETTERS = ['J', 'A', 'S', 'O', 'N'];
const TOTAL_DURATION = 3200; // total loading time in ms

export default function LoadingScreen({ onFinished }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [lettersRevealed, setLettersRevealed] = useState<boolean[]>(
    LETTERS.map(() => false),
  );
  const [subtitleRevealed, setSubtitleRevealed] = useState(false);
  const [lineActive, setLineActive] = useState(false);
  const [cornersRevealed, setCornersRevealed] = useState(false);
  const [progressTextRevealed, setProgressTextRevealed] = useState(false);
  const [exiting, setExiting] = useState(false);

  const startExit = useCallback(() => {
    setExiting(true);
    setTimeout(() => {
      onFinished();
    }, 1200); // matches ls-exit animation duration
  }, [onFinished]);

  useEffect(() => {
    // Lock scroll during loading
    document.body.style.overflow = 'hidden';

    // ── 1. Letter reveal stagger ──
    const letterTimers: ReturnType<typeof setTimeout>[] = [];
    LETTERS.forEach((_, i) => {
      letterTimers.push(
        setTimeout(() => {
          setLettersRevealed((prev) => {
            const next = [...prev];
            next[i] = true;
            return next;
          });
        }, 300 + i * 150),
      );
    });

    // ── 2. Subtitle + line accent after letters ──
    const subtitleTimer = setTimeout(() => {
      setSubtitleRevealed(true);
      setLineActive(true);
      setCornersRevealed(true);
      setProgressTextRevealed(true);
    }, 300 + LETTERS.length * 150 + 200);

    // ── 3. Progress bar animation ──
    const startTime = Date.now();
    let rafId: number;

    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const pct = Math.min((elapsed / TOTAL_DURATION) * 100, 100);
      setProgress(Math.round(pct));

      if (progressBarRef.current) {
        progressBarRef.current.style.width = `${pct}%`;
      }

      if (pct < 100) {
        rafId = requestAnimationFrame(updateProgress);
      }
    };
    rafId = requestAnimationFrame(updateProgress);

    // ── 4. GSAP subtle float animation on letters ──
    const gsapCtx = gsap.context(() => {
      // We'll start this after letters are revealed
      setTimeout(() => {
        gsap.to('.ls-letter.revealed', {
          y: -6,
          duration: 1.8,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          stagger: {
            each: 0.15,
            from: 'center',
          },
        });
      }, 300 + LETTERS.length * 150 + 400);
    }, containerRef);

    // ── 5. Trigger exit ──
    const exitTimer = setTimeout(() => {
      startExit();
    }, TOTAL_DURATION + 300);

    return () => {
      letterTimers.forEach(clearTimeout);
      clearTimeout(subtitleTimer);
      clearTimeout(exitTimer);
      cancelAnimationFrame(rafId);
      gsapCtx.revert();
      document.body.style.overflow = '';
    };
  }, [startExit]);

  // Restore scroll when exiting
  useEffect(() => {
    if (exiting) {
      document.body.style.overflow = '';
    }
  }, [exiting]);

  return (
    <div
      ref={containerRef}
      className={`loading-screen${exiting ? ' exit' : ''}`}
    >
      {/* Floating particles */}
      <div className="ls-particles">
        {Array.from({ length: 10 }).map((_, i) => (
          <div key={i} className="ls-particle" />
        ))}
      </div>

      {/* Corner decorations */}
      <div className={`ls-corner ls-corner--tl${cornersRevealed ? ' revealed' : ''}`} />
      <div className={`ls-corner ls-corner--tr${cornersRevealed ? ' revealed' : ''}`} />
      <div className={`ls-corner ls-corner--bl${cornersRevealed ? ' revealed' : ''}`} />
      <div className={`ls-corner ls-corner--br${cornersRevealed ? ' revealed' : ''}`} />

      {/* Name */}
      <div className="ls-name-container">
        {LETTERS.map((letter, i) => (
          <span
            key={i}
            className={`ls-letter${lettersRevealed[i] ? ' revealed' : ''}`}
            style={{ transitionDelay: `${i * 60}ms` }}
          >
            {letter}
          </span>
        ))}
        <div className={`ls-line-accent${lineActive ? ' active' : ''}`} />
      </div>

      {/* Subtitle */}
      <div className={`ls-subtitle${subtitleRevealed ? ' revealed' : ''}`}>
        IT Support Professional
      </div>

      {/* Progress bar */}
      <div className="ls-progress-container">
        <div ref={progressBarRef} className="ls-progress-bar" />
      </div>

      {/* Progress text */}
      <div className={`ls-progress-text${progressTextRevealed ? ' revealed' : ''}`}>
        {progress}%
      </div>
    </div>
  );
}
