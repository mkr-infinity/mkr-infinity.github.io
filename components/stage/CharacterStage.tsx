'use client';

import { useEffect, useRef } from 'react';
import { frames, initialAboutImg, initialHeroImg, nearest } from '@/lib/frames';
import { aboutFrameAt, clamp, easeInOut, easeOut, heroFrameAt, lerp, live, seg } from '@/lib/store';

type Place = { cx: number; cy: number; h: number; rot: number; alpha: number };
const ASPECT = 16 / 9;

function heroPlace(vw: number, vh: number, mobile: boolean): Place {
  if (mobile) return { cx: vw * 0.75, cy: vh * 0.48, h: vh * 0.72, rot: 0, alpha: 1 };
  const h = Math.max(vh, (vw / ASPECT) * 0.94);
  return { cx: vw * 0.70, cy: vh * 0.5, h, rot: 0, alpha: 1 };
}

function aboutPlace(vw: number, vh: number, mobile: boolean): Place {
  if (mobile) return { cx: vw * 0.5, cy: vh * 0.38, h: vh * 0.64, rot: 0, alpha: 1 };
  return { cx: vw * 0.28, cy: vh * 0.56, h: vh * 0.98, rot: 0, alpha: 1 };
}

/**
 * High-performance full-screen WebP character stage:
 * - Scrubbed anime character WebP frames with zero lag
 * - Fallback anchor frames so character is visible on frame 1
 * - DPR clamped to 1.5 for silky 60–120 FPS
 */
