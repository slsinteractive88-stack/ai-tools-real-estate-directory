'use client';

import { useEffect, useRef } from 'react';
import { AdSlot } from '@/types';
import { siteConfig } from '@/lib/config';

interface AdSenseProps {
  slotKey: keyof typeof siteConfig.adsense.slots;
  className?: string;
  style?: React.CSSProperties;
  fallback?: React.ReactNode;
}

export function AdSense({ slotKey, className, style, fallback }: AdSenseProps) {
  const adRef = useRef<HTMLDivElement>(null);
  const slot = siteConfig.adsense.slots[slotKey];
  const enabled = siteConfig.adsense.enabled;

  useEffect(() => {
    if (!enabled || !adRef.current) return;
    (window as any).adsbygoogle = (window as any).adsbygoogle || [];
    (window as any).adsbygoogle.push({});
  }, [enabled]);

  if (!enabled) return <div className={className} style={style}>{fallback || null}</div>;

  return (
    <div className={className} style={style} ref={adRef}>
      <ins
        className="adsbygoogle"
        style={{ display: 'block', ...slot.style }}
        data-ad-client={slot.adClient}
        data-ad-slot={slot.adSlot}
        data-ad-format={slot.format}
        data-ad-layout={slot.layout}
        data-full-width-responsive="true"
      />
    </div>
  );
}

export function AdSenseScript() {
  const enabled = siteConfig.adsense.enabled;
  if (!enabled) return null;

  return (
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${siteConfig.adsense.publisherId}`}
      crossOrigin="anonymous"
    />
  );
}