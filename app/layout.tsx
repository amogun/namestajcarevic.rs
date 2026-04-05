import type { Metadata } from 'next';
import { Suspense } from 'react';
import { Inter, Playfair_Display } from 'next/font/google';
import './globals.css';
import { QueryClientProviderWrapper } from '@/lib/queryClient';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Toaster } from '@/components/ui/toaster';
import { StructuredData } from '@/components/StructuredData';
import { CartProvider } from '@/hooks/use-cart';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Nameštaj Carevic - Salon Nameštaja Kragujevac',
  description: 'Nameštaj Carevic - salon nameštaja u Kragujevcu. Kvalitetan nameštaj za dom, tradicionalno zanatstvo, 20+ godina iskustva.',
  keywords: 'nameštaj, Kragujevac, salon nameštaja, kupi nameštaj, Carevic, nameštaj Srbija, nameštaj Kragujevac, salon nameštaja Carević',
  authors: [{ name: 'Nameštaj Carevic' }],
  creator: 'Nameštaj Carevic',
  publisher: 'Nameštaj Carevic',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://namestajcarevic.rs'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'Nameštaj Carevic - Salon Nameštaja Kragujevac',
    description: 'Kvalitetan nameštaj za dom sa 20+ godina tradicije u Kragujevcu',
    type: 'website',
    locale: 'sr_RS',
    siteName: 'Nameštaj Carevic',
    images: [
      {
        url: '/home-showroom.jpg',
        width: 1200,
        height: 630,
        alt: 'Nameštaj Carevic - Salon Nameštaja Kragujevac',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Nameštaj Carevic - Salon Nameštaja Kragujevac',
    description: 'Kvalitetan nameštaj za dom sa 20+ godina tradicije u Kragujevcu',
    images: ['/home-showroom.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: 'your-google-verification-code',
    // yandex: 'your-yandex-verification-code',
    // bing: 'your-bing-verification-code',
  },
};

import Analytics from '@/components/Analytics';
import { Analytics as VercelAnalytics } from '@vercel/analytics/next';
import Script from 'next/script';

const COOKIEYES_ID = '54a330c937a2ce8efd4bb84ca4777f12';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="sr" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <Script
          id="cookieyes"
          src={`https://cdn-cookieyes.com/client_data/${COOKIEYES_ID}/script.js`}
          strategy="beforeInteractive"
        />
        <StructuredData />
        <meta name="theme-color" content="#6b4f3a" />
        <meta name="msapplication-TileColor" content="#6b4f3a" />
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        {/* Preconnect to external domains for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        <link rel="dns-prefetch" href="//www.google-analytics.com" />
        <meta name="geo.region" content="RS-12" />
        <meta name="geo.placename" content="Kragujevac" />
        <meta name="geo.position" content="44.0128;20.9114" />
        <meta name="ICBM" content="44.0128, 20.9114" />
        <meta name="dcterms.language" content="sr-RS" />
        <meta name="dcterms.title" content="Nameštaj Carevic - Salon Nameštaja Kragujevac" />
        <meta name="dcterms.description" content="Nameštaj Carevic - salon nameštaja u Kragujevcu. Kvalitetan nameštaj za dom, tradicionalno zanatstvo, 20+ godina iskustva." />
        <meta name="dcterms.creator" content="Nameštaj Carevic" />
        <meta name="dcterms.publisher" content="Nameštaj Carevic" />
        <meta name="dcterms.rights" content="© 2024 Nameštaj Carevic. Sva prava zadržana." />
      </head>
      <body className="font-sans">
        <Suspense fallback={null}>
          <Analytics />
        </Suspense>
        <QueryClientProviderWrapper>
          <CartProvider>
            <TooltipProvider>
              {children}
              <Toaster />
            </TooltipProvider>
          </CartProvider>
        </QueryClientProviderWrapper>
        <VercelAnalytics />
      </body>
    </html>
  );
}