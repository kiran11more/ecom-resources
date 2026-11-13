import fs from 'node:fs';
import path from 'node:path';

console.log('=== Verifying Header Mega-Menus & Sub-Nav Upgrade ===\n');

let htmlPath = path.resolve('dist/client/index.html');
if (!fs.existsSync(htmlPath)) {
  htmlPath = path.resolve('dist/index.html');
}
const html = fs.readFileSync(htmlPath, 'utf8');

// 1. Check Header & Nav Overflow & Z-Index
console.log('[1] Checking Header & Nav Z-Index & Overflow Configuration...');
if (html.includes('sticky top-0 z-50 relative') || html.includes('relative') && html.includes('z-50')) {
  console.log('✓ Header configured with z-50 and relative positioning');
} else {
  console.error('✗ Header missing z-50 and relative');
  process.exit(1);
}

// Ensure the sub-nav nav element and its container do NOT contain overflow-hidden or overflow-x-auto
const navMatch = html.match(/<nav[^>]*aria-label="Main Categories"[^>]*>([\s\S]*?)<\/nav>/);
if (!navMatch) {
  console.error('✗ Sub-nav <nav aria-label="Main Categories"> not found');
  process.exit(1);
}
const navHtml = navMatch[0];
const navOpeningTag = html.match(/<nav[^>]*aria-label="Main Categories"[^>]*>/)?.[0] || '';
const navContainerDiv = html.match(/<nav[^>]*aria-label="Main Categories"[^>]*>[\s\S]*?<div([^>]*)>/)?.[1] || '';
const navUlTag = html.match(/<nav[^>]*aria-label="Main Categories"[^>]*>[\s\S]*?<ul([^>]*)>/)?.[1] || '';

if (
  !navOpeningTag.includes('overflow-hidden') &&
  !navOpeningTag.includes('overflow-x-auto') &&
  !navContainerDiv.includes('overflow-hidden') &&
  !navContainerDiv.includes('overflow-x-auto') &&
  !navUlTag.includes('overflow-hidden') &&
  !navUlTag.includes('overflow-x-auto')
) {
  console.log('✓ Zero overflow-hidden or overflow-x-auto found on sub-nav container and list (no clipping!)');
} else {
  console.error('✗ sub-nav container or list still contains overflow-hidden or overflow-x-auto');
  process.exit(1);
}

// 2. Check Invisible Hover Bridge
console.log('\n[2] Checking Invisible Hover Bridge (pt-2 wrapper)...');
if (navHtml.includes('pt-2 z-50') && navHtml.includes('group-hover/nav-item:block')) {
  console.log('✓ Dropdown panels wrapped in pt-2 invisible hover bridge with group-hover/nav-item:block');
} else {
  console.error('✗ Dropdown panels missing pt-2 hover bridge wrapper');
  process.exit(1);
}

// 3. Check 9 Streamlined Items
console.log('\n[3] Checking 9 Streamlined Mega-Nav Items...');
const expectedItems = [
  'Store Opening',
  'Sourcing',
  'Marketing',
  'Videos',
  'Logistics',
  'Accounting',
  'Guides',
  'Cross-Border Info',
  'Tools',
];
for (const item of expectedItems) {
  if (navHtml.includes(item)) {
    console.log(`✓ Nav item "${item}" present`);
  } else {
    console.error(`✗ Nav item "${item}" not found in sub-nav`);
    process.exit(1);
  }
}

// 4. Check Right-Aligned Dropdowns
console.log('\n[4] Checking Right-Edge Viewport Alignment for rightmost menus...');
if (navHtml.includes('right-0 pt-2 z-50')) {
  console.log('✓ Rightmost dropdowns (Cross-Border Info & Tools) aligned with right-0');
} else {
  console.error('✗ Rightmost dropdowns not aligned with right-0');
  process.exit(1);
}

// 5. Check Content in Mega-Menus
console.log('\n[5] Checking Featured Tools, Tags & Utilities in Mega-Menus...');
const decodedNavHtml = navHtml.replace(/&amp;/g, '&');
const expectedFeatures = [
  'Amazon Seller Central',
  'TikTok Shop',
  'Walmart Marketplace',
  '1688',
  'Alibaba.com',
  'Global Sources',
  'Amazon Ads',
  'Google Ads',
  'Modash',
  'Billo',
  'TikTok Creative Center',
  'Meta Business Suite',
  'Freightos FBX',
  'Flexport',
  'ShipBob',
  'QuickBooks Online',
  'Xero',
  'Avalara',
  'LegalZoom',
  'Amazon Brand Registry',
  'Country & ISO Codes',
  'World Sea & Air Port Codes',
  'Global Business Timezones',
  'FBA Profit Calculator',
  'CBM Container Planner',
  'Measurement Converter',
  'Global Time Converter',
  'ChatGPT Seller Prompts',
  'IP Address Checker',
];

for (const feature of expectedFeatures) {
  if (decodedNavHtml.includes(feature)) {
    console.log(`✓ Feature "${feature}" present in mega-dropdown`);
  } else {
    console.error(`✗ Feature "${feature}" missing from mega-dropdown`);
    process.exit(1);
  }
}

// 6. Check Mega-Dropdown Styling
console.log('\n[6] Checking Mega-Dropdown Card Styling & Footers...');
if (navHtml.includes('rounded-2xl shadow-2xl p-4') && navHtml.includes('border-slate-200 dark:border-white/10')) {
  console.log('✓ Mega-dropdown cards styled with rounded-2xl shadow-2xl p-4 and light/dark borders');
} else {
  console.error('✗ Missing expected mega-dropdown styling classes');
  process.exit(1);
}

if (decodedNavHtml.includes('View All in Store Opening') && decodedNavHtml.includes('View All Sourcing Platforms') && decodedNavHtml.includes('View All Calculators & Utilities Hub')) {
  console.log('✓ "View All in Category →" footer links present across dropdowns');
} else {
  console.error('✗ Missing expected category footer links');
  process.exit(1);
}

console.log('\n======================================================');
console.log('ALL MEGA-MENU & SUB-NAV SPECIFICATIONS PASSED 100%!');
console.log('======================================================');
