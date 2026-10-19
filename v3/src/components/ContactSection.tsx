import React, { useState } from 'react';
import { Send, Copy, Check, Coins, MessageSquare } from 'lucide-react';
import { GithubIcon, InstagramIcon } from './Icons';
import confetti from 'canvas-confetti';

interface ContactSectionProps {
  playSfx: (type: 'click' | 'hover') => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ playSfx }) => {
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    playSfx('click');
    confetti({
      particleCount: 30,
      spread: 45,
      origin: { y: 0.85 },
      colors: ['#00f2fe', '#8b5cf6'],
    });
    setTimeout(() => setCopiedKey(null), 2500);
  };

  const cryptoAddresses = [
    {
      chain: 'TON (The Open Network)',
      address: 'UQDTX8QV6csepk9U1-dGzhoPfE4MUZTzAjjVE6YVIKVWuVj1',
      badge: 'Toncoin & Jettons',
    },
    {
      chain: 'Ethereum Chain',
      address: '0x56dC57B9D03C6b947e49a28edC7e18FBe383365a',
      badge: 'ETH & ERC-20',
    },
    {
      chain: 'Solana Chain',
      address: '9JEjaDCfe9esp6ECpyww7Gm3NUcieiy7hMU1pKMQVWxP',
      badge: 'SOL & SPL Tokens',
    },
  ];

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-6xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-500/10 border border-cyan-500/20 text-cyan-300 text-xs font-mono mb-3">
            <MessageSquare size={14} />
            <span>START A CONVERSATION</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight font-display mb-4">
            Let's build something remarkable.
          </h2>
          <p className="text-slate-400 text-base sm:text-lg leading-relaxed">
            Interested in collaborating on open-source software, discussing Android system internals,
            exploring Linux infrastructure, or testing new builds? Telegram is my direct line.
          </p>
        </div>

        {/* Primary Contact Showcase: Telegram Highlight */}
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-cyan-500/40 shadow-[0_10px_50px_rgba(0,242,254,0.15)] mb-14 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/15 rounded-full blur-[80px] pointer-events-none" />

          <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
            <div className="space-y-3 text-center md:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-mono">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span>PRIMARY CONTACT CHANNEL</span>
              </div>
              <h3 className="text-2xl sm:text-4xl font-extrabold text-white">
                Telegram: @mkr_infinity
              </h3>
              <p className="text-slate-300 text-sm sm:text-base max-w-xl">
                Quickest way to reach me for project discussions, build testing, ideas, or open-source community questions.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
              <a
                href="https://t.me/mkr_infinity"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => playSfx('click')}
                onMouseEnter={() => playSfx('hover')}
                className="w-full sm:w-auto px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-400 to-blue-600 text-slate-950 font-bold text-base flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(0,242,254,0.4)] hover:shadow-[0_0_40px_rgba(0,242,254,0.6)] transition-all hover:scale-105 active:scale-95"
              >
                <Send size={20} />
                <span>Open Telegram Chat</span>
              </a>

              <button
                onClick={() => copyToClipboard('https://t.me/mkr_infinity', 'telegram')}
                className="w-full sm:w-auto px-4 py-4 rounded-2xl bg-slate-900 border border-white/10 hover:border-cyan-400 text-slate-300 hover:text-white text-sm font-medium flex items-center justify-center gap-2 transition-colors"
                title="Copy Telegram Link"
              >
                {copiedKey === 'telegram' ? <Check size={18} className="text-emerald-400" /> : <Copy size={18} />}
                <span>{copiedKey === 'telegram' ? 'Copied Link!' : 'Copy Handle'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Secondary Contact Destinations Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-16">
          
          {/* GitHub */}
          <a
            href="https://github.com/mkr-infinity"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playSfx('click')}
            onMouseEnter={() => playSfx('hover')}
            className="glass-panel p-6 rounded-3xl border border-white/10 hover:border-white/30 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-white/10 group-hover:border-cyan-400 transition-colors">
                <GithubIcon size={24} className="text-white" />
              </div>
              <div>
                <span className="text-xs font-mono text-slate-400 block">CODE & REPOSITORIES</span>
                <span className="text-lg font-bold text-white group-hover:text-cyan-300 transition-colors">
                  github.com/mkr-infinity
                </span>
                <p className="text-xs text-slate-400 mt-0.5">Explore source code, stars, and commits</p>
              </div>
            </div>
            <span className="text-slate-500 group-hover:text-cyan-400 font-mono text-lg transition-transform group-hover:translate-x-1">→</span>
          </a>

          {/* Instagram */}
          <a
            href="https://www.instagram.com/mkr_infinity/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => playSfx('click')}
            onMouseEnter={() => playSfx('hover')}
            className="glass-panel p-6 rounded-3xl border border-white/10 hover:border-pink-500/30 transition-all flex items-center justify-between group"
          >
            <div className="flex items-center gap-4">
              <div className="p-3.5 rounded-2xl bg-slate-900 border border-white/10 group-hover:border-pink-400 transition-colors">
                <InstagramIcon size={24} className="text-pink-400" />
              </div>
              <div>
                <span className="text-xs font-mono text-slate-400 block">SOCIAL UPDATES</span>
                <span className="text-lg font-bold text-white group-hover:text-pink-300 transition-colors">
                  @mkr_infinity
                </span>
                <p className="text-xs text-slate-400 mt-0.5">Casual tech stories and personal milestones</p>
              </div>
            </div>
            <span className="text-slate-500 group-hover:text-pink-400 font-mono text-lg transition-transform group-hover:translate-x-1">→</span>
          </a>

        </div>

        {/* Support Open-Source Work: Verified Crypto Addresses */}
        <div className="glass-panel p-6 sm:p-8 rounded-3xl border border-white/10 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-white/5 pb-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-amber-500/10 text-amber-400 border border-amber-500/20">
                <Coins size={20} />
              </div>
              <div>
                <h4 className="text-base sm:text-lg font-bold text-white">
                  Support Open-Source & Independent Building
                </h4>
                <p className="text-xs text-slate-400">
                  Voluntary contributions directly support hosting, test device acquisitions, and free guides.
                </p>
              </div>
            </div>
            <span className="text-xs font-mono text-cyan-400">Verified Wallet Addresses</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {cryptoAddresses.map((item, idx) => (
              <div
                key={idx}
                className="p-4 rounded-2xl bg-slate-900/80 border border-white/5 space-y-2.5 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold text-white">{item.chain}</span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-slate-300">
                      {item.badge}
                    </span>
                  </div>
                  <div className="font-mono text-[11px] text-slate-400 break-all p-2 rounded-xl bg-black/40 border border-white/5 select-all">
                    {item.address}
                  </div>
                </div>

                <button
                  onClick={() => copyToClipboard(item.address, item.chain)}
                  className="w-full py-2 px-3 rounded-xl bg-white/5 hover:bg-cyan-500/10 border border-white/10 hover:border-cyan-500/30 text-slate-300 hover:text-cyan-300 text-xs font-mono flex items-center justify-center gap-1.5 transition-colors"
                >
                  {copiedKey === item.chain ? (
                    <>
                      <Check size={14} className="text-emerald-400" />
                      <span>Address Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      <span>Copy Address</span>
                    </>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-20 pt-8 border-t border-white/5 text-center text-xs text-slate-500 space-y-3">
          <div className="flex flex-wrap items-center justify-center gap-4 text-slate-400 font-mono text-xs">
            <span>Mohammad Kaif Raja</span>
            <span>•</span>
            <span>mkr-infinity</span>
            <span>•</span>
            <span>Portfolio v3 (Isolated Build)</span>
            <span>•</span>
            <a href="https://mkr-infinity.github.io/" className="text-cyan-400 hover:underline">
              Original V2 Host
            </a>
          </div>
          <p className="text-slate-500 text-[11px]">
            Designed with 3D Three.js canvas, React 19, TypeScript, and Tailwind CSS. Built strictly adhering to verified repository records.
          </p>
        </footer>

      </div>
    </section>
  );
};
