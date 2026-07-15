import { Metadata } from 'next';
import Link from 'next/link';
import { categories } from '@/lib/categories';

export const metadata: Metadata = { title: 'Categories', description: 'Browse all business categories.' };

export default function CategoriesPage() {
  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">All Categories</h1>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {categories.map(cat => (
            <Link key={cat.id} href={`/categories/${cat.slug}`} className="card p-6 group hover:border-primary-200 hover:shadow-lg transition">
              <div className="flex items-start gap-4">
                <div className="w-14 h-14 rounded-xl bg-primary-50 flex items-center justify-center text-2xl shrink-0 group-hover:bg-primary-100 transition">{cat.icon}</div>
                <div>
                  <h3 className="font-semibold text-gray-900 group-hover:text-primary-600 transition">{cat.name}</h3>
                  <p className="text-sm text-gray-500 mt-1">{cat.count} listings</p>
                  <p className="text-sm text-gray-500 mt-2 line-clamp-2">{cat.description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}