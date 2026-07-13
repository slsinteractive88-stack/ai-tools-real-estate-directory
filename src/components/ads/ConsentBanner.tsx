'use client';

import { useState, useEffect } from 'react';
import { siteConfig } from '@/lib/config';

export function ConsentBanner() {
  const [show, setShow] = useState(false);
  const enabled = siteConfig.adsense.enabled;

  useEffect(() => {
    if (!enabled) return;
    const consent = localStorage.getItem('ads_consent');
    if (!consent) setShow(true);
  }, [enabled]);

  if (!show || !enabled) return null;

  const accept = () => { localStorage.setItem('ads_consent', 'accepted'); setShow(false); };
  const reject = () => { localStorage.setItem('ads_consent', 'rejected'); setShow(false); };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg p-4 md:p-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-700 max-w-3xl">
          We use cookies to personalize content and ads, provide social media features, and analyze our traffic.
          We also share information about your use of our site with our advertising partners (Google AdSense).
        </div>
        <div className="flex gap-3 shrink-0">
          <button onClick={accept} className="bg-primary-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-primary-700 transition">
            Accept All
          </button>
          <button onClick={reject} className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-200 transition">
            Reject
          </button>
          <a href="/privacy" className="text-sm text-primary-600 hover:underline">Privacy Policy</a>
        </div>
      </div>
    </div>
  );
}