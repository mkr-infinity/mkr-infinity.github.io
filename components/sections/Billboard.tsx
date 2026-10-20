'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { PROFILE, SUBTITLES } from '@/lib/data';
import { live } from '@/lib/store';
import { playTo, scrollToId } from '@/components/ui/SmoothScroll';

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Real-Time Elastic Thread Signature:
 * Each letter behaves like a physical elastic thread being pulled / stretched
 * by the cursor in real time with tension physics and spring return.
 */
function ElasticThreadLetter({
  char,
  mouse,
  isHovering,
}: {
  char: string;
  mouse: { x: number; y: number } | null;
  isHovering: boolean;
}) {
  const spanRef = useRef<HTMLSpanElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!isHovering || !mouse || !spanRef.current) {
      setOffset({ x: 0, y: 0 });
      return;
    }

    const rect = spanRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const dx = mouse.x - cx;
    const dy = mouse.y - cy;
    const dist = Math.hypot(dx, dy);
    const radius = 240;

    if (dist < radius) {
      // Elastic thread pull physics: pulls toward cursor with progressive tension
      const force = Math.pow(1 - dist / radius, 1.25);
      const pullX = dx * force * 0.48;
      const pullY = dy * force * 0.48;
      setOffset({ x: pullX, y: pullY });
    } else {
      setOffset({ x: 0, y: 0 });
    }
  }, [mouse, isHovering]);

  return (
    <motion.span
      ref={spanRef}
      className="elastic-thread-letter"
      animate={{
        x: offset.x,
        y: offset.y,
        rotate: offset.x * 0.12,
        scale: isHovering && (offset.x !== 0 || offset.y !== 0) ? 1.06 : 1,
      }}
      transition={{
        type: 'spring',
        stiffness: 300,
        damping: 18,
        mass: 0.4,
      }}
      style={{ display: 'inline-block', willChange: 'transform' }}
    >
      {char === ' ' ? '\u00A0' : char}
    </motion.span>
  );
}

function ElasticThreadSignature() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mouse, setMouse] = useState<{ x: number; y: number } | null>(null);
  const [isHovering, setIsHovering] = useState(false);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    setMouse({ x: e.clientX, y: e.clientY });
    setIsHovering(true);
  };

  const handlePointerLeave = () => {
    setMouse(null);
    setIsHovering(false);
  };

  const words = ['Mohammad', 'Kaif', 'Raja'];

  return (
    <div
      ref={containerRef}
      className={`he-signature-deck ${isHovering ? 'is-thread-active' : ''}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      data-hot
    >
      <h2 className="he-signature-title">
        {words.map((w, wi) => (
          <span key={w} className={`sig-word-block sig-word-${wi}`}>
            {Array.from(w).map((char, ci) => (
              <ElasticThreadLetter
                key={`${w}-${ci}`}
                char={char}
                mouse={mouse}
                isHovering={isHovering}
              />
            ))}
            {wi < words.length - 1 && <span className="sig-space">&nbsp;</span>}
          </span>
        ))}
      </h2>
      <div className="sig-calligraphy-stroke" aria-hidden />
    </div>
  );
}
function InteractiveWord({
  word,
  highlight = false,
  className = '',
}: {
  word: string;
  highlight?: boolean;
  className?: string;
}) {
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handlePointerMove = (e: React.PointerEvent<HTMLSpanElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    const radius = 55;

    if (dist < radius) {
      const factor = (radius - dist) / radius;
      setIsHovered(true);
      setOffset({
        x: -Math.sign(dx) * Math.min(16, Math.abs(dx) * factor * 0.9),
        y: -Math.sign(dy) * Math.min(12, Math.abs(dy) * factor * 0.9) - 3,
      });
    }
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
    setOffset({ x: 0, y: 0 });
  };

  return (
    <motion.span
      className={`interactive-word ${className} ${highlight ? 'highlight-glow' : ''} ${isHovered ? 'hovered' : ''}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      animate={{
        x: offset.x,
        y: offset.y,
        scale: isHovered ? 1.05 : 1,
      }}
      transition={{ type: 'spring', stiffness: 420, damping: 24 }}
    >
      {word}
    </motion.span>
  );
}

