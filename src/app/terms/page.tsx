import { Metadata } from 'next';

export const metadata: Metadata = { title: 'Terms of Service', description: 'Our terms of service.' };

export default function TermsPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-gray-500 mb-8">Last updated: {new Date().toLocaleDateString()}</p>
        <div className="prose prose-gray max-w-none space-y-6">
          <p>By using this directory, you agree to these terms.</p>
          <h2>Listings</h2>
          <p>Business owners may submit listings. We reserve the right to reject, edit, or remove any listing. Editor's Pick placement is a paid service.</p>
          <h2>User Conduct</h2>
          <p>Do not submit false information, spam, or prohibited content (illegal, adult, hateful, etc.).</p>
          <h2>Disclaimer</h2>
          <p>Listings are user-submitted. We do not verify all claims. Use at your own risk.</p>
          <h2>Limitation of Liability</h2>
          <p>We are not liable for damages from use of this directory or third-party links.</p>
          <h2>Changes</h2>
          <p>We may update these terms. Continued use constitutes acceptance.</p>
        </div>
      </div>
    </div>
  );
}