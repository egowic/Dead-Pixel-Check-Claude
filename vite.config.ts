import { defineConfig } from 'vite';

export default defineConfig({
  base: '/Dead-Pixel-Check-Claude/',
  server: {
    // Force no-cache headers so Safari never serves stale JS modules
    headers: {
      'Cache-Control': 'no-store',
    },
  },
});
