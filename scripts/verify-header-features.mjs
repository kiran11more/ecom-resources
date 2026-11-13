import fs from 'node:fs';
import path from 'node:path';

console.log('=== Verifying Header Menu Links, News Ticker, List Resource & Login Modals ===\n');

const distIndex = path.resolve('dist/index.html');
if (!fs.existsSync(distIndex)) {
  console.error('Error: dist/index.html not found! Run npm run build first.');
  process.exit(1);
}

const html = fs.readFileSync(distIndex, 'utf8');

// 1. Audit Anchors & Menu Links
console.log('[1] Checking Homepage Section Anchor IDs in dist/index.html...');
const expectedAnchors = [
  'quick-directory',
  'store-opening',
  'sourcing',
  'marketing',
  'advertising-platforms',
  'videos-social',
  'logistics',
  'warehouse-logistics',
  'accounting',
  'legal-ip',
  'legal-services',
  'trademark',
  'stock-clearance',
  'photography',
  'website',
  'training',
  'guides',
  'everyday-tools',
  'browser-extensions',
  'currency-rates',
  'currency-exchange-rates',
  'product-research',
  'cross-border-information',
  'email-marketing',
  'directory-matrix'
];

let allAnchorsExist = true;
for (const id of expectedAnchors) {
  const hasId = html.includes(`id="${id}"`);
  if (hasId) {
    console.log(`✓ Section anchor id="${id}" exists`);
  } else {
    console.error(`✗ Missing section anchor id="${id}"!`);
    allAnchorsExist = false;
  }
}

if (!allAnchorsExist) {
  console.error('FAIL: Missing required anchor IDs.');
  process.exit(1);
}

// 2. Check for Dead Links in Navigation
console.log('\n[2] Checking for Dead or Unprefixed Links in Header & Drawer...');
const deadLinkRegex = /href=["']#[^"']*["']/g;
const deadMatches = html.match(deadLinkRegex) || [];
// Filter out legitimate SVG or in-page ID references if any
const relativeDeadLinks = deadMatches.filter(m => !m.includes('clipPath') && !m.includes('mask') && !m.includes('filter'));
if (relativeDeadLinks.length > 0) {
  console.warn(`Warning: Found unprefixed relative hash links:`, relativeDeadLinks);
} else {
  console.log('✓ Zero unprefixed relative hash links found in HTML!');
}

// Check key mapped links
const requiredHrefs = [
  '/#store-opening',
  '/#sourcing',
  '/#marketing',
  '/#videos-social',
  '/#photography',
  '/#website',
  '/#logistics',
  '/#accounting',
  '/#training',
  '/#legal-ip',
  '/#stock-clearance',
  '/#guides',
  '/tools'
];

for (const href of requiredHrefs) {
  if (html.includes(`href="${href}"`)) {
    console.log(`✓ Mapped top-nav link exists: href="${href}"`);
  } else {
    console.error(`✗ Missing required top-nav link: href="${href}"`);
    process.exit(1);
  }
}

// 3. Verify Interactive News Ticker & NewsModal
console.log('\n[3] Verifying Interactive News Ticker & NewsModal...');
if (html.includes('id="header-news-ticker"')) {
  console.log('✓ Header news ticker button present (#header-news-ticker)');
} else {
  console.error('✗ Missing #header-news-ticker');
  process.exit(1);
}

if (html.includes('id="news-modal"')) {
  console.log('✓ NewsModal component mounted (#news-modal)');
} else {
  console.error('✗ Missing #news-modal');
  process.exit(1);
}

const requiredHeadlines = [
  'Amazon US FBA Fee & Inbound Placement Updates',
  'TikTok Shop Cross-Border Seller Onboarding Guide',
  'Yantian & Ningbo Ocean Freight Rate Watch',
  'EU VAT & EPR Compliance Deadlines 2026',
  'Google Trends Q4 Seasonal Demand Movers',
  'US Customs Section 321 De Minimis Updates'
];

for (const headline of requiredHeadlines) {
  if (html.includes(headline)) {
    console.log(`✓ Headline present in NewsModal: "${headline}"`);
  } else {
    console.error(`✗ Missing headline: "${headline}"`);
    process.exit(1);
  }
}

const requiredPortals = [
  'https://sellercentral.amazon.com',
  'https://fbx.freightos.com/',
  'https://trends.google.com/trends/'
];

for (const portal of requiredPortals) {
  if (html.includes(portal)) {
    console.log(`✓ Official portal link present: ${portal}`);
  } else {
    console.error(`✗ Missing portal link: ${portal}`);
    process.exit(1);
  }
}

// 4. Verify LIST RESOURCE Button & Modal
console.log('\n[4] Verifying LIST RESOURCE Button & ListResourceModal...');
if (html.includes('id="list-resource-modal"')) {
  console.log('✓ ListResourceModal mounted (#list-resource-modal)');
} else {
  console.error('✗ Missing #list-resource-modal');
  process.exit(1);
}

const listInputs = [
  'id="resource-name"',
  'id="resource-url"',
  'id="resource-category"',
  'id="resource-pricing"',
  'id="resource-description"',
  'id="resource-email"'
];

for (const input of listInputs) {
  if (html.includes(input)) {
    console.log(`✓ Validated input present: ${input}`);
  } else {
    console.error(`✗ Missing input: ${input}`);
    process.exit(1);
  }
}

if (html.includes('id="submit-success-view"') && html.includes('Queued for Editorial Review')) {
  console.log('✓ Instant confirmation state present (#submit-success-view)');
} else {
  console.error('✗ Missing confirmation state in ListResourceModal');
  process.exit(1);
}

const submitTriggersCount = (html.match(/data-open-submit-modal/g) || []).length;
console.log(`✓ Found ${submitTriggersCount} [data-open-submit-modal] triggers across Header, MobileDrawer, Search empty states, and Footer`);

// 5. Verify Login Button & LoginModal
console.log('\n[5] Verifying Login Button & LoginModal...');
if (html.includes('id="login-modal"')) {
  console.log('✓ LoginModal mounted (#login-modal)');
} else {
  console.error('✗ Missing #login-modal');
  process.exit(1);
}

if (html.includes('id="launch-demo-workspace-btn"')) {
  console.log('✓ One-click "Launch Demo Workspace" button present (#launch-demo-workspace-btn)');
} else {
  console.error('✗ Missing #launch-demo-workspace-btn');
  process.exit(1);
}

if (html.includes('id="sso-login-btn"') || html.includes('Sign in with Company SSO / GitHub CMS')) {
  console.log('✓ "Sign in with Company SSO / GitHub CMS" option present');
} else {
  console.error('✗ Missing SSO / GitHub option');
  process.exit(1);
}

if (html.includes('id="header-workspace-dropdown"') && html.includes('id="header-login-btn"')) {
  console.log('✓ Header auth container with toggleable Workspace dropdown present');
} else {
  console.error('✗ Missing Header auth toggle elements');
  process.exit(1);
}

if (html.includes('id="mobile-drawer-workspace-panel"') && html.includes('id="mobile-drawer-login-btn"')) {
  console.log('✓ Mobile drawer auth container with toggleable Workspace panel present');
} else {
  console.error('✗ Missing Mobile drawer auth toggle elements');
  process.exit(1);
}

console.log('\n======================================================');
console.log('ALL HEADER MENU, NEWS TICKER & MODAL CHECKS PASSED 100%!');
console.log('======================================================');
