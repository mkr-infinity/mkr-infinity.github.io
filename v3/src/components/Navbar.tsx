import React, { useState, useEffect } from 'react';
import { Send, Menu, X, Volume2, VolumeX, Terminal, Sun, Moon } from 'lucide-react';

interface NavbarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
  soundEnabled: boolean;
  toggleSound: () => void;
  playSfx: (type: 'click' | 'hover') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ 
  theme, 
  toggleTheme, 
  soundEnabled, 
  toggleSound, 
  playSfx 
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      const progress = totalScroll > 0 ? (window.scrollY / totalScroll) * 100 : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Flagship', href: '#flagship' },
    { name: 'Projects', href: '#projects' },
    { name: 'Guides & Docs', href: '#guides' },
    { name: 'Skills', href: '#skills' },
    { name: 'Contact', href: '#contact' },
  ];

  const isDark = theme === 'dark';

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Scroll Progress Line (Molten Gold to Emerald) */}
      <div className="w-full h-[2px] bg-stone-300/30 dark:bg-white/5 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-amber-500 via-emerald-500 to-amber-600 transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <nav
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/85 dark:bg-stone-950/85 backdrop-blur-xl border border-stone-200/80 dark:border-white/10 rounded-2xl shadow-[0_8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.7)] py-3'
            : 'bg-transparent py-4'
        }`}
      >
        <div className="flex items-center justify-between">
          {/* Logo & Identity */}
          <a
            href="#hero"
            onClick={() => playSfx('click')}
            onMouseEnter={() => playSfx('hover')}
            className="flex items-center gap-3 group"
          >
            <div className="relative w-10 h-10 rounded-xl bg-amber-500/10 dark:bg-amber-500/15 border border-amber-500/30 flex items-center justify-center overflow-hidden group-hover:border-amber-500 transition-colors">
              <span className="font-mono text-amber-600 dark:text-amber-400 font-bold text-sm">MKR</span>
              <div className="absolute inset-0 bg-amber-500/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm sm:text-base tracking-tight text-stone-900 dark:text-white flex items-center gap-2">
                Mohammad Kaif Raja
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono bg-amber-500/15 text-amber-700 dark:text-amber-300 border border-amber-500/30">
                  v3
                </span>
              </span>
              <span className="text-xs font-mono text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                @mkr_infinity
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <div className="hidden md:flex items-center gap-1 lg:gap-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => playSfx('click')}
                onMouseEnter={() => playSfx('hover')}
                className="px-3.5 py-1.5 text-sm font-medium text-stone-600 dark:text-stone-300 hover:text-stone-950 dark:hover:text-white rounded-lg hover:bg-stone-100 dark:hover:bg-white/5 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Action CTAs & Controls */}
          <div className="flex items-center gap-2 sm:gap-2.5">
            {/* Theme Toggle Button (Light / Dark) */}
            <button
              onClick={() => {
                toggleTheme();
                playSfx('click');
              }}
              onMouseEnter={() => playSfx('hover')}
              className="p-2 rounded-xl border border-stone-300/80 dark:border-white/10 bg-stone-100 dark:bg-white/5 text-stone-700 dark:text-stone-300 hover:text-amber-600 dark:hover:text-amber-400 transition-all flex items-center gap-1.5"
              title={isDark ? 'Switch to Light Theme' : 'Switch to Dark Theme'}
              aria-label="Toggle visual theme"
            >
              {isDark ? <Sun size={16} className="text-amber-400" /> : <Moon size={16} className="text-stone-800" />}
              <span className="hidden xl:inline text-[11px] font-mono">
                {isDark ? 'Light' : 'Dark'}
              </span>
            </button>

            {/* Sound Toggle */}
            <button
              onClick={() => {
                toggleSound();
                playSfx('click');
              }}
              onMouseEnter={() => playSfx('hover')}
              className={`p-2 rounded-xl border transition-all text-xs flex items-center gap-1.5 ${
                soundEnabled
                  ? 'border-amber-500/40 bg-amber-500/10 text-amber-600 dark:text-amber-300 shadow-[0_0_15px_rgba(245,158,11,0.15)]'
                  : 'border-stone-300/80 dark:border-white/10 bg-stone-100 dark:bg-white/5 text-stone-500 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
              title={soundEnabled ? 'Mute Interface Audio' : 'Enable Interactive Audio'}
              aria-label="Toggle interface sound"
            >
              {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
              <span className="hidden xl:inline text-[11px] font-mono">
                {soundEnabled ? 'SFX ON' : 'SFX OFF'}
              </span>
            </button>

            {/* Telegram Primary CTA (Molten Gold / Obsidian - No Blue) */}
            <a
              href="https://t.me/mkr_infinity"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playSfx('click')}
              onMouseEnter={() => playSfx('hover')}
              className="relative group overflow-hidden px-3.5 sm:px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 dark:bg-gradient-to-r dark:from-amber-500 dark:to-amber-600 dark:hover:from-amber-400 dark:hover:to-amber-500 text-stone-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-[0_4px_14px_rgba(245,158,11,0.25)] hover:shadow-[0_6px_20px_rgba(245,158,11,0.4)] transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Send size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              <span className="tracking-wide">Telegram</span>
              <span className="hidden sm:inline text-amber-950/80 dark:text-stone-950 text-xs font-semibold">Direct</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                playSfx('click');
              }}
              className="md:hidden p-2 rounded-xl bg-stone-100 dark:bg-white/5 border border-stone-200 dark:border-white/10 text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-stone-200 dark:border-white/10 flex flex-col gap-1 pb-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  setMobileMenuOpen(false);
                  playSfx('click');
                }}
                className="px-4 py-2.5 text-sm font-medium text-stone-700 dark:text-stone-200 hover:text-amber-600 dark:hover:text-amber-400 rounded-lg hover:bg-stone-100 dark:hover:bg-white/5 transition-colors flex items-center justify-between"
              >
                <span>{link.name}</span>
                <span className="text-xs text-stone-400 font-mono">→</span>
              </a>
            ))}
            <div className="pt-2 mt-1 border-t border-stone-200 dark:border-white/5 flex items-center justify-between px-4 text-xs font-mono text-stone-500 dark:text-stone-400">
              <span className="flex items-center gap-1.5">
                <Terminal size={14} className="text-amber-600 dark:text-amber-400" />
                mkr-infinity
              </span>
              <span className="text-emerald-600 dark:text-emerald-400">● 6+ Years Tech</span>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
