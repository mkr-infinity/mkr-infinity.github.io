'use client';

import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';
import { EPISODES, ProjectEpisode } from '@/lib/data';
import { clamp } from '@/lib/store';
import { pad2 } from '@/lib/useScroll';

/**
 * 01. MKR Music — Ultra-Premium Flagship Audiophile Suite with Web Audio API SFX (Suggestion 2)
 */
function MkrMusicAudiophileWidget() {
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlay = () => {
    const nextState = !isPlaying;
    setIsPlaying(nextState);

    // Synthesized Web Audio API chord & click (Suggestion 2)
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const now = ctx.currentTime;
      if (nextState) {
        // Lush analog synth chord
        const freqs = [220, 277.18, 329.63, 440];
        freqs.forEach((f) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(f, now);
          gain.gain.setValueAtTime(0.04, now);
          gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);
          osc.connect(gain);
          gain.connect(ctx.destination);
          osc.start(now);
          osc.stop(now + 1.2);
        });
      } else {
        // Soft audio mute tap
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(140, now);
        gain.gain.setValueAtTime(0.03, now);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now);
        osc.stop(now + 0.15);
      }
    } catch {}
  };

  return (
    <div className="card-custom-widget widget-theme-music premium-music-suite">
      <div className="music-suite-deck">
        {/* Audiophile Vinyl & Dynamic Equalizer Visualizer */}
        <div className="music-hifi-stage">
          <div className="music-vinyl-disc-wrap">
            <div className={`music-vinyl-disc ${isPlaying ? 'is-spinning' : ''}`}>
              <div className="disc-metallic-grooves" />
              <div className="disc-center-label">
                <span className="disc-mkr-brand">MKR</span>
                <span className="disc-sub-brand">HI-FI</span>
              </div>
              <div className="disc-spindle-hole" />
            </div>
          </div>

          {/* 16-Band Dynamic Equalizer & Codec Telemetry */}
          <div className="music-hifi-telemetry">
            <div className="music-hifi-head">
              <span className="hifi-chip">FLAC 24-BIT / 96kHz</span>
              <span className="hifi-codec">OPUS · LOW-LATENCY</span>
            </div>

            <div className={`music-eq-bars-16 ${isPlaying ? 'is-playing' : ''}`} aria-hidden>
              <span /><span /><span /><span /><span /><span /><span /><span />
              <span /><span /><span /><span /><span /><span /><span /><span />
            </div>

            <div className="music-hifi-stats">
              <span>320kbps Lossless Master</span>
              <span className="stat-bullet">·</span>
              <span>{isPlaying ? 'Synfonia Active Stream' : 'Synfonia v3 Engine'}</span>
            </div>
          </div>
        </div>

        {/* Premium Scrub Bar & Timecodes */}
        <div className="music-scrub-bar">
          <div className="scrub-line-track">
            <span className="scrub-line-fill" />
            <span className="scrub-line-thumb" />
          </div>
          <div className="scrub-times">
            <span>02:14</span>
            <span className="scrub-pill-active">SYNFONIA AUDIO PIPELINE</span>
            <span>04:38</span>
          </div>
        </div>

        {/* Audiophile Playback Controls */}
        <div className="music-controls-row">
          <button className="mc-btn" title="Shuffle Mode" aria-label="Shuffle">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M16 3h5v5M4 20L21 3M21 16v5h-5M15 15l6 6M4 4l5 5" />
            </svg>
          </button>
          <button className="mc-btn" title="Previous Track" aria-label="Previous Track">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
              <path d="M6 6h2v12H6zm3.5 6l8.5 6V6z" />
            </svg>
          </button>
          <button
            className={`mc-btn mc-play-btn ${isPlaying ? 'playing' : ''}`}
            onClick={togglePlay}
            title={isPlaying ? 'Pause Audio' : 'Play Synthesized Track (Web Audio SFX)'}
            aria-label={isPlaying ? 'Pause' : 'Play'}
          >
            {isPlaying ? (
              <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                <path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor">
                <path d="M8 5v14l11-7z" />
              </svg>
            )}
          </button>
          <button className="mc-btn" title="Next Track" aria-label="Next Track">
            <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
              <path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" />
            </svg>
          </button>
          <button className="mc-btn" title="Repeat Track" aria-label="Repeat">
            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.2">
              <path d="M17 1l4 4-4 4M3 11V9a4 4 0 014-4h14M7 23l-4-4 4-4M21 13v2a4 4 0 01-4 4H3" />
            </svg>
          </button>
          <span className="music-feature-pill">SponsorBlock AI</span>
          <span className="music-feature-pill">Synced Lyrics</span>
          <span className="music-feature-pill">Offline Cache</span>
        </div>
      </div>
    </div>
  );
}

