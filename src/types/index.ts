export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  count: number;
}

export interface Listing {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  categoryId: string;
  categoryName: string;
  categoryIcon: string;
  website: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  country?: string;
  logo?: string;
  images: string[];
  featured: boolean;
  verified: boolean;
  tags: string[];
  keyFeatures: string[];
  integrations: string[];
  platforms: string[];
  targetUsers: string[];
  pricing: string;
  pricingType: string;
  startingPrice: number;
  currency: string;
  affiliateLink?: string;
  createdAt: string;
  updatedAt: string;
}

export interface AdSlot {
  name: string;
  adClient: string;
  adSlot: string;
  format: 'auto' | 'rectangle' | 'horizontal' | 'vertical' | 'fluid';
  layout?: 'in-article' | 'in-feed' | 'matched-content';
  style?: Record<string, string>;
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  ogImage: string;
  adsense: {
    publisherId: string;
    enabled: boolean;
    slots: Record<string, AdSlot>;
  };
  analytics?: { gaId?: string; };
}