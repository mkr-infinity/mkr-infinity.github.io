'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { PROFILE, STATS } from '@/lib/data';
import { live, seg } from '@/lib/store';

/** The gap the character leaps through on his way down. */
export function Flight() {
  return (
    <section className="flight" id="flight" aria-hidden>
      <div className="flight-card">
        <motion.span initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ amount: 0.6 }} transition={{ duration: 0.6 }}>
          CHAPTER II
        </motion.span>
        <motion.b
          initial={{ opacity: 0, letterSpacing: '0.5em', filter: 'blur(10px)' }}
          whileInView={{ opacity: 1, letterSpacing: '0.04em', filter: 'blur(0px)' }}
          viewport={{ amount: 0.6 }}
          transition={{ duration: 1.2 }}
        >
          ORIGIN
        </motion.b>
      </div>
    </section>
  );
}

function useLive() {
  const [v, setV] = useState(0);
  useEffect(() => {
    let raf = 0,
      prev = -1;
    const t = () => {
      const x = live.about;
      if (Math.abs(x - prev) > 0.002) {
        prev = x;
        setV(x);
      }
      raf = requestAnimationFrame(t);
    };
    raf = requestAnimationFrame(t);
    return () => cancelAnimationFrame(raf);
  }, []);
  return v;
}

const step = (p: number, a: number) => ({
  opacity: seg(p, a, a + 0.08),
  transform: `translateY(${(1 - seg(p, a, a + 0.08)) * 30}px)`,
});

const STORY =
  "I started with Android modding in 2016, sparking my drive to understand how systems work at the deepest level. No formal degree — 100% self-taught by experimenting, breaking systems, and rebuilding better versions. Today I build high-impact web tools, automation workflows, and AI-powered products focused on simplicity, speed, and practical real-world usefulness.";

/**
 * Authentic Anime Sharingan Eye:
 * - Blood-red chakra iris with radial striations & deep limbal ring
 * - Sweeping curved tomoe blades orbiting on central chakra ring
 * - Deep void black pupil with glowing pinhole core
 * - Convex corneal glossy highlight arc (glass dome reflection)
 * - Flaming ocular chakra aura
 * - Stat value integrated into sleek HUD pedestal below (eye remains 100% unobstructed)
 */
