import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: 'https://morrone.dev',
  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'load',
  },
  integrations: [icon(), tailwind(), mdx(), sitemap()],
});
