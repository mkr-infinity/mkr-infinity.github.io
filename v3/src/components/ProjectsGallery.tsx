import React, { useState } from 'react';
import { 
  ExternalLink, Download, CheckCircle2, 
  Calculator, Scissors, BookOpen, Sparkles
} from 'lucide-react';
import { GithubIcon } from './Icons';
import confetti from 'canvas-confetti';

interface ProjectsGalleryProps {
  playSfx: (type: 'click' | 'hover') => void;
}

export const ProjectsGallery: React.FC<ProjectsGalleryProps> = ({ playSfx }) => {
  const [tailorView, setTailorView] = useState<'customer' | 'management'>('customer');

  const handleDownload = () => {
    playSfx('click');
    confetti({
      particleCount: 40,
      spread: 50,
      origin: { y: 0.8 },
      colors: ['#00f2fe', '#8b5cf6', '#10b981'],
    });
  };

  return (
    <section id="projects" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono mb-3">
            <Sparkles size={14} />
            <span>VERIFIED APPLICATION SHOWCASE</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display mb-4">
            Curated Web & Android Applications
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            Purpose-built tools solving real user challenges, crafted with clean UI architectures,
            local-first data policies, and production deployment.
          </p>
        </div>

        <div className="space-y-16">
          
          {/* ========================================================
              02. TAILOR MASTER / TAILOR SYSTEM
          ======================================================== */}
          <div className="glass-panel rounded-3xl border border-white/10 hover:border-cyan-500/30 transition-all overflow-hidden p-6 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-md bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold">
                    02. Production SaaS Platform
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300 text-xs font-mono">
                    React + Firebase + Vite
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
                    <Scissors className="text-cyan-400" size={28} />
                    Tailor Master / Tailor System
                  </h3>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    A comprehensive tailoring management platform unifying customer self-service with an operational workshop control panel. Redefines client management, anatomical measurements, order workflows, and automated balance tracking.
                  </p>
                </div>

                {/* Dual Mode Switcher for Demo Preview */}
                <div className="p-4 rounded-2xl bg-slate-900/80 border border-white/5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400">SELECT EXPERIENCE FLOW:</span>
                    <div className="flex items-center gap-1.5 p-1 rounded-xl bg-slate-950 border border-white/10">
                      <button
                        onClick={() => {
                          setTailorView('customer');
                          playSfx('click');
                        }}
                        className={`px-3 py-1 text-xs rounded-lg font-medium transition-all ${
                          tailorView === 'customer'
                            ? 'bg-cyan-500 text-slate-950 font-semibold'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Customer Experience
                      </button>
                      <button
                        onClick={() => {
                          setTailorView('management');
                          playSfx('click');
                        }}
                        className={`px-3 py-1 text-xs rounded-lg font-medium transition-all ${
                          tailorView === 'management'
                            ? 'bg-cyan-500 text-slate-950 font-semibold'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        Tailor Management Panel
                      </button>
                    </div>
                  </div>

                  {tailorView === 'customer' ? (
                    <div className="text-xs text-slate-300 space-y-1.5 pl-2 border-l-2 border-cyan-400">
                      <p className="font-semibold text-white">Customer Self-Service Interface:</p>
                      <p className="text-slate-400">
                        Direct order tracking, WhatsApp notification integration, interactive measurement verification, and seamless mobile order progress lookup.
                      </p>
                    </div>
                  ) : (
                    <div className="text-xs text-slate-300 space-y-1.5 pl-2 border-l-2 border-purple-400">
                      <p className="font-semibold text-white">Workshop Control Dashboard (Requires Authentication):</p>
                      <p className="text-slate-400">
                        Client profiles, precise historical measurements comparison, garment status scheduling, invoice billing with advance/balance calculation, and QR identification.
                      </p>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href="https://tailorsystem.netlify.app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playSfx('click')}
                    onMouseEnter={() => playSfx('hover')}
                    className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 transition-all hover:scale-105"
                  >
                    <ExternalLink size={15} />
                    <span>Open Customer Portal</span>
                  </a>

                  <a
                    href="https://tailorsystem.netlify.app/login"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playSfx('click')}
                    onMouseEnter={() => playSfx('hover')}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-cyan-500/30 text-cyan-300 font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all"
                  >
                    <ExternalLink size={15} />
                    <span>Tailor Login Interface</span>
                  </a>

                  <a
                    href="https://github.com/mkr-infinity/tailor-system"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playSfx('click')}
                    onMouseEnter={() => playSfx('hover')}
                    className="p-2.5 rounded-xl bg-slate-900 border border-white/10 hover:border-white/30 text-slate-300 hover:text-white transition-colors"
                    title="Tailor System GitHub"
                    aria-label="Tailor System GitHub Repository"
                  >
                    <GithubIcon size={18} />
                  </a>
                </div>
              </div>

              {/* Graphic Preview */}
              <div className="lg:col-span-5">
                <div className="p-6 rounded-3xl bg-slate-900/90 border border-white/10 relative overflow-hidden space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400 border-b border-white/5 pb-3">
                    <span className="flex items-center gap-1.5 text-cyan-400 font-bold">
                      <Scissors size={14} /> TAILOR MASTER OS
                    </span>
                    <span className="text-emerald-400">● LIVE ON NETLIFY</span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-xs">
                    <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                      <span className="text-slate-400 block text-[10px]">WORKFLOW</span>
                      <span className="font-semibold text-white">Fabric to Delivery</span>
                    </div>
                    <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                      <span className="text-slate-400 block text-[10px]">INTEGRATION</span>
                      <span className="font-semibold text-white">WhatsApp & QR</span>
                    </div>
                    <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                      <span className="text-slate-400 block text-[10px]">DATABASE</span>
                      <span className="font-semibold text-white">Firebase Realtime</span>
                    </div>
                    <div className="p-3 rounded-xl bg-black/40 border border-white/5">
                      <span className="text-slate-400 block text-[10px]">INVOICES</span>
                      <span className="font-semibold text-white">Advance & Balance</span>
                    </div>
                  </div>

                  <div className="p-3 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-xs text-cyan-300 font-mono text-center">
                    Customer Experience & Tailor Management Dashboard
                  </div>
                </div>
              </div>

            </div>
          </div>

          {/* ========================================================
              03. REVISION MASTER
          ======================================================== */}
          <div className="glass-panel rounded-3xl border border-white/10 hover:border-purple-500/30 transition-all overflow-hidden p-6 sm:p-10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              
              <div className="lg:col-span-7 space-y-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-3 py-1 rounded-md bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-mono font-semibold">
                    03. EdTech & Mobile Companion
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-rose-500/15 text-rose-300 text-xs font-mono">
                    v2.0.2 Latest
                  </span>
                  <span className="px-2 py-0.5 rounded-md bg-white/5 border border-white/10 text-slate-300 text-xs font-mono">
                    React 19 + Capacitor 8 + Tailwind 4
                  </span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2.5">
                    <BookOpen className="text-purple-400" size={28} />
                    Revision Master
                  </h3>
                  <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                    The anime-themed companion for exam excellence. Delivers flashcards, formulas, mock tests, and AI-generated study materials wrapped in six manga-inspired theme worlds. Built for focused revision with an offline PWA & native Android Capacitor build.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-purple-400 shrink-0" />
                    <span>6 Anime-Inspired Visual Themes</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-purple-400 shrink-0" />
                    <span>Local-First Private Revision Data</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-purple-400 shrink-0" />
                    <span>AI-Generated Mock Tests & Flashcards</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={16} className="text-purple-400 shrink-0" />
                    <span>Cross-Platform Android APK Release</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <a
                    href="https://github.com/mkr-infinity/Revision-Master/releases/download/v2.0.2/Revision-Master_v2.0.2.apk"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={handleDownload}
                    onMouseEnter={() => playSfx('hover')}
                    className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-purple-500 to-indigo-600 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(139,92,246,0.3)] hover:scale-105 transition-all"
                  >
                    <Download size={15} />
                    <span>Download APK (v2.0.2)</span>
                  </a>

                  <a
                    href="https://mkr-infinity.github.io/Revision-Master"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playSfx('click')}
                    onMouseEnter={() => playSfx('hover')}
                    className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-purple-500/30 text-purple-300 font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all"
                  >
                    <ExternalLink size={15} />
                    <span>Live Web Companion</span>
                  </a>

                  <a
                    href="https://github.com/mkr-infinity/Revision-Master"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playSfx('click')}
                    onMouseEnter={() => playSfx('hover')}
                    className="p-2.5 rounded-xl bg-slate-900 border border-white/10 hover:border-white/30 text-slate-300 hover:text-white transition-colors"
                    title="Revision Master GitHub"
                    aria-label="Revision Master GitHub Repository"
                  >
                    <GithubIcon size={18} />
                  </a>
                </div>
              </div>

              {/* Graphic Card */}
              <div className="lg:col-span-5">
                <div className="p-6 rounded-3xl bg-gradient-to-br from-purple-950/40 to-slate-900 border border-white/10 space-y-4">
                  <div className="flex justify-between items-center text-xs font-mono">
                    <span className="text-purple-400 font-bold">REVISION MASTER v2.0.2</span>
                    <span className="text-rose-400">Offline PWA</span>
                  </div>
                  <div className="p-4 rounded-2xl bg-black/50 border border-white/5 space-y-2">
                    <div className="text-xs text-slate-400">Active Theme: <span className="text-white font-semibold">Neon Tokyo Cyber</span></div>
                    <div className="h-1.5 w-full bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-purple-400 to-rose-400 w-3/4 rounded-full" />
                    </div>
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span>Daily Mock Test Mastery</span>
                      <span className="text-purple-300 font-mono">75%</span>
                    </div>
                  </div>
                  <p className="text-xs text-slate-400 leading-relaxed italic">
                    "Built for students who value focus, zero distractions, and anime aesthetics."
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* ========================================================
              04. MATRIX SOLVER & 06. CALCVERSE (Dual Cards Grid)
          ======================================================== */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            
            {/* 04. Matrix Solver */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 hover:border-emerald-500/30 transition-all flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-semibold">
                    04. Android Mathematics App
                  </span>
                  <span className="text-xs font-mono text-slate-400">100% Offline</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
                  <Calculator className="text-emerald-400" size={24} />
                  Matrix Solver / Calculator
                </h3>

                <p className="text-slate-300 text-sm leading-relaxed">
                  Fast, fully offline native Android matrix calculator with step-by-step arithmetic solutions, determinant, inverse, transpose, local history, and image exports. Built with clean Material UI and requiring zero device permissions.
                </p>

                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                    <span>Step-by-step educational explanations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                    <span>Zero permissions required (Safe & private)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
                    <span>arm64-v8a & multi-architecture APK releases</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex flex-wrap items-center gap-3">
                <a
                  href="https://github.com/mkr-infinity/Matrix_Calculator/releases/download/Matrix_Solver/Matrix_Solver-arm64-v8a-release.apk"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleDownload}
                  onMouseEnter={() => playSfx('hover')}
                  className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-[0_0_15px_rgba(16,185,129,0.3)] transition-all"
                >
                  <Download size={15} />
                  <span>Download arm64 APK</span>
                </a>

                <a
                  href="https://github.com/mkr-infinity/Matrix_Calculator"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playSfx('click')}
                  onMouseEnter={() => playSfx('hover')}
                  className="p-2.5 rounded-xl bg-slate-900 border border-white/10 hover:border-white/30 text-slate-300 hover:text-white transition-colors"
                  title="Matrix Calculator GitHub"
                  aria-label="Matrix Calculator GitHub Repository"
                >
                  <GithubIcon size={18} />
                </a>
              </div>
            </div>

            {/* 06. CalcVerse */}
            <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 hover:border-indigo-500/30 transition-all flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="px-3 py-1 rounded-md bg-indigo-500/15 border border-indigo-500/30 text-indigo-300 text-xs font-mono font-semibold">
                    06. Modern Math Toolkit
                  </span>
                  <span className="text-xs font-mono text-slate-400">Web App</span>
                </div>

                <h3 className="text-xl sm:text-2xl font-extrabold text-white flex items-center gap-2">
                  <Sparkles className="text-indigo-400" size={24} />
                  CalcVerse
                </h3>

                <p className="text-slate-300 text-sm leading-relaxed">
                  A modern mathematics toolkit that unites calculations, scientific problem-solving, 2D graphing, matrix computations, algebraic equations, programming tools, and multi-unit conversion into one unified, elegant web experience.
                </p>

                <div className="space-y-2 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-indigo-400 shrink-0" />
                    <span>React 19 + Tailwind CSS 4 + Motion animations</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-indigo-400 shrink-0" />
                    <span>Integrated graphing & formula solver</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} className="text-indigo-400 shrink-0" />
                    <span>Programmer math (Hex, Bin, Bitwise operations)</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-white/5 flex flex-wrap items-center gap-3">
                <a
                  href="https://mkr-infinity.github.io/CalcVerse/"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playSfx('click')}
                  onMouseEnter={() => playSfx('hover')}
                  className="px-4 py-2.5 rounded-xl bg-indigo-500 hover:bg-indigo-400 text-white font-bold text-xs sm:text-sm flex items-center gap-2 shadow-[0_0_15px_rgba(99,102,241,0.3)] transition-all"
                >
                  <ExternalLink size={15} />
                  <span>Explore CalcVerse Live</span>
                </a>

                <a
                  href="https://github.com/mkr-infinity/CalcVerse"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playSfx('click')}
                  onMouseEnter={() => playSfx('hover')}
                  className="p-2.5 rounded-xl bg-slate-900 border border-white/10 hover:border-white/30 text-slate-300 hover:text-white transition-colors"
                  title="CalcVerse GitHub"
                  aria-label="CalcVerse GitHub Repository"
                >
                  <GithubIcon size={18} />
                </a>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
