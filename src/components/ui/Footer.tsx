import Link from 'next/link';
import { siteConfig } from '@/lib/config';

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-gray-900 text-gray-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-white font-bold text-lg mb-4">{siteConfig.name}</h3>
            <p className="text-sm leading-relaxed">{siteConfig.description}</p>
          </div>
          <nav>
            <h4 className="text-white font-semibold mb-3">Browse</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/categories" className="hover:text-white transition">Categories</Link></li>
              <li><Link href="/listings" className="hover:text-white transition">All Listings</Link></li>
            </ul>
          </nav>
          <nav>
            <h4 className="text-white font-semibold mb-3">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/privacy" className="hover:text-white transition">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-white transition">Terms of Service</Link></li>
              <li><Link href="/cookies" className="hover:text-white transition">Cookie Policy</Link></li>
            </ul>
          </nav>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4 text-sm">
          <p>&copy; {year} {siteConfig.name}. All rights reserved.</p>
          <p>Not affiliated with Google AdSense. Ads by Google.</p>
        </div>
      </div>
    </footer>
  );
}