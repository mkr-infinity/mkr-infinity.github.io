'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { PROFILE } from '@/lib/data';

const CURTAIN_EASE = [0.65, 0, 0.35, 1] as const;

export default function Intro({ onDone }: { onDone: () => void }) {
  const [percent, setPercent] = useState(0);
  const [open, setOpen] = useState(false);
  const doneRef = useRef(false);

  const finish = () => {
    if (doneRef.current) return;
    doneRef.current = true;
    setOpen(true);
    setTimeout(onDone, 980);
  };

  // Deterministic 1.0s structured loader progression
  useEffect(() => {
    let current = 0;
    const interval = setInterval(() => {
      const step = current < 45 ? 6 : current < 80 ? 5 : 4;
      current = Math.min(100, current + step);
      setPercent(current);

      if (current >= 100) {
        clearInterval(interval);
        setTimeout(finish, 130);
      }
    }, 22);

    return () => clearInterval(interval);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.code === 'Space' || e.code === 'Escape' || e.code === 'Enter') {
        finish();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const stageLabel =
    percent < 38
      ? 'STAGE 01 // KERNEL RUNTIME MOUNTED'
      : percent < 78
      ? 'STAGE 02 // 10 SHIPPED SYSTEMS VERIFIED'
      : 'STAGE 03 // SYSTEMS ONLINE';

  return (
    <div className={`intro-overlay ${open ? 'open' : ''}`} onClick={finish}>
      {/* Top Theatrical Curtain */}
      <motion.div
        className="intro-curtain top"
        initial={{ y: '0%' }}
        animate={{ y: open ? '-101%' : '0%' }}
        transition={{ duration: 0.95, ease: CURTAIN_EASE }}
      >
        <div className="curtain-edge-shadow bottom" />
      </motion.div>

      {/* Bottom Theatrical Curtain */}
      <motion.div
        className="intro-curtain bottom"
        initial={{ y: '0%' }}
        animate={{ y: open ? '101%' : '0%' }}
        transition={{ duration: 0.95, ease: CURTAIN_EASE }}
      >
        <div className="curtain-edge-shadow top" />
      </motion.div>

      {/* Minimal, High-Precision Structured Centerpiece */}
      <AnimatePresence>
        {!open && (
          <motion.div
            className="intro-clean-deck structured-loader"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.03, filter: 'blur(8px)' }}
            transition={{ duration: 0.3 }}
          >
            {/* Central Emblem with Specular Refraction */}
            <div className="loader-emblem-container">
              <span className="loader-emblem-halo" />
              <img
                src={PROFILE.favicon}
                alt="Mohammad Kaif Raja Emblem"
                className="loader-emblem-img"
              />
              <span className="loader-emblem-specular" />
            </div>

            {/* Structured Subject Identity */}
            <div className="loader-identity-group">
              <h1 className="loader-heroic-name">
                MOHAMMAD <span>KAIF</span> RAJA
              </h1>
              <p className="loader-role-tag">
                {PROFILE.handle} <span className="loader-bullet">/</span> {PROFILE.role}
              </p>
            </div>

            {/* Structured Telemetry Progress Track */}
            <div className="loader-structured-meter">
              <div className="meter-head-row">
                <span className="meter-stage-indicator">{stageLabel}</span>
                <span className="meter-percentage-digits">
                  {String(percent).padStart(3, '0')}%
                </span>
              </div>

              <div className="meter-track-base">
                <div
                  className="meter-fill-bar"
                  style={{ width: `${percent}%` }}
                />
              </div>

              <div className="meter-spec-row">
                <span>100% SELF-TAUGHT</span>
                <span className="meter-sep">·</span>
                <span>SINCE 2016</span>
                <span className="meter-sep">·</span>
                <span>INDIA</span>
              </div>
            </div>

            {/* Minimalist Skip Cue */}
            <span className="loader-skip-cue">
              CLICK ANYWHERE TO SKIP <kbd>[SPACE]</kbd>
            </span>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
