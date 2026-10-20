'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { PROFILE } from '@/lib/data';

export default function NotFound() {
  return (
    <main className="not-found-viewport">
      {/* Ambient background glows */}
      <div className="nf-glow-orb top" aria-hidden />
      <div className="nf-glow-orb center" aria-hidden />

      {/* Atmospheric Film Grid Overlay */}
      <div className="nf-grid-overlay" aria-hidden />

      {/* Minimal Top Brand Bar */}
      <header className="nf-top-nav">
        <Link href="/" className="nf-logo-link" title="Return to Portfolio">
          <img src="/favicon.png" alt="MKR Emblem" className="nf-nav-emblem" />
          <span className="nf-nav-brand">mkr-infinity</span>
        </Link>
        <span className="nf-status-tag">404 · DIMENSIONAL DEVIATION</span>
      </header>

      {/* Main Centered Minimal 404 Stage */}
      <div className="nf-theater">
        {/* Character Portrait — Tall / Long Portrait Card (NOT in a circle) */}
        <motion.div
          className="nf-character-portrait-card"
          initial={{ opacity: 0, scale: 0.92, y: -16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="nf-portrait-halo" aria-hidden />
          <div className="nf-portrait-media">
            <img
              src="/stills/face.jpg"
              alt="Shinobi Character"
              className="nf-portrait-img"
            />
            <div className="nf-portrait-gradient-overlay" />
          </div>
        </motion.div>

        {/* Minimal 404 Headline */}
        <motion.div
          className="nf-code-group"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="nf-code-title">
            <span className="nf-digit">4</span>
            <span className="nf-digit flame-zero">0</span>
            <span className="nf-digit">4</span>
          </h1>
        </motion.div>

        {/* Friendly & Witty Copy (Charming, friendly, non-generic) */}
        <motion.div
          className="nf-narrative-group"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="nf-friendly-heading">
            Even the greatest ninja takes a wrong turn into another dimension.
          </h2>
          <p className="nf-friendly-sub">
            This coordinate doesn’t exist in this timeline. Your escape route is right below.
          </p>
        </motion.div>

        {/* Action Buttons with 5-6px Raging Burning Flames */}
        <motion.div
          className="nf-actions-row"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.32, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Go Home / Return to Base Button */}
          <Link href="/" className="nf-flame-btn go-home-btn" title="Return to Home">
            <span className="nf-flame-aura-raging" aria-hidden />
            <span className="nf-flame-tongues-raging" aria-hidden />
            <span className="nf-flame-btn-surface">
              <span className="nf-btn-icon">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
              </span>
              <span>GO HOME</span>
            </span>
          </Link>

          {/* Contact with Instagram Button */}
          <a
            href={PROFILE.instagram}
            target="_blank"
            rel="noreferrer"
            className="nf-flame-btn instagram-btn"
            title="Connect via Instagram"
          >
            <span className="nf-flame-aura-raging" aria-hidden />
            <span className="nf-flame-tongues-raging" aria-hidden />
            <span className="nf-flame-btn-surface">
              <span className="nf-btn-icon">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </span>
              <span>PING ON INSTAGRAM</span>
              <span className="nf-arrow">↗</span>
            </span>
          </a>
        </motion.div>
      </div>

      {/* Minimal Footer */}
      <footer className="nf-bottom-foot">
        <span>Mohammad Kaif Raja · @mkr_infinity</span>
        <span>India · 100% Self-Taught</span>
      </footer>
    </main>
  );
}
