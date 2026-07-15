import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { categories } from '@/lib/categories';
import { getCategoryListings } from '@/lib/listings';
import { ListingCard } from '@/components/ui/ListingCard';
import { AdSense } from '@/components/ads/AdSense';

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return categories.map(c => ({ slug: c.slug }));
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = categories.find(c => c.slug === slug);
  if (!category) notFound();

  const listings = getCategoryListings(category.id);

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{category.icon}</span>
            <h1 className="text-3xl font-bold text-gray-900">{category.name}</h1>
          </div>
          <p className="text-gray-600">{category.description} • {listings.length} listings</p>
        </header>

        <div className="space-y-4">
          {listings.map((listing, i) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
          {listings.length === 0 && <div className="text-center py-12 text-gray-500">No listings in this category yet.</div>}
        </div>

        <AdSense slotKey="inFeed" className="my-8" />
      </div>
    </div>
  );
}