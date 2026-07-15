import * as fs from 'fs';
import * as path from 'path';

interface Listing {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  categoryId: string;
  categoryName: string;
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
  rating: number;
  reviewCount: number;
  reviewSource?: string;
  reviewUrl?: string;
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

const LOCAL_DATA_PATH = path.join(process.cwd(), 'data/tools.json');

function slugify(text: string): string {
  return text.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

async function main() {
  console.log('Loading local data file...');
  
  if (!fs.existsSync(LOCAL_DATA_PATH)) {
    throw new Error(`Local data file not found: ${LOCAL_DATA_PATH}`);
  }

  const rawData = fs.readFileSync(LOCAL_DATA_PATH, 'utf-8');
  const data = JSON.parse(rawData);
  const tools = data.tools as Listing[];
  
  console.log(`Found ${tools.length} tools in local data`);

  // Validate required fields
  for (const tool of tools) {
    if (!tool.title || !tool.categoryId || !tool.slug) {
      console.warn(`Warning: Tool missing required fields: ${JSON.stringify(tool)}`);
    }
  }

  // Ensure slug is properly formatted
  const listings = tools.map((tool, index) => ({
    ...tool,
    id: String(index + 1),
    slug: tool.slug || slugify(tool.title),
  }));

  const output = `import { Listing } from '@/types';

export const listings: Listing[] = ${JSON.stringify(listings, null, 2)};

`;

  const outputPath = path.join(process.cwd(), 'src/lib/listings.ts');
  fs.writeFileSync(outputPath, output);
  console.log(`Generated ${outputPath} with ${listings.length} listings`);

  // Also generate helper functions
  const helpers = `
export function getListings(filters?: { category?: string; featured?: boolean; search?: string }): Listing[] {
  let result = [...listings];
  if (filters?.category) result = result.filter(l => l.categoryId === filters.category);
  if (filters?.featured) result = result.filter(l => l.featured);
  if (filters?.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(l => l.title.toLowerCase().includes(q) || l.shortDescription.toLowerCase().includes(q));
  }
  return result.sort((a, b) => (b.featured === a.featured ? 0 : b.featured ? 1 : -1) || b.rating - a.rating);
}

export function getListing(slug: string): Listing | undefined {
  return listings.find(l => l.slug === slug);
}

export function getCategoryListings(categorySlug: string): Listing[] {
  return getListings({ category: categorySlug });
}
`;

  fs.appendFileSync(outputPath, helpers);
  console.log('Added helper functions');

  // Generate categories from JSON (use icons defined in data/tools.json)
  const categories = data.categories.map((cat: any, idx: number) => ({
    id: String(idx + 1),
    name: cat.name,
    slug: cat.id,
    description: cat.description,
    icon: cat.icon,
    count: cat.toolCount,
  }));

  const catOutput = `import { Category } from '@/types';\n\nexport const categories: Category[] = ${JSON.stringify(categories, null, 2)};\n`;
  fs.writeFileSync(path.join(process.cwd(), 'src/lib/categories.ts'), catOutput);
  console.log(`Generated categories.ts with ${categories.length} categories`);
}

main().catch(console.error);