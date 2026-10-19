import React, { useState, useEffect } from 'react';
import { Send, Menu, X, Volume2, VolumeX, Terminal } from 'lucide-react';

interface NavbarProps {
  soundEnabled: boolean;
  toggleSound: () => void;
  playSfx: (type: 'click' | 'hover') => void;
}

export const Navbar: React.FC<NavbarProps> = ({ soundEnabled, toggleSound, playSfx }) => {
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

  return (
    <header className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">
      {/* Top Scroll Progress Line */}
      <div className="w-full h-[2px] bg-white/5 overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-500 transition-all duration-100 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      <nav
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-2 transition-all duration-300 ${
          isScrolled
            ? 'bg-slate-950/80 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_8px_32px_rgba(0,0,0,0.6)] py-3'
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
            <div className="relative w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500/20 to-purple-500/20 border border-cyan-500/30 flex items-center justify-center overflow-hidden group-hover:border-cyan-400 transition-colors">
              <span className="font-mono text-cyan-400 font-bold text-sm">MKR</span>
              <div className="absolute inset-0 bg-cyan-400/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-sm sm:text-base tracking-tight text-white flex items-center gap-2">
                Mohammad Kaif Raja
                <span className="inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-mono bg-cyan-500/10 text-cyan-300 border border-cyan-500/20">
                  v3
                </span>
              </span>
              <span className="text-xs font-mono text-slate-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
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
                className="px-3.5 py-1.5 text-sm font-medium text-slate-300 hover:text-white rounded-lg hover:bg-white/5 transition-colors"
              >
                {link.name}
              </a>
            ))}
          </div>

          {/* Action CTAs & Controls */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Sound Toggle */}
            <button
              onClick={() => {
                toggleSound();
                playSfx('click');
              }}
              onMouseEnter={() => playSfx('hover')}
              className={`p-2 rounded-xl border transition-all text-xs flex items-center gap-1.5 ${
                soundEnabled
                  ? 'border-cyan-500/40 bg-cyan-500/10 text-cyan-300 shadow-[0_0_15px_rgba(0,242,254,0.15)]'
                  : 'border-white/10 bg-white/5 text-slate-400 hover:text-white'
              }`}
              title={soundEnabled ? 'Mute Interface Audio' : 'Enable Interactive Audio'}
              aria-label="Toggle interface sound"
            >
              {soundEnabled ? <Volume2 size={16} /> : <VolumeX size={16} />}
              <span className="hidden xl:inline text-[11px] font-mono">
                {soundEnabled ? 'Audio ON' : 'Audio OFF'}
              </span>
            </button>

            {/* Telegram Primary CTA */}
            <a
              href="https://t.me/mkr_infinity"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => playSfx('click')}
              onMouseEnter={() => playSfx('hover')}
              className="relative group overflow-hidden px-3.5 sm:px-4 py-2 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-medium text-xs sm:text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(0,242,254,0.25)] hover:shadow-[0_0_25px_rgba(0,242,254,0.4)] transition-all hover:scale-[1.02] active:scale-[0.98]"
            >
              <Send size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              <span className="font-semibold tracking-wide">Telegram</span>
              <span className="hidden sm:inline text-cyan-200 text-xs">Direct</span>
            </a>

            {/* Mobile Menu Button */}
            <button
              onClick={() => {
                setMobileMenuOpen(!mobileMenuOpen);
                playSfx('click');
              }}
              className="md:hidden p-2 rounded-xl bg-white/5 border border-white/10 text-slate-300 hover:text-white"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pt-3 border-t border-white/10 flex flex-col gap-1 pb-2">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => {
                  setMobileMenuOpen(false);
                  playSfx('click');
                }}
                className="px-4 py-2.5 text-sm font-medium text-slate-200 hover:text-cyan-300 rounded-lg hover:bg-white/5 transition-colors flex items-center justify-between"
              >
                <span>{link.name}</span>
                <span className="text-xs text-slate-500 font-mono">→</span>
              </a>
            ))}
            <div className="pt-2 mt-1 border-t border-white/5 flex items-center justify-between px-4 text-xs font-mono text-slate-400">
              <span className="flex items-center gap-1.5">
                <Terminal size={14} className="text-cyan-400" />
                mkr-infinity
              </span>
              <span className="text-emerald-400">● 6+ Years Tech</span>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};
