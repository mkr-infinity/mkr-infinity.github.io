'use client';

import Lenis from 'lenis';
import { useEffect } from 'react';

let lenis: Lenis | null = null;
let locked = false;

export function scrollToId(id: string) {
  if (id === 'billboard' || id === 'hero') {
    if (lenis) {
      lenis.scrollTo(0, { duration: 1.0, immediate: false });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    return;
  }
  const el = document.getElementById(id);
  if (!el) return;
  try {
    if (lenis) {
      lenis.scrollTo(el, { offset: -10, duration: 1.0, immediate: false });
    } else {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  } catch {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/** Smoothly "plays" the page to an absolute y over `duration` seconds with silky ease-in-out curve. */
export function playTo(y: number, duration: number = 2.0) {
  try {
    if (lenis) {
      lenis.scrollTo(y, {
        duration,
        easing: (t: number) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
        lock: false,
        force: true,
      });
    } else {
      const startY = window.scrollY;
      const diff = y - startY;
      const startTime = performance.now();
      const durMs = duration * 1000;

      const step = (now: number) => {
        const elapsed = now - startTime;
        const p = Math.min(1, elapsed / durMs);
        const ease = p < 0.5 ? 2 * p * p : -1 + (4 - 2 * p) * p;
        window.scrollTo(0, startY + diff * ease);
        if (p < 1) requestAnimationFrame(step);
      };
      requestAnimationFrame(step);
    }
  } catch {
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

export function setScrollLocked(lock: boolean) {
  locked = lock;
  if (lenis) {
    lock ? lenis.stop() : lenis.start();
  }
  document.documentElement.style.overflow = lock ? 'hidden' : '';
}

export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Snappy responsive config: duration 0.85s for fast response, no floaty lag
    lenis = new Lenis({
      duration: 0.85,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
      wheelMultiplier: 1.15,
      touchMultiplier: 1.0,
    });

    if (locked) lenis.stop();

    let raf = 0;
    const loop = (t: number) => {
      lenis?.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf);
      lenis?.destroy();
      lenis = null;
    };
  }, []);

  return null;
}
