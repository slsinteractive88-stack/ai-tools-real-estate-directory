import { Metadata } from 'next';
import { siteConfig } from '@/lib/config';

export const metadata: Metadata = { title: 'Privacy Policy', description: 'Our privacy policy.' };

export default function PrivacyPage() {
  const lastUpdated = 'July 20, 2026';
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
        <p className="text-gray-500 mb-8">Last updated: {lastUpdated}</p>
        <div className="prose prose-gray max-w-none space-y-6">
          <p>We respect your privacy. This policy explains how we collect, use, and protect your information when you use Realty AI Vault, a directory of AI tools for real estate professionals.</p>
          
          <h2>Information We Collect</h2>
          <ul>
            <li><strong>Submitted listing data:</strong> Name, email, phone, company details — only when you voluntarily submit a tool listing</li>
            <li><strong>Usage data:</strong> IP address, browser type, pages visited, referral source — via privacy-friendly analytics</li>
            <li><strong>Advertising data:</strong> Cookies, device identifiers — via Google AdSense (with consent where required)</li>
          </ul>
          <p><em>We do not have user accounts, login systems, or newsletters. No profile data is stored beyond submitted listings.</em></p>

          <h2>How We Use Your Information</h2>
          <ul>
            <li>Publish and maintain submitted tool listings in the directory</li>
            <li>Communicate with submitters about their listings (verification, updates, removal requests)</li>
            <li>Analyze aggregate traffic to improve the site</li>
            <li>Serve relevant ads via Google AdSense (with consent where required)</li>
          </ul>

          <h2>Google AdSense & Advertising</h2>
          <p>We use Google AdSense to display ads. Google uses cookies to serve ads based on your visits to this and other sites. You can opt out of personalized ads via <a href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener" className="text-primary-600 hover:underline">Google's Ads Settings</a> or <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener" className="text-primary-600 hover:underline">Network Advertising Initiative opt-out</a>.</p>

          <h2>Cookies</h2>
          <p>We use essential, analytics, and advertising cookies. See our <a href="/cookies" className="text-primary-600 hover:underline">Cookie Policy</a> for details and how to manage preferences.</p>

          <h2>Data Retention</h2>
          <ul>
            <li>Submitted listing data: Retained while listing is published; deleted within 30 days of removal request</li>
            <li>Analytics data: Aggregated/anonymized after 14 months</li>
            <li>Advertising cookies: Per Google's retention policies</li>
          </ul>

          <h2>Your Rights (GDPR / EU Users)</h2>
          <p>If you are in the European Economic Area (EEA), you have rights regarding your personal data under GDPR, including access, correction, deletion, restriction, portability, objection, and withdrawal of consent. To exercise these rights, please contact us via our <a href="https://realtyaivault.com" target="_blank" rel="noopener" className="text-primary-600 hover:underline">website contact form</a>. We respond within 30 days.</p>

          <h2>Lawful Basis for Processing (GDPR)</h2>
          <ul>
            <li><strong>Contract performance:</strong> Processing listing submissions to publish them in the directory</li>
            <li><strong>Legitimate interests:</strong> Analytics for site improvement, fraud prevention, security</li>
            <li><strong>Consent:</strong> Personalized advertising via Google AdSense (where required by ePrivacy Directive)</li>
            <li><strong>Legal obligation:</strong> Compliance with applicable laws, responding to legal requests</li>
          </ul>

          <h2>Data Processing Agreement (DPA)</h2>
          <p>We enter into Data Processing Agreements with all subprocessors that handle personal data on our behalf, including:</p>
          <ul>
            <li>Google (Analytics, AdSense) — Standard Contractual Clauses in place</li>
            <li>Hosting/CDN providers (Cloudflare, Netlify) — DPA executed</li>
          </ul>
          <p>Subprocessors are listed in our <a href="/cookies" className="text-primary-600 hover:underline">Cookie Policy</a>.</p>

          <h2>International Transfers</h2>
          <p>Your data may be processed in the United States and other countries. Transfers outside the EEA rely on:</p>
          <ul>
            <li>EU Standard Contractual Clauses (SCCs) with subprocessors</li>
            <li>Adequacy decisions where applicable</li>
            <li>Google's EU-U.S. Data Privacy Framework certification</li>
          </ul>

          <h2>Children's Privacy</h2>
          <p>This site is not directed at children under 16. We do not knowingly collect personal data from children.</p>

          <h2>Changes to This Policy</h2>
          <p>We may update this policy. Material changes will be posted here with a revised "Last updated" date. Continued use constitutes acceptance.</p>

          <h2>Contact</h2>
          <p>Questions? Email <a href="mailto:privacy@realtyaivault.com" className="text-primary-600 hover:underline">privacy@realtyaivault.com</a>.</p>
        </div>
      </div>
    </div>
  );
}