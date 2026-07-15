"use client";

import { useSearchParams } from 'next/navigation';
import { useEffect, useState, Suspense } from 'react';
import { categories } from '@/lib/categories';
import { getListings } from '@/lib/listings';
import { ListingCard } from '@/components/ui/ListingCard';
import { AdSense } from '@/components/ads/AdSense';

function ListingsContent() {
  const searchParams = useSearchParams();
  const [listings, setListings] = useState(getListings({}));
  const [filteredListings, setFilteredListings] = useState(getListings({}));
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const category = searchParams.get('category');
    const search = searchParams.get('search');
    const featured = searchParams.get('featured');

    const filtered = getListings({
      category: category || undefined,
      search: search || undefined,
      featured: featured === 'true' ? true : undefined,
    });
    setFilteredListings(filtered);
  }, [searchParams]);

  if (!isClient) {
    return <div className="animate-pulse h-20 w-full" />;
  }

  return (
    <div className="py-12 min-h-screen">
      <div className="container mx-auto px-4">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">All Tools</h1>
          <p className="text-gray-600">{filteredListings.length} {filteredListings.length === 1 ? 'tool' : 'tools'}</p>
        </header>

        <div className="mt-8 space-y-4">
          {filteredListings.map((listing, i) => (
            <>
              {i > 0 && i % 4 === 0 && (
                <div key={`ad-feed-${i}`} className="my-6">
                  <AdSense slotKey="inFeed" />
                </div>
              )}
              <ListingCard key={listing.id} listing={listing} />
            </>
          ))}
          {filteredListings.length === 0 && (
            <div className="text-center py-12 text-gray-500">No tools found. Try adjusting your search.</div>
          )}
        </div>

        <div className="my-8">
          <AdSense slotKey="inFeed" />
        </div>
      </div>
    </div>
  );
}

export default function ListingsPage() {
  return (
    <Suspense fallback={<div className="animate-pulse h-20 w-full" />}>
      <ListingsContent />
    </Suspense>
  );
}