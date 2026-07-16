import { SiteConfig } from '@/types';

export const siteConfig: SiteConfig = {
  name: 'Realty AI Vault',
  description: 'Discover 20+ AI-powered tools for real estate agents. Virtual staging, lead generation, CRM automation, market analysis. Updated monthly.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.realtyaivault.com',
  ogImage: '/og-image.png',
  adsense: {
    publisherId: process.env.NEXT_PUBLIC_ADSENSE_CLIENT || 'ca-pub-XXXXXXXXXXXXXXXX',
    enabled: process.env.NEXT_PUBLIC_ADSENSE_ENABLED === 'true',
    slots: {
      header: { name: 'Header Banner', adClient: process.env.NEXT_PUBLIC_ADSENSE_CLIENT || 'ca-pub-XXXXXXXXXXXXXXXX', adSlot: '1234567890', format: 'horizontal' },
      sidebar: { name: 'Sidebar', adClient: process.env.NEXT_PUBLIC_ADSENSE_CLIENT || 'ca-pub-XXXXXXXXXXXXXXXX', adSlot: '2345678901', format: 'vertical' },
      inFeed: { name: 'In-Feed', adClient: process.env.NEXT_PUBLIC_ADSENSE_CLIENT || 'ca-pub-XXXXXXXXXXXXXXXX', adSlot: '3456789012', format: 'fluid', layout: 'in-feed' },
      anchor: { name: 'Anchor', adClient: process.env.NEXT_PUBLIC_ADSENSE_CLIENT || 'ca-pub-XXXXXXXXXXXXXXXX', adSlot: '4567890123', format: 'horizontal' },
      inArticle: { name: 'In-Article', adClient: process.env.NEXT_PUBLIC_ADSENSE_CLIENT || 'ca-pub-XXXXXXXXXXXXXXXX', adSlot: '5678901234', format: 'horizontal', layout: 'in-article' },
    },
  },
  analytics: { gaId: process.env.NEXT_PUBLIC_GA_ID },
};