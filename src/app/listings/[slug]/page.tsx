import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getListing } from '@/lib/listings';
import { siteConfig } from '@/lib/config';
import { AdSense } from '@/components/ads/AdSense';

interface ListingPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const { listings } = await import('@/lib/listings');
  return listings.map(l => ({ slug: l.slug }));
}

export default async function ListingPage({ params }: ListingPageProps) {
  const { slug } = await params;
  const listing = getListing(slug);
  if (!listing) notFound();

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: listing.title,
    description: listing.description,
    url: `${siteConfig.url}/listings/${listing.slug}`,
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Cloud',
    offers: {
      '@type': 'Offer',
      price: listing.startingPrice || 0,
      priceCurrency: listing.currency || 'USD',
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      {/* Header/Breadcrumb */}
      <header className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-4 py-6">
          <nav className="flex items-center gap-2 text-sm text-gray-500 mb-4" aria-label="Breadcrumb">
            <Link href="/" className="hover:text-primary-600">Home</Link>
            <span>/</span>
            <Link href="/listings" className="hover:text-primary-600">Tools</Link>
            <span>/</span>
            <Link href={`/categories/${listing.categoryId}`} className="hover:text-primary-600">{listing.categoryName}</Link>
            <span>/</span>
            <span className="text-gray-900 font-medium" aria-current="page">{listing.title}</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary-50 text-primary-700">
                  {listing.categoryIcon} {listing.categoryName}
                </span>
                {listing.verified && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-700">
                    Verified
                  </span>
                )}
                {listing.featured && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-50 text-amber-700">
                    Featured
                  </span>
                )}
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-3">{listing.title}</h1>
              <p className="text-lg text-gray-600 max-w-2xl mb-4">{listing.shortDescription}</p>
              {listing.website && (
                <Link
                  href={listing.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  Visit Website
                </Link>
              )}
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Overview */}
            <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-gray-900 mb-4">Overview</h2>
              <div className="prose prose-gray max-w-none text-gray-700 leading-relaxed">
                <p>{listing.description}</p>
              </div>
            </section>

            {/* Key Features */}
            {listing.keyFeatures && listing.keyFeatures.length > 0 && (
              <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Key Features</h2>
                <ul className="grid sm:grid-cols-2 gap-3">
                  {listing.keyFeatures.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-gray-700">
                      <svg className="w-5 h-5 text-primary-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                      {feature}
                    </li>
                  ))}
                </ul>
              </section>
            )}

            {/* Integrations */}
            {listing.integrations && listing.integrations.length > 0 && (
              <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Integrations</h2>
                <div className="flex flex-wrap gap-2">
                  {listing.integrations.map((integration, i) => (
                    <span key={i} className="px-3 py-1 bg-gray-50 text-gray-700 text-sm rounded-lg border border-gray-100">
                      {integration}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Platforms */}
            {listing.platforms && listing.platforms.length > 0 && (
              <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Platforms</h2>
                <div className="flex flex-wrap gap-2">
                  {listing.platforms.map((platform, i) => (
                    <span key={i} className="px-3 py-1 bg-blue-50 text-blue-700 text-sm rounded-lg border border-blue-100">
                      {platform}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* Best For */}
            {listing.targetUsers && listing.targetUsers.length > 0 && (
              <section className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Best For</h2>
                <div className="flex flex-wrap gap-2">
                  {listing.targetUsers.map((user, i) => (
                    <span key={i} className="px-3 py-1 bg-purple-50 text-purple-700 text-sm rounded-lg border border-purple-100">
                      {user}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {/* In-article Ad */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 sm:p-8" aria-label="Advertisement">
              <AdSense slotKey="inArticle" />
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-24 space-y-6">
              {/* Quick Facts Card */}
              <div className="bg-white rounded-xl border border-gray-200 p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Quick Facts</h3>
                <dl className="space-y-4 text-sm">
                  {listing.pricing && (
                    <div>
                      <dt className="text-gray-400 mb-1">Pricing</dt>
                      <dd className="text-gray-900 font-medium">{listing.pricing}</dd>
                    </div>
                  )}
                  {listing.pricingType && (
                    <div>
                      <dt className="text-gray-400 mb-1">Model</dt>
                      <dd className="text-gray-900 font-medium">{listing.pricingType}</dd>
                    </div>
                  )}
                  {listing.startingPrice > 0 && (
                    <div>
                      <dt className="text-gray-400 mb-1">Starting Price</dt>
                      <dd className="text-gray-900 font-medium">${listing.startingPrice}/{listing.currency || 'USD'}</dd>
                    </div>
                  )}
                  <div>
                    <dt className="text-gray-400 mb-1">Category</dt>
                    <dd className="text-gray-900 font-medium">{listing.categoryIcon} {listing.categoryName}</dd>
                  </div>
                </dl>
              </div>

              {/* Tags */}
              {listing.tags && listing.tags.length > 0 && (
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {listing.tags.map((tag, i) => (
                      <Link
                        key={i}
                        href={`/listings?search=${tag}`}
                        className="px-3 py-1 bg-gray-50 text-gray-600 text-sm rounded-lg border border-gray-100 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                      >
                        {tag}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* Contact Info */}
              {(listing.email || listing.phone || listing.address) && (
                <div className="bg-white rounded-xl border border-gray-200 p-6">
                  <h3 className="font-semibold text-gray-900 mb-4">Contact</h3>
                  <dl className="space-y-3 text-sm text-gray-600">
                    {listing.website && (
                      <div className="flex items-center gap-2">
                        <dt className="text-gray-400 w-10 shrink-0">Web</dt>
                        <dd><a href={listing.website} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline truncate block">{listing.website}</a></dd>
                      </div>
                    )}
                    {listing.email && (
                      <div className="flex items-center gap-2">
                        <dt className="text-gray-400 w-10 shrink-0">Email</dt>
                        <dd><a href={`mailto:${listing.email}`} className="text-primary-600 hover:underline">{listing.email}</a></dd>
                      </div>
                    )}
                    {listing.phone && (
                      <div className="flex items-center gap-2">
                        <dt className="text-gray-400 w-10 shrink-0">Phone</dt>
                        <dd><a href={`tel:${listing.phone.replace(/\D/g, '')}`} className="text-primary-600 hover:underline">{listing.phone}</a></dd>
                      </div>
                    )}
                    {listing.address && (
                      <div className="flex items-start gap-2">
                        <dt className="text-gray-400 w-10 shrink-0 mt-1">Addr</dt>
                        <dd className="text-gray-600">{listing.address}, {listing.city}, {listing.state}</dd>
                      </div>
                    )}
                  </dl>
                </div>
              )}

              {/* Sidebar Ad */}
              <div className="bg-white rounded-xl border border-gray-200 p-6" aria-label="Advertisement">
                <AdSense slotKey="sidebar" />
              </div>
            </div>
          </aside>
        </div>

        {/* Related Tools */}
        {(() => {
          const relatedListings = getListings({ category: listing.categoryId })
            .filter(l => l.slug !== listing.slug)
            .slice(0, 3);
          
          if (relatedListings.length === 0) return null;

          return (
            <section className="mt-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Tools</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedListings.map((related) => (
                  <Link
                    key={related.id}
                    href={`/listings/${related.slug}`}
                    className="bg-white rounded-xl border border-gray-200 p-6 hover:border-primary-300 hover:shadow-lg transition-all group"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-xl">{related.categoryIcon}</span>
                      <span className="font-medium text-gray-700">{related.categoryName}</span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary-600 transition-colors mb-2">
                      {related.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">{related.shortDescription}</p>
                    <div className="flex flex-wrap gap-1.5 mt-4 pt-4 border-t border-gray-100">
                      {related.tags.slice(0, 3).map((tag: string, i: number) => (
                        <span key={i} className="px-2 py-0.5 bg-gray-50 text-gray-600 text-xs rounded-full border border-gray-100">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          );
        })()}
      </main>
    </div>
  );
}

function getListings(filters?: { category?: string; featured?: boolean; search?: string }) {
  const { listings } = require('@/lib/listings');
  let result = [...listings];
  if (filters?.category) result = result.filter(l => l.categoryId === filters.category);
  if (filters?.featured) result = result.filter(l => l.featured);
  if (filters?.search) {
    const q = filters.search.toLowerCase();
    result = result.filter(l => l.title.toLowerCase().includes(q) || l.shortDescription.toLowerCase().includes(q));
  }
  return result.sort((a, b) => (b.featured === a.featured ? 0 : b.featured ? 1 : -1));
}