import { MetadataRoute } from 'next';
import { siteConfig } from '@/lib/config';
import { categories } from '@/lib/categories';
import { listings } from '@/lib/listings';

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticRoutes = [
    { url: base, lastModified: now, changeFrequency: 'daily' as const, priority: 1 },
    { url: `${base}/listings`, lastModified: now, changeFrequency: 'daily' as const, priority: 0.9 },
    { url: `${base}/categories`, lastModified: now, changeFrequency: 'weekly' as const, priority: 0.8 },
    { url: `${base}/add-listing`, lastModified: now, changeFrequency: 'monthly' as const, priority: 0.5 },
    { url: `${base}/privacy`, lastModified: now, changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${base}/terms`, lastModified: now, changeFrequency: 'yearly' as const, priority: 0.3 },
    { url: `${base}/cookies`, lastModified: now, changeFrequency: 'yearly' as const, priority: 0.3 },
  ] as const;

  const categoryRoutes = categories.map(c => ({
    url: `${base}/categories/${c.slug}`,
    lastModified: now,
    changeFrequency: 'daily' as const,
    priority: 0.7,
  }));

  const listingRoutes = listings
    .filter(l => l.updatedAt && l.updatedAt.trim() && !isNaN(new Date(l.updatedAt).getTime()))
    .map(l => ({
      url: `${base}/listings/${l.slug}`,
      lastModified: new Date(l.updatedAt),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }));

  return [...staticRoutes, ...categoryRoutes, ...listingRoutes];
}