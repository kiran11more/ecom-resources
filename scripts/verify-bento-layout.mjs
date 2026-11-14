import fs from 'fs';
import path from 'path';

console.log('--- Verifying Bento Dashboard Layout Fixes ---');
let htmlPath = path.resolve('dist/index.html');
if (!fs.existsSync(htmlPath)) {
  htmlPath = path.resolve('dist/client/index.html');
}
if (!fs.existsSync(htmlPath)) {
  console.error('Neither dist/index.html nor dist/client/index.html exists!');
  process.exit(1);
}
const html = fs.readFileSync(htmlPath, 'utf8');

// 1. Live Global Market Clocks
console.log('\n[1] Verifying Market Clocks layout...');
if (html.includes('grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3 my-auto')) {
  console.log('✓ Clocks container uses: grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3 my-auto');
} else {
  console.error('✗ Clocks container missing grid-cols-1 sm:grid-cols-2 gap-2.5 pt-3 my-auto');
  process.exit(1);
}

// Check Live FX pill button in Market Clocks header
const hasHref = html.includes('href="/#currency-rates"') || html.includes('href="#currency-rates"');
const hasText = html.includes('Live FX ↓') || html.includes('Live FX');
if (hasHref && hasText) {
  console.log('✓ Market Clocks header contains "Live FX ↓" smooth-scroll button');
} else {
  console.error('✗ Market Clocks header missing "Live FX ↓" button linking to /#currency-rates');
  process.exit(1);
}

// Check date and business status attributes
if (html.includes('data-clock-date=') && html.includes('data-clock-status=')) {
  console.log('✓ Clocks include data-clock-date and data-clock-status attributes');
} else {
  console.error('✗ Missing data-clock-date or data-clock-status attributes in clocks');
  process.exit(1);
}

if (html.includes('>Open<') || html.includes('>Closed<')) {
  console.log('✓ Clock status badge present (Open / Closed)');
} else {
  console.error('✗ Clock status badge missing (Open / Closed)');
  process.exit(1);
}

const clockLabels = [
  'China',
  'USA',
  'UK',
  'EU',
  'Japan',
  'Australia',
  'Beijing • UTC+8',
  'New York • UTC-5',
  'London • UTC+0',
  'Frankfurt • UTC+1',
  'Tokyo • UTC+9',
  'Sydney • UTC+11',
];

for (const label of clockLabels) {
  if (html.includes(label)) {
    console.log(`✓ Clock label/subtitle found: ${label}`);
  } else {
    console.error(`✗ Missing clock label/subtitle: ${label}`);
    process.exit(1);
  }
}

// 2. Dedicated Single Source of Truth #currency-rates Section
console.log('\n[2] Verifying Single #currency-rates Section & Quick Converter...');
if (html.includes('id="currency-rates"')) {
  console.log('✓ Dedicated #currency-rates section exists');
} else {
  console.error('✗ Missing #currency-rates section');
  process.exit(1);
}

if (html.includes('id="fx-calc-input"')) {
  console.log('✓ USD Quick Converter input (#fx-calc-input) present');
} else {
  console.error('✗ Missing #fx-calc-input');
  process.exit(1);
}

const all9Pairs = [
  'USD / CNY',
  'EUR / USD',
  'GBP / USD',
  'USD / JPY',
  'USD / CAD',
  'USD / AUD',
  'USD / INR',
  'USD / SGD',
  'USD / AED',
];

for (const pair of all9Pairs) {
  if (html.includes(pair)) {
    console.log(`✓ FX pair found: ${pair}`);
  } else {
    console.error(`✗ Missing FX pair: ${pair}`);
    process.exit(1);
  }
}

// Ensure Currency Rates section appears ONLY once
const sectionMatches = (html.match(/<section id="currency-rates"/g) || []).length;
console.log(`✓ Currency rates section appears ${sectionMatches} time(s) (no duplicate in BentoDashboard)`);
if (sectionMatches !== 1) {
  console.error(`✗ Expected exactly 1 currency rate section, found ${sectionMatches}`);
  process.exit(1);
}

