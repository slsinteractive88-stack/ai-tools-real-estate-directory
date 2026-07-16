import { SiteConfig } from '@/types';

export const siteConfig: SiteConfig = {
  name: 'Realty AI Vault',
  description: 'Discover 20+ AI-powered tools for real estate agents. Virtual staging, lead generation, CRM automation, market analysis. Updated monthly.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://www.realtyaivault.com',
  ogImage: '/og-image.png',
  adsense: {
    publisherId: process.env.NEXT_PUBLIC_ADSENSE_CLIENT || 'ca-pub-XXXXXXXXXXXXXXXX',
    enabled: false,
    slots: {
      header: { name: 'Header Banner', adClient: process.env.NEXT_PUBLIC_ADSENSE_CLIENT || 'ca-pub-XXXXXXXXXXXXXXXX', adSlot: '1557653460', format: 'horizontal' },
      sidebar: { name: 'Sidebar', adClient: process.env.NEXT_PUBLIC_ADSENSE_CLIENT || 'ca-pub-XXXXXXXXXXXXXXXX', adSlot: '3636453671', format: 'vertical' },
      inFeed: { name: 'In-Feed', adClient: process.env.NEXT_PUBLIC_ADSENSE_CLIENT || 'ca-pub-XXXXXXXXXXXXXXXX', adSlot: '3370382878', format: 'fluid', layout: 'in-feed' },
      inArticle: { name: 'In-Article', adClient: process.env.NEXT_PUBLIC_ADSENSE_CLIENT || 'ca-pub-XXXXXXXXXXXXXXXX', adSlot: '9744219535', format: 'horizontal', layout: 'in-article' },
    },
  },
  analytics: { gaId: process.env.NEXT_PUBLIC_GA_ID },
};