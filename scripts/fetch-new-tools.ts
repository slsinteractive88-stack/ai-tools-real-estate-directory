import * as fs from 'fs';
import * as path from 'path';

interface Tool {
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
  categoryIcon?: string;
}

interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  icon: string;
  count?: number;
}

interface ToolsData {
  tools: Tool[];
  categories: Category[];
}

const LOCAL_DATA_PATH = path.join(process.cwd(), 'data/tools.json');
const WEB_SEARCH_RESULTS_PATH = path.join(process.cwd(), 'data/web-search-results.json');

// Known real estate AI tool sources to search
const SOURCE_QUERIES = [
  'AI real estate tools',
  'real estate AI software',
  'proptech AI tools',
  'real estate virtual staging AI',
  'real estate lead generation AI',
  'real estate CRM AI',
  'property valuation AI',
  'real estate marketing AI',
];

// Category mapping for discovered tools
interface CategoryInfo {
  categoryId: string;
  categoryName: string;
  categoryIcon: string;
}

const CATEGORY_MAP: Record<string, CategoryInfo> = {
  'virtual staging': { categoryId: 'listing-marketing', categoryName: 'Listing Marketing', categoryIcon: '🏠' },
  'virtual-staging': { categoryId: 'listing-marketing', categoryName: 'Listing Marketing', categoryIcon: '🏠' },
  'photo analysis': { categoryId: 'listing-marketing', categoryName: 'Listing Marketing', categoryIcon: '🏠' },
  'lead generation': { categoryId: 'lead-generation', categoryName: 'Lead Generation', categoryIcon: '🎯' },
  'lead-gen': { categoryId: 'lead-generation', categoryName: 'Lead Generation', categoryIcon: '🎯' },
  'crm': { categoryId: 'client-management', categoryName: 'Client Management', categoryIcon: '🤝' },
  'client management': { categoryId: 'client-management', categoryName: 'Client Management', categoryIcon: '🤝' },
  'market analysis': { categoryId: 'market-analysis', categoryName: 'Market Analysis', categoryIcon: '📊' },
  'valuation': { categoryId: 'market-analysis', categoryName: 'Market Analysis', categoryIcon: '📊' },
  'productivity': { categoryId: 'productivity-automation', categoryName: 'Productivity & Automation', categoryIcon: '⚡' },
  'automation': { categoryId: 'productivity-automation', categoryName: 'Productivity & Automation', categoryIcon: '⚡' },
  'transaction': { categoryId: 'transaction-management', categoryName: 'Transaction Management', categoryIcon: '📋' },
  'investment': { categoryId: 'investment-analysis', categoryName: 'Investment Analysis', categoryIcon: '💰' },
  'design': { categoryId: 'design-staging', categoryName: 'Design & Staging', categoryIcon: '🎨' },
  'marketing': { categoryId: 'marketing-content', categoryName: 'Marketing & Content', categoryIcon: '📝' },
};

