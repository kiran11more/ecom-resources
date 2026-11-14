import fs from 'node:fs';
import path from 'node:path';

console.log('=== Verifying Trademarks And Patents Section & Search Index ===\n');

let htmlPath = path.resolve('dist/client/index.html');
if (!fs.existsSync(htmlPath)) {
  htmlPath = path.resolve('dist/index.html');
}
const html = fs.readFileSync(htmlPath, 'utf8');

// 1. Verify Section Container & Anchors
console.log('[1] Checking Section #trademarks-patents & Container Classes...');
if (html.includes('id="trademarks-patents"')) {
  console.log('✓ Section id="trademarks-patents" exists in dist/index.html');
} else {
  console.error('✗ Missing id="trademarks-patents"');
  process.exit(1);
}

if (html.includes('id="trademark"')) {
  console.log('✓ Anchor id="trademark" preserved for backwards compatibility');
} else {
  console.error('✗ Missing anchor id="trademark"');
  process.exit(1);
}

// 2. Verify 5-Column Grid
console.log('\n[2] Checking 5-Column Desktop Grid Classes...');
if (html.includes('grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3')) {
  console.log('✓ Responsive 5-column grid (grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-3) present');
} else {
  console.error('✗ Missing 5-column grid classes');
  process.exit(1);
}

// 3. Verify All 18 IP Portals in HTML
console.log('\n[3] Checking All 18 IP Portals in HTML...');
const expectedPortals = [
  { name: 'U.S. Trademark Office', url: 'https://www.uspto.gov/trademarks' },
  { name: 'European Trademark Office (EUIPO)', url: 'https://www.euipo.europa.eu/' },
  { name: 'UK Trademark Office', url: 'https://www.gov.uk/topic/intellectual-property/trade-marks' },
  { name: 'Japan Trademark Office (J-PlatPat)', url: 'https://www.j-platpat.inpit.go.jp/' },
  { name: 'WIPO Trademark Search', url: 'https://branddb.wipo.int/' },
  { name: 'U.S. Patent Office', url: 'https://www.uspto.gov/patents' },
  { name: 'European Patent Office (EPO)', url: 'https://www.epo.org/' },
  { name: 'UK Patent Office', url: 'https://www.gov.uk/topic/intellectual-property/patents' },
  { name: 'Japan Patent Office', url: 'https://www.jpo.go.jp/e/' },
  { name: 'WIPO Patent Search (PATENTSCOPE)', url: 'https://patentscope.wipo.int/' },
  { name: 'Google Patent Search', url: 'https://patents.google.com/' },
  { name: 'Espacenet Patent Search', url: 'https://worldwide.espacenet.com/' },
  { name: 'Patent Search Tutorial (USPTO)', url: 'https://www.uspto.gov/patents/search' },
  { name: 'Trademark Search Tutorial (USPTO)', url: 'https://www.uspto.gov/trademarks/search' },
  { name: 'World Intellectual Property Organization', url: 'https://www.wipo.int/' },
  { name: 'U.S. Copyright Office', url: 'https://www.copyright.gov/' },
  { name: 'China Trademark Office (CNIPA)', url: 'https://sbj.cnipa.gov.cn/' },
  { name: 'Chinese Patent Search (CNIPA)', url: 'https://pss-system.cponline.cnipa.gov.cn/' },
];

for (const portal of expectedPortals) {
  if (html.includes(portal.name) && html.includes(portal.url)) {
    console.log(`✓ ${portal.name} -> ${portal.url}`);
  } else {
    console.error(`✗ Missing portal: ${portal.name} or URL ${portal.url}`);
    process.exit(1);
  }
}

// 4. Verify target="_blank" rel="noopener noreferrer"
console.log('\n[4] Checking target="_blank" rel="noopener noreferrer"...');
const externalCheck = html.includes('target="_blank" rel="noopener noreferrer"');
if (externalCheck) {
  console.log('✓ External link attributes present on portal cards');
} else {
  console.error('✗ Missing target="_blank" rel="noopener noreferrer"');
  process.exit(1);
}

// 5. Verify Global Live Search Indexing
console.log('\n[5] Checking Global Header Live Search Indexing...');
const searchMatch = html.match(/id="directory-search-index"[^>]*>([\s\S]*?)<\/script>/);
if (!searchMatch) {
  console.error('✗ directory-search-index not found');
  process.exit(1);
}

const searchIndex = JSON.parse(searchMatch[1]);
console.log(`✓ Total items indexed in client search: ${searchIndex.length}`);

const ipIndexed = searchIndex.filter((i) => i.categorySlug === 'trademarks-patents');
console.log(`✓ Trademarks & Patents items indexed: ${ipIndexed.length} / 18`);
if (ipIndexed.length !== 18) {
  console.error(`✗ Expected 18 IP items in search index, found ${ipIndexed.length}`);
  process.exit(1);
}

// Test search queries
const testQueries = ['USPTO', 'WIPO', 'patent', 'copyright', 'trademark'];
for (const query of testQueries) {
  const q = query.toLowerCase();
  const matches = searchIndex.filter((item) => {
    const haystack = `${item.name} ${item.category} ${item.description || ''} ${item.pricing || ''} ${(item.tags || []).join(' ')}`.toLowerCase();
    return haystack.includes(q);
  });
  console.log(`✓ Search for "${query}" surfaces ${matches.length} matching resources`);
  if (matches.length === 0) {
    console.error(`✗ Search query "${query}" yielded 0 results!`);
    process.exit(1);
  }
}

// 6. Verify Navigation & Mega-Menu Wiring
console.log('\n[6] Checking Navigation & Mega-Menu Wiring...');
if (html.includes('href="/#trademarks-patents"')) {
  console.log('✓ Header & Mega-Menu contains direct link to href="/#trademarks-patents"');
} else {
  console.error('✗ Missing link href="/#trademarks-patents" in navigation');
  process.exit(1);
}

console.log('\n======================================================');
console.log('ALL TRADEMARKS & PATENTS SPECIFICATIONS PASSED 100%!');
console.log('======================================================');
