import React, { useState, useEffect } from 'react';
import { Send, ArrowDown, Terminal, Sparkles, ShieldCheck, Cpu } from 'lucide-react';
import { GithubIcon } from './Icons';

interface HeroProps {
  playSfx: (type: 'click' | 'hover') => void;
}

export const Hero: React.FC<HeroProps> = ({ playSfx }) => {
  const roles = [
    'Independent Developer',
    'Linux & Systems Enthusiast',
    'Android & APK Builder',
    'Open-Source Creator',
    'Practical Problem Solver',
  ];

  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const typingSpeed = isDeleting ? 30 : 70;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(currentRole.substring(0, displayedText.length + 1));
        if (displayedText.length === currentRole.length) {
          setTimeout(() => setIsDeleting(true), 1800);
        }
      } else {
        setDisplayedText(currentRole.substring(0, displayedText.length - 1));
        if (displayedText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center pt-24 pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto w-full flex flex-col items-center text-center relative z-10">
        
        {/* Availability Badge (Warm Amber & Emerald - No Blue) */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 dark:bg-stone-900/90 border border-amber-500/30 text-amber-800 dark:text-amber-300 text-xs sm:text-sm font-medium mb-8 backdrop-blur-md shadow-[0_2px_12px_rgba(245,158,11,0.1)] dark:shadow-[0_0_20px_rgba(245,158,11,0.15)] animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          <span>Available for Open-Source Collaboration & Systems Projects</span>
        </div>

        {/* Identity Headings */}
        <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-stone-900 dark:text-white mb-6 font-display">
          Hi, I'm{' '}
          <span className="bg-gradient-to-r from-amber-600 via-amber-500 to-emerald-600 dark:from-amber-400 dark:via-yellow-300 dark:to-emerald-400 bg-clip-text text-transparent glow-gold">
            Mohammad Kaif Raja
          </span>
        </h1>

        {/* Dynamic Typing Title */}
        <div className="h-10 sm:h-12 flex items-center justify-center mb-6">
          <p className="text-lg sm:text-2xl font-mono text-stone-700 dark:text-stone-300 flex items-center">
            <span className="text-amber-600 dark:text-amber-400 mr-2 font-bold">&gt;</span>
            <span>{displayedText}</span>
            <span className="w-2.5 h-6 bg-amber-500 dark:bg-amber-400 ml-1 animate-pulse" />
          </p>
        </div>

        {/* Clear Persona Description */}
        <p className="max-w-3xl text-base sm:text-lg md:text-xl text-stone-600 dark:text-stone-300 font-normal leading-relaxed mb-10">
          Independent developer and technology enthusiast with{' '}
          <span className="text-amber-700 dark:text-amber-400 font-semibold">6+ years of hands-on experience</span>{' '}
          in Linux systems, Android builds, open-source architectures, and modern web applications.
          Known online as <span className="text-emerald-700 dark:text-emerald-400 font-mono font-medium">@mkr_infinity</span>.
        </p>

        {/* Primary & Secondary Action CTAs */}
        <div className="flex flex-wrap items-center justify-center gap-4 w-full max-w-md sm:max-w-none mb-14">
          <a
            href="https://t.me/mkr_infinity"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playSfx('click')}
            onMouseEnter={() => playSfx('hover')}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-amber-500 hover:bg-amber-400 dark:bg-gradient-to-r dark:from-amber-500 dark:to-amber-600 text-stone-950 font-bold text-sm sm:text-base flex items-center justify-center gap-2.5 shadow-[0_4px_20px_rgba(245,158,11,0.3)] hover:shadow-[0_6px_28px_rgba(245,158,11,0.45)] transition-all hover:scale-105 active:scale-95"
          >
            <Send size={18} />
            <span>Connect on Telegram (Primary)</span>
          </a>

          <a
            href="#flagship"
            onClick={() => playSfx('click')}
            onMouseEnter={() => playSfx('hover')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-white/90 dark:bg-stone-900/80 hover:bg-stone-50 dark:hover:bg-stone-800 border border-stone-200 dark:border-white/10 hover:border-amber-500/40 text-stone-800 dark:text-stone-200 hover:text-stone-950 dark:hover:text-white font-medium text-sm sm:text-base flex items-center justify-center gap-2 backdrop-blur-md transition-all hover:scale-105 shadow-sm"
          >
            <Sparkles size={18} className="text-amber-500" />
            <span>MKR Music Flagship</span>
          </a>

          <a
            href="https://github.com/mkr-infinity"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playSfx('click')}
            onMouseEnter={() => playSfx('hover')}
            className="w-full sm:w-auto px-5 py-3.5 rounded-xl bg-white/80 dark:bg-stone-900/60 hover:bg-stone-50 dark:hover:bg-stone-800 border border-stone-200 dark:border-white/10 text-stone-700 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white font-medium text-sm sm:text-base flex items-center justify-center gap-2 backdrop-blur-md transition-all shadow-sm"
          >
            <GithubIcon size={18} />
            <span>GitHub</span>
          </a>
        </div>

        {/* Stated Metric Badges */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 w-full max-w-4xl">
          <div className="glass-panel p-4 rounded-2xl text-left border border-stone-200/80 dark:border-white/5 hover:border-amber-500/40 transition-colors">
            <div className="text-xs font-mono text-amber-600 dark:text-amber-400 mb-1 flex items-center gap-1.5 font-semibold">
              <Cpu size={14} />
              <span>STATED EXP</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white font-display">6+ Years</div>
            <div className="text-xs text-stone-500 dark:text-slate-400 mt-1">Hands-on technology journey</div>
          </div>

          <div className="glass-panel p-4 rounded-2xl text-left border border-stone-200/80 dark:border-white/5 hover:border-emerald-500/40 transition-colors">
            <div className="text-xs font-mono text-emerald-600 dark:text-emerald-400 mb-1 flex items-center gap-1.5 font-semibold">
              <ShieldCheck size={14} />
              <span>LINUX & CLI</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white font-display">~95%</div>
            <div className="text-xs text-stone-500 dark:text-slate-400 mt-1">System & kernel mastery</div>
          </div>

          <div className="glass-panel p-4 rounded-2xl text-left border border-stone-200/80 dark:border-white/5 hover:border-rose-500/40 transition-colors">
            <div className="text-xs font-mono text-rose-600 dark:text-rose-400 mb-1 flex items-center gap-1.5 font-semibold">
              <Terminal size={14} />
              <span>PROJECTS</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white font-display">10 Apps/Docs</div>
            <div className="text-xs text-stone-500 dark:text-slate-400 mt-1">Verified repos & guides</div>
          </div>

          <div className="glass-panel p-4 rounded-2xl text-left border border-stone-200/80 dark:border-white/5 hover:border-amber-500/40 transition-colors">
            <div className="text-xs font-mono text-amber-600 dark:text-amber-400 mb-1 flex items-center gap-1.5 font-semibold">
              <Sparkles size={14} />
              <span>ECOSYSTEM</span>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-stone-900 dark:text-white font-display">100% FLOSS</div>
            <div className="text-xs text-stone-500 dark:text-slate-400 mt-1">Free & private software</div>
          </div>
        </div>

        {/* Scroll Down Hint */}
        <div className="mt-14 animate-bounce">
          <a
            href="#about"
            onClick={() => playSfx('click')}
            className="text-stone-400 dark:text-slate-500 hover:text-amber-600 dark:hover:text-amber-400 transition-colors flex flex-col items-center gap-1 text-xs font-mono font-medium"
            aria-label="Scroll to About section"
          >
            <span>DISCOVER V3</span>
            <ArrowDown size={14} />
          </a>
        </div>
      </div>
    </section>
  );
};
