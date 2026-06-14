import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import './LoadingScreen.css';

interface LoadingScreenProps {
  onFinished: () => void;
}

const GREETING = "Hi, I'm";
const FIRST_NAME = ['M', 'O', 'H', 'A', 'M', 'A', 'D'];
const MIDDLE_NAME = ['J', 'A', 'S', 'O', 'N'];
const LAST_NAME = ['C', 'E', 'L', 'O', 'Z', 'A'];
const ALL_LETTERS = [...FIRST_NAME, ...MIDDLE_NAME, ...LAST_NAME];
const SUBTITLE = 'Welcome To My Portfolio';
const TOTAL_DURATION = 5000;

export default function LoadingScreen({ onFinished }: LoadingScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [greetingRevealed, setGreetingRevealed] = useState(false);
  const [lettersRevealed, setLettersRevealed] = useState<boolean[]>(
    ALL_LETTERS.map(() => false),
  );
  const [subtitleRevealed, setSubtitleRevealed] = useState(false);
  const [cornersRevealed, setCornersRevealed] = useState(false);
  const [progressTextRevealed, setProgressTextRevealed] = useState(false);
  const [exiting, setExiting] = useState(false);

  const startExit = useCallback(() => {
    setExiting(true);
    // Match CSS exit animation duration (2800ms)
    setTimeout(() => {
      onFinished();
    }, 2800);
  }, [onFinished]);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const greetingTimer = setTimeout(() => {
      setGreetingRevealed(true);
    }, 200);

    const letterTimers: ReturnType<typeof setTimeout>[] = [];
    ALL_LETTERS.forEach((_, i) => {
      letterTimers.push(
        setTimeout(() => {
          setLettersRevealed((prev) => {
            const next = [...prev];
            next[i] = true;
            return next;
          });
        }, 400 + i * 180),
      );
    });

    const afterLetters = 400 + ALL_LETTERS.length * 180 + 300;

    const subtitleTimer = setTimeout(() => {
      setSubtitleRevealed(true);
      setCornersRevealed(true);
      setProgressTextRevealed(true);
    }, afterLetters);

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

    const gsapCtx = gsap.context(() => {
      setTimeout(() => {
        gsap.to('.ls-letter.revealed', {
          y: -6,
          duration: 1.8,
          ease: 'sine.inOut',
          yoyo: true,
          repeat: -1,
          stagger: { each: 0.15, from: 'center' },
        });
      }, afterLetters + 200);
    }, containerRef);

    const exitTimer = setTimeout(() => {
      startExit();
    }, TOTAL_DURATION + 300);

    return () => {
      clearTimeout(greetingTimer);
      letterTimers.forEach(clearTimeout);
      clearTimeout(subtitleTimer);
      clearTimeout(exitTimer);
      cancelAnimationFrame(rafId);
      gsapCtx.revert();
      document.body.style.overflow = '';
    };
  }, [startExit]);

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
      <div className="ls-particles">
        {Array.from({ length: 80 }).map((_, i) => (
          <div key={i} className="ls-particle" />
        ))}
      </div>

      <div className={`ls-corner ls-corner--tl${cornersRevealed ? ' revealed' : ''}`} />
      <div className={`ls-corner ls-corner--tr${cornersRevealed ? ' revealed' : ''}`} />
      <div className={`ls-corner ls-corner--bl${cornersRevealed ? ' revealed' : ''}`} />
      <div className={`ls-corner ls-corner--br${cornersRevealed ? ' revealed' : ''}`} />

      <div className={`ls-greeting${greetingRevealed ? ' revealed' : ''}`}>
        {GREETING}
      </div>

      {/* Name sections wrapper for mobile layout */}
      <div className="ls-name-wrapper">
        {/* First name: MOHAMAD */}
        <div className="ls-name-container ls-first-name">
          {FIRST_NAME.map((letter, i) => (
            <span
              key={i}
              className={`ls-letter${lettersRevealed[i] ? ' revealed' : ''}`}
              style={{ transitionDelay: `${i * 60}ms` }}
            >
              {letter}
            </span>
          ))}
        </div>

        {/* Middle name: JASON - hidden on desktop, shown on mobile */}
        <div className="ls-name-container ls-middle-name">
          {MIDDLE_NAME.map((letter, i) => {
            const globalIndex = FIRST_NAME.length + i;
            return (
              <span
                key={globalIndex}
                className={`ls-letter${lettersRevealed[globalIndex] ? ' revealed' : ''}`}
                style={{ transitionDelay: `${globalIndex * 60}ms` }}
              >
                {letter}
              </span>
            );
          })}
        </div>

        {/* Last name: CELOZA */}
        <div className="ls-last-name-container">
          {LAST_NAME.map((letter, i) => {
            const globalIndex = FIRST_NAME.length + MIDDLE_NAME.length + i;
            return (
              <span
                key={i}
                className={`ls-letter ls-letter--last${lettersRevealed[globalIndex] ? ' revealed' : ''}`}
                style={{ transitionDelay: `${globalIndex * 60}ms` }}
              >
                {letter}
              </span>
            );
          })}
        </div>
      </div>

      <div className={`ls-subtitle${subtitleRevealed ? ' revealed' : ''}`}>
        {SUBTITLE}
      </div>

      <div className="ls-progress-container">
        <div ref={progressBarRef} className="ls-progress-bar" />
      </div>

      <div className={`ls-progress-text${progressTextRevealed ? ' revealed' : ''}`}>
        {progress}%
      </div>
    </div>
  );
}
