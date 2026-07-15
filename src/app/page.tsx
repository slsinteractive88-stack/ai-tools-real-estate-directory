import { Metadata } from 'next';
import { Suspense } from 'react';
import Link from 'next/link';
import { categories } from '@/lib/categories';
import { getListings } from '@/lib/listings';
import { SearchFilters } from '@/components/ui/SearchFilters';
import { ListingCard } from '@/components/ui/ListingCard';
import { AdSense } from '@/components/ads/AdSense';

function SearchFiltersWrapper() {
  return <SearchFilters />;
}

export const metadata: Metadata = {
  title: 'AI Tools for Real Estate Agents',
  description: 'Discover 20+ AI-powered tools for real estate agents. Virtual staging, lead generation, CRM automation, market analysis. Updated monthly.',
};

export default function HomePage() {
  const featuredListings = getListings({ featured: true }).slice(0, 6);
  const recentListings = getListings().slice(0, 8);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-primary-50 to-white py-16 sm:py-24 lg:py-32">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 text-balance">
            AI Tools for <span className="text-primary-600">Real Estate Agents</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
            Discover 20+ AI-powered tools to streamline your real estate business. From virtual staging and lead generation to CRM automation and market analysis.
            <span className="block mt-2 text-sm font-bold text-primary-700">Updated monthly</span>
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/listings" className="px-6 py-3 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition whitespace-nowrap">
              Browse All Tools
            </Link>
          </div>
        </div>
      </section>

      {/* AdSense Header Banner */}
      <div className="container mx-auto px-4 py-4" aria-label="Advertisement">
        <AdSense slotKey="header" className="max-w-7xl mx-auto" />
      </div>

      {/* Categories */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Browse by Category</h2>
            <Link href="/categories" className="text-primary-600 hover:underline font-medium">View All →</Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/categories/${cat.slug}`}
                className="card p-6 text-center group hover:border-primary-200 hover:shadow-lg transition"
              >
                <div className="text-4xl mb-3">{cat.icon}</div>
                <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition">{cat.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{cat.count} tools</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Editor's Picks */}
      <section className="py-10 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Editor's Picks</h2>
            <Link href="/listings?featured=true" className="text-primary-600 hover:underline font-medium">View All →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredListings.map((listing) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </section>

      {/* Bottom Ad */}
      <div className="container mx-auto px-4 py-8" aria-label="Advertisement">
        <AdSense slotKey="inFeed" className="max-w-7xl mx-auto" />
      </div>

      {/* All Tools */}
      <section className="py-10 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">All Tools ({getListings().length})</h2>
            <Link href="/listings" className="text-primary-600 hover:underline font-medium">View All →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {getListings().map((listing, i) => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-10 bg-primary-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Ready to Transform Your Real Estate Business?</h2>
          <p className="text-primary-100 mb-4 max-w-xl mx-auto text-sm">Explore AI tools that save time, generate leads, and close more deals. Free and freemium options available.</p>
          <Link href="/listings" className="inline-block px-6 py-3 bg-white text-primary-600 font-semibold rounded-lg hover:bg-primary-50 transition">
            Explore All Tools
          </Link>
        </div>
      </section>
    </div>
  );
}