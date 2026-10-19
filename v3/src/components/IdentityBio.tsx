import React, { useState } from 'react';
import { Terminal, Shield, Cpu, Code2, Server, Smartphone, BookOpen, Globe2, Radio, CheckCircle2 } from 'lucide-react';

interface IdentityBioProps {
  playSfx: (type: 'click' | 'hover') => void;
}

export const IdentityBio: React.FC<IdentityBioProps> = ({ playSfx }) => {
  const [activeTab, setActiveTab] = useState<'philosophy' | 'terminal' | 'stack'>('philosophy');

  const experiencePoints = [
    {
      icon: <Server className="text-cyan-400" size={18} />,
      title: 'Systems & Server Infrastructure',
      desc: 'Hands-on VPS administration, SSH hardening, Linux distro tweaking, and CLI-driven server maintenance.',
    },
    {
      icon: <Smartphone className="text-emerald-400" size={18} />,
      title: 'Android & Mobile Builds',
      desc: 'Flashing GSIs/custom ROMs, Android app packaging, building APKs from source, and Capacitor web-to-mobile ports.',
    },
    {
      icon: <Code2 className="text-purple-400" size={18} />,
      title: 'Modern Web Engineering',
      desc: 'Building responsive applications using React 19, TypeScript, Vite, Tailwind CSS, Next.js, and Firebase/Firestore.',
    },
    {
      icon: <BookOpen className="text-amber-400" size={18} />,
      title: 'Technical Documentation & Guides',
      desc: 'Author of widely read developer guides on ADB/Fastboot, bootloader unlocking, and README generators.',
    },
    {
      icon: <Radio className="text-blue-400" size={18} />,
      title: 'Community & Ecosystem Operations',
      desc: 'Managing technical Telegram channels, engaging with open-source contributors, and mentoring enthusiasts.',
    },
    {
      icon: <Globe2 className="text-pink-400" size={18} />,
      title: 'Web3 & Cryptography Exploration',
      desc: 'Deep foundational knowledge of blockchain protocols, node mechanics, and decentralized tooling.',
    },
  ];

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-500/10 border border-purple-500/20 text-purple-300 text-xs font-mono mb-3">
            <Cpu size={14} />
            <span>CORE IDENTITY & BACKGROUND</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display mb-4">
            Built from curiosity, refined by hands-on engineering.
          </h2>
          <p className="text-slate-400 text-base sm:text-lg">
            A self-directed technical journey spanning Linux kernels, Android system internals,
            full-stack web architecture, and open-source software.
          </p>
        </div>

        {/* Main Grid: Photo + Story & Interactive Terminal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Portrait & Identity Details (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="glass-panel p-6 rounded-3xl border border-white/10 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative aspect-square rounded-2xl overflow-hidden bg-slate-900 border border-white/10 mb-6">
                <img
                  src="./me.png"
                  alt="Mohammad Kaif Raja (@mkr-infinity)"
                  className="w-full h-full object-cover object-center filter saturate-105 group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute bottom-3 left-3 right-3 py-2 px-3 rounded-xl bg-slate-950/80 backdrop-blur-md border border-white/10 flex items-center justify-between text-xs font-mono">
                  <span className="text-cyan-400">Mohammad Kaif Raja</span>
                  <span className="text-slate-400">@mkr_infinity</span>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm py-1.5 border-b border-white/5">
                  <span className="text-slate-400">Location</span>
                  <span className="text-slate-200 font-medium">India 🇮🇳</span>
                </div>
                <div className="flex items-center justify-between text-sm py-1.5 border-b border-white/5">
                  <span className="text-slate-400">Stated Experience</span>
                  <span className="text-cyan-400 font-mono font-medium">6+ Years (Hands-on)</span>
                </div>
                <div className="flex items-center justify-between text-sm py-1.5 border-b border-white/5">
                  <span className="text-slate-400">Primary Channel</span>
                  <a
                    href="https://t.me/mkr_infinity"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 hover:text-cyan-300 font-medium flex items-center gap-1"
                  >
                    t.me/mkr_infinity →
                  </a>
                </div>
                <div className="flex items-center justify-between text-sm py-1.5">
                  <span className="text-slate-400">Focus Areas</span>
                  <span className="text-slate-200 text-right">Linux, Android, Web Apps</span>
                </div>
              </div>
            </div>

            {/* Quick Quote Card */}
            <div className="glass-panel p-5 rounded-2xl border border-white/5 bg-gradient-to-br from-slate-900/60 to-purple-950/20">
              <p className="text-sm text-slate-300 italic mb-2">
                "Where systems become intuitive, problems become solvable, and open software empowers everyone."
              </p>
              <div className="text-xs font-mono text-purple-400 text-right">— Mohammad Kaif Raja</div>
            </div>
          </div>

          {/* Right Column: Narrative, Capabilities & Interactive Terminal (7 cols) */}
          <div className="lg:col-span-7 flex flex-col gap-6">
            
            {/* Interactive Tab Switcher */}
            <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-slate-900/80 border border-white/10 w-fit">
              <button
                onClick={() => {
                  setActiveTab('philosophy');
                  playSfx('click');
                }}
                onMouseEnter={() => playSfx('hover')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  activeTab === 'philosophy'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Engineering Philosophy
              </button>
              <button
                onClick={() => {
                  setActiveTab('terminal');
                  playSfx('click');
                }}
                onMouseEnter={() => playSfx('hover')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all flex items-center gap-1.5 ${
                  activeTab === 'terminal'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                <Terminal size={14} />
                <span>Live Hobbies Terminal</span>
              </button>
              <button
                onClick={() => {
                  setActiveTab('stack');
                  playSfx('click');
                }}
                onMouseEnter={() => playSfx('hover')}
                className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
                  activeTab === 'stack'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/30'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Hands-On Range
              </button>
            </div>

            {/* Tab 1: Philosophy & Stated Experience */}
            {activeTab === 'philosophy' && (
              <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-5">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                  <Shield className="text-cyan-400" size={20} />
                  Practical Problem Solving & Open-Source Ethics
                </h3>
                <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                  Over the past <strong className="text-white">6+ years</strong>, my journey has been driven by deep curiosity rather than a standard corporate playbook. From diagnosing low-level Android bootloops and configuring custom GSI images, to setting up isolated VPS environments and deploying production-grade web applications, every skill was earned through hands-on experimentation.
                </p>
                <p className="text-slate-300 leading-relaxed text-sm sm:text-base">
                  I believe in transparent software that respects user privacy. Whether building <strong className="text-cyan-300">MKR Music</strong> (a 100% telemetry-free Android music player with zero ads), <strong className="text-cyan-300">Tailor Master</strong> (a full business workflow engine), or writing step-by-step guides for technical communities, my goal is always clarity, speed, and real-world utility.
                </p>
                
                <div className="pt-4 border-t border-white/5 grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                    <span>Self-assessed, verified through public open-source repositories</span>
                  </div>
                  <div className="flex items-start gap-2 text-xs text-slate-300">
                    <CheckCircle2 size={16} className="text-cyan-400 shrink-0 mt-0.5" />
                    <span>No unverified claims or fake enterprise badges</span>
                  </div>
                </div>
              </div>
            )}

            {/* Tab 2: Terminal View (Authentic Hobbies & System Tweaks) */}
            {activeTab === 'terminal' && (
              <div className="glass-panel rounded-3xl border border-white/10 overflow-hidden font-mono text-xs sm:text-sm">
                <div className="bg-slate-900/90 px-4 py-3 border-b border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                    <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                    <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                    <span className="text-slate-400 text-xs ml-2">kaif@mkr-infinity: ~/interests</span>
                  </div>
                  <span className="text-[11px] text-cyan-400">bash</span>
                </div>
                <div className="p-6 bg-slate-950/70 text-slate-300 space-y-4 leading-relaxed">
                  <p className="text-cyan-400">$ cat /etc/mkr/hobbies.conf</p>
                  <ul className="space-y-2 text-slate-300 pl-2">
                    <li><span className="text-emerald-400">➜</span> Android Rooting, Overclocking, Undervolting & CPU Governor tuning</li>
                    <li><span className="text-emerald-400">➜</span> Flashing Custom ROMs & Generic System Images (GSI) across diverse chipsets</li>
                    <li><span className="text-emerald-400">➜</span> Custom ISO flashing & Linux distro customization (Arch, Debian, Ubuntu)</li>
                    <li><span className="text-emerald-400">➜</span> Building bootable rescue media with customized automated scripts</li>
                    <li><span className="text-emerald-400">➜</span> Exploring, auditing, and optimizing open-source repositories</li>
                    <li><span className="text-emerald-400">➜</span> Beta application testing, APK decompilation & reverse exploration</li>
                  </ul>
                  <p className="text-cyan-400">$ fastboot devices</p>
                  <p className="text-slate-400 text-xs pl-2">✓ MKR_DEV_DEVICE_ONLINE [Fastbootd Mode Active]</p>
                </div>
              </div>
            )}

            {/* Tab 3: Detailed Hands-on Scope */}
            {activeTab === 'stack' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {experiencePoints.map((point, index) => (
                  <div
                    key={index}
                    className="glass-panel p-4 rounded-2xl border border-white/5 hover:border-cyan-500/30 transition-colors"
                  >
                    <div className="flex items-center gap-2.5 mb-2">
                      <div className="p-2 rounded-lg bg-white/5 border border-white/5">
                        {point.icon}
                      </div>
                      <h4 className="text-sm font-semibold text-white">{point.title}</h4>
                    </div>
                    <p className="text-xs text-slate-400 leading-relaxed">{point.desc}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

      </div>
    </section>
  );
};
