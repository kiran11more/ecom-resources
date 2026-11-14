import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '..');

const USER_AGENT =
  'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130.0.0.0 Safari/537.36';

// Domains known to enforce 403 / 429 Cloudflare, Akamai, or anti-scraping WAF challenges against automated scripts
const BOT_PROTECTED_DOMAINS = [
  'amazon.com',
  'amazon.co.uk',
  'amazon.de',
  'amazon.fr',
  'amazon.it',
  'amazon.es',
  'amazon.co.jp',
  'amazon.ca',
  'amazon.com.au',
  'sellercentral.amazon.com',
  '1688.com',
  'taobao.com',
  'alibaba.com',
  'slickdeals.net',
  'dealam.com',
  'constantcontact.com',
  'drip.com',
  'globalsources.com',
  'reviewmeta.com',
  'socialblade.com',
  'techbargains.com',
  'bensbargains.com',
  'facebook.com',
  'instagram.com',
  'x.com',
  'twitter.com',
  'camelcamelcamel.com',
  'tiktok.com',
  'espacenet.com',
  'cnipa.gov.cn',
  'inpit.go.jp',
];

function isBotProtected(urlStr) {
  try {
    const parsed = new URL(urlStr);
    return BOT_PROTECTED_DOMAINS.some(
      (d) => parsed.hostname === d || parsed.hostname.endsWith('.' + d)
    );
  } catch {
    return false;
  }
}

// 1. Gather all URLs from Keystatic resources and TS data files
function gatherUrls() {
  const items = [];

  // 1a. Keystatic JSON entries (src/content/resources/*.json)
  const resourcesDir = path.join(rootDir, 'src', 'content', 'resources');
  if (fs.existsSync(resourcesDir)) {
    const files = fs.readdirSync(resourcesDir).filter((f) => f.endsWith('.json'));
    for (const f of files) {
      try {
        const fullPath = path.join(resourcesDir, f);
        const data = JSON.parse(fs.readFileSync(fullPath, 'utf8'));
        if (data.url && typeof data.url === 'string' && data.url.startsWith('http')) {
          items.push({
            source: `content/resources/${f}`,
            name: data.name || f,
            field: 'url',
            url: data.url,
          });
        }
      } catch (err) {
        console.warn(`Could not parse ${f}:`, err.message);
      }
    }
  }

  // 1b. Navigation, Extensions & Deals data (src/data/navigation.ts)
  const navFile = path.join(rootDir, 'src', 'data', 'navigation.ts');
  if (fs.existsSync(navFile)) {
    const content = fs.readFileSync(navFile, 'utf8');

    // Extract RECOMMENDED_EXTENSIONS objects
    const extRegex =
      /id:\s*['"]([^'"]+)['"][\s\S]*?name:\s*['"]([^'"]+)['"][\s\S]*?chromeUrl:\s*['"]([^'"]+)['"][\s\S]*?websiteUrl:\s*['"]([^'"]+)['"]/g;
    let match;
    while ((match = extRegex.exec(content)) !== null) {
      const [, id, name, chromeUrl, websiteUrl] = match;
      if (chromeUrl && chromeUrl.startsWith('http')) {
        items.push({
          source: 'src/data/navigation.ts (RECOMMENDED_EXTENSIONS)',
          name: `${name} [Chrome/Install URL]`,
          field: 'chromeUrl',
          id,
          url: chromeUrl,
        });
      }
      if (websiteUrl && websiteUrl.startsWith('http')) {
        items.push({
          source: 'src/data/navigation.ts (RECOMMENDED_EXTENSIONS)',
          name: `${name} [Website URL]`,
          field: 'websiteUrl',
          id,
          url: websiteUrl,
        });
      }
    }

    // Extract OFFSITE_DEAL_PLATFORMS
    const dealRegex =
      /id:\s*['"](deal-[^'"]+)['"][\s\S]*?name:\s*['"]([^'"]+)['"][\s\S]*?url:\s*['"]([^'"]+)['"]/g;
    while ((match = dealRegex.exec(content)) !== null) {
      const [, id, name, url] = match;
      if (url && url.startsWith('http')) {
        items.push({
          source: 'src/data/navigation.ts (OFFSITE_DEAL_PLATFORMS)',
          name,
          field: 'url',
          id,
          url,
        });
      }
    }

    // Extract SIDEBAR_CATEGORIES items
    const sidebarItemRegex =
      /name:\s*['"]([^'"]+)['"],\s*slug:[^,]+,\s*url:\s*['"](https?:\/\/[^'"]+)['"]/g;
    while ((match = sidebarItemRegex.exec(content)) !== null) {
      const [, name, url] = match;
      items.push({
        source: 'src/data/navigation.ts (SIDEBAR_CATEGORIES)',
        name,
        field: 'url',
        url,
      });
    }

    // Extract COUNTRY_MARKETPLACES
    const marketRegex =
      /domain:\s*['"]([^'"]+)['"][\s\S]*?url:\s*['"]([^'"]+)['"][\s\S]*?bsrUrl:\s*['"]([^'"]+)['"]/g;
    while ((match = marketRegex.exec(content)) !== null) {
      const [, domain, url, bsrUrl] = match;
      if (url && url.startsWith('http')) {
        items.push({
          source: 'src/data/navigation.ts (COUNTRY_MARKETPLACES)',
          name: `Marketplace ${domain}`,
          field: 'url',
          url,
        });
      }
    }

    // Extract TRADEMARKS_PATENTS_PORTALS
    const ipBlock = content.match(/export const TRADEMARKS_PATENTS_PORTALS[\s\S]*?\];/)?.[0] || '';
    const ipRegex = /name:\s*['"]([^'"]+)['"][\s\S]*?url:\s*['"]([^'"]+)['"]/g;
    while ((match = ipRegex.exec(ipBlock)) !== null) {
      const [, name, url] = match;
      if (url && url.startsWith('http')) {
        items.push({
          source: 'src/data/navigation.ts (TRADEMARKS_PATENTS_PORTALS)',
          name: `IP Portal: ${name}`,
          field: 'url',
          url,
        });
      }
    }
  }

  return items;
}

