import type { Metadata } from 'next';
import { Geist, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import { MarketingTracker } from './marketing-tracker';
import { MotionSystem } from './motion-system';

const siteUrl = 'https://sohan-website-studio.vercel.app';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const editorial = Cormorant_Garamond({
  variable: '--font-editorial',
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  style: ['normal', 'italic'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'Sohan Vyaparee — Complete Websites from Direction to Launch',
  description: 'Strategy, art direction, customer experience, responsive development and launch—directed as one complete website project.',
  applicationName: 'Sohan Vyaparee — Independent Website Studio',
  alternates: { canonical: '/' },
  keywords: [
    'website design and development',
    'website designer for startups',
    'complete business website',
    'web design India',
    'creative website development',
    'AI assisted website development',
  ],
  verification: { google: '15b--V8aDq-uI8hK9-ye9vJP0yT2wSOeGey-HlJqbfs' },
  robots: { index: true, follow: true },
  openGraph: {
    title: 'From business idea to a website ready for market.',
    description: 'Strategy, art direction, customer experience, responsive build and launch—one connected website project.',
    type: 'website',
    images: [{ url: '/og.png', width: 1200, height: 630, alt: 'From business idea to a website ready for market.' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'From business idea to a website ready for market.',
    description: 'Strategy, art direction, customer experience, responsive build and launch—one connected website project.',
    images: ['/og.png'],
  },
};

const professionalServiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: 'Sohan Vyaparee — Independent Website Studio',
  url: siteUrl,
  image: `${siteUrl}/og.png`,
  description: 'Complete websites from strategy and art direction through responsive build, integrations and launch.',
  priceRange: '$499–$1,799+',
  areaServed: 'Worldwide',
  founder: {
    '@type': 'Person',
    name: 'Sohan Vyaparee',
    jobTitle: 'Website Creative Director',
  },
  sameAs: [
    'https://www.linkedin.com/services/page/a8036034688b927420/',
    'https://www.upwork.com/freelancers/~01b29ff9dfbe850b7b',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${editorial.variable} antialiased`}
      >
        <MarketingTracker />
        <MotionSystem />
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(professionalServiceSchema) }}
        />
      </body>
    </html>
  );
}
