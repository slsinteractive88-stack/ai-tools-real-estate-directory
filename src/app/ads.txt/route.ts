import { siteConfig } from '@/lib/config';

export async function GET() {
  const lines = [
    `# Auto-generated on ${new Date().toISOString()}`,
    `# ${siteConfig.name} - ${siteConfig.url}`,
    '',
    `# Google AdSense`,
    `google.com, ${siteConfig.adsense.publisherId.replace('ca-pub-', '')}, DIRECT, f08c47fec0942fa0`,
    '',
    `# Additional authorized sellers (add your partners)`,
    `# example.com, 1234567890, RESELLER, abcdef1234567890`,
  ];
  const content = lines.join('\n');
  return new Response(content, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=86400' },
  });
}