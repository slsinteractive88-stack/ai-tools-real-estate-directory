'use client';

import { useEffect } from 'react';
import { siteConfig } from '@/lib/config';

export function AdSenseAuto() {
  const enabled = siteConfig.adsense.enabled;
  if (!enabled) return null;

  useEffect(() => {
    (window as any).adsbygoogle = (window as any).adsbygoogle || [];
    (window as any).adsbygoogle.push({
      google_ad_client: siteConfig.adsense.publisherId,
      enable_page_level_ads: true,
    });
  }, []);

  return (
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${siteConfig.adsense.publisherId}`}
      crossOrigin="anonymous"
    />
  );
}