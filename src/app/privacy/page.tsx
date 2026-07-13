import { Metadata } from 'next';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = { title: 'Privacy Policy', description: 'Our privacy policy.' };

export default function PrivacyPage() {
  const lastUpdated = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-gray-500 mb-8">Last updated: {lastUpdated}</p>
        <div className="prose prose-gray max-w-none space-y-6">
          <p>We respect your privacy. This policy explains how we collect, use, and protect your information.</p>
          <h2>Information We Collect</h2>
          <ul><li>Personal info you provide (name, email, phone) when submitting listings</li><li>Usage data (IP, browser, pages visited) via analytics</li><li>Advertising data via Google AdSense (cookies, device IDs)</li></ul>
          <h2>How We Use Your Information</h2>
          <ul><li>To operate and improve the directory</li><li>To communicate about your listings</li><li>To serve personalized ads (with consent)</li></ul>
          <h2>Google AdSense</h2>
          <p>We use Google AdSense to display ads. Google uses cookies to serve ads based on your visits. You can opt out via <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener" className="text-primary-600 hover:underline">Google's Ads Settings</a>.</p>
          <h2>Your Rights</h2>
          <p>You can request access, correction, or deletion of your data. Contact us at <a href={`mailto:privacy@${new URL(siteConfig.url).hostname}`} className="text-primary-600 hover:underline">privacy@{new URL(siteConfig.url).hostname}</a>.</p>
          <h2>Cookies</h2>
          <p>We use essential, analytics, and advertising cookies. Manage preferences in our <a href="/cookies" className="text-primary-600 hover:underline">Cookie Policy</a>.</p>
        </div>
      </div>
    </div>
  );
}