export default function CharacterStage() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const wrap = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const cv = canvas.current;
    if (!cv) return;
    const ctx = cv.getContext('2d', { alpha: true });
    if (!ctx) return;

    let raf = 0;
    let dpr = 1;
    let vw = 0,
      vh = 0;

    const resize = () => {
      // Clamp DPR to 1.5 to eliminate GPU fillrate lag on 2K/4K/Retina displays
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      vw = window.innerWidth;
      vh = window.innerHeight;
      cv.width = Math.round(vw * dpr);
      cv.height = Math.round(vh * dpr);
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'medium';
    };
    resize();
    window.addEventListener('resize', resize, { passive: true });

    let heroIdx = 0,
      aboutIdx = 0,
      mx = 0,
      my = 0;
    const ghosts: Place[] = [];
    let landed = false;
    let ring = 1;
    let ringPos = { x: 0, y: 0 };
    let last = performance.now();

    const progressOf = (id: string, mode: 'pin' | 'between', toId?: string) => {
      const el = document.getElementById(id);
      if (!el) return 0;
      const r = el.getBoundingClientRect();
      if (mode === 'pin') return clamp(-r.top / Math.max(1, r.height - vh));
      const toEl = toId ? document.getElementById(toId) : null;
      if (!toEl) return 0;
      const to = toEl.getBoundingClientRect();
      const start = r.bottom - vh;
      const span = to.top - start;
      return clamp(-start / Math.max(1, span));
    };

    const draw = (img: HTMLImageElement | null, p: Place) => {
      if (!img || p.alpha <= 0.001) return;
      const h = p.h,
        w = h * ASPECT;
      ctx.save();
      ctx.globalAlpha = p.alpha;
      ctx.translate(p.cx * dpr, p.cy * dpr);
      if (p.rot) ctx.rotate(p.rot);
      ctx.drawImage(img, (-w / 2) * dpr, (-h / 2) * dpr, w * dpr, h * dpr);
      ctx.restore();
    };

    const loop = () => {
      const now = performance.now();
      const dt = Math.min(0.04, (now - last) / 1000);
      last = now;
      const mobile = vw < 820;

      live.hero = progressOf('billboard', 'pin');
      live.flight = progressOf('billboard', 'between', 'about');
      live.about = progressOf('about', 'pin');
      const aboutEl = document.getElementById('about');
      live.exit = aboutEl ? Math.max(0, -(aboutEl.getBoundingClientRect().bottom - vh)) : 0;

      // Snappy lerp (0.004 factor gives immediate response without sluggish delay)
      heroIdx = lerp(heroIdx, heroFrameAt(live.hero), 1 - Math.pow(0.004, dt));
      aboutIdx = lerp(aboutIdx, aboutFrameAt(live.about), 1 - Math.pow(0.004, dt));

      // Cursor parallax on the whole stage
      mx = lerp(mx, live.mouse.x, 1 - Math.pow(0.03, dt));
      my = lerp(my, live.mouse.y, 1 - Math.pow(0.03, dt));

      if (wrap.current) {
        wrap.current.style.transform = `perspective(1200px) rotateY(${mx * 4}deg) rotateX(${-my * 2.5}deg) translate3d(${mx * -14}px, ${my * -8}px, 0)`;
      }

      ctx.clearRect(0, 0, cv.width, cv.height);

      const A = heroPlace(vw, vh, mobile);
      const B = aboutPlace(vw, vh, mobile);
      let place: Place;
      let img: HTMLImageElement | null = null;

      if (live.flight <= 0 && live.about <= 0) {
        // Hero: scrubbed character animation
        place = { ...A, h: A.h * (1 + 0.03 * seg(live.hero, 0, 0.05)) };
        img = nearest(frames.hero, heroIdx, initialHeroImg);
        ghosts.length = 0;
        landed = false;
      } else if (live.about <= 0) {
        // Flight: character jumps down between hero and origin
        const t = easeInOut(live.flight);
        const arc = Math.sin(Math.PI * live.flight);
        place = {
          cx: lerp(A.cx, B.cx, t),
          cy: lerp(A.cy, B.cy, t) + arc * vh * (mobile ? 0.04 : 0.07),
          h: lerp(A.h, B.h, t) * (1 - arc * 0.2),
          rot: arc * (B.cx < A.cx ? -0.1 : 0.1) * (mobile ? 0.5 : 1),
          alpha: 1,
        };
        img = nearest(frames.about, 0, initialAboutImg) || nearest(frames.hero, frames.hero.length - 1, initialHeroImg);
        if (arc > 0.06) {
          ghosts.push({ ...place });
          if (ghosts.length > 5) ghosts.shift();
        } else {
          ghosts.length = 0;
        }
        if (live.flight > 0.96 && !landed) {
          landed = true;
          ring = 0;
          ringPos = { x: B.cx, y: B.cy + B.h * 0.46 };
        }
        if (live.flight < 0.9) landed = false;
      } else {
        // About: continues smoothly and moves with page scroll
        place = { ...B, cy: B.cy - live.exit };
        img = nearest(frames.about, aboutIdx, initialAboutImg);
        ghosts.length = 0;
      }

      // Draw shadow afterimages
      ghosts.forEach((g, i) => draw(img, { ...g, alpha: ((i + 1) / ghosts.length) * 0.16 }));
      draw(img, place);

      // Landing shockwave pulse
      if (ring < 1) {
        ring = Math.min(1, ring + dt * 1.8);
        const k = easeOut(ring);
        ctx.save();
        ctx.translate(ringPos.x * dpr, ringPos.y * dpr);
        ctx.scale(1, 0.24);
        ctx.beginPath();
        ctx.arc(0, 0, (35 + k * (mobile ? 200 : 380)) * dpr, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(229, 9, 20, ${(1 - ring) * 0.85})`;
        ctx.lineWidth = (5 - k * 4) * dpr;
        ctx.shadowColor = '#e50914';
        ctx.shadowBlur = 24 * dpr;
        ctx.stroke();
        ctx.restore();
      }

      // Keep stage visible through hero, flight, and about
      cv.style.visibility = live.exit > vh * 1.1 ? 'hidden' : 'visible';
      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <div className="stage" aria-hidden>
      <div className="stage-inner" ref={wrap}>
        <canvas ref={canvas} />
      </div>
    </div>
  );
}
