import React, { useState } from 'react';
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
  const [soundEnabled, setSoundEnabled] = useState(false);

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

  return (
    <div className="relative min-h-screen bg-[#030712] text-slate-100 selection:bg-cyan-500/20 selection:text-cyan-200">
      {/* 3D Background Canvas */}
      <Background3D />

      {/* Interactive Custom Mouse Cursor */}
      <CustomCursor />

      {/* Grid Pattern Texture Overlay */}
      <div className="fixed inset-0 bg-grid-pattern opacity-40 pointer-events-none z-[1]" />

      {/* Main Content Layout */}
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar
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
