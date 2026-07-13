import Link from 'next/link';
import Image from 'next/image';
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
      {isFeatured && (
        <div className="absolute top-2 right-2 z-10 bg-primary-100 text-primary-800 text-xs font-medium px-2 py-0.5 rounded">
          Featured
        </div>
      )}

      <div className="relative w-full md:w-48 h-48 md:h-auto min-h-[180px] bg-gray-50 flex-shrink-0">
        {listing.logo ? (
          <Image src={listing.logo} alt={listing.title} fill className="object-cover p-4" sizes="192px" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl">
            {listing.categoryName === 'Restaurants' ? '🍽️' : '🏢'}
          </div>
        )}
      </div>

      <div className="flex-1 p-4 md:p-6 flex flex-col justify-between min-w-0">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <span>{listing.categoryName}</span>
            <span>•</span>
            <span>{listing.city}, {listing.state}</span>
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
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">{listing.rating.toFixed(1)}</span>
            <svg className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/></svg>
            <span className="text-sm text-gray-500">({listing.reviewCount})</span>
            {listing.verified && <span className="text-xs text-green-600 font-medium flex items-center gap-1"><svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/></svg>Verified</span>}
          </div>
          <Link href={`/listings/${listing.slug}`} className="w-full sm:w-auto text-center px-4 py-2 bg-primary-600 text-white text-sm font-medium rounded-lg hover:bg-primary-700 transition">
            View Details
          </Link>
        </div>
      </div>
    </article>
  );
}