function SharinganCircle({
  value,
  suffix,
  label,
  k,
  index,
}: {
  value: number;
  suffix: string;
  label: string;
  k: number;
  index: number;
}) {
  const [isHovered, setIsHovered] = useState(false);
  const displayVal = Math.round(value * k);

  return (
    <div
      className={`sharingan-circle-item ${isHovered ? 'hovered' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      title={`${label}: Authentic Eye of Sharingan`}
    >
      {/* Pure Circle Container with Flaming Glowing Chakra Aura */}
      <div className="sharingan-pure-orb">
        {/* Flaming Chakra Halo */}
        <div className="sharingan-flame-halo" />

        {/* High-Fidelity Anime Sharingan SVG */}
        <svg
          className="sharingan-svg"
          viewBox="0 0 100 100"
          width="92"
          height="92"
        >
          <defs>
            {/* Blood-red Iris Gradient */}
            <radialGradient id={`shBloodIris-${index}`} cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#ff2a35" />
              <stop offset="55%" stopColor="#cf0a15" />
              <stop offset="85%" stopColor="#5a0006" />
              <stop offset="100%" stopColor="#180002" />
            </radialGradient>

            {/* Corneal Dome Specular Highlight */}
            <linearGradient id={`shGloss-${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
              <stop offset="35%" stopColor="#ffffff" stopOpacity="0.08" />
              <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
            </linearGradient>

            {/* Tomoe Shadow Filter */}
            <filter id={`shShadow-${index}`} x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.8" />
            </filter>
          </defs>

          {/* Sclera & Dark Limbal Ring */}
          <circle cx="50" cy="50" r="48" fill="#08080c" stroke="rgba(255,255,255,0.22)" strokeWidth="1.2" />

          {/* Blood-Red Chakra Iris */}
          <circle cx="50" cy="50" r="44" fill={`url(#shBloodIris-${index})`} stroke="#e50914" strokeWidth="1.2" />

          {/* Fine Radial Chakra Striations */}
          <g stroke="rgba(0, 0, 0, 0.28)" strokeWidth="0.8" opacity="0.75">
            <line x1="50" y1="10" x2="50" y2="24" />
            <line x1="50" y1="76" x2="50" y2="90" />
            <line x1="10" y1="50" x2="24" y2="50" />
            <line x1="76" y1="50" x2="90" y2="50" />
            <line x1="22" y1="22" x2="32" y2="32" />
            <line x1="68" y1="68" x2="78" y2="78" />
            <line x1="22" y1="78" x2="32" y2="68" />
            <line x1="68" y1="32" x2="78" y2="22" />
          </g>

          {/* Concentric Tomoe Orbital Track Ring */}
          <circle cx="50" cy="50" r="28" fill="none" stroke="#000000" strokeWidth="2.4" opacity="0.88" />
          <circle cx="50" cy="50" r="28" fill="none" stroke="#e50914" strokeWidth="0.6" opacity="0.5" />

          {/* The Spinning Axis: 3 Authentic Anime Tomoe with Sweeping Tails */}
          <g className={`sharingan-axis ${isHovered ? 'paused' : ''}`}>
            {[0, 120, 240].map((angle) => (
              <g key={angle} transform={`rotate(${angle} 50 50)`} filter={`url(#shShadow-${index})`}>
                {/* Curved Anime Tomoe Body with sweeping aerodynamic tail */}
                <path
                  d="M 50 22 C 54.5 22, 57.5 25.5, 57.5 30 C 57.5 34.8, 52.8 38.5, 47.5 41 C 51.5 37.8, 53.5 34.5, 53 31 C 52.2 26.8, 48.5 25.5, 50 22 Z"
                  fill="#000000"
                />
                <circle cx="53" cy="29.5" r="4.2" fill="#000000" />
                {/* Tomoe inner specular highlight */}
                <circle cx="53.8" cy="28.5" r="1.1" fill="rgba(255,255,255,0.4)" />
              </g>
            ))}
          </g>

          {/* Central Black Void Pupil with Glowing Red Core */}
          <circle cx="50" cy="50" r="9.5" fill="#000000" />
          <circle cx="50" cy="50" r="3" fill="#ff1f2d" opacity="0.95" />
          <circle cx="50" cy="50" r="1.2" fill="#ffffff" opacity="0.8" />

          {/* Convex Corneal Specular Highlight Arc */}
          <path
            d="M 22 36 A 34 34 0 0 1 78 36 A 38 28 0 0 0 22 36 Z"
            fill={`url(#shGloss-${index})`}
            pointerEvents="none"
          />
        </svg>
      </div>

      {/* Stat HUD Tooltip — Exactly 2px below eye, FIRST text (label) then number after text, non-overlapping */}
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className={`sharingan-hover-tooltip ${index === 3 ? 'is-last-eye' : ''}`}
            initial={{ opacity: 0, y: 3, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 2, scale: 0.96 }}
            transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="tooltip-hud-pill">
              <span className="tooltip-text-label">{label}</span>
              <span className="tooltip-sep">·</span>
              <span className="tooltip-number-val">
                {displayVal}
                <i className="tooltip-suffix">{suffix}</i>
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function About() {
  const p = useLive();
  const words = STORY.split(' ');
  const inkP = seg(p, 0.16, 0.55);

  return (
    <section className="about" id="about">
      <div className="about-sticky">
        <div className="about-glow" />
        <div className="about-panel">
          <div className="ab-kicker" style={step(p, 0.02)}>
            <i /> CHAPTER II · ORIGIN · 100% SELF-TAUGHT
          </div>

          <div className="ab-header-row" style={step(p, 0.04)}>
            <div>
              <h2 className="ab-title">
                The builder
                <br />
                <span>behind the systems.</span>
              </h2>
              <p className="ab-handle-tag">
                {PROFILE.handle} <span>· India · Since 2016</span>
              </p>
            </div>
          </div>

          <p className="ab-ink" style={step(p, 0.12)}>
            {words.map((w, i) => {
              const lit = seg(inkP * words.length, i - 1, i + 1);
              const highlight = /2016|self-taught|modding|systems|AI-powered|rebuilding|practical/.test(w);
              return (
                <span
                  key={i}
                  style={{
                    opacity: 0.16 + lit * 0.84,
                    color: lit > 0.9 && highlight ? 'var(--red)' : undefined,
                  }}
                >
                  {w}{' '}
                </span>
              );
            })}
          </p>

          {/* Pure Circular Eye of Sharingan Dials with Glowing Aura (NO square boxes) */}
          <div className="ab-sharingan-circles" style={step(p, 0.48)}>
            {STATS.map((s, i) => (
              <SharinganCircle
                key={s.label}
                {...s}
                index={i}
                k={seg(p, 0.5 + i * 0.04, 0.68 + i * 0.04)}
              />
            ))}
          </div>

          <div className="ab-links-row" style={step(p, 0.78)}>
            <a className="ab-btn primary" href={PROFILE.github} target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
              </svg>
              <span>Explore GitHub</span>
            </a>
            <a className="ab-btn secondary" href={PROFILE.telegram} target="_blank" rel="noreferrer">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
              </svg>
              <span>Telegram Direct</span>
            </a>
          </div>
        </div>

        <div className="ab-progress">
          <i style={{ transform: `scaleY(${p})` }} />
        </div>
      </div>
    </section>
  );
}
