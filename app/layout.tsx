import type { Metadata } from 'next';
import { Geist, Cormorant_Garamond } from 'next/font/google';
import './globals.css';
import { MarketingTracker } from './marketing-tracker';
import { MotionSystem } from './motion-system';
import { publicSiteUrl as siteUrl, studioBrand } from './site';

const personalLinkedInUrl = 'https://www.linkedin.com/in/sohan-vyaparee-397a29352/';
const studioLinkedInUrl = 'https://www.linkedin.com/company/sp-studios7/';
const studioInstagramUrl = 'https://www.instagram.com/spstudios7/';
const githubProfileUrl = 'https://github.com/xtreme99909-dotcom';

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
  title: 'Website Design & Development for Businesses | SP Studios',
  description: 'Complete website strategy, original design, responsive development, integrations and launch for founders and growing businesses in India and worldwide.',
  applicationName: 'SP Studios',
  alternates: { canonical: '/' },
  keywords: [
    'website design and development services',
    'website designer and developer India',
    'website designer for startups',
    'complete business website',
    'business website design India',
    'creative website development',
    'end to end website design and development',
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
  '@id': `${siteUrl}/#studio`,
  name: studioBrand.name,
  alternateName: studioBrand.descriptor,
  url: siteUrl,
  image: `${siteUrl}/og.png`,
  description: 'Complete websites from strategy and art direction through responsive build, integrations and launch.',
  priceRange: '$1,500–$6,500+',
  areaServed: [
    { '@type': 'Country', name: 'India' },
    { '@type': 'Place', name: 'Worldwide' },
  ],
  knowsAbout: ['Website strategy', 'UX and content structure', 'Original web design', 'Responsive web development', 'Website integrations', 'Website launch'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Complete website engagements',
    itemListElement: [
      { '@type': 'Offer', name: 'Launch Essentials', price: '1500', priceCurrency: 'USD', url: `${siteUrl}/services/complete-website-launch#scope` },
      { '@type': 'Offer', name: 'Business Launch', price: '3000', priceCurrency: 'USD', url: `${siteUrl}/services/complete-website-launch#scope` },
      { '@type': 'Offer', name: 'International Launch System', price: '6500', priceCurrency: 'USD', url: `${siteUrl}/services/complete-website-launch#scope` },
    ],
  },
  founder: {
    '@type': 'Person',
    '@id': `${siteUrl}/#sohan-vyaparee`,
    name: studioBrand.founder,
    jobTitle: 'Website Creative Director',
    url: `${siteUrl}/#about`,
    image: `${siteUrl}/founder-sohan.jpg`,
    sameAs: [personalLinkedInUrl, githubProfileUrl],
  },
  sameAs: [
    studioLinkedInUrl,
    studioInstagramUrl,
    personalLinkedInUrl,
    'https://www.linkedin.com/services/page/a8036034688b927420/',
    'https://www.upwork.com/freelancers/~01b29ff9dfbe850b7b',
    githubProfileUrl,
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
