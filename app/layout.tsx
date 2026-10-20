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
  metadataBase: new URL('https://mkr-infinity.github.io'),
  title: 'Mohammad Kaif Raja · @mkr_infinity · System Builder',
  description:
    'Hey, I’m Mohammad Kaif Raja — a self-taught system builder from India focused on creating practical, real-world tech solutions. Android internals, web tools, automation workflows, and AI products.',
  keywords: [
    'Mohammad Kaif Raja',
    'mkr-infinity',
    'mkr_infinity',
    'System Builder',
    'Android Modding',
    'Full Stack Developer',
    'Web Tools',
    'Automation Workflows',
    'AI Products',
    'India',
  ],
  authors: [{ name: 'Mohammad Kaif Raja', url: 'https://github.com/mkr-infinity' }],
  creator: 'Mohammad Kaif Raja',
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
    type: 'website',
    locale: 'en_US',
    url: 'https://mkr-infinity.github.io/',
    title: 'Mohammad Kaif Raja · @mkr_infinity · System Builder',
    description:
      '100% Self-Taught System Builder since 2016. Breaking things, understanding them, and rebuilding better versions.',
    siteName: 'Mohammad Kaif Raja Portfolio',
    images: [
      {
        url: '/og-preview.png',
        width: 1200,
        height: 630,
        alt: 'Mohammad Kaif Raja — System Builder Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mohammad Kaif Raja (@mkr_infinity) · System Builder',
    description:
      '100% Self-Taught System Builder since 2016. Android internals, web tools, automation workflows, and AI products.',
    creator: '@mkr_infinity',
    images: ['/og-preview.png'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Mohammad Kaif Raja',
    alternateName: 'mkr-infinity',
    url: 'https://mkr-infinity.github.io/',
    image: 'https://mkr-infinity.github.io/favicon.png',
    jobTitle: 'Self-Taught System Builder',
    nationality: 'Indian',
    sameAs: [
      'https://github.com/mkr-infinity',
      'https://www.instagram.com/mkr_infinity/',
      'https://t.me/mkr_infinity',
    ],
    knowsAbout: [
      'Android Internals',
      'Kernel & Bootloader Modding',
      'TypeScript',
      'React',
      'Next.js',
      'System Architecture',
      'Automation Workflows',
      'AI Applications',
    ],
    description:
      'Self-taught system builder from India focused on creating practical, real-world tech solutions since 2016.',
  };

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        {/* Preload critical hero WebP frames and core assets */}
        <link rel="preload" href="/frames/hero-hd/001.webp" as="image" type="image/webp" />
        <link rel="preload" href="/frames/hero-hd/002.webp" as="image" type="image/webp" />
        <link rel="preload" href="/favicon.png" as="image" type="image/png" />
        <link rel="preload" href="/fonts/bangers.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
