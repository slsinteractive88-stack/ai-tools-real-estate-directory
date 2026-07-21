import { Metadata } from 'next';

export const metadata: Metadata = { title: 'Cookie Policy', description: 'Our cookie policy.' };

export default function CookiesPage() {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-3xl">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Cookie Policy</h1>
        <p className="text-gray-500 mb-8">Last updated: July 20, 2026</p>
        <div className="prose prose-gray max-w-none space-y-6">
          <h2>What Are Cookies</h2>
          <p>Cookies are small text files stored on your device (computer, phone, tablet) when you visit a website. They help sites remember your preferences, understand usage, and deliver relevant content.</p>

          <h2>Types We Use</h2>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr className="bg-gray-50">
                <th className="border border-gray-300 p-3 text-left">Category</th>
                <th className="border border-gray-300 p-3 text-left">Purpose</th>
                <th className="border border-gray-300 p-3 text-left">Examples</th>
                <th className="border border-gray-300 p-3 text-left">Consent Required</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="border border-gray-300 p-3 font-medium">Essential</td>
                <td className="border border-gray-300 p-3">Site functionality, security, consent preferences</td>
                <td className="border border-gray-300 p-3">Session ID, cookie consent state</td>
                <td className="border border-gray-300 p-3">No (legitimate interest)</td>
              </tr>
              <tr className="bg-gray-50">
                <td className="border border-gray-300 p-3 font-medium">Analytics</td>
                <td className="border border-gray-300 p-3">Understand how visitors use the site (anonymous)</td>
                <td className="border border-gray-300 p-3">Google Analytics (_ga, _gid)</td>
                <td className="border border-gray-300 p-3">Yes (GDPR/ePrivacy)</td>
              </tr>
              <tr>
                <td className="border border-gray-300 p-3 font-medium">Advertising</td>
                <td className="border border-gray-300 p-3">Serve personalized ads via Google AdSense</td>
                <td className="border border-gray-300 p-3">Google AdSense cookies (IDE, DSID, etc.)</td>
                <td className="border border-gray-300 p-3">Yes (explicit consent)</td>
              </tr>
            </tbody>
          </table>

          <h2>Third-Party Cookies</h2>
          <ul>
            <li><strong>Google Analytics:</strong> Collects anonymous usage data (pages visited, time on site, geographic region). IP addresses are anonymized. <a href="https://policies.google.com/privacy" target="_blank" rel="noopener" className="text-primary-600 hover:underline">Google Privacy Policy</a></li>
            <li><strong>Google AdSense:</strong> Uses cookies to serve ads based on your visits to this and other sites. You can opt out of personalized ads at <a href="https://adssettings.google.com" target="_blank" rel="noopener" className="text-primary-600 hover:underline">Google Ads Settings</a> or <a href="https://www.aboutads.info/choices/" target="_blank" rel="noopener" className="text-primary-600 hover:underline">Network Advertising Initiative</a>.</li>
          </ul>

          <h2>Cookie Retention</h2>
          <ul>
            <li>Essential: Session to 1 year</li>
            <li>Analytics: 14 months (Google Analytics default)</li>
            <li>Advertising: Up to 13 months (Google AdSense)</li>
          </ul>

          <h2>Manage Your Preferences</h2>
          <ol>
            <li><strong>Consent banner:</strong> On first visit, you can accept all, reject non-essential, or customize.</li>
            <li><strong>Browser settings:</strong> Block or delete cookies via your browser's privacy settings.</li>
            <li><strong>Opt-out tools:</strong> Use <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener" className="text-primary-600 hover:underline">Google Analytics Opt-out Add-on</a> or <a href="https://adssettings.google.com" target="_blank" rel="noopener" className="text-primary-600 hover:underline">Google Ads Settings</a>.</li>
          </ol>

          <h2>Your Rights (GDPR / ePrivacy)</h2>
                    <p>If you are in the EEA, you have the right to:</p>
                    <ul>
                      <li>Consent to or reject non-essential cookies</li>
                      <li>Withdraw consent at any time (via banner or browser settings)</li>
                      <li>Access data collected via cookies (see <a href="/privacy" className="text-primary-600 hover:underline">Privacy Policy</a>)</li>
                    </ul>
                    <p>To exercise these rights, please contact us via our <a href="https://realtyaivault.com" target="_blank" rel="noopener" className="text-primary-600 hover:underline">website contact form</a>.</p>
          <h2>Changes</h2>
          <p>We may update this policy. The "Last updated" date above will reflect changes.</p>

          <h2>Contact</h2>
          <p>Questions? Use the <a href="https://realtyaivault.com" target="_blank" rel="noopener" className="text-primary-600 hover:underline">website contact form</a> or email <a href="mailto:legal@realtyaivault.com" className="text-primary-600 hover:underline">legal@realtyaivault.com</a>.</p>
        </div>
      </div>
    </div>
  );
}