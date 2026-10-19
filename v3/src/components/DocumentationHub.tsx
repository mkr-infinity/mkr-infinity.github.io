import React from 'react';
import { 
  BookOpen, Terminal, ExternalLink, 
  Smartphone, ShieldAlert, Cpu, Key, ArrowUpRight
} from 'lucide-react';
import { GithubIcon } from './Icons';

interface DocumentationHubProps {
  playSfx: (type: 'click' | 'hover') => void;
}

export const DocumentationHub: React.FC<DocumentationHubProps> = ({ playSfx }) => {
  const guides = [
    {
      id: 'android-cheatsheet',
      title: 'Android Command Cheatsheet',
      category: 'Developer Reference Tool',
      description: 'A high-performance technical reference for ADB & Fastboot commands, partition structures, and fastbootd flashing, tailored for developers and ROM maintainers.',
      link: 'https://mkr-infinity.github.io/android-command-cheatsheet/',
      repo: 'https://github.com/mkr-infinity/android-command-cheatsheet',
      icon: <Terminal className="text-cyan-400" size={20} />,
      accent: 'border-cyan-500/20 hover:border-cyan-500/40',
      badge: 'Interactive Web Reference',
    },
    {
      id: 'bootloader-guide',
      title: 'Bootloader Unlock Guide',
      category: 'System Modification Manual',
      description: 'Step-by-step guide explaining OEM unlocking workflows, device driver setup, fastboot commands, and manufacturer precautions for Android devices.',
      link: 'https://mkr-infinity.github.io/Guide-to-unlock-Bootloader',
      repo: 'https://github.com/mkr-infinity/Guide-to-unlock-Bootloader',
      icon: <Cpu className="text-purple-400" size={20} />,
      accent: 'border-purple-500/20 hover:border-purple-500/40',
      badge: 'Technical Guide',
    },
    {
      id: 'gsi-flashing',
      title: 'GSI Flashing Guide',
      category: 'Generic System Image Guide',
      description: 'Detailed instructions on Project Treble, DSU Sideloader, dynamic partition management, and deploying clean Generic System Images (AOSP) to compatible devices.',
      link: 'https://mkr-infinity.github.io/Guide-for-flashing-GSI-to-any-device',
      repo: 'https://github.com/mkr-infinity/Guide-for-flashing-GSI-to-any-device',
      icon: <Smartphone className="text-emerald-400" size={20} />,
      accent: 'border-emerald-500/20 hover:border-emerald-500/40',
      badge: 'Technical Guide',
    },
    {
      id: 'windows-activation',
      title: 'Windows Activation Guide',
      category: 'System Reference & Scripts',
      description: 'Documented walkthrough explaining KMS organization simulation, PowerShell activation scripts, and public server keys for educational study.',
      repo: 'https://github.com/mkr-infinity/Windows-Activation-free',
      icon: <Key className="text-amber-400" size={20} />,
      accent: 'border-amber-500/20 hover:border-amber-500/40',
      badge: 'Script Repository',
    },
  ];

  return (
    <section id="guides" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-teal-500/10 border border-teal-500/20 text-teal-300 text-xs font-mono mb-3">
            <BookOpen size={14} />
            <span>05. README & TECHNICAL DOCUMENTATION COLLECTION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display mb-4">
            Problem-Solving Tooling & Developer Guides
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            A coherent suite of developer-first resources, from an interactive client-side README generator
            to widely consulted Android flashing, ADB, and system manuals.
          </p>
        </div>

        {/* Featured Documentation Product: ReadmeHub */}
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-teal-500/30 hover:border-teal-400/50 transition-all mb-12 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-teal-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-md bg-teal-500/15 border border-teal-500/30 text-teal-300 text-xs font-mono font-semibold">
                  Featured Tooling Product
                </span>
                <span className="px-2.5 py-0.5 rounded-md bg-white/5 text-slate-300 text-xs font-mono">
                  React + TypeScript + Vite + Tailwind CSS
                </span>
                <span className="px-2.5 py-0.5 rounded-md bg-emerald-500/15 text-emerald-300 text-xs font-mono">
                  100% Client-Side
                </span>
              </div>

              <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
                ReadmeHub — Client-Side Markdown Architect
              </h3>

              <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                The README generator developers actually want to use. Delivers <strong>15 structurally distinct themes</strong> (Terminal, Cyberpunk, Minimalist, Brutalist, and more), live side-by-side editing, project & profile README modes, and zero telemetry with 100% browser-local persistence.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href="https://mkr-infinity.github.io/readme-hub"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playSfx('click')}
                  onMouseEnter={() => playSfx('hover')}
                  className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-teal-500 to-cyan-600 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-[0_0_20px_rgba(20,184,166,0.3)] transition-all hover:scale-105"
                >
                  <ExternalLink size={15} />
                  <span>Launch ReadmeHub Live</span>
                </a>

                <a
                  href="https://github.com/mkr-infinity/readme-hub"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playSfx('click')}
                  onMouseEnter={() => playSfx('hover')}
                  className="p-2.5 rounded-xl bg-slate-900 border border-white/10 hover:border-white/30 text-slate-300 hover:text-white transition-colors"
                  title="ReadmeHub Repository"
                  aria-label="ReadmeHub GitHub Repository"
                >
                  <GithubIcon size={18} />
                </a>
              </div>
            </div>

            <div className="lg:col-span-4">
              <div className="p-5 rounded-2xl bg-slate-900/90 border border-white/10 space-y-3 font-mono text-xs">
                <div className="flex justify-between items-center text-teal-400 border-b border-white/5 pb-2">
                  <span>readmehub.config.ts</span>
                  <span className="text-[10px] text-slate-500">v1.0.0</span>
                </div>
                <div className="text-slate-300 space-y-1">
                  <p><span className="text-purple-400">const</span> themes = <span className="text-amber-400">15</span>;</p>
                  <p><span className="text-purple-400">const</span> privacy = <span className="text-cyan-400">'Local-Only'</span>;</p>
                  <p><span className="text-purple-400">const</span> telemetry = <span className="text-rose-400">false</span>;</p>
                  <p><span className="text-purple-400">const</span> livePreview = <span className="text-emerald-400">true</span>;</p>
                </div>
                <div className="pt-2 border-t border-white/5 text-[11px] text-slate-400">
                  Zero sign-ups required. Drafts saved directly to your browser localStorage.
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* Technical Reference Guides Grid (4 items) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {guides.map((guide) => (
            <div
              key={guide.id}
              className={`glass-panel p-6 rounded-3xl border ${guide.accent} transition-all flex flex-col justify-between space-y-5`}
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="p-2 rounded-xl bg-slate-900 border border-white/5">
                      {guide.icon}
                    </div>
                    <div>
                      <span className="text-[10px] font-mono text-slate-400 block uppercase tracking-wider">
                        {guide.category}
                      </span>
                      <h4 className="text-lg font-bold text-white tracking-tight">
                        {guide.title}
                      </h4>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300">
                    {guide.badge}
                  </span>
                </div>

                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {guide.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {guide.link && (
                    <a
                      href={guide.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => playSfx('click')}
                      onMouseEnter={() => playSfx('hover')}
                      className="px-3.5 py-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white text-xs font-medium flex items-center gap-1.5 transition-colors"
                    >
                      <span>Open Guide</span>
                      <ArrowUpRight size={14} />
                    </a>
                  )}

                  <a
                    href={guide.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => playSfx('click')}
                    onMouseEnter={() => playSfx('hover')}
                    className="p-1.5 rounded-lg bg-slate-900 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white transition-colors"
                    title={`View ${guide.title} on GitHub`}
                    aria-label={`View ${guide.title} on GitHub`}
                  >
                    <GithubIcon size={16} />
                  </a>
                </div>

                <span className="text-[11px] font-mono text-slate-500">
                  Verified Resource
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* Responsible Documentation Notice */}
        <div className="p-4 rounded-2xl bg-slate-900/60 border border-white/5 text-xs text-slate-400 max-w-3xl mx-auto flex items-start gap-2.5">
          <ShieldAlert size={18} className="text-amber-400 shrink-0 mt-0.5" />
          <p className="leading-relaxed">
            <strong className="text-white">Responsible Technical Documentation:</strong> Guides describing system modification, bootloader unlocking, and activation are written strictly for educational, technical study, and device recovery purposes. No warranty or safety guarantees are implied for unsupported hardware.
          </p>
        </div>

      </div>
    </section>
  );
};
