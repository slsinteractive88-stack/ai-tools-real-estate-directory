import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { Layout } from '@/components/layout/Layout';
import { siteConfig } from '@/lib/config';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: { default: siteConfig.name, template: '%s | ' + siteConfig.name },
  description: siteConfig.description,
  keywords: ['local business directory', 'local services', 'business listings', 'find local businesses'],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  robots: 'index, follow',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [{ url: siteConfig.ogImage, width: 1200, height: 630, alt: siteConfig.name }],
  },
  twitter: { card: 'summary_large_image', title: siteConfig.name, description: siteConfig.description, images: [siteConfig.ogImage] },
  verification: { google: 'google-site-verification-code' },
};

export const viewport: Viewport = { themeColor: '#0ea5e9', width: 'device-width', initialScale: 1 };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Layout>
      <div className={`${inter.variable} font-sans`}>{children}</div>
    </Layout>
  );
}