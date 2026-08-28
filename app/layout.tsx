import type { Metadata } from 'next';
import { Geist, Cormorant_Garamond } from 'next/font/google';
import './globals.css';

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
  title: 'Sohan Vyaparee — Complete Websites from Direction to Launch',
  description: 'Strategy, art direction, customer experience, responsive development and launch—directed as one complete website project.',
  applicationName: 'Sohan Vyaparee — Independent Website Studio',
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
        {children}
      </body>
    </html>
  );
}
