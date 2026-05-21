import { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import './LoadingScreen.css';

interface LoadingScreenProps {
  onFinished: () => void;
}

const GREETING = "Hi, I'm";
const FIRST_LETTERS = ['M', 'O', 'H', 'A', 'M', 'A', 'D', ' ', 'J', 'A', 'S', 'O', 'N'];
const LAST_LETTERS = ['C', 'E', 'L', 'O', 'Z', 'A'];
const ALL_LETTERS = [...FIRST_LETTERS, ...LAST_LETTERS];
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
  const [lineActive, setLineActive] = useState(false);
  const [cornersRevealed, setCornersRevealed] = useState(false);
  const [progressTextRevealed, setProgressTextRevealed] = useState(false);
  const [exiting, setExiting] = useState(false);

  const startExit = useCallback(() => {
    setExiting(true);
    setTimeout(() => {
      onFinished();
    }, 1200);
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
      setLineActive(true);
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
        {Array.from({ length: 10 }).map((_, i) => (
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

      {/* First row: MOHAMAD JASON */}
      <div className="ls-name-container">
        {FIRST_LETTERS.map((letter, i) => (
          letter === ' '
            ? <span key={i} className="ls-letter--gap" />
            : <span
                key={i}
                className={`ls-letter${lettersRevealed[i] ? ' revealed' : ''}`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                {letter}
              </span>
        ))}
        <div className={`ls-line-accent${lineActive ? ' active' : ''}`} />
      </div>

      {/* Second row: CELOZA */}
      <div className="ls-last-name-container">
        {LAST_LETTERS.map((letter, i) => {
          const globalIndex = FIRST_LETTERS.length + i;
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