import type { Metadata } from 'next';
import { Analytics } from '@vercel/analytics/next';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';

export const metadata: Metadata = {
  title: 'YPIT: The Artificial Future | Hackathon Registration',
  description: 'Join the biggest AI hackathon in Nigeria. Build impactful AI solutions for Africa\'s future with YPIT.',
  keywords: ['hackathon', 'AI', 'Nigeria', 'Lagos', 'YPIT', 'artificial intelligence', 'Africa'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white antialiased">
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}

