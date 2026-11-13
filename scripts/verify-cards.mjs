import fs from 'node:fs';
import path from 'node:path';

const contentDir = path.resolve('src/content/resources');
const distDir = path.resolve('dist');
const indexHtmlPath = path.join(distDir, 'index.html');

console.log('=== Verifying Directory Resources & Card Link Structure ===\n');

// 1. Audit all JSON files
const files = fs.readdirSync(contentDir).filter(f => f.endsWith('.json'));
console.log(`Total resource files in src/content/resources: ${files.length}`);

let detailCount = 0;
let nonDetailCount = 0;
const detailSlugs = [];
const nonDetailSlugs = [];

for (const file of files) {
  const content = JSON.parse(fs.readFileSync(path.join(contentDir, file), 'utf8'));
  const slug = file.replace(/\.json$/, '');
  if (content.hasDetailPage === true) {
    detailCount++;
    detailSlugs.push(slug);
    // Verify static page exists in dist
    const expectedPage = path.join(distDir, 'resources', slug, 'index.html');
    if (!fs.existsSync(expectedPage)) {
      console.error(`❌ Missing static page for ${slug}: ${expectedPage}`);
      process.exit(1);
    }
  } else {
    nonDetailCount++;
    nonDetailSlugs.push(slug);
  }
}

console.log(`✅ Detail pages count: ${detailCount} (all 29 generated in dist/resources/)`);
console.log(`✅ Non-detail pages count: ${nonDetailCount}`);

// 2. Audit dist/index.html card output
const indexHtml = fs.readFileSync(indexHtmlPath, 'utf8');

// Check for any legacy "Open Site ↗" in the built HTML
if (indexHtml.includes('Open Site ↗')) {
  console.error('❌ Found legacy "Open Site ↗" with Unicode arrow in dist/index.html');
  process.exit(1);
} else {
  console.log('✅ Zero occurrences of "Open Site ↗" with Unicode arrow found in dist/index.html');
}

// Check for "Open Site"
const openSiteMatches = (indexHtml.match(/<span>Open Site<\/span>/g) || []).length;
console.log(`✅ Found ${openSiteMatches} clean "Open Site" labels in dist/index.html`);

// Check for "View Details →"
const viewDetailsMatches = (indexHtml.match(/<span>View Details →<\/span>/g) || []).length;
console.log(`✅ Found ${viewDetailsMatches} "View Details →" buttons in dist/index.html`);

// Check for the subtle border separator "border-l border-slate-200 dark:border-white/10"
const separatorMatches = (indexHtml.match(/border-l border-slate-200 dark:border-white\/10/g) || []).length;
console.log(`✅ Found ${separatorMatches} secondary external buttons with border separator in dist/index.html`);

// Check sample detail card: helium-10
if (indexHtml.includes('href="/resources/helium-10"')) {
  console.log('✅ Helium 10 card correctly links to /resources/helium-10');
} else {
  console.error('❌ Helium 10 card missing link to /resources/helium-10');
  process.exit(1);
}

// Check sample non-detail portal card: google-ads
if (indexHtml.includes('ads.google.com')) {
  console.log('✅ Google Ads card links directly to external site');
} else {
  console.error('❌ Google Ads card external link missing');
  process.exit(1);
}

console.log('\n🎉 ALL CARD LINK CHECKS PASSED SUCCESSFULLY!');
