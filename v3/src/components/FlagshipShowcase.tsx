import React, { useState } from 'react';
import { 
  Download, ExternalLink, Sparkles, ShieldCheck, 
  Music2, Sliders, FileText, Radio, Lock, Zap
} from 'lucide-react';
import { GithubIcon } from './Icons';
import confetti from 'canvas-confetti';

interface FlagshipShowcaseProps {
  playSfx: (type: 'click' | 'hover') => void;
}

export const FlagshipShowcase: React.FC<FlagshipShowcaseProps> = ({ playSfx }) => {
  const [isPlayingVisualizer, setIsPlayingVisualizer] = useState(true);

  const handleDownload = () => {
    playSfx('click');
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.7 },
      colors: ['#00f2fe', '#8b5cf6', '#10b981'],
    });
  };

  const featurePillars = [
    {
      icon: <Radio className="text-cyan-400" size={20} />,
      title: 'Tri-Engine Unified Streaming',
      desc: 'Seamless integration with YouTube Music, JioSaavn, and Spotify playlists delivering up to 320 kbps studio audio.',
    },
    {
      icon: <Sliders className="text-emerald-400" size={20} />,
      title: 'MKR Studio 10-Band EQ',
      desc: 'Precision equalizer with virtual Dolby Atmos simulation, acoustic presets, bass boost, and custom reverb profiling.',
    },
    {
      icon: <FileText className="text-purple-400" size={20} />,
      title: 'Synchronized TTML Lyrics',
      desc: 'Live word-by-word scrolling lyrics with animated glowing highlights and blurred album art dynamic backdrops.',
    },
    {
      icon: <Lock className="text-rose-400" size={20} />,
      title: '100% Private & Ad-Free',
      desc: 'Zero telemetry, zero ads, zero trackers. All playlists and cache reside exclusively on the local device.',
    },
  ];

  return (
    <section id="flagship" className="py-28 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Flagship Badge Header */}
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-emerald-500/10 via-cyan-500/10 to-purple-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-4 shadow-[0_0_20px_rgba(0,242,254,0.15)]">
            <Sparkles size={14} className="text-emerald-400 animate-spin" />
            <span>01. FLAGSHIP PROJECT — PRIMARY SHOWCASE</span>
          </div>

          <h2 className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight font-display mb-4">
            MKR Music
          </h2>
          <p className="text-slate-300 text-base sm:text-xl font-medium max-w-2xl leading-relaxed">
            "Not just a music player — an intelligent, private sonic sanctuary."
          </p>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            A premier open-source Android music streaming and offline audio player uniting YouTube Music, JioSaavn, and Spotify playlists.
          </p>
        </div>

        {/* Cinematic Main Feature Card */}
        <div className="glass-panel rounded-3xl border border-cyan-500/30 overflow-hidden shadow-[0_15px_60px_-15px_rgba(0,242,254,0.2)] relative">
          {/* Glowing Aura Accent */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/15 rounded-full blur-[100px] pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/15 rounded-full blur-[100px] pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 p-6 sm:p-10 lg:p-12 items-center">
            
            {/* Left Col: Specs, Verified Capabilities & CTAs (7 cols) */}
            <div className="lg:col-span-7 space-y-6 relative z-10">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-md bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-semibold">
                  Android 8.0+
                </span>
                <span className="px-3 py-1 rounded-md bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 text-xs font-mono font-semibold">
                  Lossless 320 kbps
                </span>
                <span className="px-3 py-1 rounded-md bg-purple-500/15 border border-purple-500/30 text-purple-300 text-xs font-mono font-semibold">
                  GPL-3.0 FLOSS
                </span>
                <span className="px-3 py-1 rounded-md bg-amber-500/15 border border-amber-500/30 text-amber-300 text-xs font-mono font-semibold">
                  Material 3 UI
                </span>
              </div>

              <div className="space-y-4">
                <h3 className="text-2xl sm:text-3xl font-extrabold text-white">
                  Studio-Grade Audio, Zero Subscriptions, Total Privacy
                </h3>
                <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                  Engineered from the ground up for audiophiles and privacy-minded users. MKR Music extracts lossless audio streams, bypasses video stream overhead, syncs timed lyrics via TTML protocols, and caches songs locally so your library is always ready offline.
                </p>
              </div>

              {/* Verified Feature Checklist */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 border-t border-white/10">
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                  <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
                  <span>Zero telemetry or background analytics</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                  <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
                  <span>Instant playback with zero-buffer cache</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                  <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
                  <span>Dynamic Apple Music-style visualizer canvas</span>
                </div>
                <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-200">
                  <ShieldCheck size={16} className="text-emerald-400 shrink-0" />
                  <span>SponsorBlock integration to skip non-music</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-4 flex flex-wrap items-center gap-3">
                {/* Download Universal APK */}
                <a
                  href="https://github.com/mkr-infinity/mkr-music/releases/latest/download/mkr-music-universal.apk"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleDownload}
                  onMouseEnter={() => playSfx('hover')}
                  className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 text-slate-950 font-bold text-sm sm:text-base flex items-center gap-2.5 shadow-[0_0_30px_rgba(16,185,129,0.35)] hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] transition-all hover:scale-105 active:scale-95"
                >
                  <Download size={18} />
                  <span>Download Universal APK</span>
                </a>

                {/* Official Web Experience */}
                <a
                  href="https://mkr-infinity.github.io/mkr-music-web"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playSfx('click')}
                  onMouseEnter={() => playSfx('hover')}
                  className="px-5 py-3.5 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/40 text-cyan-300 font-semibold text-sm sm:text-base flex items-center gap-2 transition-all hover:scale-105"
                >
                  <ExternalLink size={16} />
                  <span>Official Website</span>
                </a>

                {/* GitHub Repository */}
                <a
                  href="https://github.com/mkr-infinity/mkr-music"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => playSfx('click')}
                  onMouseEnter={() => playSfx('hover')}
                  className="p-3.5 rounded-xl bg-slate-900 border border-white/10 hover:border-white/30 text-slate-300 hover:text-white transition-colors"
                  title="View MKR Music on GitHub"
                  aria-label="View MKR Music GitHub Repository"
                >
                  <GithubIcon size={20} />
                </a>
              </div>
            </div>

            {/* Right Col: Interactive Visual Mockup / Player UI (5 cols) */}
            <div className="lg:col-span-5 relative">
              <div className="relative mx-auto max-w-sm rounded-[2.5rem] p-3 bg-gradient-to-b from-slate-800 to-slate-950 border-2 border-cyan-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                
                {/* Phone Speaker Notch */}
                <div className="w-24 h-4 bg-slate-900 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <div className="w-12 h-1 bg-slate-700 rounded-full" />
                </div>

                {/* Simulated Phone Screen */}
                <div className="rounded-[2rem] bg-gradient-to-b from-slate-900 via-indigo-950/70 to-slate-950 p-5 border border-white/5 overflow-hidden relative">
                  
                  {/* Top Bar */}
                  <div className="flex items-center justify-between text-xs text-slate-400 mb-4 font-mono">
                    <span className="text-cyan-400 font-bold">MKR STUDIO</span>
                    <span className="flex items-center gap-1 text-[11px] text-emerald-400">
                      <Zap size={12} /> 320 KBPS
                    </span>
                  </div>

                  {/* Album Art Glow Canvas */}
                  <div className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-tr from-cyan-600/30 via-indigo-600/40 to-purple-600/30 border border-white/10 p-4 flex flex-col justify-between mb-4 shadow-inner">
                    <div className="flex justify-between items-center text-xs">
                      <span className="px-2 py-0.5 rounded bg-black/40 backdrop-blur-md text-white font-mono">Lossless FLAC</span>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 font-mono">Cached</span>
                    </div>

                    {/* Animated Sound Wave Bars */}
                    <div className="flex items-end justify-center gap-1.5 h-20 my-auto">
                      {[32, 64, 45, 80, 95, 60, 85, 40, 70, 90, 50, 75, 30].map((h, i) => (
                        <div
                          key={i}
                          className="w-1.5 rounded-full bg-gradient-to-t from-cyan-400 to-purple-400 transition-all duration-300"
                          style={{
                            height: isPlayingVisualizer ? `${Math.max(15, (h + (i % 3) * 15) % 85)}%` : '15%',
                            animation: isPlayingVisualizer ? `pulse 1.5s infinite ease-in-out ${i * 0.1}s` : 'none',
                          }}
                        />
                      ))}
                    </div>

                    <div className="text-center">
                      <p className="text-xs font-mono text-cyan-300 font-semibold truncate">Midnight Horizon — Cyber Aura</p>
                      <p className="text-[10px] text-slate-400">MKR Studio Master Audio</p>
                    </div>
                  </div>

                  {/* Synced Lyrics Preview */}
                  <div className="p-3 rounded-xl bg-black/40 backdrop-blur-md border border-white/5 mb-4 text-center">
                    <p className="text-[11px] text-slate-400 font-mono">♪ Synchronized Lyrics Engine</p>
                    <p className="text-xs text-cyan-300 font-semibold mt-1">
                      "Floating through circuits of infinite light..."
                    </p>
                  </div>

                  {/* Controls */}
                  <div className="flex items-center justify-around py-1 text-slate-300">
                    <Sliders size={18} className="text-cyan-400" />
                    <button
                      onClick={() => setIsPlayingVisualizer(!isPlayingVisualizer)}
                      className="w-10 h-10 rounded-full bg-cyan-500 text-slate-950 flex items-center justify-center font-bold shadow-[0_0_15px_#00f2fe]"
                      aria-label="Toggle visualizer"
                    >
                      {isPlayingVisualizer ? '❚❚' : '▶'}
                    </button>
                    <Music2 size={18} className="text-purple-400" />
                  </div>
                </div>

                <div className="w-32 h-1 bg-slate-700 rounded-full mx-auto mt-3" />
              </div>
            </div>

          </div>

          {/* Bottom Pillar Feature Highlights */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 p-6 sm:p-10 border-t border-white/10 bg-slate-950/60">
            {featurePillars.map((item, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2">
                <div className="p-2 w-fit rounded-lg bg-white/5 border border-white/5">
                  {item.icon}
                </div>
                <h4 className="text-sm font-bold text-white">{item.title}</h4>
                <p className="text-xs text-slate-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

        </div>

      </div>
    </section>
  );
};
