import fs from 'fs';
import path from 'path';
import { Listing } from '../src/types';

const GOOGLE_SHEET_CSV_URL = 'https://docs.google.com/spreadsheets/d/1cooHbpTQGD_p9bMWQujyxfzZRYnEfTIRHTPtIvV9crI/gviz/tq?gid=0&tqx=out:csv';

interface RawRow {
  Title: string;
  Category: string;
  Description: string;
  ShortDescription: string;
  Website: string;
  Pricing: string;
  PricingType: string;
  StartingPrice: string;
  Currency: string;
  Tags: string;
  KeyFeatures: string;
  Integrations: string;
  Platform: string;
  TargetUser: string;
  LogoURL: string;
  ScreenshotURLs: string;
  Featured: string;
  Verified: string;
  Rating: string;
  ReviewCount: string;
  AffiliateLink: string;
  DateAdded: string;
  LastUpdated: string;
}

const categorySlugMap: Record<string, string> = {
  'Listing Marketing': 'listing-marketing',
  'Lead Generation': 'lead-generation',
  'Market Analysis': 'market-analysis',
  'Client Management': 'client-management',
  'Productivity & Automation': 'productivity-automation',
  'Social Media & Content': 'social-media-content',
  'Virtual Tours & Staging': 'virtual-tours-staging',
  'Investment & Deal Analysis': 'investment-deal-analysis',
  'Transaction & Compliance': 'transaction-compliance',
};

async function fetchSheetData(): Promise<RawRow[]> {
  const response = await fetch(GOOGLE_SHEET_CSV_URL);
  if (!response.ok) {
    throw new Error(`Failed to fetch sheet: ${response.statusText}`);
  }
  const csvText = await response.text();
  
  const rows = parseCSV(csvText);
  if (rows.length === 0) return [];
  
  const headers = rows[0];
  const dataRows: RawRow[] = [];
  
  for (let i = 1; i < rows.length; i++) {
    const values = rows[i];
    if (values.length < headers.length) continue;
    const row: any = {};
    headers.forEach((h, idx) => row[h] = values[idx] || '');
    if (row.Title && row.Title.trim() && row.Category && row.Category.trim() && row.Title !== '20') {
      dataRows.push(row as RawRow);
    }
  }
  return dataRows;
}

function parseCSV(csvText: string): string[][] {
  const rows: string[][] = [];
  let currentRow: string[] = [];
  let currentField = '';
  let inQuotes = false;
  
  for (let i = 0; i < csvText.length; i++) {
    const char = csvText[i];
    const nextChar = csvText[i + 1];
    
    if (char === '"') {
      if (inQuotes && nextChar === '"') {
        currentField += '"';
        i++;
      } else {
        inQuotes = !inQuotes;
      }
    } else if (char === ',' && !inQuotes) {
      currentRow.push(currentField);
      currentField = '';
    } else if ((char === '\n' || char === '\r') && !inQuotes) {
      if (char === '\r' && nextChar === '\n') {
        i++; // skip \n in \r\n
      }
      currentRow.push(currentField);
      rows.push(currentRow);
      currentRow = [];
      currentField = '';
    } else {
      currentField += char;
    }
  }
  
  // Push last field/row if exists
  if (currentField || currentRow.length > 0) {
    currentRow.push(currentField);
    rows.push(currentRow);
  }
  
  return rows;
}

function slugify(text: string): string {
  return text.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function transformRow(row: RawRow, index: number): Listing {
  const categorySlug = categorySlugMap[row.Category] || slugify(row.Category);
  const tags = row.Tags.split(',').map(t => t.trim()).filter(Boolean);
  const keyFeatures = row.KeyFeatures.split(',').map(f => f.trim()).filter(Boolean);
  const integrations = row.Integrations.split(',').map(i => i.trim()).filter(Boolean);
  const platforms = row.Platform.split(',').map(p => p.trim()).filter(Boolean);
  const targetUsers = row.TargetUser.split(',').map(t => t.trim()).filter(Boolean);
  const screenshots = row.ScreenshotURLs.split(',').map(s => s.trim()).filter(Boolean);
  
  const rating = parseFloat(row.Rating) || 0;
  const reviewCount = row.ReviewCount.includes('+') 
    ? parseInt(row.ReviewCount.replace('+', '')) 
    : parseInt(row.ReviewCount) || 0;
  const featured = row.Featured === 'TRUE';
  const verified = row.Verified === 'TRUE';
  const startingPrice = parseFloat(row.StartingPrice) || 0;
  
  const affiliateLink = row.AffiliateLink || '';
  const website = affiliateLink || row.Website;
  
  return {
    id: String(index + 1),
    title: row.Title.trim(),
    slug: slugify(row.Title),
    description: row.Description.trim(),
    shortDescription: row.ShortDescription.trim(),
    categoryId: categorySlug,
    categoryName: row.Category.trim(),
    website,
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    country: 'US',
    logo: row.LogoURL || '',
    images: screenshots,
    featured,
    verified,
    rating,
    reviewCount,
    tags,
    keyFeatures,
    integrations,
    platforms,
    targetUsers,
    pricing: row.Pricing.trim(),
    pricingType: row.PricingType.trim(),
    startingPrice,
    currency: row.Currency.trim(),
    affiliateLink: affiliateLink || undefined,
    createdAt: row.DateAdded.trim(),
    updatedAt: row.LastUpdated.trim(),
  };
}

async function main() {
  console.log('Fetching Google Sheet data...');
  const rows = await fetchSheetData();
  console.log(`Found ${rows.length} tools`);
  
  const listings = rows.map((row, i) => transformRow(row, i));
  
  const output = `import { Listing } from '@/types';\n\nexport const listings: Listing[] = ${JSON.stringify(listings, null, 2)};\n\n`;

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
  
  // Generate categories
  const categories = [...new Set(listings.map(l => l.categoryId))]
    .map((id, idx) => {
      const sample = listings.find(l => l.categoryId === id);
      return {
        id: String(idx + 1),
        name: sample?.categoryName || '',
        slug: id,
        description: `AI tools for ${sample?.categoryName.toLowerCase()}`,
        icon: '🔧',
        count: listings.filter(l => l.categoryId === id).length,
      };
    });
  
  const catOutput = `import { Category } from '@/types';\n\nexport const categories: Category[] = ${JSON.stringify(categories, null, 2)};\n`;
  fs.writeFileSync(path.join(process.cwd(), 'src/lib/categories.ts'), catOutput);
  console.log(`Generated categories.ts with ${categories.length} categories`);
}

main().catch(console.error);