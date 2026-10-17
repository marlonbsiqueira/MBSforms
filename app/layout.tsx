import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import './globals.css';

// Self-hosted variable fonts (latin subset covers PT diacritics): no request
// to Google, preloaded, and next/font adds a metric-matched fallback so the
// text doesn't jump when the font arrives.
const inter = localFont({
  src: './fonts/inter-latin-wght-normal.woff2',
  weight: '300 600',
  display: 'swap',
  variable: '--font-inter',
});
const playfair = localFont({
  src: [
    { path: './fonts/playfair-display-latin-wght-normal.woff2', weight: '400 700', style: 'normal' },
    { path: './fonts/playfair-display-latin-wght-italic.woff2', weight: '400 700', style: 'italic' },
  ],
  display: 'swap',
  variable: '--font-playfair',
});

const SITE_URL = 'https://marlonbsiqueira.github.io/MBSforms/';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'MBS Advisory | Strategic Business Diagnostic',
  description:
    'AI-powered business diagnostic platform. Identify your company\'s real bottlenecks and unlock your next level of growth.',
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: 'MBS Advisory | Strategic Business Diagnostic',
    description: 'Identify your company\'s real bottlenecks in under 5 minutes.',
    type: 'website',
    url: SITE_URL,
    siteName: 'MBS Advisory',
    images: [{ url: `${SITE_URL}og-image.jpg`, width: 1200, height: 630, alt: 'MBS Advisory — Strategic Business Diagnostic' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MBS Advisory | Strategic Business Diagnostic',
    description: 'Identify your company\'s real bottlenecks in under 5 minutes.',
    images: [`${SITE_URL}og-image.jpg`],
  },
};

export const viewport: Viewport = { themeColor: '#07070F' };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`dark ${inter.variable} ${playfair.variable}`}>
      <body className="bg-navy text-gray-100 antialiased overflow-x-hidden">
        <div className="ambient-glow" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
