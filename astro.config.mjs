import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import keystatic from '@keystatic/astro';

// Mount react() and keystatic() ONLY in development mode so production static builds stay clean
const isDev = process.env.NODE_ENV === 'development';

export default defineConfig({
  site: 'https://ecomresources.info',
  output: 'static',
  integrations: isDev ? [react(), keystatic()] : [],
  devToolbar: {
    enabled: false,
  },
});
