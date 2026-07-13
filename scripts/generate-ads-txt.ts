import { siteConfig } from '../src/lib/config';
import fs from 'fs';
import path from 'path';

const lines = [
  `# Generated ${new Date().toISOString()}`,
  `# ${siteConfig.name} - ${siteConfig.url}`,
  '',
  `# Google AdSense`,
  `google.com, ${siteConfig.adsense.publisherId.replace('ca-pub-', '')}, DIRECT, f08c47fec0942fa0`,
  '',
  `# Add your other authorized sellers below:`,
  `# example.com, 1234567890, RESELLER, abcdef1234567890`,
];

const outputDir = path.join(process.cwd(), 'public');
if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

fs.writeFileSync(path.join(outputDir, 'ads.txt'), lines.join('\n'));
console.log('ads.txt generated at public/ads.txt');
console.log(lines.join('\n'));