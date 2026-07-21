import { Metadata } from 'next';

export const metadata: Metadata = { title: 'Terms of Service', description: 'Our terms of service.' };

export default function TermsPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Terms of Service</h1>
        <p className="text-gray-500 mb-8">Last updated: July 20, 2026</p>
        <div className="prose prose-gray max-w-none space-y-6">
          <p>By accessing or using Realty AI Vault (<strong>realtyaivault.com</strong>), you agree to these Terms of Service. If you do not agree, please do not use this site.</p>

          <h2>1. Purpose of This Site</h2>
          <p>Realty AI Vault is a curated directory of AI tools for real estate professionals. We aggregate publicly available information and user-submitted listings to help agents, brokers, and teams discover relevant software.</p>

          <h2>2. Listings & Submissions</h2>
          <ul>
            <li>Tool companies or representatives may submit listings for inclusion.</li>
            <li>We reserve the right to reject, edit, or remove any listing at our discretion.</li>
            <li>Submitted information (name, email, company, tool details) is used solely to publish and maintain the listing.</li>
            <li>We do not guarantee placement, ranking, or featured status for any submission.</li>
          </ul>

          <h2>3. Accuracy & Disclaimer</h2>
          <ul>
            <li>Listings are based on publicly available information and/or submitter-provided data.</li>
            <li>We do not independently verify all claims (pricing, features, ratings, integrations).</li>
            <li>Information may be outdated or inaccurate. Always verify directly with the tool provider.</li>
            <li><strong>This directory is for informational purposes only — not professional advice.</strong></li>
          </ul>

          <h2>4. Monetization & Ads</h2>
          <ul>
            <li>We may display advertisements via Google AdSense. Ads are served by Google and are not endorsements.</li>
            <li>We do not currently use affiliate links in listings.</li>
            <li>If affiliate relationships are added in the future, they will not influence ranking, categorization, or editorial content, and will be disclosed.</li>
          </ul>

          <h2>5. User Conduct</h2>
          <p>You agree not to:</p>
          <ul>
            <li>Submit false, misleading, or fraudulent listings</li>
            <li>Scrape, crawl, or extract data from this site at scale</li>
            <li>Use the site for any unlawful or harmful purpose</li>
            <li>Interfere with site functionality or security</li>
          </ul>

          <h2>6. Intellectual Property</h2>
          <ul>
            <li>All original content (descriptions, categorization, design, code) is owned by Realty AI Vault.</li>
            <li>Tool names, logos, and trademarks belong to their respective owners.</li>
            <li>You may not reproduce or redistribute site content without permission.</li>
          </ul>

          <h2>7. Limitation of Liability</h2>
          <p>To the maximum extent permitted by law, Realty AI Vault and its operators are not liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of this directory, reliance on listing information, or interaction with third-party tools linked herein.</p>

          <h2>8. Indemnification</h2>
          <p>You agree to indemnify and hold harmless Realty AI Vault from any claims, damages, or expenses (including legal fees) arising from your violation of these terms or misuse of the site.</p>

          <h2>9. Governing Law</h2>
          <p>These terms are governed by the laws of the State of Delaware, USA, without regard to conflict-of-law principles. Disputes shall be resolved in the state or federal courts of Delaware.</p>

          <h2>10. Changes to Terms</h2>
          <p>We may update these terms at any time. The "Last updated" date above will reflect the latest revision. Continued use after changes constitutes acceptance.</p>

          <h2>11. Contact</h2>
          <p>Questions about these terms? Contact us via our <a href="https://realtyaivault.com" target="_blank" rel="noopener" className="text-primary-600 hover:underline">website contact form</a>.</p>
        </div>
      </div>
    </div>
  );
}