'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { playTo } from './SmoothScroll';

/**
 * Water-Filling Scroll Progress Button:
 * - Liquid beaker/orb that dynamically fills with water (0% to 100%) as the user scrolls.
 * - Undulating animated liquid wave ripples and specular glass reflections.
 * - Clicking it in the top half (progress < 50%) scrolls to the bottom over 2.0s.
 * - Clicking it in the bottom half (progress >= 50%) scrolls back to the top over 2.0s.
 */
export default function WaterFillButton() {
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const [waveOffset, setWaveOffset] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    let animId = 0;
    const animateWave = () => {
      setWaveOffset((prev) => (prev + 0.08) % (Math.PI * 2));
      animId = requestAnimationFrame(animateWave);
    };
    animId = requestAnimationFrame(animateWave);
    return () => cancelAnimationFrame(animId);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (docHeight <= 0) {
        setProgress(0);
        setVisible(false);
        return;
      }
      const p = Math.min(1, Math.max(0, scrollY / docHeight));
      setProgress(p);
      setVisible(scrollY > 60);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    const maxScroll = document.documentElement.scrollHeight;
    if (progress < 0.5) {
      // In upper half: travel smoothly all the way down to bottom over 2.0s
      playTo(maxScroll, 2.0);
    } else {
      // In lower half: surge smoothly all the way back to top over 2.0s
      playTo(0, 2.0);
    }
  };

  const isTopHalf = progress < 0.5;
  const pctInt = Math.round(progress * 100);

  // Liquid wave geometry inside a 58x58 orb
  const orbRadius = 29;
  const waterHeight = progress * 58; // 0 to 58
  const waveY = 58 - waterHeight;

  // Generate dynamic sine wave points
  const wavePoints: string[] = [];
  wavePoints.push(`M 0 ${waveY}`);
  for (let x = 0; x <= 58; x += 4) {
    const yOffset = Math.sin((x / 58) * Math.PI * 3 + waveOffset) * (waterHeight > 3 && waterHeight < 55 ? 3 : 0.8);
    wavePoints.push(`L ${x} ${waveY + yOffset}`);
  }
  wavePoints.push(`L 58 58 L 0 58 Z`);
  const wavePath = wavePoints.join(' ');

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="water-fill-btn-container"
          initial={{ opacity: 0, scale: 0.7, y: 30 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.7, y: 30 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Hover Tooltip: Indicates 2.0s destination */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                className="water-btn-tooltip"
                initial={{ opacity: 0, y: 6, scale: 0.92 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 6, scale: 0.92 }}
                transition={{ duration: 0.18 }}
              >
                <span className="tooltip-action">
                  {isTopHalf ? 'DIVE TO BOTTOM' : 'SURGE TO TOP'}
                </span>
                <span className="tooltip-time">2.0s CINEMATIC</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Floating Liquid Orb Button */}
          <button
            type="button"
            className="water-liquid-orb"
            onClick={handleClick}
            title={isTopHalf ? `Dive to bottom (${pctInt}%)` : `Surge to top (${pctInt}%)`}
            aria-label={isTopHalf ? 'Scroll to bottom' : 'Scroll to top'}
          >
            {/* Ambient Red Glow Halo */}
            <div className="water-orb-glow" aria-hidden />

            {/* SVG Water Reservoir with Circular Clip Path */}
            <svg
              viewBox="0 0 58 58"
              width="58"
              height="58"
              className="water-orb-svg"
            >
              <defs>
                <clipPath id="waterOrbClip">
                  <circle cx="29" cy="29" r="27.5" />
                </clipPath>

                {/* Rich Glowing Crimson Liquid Gradient */}
                <linearGradient id="crimsonLiquidGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ff4d58" />
                  <stop offset="35%" stopColor="#e50914" />
                  <stop offset="80%" stopColor="#99050d" />
                  <stop offset="100%" stopColor="#400004" />
                </linearGradient>

                {/* Water Surface Foam Sheen */}
                <linearGradient id="waterSurfaceGlow" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.8" />
                  <stop offset="50%" stopColor="#ffd700" stopOpacity="0.9" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0.8" />
                </linearGradient>

                {/* Glass Dome Highlight */}
                <linearGradient id="glassReflection" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.4" />
                  <stop offset="45%" stopColor="#ffffff" stopOpacity="0.05" />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* Beaker Void Background */}
              <circle
                cx="29"
                cy="29"
                r="27.5"
                fill="#0d0a10"
                stroke="rgba(255, 255, 255, 0.2)"
                strokeWidth="1.5"
              />

              {/* Water Liquid Layer (Clips inside circle) */}
              <g clipPath="url(#waterOrbClip)">
                {/* Back Liquid Wave (Subtle darker depth layer) */}
                <rect
                  x="0"
                  y={waveY + 2}
                  width="58"
                  height={waterHeight + 10}
                  fill="#73050b"
                  opacity="0.6"
                />

                {/* Primary Animated Undulating Water Wave */}
                <path
                  d={wavePath}
                  fill="url(#crimsonLiquidGrad)"
                />

                {/* Wave Surface Glow Line */}
                {waterHeight > 3 && waterHeight < 56 && (
                  <ellipse
                    cx="29"
                    cy={waveY}
                    rx="26"
                    ry="2.5"
                    fill="none"
                    stroke="url(#waterSurfaceGlow)"
                    strokeWidth="1.2"
                    opacity="0.85"
                  />
                )}

                {/* Rising Micro-bubbles */}
                {waterHeight > 15 && (
                  <g fill="#ffffff" opacity="0.45">
                    <circle cx="22" cy={58 - (waterHeight * 0.4 + (waveOffset * 3) % 15)} r="1.1" />
                    <circle cx="34" cy={58 - (waterHeight * 0.65 + (waveOffset * 4) % 18)} r="1.4" />
                    <circle cx="28" cy={58 - (waterHeight * 0.2 + (waveOffset * 2) % 10)} r="0.9" />
                  </g>
                )}
              </g>

              {/* Circular Glass Specular Arc */}
              <path
                d="M 10 20 A 24 24 0 0 1 48 20 A 26 21 0 0 0 10 20 Z"
                fill="url(#glassReflection)"
                pointerEvents="none"
              />

              {/* Outer Outer Glass Rim */}
              <circle
                cx="29"
                cy="29"
                r="27.5"
                fill="none"
                stroke="rgba(255, 255, 255, 0.25)"
                strokeWidth="1.5"
                pointerEvents="none"
              />
            </svg>

            {/* Center Dynamic Progress & Travel Indicator */}
            <div className="water-center-hud">
              {isTopHalf ? (
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.8" className="water-arrow-icon down">
                  <path d="M12 5v14M19 12l-7 7-7-7" />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2.8" className="water-arrow-icon up">
                  <path d="M12 19V5M5 12l7-7 7 7" />
                </svg>
              )}
              <span className="water-pct-num">{pctInt}%</span>
            </div>
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
