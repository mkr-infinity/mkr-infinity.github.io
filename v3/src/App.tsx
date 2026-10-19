import React, { useState, useEffect } from 'react';
import { Background3D } from './components/Background3D';
import { CustomCursor } from './components/CustomCursor';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { IdentityBio } from './components/IdentityBio';
import { FlagshipShowcase } from './components/FlagshipShowcase';
import { ProjectsGallery } from './components/ProjectsGallery';
import { DocumentationHub } from './components/DocumentationHub';
import { SkillsSection } from './components/SkillsSection';
import { ContactSection } from './components/ContactSection';
import { soundManager } from './lib/sound';

export const App: React.FC = () => {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mkr-theme') as 'dark' | 'light' | null;
      if (saved) return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'dark';
    }
    return 'dark';
  });

  const [soundEnabled, setSoundEnabled] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('mkr-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const toggleSound = () => {
    const nextState = !soundEnabled;
    setSoundEnabled(nextState);
    soundManager.setEnabled(nextState);
  };

  const playSfx = (type: 'click' | 'hover') => {
    if (type === 'click') {
      soundManager.playClick();
    } else {
      soundManager.playHover();
    }
  };

  const isDark = theme === 'dark';

  return (
    <div
      className={`relative min-h-screen transition-colors duration-300 ${
        isDark ? 'bg-[#09090b] text-stone-100' : 'bg-[#fafaf9] text-stone-900'
      } selection:bg-amber-500/25 selection:text-amber-900 dark:selection:text-amber-200`}
    >
      {/* 3D Background Canvas (No Blue - Gold, Emerald, Ruby Particles) */}
      <Background3D theme={theme} />

      {/* Interactive Custom Mouse Cursor */}
      <CustomCursor theme={theme} />

      {/* Subtle Architectural Grid Pattern Overlay */}
      <div
        className={`fixed inset-0 pointer-events-none z-[1] transition-opacity duration-300 ${
          isDark ? 'bg-grid-pattern-dark opacity-50' : 'bg-grid-pattern-light opacity-60'
        }`}
      />

      {/* Main Content Layout */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar
          theme={theme}
          toggleTheme={toggleTheme}
          soundEnabled={soundEnabled}
          toggleSound={toggleSound}
          playSfx={playSfx}
        />

        <main className="flex-grow">
          <Hero playSfx={playSfx} />
          <IdentityBio playSfx={playSfx} />
          <FlagshipShowcase playSfx={playSfx} />
          <ProjectsGallery playSfx={playSfx} />
          <DocumentationHub playSfx={playSfx} />
          <SkillsSection playSfx={playSfx} />
          <ContactSection playSfx={playSfx} />
        </main>
      </div>
    </div>
  );
};
