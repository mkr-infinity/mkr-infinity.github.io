'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Aesthetic Anime Cyber-Blade Pointer Cursor + Ambient Red Background Spotlight:
 * - Direct 1:1 instantaneous pointer arrow (zero latency, no sluggish trailing circles)
 * - Sharp, aesthetic futuristic cyber-blade styling with glowing crimson edges
 * - Radiant ambient crimson aura spotlight smoothly gliding across the background
 * - Interactive state transitions on links, buttons, and manifesto keywords
 */
export default function Cursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const auraRef1 = useRef<HTMLDivElement>(null);
  const auraRef2 = useRef<HTMLDivElement>(null);
  const [isHover, setIsHover] = useState(false);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) return;

    document.documentElement.classList.add('has-custom-cursor');

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;

    // Fast Ghost Core & Spectral Trailing Mist
    let aura1X = mouseX;
    let aura1Y = mouseY;
    let aura2X = mouseX;
    let aura2Y = mouseY;
    let isVisible = false;

    let rafId = 0;

    const handlePointerMove = (e: PointerEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) {
        isVisible = true;
        if (cursorRef.current) cursorRef.current.style.opacity = '1';
        if (auraRef1.current) auraRef1.current.style.opacity = '1';
        if (auraRef2.current) auraRef2.current.style.opacity = '1';
      }

      // Check if hovering over interactive elements
      const target = e.target as HTMLElement | null;
      const interactive = !!target?.closest('a, button, [data-hot], input, textarea, .hover-interactive, .manifesto-word, .sharingan-stat-box, .interactive-word');
      setIsHover(interactive);

      // Direct, instantaneous pointer movement (Zero lag)
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }
    };

    const handlePointerLeave = () => {
      isVisible = false;
      if (cursorRef.current) cursorRef.current.style.opacity = '0';
      if (auraRef1.current) auraRef1.current.style.opacity = '0';
      if (auraRef2.current) auraRef2.current.style.opacity = '0';
    };

    // Ghost Aura Physics Loop: Fast responsive spectral core + wispy trailing mist
    const render = () => {
      // Faster, responsive ghost core
      aura1X += (mouseX - aura1X) * 0.24;
      aura1Y += (mouseY - aura1Y) * 0.24;

      // Trailing ethereal ghostly mist aura
      aura2X += (mouseX - aura2X) * 0.13;
      aura2Y += (mouseY - aura2Y) * 0.13;

      if (auraRef1.current) {
        auraRef1.current.style.transform = `translate3d(${aura1X}px, ${aura1Y}px, 0)`;
      }
      if (auraRef2.current) {
        auraRef2.current.style.transform = `translate3d(${aura2X}px, ${aura2Y}px, 0)`;
      }

      rafId = requestAnimationFrame(render);
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('mouseleave', handlePointerLeave);
    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('mouseleave', handlePointerLeave);
      document.documentElement.classList.remove('has-custom-cursor');
    };
  }, []);

  return (
    <>
      {/* Ghostly Trailing Spectral Aura (Wispy Ethereal Mist) */}
      <div
        className={`cursor-ghost-trailing ${isHover ? 'aura-hover' : ''}`}
        ref={auraRef2}
        aria-hidden
      />

      {/* Primary Fast Radiant Ghost Aura Core */}
      <div
        className={`cursor-ambient-aura ${isHover ? 'aura-hover' : ''}`}
        ref={auraRef1}
        aria-hidden
      />

      {/* Futuristic Sci-Fi Anime Cyber-Blade Pointer Cursor */}
      <div
        className={`sci-fi-cursor ${isHover ? 'cursor-hover' : ''}`}
        ref={cursorRef}
        aria-hidden
      >
        <svg
          className="sci-fi-arrow-svg"
          width="28"
          height="28"
          viewBox="0 0 28 28"
          fill="none"
        >
          <defs>
            <filter id="cursorRedGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0" dy="0" stdDeviation="2.5" floodColor="#e50914" floodOpacity="0.9" />
            </filter>
          </defs>

          {/* Aerodynamic Cyber Blade Body */}
          <path
            d="M3 3L22 13L13.5 15L10 23.5L3 3Z"
            fill="rgba(12, 10, 16, 0.96)"
            stroke="#e50914"
            strokeWidth="1.8"
            strokeLinejoin="round"
            filter="url(#cursorRedGlow)"
          />

          {/* Inner Glowing Plasma Core Accent */}
          <path
            d="M6.5 7L16 12.5L11.5 13.5L9.5 18.5L6.5 7Z"
            fill="#e50914"
            opacity="0.88"
          />

          {/* Tactical Crosshair Dot */}
          <circle cx="3" cy="3" r="1.5" fill="#fff" />
        </svg>

        {/* Tactical Crosshair / Lock Ring when Hovering */}
        <span className="cursor-reticle" />
        <span className="cursor-flare" />
      </div>
    </>
  );
}
