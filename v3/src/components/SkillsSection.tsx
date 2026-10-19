import React, { useState } from 'react';
import { 
  Terminal, Smartphone, Layout, Database, Code, 
  GitBranch, Cloud, BookOpen, Coins, Users, Layers
} from 'lucide-react';

interface SkillItem {
  name: string;
  estimate?: string; // e.g. "~95%"
  percentage?: number; // e.g. 95
  qualitativeLabel?: string; // e.g. "Practical Experience"
  details: string;
}

interface SkillCategory {
  id: string;
  name: string;
  icon: React.ReactNode;
  accent: string;
  skills: SkillItem[];
}

export const SkillsSection: React.FC<{ playSfx: (type: 'click' | 'hover') => void }> = ({ playSfx }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories: SkillCategory[] = [
    {
      id: 'systems',
      name: '1. Systems, Linux & CLI',
      icon: <Terminal size={18} className="text-emerald-600 dark:text-emerald-400" />,
      accent: 'border-emerald-500/30 text-emerald-800 dark:text-emerald-300',
      skills: [
        { name: 'Linux OS & Kernels', percentage: 95, estimate: '~95%', details: 'Distro tweaking, Arch/Debian, shell scripting, performance tuning' },
        { name: 'CLI Workflows', percentage: 95, estimate: '85–100%', details: 'Terminal-first tooling, text processing, automation scripts' },
        { name: 'VPS Administration & SSH', qualitativeLabel: 'Hands-on Production', details: 'Server hardening, SSH key auth, headless system management' },
      ],
    },
    {
      id: 'mobile',
      name: '2. Android & Mobile Dev',
      icon: <Smartphone size={18} className="text-amber-600 dark:text-amber-400" />,
      accent: 'border-amber-500/30 text-amber-800 dark:text-amber-300',
      skills: [
        { name: 'Android System Internals', percentage: 90, estimate: '~90%', details: 'GSI flashing, custom ROMs, bootloader unlocking, fastboot/adb' },
        { name: 'Capacitor Mobile Delivery', percentage: 80, estimate: '~80%', details: 'Cross-platform web-to-mobile packaging, native bridge plugins' },
        { name: 'APK Build Workflows', qualitativeLabel: 'Practical Experience', details: 'Compiling from source, Gradle assemble, signed release generation' },
      ],
    },
    {
      id: 'frontend',
      name: '3. Frontend Development',
      icon: <Layout size={18} className="text-purple-600 dark:text-purple-400" />,
      accent: 'border-purple-500/30 text-purple-800 dark:text-purple-300',
      skills: [
        { name: 'React & React 19', qualitativeLabel: 'Practical Depth', details: 'Component lifecycle, hooks, state architecture in MKR Music & Tailor Master' },
        { name: 'Vite Ecosystem', qualitativeLabel: 'Practical Depth', details: 'Fast HMR, optimized production asset bundling, multi-page builds' },
        { name: 'Tailwind CSS (v3 & v4)', qualitativeLabel: 'Practical Depth', details: 'Responsive layouts, modern CSS variables, glassmorphic interfaces' },
        { name: 'TypeScript & JavaScript', qualitativeLabel: 'Practical Experience', details: 'Strict typing, modern ES2022+ patterns, asynchronous pipelines' },
        { name: 'Next.js, HTML5 & CSS3', qualitativeLabel: 'Practical Experience', details: 'Semantic accessible markup, modern layout models, SSR exploration' },
      ],
    },
    {
      id: 'backend',
      name: '4. Backend & BaaS',
      icon: <Database size={18} className="text-rose-600 dark:text-rose-400" />,
      accent: 'border-rose-500/30 text-rose-800 dark:text-rose-300',
      skills: [
        { name: 'Firebase & Firestore', qualitativeLabel: 'Practical Experience', details: 'Real-time NoSQL databases, rules, auth, Tailor Master backend' },
        { name: 'Appwrite BaaS', qualitativeLabel: 'Practical Implementation', details: 'Self-hosted and cloud BaaS database and auth workflows' },
        { name: 'Databases & Storage', qualitativeLabel: 'Practical Depth', details: 'Client-side IndexedDB, local storage, relational & document schema' },
      ],
    },
    {
      id: 'languages',
      name: '5. Programming Languages',
      icon: <Code size={18} className="text-amber-600 dark:text-amber-400" />,
      accent: 'border-amber-500/30 text-amber-800 dark:text-amber-300',
      skills: [
        { name: 'JavaScript (Node / Browser)', qualitativeLabel: 'Practical Depth', details: 'Async/await, DOM APIs, Web Audio, tooling scripts' },
        { name: 'TypeScript', qualitativeLabel: 'Practical Depth', details: 'Interface definitions, generics, type-safe fullstack contracts' },
        { name: 'Bash & Shell Scripting', percentage: 95, estimate: '85–100%', details: 'Automated installers, system maintenance scripts, CLI pipelines' },
        { name: 'Python', qualitativeLabel: 'Practical Experience', details: 'Scripting, tooling, data processing, algorithm implementation' },
      ],
    },
    {
      id: 'devops',
      name: '6. DevOps & Deployment',
      icon: <GitBranch size={18} className="text-rose-600 dark:text-rose-400" />,
      accent: 'border-rose-500/30 text-rose-800 dark:text-rose-300',
      skills: [
        { name: 'Git & GitHub Workflows', percentage: 88, estimate: '85–90%', details: 'Branching, multi-repo management, release automation' },
        { name: 'Docker Containers', percentage: 90, estimate: '85–100%', details: 'Containerized environments, Dockerfile creation, local orchestration' },
        { name: 'Netlify & Vercel', percentage: 92, estimate: '85–100%', details: 'Continuous integration, branch previews, custom DNS configurations' },
      ],
    },
    {
      id: 'cloud',
      name: '7. Cloud & Infrastructure',
      icon: <Cloud size={18} className="text-orange-600 dark:text-orange-400" />,
      accent: 'border-orange-500/30 text-orange-800 dark:text-orange-300',
      skills: [
        { name: 'VPS Server Management', qualitativeLabel: 'Practical Experience', details: 'Configuring independent Linux servers, reverse proxies, port management' },
        { name: 'Azure Cloud Services', qualitativeLabel: 'Practical Hands-on', details: 'Virtual machines, resource groups, basic cloud infrastructure' },
      ],
    },
    {
      id: 'docs',
      name: '8. Documentation & Tooling',
      icon: <BookOpen size={18} className="text-emerald-600 dark:text-emerald-400" />,
      accent: 'border-emerald-500/30 text-emerald-800 dark:text-emerald-300',
      skills: [
        { name: 'Technical Guides & READMEs', qualitativeLabel: 'Advanced Depth', details: 'Author of widely referenced ADB/Fastboot, GSI, and Bootloader manuals' },
        { name: 'ReadmeHub Product Engineering', qualitativeLabel: 'Creator & Maintainer', details: 'Architect of 15-theme client-side Markdown generation tool' },
      ],
    },
    {
      id: 'web3',
      name: '9. Web3 & Cryptocurrency',
      icon: <Coins size={18} className="text-amber-600 dark:text-amber-400" />,
      accent: 'border-amber-500/30 text-amber-800 dark:text-amber-300',
      skills: [
        { name: 'Blockchain Protocols & Chains', qualitativeLabel: 'Foundational Knowledge', details: 'Ecosystem comprehension across TON, Ethereum, Solana, and EVM chains' },
        { name: 'Advanced Crypto Topics', qualitativeLabel: 'Active Exploration', details: 'Smart contract basics, decentralized storage, airdrop analytics, wallet security' },
      ],
    },
    {
      id: 'community',
      name: '10. Community & Operations',
      icon: <Users size={18} className="text-purple-600 dark:text-purple-400" />,
      accent: 'border-purple-500/30 text-purple-800 dark:text-purple-300',
      skills: [
        { name: 'Telegram Channel Operations', qualitativeLabel: 'Hands-on Management', details: 'Engaging developer and enthusiast communities, release announcements' },
        { name: 'Open-Source Maintenance', qualitativeLabel: 'Public Builder', details: 'Managing issues, PR reviews, FLOSS licensing, and transparent roadmaps' },
      ],
    },
  ];

  const displayedCategories = selectedCategory === 'all' 
    ? categories 
    : categories.filter(c => c.id === selectedCategory);

  return (
    <section id="skills" className="py-24 px-4 sm:px-6 lg:px-8 relative z-10">
      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-500/10 border border-amber-500/20 text-amber-700 dark:text-amber-300 text-xs font-mono mb-3">
            <Layers size={14} />
            <span>ACCURATE TECHNICAL TAXONOMY</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-stone-900 dark:text-white tracking-tight font-display mb-4">
            Hands-on skills, zero inflated buzzwords.
          </h2>
          <p className="text-stone-600 dark:text-stone-400 text-base sm:text-lg">
            Every skill below reflects practical project building and system experimentation.
            Percentages represent stated self-assessed estimates, while qualitative tags highlight hands-on application.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          <button
            onClick={() => {
              setSelectedCategory('all');
              playSfx('click');
            }}
            onMouseEnter={() => playSfx('hover')}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all ${
              selectedCategory === 'all'
                ? 'bg-amber-500 text-stone-950 font-bold shadow-md'
                : 'bg-stone-100 dark:bg-stone-900/80 border border-stone-200 dark:border-white/10 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
            }`}
          >
            All 10 Categories
          </button>

          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCategory(cat.id);
                playSfx('click');
              }}
              onMouseEnter={() => playSfx('hover')}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all flex items-center gap-1.5 ${
                selectedCategory === cat.id
                  ? 'bg-amber-500/20 text-amber-900 dark:text-amber-200 border border-amber-500/50 shadow-sm'
                  : 'bg-stone-100 dark:bg-stone-900/60 border border-stone-200/80 dark:border-white/5 text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-white'
              }`}
            >
              {cat.icon}
              <span className="hidden sm:inline">{cat.name.replace(/^\d+\.\s*/, '')}</span>
            </button>
          ))}
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {displayedCategories.map((category) => (
            <div
              key={category.id}
              className="glass-panel p-6 rounded-3xl border border-stone-200 dark:border-white/10 hover:border-amber-500/40 transition-all flex flex-col justify-between shadow-sm"
            >
              <div>
                {/* Category Header */}
                <div className="flex items-center justify-between pb-4 mb-4 border-b border-stone-200 dark:border-white/5">
                  <div className="flex items-center gap-2.5">
                    <div className="p-2 rounded-xl bg-stone-100 dark:bg-stone-900 border border-stone-200 dark:border-white/10">
                      {category.icon}
                    </div>
                    <h3 className="text-base font-bold text-stone-900 dark:text-white tracking-wide">
                      {category.name}
                    </h3>
                  </div>
                  <span className="text-[11px] font-mono text-stone-500">
                    {category.skills.length} verified items
                  </span>
                </div>

                {/* Skills List with Horizontal Bars */}
                <div className="space-y-4">
                  {category.skills.map((skill, index) => (
                    <div key={index} className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs sm:text-sm">
                        <span className="font-medium text-stone-800 dark:text-stone-200">
                          {skill.name}
                        </span>
                        {skill.estimate ? (
                          <span className="font-mono text-xs text-amber-600 dark:text-amber-400 font-semibold">
                            {skill.estimate}
                          </span>
                        ) : (
                          <span className="text-[11px] font-mono px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-200 dark:border-white/10">
                            {skill.qualitativeLabel}
                          </span>
                        )}
                      </div>

                      {/* Animated Proficiency Bar */}
                      <div
                        className="w-full h-2 rounded-full bg-stone-200 dark:bg-stone-800/90 overflow-hidden border border-stone-200 dark:border-white/5"
                        role="progressbar"
                        aria-valuenow={skill.percentage ?? 75}
                        aria-valuemin={0}
                        aria-valuemax={100}
                        aria-label={`${skill.name}: ${skill.estimate ?? skill.qualitativeLabel}`}
                      >
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ${
                            skill.percentage && skill.percentage >= 90
                              ? 'bg-gradient-to-r from-amber-500 to-emerald-500'
                              : skill.percentage && skill.percentage >= 80
                              ? 'bg-gradient-to-r from-amber-500 to-amber-600'
                              : 'bg-gradient-to-r from-purple-500 to-rose-500'
                          }`}
                          style={{
                            width: `${skill.percentage ?? 75}%`,
                          }}
                        />
                      </div>

                      <p className="text-[11px] text-stone-500 dark:text-stone-400 leading-tight">
                        {skill.details}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Disclaimer Notice */}
        <div className="mt-10 p-4 rounded-2xl bg-stone-100 dark:bg-stone-900/70 border border-stone-200 dark:border-white/5 text-center max-w-3xl mx-auto shadow-sm">
          <p className="text-xs text-stone-600 dark:text-stone-400 leading-relaxed">
            <span className="text-amber-700 dark:text-amber-400 font-semibold">Self-Assessment Integrity:</span> All percentages represent Mohammad Kaif Raja's stated self-evaluations derived from practical project architectures. They are not standardized examination certifications or third-party test scores.
          </p>
        </div>

      </div>
    </section>
  );
};
