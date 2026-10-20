'use client';

import { useRef, useState } from 'react';
import { SKILL_GENRES, TOP10 } from '@/lib/data';
import { pad2, useScrollProgress } from '@/lib/useScroll';

/**
 * 3D Circular Drum of Blades:
 * The signature cylindrical skill carousel that turns smoothly on its vertical axis as you scroll.
 * Enhanced with gamified sci-fi chassis cards, power nodes, and system HUD meters.
 */
export default function Arsenal() {
  const sec = useRef<HTMLElement>(null);
  const drum = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const N = SKILL_GENRES.length;
  const STEP = 360 / N;

  // Exact 3D scroll drum rotation preserved
  useScrollProgress(sec, (p) => {
    const t = p * (N - 1);
    if (drum.current) {
      drum.current.style.transform = `translateZ(calc(var(--r) * -1)) rotateX(-6deg) rotateY(${-t * STEP}deg)`;
    }
    const a = Math.round(t);
    setActive((x) => (x !== a ? a : x));
  });

  return (
    <section className="arsenal" id="skills" ref={sec}>
      <div className="ars-sticky">
        <div className="ars-head">
          <p className="eyebrow">CHAPTER III</p>
          <h2>
            The
            <br />
            <span>Arsenal</span>
          </h2>
          <p className="ars-count">
            <b>{pad2(active + 1)}</b>
            <span>/ {pad2(N)}</span>
          </p>
          <p className="ars-now" key={active}>
            {SKILL_GENRES[active].name}
          </p>
          <ol className="ars-top">
            {TOP10.slice(0, 5).map((t, i) => (
              <li key={t.name}>
                <i>{pad2(i + 1)}</i>
                {t.name}
                <em>{t.genre}</em>
              </li>
            ))}
          </ol>
        </div>

        <div className="ars-scene">
          <div className="ars-drum" ref={drum}>
            {SKILL_GENRES.map((g, i) => (
              <article
                key={g.name}
                className={`ars-panel ${i === active ? 'on' : ''}`}
                style={{ transform: `rotateY(${i * STEP}deg) translateZ(var(--r))` }}
              >
                {/* Gamified Sci-Fi Top Chassis Bar */}
                <div className="ap-chassis-top">
                  <span className="ap-class-tag">CLASS [LV.99]</span>
                  <span className="ap-sync-tag">
                    <i className="sync-dot" /> SYNC: 100%
                  </span>
                </div>

                <span className="ap-idx">{pad2(i + 1)}</span>

                <div className="ap-title-wrap">
                  <span className="ap-module-label">DISCIPLINE // 0{i + 1}</span>
                  <h3>{g.name}</h3>
                </div>

                {/* Gamified Power Tech Nodes: Full width, never clipped or broken */}
                <ul className="ap-tech-nodes">
                  {g.items.map((it, idx) => (
                    <li key={it} className="ap-tech-node-item">
                      <div className="ap-node-top">
                        <span className="node-pip" />
                        <span className="node-name">{it}</span>
                        <span className="node-pct">{98 - idx * 4}%</span>
                      </div>
                      <div className="node-bar-track">
                        <span className="node-bar-fill" style={{ width: `${96 - idx * 5}%` }} />
                      </div>
                    </li>
                  ))}
                </ul>

                {/* Gamified Corner Decals */}
                <div className="ap-corner-tl" />
                <div className="ap-corner-br" />
                <i className="ap-edge" />
              </article>
            ))}
          </div>
          <div className="ars-floor" />
        </div>
      </div>
    </section>
  );
}