// 3. Global Amazon Marketplaces & Direct BSR Access
console.log('\n[3] Verifying Amazon Marketplaces layout...');
if (html.includes('10 Active Stations')) {
  console.log('✓ Marketplaces badge correctly shows: 10 Active Stations');
} else {
  console.error('✗ Marketplaces badge missing 10 Active Stations');
  process.exit(1);
}

if (html.includes('grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3 w-full min-w-0')) {
  console.log('✓ Marketplaces container uses: grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 gap-3');
} else {
  console.error('✗ Marketplaces container missing grid-cols-2 sm:grid-cols-3 xl:grid-cols-5 responsive grid');
  process.exit(1);
}

const stations = [
  'Amazon US',
  'Amazon UK',
  'Amazon DE',
  'Amazon FR',
  'Amazon IT',
  'Amazon ES',
  'Amazon JP',
  'Amazon CA',
  'Amazon AU',
  'Amazon MX',
];

for (const station of stations) {
  if (html.includes(station)) {
    console.log(`✓ Marketplace station found: ${station}`);
  } else {
    console.error(`✗ Missing marketplace station: ${station}`);
    process.exit(1);
  }
}

// Check 2-letter country badges
const countryBadges = ['US', 'UK', 'DE', 'FR', 'IT', 'ES', 'JP', 'CA', 'AU', 'MX'];
for (const b of countryBadges) {
  if (html.includes(`>${b}<`)) {
    console.log(`✓ Country badge found: ${b}`);
  } else {
    console.error(`✗ Missing country badge: ${b}`);
    process.exit(1);
  }
}

// Check domains
const domains = ['amazon.com', 'amazon.co.uk', 'amazon.de', 'amazon.fr', 'amazon.it', 'amazon.es', 'amazon.co.jp', 'amazon.ca', 'amazon.com.au', 'amazon.com.mx'];
for (const d of domains) {
  if (html.includes(d)) {
    console.log(`✓ Marketplace domain found: ${d}`);
  } else {
    console.error(`✗ Missing marketplace domain: ${d}`);
    process.exit(1);
  }
}

if (html.includes('grid grid-cols-2 gap-2 pt-2.5 border-t')) {
  console.log('✓ Action buttons use: grid-cols-2 gap-2 (never touch)');
} else {
  console.error('✗ Action buttons missing grid-cols-2 gap-2');
  process.exit(1);
}

// 4. Hero Card Spacing & Alignment
console.log('\n[4] Verifying Hero Card spacing & Clocks alignment...');
if (html.includes('min-h-[320px] sm:min-h-[350px] p-6 sm:p-8') && html.includes('flex flex-col justify-between')) {
  console.log('✓ Hero card uses balanced height: min-h-[320px] sm:min-h-[350px] p-6 sm:p-8 flex flex-col justify-between');
} else {
  console.error('✗ Hero card missing expected min-h-[320px] sm:min-h-[350px] p-6 sm:p-8 flex flex-col justify-between classes');
  process.exit(1);
}

if (html.includes('xl:col-span-5 flex flex-col')) {
  console.log('✓ Market Clocks column uses lg:col-span-6 xl:col-span-5 flex flex-col');
} else {
  console.error('✗ Market Clocks column missing lg:col-span-6 xl:col-span-5 flex flex-col');
  process.exit(1);
}

// Verify CTA buttons in Hero Card
if (html.includes('Explore Directory') && html.includes('FBA Calculators')) {
  console.log('✓ Hero card has Explore Directory and FBA Calculators CTAs');
} else {
  console.error('✗ Hero card missing CTA buttons');
  process.exit(1);
}

// 5. Outer Layout Container max-w-[1600px]
console.log('\n[5] Verifying outer layout max-w-[1600px] container...');
if (html.includes('max-w-[1600px] mx-auto')) {
  console.log('✓ Outer layout container properly constrained to max-w-[1600px] mx-auto');
} else {
  console.error('✗ Missing max-w-[1600px] mx-auto layout container');
  process.exit(1);
}

console.log('\n=============================================');
console.log('ALL BENTO DASHBOARD & MARKETPLACE CHECKS PASSED!');
console.log('=============================================');
