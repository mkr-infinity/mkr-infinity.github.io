import type { Metadata, Viewport } from 'next';
import '@fontsource/bebas-neue/400.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';
import '@fontsource/jetbrains-mono/400.css';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://iamkaif.me'),
  title: 'Mohammad Kaif Raja (@mkr_infinity) · Self-Taught System Builder & Software Engineer',
  description:
    'Official portfolio of Mohammad Kaif Raja (@mkr_infinity). 100% self-taught system builder since 2016 from India. Android internals, custom ROMs, high-performance web tooling, AI systems, and 10 deployed open-source systems.',
  applicationName: 'Mohammad Kaif Raja Portfolio',
  keywords: [
    'Mohammad Kaif Raja',
    'iamkaif.me',
    'mkr-infinity',
    'mkr_infinity',
    'Mohammad Kaif Raja Portfolio',
    'System Builder',
    'Android Internals',
    'Android Modding',
    'Kernel Development',
    'Bootloader Unlock',
    'GSI Flashing Guide',
    'Project Treble',
    'Full Stack Engineer',
    'Next.js Developer',
    'TypeScript',
    'React',
    'Web Audio API',
    'Self-Taught Developer India',
    'Open Source Systems',
    'Reverse Engineering',
  ],
  authors: [{ name: 'Mohammad Kaif Raja', url: 'https://github.com/mkr-infinity' }],
  creator: 'Mohammad Kaif Raja',
  publisher: 'Mohammad Kaif Raja',
  category: 'technology',
  alternates: {
    canonical: 'https://iamkaif.me/',
    types: {
      'text/plain': 'https://iamkaif.me/llms.txt',
    },
  },
  icons: {
    icon: [
      { url: '/favicon.png', type: 'image/png' },
      { url: '/favicon.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.png', sizes: '192x192', type: 'image/png' },
    ],
    apple: [{ url: '/favicon.png', sizes: '180x180', type: 'image/png' }],
    shortcut: '/favicon.png',
  },
  openGraph: {
    type: 'profile',
    locale: 'en_US',
    url: 'https://iamkaif.me/',
    title: 'Mohammad Kaif Raja (@mkr_infinity) · System Builder',
    description:
      '100% Self-Taught System Builder since 2016 from India. Breaking systems, understanding them fundamentally, and rebuilding better versions. Explore 10 shipped open-source architectures.',
    siteName: 'Mohammad Kaif Raja (@mkr_infinity)',
    images: [
      {
        url: '/og-preview.png',
        width: 1200,
        height: 630,
        alt: 'Mohammad Kaif Raja — Self-Taught System Builder Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mohammad Kaif Raja (@mkr_infinity) · System Builder',
    description:
      '100% Self-Taught System Builder since 2016 from India. Android internals, custom ROMs, web tooling, and automation workflows.',
    creator: '@mkr_infinity',
    site: '@mkr_infinity',
    images: ['/og-preview.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Person',
        '@id': 'https://iamkaif.me/#person',
        name: 'Mohammad Kaif Raja',
        alternateName: ['mkr-infinity', '@mkr_infinity', 'Kaif Raja', 'MKR'],
        url: 'https://iamkaif.me/',
        image: 'https://iamkaif.me/og-preview.png',
        jobTitle: 'Self-Taught System Builder & Software Engineer',
        description:
          '100% self-taught software engineer and system builder from India since 2016. Specializes in low-level Android architecture, custom ROMs, GSI flashing, high-performance web tooling, and open-source automation workflows.',
        nationality: {
          '@type': 'Country',
          name: 'India',
        },
        address: {
          '@type': 'PostalAddress',
          addressCountry: 'IN',
        },
        sameAs: [
          'https://github.com/mkr-infinity',
          'https://instagram.com/mkr_infinity',
          'https://t.me/mkr_infinity',
        ],
        knowsAbout: [
          'Android Internals',
          'Linux Kernel',
          'Project Treble',
          'Generic System Images (GSI)',
          'Bootloader Unlocking',
          'Fastboot & ADB Automation',
          'TypeScript',
          'React',
          'Next.js',
          'Web Audio API',
          'System Architecture',
          'Reverse Engineering',
          'PowerShell & Bash Scripting',
        ],
      },
      {
        '@type': 'WebSite',
        '@id': 'https://iamkaif.me/#website',
        url: 'https://iamkaif.me/',
        name: 'Mohammad Kaif Raja Portfolio',
        alternateName: 'iamkaif.me',
        description:
          'Official developer portfolio of Mohammad Kaif Raja, showcasing 10 open-source systems, engineering philosophy, and contact channels.',
        publisher: {
          '@id': 'https://iamkaif.me/#person',
        },
        inLanguage: 'en-US',
      },
      {
        '@type': 'ProfilePage',
        '@id': 'https://iamkaif.me/#profilepage',
        url: 'https://iamkaif.me/',
        name: 'Mohammad Kaif Raja (@mkr_infinity) — Profile & Systems',
        isPartOf: {
          '@id': 'https://iamkaif.me/#website',
        },
        mainEntity: {
          '@id': 'https://iamkaif.me/#person',
        },
      },
      {
        '@type': 'ItemList',
        '@id': 'https://iamkaif.me/#projects',
        name: 'Shipped Systems & Open-Source Projects by Mohammad Kaif Raja',
        description: '10 verified open-source software systems architected by Mohammad Kaif Raja.',
        numberOfItems: 10,
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            item: {
              '@type': 'SoftwareSourceCode',
              name: 'MKR Music',
              description: 'Flagship audiophile streaming music suite with real-time Web Audio API synthesized audio chord effects.',
              codeRepository: 'https://github.com/mkr-infinity/MKR-Music',
              programmingLanguage: ['TypeScript', 'React Native', 'Web Audio API'],
              author: { '@id': 'https://iamkaif.me/#person' },
            },
          },
          {
            '@type': 'ListItem',
            position: 2,
            item: {
              '@type': 'SoftwareSourceCode',
              name: 'Revision Master',
              description: 'Automated syllabus pacing & smart study scheduling engine for high-retention learning workflows.',
              codeRepository: 'https://github.com/mkr-infinity/Revision-Master',
              programmingLanguage: ['TypeScript', 'Next.js', 'Tailwind CSS'],
              author: { '@id': 'https://iamkaif.me/#person' },
            },
          },
          {
            '@type': 'ListItem',
            position: 3,
            item: {
              '@type': 'CreativeWork',
              name: 'Android Cheatsheet',
              description: 'Comprehensive deep-dive reference manual for fastboot commands, partition tables, and kernel debugging.',
              url: 'https://github.com/mkr-infinity/Android-Cheatsheet',
              author: { '@id': 'https://iamkaif.me/#person' },
            },
          },
          {
            '@type': 'ListItem',
            position: 4,
            item: {
              '@type': 'SoftwareSourceCode',
              name: 'CalcVerse',
              description: 'Next-generation scientific calculation suite featuring custom matrix transformations and formula history.',
              codeRepository: 'https://github.com/mkr-infinity/CalcVerse',
              programmingLanguage: ['TypeScript', 'Math.js'],
              author: { '@id': 'https://iamkaif.me/#person' },
            },
          },
          {
            '@type': 'ListItem',
            position: 5,
            item: {
              '@type': 'SoftwareSourceCode',
              name: 'ReadmeHub',
              description: 'Interactive GitHub profile README generator and dual-mode Markdown studio with shield badge builder.',
              codeRepository: 'https://github.com/mkr-infinity/ReadmeHub',
              programmingLanguage: ['React', 'Remark', 'TypeScript'],
              author: { '@id': 'https://iamkaif.me/#person' },
            },
          },
          {
            '@type': 'ListItem',
            position: 6,
            item: {
              '@type': 'SoftwareSourceCode',
              name: 'Tailor System',
              description: 'Bespoke garment dimension ledger and dynamic measurement calculation suite.',
              codeRepository: 'https://github.com/mkr-infinity/Tailor-System',
              programmingLanguage: ['TypeScript', 'Next.js'],
              author: { '@id': 'https://iamkaif.me/#person' },
            },
          },
          {
            '@type': 'ListItem',
            position: 7,
            item: {
              '@type': 'SoftwareSourceCode',
              name: 'Matrix Calculator',
              description: 'Interactive linear algebra computational tool featuring row-echelon reduction and determinant expansion.',
              codeRepository: 'https://github.com/mkr-infinity/Matrix-Calculator',
              programmingLanguage: ['TypeScript', 'Canvas API'],
              author: { '@id': 'https://iamkaif.me/#person' },
            },
          },
          {
            '@type': 'ListItem',
            position: 8,
            item: {
              '@type': 'SoftwareSourceCode',
              name: 'Bootloader Unlock Guide & Scripts',
              description: 'Multi-OEM automated bootloader unlock toolchain and step-by-step diagnostic guide.',
              codeRepository: 'https://github.com/mkr-infinity/Bootloader-Unlock',
              programmingLanguage: ['Python', 'Shell', 'ADB/Fastboot'],
              author: { '@id': 'https://iamkaif.me/#person' },
            },
          },
          {
            '@type': 'ListItem',
            position: 9,
            item: {
              '@type': 'CreativeWork',
              name: 'GSI Flashing Guide',
              description: 'Production-tested guide and companion utility scripts for deploying Android Generic System Images across Project Treble architectures.',
              url: 'https://github.com/mkr-infinity/GSI-Guide',
              author: { '@id': 'https://iamkaif.me/#person' },
            },
          },
          {
            '@type': 'ListItem',
            position: 10,
            item: {
              '@type': 'SoftwareSourceCode',
              name: 'Windows Activation & Optimization Suite',
              description: 'Clean PowerShell system optimization scripts for telemetry removal and bloatware cleanup.',
              codeRepository: 'https://github.com/mkr-infinity/Windows-Activation',
              programmingLanguage: ['PowerShell', 'Batch'],
              author: { '@id': 'https://iamkaif.me/#person' },
            },
          },
        ],
      },
    ],
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="canonical" href="https://iamkaif.me/" />
        <link rel="alternate" type="text/plain" href="/llms.txt" title="LLM Knowledge Profile" />
        <link rel="alternate" type="text/plain" href="/llms-full.txt" title="Comprehensive LLM Ledger" />
        <link rel="sitemap" type="application/xml" href="/sitemap.xml" />
        
        {/* Geographic & Meta Directives for Global Indexing */}
        <meta name="geo.region" content="IN" />
        <meta name="geo.placename" content="India" />
        <meta name="author" content="Mohammad Kaif Raja" />
        <meta name="rating" content="General" />
        <meta name="revisit-after" content="7 days" />

        {/* Preload critical hero WebP frames and core assets */}
        <link rel="preload" href="/frames/hero-hd/001.webp" as="image" type="image/webp" />
        <link rel="preload" href="/frames/hero-hd/002.webp" as="image" type="image/webp" />
        <link rel="preload" href="/favicon.png" as="image" type="image/png" />
        <link rel="preload" href="/fonts/bangers.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        
        {/* Search Engine & AI Agent Semantic Schema Graph */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
