import { Metadata } from 'next';
import { Suspense } from 'react';
import { categories } from '@/lib/categories';
import { getListings } from '@/lib/listings';
import { SearchFilters } from '@/components/ui/SearchFilters';
import { ListingCard } from '@/components/ui/ListingCard';
import { AdSense } from '@/components/ads/AdSense';

export const metadata: Metadata = { title: 'All Tools', description: 'Browse all AI tools for real estate agents.' };

function SearchFiltersWrapper() {
  return <SearchFilters />;
}

export default function ListingsPage() {
  const allListings = getListings({});
  const perPage = 12;
  const totalPages = Math.ceil(allListings.length / perPage);

  return (
    <div className="py-12 min-h-screen">
      <div className="container mx-auto px-4">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Tools</h1>
          <p className="text-gray-600">{allListings.length} {allListings.length === 1 ? 'tool' : 'tools'}</p>
        </header>

        <Suspense fallback={<div className="animate-pulse h-20 w-full" />}>
          <SearchFiltersWrapper />
        </Suspense>

        <div className="mt-8 space-y-4">
          {allListings.map((listing, i) => (
            <>
              {/* In-feed ad every 4 listings */}
              {i > 0 && i % 4 === 0 && (
                <div key={`ad-feed-${i}`} className="my-6">
                  <AdSense slotKey="inFeed" />
                </div>
              )}
              <ListingCard key={listing.id} listing={listing} />
            </>
          ))}
          {allListings.length === 0 && (
            <div className="text-center py-12 text-gray-500">No tools found. Try adjusting your search.</div>
          )}
        </div>

        {/* Bottom in-feed ad */}
        <div className="my-8">
          <AdSense slotKey="inFeed" />
        </div>

        {/* Pagination - client side only for static export */}
        {totalPages > 1 && (
          <nav className="mt-10 flex items-center justify-center gap-2" aria-label="Pagination">
            <button className="btn-secondary" disabled>Previous</button>
            <span className="px-4 text-sm text-gray-600">Page 1 of {totalPages}</span>
            <button className="btn-primary" disabled>Next</button>
          </nav>
        )}
      </div>
    </div>
  );
}