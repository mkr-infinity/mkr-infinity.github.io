'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { scrollToId } from './SmoothScroll';

export const CHAPTERS = [
  { id: 'billboard', label: 'Prologue' },
  { id: 'about', label: 'Origin' },
  { id: 'projects', label: 'Missions' },
  { id: 'contact', label: 'Finale' },
];

export default function TopNav({ show }: { show: boolean }) {
  const [active, setActive] = useState(0);
  const [istTime, setIstTime] = useState('');
  const [navButtonsVisible, setNavButtonsVisible] = useState(true);

  // Live Real India Time (IST) with seconds
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

  // Smart Scroll Direction: Auto-hide 4 buttons on scroll down, auto-show on scroll up
  useEffect(() => {
    let lastY = window.scrollY;
    const handleScroll = () => {
      const curY = window.scrollY;
      if (curY < 80) {
        setNavButtonsVisible(true);
      } else if (curY > lastY + 12) {
        // Scrolling down -> hide buttons to clear view
        setNavButtonsVisible(false);
      } else if (curY < lastY - 8) {
        // Scrolling up -> reveal navigation
        setNavButtonsVisible(true);
      }
      lastY = curY;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    let raf = 0;
    const t = () => {
      const mid = window.innerHeight * 0.45;
      let a = 0;
      CHAPTERS.forEach((c, i) => {
        const el = document.getElementById(c.id);
        if (el && el.getBoundingClientRect().top <= mid) a = i;
      });
      setActive((x) => (x !== a ? a : x));
      raf = requestAnimationFrame(t);
    };
    raf = requestAnimationFrame(t);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <motion.header
      className="nav-floating"
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: show ? 0 : -60, opacity: show ? 1 : 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="nav-bar-inner">
        {/* Top Left Corner: Floating Capsule Badge with Flame strictly on borders */}
        <button
          className="nav-identity-capsule orange-flame-brand"
          onClick={() => scrollToId('billboard')}
          aria-label="Back to top"
        >
          {/* Flame strictly on borders (0px glow, crisp 1.5px molten border) */}
          <span className="brand-orange-flame-aura" aria-hidden />

          <div className="nav-avatar-shell">
            <img
              src="/favicon.png"
              alt="Mohammad Kaif Raja"
              className="nav-avatar-img"
            />
          </div>

          <div className="nav-identity-info">
            <span className="nav-identity-handle">
              mkr-infinity <em className="nav-slash">/</em> @mkr_infinity
            </span>
            <span className="nav-identity-status">
              INDIA · {istTime || 'LIVE'} IST
            </span>
          </div>
        </button>

        {/* Center: Absolute Geometric Screen Centering with Auto-Hide on Scroll Down */}
        <div className="nav-center-anchor">
          <motion.nav
            className="nav-independent-rack"
            role="navigation"
            aria-label="Main Chapters"
            initial={false}
            animate={{
              y: navButtonsVisible ? 0 : -65,
              opacity: navButtonsVisible ? 1 : 0,
              scale: navButtonsVisible ? 1 : 0.95,
            }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            {CHAPTERS.map((c, i) => (
              <button
                key={c.id}
                type="button"
                className={`nav-liquid-glass-btn ${i === active ? 'is-active' : ''}`}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  scrollToId(c.id);
                }}
                title={`Jump to ${c.label}`}
              >
                {/* Liquid glass specular top highlight */}
                <span className="glass-specular-shine" aria-hidden />

                {i === active && (
                  <span className="glass-active-pulse-core" aria-hidden />
                )}

                <span className="glass-btn-label">{c.label}</span>

                {i === active && (
                  <motion.span
                    layoutId="liquidGlassActiveGlow"
                    className="glass-liquid-ring"
                    transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                  />
                )}
              </button>
            ))}
          </motion.nav>
        </div>

        {/* Top Right Corner: Capsule Connect Button with Max 3px Border Fire strictly on borders */}
        <button
          className="nav-connect-capsule border-flame-connect"
          onClick={() => scrollToId('contact')}
          title="Connect with Mohammad Kaif Raja"
        >
          {/* Max 3px border fire strictly on borders */}
          <span className="connect-border-flame-aura" aria-hidden />
          <span className="connect-label">CONNECT</span>
          <span className="connect-icon-circle">
            <svg
              viewBox="0 0 24 24"
              width="11"
              height="11"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="7" y1="17" x2="17" y2="7" />
              <polyline points="7 7 17 7 17 17" />
            </svg>
          </span>
        </button>
      </div>
    </motion.header>
  );
}
