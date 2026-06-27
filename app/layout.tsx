import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MBSA Advisory | Strategic Business Diagnostic',
  description:
    'AI-powered business diagnostic platform. Identify your company\'s real bottlenecks and unlock your next level of growth.',
  openGraph: {
    title: 'MBSA Advisory | Strategic Business Diagnostic',
    description: 'Identify your company\'s real bottlenecks in under 5 minutes.',
    type: 'website',
  },
};

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
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Inter:wght@300;400;500;600&display=swap"
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
