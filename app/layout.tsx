import type { Metadata, Viewport } from 'next';
import './globals.css';

const SITE_URL = 'https://marlonbsiqueira.github.io/MBSforms/';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'MBSA Advisory | Strategic Business Diagnostic',
  description:
    'AI-powered business diagnostic platform. Identify your company\'s real bottlenecks and unlock your next level of growth.',
  alternates: { canonical: SITE_URL },
  openGraph: {
    title: 'MBSA Advisory | Strategic Business Diagnostic',
    description: 'Identify your company\'s real bottlenecks in under 5 minutes.',
    type: 'website',
    url: SITE_URL,
    siteName: 'MBSA Advisory',
    images: [{ url: `${SITE_URL}og-image.jpg`, width: 1200, height: 630, alt: 'MBSA Advisory — Strategic Business Diagnostic' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MBSA Advisory | Strategic Business Diagnostic',
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
    <html lang="en" className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400..700;1,400&family=Inter:wght@300..600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-navy text-gray-100 antialiased overflow-x-hidden">
        <div className="ambient-glow" aria-hidden="true" />
        {children}
      </body>
    </html>
  );
}
