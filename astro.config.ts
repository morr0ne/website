import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: 'https://morrone.dev',
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'load',
  },
  integrations: [icon(), sitemap()],
  markdown: {
    shikiConfig: {
      theme: 'light-plus',
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
});
