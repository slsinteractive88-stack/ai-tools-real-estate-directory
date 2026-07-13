'use client';

import { useState, FormEvent, ChangeEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { categories } from '@/lib/categories';

interface SearchFiltersProps {
  initialCategory?: string;
  initialSearch?: string;
}

export function SearchFilters({ initialCategory, initialSearch }: SearchFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [category, setCategory] = useState(initialCategory || '');
  const [search, setSearch] = useState(initialSearch || '');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams.toString());
    if (category) params.set('category', category);
    else params.delete('category');
    if (search) params.set('q', search);
    else params.delete('q');
    params.delete('page');
    router.push(`/listings?${params.toString()}`);
  };

  const handleCategoryChange = (e: ChangeEvent<HTMLSelectElement>) => setCategory(e.target.value);
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>) => setSearch(e.target.value);

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-4xl mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <label htmlFor="search" className="sr-only">Search listings</label>
          <input
            id="search"
            type="search"
            value={search}
            onChange={handleSearchChange}
            placeholder="Search businesses, services..."
            className="w-full px-4 py-3 pl-11 text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white"
          />
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
        <div className="relative">
          <label htmlFor="category" className="sr-only">Category</label>
          <select
            id="category"
            value={category}
            onChange={handleCategoryChange}
            className="w-full sm:w-48 px-4 py-3 text-base border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent bg-white appearance-none pr-10"
          >
            <option value="">All Categories</option>
            {categories.map(c => <option key={c.id} value={c.id}>{c.name} ({c.count})</option>)}
          </select>
          <svg className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
        <button type="submit" className="px-6 py-3 bg-primary-600 text-white font-medium rounded-xl hover:bg-primary-700 transition whitespace-nowrap">
          Search
        </button>
      </div>
    </form>
  );
}