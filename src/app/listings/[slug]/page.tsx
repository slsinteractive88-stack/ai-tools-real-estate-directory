import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getListing } from '@/lib/listings';
import { AdSense } from '@/components/ads/AdSense';
import { siteConfig } from '@/lib/config';

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
    '@type': 'LocalBusiness',
    name: listing.title,
    description: listing.description,
    url: `${siteConfig.url}/listings/${listing.slug}`,
    telephone: listing.phone,
    email: listing.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: listing.address,
      addressLocality: listing.city,
      addressRegion: listing.state,
      addressCountry: listing.country,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: listing.rating,
      reviewCount: listing.reviewCount,
    },
    priceRange: '$$',
  };

  return (
    <div className="min-h-screen py-12">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />

      <div className="container mx-auto px-4">
        <Link href="/listings" className="inline-flex items-center text-sm text-gray-500 hover:text-primary-600 mb-6 gap-1">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7"/></svg>
          Back to Listings
        </Link>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <article>
              <header className="mb-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  <span className="badge bg-primary-50 text-primary-700">{listing.categoryName}</span>
                  {listing.verified && <span className="badge bg-green-50 text-green-700 flex items-center gap-1">Verified</span>}
                  {listing.featured && <span className="badge bg-yellow-50 text-yellow-700">Editor's Pick</span>}
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">{listing.title}</h1>
                <div className="flex flex-wrap items-center gap-4 mt-4 text-gray-600 text-sm">
                  {listing.address && <span className="flex items-center gap-1">📍 {listing.address}, {listing.city}, {listing.state}</span>}
                  {listing.phone && <span className="flex items-center gap-1">📞 {listing.phone}</span>}
                  {listing.email && <span className="flex items-center gap-1">✉️ {listing.email}</span>}
                </div>
              </header>

              <div className="prose prose-gray max-w-none">
                <p className="text-lg text-gray-700 leading-relaxed">{listing.description}</p>
              </div>

              {/* In-article ad */}
              <div className="my-8" aria-label="Advertisement">
                <AdSense slotKey="inArticle" />
              </div>

              <section className="mt-8 pt-8 border-t border-gray-100">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Tags</h2>
                <div className="flex flex-wrap gap-2">
                  {listing.tags.map(tag => (
                    <span key={tag} className="badge bg-gray-50 text-gray-600">{tag}</span>
                  ))}
                </div>
              </section>
            </article>
          </div>

          <aside className="lg:col-span-1 space-y-6">
            <div className="sticky top-24 space-y-6">
              <div className="card p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Contact Information</h3>
                <dl className="space-y-3 text-sm text-gray-600">
                  {listing.website && (
                    <div className="flex items-center gap-2">
                      <dt className="text-gray-400 w-12 shrink-0">Web</dt>
                      <dd><a href={listing.website} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline truncate block">{listing.website}</a></dd>
                    </div>
                  )}
                  {listing.phone && (
                    <div className="flex items-center gap-2">
                      <dt className="text-gray-400 w-12 shrink-0">Phone</dt>
                      <dd><a href={`tel:${listing.phone.replace(/\D/g, '')}`} className="hover:text-primary-600">{listing.phone}</a></dd>
                    </div>
                  )}
                  {listing.email && (
                    <div className="flex items-center gap-2">
                      <dt className="text-gray-400 w-12 shrink-0">Email</dt>
                      <dd><a href={`mailto:${listing.email}`} className="hover:text-primary-600">{listing.email}</a></dd>
                    </div>
                  )}
                  {listing.address && (
                    <div className="flex items-start gap-2">
                      <dt className="text-gray-400 w-12 shrink-0 mt-1">Address</dt>
                      <dd className="text-gray-600">{listing.address}, {listing.city}, {listing.state}</dd>
                    </div>
                  )}
                </dl>
              </div>

              <div className="card p-6 bg-primary-50 border-primary-100">
                <h3 className="font-semibold text-gray-900 mb-2">Rating</h3>
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-3xl font-bold text-gray-900">{listing.rating.toFixed(1)}</span>
                  <svg className="w-6 h-6 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
                  <span className="text-gray-600">Based on {listing.reviewCount} reviews</span>
                </div>
              </div>

              <div aria-label="Advertisement">
                <AdSense slotKey="sidebar" />
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}