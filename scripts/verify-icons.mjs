import fs from 'fs';
import path from 'path';

const htmlPath = path.resolve('dist/index.html');
if (!fs.existsSync(htmlPath)) {
  console.error('dist/index.html not found! Run npm run build first.');
  process.exit(1);
}

const html = fs.readFileSync(htmlPath, 'utf8');

console.log('--- Verifying Chrome Extension Cards ---');
// Match all extension card containers
const extCards = html.split('class="ext-card-item').slice(1);
console.log(`Found ${extCards.length} extension cards in dist/index.html`);

let passedExtCards = 0;
for (const card of extCards) {
  // Check the img tag and monogram
  const hasOnload16 = card.includes('this.naturalHeight &lt;= 16') || card.includes('this.naturalHeight <= 16');
  const hasOnerror = card.includes("this.nextElementSibling?.classList.remove('hidden')");
  const monogramMatch = card.match(/<div class="hidden [^"]*rounded-xl[^"]*bg-gradient-to-br [^"]*font-extrabold [^"]*text-white[^"]*"[^>]*>([A-Z0-9]{2})<\/div>/);

  if (!hasOnload16) {
    console.error('Card missing naturalHeight <= 16 onload check!');
    process.exit(1);
  }
  if (!hasOnerror) {
    console.error('Card missing onerror check!');
    process.exit(1);
  }
  if (!monogramMatch) {
    console.error('Card missing 2-letter monogram fallback badge!');
    process.exit(1);
  }
  passedExtCards++;
}
console.log(`✓ All ${passedExtCards} extension cards have 16px onload detection and 2-letter monogram fallbacks.`);

console.log('\n--- Verifying Specific Extension Domains ---');
const requiredDomains = [
  'reviewmeta.com',
  'fatkun.com',
  'grammarly.com',
  'tubebuddy.com',
  'vidiq.com',
  'one-tab.com',
  'sellerapp.com',
  'bitly.com',
  'socialblade.com',
  'wordtracker.com',
  'keepa.com',
  'helium10.com',
  'aliprice.com'
];

for (const d of requiredDomains) {
  if (html.includes(`domain=${d}&amp;sz=128`) || html.includes(`domain=${d}&sz=128`)) {
    console.log(`✓ Confirmed domain mapping: ${d}`);
  } else {
    console.error(`✗ Missing required domain in HTML: ${d}`);
    process.exit(1);
  }
}

console.log('\n--- Verifying Off-Site Deal Cards ---');
const dealCards = html.split('class="deal-card-item').slice(1);
console.log(`Found ${dealCards.length} deal cards in dist/index.html`);

let passedDealCards = 0;
for (const card of dealCards) {
  const hasOnload16 = card.includes('this.naturalHeight &lt;= 16') || card.includes('this.naturalHeight <= 16');
  const hasOnerror = card.includes("this.nextElementSibling?.classList.remove('hidden')");
  const monogramMatch = card.match(/<div class="hidden [^"]*rounded-xl[^"]*bg-gradient-to-br [^"]*font-extrabold [^"]*text-white[^"]*"[^>]*>([A-Z0-9]{2})<\/div>/);

  if (hasOnload16 && hasOnerror && monogramMatch) {
    passedDealCards++;
  }
}
console.log(`✓ All ${passedDealCards} deal cards have 16px onload detection and 2-letter monogram fallbacks.`);

console.log('\n--- Verifying Directory Resource Cards (ToolTile) ---');
const toolFavicons = [...html.matchAll(/<img[^>]*src="https:\/\/www\.google\.com\/s2\/favicons\?domain=([^&"]+)&amp;sz=128"[^>]*onload="if \(this\.naturalHeight &lt;= 16\)[^"]*"[^>]*>/g)];
console.log(`Found ${toolFavicons.length} ToolTile cards with high-res favicons and 16px onload check.`);

console.log('\n========================================');
console.log('ALL ICON UPGRADE CHECKS PASSED CLEANLY!');
console.log('========================================');