function slugify(text: string): string {
  return text.toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function loadLocalData(): ToolsData {
  if (!fs.existsSync(LOCAL_DATA_PATH)) {
    throw new Error(`Local data file not found: ${LOCAL_DATA_PATH}`);
  }
  const raw = fs.readFileSync(LOCAL_DATA_PATH, 'utf-8');
  return JSON.parse(raw);
}

function loadWebSearchResults(): Partial<Tool>[] {
  if (!fs.existsSync(WEB_SEARCH_RESULTS_PATH)) {
    return [];
  }
  const raw = fs.readFileSync(WEB_SEARCH_RESULTS_PATH, 'utf-8');
  return JSON.parse(raw);
}

function saveLocalData(data: ToolsData): void {
  const output = JSON.stringify(data, null, 2);
  fs.writeFileSync(LOCAL_DATA_PATH, output);
  console.log(`Saved updated tools.json with ${data.tools.length} tools`);
}

function categorizeTool(title: string, description: string): { categoryId: string; categoryName: string; categoryIcon: string } {
  const text = `${title} ${description}`.toLowerCase();

  for (const [keyword, cat] of Object.entries(CATEGORY_MAP)) {
    if (text.includes(keyword)) {
      return cat;
    }
  }

  // Default fallback
  return { categoryId: 'productivity-automation', categoryName: 'Productivity & Automation', categoryIcon: '⚡' };
}

// Placeholder for API integrations - to be implemented with actual API keys
async function fetchFromG2(): Promise<Partial<Tool>[]> {
  // G2 API requires partnership/approval
  console.log('G2 API: Not configured (requires partnership)');
  return [];
}

async function fetchFromCapterra(): Promise<Partial<Tool>[]> {
  // Capterra doesn't have a public API
  console.log('Capterra: No public API available');
  return [];
}

async function fetchFromProductHunt(): Promise<Partial<Tool>[]> {
  // Product Hunt API v2 requires token
  console.log('Product Hunt API: Not configured (requires token)');
  return [];
}

// Main function to discover and add new tools
async function discoverNewTools(): Promise<number> {
  console.log('=== Discovering New Real Estate AI Tools ===\n');

  const localData = loadLocalData();
  const existingSlugs = new Set(localData.tools.map(t => t.slug));
  const existingTitles = new Set(localData.tools.map(t => t.title.toLowerCase()));

  console.log(`Current local tools: ${localData.tools.length}`);

  // Collect candidates from all sources
  const allCandidates: Partial<Tool>[] = [];

  const g2Tools = await fetchFromG2();
  allCandidates.push(...g2Tools);

  const capterraTools = await fetchFromCapterra();
  allCandidates.push(...capterraTools);

  const phTools = await fetchFromProductHunt();
  allCandidates.push(...phTools);

  // Load web search results from file (populated by cron agent via web_search)
  const webSearchTools = loadWebSearchResults();
  allCandidates.push(...webSearchTools);

  console.log(`Total candidates from APIs + web search: ${allCandidates.length}`);

  // For now, also include a curated list of known tools not yet in database
  // This can be replaced with actual API results when configured
  const curatedNewTools = getCuratedNewTools();
  allCandidates.push(...curatedNewTools);

  let addedCount = 0;

  for (const candidate of allCandidates) {
    if (!candidate.title || !candidate.website) continue;

    const slug = candidate.slug || slugify(candidate.title);
    const titleLower = candidate.title.toLowerCase();

    // Skip if already exists (by slug or title)
    if (existingSlugs.has(slug) || existingTitles.has(titleLower)) {
      console.log(`  ↪ Already exists: ${candidate.title}`);
      continue;
    }

    // Determine category
    const category = categorizeTool(candidate.title, candidate.description || candidate.shortDescription || '');

    // Build new tool entry
    const newTool: Tool = {
      id: String(localData.tools.length + addedCount + 1),
      title: candidate.title,
      slug,
      description: candidate.description || candidate.shortDescription || `AI-powered ${category.categoryName.toLowerCase()} tool for real estate professionals.`,
      shortDescription: candidate.shortDescription || candidate.description?.slice(0, 160) || `AI tool for ${category.categoryName.toLowerCase()}.`,
      categoryId: category.categoryId,
      categoryName: category.categoryName,
      website: candidate.website,
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      country: 'US',
      logo: candidate.logo || '',
      images: candidate.images || [],
      featured: false,
      verified: false,
      tags: candidate.tags || [category.categoryId.replace('-', ' ')],
      keyFeatures: candidate.keyFeatures || ['AI-powered', 'Real estate focused'],
      integrations: candidate.integrations || [],
      platforms: candidate.platforms || ['Web'],
      targetUsers: candidate.targetUsers || ['Solo agents', 'Teams'],
      pricing: candidate.pricing || 'Contact for pricing',
      pricingType: candidate.pricingType || 'Contact',
      startingPrice: candidate.startingPrice || 0,
      currency: 'USD',
      affiliateLink: '',
      createdAt: new Date().toISOString().split('T')[0],
      updatedAt: new Date().toISOString().split('T')[0],
      categoryIcon: category.categoryIcon,
    };

    localData.tools.push(newTool);
    existingSlugs.add(slug);
    existingTitles.add(titleLower);
    addedCount++;

    console.log(`  ✅ Added: ${candidate.title} (${category.categoryName})`);
  }

  if (addedCount > 0) {
    // Rebuild categories with updated counts
    localData.categories = localData.categories.map(cat => ({
      ...cat,
      count: localData.tools.filter(t => t.categoryId === cat.id).length,
    }));

    saveLocalData(localData);
    console.log(`\n✅ Added ${addedCount} new tools to tools.json`);
  } else {
    console.log('\n✅ No new tools to add');
  }

  return addedCount;
}

// Curated list of known real estate AI tools (replace with API results when configured)
function getCuratedNewTools(): Partial<Tool>[] {
  return [
    {
      title: 'Epique AI',
      slug: 'epique-ai',
      website: 'https://epique.ai',
      description: 'AI content platform for real estate agents. Generates listing descriptions, social media posts, email campaigns, and market reports.',
      shortDescription: 'AI content generation: listings, social, emails, reports.',
      tags: ['content-generation', 'listing-descriptions', 'social-media', 'email-marketing'],
      keyFeatures: ['Listing descriptions', 'Social posts', 'Email campaigns', 'Market reports'],
      integrations: ['Zapier', 'Make'],
      platforms: ['Web'],
      targetUsers: ['Solo agents', 'Teams'],
      pricing: 'From $29/mo',
      pricingType: 'Subscription',
      startingPrice: 29,
      logo: 'https://epique.ai/logo.png',
    },
    {
      title: 'RealtyNinja',
      slug: 'realtyninja',
      website: 'https://realtyninja.com',
      description: 'AI-powered real estate website builder with automated listing import, IDX integration, and lead capture tools.',
      shortDescription: 'AI website builder with IDX and lead capture.',
      tags: ['website-builder', 'idx', 'lead-capture', 'automation'],
      keyFeatures: ['Auto listing import', 'IDX integration', 'Lead capture', 'Mobile responsive'],
      integrations: ['MLS', 'CRM'],
      platforms: ['Web'],
      targetUsers: ['Solo agents', 'Teams', 'Brokerages'],
      pricing: 'From $50/mo',
      pricingType: 'Subscription',
      startingPrice: 50,
      logo: 'https://realtyninja.com/logo.png',
    },
    {
      title: 'Roof AI',
      slug: 'roof-ai',
      website: 'https://roof.ai',
      description: 'Conversational AI platform for real estate. Automates lead engagement, qualification, and routing through chat, SMS, and email.',
      shortDescription: 'Conversational AI for lead engagement and qualification.',
      tags: ['conversational-ai', 'lead-qualification', 'chatbot', 'automation'],
      keyFeatures: ['24/7 chat', 'Lead qualification', 'CRM routing', 'Multi-channel'],
      integrations: ['Follow Up Boss', 'BoomTown', 'kvCORE', 'Salesforce'],
      platforms: ['Web', 'Mobile App'],
      targetUsers: ['Teams', 'Brokerages'],
      pricing: 'Contact for pricing',
      pricingType: 'Contact',
      startingPrice: 0,
      logo: 'https://roof.ai/logo.png',
    },
    {
      title: 'Styldod',
      slug: 'styldod',
      website: 'https://styldod.com',
      description: 'AI-powered virtual staging and photo enhancement for real estate. Transforms empty rooms into beautifully staged spaces.',
      shortDescription: 'Virtual staging and photo enhancement. $5/image.',
      tags: ['virtual-staging', 'photo-enhancement', 'listing-photos', 'ai-images'],
      keyFeatures: ['Virtual staging', 'Photo enhancement', 'Object removal', 'Sky replacement'],
      integrations: ['MLS', 'Zillow', 'Realtor.com'],
      platforms: ['Web', 'API'],
      targetUsers: ['Solo agents', 'Teams', 'Photographers'],
      pricing: 'From $5/image',
      pricingType: 'Pay per use',
      startingPrice: 5,
      logo: 'https://styldod.com/logo.png',
    },
    {
      title: 'Offrs',
      slug: 'offrs',
      website: 'https://offrs.com',
      description: 'Predictive analytics platform that identifies homeowners likely to sell before they list. Uses AI to score property turnover probability.',
      shortDescription: 'Predictive analytics: find sellers before they list.',
      tags: ['predictive-analytics', 'seller-leads', 'property-data', 'lead-gen'],
      keyFeatures: ['Seller prediction', 'Property scoring', 'Lead prioritization', 'Market timing'],
      integrations: ['CRM', 'Marketing platforms'],
      platforms: ['Web'],
      targetUsers: ['Teams', 'Brokerages', 'Investors'],
      pricing: 'From $200/mo',
      pricingType: 'Subscription',
      startingPrice: 200,
      logo: 'https://offrs.com/logo.png',
    },
    {
      title: 'LocalizeOS',
      slug: 'localizeos',
      website: 'https://localizeos.com',
      description: 'AI-powered buyer engagement platform. Automates personalized communication, schedules showings, and provides market insights.',
      shortDescription: 'AI buyer engagement: communication, showings, insights.',
      tags: ['buyer-engagement', 'automation', 'showings', 'communication'],
      keyFeatures: ['Auto communication', 'Showing scheduling', 'Market insights', 'Behavior tracking'],
      integrations: ['MLS', 'CRM', 'Calendar'],
      platforms: ['Web', 'Mobile App'],
      targetUsers: ['Solo agents', 'Teams'],
      pricing: 'From $49/mo',
      pricingType: 'Subscription',
      startingPrice: 49,
      logo: 'https://localizeos.com/logo.png',
    },
  ];
}

// CLI entry point
async function main() {
  try {
    const added = await discoverNewTools();
    process.exit(added > 0 ? 0 : 0); // Always exit 0, just report count
  } catch (error) {
    console.error('Error discovering new tools:', error);
    process.exit(1);
  }
}

main();