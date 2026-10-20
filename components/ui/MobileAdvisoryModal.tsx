'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

/**
 * Mobile Advisory Modal:
 * Informs visitors arriving on mobile screens that the portfolio was engineered
 * with high-density GPU canvas physics, real-time Web Audio API synthesis, and
 * desktop cursor telemetry. Provides a prominent "Continue Anyway" button.
 */
export default function MobileAdvisoryModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      if (typeof window === 'undefined') return;
      const seen = sessionStorage.getItem('mkr_mobile_desktop_advisory_seen');
      const isMobileOrTablet = window.innerWidth <= 1024;
      if (!seen && isMobileOrTablet) {
        // Small delay to let initial page layout settle smoothly
        const t = setTimeout(() => setIsOpen(true), 400);
        return () => clearTimeout(t);
      }
    } catch {}
  }, []);

  const handleDismiss = () => {
    try {
      sessionStorage.setItem('mkr_mobile_desktop_advisory_seen', '1');
    } catch {}
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="mobile-advisory-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.35 }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="mobile-modal-title"
        >
          <motion.div
            className="mobile-advisory-card"
            initial={{ scale: 0.92, y: 24, opacity: 0 }}
            animate={{ scale: 1, y: 0, opacity: 1 }}
            exit={{ scale: 0.94, y: 16, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 380, damping: 28 }}
          >
            {/* Glowing molten perimeter border */}
            <span className="modal-molten-border" aria-hidden />

            {/* Top Chip / Tech Badge */}
            <div className="modal-header-chip">
              <span className="modal-chip-dot" />
              <span className="modal-chip-text">DESKTOP SYSTEM ADVISORY</span>
            </div>

            {/* Holographic Device Graphic */}
            <div className="modal-icon-bubble">
              <svg
                viewBox="0 0 24 24"
                width="32"
                height="32"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect x="2" y="3" width="20" height="14" rx="2" />
                <line x1="8" y1="21" x2="16" y2="21" />
                <line x1="12" y1="17" x2="12" y2="21" />
              </svg>
            </div>

            <h3 id="mobile-modal-title" className="modal-title">
              BEST EXPERIENCED ON DESKTOP
            </h3>

            <p className="modal-description">
              This portfolio is engineered with <strong>real-time Web Audio API synthesis</strong>, 
              custom <strong>GPU canvas shaders</strong>, and mouse cursor telemetry.
            </p>

            <p className="modal-sub-note">
              For the full cinematic soundscape and interactive physics, viewing on a computer or laptop is recommended.
            </p>

            {/* Primary Action Button */}
            <button
              type="button"
              className="modal-action-btn"
              onClick={handleDismiss}
              autoFocus
            >
              <span className="modal-btn-glow" aria-hidden />
              <span className="modal-btn-label">CONTINUE ANYWAY</span>
              <span className="modal-btn-arrow">→</span>
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