/**
 * 03. Android Command Cheatsheet — Interactive Hacker Terminal with Clickable Commands (Suggestion 3)
 */
function AndroidCheatsheetTerminalWidget() {
  const [cmd, setCmd] = useState('fastboot flash boot_a magisk_patched.img --disable-verity');
  const [isTyping, setIsTyping] = useState(false);
  const [status, setStatus] = useState('Qualcomm Snapdragon active');

  const QUICK_COMMANDS = [
    'adb reboot fastboot',
    'fastboot flashing unlock',
    'fastboot flash init_boot magisk.img',
    'fastboot getvar all',
  ];

  const runCommand = (newCmd: string) => {
    if (isTyping) return;
    setIsTyping(true);
    setCmd('');
    setStatus('Executing command...');
    let idx = 0;
    const interval = setInterval(() => {
      idx++;
      setCmd(newCmd.slice(0, idx));
      if (idx >= newCmd.length) {
        clearInterval(interval);
        setIsTyping(false);
        setStatus('[OKAY] Finished in 0.38s');
      }
    }, 28);
  };

  return (
    <div className="card-custom-widget widget-theme-terminal">
      <div className="terminal-shell">
        <div className="terminal-header">
          <span className="term-dot red" />
          <span className="term-dot yellow" />
          <span className="term-dot green" />
          <span className="term-title">fastbootd@mkr-pixel:~# ({status})</span>
        </div>

        <div className="terminal-body-code">
          <div className="term-line">
            <span className="term-prompt">$</span>
            <span className="term-cmd">adb devices -l</span>
          </div>
          <div className="term-line active">
            <span className="term-prompt">$</span>
            <span className="term-cmd">{cmd}</span>
            <span className="term-cursor" />
          </div>
        </div>

        {/* Clickable Quick Command Chips (Suggestion 3) */}
        <div className="terminal-quick-chips">
          {QUICK_COMMANDS.map((qc) => (
            <button
              key={qc}
              type="button"
              className="term-chip-btn"
              onClick={() => runCommand(qc)}
              title={`Click to type ${qc}`}
            >
              <span>$ {qc.split(' ')[1] || qc}</span>
            </button>
          ))}
        </div>

        {/* Dynamic Partition Map Table */}
        <div className="term-partition-grid">
          <span className="part-cell active">boot_a [64MB]</span>
          <span className="part-cell active">init_boot [8MB]</span>
          <span className="part-cell">vendor_boot [64MB]</span>
          <span className="part-cell highlight">super [8.4GB DYNAMIC]</span>
        </div>
      </div>
    </div>
  );
}

/**
 * 05. ReadmeHub — Interactive Dual Mode: Rendered GitHub README vs Raw Markdown (Suggestion 4)
 */
