import Link from 'next/link';
import { siteConfig } from '@/lib/config';

export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-100">
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between" aria-label="Main navigation">
        <Link href="/" className="text-xl font-bold text-gray-900 hover:text-primary-600 transition" aria-label={siteConfig.name}>
          {siteConfig.name}
        </Link>
        <div className="hidden md:flex items-center gap-6">
          <Link href="/categories" className="text-gray-600 hover:text-primary-600 transition font-medium">Categories</Link>
          <Link href="/listings" className="text-gray-600 hover:text-primary-600 transition font-medium">All Listings</Link>
          <Link href="/add-listing" className="px-4 py-2 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition">Add Listing</Link>
        </div>
      </nav>
    </header>
  );
}