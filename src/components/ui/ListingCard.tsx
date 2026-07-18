import Link from 'next/link';
import { Listing } from '@/types';

interface ListingCardProps {
  listing: Listing;
  variant?: 'default' | 'featured' | 'compact';
  showAdLabel?: boolean;
}

export function ListingCard({ listing, variant = 'default', showAdLabel = false }: ListingCardProps) {
  const isFeatured = variant === 'featured' || listing.featured;
  const base = 'group relative bg-white rounded-xl border border-gray-100 overflow-hidden transition-shadow hover:shadow-lg';
  const variants = {
    default: 'flex flex-col md:flex-row',
    featured: 'flex flex-col md:flex-row border-primary-200 shadow-lg',
    compact: 'flex flex-col',
  };

  return (
    <article className={`${base} ${variants[variant]}`}>
      {showAdLabel && (
        <div className="absolute top-2 left-2 z-10 bg-yellow-100 text-yellow-800 text-xs font-medium px-2 py-0.5 rounded">
          Ad
        </div>
      )}

      <div className="flex-1 p-4 md:p-6 flex flex-col justify-between min-w-0">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                      <span>{listing.categoryIcon} {listing.categoryName}</span>
                      {(listing.city || listing.state) && (
                        <span>{[listing.city, listing.state].filter(Boolean).join(', ')}</span>
                      )}
                    </div>
          <Link href={`/listings/${listing.slug}`} className="block">
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 group-hover:text-primary-600 transition mb-2 line-clamp-1">
              {listing.title}
            </h3>
          </Link>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">{listing.shortDescription}</p>
          <div className="flex flex-wrap gap-1.5 mb-3">
            {listing.tags.slice(0, 4).map(tag => (
              <span key={tag} className="px-2 py-0.5 bg-gray-50 text-gray-600 text-xs rounded-full border border-gray-100">
                {tag}
              </span>
            ))}
            {listing.tags.length > 4 && <span className="px-2 py-0.5 bg-gray-50 text-gray-400 text-xs rounded-full">+{listing.tags.length - 4}</span>}
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-4 border-t border-gray-100 mt-4">
          <Link href={`/listings/${listing.slug}`} className="w-full sm:w-auto text-center px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition">
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}