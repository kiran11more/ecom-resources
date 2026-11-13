import fs from 'fs';
import path from 'path';

console.log('--- 1. Verifying /tools/measurement-converter ---');
const mcPath = path.resolve('dist/tools/measurement-converter/index.html');
if (!fs.existsSync(mcPath)) {
  console.error('dist/tools/measurement-converter/index.html does not exist!');
  process.exit(1);
}
const mcHtml = fs.readFileSync(mcPath, 'utf8');

const mcChecks = [
  'Length',
  'Temperature',
  'Surface Area',
  'Inches (in)',
  'Centimeters (cm)',
  'Millimeters (mm)',
  'Meters (m)',
  'Feet (ft)',
  'Yards (yd)',
  'Celsius (°C)',
  'Fahrenheit (°F)',
  'Kelvin (K)',
  'Sq Feet (ft²)',
  'Sq Meters (m²)',
  'Sq Inches (in²)',
  'Sq Centimeters (cm²)',
  'Amazon US Standard Size Max',
  'Amazon FBA Max Carton Limit',
  'Warehouse Heat Threshold',
  'unit-copy-btn',
];

for (const check of mcChecks) {
  if (mcHtml.includes(check)) {
    console.log(`✓ Measurement Converter contains: ${check}`);
  } else {
    console.error(`✗ Measurement Converter missing: ${check}`);
    process.exit(1);
  }
}

console.log('\n--- 2. Verifying /tools/time-converter ---');
const tcPath = path.resolve('dist/tools/time-converter/index.html');
if (!fs.existsSync(tcPath)) {
  console.error('dist/tools/time-converter/index.html does not exist!');
  process.exit(1);
}
const tcHtml = fs.readFileSync(tcPath, 'utf8');

const tcChecks = [
  'Reset to Current Time',
  'Shenzhen',
  'New York',
  'Los Angeles',
  'London',
  'Frankfurt',
  'Tokyo',
  'Sydney',
  'Mumbai',
  'status-badge',
  'Business Hours (9 AM',
  'Off-Hours',
  'Same Day',
  'copy-hub-btn',
  'Asia/Shanghai',
  'America/New_York',
  'America/Los_Angeles',
  'Europe/London',
  'Europe/Berlin',
  'Asia/Tokyo',
  'Australia/Sydney',
  'Asia/Kolkata',
];

for (const check of tcChecks) {
  if (tcHtml.includes(check)) {
    console.log(`✓ Time Converter contains: ${check}`);
  } else {
    console.error(`✗ Time Converter missing: ${check}`);
    process.exit(1);
  }
}

console.log('\n--- 3. Verifying /tools/chatgpt-prompts ---');
const cpPath = path.resolve('dist/tools/chatgpt-prompts/index.html');
if (!fs.existsSync(cpPath)) {
  console.error('dist/tools/chatgpt-prompts/index.html does not exist!');
  process.exit(1);
}
const cpHtml = fs.readFileSync(cpPath, 'utf8');

const cpChecks = [
  'Amazon Listing SEO',
  'PPC',
  'Keyword Clustering',
  'Supplier Sourcing',
  'Customer Support',
  'TikTok',
  'UGC Video Hook Scripts',
  'prompt-variable',
  'Listing Title',
  '5 Feature Bullets SEO Generator',
  'Amazon Backend Search Terms',
  'Professional Supplier RFQ',
  'De-escalating 1-Star Negative Review',
  'TikTok Shop',
  'copy-prompt-btn',
  'btn-copy-label',
];

for (const check of cpChecks) {
  if (cpHtml.includes(check)) {
    console.log(`✓ ChatGPT Prompts contains: ${check}`);
  } else {
    console.error(`✗ ChatGPT Prompts missing: ${check}`);
    process.exit(1);
  }
}

console.log('\n--- 4. Verifying Navigation & Product Research Updates ---');
const homePath = path.resolve('dist/index.html');
const homeHtml = fs.readFileSync(homePath, 'utf8');

const navChecks = [
  '/tools/measurement-converter',
  '/tools/time-converter',
  '/tools/chatgpt-prompts',
  'Explore Google Trends',
  'Google Trends',
  'Google Trends ↗',
  'directory-search-index',
];

for (const check of navChecks) {
  if (homeHtml.includes(check)) {
    console.log(`✓ Homepage Navigation / Product Research contains: ${check}`);
  } else {
    console.error(`✗ Homepage missing: ${check}`);
    process.exit(1);
  }
}

// 5. Check search index contains the 3 tools
const searchIndexMatch = homeHtml.match(/<script type="application\/json" id="directory-search-index">([\s\S]*?)<\/script>/);
if (!searchIndexMatch) {
  console.error('✗ directory-search-index script missing from index.html');
  process.exit(1);
}
const searchIndex = JSON.parse(searchIndexMatch[1]);
const hasMc = searchIndex.some(item => (item.internalUrl || '').includes('/tools/measurement-converter'));
const hasTc = searchIndex.some(item => (item.internalUrl || '').includes('/tools/time-converter'));
const hasCp = searchIndex.some(item => (item.internalUrl || '').includes('/tools/chatgpt-prompts'));

if (!hasMc || !hasTc || !hasCp) {
  console.error(`✗ Missing tools in search index: MC=${hasMc}, TC=${hasTc}, CP=${hasCp}`);
  process.exit(1);
}
console.log('✓ Search index contains Measurement Converter, Time Converter, and ChatGPT Prompts!');

console.log('\n=============================================');
console.log('ALL TOOLS AND PRODUCT RESEARCH CHECKS PASSED!');
console.log('=============================================');
