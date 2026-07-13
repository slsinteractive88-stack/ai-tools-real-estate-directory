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

export const metadata: Metadata = { title: 'Discover Local Businesses', description: 'Find the best local businesses and services near you. Restaurants, plumbers, dentists, and more.' };

export default function HomePage() {
  const featuredListings = getListings({ featured: true }).slice(0, 6);
  const recentListings = getListings().slice(0, 8);

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-b from-primary-50 to-white py-16 sm:py-24 lg:py-32">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6 text-balance">
            Discover the Best <span className="text-primary-600">Local Businesses</span> Near You
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-10 max-w-3xl mx-auto">
            From restaurants to plumbers, find trusted local services with real reviews and ratings.
          </p>
          <Suspense fallback={<div className="w-full max-w-4xl mx-auto animate-pulse"><div className="h-14 bg-gray-200 rounded-xl"></div></div>}>
            <SearchFiltersWrapper />
          </Suspense>
        </div>
      </section>

      {/* AdSense Header Banner */}
      <div className="container mx-auto px-4 py-4" aria-label="Advertisement">
        <AdSense slotKey="header" className="max-w-7xl mx-auto" />
      </div>

      {/* Categories */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Popular Categories</h2>
            <Link href="/categories" className="text-primary-600 hover:underline font-medium">View All →</Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map(cat => (
              <Link key={cat.id} href={`/categories/${cat.slug}`} className="card p-6 text-center group hover:border-primary-200">
                <div className="text-4xl mb-3">{cat.icon}</div>
                <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition">{cat.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{cat.count} listings</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Featured Listings</h2>
            <Link href="/listings?featured=true" className="text-primary-600 hover:underline font-medium">View All →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredListings.map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </section>

      {/* AdSense In-Feed */}
      <div className="container mx-auto px-4 py-8" aria-label="Advertisement">
        <AdSense slotKey="inFeed" className="max-w-7xl mx-auto" />
      </div>

      {/* Recent Listings */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Recently Added</h2>
            <Link href="/listings" className="text-primary-600 hover:underline font-medium">View All →</Link>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentListings.map(listing => (
              <ListingCard key={listing.id} listing={listing} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary-600">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Can't Find What You're Looking For?</h2>
          <p className="text-primary-100 mb-8 max-w-2xl mx-auto">Add your business to our directory and reach more customers today. Free basic listings available.</p>
          <Link href="/add-listing" className="inline-block px-8 py-4 bg-white text-primary-600 font-bold rounded-xl hover:bg-primary-50 transition">
            Add Your Business
          </Link>
        </div>
      </section>
    </div>
  );
}