export default function Billboard({ ready }: { ready: boolean }) {
  const [p, setP] = useState(0);
  const [istTime, setIstTime] = useState('');
  const last = useRef(-1);

  // Live IST Clock Micro-Widget (Suggestion 4)
  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const timeStr = now.toLocaleTimeString('en-IN', {
          timeZone: 'Asia/Kolkata',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true,
        }).toUpperCase();
        setIstTime(timeStr);
      } catch {
        const now = new Date();
        setIstTime(now.toLocaleTimeString());
      }
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    let raf = 0;
    const tick = () => {
      const v = live.hero;
      if (Math.abs(v - last.current) > 0.001) {
        last.current = v;
        setP(v);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  const lines = SUBTITLES.filter((s) => !s.sfx);
  const sub = lines.find((s) => p >= s.from && p < s.to);
  const showStory = p >= 0.14 && p < 0.80;
  const end = p >= 0.85;

  // Smooth lag-free fade on scroll: fades from 1 down to 0 as p approaches 0.12
  const introOpacity = Math.max(0, 1 - p * 8.5);
  const introTranslateY = -p * 50;
  const isIntroVisible = introOpacity > 0.01;

  const bioSummary =
    "100% self-taught since 2016. Breaking systems, understanding them, and rebuilding better versions.";

  return (
    <section className="hero" id="billboard">
      <div className="hero-sticky">
        <div className="hero-shade" />

        {/* Clean, Structured Hero Screen with Optical Vertical Centering — Strict Left Half so it NEVER overlaps character */}
        {ready && isIntroVisible && (
          <div
            className="hero-clean-container"
            style={{
              opacity: introOpacity,
              transform: `translate3d(0, ${introTranslateY}px, 0)`,
              pointerEvents: introOpacity > 0.2 ? 'auto' : 'none',
            }}
          >
            {/* Heroic Name Highlight:
                Line 1: Hi, I'm
                Line 2: MOHAMMAD KAIF RAJA (Main Highlight)
                Line 3: an open-source builder.
            */}
            <motion.div
              className="hero-headline-stack"
              initial={{ opacity: 0, y: 22 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.85, ease: EASE }}
            >
              <div className="hero-salutation-line">
                <InteractiveWord word="Hi," className="salutation-word" />
                <InteractiveWord word="I’m" className="salutation-word" />
              </div>

              <h1 className="hero-heroic-name">
                <InteractiveWord word="MOHAMMAD" highlight className="hero-name-token" />
                <InteractiveWord word="KAIF" highlight className="hero-name-token" />
                <InteractiveWord word="RAJA" highlight className="hero-name-token" />
              </h1>

              <div className="hero-role-subline">
                <InteractiveWord word="an" className="role-word" />
                <InteractiveWord word="open-source" highlight className="hero-role-accent" />
                <InteractiveWord word="builder." highlight className="hero-role-accent" />
              </div>
            </motion.div>

            {/* Clean Bio Text (No badge/grid, plain clean sentence, NO magnetic text following) */}
            <motion.div
              className="hero-bio-container"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35, duration: 0.75, ease: EASE }}
            >
              <p className="hero-clean-bio">
                <span className="bio-clean-highlight">100% self-taught</span> since 2016. Breaking systems, understanding them, and rebuilding better versions.
              </p>
            </motion.div>

            {/* Structured Luxury Capsule Action Buttons */}
            <motion.div
              className="hero-actions-dock"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8, ease: EASE }}
            >
              {/* Button 1: Play The Scene (Modern Luxury Capsule Primary) */}
              <button
                className="hero-capsule-btn btn-dock-primary"
                onClick={() => {
                  const el = document.getElementById('billboard')!;
                  playTo(el.offsetTop + el.offsetHeight - window.innerHeight, 10);
                }}
                title="Initialize cinematic scrub sequence"
              >
                <span className="capsule-btn-glow" aria-hidden />
                <span className="capsule-icon-bubble primary">
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </span>
                <div className="capsule-btn-text">
                  <span className="capsule-title">PLAY THE SCENE</span>
                  <span className="capsule-sub">CHAPTER I · INITIALIZE</span>
                </div>
                <span className="capsule-chevron">»</span>
              </button>

              {/* Button 2: Skip To Missions (Modern Luxury Frosted Glass Capsule) */}
              <button
                className="hero-capsule-btn btn-dock-secondary"
                onClick={() => scrollToId('projects')}
                title="Jump straight to all 9 missions"
              >
                <span className="capsule-icon-bubble secondary">
                  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.4">
                    <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </span>
                <div className="capsule-btn-text">
                  <span className="capsule-title">SKIP TO MISSIONS</span>
                  <span className="capsule-sub">9 VERIFIED SYSTEMS</span>
                </div>
              </button>
            </motion.div>

            {/* Subtle Scroll Cue */}
            <motion.div
              className="hi-cue"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.7 }}
              transition={{ delay: 0.65, duration: 0.8 }}
            >
              <span>Scroll to play</span>
              <span className="hi-dot">·</span>
              <span>scroll up to rewind</span>
            </motion.div>
          </div>
        )}

        {/* The story, told on the left in authentic manga anime lettering */}
        <div className="story">
          <AnimatePresence mode="wait">
            {showStory && sub && !end && (
              <motion.div
                key={sub.text}
                className="story-line"
                initial="h"
                animate="s"
                exit="x"
              >
                <motion.span
                  className="story-no"
                  variants={{
                    h: { opacity: 0, x: -20 },
                    s: { opacity: 1, x: 0 },
                    x: { opacity: 0 },
                  }}
                  transition={{ duration: 0.5 }}
                >
                  {String(lines.indexOf(sub) + 1).padStart(2, '0')} <i /> {String(lines.length).padStart(2, '0')}
                </motion.span>
                <p className="story-text">
                  {sub.text.split(' ').map((w, i) => (
                    <span className="sw" key={i}>
                      <motion.span
                        variants={{
                          h: { y: '115%', rotate: 6, opacity: 0 },
                          s: { y: '0%', rotate: 0, opacity: 1, transition: { delay: i * 0.06, duration: 0.7, ease: EASE } },
                          x: { y: '-60%', opacity: 0, filter: 'blur(6px)', transition: { duration: 0.3, delay: i * 0.02 } },
                        }}
                      >
                        {w}
                      </motion.span>{' '}
                    </span>
                  ))}
                </p>
                <motion.i
                  className="story-brush"
                  variants={{
                    h: { scaleX: 0 },
                    s: { scaleX: 1, transition: { delay: 0.25, duration: 0.9, ease: EASE } },
                    x: { opacity: 0 },
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Chapter I End Card - Writes FULL NAME: MOHAMMAD KAIF RAJA */}
        <AnimatePresence>
          {end && !showStory && (
            <motion.div
              className="hero-end"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <p className="he-tag">CHAPTER I — INITIALIZED</p>

              {/* Bespoke Signature Lettering with Real-Time Elastic Thread Physics */}
              <ElasticThreadSignature />

              <i className="he-slash" />
              <p className="he-sub">
                Self-Taught System Builder — scroll down to explore origin.
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="hero-progress">
          <i style={{ transform: `scaleY(${p})` }} />
        </div>
      </div>
    </section>
  );
}
