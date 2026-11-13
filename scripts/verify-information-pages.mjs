import fs from 'fs';
import path from 'path';

console.log('=== Verifying Cross-Border Information Lookup Pages ===\n');

// 1. Check Country & ISO Codes (/information/country-codes)
console.log('[1] Verifying Country & ISO Codes (/information/country-codes)...');
const countryHtmlPath = path.resolve('dist/information/country-codes/index.html');
if (!fs.existsSync(countryHtmlPath)) {
  console.error('✗ dist/information/country-codes/index.html not found!');
  process.exit(1);
}
const countryHtml = fs.readFileSync(countryHtmlPath, 'utf8');

const sampleCountries = [
  'United States', 'China', 'United Kingdom', 'Germany', 'Japan',
  'Canada', 'Australia', 'France', 'Italy', 'Spain',
  'Mexico', 'India', 'Vietnam', 'South Korea', 'Singapore',
  'United Arab Emirates', 'Saudi Arabia', 'Brazil', 'Netherlands', 'Poland'
];

for (const name of sampleCountries) {
  if (countryHtml.includes(name)) {
    console.log(`✓ Country found: ${name}`);
  } else {
    console.error(`✗ Missing country: ${name}`);
    process.exit(1);
  }
}

const sampleCodes = ['US', 'CN', 'GB', 'DE', 'JP', 'USA', 'CHN', 'GBR', 'DEU', 'JPN', '+1', '+86', '+44', '+49', '+81'];
for (const code of sampleCodes) {
  if (countryHtml.includes(`data-copy="${code}"`)) {
    console.log(`✓ Copy code found: ${code}`);
  } else {
    console.error(`✗ Missing copy code: ${code}`);
    process.exit(1);
  }
}

if (countryHtml.includes('id="country-search-input"') && countryHtml.includes('region-tab-btn')) {
  console.log('✓ Country search input and region tabs present');
} else {
  console.error('✗ Missing search input or region tabs in country-codes');
  process.exit(1);
}

// 2. Check World Port Codes (/information/world-port-codes)
console.log('\n[2] Verifying World Port Codes (/information/world-port-codes)...');
const portHtmlPath = path.resolve('dist/information/world-port-codes/index.html');
if (!fs.existsSync(portHtmlPath)) {
  console.error('✗ dist/information/world-port-codes/index.html not found!');
  process.exit(1);
}
const portHtml = fs.readFileSync(portHtmlPath, 'utf8');

const requiredPorts = [
  'CNYTN', 'CNSZX', 'CNNGB', 'CNSHA', 'CNTAO', 'CNXMN', 'HKHKG', 'KRPUS',
  'USLAX', 'USLGB', 'USSAV', 'USNYC', 'GBFXT', 'NLRTM', 'DEHAM', 'JPTYO',
  'CNPVG', 'USORD', 'DEFRA', 'GBLHR'
];

for (const code of requiredPorts) {
  if (portHtml.includes(code)) {
    console.log(`✓ Required Port/Hub code found: ${code}`);
  } else {
    console.error(`✗ Missing required port/hub: ${code}`);
    process.exit(1);
  }
}

if (portHtml.includes('id="port-search-input"') && portHtml.includes('port-filter-btn')) {
  console.log('✓ Port search input and filter buttons present');
} else {
  console.error('✗ Missing search or filter in world-port-codes');
  process.exit(1);
}

if (portHtml.includes('Sea Port') && portHtml.includes('Air Cargo')) {
  console.log('✓ Both Sea Port and Air Cargo types present');
} else {
  console.error('✗ Missing Sea Port or Air Cargo badges');
  process.exit(1);
}

// 3. Check Global Timezones (/information/global-timezone)
console.log('\n[3] Verifying Global Timezones (/information/global-timezone)...');
const tzHtmlPath = path.resolve('dist/information/global-timezone/index.html');
if (!fs.existsSync(tzHtmlPath)) {
  console.error('✗ dist/information/global-timezone/index.html not found!');
  process.exit(1);
}
const tzHtml = fs.readFileSync(tzHtmlPath, 'utf8');

const requiredTimezones = ['CST', 'EST', 'PST', 'GMT', 'CET', 'IST', 'JST', 'AEST'];
for (const tz of requiredTimezones) {
  if (tzHtml.includes(`>${tz}<`)) {
    console.log(`✓ Timezone code found: ${tz}`);
  } else {
    console.error(`✗ Missing timezone code: ${tz}`);
    process.exit(1);
  }
}

const requiredCities = ['Shenzhen', 'New York', 'London', 'Frankfurt', 'Tokyo', 'Sydney', 'Mumbai', 'Singapore'];
for (const city of requiredCities) {
  if (tzHtml.includes(city)) {
    console.log(`✓ Major hub/city found: ${city}`);
  } else {
    console.error(`✗ Missing city: ${city}`);
    process.exit(1);
  }
}

if (tzHtml.includes('id="tz-search-input"') && tzHtml.includes('tz-filter-btn') && tzHtml.includes('data-live-tz')) {
  console.log('✓ Timezone search, filter pills, and live clock attributes present');
} else {
  console.error('✗ Missing search, filter, or clock attributes in global-timezone');
  process.exit(1);
}

// 4. Verify Navigation & Search Index Links
console.log('\n[4] Verifying Navigation & Search Index Links...');
const homeHtmlPath = path.resolve('dist/index.html');
const homeHtml = fs.readFileSync(homeHtmlPath, 'utf8');

const expectedLinks = [
  '/information/country-codes',
  '/information/world-port-codes',
  '/information/global-timezone',
];

for (const link of expectedLinks) {
  if (homeHtml.includes(link)) {
    console.log(`✓ Home page contains navigation link: ${link}`);
  } else {
    console.error(`✗ Home page missing link: ${link}`);
    process.exit(1);
  }
}

console.log('\n======================================================');
console.log('ALL CROSS-BORDER INFORMATION PAGE CHECKS PASSED 100%!');
console.log('======================================================');
