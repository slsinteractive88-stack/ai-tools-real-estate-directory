import { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import { siteConfig } from '@/lib/config';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

const keywords = [
  'AI tools for real estate agents',
  'real estate AI software',
  'virtual staging AI',
  'real estate lead generation AI',
  'CRM automation real estate',
  'property marketing AI',
  'real estate technology tools',
  'AI for realtors',
  'real estate marketing automation',
  'property valuation AI',
  'real estate chatbot',
  'AI listing description generator',
  'virtual tour software',
  'real estate CRM AI',
  'predictive analytics real estate',
  'real estate productivity tools',
  'MLS AI tools',
  'real estate photo enhancement AI',
];

export const metadata: Metadata = {
  title: {
    default: 'Realty AI Vault | AI Tools for Real Estate Agents',
    template: '%s | Realty AI Vault',
  },
  description: 'Discover 29+ AI-powered tools for real estate agents. Virtual staging, lead generation, CRM automation, market analysis, listing marketing. Updated monthly with verified reviews.',
  keywords,
  authors: [{ name: 'Realty AI Vault' }],
  creator: 'Realty AI Vault',
  publisher: 'Realty AI Vault',
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large', 'max-snippet': -1 } },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: 'Realty AI Vault',
    title: 'Realty AI Vault | AI Tools for Real Estate Agents',
    description: 'Discover 29+ AI-powered tools for real estate agents. Virtual staging, lead generation, CRM automation, market analysis. Updated monthly.',
    images: [
      { url: siteConfig.ogImage, width: 1200, height: 630, alt: 'Realty AI Vault - AI Tools for Real Estate Agents' },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Realty AI Vault | AI Tools for Real Estate Agents',
    description: 'Discover 29+ AI-powered tools for real estate agents. Virtual staging, lead generation, CRM automation, market analysis.',
    images: [siteConfig.ogImage],
    creator: '@realtyaivault',
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_VERIFICATION || 'google-site-verification-code',
  },
  category: 'Real Estate Technology',
  classification: 'Business Software Directory',
  referrer: 'origin-when-cross-origin',
  formatDetection: { telephone: false },
  other: {
    'theme-color': '#0ea5e9',
    'color-scheme': 'light dark',
  },
};

export const viewport: Viewport = {
  themeColor: '#0ea5e9',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://pagead2.googlesyndication.com" />
        <link rel="dns-prefetch" href="https://www.google-analytics.com" />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}