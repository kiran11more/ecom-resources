import fs from 'fs';
import path from 'path';

const distClient = path.resolve('dist/client');
const distRoot = path.resolve('dist');
const distServer = path.resolve('dist/server');

if (fs.existsSync(distClient)) {
  console.log('Populating dist/ root with static assets from dist/client for Cloudflare Pages compatibility...');
  const entries = fs.readdirSync(distClient);
  for (const entry of entries) {
    if (entry === 'client' || entry === 'server') continue;
    const src = path.join(distClient, entry);
    const dest = path.join(distRoot, entry);
    fs.cpSync(src, dest, { recursive: true, force: true });
  }
  console.log('✓ Successfully populated dist/ root with index.html and all static assets.');
}

// Generate _worker.js for Cloudflare Pages Advanced Mode (so Keystatic SSR routes work)
const workerPath = path.join(distRoot, '_worker.js');
if (fs.existsSync(path.join(distServer, 'entry.mjs'))) {
  fs.writeFileSync(workerPath, "export { default } from './server/entry.mjs';\n");
  console.log('✓ Generated dist/_worker.js delegating to ./server/entry.mjs for Pages Advanced Mode.');
}
