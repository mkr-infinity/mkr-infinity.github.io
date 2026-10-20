import { ABOUT_FRAMES, HERO_FRAMES, HERO_SKIP, live } from './store';

type Seq = (HTMLImageElement | null)[];
export const frames: { hero: Seq; about: Seq } = {
  hero: new Array(HERO_FRAMES).fill(null),
  about: new Array(ABOUT_FRAMES).fill(null),
};

const pad = (n: number) => String(n).padStart(3, '0');
let started = false;
const listeners = new Set<(p: number) => void>();

// Fallback initial images preloaded immediately
export let initialHeroImg: HTMLImageElement | null = null;
export let initialAboutImg: HTMLImageElement | null = null;

if (typeof window !== 'undefined') {
  initialHeroImg = new Image();
  initialHeroImg.decoding = 'async';
  initialHeroImg.src = `/frames/hero-hd/${pad(1 + HERO_SKIP)}.webp`;
  initialHeroImg.onload = () => {
    frames.hero[0] = initialHeroImg;
  };

  initialAboutImg = new Image();
  initialAboutImg.decoding = 'async';
  initialAboutImg.src = `/frames/about-hd/001.webp`;
  initialAboutImg.onload = () => {
    frames.about[0] = initialAboutImg;
  };
}

export function onFrameProgress(fn: (p: number) => void) {
  listeners.add(fn);
  fn(live.frameProgress);
  return () => {
    listeners.delete(fn);
  };
}

/** Loads coarse frames first (every 8th), then fills in, so scrubbing works almost immediately. */
export function loadFrames() {
  if (started || typeof window === 'undefined') return;
  started = true;
  const jobs: { seq: 'hero' | 'about'; i: number }[] = [];
  const seen = new Set<string>();

  // Prioritize first 10 frames and crucial anchor frames
  for (let i = 0; i < Math.min(12, HERO_FRAMES); i++) push('hero', i);
  for (let i = 0; i < Math.min(10, ABOUT_FRAMES); i++) push('about', i);

  for (const step of [16, 8, 4, 2, 1]) {
    for (let i = 0; i < HERO_FRAMES; i += step) push('hero', i);
    push('hero', HERO_FRAMES - 1);
    for (let i = 0; i < ABOUT_FRAMES; i += step) push('about', i);
    push('about', ABOUT_FRAMES - 1);
  }

  function push(seq: 'hero' | 'about', i: number) {
    const k = seq + i;
    if (seen.has(k)) return;
    seen.add(k);
    jobs.push({ seq, i });
  }

  const total = jobs.length;
  let done = 0;
  let cursor = 0;
  const CONCURRENCY = 8;

  const next = () => {
    const job = jobs[cursor++];
    if (!job) return;
    const img = new Image();
    img.decoding = 'async';
    img.src = `/frames/${job.seq}-hd/${pad(job.i + 1 + (job.seq === 'hero' ? HERO_SKIP : 0))}.webp`;
    const finish = () => {
      done++;
      live.frameProgress = done / total;
      listeners.forEach((l) => l(live.frameProgress));
      next();
    };
    img.onload = () => {
      frames[job.seq][job.i] = img;
      finish();
    };
    img.onerror = finish;
  };

  for (let c = 0; c < CONCURRENCY; c++) next();
}

/** Nearest loaded frame to index i, with immediate fallback to initial frame if still downloading. */
export function nearest(seq: Seq, i: number, fallback?: HTMLImageElement | null) {
  const n = Math.round(i);
  if (seq[n]) return seq[n];
  for (let d = 1; d < seq.length; d++) {
    if (seq[n - d]) return seq[n - d];
    if (seq[n + d]) return seq[n + d];
  }
  return fallback || null;
}
