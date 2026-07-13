import { Metadata } from 'next';
import { categories } from '@/lib/config';
import { getListings } from '@/lib/listings';
import { SearchFilters } from '@/components/ui/SearchFilters';
import { ListingCard } from '@/components/ui/ListingCard';
import { AdSense } from '@/components/ads/AdSense';

interface ListingsPageProps {
  searchParams: Promise<{ category?: string; q?: string; featured?: string; page?: string }>;
}

export const metadata: Metadata = { title: 'All Listings', description: 'Browse all local business listings.' };

export default async function ListingsPage({ searchParams }: ListingsPageProps) {
  const params = await searchParams;
  const category = params.category;
  const search = params.q;
  const featured = params.featured === 'true';
  const page = parseInt(params.page || '1', 10);

  const allListings = getListings({ category, search, featured });
  const perPage = 12;
  const totalPages = Math.ceil(allListings.length / perPage);
  const paginated = allListings.slice((page - 1) * perPage, page * perPage);

  return (
    <div className="py-12 min-h-screen">
      <div className="container mx-auto px-4">
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            {category ? categories.find(c => c.id === category)?.name + ' Listings' : 'All Listings'}
            {search && <span className="text-primary-600 font-normal"> for "{search}"</span>}
          </h1>
          <p className="text-gray-600">{allListings.length} {allListings.length === 1 ? 'result' : 'results'}</p>
        </header>

        <SearchFilters
          initialCategory={category}
          initialSearch={search}
        />

        <div className="mt-8 space-y-4">
          {paginated.map((listing, i) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
          {paginated.length === 0 && (
            <div className="text-center py-12 text-gray-500">No listings found. Try adjusting your search.</div>
          )}
        </div>

        {/* In-feed ads every 4 listings */}
        <AdSense slotKey="inFeed" className="my-8" />

        {/* Pagination */}
        {totalPages > 1 && (
          <nav className="mt-10 flex items-center justify-center gap-2" aria-label="Pagination">
            {page > 1 && (
              <a href={`/listings?${new URLSearchParams({ ...params, page: String(page - 1) })}`} className="btn-secondary">Previous</a>
            )}
            <span className="px-4 text-sm text-gray-600">Page {page} of {totalPages}</span>
            {page < totalPages && (
              <a href={`/listings?${new URLSearchParams({ ...params, page: String(page + 1) })}`} className="btn-primary">Next</a>
            )}
          </nav>
        )}
      </div>
    </div>
  );
}