// 2. Audit a single URL
async function auditUrl(item) {
  const { url, name, source } = item;
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 12000);

  try {
    const res = await fetch(url, {
      method: 'GET',
      redirect: 'follow',
      headers: {
        'User-Agent': USER_AGENT,
        Accept: 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
      },
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    const finalUrl = res.url || url;
    const status = res.status;

    // A. Check Chrome Web Store specific dead item signals
    const isChromeWebStore =
      url.includes('chromewebstore.google.com') ||
      finalUrl.includes('chromewebstore.google.com');

    if (isChromeWebStore) {
      if (
        finalUrl.endsWith('/error') ||
        finalUrl.includes('/detail/error') ||
        finalUrl.includes('/detail/empty-title/') ||
        (finalUrl === 'https://chromewebstore.google.com/' &&
          url !== 'https://chromewebstore.google.com/') ||
        status >= 400
      ) {
        return {
          ...item,
          status,
          finalUrl,
          verdict: 'BROKEN',
          reason: `Chrome Web Store redirected to error/empty-title (${status})`,
        };
      }
      const text = await res.text();
      const titleMatch = text.match(/<title>([^<]+)<\/title>/i);
      const pageTitle = titleMatch ? titleMatch[1].trim() : '';

      if (
        text.includes('This item is not available') ||
        text.includes('Item not found') ||
        (text.includes('not found') && text.includes('404')) ||
        pageTitle === 'Chrome Web Store'
      ) {
        return {
          ...item,
          status,
          finalUrl,
          verdict: 'BROKEN',
          reason: 'Chrome Web Store: item is not available / dead ID',
        };
      }
      return {
        ...item,
        status,
        finalUrl,
        verdict: 'PASS',
        reason: `Active Chrome Extension: ${pageTitle.slice(0, 36)}`,
      };
    }

    // B. Check standard HTTP statuses and Bot-protected gates
    if (status >= 400) {
      if ((status === 403 || status === 412 || status === 429 || status === 400) && isBotProtected(url)) {
        return {
          ...item,
          status,
          finalUrl,
          verdict: '403-WARN',
          reason: 'Bot challenge / Anti-scraping gate (valid domain)',
        };
      }
      return {
        ...item,
        status,
        finalUrl,
        verdict: 'BROKEN',
        reason: `HTTP ${status}`,
      };
    }

    return {
      ...item,
      status,
      finalUrl,
      verdict: 'PASS',
      reason: `HTTP ${status}`,
    };
  } catch (err) {
    clearTimeout(timeoutId);
    if (isBotProtected(url)) {
      return {
        ...item,
        status: err.name === 'AbortError' ? 'TIMEOUT' : 'ERR',
        finalUrl: url,
        verdict: '403-WARN',
        reason: `Bot gate / WAF challenge (${err.message})`,
      };
    }
    if (err.name === 'AbortError') {
      return {
        ...item,
        status: 'TIMEOUT',
        finalUrl: url,
        verdict: 'BROKEN',
        reason: 'Request timed out after 12s',
      };
    }
    return {
      ...item,
      status: 'ERR',
      finalUrl: url,
      verdict: 'BROKEN',
      reason: err.message || 'Fetch failed',
    };
  }
}

// 3. Pool executor with concurrency limit
async function runAudit() {
  console.log('🔍 Scanning directory files for external URLs...');
  const items = gatherUrls();
  console.log(`Found ${items.length} external URLs across directory content & navigation.`);

  const CONCURRENCY = 6;
  const results = [];
  let index = 0;

  async function worker() {
    while (index < items.length) {
      const current = items[index++];
      process.stdout.write(
        `Checking [${index}/${items.length}] ${current.name.slice(0, 32)}... \r`
      );
      const result = await auditUrl(current);
      results.push(result);
    }
  }

  const workers = Array.from({ length: CONCURRENCY }, () => worker());
  await Promise.all(workers);
  console.log('\n✅ Link audit fetch completed.\n');

  const broken = results.filter((r) => r.verdict === 'BROKEN');
  const warnings = results.filter((r) => r.verdict === '403-WARN');
  const passed = results.filter((r) => r.verdict === 'PASS');

  console.log(`📊 Results Summary:`);
  console.log(`   🟢 PASS:     ${passed.length}`);
  console.log(`   🟡 403-WARN: ${warnings.length}`);
  console.log(`   🔴 BROKEN:   ${broken.length}\n`);

  if (warnings.length > 0) {
    console.log('--- 🟡 Bot Protected / 403-WARN Links (Valid Domains) ---');
    console.table(
      warnings.map((w) => ({
        Name: w.name,
        Status: w.status,
        URL: w.url,
      }))
    );
    console.log('\n');
  }

  if (broken.length > 0) {
    console.log('--- 🔴 BROKEN URLs Found ---');
    console.table(
      broken.map((b) => ({
        Name: b.name,
        Source: b.source,
        Status: b.status,
        Reason: b.reason,
        URL: b.url,
      }))
    );
    console.log(`\n❌ Total Broken URLs: ${broken.length}`);
    process.exit(1);
  } else {
    console.log('🎉 No broken URLs found! All links passed verification.');
    process.exit(0);
  }
}

runAudit();
