import * as fs from 'fs';
import * as path from 'path';

const OUT_DIR = path.join(process.cwd(), 'out');
const ADS_TXT_PATH = path.join(OUT_DIR, 'ads.txt');

const ADS_TXT_CONTENT = `google.com, pub-7204857179418851, DIRECT, f08c47fec0942fa0`;

function main() {
  if (!fs.existsSync(OUT_DIR)) {
    console.error('out/ directory not found. Run `npm run build` first.');
    process.exit(1);
  }

  fs.writeFileSync(ADS_TXT_PATH, ADS_TXT_CONTENT);
  console.log(`✅ Generated ${ADS_TXT_PATH}`);
  console.log(`Content: ${ADS_TXT_CONTENT}`);
}

main();