function ReadmeHubInteractiveWidget() {
  const [activeTab, setActiveTab] = useState<'preview' | 'source'>('preview');

  return (
    <div className="card-custom-widget widget-theme-readme">
      <div className="readme-ide-deck">
        {/* Interactive View Toggle Tabs */}
        <div className="readme-view-toggles">
          <button
            type="button"
            className={`readme-tab-btn ${activeTab === 'preview' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('preview')}
          >
            <span className="readme-tab-dot" />
            <span>RENDERED GITHUB README</span>
          </button>
          <button
            type="button"
            className={`readme-tab-btn ${activeTab === 'source' ? 'is-active' : ''}`}
            onClick={() => setActiveTab('source')}
          >
            <span>RAW MARKDOWN SOURCE</span>
          </button>
        </div>

        {activeTab === 'preview' ? (
          <div className="readme-preview-content">
            <div className="readme-gh-profile-header">
              <div className="gh-avatar-placeholder">MKR</div>
              <div className="gh-header-meta">
                <span className="gh-name">Mohammad Kaif Raja</span>
                <span className="gh-title">Self-Taught System Builder · Since 2016</span>
              </div>
            </div>
            <div className="shields-flow">
              <span className="shield-tag green">build: passing</span>
              <span className="shield-tag gold">systems: 10 shipped</span>
              <span className="shield-tag red">license: MIT</span>
              <span className="shield-tag purple">coverage: 100%</span>
            </div>
            <div className="ast-metrics">
              <span>AST Render: 4ms</span>
              <span>Tokens: 890</span>
              <span>Markdown AST: Validated</span>
            </div>
          </div>
        ) : (
          <div className="readme-source-content">
            <div className="ide-code-lines">
              <code><span className="md-hash">#</span> Mohammad Kaif Raja (@mkr_infinity)</code>
              <code><span className="md-badge-str">![Build](https://img.shields.io/badge/build-passing-22c55e)</span></code>
              <code><span className="md-bullet">-</span> ⚡ 100% Self-Taught System Builder since 2016</code>
              <code><span className="md-bullet">-</span> 🛠️ Specializing in Android Internals & Web Engineering</code>
              <code><span className="md-bullet">-</span> 🚀 Shipped 10 open-source systems</code>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

/**
 * Bespoke domain visual showcases for each of the 9 projects:
 */
function ProjectCustomIdentityWidget({ project }: { project: ProjectEpisode }) {
  switch (project.id) {
    // 01. MKR Music — Ultra-Premium Flagship Audiophile Synthwave Suite
    case 'mkr-music':
      return <MkrMusicAudiophileWidget />;

    // 02. Revision Master — Anime Study HUD & Spaced Repetition Terminal
    case 'revision-master':
      return (
        <div className="card-custom-widget widget-theme-study">
          <div className="study-terminal-deck">
            {/* 3D Flashcard Preview & Ebbinghaus Curve */}
            <div className="study-card-preview">
              <div className="study-flashcard-box">
                <div className="flashcard-kanji-watermark">復習</div>
                <div className="flashcard-q">
                  <span className="flashcard-tag">FLASHCARD #042 // KINETICS</span>
                  <p className="flashcard-text">How does spaced repetition reset memory decay?</p>
                </div>
                <div className="flashcard-a">
                  <span>OPTIMAL INTERVAL: DAY 1 ➔ DAY 3 ➔ DAY 7 ➔ DAY 14</span>
                </div>
              </div>

              {/* Memory Retention Curve SVG Graph */}
              <div className="study-curve-box">
                <div className="curve-header">
                  <span>EBBINGHAUS RETENTION</span>
                  <span className="curve-stat">98.4% RECALL</span>
                </div>
                <svg viewBox="0 0 160 50" className="study-curve-svg">
                  <path
                    d="M 10 12 Q 40 40 70 20 T 130 15 T 150 14"
                    fill="none"
                    stroke="#f5b301"
                    strokeWidth="2.5"
                  />
                  <circle cx="10" cy="12" r="3" fill="#f5b301" />
                  <circle cx="70" cy="20" r="3" fill="#f5b301" />
                  <circle cx="130" cy="15" r="3" fill="#f5b301" />
                  <circle cx="150" cy="14" r="3" fill="#22c55e" />
                </svg>
              </div>
            </div>

            {/* Pomodoro Timer & 14-Day Streak Row */}
            <div className="study-footer-row">
              <div className="study-pomodoro-pill">
                <span className="pomo-dot" />
                <span className="pomo-time">25:00 POMODORO FOCUS</span>
              </div>
              <div className="study-streak-badge">
                <span className="streak-fire">STREAK: 14 DAYS</span>
                <span className="streak-dots">
                  <i className="on" /><i className="on" /><i className="on" /><i className="on" /><i className="on" />
                </span>
              </div>
            </div>
          </div>
        </div>
      );

    // 03. Android Command Cheatsheet — Hacker CLI Terminal & Partition Modder
    case 'android-cheatsheet':
      return <AndroidCheatsheetTerminalWidget />;

    // 04. CalcVerse — Matrix Algebra & Scientific Computational Workbench (Cyber Amethyst Palette - NO BLUE)
    case 'calcverse':
      return (
        <div className="card-custom-widget widget-theme-math">
          <div className="math-workbench-deck">
            {/* 3x3 Matrix Determinant Bracket Display */}
            <div className="math-matrix-box">
              <div className="matrix-bracket-left">[</div>
              <div className="matrix-numbers-grid">
                <span>3</span><span>1</span><span>4</span>
                <span>1</span><span>5</span><span>9</span>
                <span>2</span><span>6</span><span>5</span>
              </div>
              <div className="matrix-bracket-right">]</div>
              <div className="matrix-eval-output">
                <span className="eval-label">det(A)</span>
                <span className="eval-val">142</span>
                <span className="eval-tag">RANK: 3 · FULL</span>
              </div>
            </div>

            {/* Live Function Graph & Base Converter */}
            <div className="math-telemetry-row">
              <div className="math-graph-mini">
                <svg viewBox="0 0 100 30" className="math-sine-svg">
                  <path
                    d="M 0 15 Q 25 0 50 15 T 100 15"
                    fill="none"
                    stroke="#a855f7"
                    strokeWidth="2"
                  />
                </svg>
                <span className="graph-fn">f(x) = sin(x) + cos(2x)</span>
              </div>
              <div className="math-base-strip">
                <span className="base-chip">HEX: 0x7FFA</span>
                <span className="base-chip">BIN: 0111 1111</span>
                <span className="base-chip">DEC: 32762</span>
              </div>
            </div>
          </div>
        </div>
      );

    // 05. ReadmeHub — Interactive Dual Mode: Rendered GitHub README vs Raw Markdown (Suggestion 4)
    case 'readme-hub':
      return <ReadmeHubInteractiveWidget />;

    // 06. Tailor System — Atelier Measurement CRM & Kanban Production Pipeline
    case 'tailor-system':
      return (
        <div className="card-custom-widget widget-theme-tailor">
          <div className="tailor-crm-deck">
            {/* Garment Measurement Blueprint */}
            <div className="tailor-blueprint-row">
              <div className="blueprint-garment-meta">
                <span className="garment-order-id">ORDER #TK-8821 // 3-PIECE TUXEDO</span>
                <span className="garment-client">CLIENT: VERIFIED · INR 14,500</span>
              </div>
              <div className="blueprint-specs-grid">
                <span className="spec-tile">CHEST: 38.5"</span>
                <span className="spec-tile">SHOULDER: 18.0"</span>
                <span className="spec-tile">SLEEVE: 25.5"</span>
                <span className="spec-tile">WAIST: 32.0"</span>
              </div>
            </div>

            {/* Kanban Production Pipeline */}
            <div className="tailor-kanban-pipeline">
              <span className="kanban-step done">01. INTAKE</span>
              <span className="kanban-step done">02. CUTTING</span>
              <span className="kanban-step active">03. STITCHING (72%)</span>
              <span className="kanban-step">04. FINAL QC</span>
              <span className="kanban-step">05. READY</span>
            </div>
          </div>
        </div>
      );

    // 07. Matrix Calculator — Android Material You Simulation & Linear Algebra
    case 'matrix-calculator':
      return (
        <div className="card-custom-widget widget-theme-matrix">
          <div className="matrix-calc-deck">
            <div className="matrix-steps-header">
              <span className="calc-os-badge">ANDROID NATIVE · OFFLINE ENGINE</span>
              <span className="calc-benchmark">&lt; 0.4ms SOLVE TIME</span>
            </div>
            {/* Step-by-Step Row Elimination */}
            <div className="matrix-solver-steps">
              <div className="step-row">
                <span className="step-num">STEP 1</span>
                <span className="step-math">R₂ ← R₂ - 2·R₁ (Pivot row 1)</span>
              </div>
              <div className="step-row">
                <span className="step-num">STEP 2</span>
                <span className="step-math">R₃ ← R₃ + 0.5·R₂ (Upper Triangular form achieved)</span>
              </div>
              <div className="step-row result">
                <span className="step-num">OUT</span>
                <span className="step-math">det(A) = 42 · Invertible · Zero Network Calls</span>
              </div>
            </div>
          </div>
        </div>
      );

    // 08. Bootloader Unlock Guide — Hardware Diagnostics & Recovery Wizard Stepper
    case 'bootloader-unlock':
      return (
        <div className="card-custom-widget widget-theme-bootloader">
          <div className="bootloader-wizard-deck">
            {/* 4-Stage Step-by-Step Roadmap Stepper */}
            <div className="bootloader-stepper-row">
              <div className="step-pill done">
                <span className="step-idx">1</span>
                <span className="step-name">OEM UNLOCK</span>
              </div>
              <span className="step-connector active" />
              <div className="step-pill done">
                <span className="step-idx">2</span>
                <span className="step-name">FASTBOOT REBOOT</span>
              </div>
              <span className="step-connector active" />
              <div className="step-pill active">
                <span className="step-idx">3</span>
                <span className="step-name">FLASHING UNLOCK</span>
              </div>
              <span className="step-connector" />
              <div className="step-pill">
                <span className="step-idx">4</span>
                <span className="step-name">BOOT VERIFIED</span>
              </div>
            </div>

            {/* Diagnostic Hardware Driver Status */}
            <div className="bootloader-diag-row">
              <span className="diag-item ok">USB DEBUGGING: AUTHORIZED</span>
              <span className="diag-item ok">FASTBOOT INTERFACE: READY</span>
              <span className="diag-item shield">ANTI-BRICK SHIELD: ACTIVE</span>
            </div>
          </div>
        </div>
      );

    // 09. GSI Flashing Guide — Android Treble Architecture & Dynamic Partitions
    case 'gsi-flashing-guide':
      return (
        <div className="card-custom-widget widget-theme-gsi">
          <div className="treble-arch-deck">
            {/* Treble Architecture Separation Diagram */}
            <div className="treble-layers-stack">
              <div className="treble-layer aosp">
                <span className="layer-tag">AOSP GENERIC SYSTEM IMAGE (GSI)</span>
                <span className="layer-files">system.img · system_ext.img</span>
              </div>
              <div className="treble-interface-divider">
                <span className="divider-line" />
                <span className="divider-label">HIDL / AIDL HARDWARE ABSTRACTION BARRIER</span>
                <span className="divider-line" />
              </div>
              <div className="treble-layer vendor">
                <span className="layer-tag">OEM VENDOR DEVICE IMPLEMENTATION</span>
                <span className="layer-files">vendor.img · odm.img · boot.img</span>
              </div>
            </div>

            {/* Dynamic Super Partition Map */}
            <div className="treble-super-row">
              <span className="super-label">DYNAMIC SUPER PARTITIONS:</span>
              <span className="super-cell gsi">system_a (GSI)</span>
              <span className="super-cell">vendor_a</span>
              <span className="super-cell">product_a</span>
            </div>
          </div>
        </div>
      );

    default:
      return null;
  }
}

/**
 * Interactive Card Word with Magnetic Repulsion & Elastic Attach:
 * Smoothly attaches/repulses on cursor movement, illuminates with project neon tint,
 * and springs back gracefully on pointer leave.
 */
function InteractiveCardWord({
  word,
  tint,
  isTitle = false,
}: {
  word: string;
  tint?: string;
  isTitle?: boolean;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  const handlePointerMove = (e: React.PointerEvent<HTMLSpanElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.hypot(dx, dy);
    const radius = 60;

    if (dist < radius) {
      setActive(true);
      const factor = (radius - dist) / radius;
      if (dist < 18) {
        // Subtle repulsive cushion
        setPos({
          x: -Math.sign(dx || 1) * Math.min(8, (18 - dist) * 0.45),
          y: -Math.sign(dy || 1) * Math.min(7, (18 - dist) * 0.45),
        });
      } else {
        // Elastic magnetic attach towards cursor
        setPos({
          x: dx * factor * 0.28,
          y: dy * factor * 0.28,
        });
      }
    }
  };

  const handlePointerLeave = () => {
    setActive(false);
    setPos({ x: 0, y: 0 });
  };

  return (
    <motion.span
      ref={ref}
      className={`card-interactive-word ${active ? 'is-active' : ''}`}
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      animate={{ x: pos.x, y: pos.y }}
      transition={{ type: 'spring', stiffness: 380, damping: 22 }}
      style={{
        display: 'inline-block',
        marginRight: isTitle ? '0.22em' : '0.26em',
        color: active && tint ? tint : undefined,
        textShadow: active && tint ? `0 0 10px ${tint}` : undefined,
        cursor: 'default',
        willChange: 'transform',
      }}
    >
      {word}
    </motion.span>
  );
}

function InteractiveCardText({
  text,
  tint,
  isTitle = false,
}: {
  text: string;
  tint?: string;
  isTitle?: boolean;
}) {
  const words = text.split(' ');
  return (
    <>
      {words.map((w, idx) => (
        <InteractiveCardWord
          key={`${w}-${idx}`}
          word={w}
          tint={tint}
          isTitle={isTitle}
        />
      ))}
    </>
  );
}

export default function Missions() {
  const cards = useRef<(HTMLElement | null)[]>([]);
  const [activeMissionIndex, setActiveMissionIndex] = useState(0);
  const [isInMissions, setIsInMissions] = useState(false);
  const N = EPISODES.length;

  // Responsive down-to-up card stacking & section tracking
  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      const vh = window.innerHeight;
      let activeIdx = 0;

      // Track if missions section is currently in viewport
      const secEl = document.getElementById('projects');
      if (secEl) {
        const secRect = secEl.getBoundingClientRect();
        const inside = secRect.top <= vh * 0.75 && secRect.bottom >= vh * 0.25;
        setIsInMissions(inside);
      }

      cards.current.forEach((card, i) => {
        if (!card) return;
        const cardRect = card.getBoundingClientRect();
        if (cardRect.top <= vh * 0.45) {
          activeIdx = i;
        }

        const nextCard = cards.current[i + 1];

        if (nextCard) {
          const nextRect = nextCard.getBoundingClientRect();

          // Overlap only compresses subtly when next card arrives within range
          const dist = nextRect.top - cardRect.top;
          const overlap = clamp(1 - dist / Math.max(180, vh * 0.5), 0, 1);

          // Subtle physical depth compression: card stays fully opaque (NO half-cutting)
          const scale = 1 - overlap * 0.035;
          const translateY = -overlap * 4;

          card.style.transform = `scale(${scale}) translateY(${translateY}px)`;
          card.style.opacity = '1';
          card.style.filter = 'none';
        } else {
          // Last card (9th card) stays 100% visible, crisp, and settled on top
          card.style.transform = 'scale(1) translateY(0)';
          card.style.opacity = '1';
          card.style.filter = 'none';
        }
      });

      setActiveMissionIndex(activeIdx);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    onScroll();

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      cancelAnimationFrame(raf);
    };
  }, []);

  // Dynamic Favicon Theme Adaptation (Missions Section ONLY)
  useEffect(() => {
    const favicon = document.querySelector("link[rel*='icon']") as HTMLLinkElement;
    if (!favicon) return;

    if (!isInMissions) {
      // Outside missions section: immediately restore original favicon
      favicon.href = '/favicon.png';
      return;
    }

    const activeProject = EPISODES[activeMissionIndex] || EPISODES[0];
    try {
      const canvas = document.createElement('canvas');
      canvas.width = 32;
      canvas.height = 32;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#0a080d';
        ctx.beginPath();
        ctx.arc(16, 16, 16, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = activeProject.tint;
        ctx.beginPath();
        ctx.arc(16, 16, 12, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 13px monospace';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(String(activeMissionIndex + 1), 16, 17);

        favicon.href = canvas.toDataURL('image/png');
      }
    } catch {}
  }, [isInMissions, activeMissionIndex]);

  // 3D Perspective Tilt on Project Cards (Suggestion 2)
  const spot = (e: React.PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    const b = el.getBoundingClientRect();
    const x = e.clientX - b.left;
    const y = e.clientY - b.top;
    el.style.setProperty('--mx', `${x}px`);
    el.style.setProperty('--my', `${y}px`);

    const px = (x / b.width - 0.5) * 2;
    const py = (y / b.height - 0.5) * 2;
    const rotX = (-py * 4.2).toFixed(2);
    const rotY = (px * 4.2).toFixed(2);
    el.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-2px)`;
  };

  const unspot = (e: React.PointerEvent<HTMLElement>) => {
    const el = e.currentTarget;
    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
  };

  return (
    <section className="missions" id="projects">
      {/* Floating Card Progress Telemetry HUD — ONLY rendered/visible inside Missions */}
      <AnimatePresence>
        {isInMissions && (
          <motion.div
            className="ms-floating-counter-hud"
            initial={{ opacity: 0, x: 25 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 25 }}
            transition={{ duration: 0.3 }}
            aria-hidden
          >
            <span
              className="hud-pulse-dot"
              style={{ background: EPISODES[activeMissionIndex]?.tint || 'var(--red)' }}
            />
            <span className="hud-card-no">{pad2(activeMissionIndex + 1)}</span>
            <span className="hud-slash">/</span>
            <span className="hud-total">{pad2(N)}</span>
            <span className="hud-name">{EPISODES[activeMissionIndex]?.name}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="sec-head">
        <p className="eyebrow">CHAPTER III</p>
        <h2>
          Missions <span>Classified</span>
        </h2>
        <p className="sec-sub">
          9 production systems built and shipped since 2016. Scrolling down brings each card up, smoothly overlapping the card below.
        </p>
      </header>

      {/* Down-to-Up Overlapping Mission Deck with Custom Card Identities */}
      <div className="ms-stack-deck">
        {EPISODES.map((e, i) => {
          const isReversed = i % 2 === 1;

          return (
            <article
              key={e.id}
              id={`mission-${e.id}`}
              className={`ms-stack-card card-${e.id} ${i === N - 1 ? 'is-last-card' : ''}`}
              ref={(el) => {
                cards.current[i] = el;
              }}
              style={{
                top: `calc(clamp(58px, 7.5vh, 80px) + ${i * 1.5}px)`,
                zIndex: i + 1,
                '--proj-tint': e.tint,
              } as React.CSSProperties}
            >
              <div
                className={`ms-card-content theme-${e.id} ${isReversed ? 'reverse' : ''}`}
                onPointerMove={spot}
                onPointerLeave={unspot}
                data-hot
              >
                <div className="ms-spot" />

                {/* Media Column (Alternates left on even, right on odd for desktop) */}
                <div className="ms-media-col">
                  <img src={e.still} alt={e.name} loading="lazy" />
                  <div
                    className="ms-duo-overlay"
                    style={{
                      background: `linear-gradient(135deg, ${e.tint}66 0%, rgba(10, 8, 12, 0.92) 75%)`,
                    }}
                  />
                  <span className="ms-card-watermark">{pad2(i + 1)}</span>
                  <span
                    className="ms-card-stamp"
                    style={{
                      borderColor: e.tint,
                      color: '#fff',
                      boxShadow: `0 0 16px ${e.tint}55`,
                    }}
                  >
                    {e.rank} · {e.match}% MATCH
                  </span>
                </div>

                {/* Body Details Column: Bespoke Custom UI for each project */}
                <div className="ms-body-col">
                  {/* Clean header without redundant genre list or status badges */}
                  <div className="ms-meta-header">
                    <span className="ms-mission-num">
                      MISSION {pad2(i + 1)} OF {pad2(N)}
                    </span>
                  </div>

                  <h3 className="ms-card-title" style={{ '--title-tint': e.tint } as React.CSSProperties}>
                    <InteractiveCardText text={e.name} tint={e.tint} isTitle />
                  </h3>

                  <p className="ms-card-tagline">
                    “<InteractiveCardText text={e.tagline} tint={e.tint} />”
                  </p>
                  <p className="ms-card-desc">
                    <InteractiveCardText text={e.desc} tint={e.tint} />
                  </p>

                  {/* Bespoke Domain Aesthetic Showcase */}
                  <ProjectCustomIdentityWidget project={e} />

                  {/* Technology Micro-Chips (NO dots before items) */}
                  <ul className="ms-tech-pills">
                    {e.tech.map((t) => (
                      <li
                        key={t}
                        className="ms-tech-pill-item"
                        style={{ '--tech-accent': e.tint } as React.CSSProperties}
                      >
                        {t}
                      </li>
                    ))}
                  </ul>

                  {/* Verified Interactive Action Buttons */}
                  <div className={`ms-actions-bar bar-${e.id}`}>
                    {e.id === 'mkr-music' ? (
                      <>
                        {/* Always downloads the latest universal release APK directly from GitHub releases */}
                        <a
                          className="ms-btn btn-mkr-music live mkr-music-premium-dl"
                          href={e.downloadUrl}
                          target="_blank"
                          rel="noreferrer"
                          title="Always downloads the latest universal release APK"
                        >
                          <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2.4">
                            <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v4h16v-4" />
                          </svg>
                          <span>DOWNLOAD LATEST APK</span>
                          <span className="btn-release-tag">UNIVERSAL</span>
                        </a>

                        {e.liveUrl && (
                          <a className="ms-btn btn-mkr-music source" href={e.liveUrl} target="_blank" rel="noreferrer">
                            <span>Launch Web Player</span>
                            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.4">
                              <path d="M7 17L17 7M9 7h8v8" />
                            </svg>
                          </a>
                        )}

                        <a className="ms-btn btn-mkr-music alt" href={e.url} target="_blank" rel="noreferrer">
                          <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                          </svg>
                          <span>GitHub Repo</span>
                        </a>
                      </>
                    ) : (
                      <>
                        {e.liveUrl && (
                          <a className={`ms-btn btn-${e.id} live`} href={e.liveUrl} target="_blank" rel="noreferrer">
                            <span>Launch App</span>
                            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.4">
                              <path d="M7 17L17 7M9 7h8v8" />
                            </svg>
                          </a>
                        )}

                        <a className={`ms-btn btn-${e.id} source`} href={e.url} target="_blank" rel="noreferrer">
                          <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
                            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                          </svg>
                          <span>Source Code</span>
                        </a>

                        {e.downloadUrl && (
                          <a className={`ms-btn btn-${e.id} download`} href={e.downloadUrl} target="_blank" rel="noreferrer">
                            <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2.4">
                              <path d="M12 3v12m0 0l-4-4m4 4l4-4M4 17v4h16v-4" />
                            </svg>
                            <span>Download APK</span>
                          </a>
                        )}

                        {e.altUrl && (
                          <a className={`ms-btn btn-${e.id} alt`} href={e.altUrl} target="_blank" rel="noreferrer">
                            <span>Mirror</span>
                            <svg viewBox="0 0 24 24" width="12" height="12" fill="none" stroke="currentColor" strokeWidth="2.2">
                              <path d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </a>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
