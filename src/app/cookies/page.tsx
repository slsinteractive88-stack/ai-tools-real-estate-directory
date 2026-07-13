import { Metadata } from 'next';

export const metadata: Metadata = { title: 'Cookie Policy', description: 'Our cookie policy.' };

export default function CookiesPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Cookie Policy</h1>
        <div className="prose prose-gray max-w-none space-y-6">
          <h2>What Are Cookies</h2>
          <p>Small text files stored on your device.</p>
          <h2>Types We Use</h2>
          <ul>
            <li><strong>Essential:</strong> Site functionality, consent preferences</li>
            <li><strong>Analytics:</strong> Google Analytics (anonymous)</li>
            <li><strong>Advertising:</strong> Google AdSense (personalized ads with consent)</li>
          </ul>
          <h2>Manage Preferences</h2>
          <p>Use the consent banner on first visit or clear browser cookies to reset.</p>
          <h2>Google AdSense Cookies</h2>
          <p>See <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener" className="text-primary-600 hover:underline">Google's advertising cookie policy</a>.</p>
        </div>
      </div>
    </div>
  );
}