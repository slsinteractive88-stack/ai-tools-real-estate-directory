'use client';

import { useState } from 'react';
import { categories } from '@/lib/categories';

export default function AddListingPage() {
  const [form, setForm] = useState({
    title: '', category: '', description: '', shortDescription: '',
    website: '', email: '', phone: '', address: '', city: '', state: '', country: 'US',
    tags: '', featured: false,
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    setForm(prev => ({ ...prev, [target.name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In production: POST to API, validate, save to DB, send confirmation email
    console.log('Submit listing:', form);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="min-h-screen py-12 flex items-center justify-center">
        <div className="container mx-auto px-4 text-center">
          <div className="w-16 h-16 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center text-green-600">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7"/></svg>
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Listing Submitted!</h1>
          <p className="text-gray-600 mb-6 max-w-md mx-auto">Thanks for submitting your business. We'll review it and publish within 24 hours.</p>
          <a href="/" className="btn-primary">Back to Home</a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Add Your Business</h1>
          <p className="text-gray-600 mb-8">Free basic listing. Featured listings get priority placement.</p>

          <form onSubmit={handleSubmit} className="card p-6 sm:p-8 space-y-6">
            <div className="grid gap-6 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">Business Name *</label>
                <input type="text" id="title" name="title" required className="input" placeholder="Mario's Italian Kitchen" onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
                <select id="category" name="category" required className="input" onChange={handleChange}>
                  <option value="">Select category</option>
                  {categories.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone</label>
                <input type="tel" id="phone" name="phone" className="input" placeholder="(555) 123-4567" onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input type="email" id="email" name="email" className="input" placeholder="info@example.com" onChange={handleChange} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-1">Website</label>
                <input type="url" id="website" name="website" className="input" placeholder="https://example.com" onChange={handleChange} />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input type="text" id="address" name="address" className="input" placeholder="123 Main St" onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">City</label>
                <input type="text" id="city" name="city" className="input" placeholder="Springfield" onChange={handleChange} />
              </div>
              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">State</label>
                <input type="text" id="state" name="state" className="input" placeholder="IL" onChange={handleChange} />
              </div>
            </div>

            <div>
              <label htmlFor="shortDescription" className="block text-sm font-medium text-gray-700 mb-1">Short Description *</label>
              <textarea id="shortDescription" name="shortDescription" required rows={3} className="input" placeholder="One-line summary for search results..." onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Full Description *</label>
              <textarea id="description" name="description" required rows={6} className="input" placeholder="Detailed description of your business, services, history..." onChange={handleChange} />
            </div>
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">Tags (comma-separated)</label>
              <input type="text" id="tags" name="tags" className="input" placeholder="italian, pasta, wine, family-owned" onChange={handleChange} />
            </div>

            <div className="flex items-center gap-3">
              <input type="checkbox" id="featured" name="featured" className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500" onChange={handleChange} />
              <label htmlFor="featured" className="text-sm text-gray-700">Mark as Featured (paid upgrade)</label>
            </div>

            <div className="pt-4 border-t border-gray-100">
              <button type="submit" className="btn-primary w-full sm:w-auto">Submit for Review</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}