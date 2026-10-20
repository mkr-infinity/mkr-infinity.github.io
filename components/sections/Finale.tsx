'use client';

import { motion } from 'framer-motion';
import { useRef, useState } from 'react';
import { PROFILE, EPISODES } from '@/lib/data';

const ROLL: [string, string][] = [
  ['System Architect & Builder', PROFILE.realName],
  ['Persona & Handle', PROFILE.handle],
  ['Origins', '100% Self-Taught Since 2016 · India'],
  ['Core Disciplines', 'System Architecture · Android Internals · Reverse Engineering · AI Systems · Automation'],
  ['Weaponry', 'TypeScript · Next.js · Python · ADB/Fastboot · Bash · Node.js · Linux'],
  ['Deployments & Projects', EPISODES.map((e) => e.name).join(' · ')],
  ['Philosophy', 'Breaking systems, understanding them, and rebuilding better versions.'],
];

function SocialCapsule({
  href,
  platform,
  handle,
  icon,
  accent,
}: {
  href: string;
  platform: string;
  handle: string;
  icon: React.ReactNode;
  accent: string;
}) {
  const ref = useRef<HTMLAnchorElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const move = (e: React.PointerEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const b = el.getBoundingClientRect();
    const cx = b.left + b.width / 2;
    const cy = b.top + b.height / 2;
    setPos({ x: (e.clientX - cx) * 0.18, y: (e.clientY - cy) * 0.18 });
  };

  const leave = () => setPos({ x: 0, y: 0 });

  return (
    <motion.a
      ref={ref}
      href={href}
      target="_blank"
      rel="noreferrer"
      className="social-flame-capsule"
      onPointerMove={move}
      onPointerLeave={leave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 280, damping: 20 }}
      title={`Open ${platform} (${handle})`}
    >
      {/* Dynamic Flaming Aura Perimeter with Rising Fire Tongues */}
      <span className="capsule-flame-aura" style={{ '--capsule-accent': accent } as React.CSSProperties} />
      <span className="capsule-flame-tongues" aria-hidden />
      <span className="capsule-inner-surface">
        <span className="capsule-logo-wrap" style={{ color: accent }}>
          {icon}
        </span>
        <span className="capsule-text-block">
          <strong className="capsule-platform">{platform}</strong>
          <small className="capsule-handle">{handle}</small>
        </span>
        <span className="capsule-chevron">↗</span>
      </span>
    </motion.a>
  );
}

export default function Finale() {
  return (
    <section className="finale" id="contact">
      <div className="fin-glow" />

      <p className="eyebrow center">FINAL CHAPTER</p>

      {/* Cinematic Split Title */}
      <motion.h2
        className="fin-title"
        initial="h"
        whileInView="s"
        viewport={{ once: true, amount: 0.3 }}
      >
        {['LET’S MAKE', 'THE SEQUEL'].map((l, i) => (
          <span key={l} className={`fl ${i ? 'outline' : ''}`}>
            <motion.span
              variants={{ h: { y: '105%' }, s: { y: '0%' } }}
              transition={{ delay: i * 0.12, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            >
              {l}
            </motion.span>
          </span>
        ))}
      </motion.h2>

      <p className="fin-sub">
        Always open for high-impact systems, open-source collaborations, and challenging engineering problems. The next mission starts with one message.
      </p>

      {/* Capsule Material UI Social Buttons with Flaming Glowing Borders */}
      <div className="fin-capsules-row">
        {/* Telegram Capsule */}
        <SocialCapsule
          href={PROFILE.telegram}
          platform="Telegram"
          handle="@mkr_infinity"
          accent="#0088cc"
          icon={
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.74-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .38z" />
            </svg>
          }
        />

        {/* GitHub Capsule */}
        <SocialCapsule
          href={PROFILE.github}
          platform="GitHub"
          handle="@mkr-infinity"
          accent="#ffffff"
          icon={
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
            </svg>
          }
        />

        {/* Instagram Capsule */}
        <SocialCapsule
          href={PROFILE.instagram}
          platform="Instagram"
          handle="@mkr_infinity"
          accent="#e1306c"
          icon={
            <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
            </svg>
          }
        />
      </div>

      {/* Credits Roll */}
      <div className="roll" aria-label="Credits">
        <div className="roll-inner">
          {ROLL.map(([k, v]) => (
            <div className="roll-row" key={k}>
              <span>{k}</span>
              <b>{v}</b>
            </div>
          ))}
        </div>
      </div>

      {/* Clean Footer */}
      <footer className="fin-foot">
        <span>Self-Taught System Builder · Since 2016 · India</span>
      </footer>
    </section>
  );
}
