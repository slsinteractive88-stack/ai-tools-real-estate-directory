import { SiteConfig } from '@/types';

export const siteConfig: SiteConfig = {
  name: 'LocalDir',
  description: 'Discover the best local businesses and services in your area.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://localdir.example.com',
  ogImage: '/og-image.png',
  adsense: {
    publisherId: process.env.NEXT_PUBLIC_ADSENSE_CLIENT || 'ca-pub-XXXXXXXXXXXXXXXX',
    enabled: process.env.NEXT_PUBLIC_ADSENSE_ENABLED === 'true',
    slots: {
      header: { name: 'Header Banner', adClient: 'ca-pub-XXXXXXXXXXXXXXXX', adSlot: '1234567890', format: 'horizontal' },
      sidebar: { name: 'Sidebar', adClient: 'ca-pub-XXXXXXXXXXXXXXXX', adSlot: '2345678901', format: 'vertical' },
      inFeed: { name: 'In-Feed', adClient: 'ca-pub-XXXXXXXXXXXXXXXX', adSlot: '3456789012', format: 'fluid', layout: 'in-feed' },
      anchor: { name: 'Anchor', adClient: 'ca-pub-XXXXXXXXXXXXXXXX', adSlot: '4567890123', format: 'horizontal' },
      inArticle: { name: 'In-Article', adClient: 'ca-pub-XXXXXXXXXXXXXXXX', adSlot: '5678901234', format: 'fluid', layout: 'in-article' },
    },
  },
  analytics: { gaId: process.env.NEXT_PUBLIC_GA_ID },
};

export const categories = [
  { id: 'restaurants', name: 'Restaurants', slug: 'restaurants', description: 'Local dining spots', icon: '🍽️', count: 42 },
  { id: 'plumbers', name: 'Plumbers', slug: 'plumbers', description: 'Licensed plumbing services', icon: '🔧', count: 28 },
  { id: 'electricians', name: 'Electricians', slug: 'electricians', description: 'Certified electrical work', icon: '⚡', count: 19 },
  { id: 'dentists', name: 'Dentists', slug: 'dentists', description: 'Dental care providers', icon: '🦷', count: 31 },
  { id: 'gyms', name: 'Gyms & Fitness', slug: 'gyms', description: 'Fitness centers and studios', icon: '💪', count: 15 },
  { id: 'salons', name: 'Salons & Spas', slug: 'salons', description: 'Beauty and wellness', icon: '💇', count: 22 },
] as const;